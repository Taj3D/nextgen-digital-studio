'use client'

/**
 * ============================================================================
 * PDF to JPG Tool — Phase 2A Wave 1
 * ----------------------------------------------------------------------------
 * Uses PDF.js to render PDF pages to canvas, then exports as JPEG images.
 * Single page → direct download. Multiple pages → ZIP.
 * Lazy-loaded — only loads PDF.js when this tool opens.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Download, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import type { PdfTool } from '../pdf-tools'

type QualityLevel = 'low' | 'medium' | 'high'
type PageMode = 'single' | 'all'

const QUALITY_MAP: Record<QualityLevel, number> = {
  low: 0.4,
  medium: 0.7,
  high: 0.95,
}

const SCALE_MAP: Record<QualityLevel, number> = {
  low: 1.0,
  medium: 1.5,
  high: 2.0,
}

export function PdfToJpgTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [quality, setQuality] = React.useState<QualityLevel>('medium')
  const [pageMode, setPageMode] = React.useState<PageMode>('all')
  const [pageNum, setPageNum] = React.useState(1)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [extractedImages, setExtractedImages] = React.useState<{ name: string; blob: Blob }[]>([])

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    setExtractedImages([])

    let loadingTask: any = null

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), // @ts-ignore — enableScripting is a valid DocumentInitParameters option
      enableScripting: false as any })
      const doc = await loadingTask.promise
      const scale = SCALE_MAP[quality]
      const jpegQuality = QUALITY_MAP[quality]

      const pagesToProcess = pageMode === 'single' ? [pageNum] : Array.from({ length: doc.numPages }, (_, i) => i + 1)
      const images: { name: string; blob: Blob }[] = []
      const baseName = files[0].name.replace(/\.pdf$/i, '')

      for (let i = 0; i < pagesToProcess.length; i++) {
        const pn = pagesToProcess[i]
        const page = await doc.getPage(pn)
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        if (!ctx) continue

        // White background for JPG (no transparency in JPEG)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const renderTask = page.render({ canvas, canvasContext: ctx, viewport })
        await renderTask.promise

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), 'image/jpeg', jpegQuality)
        })

        if (blob) {
          const name = `${baseName}-page-${pn}.jpg`
          images.push({ name, blob })
          setExtractedImages([...images])
        }

        setProgress(5 + Math.round(((i + 1) / pagesToProcess.length) * 90))
        page.cleanup()
      }

      try { doc.cleanup(); doc.loadingTask.destroy(); } catch { /* ignore */ }

      if (images.length === 0) {
        toast.error(isBn ? 'কোনো ছবি তৈরি করা যায়নি।' : 'No images could be generated.')
      } else if (images.length === 1) {
        saveAs(images[0].blob, images[0].name)
        toast.success(isBn ? `${bn(1)}টি JPG ডাউনলোড হয়েছে।` : `1 JPG downloaded.`)
      } else {
        // Download as ZIP
        const zip = new JSZip()
        for (const img of images) {
          zip.file(img.name, img.blob)
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        saveAs(zipBlob, `${baseName}-jpg-images.zip`)
        toast.success(isBn ? `${bn(images.length)}টি JPG ZIP-এ ডাউনলোড হয়েছে।` : `${images.length} JPGs downloaded as ZIP.`)
      }
    } catch (err) {
      console.error('[PDF to JPG] Conversion failed:', err)
      toast.error(
        isBn
          ? 'JPG রূপান্তর ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'JPG conversion failed — file may be corrupt or encrypted.',
      )
    } finally {
      if (loadingTask) {
        try { loadingTask.destroy(); } catch { /* ignore */ }
      }
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'পেজ মোড' : 'Page Mode'}</Label>
            <Select value={pageMode} onValueChange={(v) => setPageMode(v as PageMode)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isBn ? 'সব পেজ' : 'All Pages'}</SelectItem>
                <SelectItem value="single">{isBn ? 'একটি পেজ' : 'Single Page'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'কোয়ালিটি' : 'Quality'}</Label>
            <Select value={quality} onValueChange={(v) => setQuality(v as QualityLevel)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{isBn ? 'কম (ছোট ফাইল)' : 'Low (smaller file)'}</SelectItem>
                <SelectItem value="medium">{isBn ? 'মাঝারি' : 'Medium'}</SelectItem>
                <SelectItem value="high">{isBn ? 'উচ্চ (বড় ফাইল)' : 'High (larger file)'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {pageMode === 'single' && (
          <div className="space-y-1.5">
            <Label>{isBn ? 'পেজ নম্বর' : 'Page Number'}</Label>
            <Input
              type="number"
              value={pageNum}
              min={1}
              onChange={(e) => setPageNum(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        )}

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {isBn ? `প্রসেসিং ${bn(progress)}%` : `Processing ${progress}%`}
            </p>
          </div>
        )}

        {extractedImages.length > 0 && !busy && (
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isBn ? `${bn(extractedImages.length)}টি JPG তৈরি হয়েছে` : `${extractedImages.length} JPGs generated`}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {extractedImages.slice(0, 8).map((img, i) => (
                <div key={i} className="rounded border border-border/60 bg-background p-1 text-center">
                  <img src={URL.createObjectURL(img.blob)} alt={img.name} className="mx-auto h-16 w-16 object-contain" />
                  <p className="mt-1 truncate text-[10px] text-muted-foreground">{img.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={run}
          disabled={files.length === 0 || busy}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
        >
          {busy ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'রূপান্তর হচ্ছে…' : 'Converting…'}</>
          ) : (
            <><ImageIcon className="mr-2 h-4 w-4" />{isBn ? 'JPG তৈরি করুন' : 'Convert to JPG'}</>
          )}
        </Button>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
