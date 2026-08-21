'use client'

/**
 * ============================================================================
 * PDF Viewer Tool — Phase 1B
 * ----------------------------------------------------------------------------
 * Uses PDF.js to render PDF pages on a <canvas> element.
 * Renders only the current page (not all pages) for performance.
 * Cleans up PDF.js resources on dialog close / unmount.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib, type PdfDocument } from './pdfjs-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

export function PdfViewerTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pdfDoc, setPdfDoc] = React.useState<PdfDocument | null>(null)
  const [pageNum, setPageNum] = React.useState(1)
  const [numPages, setNumPages] = React.useState(0)
  const [scale, setScale] = React.useState(1.0)
  const [loading, setLoading] = React.useState(false)
  const [rendering, setRendering] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const renderTaskRef = React.useRef<ReturnType<PdfDocument['getPage']> extends Promise<infer P> ? any : any>(null)
  const renderTaskRef2 = React.useRef<{ cancel: () => void } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  // Load PDF when file changes
  React.useEffect(() => {
    if (!open || files.length === 0) {
      setPdfDoc(null)
      setNumPages(0)
      setPageNum(1)
      return
    }

    let loadingTask: ReturnType<typeof pdfjsLib.getDocument> | null = null
    let cancelled = false

    const loadPdf = async () => {
      setLoading(true)
      try {
        const arrayBuffer = await files[0].arrayBuffer()
        loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), // @ts-ignore — enableScripting is a valid DocumentInitParameters option
      enableScripting: false as any })
        const doc = await loadingTask.promise
        if (cancelled) {
          try { doc.cleanup(); } catch { /* ignore */ }
          try { doc.loadingTask.destroy(); } catch { /* ignore */ }
          return
        }
        setPdfDoc(doc)
        setNumPages(doc.numPages)
        setPageNum(1)
      } catch (err) {
        console.error('[PDF Viewer] Load failed:', err)
        toast.error(
          isBn
            ? 'পিডিএফ লোড ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
            : 'Failed to load PDF — file may be corrupt or encrypted.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      if (loadingTask) {
        loadingTask.destroy?.()
      }
      if (pdfDoc) {
        try { pdfDoc.cleanup(); } catch { /* ignore */ }
        try { pdfDoc.loadingTask.destroy(); } catch { /* ignore */ }
      }
    }
  }, [files, open, isBn])

  // Render current page when page or scale changes
  React.useEffect(() => {
    if (!pdfDoc || !canvasRef.current || pageNum < 1 || pageNum > numPages) return

    let cancelled = false

    const renderPage = async () => {
      setRendering(true)
      try {
        const page = await pdfDoc.getPage(pageNum)
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        const viewport = page.getViewport({ scale })
        canvas.width = viewport.width
        canvas.height = viewport.height

        // Cancel previous render task if exists
        if (renderTaskRef2.current) {
          try { renderTaskRef2.current.cancel(); } catch { /* ignore */ }
        }

        const renderTask = page.render({ canvas, canvasContext: context, viewport })
        renderTaskRef2.current = renderTask
        await renderTask.promise
      } catch (err) {
        if (!cancelled) {
          console.error('[PDF Viewer] Render failed:', err)
        }
      } finally {
        if (!cancelled) setRendering(false)
      }
    }

    renderPage()

    return () => {
      cancelled = true
      if (renderTaskRef2.current) {
        renderTaskRef2.current.cancel()
        renderTaskRef2.current = null
      }
    }
  }, [pdfDoc, pageNum, scale, numPages])

  // Cleanup PDF document on unmount or dialog close
  React.useEffect(() => {
    if (!open && pdfDoc) {
      try { pdfDoc.cleanup(); } catch { /* ignore */ }
      try { pdfDoc.loadingTask.destroy(); } catch { /* ignore */ }
      setPdfDoc(null)
    }
  }, [open, pdfDoc])

  const goPrev = () => {
    if (pageNum > 1) setPageNum(pageNum - 1)
  }

  const goNext = () => {
    if (pageNum < numPages) setPageNum(pageNum + 1)
  }

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3.0))
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5))
  const resetZoom = () => setScale(1.0)

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            <span className="ml-2 text-sm text-muted-foreground">
              {isBn ? 'পিডিএফ লোড হচ্ছে…' : 'Loading PDF…'}
            </span>
          </div>
        )}

        {pdfDoc && !loading && (
          <>
            {/* Canvas container */}
            <div className="flex justify-center overflow-auto rounded-lg border border-border/60 bg-muted/20 p-4" style={{ maxHeight: '400px' }}>
              <canvas
                ref={canvasRef}
                className="max-w-full"
                aria-label={`${isBn ? 'পেজ' : 'Page'} ${bn(pageNum)} ${isBn ? 'এর' : 'of'} ${bn(numPages)}`}
              />
            </div>

            {rendering && (
              <p className="text-center text-xs text-muted-foreground">
                {isBn ? 'রেন্ডার হচ্ছে…' : 'Rendering…'}
              </p>
            )}

            {/* Page navigation */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={goPrev}
                disabled={pageNum <= 1}
                aria-label={isBn ? 'পূর্ববর্তী পেজ' : 'Previous page'}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[80px] text-center text-sm font-medium">
                {bn(pageNum)} / {bn(numPages)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goNext}
                disabled={pageNum >= numPages}
                aria-label={isBn ? 'পরবর্তী পেজ' : 'Next page'}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5}
                aria-label={isBn ? 'জুম আউট' : 'Zoom out'}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="min-w-[50px] text-center text-xs text-muted-foreground">
                {bn(Math.round(scale * 100))}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 3.0}
                aria-label={isBn ? 'জুম ইন' : 'Zoom in'}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
                aria-label={isBn ? 'জুম রিসেট' : 'Reset zoom'}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </>
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
