'use client'

/**
 * ============================================================================
 * Phase 2C Wave 1 — SVG Annotation Overlay Renderer
 * ----------------------------------------------------------------------------
 * Renders all annotations for the current page as SVG elements.
 * Handles selection state, hover state, and click events.
 * ============================================================================
 */

import * as React from 'react'
import type { Annotation, HighlightAnnotation, StickyNoteAnnotation, FreeTextAnnotation, InkAnnotation, LineAnnotation, ShapeAnnotation } from './annot-types'
import type { PageViewport } from 'pdfjs-dist'
import { pdfRectToCssRect } from './annot-coords'

interface AnnotRenderProps {
  annotations: Annotation[]
  viewport: PageViewport
  selectedId: string | null
  onSelect: (id: string | null) => void
  onDelete?: (id: string, pageNum: number) => void
  isBn: boolean
  moveOffset?: { annotId: string; dx: number; dy: number } | null
}

export function AnnotRender({ annotations, viewport, selectedId, onSelect, isBn, moveOffset }: AnnotRenderProps) {
  if (!viewport || annotations.length === 0) return null

  return (
    <svg
      className="absolute inset-0"
      width={viewport.width}
      height={viewport.height}
      style={{ pointerEvents: 'none' }}
      aria-label={isBn ? 'অ্যানোটেশন স্তর' : 'Annotation layer'}
    >
      {annotations.map((annot) => (
        <AnnotElement
          key={annot.id}
          annot={annot}
          viewport={viewport}
          isSelected={selectedId === annot.id}
          onSelect={onSelect}
          isBn={isBn}
          moveOffset={moveOffset?.annotId === annot.id ? moveOffset : null}
        />
      ))}
    </svg>
  )
}

