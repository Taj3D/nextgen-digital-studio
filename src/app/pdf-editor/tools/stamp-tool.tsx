'use client'

/**
 * ============================================================================
 * Stamp PDF Tool — Phase 2A Wave 2
 * ----------------------------------------------------------------------------
 * Uses pdf-lib drawText + drawRectangle to add stamp presets to PDF pages.
 * Independent from WatermarkTool — does NOT modify Watermark behavior.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
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
import { Loader2, Stamp } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

type StampPreset = 'APPROVED' | 'DRAFT' | 'CONFIDENTIAL' | 'REVIEWED' | 'CUSTOM'
type StampPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type PageMode = 'all' | 'single'

const PRESETS: Record<StampPreset, { text: string; color: { r: number; g: number; b: number } }> = {
  APPROVED: { text: 'APPROVED', color: { r: 0, g: 0.5, b: 0 } },
  DRAFT: { text: 'DRAFT', color: { r: 0.8, g: 0.5, b: 0 } },
  CONFIDENTIAL: { text: 'CONFIDENTIAL', color: { r: 0.7, g: 0, b: 0 } },
  REVIEWED: { text: 'REVIEWED', color: { r: 0, g: 0, b: 0.5 } },
  CUSTOM: { text: '', color: { r: 0.3, g: 0.3, b: 0.3 } },
}

const POSITIONS = [
  { value: 'top-left', labelEn: 'Top Left', labelBn: 'উপরে বামে' },
  { value: 'top-right', labelEn: 'Top Right', labelBn: 'উপরে ডানে' },
  { value: 'bottom-left', labelEn: 'Bottom Left', labelBn: 'নিচে বামে' },
  { value: 'bottom-right', labelEn: 'Bottom Right', labelBn: 'নিচে ডানে' },
] as const

export function StampTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [preset, setPreset] = React.useState<StampPreset>('APPROVED')
  const [customText, setCustomText] = React.useState('')
  const [position, setPosition] = React.useState<StampPosition>('top-right')
  const [pageMode, setPageMode] = React.useState<PageMode>('all')
  const [pageNum, setPageNum] = React.useState(1)
  const [fontSize, setFontSize] = React.useState(24)
  const [opacity, setOpacity] = React.useState(0.8)
  const [rotation, setRotation] = React.useState(0)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const stampText = preset === 'CUSTOM' ? customText.trim() : PRESETS[preset].text
  const stampColor = PRESETS[preset].color

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    if (!stampText) {
      toast.error(isBn ? 'স্ট্যাম্প টেক্সট দিন।' : 'Enter stamp text.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const font = await doc.embedFont(StandardFonts.HelveticaBold)
      const margin = 30
      const padding = 8
      const textWidth = font.widthOfTextAtSize(stampText, fontSize)

      const pagesToStamp = pageMode === 'single' ? [pageNum - 1] : pages.map((_, i) => i)

      for (let i = 0; i < pagesToStamp.length; i++) {
        const page = pages[pagesToStamp[i]]
        const w = page.getWidth()
        const h = page.getHeight()

        let x: number, y: number
        if (position.startsWith('top')) {
          y = h - margin - fontSize - padding * 2
        } else {
          y = margin
        }
        if (position.endsWith('left')) {
          x = margin
        } else {
          x = w - margin - textWidth - padding * 2
        }

        const c = rgb(stampColor.r, stampColor.g, stampColor.b)

        // Draw border rectangle
        page.drawRectangle({
          x: x - padding,
          y: y - padding,
          width: textWidth + padding * 2,
          height: fontSize + padding * 2,
          borderColor: c,
          borderWidth: 2,
          opacity,
          color: rgb(1, 1, 1),
        })

        // Draw stamp text
        page.drawText(stampText, {
          x,
          y: y + 2,
          size: fontSize,
          font,
          color: c,
          opacity,
          rotate: degrees(rotation),
        })

        setProgress(5 + Math.round(((i + 1) / pagesToStamp.length) * 90))
      }

      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-stamped.pdf',
        pages.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn
          ? `${bn(pagesToStamp.length)}টি পেজে স্ট্যাম্প যোগ হয়েছে।`
          : `Stamped ${pagesToStamp.length} page(s).`,
      )
    } catch (err) {
      console.error('[Stamp] Failed:', err)
      toast.error(
        isBn ? 'স্ট্যাম্প ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'Stamp failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-1.5">
          <Label>{isBn ? 'স্ট্যাম্প প্রিসেট' : 'Stamp Preset'}</Label>
          <Select value={preset} onValueChange={(v) => setPreset(v as StampPreset)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="APPROVED">✅ APPROVED</SelectItem>
              <SelectItem value="DRAFT">📝 DRAFT</SelectItem>
              <SelectItem value="CONFIDENTIAL">🔒 CONFIDENTIAL</SelectItem>
              <SelectItem value="REVIEWED">👁️ REVIEWED</SelectItem>
              <SelectItem value="CUSTOM">{isBn ? 'কাস্টম' : 'Custom'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {preset === 'CUSTOM' && (
          <div className="space-y-1.5">
            <Label>{isBn ? 'কাস্টম টেক্সট' : 'Custom Text'}</Label>
            <Input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="ENTER STAMP TEXT" />
            <p className="text-xs text-muted-foreground">
              {isBn ? 'শুধু ইংরেজি অক্ষর সমর্থিত (Latin fonts)।' : 'Only Latin characters supported (Standard fonts).'}
            </p>
          </div>
        )}

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
            <Label>{isBn ? 'পজিশন' : 'Position'}</Label>
            <Select value={position} onValueChange={(v) => setPosition(v as StampPosition)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{isBn ? p.labelBn : p.labelEn}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {pageMode === 'single' && (
          <div className="space-y-1.5">
            <Label>{isBn ? 'পেজ নম্বর' : 'Page Number'}</Label>
            <Input type="number" value={pageNum} min={1} onChange={(e) => setPageNum(Math.max(1, parseInt(e.target.value) || 1))} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'ফন্ট সাইজ' : 'Font Size'}</Label>
            <Input type="number" value={fontSize} min={8} max={72} onChange={(e) => setFontSize(parseInt(e.target.value) || 24)} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'অপাসিটি' : 'Opacity'} ({bn(Math.round(opacity * 100))}%)</Label>
            <input type="range" min={20} max={100} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(parseInt(e.target.value) / 100)} className="w-full" />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'রোটেশন' : 'Rotation'}</Label>
            <Input type="number" value={rotation} min={0} max={360} onChange={(e) => setRotation(parseInt(e.target.value) || 0)} />
          </div>
        </div>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{isBn ? `প্রসেসিং ${bn(progress)}%` : `Processing ${progress}%`}</p>
          </div>
        )}

        <Button onClick={run} disabled={files.length === 0 || busy || !stampText} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
          {busy ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'স্ট্যাম্প হচ্ছে…' : 'Stamping…'}</>) : (<><Stamp className="mr-2 h-4 w-4" />{isBn ? 'স্ট্যাম্প যোগ করুন' : 'Add Stamp'}</>)}
        </Button>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
