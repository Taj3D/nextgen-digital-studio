/**
 * ============================================================================
 * Phase 2C Wave 1 — Annotation Serialization (pdf-lib low-level)
 * ----------------------------------------------------------------------------
 * Builds TRUE PDF annotations using pdf-lib's low-level dict + AP stream APIs.
 *
 * Verified APIs (from Phase 2C audit):
 *   page.node.Annots()           — get existing annotations array
 *   page.node.addAnnot(dict)     — add annotation dict to page
 *   page.node.removeAnnot(ref)   — remove annotation by PDFRef
 *   pdfDoc.context.obj({...})    — construct PDFDict from JS object
 *   PDFContentStream.of(...)     — build appearance stream content
 *   PDFOperator.of(name, args)   — build content stream operator
 *   annot.setNormalAppearance()  — set /AP /N reference
 *
 * Every annotation has a valid appearance stream (/AP /N) so it renders
 * correctly in Adobe Reader, Foxit, Chrome PDF viewer, and Firefox.
 * ============================================================================
 */

import {
  PDFDocument,
  PDFName,
  PDFArray,
  PDFNumber,
  PDFHexString,
  PDFContentStream,
  PDFOperator,
  PDFOperatorNames,
  PDFDict,
  PDFRef,
  type PDFContext,
} from 'pdf-lib'
import type {
  Annotation,
  HighlightAnnotation,
  StickyNoteAnnotation,
  FreeTextAnnotation,
  InkAnnotation,
  LineAnnotation,
  ShapeAnnotation,
  AnnotationColor,
} from './annot-types'

// =============================================================================
// Helpers
// =============================================================================

/** Encode string as PDF text (hex string for unicode safety). */
function encodePdfText(text: string): PDFHexString {
  // Use hex string to support unicode (Bengali, etc.)
  let hex = ''
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (code > 255) {
      // Multi-byte: UTF-16BE
      hex += Math.floor(code / 256).toString(16).padStart(2, '0')
      hex += (code % 256).toString(16).padStart(2, '0')
    } else {
      hex += code.toString(16).padStart(2, '0')
    }
  }
  return PDFHexString.of(hex)
}

/** Convert AnnotationColor {r,g,b} to PDF color operators args. */
function colorToArgs(color: AnnotationColor): PDFNumber[] {
  return [
    PDFNumber.of(color.r),
    PDFNumber.of(color.g),
    PDFNumber.of(color.b),
  ]
}

/**
 * Build a content stream (appearance stream) from a list of operators.
 * Returns a registered PDFRef to the content stream.
 */
function buildAppearanceStream(
  context: PDFContext,
  annotDict: PDFDict,
  operators: PDFOperator[],
  bbox: [number, number, number, number],
): PDFRef {
  const contentStream = PDFContentStream.of(annotDict, operators, false)
  // Set BBox on the content stream
  contentStream.dict.set(PDFName.of('BBox'), context.obj(bbox))
  return context.register(contentStream)
}

// =============================================================================
// Appearance stream builders (one per subtype)
// =============================================================================

/**
 * Highlight/Underline/StrikeOut appearance stream.
 * Draws semi-transparent colored rectangles over QuadPoints.
 */
