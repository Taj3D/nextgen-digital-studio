'use client'

/**
 * ============================================================================
 * PDF to PowerPoint Tool — Phase 2C Wave 4A
 * ----------------------------------------------------------------------------
 * Converts PDF pages to image-based PPTX slides using pdfjs rendering + pptxgenjs.
 *
 * HONEST LIMITATION: "Image-based slides. Each PDF page is converted to a
 * slide image; text may not be individually editable."
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Presentation, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import pptxgen from 'pptxgenjs'
import type { PdfTool } from '../pdf-tools'

export function PdfToPptTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [progressText, setProgressText] = React.useState('')

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const convert = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(0)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        // @ts-ignore
        enableScripting: false,
      } as any)
      const doc = await loadingTask.promise
      const numPages = doc.numPages

      // Create PPTX
      const pptx = new pptxgen()
      pptx.defineLayout({ name: 'PDFPAGE', width: 10, height: 7.5 })
      pptx.layout = 'L' // Use custom layout

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 90))
        setProgressText(isBn ? `পেজ ${bn(i)}/${bn(numPages)} রেন্ডার হচ্ছে…` : `Rendering page ${i}/${numPages}…`)

        const page = await doc.getPage(i)
        const viewport = page.getViewport({ scale: 2.0 })

        // Render to canvas
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas context unavailable')

        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
          // @ts-ignore
          enableScripting: false,
        }).promise

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png')

        // Calculate aspect ratio for slide
        const aspectRatio = viewport.width / viewport.height
        let slideW = 10
        let slideH = slideW / aspectRatio
        if (slideH > 7.5) {
          slideH = 7.5
          slideW = slideH * aspectRatio
        }

        const slide = pptx.addSlide()
        slide.addImage({ data: dataUrl, x: (10 - slideW) / 2, y: (7.5 - slideH) / 2, w: slideW, h: slideH })

        // Cleanup canvas
        canvas.width = 0
        canvas.height = 0
        await page.cleanup()
      }

      setProgress(95)
      setProgressText(isBn ? 'PPTX তৈরি হচ্ছে…' : 'Generating PPTX…')

      // Generate PPTX file
      const blob = await pptx.write({ outputType: 'blob' }) as Blob
      const filename = files[0].name.replace(/\.pdf$/i, '') + '.pptx'
      saveAs(blob, filename)

      setProgress(100)
      toast.success(isBn
        ? `${bn(numPages)}টি স্লাইড সহ PPTX তৈরি হয়েছে।`
        : `PPTX generated with ${numPages} slide(s).`)

      await doc.cleanup()
      await doc.loadingTask.destroy()
    } catch (err) {
      console.error('[PDF to PPT] Failed:', err)
      toast.error(isBn ? 'রূপান্তর ব্যর্থ।' : 'Conversion failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'ছবি-ভিত্তিক স্লাইড। টেক্সট আলাদাভাবে সম্পাদনযোগ্য নাও হতে পারে।'
                : 'Image-based slides. Each PDF page is converted to a slide image; text may not be individually editable.'}
            </p>
          </div>
        </div>

        <Button onClick={convert} disabled={files.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progressText || (isBn ? 'রূপান্তর হচ্ছে…' : 'Converting…')}
            </>
          ) : (
            <>
              <Presentation className="mr-2 h-4 w-4" />
              {isBn ? 'PowerPoint এ রূপান্তর করুন' : 'Convert to PowerPoint'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
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
