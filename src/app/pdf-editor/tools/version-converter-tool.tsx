'use client'

/**
 * ============================================================================
 * PDF Version Converter Tool — Phase 2C Wave 3A
 * ----------------------------------------------------------------------------
 * Converts PDF version header by modifying the %PDF-X.X header bytes.
 *
 * CRITICAL: pdf-lib@1.17.1's save({ version }) does NOT work — it always
 * emits %PDF-1.7. This tool manually modifies the header bytes after save.
 *
 * Limitation: This is header-level conversion. It does NOT convert PDF
 * features to be compatible with the target version. Downgrading may
 * produce a PDF that contains features unsupported by the target version.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Repeat, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

const SUPPORTED_VERSIONS = ['1.4', '1.5', '1.6', '1.7', '2.0'] as const
type PdfVersion = typeof SUPPORTED_VERSIONS[number]

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function VersionConverterTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [targetVersion, setTargetVersion] = React.useState<PdfVersion>('1.4')
  const [busy, setBusy] = React.useState(false)
  const [result, setResult] = React.useState<{ originalVersion: string; targetVersion: string; size: number } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const convert = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setResult(null)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)

      // Detect original version from header
      const headerStr = Buffer.from(bytes.slice(0, 10)).toString('latin1')
      const originalMatch = headerStr.match(/%PDF-(\d+\.\d+)/)
      const originalVersion = originalMatch ? originalMatch[1] : 'unknown'

      // Load with pdf-lib
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pageCount = doc.getPageCount()

      // Save normally (pdf-lib always produces 1.7)
      const savedBytes = await doc.save({ useObjectStreams: false })

      // Modify header bytes to target version
      const modifiedBytes = new Uint8Array(savedBytes)
      const newHeader = `%PDF-${targetVersion}`
      for (let i = 0; i < newHeader.length; i++) {
        modifiedBytes[i] = newHeader.charCodeAt(i)
      }

      // Verify: reload the modified PDF
      const reloaded = await PDFDocument.load(modifiedBytes)
      if (reloaded.getPageCount() !== pageCount) {
        throw new Error('Page count mismatch after version conversion')
      }

      // Verify header
      const verifyHeader = Buffer.from(modifiedBytes.slice(0, 10)).toString('latin1')
      if (!verifyHeader.startsWith(`%PDF-${targetVersion}`)) {
        throw new Error('Header verification failed')
      }

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + `-v${targetVersion}.pdf`
      await downloadValidatedPdf(modifiedBytes, filename, pageCount)

      setResult({ originalVersion, targetVersion, size: modifiedBytes.length })
      toast.success(isBn
        ? `পিডিএফ ভার্সন ${bn(targetVersion)} এ কনভার্ট হয়েছে।`
        : `PDF converted to version ${targetVersion}.`)
    } catch (err) {
      console.error('[Version Converter] Failed:', err)
      toast.error(isBn
        ? 'কনভার্সন ব্যর্থ — ফাইল নষ্ট হতে পারে।'
        : 'Conversion failed — file may be corrupt.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'টার্গেট ভার্সন' : 'Target Version'}
          </Label>
          <Select value={targetVersion} onValueChange={(v) => setTargetVersion(v as PdfVersion)} disabled={busy}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_VERSIONS.map(v => (
                <SelectItem key={v} value={v}>PDF {v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Warning */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'ভার্সন ডাউনগ্রেড করলে টার্গেট ভার্সনে অসমর্থিত ফিচার কাজ নাও করতে পারে। এটি শুধুমাত্র হেডার পরিবর্তন করে।'
                : 'Downgrading may affect features unsupported by the target version. This modifies the PDF header only.'}
            </p>
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
              {isBn ? 'কনভার্ট হচ্ছে…' : 'Converting…'}
            </>
          ) : (
            <>
              <Repeat className="mr-2 h-4 w-4" />
              {isBn ? 'ভার্সন কনভার্ট করুন' : 'Convert Version'}
            </>
          )}
        </Button>

        {result && !busy && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">
                {isBn ? 'কনভার্সন সফল' : 'Conversion successful'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isBn ? `ভার্সন: ${bn(result.originalVersion)} → ${bn(result.targetVersion)}` : `Version: ${result.originalVersion} → ${result.targetVersion}`}
            </p>
            <p className="text-xs text-muted-foreground">
              {isBn ? `আউটপুট: ${humanSize(result.size)}` : `Output: ${humanSize(result.size)}`}
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