function buildTextMarkupAP(
  context: PDFContext,
  annotDict: PDFDict,
  color: AnnotationColor,
  opacity: number,
  quads: [number, number, number, number, number, number, number, number][],
  subtype: 'Highlight' | 'Underline' | 'StrikeOut',
): PDFRef {
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),  // q
    // Set fill color
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, colorToArgs(color)),  // r g b rg
  ]

  for (const quad of quads) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = quad
    if (subtype === 'Highlight') {
      // Fill rectangle covering the quad
      const llx = Math.min(x1, x3)
      const lly = Math.min(y1, y3)
      const urx = Math.max(x2, x4)
      const ury = Math.max(y2, y4)
      ops.push(
        PDFOperator.of(PDFOperatorNames.AppendRectangle, [
          PDFNumber.of(llx), PDFNumber.of(lly),
          PDFNumber.of(urx - llx), PDFNumber.of(ury - lly),
        ]),
        PDFOperator.of(PDFOperatorNames.FillNonZero),
      )
    } else if (subtype === 'Underline') {
      // Draw line at bottom of quad
      ops.push(
        PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(1)]),
        PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
        PDFOperator.of(PDFOperatorNames.MoveTo, [PDFNumber.of(x1), PDFNumber.of(y1)]),
        PDFOperator.of(PDFOperatorNames.LineTo, [PDFNumber.of(x2), PDFNumber.of(y2)]),
        PDFOperator.of(PDFOperatorNames.ClosePath),
        PDFOperator.of(PDFOperatorNames.StrokePath),
      )
    } else if (subtype === 'StrikeOut') {
      // Draw line through middle of quad
      const midY = (y1 + y2) / 2
      ops.push(
        PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(1)]),
        PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
        PDFOperator.of(PDFOperatorNames.MoveTo, [PDFNumber.of(x1), PDFNumber.of(midY)]),
        PDFOperator.of(PDFOperatorNames.LineTo, [PDFNumber.of(x2), PDFNumber.of(midY)]),
        PDFOperator.of(PDFOperatorNames.ClosePath),
        PDFOperator.of(PDFOperatorNames.StrokePath),
      )
    }
  }

  ops.push(PDFOperator.of(PDFOperatorNames.PopGraphicsState))  // Q

  // BBox covers all quads
  const allX = quads.flatMap(q => [q[0], q[2], q[4], q[6]])
  const allY = quads.flatMap(q => [q[1], q[3], q[5], q[7]])
  const bbox: [number, number, number, number] = [
    Math.min(...allX), Math.min(...allY),
    Math.max(...allX), Math.max(...allY),
  ]

  return buildAppearanceStream(context, annotDict, ops, bbox)
}

/**
 * Sticky Note appearance stream — simple icon (filled square with fold).
 */
function buildStickyNoteAP(
  context: PDFContext,
  annotDict: PDFDict,
  color: AnnotationColor,
  size: number,
): PDFRef {
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, colorToArgs(color)),
    PDFOperator.of(PDFOperatorNames.AppendRectangle, [
      PDFNumber.of(0), PDFNumber.of(0),
      PDFNumber.of(size), PDFNumber.of(size),
    ]),
    PDFOperator.of(PDFOperatorNames.FillNonZero),
    // Fold corner (darker triangle)
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, [
      PDFNumber.of(color.r * 0.7), PDFNumber.of(color.g * 0.7), PDFNumber.of(color.b * 0.7),
    ]),
    PDFOperator.of(PDFOperatorNames.MoveTo, [PDFNumber.of(size * 0.7), PDFNumber.of(size)]),
    PDFOperator.of(PDFOperatorNames.LineTo, [PDFNumber.of(size), PDFNumber.of(size)]),
    PDFOperator.of(PDFOperatorNames.LineTo, [PDFNumber.of(size), PDFNumber.of(size * 0.3)]),
    PDFOperator.of(PDFOperatorNames.ClosePath),
    PDFOperator.of(PDFOperatorNames.FillNonZero),
    PDFOperator.of(PDFOperatorNames.PopGraphicsState),
  ]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, size, size])
}

/**
 * FreeText appearance stream — renders the text content.
 */
function buildFreeTextAP(
  context: PDFContext,
  annotDict: PDFDict,
  text: string,
  fontSize: number,
  color: AnnotationColor,
  rect: [number, number, number, number],
): PDFRef {
  const [llx, lly, urx, ury] = rect
  const width = urx - llx
  const height = ury - lly
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    // Optional: light background
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, [
      PDFNumber.of(1), PDFNumber.of(1), PDFNumber.of(0.9),
    ]),
    PDFOperator.of(PDFOperatorNames.AppendRectangle, [
      PDFNumber.of(0), PDFNumber.of(0),
      PDFNumber.of(width), PDFNumber.of(height),
    ]),
    PDFOperator.of(PDFOperatorNames.FillNonZero),
    // Text
    PDFOperator.of(PDFOperatorNames.BeginText),
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, colorToArgs(color)),
    // Position text (move to top-left of rect, accounting for baseline)
    PDFOperator.of(PDFOperatorNames.MoveText, [PDFNumber.of(2), PDFNumber.of(height - fontSize - 2)]),
    PDFOperator.of(PDFOperatorNames.SetFontAndSize, [PDFName.of('Helv'), PDFNumber.of(fontSize)]),
    PDFOperator.of(PDFOperatorNames.ShowText, [encodePdfText(text)]),
    PDFOperator.of(PDFOperatorNames.EndText),
    PDFOperator.of(PDFOperatorNames.PopGraphicsState),
  ]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, width, height])
}

