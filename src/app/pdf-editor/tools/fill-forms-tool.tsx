'use client'

/**
 * ============================================================================
 * Fill PDF Forms Tool — Phase 2A Wave 3
 * ----------------------------------------------------------------------------
 * Uses pdf-lib form API to discover and fill AcroForm fields.
 * Supports: TextField, CheckBox, RadioGroup, Dropdown, OptionList.
 * Bengali support via lazy-loaded @pdf-lib/fontkit + MahfujLipi font.
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf, humanSize } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
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
import { Loader2, Download, Search, RotateCcw, Lock, AlertTriangle, CheckCircle2, FileText, CheckSquare, CircleDot, List, PenLine } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

type FontMode = 'latin' | 'bengali'

interface FieldInfo {
  name: string
  type: string
  required: boolean
  readOnly: boolean
  currentValue: string
  options?: string[]
  selected?: string | string[]
  isMultiline?: boolean
  isMultiselect?: boolean
}

export function FillFormsTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [fields, setFields] = React.useState<FieldInfo[]>([])
  const [originalValues, setOriginalValues] = React.useState<Map<string, any>>(new Map())
  const [currentValues, setCurrentValues] = React.useState<Map<string, any>>(new Map())
  const [fontMode, setFontMode] = React.useState<FontMode>('latin')
  const [busy, setBusy] = React.useState(false)
  const [analyzing, setAnalyzing] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [hasXfa, setHasXfa] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const analyze = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setAnalyzing(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const form = doc.getForm()

      if (form.hasXFA()) {
        setHasXfa(true)
        toast.info(isBn ? 'XFA ফর্ম সমর্থিত নয়।' : 'XFA forms are not supported.')
      } else {
        setHasXfa(false)
      }

      const rawFields = form.getFields()
      const discovered: FieldInfo[] = []
      const origMap = new Map<string, any>()
      const currMap = new Map<string, any>()

      for (const field of rawFields) {
        const name = field.getName()
        const ctor = field.constructor.name.replace('PDF', '')
        const required = field.isRequired()
        const readOnly = field.isReadOnly()

        let info: FieldInfo = {
          name,
          type: ctor,
          required,
          readOnly,
          currentValue: '',
        }

        try {
          if (ctor === 'TextField') {
            const tf = form.getTextField(name)
            const val = tf.getText() ?? ''
            info.currentValue = val
            info.isMultiline = tf.isMultiline()
            origMap.set(name, val)
            currMap.set(name, val)
          } else if (ctor === 'CheckBox') {
            const cb = form.getCheckBox(name)
            const checked = cb.isChecked()
            info.currentValue = checked ? 'checked' : 'unchecked'
            origMap.set(name, checked)
            currMap.set(name, checked)
          } else if (ctor === 'RadioGroup') {
            const rg = form.getRadioGroup(name)
            const opts = rg.getOptions()
            const sel = rg.getSelected()
            info.options = opts
            info.selected = sel ?? ''
            info.currentValue = sel ?? '(none)'
            origMap.set(name, sel)
            currMap.set(name, sel)
          } else if (ctor === 'Dropdown') {
            const dd = form.getDropdown(name)
            const opts = dd.getOptions()
            const sels = dd.getSelected()
            info.options = opts
            info.selected = sels[0] ?? ''
            info.currentValue = sels[0] ?? '(none)'
            origMap.set(name, sels[0] ?? '')
            currMap.set(name, sels[0] ?? '')
          } else if (ctor === 'OptionList') {
            const ol = form.getOptionList(name)
            const opts = ol.getOptions()
            const sels = ol.getSelected()
            info.options = opts
            info.selected = sels
            info.isMultiselect = sels.length > 1
            info.currentValue = sels.join(', ') || '(none)'
            origMap.set(name, sels)
            currMap.set(name, sels)
          } else if (ctor === 'Signature') {
            info.currentValue = '(signature — not fillable)'
          } else if (ctor === 'Button') {
            info.currentValue = '(button — not editable)'
          }
        } catch {
          info.currentValue = '(error reading field)'
        }

        discovered.push(info)
      }

      setFields(discovered)
      setOriginalValues(origMap)
      setCurrentValues(currMap)

      if (discovered.length === 0) {
        toast.info(isBn ? 'কোনো ফর্ম ফিল্ড পাওয়া যায়নি।' : 'No form fields found.')
      } else {
        toast.success(
          isBn
            ? `${bn(discovered.length)}টি ফর্ম ফিল্ড পাওয়া গেছে।`
            : `${discovered.length} form field(s) found.`,
        )
      }
    } catch (err) {
      console.error('[Fill Forms] Analysis failed:', err)
      toast.error(
        isBn ? 'বিশ্লেষণ ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'Analysis failed — file may be corrupt or encrypted.',
      )
    } finally {
      setAnalyzing(false)
    }
  }

  const updateValue = (name: string, value: any) => {
    setCurrentValues((prev) => {
      const next = new Map(prev)
      next.set(name, value)
      return next
    })
  }

  const resetField = (name: string) => {
    setCurrentValues((prev) => {
      const next = new Map(prev)
      next.set(name, originalValues.get(name))
      return next
    })
  }

  const resetAll = () => {
    setCurrentValues(new Map(originalValues))
    toast.info(isBn ? 'সব ফিল্ড রিসেট হয়েছে।' : 'All fields reset.')
  }

  const run = async () => {
    if (files.length === 0 || fields.length === 0) {
      toast.error(isBn ? 'প্রথমে ফর্ম বিশ্লেষণ করুন।' : 'Analyze the form first.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const form = doc.getForm()

      // Apply values
      for (const field of fields) {
        if (field.readOnly) continue
        const value = currentValues.get(field.name)
        if (value === undefined) continue

        try {
          if (field.type === 'TextField') {
            form.getTextField(field.name).setText(value)
          } else if (field.type === 'CheckBox') {
            const cb = form.getCheckBox(field.name)
            if (value) cb.check()
            else cb.uncheck()
          } else if (field.type === 'RadioGroup') {
            if (value) form.getRadioGroup(field.name).select(value)
          } else if (field.type === 'Dropdown') {
            if (value) form.getDropdown(field.name).select(value)
          } else if (field.type === 'OptionList') {
            if (Array.isArray(value) && value.length > 0) {
              form.getOptionList(field.name).select(value)
            }
          }
        } catch (e) {
          console.warn(`[Fill Forms] Failed to set ${field.name}:`, e)
        }
      }

      setProgress(30)

      // Update appearances with appropriate font
      let font: any = undefined
      if (fontMode === 'bengali') {
        try {
          // Lazy-load fontkit + regenerator-runtime polyfill for Bengali font support
          await import('regenerator-runtime/runtime')
          const fontkitModule = await import('@pdf-lib/fontkit')
          const fontkit = fontkitModule.default || fontkitModule
          doc.registerFontkit(fontkit)

          const fontResponse = await fetch('/fonts/MahfujLipi.ttf')
          const fontBytes = await fontResponse.arrayBuffer()
          font = await doc.embedFont(new Uint8Array(fontBytes))
        } catch (e) {
          console.warn('[Fill Forms] Bengali font load failed, using default:', e)
          toast.warning(isBn ? 'বাংলা ফন্ট লোড ব্যর্থ, ডিফল্ট ব্যবহার করা হচ্ছে।' : 'Bengali font load failed, using default.')
          font = await doc.embedFont(StandardFonts.Helvetica)
        }
      } else {
        font = await doc.embedFont(StandardFonts.Helvetica)
      }

      form.updateFieldAppearances(font)
      setProgress(70)

      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-filled.pdf',
        doc.getPageCount(),
      )
      if (!ok) throw new Error('Validation failed')

      setProgress(100)
      toast.success(
        isBn
          ? 'ফর্ম পূরণ ও ডাউনলোড সম্পন্ন।'
          : 'Form filled and downloaded.',
      )
    } catch (err) {
      console.error('[Fill Forms] Fill failed:', err)
      toast.error(
        isBn ? 'ফর্ম পূরণ ব্যর্থ।' : 'Form fill failed.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  const filteredFields = fields.filter((f) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q)
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TextField': return FileText
      case 'CheckBox': return CheckSquare
      case 'RadioGroup': return CircleDot
      case 'Dropdown': return List
      case 'OptionList': return List
      case 'Signature': return PenLine
      case 'Button': return PenLine
      default: return FileText
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={(f) => { setFiles(f); setFields([]) }} />

        <Button onClick={analyze} disabled={files.length === 0 || analyzing} className="w-full" variant="secondary">
          {analyzing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'বিশ্লেষণ হচ্ছে…' : 'Analyzing…'}</>
          ) : (
            <>{isBn ? 'ফর্ম ফিল্ড খুঁজুন' : 'Find Form Fields'}</>
          )}
        </Button>

        {hasXfa && (
          <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-xs dark:bg-amber-950/20">
            <p className="font-semibold text-amber-700 dark:text-amber-400">
              ⚠️ {isBn ? 'XFA ফর্ম সমর্থিত নয়' : 'XFA forms not supported'}
            </p>
            <p className="mt-1 text-amber-700/80 dark:text-amber-400/80">
              {isBn ? 'এই পিডিএফে XFA ডেটা আছে। শুধু AcroForm ফিল্ড পূরণ করা যাবে।' : 'This PDF has XFA data. Only AcroForm fields can be filled.'}
            </p>
          </div>
        )}

        {fields.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'ফিল্ড খুঁজুন…' : 'Search fields…'}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={resetAll} disabled={busy}>
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="ml-1 hidden sm:inline">{isBn ? 'রিসেট' : 'Reset'}</span>
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label>{isBn ? 'ফন্ট' : 'Font'}</Label>
              <Select value={fontMode} onValueChange={(v) => setFontMode(v as FontMode)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="latin">{isBn ? 'ল্যাটিন (স্ট্যান্ডার্ড)' : 'Latin (Standard)'}</SelectItem>
                  <SelectItem value="bengali">{isBn ? 'বাংলা (মাহফুজ লিপি)' : 'Bengali (MahfujLipi)'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {filteredFields.map((field) => {
                const Icon = getTypeIcon(field.type)
                const value = currentValues.get(field.name)
                const isFilled = value !== undefined && value !== '' && value !== false && !(Array.isArray(value) && value.length === 0)

                return (
                  <div key={field.name} className="rounded-lg border border-border/60 bg-card/50 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-xs">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                        <span className="truncate font-medium">{field.name}</span>
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        {field.required && !isFilled && (
                          <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-600 text-[9px] dark:text-amber-400">
                            <AlertTriangle className="mr-0.5 h-2.5 w-2.5" />
                            {isBn ? 'প্রয়োজন' : 'Req'}
                          </Badge>
                        )}
                        {field.readOnly && (
                          <Badge className="border-muted bg-muted text-muted-foreground text-[9px]">
                            <Lock className="mr-0.5 h-2.5 w-2.5" />
                            {isBn ? 'লক' : 'Lock'}
                          </Badge>
                        )}
                        {isFilled && !field.readOnly && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    {field.readOnly ? (
                      <p className="text-xs text-muted-foreground">
                        {field.type === 'Signature' ? (isBn ? 'সিগনেচার ফিল্ড — ডিজিটাল সাইনিং সমর্থিত নয়।' : 'Signature field — digital signing not supported.') :
                         field.type === 'Button' ? (isBn ? 'বাটন ফিল্ড — এডিটযোগ্য নয়।' : 'Button field — not editable.') :
                         field.currentValue || (isBn ? '(খালি)' : '(empty)')}
                      </p>
                    ) : field.type === 'TextField' ? (
                      <div className="space-y-1">
                        {field.isMultiline ? (
                          <Textarea
                            value={value ?? ''}
                            onChange={(e) => updateValue(field.name, e.target.value)}
                            placeholder={isBn ? 'টেক্সট লিখুন…' : 'Enter text…'}
                            className="text-xs"
                            rows={2}
                          />
                        ) : (
                          <Input
                            value={value ?? ''}
                            onChange={(e) => updateValue(field.name, e.target.value)}
                            placeholder={isBn ? 'টেক্সট লিখুন…' : 'Enter text…'}
                            className="text-xs"
                          />
                        )}
                      </div>
                    ) : field.type === 'CheckBox' ? (
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={!!value}
                          onCheckedChange={(checked) => updateValue(field.name, checked)}
                          aria-label={field.name}
                        />
                        <span className="text-xs">{value ? (isBn ? 'চেক করা' : 'Checked') : (isBn ? 'চেক বাতিল' : 'Unchecked')}</span>
                      </div>
                    ) : field.type === 'RadioGroup' ? (
                      <Select value={value ?? ''} onValueChange={(v) => updateValue(field.name, v)}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={isBn ? 'নির্বাচন করুন' : 'Select'} /></SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'Dropdown' || field.type === 'OptionList' ? (
                      <Select value={Array.isArray(value) ? value[0] ?? '' : value ?? ''} onValueChange={(v) => updateValue(field.name, field.type === 'OptionList' ? [v] : v)}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={isBn ? 'নির্বাচন করুন' : 'Select'} /></SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-xs text-muted-foreground">{field.currentValue}</p>
                    )}

                    {!field.readOnly && (
                      <button
                        type="button"
                        onClick={() => resetField(field.name)}
                        className="mt-1 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        {isBn ? 'রিসেট' : 'Reset'}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {busy && (
              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-center text-xs text-muted-foreground">{isBn ? `প্রসেসিং ${bn(progress)}%` : `Processing ${progress}%`}</p>
              </div>
            )}

            <Button onClick={run} disabled={busy} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
              {busy ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'পূরণ হচ্ছে…' : 'Filling…'}</>) : (<><Download className="mr-2 h-4 w-4" />{isBn ? 'পূরণ ও ডাউনলোড' : 'Fill & Download'}</>)}
            </Button>
          </>
        )}

        {fields.length === 0 && !analyzing && files.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {isBn ? 'ফর্ম ফিল্ড খুঁজতে বোতামে ক্লিক করুন।' : 'Click the button to find form fields.'}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
