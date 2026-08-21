'use client'

/**
 * ============================================================================
 * PDF OCR Tool — Phase 2B
 * ----------------------------------------------------------------------------
 * Extracts text from SCANNED (image-only) PDFs using Tesseract.js OCR.
 *
 * Pipeline: PDF bytes → PDF.js render to canvas → Tesseract.js OCR → text.
 *
 * Languages: English (eng), Bangla (ben), Mixed (ben+eng).
 *
 * Self-hosted: All OCR assets (worker, core WASM, trained data) are served
 * same-origin from /public/ocr/. NO external CDN, NO external API.
 *
 * Privacy: PDF and OCR text NEVER leave the browser. No analytics on content.
 *
 * Lazy-loaded: tesseract.js + pdfjs-dist only load when this tool opens.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import type { PdfDocument } from './pdfjs-setup'
import { createOcrWorker, getSafeRenderScale, isMobileDevice, OCR_LANG_LABELS, type OcrLang, type OcrPageResult } from './ocr-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
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
import { Loader2, Download, ScanText, Copy, X, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'

type Phase = 'idle' | 'loading-engine' | 'loading-lang' | 'rendering' | 'recognizing' | 'complete' | 'error'

export function PdfOcrTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [lang, setLang] = React.useState<OcrLang>('eng')
  const [phase, setPhase] = React.useState<Phase>('idle')
  const [progress, setProgress] = React.useState(0)
  const [statusText, setStatusText] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  const [results, setResults] = React.useState<OcrPageResult[]>([])
  const [cancelledRef] = React.useState({ current: false })
  const workerRef = React.useRef<Awaited<ReturnType<typeof createOcrWorker>> | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate().catch(() => {})
        workerRef.current = null
      }
    }
  }, [])

  const busy = phase !== 'idle' && phase !== 'complete' && phase !== 'error'

  const cancel = async () => {
    cancelledRef.current = true
    if (workerRef.current) {
      try { await workerRef.current.terminate() } catch {}
      workerRef.current = null
    }
    setPhase('idle')
    setProgress(0)
    setStatusText('')
    setCurrentPage(0)
    toast.info(isBn ? 'OCR বাতিল করা হয়েছে।' : 'OCR cancelled.')
  }

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    cancelledRef.current = false
    setPhase('loading-engine')
    setProgress(2)
    setStatusText(isBn ? 'OCR ইঞ্জিন লোড হচ্ছে…' : 'Loading OCR engine…')
    setResults([])

    let doc: PdfDocument | null = null
    try {
      // 1. Load PDF.js document
      const arrayBuffer = await files[0].arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), // @ts-ignore — enableScripting is a valid DocumentInitParameters option
      enableScripting: false as any })
      doc = await loadingTask.promise
      setTotalPages(doc.numPages)

      // 2. Create OCR worker (self-hosted assets)
      setPhase('loading-lang')
      setStatusText(isBn
        ? `${OCR_LANG_LABELS[lang].bn} ভাষার ডেটা লোড হচ্ছে…`
        : `Loading ${OCR_LANG_LABELS[lang].en} language data…`)
      setProgress(5)

      const worker = await createOcrWorker(lang, (status, prog) => {
        if (cancelledRef.current) return
        if (status === 'recognizing text') {
          setPhase('recognizing')
          const numPages = doc?.numPages ?? totalPages
          // Map tesseract progress (0-1) to overall progress (10-90 for page X)
          const pageBase = 10 + ((currentPage - 1) / numPages) * 80
          const pageSpan = (1 / numPages) * 80
          setProgress(Math.round(pageBase + prog * pageSpan))
          setStatusText(isBn
            ? `পেজ ${bn(currentPage)}/${bn(numPages)} চিনহতচ্ছে… ${bn(Math.round(prog * 100))}%`
            : `Recognizing page ${currentPage}/${numPages}… ${Math.round(prog * 100)}%`)
        } else if (status.includes('loading') || status.includes('initializing')) {
          setStatusText(isBn ? 'ভাষার ডেটা লোড হচ্ছে…' : 'Loading language data…')
        }
      })
      workerRef.current = worker

      if (cancelledRef.current) { await worker.terminate(); return }

      // 3. OCR each page sequentially
      const pageResults: OcrPageResult[] = []
      const isMobile = isMobileDevice()
      const baseScale = 2.0 // ~192 DPI

      for (let i = 1; i <= doc.numPages; i++) {
        if (cancelledRef.current) return

        setCurrentPage(i)
        setPhase('rendering')
        const renderProgress = 5 + Math.round(((i - 1) / doc.numPages) * 5)
        setProgress(renderProgress)
        setStatusText(isBn
          ? `পেজ ${bn(i)}/${bn(doc.numPages)} রেন্ডার হচ্ছে…`
          : `Rendering page ${i}/${doc.numPages}…`)

        const page = await doc.getPage(i)
        const baseViewport = page.getViewport({ scale: 1 })

        // Memory guard: cap canvas dimensions
        const safeScale = getSafeRenderScale(baseScale, baseViewport.width, baseViewport.height, isMobile)
        if (!safeScale) {
          toast.error(isBn
            ? `পেজ ${bn(i)} এই ডিভাইসের জন্য অনেক বড়। ছোট স্ক্যান বা ডেস্কটপে চেষ্টা করুন।`
            : `Page ${i} is too large for OCR on this device. Try a smaller scan or desktop.`)
          pageResults.push({ pageNum: i, text: '', confidence: 0 })
          await page.cleanup()
          continue
        }

        const viewport = page.getViewport({ scale: safeScale.scale })
        const canvas = document.createElement('canvas')
        const canvasCtx = canvas.getContext('2d', { alpha: false })
        if (!canvasCtx) {
          throw new Error('Canvas 2D context not available')
        }
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)

        if (safeScale.capped) {
          toast.info(isBn
            ? `পেজ ${bn(i)} এর রেজোলিউশন কমানো হয়েছে মেমোরি সুরক্ষার জন্য।`
            : `Page ${i} resolution reduced for memory safety.`)
        }

        // Render PDF page to canvas
        await page.render({ canvasContext: canvasCtx, viewport, canvas }).promise

        if (cancelledRef.current) {
          canvas.width = canvas.height = 0
          await page.cleanup()
          return
        }

        // Convert canvas to data URL for tesseract
        const dataUrl = canvas.toDataURL('image/png')

        // Free canvas memory immediately after extracting data URL
        canvas.width = canvas.height = 0

        // OCR the page
        setPhase('recognizing')
        setStatusText(isBn
          ? `পেজ ${bn(i)}/${bn(doc.numPages)} চিনহতচ্ছে…`
          : `Recognizing page ${i}/${doc.numPages}…`)

        const { data } = await worker.recognize(dataUrl)

        if (cancelledRef.current) return

        pageResults.push({
          pageNum: i,
          text: data.text || '',
          confidence: data.confidence || 0,
        })

        // Update partial results for live display
        setResults([...pageResults])

        await page.cleanup()
      }

      // 4. Cleanup
      try { doc.cleanup(); doc.loadingTask.destroy() } catch {}
      try { await worker.terminate() } catch {}
      workerRef.current = null

      if (cancelledRef.current) return

      setPhase('complete')
      setProgress(100)
      setStatusText('')

      const avgConf = pageResults.length > 0
        ? Math.round(pageResults.reduce((s, r) => s + r.confidence, 0) / pageResults.length)
        : 0
      toast.success(isBn
        ? `${bn(doc.numPages)}টি পেজের OCR সম্পন্ন। গড় নির্ভুলতা: ${bn(avgConf)}%`
        : `OCR complete on ${doc.numPages} pages. Avg confidence: ${avgConf}%`)
    } catch (err) {
      console.error('[PDF OCR] Failed:', err)
      try { if (doc) { doc.cleanup(); doc.loadingTask.destroy() } } catch {}
      if (workerRef.current) {
        try { await workerRef.current.terminate() } catch {}
        workerRef.current = null
      }
      if (cancelledRef.current) return

      setPhase('error')
      const msg = err instanceof Error ? err.message : String(err)
      // Honest error: corrupt PDFs, unsupported formats, etc.
      const friendly = msg.includes('corrupt') || msg.includes('Invalid PDF') || msg.includes('parse')
        ? (isBn ? 'পিডিএফ ফাইলটি নষ্ট বা অসমর্থিত।' : 'The PDF file is corrupt or unsupported.')
        : msg.includes('memory') || msg.includes('allocation')
        ? (isBn ? 'মেমোরি অপর্যাপ্ত — ছোট ফাইলে চেষ্টা করুন।' : 'Insufficient memory — try a smaller file.')
        : (isBn ? 'OCR ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' : 'OCR failed. Please try again.')
      toast.error(friendly)
    } finally {
      if (!cancelledRef.current && phase !== 'complete' && phase !== 'error') {
        setPhase('idle')
      }
    }
  }

  const copyPage = async (text: string, pageNum: number) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      toast.success(isBn ? `পেজ ${bn(pageNum)} এর টেক্সট কপি হয়েছে।` : `Page ${pageNum} text copied.`)
    } catch {
      toast.error(isBn ? 'কপি ব্যর্থ।' : 'Copy failed.')
    }
  }

  const copyAll = async () => {
    const allText = results.map(r => `--- Page ${r.pageNum} ---\n${r.text}`).join('\n\n')
    if (!allText) return
    try {
      await navigator.clipboard.writeText(allText)
      toast.success(isBn ? 'সব টেক্সট কপি হয়েছে।' : 'All text copied.')
    } catch {
      toast.error(isBn ? 'কপি ব্যর্থ।' : 'Copy failed.')
    }
  }

  const downloadTxt = () => {
    if (results.length === 0) return
    const allText = results.map(r => `--- Page ${r.pageNum} ---\n${r.text}`).join('\n\n')
    const blob = new Blob([allText], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '-ocr.txt')
    toast.success(isBn ? '.txt ফাইল ডাউনলোড হয়েছে।' : '.txt file downloaded.')
  }

  const allText = results.map(r => r.text).join('\n').trim()
  const hasResults = results.length > 0 && allText.length > 0

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {/* Language selector */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'ভাষা নির্বাচন করুন' : 'Select Language'}
          </Label>
          <Select value={lang} onValueChange={(v) => setLang(v as OcrLang)} disabled={busy}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eng">{isBn ? 'ইংরেজি (English)' : 'English'}</SelectItem>
              <SelectItem value="ben">{isBn ? 'বাংলা (Bangla)' : 'Bangla'}</SelectItem>
              <SelectItem value="ben+eng">{isBn ? 'বাংলা + ইংরেজি (Mixed)' : 'Bangla + English (Mixed)'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            onClick={run}
            disabled={files.length === 0 || busy}
            className="flex-1"
            variant="secondary"
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isBn ? 'প্রসেসিং…' : 'Processing…'}
              </>
            ) : (
              <>
                <ScanText className="mr-2 h-4 w-4" />
                {isBn ? 'OCR চালান' : 'Run OCR'}
              </>
            )}
          </Button>
          {busy && (
            <Button variant="outline" onClick={cancel} size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Progress */}
        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {statusText} ({bn(progress)}%)
            </p>
          </div>
        )}

        {/* Honest disclaimers */}
        {!busy && results.length === 0 && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium text-amber-700 dark:text-amber-400">
                  {isBn ? 'OCR সম্পর্কে গুরুত্বপূর্ণ তথ্য' : 'Important about OCR'}
                </p>
                <p>
                  {isBn
                    ? 'OCR আনুমানিক। গুরুত্বপূর্ণ টেক্সট ম্যানুয়ালি যাচাই করুন।'
                    : 'OCR is approximate. Verify critical text manually.'}
                </p>
                <p>
                  {isBn
                    ? 'বাংলার জন্য: ৩০০ DPI বা তার বেশি পরিষ্কার স্ক্যান থেকে সেরা ফলাফল আসে।'
                    : 'For Bangla: best results come from clear 300 DPI or higher scans.'}
                </p>
                <p className="text-muted-foreground/70">
                  {isBn
                    ? 'PDF এবং টেক্সট আপনার ব্রাউজারেই প্রসেস হয় — কোথাও আপলোড হয় না।'
                    : 'PDF and text are processed in your browser — never uploaded.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {hasResults && !busy && (
          <>
            {/* Summary */}
            <div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/5 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium">
                  {isBn
                    ? `${bn(results.length)}টি পেজ প্রসেস করা হয়েছে`
                    : `${results.length} pages processed`}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {isBn ? 'গড় নির্ভুলতা' : 'Avg confidence'}: {bn(Math.round(results.reduce((s, r) => s + r.confidence, 0) / results.length))}%
              </span>
            </div>

            {/* Per-page results */}
            <div className="max-h-96 overflow-y-auto space-y-3 rounded-lg border border-border/60 bg-muted/30 p-3">
              {results.map((r) => (
                <div key={r.pageNum} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isBn ? `পেজ ${bn(r.pageNum)}` : `Page ${r.pageNum}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${r.confidence >= 70 ? 'text-green-600' : r.confidence >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {bn(Math.round(r.confidence))}%
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                        onClick={() => copyPage(r.text, r.pageNum)}
                        disabled={!r.text}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-xs">
                    {r.text || (isBn ? '(কোনো টেক্সট পাওয়া যায়নি)' : '(no text detected)')}
                  </pre>
                </div>
              ))}
            </div>

            {/* Copy all + Download */}
            <div className="flex gap-2">
              <Button onClick={copyAll} variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                {isBn ? 'সব কপি করুন' : 'Copy All'}
              </Button>
              <Button
                onClick={downloadTxt}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                {isBn ? '.txt ডাউনলোড' : 'Download .txt'}
              </Button>
            </div>
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