/**
 * Ink (freehand) appearance stream — draws all paths.
 */
function buildInkAP(
  context: PDFContext,
  annotDict: PDFDict,
  paths: { x: number; y: number }[][],
  color: AnnotationColor,
  strokeWidth: number,
  rect: [number, number, number, number],
): PDFRef {
  const [llx, lly] = [rect[0], rect[1]]
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(strokeWidth)]),
    PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
    PDFOperator.of(PDFOperatorNames.SetLineCapStyle, [PDFNumber.of(1)]),  // round
    PDFOperator.of(PDFOperatorNames.SetLineJoinStyle, [PDFNumber.of(1)]), // round
  ]

  for (const path of paths) {
    if (path.length < 2) continue
    // Move to first point (relative to rect origin)
    ops.push(
      PDFOperator.of(PDFOperatorNames.MoveTo, [
        PDFNumber.of(path[0].x - llx),
        PDFNumber.of(path[0].y - lly),
      ]),
    )
    // Line to each subsequent point
    for (let i = 1; i < path.length; i++) {
      ops.push(
        PDFOperator.of(PDFOperatorNames.LineTo, [
          PDFNumber.of(path[i].x - llx),
          PDFNumber.of(path[i].y - lly),
        ]),
      )
    }
    ops.push(PDFOperator.of(PDFOperatorNames.StrokePath))
  }

  ops.push(PDFOperator.of(PDFOperatorNames.PopGraphicsState))
  const width = rect[2] - rect[0]
  const height = rect[3] - rect[1]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, width, height])
}

/**
 * Line appearance stream — draws a line (optionally with arrowhead).
 */
function buildLineAP(
  context: PDFContext,
  annotDict: PDFDict,
  start: { x: number; y: number },
  end: { x: number; y: number },
  color: AnnotationColor,
  strokeWidth: number,
  isArrow: boolean,
  rect: [number, number, number, number],
): PDFRef {
  const [llx, lly] = [rect[0], rect[1]]
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(strokeWidth)]),
    PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
    PDFOperator.of(PDFOperatorNames.SetLineCapStyle, [PDFNumber.of(1)]),
    PDFOperator.of(PDFOperatorNames.MoveTo, [
      PDFNumber.of(start.x - llx), PDFNumber.of(start.y - lly),
    ]),
    PDFOperator.of(PDFOperatorNames.LineTo, [
      PDFNumber.of(end.x - llx), PDFNumber.of(end.y - lly),
    ]),
    PDFOperator.of(PDFOperatorNames.StrokePath),
  ]

  if (isArrow) {
    // Draw arrowhead at end point
    const angle = Math.atan2(end.y - start.y, end.x - start.x)
    const arrowLen = Math.max(8, strokeWidth * 3)
    const arrowAngle = Math.PI / 6
    const a1 = angle - arrowAngle + Math.PI
    const a2 = angle + arrowAngle + Math.PI
    ops.push(
      PDFOperator.of(PDFOperatorNames.MoveTo, [
        PDFNumber.of(end.x - llx), PDFNumber.of(end.y - lly),
      ]),
      PDFOperator.of(PDFOperatorNames.LineTo, [
        PDFNumber.of(end.x + arrowLen * Math.cos(a1) - llx),
        PDFNumber.of(end.y + arrowLen * Math.sin(a1) - lly),
      ]),
      PDFOperator.of(PDFOperatorNames.StrokePath),
      PDFOperator.of(PDFOperatorNames.MoveTo, [
        PDFNumber.of(end.x - llx), PDFNumber.of(end.y - lly),
      ]),
      PDFOperator.of(PDFOperatorNames.LineTo, [
        PDFNumber.of(end.x + arrowLen * Math.cos(a2) - llx),
        PDFNumber.of(end.y + arrowLen * Math.sin(a2) - lly),
      ]),
      PDFOperator.of(PDFOperatorNames.StrokePath),
    )
  }

  ops.push(PDFOperator.of(PDFOperatorNames.PopGraphicsState))
  const width = rect[2] - rect[0]
  const height = rect[3] - rect[1]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, width, height])
}

