'use client'

/**
 * ============================================================================
 * Sign PDF Tool — Phase 2C Wave 3C
 * ----------------------------------------------------------------------------
 * Visual signature tool: draw or upload a signature image and place it on a PDF page.
 *
 * HONEST LABEL: "Visual Signature" — NOT a cryptographic digital signature.
 * Does NOT provide tamper detection, certificate validation, or PKCS#7 signing.
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, PenTool, AlertTriangle, CheckCircle2, Upload, Eraser } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

type SignatureMode = 'draw' | 'upload'

export function SignTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [mode, setMode] = React.useState<SignatureMode>('draw')
  const [pageNum, setPageNum] = React.useState(1)
  const [pageCount, setPageCount] = React.useState(0)
  const [posX, setPosX] = React.useState(50)
  const [posY, setPosY] = React.useState(50)
  const [width, setWidth] = React.useState(200)
  const [busy, setBusy] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [signatureImage, setSignatureImage] = React.useState<Uint8Array | null>(null)
  const [drawing, setDrawing] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  // Load PDF to get page count
  React.useEffect(() => {
    if (files.length === 0) {
      setPageCount(0)
      return
    }
    setLoading(true)
    files[0].arrayBuffer().then(async (buf) => {
      try {
        const doc = await PDFDocument.load(new Uint8Array(buf), { ignoreEncryption: true })
        setPageCount(doc.getPageCount())
        setPageNum(1)
      } catch {
        toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
      } finally {
        setLoading(false)
      }
    })
  }, [files, isBn])

  // Initialize drawing canvas
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || mode !== 'draw') return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [mode])

  const handleDrawStart = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    lastPointRef.current = { x, y }
    canvas.setPointerCapture(e.pointerId)
  }

  const handleDrawMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const last = lastPointRef.current
    if (last) {
      ctx.beginPath()
      ctx.moveTo(last.x, last.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
    lastPointRef.current = { x, y }
  }

  const handleDrawEnd = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDrawing(false)
    lastPointRef.current = null
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId) } catch {}
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const getSignatureBytes = async (): Promise<Uint8Array | null> => {
    if (mode === 'draw') {
      const canvas = canvasRef.current
      if (!canvas) return null
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png')
      })
      return new Uint8Array(await blob.arrayBuffer())
    } else {
      return signatureImage
    }
  }

  const handleUploadSignature = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error(isBn ? 'ছবি ফাইল দিন।' : 'Upload an image file.')
      return
    }
    const bytes = new Uint8Array(await file.arrayBuffer())
    setSignatureImage(bytes)
    toast.success(isBn ? 'সিগনেচার আপলোড হয়েছে।' : 'Signature uploaded.')
  }

  const sign = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    const sigBytes = await getSignatureBytes()
    if (!sigBytes) {
      toast.error(isBn ? 'সিগনেচার দিন।' : 'Provide a signature.')
      return
    }
    setBusy(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(new Uint8Array(arrayBuffer), { ignoreEncryption: true })
      const page = doc.getPage(pageNum - 1)
      const pageWidth = page.getWidth()
      const pageHeight = page.getHeight()

      // Embed signature image
      let img
      try {
        img = await doc.embedPng(sigBytes)
      } catch {
        // Try as JPG
        try {
          img = await doc.embedJpg(sigBytes)
        } catch {
          throw new Error('Unsupported image format')
        }
      }

      // Calculate position (PDF coords: bottom-left origin)
      // posX/posY are from top-left in points
      const pdfX = posX
      const pdfY = pageHeight - posY - (width * img.height / img.width)

      page.drawImage(img, {
        x: pdfX,
        y: pdfY,
        width,
        height: width * img.height / img.width,
      })

      const pdfBytes = await doc.save({ useObjectStreams: false })
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-signed.pdf'
      await downloadValidatedPdf(pdfBytes, filename, doc.getPageCount())

      toast.success(isBn ? 'ভিজ্যুয়াল সিগনেচার যোগ হয়েছে।' : 'Visual signature added.')
    } catch (err) {
      console.error('[Sign] Failed:', err)
      toast.error(isBn ? 'সিগনেচার ব্যর্থ।' : 'Signing failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {/* Honest limitation */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="font-medium text-amber-700 dark:text-amber-400">
                {isBn ? 'ভিজ্যুয়াল সিগনেচার — সীমিত' : 'Visual Signature — Limited'}
              </p>
              <p>
                {isBn
                  ? 'এটি ভিজ্যুয়াল সিগনেচার — ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার নয়।'
                  : 'This adds a visual signature only. It is not a cryptographic digital signature.'}
              </p>
            </div>
          </div>
        </div>

        {pageCount > 0 && (
          <>
            {/* Signature mode selector */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">
                {isBn ? 'সিগনেচার মোড' : 'Signature Mode'}
              </Label>
              <Select value={mode} onValueChange={(v) => setMode(v as SignatureMode)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draw">{isBn ? 'আঁকুন' : 'Draw'}</SelectItem>
                  <SelectItem value="upload">{isBn ? 'আপলোড করুন' : 'Upload Image'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Draw canvas */}
            {mode === 'draw' && (
              <div className="space-y-2">
                <Label className="text-xs">{isBn ? 'সিগনেচার আঁকুন' : 'Draw your signature'}</Label>
                <div className="relative rounded-lg border border-border/60 bg-white overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={150}
                    className="w-full touch-none cursor-crosshair"
                    onPointerDown={handleDrawStart}
                    onPointerMove={handleDrawMove}
                    onPointerUp={handleDrawEnd}
                    aria-label={isBn ? 'সিগনেচার ক্যানভাস' : 'Signature canvas'}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={clearCanvas}>
                  <Eraser className="h-3 w-3 mr-1" />
                  {isBn ? 'মুছুন' : 'Clear'}
                </Button>
              </div>
            )}

            {/* Upload */}
            {mode === 'upload' && (
              <div className="space-y-2">
                <Label className="text-xs">{isBn ? 'সিগনেচার ছবি আপলোড করুন' : 'Upload signature image'}</Label>
                <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-border/60 rounded-lg cursor-pointer hover:bg-muted/30">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {signatureImage ? (isBn ? 'আপলোড সম্পন্ন' : 'Uploaded') : (isBn ? 'PNG/JPG নির্বাচন করুন' : 'Select PNG/JPG')}
                    </span>
                  </div>
                  <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleUploadSignature} />
                </label>
              </div>
            )}

            {/* Position settings */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">{isBn ? 'পেজ' : 'Page'}</Label>
                <Input
                  type="number"
                  value={pageNum}
                  onChange={(e) => setPageNum(Math.max(1, Math.min(Number(e.target.value), pageCount)))}
                  min={1}
                  max={pageCount}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">{isBn ? 'প্রস্থ (pt)' : 'Width (pt)'}</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Math.max(50, Number(e.target.value)))}
                  min={50}
                  max={500}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">X (pt)</Label>
                <Input
                  type="number"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Y (pt)</Label>
                <Input
                  type="number"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <Button
              onClick={sign}
              disabled={busy}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isBn ? 'সিগনেচার হচ্ছে…' : 'Signing…'}
                </>
              ) : (
                <>
                  <PenTool className="mr-2 h-4 w-4" />
                  {isBn ? 'সিগনেচার যোগ করুন' : 'Add Signature'}
                </>
              )}
            </Button>
          </>
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
