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
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from '@/components/ui/command'

import {
  PDF_TOOLS,
  CATEGORY_LABELS,
  TOTAL_TOOL_COUNT,
  AVAILABLE_NOW_COUNT,
  LIMITED_COUNT,
  ROADMAP_COUNT,
  type PdfTool,
  type PdfToolCategory,
} from './pdf-tools'

import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib'

// Phase 1B — Lazy-loaded PDF.js tools (code-split: pdfjs-dist only loads when these tools open)
const PdfViewerTool = React.lazy(() => import('./tools/pdf-viewer-tool').then(m => ({ default: m.PdfViewerTool })))
const PdfToTextTool = React.lazy(() => import('./tools/pdf-to-text-tool').then(m => ({ default: m.PdfToTextTool })))
const ExtractImagesTool = React.lazy(() => import('./tools/extract-images-tool').then(m => ({ default: m.ExtractImagesTool })))
const PdfToJpgTool = React.lazy(() => import('./tools/pdf-to-jpg-tool').then(m => ({ default: m.PdfToJpgTool })))
const PdfToPngTool = React.lazy(() => import('./tools/pdf-to-png-tool').then(m => ({ default: m.PdfToPngTool })))
const JpgToPdfTool = React.lazy(() => import('./tools/jpg-to-pdf-tool').then(m => ({ default: m.JpgToPdfTool })))
const StampTool = React.lazy(() => import('./tools/stamp-tool').then(m => ({ default: m.StampTool })))
const FlattenTool = React.lazy(() => import('./tools/flatten-tool').then(m => ({ default: m.FlattenTool })))
const QrStampTool = React.lazy(() => import('./tools/qr-stamp-tool').then(m => ({ default: m.QrStampTool })))
const FillFormsTool = React.lazy(() => import('./tools/fill-forms-tool').then(m => ({ default: m.FillFormsTool })))
// Phase 2B — Lazy-loaded OCR tool (code-split: tesseract.js + pdfjs-dist only loads when this tool opens)
const PdfOcrTool = React.lazy(() => import('./tools/pdf-ocr-tool').then(m => ({ default: m.PdfOcrTool })))
// Phase 2C Wave 1 — Lazy-loaded Annotate tool (code-split: pdfjs-dist + pdf-lib only loads when this tool opens)
const AnnotateTool = React.lazy(() => import('./tools/annotate-tool').then(m => ({ default: m.AnnotateTool })))
// Phase 2C Wave 3A — Lazy-loaded tools
const VersionConverterTool = React.lazy(() => import('./tools/version-converter-tool').then(m => ({ default: m.VersionConverterTool })))
const RepairTool = React.lazy(() => import('./tools/repair-tool').then(m => ({ default: m.RepairTool })))
const CompressTool = React.lazy(() => import('./tools/compress-tool').then(m => ({ default: m.CompressTool })))
const ManageBookmarksTool = React.lazy(() => import('./tools/manage-bookmarks-tool').then(m => ({ default: m.ManageBookmarksTool })))
// Phase 2C Wave 3B — Lazy-loaded tools
const BookmarksFromTextTool = React.lazy(() => import('./tools/bookmarks-from-text-tool').then(m => ({ default: m.BookmarksFromTextTool })))
const CompareTool = React.lazy(() => import('./tools/compare-tool').then(m => ({ default: m.CompareTool })))
// Phase 2C Wave 3C — Lazy-loaded tools (LIMITED)
const GrayscaleTool = React.lazy(() => import('./tools/grayscale-tool').then(m => ({ default: m.GrayscaleTool })))
const SignTool = React.lazy(() => import('./tools/sign-tool').then(m => ({ default: m.SignTool })))
// Phase 2C Wave 4A — Lazy-loaded conversion tools (LIMITED)
const PdfToWordTool = React.lazy(() => import('./tools/pdf-to-word-tool').then(m => ({ default: m.PdfToWordTool })))
const PdfToExcelTool = React.lazy(() => import('./tools/pdf-to-excel-tool').then(m => ({ default: m.PdfToExcelTool })))
const PdfToPptTool = React.lazy(() => import('./tools/pdf-to-ppt-tool').then(m => ({ default: m.PdfToPptTool })))
const PdfToEbookTool = React.lazy(() => import('./tools/pdf-to-ebook-tool').then(m => ({ default: m.PdfToEbookTool })))
// Phase 2C Wave 4C — Lazy-loaded security tools
const ProtectTool = React.lazy(() => import('./tools/protect-tool').then(m => ({ default: m.ProtectTool })))
const UnlockTool = React.lazy(() => import('./tools/unlock-tool').then(m => ({ default: m.UnlockTool })))

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
  Command as CommandIcon,
  Keyboard,
  Activity,
  TrendingUp,
  Clock,
  BarChart3,
  Workflow,
  Droplets,
  Hash,
  RotateCcw,
  Smartphone,
  Lightbulb,
  HardDrive,
  RefreshCw,
  Save,
  Bookmark,
  PencilLine,
  Rewind,
  Palette,
  Monitor,
  Apple,
  Terminal,
  MonitorDown,
  ArrowUp,
  ArrowDown,
  Crop,
  Info,
  Microscope,
  Briefcase,
  Building2,
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

/**
 * Validate generated PDF bytes by reopening with pdf-lib.
 * Returns { ok, pageCount } or { ok: false, error }.
 * Prevents downloading corrupted output.
 */
async function validatePdfBytes(
  bytes: Uint8Array,
  expectedPages?: number,
): Promise<{ ok: true; pageCount: number } | { ok: false; error: string }> {
  try {
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
    const pageCount = doc.getPageCount()
    if (expectedPages !== undefined && pageCount !== expectedPages) {
      return {
        ok: false,
        error: `Page count mismatch: expected ${expectedPages}, got ${pageCount}`,
      }
    }
    if (pageCount === 0) {
      return { ok: false, error: 'Generated PDF has 0 pages' }
    }
    return { ok: true, pageCount }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown PDF validation error',
    }
  }
}

/** Trigger a download only after validating the PDF bytes. */
export async function downloadValidatedPdf(
  bytes: Uint8Array,
  filename: string,
  expectedPages?: number,
): Promise<boolean> {
  const validation = await validatePdfBytes(bytes, expectedPages)
  if (!validation.ok) {
    console.error('[PDF Forge] Output validation failed:', validation.error)
    return false
  }
  const outBuf = new Uint8Array(bytes)
  saveAs(new Blob([outBuf], { type: 'application/pdf' }), filename)
  return true
}