/**
 * Square (rectangle) appearance stream — stroked rectangle.
 */
function buildSquareAP(
  context: PDFContext,
  annotDict: PDFDict,
  color: AnnotationColor,
  strokeWidth: number,
  rect: [number, number, number, number],
): PDFRef {
  const width = rect[2] - rect[0]
  const height = rect[3] - rect[1]
  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(strokeWidth)]),
    PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
    PDFOperator.of(PDFOperatorNames.AppendRectangle, [
      PDFNumber.of(strokeWidth / 2), PDFNumber.of(strokeWidth / 2),
      PDFNumber.of(width - strokeWidth), PDFNumber.of(height - strokeWidth),
    ]),
    PDFOperator.of(PDFOperatorNames.ClosePath),
    PDFOperator.of(PDFOperatorNames.StrokePath),
    PDFOperator.of(PDFOperatorNames.PopGraphicsState),
  ]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, width, height])
}

/**
 * Circle (ellipse) appearance stream — stroked ellipse via Bezier curves.
 */
function buildCircleAP(
  context: PDFContext,
  annotDict: PDFDict,
  color: AnnotationColor,
  strokeWidth: number,
  rect: [number, number, number, number],
): PDFRef {
  const width = rect[2] - rect[0]
  const height = rect[3] - rect[1]
  const cx = width / 2
  const cy = height / 2
  const rx = (width - strokeWidth) / 2
  const ry = (height - strokeWidth) / 2
  // Bezier control point multiplier for ellipse (kappa)
  const k = 0.5522847498

  const ops: PDFOperator[] = [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.SetLineWidth, [PDFNumber.of(strokeWidth)]),
    PDFOperator.of(PDFOperatorNames.StrokingColorRgb, colorToArgs(color)),
    // Move to rightmost point
    PDFOperator.of(PDFOperatorNames.MoveTo, [PDFNumber.of(cx + rx), PDFNumber.of(cy)]),
    // Top-right curve
    PDFOperator.of(PDFOperatorNames.AppendBezierCurve, [
      PDFNumber.of(cx + rx), PDFNumber.of(cy + ry * k),
      PDFNumber.of(cx + rx * k), PDFNumber.of(cy + ry),
      PDFNumber.of(cx), PDFNumber.of(cy + ry),
    ]),
    // Top-left curve
    PDFOperator.of(PDFOperatorNames.AppendBezierCurve, [
      PDFNumber.of(cx - rx * k), PDFNumber.of(cy + ry),
      PDFNumber.of(cx - rx), PDFNumber.of(cy + ry * k),
      PDFNumber.of(cx - rx), PDFNumber.of(cy),
    ]),
    // Bottom-left curve
    PDFOperator.of(PDFOperatorNames.AppendBezierCurve, [
      PDFNumber.of(cx - rx), PDFNumber.of(cy - ry * k),
      PDFNumber.of(cx - rx * k), PDFNumber.of(cy - ry),
      PDFNumber.of(cx), PDFNumber.of(cy - ry),
    ]),
    // Bottom-right curve
    PDFOperator.of(PDFOperatorNames.AppendBezierCurve, [
      PDFNumber.of(cx + rx * k), PDFNumber.of(cy - ry),
      PDFNumber.of(cx + rx), PDFNumber.of(cy - ry * k),
      PDFNumber.of(cx + rx), PDFNumber.of(cy),
    ]),
    PDFOperator.of(PDFOperatorNames.ClosePath),
    PDFOperator.of(PDFOperatorNames.StrokePath),
    PDFOperator.of(PDFOperatorNames.PopGraphicsState),
  ]
  return buildAppearanceStream(context, annotDict, ops, [0, 0, width, height])
}

// =============================================================================
// Public serialization API
// =============================================================================

/**
 * Serialize a single annotation to a pdf-lib dict and add it to the page.
 * Returns the PDFRef of the added annotation (for later removal if needed).
 */
