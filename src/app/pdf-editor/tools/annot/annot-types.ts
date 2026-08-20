/**
 * ============================================================================
 * Phase 2C Wave 1 — Annotation Type System
 * ----------------------------------------------------------------------------
 * Canonical TypeScript types for the annotation model.
 * All annotation data flows through these types before serialization.
 * ============================================================================
 */

export type AnnotationSubtype =
  | 'Highlight'
  | 'Underline'
  | 'StrikeOut'
  | 'Text'        // Sticky Note
  | 'FreeText'    // Text Comment
  | 'Ink'         // Freehand
  | 'Line'
  | 'Square'      // Rectangle
  | 'Circle'

export type ToolType =
  | 'select'
  | 'highlight'
  | 'underline'
  | 'strike'
  | 'note'
  | 'text'
  | 'draw'
  | 'line'
  | 'arrow'
  | 'rectangle'
  | 'circle'

export interface AnnotationColor {
  r: number  // 0-1
  g: number
  b: number
}

export interface AnnotationProperties {
  color: AnnotationColor
  opacity: number      // 0-1
  strokeWidth: number  // 1-12
}

export const DEFAULT_PROPERTIES: AnnotationProperties = {
  color: { r: 1, g: 0.92, b: 0.23 },  // amber/yellow highlight default
  opacity: 0.5,
  strokeWidth: 2,
}

/** A single quad for text markup (Highlight/Underline/StrikeOut). */
export interface Quad {
  x1: number; y1: number  // PDF coords, lower-left of first char
  x2: number; y2: number  // PDF coords, upper-right of last char
  x3: number; y3: number  // PDF coords, lower-left (second line if multiline)
  x4: number; y4: number  // PDF coords, upper-right (second line)
}

/** Base annotation — all subtypes extend this. */
export interface BaseAnnotation {
  id: string               // session-unique ID (not persisted to PDF)
  subtype: AnnotationSubtype
  pageNum: number          // 1-indexed page number
  rect: { x: number; y: number; width: number; height: number }  // PDF coords
  color: AnnotationColor
  opacity: number
  strokeWidth: number
  contents: string         // /Contents — plain text
  author: string           // /T — title
  createdAt: number        // epoch ms
  isExisting?: boolean     // true if annotation existed in source PDF (read-only)
  pdfRefId?: number        // pdf-lib PDFRef object number (for removeAnnot)
}

export interface HighlightAnnotation extends BaseAnnotation {
  subtype: 'Highlight' | 'Underline' | 'StrikeOut'
  quads: Quad[]            // 1+ quads for multi-line selection
}

export interface StickyNoteAnnotation extends BaseAnnotation {
  subtype: 'Text'
  icon: 'Note' | 'Comment' | 'Help' | 'Insert' | 'Key' | 'NewParagraph' | 'Paragraph'
}

export interface FreeTextAnnotation extends BaseAnnotation {
  subtype: 'FreeText'
  fontSize: number
  text: string
}

export interface InkAnnotation extends BaseAnnotation {
  subtype: 'Ink'
  paths: { x: number; y: number }[][]  // array of paths, each path is array of points (PDF coords)
}

export interface LineAnnotation extends BaseAnnotation {
  subtype: 'Line'
  start: { x: number; y: number }  // PDF coords
  end: { x: number; y: number }
  isArrow: boolean
}

export interface ShapeAnnotation extends BaseAnnotation {
  subtype: 'Square' | 'Circle'
}

export type Annotation =
  | HighlightAnnotation
  | StickyNoteAnnotation
  | FreeTextAnnotation
  | InkAnnotation
  | LineAnnotation
  | ShapeAnnotation

/** Per-page annotation map. */
export type AnnotationMap = Record<number, Annotation[]>

/** Undo/redo command. */
export interface AnnotCommand {
  type: 'add' | 'delete' | 'move' | 'update'
  annotationId: string
  pageNum: number
  before?: Annotation  // state before change
  after?: Annotation   // state after change
}

/** Tool capability metadata for UI. */
export interface ToolDef {
  type: ToolType
  labelEn: string
  labelBn: string
  icon: string  // lucide icon name
  shortcut: string
  requiresTextSelection: boolean
  requiresDrag: boolean
  requiresClick: boolean
}

export const TOOLS: ToolDef[] = [
  { type: 'select', labelEn: 'Select', labelBn: 'নির্বাচন', icon: 'MousePointer2', shortcut: 'V', requiresTextSelection: false, requiresDrag: false, requiresClick: false },
  { type: 'highlight', labelEn: 'Highlight', labelBn: 'হাইলাইট', icon: 'Highlighter', shortcut: 'H', requiresTextSelection: true, requiresDrag: false, requiresClick: false },
  { type: 'underline', labelEn: 'Underline', labelBn: 'আন্ডারলাইন', icon: 'Underline', shortcut: 'U', requiresTextSelection: true, requiresDrag: false, requiresClick: false },
  { type: 'strike', labelEn: 'Strikethrough', labelBn: 'স্ট্রাইক', icon: 'Strikethrough', shortcut: 'S', requiresTextSelection: true, requiresDrag: false, requiresClick: false },
  { type: 'note', labelEn: 'Sticky Note', labelBn: 'নোট', icon: 'StickyNote', shortcut: 'N', requiresTextSelection: false, requiresDrag: false, requiresClick: true },
  { type: 'text', labelEn: 'Text Comment', labelBn: 'টেক্সট', icon: 'Type', shortcut: 'T', requiresTextSelection: false, requiresDrag: false, requiresClick: true },
  { type: 'draw', labelEn: 'Freehand', labelBn: 'ড্রয়িং', icon: 'PenLine', shortcut: 'D', requiresTextSelection: false, requiresDrag: true, requiresClick: false },
  { type: 'line', labelEn: 'Line', labelBn: 'লাইন', icon: 'Minus', shortcut: 'L', requiresTextSelection: false, requiresDrag: true, requiresClick: false },
  { type: 'arrow', labelEn: 'Arrow', labelBn: 'তীর', icon: 'ArrowRight', shortcut: 'A', requiresTextSelection: false, requiresDrag: true, requiresClick: false },
  { type: 'rectangle', labelEn: 'Rectangle', labelBn: 'আয়তক্ষেত্র', icon: 'Square', shortcut: 'R', requiresTextSelection: false, requiresDrag: true, requiresClick: false },
  { type: 'circle', labelEn: 'Circle', labelBn: 'বৃত্ত', icon: 'Circle', shortcut: 'C', requiresTextSelection: false, requiresDrag: true, requiresClick: false },
]

export const COLOR_PRESETS: AnnotationColor[] = [
  { r: 1, g: 0.92, b: 0.23 },    // yellow (highlight default)
  { r: 0.23, g: 0.51, b: 0.96 }, // blue
  { r: 0.20, g: 0.80, b: 0.20 }, // green
  { r: 0.85, g: 0.20, b: 0.20 }, // red
  { r: 0.80, g: 0.40, b: 0.90 }, // purple
  { r: 0.94, g: 0.50, b: 0.16 }, // orange
  { r: 0.13, g: 0.13, b: 0.13 }, // black
  { r: 0.50, g: 0.50, b: 0.50 }, // gray
]

/** Generate session-unique annotation ID. */
export function generateAnnotId(): string {
  return `annot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