function AnnotElement({
  annot,
  viewport,
  isSelected,
  onSelect,
  isBn,
  moveOffset,
}: {
  annot: Annotation
  viewport: PageViewport
  isSelected: boolean
  onSelect: (id: string | null) => void
  isBn: boolean
  moveOffset?: { annotId: string; dx: number; dy: number } | null
}) {
  const cssRect = pdfRectToCssRect(viewport, [
    annot.rect.x,
    annot.rect.y,
    annot.rect.x + annot.rect.width,
    annot.rect.y + annot.rect.height,
  ])

  const fillColor = `rgb(${Math.round(annot.color.r * 255)}, ${Math.round(annot.color.g * 255)}, ${Math.round(annot.color.b * 255)})`
  const strokeColor = fillColor
  const opacity = annot.opacity ?? 0.5
  const strokeWidth = annot.strokeWidth ?? 2

  // Move transform for live drag preview (CSS pixel offset)
  const moveTransform = moveOffset ? `translate(${moveOffset.dx}px, ${moveOffset.dy}px)` : undefined

  // Selection highlight ring
  const selectionRing = isSelected ? (
    <rect
      x={cssRect.x - 4}
      y={cssRect.y - 4}
      width={cssRect.width + 8}
      height={cssRect.height + 8}
      fill="none"
      stroke="#3b82f6"
      strokeWidth={1.5}
      strokeDasharray="4 2"
      className="pointer-events-none"
    />
  ) : null

  const label = `${annot.subtype} - ${annot.contents || (isBn ? 'কোনো টেক্সট নেই' : 'no text')}`

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(annot.id)
  }

  switch (annot.subtype) {
    case 'Highlight':
    case 'Underline':
    case 'StrikeOut': {
      const h = annot as HighlightAnnotation
      // Render each quad as a rectangle
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          {h.quads.map((quad, i) => {
            const quadRect = pdfRectToCssRect(viewport, [
              Math.min(quad.x1, quad.x3),
              Math.min(quad.y1, quad.y3),
              Math.max(quad.x2, quad.x4),
              Math.max(quad.y2, quad.y4),
            ])
            if (annot.subtype === 'Highlight') {
              return (
                <rect
                  key={i}
                  x={quadRect.x}
                  y={quadRect.y}
                  width={quadRect.width}
                  height={quadRect.height}
                  fill={fillColor}
                  opacity={opacity}
                />
              )
            } else if (annot.subtype === 'Underline') {
              return (
                <line
                  key={i}
                  x1={quadRect.x}
                  y1={quadRect.y + quadRect.height - 1}
                  x2={quadRect.x + quadRect.width}
                  y2={quadRect.y + quadRect.height - 1}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                />
              )
            } else {
              // StrikeOut
              return (
                <line
                  key={i}
                  x1={quadRect.x}
                  y1={quadRect.y + quadRect.height / 2}
                  x2={quadRect.x + quadRect.width}
                  y2={quadRect.y + quadRect.height / 2}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                />
              )
            }
          })}
          {selectionRing}
        </g>
      )
    }

    case 'Text': {
      // Sticky note icon
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          <rect
            x={cssRect.x}
            y={cssRect.y}
            width={cssRect.width}
            height={cssRect.height}
            fill={fillColor}
            opacity={opacity}
            rx={2}
          />
          {/* Fold corner */}
          <polygon
            points={`${cssRect.x + cssRect.width * 0.7},${cssRect.y} ${cssRect.x + cssRect.width},${cssRect.y} ${cssRect.x + cssRect.width},${cssRect.y + cssRect.height * 0.3}`}
            fill={fillColor}
            opacity={opacity * 0.7}
          />
          {selectionRing}
        </g>
      )
    }

    case 'FreeText': {
      const ft = annot as FreeTextAnnotation
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          <rect
            x={cssRect.x}
            y={cssRect.y}
            width={cssRect.width}
            height={cssRect.height}
            fill="rgba(255, 255, 230, 0.9)"
            stroke={strokeColor}
            strokeWidth={1}
          />
          <text
            x={cssRect.x + 4}
            y={cssRect.y + ft.fontSize + 2}
            fill="rgb(0, 0, 0)"
            fontSize={ft.fontSize}
            fontFamily="sans-serif"
          >
            {ft.text.slice(0, 50)}
          </text>
          {selectionRing}
        </g>
      )
    }

    case 'Ink': {
      const ink = annot as InkAnnotation
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          {ink.paths.map((path, i) => {
            if (path.length < 2) return null
            const points = path.map(p => {
              const [cx, cy] = viewport.convertToViewportPoint(p.x, p.y)
              return `${cx},${cy}`
            }).join(' ')
            return (
              <polyline
                key={i}
                points={points}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={opacity}
              />
            )
          })}
          {selectionRing}
        </g>
      )
    }

    case 'Line': {
      const ln = annot as LineAnnotation
      const [sx, sy] = viewport.convertToViewportPoint(ln.start.x, ln.start.y)
      const [ex, ey] = viewport.convertToViewportPoint(ln.end.x, ln.end.y)
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          <line
            x1={sx}
            y1={sy}
            x2={ex}
            y2={ey}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={opacity}
          />
          {ln.isArrow && (
            <polygon
              points={getArrowPoints(sx, sy, ex, ey, strokeWidth)}
              fill={strokeColor}
              opacity={opacity}
            />
          )}
          {selectionRing}
        </g>
      )
    }

    case 'Square': {
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          <rect
            x={cssRect.x}
            y={cssRect.y}
            width={cssRect.width}
            height={cssRect.height}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
          {selectionRing}
        </g>
      )
    }

    case 'Circle': {
      return (
        <g key={annot.id} onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', transform: moveTransform }}>
          <title>{label}</title>
          <ellipse
            cx={cssRect.x + cssRect.width / 2}
            cy={cssRect.y + cssRect.height / 2}
            rx={cssRect.width / 2}
            ry={cssRect.height / 2}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
          {selectionRing}
        </g>
      )
    }

    default:
      return null
  }
}

/** Compute arrowhead polygon points. */
function getArrowPoints(sx: number, sy: number, ex: number, ey: number, strokeWidth: number): string {
  const angle = Math.atan2(ey - sy, ex - sx)
  const arrowLen = Math.max(8, strokeWidth * 3)
  const arrowAngle = Math.PI / 6
  const a1 = angle - arrowAngle + Math.PI
  const a2 = angle + arrowAngle + Math.PI
  const p1x = ex + arrowLen * Math.cos(a1)
  const p1y = ey + arrowLen * Math.sin(a1)
  const p2x = ex + arrowLen * Math.cos(a2)
  const p2y = ey + arrowLen * Math.sin(a2)
  return `${ex},${ey} ${p1x},${p1y} ${p2x},${p2y}`
}
