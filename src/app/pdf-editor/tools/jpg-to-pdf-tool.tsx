'use client'

/**
 * ============================================================================
 * JPG to PDF Tool — Phase 2A Wave 1
 * ----------------------------------------------------------------------------
 * Uses pdf-lib to combine JPG images into a single PDF.
 * Supports multiple images, page sizing, margins, orientation, and fit.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { downloadValidatedPdf, humanSize } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
import { Loader2, FilePlus2, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

type PageSize = 'a4' | 'letter' | 'fit'
type Orientation = 'auto' | 'portrait' | 'landscape'
type Margin = 'none' | 'small' | 'medium'
type Fit = 'contain' | 'fill'

const PAGE_SIZES: Record<Exclude<PageSize, 'fit'>, { w: number; h: number }> = {
  a4: { w: 595, h: 842 },
  letter: { w: 612, h: 792 },
}

const MARGIN_MAP: Record<Margin, number> = {
  none: 0,
  small: 20,
  medium: 40,
}

export function JpgToPdfTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageSize, setPageSize] = React.useState<PageSize>('a4')
  const [orientation, setOrientation] = React.useState<Orientation>('auto')
  const [margin, setMargin] = React.useState<Margin>('small')
  const [fit, setFit] = React.useState<Fit>('contain')
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const handleFiles = (newFiles: File[]) => {
    const valid = newFiles.filter((f) => {
      const isJpg = f.type === 'image/jpeg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')
      if (!isJpg) {
        toast.error(isBn ? `শুধু JPG ফাইল গ্রহণযোগ্য: ${f.name}` : `Only JPG files are accepted: ${f.name}`)
      }
      return isJpg
    })
    setFiles([...files, ...valid])
  }

  const isJpgFile = (f: File) => f.type === 'image/jpeg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')
  const jpgRejectMsg = (name: string) => isBn ? `শুধু JPG ফাইল গ্রহণযোগ্য: ${name}` : `Only JPG files are accepted: ${name}`

  const moveUp = (index: number) => {
    if (index === 0) return
    const next = [...files]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    setFiles(next)
  }

  const moveDown = (index: number) => {
    if (index === files.length - 1) return
    const next = [...files]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    setFiles(next)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'অন্তত একটি JPG দিন।' : 'Add at least one JPG.')
      return
    }
    setBusy(true)
    setProgress(5)

    try {
      const doc = await PDFDocument.create()
      const marginVal = MARGIN_MAP[margin]

      for (let i = 0; i < files.length; i++) {
        const fileBytes = await files[i].arrayBuffer()
        const img = await doc.embedJpg(fileBytes)

        let pageW: number, pageH: number

        if (pageSize === 'fit') {
          pageW = img.width + marginVal * 2
          pageH = img.height + marginVal * 2
        } else {
          const base = PAGE_SIZES[pageSize]
          if (orientation === 'portrait' || (orientation === 'auto' && img.height >= img.width)) {
            pageW = base.w
            pageH = base.h
          } else {
            pageW = base.h
            pageH = base.w
          }
        }

        const page = doc.addPage([pageW, pageH])

        const availW = pageW - marginVal * 2
        const availH = pageH - marginVal * 2

        let drawW: number, drawH: number, drawX: number, drawY: number

        if (fit === 'fill') {
          drawW = availW
          drawH = availH
          drawX = marginVal
          drawY = marginVal
        } else {
          // contain
          const scale = Math.min(availW / img.width, availH / img.height)
          drawW = img.width * scale
          drawH = img.height * scale
          drawX = marginVal + (availW - drawW) / 2
          drawY = marginVal + (availH - drawH) / 2
        }

        page.drawImage(img, { x: drawX, y: drawY, width: drawW, height: drawH })

        setProgress(5 + Math.round(((i + 1) / files.length) * 85))
      }

      const out = await doc.save()
      const expectedPages = files.length
      const ok = await downloadValidatedPdf(out, 'images-to-pdf.pdf', expectedPages)
      if (!ok) throw new Error('Validation failed')

      setProgress(100)
      toast.success(
        isBn
          ? `${bn(files.length)}টি JPG থেকে PDF তৈরি হয়েছে।`
          : `Created PDF from ${files.length} JPGs.`,
      )
    } catch (err) {
      console.error('[JPG to PDF] Conversion failed:', err)
      toast.error(
        isBn
          ? 'PDF তৈরি ব্যর্থ — একটি ছবি নষ্ট হতে পারে।'
          : 'PDF creation failed — an image may be corrupt.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker
          isBn={isBn}
          multiple
          files={files}
          onFiles={handleFiles}
          accept="image/jpeg,.jpg,.jpeg"
          fileValidator={isJpgFile}
          rejectMessage={jpgRejectMsg}
          hint={isBn ? 'শুধু JPG · সম্পূর্ণ লোকাল প্রসেসিং' : 'JPG only · 100% local processing'}
        />

        {files.length > 0 && (
          <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1" role="list" aria-label={isBn ? 'ছবির তালিকা' : 'Image list'}>
            {files.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                role="listitem"
                className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-500/15 text-xs font-bold text-amber-600">
                    {bn(i + 1)}
                  </span>
                  <span className="truncate font-medium">{f.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{humanSize(f.size)}</span>
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0 || busy}
                    aria-label={isBn ? `${bn(i + 1)} নম্বর ছবি উপরে নামান` : `Move image ${i + 1} up`}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border/60 hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === files.length - 1 || busy}
                    aria-label={isBn ? `${bn(i + 1)} নম্বর ছবি নিচে নামান` : `Move image ${i + 1} down`}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border/60 hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    disabled={busy}
                    aria-label={isBn ? `${bn(i + 1)} নম্বর ছবি মুছুন` : `Remove image ${i + 1}`}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border/60 hover:bg-destructive/10 hover:text-destructive disabled:opacity-30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'পেজ সাইজ' : 'Page Size'}</Label>
            <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4</SelectItem>
                <SelectItem value="letter">Letter</SelectItem>
                <SelectItem value="fit">{isBn ? 'ছবির অনুপাত' : 'Fit to image'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'ওরিয়েন্টেশন' : 'Orientation'}</Label>
            <Select value={orientation} onValueChange={(v) => setOrientation(v as Orientation)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{isBn ? 'অটো' : 'Auto'}</SelectItem>
                <SelectItem value="portrait">{isBn ? 'পোর্ট্রেট' : 'Portrait'}</SelectItem>
                <SelectItem value="landscape">{isBn ? 'ল্যান্ডস্কেপ' : 'Landscape'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'মার্জিন' : 'Margin'}</Label>
            <Select value={margin} onValueChange={(v) => setMargin(v as Margin)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{isBn ? 'কোনো মার্জিন নেই' : 'None'}</SelectItem>
                <SelectItem value="small">{isBn ? 'ছোট' : 'Small'}</SelectItem>
                <SelectItem value="medium">{isBn ? 'মাঝারি' : 'Medium'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'ফিট' : 'Fit'}</Label>
            <Select value={fit} onValueChange={(v) => setFit(v as Fit)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">{isBn ? 'কনটেইন' : 'Contain'}</SelectItem>
                <SelectItem value="fill">{isBn ? 'ফিল' : 'Fill'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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

        <Button
          onClick={run}
          disabled={files.length === 0 || busy}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
        >
          {busy ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'PDF তৈরি হচ্ছে…' : 'Creating PDF…'}</>
          ) : (
            <><FilePlus2 className="mr-2 h-4 w-4" />{isBn ? 'PDF তৈরি করুন' : 'Create PDF'}</>
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
