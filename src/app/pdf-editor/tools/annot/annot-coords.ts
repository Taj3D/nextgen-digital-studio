/**
 * ============================================================================
 * Phase 2C Wave 1 — Coordinate Conversion Utilities
 * ----------------------------------------------------------------------------
 * Canonical coordinate conversion using pdfjs PageViewport.
 * NEVER manually implement rotation formulas — always use viewport.transform.
 * ============================================================================
 */

import type { PageViewport } from 'pdfjs-dist'

/**
 * Convert CSS/viewport point to PDF coordinates.
 * Handles scale, rotation, offset, and Y-flip automatically via viewport transform.
 */
export function cssToPdf(viewport: PageViewport, x: number, y: number): [number, number] {
  return viewport.convertToPdfPoint(x, y) as [number, number]
}

/**
 * Convert PDF point to CSS/viewport coordinates.
 */
export function pdfToCss(viewport: PageViewport, x: number, y: number): [number, number] {
  return viewport.convertToViewportPoint(x, y) as [number, number]
}

/**
 * Convert a CSS rectangle (top-left + dimensions) to PDF /Rect array [llx, lly, urx, ury].
 * /Rect is always [lower-left X, lower-left Y, upper-right X, upper-right Y] in PDF coords.
 */
export function cssRectToPdfRect(
  viewport: PageViewport,
  cssX: number,
  cssY: number,
  cssW: number,
  cssH: number,
): [number, number, number, number] {
  // Convert all 4 corners to PDF coords
  const [pdfX1, pdfY1] = cssToPdf(viewport, cssX, cssY)           // top-left
  const [pdfX2, pdfY2] = cssToPdf(viewport, cssX + cssW, cssY + cssH) // bottom-right
  // /Rect = [min X, min Y, max X, max Y]
  return [
    Math.min(pdfX1, pdfX2),
    Math.min(pdfY1, pdfY2),
    Math.max(pdfX1, pdfX2),
    Math.max(pdfY1, pdfY2),
  ]
}

/**
 * Convert a PDF /Rect [llx, lly, urx, ury] to CSS rectangle {x, y, width, height}.
 * Returns top-left origin + dimensions (CSS convention).
 */
export function pdfRectToCssRect(
  viewport: PageViewport,
  pdfRect: [number, number, number, number],
): { x: number; y: number; width: number; height: number } {
  const [llx, lly, urx, ury] = pdfRect
  // Convert all 4 corners to CSS coords
  const [cssX1, cssY1] = pdfToCss(viewport, llx, lly)  // lower-left in PDF → some CSS point
  const [cssX2, cssY2] = pdfToCss(viewport, urx, ury)  // upper-right in PDF → some CSS point
  return {
    x: Math.min(cssX1, cssX2),
    y: Math.min(cssY1, cssY2),
    width: Math.abs(cssX2 - cssX1),
    height: Math.abs(cssY2 - cssY1),
  }
}

/**
 * Convert a CSS quad (for text selection) to PDF QuadPoints.
 * QuadPoints is [x1,y1,x2,y2,x3,y3,x4,y4] where:
 *   (x1,y1) = lower-left of first char
 *   (x2,y2) = upper-right of last char on first line
 *   (x3,y3) = lower-left of first char on second line (if multiline)
 *   (x4,y4) = upper-right of last char on second line
 * For a single-line selection, x3=x1, y3=y1, x4=x2, y4=y2.
 */
export function cssQuadToPdfQuad(
  viewport: PageViewport,
  cssRect: { x: number; y: number; width: number; height: number },
): [number, number, number, number, number, number, number, number] {
  const { x, y, width, height } = cssRect
  // For a single-line rect: corners are (x,y) top-left, (x+w, y) top-right, (x, y+h) bottom-left, (x+w, y+h) bottom-right
  // In CSS, y increases downward. Convert each corner to PDF.
  const [pdfX1, pdfY1] = cssToPdf(viewport, x, y + height)         // bottom-left (lower-left in PDF)
  const [pdfX2, pdfY2] = cssToPdf(viewport, x + width, y + height) // bottom-right
  const [pdfX3, pdfY3] = cssToPdf(viewport, x, y + height)         // same as 1 for single line
  const [pdfX4, pdfY4] = cssToPdf(viewport, x + width, y + height) // same as 2 for single line
  return [pdfX1, pdfY1, pdfX2, pdfY2, pdfX3, pdfY3, pdfX4, pdfY4]
}

/**
 * Get device pixel ratio (handles high-DPI displays).
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, 3)  // cap at 3x for performance
}

/**
 * Check if device is mobile (for memory guards + UI adjustments).
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}