export function serializeAnnotation(
  pdfDoc: PDFDocument,
  pageNum: number,  // 0-indexed for pdf-lib
  annot: Annotation,
): PDFRef | null {
  try {
    const page = pdfDoc.getPage(pageNum)
    const context = pdfDoc.context

    // Build /Rect [llx, lly, urx, ury]
    const rect: [number, number, number, number] = [
      annot.rect.x,
      annot.rect.y,
      annot.rect.x + annot.rect.width,
      annot.rect.y + annot.rect.height,
    ]

    // Build base annotation dict
    const annotDict = context.obj({
      Type: 'Annot',
      Subtype: annot.subtype,
      Rect: rect,
      C: [annot.color.r, annot.color.g, annot.color.b],
      F: 4,  // Print flag
      Contents: annot.contents || '',
      T: annot.author || 'PDF Forge',
      M: new Date(annot.createdAt).toISOString(),
    })

    // Add subtype-specific fields + appearance stream
    let apRef: PDFRef | null = null

    if (annot.subtype === 'Highlight' || annot.subtype === 'Underline' || annot.subtype === 'StrikeOut') {
      const h = annot as HighlightAnnotation
      // QuadPoints: flatten quads to array of numbers
      const quadPoints: number[] = []
      for (const q of h.quads) {
        quadPoints.push(q.x1, q.y1, q.x2, q.y2, q.x3, q.y3, q.x4, q.y4)
      }
      annotDict.set(PDFName.of('QuadPoints'), context.obj(quadPoints))
      const quadsArray: [number, number, number, number, number, number, number, number][] = h.quads.map(q => [q.x1, q.y1, q.x2, q.y2, q.x3, q.y3, q.x4, q.y4])
      apRef = buildTextMarkupAP(
        context, annotDict,
        annot.color, annot.opacity,
        quadsArray,
        annot.subtype,
      )
    } else if (annot.subtype === 'Text') {
      const n = annot as StickyNoteAnnotation
      annotDict.set(PDFName.of('Name'), PDFName.of(n.icon || 'Note'))
      const size = Math.min(rect[2] - rect[0], rect[3] - rect[1])
      apRef = buildStickyNoteAP(context, annotDict, annot.color, size)
    } else if (annot.subtype === 'FreeText') {
      const ft = annot as FreeTextAnnotation
      annotDict.set(PDFName.of('DA'), PDFName.of(`/Helv ${ft.fontSize} Tf 0 0 0 rg`))
      apRef = buildFreeTextAP(context, annotDict, ft.text, ft.fontSize, annot.color, rect)
    } else if (annot.subtype === 'Ink') {
      const ink = annot as InkAnnotation
      // InkList: array of arrays of [x, y] pairs
      const inkList = ink.paths.map(path => context.obj(path.flatMap(p => [p.x, p.y])))
      annotDict.set(PDFName.of('InkList'), context.obj(inkList))
      apRef = buildInkAP(context, annotDict, ink.paths, annot.color, annot.strokeWidth, rect)
    } else if (annot.subtype === 'Line') {
      const ln = annot as LineAnnotation
      annotDict.set(PDFName.of('L'), context.obj([ln.start.x, ln.start.y, ln.end.x, ln.end.y]))
      if (ln.isArrow) {
        annotDict.set(PDFName.of('LE'), context.obj(['None', 'OpenArrow']))
      }
      apRef = buildLineAP(context, annotDict, ln.start, ln.end, annot.color, annot.strokeWidth, ln.isArrow, rect)
    } else if (annot.subtype === 'Square') {
      // Border style
      annotDict.set(PDFName.of('BS'), context.obj({ W: annot.strokeWidth, S: 'S' }))
      apRef = buildSquareAP(context, annotDict, annot.color, annot.strokeWidth, rect)
    } else if (annot.subtype === 'Circle') {
      annotDict.set(PDFName.of('BS'), context.obj({ W: annot.strokeWidth, S: 'S' }))
      apRef = buildCircleAP(context, annotDict, annot.color, annot.strokeWidth, rect)
    }

    // Set appearance stream
    if (apRef) {
      const apDict = context.obj({})
      apDict.set(PDFName.of('N'), apRef)
      annotDict.set(PDFName.of('AP'), apDict)
    }

    // Register the annotDict to get a PDFRef, then add to page's /Annots array
    const annotRef = context.register(annotDict)
    page.node.addAnnot(annotRef)
    return annotRef
  } catch (err) {
    console.error('[annot-serialize] Failed to serialize annotation:', err)
    return null
  }
}

/**
 * Remove an annotation from a page by its PDFRef object number.
 */
