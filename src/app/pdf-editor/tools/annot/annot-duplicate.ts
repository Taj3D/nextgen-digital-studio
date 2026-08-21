/**
 * ============================================================================
 * Phase 2C Wave 2 — Annotation Duplicate Helper
 * ----------------------------------------------------------------------------
 * Pure function for creating a duplicate annotation with offset.
 * The store handles the actual state mutation + undo command.
 * ============================================================================
 */

import type { Annotation } from './annot-types'
import { generateAnnotId, isDuplicatable } from './annot-types'

/** Create a duplicate of an annotation with offset + new identity. */
export function createDuplicate(annot: Annotation, offset = 20): Annotation | null {
  if (!isDuplicatable(annot.subtype)) return null

  // Deep clone via JSON (safe for our plain-data annotation model)
  const dup = JSON.parse(JSON.stringify(annot)) as Annotation

  // New identity
  dup.id = generateAnnotId()
  dup.origin = 'created'
  dup.isExisting = false
  dup.dirty = false
  dup.originalSnapshot = undefined
  dup.pdfRefId = undefined
  dup.createdAt = Date.now()

  // Offset rect
  dup.rect = {
    x: annot.rect.x + offset,
    y: annot.rect.y + offset,
    width: annot.rect.width,
    height: annot.rect.height,
  }

  // Subtype-specific offset
  if (dup.subtype === 'Line') {
    const ln = dup as any
    ln.start = { x: ln.start.x + offset, y: ln.start.y + offset }
    ln.end = { x: ln.end.x + offset, y: ln.end.y + offset }
  } else if (dup.subtype === 'Ink') {
    const ink = dup as any
    ink.paths = ink.paths.map((path: { x: number; y: number }[]) =>
      path.map(p => ({ x: p.x + offset, y: p.y + offset }))
    )
  } else if (dup.subtype === 'Highlight' || dup.subtype === 'Underline' || dup.subtype === 'StrikeOut') {
    const h = dup as any
    if (h.quads) {
      h.quads = h.quads.map((q: any) => ({
        x1: q.x1 + offset, y1: q.y1 + offset,
        x2: q.x2 + offset, y2: q.y2 + offset,
        x3: q.x3 + offset, y3: q.y3 + offset,
        x4: q.x4 + offset, y4: q.y4 + offset,
      }))
    }
  }

  return dup
}
