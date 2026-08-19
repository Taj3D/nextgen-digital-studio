'use client'

/**
 * ============================================================================
 * PDF Forge — Client UI
 * ----------------------------------------------------------------------------
 * Sections: Hero · Tool Gallery · Why · How it works · Comparison ·
 * Testimonials · Services · FAQ · Footer.
 *
 * 4 fully functional tools powered by pdf-lib (Merge, Split, Rotate,
 * Edit Metadata). All other tools show a "coming soon" toast.
 * ============================================================================
 */

import * as React from 'react'
import Link from 'next/link'

import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingEyebrow,
  LandingFooter,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  PDF_TOOLS,
  CATEGORY_LABELS,
  TOTAL_TOOL_COUNT,
  type PdfTool,
  type PdfToolCategory,
} from './pdf-tools'

import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { PDFDocument, degrees } from 'pdf-lib'

import {
  FileText,
  Merge,
  Scissors,
  RotateCw,
  Tags,
  Upload,
  Download,
  Loader2,
  Search,
  Sparkles,
  ShieldCheck,
  WifiOff,
  Zap,
  Globe,
  Infinity as InfinityIcon,
  ArrowRight,
  Check,
  X,
  Star,
  Quote,
  Lock,
  Cpu,
  Layers,
  FilePlus2,
  MousePointerClick,
  FileCheck2,
  Trash2,
  Plus,
  ChevronRight,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Convert ASCII digits to Bengali numerals when lang === 'bn'. */
function bn(s: string | number, isBn: boolean): string {
  return isBn
    ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
    : String(s)
}

/** Human-readable file size in KB / MB. */
function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/** Validate that a File is a PDF. */
function isPdf(file: File): boolean {
  return (
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  )
}

/* -------------------------------------------------------------------------- */
/*  Static data                                                                */
/* -------------------------------------------------------------------------- */

const WHY_FEATURES: {
  icon: typeof Sparkles
  en: { t: string; d: string }
  bn: { t: string; d: string }
}[] = [
  {
    icon: Sparkles,
    en: { t: '100% Free Forever', d: 'No subscriptions, no hidden fees, no trial limits. Every tool, every page, every device — free.' },
    bn: { t: '১০০% চিরকাল ফ্রি', d: 'কোনো সাবস্ক্রিপশন নেই, কোনো লুকানো ফি নেই। প্রতিটি টুল, প্রতিটি পেজ, প্রতিটি ডিভাইসে — ফ্রি।' },
  },
  {
    icon: ShieldCheck,
    en: { t: 'Private & Secure', d: 'Files never leave your device. All processing is 100% client-side — your documents stay yours.' },
    bn: { t: 'প্রাইভেট ও সিকিউর', d: 'ফাইল কখনো আপনার ডিভাইস ছাড়ে না। সব প্রসেসিং ১০০% ক্লায়েন্ট-সাইডে — আপনার ডকুমেন্ট আপনারই থাকে।' },
  },
  {
    icon: WifiOff,
    en: { t: 'Works Offline', d: 'Installable as a PWA. Use every tool with zero internet — perfect for travel, flights & rural areas.' },
    bn: { t: 'অফলাইনে চলে', d: 'PWA হিসেবে ইনস্টল করুন। ইন্টারনেট ছাড়াই সব টুল ব্যবহার করুন — ভ্রমণ, ফ্লাইট ও গ্রামের জন্য দারুণ।' },
  },
  {
    icon: Zap,
    en: { t: 'Lightning Fast', d: 'No server round-trips. Files open and process in milliseconds — right inside your browser.' },
    bn: { t: 'তড়িৎ দ্রুত', d: 'কোনো সার্ভার রাউন্ড-ট্রিপ নেই। ফাইল মিলিসেকেন্ডে খোলে ও প্রসেস হয় — সরাসরি আপনার ব্রাউজারে।' },
  },
  {
    icon: Globe,
    en: { t: 'Cross-Platform', d: 'Windows, macOS, Linux, Android, iPhone & iPad. One URL works on every modern device.' },
    bn: { t: 'সব প্ল্যাটফর্মে', d: 'উইন্ডোজ, ম্যাকওএস, লিনাক্স, অ্যান্ড্রয়েড, আইফোন ও আইপ্যাড। এক URL সব আধুনিক ডিভাইসে চলে।' },
  },
  {
    icon: InfinityIcon,
    en: { t: 'No File Limits', d: 'No size cap, no daily limit, no page restriction. Your hardware is the only ceiling.' },
    bn: { t: 'কোনো ফাইল লিমিট নেই', d: 'কোনো সাইজ লিমিট নেই, কোনো ডেইলি ক্যাপ নেই। আপনার হার্ডওয়্যারই একমাত্র সীমা।' },
  },
]

const HOW_STEPS: {
  icon: typeof MousePointerClick
  en: { t: string; d: string }
  bn: { t: string; d: string }
}[] = [
  {
    icon: MousePointerClick,
    en: { t: 'Choose a Tool', d: 'Browse 40+ tools, filter by category, search by name — tap to launch instantly.' },
    bn: { t: 'একটি টুল বাছুন', d: '৪০+ টুল ব্রাউজ করুন, ক্যাটেগরি অনুযায়ী ফিল্টার করুন, নাম দিয়ে সার্চ করুন — ট্যাপ করে শুরু করুন।' },
  },
  {
    icon: Upload,
    en: { t: 'Upload Your File', d: 'Drag-and-drop or click to pick a PDF. Files are processed locally — never uploaded anywhere.' },
    bn: { t: 'ফাইল আপলোড করুন', d: 'ড্র্যাগ-ড্রপ বা ক্লিক করে পিডিএফ নির্বাচন করুন। ফাইল লোকালি প্রসেস হয় — কোথাও আপলোড হয় না।' },
  },
  {
    icon: FileCheck2,
    en: { t: 'Get Your Result', d: 'Process & download the output. Adjust options, redo anytime — no sign-up, no watermark.' },
    bn: { t: 'ফলাফল নিন', d: 'প্রসেস করে আউটপুট ডাউনলোড করুন। অপশন বদলান, যেকোনো সময় আবার করুন — কোনো সাইন-আপ নেই।' },
  },
]

const COMPARISON_FEATURES: {
  en: string
  bn: string
  nextgen: boolean | string
  smallpdf: boolean | string
  ilovepdf: boolean | string
  adobe: boolean | string
}[] = [
  {
    en: 'Price',
    bn: 'দাম',
    nextgen: 'Free',
    smallpdf: 'Freemium',
    ilovepdf: 'Freemium',
    adobe: '$19.99/mo',
  },
  {
    en: 'Client-side Privacy',
    bn: 'ক্লায়েন্ট-সাইড প্রাইভেসি',
    nextgen: true,
    smallpdf: false,
    ilovepdf: false,
    adobe: false,
  },
  {
    en: 'Works Offline',
    bn: 'অফলাইনে চলে',
    nextgen: true,
    smallpdf: false,
    ilovepdf: false,
    adobe: false,
  },
  {
    en: 'Number of Tools',
    bn: 'টুলের সংখ্যা',
    nextgen: '40+',
    smallpdf: '21',
    ilovepdf: '25',
    adobe: '30+',
  },
  {
    en: 'No Account Required',
    bn: 'অ্যাকাউন্ট লাগে না',
    nextgen: true,
    smallpdf: false,
    ilovepdf: true,
    adobe: false,
  },
  {
    en: 'No File Upload',
    bn: 'ফাইল আপলোড লাগে না',
    nextgen: true,
    smallpdf: false,
    ilovepdf: false,
    adobe: false,
  },
  {
    en: 'No Watermarks',
    bn: 'কোনো ওয়াটারমার্ক নেই',
    nextgen: true,
    smallpdf: false,
    ilovepdf: true,
    adobe: true,
  },
  {
    en: 'Open Source Foundations',
    bn: 'ওপেন সোর্স ভিত্তি',
    nextgen: true,
    smallpdf: false,
    ilovepdf: false,
    adobe: false,
  },
  {
    en: 'Multi-language (Bangla)',
    bn: 'বহুভাষিক (বাংলা)',
    nextgen: true,
    smallpdf: false,
    ilovepdf: false,
    adobe: false,
  },
]

const TESTIMONIALS: {
  nameEn: string
  nameBn: string
  roleEn: string
  roleBn: string
  quoteEn: string
  quoteBn: string
}[] = [
  {
    nameEn: 'Sarah K.',
    nameBn: 'সারা কে.',
    roleEn: 'Marketing Manager',
    roleBn: 'মার্কেটিং ম্যানেজার',
    quoteEn: 'I merge a dozen PDF reports every week. PDF Forge does it in seconds — locally, no upload. Replaced three paid tools.',
    quoteBn: 'আমি প্রতি সপ্তাহে ডজন ডজন পিডিএফ রিপোর্ট মার্জ করি। পিডিএফ ফোর্জ সেকেন্ডে কাজ শেষ করে — লোকালি, কোনো আপলোড নেই। তিনটি পেইড টুল বদলে দিয়েছে।',
  },
  {
    nameEn: 'James R.',
    nameBn: 'জেমস আর.',
    roleEn: 'Freelance Designer',
    roleBn: 'ফ্রিল্যান্স ডিজাইনার',
    quoteEn: 'Offline + private + free is the trifecta I never thought I would get. Rotate, split, metadata — all from one tab. Brilliant.',
    quoteBn: 'অফলাইন + প্রাইভেট + ফ্রি — এই ত্রয়ী আমি ভাবিনি পাব। রোটেট, স্প্লিট, মেটাডাটা — সব এক ট্যাবে। অসাধারণ।',
  },
  {
    nameEn: 'Priya M.',
    nameBn: 'প্রিয়া এম.',
    roleEn: 'Student',
    roleBn: 'ছাত্রী',
    quoteEn: 'No signup, no limit, no watermark. As a student with limited data, the offline PWA is a lifesaver. Bengali UI is a bonus.',
    quoteBn: 'কোনো সাইন-আপ নেই, কোনো লিমিট নেই, কোনো ওয়াটারমার্ক নেই। সীমিত ডাটা প্ল্যানের ছাত্রী হিসেবে অফলাইন PWA আশীর্বাদ। বাংলা UI বোনাস।',
  },
]

const SERVICES: {
  icon: typeof Cpu
  en: string
  bn: string
  href: string
}[] = [
  { icon: Cpu, en: 'AI & Automation', bn: 'এআই ও অটোমেশন', href: '/#services' },
  { icon: FileText, en: 'Website & Software Development', bn: 'ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট', href: '/#services' },
  { icon: Globe, en: 'Digital Marketing', bn: 'ডিজিটাল মার্কেটিং', href: '/#services' },
  { icon: Layers, en: 'Design & Creative', bn: 'ডিজাইন ও ক্রিয়েটিভ', href: '/#services' },
  { icon: Sparkles, en: 'Custom Business Solutions', bn: 'কাস্টম বিজনেস সলিউশন', href: '/#services' },
  { icon: Zap, en: 'AI & Digital Skills Training', bn: 'এআই ও ডিজিটাল স্কিলস ট্রেনিং', href: '/ai-training' },
  { icon: Cpu, en: 'CNC Design & Training', bn: 'CNC ডিজাইন ও ট্রেনিং', href: '/cnc-training' },
  { icon: FilePlus2, en: 'Digital Products & PDF Resources', bn: 'ডিজিটাল প্রোডাক্ট ও পিডিএফ রিসোর্স', href: '/pdf-books' },
]

const FAQS: {
  qEn: string
  qBn: string
  aEn: string
  aBn: string
}[] = [
  {
    qEn: 'Is PDF Forge really 100% free?',
    qBn: 'পিডিএফ ফোর্জ কি সত্যিই ১০০% ফ্রি?',
    aEn: 'Yes. PDF Forge is completely free forever — no subscriptions, no hidden fees, no daily caps. Every tool, including Merge, Split, Rotate and Edit Metadata, is free to use on any device.',
    aBn: 'হ্যাঁ। পিডিএফ ফোর্জ সম্পূর্ণ চিরকাল ফ্রি — কোনো সাবস্ক্রিপশন নেই, কোনো লুকানো ফি নেই, কোনো ডেইলি ক্যাপ নেই। প্রতিটি টুল — মার্জ, স্প্লিট, রোটেট ও মেটাডাটা — যেকোনো ডিভাইসে ফ্রি।',
  },
  {
    qEn: 'Are my files uploaded to a server?',
    qBn: 'আমার ফাইল কি সার্ভারে আপলোড হয়?',
    aEn: 'No. All processing happens locally inside your browser using client-side JavaScript and pdf-lib. Your PDF files never leave your device, so they stay 100% private and secure.',
    aBn: 'না। সব প্রসেসিং ক্লায়েন্ট-সাইড জাভাস্ক্রিপ্ট ও pdf-lib দিয়ে আপনার ব্রাউজারেই হয়। আপনার পিডিএফ ফাইল কখনো ডিভাইস ছাড়ে না — ১০০% প্রাইভেট ও সিকিউর থাকে।',
  },
  {
    qEn: 'Does PDF Forge work offline?',
    qBn: 'পিডিএফ ফোর্জ কি অফলাইনে চলে?',
    aEn: 'Yes. PDF Forge is an installable PWA. Once installed, you can use every tool offline — no internet connection required after the initial load.',
    aBn: 'হ্যাঁ। পিডিএফ ফোর্জ একটি ইনস্টলযোগ্য PWA। ইনস্টল করার পর প্রতিটি টুল অফলাইনে ব্যবহার করতে পারবেন — প্রাথমিক লোডের পর কোনো ইন্টারনেট লাগে না।',
  },
  {
    qEn: 'Which devices does PDF Forge support?',
    qBn: 'পিডিএফ ফোর্জ কোন কোন ডিভাইসে চলে?',
    aEn: 'PDF Forge runs on any modern device with a web browser — Windows, macOS, Linux, Android, iPhone and iPad. The interface is fully responsive from 375px mobile to 1440px desktop and beyond.',
    aBn: 'পিডিএফ ফোর্জ যেকোনো আধুনিক ব্রাউজার-সহ ডিভাইসে চলে — উইন্ডোজ, ম্যাকওএস, লিনাক্স, অ্যান্ড্রয়েড, আইফোন ও আইপ্যাড। ইন্টারফেস ৩৭৫px মোবাইল থেকে ১৪৪০px ডেস্কটপ পর্যন্ত সম্পূর্ণ রেসপন্সিভ।',
  },
  {
    qEn: 'Is there a file size limit?',
    qBn: 'কোনো ফাইল সাইজ লিমিট আছে কি?',
    aEn: 'No. There is no file size limit and no daily cap. Because processing happens on your own device, the only limit is your computer hardware — you can merge or split very large PDFs without any upload restriction.',
    aBn: 'না। কোনো ফাইল সাইজ লিমিট নেই, কোনো ডেইলি ক্যাপ নেই। যেহেতু প্রসেসিং আপনার নিজের ডিভাইসে হয়, একমাত্র সীমা আপনার কম্পিউটার হার্ডওয়্যার — আপনি খুব বড় পিডিএফ মার্জ বা স্প্লিট করতে পারবেন।',
  },
  {
    qEn: 'Do I need to create an account?',
    qBn: 'আমাকে কি অ্যাকাউন্ট তৈরি করতে হবে?',
    aEn: 'No account is required. Open the page, pick a tool, drop your file and get the result. No email, no sign-up, no tracking of your documents.',
    aBn: 'কোনো অ্যাকাউন্ট লাগে না। পেজ খুলুন, টুল বাছুন, ফাইল দিন, ফল পান। কোনো ইমেইল নেই, কোনো সাইন-আপ নেই, আপনার ডকুমেন্ট ট্র্যাক করা হয় না।',
  },
  {
    qEn: 'What makes PDF Forge different from Smallpdf or iLovePDF?',
    qBn: 'পিডিএফ ফোর্জ কীভাবে Smallpdf বা iLovePDF থেকে আলাদা?',
    aEn: 'PDF Forge is 100% free forever with no account, no upload (files stay on your device), no watermarks, full offline PWA support, open source foundations, and bilingual Bangla + English interface — built by NextGen Digital Studio in Bangladesh.',
    aBn: 'পিডিএফ ফোর্জ চিরকাল ১০০% ফ্রি — কোনো অ্যাকাউন্ট নেই, কোনো আপলোড নেই (ফাইল আপনার ডিভাইসে থাকে), কোনো ওয়াটারমার্ক নেই, সম্পূর্ণ অফলাইন PWA, ওপেন সোর্স ভিত্তি, ও দ্বিভাষিক বাংলা + ইংরেজি ইন্টারফেস — বাংলাদেশের NextGen Digital Studio তৈরি।',
  },
]

/* -------------------------------------------------------------------------- */
/*  Drag & drop file picker                                                    */
/* -------------------------------------------------------------------------- */

type FilePickerProps = {
  isBn: boolean
  multiple?: boolean
  files: File[]
  onFiles: (files: File[]) => void
  hint?: string
}

function FilePicker({ isBn, multiple = false, files, onFiles, hint }: FilePickerProps) {
  const [drag, setDrag] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (list: FileList | null) => {
    if (!list) return
    const arr = Array.from(list).filter((f) => {
      if (!isPdf(f)) {
        toast.error(
          isBn
            ? `শুধু PDF ফাইল গ্রহণযোগ্য: ${f.name}`
            : `Only PDF files are accepted: ${f.name}`,
        )
        return false
      }
      return true
    })
    onFiles(multiple ? [...files, ...arr] : arr.slice(0, 1))
  }

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label={isBn ? 'পিডিএফ ফাইল আপলোড করুন' : 'Upload PDF file'}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          drag
            ? 'border-amber-500 bg-amber-500/5'
            : 'border-border/60 bg-muted/30 hover:border-amber-500/50 hover:bg-muted/50'
        }`}
      >
        <Upload className="h-7 w-7 text-amber-500" />
        <p className="text-sm font-medium">
          {isBn
            ? multiple
              ? 'পিডিএফ ফাইল টেনে আনুন বা ক্লিক করুন'
              : 'পিডিএফ ফাইল টেনে আনুন বা ক্লিক করুন'
            : multiple
              ? 'Drag & drop PDFs or click to browse'
              : 'Drag & drop a PDF or click to browse'}
        </p>
        <p className="text-xs text-muted-foreground">
          {hint ?? (isBn ? 'শুধু PDF · সম্পূর্ণ লোকাল প্রসেসিং' : 'PDF only · 100% local processing')}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple={multiple}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="max-h-44 space-y-1.5 overflow-y-auto pr-1">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-card/50 px-3 py-2 text-xs"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-amber-500" />
                <span className="truncate font-medium">{f.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
                {humanSize(f.size)}
                <button
                  type="button"
                  aria-label={isBn ? 'ফাইল সরান' : 'Remove file'}
                  onClick={(e) => {
                    e.stopPropagation()
                    onFiles(files.filter((_, idx) => idx !== i))
                  }}
                  className="rounded p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Tool Dialog shell                                                          */
/* -------------------------------------------------------------------------- */

function ToolDialog({
  tool,
  isBn,
  open,
  onOpenChange,
  children,
}: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-heading">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/15 text-xl">
              {tool.icon}
            </span>
            <span>{isBn ? tool.nameBn : tool.nameEn}</span>
          </DialogTitle>
          <DialogDescription>
            {isBn ? tool.descBn : tool.descEn}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Merge PDF                                                 */
/* -------------------------------------------------------------------------- */

function MergeTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const canRun = files.length >= 2 && !busy

  const run = async () => {
    if (files.length < 2) {
      toast.error(isBn ? 'মার্জ করতে অন্তত ২টি পিডিএফ দিন।' : 'Add at least 2 PDFs to merge.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const merged = await PDFDocument.create()
      for (let i = 0; i < files.length; i++) {
        const bytes = await files[i].arrayBuffer()
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
        const pages = await merged.copyPages(src, src.getPageIndices())
        pages.forEach((p) => merged.addPage(p))
        setProgress(Math.round(((i + 1) / files.length) * 95))
      }
      const out = await merged.save()
      saveAs(
        new Blob([out], { type: 'application/pdf' }),
        'merged.pdf',
      )
      setProgress(100)
      toast.success(
        isBn
          ? `${bn(files.length, isBn)}টি পিডিএফ মার্জ সম্পন্ন — merged.pdf`
          : `Merged ${files.length} PDFs — merged.pdf`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn
          ? 'মার্জ ব্যর্থ — একটি ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Merge failed — a file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker
          isBn={isBn}
          multiple
          files={files}
          onFiles={setFiles}
        />
        {files.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {isBn
              ? `মোট ${bn(files.length, isBn)}টি পিডিএফ প্রস্তুত — উপরের ক্রম অনুযায়ী মার্জ হবে।`
              : `${files.length} PDFs ready — they will be merged in the order shown above.`}
          </p>
        )}
        {busy && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              {isBn ? `প্রসেসিং ${bn(progress, isBn)}%` : `Processing ${progress}%`}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy}
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          <Button
            onClick={run}
            disabled={!canRun}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isBn ? 'মার্জ হচ্ছে…' : 'Merging…'}
              </>
            ) : (
              <>
                <Merge className="mr-2 h-4 w-4" />
                {isBn ? 'পিডিএফ মার্জ করুন' : 'Merge PDFs'}
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Split PDF                                                 */
/* -------------------------------------------------------------------------- */

type SplitMode = 'ranges' | 'every'

function SplitTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [mode, setMode] = React.useState<SplitMode>('ranges')
  const [rangesStr, setRangesStr] = React.useState('1-1, 2-3')
  const [everyN, setEveryN] = React.useState(1)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  /** Parse "1-3, 5, 7-9" → [[0,2],[4,4],[6,8]] (zero-indexed). */
  function parseRanges(input: string, pageCount: number): number[][] {
    const out: number[][] = []
    for (const part of input.split(',')) {
      const trimmed = part.trim()
      if (!trimmed) continue
      if (trimmed.includes('-')) {
        const [a, b] = trimmed.split('-').map((s) => parseInt(s.trim(), 10))
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue
        const start = Math.max(1, Math.min(a, b))
        const end = Math.min(pageCount, Math.max(a, b))
        if (end >= start) {
          const arr: number[] = []
          for (let i = start; i <= end; i++) arr.push(i - 1)
          out.push(arr)
        }
      } else {
        const n = parseInt(trimmed, 10)
        if (Number.isFinite(n) && n >= 1 && n <= pageCount) {
          out.push([n - 1])
        }
      }
    }
    return out
  }

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF to split.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pageCount = src.getPageCount()

      let chunks: number[][] = []
      if (mode === 'ranges') {
        chunks = parseRanges(rangesStr, pageCount)
        if (chunks.length === 0) {
          toast.error(
            isBn
              ? 'সঠিক পেজ রেঞ্জ লিখুন, যেমন: 1-3, 5, 7-9'
              : 'Enter valid page ranges, e.g. 1-3, 5, 7-9',
          )
          setBusy(false)
          return
        }
      } else {
        const n = Math.max(1, everyN)
        for (let i = 0; i < pageCount; i += n) {
          const arr: number[] = []
          for (let j = i; j < Math.min(i + n, pageCount); j++) arr.push(j)
          chunks.push(arr)
        }
      }

      const baseName = files[0].name.replace(/\.pdf$/i, '')
      for (let i = 0; i < chunks.length; i++) {
        const out = await PDFDocument.create()
        const copied = await out.copyPages(src, chunks[i])
        copied.forEach((p) => out.addPage(p))
        const outBytes = await out.save()
        const startPage = chunks[i][0] + 1
        const endPage = chunks[i][chunks[i].length - 1] + 1
        const fname =
          chunks[i].length === 1
            ? `${baseName}-page-${startPage}.pdf`
            : `${baseName}-pages-${startPage}-${endPage}.pdf`
        saveAs(new Blob([outBytes], { type: 'application/pdf' }), fname)
        setProgress(Math.round(((i + 1) / chunks.length) * 95))
        // Tiny pause so browsers don't block multi-download
        await new Promise((r) => setTimeout(r, 250))
      }

      setProgress(100)
      toast.success(
        isBn
          ? `${bn(chunks.length, isBn)}টি ফাইল ডাউনলোড হয়েছে।`
          : `${chunks.length} files downloaded.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn
          ? 'স্প্লিট ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Split failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wide">
            {isBn ? 'স্প্লিট মোড' : 'Split Mode'}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('ranges')}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                mode === 'ranges'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-border/60 hover:border-amber-500/40'
              }`}
            >
              <span className="block font-medium">
                {isBn ? 'কাস্টম রেঞ্জ' : 'Custom Ranges'}
              </span>
              <span className="text-xs text-muted-foreground">
                {isBn ? 'যেমন: 1-3, 5, 7-9' : 'e.g. 1-3, 5, 7-9'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode('every')}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                mode === 'every'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-border/60 hover:border-amber-500/40'
              }`}
            >
              <span className="block font-medium">
                {isBn ? 'প্রতি N পেজ' : 'Every N Pages'}
              </span>
              <span className="text-xs text-muted-foreground">
                {isBn ? 'সমান চাঙ্কস' : 'Equal chunks'}
              </span>
            </button>
          </div>
        </div>

        {mode === 'ranges' ? (
          <div className="space-y-1.5">
            <Label htmlFor="split-ranges">
              {isBn ? 'পেজ রেঞ্জ (কমা দিয়ে আলাদা)' : 'Page Ranges (comma separated)'}
            </Label>
            <Input
              id="split-ranges"
              value={rangesStr}
              onChange={(e) => setRangesStr(e.target.value)}
              placeholder="1-3, 4-6, 7-10"
            />
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'প্রতিটি রেঞ্জ একটি আলাদা পিডিএফ হবে।'
                : 'Each range becomes a separate PDF.'}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label htmlFor="split-n">
              {isBn ? `প্রতি ${bn(everyN, isBn)} পেজ` : `Every ${everyN} page(s)`}
            </Label>
            <Input
              id="split-n"
              type="number"
              min={1}
              max={999}
              value={everyN}
              onChange={(e) =>
                setEveryN(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
            />
          </div>
        )}

        {busy && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              {isBn ? `প্রসেসিং ${bn(progress, isBn)}%` : `Processing ${progress}%`}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          <Button
            onClick={run}
            disabled={files.length === 0 || busy}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isBn ? 'স্প্লিট হচ্ছে…' : 'Splitting…'}
              </>
            ) : (
              <>
                <Scissors className="mr-2 h-4 w-4" />
                {isBn ? 'পিডিএফ স্প্লিট করুন' : 'Split PDF'}
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Rotate PDF                                                */
/* -------------------------------------------------------------------------- */

function RotateTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [angle, setAngle] = React.useState<90 | 180 | 270>(90)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF to rotate.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      for (let i = 0; i < pages.length; i++) {
        const current = pages[i].getRotation().angle
        pages[i].setRotation(degrees((current + angle) % 360))
        setProgress(Math.round(((i + 1) / pages.length) * 95))
      }
      const out = await doc.save()
      saveAs(
        new Blob([out], { type: 'application/pdf' }),
        `rotated-${angle}.pdf`,
      )
      setProgress(100)
      toast.success(
        isBn
          ? `প্রতিটি পেজ ${bn(angle, isBn)}° ঘোরানো হয়েছে।`
          : `Rotated every page by ${angle}°.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn
          ? 'রোটেট ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Rotate failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="space-y-1.5">
          <Label>{isBn ? 'রোটেশন অ্যাঙ্গেল' : 'Rotation Angle'}</Label>
          <Select
            value={String(angle)}
            onValueChange={(v) => setAngle(Number(v) as 90 | 180 | 270)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90° {isBn ? '(ডানে)' : '(clockwise)'}</SelectItem>
              <SelectItem value="180">180° {isBn ? '(উল্টো)' : '(upside down)'}</SelectItem>
              <SelectItem value="270">270° {isBn ? '(বামে)' : '(counter-clockwise)'}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {isBn
              ? 'অ্যাঙ্গেল বর্তমান রোটেশনের সাথে যোগ হবে।'
              : 'Angle is added to the current rotation.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[90, 180, 270].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAngle(a as 90 | 180 | 270)}
              className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-sm transition-colors ${
                angle === a
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-border/60 hover:border-amber-500/40'
              }`}
            >
              <RotateCw
                className="h-5 w-5 text-amber-500"
                style={{ transform: `rotate(${a === 270 ? -90 : a}deg)` }}
              />
              <span className="font-medium">{bn(a, isBn)}°</span>
            </button>
          ))}
        </div>

        {busy && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              {isBn ? `প্রসেসিং ${bn(progress, isBn)}%` : `Processing ${progress}%`}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          <Button
            onClick={run}
            disabled={files.length === 0 || busy}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isBn ? 'ঘোরানো হচ্ছে…' : 'Rotating…'}
              </>
            ) : (
              <>
                <RotateCw className="mr-2 h-4 w-4" />
                {isBn ? 'পিডিএফ ঘোরান' : 'Rotate PDF'}
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Edit Metadata                                             */
/* -------------------------------------------------------------------------- */

function MetadataTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [meta, setMeta] = React.useState({
    title: '',
    author: '',
    subject: '',
    keywords: '',
    creator: '',
    producer: '',
  })
  const [loaded, setLoaded] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  const load = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF first.')
      return
    }
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setMeta({
        title: doc.getTitle() ?? '',
        author: doc.getAuthor() ?? '',
        subject: doc.getSubject() ?? '',
        keywords: doc.getKeywords() ?? '',
        creator: doc.getCreator() ?? '',
        producer: doc.getProducer() ?? '',
      })
      setLoaded(true)
      toast.success(
        isBn ? 'বর্তমান মেটাডাটা লোড হয়েছে।' : 'Existing metadata loaded.',
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn
          ? 'লোড ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড।'
          : 'Load failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF first.')
      return
    }
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      doc.setTitle(meta.title)
      doc.setAuthor(meta.author)
      doc.setSubject(meta.subject)
      doc.setKeywords(
        meta.keywords
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      )
      doc.setCreator(meta.creator)
      doc.setProducer(meta.producer)
      doc.setModificationDate(new Date())
      const out = await doc.save()
      saveAs(
        new Blob([out], { type: 'application/pdf' }),
        files[0].name.replace(/\.pdf$/i, '') + '-metadata.pdf',
      )
      toast.success(
        isBn
          ? 'মেটাডাটা সংরক্ষণ ও ডাউনলোড হয়েছে।'
          : 'Metadata saved & downloaded.',
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn
          ? 'সেভ ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড।'
          : 'Save failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker
          isBn={isBn}
          files={files}
          onFiles={(f) => {
            setFiles(f)
            setLoaded(false)
          }}
        />

        {!loaded ? (
          <Button
            onClick={load}
            disabled={files.length === 0 || busy}
            variant="secondary"
            className="w-full"
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isBn ? 'লোড হচ্ছে…' : 'Loading…'}
              </>
            ) : (
              <>
                <Tags className="mr-2 h-4 w-4" />
                {isBn ? 'বর্তমান মেটাডাটা লোড করুন' : 'Load Current Metadata'}
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="md-title">{isBn ? 'টাইটেল' : 'Title'}</Label>
                <Input
                  id="md-title"
                  value={meta.title}
                  onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="md-author">{isBn ? 'লেখক' : 'Author'}</Label>
                <Input
                  id="md-author"
                  value={meta.author}
                  onChange={(e) => setMeta({ ...meta, author: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="md-subject">{isBn ? 'বিষয়' : 'Subject'}</Label>
                <Input
                  id="md-subject"
                  value={meta.subject}
                  onChange={(e) => setMeta({ ...meta, subject: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="md-keywords">
                  {isBn ? 'কিওয়ার্ড (কমা দিয়ে)' : 'Keywords (comma separated)'}
                </Label>
                <Input
                  id="md-keywords"
                  value={meta.keywords}
                  onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="md-creator">{isBn ? 'ক্রিয়েটর' : 'Creator'}</Label>
                <Input
                  id="md-creator"
                  value={meta.creator}
                  onChange={(e) => setMeta({ ...meta, creator: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="md-producer">{isBn ? 'প্রোডিউসার' : 'Producer'}</Label>
                <Input
                  id="md-producer"
                  value={meta.producer}
                  onChange={(e) => setMeta({ ...meta, producer: e.target.value })}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'খালি রাখলে সেই ফিল্ড মুছে যাবে।'
                : 'Leave a field empty to clear it.'}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          {loaded && (
            <Button
              onClick={save}
              disabled={busy}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isBn ? 'সেভ হচ্ছে…' : 'Saving…'}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {isBn ? 'সেভ ও ডাউনলোড' : 'Save & Download'}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Tool Card                                                                  */
/* -------------------------------------------------------------------------- */

function ToolCard({ tool, isBn, onOpen }: {
  tool: PdfTool
  isBn: boolean
  onOpen: (tool: PdfTool) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(tool)}
      aria-label={isBn ? tool.nameBn : tool.nameEn}
      className="group relative flex h-full flex-col rounded-xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-500/15 text-2xl">
          {tool.icon}
        </span>
        {tool.functional ? (
          <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20">
            <Check className="mr-1 h-3 w-3" />
            {isBn ? 'লাইভ' : 'Live'}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            {isBn ? 'শীঘ্রই' : 'Soon'}
          </Badge>
        )}
      </div>
      <h3 className="font-heading text-sm font-semibold leading-tight">
        {isBn ? tool.nameBn : tool.nameEn}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {isBn ? tool.descBn : tool.descEn}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-500 transition-colors group-hover:gap-2">
        {isBn ? 'টুল ব্যবহার করুন' : 'Use Tool'}
        <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main client                                                                */
/* -------------------------------------------------------------------------- */

export function PdfClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('pdf_editor_page')

  const [activeCat, setActiveCat] = React.useState<PdfToolCategory | 'all'>('all')
  const [query, setQuery] = React.useState('')
  const [activeTool, setActiveTool] = React.useState<PdfTool | null>(null)

  const filtered = React.useMemo(() => {
    return PDF_TOOLS.filter((t) => {
      if (activeCat !== 'all' && t.category !== activeCat) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        return (
          t.nameEn.toLowerCase().includes(q) ||
          t.nameBn.toLowerCase().includes(q) ||
          t.descEn.toLowerCase().includes(q) ||
          t.descBn.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [activeCat, query])

  const categories: (PdfToolCategory | 'all')[] = [
    'all',
    'popular',
    'convert',
    'optimize',
    'edit',
    'security',
  ]

  const openTool = (tool: PdfTool) => {
    if (tool.functional) {
      setActiveTool(tool)
    } else {
      toast.info(
        isBn
          ? `“${tool.nameBn}” টুলটি শীঘ্রই আসছে!`
          : `“${tool.nameEn}” is coming soon!`,
      )
    }
  }

  const closeTool = () => setActiveTool(null)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* ====================================================== */}
        {/* Hero                                                    */}
        {/* ====================================================== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-background to-background dark:from-amber-500/5" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <LandingEyebrow>
                <Sparkles className="h-3.5 w-3.5" />
                {isBn ? 'পিডিএফ ফোর্জ · NextGen Digital Studio' : 'PDF Forge · NextGen Digital Studio'}
              </LandingEyebrow>

              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {isBn ? (
                  <>
                    যে সব পিডিএফ টুল আপনার
                    <br />
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                      সফলতার জন্য দরকার
                    </span>
                  </>
                ) : (
                  <>
                    Every PDF Tool You Need
                    <br />
                    to <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Succeed</span>
                  </>
                )}
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {isBn
                  ? 'কম্প্রেস, মার্জ, স্প্লিট, কনভার্ট, এডিট, সাইন ও সিকিউর — সব ফ্রি। ১০০% ক্লায়েন্ট-সাইড প্রসেসিং। যেকোনো ডিভাইসে অনলাইন ও অফলাইনে চলে।'
                  : 'Compress, merge, split, convert, edit, sign and secure your PDFs — all for free. 100% client-side processing. Works online and offline on any device.'}
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 text-[15px] font-semibold text-white shadow-lg shadow-amber-500/25 hover:opacity-90 sm:w-auto"
                >
                  <a href="#tools">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isBn ? 'শুরু করুন' : 'Get Started'}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-border/60 px-7 text-[15px] font-semibold sm:w-auto"
                >
                  <a href="#tools">
                    <Layers className="mr-2 h-4 w-4" />
                    {isBn ? 'টুল ব্রাউজ করুন' : 'Browse Tools'}
                  </a>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                {[
                  { en: '100% Free', bn: '১০০% ফ্রি', Icon: Sparkles },
                  { en: 'No Sign-up', bn: 'সাইন-আপ নেই', Icon: ShieldCheck },
                  { en: `${TOTAL_TOOL_COUNT}+ Tools`, bn: `${bn(TOTAL_TOOL_COUNT, isBn)}+ টুল`, Icon: Layers },
                ].map((b) => (
                  <span
                    key={b.en}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium backdrop-blur"
                  >
                    <b.Icon className="h-3.5 w-3.5 text-amber-500" />
                    {isBn ? b.bn : b.en}
                  </span>
                ))}
              </div>
            </div>

            {/* Drag-drop zone visual */}
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="rounded-2xl border border-dashed border-amber-500/40 bg-background/60 p-6 shadow-xl backdrop-blur sm:p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25">
                    <FileText className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-heading text-lg font-semibold">
                    {isBn ? 'পিডিএফ টানুন এবং ছাড়ুন' : 'Drag & Drop Your PDF'}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isBn
                      ? 'অথবা নিচের গ্যালারি থেকে একটি টুল বেছে নিন'
                      : 'Or pick a tool from the gallery below'}
                  </p>
                  <Button
                    asChild
                    className="mt-5 rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    <a href="#tools">
                      {isBn ? 'টুল দেখুন' : 'Browse Tools'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Tool Gallery                                            */}
        {/* ====================================================== */}
        <section id="tools" className="scroll-mt-20 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <Layers className="h-3.5 w-3.5" />
                {isBn ? 'টুল গ্যালারি' : 'Tool Gallery'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? (
                  <>
                    <span className="text-amber-500">{bn(TOTAL_TOOL_COUNT, isBn)}+</span> পিডিএফ টুল
                  </>
                ) : (
                  <>
                    <span className="text-amber-500">{TOTAL_TOOL_COUNT}+</span> PDF Tools
                  </>
                )}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {isBn
                  ? 'ক্যাটেগরি অনুযায়ী ব্রাউজ করুন বা নাম দিয়ে সার্চ করুন। লাইভ টুলগুলো সম্পূর্ণ কার্যকর।'
                  : 'Browse by category or search by name. Live tools are fully functional.'}
              </p>
            </div>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isBn ? 'টুল সার্চ করুন…' : 'Search tools…'}
                  className="h-11 rounded-full pl-9 pr-9"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={isBn ? 'মুছুন' : 'Clear'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => {
                const isActive = activeCat === c
                const label =
                  c === 'all'
                    ? isBn ? 'সব' : 'All'
                    : isBn
                      ? CATEGORY_LABELS[c].bn
                      : CATEGORY_LABELS[c].en
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                        : 'border border-border/60 bg-card hover:border-amber-500/40 hover:bg-muted/50'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <p className="mt-12 text-center text-sm text-muted-foreground">
                {isBn
                  ? `“${query}” এর জন্য কোনো টুল পাওয়া যায়নি।`
                  : `No tools found for “${query}”.`}
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filtered.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isBn={isBn}
                    onOpen={openTool}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ====================================================== */}
        {/* Why NextGen PDF Editor                                  */}
        {/* ====================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <ShieldCheck className="h-3.5 w-3.5" />
                {isBn ? 'কেন পিডিএফ ফোর্জ' : 'Why PDF Forge'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn
                  ? 'আপনার ডেটা আপনারই — সবসময়'
                  : 'Your Data, Yours — Always'}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {isBn
                  ? 'প্রাইভেসি, স্পিড ও ফ্রি-ডোম — এক প্যাকেজে।'
                  : 'Privacy, speed and freedom — in one package.'}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_FEATURES.map((f) => {
                const content = isBn ? f.bn : f.en
                return (
                  <Card
                    key={content.t}
                    className="border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-500">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">
                      {content.t}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {content.d}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* How It Works                                            */}
        {/* ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <Zap className="h-3.5 w-3.5" />
                {isBn ? 'কিভাবে কাজ করে' : 'How It Works'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? '৩টি সহজ ধাপে ফলাফল' : 'Result in 3 Simple Steps'}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {HOW_STEPS.map((s, i) => {
                const c = isBn ? s.bn : s.en
                return (
                  <div
                    key={c.t}
                    className="relative rounded-2xl border border-border/60 bg-card p-6 text-center"
                  >
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                      {isBn ? `ধাপ ${bn(i + 1, isBn)}` : `Step ${i + 1}`}
                    </span>
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-amber-500/15 text-amber-500">
                      <s.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{c.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Comparison Table                                        */}
        {/* ====================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <Cpu className="h-3.5 w-3.5" />
                {isBn ? 'তুলনা' : 'Comparison'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn
                  ? 'পিডিএফ ফোর্জ বনাম বাকিরা'
                  : 'PDF Forge vs the Rest'}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {isBn
                  ? 'দেখুন কেন ফ্রি-প্রাইভেট-অফলাইন সবচেয়ে ভালো।'
                  : 'See why free + private + offline wins every time.'}
              </p>
            </div>

            <Card className="mt-10 overflow-hidden border-border/60 p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-muted/50">
                      <th className="px-4 py-3 font-semibold">
                        {isBn ? 'ফিচার' : 'Feature'}
                      </th>
                      <th className="bg-amber-500/10 px-4 py-3 text-center font-heading font-bold text-amber-500">
                        PDF Forge
                      </th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                        Smallpdf
                      </th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                        iLovePDF
                      </th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                        Adobe Acrobat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((row) => (
                      <tr
                        key={row.en}
                        className="border-b border-border/40 last:border-b-0"
                      >
                        <td className="px-4 py-3 font-medium">
                          {isBn ? row.bn : row.en}
                        </td>
                        <td className="bg-amber-500/5 px-4 py-3 text-center font-semibold text-foreground">
                          <CompareCell value={row.nextgen} isBn={isBn} />
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">
                          <CompareCell value={row.smallpdf} isBn={isBn} muted />
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">
                          <CompareCell value={row.ilovepdf} isBn={isBn} muted />
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">
                          <CompareCell value={row.adobe} isBn={isBn} muted />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Testimonials                                            */}
        {/* ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <Star className="h-3.5 w-3.5" />
                {isBn ? 'ব্যবহারকারীর কথা' : 'Testimonials'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'যারা ভালোবাসেন পিডিএফ ফোর্জ' : 'Loved by PDF Forge Users'}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => {
                const name = isBn ? t.nameBn : t.nameEn
                const role = isBn ? t.roleBn : t.roleEn
                const quote = isBn ? t.quoteBn : t.quoteEn
                return (
                  <Card
                    key={name}
                    className="relative flex flex-col border-border/60 bg-card p-6"
                  >
                    <Quote className="absolute right-5 top-5 h-8 w-8 text-amber-500/20" />
                    <div className="mb-3 flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground">
                      “{quote}”
                    </p>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 font-heading text-sm font-bold text-white">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{name}</p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Services                                                */}
        {/* ====================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <Cpu className="h-3.5 w-3.5" />
                {isBn ? 'আমাদের সেবা' : 'Our Services'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn
                  ? 'NextGen Digital Studio — সম্পূর্ণ ডিজিটাল সলিউশন'
                  : 'NextGen Digital Studio — Full Digital Solutions'}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {isBn
                  ? 'পিডিএফ টুল ছাড়াও আমরা বিভিন্ন ডিজিটাল সেবা দিয়ে থাকি।'
                  : 'Beyond PDF tools, we deliver a full range of digital services.'}
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => {
                const label = isBn ? s.bn : s.en
                return (
                  <Link
                    key={label}
                    href={s.href}
                    className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-md"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-amber-500">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium leading-tight">
                      {label}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )
              })}
            </div>

            {/* Founder CTA */}
            <Card className="mt-10 overflow-hidden border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-background to-emerald-500/10 p-6 sm:p-8">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold sm:text-2xl">
                    {isBn ? 'কাস্টম ডিজিটাল সলিউশন দরকার?' : 'Need a Custom Digital Solution?'}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    {isBn
                      ? 'এআই, অটোমেশন, ওয়েবসাইট বা কাস্টম টুল — আমরা তৈরি করে দিই। প্রতিষ্ঠাতা: MD. Nazmul Islam Taj, NextGen Digital Studio, যশোর, বাংলাদেশ।'
                      : 'AI, automation, website or a custom tool — we build it. Founder: MD. Nazmul Islam Taj, NextGen Digital Studio, Jessore, Bangladesh.'}
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 text-white shadow-lg shadow-amber-500/25 hover:opacity-90"
                >
                  <Link href="/#contact">
                    {isBn ? 'যোগাযোগ করুন' : 'Get in Touch'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* ====================================================== */}
        {/* FAQ                                                     */}
        {/* ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <LandingEyebrow>
                <FileText className="h-3.5 w-3.5" />
                {isBn ? 'প্রশ্নোত্তর' : 'FAQ'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <Accordion type="single" collapsible className="mt-8">
              {FAQS.map((f, i) => {
                const q = isBn ? f.qBn : f.qEn
                const a = isBn ? f.aBn : f.aEn
                return (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Final CTA                                               */}
        {/* ====================================================== */}
        <section className="pb-14 sm:pb-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <Card className="overflow-hidden border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-background to-background p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25">
                <Lock className="h-7 w-7" />
              </div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {isBn
                  ? 'এখনই শুরু করুন — সম্পূর্ণ ফ্রি'
                  : 'Start Now — 100% Free'}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                {isBn
                  ? 'কোনো সাইন-আপ নেই, কোনো আপলোড নেই, কোনো ওয়াটারমার্ক নেই। শুধু টুল বেছে নিন ও কাজ শুরু করুন।'
                  : 'No sign-up, no upload, no watermark. Just pick a tool and start.'}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 text-white shadow-lg shadow-amber-500/25 hover:opacity-90"
              >
                <a href="#tools">
                  <Plus className="mr-2 h-4 w-4" />
                  {isBn ? 'টুল খুলুন' : 'Open a Tool'}
                </a>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />

      {/* Functional tool dialogs (only one is mounted at a time) */}
      {activeTool && activeTool.id === 'merge' && (
        <MergeTool
          tool={activeTool}
          isBn={isBn}
          open={true}
          onOpenChange={closeTool}
        />
      )}
      {activeTool && activeTool.id === 'split' && (
        <SplitTool
          tool={activeTool}
          isBn={isBn}
          open={true}
          onOpenChange={closeTool}
        />
      )}
      {activeTool && activeTool.id === 'rotate' && (
        <RotateTool
          tool={activeTool}
          isBn={isBn}
          open={true}
          onOpenChange={closeTool}
        />
      )}
      {activeTool && activeTool.id === 'metadata' && (
        <MetadataTool
          tool={activeTool}
          isBn={isBn}
          open={true}
          onOpenChange={closeTool}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Comparison cell renderer                                                   */
/* -------------------------------------------------------------------------- */

function CompareCell({
  value,
  isBn,
  muted = false,
}: {
  value: boolean | string
  isBn: boolean
  muted?: boolean
}) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-emerald-500" />
    ) : (
      <X className={`mx-auto h-5 w-5 ${muted ? 'text-muted-foreground/50' : 'text-destructive/60'}`} />
    )
  }
  // Map common English words to Bangla
  let display = value
  if (isBn) {
    const map: Record<string, string> = {
      Free: 'ফ্রি',
      Freemium: 'ফ্রিমিয়াম',
      '40+': '৪০+',
      '21': '২১',
      '25': '২৫',
      '30+': '৩০+',
    }
    display = map[value] ?? value
  }
  return <span>{display}</span>
}
