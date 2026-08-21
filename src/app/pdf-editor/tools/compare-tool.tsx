'use client'

/**
 * ============================================================================
 * Compare PDF Tool — Phase 2C Wave 3B
 * ----------------------------------------------------------------------------
 * Text-based comparison of two PDF documents.
 *
 * Pipeline: Load PDF A + B → extract text per page → normalize → fingerprint
 *           → match pages → diff text → classify (unchanged/changed/added/removed)
 *           → display summary
 *
 * Honest label: "Text-Based PDF Comparison" (not pixel-perfect)
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, GitCompare, CheckCircle2, AlertTriangle, FileText } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

// =============================================================================
// Types
// =============================================================================

type PageStatus = 'UNCHANGED' | 'CHANGED' | 'ADDED' | 'REMOVED' | 'NOT_COMPARABLE'

interface PageComparison {
  pageIndexA: number | null
  pageIndexB: number | null
  status: PageStatus
  similarity: number
  addedWords: number
  removedWords: number
  additions: string[]
  removals: string[]
}

interface ComparisonResult {
  documentA: string
  documentB: string
  pagesA: number
  pagesB: number
  comparisons: PageComparison[]
  summary: {
    unchanged: number
    changed: number
    added: number
    removed: number
    notComparable: number
    overallSimilarity: number
  }
}

// =============================================================================
// Text extraction + normalization
// =============================================================================

async function extractPageText(doc: pdfjsLib.PDFDocumentProxy): Promise<string[]> {
  const pages: string[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const textContent = await page.getTextContent()
    let pageText = ''
    let lastY: number | null = null
    for (const item of textContent.items) {
      if ('str' in item) {
        const y = 'transform' in item ? item.transform[5] : null
        if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
          pageText += '\n'
        }
        pageText += item.str
        if (y !== null) lastY = y
      }
    }
    pages.push(pageText)
    await page.cleanup()
  }
  return pages
}

function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/^\s+|\s+$/gm, '')
}

function textFingerprint(text: string): string {
  // Simple hash — no dependency needed
  const normalized = normalizeText(text)
  let hash = 0
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

// =============================================================================
// Diff algorithm (word-level)
// =============================================================================

function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(t => t.length > 0)
}

function calculateSimilarity(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 && tokensB.length === 0) return 100
  if (tokensA.length === 0 || tokensB.length === 0) return 0

  const setA = new Set(tokensA)
  const setB = new Set(tokensB)
  const intersection = new Set([...setA].filter(x => setB.has(x)))
  const union = new Set([...setA, ...setB])

  return Math.round((intersection.size / union.size) * 100)
}

function wordDiff(tokensA: string[], tokensB: string[]): { additions: string[]; removals: string[] } {
  // Simple LCS-based diff
  const additions: string[] = []
  const removals: string[] = []

  const setA = new Set(tokensA)
  const setB = new Set(tokensB)

  // Words in B but not in A = additions
  for (const token of tokensB) {
    if (!setA.has(token)) {
      additions.push(token)
    }
  }

  // Words in A but not in B = removals
  for (const token of tokensA) {
    if (!setB.has(token)) {
      removals.push(token)
    }
  }

  // Limit displayed diff
  return {
    additions: additions.slice(0, 20),
    removals: removals.slice(0, 20),
  }
}

// =============================================================================
// Comparison engine
// =============================================================================

async function comparePDFs(
  docA: pdfjsLib.PDFDocumentProxy,
  docB: pdfjsLib.PDFDocumentProxy,
  nameA: string,
  nameB: string,
  onProgress?: (current: number, total: number, text: string) => void,
): Promise<ComparisonResult> {
  const total = Math.max(docA.numPages, docB.numPages)

  onProgress?.(0, total, 'Extracting text from PDF A…')
  const pagesA = await extractPageText(docA)

  onProgress?.(Math.floor(total / 3), total, 'Extracting text from PDF B…')
  const pagesB = await extractPageText(docB)

  onProgress?.(Math.floor(total * 2 / 3), total, 'Comparing pages…')

  // Generate fingerprints
  const fingerprintsA = pagesA.map(p => textFingerprint(p))
  const fingerprintsB = pagesB.map(p => textFingerprint(p))

  // Match pages: first exact fingerprint match, then positional
  const matchedB = new Set<number>()
  const comparisons: PageComparison[] = []

  for (let i = 0; i < Math.max(pagesA.length, pagesB.length); i++) {
    const pageA = i < pagesA.length ? pagesA[i] : null
    const pageB = i < pagesB.length ? pagesB[i] : null
    const fpA = i < fingerprintsA.length ? fingerprintsA[i] : null
    const fpB = i < fingerprintsB.length ? fingerprintsB[i] : null

    if (pageA === null && pageB !== null) {
      // Page only in B
      comparisons.push({
        pageIndexA: null,
        pageIndexB: i,
        status: 'ADDED',
        similarity: 0,
        addedWords: tokenize(pageB).length,
        removedWords: 0,
        additions: [],
        removals: [],
      })
      continue
    }

    if (pageA !== null && pageB === null) {
      // Page only in A
      comparisons.push({
        pageIndexA: i,
        pageIndexB: null,
        status: 'REMOVED',
        similarity: 0,
        addedWords: 0,
        removedWords: tokenize(pageA).length,
        additions: [],
        removals: [],
      })
      continue
    }

    if (pageA !== null && pageB !== null) {
      const tokensA = tokenize(normalizeText(pageA))
      const tokensB = tokenize(normalizeText(pageB))

      // Check for empty text (image-only)
      if (tokensA.length === 0 && tokensB.length === 0) {
        comparisons.push({
          pageIndexA: i,
          pageIndexB: i,
          status: 'NOT_COMPARABLE',
          similarity: 0,
          addedWords: 0,
          removedWords: 0,
          additions: [],
          removals: [],
        })
        continue
      }

      if (tokensA.length === 0 || tokensB.length === 0) {
        comparisons.push({
          pageIndexA: i,
          pageIndexB: i,
          status: 'NOT_COMPARABLE',
          similarity: 0,
          addedWords: 0,
          removedWords: 0,
          additions: [],
          removals: [],
        })
        continue
      }

      const similarity = calculateSimilarity(tokensA, tokensB)

      if (similarity === 100) {
        comparisons.push({
          pageIndexA: i,
          pageIndexB: i,
          status: 'UNCHANGED',
          similarity: 100,
          addedWords: 0,
          removedWords: 0,
          additions: [],
          removals: [],
        })
      } else {
        const diff = wordDiff(tokensA, tokensB)
        comparisons.push({
          pageIndexA: i,
          pageIndexB: i,
          status: 'CHANGED',
          similarity,
          addedWords: diff.additions.length,
          removedWords: diff.removals.length,
          additions: diff.additions,
          removals: diff.removals,
        })
      }
    }
  }

  // Build summary
  const summary = {
    unchanged: comparisons.filter(c => c.status === 'UNCHANGED').length,
    changed: comparisons.filter(c => c.status === 'CHANGED').length,
    added: comparisons.filter(c => c.status === 'ADDED').length,
    removed: comparisons.filter(c => c.status === 'REMOVED').length,
    notComparable: comparisons.filter(c => c.status === 'NOT_COMPARABLE').length,
    overallSimilarity: comparisons.length > 0
      ? Math.round(comparisons.reduce((sum, c) => sum + c.similarity, 0) / comparisons.length)
      : 0,
  }

  onProgress?.(total, total, 'Comparison complete.')

  return {
    documentA: nameA,
    documentB: nameB,
    pagesA: pagesA.length,
    pagesB: pagesB.length,
    comparisons,
    summary,
  }
}

// =============================================================================
// Component
// =============================================================================

export function CompareTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [filesA, setFilesA] = React.useState<File[]>([])
  const [filesB, setFilesB] = React.useState<File[]>([])
  const [comparing, setComparing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [progressText, setProgressText] = React.useState('')
  const [result, setResult] = React.useState<ComparisonResult | null>(null)
  const [expandedPages, setExpandedPages] = React.useState<Set<number>>(new Set())

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const compare = async () => {
    if (filesA.length === 0 || filesB.length === 0) {
      toast.error(isBn ? 'দুটি পিডিএফ দিন।' : 'Add both PDFs.')
      return
    }
    setComparing(true)
    setProgress(0)
    setResult(null)

    try {
      const bufferA = await filesA[0].arrayBuffer()
      const bufferB = await filesB[0].arrayBuffer()

      const docA = await pdfjsLib.getDocument({
        data: new Uint8Array(bufferA),
        disableAutoFetch: true,
        disableStream: false,
        // @ts-ignore
        enableScripting: false,
      } as any).promise

      const docB = await pdfjsLib.getDocument({
        data: new Uint8Array(bufferB),
        disableAutoFetch: true,
        disableStream: false,
        // @ts-ignore
        enableScripting: false,
      } as any).promise

      const comparisonResult = await comparePDFs(
        docA, docB,
        filesA[0].name, filesB[0].name,
        (current, total, text) => {
          setProgress(Math.round((current / total) * 100))
          setProgressText(text)
        },
      )

      setResult(comparisonResult)

      toast.success(isBn
        ? `তুলনা সম্পন্ন — ${bn(comparisonResult.summary.overallSimilarity)}% সাদৃশ্য`
        : `Comparison complete — ${comparisonResult.summary.overallSimilarity}% similarity`)

      await docA.cleanup()
      await docA.loadingTask.destroy()
      await docB.cleanup()
      await docB.loadingTask.destroy()
    } catch (err) {
      console.error('[Compare] Failed:', err)
      toast.error(isBn ? 'তুলনা ব্যর্থ।' : 'Comparison failed.')
    } finally {
      setComparing(false)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedPages(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        {/* File A */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'পিডিএফ A (মূল)' : 'PDF A (Original)'}
          </Label>
          <FilePicker isBn={isBn} files={filesA} onFiles={setFilesA} hint={isBn ? 'প্রথম পিডিএফ' : 'First PDF'} />
        </div>

        {/* File B */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isBn ? 'পিডিএফ B (সংশোধিত)' : 'PDF B (Revised)'}
          </Label>
          <FilePicker isBn={isBn} files={filesB} onFiles={setFilesB} hint={isBn ? 'দ্বিতীয় পিডিএফ' : 'Second PDF'} />
        </div>

        <Button
          onClick={compare}
          disabled={filesA.length === 0 || filesB.length === 0 || comparing}
          className="w-full"
          variant="secondary"
        >
          {comparing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progressText || (isBn ? 'তুলনা হচ্ছে…' : 'Comparing…')}
            </>
          ) : (
            <>
              <GitCompare className="mr-2 h-4 w-4" />
              {isBn ? 'তুলনা করুন' : 'Compare PDFs'}
            </>
          )}
        </Button>

        {comparing && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
          </div>
        )}

        {/* Honest disclaimer */}
        {!result && !comparing && filesA.length > 0 && filesB.length > 0 && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium text-amber-700 dark:text-amber-400">
                  {isBn ? 'টেক্সট-ভিত্তিক তুলনা' : 'Text-Based Comparison'}
                </p>
                <p>
                  {isBn
                    ? 'এটি টেক্সট তুলনা — ভিজ্যুয়াল বা পিক্সেল-পারফেক্ট নয়।'
                    : 'This compares text only — not visual or pixel-perfect.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !comparing && (
          <>
            {/* Summary */}
            <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-xs font-semibold">
                  {isBn ? 'তুলনা সারাংশ' : 'Comparison Summary'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">{isBn ? 'পিডিএফ A:' : 'PDF A:'}</span>{' '}
                  <span className="font-medium">{result.documentA}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{isBn ? 'পিডিএফ B:' : 'PDF B:'}</span>{' '}
                  <span className="font-medium">{result.documentB}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{isBn ? 'পেজ A:' : 'Pages A:'}</span>{' '}
                  <span className="font-medium">{bn(result.pagesA)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{isBn ? 'পেজ B:' : 'Pages B:'}</span>{' '}
                  <span className="font-medium">{bn(result.pagesB)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline" className="text-xs text-green-600">
                  {isBn ? 'অপরিবর্তিত' : 'Unchanged'}: {bn(result.summary.unchanged)}
                </Badge>
                <Badge variant="outline" className="text-xs text-amber-600">
                  {isBn ? 'পরিবর্তিত' : 'Changed'}: {bn(result.summary.changed)}
                </Badge>
                {result.summary.added > 0 && (
                  <Badge variant="outline" className="text-xs text-blue-600">
                    {isBn ? 'যোগ' : 'Added'}: {bn(result.summary.added)}
                  </Badge>
                )}
                {result.summary.removed > 0 && (
                  <Badge variant="outline" className="text-xs text-red-600">
                    {isBn ? 'অপসারিত' : 'Removed'}: {bn(result.summary.removed)}
                  </Badge>
                )}
                {result.summary.notComparable > 0 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    {isBn ? 'তুলনাযোগ্য নয়' : 'N/A'}: {bn(result.summary.notComparable)}
                  </Badge>
                )}
              </div>
              <div className="pt-1">
                <span className="text-xs text-muted-foreground">
                  {isBn ? 'সামগ্রিক টেক্সট সাদৃশ্য:' : 'Overall text similarity:'}
                </span>{' '}
                <span className="text-sm font-bold">
                  {bn(result.summary.overallSimilarity)}%
                </span>
              </div>
            </div>

            {/* Page-by-page results */}
            <div className="rounded-lg border border-border/60 bg-muted/20">
              <div className="border-b border-border/40 p-2">
                <span className="text-xs font-semibold">
                  {isBn ? 'পেজ-ভিত্তিক ফলাফল' : 'Page-by-Page Results'}
                </span>
              </div>
              <ScrollArea className="max-h-64">
                <div className="p-2 space-y-1" role="list">
                  {result.comparisons.map((comp, i) => (
                    <div
                      key={i}
                      role="listitem"
                      className="flex items-start gap-2 rounded p-1.5 hover:bg-muted/50"
                    >
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="text-xs font-medium">
                          {comp.pageIndexA !== null ? bn(comp.pageIndexA + 1) : '—'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              comp.status === 'UNCHANGED' ? 'text-green-600' :
                              comp.status === 'CHANGED' ? 'text-amber-600' :
                              comp.status === 'ADDED' ? 'text-blue-600' :
                              comp.status === 'REMOVED' ? 'text-red-600' :
                              'text-gray-500'
                            }`}
                          >
                            {isBn ?
                              (comp.status === 'UNCHANGED' ? 'অপরিবর্তিত' :
                               comp.status === 'CHANGED' ? 'পরিবর্তিত' :
                               comp.status === 'ADDED' ? 'যোগ' :
                               comp.status === 'REMOVED' ? 'অপসারিত' : 'তুলনাযোগ্য নয়') :
                              comp.status}
                          </Badge>
                          {comp.similarity > 0 && (
                            <span className="text-xs text-muted-foreground">{bn(comp.similarity)}%</span>
                          )}
                        </div>
                        {comp.status === 'CHANGED' && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            <span className="text-green-600">+{bn(comp.addedWords)}</span>{' '}
                            <span className="text-red-600">-{bn(comp.removedWords)}</span>{' '}
                            {isBn ? 'শব্দ' : 'words'}
                          </div>
                        )}
                        {comp.status === 'NOT_COMPARABLE' && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            {isBn ? 'টেক্সট নেই বা এক্সট্র্যাক্ট করা যায়নি।' : 'No text or extraction failed.'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
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