/** Human-readable file size in KB / MB. */
export function humanSize(bytes: number): string {
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
    en: { t: '100% Free Forever', d: 'No subscriptions, no hidden fees, no trial limits. All currently available tools are free to use. No subscription required.' },
    bn: { t: '১০০% চিরকাল ফ্রি', d: 'কোনো সাবস্ক্রিপশন নেই, কোনো লুকানো ফি নেই। প্রতিটি টুল, প্রতিটি পেজ, প্রতিটি ডিভাইসে — ফ্রি।' },
  },
  {
    icon: ShieldCheck,
    en: { t: 'Private & Secure', d: 'Files never leave your device. All processing is 100% client-side — your documents stay yours.' },
    bn: { t: 'প্রাইভেট ও সিকিউর', d: 'ফাইল কখনো আপনার ডিভাইস ছাড়ে না। সব প্রসেসিং ১০০% ক্লায়েন্ট-সাইডে — আপনার ডকুমেন্ট আপনারই থাকে।' },
  },
  {
    icon: WifiOff,
    en: { t: 'Client-side Processing', d: 'All PDF processing happens locally in your browser. Files never leave your device — private and secure.' },
    bn: { t: 'ক্লায়েন্ট-সাইড প্রসেসিং', d: 'সব পিডিএফ প্রসেসিং আপনার ব্রাউজারেই হয়। ফাইল কখনো ডিভাইস ছাড়ে না — প্রাইভেট ও সিকিউর।' },
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
    en: { t: 'No Artificial Limits', d: 'No artificial daily usage cap. Practical file limits depend on your device, browser, and available memory.' },
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
    en: { t: 'Choose a Tool', d: 'Browse 43 PDF tools, filter by category, search by name — tap to launch instantly.' },
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
    nextgen: '43',
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

const BUILT_FOR: {
  icon: typeof Cpu
  en: { t: string; d: string }
  bn: { t: string; d: string }
}[] = [
  {
    icon: FileText,
    en: { t: 'For Students', d: 'Merge lecture notes, add page numbers, extract key pages — all free, all private.' },
    bn: { t: 'ছাত্রদের জন্য', d: 'লেকচার নোট মার্জ, পেজ নম্বর যোগ, গুরুত্বপূর্ণ পেজ এক্সট্র্যাক্ট — সব ফ্রি, সব প্রাইভেট।' },
  },
  {
    icon: Briefcase,
    en: { t: 'For Freelancers', d: 'Deliver professional PDFs to clients — watermark, reorder, rotate, inspect.' },
    bn: { t: 'ফ্রিল্যান্সারদের জন্য', d: 'ক্লায়েন্টের জন্য প্রফেশনাল পিডিএফ তৈরি — ওয়াটারমার্ক, রিঅর্ডার, রোটেট, ইন্সপেক্ট।' },
  },
  {
    icon: Building2,
    en: { t: 'For Businesses', d: 'Process documents locally — no upload, no server, full privacy compliance.' },
    bn: { t: 'ব্যবসার জন্য', d: 'ডকুমেন্ট লোকালি প্রসেস — কোনো আপলোড নেই, কোনো সার্ভার নেই, সম্পূর্ণ প্রাইভেসি।' },
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
    aEn: 'Yes. PDF Forge is completely free forever — no subscriptions, no hidden fees, no daily caps. All currently available tools are free to use on any device. No subscription required.',
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
    aEn: `The ${AVAILABLE_NOW_COUNT} functional tools process PDFs entirely in your browser — no server upload. The app is installable as a PWA. Note: ${ROADMAP_COUNT} tools are currently roadmap items, not yet functional.`,
    aBn: `${AVAILABLE_NOW_COUNT}টি ফাংশনাল টুল সম্পূর্ণ আপনার ব্রাউজারেই পিডিএফ প্রসেস করে — কোনো সার্ভার আপলোড নেই। অ্যাপটি PWA হিসেবে ইনস্টলযোগ্য। তবে ${ROADMAP_COUNT}টি টুল বর্তমানে রোডম্যাপে আছে, এখনো ফাংশনাল নয়।`,
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
    aEn: `PDF Forge is 100% free forever with no account, no upload (files stay on your device), no watermarks, client-side processing, installable PWA, bilingual Bangla + English interface — built by NextGen Digital Studio. Currently ${AVAILABLE_NOW_COUNT} tools are functional; ${ROADMAP_COUNT} are on the roadmap.`,
    aBn: `পিডিএফ ফোর্জ চিরকাল ১০০% ফ্রি — কোনো অ্যাকাউন্ট নেই, কোনো আপলোড নেই (ফাইল আপনার ডিভাইসে থাকে), কোনো ওয়াটারমার্ক নেই, ক্লায়েন্ট-সাইড প্রসেসিং, ইনস্টলযোগ্য PWA, দ্বিভাষিক বাংলা + ইংরেজি ইন্টারফেস — NextGen Digital Studio তৈরি। বর্তমানে ${AVAILABLE_NOW_COUNT}টি টুল ফাংশনাল; ${ROADMAP_COUNT}টি রোডম্যাপে।`,
  },
]

/* -------------------------------------------------------------------------- */
/*  Workflow pipeline templates                                                */
/* -------------------------------------------------------------------------- */

type WorkflowStep = {
  id: string
  labelEn: string
  labelBn: string
  icon: string
}

type WorkflowTemplate = {
  id: string
  titleEn: string
  titleBn: string
  descEn: string
  descBn: string
  icon: typeof Workflow
  steps: WorkflowStep[]
}

const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'rotate-watermark-number',
    titleEn: 'Rotate → Watermark → Page Numbers',
    titleBn: 'রোটেট → ওয়াটারমার্ক → পেজ নম্বর',
    descEn: 'Rotate, stamp your brand, and add page numbers — all Available Now tools.',
    descBn: 'ঘোরান, ব্র্যান্ড স্ট্যাম্প দিন, পেজ নম্বর যোগ করুন — সব এখনই ব্যবহারযোগ্য।',
    icon: Droplets,
    steps: [
      { id: 'rotate', labelEn: 'Rotate', labelBn: 'রোটেট', icon: '🔄' },
      { id: 'watermark', labelEn: 'Watermark', labelBn: 'ওয়াটারমার্ক', icon: '💧' },
      { id: 'page-numbers', labelEn: 'Page Numbers', labelBn: 'পেজ নম্বর', icon: '🔢' },
    ],
  },
  {
    id: 'organize-rotate-watermark',
    titleEn: 'Organize → Rotate → Watermark',
    titleBn: 'অর্গানাইজ → রোটেট → ওয়াটারমার্ক',
    descEn: 'Reorder pages, fix orientation, then add your watermark.',
    descBn: 'পেজ সাজান, ঘোরান, তারপর ওয়াটারমার্ক দিন।',
    icon: RefreshCw,
    steps: [
      { id: 'organize', labelEn: 'Organize', labelBn: 'অর্গানাইজ', icon: '🗂️' },
      { id: 'rotate', labelEn: 'Rotate', labelBn: 'রোটেট', icon: '🔄' },
      { id: 'watermark', labelEn: 'Watermark', labelBn: 'ওয়াটারমার্ক', icon: '💧' },
    ],
  },
  {
    id: 'inspect-metadata-number',
    titleEn: 'Inspect → Metadata → Page Numbers',
    titleBn: 'ইন্সপেক্ট → মেটাডাটা → পেজ নম্বর',
    descEn: 'Inspect PDF details, edit metadata, then add page numbers.',
    descBn: 'পিডিএফ বিস্তারিত দেখুন, মেটাডাটা এডিট করুন, পেজ নম্বর যোগ করুন।',
    icon: Lock,
    steps: [
      { id: 'inspect', labelEn: 'Inspect', labelBn: 'ইন্সপেক্ট', icon: '🔎' },
      { id: 'metadata', labelEn: 'Edit Metadata', labelBn: 'মেটাডাটা', icon: '🏷️' },
      { id: 'page-numbers', labelEn: 'Page Numbers', labelBn: 'পেজ নম্বর', icon: '🔢' },
    ],
  },
  {
    id: 'reverse-watermark-number',
    titleEn: 'Reverse → Watermark → Page Numbers',
    titleBn: 'রিভার্স → ওয়াটারমার্ক → পেজ নম্বর',
    descEn: 'Reverse page order, add watermark, then number pages.',
    descBn: 'পেজ ক্রম উল্টে দিন, ওয়াটারমার্ক দিন, পেজ নম্বর যোগ করুন।',
    icon: Zap,
    steps: [
      { id: 'reverse', labelEn: 'Reverse Pages', labelBn: 'পেজ উল্টান', icon: '↩️' },
      { id: 'watermark', labelEn: 'Watermark', labelBn: 'ওয়াটারমার্ক', icon: '💧' },
      { id: 'page-numbers', labelEn: 'Page Numbers', labelBn: 'পেজ নম্বর', icon: '🔢' },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Tool capabilities matrix                                                   */
/* -------------------------------------------------------------------------- */

type CapRow = {
  toolEn: string
  toolBn: string
  icon: string
  multi: boolean
  pageSelect: boolean
  password: boolean
  preview: boolean
  batch: boolean
}

const CAPABILITIES: CapRow[] = [
  { toolEn: 'Compress', toolBn: 'কম্প্রেস', icon: '🗜️', multi: false, pageSelect: false, password: false, preview: true, batch: true },
  { toolEn: 'Merge', toolBn: 'মার্জ', icon: '🔗', multi: true, pageSelect: false, password: false, preview: false, batch: true },
  { toolEn: 'Split', toolBn: 'স্প্লিট', icon: '✂️', multi: false, pageSelect: true, password: false, preview: false, batch: true },
  { toolEn: 'PDF to JPG', toolBn: 'পিডিএফ থেকে JPG', icon: '🖼️', multi: false, pageSelect: true, password: false, preview: true, batch: true },
  { toolEn: 'JPG to PDF', toolBn: 'JPG থেকে পিডিএফ', icon: '📷', multi: true, pageSelect: false, password: false, preview: true, batch: true },
  { toolEn: 'Rotate', toolBn: 'রোটেট', icon: '🔄', multi: false, pageSelect: false, password: false, preview: true, batch: true },
  { toolEn: 'Watermark', toolBn: 'ওয়াটারমার্ক', icon: '💧', multi: false, pageSelect: true, password: false, preview: true, batch: true },
  { toolEn: 'Page Numbers', toolBn: 'পেজ নম্বর', icon: '🔢', multi: false, pageSelect: true, password: false, preview: true, batch: true },
  { toolEn: 'Protect', toolBn: 'প্রটেক্ট', icon: '🔒', multi: false, pageSelect: false, password: true, preview: false, batch: true },
  { toolEn: 'Unlock', toolBn: 'আনলক', icon: '🔓', multi: false, pageSelect: false, password: true, preview: false, batch: true },
  { toolEn: 'Sign', toolBn: 'সাইন', icon: '✍️', multi: false, pageSelect: true, password: false, preview: true, batch: false },
  { toolEn: 'Organize', toolBn: 'অর্গানাইজ', icon: '🗂️', multi: false, pageSelect: true, password: false, preview: true, batch: false },
  { toolEn: 'Annotate', toolBn: 'অ্যানোটেট', icon: '🖍️', multi: false, pageSelect: true, password: false, preview: true, batch: false },
  { toolEn: 'Stamp', toolBn: 'স্ট্যাম্প', icon: '🔖', multi: false, pageSelect: true, password: false, preview: true, batch: true },
  { toolEn: 'Fill Forms', toolBn: 'ফর্ম পূরণ', icon: '📋', multi: false, pageSelect: false, password: false, preview: true, batch: false },
  { toolEn: 'Redact', toolBn: 'রিড্যাক্ট', icon: '⬛', multi: false, pageSelect: true, password: false, preview: true, batch: false },
]

/* -------------------------------------------------------------------------- */
/*  Pro Tips                                                                   */
/* -------------------------------------------------------------------------- */

const PRO_TIPS: { en: string; bn: string }[] = [
  {
    en: 'Press Ctrl+K (or ⌘+K) — Quickly search any PDF tool by name with the command palette.',
    bn: 'Ctrl+K (বা ⌘+K) চাপুন — কমান্ড প্যালেট দিয়ে যেকোনো পিডিএফ টুল নাম দিয়ে সার্চ করুন।',
  },
  {
    en: 'All processing is local — Your files never leave your device. Perfect for confidential documents.',
    bn: 'সব প্রসেসিং লোকাল — আপনার ফাইল কখনো ডিভাইস ছাড়ে না। গোপনীয় ডকুমেন্টের জন্য পারফেক্ট।',
  },
  {
    en: 'Use Workflows — Chain multiple operations like Rotate → Watermark → Page Numbers in one pass.',
    bn: 'ওয়ার্কফ্লো ব্যবহার করুন — কম্প্রেস → ওয়াটারমার্ক → পেজ নম্বর একসাথে চালান।',
  },
  {
    en: 'Install as PWA — Install PDF Forge as a PWA for quick access. Client-side processing on all devices.',
    bn: 'PWA হিসেবে ইনস্টল করুন — ইন্টারনেট ছাড়াই পিডিএফ ফোর্জ ব্যবহার করুন। সব ডিভাইসে চলে।',
  },
  {
    en: 'No file limits — No artificial daily cap. Practical limits depend on your device and browser memory.',
    bn: 'কোনো ফাইল লিমিট নেই — আপনার ডিভাইস যত সামলায় তত বড় ফাইল প্রসেস করুন। কোনো ডেইলি ক্যাপ নেই।',
  },
  {
    en: 'Bilingual support — Switch between English and বাংলা anytime.',
    bn: 'দ্বিভাষিক সাপোর্ট — যেকোনো সময় ইংরেজি ও বাংলার মধ্যে স্যুইচ করুন।',
  },
]

/* -------------------------------------------------------------------------- */
/*  Activity tracking (localStorage)                                           */
/* -------------------------------------------------------------------------- */

const ACTIVITY_KEY = 'nextgen-pdf-forge-activity'

type ActivityEntry = {
  toolId: string
  toolNameEn: string
  toolNameBn: string
  icon: string
  category: PdfToolCategory
  ts: number // epoch ms
}

type ActivityStats = {
  total: number
  uniqueTools: number
  mostUsed: ActivityEntry | null
  lastUsed: ActivityEntry | null
  todayCount: number
  byCategory: Record<PdfToolCategory, number>
}

function loadActivity(): ActivityEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(ACTIVITY_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as ActivityEntry[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function saveActivity(entries: ActivityEntry[]) {
  if (typeof window === 'undefined') return
  try {
    // Keep at most 100 entries
    const trimmed = entries.slice(0, 100)
    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmed))
  } catch {
    /* ignore quota errors */
  }
}

function computeStats(entries: ActivityEntry[]): ActivityStats {
  const total = entries.length
  const uniqueTools = new Set(entries.map((e) => e.toolId)).size
  const byCategory: Record<PdfToolCategory, number> = {
    popular: 0,
    convert: 0,
    optimize: 0,
    edit: 0,
    security: 0,
  }
  const counts: Record<string, { entry: ActivityEntry; n: number }> = {}
  for (const e of entries) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + 1
    if (!counts[e.toolId]) counts[e.toolId] = { entry: e, n: 0 }
    counts[e.toolId].n++
  }
  let mostUsed: ActivityEntry | null = null
  let maxN = 0
  for (const k of Object.keys(counts)) {
    if (counts[k].n > maxN) {
      maxN = counts[k].n
      mostUsed = counts[k].entry
    }
  }
  const lastUsed = entries.length > 0 ? entries[0] : null
  // today count
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const todayCount = entries.filter((e) => e.ts >= startOfDay).length
  return { total, uniqueTools, mostUsed, lastUsed, todayCount, byCategory }
}

/* -------------------------------------------------------------------------- */
/*  Drag & drop file picker                                                    */
/* -------------------------------------------------------------------------- */

type FilePickerProps = {
  isBn: boolean
  multiple?: boolean
  files: File[]
  onFiles: (files: File[]) => void
  hint?: string
  accept?: string
  fileValidator?: (file: File) => boolean
  rejectMessage?: (fileName: string) => string
}

export function FilePicker({ isBn, multiple = false, files, onFiles, hint, accept, fileValidator, rejectMessage }: FilePickerProps) {
  const [drag, setDrag] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (list: FileList | null) => {
    if (!list) return
    const arr = Array.from(list).filter((f) => {
      const valid = fileValidator ? fileValidator(f) : isPdf(f)
      if (!valid) {
        toast.error(
          rejectMessage
            ? rejectMessage(f.name)
            : isBn
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
          accept={accept ?? "application/pdf,.pdf"}
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

export function ToolDialog({
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

function MergeTool({ tool, isBn, open, onOpenChange, initialFiles }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
  initialFiles?: File[]
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  // Hydrate files from initialFiles when the dialog opens
  React.useEffect(() => {
    if (open && initialFiles && initialFiles.length > 0) {
      setFiles((prev) => (prev.length === 0 ? initialFiles : prev))
    }
  }, [open, initialFiles])

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
      const expectedPages = merged.getPageCount()
      const ok = await downloadValidatedPdf(out, 'merged.pdf', expectedPages)
      if (!ok) {
        throw new Error('Output validation failed — merge produced an invalid PDF')
      }
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
        const ok = await downloadValidatedPdf(outBytes, fname, chunks[i].length)
        if (!ok) {
          throw new Error(`Output validation failed for ${fname}`)
        }
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
      const expectedPages = doc.getPageCount()
      const ok = await downloadValidatedPdf(out, `rotated-${angle}.pdf`, expectedPages)
      if (!ok) {
        throw new Error('Output validation failed — rotate produced an invalid PDF')
      }
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
  const [docInfo, setDocInfo] = React.useState<{
    fileName: string
    fileSize: string
    pageCount: number
    creationDate: string
    modDate: string
  } | null>(null)
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
      const creationDate = doc.getCreationDate()
      const modDate = doc.getModificationDate()
      setDocInfo({
        fileName: files[0].name,
        fileSize: humanSize(files[0].size),
        pageCount: doc.getPageCount(),
        creationDate: creationDate ? creationDate.toLocaleDateString() : '—',
        modDate: modDate ? modDate.toLocaleDateString() : '—',
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
      const expectedPages = doc.getPageCount()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-metadata.pdf',
        expectedPages,
      )
      if (!ok) {
        throw new Error('Output validation failed — metadata save produced an invalid PDF')
      }
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
            {/* Document information panel */}
            {docInfo && (
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {isBn ? 'ডকুমেন্ট তথ্য' : 'Document Information'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                  <div>
                    <span className="text-muted-foreground">{isBn ? 'ফাইল:' : 'File:'}</span>
                    <p className="truncate font-medium" title={docInfo.fileName}>{docInfo.fileName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isBn ? 'সাইজ:' : 'Size:'}</span>
                    <p className="font-medium">{docInfo.fileSize}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isBn ? 'পেজ:' : 'Pages:'}</span>
                    <p className="font-medium">{bn(docInfo.pageCount, isBn)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isBn ? 'তৈরি:' : 'Created:'}</span>
                    <p className="font-medium">{docInfo.creationDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{isBn ? 'পরিবর্তিত:' : 'Modified:'}</span>
                    <p className="font-medium">{docInfo.modDate}</p>
                  </div>
                </div>
              </div>
            )}
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
/*  Functional tool: Delete Pages                                              */
/* -------------------------------------------------------------------------- */

function DeletePagesTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [selected, setSelected] = React.useState<Set<number>>(new Set())
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const loadPageCount = async () => {
    if (files.length === 0) return
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setPageCount(doc.getPageCount())
      setSelected(new Set())
    } catch {
      toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
    }
  }

  React.useEffect(() => {
    if (files.length > 0) loadPageCount()
    else setPageCount(0)
  }, [files])

  const togglePage = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const canRun = selected.size > 0 && selected.size < pageCount && !busy

  const run = async () => {
    if (!canRun) {
      toast.error(
        isBn
          ? 'অন্তত ১টি পেজ রাখতে হবে — সব পেজ ডিলিট করা যাবে না।'
          : 'Cannot delete all pages — at least 1 must remain.',
      )
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const total = doc.getPageCount()
      // Remove from highest to lowest to preserve indices
      const sorted = Array.from(selected).sort((a, b) => b - a)
      let done = 0
      for (const idx of sorted) {
        doc.removePage(idx)
        done++
        setProgress(5 + Math.round((done / sorted.length) * 90))
      }
      const out = await doc.save()
      const expectedPages = total - selected.size
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-deleted.pdf',
        expectedPages,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn
          ? `${bn(selected.size, isBn)}টি পেজ ডিলিট হয়েছে — ${bn(expectedPages, isBn)}টি পেজ রয়ে গেছে।`
          : `Deleted ${selected.size} pages — ${expectedPages} remaining.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn ? 'ডিলিট ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।' : 'Delete failed — file may be corrupt or encrypted.',
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
        {pageCount > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              {isBn
                ? `মোট ${bn(pageCount, isBn)}টি পেজ — ডিলিট করতে চান এমন পেজ বাছুন।`
                : `${pageCount} pages — select pages to delete.`}
            </p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8" role="group" aria-label={isBn ? 'পেজ নির্বাচন' : 'Page selection'}>
              {Array.from({ length: pageCount }, (_, i) => {
                const isSelected = selected.has(i)
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => togglePage(i)}
                    aria-pressed={isSelected}
                    aria-label={`${isBn ? 'পেজ' : 'Page'} ${i + 1}${isSelected ? ` — ${isBn ? 'নির্বাচিত' : 'selected'}` : ''}`}
                    className={`flex aspect-square items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400'
                        : 'border-border/60 hover:border-rose-500/40'
                    }`}
                  >
                    {bn(i + 1, isBn)}
                    {isSelected && <span className="sr-only">{isBn ? 'নির্বাচিত' : 'selected'}</span>}
                  </button>
                )
              })}
            </div>
            {selected.size > 0 && (
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {isBn ? `${bn(selected.size, isBn)}টি পেজ ডিলিট হবে।` : `${selected.size} pages will be deleted.`}
              </p>
            )}
          </>
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
            disabled={!canRun}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
          >
            {busy ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'ডিলিট হচ্ছে…' : 'Deleting…'}</>
            ) : (
              <><Trash2 className="mr-2 h-4 w-4" />{isBn ? 'পেজ ডিলিট করুন' : 'Delete Pages'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Extract Pages                                             */
/* -------------------------------------------------------------------------- */

function ExtractPagesTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [rangesStr, setRangesStr] = React.useState('1-1')
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const loadPageCount = async () => {
    if (files.length === 0) return
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setPageCount(doc.getPageCount())
    } catch {
      toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
    }
  }

  React.useEffect(() => {
    if (files.length > 0) loadPageCount()
    else setPageCount(0)
  }, [files])

  function parseRanges(input: string, max: number): number[] {
    const out: number[] = []
    for (const part of input.split(',')) {
      const trimmed = part.trim()
      if (!trimmed) continue
      if (trimmed.includes('-')) {
        const [a, b] = trimmed.split('-').map((s) => parseInt(s.trim(), 10))
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue
        const start = Math.max(1, Math.min(a, b))
        const end = Math.min(max, Math.max(a, b))
        for (let i = start; i <= end; i++) out.push(i - 1)
      } else {
        const n = parseInt(trimmed, 10)
        if (Number.isFinite(n) && n >= 1 && n <= max) out.push(n - 1)
      }
    }
    return [...new Set(out)]
  }

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    const indices = parseRanges(rangesStr, pageCount)
    if (indices.length === 0) {
      toast.error(
        isBn ? 'সঠিক পেজ রেঞ্জ লিখুন, যেমন: 1-3, 5, 7-9' : 'Enter valid ranges, e.g. 1-3, 5, 7-9',
      )
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const out = await PDFDocument.create()
      const copied = await out.copyPages(src, indices)
      copied.forEach((p) => out.addPage(p))
      const outBytes = await out.save()
      const ok = await downloadValidatedPdf(
        outBytes,
        files[0].name.replace(/\.pdf$/i, '') + '-extracted.pdf',
        indices.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn
          ? `${bn(indices.length, isBn)}টি পেজ এক্সট্র্যাক্ট হয়েছে।`
          : `Extracted ${indices.length} pages.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn ? 'এক্সট্র্যাক্ট ব্যর্থ।' : 'Extract failed.',
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
        {pageCount > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              {isBn ? `মোট ${bn(pageCount, isBn)}টি পেজ।` : `${pageCount} pages total.`}
            </p>
            <div className="space-y-1.5">
              <Label>{isBn ? 'পেজ রেঞ্জ' : 'Page Ranges'}</Label>
              <Input
                value={rangesStr}
                onChange={(e) => setRangesStr(e.target.value)}
                placeholder="1-3, 5, 7-9"
              />
              <p className="text-xs text-muted-foreground">
                {isBn ? 'যেমন: 1-3, 5, 7-9' : 'e.g. 1-3, 5, 7-9'}
              </p>
            </div>
          </>
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
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'এক্সট্র্যাক্ট হচ্ছে…' : 'Extracting…'}</>
            ) : (
              <><FilePlus2 className="mr-2 h-4 w-4" />{isBn ? 'পেজ এক্সট্র্যাক্ট করুন' : 'Extract Pages'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Reverse PDF                                               */
/* -------------------------------------------------------------------------- */

function ReverseTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pageCount = src.getPageCount()
      const out = await PDFDocument.create()
      // Reverse indices: last page first
      const reversedIndices: number[] = []
      for (let i = pageCount - 1; i >= 0; i--) reversedIndices.push(i)
      const copied = await out.copyPages(src, reversedIndices)
      copied.forEach((p) => out.addPage(p))
      setProgress(90)
      const outBytes = await out.save()
      const ok = await downloadValidatedPdf(
        outBytes,
        files[0].name.replace(/\.pdf$/i, '') + '-reversed.pdf',
        pageCount,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn ? `পেজ ক্রম উল্টে দেওয়া হয়েছে।` : `Page order reversed.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(
        isBn ? 'রিভার্স ব্যর্থ।' : 'Reverse failed.',
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
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'উল্টে হচ্ছে…' : 'Reversing…'}</>
            ) : (
              <><Rewind className="mr-2 h-4 w-4" />{isBn ? 'পেজ উল্টে দিন' : 'Reverse PDF'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Page Numbers                                              */
/* -------------------------------------------------------------------------- */

type PageNumPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

function PageNumbersTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [position, setPosition] = React.useState<PageNumPosition>('bottom-center')
  const [startNum, setStartNum] = React.useState(1)
  const [fontSize, setFontSize] = React.useState(12)
  const [prefix, setPrefix] = React.useState('')
  const [suffix, setSuffix] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const positions: { value: PageNumPosition; labelEn: string; labelBn: string }[] = [
    { value: 'top-left', labelEn: 'Top Left', labelBn: 'উপরে বামে' },
    { value: 'top-center', labelEn: 'Top Center', labelBn: 'উপরে মাঝে' },
    { value: 'top-right', labelEn: 'Top Right', labelBn: 'উপরে ডানে' },
    { value: 'bottom-left', labelEn: 'Bottom Left', labelBn: 'নিচে বামে' },
    { value: 'bottom-center', labelEn: 'Bottom Center', labelBn: 'নিচে মাঝে' },
    { value: 'bottom-right', labelEn: 'Bottom Right', labelBn: 'নিচে ডানে' },
  ]

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const font = await doc.embedFont(StandardFonts.Helvetica)
      const margin = 30
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const w = page.getWidth()
        const h = page.getHeight()
        const num = startNum + i
        const text = `${prefix}${num}${suffix}`
        const textWidth = font.widthOfTextAtSize(text, fontSize)
        let x: number, y: number
        if (position.startsWith('top')) {
          y = h - margin
        } else {
          y = margin
        }
        if (position.endsWith('left')) {
          x = margin
        } else if (position.endsWith('center')) {
          x = (w - textWidth) / 2
        } else {
          x = w - margin - textWidth
        }
        page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) })
        setProgress(5 + Math.round(((i + 1) / pages.length) * 90))
      }
      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-numbered.pdf',
        pages.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn ? `${bn(pages.length, isBn)}টি পেজে নম্বর যোগ হয়েছে।` : `Added page numbers to ${pages.length} pages.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'পেজ নম্বর যোগ ব্যর্থ।' : 'Page numbering failed.')
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
          <Label>{isBn ? 'পজিশন' : 'Position'}</Label>
          <Select value={position} onValueChange={(v) => setPosition(v as PageNumPosition)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {positions.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {isBn ? p.labelBn : p.labelEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'শুরু নম্বর' : 'Start Number'}</Label>
            <Input type="number" value={startNum} min={1} onChange={(e) => setStartNum(parseInt(e.target.value) || 1)} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'ফন্ট সাইজ' : 'Font Size'}</Label>
            <Input type="number" value={fontSize} min={6} max={72} onChange={(e) => setFontSize(parseInt(e.target.value) || 12)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'প্রিফিক্স (ঐচ্ছিক)' : 'Prefix (optional)'}</Label>
            <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="Page " />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'সাফিক্স (ঐচ্ছিক)' : 'Suffix (optional)'}</Label>
            <Input value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder=" of 10" />
          </div>
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
          <Button onClick={run} disabled={files.length === 0 || busy} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
            {busy ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'যোগ হচ্ছে…' : 'Adding…'}</>
            ) : (
              <><Hash className="mr-2 h-4 w-4" />{isBn ? 'পেজ নম্বর যোগ করুন' : 'Add Page Numbers'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Watermark (Text)                                          */
/* -------------------------------------------------------------------------- */

type WmPosition = 'center' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

function WatermarkTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [text, setText] = React.useState('CONFIDENTIAL')
  const [fontSize, setFontSize] = React.useState(50)
  const [opacity, setOpacity] = React.useState(0.2)
  const [rotation, setRotation] = React.useState(45)
  const [position, setPosition] = React.useState<WmPosition>('center')
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const positions: { value: WmPosition; labelEn: string; labelBn: string }[] = [
    { value: 'center', labelEn: 'Center', labelBn: 'মাঝখানে' },
    { value: 'top-left', labelEn: 'Top Left', labelBn: 'উপরে বামে' },
    { value: 'top-center', labelEn: 'Top Center', labelBn: 'উপরে মাঝে' },
    { value: 'top-right', labelEn: 'Top Right', labelBn: 'উপরে ডানে' },
    { value: 'bottom-left', labelEn: 'Bottom Left', labelBn: 'নিচে বামে' },
    { value: 'bottom-center', labelEn: 'Bottom Center', labelBn: 'নিচে মাঝে' },
    { value: 'bottom-right', labelEn: 'Bottom Right', labelBn: 'নিচে ডানে' },
  ]

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    if (!text.trim()) {
      toast.error(isBn ? 'ওয়াটারমার্ক টেক্সট দিন।' : 'Enter watermark text.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const font = await doc.embedFont(StandardFonts.HelveticaBold)
      const margin = 50
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const w = page.getWidth()
        const h = page.getHeight()
        const textWidth = font.widthOfTextAtSize(text, fontSize)
        let x: number, y: number
        if (position === 'center') {
          x = (w - textWidth * Math.cos((rotation * Math.PI) / 180)) / 2
          y = h / 2
        } else {
          if (position.startsWith('top')) y = h - margin
          else y = margin
          if (position.endsWith('left')) x = margin
          else if (position.endsWith('center')) x = (w - textWidth) / 2
          else x = w - margin - textWidth
        }
        page.drawText(text, {
          x, y, size: fontSize, font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotation),
        })
        setProgress(5 + Math.round(((i + 1) / pages.length) * 90))
      }
      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-watermarked.pdf',
        pages.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn ? `${bn(pages.length, isBn)}টি পেজে ওয়াটারমার্ক যোগ হয়েছে।` : `Watermarked ${pages.length} pages.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'ওয়াটারমার্ক ব্যর্থ।' : 'Watermark failed.')
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
          <Label>{isBn ? 'ওয়াটারমার্ক টেক্সট' : 'Watermark Text'}</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="CONFIDENTIAL" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'ফন্ট সাইজ' : 'Font Size'}</Label>
            <Input type="number" value={fontSize} min={8} max={200} onChange={(e) => setFontSize(parseInt(e.target.value) || 50)} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'অপাসিটি' : 'Opacity'} ({bn(Math.round(opacity * 100), isBn)}%)</Label>
            <input type="range" min={5} max={100} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(parseInt(e.target.value) / 100)} className="w-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'রোটেশন (ডিগ্রি)' : 'Rotation (degrees)'}</Label>
            <Input type="number" value={rotation} min={0} max={360} onChange={(e) => setRotation(parseInt(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'পজিশন' : 'Position'}</Label>
            <Select value={position} onValueChange={(v) => setPosition(v as WmPosition)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {positions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{isBn ? p.labelBn : p.labelEn}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          <Button onClick={run} disabled={files.length === 0 || busy || !text.trim()} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
            {busy ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'যোগ হচ্ছে…' : 'Watermarking…'}</>
            ) : (
              <><Droplets className="mr-2 h-4 w-4" />{isBn ? 'ওয়াটারমার্ক যোগ করুন' : 'Add Watermark'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Crop PDF (LIMITED — viewport crop only)                    */
/* -------------------------------------------------------------------------- */

function CropTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [origSize, setOrigSize] = React.useState<{ w: number; h: number } | null>(null)
  const [marginTop, setMarginTop] = React.useState(0)
  const [marginBottom, setMarginBottom] = React.useState(0)
  const [marginLeft, setMarginLeft] = React.useState(0)
  const [marginRight, setMarginRight] = React.useState(0)
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const loadInfo = async () => {
    if (files.length === 0) return
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setPageCount(doc.getPageCount())
      const first = doc.getPages()[0]
      setOrigSize({ w: first.getWidth(), h: first.getHeight() })
    } catch {
      toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
    }
  }

  React.useEffect(() => {
    if (files.length > 0) loadInfo()
    else { setPageCount(0); setOrigSize(null) }
  }, [files])

  const newW = origSize ? Math.max(1, origSize.w - marginLeft - marginRight) : 0
  const newH = origSize ? Math.max(1, origSize.h - marginTop - marginBottom) : 0
  const canRun = files.length > 0 && origSize !== null && newW > 10 && newH > 10 && !busy

  const run = async () => {
    if (!canRun) {
      toast.error(isBn ? 'ক্রপ এরিয়া খুব ছোট — মার্জিন কমান।' : 'Crop area too small — reduce margins.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const cropX = marginLeft
      const cropY = marginBottom
      const cropW = newW
      const cropH = newH
      for (let i = 0; i < pages.length; i++) {
        pages[i].setCropBox(cropX, cropY, cropW, cropH)
        setProgress(5 + Math.round(((i + 1) / pages.length) * 90))
      }
      const out = await doc.save()
      const ok = await downloadValidatedPdf(
        out,
        files[0].name.replace(/\.pdf$/i, '') + '-cropped.pdf',
        pages.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn ? `ক্রপ প্রয়োগ হয়েছে — ভিউয়েবল এরিয়া ${bn(Math.round(cropW), isBn)}×${bn(Math.round(cropH), isBn)}pt।` : `Crop applied — visible area ${Math.round(cropW)}×${Math.round(cropH)}pt.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'ক্রপ ব্যর্থ।' : 'Crop failed.')
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-xs dark:bg-amber-950/20">
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            ⚠️ {isBn ? 'সীমিত কার্যকারিতা' : 'Limited functionality'}
          </p>
          <p className="mt-1 text-amber-700/80 dark:text-amber-400/80">
            {isBn
              ? 'এই টুল পেজের ভিউয়েবল এরিয়া (crop box) পরিবর্তন করে — ভেতরের কনটেন্ট মুছে যায় না, শুধু দৃশ্যমান এলাকা সংকুচিত হয়।'
              : 'This tool adjusts the visible page area (crop box) — underlying content is not removed, only the visible region is narrowed.'}
          </p>
        </div>
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        {origSize && (
          <p className="text-xs text-muted-foreground">
            {isBn
              ? `পেজ সাইজ: ${bn(Math.round(origSize.w), isBn)}×${bn(Math.round(origSize.h), isBn)}pt · ${bn(pageCount, isBn)}টি পেজ`
              : `Page size: ${Math.round(origSize.w)}×${Math.round(origSize.h)}pt · ${pageCount} pages`}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{isBn ? 'উপরের মার্জিন (pt)' : 'Top Margin (pt)'}</Label>
            <Input type="number" value={marginTop} min={0} onChange={(e) => setMarginTop(Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'নিচের মার্জিন (pt)' : 'Bottom Margin (pt)'}</Label>
            <Input type="number" value={marginBottom} min={0} onChange={(e) => setMarginBottom(Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'বাম মার্জিন (pt)' : 'Left Margin (pt)'}</Label>
            <Input type="number" value={marginLeft} min={0} onChange={(e) => setMarginLeft(Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
          <div className="space-y-1.5">
            <Label>{isBn ? 'ডান মার্জিন (pt)' : 'Right Margin (pt)'}</Label>
            <Input type="number" value={marginRight} min={0} onChange={(e) => setMarginRight(Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
        </div>
        {origSize && (
          <p className="text-xs font-medium">
            {isBn ? `নতুন সাইজ: ${bn(Math.round(newW), isBn)}×${bn(Math.round(newH), isBn)}pt` : `New size: ${Math.round(newW)}×${Math.round(newH)}pt`}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          <Button onClick={run} disabled={!canRun} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
            {busy ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'ক্রপ হচ্ছে…' : 'Cropping…'}</>
            ) : (
              <><Crop className="mr-2 h-4 w-4" />{isBn ? 'ক্রপ প্রয়োগ করুন' : 'Apply Crop'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: Organize / Reorder Pages                                  */
/* -------------------------------------------------------------------------- */

function OrganizeTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [order, setOrder] = React.useState<number[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const loadInfo = async () => {
    if (files.length === 0) return
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const count = doc.getPageCount()
      setPageCount(count)
      setOrder(Array.from({ length: count }, (_, i) => i))
    } catch {
      toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
    }
  }

  React.useEffect(() => {
    if (files.length > 0) loadInfo()
    else { setPageCount(0); setOrder([]) }
  }, [files])

  const moveUp = (index: number) => {
    if (index === 0) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  const moveDown = (index: number) => {
    if (index === order.length - 1) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const run = async () => {
    if (files.length === 0 || order.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    try {
      const bytes = await files[0].arrayBuffer()
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const out = await PDFDocument.create()
      const copied = await out.copyPages(src, order)
      copied.forEach((p) => out.addPage(p))
      setProgress(90)
      const outBytes = await out.save()
      const ok = await downloadValidatedPdf(
        outBytes,
        files[0].name.replace(/\.pdf$/i, '') + '-reordered.pdf',
        order.length,
      )
      if (!ok) throw new Error('Validation failed')
      setProgress(100)
      toast.success(
        isBn ? `পেজ ক্রম পরিবর্তন সম্পন্ন।` : `Page order updated.`,
      )
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'রিঅর্ডার ব্যর্থ।' : 'Reorder failed.')
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        {order.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              {isBn ? `${bn(order.length, isBn)}টি পেজ — উপর/নিচ বোতাম দিয়ে সাজান।` : `${order.length} pages — reorder using up/down buttons.`}
            </p>
            <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1" role="list" aria-label={isBn ? 'পেজ তালিকা' : 'Page list'}>
              {order.map((origIdx, displayIdx) => (
                <div
                  key={`${origIdx}-${displayIdx}`}
                  role="listitem"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-500/15 text-xs font-bold text-amber-600">
                      {bn(displayIdx + 1, isBn)}
                    </span>
                    <span className="text-muted-foreground">
                      {isBn ? `পেজ ${bn(origIdx + 1, isBn)}` : `Page ${origIdx + 1}`}
                    </span>
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveUp(displayIdx)}
                      disabled={displayIdx === 0 || busy}
                      aria-label={isBn ? `${bn(displayIdx + 1, isBn)} নম্বর পেজ উপরে নামান` : `Move page ${displayIdx + 1} up`}
                      className="grid h-8 w-8 place-items-center rounded-md border border-border/60 hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(displayIdx)}
                      disabled={displayIdx === order.length - 1 || busy}
                      aria-label={isBn ? `${bn(displayIdx + 1, isBn)} নম্বর পেজ নিচে নামান` : `Move page ${displayIdx + 1} down`}
                      className="grid h-8 w-8 place-items-center rounded-md border border-border/60 hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
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
          <Button onClick={run} disabled={files.length === 0 || busy} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90">
            {busy ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'সাজানো হচ্ছে…' : 'Reordering…'}</>
            ) : (
              <><Layers className="mr-2 h-4 w-4" />{isBn ? 'নতুন ক্রমে সেভ করুন' : 'Save New Order'}</>
            )}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Functional tool: PDF Analyze (read-only)                                   */
/* -------------------------------------------------------------------------- */

function AnalyzeTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [info, setInfo] = React.useState<{
    fileName: string
    fileSize: string
    pageCount: number
    pageWidth: number
    pageHeight: number
    orientation: string
    title: string
    author: string
    subject: string
    keywords: string
    creator: string
    producer: string
    creationDate: string
    modDate: string
  } | null>(null)
  const [busy, setBusy] = React.useState(false)

  const analyze = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const firstPage = doc.getPages()[0]
      const w = firstPage.getWidth()
      const h = firstPage.getHeight()
      const creationDate = doc.getCreationDate()
      const modDate = doc.getModificationDate()
      setInfo({
        fileName: files[0].name,
        fileSize: humanSize(files[0].size),
        pageCount: doc.getPageCount(),
        pageWidth: Math.round(w),
        pageHeight: Math.round(h),
        orientation: w > h ? (isBn ? 'ল্যান্ডস্কেপ' : 'Landscape') : (isBn ? 'পোর্ট্রেট' : 'Portrait'),
        title: doc.getTitle() ?? '—',
        author: doc.getAuthor() ?? '—',
        subject: doc.getSubject() ?? '—',
        keywords: doc.getKeywords() ?? '—',
        creator: doc.getCreator() ?? '—',
        producer: doc.getProducer() ?? '—',
        creationDate: creationDate ? creationDate.toLocaleString() : '—',
        modDate: modDate ? modDate.toLocaleString() : '—',
      })
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'অ্যানালাইজ ব্যর্থ।' : 'Analysis failed.')
    } finally {
      setBusy(false)
    }
  }

  const fields = info ? [
    { labelEn: 'File Name', labelBn: 'ফাইল নাম', value: info.fileName },
    { labelEn: 'File Size', labelBn: 'ফাইল সাইজ', value: info.fileSize },
    { labelEn: 'Page Count', labelBn: 'পেজ সংখ্যা', value: bn(info.pageCount, isBn) },
    { labelEn: 'Page Size', labelBn: 'পেজ সাইজ', value: `${bn(info.pageWidth, isBn)} × ${bn(info.pageHeight, isBn)} pt` },
    { labelEn: 'Orientation', labelBn: 'ওরিয়েন্টেশন', value: info.orientation },
    { labelEn: 'Title', labelBn: 'টাইটেল', value: info.title },
    { labelEn: 'Author', labelBn: 'লেখক', value: info.author },
    { labelEn: 'Subject', labelBn: 'বিষয়', value: info.subject },
    { labelEn: 'Keywords', labelBn: 'কিওয়ার্ড', value: info.keywords },
    { labelEn: 'Creator', labelBn: 'তৈরিকারী', value: info.creator },
    { labelEn: 'Producer', labelBn: 'প্রযোজক', value: info.producer },
    { labelEn: 'Created', labelBn: 'তৈরির তারিখ', value: info.creationDate },
    { labelEn: 'Modified', labelBn: 'পরিবর্তনের তারিখ', value: info.modDate },
  ] : []

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        <Button onClick={analyze} disabled={files.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'বিশ্লেষণ হচ্ছে…' : 'Analyzing…'}</>
          ) : (
            <><Info className="mr-2 h-4 w-4" />{isBn ? 'পিডিএফ বিশ্লেষণ করুন' : 'Analyze PDF'}</>
          )}
        </Button>
        {info && (
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isBn ? 'ডকুমেন্ট তথ্য' : 'Document Information'}
            </p>
            <dl className="space-y-2">
              {fields.map((f, i) => (
                <div key={i} className="flex justify-between gap-3 text-xs">
                  <dt className="shrink-0 text-muted-foreground">{isBn ? f.labelBn : f.labelEn}</dt>
                  <dd className="truncate text-right font-medium" title={f.value}>{f.value}</dd>
                </div>
              ))}
            </dl>
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

/* -------------------------------------------------------------------------- */
/*  Functional tool: PDF Inspect (deeper read-only)                            */
/* -------------------------------------------------------------------------- */

function InspectTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [report, setReport] = React.useState<{
    fileName: string
    fileSize: string
    pageCount: number
    pages: { width: number; height: number; rotation: number; orientation: string }[]
    title: string
    author: string
    subject: string
    keywords: string
    creator: string
    producer: string
    creationDate: string
    modDate: string
  } | null>(null)
  const [busy, setBusy] = React.useState(false)

  const inspect = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pages = doc.getPages()
      const creationDate = doc.getCreationDate()
      const modDate = doc.getModificationDate()
      setReport({
        fileName: files[0].name,
        fileSize: humanSize(files[0].size),
        pageCount: doc.getPageCount(),
        pages: pages.map((p) => ({
          width: Math.round(p.getWidth()),
          height: Math.round(p.getHeight()),
          rotation: p.getRotation().angle,
          orientation: p.getWidth() > p.getHeight() ? (isBn ? 'ল্যান্ডস্কেপ' : 'Landscape') : (isBn ? 'পোর্ট্রেট' : 'Portrait'),
        })),
        title: doc.getTitle() ?? '—',
        author: doc.getAuthor() ?? '—',
        subject: doc.getSubject() ?? '—',
        keywords: doc.getKeywords() ?? '—',
        creator: doc.getCreator() ?? '—',
        producer: doc.getProducer() ?? '—',
        creationDate: creationDate ? creationDate.toLocaleString() : '—',
        modDate: modDate ? modDate.toLocaleString() : '—',
      })
    } catch (err) {
      console.error(err)
      toast.error(isBn ? 'ইন্সপেকশন ব্যর্থ।' : 'Inspection failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />
        <Button onClick={inspect} disabled={files.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isBn ? 'ইন্সপেক্ট হচ্ছে…' : 'Inspecting…'}</>
          ) : (
            <><Microscope className="mr-2 h-4 w-4" />{isBn ? 'পিডিএফ ইন্সপেক্ট করুন' : 'Inspect PDF'}</>
          )}
        </Button>
        {report && (
          <div className="space-y-3">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'ফাইল তথ্য' : 'File Information'}
              </p>
              <dl className="space-y-1.5 text-xs">
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'নাম' : 'Name'}</dt><dd className="font-medium">{report.fileName}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'সাইজ' : 'Size'}</dt><dd className="font-medium">{report.fileSize}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'পেজ' : 'Pages'}</dt><dd className="font-medium">{bn(report.pageCount, isBn)}</dd></div>
              </dl>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'মেটাডাটা' : 'Metadata'}
              </p>
              <dl className="space-y-1.5 text-xs">
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'টাইটেল' : 'Title'}</dt><dd className="font-medium">{report.title}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'লেখক' : 'Author'}</dt><dd className="font-medium">{report.author}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'বিষয়' : 'Subject'}</dt><dd className="font-medium">{report.subject}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'কিওয়ার্ড' : 'Keywords'}</dt><dd className="font-medium">{report.keywords}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'তৈরিকারী' : 'Creator'}</dt><dd className="font-medium">{report.creator}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'প্রযোজক' : 'Producer'}</dt><dd className="font-medium">{report.producer}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'তৈরি' : 'Created'}</dt><dd className="font-medium">{report.creationDate}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{isBn ? 'পরিবর্তিত' : 'Modified'}</dt><dd className="font-medium">{report.modDate}</dd></div>
              </dl>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'পেজ-লেভেল তথ্য' : 'Page-Level Details'}
              </p>
              <div className="max-h-40 space-y-1 overflow-y-auto text-xs">
                {report.pages.map((p, i) => (
                  <div key={i} className="flex justify-between border-b border-border/30 py-1 last:border-0">
                    <span className="text-muted-foreground">{isBn ? `পেজ ${bn(i + 1, isBn)}` : `Page ${i + 1}`}</span>
                    <span className="font-medium">{bn(p.width, isBn)}×{bn(p.height, isBn)}pt · {bn(p.rotation, isBn)}° · {p.orientation}</span>
                  </div>
                ))}
              </div>
            </div>
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
/* -------------------------------------------------------------------------- */

function CommandPalette({
  open,
  onOpenChange,
  isBn,
  onSelect,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  isBn: boolean
  onSelect: (tool: PdfTool) => void
}) {
  const [query, setQuery] = React.useState('')

  // Reset query whenever the palette is opened
  React.useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const filtered = React.useMemo(() => {
    if (!query.trim()) return PDF_TOOLS
    const q = query.toLowerCase()
    return PDF_TOOLS.filter(
      (t) =>
        t.nameEn.toLowerCase().includes(q) ||
        t.nameBn.toLowerCase().includes(q) ||
        t.descEn.toLowerCase().includes(q) ||
        t.descBn.toLowerCase().includes(q),
    )
  }, [query])

  // Group by category for nicer display
  const grouped = React.useMemo(() => {
    const map: Record<PdfToolCategory, PdfTool[]> = {
      popular: [],
      convert: [],
      optimize: [],
      edit: [],
      security: [],
    }
    for (const t of filtered) map[t.category].push(t)
    return map
  }, [filtered])

  const handleSelect = (tool: PdfTool) => {
    onOpenChange(false)
    // Defer to allow dialog to close before opening the tool dialog
    setTimeout(() => onSelect(tool), 10)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isBn ? 'কমান্ড প্যালেট' : 'Command Palette'}
      description={isBn ? 'যেকোনো পিডিএফ টুল সার্চ করুন' : 'Search any PDF tool'}
      className="sm:max-w-lg"
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={isBn ? 'টুল সার্চ করুন… (যেমন: merge, compress)' : 'Search tools… (e.g. merge, compress)'}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {filtered.length === 0 && (
            <CommandEmpty>
              {isBn ? 'কোনো টুল পাওয়া যায়নি।' : 'No tools found.'}
            </CommandEmpty>
          )}
          {(Object.keys(grouped) as PdfToolCategory[]).map((cat) => {
            const tools = grouped[cat]
            if (tools.length === 0) return null
            const label = isBn ? CATEGORY_LABELS[cat].bn : CATEGORY_LABELS[cat].en
            return (
              <CommandGroup key={cat} heading={label}>
                {tools.map((tool) => (
                  <CommandItem
                    key={tool.id}
                    value={tool.id}
                    onSelect={() => handleSelect(tool)}
                    className="flex items-center gap-3"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-500/15 text-base">
                      {tool.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">
                        {isBn ? tool.nameBn : tool.nameEn}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {isBn ? tool.descBn : tool.descEn}
                      </span>
                    </span>
                    {tool.functional ? (
                      <Badge className="ml-auto border-emerald-500/30 bg-emerald-500/15 text-[10px] text-emerald-500">
                        {isBn ? 'লাইভ' : 'Live'}
                      </Badge>
                    ) : tool.isNew ? (
                      <Badge className="ml-auto bg-amber-500/20 text-[10px] text-amber-500">
                        {isBn ? 'নতুন' : 'New'}
                      </Badge>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero drag & drop zone (functional)                                         */
/* -------------------------------------------------------------------------- */

function HeroDropZone({
  isBn,
  onFile,
  onBrowse,
}: {
  isBn: boolean
  onFile: (file: File) => void
  onBrowse: () => void
}) {
  const [drag, setDrag] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return
    const file = Array.from(list).find((f) => isPdf(f))
    if (!file) {
      toast.error(isBn ? 'শুধু PDF ফাইল গ্রহণযোগ্য।' : 'Only PDF files are accepted.')
      return
    }
    onFile(file)
  }

  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div
        role="button"
        tabIndex={0}
        aria-label={isBn ? 'পিডিএফ ফাইল টেনে আনুন বা ক্লিক করুন' : 'Drop your PDF here or click to browse'}
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
        className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed p-6 text-center shadow-xl backdrop-blur transition-colors sm:p-10 ${
          drag
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-amber-500/40 bg-background/60 hover:border-amber-500/70 hover:bg-amber-500/5'
        }`}
      >
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25">
          <FileText className="h-8 w-8" />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold">
          {isBn ? 'পিডিএফ টানুন এবং ছাড়ুন' : 'Drop your PDF here or click to browse'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isBn
            ? 'ফাইল ছাড়লেই অটো মার্জ টুল খুলবে · শুধু PDF'
            : 'Auto-opens the Merge tool · PDF only'}
        </p>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onBrowse()
          }}
          className="mt-5 rounded-full bg-amber-500 text-white hover:bg-amber-600"
        >
          {isBn ? 'টুল দেখুন' : 'Browse Tools'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Activity Tracking section                                                  */
/* -------------------------------------------------------------------------- */

function ActivitySection({ isBn }: { isBn: boolean }) {
  const [entries, setEntries] = React.useState<ActivityEntry[]>([])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setEntries(loadActivity())

    const onStorage = (e: StorageEvent) => {
      if (e.key === ACTIVITY_KEY) setEntries(loadActivity())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Poll for changes (cross-component updates within same tab)
  React.useEffect(() => {
    if (!mounted) return
    const id = window.setInterval(() => {
      setEntries(loadActivity())
    }, 1500)
    return () => window.clearInterval(id)
  }, [mounted])

  const stats = React.useMemo(() => computeStats(entries), [entries])

  const clearActivity = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ACTIVITY_KEY)
      setEntries([])
      toast.success(isBn ? 'অ্যাক্টিভিটি মুছে ফেলা হয়েছে।' : 'Activity cleared.')
    }
  }

  const cards: {
    labelEn: string
    labelBn: string
    value: string
    icon: typeof Activity
    subEn?: string
    subBn?: string
  }[] = [
    {
      labelEn: 'Total Operations',
      labelBn: 'মোট অপারেশন',
      value: bn(stats.total, isBn),
      icon: Activity,
    },
    {
      labelEn: 'Most Used Tool',
      labelBn: 'সবচেয়ে ব্যবহৃত টুল',
      value: stats.mostUsed
        ? isBn
          ? stats.mostUsed.toolNameBn
          : stats.mostUsed.toolNameEn
        : isBn
          ? '—'
          : '—',
      icon: TrendingUp,
      subEn: stats.mostUsed ? `${stats.mostUsed.icon} ${stats.mostUsed.toolNameEn}` : undefined,
      subBn: stats.mostUsed ? `${stats.mostUsed.icon} ${stats.mostUsed.toolNameBn}` : undefined,
    },
    {
      labelEn: 'Tools Used',
      labelBn: 'ব্যবহৃত টুল',
      value: bn(stats.uniqueTools, isBn),
      icon: BarChart3,
    },
    {
      labelEn: 'Last Used',
      labelBn: 'সর্বশেষ ব্যবহার',
      value: stats.lastUsed
        ? isBn
          ? stats.lastUsed.toolNameBn
          : stats.lastUsed.toolNameEn
        : isBn
          ? '—'
          : '—',
      icon: Clock,
      subEn: stats.lastUsed ? `${stats.lastUsed.icon} ${stats.lastUsed.toolNameEn}` : undefined,
      subBn: stats.lastUsed ? `${stats.lastUsed.icon} ${stats.lastUsed.toolNameBn}` : undefined,
    },
  ]

  // Category distribution bars (skip empty)
  const catRows = (Object.keys(stats.byCategory) as PdfToolCategory[])
    .map((c) => ({
      cat: c,
      n: stats.byCategory[c] ?? 0,
      label: isBn ? CATEGORY_LABELS[c].bn : CATEGORY_LABELS[c].en,
    }))
    .filter((r) => r.n > 0)

  const maxCat = Math.max(1, ...catRows.map((r) => r.n))

  return (
    <section className="bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <LandingEyebrow>
            <Activity className="h-3.5 w-3.5" />
            {isBn ? 'অ্যাক্টিভিটি' : 'Activity'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            {isBn ? 'আপনার ব্যবহারের পরিসংখ্যান' : 'Your Usage at a Glance'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isBn
              ? 'লোকালি ট্র্যাক করা — আপনার ডিভাইসেই সংরক্ষিত।'
              : 'Tracked locally — stored only on your device.'}
          </p>
        </div>

        {!mounted ? (
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted/60" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-amber-500/15 text-amber-500">
              <Activity className="h-7 w-7" />
            </div>
            <p className="font-heading text-lg font-semibold">
              {isBn ? 'এখনও কোনো অ্যাক্টিভিটি নেই' : 'No activity yet'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isBn
                ? 'টুল ব্যবহার করা শুরু করুন — পরিসংখ্যান এখানে দেখা যাবে।'
                : 'Start using tools — your stats will appear here.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c) => (
                <Card key={c.labelEn} className="border-border/60 bg-card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/15 text-amber-500">
                      <c.icon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {isBn ? c.labelBn : c.labelEn}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold leading-tight">
                    {c.value}
                  </p>
                  {c.subEn && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isBn ? c.subBn : c.subEn}
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {/* Category distribution */}
            {catRows.length > 0 && (
              <Card className="mt-6 border-border/60 bg-card p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-heading text-base font-semibold">
                    {isBn ? 'ক্যাটেগরি বিতরণ' : 'Category Distribution'}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {isBn ? `আজ ${bn(stats.todayCount, isBn)}টি অপারেশন` : `${stats.todayCount} today`}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {catRows.map((r) => (
                    <div key={r.cat} className="flex items-center gap-3">
                      <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">
                        {r.label}
                      </span>
                      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                          style={{ width: `${(r.n / maxCat) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-xs font-semibold">
                        {bn(r.n, isBn)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" onClick={clearActivity}>
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                {isBn ? 'অ্যাক্টিভিটি মুছুন' : 'Clear Activity'}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Workflow Pipeline section                                                  */
/* -------------------------------------------------------------------------- */

function WorkflowSection({ isBn }: { isBn: boolean }) {
  const runTemplate = (tpl: WorkflowTemplate) => {
    const names = tpl.steps
      .map((s) => (isBn ? s.labelBn : s.labelEn))
      .join(' → ')
    toast.info(
      isBn
        ? `ওয়ার্কফ্লো: ${names} — শীঘ্রই এক ক্লিকে চালু হবে!`
        : `Workflow: ${names} — one-click run coming soon!`,
    )
  }

  const customWorkflow = () => {
    toast.info(
      isBn
        ? 'কাস্টম ওয়ার্কফ্লো বিল্ডার শীঘ্রই আসছে!'
        : 'Custom workflow builder coming soon!',
    )
  }

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <LandingEyebrow>
            <Workflow className="h-3.5 w-3.5" />
            {isBn ? 'পিডিএফ ওয়ার্কফ্লো' : 'PDF Workflows'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            {isBn ? (
              <>
                একাধিক অপারেশন এক{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  পাইপলাইনে
                </span>
              </>
            ) : (
              <>
                Chain Multiple Operations into a{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Single Pipeline
                </span>
              </>
            )}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isBn
              ? 'কম্প্রেস, ওয়াটারমার্ক, রোটেট, পেজ নম্বর ও ফ্ল্যাটেন — একবারেই।'
              : 'Compress, watermark, rotate, number and flatten — all in one pass.'}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {WORKFLOW_TEMPLATES.map((tpl) => {
            const title = isBn ? tpl.titleBn : tpl.titleEn
            const desc = isBn ? tpl.descBn : tpl.descEn
            return (
              <Card
                key={tpl.id}
                className="flex flex-col border-border/60 bg-card p-5 transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-500">
                    <tpl.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold leading-tight">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>

                {/* Steps visual flow */}
                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                  {tpl.steps.map((s, i) => (
                    <React.Fragment key={s.id}>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium">
                        <span className="text-sm">{s.icon}</span>
                        {isBn ? s.labelBn : s.labelEn}
                      </span>
                      {i < tpl.steps.length - 1 && (
                        <ArrowRight className="h-3 w-3 shrink-0 text-amber-500" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto w-fit"
                  onClick={() => runTemplate(tpl)}
                >
                  {isBn ? 'টেমপ্লেট ব্যবহার করুন' : 'Use template'}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-amber-500/40 px-6 hover:bg-amber-500/5"
            onClick={customWorkflow}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isBn ? 'কাস্টম ওয়ার্কফ্লো তৈরি করুন' : 'Create Custom Workflow'}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Tool Capabilities table                                                    */
/* -------------------------------------------------------------------------- */

function CapabilitiesSection({ isBn }: { isBn: boolean }) {
  const headers: { en: string; bn: string; key: keyof CapRow }[] = [
    { en: 'Multi-File', bn: 'মাল্টি-ফাইল', key: 'multi' },
    { en: 'Page Select', bn: 'পেজ নির্বাচন', key: 'pageSelect' },
    { en: 'Password', bn: 'পাসওয়ার্ড', key: 'password' },
    { en: 'Preview', bn: 'প্রিভিউ', key: 'preview' },
    { en: 'Batch', bn: 'ব্যাচ', key: 'batch' },
  ]

  return (
    <section className="bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <LandingEyebrow>
            <BarChart3 className="h-3.5 w-3.5" />
            {isBn ? 'টুল ক্যাপাবিলিটি' : 'Tool Capabilities'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            {isBn ? 'প্রতিটি টুল যা যা সাপোর্ট করে' : 'What Each Tool Supports'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isBn
              ? 'ফিচার ম্যাট্রিক্স — দ্রুত দেখে নিন কোন টুলে কী আছে।'
              : 'Feature matrix — quickly see what each tool supports.'}
          </p>
        </div>

        <Card className="mt-10 overflow-hidden border-border/60 p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/50">
                  <th className="px-4 py-3 font-semibold">
                    {isBn ? 'টুল' : 'Tool'}
                  </th>
                  {headers.map((h) => (
                    <th
                      key={h.key}
                      className="px-3 py-3 text-center font-medium text-muted-foreground"
                    >
                      {isBn ? h.bn : h.en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((row) => (
                  <tr
                    key={row.toolEn}
                    className="border-b border-border/40 last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className="text-base">{row.icon}</span>
                        <span className="font-medium">
                          {isBn ? row.toolBn : row.toolEn}
                        </span>
                      </span>
                    </td>
                    {headers.map((h) => {
                      const v = row[h.key]
                      return (
                        <td key={h.key} className="px-3 py-3 text-center">
                          {v ? (
                            <Check className="mx-auto h-4 w-4 text-emerald-500" />
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {isBn
            ? '✅ = সাপোর্টেড · — = প্রযোজ্য নয়'
            : '✅ = Supported · — = Not applicable'}
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Pro Tips section                                                           */
/* -------------------------------------------------------------------------- */

function ProTipsSection({ isBn }: { isBn: boolean }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <LandingEyebrow>
            <Lightbulb className="h-3.5 w-3.5" />
            {isBn ? 'প্রো টিপস' : 'Pro Tips'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            {isBn ? 'আরও ভালোভাবে ব্যবহার করুন' : 'Get the Most Out of PDF Forge'}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRO_TIPS.map((tip, i) => (
            <Card
              key={i}
              className="relative flex flex-col border-border/60 bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-500">
                  <Lightbulb className="h-3 w-3" />
                  {isBn ? 'প্রো টিপ' : 'Pro Tip'}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {bn(i + 1, isBn)}/{bn(PRO_TIPS.length, isBn)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {isBn ? tip.bn : tip.en}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Offline Ready section                                                      */
/* -------------------------------------------------------------------------- */

function OfflineReadySection({ isBn, onInstall, canInstall }: {
  isBn: boolean
  onInstall: () => void
  canInstall: boolean
}) {
  const features: { en: string; bn: string }[] = [
    { en: `${AVAILABLE_NOW_COUNT} tools functional now`, bn: `${bn(AVAILABLE_NOW_COUNT, isBn)}টি টুল এখন ফাংশনাল` },
    { en: 'No data uploaded to any server', bn: 'কোনো সার্ভারে ডাটা আপলোড হয় না' },
    { en: 'Installable as PWA on any device', bn: 'যেকোনো ডিভাইসে PWA ইনস্টলযোগ্য' },
    { en: `${ROADMAP_COUNT} tools on the roadmap`, bn: `${bn(ROADMAP_COUNT, isBn)}টি টুল রোডম্যাপে আছে` },
  ]

  const platforms: { icon: typeof Monitor; en: string; bn: string }[] = [
    { icon: Monitor, en: 'Windows 7/8/10/11', bn: 'উইন্ডোজ ৭/৮/১০/১১' },
    { icon: Apple, en: 'macOS 10.15+', bn: 'macOS ১০.১৫+' },
    { icon: Terminal, en: 'Linux', bn: 'লিনাক্স' },
    { icon: Smartphone, en: 'iOS & Android', bn: 'iOS ও অ্যান্ড্রয়েড' },
  ]

  return (
    <section className="bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <LandingEyebrow>
              <WifiOff className="h-3.5 w-3.5" />
              {isBn ? 'অফলাইন রেডি' : 'Offline Ready'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'ইন্টারনেট ছাড়াই ব্যবহার করুন' : 'Use Without Internet'}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {isBn
                ? `${bn(AVAILABLE_NOW_COUNT, isBn)}টি ফাংশনাল টুল সম্পূর্ণ আপনার ব্রাউজারেই পিডিএফ প্রসেস করে। অ্যাপটি PWA হিসেবে ইনস্টলযোগ্য।`
                : `${AVAILABLE_NOW_COUNT} functional tools process PDFs entirely in your browser. The app is installable as a PWA for quick access.`}
            </p>

            <ul className="mt-6 space-y-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/90">
                    {isBn ? f.bn : f.en}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button
                size="lg"
                onClick={onInstall}
                disabled={!canInstall}
                className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 text-white shadow-lg shadow-amber-500/25 hover:opacity-90"
              >
                <MonitorDown className="mr-2 h-4 w-4" />
                {isBn ? 'এখনই ইনস্টল করুন' : 'Install Now'}
              </Button>
              {!canInstall && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {isBn
                    ? 'আপনার ব্রাউজার PWA ইনস্টল সাপোর্ট করছে না বা ইতিমধ্যে ইনস্টলড।'
                    : 'Your browser does not support PWA install, or it is already installed.'}
                </p>
              )}
            </div>
          </div>

          <Card className="border-border/60 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {isBn ? 'সাপোর্টেড প্ল্যাটফর্ম' : 'Supported Platforms'}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {platforms.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-amber-500">
                    <p.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {isBn ? p.bn : p.en}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 p-4">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold">
                  {isBn ? 'সম্পূর্ণ লোকাল স্টোরেজ' : '100% Local Storage'}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {isBn
                  ? 'আপনার ফাইল কখনো আপনার ডিভাইস ছাড়ে না। সব প্রসেসিং ব্রাউজারেই।'
                  : 'Your files never leave your device. All processing happens in the browser.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Tool Card                                                                  */
/* -------------------------------------------------------------------------- */

function ToolCard({ tool, isBn, onOpen, isFavorite, onToggleFavorite }: {
  tool: PdfTool
  isBn: boolean
  onOpen: (tool: PdfTool) => void
  isFavorite: boolean
  onToggleFavorite: (tool: PdfTool) => void
}) {
  return (
    <div
      className="group relative flex h-full flex-col rounded-xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-md"
    >
      {tool.isNew && (
        <span className="absolute -top-2 -right-2 z-10 inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
          <Sparkles className="h-2.5 w-2.5" />
          {isBn ? 'নতুন' : 'New'}
        </span>
      )}
      {/* Favorite star toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(tool)
        }}
        aria-label={isBn ? `পছন্দে ${isFavorite ? 'সরান' : 'যোগ করুন'}` : `${isFavorite ? 'Remove from' : 'Add to'} favorites`}
        className={`absolute top-3 right-3 z-10 grid h-7 w-7 place-items-center rounded-full border transition-colors ${isFavorite ? 'border-amber-500/40 bg-amber-500/15 text-amber-500' : 'border-border/60 bg-background/80 text-muted-foreground hover:text-amber-500'}`}
      >
        <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
      <button
        type="button"
        onClick={() => onOpen(tool)}
        aria-label={isBn ? tool.nameBn : tool.nameEn}
        className="flex h-full flex-col text-left"
      >
        <div className="mb-3 flex items-start">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-500/15 text-2xl">
            {tool.icon}
          </span>
        </div>
        <div className="mb-1.5 flex items-center gap-1.5">
          {tool.functional && tool.status === 'LIMITED' ? (
            <Badge className="border-amber-500/30 bg-amber-500/15 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400">
              <Check className="mr-1 h-3 w-3" />
              {isBn ? 'সীমিত' : 'Limited'}
            </Badge>
          ) : tool.functional ? (
            <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20">
              <Check className="mr-1 h-3 w-3" />
              {isBn ? 'এখনই ব্যবহারযোগ্য' : 'Available Now'}
            </Badge>
          ) : (
            <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400">
              {isBn ? 'রোডম্যাপ' : 'Roadmap'}
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
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main client                                                                */
/* -------------------------------------------------------------------------- */

export function PdfClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('pdf_editor_page')

  const [activeCat, setActiveCat] = React.useState<PdfToolCategory | 'all' | 'favorites'>('all')
  const [query, setQuery] = React.useState('')
  const [activeTool, setActiveTool] = React.useState<PdfTool | null>(null)
  // Favorites — stored in localStorage
  const [favorites, setFavorites] = React.useState<string[]>([])
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('pdf-editor-favorites')
      if (raw) setFavorites(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])
  const toggleFavorite = React.useCallback((tool: PdfTool) => {
    setFavorites((prev) => {
      const next = prev.includes(tool.id)
        ? prev.filter((id) => id !== tool.id)
        : [...prev, tool.id]
      try {
        localStorage.setItem('pdf-editor-favorites', JSON.stringify(next))
      } catch {
        /* ignore */
      }
      toast.success(
        next.includes(tool.id)
          ? isBn
            ? `⭐ "${tool.nameBn}" পছন্দে যোগ হয়েছে`
            : `⭐ "${tool.nameEn}" added to favorites`
          : isBn
            ? `"${tool.nameBn}" পছন্দ থেকে সরানো হয়েছে`
            : `"${tool.nameEn}" removed from favorites`
      )
      return next
    })
  }, [isBn])
  // Command palette (⌘+K / Ctrl+K)
  const [paletteOpen, setPaletteOpen] = React.useState(false)
  // Pre-loaded files for MergeTool (from hero drag&drop)
  const [mergeInitialFiles, setMergeInitialFiles] = React.useState<File[]>([])
  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = React.useState<
    Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }
  | null>(null)
  const [canInstall, setCanInstall] = React.useState(false)
  // Mount guard — prevents Radix Accordion useId hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  /* ----------------------- Keyboard shortcut (⌘+K / Ctrl+K) -------------- */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      } else if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen])

  /* ----------------------- PWA install prompt listener ------------------ */
  React.useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(
        e as Event & {
          prompt: () => Promise<void>
          userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
        },
      )
      setCanInstall(true)
    }
    const onInstalled = () => {
      setCanInstall(false)
      setDeferredPrompt(null)
      toast.success(
        isBn
          ? 'পিডিএফ ফোর্জ ইনস্টল হয়েছে — এখন অফলাইনেও চলবে!'
          : 'PDF Forge installed — now works offline!',
      )
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall as EventListener)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall as EventListener)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [isBn])

  const triggerInstall = async () => {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        toast.success(
          isBn
            ? 'ইনস্টলেশন শুরু হয়েছে — ধন্যবাদ!'
            : 'Installation started — thank you!',
        )
      } else {
        toast.info(isBn ? 'ইনস্টল বাতিল হয়েছে।' : 'Install dismissed.')
      }
    } catch {
      toast.error(isBn ? 'ইনস্টল করতে সমস্যা হয়েছে।' : 'Could not trigger install.')
    } finally {
      setDeferredPrompt(null)
      setCanInstall(false)
    }
  }

  /* ----------------------- Log activity to localStorage ----------------- */
  const logActivity = (tool: PdfTool) => {
    if (typeof window === 'undefined') return
    try {
      const entry: ActivityEntry = {
        toolId: tool.id,
        toolNameEn: tool.nameEn,
        toolNameBn: tool.nameBn,
        icon: tool.icon,
        category: tool.category,
        ts: Date.now(),
      }
      const next = [entry, ...loadActivity()]
      saveActivity(next)
    } catch {
      /* ignore */
    }
  }

  const filtered = React.useMemo(() => {
    return PDF_TOOLS.filter((t) => {
      if (activeCat === 'favorites') {
        if (!favorites.includes(t.id)) return false
      } else if (activeCat !== 'all' && t.category !== activeCat) {
        return false
      }
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
  }, [activeCat, query, favorites])

  const categories: (PdfToolCategory | 'all' | 'favorites')[] = [
    'all',
    'favorites',
    'popular',
    'convert',
    'optimize',
    'edit',
    'security',
  ]

  const openTool = (tool: PdfTool) => {
    if (tool.functional) {
      setActiveTool(tool)
      logActivity(tool)
    } else {
      toast.info(
        isBn
          ? `“${tool.nameBn}” এখনো রোডম্যাপে আছে — শীঘ্রই আসতে পারে।`
          : `“${tool.nameEn}” is on the roadmap — not yet available.`,
      )
    }
  }

  const closeTool = () => setActiveTool(null)

  /* Drop a PDF on the hero zone → open Merge tool pre-loaded with the file */
  const handleDroppedFile = (file: File) => {
    const mergeTool = PDF_TOOLS.find((t) => t.id === 'merge')
    if (!mergeTool) return
    setMergeInitialFiles([file])
    setActiveTool(mergeTool)
    logActivity(mergeTool)
    toast.success(
      isBn
        ? `“${file.name}” মার্জ টুলে লোড হয়েছে — আরও ফাইল যোগ করুন।`
        : `“${file.name}” loaded into Merge — add more files to combine.`,
    )
  }

  const scrollToTools = () => {
    const el = document.getElementById('tools')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />

      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        {isBn ? 'মূল কনটেন্টে যান' : 'Skip to main content'}
      </a>

      <main id="main-content" className="flex-1">
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
                {canInstall && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={triggerInstall}
                    className="h-12 w-full rounded-full border-amber-500/50 px-7 text-[15px] font-semibold text-amber-500 hover:bg-amber-500/5 sm:w-auto"
                  >
                    <MonitorDown className="mr-2 h-4 w-4" />
                    {isBn ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
                  </Button>
                )}
              </div>

              {/* Command palette hint */}
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-amber-500/40 hover:text-foreground"
                  aria-label={isBn ? 'কমান্ড প্যালেট খুলুন' : 'Open command palette'}
                >
                  <CommandIcon className="h-3.5 w-3.5" />
                  {isBn
                    ? 'Ctrl+K (বা ⌘+K) চাপুন — টুল সার্চ করতে'
                    : 'Press Ctrl+K (or ⌘+K) to search tools'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
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

            {/* Functional drag-drop zone — opens Merge tool with pre-loaded file */}
            <HeroDropZone
              isBn={isBn}
              onFile={handleDroppedFile}
              onBrowse={scrollToTools}
            />
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
                  : 'Browse by category or search by name. Available Now tools are fully functional.'}
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
                    : c === 'favorites'
                      ? isBn ? `⭐ পছন্দ (${bn(favorites.length, isBn)})` : `⭐ Favorites (${favorites.length})`
                      : isBn
                        ? CATEGORY_LABELS[c as PdfToolCategory].bn
                        : CATEGORY_LABELS[c as PdfToolCategory].en
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
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ====================================================== */}
        {/* Key Statistics                                         */}
        {/* ====================================================== */}
        <section className="border-y border-border/60 bg-muted/30 py-8" aria-label="Key statistics">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: '43', labelEn: 'PDF Tools', labelBn: 'পিডিএফ টুল', icon: FileText },
                { value: '0', labelEn: 'Upload Time', labelBn: 'আপলোড সময়', icon: Zap },
                { value: '100%', labelEn: 'Private', labelBn: 'প্রাইভেট', icon: ShieldCheck },
                { value: 'Free', labelEn: 'Always Free', labelBn: 'চিরকাল ফ্রি', icon: Sparkles },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="text-center">
                    <Icon className="mx-auto h-5 w-5 text-amber-500" />
                    <div className="mt-1 font-heading text-2xl font-extrabold sm:text-3xl">
                      {isBn ? bn(s.value, isBn) : s.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isBn ? s.labelBn : s.labelEn}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* Activity Tracking                                      */}
        {/* ====================================================== */}
        <ActivitySection isBn={isBn} />

        {/* ====================================================== */}
        {/* Workflow Pipeline                                      */}
        {/* ====================================================== */}
        <WorkflowSection isBn={isBn} />

        {/* ====================================================== */}
        {/* Tool Capabilities                                      */}
        {/* ====================================================== */}
        <CapabilitiesSection isBn={isBn} />

        {/* ====================================================== */}
        {/* Pro Tips                                               */}
        {/* ====================================================== */}
        <ProTipsSection isBn={isBn} />

        {/* ====================================================== */}
        {/* Offline Ready                                          */}
        {/* ====================================================== */}
        <OfflineReadySection
          isBn={isBn}
          onInstall={triggerInstall}
          canInstall={canInstall}
        />

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
                <Sparkles className="h-3.5 w-3.5" />
                {isBn ? 'যাদের জন্য তৈরি' : 'Built For'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'ছাত্র, ফ্রিল্যান্সার ও ব্যবসার জন্য' : 'For Students, Freelancers & Businesses'}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {BUILT_FOR.map((item) => {
                const Icon = item.icon
                const t = isBn ? item.bn.t : item.en.t
                const d = isBn ? item.bn.d : item.en.d
                return (
                  <Card
                    key={t}
                    className="relative flex flex-col border-border/60 bg-card p-6"
                  >
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-amber-500/15">
                      <Icon className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">{t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
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

            {mounted ? (
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
            ) : (
              <div className="mt-8 space-y-3">
                {FAQS.map((f, i) => (
                  <div key={i} className="rounded-lg border border-border/60 p-4">
                    <p className="text-[15px] font-medium">{isBn ? f.qBn : f.qEn}</p>
                  </div>
                ))}
              </div>
            )}
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

      {/* PDF Tools quick-access footer section */}
      <section className="border-t border-border/60 bg-muted/20 py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h4 className="text-sm font-bold">{isBn ? 'পিডিএফ টুল' : 'PDF Tools'}</h4>
              <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                {PDF_TOOLS.slice(0, 8).map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => openTool(t)}
                      className="text-left hover:text-foreground"
                    >
                      {isBn ? t.nameBn : t.nameEn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold">{isBn ? 'আরও টুল' : 'More Tools'}</h4>
              <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                {PDF_TOOLS.slice(8, 16).map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => openTool(t)}
                      className="text-left hover:text-foreground"
                    >
                      {isBn ? t.nameBn : t.nameEn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold">{isBn ? 'কুইক লিংক' : 'Quick Links'}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li><a href="/" className="hover:text-foreground">{isBn ? 'হোম' : 'Home'}</a></li>
                <li><a href="/ai-training" className="hover:text-foreground">{isBn ? 'এআই ট্রেনিং' : 'AI Training'}</a></li>
                <li><a href="/qr-code-generator" className="hover:text-foreground">{isBn ? 'কিউআর জেনারেটর' : 'QR Generator'}</a></li>
                <li><a href="/pdf-books" className="hover:text-foreground">{isBn ? 'পিডিএফ বই' : 'PDF Books'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold">{isBn ? 'যোগাযোগ' : 'Contact'}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li><a href="mailto:nextgendigitalstudio1@gmail.com" className="hover:text-foreground">nextgendigitalstudio1@gmail.com</a></li>
                <li><a href="tel:+8801711731354" className="hover:text-foreground">+880 1711-731354</a></li>
                <li className="text-muted-foreground/70">{isBn ? 'Jessore, বাংলাদেশ' : 'Jessore, Bangladesh'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />

      {/* Functional tool dialogs (only one is mounted at a time) */}
      {activeTool && activeTool.id === 'merge' && (
        <MergeTool
          tool={activeTool}
          isBn={isBn}
          open={true}
          onOpenChange={(v) => {
            if (!v) {
              closeTool()
              // Clear pre-loaded files shortly after close so the next open starts fresh
              setTimeout(() => setMergeInitialFiles([]), 300)
            }
          }}
          initialFiles={mergeInitialFiles}
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
      {activeTool && activeTool.id === 'delete-pages' && (
        <DeletePagesTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'extract-pages' && (
        <ExtractPagesTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'reverse' && (
        <ReverseTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'page-numbers' && (
        <PageNumbersTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'watermark' && (
        <WatermarkTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'crop' && (
        <CropTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'organize' && (
        <OrganizeTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'analyze' && (
        <AnalyzeTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}
      {activeTool && activeTool.id === 'inspect' && (
        <InspectTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
      )}

      {/* Phase 1B — Lazy-loaded PDF.js tools (code-split with Suspense) */}
      {activeTool && activeTool.id === 'viewer' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfViewerTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-text' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToTextTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'extract-images' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <ExtractImagesTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-jpg' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToJpgTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-png' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToPngTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'jpg-to-pdf' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <JpgToPdfTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'stamp' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <StampTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'flatten' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <FlattenTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'qr-stamp' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <QrStampTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'fill-forms' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <FillFormsTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-ocr' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfOcrTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'annotate' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <AnnotateTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'version-converter' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <VersionConverterTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'repair' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <RepairTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'compress' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <CompressTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'manage-bookmarks' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <ManageBookmarksTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'bookmarks-from-text' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <BookmarksFromTextTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'compare' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <CompareTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'grayscale' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <GrayscaleTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'sign' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <SignTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-word' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToWordTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-excel' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToExcelTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-ppt' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToPptTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'pdf-to-ebook' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <PdfToEbookTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'protect' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <ProtectTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}
      {activeTool && activeTool.id === 'unlock' && (
        <React.Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-background/80"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>}>
          <UnlockTool tool={activeTool} isBn={isBn} open={true} onOpenChange={closeTool} />
        </React.Suspense>
      )}

      {/* Command palette (⌘+K / Ctrl+K) — mounted guard prevents Radix useId hydration mismatch */}
      {mounted && (
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          isBn={isBn}
          onSelect={openTool}
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
      '43': '৪৩',
      '21': '২১',
      '25': '২৫',
      '30+': '৩০+',
    }
    display = map[value] ?? value
  }
  return <span>{display}</span>
}
