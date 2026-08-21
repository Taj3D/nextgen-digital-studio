'use client'

/**
 * ============================================================================
 * PDF to Text Tool — Phase 1B
 * ----------------------------------------------------------------------------
 * Uses PDF.js getTextContent() to extract selectable text from PDF pages.
 * Downloads as .txt file.
 * Honestly labeled "Extract selectable text from PDF" — not OCR.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Download, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'

export function PdfToTextTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [extractedText, setExtractedText] = React.useState<string>('')
  const [pageCount, setPageCount] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    setExtractedText('')
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), // @ts-ignore — enableScripting is a valid DocumentInitParameters option
      enableScripting: false as any })
      const doc = await loadingTask.promise
      setPageCount(doc.numPages)

      let fullText = ''
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()

        // Reconstruct text from items
        let pageText = ''
        let lastY: number | null = null
        for (const item of textContent.items) {
          if ('str' in item) {
            const str = item.str
            const y = 'transform' in item ? item.transform[5] : null
            // Add line break if Y position changed significantly
            if (lastY !== null && y !== null && Math.abs(y - lastY) > 2) {
              pageText += '\n'
            }
            pageText += str
            if ('hasEOL' in item && item.hasEOL) {
              pageText += '\n'
            }
            lastY = y
          }
        }

        fullText += `--- Page ${i} ---\n`
        fullText += pageText + '\n\n'

        setProgress(5 + Math.round((i / doc.numPages) * 90))
      }

      try { doc.cleanup(); doc.loadingTask.destroy(); } catch { /* ignore */ }

      if (fullText.trim().length === 0 || fullText.replace(/--- Page \d+ ---\s*/g, '').trim().length === 0) {
        setExtractedText('')
        toast.info(
          isBn
            ? 'এই পিডিএফে কোনো নির্বাচনযোগ্য টেক্সট পাওয়া যায়নি।'
            : 'No selectable text found in this PDF.',
        )
      } else {
        setExtractedText(fullText)
        toast.success(
          isBn
            ? `${bn(doc.numPages)}টি পেজ থেকে টেক্সট এক্সট্র্যাক্ট হয়েছে।`
            : `Extracted text from ${doc.numPages} pages.`,
        )
      }
    } catch (err) {
      console.error('[PDF to Text] Extraction failed:', err)
      toast.error(
        isBn
          ? 'টেক্সট এক্সট্র্যাকশন ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Text extraction failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  const download = () => {
    if (!extractedText) return
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '.txt')
    toast.success(isBn ? 'টেক্সট ফাইল ডাউনলোড হয়েছে।' : 'Text file downloaded.')
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <Button
          onClick={run}
          disabled={files.length === 0 || busy}
          className="w-full"
          variant="secondary"
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isBn ? 'এক্সট্র্যাক্ট হচ্ছে…' : 'Extracting…'}
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              {isBn ? 'টেক্সট এক্সট্র্যাক্ট করুন' : 'Extract Text'}
            </>
          )}
        </Button>

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

        {extractedText && !busy && (
          <>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'এক্সট্র্যাক্টেড টেক্সট' : 'Extracted Text'}
              </p>
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words text-xs">
                {extractedText.substring(0, 2000)}
                {extractedText.length > 2000 && '\n…'}
              </pre>
            </div>
            <Button
              onClick={download}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              <Download className="mr-2 h-4 w-4" />
              {isBn ? '.txt ডাউনলোড করুন' : 'Download .txt'}
            </Button>
          </>
        )}

        {!extractedText && !busy && files.length > 0 && pageCount === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {isBn
              ? 'টেক্সট এক্সট্র্যাক্ট করতে বোতামে ক্লিক করুন।'
              : 'Click the button to extract text.'}
          </p>
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