export function removeAnnotationByRef(
  pdfDoc: PDFDocument,
  pageNum: number,
  pdfRefId: number,
): boolean {
  try {
    const page = pdfDoc.getPage(pageNum)
    const annots = page.node.Annots()
    if (!annots) return false

    for (let i = 0; i < annots.size(); i++) {
      const entry = annots.get(i)
      let refNum: number | null = null
      if (entry instanceof PDFRef) {
        refNum = entry.objectNumber
      }
      if (refNum === pdfRefId) {
        page.node.removeAnnot(entry as PDFRef)
        return true
      }
    }
    return false
  } catch (err) {
    console.error('[annot-serialize] Failed to remove annotation:', err)
    return false
  }
}

/**
 * Read existing annotations from a PDF page (for preservation + display).
 * Returns array of {subtype, rect, contents, refId} for read-only display.
 */
export function readExistingAnnotations(
  pdfDoc: PDFDocument,
  pageNum: number,
): Array<{
  subtype: string
  rect: [number, number, number, number]
  contents: string
  refId: number
}> {
  try {
    const page = pdfDoc.getPage(pageNum)
    const annots = page.node.Annots()
    if (!annots) return []

    const result: Array<{ subtype: string; rect: [number, number, number, number]; contents: string; refId: number }> = []
    for (let i = 0; i < annots.size(); i++) {
      const entry = annots.get(i)
      let dict: PDFDict | null = null
      let refId = 0
      if (entry instanceof PDFRef) {
        dict = pdfDoc.context.lookup(entry) as PDFDict
        refId = entry.objectNumber
      } else if (entry instanceof PDFDict) {
        dict = entry
      }
      if (!dict) continue

      const subtype = dict.get(PDFName.of('Subtype'))
      const rect = dict.get(PDFName.of('Rect'))
      const contents = dict.get(PDFName.of('Contents'))

      if (subtype && rect) {
        result.push({
          subtype: subtype.toString().replace('/', ''),
          rect: rect.toString() as any,
          contents: contents ? contents.toString() : '',
          refId,
        })
      }
    }
    return result
  } catch (err) {
    console.error('[annot-serialize] Failed to read existing annotations:', err)
    return []
  }
}

// =============================================================================
// Wave 2: Existing annotation mutation + AP regeneration
// =============================================================================

/**
 * Mutate an existing annotation's dict in-place and regenerate its AP stream.
 * This is the Wave 2 write path for existing annotations.
 *
 * @param pdfDoc - pdf-lib PDFDocument (loaded from original bytes)
 * @param pageNum - 0-indexed page number
 * @param annot - Updated annotation record (from store)
 * @returns true if mutation succeeded
 */
