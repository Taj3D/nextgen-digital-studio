'use client'

/**
 * ============================================================================
 * Grayscale PDF Tool — Phase 2C Wave 3C
 * ----------------------------------------------------------------------------
 * Converts PDF to grayscale using rasterized approach:
 * PDF.js render → canvas → grayscale pixel manipulation → PNG → new image PDF
 *
 * HONEST LIMITATION: This is rasterized grayscale. Text becomes non-selectable
 * (image-based). The output is a valid PDF but pages are images, not vector.
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Contrast, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function GrayscaleTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [progressText, setProgressText] = React.useState('')
  const [result, setResult] = React.useState<{ pageCount: number; size: number } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const convert = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(0)
    setResult(null)

    try {
      const arrayBuffer = await files[0].arrayBuffer()

      // Load with pdfjs for rendering
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        disableAutoFetch: true,
        disableStream: false,
        // @ts-ignore
        enableScripting: false,
      } as any)
      const pdfjsDoc = await loadingTask.promise
      const pageCount = pdfjsDoc.numPages

      // Create new PDF with pdf-lib
      const newDoc = await PDFDocument.create()

      for (let i = 1; i <= pageCount; i++) {
        setProgress(Math.round((i / pageCount) * 90))
        setProgressText(isBn
          ? `পেজ ${bn(i)}/${bn(pageCount)} রেন্ডার হচ্ছে…`
          : `Rendering page ${i}/${pageCount}…`)

        const page = await pdfjsDoc.getPage(i)
        const viewport = page.getViewport({ scale: 2.0 })

        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas context unavailable')

        // Render PDF page to canvas
        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
          // @ts-ignore
          enableScripting: false,
        }).promise

        // Convert to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let j = 0; j < data.length; j += 4) {
          // Luminance formula: 0.299*R + 0.587*G + 0.114*B
          const gray = Math.round(0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2])
          data[j] = gray      // R
          data[j + 1] = gray  // G
          data[j + 2] = gray  // B
          // Alpha unchanged
        }
        ctx.putImageData(imageData, 0, 0)

        // Export canvas as PNG
        const pngBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png')
        })
        const pngBytes = new Uint8Array(await pngBlob.arrayBuffer())

        // Embed PNG in new PDF
        const pngImage = await newDoc.embedPng(pngBytes)
        const pdfPage = newDoc.addPage([viewport.width, viewport.height])
        pdfPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        })

        // Cleanup canvas to free memory
        canvas.width = 0
        canvas.height = 0
        await page.cleanup()
      }

      setProgress(95)
      setProgressText(isBn ? 'সেভ হচ্ছে…' : 'Saving…')

      // Save
      const pdfBytes = await newDoc.save({ useObjectStreams: true })

      // Validate
      const reloaded = await PDFDocument.load(pdfBytes)
      if (reloaded.getPageCount() !== pageCount) {
        throw new Error('Page count mismatch')
      }

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-grayscale.pdf'
      await downloadValidatedPdf(pdfBytes, filename, pageCount)

      setProgress(100)
      setResult({ pageCount, size: pdfBytes.length })
      toast.success(isBn
        ? `${bn(pageCount)}টি পেজ গ্রেস্কেল হয়েছে।`
        : `${pageCount} page(s) converted to grayscale.`)

      await pdfjsDoc.cleanup()
      await pdfjsDoc.loadingTask.destroy()
    } catch (err) {
      console.error('[Grayscale] Failed:', err)
      toast.error(isBn ? 'গ্রেস্কেল রূপান্তর ব্যর্থ।' : 'Grayscale conversion failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {/* Honest limitation warning */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="font-medium text-amber-700 dark:text-amber-400">
                {isBn ? 'রাস্টারাইজড গ্রেস্কেল — সীমিত কার্যকারিতা' : 'Rasterized Grayscale — Limited'}
              </p>
              <p>
                {isBn
                  ? 'এই পদ্ধতিতে পেজ ছবিতে রূপান্তরিত হয়। টেক্সট নির্বাচনযোগ্য থাকবে না।'
                  : 'This method rasterizes pages. Text will no longer be selectable.'}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={convert}
          disabled={files.length === 0 || busy}
          className="w-full"
          variant="secondary"
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progressText || (isBn ? 'রূপান্তর হচ্ছে…' : 'Converting…')}
            </>
          ) : (
            <>
              <Contrast className="mr-2 h-4 w-4" />
              {isBn ? 'গ্রেস্কেল করুন' : 'Convert to Grayscale'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-gray-500 to-gray-700 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
          </div>
        )}

        {result && !busy && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">
                {isBn ? 'রূপান্তর সফল' : 'Conversion Successful'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isBn ? `পেজ: ${bn(result.pageCount)} | আকার: ${humanSize(result.size)}` : `Pages: ${result.pageCount} | Size: ${humanSize(result.size)}`}
            </p>
          </div>
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
