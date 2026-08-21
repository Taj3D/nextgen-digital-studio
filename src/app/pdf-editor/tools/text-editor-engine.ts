/**
 * ============================================================================
 * PDF Forge — Native Text Editor Engine
 * ----------------------------------------------------------------------------
 * Text object model + coordinate mapping for direct in-document PDF editing.
 * Builds on Wave 4D's proven content-stream surgery (redact-engine.ts).
 *
 * Architecture:
 *   PDF.js getTextContent() → TextItem[] → TextObject[] (editable model)
 *   User clicks TextObject → inline editor → editText() → new PDF
 *
 * Coordinate systems:
 *   - PDF.js: viewport coordinates (top-left origin, pixels, y-down)
 *   - PDF content stream: user space (bottom-left origin, points, y-up)
 *   - Conversion via page.getViewport() + transform matrix
 * ============================================================================
 */

'use client'

import * as pdfjsLibModule from './pdfjs-setup'
const pdfjsLib: any = pdfjsLibModule
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// ----------------------------------------------------------------------------
// Text Object Model
// ----------------------------------------------------------------------------
export interface TextObject {
  id: string
  pageIndex: number
  text: string
  originalText: string
  // PDF.js viewport coordinates (for UI overlay)
  viewportX: number
  viewportY: number
  width: number
  height: number
  // PDF user space coordinates (for content-stream surgery)
  pdfX: number
  pdfY: number
  fontSize: number
  fontName: string
  rotation: number
  transform: number[] // PDF.js item.transform [a, b, c, d, e, f]
  isEditable: boolean
  editStatus: 'original' | 'edited' | 'deleted' | 'added'
}

// ----------------------------------------------------------------------------
// Edit Operation (for undo/redo)
// ----------------------------------------------------------------------------
export type EditOperation =
  | { type: 'edit'; textObjectId: string; oldText: string; newText: string; pageIndex: number }
  | { type: 'delete'; textObjectId: string; text: string; pageIndex: number }
  | { type: 'add'; textObject: TextObject }

// ----------------------------------------------------------------------------
// Coordinate conversion utilities
// ----------------------------------------------------------------------------
/**
 * Convert PDF.js text item to TextObject with both viewport + PDF coordinates.
 */
export function buildTextObject(
  item: any,
  pageIndex: number,
  viewport: any,
  scale: number
): TextObject {
  const transform = item.transform || [1, 0, 0, 1, 0, 0]
  const tx = transform[4]
  const ty = transform[5]

  // PDF.js viewport coordinates (top-left origin, y-down)
  const viewportX = tx * scale
  // PDF.js flips y for viewport: viewportY = (pageHeight - ty) * scale
  const viewportY = (viewport.height / scale - ty) * scale

  const width = (item.width || 0) * scale
  const height = (item.height || 0) * scale

  // Font size from transform matrix (d component = vertical scale)
  const fontSize = Math.abs(transform[3]) || Math.abs(transform[0]) || 12

  // Rotation from transform matrix (0, 90, 180, 270)
  const a = transform[0]
  const b = transform[1]
  let rotation = 0
  if (Math.abs(b) > Math.abs(a)) {
    rotation = b > 0 ? 90 : 270
  } else if (a < 0) {
    rotation = 180
  }

  // Editability check: text must have content and reasonable size
  const isEditable = item.str && item.str.trim().length > 0 && fontSize > 4 && fontSize < 200

  return {
    id: `txt-${pageIndex}-${tx.toFixed(1)}-${ty.toFixed(1)}-${item.str.slice(0, 8)}`,
    pageIndex,
    text: item.str,
    originalText: item.str,
    viewportX,
    viewportY: viewportY - height, // adjust to top-left of text bbox
    width,
    height,
    pdfX: tx,
    pdfY: ty,
    fontSize,
    fontName: item.fontName || 'Helvetica',
    rotation,
    transform,
    isEditable,
    editStatus: 'original',
  }
}

/**
 * Extract all text objects from a PDF page.
 */
export async function extractTextObjects(
  pdfBytes: Uint8Array,
  pageIndex: number,
  scale: number = 1.5
): Promise<{ textObjects: TextObject[]; viewport: any }> {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(pdfBytes),
    enableScripting: false,
    isEvalSupported: false,
    disableFontFace: true,
  } as any)
  const doc = await loadingTask.promise
  const page = await doc.getPage(pageIndex + 1)
  const viewport = page.getViewport({ scale })
  const textContent = await page.getTextContent()

  const textObjects: TextObject[] = []
  for (const item of textContent.items as any[]) {
    if ('str' in item && item.str) {
      const obj = buildTextObject(item, pageIndex, viewport, scale)
      if (obj.isEditable) {
        textObjects.push(obj)
      }
    }
  }

  await doc.cleanup()
  await loadingTask.destroy()

  return { textObjects, viewport }
}

/**
 * Extract text objects from all pages.
 */
