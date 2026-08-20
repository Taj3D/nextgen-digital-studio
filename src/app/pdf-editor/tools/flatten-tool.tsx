'use client'

/**
 * ============================================================================
 * Flatten PDF Tool — Phase 2A Wave 2
 * ----------------------------------------------------------------------------
 * Uses pdf-lib form.flatten() to convert AcroForm fields into static content.
 * Only flattens form fields — does NOT flatten annotations.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Layers } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

export function FlattenTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [fieldInfo, setFieldInfo] = React.useState<{ count: number; types: string[] } | null>(null)
  const [flattened, setFlattened] = React.useState(false)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const analyze = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setFlattened(false)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const form = doc.getForm()
      const fields = form.getFields()

      if (fields.length === 0) {
        setFieldInfo({ count: 0, types: [] })
        toast.info(
          isBn
            ? 'কোনো ইন্টারঅ্যাক্টিভ ফর্ম ফিল্ড পাওয়া যায়নি। ফ্ল্যাটেন করার কিছু নেই।'
            : 'No interactive form fields found. Nothing to flatten.',
        )
      } else {
        const types = fields.map((f) => {
          const ctor = f.constructor.name
          return ctor.replace('PDF', '')
        })
        const uniqueTypes = [...new Set(types)]
        setFieldInfo({ count: fields.length, types: uniqueTypes })
        toast.success(
          isBn
            ? `${bn(fields.length)}টি ফর্ম ফিল্ড পাওয়া গেছে (${uniqueTypes.join(', ')})।`
            : `${fields.length} form field(s) found (${uniqueTypes.join(', ')}).`,
        )
      }
    } catch (err) {
      console.error('[Flatten] Analysis failed:', err)
      toast.error(
        isBn ? 'বিশ্লেষণ ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'Analysis failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
    }
  }

  const run = async () => {
    if (files.length === 0) return
    if (fieldInfo && fieldInfo.count === 0) {
      toast.info(isBn ? 'ফ্ল্যাটেন করার কিছু নেই।' : 'Nothing to flatten.')
      return
    }
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const form = doc.getForm()
      const fields = form.getFields()

      if (fields.length === 0) {
        toast.info(
          isBn
            ? 'কোনো ইন্টারঅ্যাক্টিভ ফর্ম ফিল্ড পাওয়া যায়নি। ফ্ল্যাটেন করার কিছু নেই।'
            : 'No interactive form fields found. Nothing to flatten.',
        )
        setBusy(false)
        return
      }

      form.flatten({ updateFieldAppearances: true })

      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-flattened.pdf',
        doc.getPageCount(),
      )
      if (!ok) throw new Error('Validation failed')

      setFlattened(true)
      toast.success(
        isBn
          ? `${bn(fields.length)}টি ফর্ম ফিল্ড ফ্ল্যাটেন হয়েছে।`
          : `Flattened ${fields.length} form field(s).`,
      )
    } catch (err) {
      console.error('[Flatten] Failed:', err)
      toast.error(
        isBn ? 'ফ্ল্যাটেন ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'Flatten failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-xs dark:bg-amber-950/20">
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            ℹ️ {isBn ? 'সীমিত কার্যকারিতা' : 'Scope'}
          </p>
          <p className="mt-1 text-amber-700/80 dark:text-amber-400/80">
            {isBn
              ? 'এই টুল শুধু AcroForm ফিল্ড ফ্ল্যাটেন করে — অ্যানোটেশন, হাইলাইট, বা কমেন্ট নয়।'
              : 'This tool flattens AcroForm fields only — not annotations, highlights, or comments.'}
          </p>
        </div>

        <FilePicker isBn={isBn} files={files} onFiles={(f) => { setFiles(f); setFieldInfo(null); setFlattened(false) }} />

        <Button onClick={analyze} disabled={files.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'বিশ্লেষণ হচ্ছে…' : 'Analyzing…'}</>
          ) : (
            <>{isBn ? 'ফর্ম ফিল্ড খুঁজুন' : 'Find Form Fields'}</>
          )}
        </Button>

        {fieldInfo && (
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isBn ? 'ফর্ম তথ্য' : 'Form Information'}
            </p>
            {fieldInfo.count === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isBn ? 'কোনো ফর্ম ফিল্ড নেই।' : 'No form fields found.'}
              </p>
            ) : (
              <dl className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{isBn ? 'ফিল্ড সংখ্যা' : 'Field Count'}</dt>
                  <dd className="font-medium">{bn(fieldInfo.count)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{isBn ? 'টাইপ' : 'Types'}</dt>
                  <dd className="font-medium">{fieldInfo.types.join(', ')}</dd>
                </div>
              </dl>
            )}
          </div>
        )}

        {fieldInfo && fieldInfo.count > 0 && !flattened && (
          <Button onClick={run} disabled={busy} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
            {busy ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'ফ্ল্যাটেন হচ্ছে…' : 'Flattening…'}</>) : (<><Layers className="mr-2 h-4 w-4" />{isBn ? 'ফ্ল্যাটেন করুন' : 'Flatten PDF'}</>)}
          </Button>
        )}

        {flattened && (
          <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            ✅ {isBn ? 'ফ্ল্যাটেন সম্পন্ন। ফিল্ডগুলো এখন স্ট্যাটিক।' : 'Flattened successfully. Fields are now static.'}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
