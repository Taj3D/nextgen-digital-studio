'use client'

/**
 * ============================================================================
 * Repair PDF Tool — Phase 2C Wave 3A
 * ----------------------------------------------------------------------------
 * Attempts to normalize/rebuild PDF structure by loading with pdf-lib
 * and re-serializing. This rebuilds the xref table and normalizes structure.
 *
 * Limitation: Cannot repair PDFs that pdf-lib cannot parse at all
 * (missing header, completely broken structure). If load fails, the tool
 * reports failure honestly — no fake repaired output.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Wrench, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function RepairTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [result, setResult] = React.useState<{ success: boolean; pageCount: number; size: number; message: string } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const repair = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setResult(null)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)

      // Attempt to load — this is where truly corrupt PDFs will fail
      let doc: PDFDocument
      try {
        doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      } catch (loadErr) {
        // Cannot load — cannot repair
        setResult({
          success: false,
          pageCount: 0,
          size: 0,
          message: isBn
            ? 'পিডিএফ পার্স করা যায়নি। ফাইলটি খুবই নষ্ট বা অসমর্থিত কাঠামো ব্যবহার করে।'
            : 'This PDF could not be parsed by the repair engine. The file may be too severely corrupted or use unsupported PDF structures.',
        })
        toast.error(isBn ? 'রিপেয়ার ব্যর্থ — পিডিএফ পার্স করা যায়নি।' : 'Repair failed — PDF could not be parsed.')
        return
      }

      const pageCount = doc.getPageCount()

      // Re-serialize with reliable settings (useObjectStreams: false for max compatibility)
      const repairedBytes = await doc.save({ useObjectStreams: false })

      // Validate: reload the repaired output
      const reloaded = await PDFDocument.load(repairedBytes)
      if (reloaded.getPageCount() !== pageCount) {
        throw new Error('Page count mismatch after repair')
      }

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-repaired.pdf'
      await downloadValidatedPdf(repairedBytes, filename, pageCount)

      setResult({
        success: true,
        pageCount,
        size: repairedBytes.length,
        message: isBn
          ? `রিপেয়ার সফল — ${bn(pageCount)}টি পেজ, ${humanSize(repairedBytes.length)}।`
          : `Repair successful — ${pageCount} pages, ${humanSize(repairedBytes.length)}.`,
      })
      toast.success(isBn
        ? 'পিডিএফ রিপেয়ার সফল হয়েছে।'
        : 'PDF repaired successfully.')
    } catch (err) {
      console.error('[Repair] Failed:', err)
      setResult({
        success: false,
        pageCount: 0,
        size: 0,
        message: isBn
          ? 'রিপেয়ার ব্যর্থ — অপ্রত্যাশিত ত্রুটি।'
          : 'Repair failed — unexpected error.',
      })
      toast.error(isBn ? 'রিপেয়ার ব্যর্থ।' : 'Repair failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <Button
          onClick={repair}
          disabled={files.length === 0 || busy}
          className="w-full"
          variant="secondary"
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isBn ? 'রিপেয়ার হচ্ছে…' : 'Repairing…'}
            </>
          ) : (
            <>
              <Wrench className="mr-2 h-4 w-4" />
              {isBn ? 'রিপেয়ার করুন' : 'Repair PDF'}
            </>
          )}
        </Button>

        {result && !busy && (
          <div className={`rounded-lg border p-3 space-y-1 ${result.success ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-xs font-medium">
                {result.success
                  ? (isBn ? 'রিপেয়ার সফল' : 'Repair Successful')
                  : (isBn ? 'রিপেয়ার ব্যর্থ' : 'Repair Failed')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{result.message}</p>
            {!result.success && (
              <div className="flex gap-2 mt-1">
                <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  {isBn
                    ? 'এই পিডিএফ খুবই নষ্ট — পার্স করা যায়নি।'
                    : 'This PDF is too corrupted to parse.'}
                </p>
              </div>
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
