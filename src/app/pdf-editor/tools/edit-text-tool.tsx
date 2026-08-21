'use client'

/**
 * ============================================================================
 * PDF FORGE — Wave 4D Edit-Text Tool (TRUE PDF Text Editing)
 * ----------------------------------------------------------------------------
 * Implementation of TRUE edit-text: the old text is physically removed from
 * the PDF content stream (proven by POC), and the new text is drawn at the
 * same coordinates with a standard font (Helvetica).
 *
 * This is functionally equivalent to how Adobe Acrobat performs text edits
 * under the hood: redact old glyphs → insert new glyphs at same position.
 *
 * User flow:
 *   1. Pick a PDF
 *   2. Add find→replace pairs
 *   3. Preview matches
 *   4. Apply → download edited PDF
 *
 * Honest limitations:
 *   - Replacement font is Helvetica (standard PDF font). Original font may differ.
 *   - Position uses the captured origin of the old text; spacing is approximate.
 *   - Bengali/Unicode in replacement requires the font to support the glyphs.
 *   - This is "destructive replacement" — not in-place glyph modification.
 *
 * Security:
 *   - All processing client-side (no server upload)
 *   - enableScripting: false on all PDF.js calls
 * ============================================================================
 */

import * as React from 'react'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Pencil, Search, CheckCircle2, Plus, X, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'
import { editText, findTextInPDF, type TextMatch } from './redact-engine'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface EditPair { id: string; find: string; replace: string }

export function EditTextTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pairs, setPairs] = React.useState<EditPair[]>([
    { id: 'p1', find: '', replace: '' },
  ])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [matches, setMatches] = React.useState<TextMatch[] | null>(null)
  const [result, setResult] = React.useState<{ size: number; edits: number } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const validPairs = pairs.filter(p => p.find.trim().length > 0)

  const addPair = () => {
    setPairs([...pairs, { id: `p${Date.now()}`, find: '', replace: '' }])
  }
  const removePair = (id: string) => {
    if (pairs.length === 1) return
    setPairs(pairs.filter(p => p.id !== id))
    setMatches(null); setResult(null)
  }
  const updatePair = (id: string, field: 'find' | 'replace', value: string) => {
    setPairs(pairs.map(p => p.id === id ? { ...p, [field]: value } : p))
    setMatches(null); setResult(null)
  }

  const preview = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (validPairs.length === 0) { toast.error(isBn ? 'অন্তত একটি ফাইন্ড→রিপ্লেস দিন।' : 'Add at least one find→replace pair.'); return }
    setBusy(true); setProgress(20)
    try {
      const buf = await files[0].arrayBuffer()
      setProgress(50)
      const allMatches: TextMatch[] = []
      for (const p of validPairs) {
        const m = await findTextInPDF(new Uint8Array(buf), p.find.trim())
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
      console.error('[Edit preview]', err)
      toast.error(isBn ? 'প্রিভিউ ব্যর্থ।' : 'Preview failed.')
    } finally { setBusy(false); setProgress(0) }
  }

  const apply = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (validPairs.length === 0) { toast.error(isBn ? 'অন্তত একটি ফাইন্ড→রিপ্লেস দিন।' : 'Add at least one find→replace pair.'); return }
    setBusy(true); setProgress(10)
    try {
      const buf = await files[0].arrayBuffer()
      setProgress(25)
      const edits = validPairs.map(p => ({ pageIndex: 0, oldText: p.find.trim(), newText: p.replace }))
      setProgress(40)
      const doc = await editText(new Uint8Array(buf), edits)
      setProgress(75)
      const out = await doc.save()
      setProgress(90)
      const blob = new Blob([new Uint8Array(out)], { type: 'application/pdf' })
      saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '-edited.pdf')
      setProgress(100)
      setResult({ size: out.length, edits: validPairs.length })
      toast.success(isBn ? `${bn(validPairs.length)}টি এডিট প্রয়োগ হয়েছে।` : `Applied ${validPairs.length} edit(s).`)
    } catch (err) {
      console.error('[Edit apply]', err)
      toast.error(isBn ? 'এডিট ব্যর্থ।' : 'Edit failed.')
    } finally { setBusy(false); setProgress(0) }
  }

  const reset = () => {
    setPairs([{ id: 'p1', find: '', replace: '' }])
    setMatches(null); setResult(null)
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'ফাইন্ড → রিপ্লেস' : 'Find → Replace'}
          </Label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {pairs.map((p) => (
              <div key={p.id} className="flex gap-2 items-center">
                <Input
                  value={p.find}
                  onChange={(e) => updatePair(p.id, 'find', e.target.value)}
                  placeholder={isBn ? 'খুঁজুন' : 'find'}
                  className="flex-1 font-mono text-sm"
                  disabled={busy}
                />
                <span className="text-muted-foreground text-xs shrink-0">→</span>
                <Input
                  value={p.replace}
                  onChange={(e) => updatePair(p.id, 'replace', e.target.value)}
                  placeholder={isBn ? 'রিপ্লেস' : 'replace'}
                  className="flex-1 font-mono text-sm"
                  disabled={busy}
                />
                <Button variant="ghost" size="icon" onClick={() => removePair(p.id)} disabled={busy || pairs.length === 1} className="shrink-0 h-8 w-8">
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addPair} disabled={busy} className="w-full">
            <Plus className="mr-2 h-3.5 w-3.5" />{isBn ? 'আরেকটি যোগ করুন' : 'Add another'}
          </Button>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <div className="flex gap-2">
            <Pencil className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'পুরোনো টেক্সট পিডিএফ থেকে মুছে ফেলা হবে এবং নতুন টেক্সট একই অবস্থানে Helvetica ফন্টে বসানো হবে। ফন্ট মিল নাও হতে পারে।'
                : 'Old text is removed from the PDF content stream and replaced with new text at the same position using Helvetica font. Font matching is approximate.'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={preview} disabled={files.length === 0 || validPairs.length === 0 || busy} variant="outline" className="flex-1">
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
                ? (isBn ? 'কোনো ম্যাচ পাওয়া যায়নি।' : 'No matches found.')
                : (isBn
                    ? `${bn(matches.length)}টি ম্যাচ পাওয়া গেছে।`
                    : `${matches.length} match(es) found.`)}
            </p>
          </div>
        )}

        <Button onClick={apply} disabled={files.length === 0 || validPairs.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'এডিট হচ্ছে…' : 'Editing…'}</> : <><Pencil className="mr-2 h-4 w-4" />{isBn ? 'এডিট প্রয়োগ করুন' : 'Apply Edits'}</>}
        </Button>

        {busy && progress > 0 && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
          </div>
        )}

        {result && !busy && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">{isBn ? 'এডিট সফল' : 'Edit Successful'}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isBn ? `আউটপুট: ${humanSize(result.size)} | ${bn(result.edits)}টি এডিট` : `Output: ${humanSize(result.size)} | ${result.edits} edit(s)`}
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{isBn ? 'ফলাফল যাচাই করুন — ফন্ট ও অবস্থান হুবহু মিলছে কিনা।' : 'Verify the result — font and exact positioning may differ slightly from the original.'}</span>
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
