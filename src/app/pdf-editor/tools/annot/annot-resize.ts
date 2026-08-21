/**
 * ============================================================================
 * Phase 2C Wave 2 — Annotation Resize Helpers
 * ----------------------------------------------------------------------------
 * Pure functions for computing new geometry during resize.
 * Supports: Square, Circle, Line, Arrow, FreeText
 * Does NOT support: Highlight, Underline, StrikeOut, Ink, Sticky Note
 * ============================================================================
 */

import type { Annotation, LineAnnotation } from './annot-types'
import { isResizable } from './annot-types'

export type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | 'start' | 'end'

/** Get the resize handles for an annotation. */
export function getResizeHandles(annot: Annotation): ResizeHandle[] {
  if (!isResizable(annot.subtype)) return []

  if (annot.subtype === 'Line') {
    return ['start', 'end']
  }

  // Square, Circle, FreeText: 4 corner handles (mobile-safe)
  return ['nw', 'ne', 'sw', 'se']
}

/** Compute new geometry after resizing from a handle. */
export function computeResizedRect(
  annot: Annotation,
  handle: ResizeHandle,
  newPoint: { x: number; y: number },  // in PDF coords
): { rect: Annotation['rect']; extraUpdates?: Partial<Annotation> } {
  if (!isResizable(annot.subtype)) return { rect: annot.rect }

  const { x, y, width, height } = annot.rect
  const right = x + width
  const top = y + height

  let newX = x, newY = y, newW = width, newH = height

  switch (handle) {
    case 'nw':
      newX = newPoint.x
      newY = newPoint.y
      newW = right - newX
      newH = top - newY
      break
    case 'ne':
      newY = newPoint.y
      newW = newPoint.x - x
      newH = top - newY
      break
    case 'sw':
      newX = newPoint.x
      newW = right - newX
      newH = newPoint.y - y
      break
    case 'se':
      newW = newPoint.x - x
      newH = newPoint.y - y
      break
    case 'n':
      newY = newPoint.y
      newH = top - newY
      break
    case 's':
      newH = newPoint.y - y
      break
    case 'e':
      newW = newPoint.x - x
      break
    case 'w':
      newX = newPoint.x
      newW = right - newX
      break
  }

  // Minimum size to prevent collapse
  const MIN = 5
  if (newW < MIN) newW = MIN
  if (newH < MIN) newH = MIN

  return {
    rect: { x: newX, y: newY, width: newW, height: newH },
  }
}

/** Compute new Line geometry after resizing an endpoint. */
export function computeResizedLine(
  annot: LineAnnotation,
  handle: 'start' | 'end',
  newPoint: { x: number; y: number },
): { rect: Annotation['rect']; start: { x: number; y: number }; end: { x: number; y: number } } {
  const start = handle === 'start' ? newPoint : annot.start
  const end = handle === 'end' ? newPoint : annot.end

  const minX = Math.min(start.x, end.x)
  const minY = Math.min(start.y, end.y)
  const maxX = Math.max(start.x, end.x)
  const maxY = Math.max(start.y, end.y)

  return {
    rect: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
    start,
    end,
  }
}

/** Get handle position in PDF coords for rendering. */
export function getHandlePosition(annot: Annotation, handle: ResizeHandle): { x: number; y: number } {
  if (annot.subtype === 'Line') {
    const ln = annot as LineAnnotation
    if (handle === 'start') return ln.start
    if (handle === 'end') return ln.end
  }

  const { x, y, width, height } = annot.rect
  switch (handle) {
    case 'nw': return { x, y: y + height }
    case 'ne': return { x: x + width, y: y + height }
    case 'sw': return { x, y }
    case 'se': return { x: x + width, y }
    case 'n': return { x: x + width / 2, y: y + height }
    case 's': return { x: x + width / 2, y }
    case 'e': return { x: x + width, y: y + height / 2 }
    case 'w': return { x, y: y + height / 2 }
    default: return { x, y }
  }
}
