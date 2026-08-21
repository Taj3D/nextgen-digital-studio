'use client'

import * as React from 'react'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Unlock, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UnlockTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<{ success: boolean; size: number; message: string } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const unlock = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (!password) { toast.error(isBn ? 'পাসওয়ার্ড দিন।' : 'Enter the password.'); return }
    setBusy(true); setProgress(10); setResult(null)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfBytes = new Uint8Array(arrayBuffer)
      setProgress(30)
      const qpdfMod: any = await import(/* webpackIgnore: true */ "@neslinesli93/qpdf-wasm")
      setProgress(40)
      const wasmUrl = '/qpdf.wasm'
      // @ts-ignore - qpdf-wasm module is callable but TypeScript sees it as an object
      const Module: any = await qpdfMod.default({ locateFile: () => wasmUrl })
      setProgress(60)
      Module.FS.writeFile('input.pdf', pdfBytes)
      const ret = Module.callMain(['--decrypt', `--password=${password}`, 'input.pdf', 'output.pdf'])
      if (ret !== 0) {
        setResult({ success: false, size: 0, message: isBn ? 'ভুল পাসওয়ার্ড বা ডিক্রিপশন ব্যর্থ।' : 'Incorrect password or decryption failed.' })
        toast.error(isBn ? 'ভুল পাসওয়ার্ড।' : 'Incorrect password.')
        return
      }
      setProgress(80)
      const decBytes = Module.FS.readFile('output.pdf')
      setProgress(90)
      const blob = new Blob([new Uint8Array(decBytes)], { type: 'application/pdf' })
      saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '-unlocked.pdf')
      setProgress(100)
      setResult({ success: true, size: decBytes.length, message: isBn ? `ডিক্রিপ্ট সফল — ${humanSize(decBytes.length)}।` : `Decryption successful — ${humanSize(decBytes.length)}.` })
      toast.success(isBn ? 'পিডিএফ আনলক করা হয়েছে।' : 'PDF unlocked successfully.')
      setPassword('')
    } catch (err) {
      console.error('[Unlock] Failed:', err)
      setResult({ success: false, size: 0, message: isBn ? 'ডিক্রিপশন ব্যর্থ।' : 'Decryption failed.' })
      toast.error(isBn ? 'আনলক ব্যর্থ।' : 'Unlock failed.')
    } finally { setBusy(false) }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{isBn ? 'পাসওয়ার্ড' : 'Password'}</Label>
          <div className="flex gap-2">
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isBn ? 'পিডিএফ পাসওয়ার্ড' : 'PDF password'} className="flex-1" />
            <Button variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)}><div className="sr-only">{showPassword ? 'Hide' : 'Show'}</div>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
          </div>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <div className="flex gap-2"><Unlock className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" /><p className="text-xs text-muted-foreground">{isBn ? 'আসল ডিক্রিপশন — পাসওয়ার্ড সার্ভারে পাঠানো হয় না।' : 'Genuine decryption — password is never sent to any server.'}</p></div>
        </div>
        <Button onClick={unlock} disabled={files.length === 0 || busy || !password} className="w-full" variant="secondary">
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'আনলক হচ্ছে…' : 'Unlocking…'}</> : <><Unlock className="mr-2 h-4 w-4" />{isBn ? 'পিডিএফ আনলক করুন' : 'Unlock PDF'}</>}
        </Button>
        {busy && <div className="space-y-2"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${progress}%` }} /></div><p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p></div>}
        {result && !busy && <div className={`rounded-lg border p-3 space-y-1 ${result.success ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}><div className="flex items-center gap-2">{result.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}<span className="text-xs font-medium">{result.success ? (isBn ? 'আনলক সফল' : 'Unlock Successful') : (isBn ? 'আনলক ব্যর্থ' : 'Unlock Failed')}</span></div><p className="text-xs text-muted-foreground">{result.message}</p></div>}
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button></DialogFooter>
      </div>
    </ToolDialog>
  )
}
