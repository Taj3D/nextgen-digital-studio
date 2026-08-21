/**
 * ============================================================================
 * Phase 2C Wave 2 — Annotation Edit Helpers
 * ----------------------------------------------------------------------------
 * Pure functions for computing annotation property updates.
 * These do NOT directly mutate the PDF — they return updated Annotation
 * objects that the store + serializer use.
 * ============================================================================
 */

import type { Annotation, AnnotationColor, AnnotationSubtype } from './annot-types'
import { getEditableProperties } from './annot-types'

/** Edit color for an annotation. Returns updated annotation (immutable). */
export function editColor(annot: Annotation, color: AnnotationColor): Annotation {
  const props = getEditableProperties(annot.subtype)
  if (!props.color) return annot
  return { ...annot, color, dirty: annot.origin === 'existing' ? true : annot.dirty }
}

/** Edit opacity for an annotation. */
export function editOpacity(annot: Annotation, opacity: number): Annotation {
  const props = getEditableProperties(annot.subtype)
  if (!props.opacity) return annot
  return { ...annot, opacity, dirty: annot.origin === 'existing' ? true : annot.dirty }
}

/** Edit stroke width for an annotation. */
export function editStrokeWidth(annot: Annotation, strokeWidth: number): Annotation {
  const props = getEditableProperties(annot.subtype)
  if (!props.strokeWidth) return annot
  return { ...annot, strokeWidth, dirty: annot.origin === 'existing' ? true : annot.dirty }
}

/** Edit contents (text) for an annotation. */
export function editContents(annot: Annotation, contents: string): Annotation {
  const props = getEditableProperties(annot.subtype)
  if (!props.contents) return annot
  const updates: any = { contents, dirty: annot.origin === 'existing' ? true : annot.dirty }
  // FreeText also has a 'text' field that mirrors contents
  if (annot.subtype === 'FreeText') {
    updates.text = contents
  }
  return { ...annot, ...updates } as Annotation
}

/** Edit author for an annotation. */
export function editAuthor(annot: Annotation, author: string): Annotation {
  const props = getEditableProperties(annot.subtype)
  if (!props.author) return annot
  return { ...annot, author, dirty: annot.origin === 'existing' ? true : annot.dirty }
}

/** Edit font size for a FreeText annotation. */
export function editFontSize(annot: Annotation, fontSize: number): Annotation {
  if (annot.subtype !== 'FreeText') return annot
  return { ...annot, fontSize, dirty: annot.origin === 'existing' ? true : annot.dirty } as Annotation
}

/** Check if a property is editable for a given subtype. */
export function canEditProperty(subtype: AnnotationSubtype | string, property: 'color' | 'opacity' | 'strokeWidth' | 'contents' | 'author' | 'fontSize'): boolean {
  const props = getEditableProperties(subtype)
  return props[property]
}