export async function extractAllTextObjects(
  pdfBytes: Uint8Array,
  scale: number = 1.5,
  onProgress?: (page: number, total: number) => void
): Promise<{ pages: { textObjects: TextObject[]; viewport: any }[]; pageCount: number }> {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(pdfBytes),
    enableScripting: false,
    isEvalSupported: false,
    disableFontFace: true,
  } as any)
  const doc = await loadingTask.promise
  const pageCount = doc.numPages
  const pages: { textObjects: TextObject[]; viewport: any }[] = []

  for (let i = 0; i < pageCount; i++) {
    if (onProgress) onProgress(i + 1, pageCount)
    const page = await doc.getPage(i + 1)
    const viewport = page.getViewport({ scale })
    const textContent = await page.getTextContent()
    const textObjects: TextObject[] = []
    for (const item of textContent.items as any[]) {
      if ('str' in item && item.str) {
        const obj = buildTextObject(item, i, viewport, scale)
        if (obj.isEditable) {
          textObjects.push(obj)
        }
      }
    }
    pages.push({ textObjects, viewport })
  }

  await doc.cleanup()
  await loadingTask.destroy()

  return { pages, pageCount }
}

// ----------------------------------------------------------------------------
// Edit session — applies edits using redact-engine
// ----------------------------------------------------------------------------
import { editText, type EditTextRequest } from './redact-engine'

/**
 * Apply a list of edit operations to produce a new PDF.
 * Uses the proven redact-engine (content-stream surgery).
 */
export async function applyEdits(
  pdfBytes: Uint8Array,
  operations: EditOperation[]
): Promise<Uint8Array> {
  // Collect all edit operations as EditTextRequests
  const edits: EditTextRequest[] = []

  for (const op of operations) {
    if (op.type === 'edit') {
      edits.push({
        pageIndex: op.pageIndex,
        oldText: op.oldText,
        newText: op.newText,
      })
    } else if (op.type === 'delete') {
      // Delete = edit with empty replacement (redact)
      edits.push({
        pageIndex: op.pageIndex,
        oldText: op.text,
        newText: '',
      })
    }
    // 'add' operations handled separately via pdf-lib drawText
  }

  if (edits.length === 0) {
    // No text edits — just return original
    return pdfBytes
  }

  // Use proven redact-engine to apply edits
  const doc = await editText(pdfBytes, edits)

  // Handle 'add' operations via pdf-lib
  const addOps = operations.filter((op): op is Extract<EditOperation, { type: 'add' }> => op.type === 'add')
  if (addOps.length > 0) {
    const helv = await doc.embedFont(StandardFonts.Helvetica)
    const pages = doc.getPages()
    for (const op of addOps) {
      const page = pages[op.textObject.pageIndex]
      if (page) {
        page.drawText(op.textObject.text, {
          x: op.textObject.pdfX,
          y: op.textObject.pdfY,
          size: op.textObject.fontSize,
          font: helv,
          color: rgb(0, 0, 0),
        })
      }
    }
  }

  return await doc.save()
}

// ----------------------------------------------------------------------------
// Undo/Redo manager
// ----------------------------------------------------------------------------
export class EditHistory {
  private undoStack: EditOperation[] = []
  private redoStack: EditOperation[] = []

  push(op: EditOperation) {
    this.undoStack.push(op)
    this.redoStack = []
  }

  undo(): EditOperation | null {
    const op = this.undoStack.pop() || null
    if (op) {
      this.redoStack.push(op)
    }
    return op
  }

  redo(): EditOperation | null {
    const op = this.redoStack.pop() || null
    if (op) {
      this.undoStack.push(op)
    }
    return op
  }

  canUndo(): boolean {
    return this.undoStack.length > 0
  }

  canRedo(): boolean {
    return this.redoStack.length > 0
  }

  clear() {
    this.undoStack = []
    this.redoStack = []
  }

  getOperations(): EditOperation[] {
    return [...this.undoStack]
  }

  get count(): number {
    return this.undoStack.length
  }
}

// ----------------------------------------------------------------------------
// Search across all pages
// ----------------------------------------------------------------------------
export interface SearchResult {
  textObject: TextObject
  matchStart: number
  matchEnd: number
}

export function searchInTextObjects(
  pages: { textObjects: TextObject[] }[],
  query: string,
  caseSensitive: boolean = false
): SearchResult[] {
  const results: SearchResult[] = []
  const searchQuery = caseSensitive ? query : query.toLowerCase()

  for (const page of pages) {
    for (const obj of page.textObjects) {
      const text = caseSensitive ? obj.text : obj.text.toLowerCase()
      let idx = 0
      while ((idx = text.indexOf(searchQuery, idx)) !== -1) {
        results.push({
          textObject: obj,
          matchStart: idx,
          matchEnd: idx + query.length,
        })
        idx += query.length
      }
    }
  }

  return results
}
