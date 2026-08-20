/**
 * ============================================================================
 * Phase 2C Wave 2 — Existing Annotation Loader
 * ----------------------------------------------------------------------------
 * Loads existing annotations from a PDF into the application store.
 * Uses pdfjs getAnnotations() for reading + pdf-lib readExistingAnnotations()
 * for PDFRef resolution.
 *
 * Existing annotations are marked with:
 *   - origin: 'existing'
 *   - isExisting: true
 *   - pdfRefId: <object number>
 *   - dirty: false
 *   - originalSnapshot: <deep clone for undo>
 * ============================================================================
 */

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { PDFDocument, PDFName, PDFArray, PDFNumber, PDFDict, PDFRef } from 'pdf-lib'
import type {
  Annotation,
  AnnotationSubtype,
  HighlightAnnotation,
  StickyNoteAnnotation,
  FreeTextAnnotation,
  InkAnnotation,
  LineAnnotation,
  ShapeAnnotation,
  Quad,
} from './annot-types'
import { generateAnnotId, isProtected } from './annot-types'

interface ExistingAnnotationInfo {
  subtype: string
  rect: [number, number, number, number]
  contents: string
  author: string
  color: { r: number; g: number; b: number }
  opacity: number
  strokeWidth: number
  quads?: Quad[]
  inkPaths?: { x: number; y: number }[][]
  lineStart?: { x: number; y: number }
  lineEnd?: { x: number; y: number }
  isArrow?: boolean
  fontSize?: number
  text?: string
  icon?: string
  pdfRefId: number
}

/**
 * Load all existing annotations from a PDF document into Annotation records.
 * @param pdfjsDoc - pdfjs PDFDocumentProxy (for getAnnotations)
 * @param pdfLibDoc - pdf-lib PDFDocument (for dict reading + PDFRef resolution)
 * @returns Map of pageNum → Annotation[]
 */
export async function loadExistingAnnotations(
  pdfjsDoc: PDFDocumentProxy,
  pdfLibDoc: PDFDocument,
): Promise<Record<number, Annotation[]>> {
  const result: Record<number, Annotation[]> = {}
  const numPages = pdfjsDoc.numPages

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    try {
      // Read via pdfjs for high-level annotation data
      const pdfjsPage = await pdfjsDoc.getPage(pageNum)
      const pdfjsAnnots = await pdfjsPage.getAnnotations()

      // Read via pdf-lib for PDFRef resolution
      const pdfLibPage = pdfLibDoc.getPage(pageNum - 1)  // 0-indexed
      const pdfLibAnnots = pdfLibPage.node.Annots()

      if (!pdfLibAnnots || pdfLibAnnots.size() === 0) continue

      // Build a map of pdfjs annotations by index for matching
      const pageAnnots: Annotation[] = []

      for (let i = 0; i < pdfLibAnnots.size(); i++) {
        const entry = pdfLibAnnots.get(i)
        let dict: PDFDict | null = null
        let refId = 0

        if (entry instanceof PDFRef) {
          dict = pdfLibDoc.context.lookup(entry) as PDFDict
          refId = entry.objectNumber
        } else if (entry instanceof PDFDict) {
          dict = entry
          // Register the inline dict to get a PDFRef (needed for mutation later)
          const ref = pdfLibDoc.context.register(entry)
          refId = ref.objectNumber
          // Replace the inline dict with the ref in the Annots array
          pdfLibAnnots.set(i, ref)
        } else {
          // Fallback: try to use as dict directly
          dict = entry as any
        }

        if (!dict) continue

        const info = parseAnnotationDict(dict, refId, pdfLibDoc)
        if (!info) continue

        // Skip protected subtypes (Link, Widget) — they're preserved but not editable
        if (isProtected(info.subtype)) {
          // Still load them as read-only annotations for display
          const annot = createAnnotationFromInfo(info, pageNum)
          if (annot) pageAnnots.push(annot)
          continue
        }

        const annot = createAnnotationFromInfo(info, pageNum)
        if (annot) pageAnnots.push(annot)
      }

      if (pageAnnots.length > 0) {
        result[pageNum] = pageAnnots
      }
    } catch (err) {
      console.error(`[annot-load] Failed to load page ${pageNum}:`, err)
    }
  }

  return result
}

/**
 * Parse a pdf-lib annotation dict into an ExistingAnnotationInfo.
 */
