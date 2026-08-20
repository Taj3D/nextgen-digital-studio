'use client'

/**
 * ============================================================================
 * QR Code Stamper Tool — Phase 2A Wave 2
 * ----------------------------------------------------------------------------
 * Uses qrcode@1.5.4 to generate QR PNG, then pdf-lib to embed onto pages.
 * Lazy-loaded — qrcode library only loads when this tool opens.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import QRCode from 'qrcode'
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
import { Loader2, QrCode } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

type EccLevel = 'L' | 'M' | 'Q' | 'H'
type QrSize = 'small' | 'medium' | 'large'
type QrPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
type PageMode = 'all' | 'single'

const SIZE_MAP: Record<QrSize, number> = {
  small: 50,
  medium: 100,
  large: 150,
}

const POSITIONS = [
  { value: 'top-left', labelEn: 'Top Left', labelBn: 'উপরে বামে' },
  { value: 'top-center', labelEn: 'Top Center', labelBn: 'উপরে মাঝে' },
  { value: 'top-right', labelEn: 'Top Right', labelBn: 'উপরে ডানে' },
  { value: 'bottom-left', labelEn: 'Bottom Left', labelBn: 'নিচে বামে' },
  { value: 'bottom-center', labelEn: 'Bottom Center', labelBn: 'নিচে মাঝে' },
  { value: 'bottom-right', labelEn: 'Bottom Right', labelBn: 'নিচে ডানে' },
] as const

export function QrStampTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [payload, setPayload] = React.useState('https://example.com')
  const [ecc, setEcc] = React.useState<EccLevel>('M')
  const [qrSize, setQrSize] = React.useState<QrSize>('medium')
  const [position, setPosition] = React.useState<QrPosition>('bottom-right')
  const [pageMode, setPageMode] = React.useState<PageMode>('all')
  const [pageNum, setPageNum] = React.useState(1)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    if (!payload.trim()) {
      toast.error(isBn ? 'QR পেলোড দিন।' : 'Enter QR payload.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      // Generate QR as PNG data URL
      const dataUrl = await QRCode.toDataURL(payload.trim(), {
        type: 'image/png',
        errorCorrectionLevel: ecc,
        margin: 2,
        width: 300,
      })

      // Convert data URL to Uint8Array
      const base64 = dataUrl.split(',')[1]
      const binaryString = atob(base64)
      const qrBytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        qrBytes[i] = binaryString.charCodeAt(i)
      }

      // Load PDF
      const pdfBytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const qrImg = await doc.embedPng(qrBytes)
      const stampSize = SIZE_MAP[qrSize]
      const margin = 20

      const pagesToStamp = pageMode === 'single' ? [pageNum - 1] : pages.map((_, i) => i)

      for (let i = 0; i < pagesToStamp.length; i++) {
        const page = pages[pagesToStamp[i]]
        const w = page.getWidth()
        const h = page.getHeight()

        let x: number, y: number
        if (position.startsWith('top')) {
          y = h - margin - stampSize
        } else {
          y = margin
        }
        if (position.endsWith('left')) {
          x = margin
        } else if (position.endsWith('center')) {
          x = (w - stampSize) / 2
        } else {
          x = w - margin - stampSize
        }

        // Constrain to page bounds
        x = Math.max(0, Math.min(x, w - stampSize))
        y = Math.max(0, Math.min(y, h - stampSize))

        // Draw white background for QR (ensures contrast)
        page.drawRectangle({
          x: x - 4,
          y: y - 4,
          width: stampSize + 8,
          height: stampSize + 8,
          color: { type: 'RGB', red: 1, green: 1, blue: 1 } as any,
        })

        // Draw QR image (square aspect ratio preserved)
        page.drawImage(qrImg, {
          x,
          y,
          width: stampSize,
          height: stampSize,
        })

        setProgress(5 + Math.round(((i + 1) / pagesToStamp.length) * 90))
      }

      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-qr-stamped.pdf',
        pages.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn
          ? `${bn(pagesToStamp.length)}টি পেজে QR কোড যোগ হয়েছে।`
          : `QR code stamped on ${pagesToStamp.length} page(s).`,
      )
    } catch (err) {
      console.error('[QR Stamp] Failed:', err)
      toast.error(
        isBn ? 'QR স্ট্যাম্প ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'QR stamp failed — file may be corrupt or encrypted.',
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
          <Label>{isBn ? 'QR পেলোড (URL বা টেক্সট)' : 'QR Payload (URL or Text)'}</Label>
          <Input value={payload} onChange={(e) => setPayload(e.target.value)} placeholder="https://example.com" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'সাইজ' : 'Size'}</Label>
            <Select value={qrSize} onValueChange={(v) => setQrSize(v as QrSize)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{isBn ? 'ছোট (৫০pt)' : 'Small (50pt)'}</SelectItem>
                <SelectItem value="medium">{isBn ? 'মাঝারি (১০০pt)' : 'Medium (100pt)'}</SelectItem>
                <SelectItem value="large">{isBn ? 'বড় (১৫০pt)' : 'Large (150pt)'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'Error Correction' : 'Error Correction'}</Label>
            <Select value={ecc} onValueChange={(v) => setEcc(v as EccLevel)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="L">L (~7%)</SelectItem>
                <SelectItem value="M">M (~15%)</SelectItem>
                <SelectItem value="Q">Q (~25%)</SelectItem>
                <SelectItem value="H">H (~30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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
            <Select value={position} onValueChange={(v) => setPosition(v as QrPosition)}>
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

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{isBn ? `প্রসেসিং ${bn(progress)}%` : `Processing ${progress}%`}</p>
          </div>
        )}

        <Button onClick={run} disabled={files.length === 0 || busy || !payload.trim()} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
          {busy ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'QR স্ট্যাম্প হচ্ছে…' : 'Stamping QR…'}</>) : (<><QrCode className="mr-2 h-4 w-4" />{isBn ? 'QR স্ট্যাম্প করুন' : 'Stamp QR Code'}</>)}
        </Button>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
