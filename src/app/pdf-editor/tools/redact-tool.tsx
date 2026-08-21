'use client'

/**
 * ============================================================================
 * PDF FORGE — Wave 4D Redact Tool (TRUE PDF Redaction)
 * ----------------------------------------------------------------------------
 * Implementation of TRUE redaction: target text is physically removed from
 * the PDF content stream via operator surgery (proven by POC). A black
 * rectangle is drawn at each redaction site as a visual marker, but the
 * underlying text glyphs are GONE — not hidden, not overlaid.
 *
 * User flow:
 *   1. Pick a PDF
 *   2. Enter text(s) to redact (one per line, or comma-separated)
 *   3. Preview matches found across all pages
 *   4. Review the permanent-removal warning
 *   5. Apply → download redacted PDF
 *
 * Security:
 *   - All processing client-side (no server upload)
 *   - enableScripting: false on all PDF.js calls
 *   - No eval(), no dynamic code execution
 * ============================================================================
 */

import * as React from 'react'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, ShieldCheck, Search, AlertTriangle, CheckCircle2, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'
import { redactPDF, findTextInPDF, type TextMatch } from './redact-engine'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function RedactTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [query, setQuery] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [matches, setMatches] = React.useState<TextMatch[] | null>(null)
  const [result, setResult] = React.useState<{ size: number; count: number } | null>(null)
  const [acknowledged, setAcknowledged] = React.useState(false)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const targets = React.useMemo(() => {
    return query
      .split('\n')
      .flatMap(l => l.split(','))
      .map(s => s.trim())
      .filter(s => s.length > 0)
  }, [query])

  const preview = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (targets.length === 0) { toast.error(isBn ? 'রিড্যাক্ট করার টেক্সট দিন।' : 'Enter text to redact.'); return }
    setBusy(true); setProgress(20)
    try {
      const buf = await files[0].arrayBuffer()
      setProgress(50)
      const allMatches: TextMatch[] = []
      for (const t of targets) {
        const m = await findTextInPDF(new Uint8Array(buf), t)
        allMatches.push(...m)
      }
      setProgress(100)
      setMatches(allMatches)
      if (allMatches.length === 0) {
        toast.info(isBn ? 'কোনো ম্যাচ পাওয়া যায়নি।' : 'No matches found.')
      } else {
        toast.success(isBn ? `${bn(allMatches.length)}টি ম্যাচ পাওয়া গেছে।` : `Found ${allMatches.length} match(es).`)
      }
    } catch (err) {
      console.error('[Redact preview]', err)
      toast.error(isBn ? 'প্রিভিউ ব্যর্থ।' : 'Preview failed.')
    } finally { setBusy(false); setProgress(0) }
  }

  const apply = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (targets.length === 0) { toast.error(isBn ? 'রিড্যাক্ট করার টেক্সট দিন।' : 'Enter text to redact.'); return }
    if (!acknowledged) { toast.error(isBn ? 'সতর্কতা অনুমোদন করুন।' : 'Acknowledge the warning first.'); return }
    setBusy(true); setProgress(10)
    try {
      const buf = await files[0].arrayBuffer()
      setProgress(25)
      const redactions = targets.flatMap(t => {
        const ms = (matches || []).filter(m => m.text === t)
        if (ms.length > 0) return ms.map(m => ({ pageIndex: m.pageIndex, text: m.text }))
        return [{ pageIndex: 0, text: t }] // fallback: try page 0
      })
      // Deduplicate by pageIndex+text
      const seen = new Set<string>()
      const unique = redactions.filter(r => {
        const k = `${r.pageIndex}|${r.text}`
        if (seen.has(k)) return false
        seen.add(k); return true
      })
      setProgress(40)
      const doc = await redactPDF(new Uint8Array(buf), unique)
      setProgress(75)
      const out = await doc.save()
      setProgress(90)
      const blob = new Blob([new Uint8Array(out)], { type: 'application/pdf' })
      saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '-redacted.pdf')
      setProgress(100)
      setResult({ size: out.length, count: unique.length })
      toast.success(isBn ? `${bn(unique.length)}টি রিড্যাকশন প্রয়োগ হয়েছে।` : `Applied ${unique.length} redaction(s).`)
    } catch (err) {
      console.error('[Redact apply]', err)
      toast.error(isBn ? 'রিড্যাকশন ব্যর্থ।' : 'Redaction failed.')
    } finally { setBusy(false); setProgress(0) }
  }

  const reset = () => {
    setQuery(''); setMatches(null); setResult(null); setAcknowledged(false)
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'রিড্যাক্ট করার টেক্সট' : 'Text to Redact'}
          </Label>
          <Textarea
            value={query}
            onChange={(e) => { setQuery(e.target.value); setMatches(null); setResult(null) }}
            placeholder={isBn ? 'প্রতি লাইনে একটি করে টেক্সট\নয়েম: SSN-123-45-6789' : 'One text per line, or comma-separated&#10;e.g. SSN-123-45-6789&#10;secret@internal.com'}
            className="min-h-[100px] font-mono text-sm"
            disabled={busy}
          />
          <p className="text-xs text-muted-foreground">
            {isBn
              ? `প্রতিটি লাইনের টেক্সট পিডিএফ থেকে স্থায়ীভাবে মুছে ফেলা হবে। (${bn(targets.length)} টার্গেট)`
              : `Each line of text will be permanently removed from the PDF. (${targets.length} target(s))`}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={preview} disabled={files.length === 0 || targets.length === 0 || busy} variant="outline" className="flex-1">
            {busy && progress > 0 && progress < 60 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            {isBn ? 'ম্যাচ খুঁজুন' : 'Find Matches'}
          </Button>
        </div>

        {matches !== null && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-xs font-medium">{isBn ? 'ম্যাচ প্রিভিউ' : 'Match Preview'}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {matches.length === 0
                ? (isBn ? 'কোনো ম্যাচ পাওয়া যায়নি।' : 'No matches found in the PDF.')
                : (isBn
                    ? `${bn(matches.length)}টি ম্যাচ পাওয়া গেছে ${bn(new Set(matches.map(m => m.pageIndex)).size)} পেজে।`
                    : `${matches.length} match(es) found across ${new Set(matches.map(m => m.pageIndex)).size} page(s).`)}
            </p>
            {matches.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1 mt-2">
                {matches.slice(0, 10).map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono px-1.5 py-0.5 rounded bg-muted">p{bn(m.pageIndex + 1)}</span>
                    <span className="truncate">{m.text}</span>
                  </div>
                ))}
                {matches.length > 10 && (
                  <p className="text-xs text-muted-foreground">+{bn(matches.length - 10)} more...</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className={`rounded-lg border p-3 space-y-2 ${acknowledged ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
          <div className="flex gap-2">
            <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${acknowledged ? 'text-green-600' : 'text-amber-600'}`} />
            <div className="space-y-1">
              <p className="text-xs font-medium">{isBn ? 'স্থায়ী অপসারণ সতর্কতা' : 'Permanent Removal Warning'}</p>
              <p className="text-xs text-muted-foreground">
                {isBn
                  ? 'রিড্যাকশন নির্বাচিত টেক্সট এক্সপোর্ট করা পিডিএফ থেকে স্থায়ীভাবে মুছে ফেলে। শেয়ার করার আগে ফলাফল যাচাই করুন।'
                  : 'Redaction permanently removes selected text from the exported PDF. The underlying glyphs are physically deleted from the content stream — not hidden, not overlaid. Verify the result before sharing.'}
              </p>
              <label className="flex items-center gap-2 text-xs cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="rounded"
                />
                <span>{isBn ? 'আমি বুঝতে পেরেছি এটি অপরিবর্তনীয়।' : 'I understand this is irreversible.'}</span>
              </label>
            </div>
          </div>
        </div>

        <Button onClick={apply} disabled={files.length === 0 || targets.length === 0 || busy || !acknowledged} className="w-full" variant="secondary">
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'রিড্যাক্ট হচ্ছে…' : 'Redacting…'}</> : <><ShieldCheck className="mr-2 h-4 w-4" />{isBn ? 'রিড্যাকশন প্রয়োগ করুন' : 'Apply Redaction'}</>}
        </Button>

        {busy && progress > 0 && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
          </div>
        )}

        {result && !busy && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">{isBn ? 'রিড্যাকশন সফল' : 'Redaction Successful'}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isBn ? `আউটপুট: ${humanSize(result.size)} | ${bn(result.count)}টি রিড্যাকশন` : `Output: ${humanSize(result.size)} | ${result.count} redaction(s)`}
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Eye className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{isBn ? 'ফলাফল যাচাই করতে আউটপুট খুলে নিশ্চিত করুন যে টেক্সট আর নেই।' : 'Open the output and confirm the text is no longer selectable, searchable, or copyable.'}</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => { reset(); onOpenChange(false) }}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
