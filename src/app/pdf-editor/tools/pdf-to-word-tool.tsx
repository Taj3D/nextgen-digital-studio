'use client'

/**
 * ============================================================================
 * PDF to Word Tool — Phase 2C Wave 4A
 * ----------------------------------------------------------------------------
 * Converts PDF to .docx using pdfjs text extraction + docx library.
 *
 * HONEST LIMITATION: "Structured conversion. Complex layouts, scanned pages
 * and embedded font formatting may require manual cleanup."
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun, PageBreak } from 'docx'
import type { PdfTool } from '../pdf-tools'

export function PdfToWordTool({ tool, isBn, open, onOpenChange }: {
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

      const paragraphs: Paragraph[] = []

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 90))
        setProgressText(isBn ? `পেজ ${bn(i)}/${bn(numPages)} এক্সট্র্যাক্ট হচ্ছে…` : `Extracting page ${i}/${numPages}…`)

        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()

        // Reconstruct text into paragraphs
        let currentLine = ''
        let lastY: number | null = null

        for (const item of textContent.items) {
          if ('str' in item) {
            const y = 'transform' in item ? item.transform[5] : null
            if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
              if (currentLine.trim()) {
                paragraphs.push(new Paragraph({ children: [new TextRun(currentLine.trim())] }))
              }
              currentLine = ''
            }
            currentLine += item.str
            if (y !== null) lastY = y
          }
        }

        if (currentLine.trim()) {
          paragraphs.push(new Paragraph({ children: [new TextRun(currentLine.trim())] }))
        }

        // Add page break between pages (except last)
        if (i < numPages) {
          paragraphs.push(new Paragraph({ children: [new PageBreak()] }))
        }

        await page.cleanup()
      }

      setProgress(95)
      setProgressText(isBn ? 'DOCX তৈরি হচ্ছে…' : 'Generating DOCX…')

      // Generate DOCX
      const docxDoc = new Document({
        sections: [{ children: paragraphs }],
      })

      const blob = await Packer.toBlob(docxDoc)

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '.docx'
      saveAs(blob, filename)

      setProgress(100)
      toast.success(isBn
        ? `${bn(numPages)}টি পেজ থেকে DOCX তৈরি হয়েছে।`
        : `DOCX generated from ${numPages} page(s).`)

      await doc.cleanup()
      await doc.loadingTask.destroy()
    } catch (err) {
      console.error('[PDF to Word] Failed:', err)
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
                ? 'স্ট্রাকচার্ড রূপান্তর। জটিল লেআউট ও স্ক্যান করা পেজে ম্যানুয়াল সম্পাদনা প্রয়োজন।'
                : 'Structured conversion. Complex layouts, scanned pages and embedded font formatting may require manual cleanup.'}
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
              <FileText className="mr-2 h-4 w-4" />
              {isBn ? 'Word এ রূপান্তর করুন' : 'Convert to Word'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all" style={{ width: `${progress}%` }} />
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