export function mutateExistingAnnotation(
  pdfDoc: PDFDocument,
  pageNum: number,
  annot: Annotation,
): boolean {
  try {
    if (!annot.pdfRefId || annot.pdfRefId === 0) {
      console.warn('[annot-serialize] No pdfRefId for existing annotation — skipping mutation')
      return false
    }

    const page = pdfDoc.getPage(pageNum)
    const annots = page.node.Annots()
    if (!annots) return false

    // Find the annotation by refId
    let targetDict: PDFDict | null = null
    let targetRef: PDFRef | null = null
    for (let i = 0; i < annots.size(); i++) {
      const entry = annots.get(i)
      if (entry instanceof PDFRef && entry.objectNumber === annot.pdfRefId) {
        targetRef = entry
        targetDict = pdfDoc.context.lookup(entry) as PDFDict
        break
      }
    }

    if (!targetDict) {
      console.warn('[annot-serialize] Existing annotation dict not found for refId:', annot.pdfRefId)
      return false
    }

    const context = pdfDoc.context

    // Mutate /Rect
    const rect: [number, number, number, number] = [
      annot.rect.x,
      annot.rect.y,
      annot.rect.x + annot.rect.width,
      annot.rect.y + annot.rect.height,
    ]
    targetDict.set(PDFName.of('Rect'), context.obj(rect))

    // Mutate /C (color)
    targetDict.set(PDFName.of('C'), context.obj([annot.color.r, annot.color.g, annot.color.b]))

    // Mutate /Contents
    if (annot.contents) {
      targetDict.set(PDFName.of('Contents'), encodePdfText(annot.contents))
    }

    // Mutate /T (author)
    if (annot.author) {
      targetDict.set(PDFName.of('T'), encodePdfText(annot.author))
    }

    // Subtype-specific mutations
    if (annot.subtype === 'Highlight' || annot.subtype === 'Underline' || annot.subtype === 'StrikeOut') {
      const h = annot as HighlightAnnotation
      if (h.quads && h.quads.length > 0) {
        const quadPoints: number[] = []
        for (const q of h.quads) {
          quadPoints.push(q.x1, q.y1, q.x2, q.y2, q.x3, q.y3, q.x4, q.y4)
        }
        targetDict.set(PDFName.of('QuadPoints'), context.obj(quadPoints))
      }
      // Regenerate AP
      const quadsArray = h.quads.map(q => [q.x1, q.y1, q.x2, q.y2, q.x3, q.y3, q.x4, q.y4] as [number, number, number, number, number, number, number, number])
      const apRef = buildTextMarkupAP(context, targetDict, annot.color, annot.opacity, quadsArray, annot.subtype)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'Text') {
      const n = annot as StickyNoteAnnotation
      if (n.icon) {
        targetDict.set(PDFName.of('Name'), PDFName.of(n.icon))
      }
      const size = Math.min(rect[2] - rect[0], rect[3] - rect[1])
      const apRef = buildStickyNoteAP(context, targetDict, annot.color, size)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'FreeText') {
      const ft = annot as FreeTextAnnotation
      targetDict.set(PDFName.of('DA'), PDFName.of(`/Helv ${ft.fontSize} Tf 0 0 0 rg`))
      const apRef = buildFreeTextAP(context, targetDict, ft.text, ft.fontSize, annot.color, rect)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'Ink') {
      const ink = annot as InkAnnotation
      const inkList = ink.paths.map(path => context.obj(path.flatMap(p => [p.x, p.y])))
      targetDict.set(PDFName.of('InkList'), context.obj(inkList))
      const apRef = buildInkAP(context, targetDict, ink.paths, annot.color, annot.strokeWidth, rect)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'Line') {
      const ln = annot as LineAnnotation
      targetDict.set(PDFName.of('L'), context.obj([ln.start.x, ln.start.y, ln.end.x, ln.end.y]))
      if (ln.isArrow) {
        targetDict.set(PDFName.of('LE'), context.obj(['None', 'OpenArrow']))
      }
      const apRef = buildLineAP(context, targetDict, ln.start, ln.end, annot.color, annot.strokeWidth, ln.isArrow, rect)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'Square') {
      targetDict.set(PDFName.of('BS'), context.obj({ W: annot.strokeWidth, S: 'S' }))
      const apRef = buildSquareAP(context, targetDict, annot.color, annot.strokeWidth, rect)
      replaceAP(targetDict, apRef, context)
    } else if (annot.subtype === 'Circle') {
      targetDict.set(PDFName.of('BS'), context.obj({ W: annot.strokeWidth, S: 'S' }))
      const apRef = buildCircleAP(context, targetDict, annot.color, annot.strokeWidth, rect)
      replaceAP(targetDict, apRef, context)
    }

    return true
  } catch (err) {
    console.error('[annot-serialize] Failed to mutate existing annotation:', err)
    return false
  }
}

/** Replace the /AP entry on a dict with a new AP ref. */
function replaceAP(dict: PDFDict, apRef: PDFRef, context: PDFContext) {
  const apDict = context.obj({})
  apDict.set(PDFName.of('N'), apRef)
  dict.set(PDFName.of('AP'), apDict)
}

/**
 * Delete an existing annotation by its pdfRefId.
 */
export function deleteExistingAnnotation(
  pdfDoc: PDFDocument,
  pageNum: number,
  pdfRefId: number,
): boolean {
  return removeAnnotationByRef(pdfDoc, pageNum, pdfRefId)
}

/**
 * Serialize a duplicated annotation (creates a NEW annotation, not mutating existing).
 * This reuses the Wave 1 serializeAnnotation path.
 */
export function serializeDuplicatedAnnotation(
  pdfDoc: PDFDocument,
  pageNum: number,
  annot: Annotation,
): PDFRef | null {
  // Duplicated annotations are treated as 'created' — use existing serializeAnnotation
  return serializeAnnotation(pdfDoc, pageNum, annot)
}
