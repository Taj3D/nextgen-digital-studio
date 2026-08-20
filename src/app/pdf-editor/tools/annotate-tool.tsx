'use client'

/**
 * ============================================================================
 * Annotate PDF Tool — Phase 2C Wave 1
 * ----------------------------------------------------------------------------
 * Adds highlights, notes, and drawings to PDFs using TRUE PDF annotations.
 *
 * Architecture:
 *   - PDF.js: READ / DISPLAY / TEXT LAYER / COORDINATE CONTEXT (enableScripting: false)
 *   - pdf-lib: WRITE / SERIALIZE / SAVE (low-level dict + AP streams)
 *   - SVG overlay for in-app rendering
 *
 * Privacy: 100% client-side. PDF and annotations never leave the browser.
 * Security: enableScripting=false, no dangerouslySetInnerHTML, no eval.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib, type PdfDocument } from './pdfjs-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DialogFooter } from '@/components/ui/dialog'
import {
  ChevronLeft, ChevronRight, Loader2, AlertTriangle, CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import { PDFDocument } from 'pdf-lib'
import type { PdfTool } from '../pdf-tools'
import type { PageViewport } from 'pdfjs-dist'

import { useAnnotStore } from './annot/annot-store'
import { AnnotToolbar } from './annot/annot-toolbar'
import { AnnotRender } from './annot/annot-render'
import { AnnotPropertiesPanel } from './annot/annot-properties-panel'
import { AnnotList } from './annot/annot-list'
import {
  generateAnnotId, type Annotation, type ToolType, isProtected,
} from './annot/annot-types'
import {
  cssToPdf, cssRectToPdfRect, pdfRectToCssRect, getDevicePixelRatio, isMobile,
} from './annot/annot-coords'
import { serializeAnnotation, mutateExistingAnnotation, removeAnnotationByRef } from './annot/annot-serialize'
import { loadExistingAnnotations } from './annot/annot-load'

export function AnnotateTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pdfDoc, setPdfDoc] = React.useState<PdfDocument | null>(null)
  const [pageNum, setPageNum] = React.useState(1)
  const [numPages, setNumPages] = React.useState(0)
  const [viewport, setViewport] = React.useState<PageViewport | null>(null)
  const [rendering, setRendering] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [originalBytes, setOriginalBytes] = React.useState<Uint8Array | null>(null)
  const [textLayer, setTextLayer] = React.useState<HTMLElement | null>(null)
  const [hasExistingAnnots, setHasExistingAnnots] = React.useState(false)
  const [dragState, setDragState] = React.useState<{
    isDragging: boolean
    startX: number
    startY: number
    currentX: number
    currentY: number
  } | null>(null)
  const [inkPath, setInkPath] = React.useState<{ x: number; y: number }[] | null>(null)
  const [noteInput, setNoteInput] = React.useState<{ x: number; y: number; type: 'note' | 'text' } | null>(null)
  const [noteText, setNoteText] = React.useState('')
  // Move state for drag-to-move in Select mode
  const [moveState, setMoveState] = React.useState<{
    annotId: string
    startCssX: number
    startCssY: number
    originalAnnot: Annotation
  } | null>(null)
  const [moveDelta, setMoveDelta] = React.useState<{ dx: number; dy: number } | null>(null)
  const moveRafRef = React.useRef<number | null>(null)

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const renderTaskRef = React.useRef<{ cancel: () => void } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  // Store access
  const activeTool = useAnnotStore(s => s.activeTool)
  const properties = useAnnotStore(s => s.properties)
  const annotations = useAnnotStore(s => s.annotations)
  const selectedAnnotId = useAnnotStore(s => s.selectedAnnotId)
  const addAnnotation = useAnnotStore(s => s.addAnnotation)
  const deleteAnnotation = useAnnotStore(s => s.deleteAnnotation)
  const moveAnnotation = useAnnotStore(s => s.moveAnnotation)
  const selectAnnotation = useAnnotStore(s => s.selectAnnotation)
  // Wave 2: new store actions
  const loadExisting = useAnnotStore(s => s.loadExistingAnnotations)
  const editAnnotation = useAnnotStore(s => s.editAnnotation)
  const resizeAnnotation = useAnnotStore(s => s.resizeAnnotation)
  const duplicateAnnotation = useAnnotStore(s => s.duplicateAnnotation)
  const undo = useAnnotStore(s => s.undo)
  const redo = useAnnotStore(s => s.redo)
  const undoStack = useAnnotStore(s => s.undoStack)
  const redoStack = useAnnotStore(s => s.redoStack)
  const clearAll = useAnnotStore(s => s.clearAll)
  const getAnnotationCount = useAnnotStore(s => s.getAnnotationCount)

  const totalCount = getAnnotationCount()
  const pageAnnots = annotations[pageNum] || []

  // Load PDF when file changes
  React.useEffect(() => {
    if (!open || files.length === 0) {
      setPdfDoc(null)
      setNumPages(0)
      setPageNum(1)
      setOriginalBytes(null)
      clearAll()
      return
    }

    let loadingTask: ReturnType<typeof pdfjsLib.getDocument> | null = null
    let cancelled = false

    const loadPdf = async () => {
      setLoading(true)
      try {
        const arrayBuffer = await files[0].arrayBuffer()
        // Clone the ArrayBuffer for pdf-lib (pdfjs transfers/detaches the buffer it receives)
        const bytesForPdfLib = new Uint8Array(arrayBuffer.slice(0))
        setOriginalBytes(bytesForPdfLib)

        // Pass a separate copy to pdfjs (it may detach this one)
        const bytesForPdfjs = new Uint8Array(arrayBuffer.slice(0))
        loadingTask = pdfjsLib.getDocument({
          data: bytesForPdfjs,
          disableAutoFetch: true,
          disableStream: false,
          // @ts-ignore — enableScripting is a valid DocumentInitParameters option
          enableScripting: false,  // SECURITY: never execute PDF JavaScript
        } as any)
        const doc = await loadingTask.promise
        if (cancelled) {
          try { doc.cleanup(); } catch {}
          try { doc.loadingTask.destroy(); } catch {}
          return
        }
        setPdfDoc(doc)
        setNumPages(doc.numPages)
        setPageNum(1)
        clearAll()

        // Wave 2: Load existing annotations into store for editing
        try {
          // Load the original bytes into pdf-lib for annotation reading
          const pdfLibDoc = await PDFDocument.load(bytesForPdfLib, { ignoreEncryption: true })
          const existingAnnots = await loadExistingAnnotations(doc, pdfLibDoc)
          const totalExisting = Object.values(existingAnnots).reduce((sum, arr) => sum + arr.length, 0)
          setHasExistingAnnots(totalExisting > 0)
          if (totalExisting > 0) {
            loadExisting(existingAnnots)
            toast.info(isBn
              ? `বিদ্যমান অ্যানোটেশন লোড হয়েছে (${totalExisting}টি)।`
              : `Loaded ${totalExisting} existing annotation${totalExisting !== 1 ? 's' : ''}.`)
          }
        } catch (err) {
          console.error('[Annotate] Failed to load existing annotations:', err)
        }
      } catch (err) {
        console.error('[Annotate] Load failed:', err)
        toast.error(isBn
          ? 'পিডিএফ লোড ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Failed to load PDF — file may be corrupt or encrypted.')
      } finally {
        setLoading(false)
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      if (loadingTask) loadingTask.destroy?.()
      if (pdfDoc) {
        try { pdfDoc.cleanup(); } catch {}
        try { pdfDoc.loadingTask.destroy(); } catch {}
      }
    }
  }, [files, open])

  // Render current page
  React.useEffect(() => {
    if (!pdfDoc || pageNum < 1 || pageNum > numPages) return

    let cancelled = false

    const renderPage = async () => {
      setRendering(true)
      try {
        // Wait for canvas to mount (it's conditionally rendered when pdfDoc is set)
        await new Promise(resolve => setTimeout(resolve, 50))
        if (cancelled) return

        const page = await pdfDoc.getPage(pageNum)
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        const dpr = getDevicePixelRatio()
        // Calculate responsive scale: fit canvas within dialog container width
        const container = containerRef.current
        const availableWidth = container ? container.clientWidth - 32 : 500  // minus padding
        const pageBase = page.getViewport({ scale: 1 })
        const fitScale = Math.min(availableWidth / pageBase.width, 1.5)  // cap at 1.5x
        const baseScale = isMobile() ? Math.min(fitScale, 1.0) : Math.max(fitScale, 0.75)
        const viewport = page.getViewport({ scale: baseScale })
        const cssViewport = page.getViewport({ scale: baseScale })  // CSS-scaled viewport

        canvas.width = viewport.width * dpr
        canvas.height = viewport.height * dpr
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        canvas.style.maxWidth = '100%'
        context.scale(dpr, dpr)

        if (renderTaskRef.current) {
          try { renderTaskRef.current.cancel(); } catch {}
        }

        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
          // @ts-ignore — enableScripting is a valid render param
          enableScripting: false,
        })
        renderTaskRef.current = renderTask
        await renderTask.promise

        if (!cancelled) {
          setViewport(cssViewport)

          // Build text layer for highlight/underline/strike selection
          try {
            const textContent = await page.getTextContent()
            const textLayerDiv = document.createElement('div')
            textLayerDiv.className = 'textLayer'
            textLayerDiv.style.position = 'absolute'
            textLayerDiv.style.left = '0'
            textLayerDiv.style.top = '0'
            textLayerDiv.style.width = `${viewport.width}px`
            textLayerDiv.style.height = `${viewport.height}px`
            textLayerDiv.style.pointerEvents = 'auto'

            // Render text items as positioned spans
            textContent.items.forEach((item: any) => {
              if (!('str' in item)) return
              const tx = item.transform
              const span = document.createElement('span')
              span.textContent = item.str
              span.style.position = 'absolute'
              span.style.left = `${tx[4]}px`
              span.style.top = `${viewport.height - tx[5]}px`
              span.style.fontSize = `${item.height || 12}px`
              span.style.fontFamily = 'sans-serif'
              span.style.color = 'transparent'
              span.style.userSelect = 'text'
              textLayerDiv.appendChild(span)
            })
            setTextLayer(textLayerDiv)
          } catch {}
        }
      } catch (err) {
        if (!cancelled) console.error('[Annotate] Render failed:', err)
      } finally {
        if (!cancelled) setRendering(false)
      }
    }

    renderPage()

    return () => {
      cancelled = true
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
        renderTaskRef.current = null
      }
    }
  }, [pdfDoc, pageNum, numPages])

  // Cleanup on unmount
  React.useEffect(() => {
    if (!open && pdfDoc) {
      try { pdfDoc.cleanup(); } catch {}
      try { pdfDoc.loadingTask.destroy(); } catch {}
      setPdfDoc(null)
      clearAll()
    }
  }, [open, pdfDoc, clearAll])

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault()
        redo()
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedAnnotId) {
          e.preventDefault()
          deleteAnnotation(selectedAnnotId, pageNum)
        }
      } else if (e.key === 'Escape') {
        if (noteInput) {
          setNoteInput(null)
          setNoteText('')
        } else if (dragState) {
          setDragState(null)
        } else if (inkPath) {
          setInkPath(null)
        } else {
          selectAnnotation(null)
        }
      } else {
        // Tool shortcuts
        const shortcuts: Record<string, ToolType> = {
          v: 'select', h: 'highlight', u: 'underline', s: 'strike',
          n: 'note', t: 'text', d: 'draw', l: 'line', a: 'arrow',
          r: 'rectangle', c: 'circle',
        }
        const tool = shortcuts[e.key.toLowerCase()]
        if (tool) {
          e.preventDefault()
          useAnnotStore.getState().setTool(tool)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, undo, redo, selectedAnnotId, deleteAnnotation, pageNum, selectAnnotation, noteInput, dragState, inkPath])

  // Pointer handlers for drawing
  const getCanvasPoint = (e: React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    // Account for potential CSS scaling (maxWidth: 100% may shrink the canvas)
    const scaleX = viewport ? viewport.width / rect.width : 1
    const scaleY = viewport ? viewport.height / rect.height : 1
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!viewport) return
    const pt = getCanvasPoint(e)

    // MOVE MODE: In Select mode, if clicking on the selected annotation, start drag-to-move
    if (activeTool === 'select' && selectedAnnotId) {
      const selected = pageAnnots.find(a => a.id === selectedAnnotId)
      if (selected) {
        // Check if pointer is within the annotation's CSS bounds
        const cssRect = pdfRectToCssRect(viewport, [
          selected.rect.x,
          selected.rect.y,
          selected.rect.x + selected.rect.width,
          selected.rect.y + selected.rect.height,
        ])
        // Add 6px padding for easier grabbing (especially for thin lines/strokes)
        const padding = 8
        if (pt.x >= cssRect.x - padding && pt.x <= cssRect.x + cssRect.width + padding &&
            pt.y >= cssRect.y - padding && pt.y <= cssRect.y + cssRect.height + padding) {
          // Start move
          setMoveState({
            annotId: selectedAnnotId,
            startCssX: pt.x,
            startCssY: pt.y,
            originalAnnot: JSON.parse(JSON.stringify(selected)) as Annotation,
          })
          setMoveDelta({ dx: 0, dy: 0 })
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          return
        }
      }
    }

    // Drawing mode: return early if in select mode (no annotation was hit for move)
    if (activeTool === 'select') return

    if (activeTool === 'note' || activeTool === 'text') {
      setNoteInput({ x: pt.x, y: pt.y, type: activeTool })
      setNoteText('')
      return
    }

    if (activeTool === 'draw') {
      setInkPath([{ x: pt.x, y: pt.y }])
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      return
    }

    if (['line', 'arrow', 'rectangle', 'circle'].includes(activeTool)) {
      setDragState({
        isDragging: true,
        startX: pt.x,
        startY: pt.y,
        currentX: pt.x,
        currentY: pt.y,
      })
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!viewport) return
    const pt = getCanvasPoint(e)

    // MOVE MODE: update delta using requestAnimationFrame for smoothness
    if (moveState) {
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current)
      moveRafRef.current = requestAnimationFrame(() => {
        setMoveDelta({
          dx: pt.x - moveState.startCssX,
          dy: pt.y - moveState.startCssY,
        })
      })
      return
    }

    if (inkPath) {
      // Throttle: only add point if moved > 1px
      const last = inkPath[inkPath.length - 1]
      if (Math.abs(pt.x - last.x) > 1 || Math.abs(pt.y - last.y) > 1) {
        if (inkPath.length < 2000) {
          setInkPath([...inkPath, pt])
        }
      }
      return
    }

    if (dragState) {
      setDragState({ ...dragState, currentX: pt.x, currentY: pt.y })
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!viewport) return

    // MOVE MODE: commit the move with one undo command
    if (moveState && moveDelta) {
      const { annotId, originalAnnot } = moveState
      // Convert CSS delta to PDF delta
      const [pdfDx, pdfDy] = cssToPdf(viewport, moveDelta.dx, moveDelta.dy)
      // Calculate the zero-delta in PDF coords (to get just the delta)
      const [pdfZeroX, pdfZeroY] = cssToPdf(viewport, 0, 0)
      const realDx = pdfDx - pdfZeroX
      const realDy = pdfDy - pdfZeroY

      // Compute new rect
      const newRect = {
        x: originalAnnot.rect.x + realDx,
        y: originalAnnot.rect.y + realDy,
        width: originalAnnot.rect.width,
        height: originalAnnot.rect.height,
      }

      // For Line/Arrow, also update start/end points
      if (originalAnnot.subtype === 'Line') {
        const ln = originalAnnot as any
        const updatedAnnot = {
          ...originalAnnot,
          rect: newRect,
          start: { x: ln.start.x + realDx, y: ln.start.y + realDy },
          end: { x: ln.end.x + realDx, y: ln.end.y + realDy },
        } as Annotation
        moveAnnotation(annotId, pageNum, newRect)
        // Also update start/end via updateAnnotation
        useAnnotStore.getState().updateAnnotation(annotId, pageNum, {
          start: { x: ln.start.x + realDx, y: ln.start.y + realDy },
          end: { x: ln.end.x + realDx, y: ln.end.y + realDy },
        } as any)
      } else if (originalAnnot.subtype === 'Ink') {
        // For Ink, translate all paths
        const ink = originalAnnot as any
        const newPaths = ink.paths.map((path: { x: number; y: number }[]) =>
          path.map(p => ({ x: p.x + realDx, y: p.y + realDy }))
        )
        moveAnnotation(annotId, pageNum, newRect)
        useAnnotStore.getState().updateAnnotation(annotId, pageNum, { paths: newPaths } as any)
      } else {
        // Rectangle, Circle, Sticky Note, FreeText, Highlight, etc.
        moveAnnotation(annotId, pageNum, newRect)
      }

      setMoveState(null)
      setMoveDelta(null)
      if (moveRafRef.current) {
        cancelAnimationFrame(moveRafRef.current)
        moveRafRef.current = null
      }
      return
    }

    if (inkPath && inkPath.length > 1) {
      // Convert CSS points to PDF coords
      const pdfPaths = [{
        x: 0, y: 0,
      }]
      // Actually convert each point
      const pdfPoints = inkPath.map(p => {
        const [px, py] = cssToPdf(viewport, p.x, p.y)
        return { x: px, y: py }
      })

      // Compute bounding rect
      const xs = pdfPoints.map(p => p.x)
      const ys = pdfPoints.map(p => p.y)
      const minX = Math.min(...xs), maxX = Math.max(...xs)
      const minY = Math.min(...ys), maxY = Math.max(...ys)

      const annot: Annotation = {
        id: generateAnnotId(),
        subtype: 'Ink',
        pageNum,
        rect: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
        color: properties.color,
        opacity: properties.opacity,
        strokeWidth: properties.strokeWidth,
        contents: '',
        author: 'PDF Forge',
        createdAt: Date.now(),
        paths: [pdfPoints],
      } as any
      addAnnotation(annot)
      setInkPath(null)
      return
    }

    if (dragState) {
      const dx = Math.abs(dragState.currentX - dragState.startX)
      const dy = Math.abs(dragState.currentY - dragState.startY)
      if (dx < 4 && dy < 4) {
        setDragState(null)
        return
      }

      const pdfRect = cssRectToPdfRect(
        viewport,
        Math.min(dragState.startX, dragState.currentX),
        Math.min(dragState.startY, dragState.currentY),
        dx, dy,
      )

      const baseAnnot = {
        id: generateAnnotId(),
        pageNum,
        rect: { x: pdfRect[0], y: pdfRect[1], width: pdfRect[2] - pdfRect[0], height: pdfRect[3] - pdfRect[1] },
        color: properties.color,
        opacity: properties.opacity,
        strokeWidth: properties.strokeWidth,
        contents: '',
        author: 'PDF Forge',
        createdAt: Date.now(),
      }

      let annot: Annotation
      if (activeTool === 'line' || activeTool === 'arrow') {
        const [sx, sy] = cssToPdf(viewport, dragState.startX, dragState.startY)
        const [ex, ey] = cssToPdf(viewport, dragState.currentX, dragState.currentY)
        annot = {
          ...baseAnnot,
          subtype: 'Line',
          start: { x: sx, y: sy },
          end: { x: ex, y: ey },
          isArrow: activeTool === 'arrow',
        } as any
      } else if (activeTool === 'rectangle') {
        annot = { ...baseAnnot, subtype: 'Square' } as any
      } else if (activeTool === 'circle') {
        annot = { ...baseAnnot, subtype: 'Circle' } as any
      } else {
        setDragState(null)
        return
      }
      addAnnotation(annot)
      setDragState(null)
    }
  }

  // Handle text selection for highlight/underline/strike
  const handleTextSelection = React.useCallback(() => {
    if (!viewport) return
    if (!['highlight', 'underline', 'strike'].includes(activeTool)) return

    const selection = window.getSelection()
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const rects = range.getClientRects()
    if (rects.length === 0) return

    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    // Convert each selection rect to PDF quad
    const quads: Array<{x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; x4: number; y4: number}> = []
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i]
      const cssX = r.left - containerRect.left
      const cssY = r.top - containerRect.top
      const cssW = r.width
      const cssH = r.height
      const [x1, y1] = cssToPdf(viewport, cssX, cssY + cssH)
      const [x2, y2] = cssToPdf(viewport, cssX + cssW, cssY + cssH)
      quads.push({ x1, y1, x2, y2, x3: x1, y3: y1, x4: x2, y4: y2 })
    }

    // Compute bounding rect
    const allX = quads.flatMap(q => [q.x1, q.x2])
    const allY = quads.flatMap(q => [q.y1, q.y2])
    const minX = Math.min(...allX), maxX = Math.max(...allX)
    const minY = Math.min(...allY), maxY = Math.max(...allY)

    const subtype = activeTool === 'highlight' ? 'Highlight' : activeTool === 'underline' ? 'Underline' : 'StrikeOut'
    const annot: Annotation = {
      id: generateAnnotId(),
      subtype: subtype as any,
      pageNum,
      rect: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
      color: properties.color,
      opacity: properties.opacity,
      strokeWidth: properties.strokeWidth,
      contents: selection.toString().slice(0, 200),
      author: 'PDF Forge',
      createdAt: Date.now(),
      quads,
    } as any

    addAnnotation(annot)
    selection.removeAllRanges()
  }, [viewport, activeTool, properties, pageNum, addAnnotation])

  // Save annotations to PDF (Wave 2: handles existing + created annotations)
  const handleSave = async () => {
    if (!originalBytes || files.length === 0) return
    setSaving(true)
    try {
      // Re-read the original file to get fresh bytes (pdfjs may have detached the buffer)
      const freshBytes = await files[0].arrayBuffer()
      const pdfLibDoc = await PDFDocument.load(freshBytes, { ignoreEncryption: true })

      // Wave 2: Process annotations based on origin + dirty state
      const allAnnots = useAnnotStore.getState().getAllAnnotations()
      let savedCount = 0
      let mutatedCount = 0

      for (const annot of allAnnots) {
        if (annot.origin === 'existing') {
          // Existing annotation
          if (annot.dirty) {
            // Mutate existing dict in-place + regenerate AP
            const ok = mutateExistingAnnotation(pdfLibDoc, annot.pageNum - 1, annot)
            if (ok) mutatedCount++
          }
          // If not dirty, do nothing — preserve as-is
        } else {
          // Created annotation — use Wave 1 serializeAnnotation (adds new /Annots entry)
          const ref = serializeAnnotation(pdfLibDoc, annot.pageNum - 1, annot)
          if (ref) savedCount++
        }
      }

      // Save and validate
      const pdfBytes = await pdfLibDoc.save({ useObjectStreams: false })

      // Validate: reopen to confirm structure
      await PDFDocument.load(pdfBytes)

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-annotated.pdf'
      await downloadValidatedPdf(pdfBytes, filename)

      const totalSaved = savedCount + mutatedCount
      toast.success(isBn
        ? `${bn(totalSaved)}টি অ্যানোটেশন সেভ হয়েছে${mutatedCount > 0 ? ` (${bn(mutatedCount)}টি সম্পাদিত)` : ''}।`
        : `${totalSaved} annotation${totalSaved !== 1 ? 's' : ''} saved${mutatedCount > 0 ? ` (${mutatedCount} edited)` : ''}.`)
    } catch (err) {
      console.error('[Annotate] Save failed:', err)
      toast.error(isBn
        ? 'সেভ ব্যর্থ — আবার চেষ্টা করুন।'
        : 'Save failed — please try again.')
    } finally {
      setSaving(false)
    }
  }

  const goPrev = () => pageNum > 1 && setPageNum(pageNum - 1)
  const goNext = () => pageNum < numPages && setPageNum(pageNum + 1)

  const handleNoteSubmit = () => {
    if (!viewport || !noteInput || !noteText.trim()) {
      setNoteInput(null)
      setNoteText('')
      return
    }

    const [pdfX, pdfY] = cssToPdf(viewport, noteInput.x, noteInput.y)
    const size = 24

    if (noteInput.type === 'note') {
      const annot: Annotation = {
        id: generateAnnotId(),
        subtype: 'Text',
        pageNum,
        rect: { x: pdfX, y: pdfY - size, width: size, height: size },
        color: properties.color,
        opacity: properties.opacity,
        strokeWidth: properties.strokeWidth,
        contents: noteText,
        author: 'PDF Forge',
        createdAt: Date.now(),
        icon: 'Note',
      } as any
      addAnnotation(annot)
    } else {
      // FreeText
      const width = Math.max(100, noteText.length * 7)
      const height = 30
      const annot: Annotation = {
        id: generateAnnotId(),
        subtype: 'FreeText',
        pageNum,
        rect: { x: pdfX, y: pdfY - height, width, height },
        color: properties.color,
        opacity: properties.opacity,
        strokeWidth: properties.strokeWidth,
        contents: noteText,
        author: 'PDF Forge',
        createdAt: Date.now(),
        fontSize: 12,
        text: noteText,
      } as any
      addAnnotation(annot)
    }
    setNoteInput(null)
    setNoteText('')
  }

  // Drag preview overlay
  const dragPreview = dragState ? (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={viewport?.width || 0}
      height={viewport?.height || 0}
    >
      {activeTool === 'rectangle' && (
        <rect
          x={Math.min(dragState.startX, dragState.currentX)}
          y={Math.min(dragState.startY, dragState.currentY)}
          width={Math.abs(dragState.currentX - dragState.startX)}
          height={Math.abs(dragState.currentY - dragState.startY)}
          fill="none"
          stroke={`rgb(${properties.color.r * 255}, ${properties.color.g * 255}, ${properties.color.b * 255})`}
          strokeWidth={properties.strokeWidth}
          opacity={properties.opacity}
        />
      )}
      {activeTool === 'circle' && (
        <ellipse
          cx={(dragState.startX + dragState.currentX) / 2}
          cy={(dragState.startY + dragState.currentY) / 2}
          rx={Math.abs(dragState.currentX - dragState.startX) / 2}
          ry={Math.abs(dragState.currentY - dragState.startY) / 2}
          fill="none"
          stroke={`rgb(${properties.color.r * 255}, ${properties.color.g * 255}, ${properties.color.b * 255})`}
          strokeWidth={properties.strokeWidth}
          opacity={properties.opacity}
        />
      )}
      {(activeTool === 'line' || activeTool === 'arrow') && (
        <g>
          <line
            x1={dragState.startX}
            y1={dragState.startY}
            x2={dragState.currentX}
            y2={dragState.currentY}
            stroke={`rgb(${properties.color.r * 255}, ${properties.color.g * 255}, ${properties.color.b * 255})`}
            strokeWidth={properties.strokeWidth}
            opacity={properties.opacity}
          />
        </g>
      )}
    </svg>
  ) : null

  const inkPreview = inkPath && inkPath.length > 1 ? (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={viewport?.width || 0}
      height={viewport?.height || 0}
    >
      <polyline
        points={inkPath.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke={`rgb(${properties.color.r * 255}, ${properties.color.g * 255}, ${properties.color.b * 255})`}
        strokeWidth={properties.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={properties.opacity}
      />
    </svg>
  ) : null

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-3">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {pdfDoc && !loading && (
          <>
            <AnnotToolbar
              isBn={isBn}
              onUndo={undo}
              onRedo={redo}
              onDelete={() => selectedAnnotId && deleteAnnotation(selectedAnnotId, pageNum)}
              onSave={handleSave}
              canUndo={undoStack.length > 0}
              canRedo={redoStack.length > 0}
              canDelete={!!selectedAnnotId}
              isSaving={saving}
              totalCount={totalCount}
            />

            {/* Honest disclaimers */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2">
              <div className="flex gap-2">
                <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  {isBn
                    ? 'অ্যানোটেশন সম্পূর্ণ আপনার ব্রাউজারে প্রসেস হয়। বিদ্যমান অ্যানোটেশন সংরক্ষিত থাকবে।'
                    : 'Annotations processed entirely in your browser. Existing annotations are preserved.'}
                </p>
              </div>
            </div>

            {/* Canvas viewport */}
            <div
              ref={containerRef}
              className="relative overflow-auto rounded-lg border border-border/60 bg-muted/20"
              style={{ maxHeight: '250px', touchAction: activeTool === 'draw' ? 'none' : 'auto' }}
              onMouseUp={handleTextSelection}
            >
              <div className="relative inline-block">
                <canvas
                  ref={canvasRef}
                  className="block"
                  aria-label={`${isBn ? 'পেজ' : 'Page'} ${bn(pageNum)} ${isBn ? 'এর' : 'of'} ${bn(numPages)}`}
                />

                {/* Text layer for highlight/underline/strike selection */}
                {viewport && textLayer && (
                  <div
                    ref={(el) => {
                      if (el && textLayer && !el.contains(textLayer)) {
                        el.innerHTML = ''
                        el.appendChild(textLayer)
                      }
                    }}
                    className="absolute inset-0"
                    style={{ width: viewport.width, height: viewport.height, pointerEvents: 'none' }}
                  />
                )}

                {/* SVG annotation overlay */}
                {viewport && (
                  <div
                    className="absolute inset-0"
                    style={{ width: viewport.width, height: viewport.height }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  >
                    <AnnotRender
                      annotations={pageAnnots}
                      viewport={viewport}
                      selectedId={selectedAnnotId}
                      onSelect={selectAnnotation}
                      isBn={isBn}
                      moveOffset={moveState && moveDelta ? { annotId: moveState.annotId, dx: moveDelta.dx, dy: moveDelta.dy } : null}
                    />
                    {dragPreview}
                    {inkPreview}
                  </div>
                )}

                {/* Note input popover */}
                {noteInput && (
                  <div
                    className="absolute z-10 bg-background border rounded-lg shadow-lg p-2"
                    style={{ left: noteInput.x, top: noteInput.y }}
                  >
                    <textarea
                      autoFocus
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleNoteSubmit()
                        }
                      }}
                      placeholder={noteInput.type === 'note'
                        ? (isBn ? 'নোট টেক্সট...' : 'Note text...')
                        : (isBn ? 'কমেন্ট টেক্সট...' : 'Comment text...')}
                      className="w-48 h-20 p-2 text-xs border rounded resize-none"
                    />
                    <div className="flex gap-1 mt-1">
                      <Button size="sm" className="h-8 text-xs" onClick={handleNoteSubmit}>
                        {isBn ? 'যোগ করুন' : 'Add'}
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => { setNoteInput(null); setNoteText('') }}>
                        {isBn ? 'বাতিল' : 'Cancel'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {rendering && (
              <p className="text-center text-xs text-muted-foreground">
                {isBn ? 'রেন্ডার হচ্ছে…' : 'Rendering…'}
              </p>
            )}

            {/* Page navigation */}
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="sm" onClick={goPrev} disabled={pageNum <= 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[80px] text-center text-sm font-medium">
                {bn(pageNum)} / {bn(numPages)}
              </span>
              <Button variant="outline" size="sm" onClick={goNext} disabled={pageNum >= numPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Existing annotations indicator */}
            {hasExistingAnnots && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span>{isBn ? 'বিদ্যমান অ্যানোটেশন লোড ও সম্পাদনযোগ্য' : 'Existing annotations loaded and editable'}</span>
              </div>
            )}

            {/* Wave 2: Properties Panel (context-aware) */}
            {selectedAnnotId && (
              <AnnotPropertiesPanel
                annotation={pageAnnots.find(a => a.id === selectedAnnotId) || Object.values(annotations).flat().find(a => a.id === selectedAnnotId) || null}
                isBn={isBn}
                onDuplicate={(id, pn) => duplicateAnnotation(id, pn)}
                onDelete={(id, pn) => {
                  const annot = Object.values(annotations).flat().find(a => a.id === id)
                  if (annot && isProtected(annot.subtype)) {
                    toast.error(isBn ? 'এই অ্যানোটেশন ডিলিট করা যায় না' : 'Cannot delete this annotation type')
                    return
                  }
                  deleteAnnotation(id, pn)
                }}
              />
            )}

            {/* Wave 2: Annotation List */}
            <AnnotList
              annotations={Object.values(annotations).flat()}
              selectedId={selectedAnnotId}
              onSelect={(id, pn) => {
                selectAnnotation(id)
                if (pn !== pageNum) setPageNum(pn)
              }}
              onDuplicate={(id, pn) => duplicateAnnotation(id, pn)}
              onDelete={(id, pn) => {
                const annot = Object.values(annotations).flat().find(a => a.id === id)
                if (annot && isProtected(annot.subtype)) {
                  toast.error(isBn ? 'এই অ্যানোটেশন ডিলিট করা যায় না' : 'Cannot delete this annotation type')
                  return
                }
                deleteAnnotation(id, pn)
              }}
              isBn={isBn}
            />
          </>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            <span className="ml-2 text-sm text-muted-foreground">
              {isBn ? 'পিডিএফ লোড হচ্ছে…' : 'Loading PDF…'}
            </span>
          </div>
        )}

        {!pdfDoc && !loading && files.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {isBn ? 'পিডিএফ লোড করা যায়নি।' : 'PDF could not be loaded.'}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
