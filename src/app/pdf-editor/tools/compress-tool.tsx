'use client'

/**
 * ============================================================================
 * Compress PDF Tool — Phase 2C Wave 3A
 * ----------------------------------------------------------------------------
 * Compresses PDF by re-serializing with useObjectStreams: true.
 * Measures actual input/output sizes and reports honest reduction.
 *
 * Limitation: Already-compressed PDFs (especially image-heavy) may show
 * minimal or no reduction. Does not perform lossy image recompression.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Minimize2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function CompressTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [result, setResult] = React.useState<{
    originalSize: number
    compressedSize: number
    reduction: number
    pageCount: number
    increased: boolean
  } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const compress = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setResult(null)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const originalBytes = new Uint8Array(arrayBuffer)
      const originalSize = originalBytes.length

      // Load
      const doc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })
      const pageCount = doc.getPageCount()

      // Compress: save with object streams
      const compressedBytes = await doc.save({ useObjectStreams: true })
      const compressedSize = compressedBytes.length

      // Calculate reduction
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100)
      const increased = compressedSize >= originalSize

      // Validate: reload compressed output
      const reloaded = await PDFDocument.load(compressedBytes)
      if (reloaded.getPageCount() !== pageCount) {
        throw new Error('Page count mismatch after compression')
      }

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-compressed.pdf'
      await downloadValidatedPdf(compressedBytes, filename, pageCount)

      setResult({ originalSize, compressedSize, reduction, pageCount, increased })

      if (increased) {
        toast.info(isBn
          ? 'কম্প্রেস করা ফাইল বড় — মূল ফাইল ইতিমধ্যে সংকুচিত ছিল।'
          : 'Compressed file is larger — original may already be highly compressed.')
      } else {
        toast.success(isBn
          ? `${bn(reduction)}% কম্প্রেস হয়েছে।`
          : `Compressed by ${reduction}%.`)
      }
    } catch (err) {
      console.error('[Compress] Failed:', err)
      toast.error(isBn ? 'কম্প্রেশন ব্যর্থ।' : 'Compression failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <Button
          onClick={compress}
          disabled={files.length === 0 || busy}
          className="w-full"
          variant="secondary"
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isBn ? 'কম্প্রেস হচ্ছে…' : 'Compressing…'}
            </>
          ) : (
            <>
              <Minimize2 className="mr-2 h-4 w-4" />
              {isBn ? 'কম্প্রেস করুন' : 'Compress PDF'}
            </>
          )}
        </Button>

        {result && !busy && (
          <div className={`rounded-lg border p-3 space-y-2 ${result.increased ? 'border-amber-500/30 bg-amber-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
            <div className="flex items-center gap-2">
              {result.increased ? (
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              )}
              <span className="text-xs font-medium">
                {result.increased
                  ? (isBn ? 'আকার বেড়েছে' : 'Size Increased')
                  : (isBn ? 'কম্প্রেশন সফল' : 'Compression Successful')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">{isBn ? 'মূল:' : 'Original:'}</span>{' '}
                <span className="font-medium">{humanSize(result.originalSize)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{isBn ? 'কম্প্রেসড:' : 'Compressed:'}</span>{' '}
                <span className="font-medium">{humanSize(result.compressedSize)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{isBn ? 'পেজ:' : 'Pages:'}</span>{' '}
                <span className="font-medium">{bn(result.pageCount)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{isBn ? 'পরিবর্তন:' : 'Change:'}</span>{' '}
                <span className={`font-medium ${result.increased ? 'text-amber-600' : 'text-green-600'}`}>
                  {result.increased ? '+' : ''}{bn(Math.abs(result.reduction))}%
                </span>
              </div>
            </div>
            {result.increased && (
              <p className="text-xs text-muted-foreground">
                {isBn
                  ? 'মূল ফাইল ইতিমধ্যে সংকুচিত ছিল — কম্প্রেশন কম কার্যকর।'
                  : 'The original file may already be highly compressed.'}
              </p>
            )}
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