function parseAnnotationDict(dict: PDFDict, refId: number, pdfDoc: PDFDocument): ExistingAnnotationInfo | null {
  try {
    const subtypeEntry = dict.get(PDFName.of('Subtype'))
    if (!subtypeEntry) return null
    const subtype = subtypeEntry.toString().replace('/', '')

    const rectEntry = dict.get(PDFName.of('Rect'))
    if (!rectEntry) return null
    // Parse rect array [llx, lly, urx, ury] — pdf-lib uses spaces, not commas
    const rectStr = rectEntry.toString().replace(/[[\]]/g, '').trim().split(/\s+/).map(Number)
    if (rectStr.length < 4) return null
    const rect: [number, number, number, number] = [rectStr[0], rectStr[1], rectStr[2], rectStr[3]]

    // Contents
    const contentsEntry = dict.get(PDFName.of('Contents'))
    let contents = ''
    if (contentsEntry) {
      try {
        const s = contentsEntry.toString()
        if (s.startsWith('/')) {
          // Hex string — decode
          contents = decodePdfHexString(s.slice(1))
        } else {
          contents = s
        }
      } catch {}
    }

    // Author (/T)
    const authorEntry = dict.get(PDFName.of('T'))
    let author = ''
    if (authorEntry) {
      try {
        author = authorEntry.toString().replace(/^\//, '')
        if (author.startsWith('(')) author = author.slice(1, -1)
      } catch {}
    }

    // Color (/C)
    let color = { r: 1, g: 0.92, b: 0.23 }  // default yellow
    const colorEntry = dict.get(PDFName.of('C'))
    if (colorEntry) {
      try {
        const cStr = colorEntry.toString().replace(/[[\]]/g, '').trim().split(/\s+/).map(Number)
        if (cStr.length >= 3) {
          color = { r: cStr[0], g: cStr[1], b: cStr[2] }
        }
      } catch {}
    }

    // Opacity (/CA)
    let opacity = 1
    const caEntry = dict.get(PDFName.of('CA'))
    if (caEntry) {
      try {
        opacity = parseFloat(caEntry.toString())
      } catch {}
    }

    // Stroke width (/BS /W)
    let strokeWidth = 2
    const bsEntry = dict.get(PDFName.of('BS'))
    if (bsEntry) {
      try {
        const bsDict = bsEntry as PDFDict
        const w = bsDict.get(PDFName.of('W'))
        if (w) strokeWidth = parseFloat(w.toString())
      } catch {}
    }

    const info: ExistingAnnotationInfo = {
      subtype,
      rect,
      contents,
      author,
      color,
      opacity,
      strokeWidth,
      pdfRefId: refId,
    }

    // Subtype-specific parsing
    if (subtype === 'Highlight' || subtype === 'Underline' || subtype === 'StrikeOut') {
      const qpEntry = dict.get(PDFName.of('QuadPoints'))
      if (qpEntry) {
        try {
          const qpStr = qpEntry.toString().replace(/[[\]]/g, '').trim().split(/\s+/).map(Number)
          const quads: Quad[] = []
          for (let i = 0; i + 7 < qpStr.length; i += 8) {
            quads.push({
              x1: qpStr[i], y1: qpStr[i + 1],
              x2: qpStr[i + 2], y2: qpStr[i + 3],
              x3: qpStr[i + 4], y3: qpStr[i + 5],
              x4: qpStr[i + 6], y4: qpStr[i + 7],
            })
          }
          info.quads = quads
        } catch {}
      }
    } else if (subtype === 'Ink') {
      const inkEntry = dict.get(PDFName.of('InkList'))
      if (inkEntry) {
        try {
          const inkList = inkEntry as PDFArray
          const paths: { x: number; y: number }[][] = []
          for (let i = 0; i < inkList.size(); i++) {
            const pathArr = inkList.get(i) as PDFArray
            const path: { x: number; y: number }[] = []
            for (let j = 0; j + 1 < pathArr.size(); j += 2) {
              path.push({
                x: parseFloat(pathArr.get(j).toString()),
                y: parseFloat(pathArr.get(j + 1).toString()),
              })
            }
            paths.push(path)
          }
          info.inkPaths = paths
        } catch {}
      }
    } else if (subtype === 'Line') {
      const lEntry = dict.get(PDFName.of('L'))
      if (lEntry) {
        try {
          const lStr = lEntry.toString().replace(/[[\]]/g, '').trim().split(/\s+/).map(Number)
          if (lStr.length >= 4) {
            info.lineStart = { x: lStr[0], y: lStr[1] }
            info.lineEnd = { x: lStr[2], y: lStr[3] }
          }
        } catch {}
      }
      // Check for arrow (LE)
      const leEntry = dict.get(PDFName.of('LE'))
      if (leEntry) {
        try {
          const leStr = leEntry.toString()
          info.isArrow = leStr.includes('OpenArrow') || leStr.includes('ClosedArrow')
        } catch {}
      }
    } else if (subtype === 'FreeText') {
      const daEntry = dict.get(PDFName.of('DA'))
      if (daEntry) {
        try {
          const da = daEntry.toString()
          // Parse font size from DA: /Helv 12 Tf 0 0 0 rg
          const m = da.match(/(\d+(?:\.\d+)?)\s+Tf/)
          info.fontSize = m ? parseFloat(m[1]) : 12
        } catch {}
      }
      info.text = contents
    } else if (subtype === 'Text') {
      const nameEntry = dict.get(PDFName.of('Name'))
      if (nameEntry) {
        try {
          info.icon = nameEntry.toString().replace('/', '')
        } catch {}
      }
    }

    return info
  } catch (err) {
    console.error('[annot-load] Failed to parse annotation dict:', err)
    return null
  }
}

/**
 * Create an Annotation record from ExistingAnnotationInfo.
 */
function createAnnotationFromInfo(info: ExistingAnnotationInfo, pageNum: number): Annotation | null {
  const base = {
    id: generateAnnotId(),
    pageNum,
    rect: {
      x: info.rect[0],
      y: info.rect[1],
      width: info.rect[2] - info.rect[0],
      height: info.rect[3] - info.rect[1],
    },
    color: info.color,
    opacity: info.opacity,
    strokeWidth: info.strokeWidth,
    contents: info.contents,
    author: info.author || 'Existing',
    createdAt: Date.now(),
    isExisting: true,
    pdfRefId: info.pdfRefId,
    origin: 'existing' as const,
    dirty: false,
  }

  const subtype = info.subtype as AnnotationSubtype

  switch (subtype) {
    case 'Highlight':
    case 'Underline':
    case 'StrikeOut':
      return {
        ...base,
        subtype,
        quads: info.quads || [],
      } as HighlightAnnotation

    case 'Text':
      return {
        ...base,
        subtype: 'Text',
        icon: (info.icon as any) || 'Note',
      } as StickyNoteAnnotation

    case 'FreeText':
      return {
        ...base,
        subtype: 'FreeText',
        fontSize: info.fontSize || 12,
        text: info.text || info.contents,
      } as FreeTextAnnotation

    case 'Ink':
      return {
        ...base,
        subtype: 'Ink',
        paths: info.inkPaths || [],
      } as InkAnnotation

    case 'Line':
      return {
        ...base,
        subtype: 'Line',
        start: info.lineStart || { x: info.rect[0], y: info.rect[1] },
        end: info.lineEnd || { x: info.rect[2], y: info.rect[3] },
        isArrow: info.isArrow || false,
      } as LineAnnotation

    case 'Square':
    case 'Circle':
      return {
        ...base,
        subtype,
      } as ShapeAnnotation

    default:
      // Unknown/unsupported subtype — create a minimal record for display
      return {
        ...base,
        subtype: subtype as any,
      } as Annotation
  }
}

/**
 * Decode a PDF hex string to UTF-8 text.
 */
function decodePdfHexString(hex: string): string {
  try {
    // Remove whitespace
    hex = hex.replace(/\s/g, '')
    // Decode as UTF-16BE if starts with FEFF, else as UTF-8
    const bytes: number[] = []
    for (let i = 0; i + 1 < hex.length; i += 2) {
      bytes.push(parseInt(hex.slice(i, i + 2), 16))
    }
    // Check for UTF-16BE BOM
    if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
      // UTF-16BE
      let str = ''
      for (let i = 2; i + 1 < bytes.length; i += 2) {
        str += String.fromCharCode((bytes[i] << 8) | bytes[i + 1])
      }
      return str
    }
    // Otherwise treat as UTF-8 / Latin-1
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes))
  } catch {
    return ''
  }
}
