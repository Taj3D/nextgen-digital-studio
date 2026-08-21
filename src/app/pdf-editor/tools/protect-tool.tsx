'use client'

import * as React from 'react'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import type { PdfTool } from '../pdf-tools'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ProtectTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [userPassword, setUserPassword] = React.useState('')
  const [ownerPassword, setOwnerPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<{ size: number } | null>(null)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const protect = async () => {
    if (files.length === 0) { toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.'); return }
    if (!userPassword && !ownerPassword) { toast.error(isBn ? 'অন্তত একটি পাসওয়ার্ড দিন।' : 'Enter at least one password.'); return }
    setBusy(true); setProgress(10)
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
      const userPass = userPassword || ''
      const ownerPass = ownerPassword || userPassword || ''
      const ret = Module.callMain(['--encrypt', userPass, ownerPass, '256', '--', 'input.pdf', 'output.pdf'])
      if (ret !== 0) throw new Error(`Encryption failed (code ${ret})`)
      setProgress(80)
      const encBytes = Module.FS.readFile('output.pdf')
      setProgress(90)
      const blob = new Blob([new Uint8Array(encBytes)], { type: 'application/pdf' })
      saveAs(blob, files[0].name.replace(/\.pdf$/i, '') + '-protected.pdf')
      setProgress(100)
      setResult({ size: encBytes.length })
      toast.success(isBn ? 'পিডিএফ পাসওয়ার্ড-সুরক্ষিত (AES-256)।' : 'PDF password-protected (AES-256).')
      setUserPassword(''); setOwnerPassword('')
    } catch (err) {
      console.error('[Protect] Failed:', err)
      toast.error(isBn ? 'এনক্রিপশন ব্যর্থ।' : 'Encryption failed.')
    } finally { setBusy(false) }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{isBn ? 'ইউজার পাসওয়ার্ড' : 'User Password'}</Label>
          <div className="flex gap-2">
            <Input type={showPassword ? 'text' : 'password'} value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder={isBn ? 'খোলার পাসওয়ার্ড' : 'Password to open'} className="flex-1" />
            <Button variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)}><div className="sr-only">{showPassword ? 'Hide' : 'Show'}</div>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{isBn ? 'ওনার পাসওয়ার্ড (ঐচ্ছিক)' : 'Owner Password (optional)'}</Label>
          <Input type={showPassword ? 'text' : 'password'} value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} placeholder={isBn ? 'অনুমতি পাসওয়ার্ড' : 'Permissions password'} />
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <div className="flex gap-2"><Lock className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" /><p className="text-xs text-muted-foreground">{isBn ? 'AES-256 এনক্রিপশন। পাসওয়ার্ড কখনো সার্ভারে পাঠানো হয় না।' : 'AES-256 encryption. Password is never sent to any server.'}</p></div>
        </div>
        <Button onClick={protect} disabled={files.length === 0 || busy || (!userPassword && !ownerPassword)} className="w-full" variant="secondary">
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'এনক্রিপ্ট হচ্ছে…' : 'Encrypting…'}</> : <><Lock className="mr-2 h-4 w-4" />{isBn ? 'পিডিএফ সুরক্ষিত করুন' : 'Protect PDF'}</>}
        </Button>
        {busy && <div className="space-y-2"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all" style={{ width: `${progress}%` }} /></div><p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p></div>}
        {result && !busy && <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-1"><div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span className="text-xs font-medium">{isBn ? 'সুরক্ষা সফল' : 'Protection Successful'}</span></div><p className="text-xs text-muted-foreground">{isBn ? `আউটপুট: ${humanSize(result.size)}` : `Output: ${humanSize(result.size)}`}</p></div>}
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>{isBn ? 'বন্ধ করুন' : 'Close'}</Button></DialogFooter>
      </div>
    </ToolDialog>
  )
}
