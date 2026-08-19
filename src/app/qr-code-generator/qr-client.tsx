'use client'

import * as React from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { trackClick } from '@/lib/tracking-client'

import {
  QrCode,
  Download,
  Link as LinkIcon,
  FileText,
  Wifi,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  FileImage,
  FileCode,
  History,
  Trash2,
  Loader2,
  ChevronRight,
  Clock,
  Server,
  Eye,
  Cpu,
  ArrowRight,
  Lock,
  Sparkles,
  Globe,
  Camera,
  Upload,
  Star,
  Settings2,
  Image as ImageIcon,
  Copy,
  Printer,
  Code2,
  Archive,
  RefreshCw,
  Wand2,
  Eraser,
  Keyboard,
  ScanLine,
  X,
  HelpCircle,
  Lightbulb,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const BN_DIGITS = '০১২৩৪৫৬৭৮৯'
const bn = (s: string | number, isBn: boolean) =>
  isBn ? String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]) : String(s)

/** Max bytes for a QR version 40 with low error correction. */
const MAX_BYTES = 2331

type QrType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'geo'
  | 'event'
type ModuleStyle = 'square' | 'rounded' | 'dot'
type FrameStyle = 'none' | 'rounded' | 'gradient' | 'dotted'
type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
type ScanStatus = 'idle' | 'verifying' | 'verified' | 'failed'
type Mode = 'generator' | 'scanner'
type ScannerStatus = 'idle' | 'scanning' | 'detected' | 'error'

interface QrOptions {
  size: number
  errorLevel: ErrorLevel
  moduleStyle: ModuleStyle
  frameStyle: FrameStyle
  bgColor: string
  fgColor: string
  logoDataUrl?: string
  timestamp: boolean
}

interface HistoryItem {
  id: string
  type: QrType
  data: Record<string, string>
  payload: string
  preview: string
  timestamp: number
  size?: number
  errorLevel?: ErrorLevel
  moduleStyle?: ModuleStyle
  frameStyle?: FrameStyle
  bgColor?: string
  fgColor?: string
}

interface FavoriteItem {
  id: string
  name: string
  type: QrType
  data: Record<string, string>
  size: number
  errorLevel: ErrorLevel
  moduleStyle: ModuleStyle
  frameStyle: FrameStyle
  bgColor: string
  fgColor: string
  timestamp: number
}

/* -------------------------------------------------------------------------- */
/*  QR type metadata                                                           */
/* -------------------------------------------------------------------------- */

const QR_TYPES: {
  key: QrType
  icon: typeof LinkIcon
  emoji: string
  labelEn: string
  labelBn: string
  descEn: string
  descBn: string
}[] = [
  {
    key: 'url',
    icon: LinkIcon,
    emoji: '🔗',
    labelEn: 'URL',
    labelBn: 'ইউআরএল',
    descEn: 'Open any website link instantly — perfect for marketing, packaging, posters.',
    descBn: 'যেকোনো ওয়েবসাইট লিংক সাথে সাথে খুলুন — মার্কেটিং, প্যাকেজিং, পোস্টারের জন্য পারফেক্ট।',
  },
  {
    key: 'text',
    icon: FileText,
    emoji: '📝',
    labelEn: 'Text',
    labelBn: 'টেক্সট',
    descEn: 'Encode any plain text — notes, codes, quotes, instructions — up to 2,000+ characters.',
    descBn: 'যেকোনো সাধারণ টেক্সট এনকোড করুন — নোট, কোড, কোট, নির্দেশনা — ২,০০০+ ক্যারেক্টার পর্যন্ত।',
  },
  {
    key: 'wifi',
    icon: Wifi,
    emoji: '📶',
    labelEn: 'WiFi',
    labelBn: 'ওয়াইফাই',
    descEn: 'Let guests join your WiFi instantly — no password typing, no typos.',
    descBn: 'গেস্টদের সাথে সাথে আপনার WiFi-এ যুক্ত হতে দিন — পাসওয়ার্ড টাইপ করতে হবে না।',
  },
  {
    key: 'vcard',
    icon: User,
    emoji: '👤',
    labelEn: 'vCard',
    labelBn: 'ভিকার্ড',
    descEn: 'Share contact info as a scannable business card — name, phone, email saved instantly.',
    descBn: 'কন্টাক্ট তথ্য স্ক্যানযোগ্য বিজনেস কার্ড হিসেবে শেয়ার করুন — নাম, ফোন, ইমেইল সাথে সাথে সেভ হবে।',
  },
  {
    key: 'email',
    icon: Mail,
    emoji: '✉️',
    labelEn: 'Email',
    labelBn: 'ইমেইল',
    descEn: 'Pre-fill an email — recipient, subject and body — ready to send on scan.',
    descBn: 'স্ক্যান করলেই ইমেইল প্রস্তুত — প্রাপক, সাবজেক্ট ও বডি আগে থেকে ভরা থাকবে।',
  },
  {
    key: 'phone',
    icon: Phone,
    emoji: '📞',
    labelEn: 'Phone',
    labelBn: 'ফোন',
    descEn: 'Trigger a phone call instantly — perfect for customer support lines.',
    descBn: 'সাথে সাথে ফোন কল শুরু করুন — কাস্টমার সাপোর্ট লাইনের জন্য পারফেক্ট।',
  },
  {
    key: 'sms',
    icon: MessageSquare,
    emoji: '💬',
    labelEn: 'SMS',
    labelBn: 'এসএমএস',
    descEn: 'Open a pre-filled SMS — recipient and message body ready to send.',
    descBn: 'প্রি-ফিল করা SMS খুলুন — প্রাপক ও মেসেজ বডি পাঠানোর জন্য প্রস্তুত।',
  },
  {
    key: 'geo',
    icon: MapPin,
    emoji: '📍',
    labelEn: 'Geo',
    labelBn: 'লোকেশন',
    descEn: 'Share exact latitude/longitude — opens in Google Maps or Apple Maps on scan.',
    descBn: 'সঠিক অক্ষাংশ/দ্রাঘিমা শেয়ার করুন — স্ক্যান করলেই Google Maps বা Apple Maps-এ খুলবে।',
  },
  {
    key: 'event',
    icon: Calendar,
    emoji: '📅',
    labelEn: 'Event',
    labelBn: 'ইভেন্ট',
    descEn: 'Create iCalendar VEVENT — scan to add meetings, webinars, weddings to calendar.',
    descBn: 'iCalendar VEVENT তৈরি করুন — স্ক্যান করে মিটিং, ওয়েবিনার, বিয়ে ক্যালেন্ডারে যোগ করুন।',
  },
]

/* -------------------------------------------------------------------------- */
/*  Default form data per type                                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_FORM: Record<string, string> = {
  // URL
  url: '',
  // Text
  text: '',
  // WiFi
  wifiSsid: '',
  wifiPassword: '',
  wifiEncryption: 'WPA',
  wifiHidden: 'false',
  // vCard
  vcardName: '',
  vcardPhone: '',
  vcardEmail: '',
  vcardOrg: '',
  vcardUrl: '',
  // Email
  emailTo: '',
  emailSubject: '',
  emailBody: '',
  // Phone
  phone: '',
  // SMS
  smsPhone: '',
  smsMessage: '',
  // Geo
  geoLat: '',
  geoLng: '',
  // Event
  eventTitle: '',
  eventLocation: '',
  eventStart: '',
  eventEnd: '',
  eventDescription: '',
}

/* -------------------------------------------------------------------------- */
/*  Payload builders                                                           */
/* -------------------------------------------------------------------------- */

/** Escape special chars in WiFi SSID/password (backslash, semicolon, colon, comma). */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1')
}

function buildPayload(type: QrType, d: Record<string, string>): string {
  switch (type) {
    case 'url': {
      let url = (d.url ?? '').trim()
      if (!url) return ''
      if (!/^[a-z]+:\/\//i.test(url)) url = 'https://' + url
      return url
    }
    case 'text':
      return (d.text ?? '').trim()
    case 'wifi': {
      const ssid = (d.wifiSsid ?? '').trim()
      if (!ssid) return ''
      const enc = d.wifiEncryption === 'WEP' ? 'WEP' : d.wifiEncryption === 'nopass' ? 'nopass' : 'WPA'
      const pw = (d.wifiPassword ?? '').trim()
      const hidden = d.wifiHidden === 'true'
      return `WIFI:T:${enc};S:${escapeWifi(ssid)};P:${escapeWifi(pw)};${hidden ? 'H:true;' : ''};`
    }
    case 'vcard': {
      const name = (d.vcardName ?? '').trim()
      if (!name && !(d.vcardPhone ?? '').trim() && !(d.vcardEmail ?? '').trim()) return ''
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        ...(d.vcardOrg ?? '').trim() ? [`ORG:${(d.vcardOrg ?? '').trim()}`] : [],
        ...(d.vcardPhone ?? '').trim() ? [`TEL:${(d.vcardPhone ?? '').trim()}`] : [],
        ...(d.vcardEmail ?? '').trim() ? [`EMAIL:${(d.vcardEmail ?? '').trim()}`] : [],
        ...(d.vcardUrl ?? '').trim() ? [`URL:${(d.vcardUrl ?? '').trim()}`] : [],
        'END:VCARD',
      ]
      return lines.join('\n')
    }
    case 'email': {
      const to = (d.emailTo ?? '').trim()
      if (!to) return ''
      const params: string[] = []
      if ((d.emailSubject ?? '').trim()) params.push(`subject=${encodeURIComponent((d.emailSubject ?? '').trim())}`)
      if ((d.emailBody ?? '').trim()) params.push(`body=${encodeURIComponent((d.emailBody ?? '').trim())}`)
      return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`
    }
    case 'phone': {
      const p = (d.phone ?? '').trim()
      if (!p) return ''
      return `tel:${p.replace(/\s+/g, '')}`
    }
    case 'sms': {
      const p = (d.smsPhone ?? '').trim()
      if (!p) return ''
      const msg = (d.smsMessage ?? '').trim()
      return `sms:${p.replace(/\s+/g, '')}${msg ? `?body=${encodeURIComponent(msg)}` : ''}`
    }
    case 'geo': {
      const lat = (d.geoLat ?? '').trim()
      const lng = (d.geoLng ?? '').trim()
      if (!lat || !lng) return ''
      return `geo:${lat},${lng}`
    }
    case 'event': {
      const title = (d.eventTitle ?? '').trim()
      if (!title) return ''
      const start = (d.eventStart ?? '').trim()
      const end = (d.eventEnd ?? '').trim()
      // Convert datetime-local (YYYY-MM-DDTHH:mm) to iCal UTC basic format (YYYYMMDDTHHmmssZ)
      const toIcal = (s: string) => s ? s.replace(/[-:]/g, '').replace(' ', 'T') + '00Z' : ''
      const lines = [
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        ...(start ? [`DTSTART:${toIcal(start)}`] : []),
        ...(end ? [`DTEND:${toIcal(end)}`] : []),
        ...((d.eventLocation ?? '').trim() ? [`LOCATION:${(d.eventLocation ?? '').trim()}`] : []),
        ...((d.eventDescription ?? '').trim() ? [`DESCRIPTION:${(d.eventDescription ?? '').trim()}`] : []),
        'END:VEVENT',
      ]
      return lines.join('\n')
    }
    default:
      return ''
  }
}

/* -------------------------------------------------------------------------- */
/*  QR rendering (matrix → canvas/SVG)                                         */
/* -------------------------------------------------------------------------- */

interface RenderResult {
  ok: boolean
  error?: string
}

/** Load an HTMLImageElement from a src (data URL or URL). */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = src
  })
}

/** Render QR matrix to a canvas with the chosen module style + quiet zone. */
async function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  payload: string,
  opts: QrOptions,
): Promise<RenderResult> {
  try {
    // Pre-load logo (if any) before drawing
    let logo: HTMLImageElement | null = null
    if (opts.logoDataUrl) {
      try {
        logo = await loadImage(opts.logoDataUrl)
      } catch {
        /* ignore logo failure, render without */
      }
    }
    const qr = QRCode.create(payload, { errorCorrectionLevel: opts.errorLevel })
    const matrix = qr.modules
    const count = matrix.size
    const quiet = 4
    const totalModules = count + quiet * 2
    const cellSize = Math.max(1, Math.floor(opts.size / totalModules))
    const qrSize = cellSize * totalModules
    const timestampHeight = opts.timestamp ? Math.max(24, Math.floor(opts.size / 12)) : 0
    canvas.width = qrSize
    canvas.height = qrSize + timestampHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return { ok: false, error: 'Canvas context unavailable' }
    // Background (covers full canvas including timestamp strip)
    ctx.fillStyle = opts.bgColor || '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // Dark modules
    ctx.fillStyle = opts.fgColor || '#000000'
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (matrix.get(r, c)) {
          const x = (c + quiet) * cellSize
          const y = (r + quiet) * cellSize
          if (opts.moduleStyle === 'square') {
            ctx.fillRect(x, y, cellSize, cellSize)
          } else if (opts.moduleStyle === 'rounded') {
            if (typeof (ctx as CanvasRenderingContext2D & { roundRect?: unknown }).roundRect === 'function') {
              ctx.beginPath()
              ;(ctx as CanvasRenderingContext2D & { roundRect: (x: number, y: number, w: number, h: number, r: number) => void }).roundRect(x, y, cellSize, cellSize, cellSize * 0.3)
              ctx.fill()
            } else {
              const radius = cellSize * 0.3
              ctx.beginPath()
              ctx.moveTo(x + radius, y)
              ctx.lineTo(x + cellSize - radius, y)
              ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius)
              ctx.lineTo(x + cellSize, y + cellSize - radius)
              ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize)
              ctx.lineTo(x + radius, y + cellSize)
              ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius)
              ctx.lineTo(x, y + radius)
              ctx.quadraticCurveTo(x, y, x + radius, y)
              ctx.closePath()
              ctx.fill()
            }
          } else {
            ctx.beginPath()
            ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }
    // Logo overlay (centered, ~20% of QR)
    if (logo) {
      const logoSize = qrSize * 0.2
      const x = (qrSize - logoSize) / 2
      const y = (qrSize - logoSize) / 2
      ctx.fillStyle = opts.bgColor || '#ffffff'
      const pad = Math.max(2, cellSize)
      ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2)
      ctx.drawImage(logo, x, y, logoSize, logoSize)
    }
    // Timestamp watermark
    if (opts.timestamp) {
      ctx.fillStyle = opts.fgColor || '#000000'
      const fontSize = Math.max(10, Math.floor(qrSize / 26))
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
      ctx.fillText(stamp, qrSize / 2, qrSize + timestampHeight / 2)
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/** Decode the canvas with jsQR to verify the QR is scannable.
 *  Uses only the square QR region (top of canvas) — ignores timestamp strip if present. */
function verifyScannable(canvas: HTMLCanvasElement): boolean {
  try {
    const ctx = canvas.getContext('2d')
    if (!ctx) return false
    const w = canvas.width
    const h = canvas.height
    const qrSize = Math.min(w, h)
    const imageData = ctx.getImageData(0, 0, qrSize, qrSize)
    const decoded = jsQR(imageData.data, qrSize, qrSize, { inversionAttempts: 'attemptBoth' })
    return !!decoded
  } catch {
    return false
  }
}

/** Generate an SVG string from the QR matrix. */
function generateSvg(payload: string, opts: QrOptions): string {
  const qr = QRCode.create(payload, { errorCorrectionLevel: opts.errorLevel })
  const matrix = qr.modules
  const count = matrix.size
  const quiet = 4
  const totalModules = count + quiet * 2
  const cellSize = opts.size / totalModules
  const bg = opts.bgColor || '#ffffff'
  const fg = opts.fgColor || '#000000'
  const timestampHeight = opts.timestamp ? Math.max(24, Math.floor(opts.size / 12)) : 0
  const totalHeight = opts.size + timestampHeight
  const parts: string[] = []
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (matrix.get(r, c)) {
        const x = (c + quiet) * cellSize
        const y = (r + quiet) * cellSize
        if (opts.moduleStyle === 'square') {
          parts.push(
            `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}"/>`,
          )
        } else if (opts.moduleStyle === 'rounded') {
          const radius = cellSize * 0.3
          parts.push(
            `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" rx="${radius.toFixed(2)}" ry="${radius.toFixed(2)}"/>`,
          )
        } else {
          parts.push(
            `<circle cx="${(x + cellSize / 2).toFixed(2)}" cy="${(y + cellSize / 2).toFixed(2)}" r="${(cellSize / 2).toFixed(2)}"/>`,
          )
        }
      }
    }
  }
  // Logo overlay
  let logoEl = ''
  if (opts.logoDataUrl) {
    const logoSize = opts.size * 0.2
    const lx = (opts.size - logoSize) / 2
    const ly = (opts.size - logoSize) / 2
    const pad = Math.max(2, cellSize)
    logoEl = `<rect x="${(lx - pad).toFixed(2)}" y="${(ly - pad).toFixed(2)}" width="${(logoSize + pad * 2).toFixed(2)}" height="${(logoSize + pad * 2).toFixed(2)}" fill="${bg}"/><image href="${opts.logoDataUrl}" x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" width="${logoSize.toFixed(2)}" height="${logoSize.toFixed(2)}" preserveAspectRatio="xMidYMid meet"/>`
  }
  // Timestamp
  let tsEl = ''
  if (opts.timestamp) {
    const fontSize = Math.max(10, Math.floor(opts.size / 26))
    const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    tsEl = `<text x="${(opts.size / 2).toFixed(2)}" y="${(opts.size + timestampHeight / 2 + fontSize / 3).toFixed(2)}" font-family="ui-monospace, monospace" font-size="${fontSize}" fill="${fg}" text-anchor="middle">${stamp}</text>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${opts.size} ${totalHeight}" width="${opts.size}" height="${totalHeight}"><rect width="${opts.size}" height="${totalHeight}" fill="${bg}"/><g fill="${fg}">${parts.join('')}</g>${logoEl}${tsEl}</svg>`
}

/** Generate an SVG with a subtle CSS pulse animation. */
function generateAnimatedSvg(payload: string, opts: QrOptions): string {
  const base = generateSvg(payload, opts)
  const style = `<style>@keyframes qrPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.88;transform:scale(1.015)}}svg&gt;g{transform-origin:center;animation:qrPulse 2.5s ease-in-out infinite}</style>`
  return base.replace('</svg>', style + '</svg>')
}

/* -------------------------------------------------------------------------- */
/*  Trust badges data                                                          */
/* -------------------------------------------------------------------------- */

const TRUST_BADGES = [
  { icon: Lock, valueEn: '100%', valueBn: '১০০%', labelEn: 'Client-side', labelBn: 'ক্লায়েন্ট-সাইড' },
  { icon: Server, valueEn: 'None', valueBn: 'নেই', labelEn: 'Backend', labelBn: 'ব্যাকএন্ড' },
  { icon: FileImage, valueEn: 'PNG+SVG', valueBn: 'PNG+SVG', labelEn: 'Downloads', labelBn: 'ডাউনলোড' },
  { icon: Zap, valueEn: '<1s', valueBn: '<১সে', labelEn: 'Generation', labelBn: 'জেনারেশন' },
]

/* -------------------------------------------------------------------------- */
/*  How it works steps                                                         */
/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    n: 1,
    icon: FileText,
    titleEn: 'Enter your content',
    titleBn: 'আপনার কনটেন্ট লিখুন',
    descEn: 'Pick a QR type — URL, WiFi, vCard, event — and type or paste your content. The form adapts to each type.',
    descBn: 'QR টাইপ বাছাই করুন — URL, WiFi, vCard, ইভেন্ট — এবং কনটেন্ট লিখুন বা পেস্ট করুন। ফর্ম প্রতিটি টাইপ অনুযায়ী বদলায়।',
  },
  {
    n: 2,
    icon: QrCode,
    titleEn: 'Generate instantly',
    titleBn: 'সাথে সাথে জেনারেট করুন',
    descEn: 'The QR code generates live as you type — debounced 300ms for smoothness. Scan-test badge confirms it actually scans.',
    descBn: 'QR কোড আপনি টাইপ করার সাথে সাথে জেনারেট হয় — ৩০০ মিলিসেকেন্ড ডিবাউন্স। স্ক্যান-টেস্ট ব্যাজ নিশ্চিত করে এটি সত্যিই স্ক্যান হয়।',
  },
  {
    n: 3,
    icon: Download,
    titleEn: 'Download & share',
    titleBn: 'ডাউনলোড ও শেয়ার করুন',
    descEn: 'Download as PNG (with white background) or SVG (vector, infinite scale). Print it, share it, embed it anywhere.',
    descBn: 'PNG (সাদা ব্যাকগ্রাউন্ড সহ) বা SVG (ভেক্টর, অসীম স্কেল) ডাউনলোড করুন। প্রিন্ট করুন, শেয়ার করুন, যেখানে খুশি বসান।',
  },
]

/* -------------------------------------------------------------------------- */
/*  FAQ data                                                                   */
/* -------------------------------------------------------------------------- */

const FAQS = [
  {
    qEn: 'What is a QR code?',
    qBn: 'QR কোড কী?',
    aEn: 'A QR (Quick Response) code is a two-dimensional barcode that stores URLs, text, contact info, WiFi credentials and more. Phone cameras scan them to instantly open websites, join WiFi networks, save contacts or send messages. Our generator supports 9 content types — all locally in your browser.',
    aBn: 'QR (Quick Response) কোড হলো একটি দ্বিমাত্রিক বারকোড যা URL, টেক্সট, কন্টাক্ট তথ্য, WiFi ক্রেডেনশিয়াল ইত্যাদি সংরক্ষণ করে। ফোন ক্যামেরা স্ক্যান করলে সাথে সাথে ওয়েবসাইট খোলে, WiFi-এ যুক্ত হয়, কন্টাক্ট সেভ হয়। আমাদের জেনারেটর ৯ ধরনের কনটেন্ট সাপোর্ট করে — সবই আপনার ব্রাউজারে।',
  },
  {
    qEn: 'Is this QR code generator free?',
    qBn: 'এই QR কোড জেনারেটর কি ফ্রি?',
    aEn: 'Yes — 100% free, no signup, no watermark, no limits. Generate unlimited QR codes for URLs, WiFi, vCards, events and more. Download as PNG or SVG. No credit card, no email, no account required.',
    aBn: 'হ্যাঁ — ১০০% ফ্রি, কোনো সাইনআপ নেই, কোনো ওয়াটারমার্ক নেই, কোনো লিমিট নেই। URL, WiFi, vCard, ইভেন্ট সহ আনলিমিটেড QR কোড তৈরি করুন। PNG বা SVG ডাউনলোড করুন। কোনো ক্রেডিট কার্ড, ইমেইল বা অ্যাকাউন্ট লাগবে না।',
  },
  {
    qEn: 'Can I create a WiFi QR code?',
    qBn: 'আমি কি WiFi QR কোড তৈরি করতে পারি?',
    aEn: 'Yes. Select the WiFi tab, enter your SSID, password and encryption (WPA/WEP/None). The generator builds the standard WIFI:T:WPA;S:ssid;P:password;; payload. Scanning it with any phone camera instantly connects — no manual password typing.',
    aBn: 'হ্যাঁ। WiFi ট্যাব সিলেক্ট করুন, SSID, পাসওয়ার্ড ও এনক্রিপশন (WPA/WEP/None) দিন। জেনারেটর স্ট্যান্ডার্ড WIFI:T:WPA;S:ssid;P:password;; পেলোড তৈরি করে। যেকোনো ফোন ক্যামেরা স্ক্যান করলে সাথে সাথে যুক্ত হয় — পাসওয়ার্ড টাইপ করতে হবে না।',
  },
  {
    qEn: 'Can I download the QR code as PNG?',
    qBn: 'আমি কি QR কোড PNG হিসেবে ডাউনলোড করতে পারি?',
    aEn: 'Yes. Every generated QR code can be downloaded as a PNG image with a white background and quiet zone for maximum scannability. Choose Small (200px), Medium (300px) or Large (400px) before downloading.',
    aBn: 'হ্যাঁ। প্রতিটি QR কোড সাদা ব্যাকগ্রাউন্ড ও কোয়াইট জোন সহ PNG ইমেজ হিসেবে ডাউনলোডযোগ্য। ডাউনলোডের আগে Small (২০০px), Medium (৩০০px) বা Large (৪০০px) বাছাই করুন।',
  },
  {
    qEn: 'Can I download the QR code as SVG?',
    qBn: 'আমি কি QR কোড SVG হিসেবে ডাউনলোড করতে পারি?',
    aEn: 'Yes. SVG downloads are vector-based — they scale infinitely without pixelation. Perfect for print, posters, business cards, billboards and large-format signage. SVG files are also smaller and editable in Illustrator, Figma or Inkscape.',
    aBn: 'হ্যাঁ। SVG ডাউনলোড ভেক্টর-বেসড — অসীম স্কেল করলেও পিক্সেল নষ্ট হয় না। প্রিন্ট, পোস্টার, বিজনেস কার্ড, বিলবোর্ডের জন্য পারফেক্ট। SVG ফাইল ছোট এবং Illustrator, Figma বা Inkscape-এ এডিটযোগ্য।',
  },
  {
    qEn: 'Can I add a logo to the center of the QR code?',
    qBn: 'আমি কি QR কোডের মাঝে লোগো বসাতে পারি?',
    aEn: 'Yes. Click "Upload PNG/JPG/SVG" in the Logo section to overlay your brand logo at the center of the QR code (scaled to ~20% of the QR size). When a logo is added, the error correction level automatically switches to H (30%) so the code remains scannable. The scan-test badge verifies your branded code still decodes.',
    aBn: 'হ্যাঁ। Logo সেকশনে "Upload PNG/JPG/SVG" ক্লিক করে আপনার ব্র্যান্ড লোগো QR কোডের মাঝে বসান (QR সাইজের ~২০%)। লোগো যোগ করলে error correction স্বয়ংক্রিয়ভাবে H (৩০%) তে চলে যায় যাতে কোড স্ক্যানযোগ্য থাকে। স্ক্যান-টেস্ট ব্যাজ আপনার ব্র্যান্ডেড কোড ডিকোডযোগ্য কিনা যাচাই করে।',
  },
  {
    qEn: 'How does the scan-test feature work?',
    qBn: 'স্ক্যান-টেস্ট ফিচারটি কীভাবে কাজ করে?',
    aEn: 'After generating your QR code, we decode the canvas with the jsQR library to verify it is actually scannable. A green "Scan verified" badge confirms success. This catches issues like overly dense codes, insufficient contrast, or too much data for the chosen error correction level.',
    aBn: 'QR কোড জেনারেট হওয়ার পর আমরা jsQR লাইব্রেরি দিয়ে ক্যানভাস ডিকোড করে যাচাই করি যে এটি সত্যিই স্ক্যানযোগ্য। সবুজ "Scan verified" ব্যাজ সফলতা নিশ্চিত করে। এটি অতিরিক্ত ঘন কোড, অপর্যাপ্ত কনট্রাস্ট, বা এরর লেভেলের তুলনায় বেশি ডেটার সমস্যা ধরে।',
  },
  {
    qEn: 'Is my data private?',
    qBn: 'আমার ডেটা কি গোপন থাকে?',
    aEn: '100% private. All QR generation happens locally in your browser — nothing is ever uploaded to a server. No tracking of your QR content, no analytics on the data you encode, no cookies storing your inputs. The only network request is a single page-view ping for traffic counting.',
    aBn: '১০০% প্রাইভেট। সব QR জেনারেশন আপনার ব্রাউজারেই হয় — কিছুই সার্ভারে যায় না। আপনার QR কনটেন্ট ট্র্যাক করা হয় না, এনকোড করা ডেটার অ্যানালিটিক্স নেই, ইনপুট সংরক্ষণ করে এমন কুকি নেই। একমাত্র নেটওয়ার্ক রিকোয়েস্ট হলো ট্রাফিক গোনার জন্য একটি পেজ-ভিউ পিং।',
  },
  {
    qEn: 'Does the generator work offline?',
    qBn: 'জেনারেটরটি কি অফলাইনে কাজ করে?',
    aEn: 'Once the page loads, yes — all QR generation, scan-testing and PNG/SVG downloads run entirely in your browser. You can disconnect from the internet and keep generating QR codes. The page only needs network access for the initial load.',
    aBn: 'পেজ একবার লোড হওয়ার পর, হ্যাঁ — সব QR জেনারেশন, স্ক্যান-টেস্ট ও PNG/SVG ডাউনলোড সম্পূর্ণ আপনার ব্রাউজারে চলে। ইন্টারনেট বিচ্ছিন্ন করেও QR কোড তৈরি করতে পারবেন। শুধু প্রথম লোডের জন্য নেটওয়ার্ক দরকার।',
  },
  {
    qEn: 'What is QR code error correction?',
    qBn: 'QR কোডের error correction কী?',
    aEn: 'Error correction adds redundant data so a damaged or partially obscured QR code still scans. Four levels: L (7% recovery), M (15%), Q (25%), H (30%). Higher levels are more durable but produce denser codes. Use H for printed materials that may get scratched, L for clean digital displays.',
    aBn: 'Error correction অতিরিক্ত ডেটা যোগ করে যাতে ক্ষতিগ্রস্ত বা আংশিক ঢাকা QR কোডও স্ক্যান হয়। চারটি লেভেল: L (৭% রিকভারি), M (১৫%), Q (২৫%), H (৩০%)। উচ্চ লেভেল বেশি টেকসই কিন্তু ঘন কোড তৈরি করে। প্রিন্টেড ম্যাটেরিয়ালে H, ক্লিন ডিজিটাল ডিসপ্লেতে L ব্যবহার করুন।',
  },
]

/* -------------------------------------------------------------------------- */
/*  NextGen services list                                                      */
/* -------------------------------------------------------------------------- */

const NGS_SERVICES = [
  { href: '/', labelEn: 'AI Sales Automation', labelBn: 'AI সেলস অটোমেশন' },
  { href: '/services/lead-generation', labelEn: 'Lead Generation', labelBn: 'লিড জেনারেশন' },
  { href: '/services/whatsapp-automation', labelEn: 'WhatsApp Automation', labelBn: 'হোয়াটসঅ্যাপ অটোমেশন' },
  { href: '/services/crm-automation', labelEn: 'CRM Automation', labelBn: 'CRM অটোমেশন' },
  { href: '/services/ai-voice-agent', labelEn: 'AI Voice Agent', labelBn: 'AI ভয়েস এজেন্ট' },
  { href: '/3d-portrait', labelEn: 'CNC 3D Portrait', labelBn: 'CNC 3D পোর্ট্রেট' },
  { href: '/ai-training', labelEn: 'AI Training', labelBn: 'AI ট্রেনিং' },
  { href: '/founder', labelEn: 'Meet the Founder', labelBn: 'প্রতিষ্ঠাতার সাথে পরিচিত হোন' },
]

/* -------------------------------------------------------------------------- */
/*  Main client component                                                      */
/* -------------------------------------------------------------------------- */

const HISTORY_KEY = 'nextgen-qr-history'
const FAVORITES_KEY = 'nextgen-qr-favorites'
const HISTORY_MAX = 8
const FAVORITES_MAX = 12

/* Sample data for "Try Example" button — per content type. */
const EXAMPLES: Record<QrType, Record<string, string>> = {
  url: { url: 'https://nextgen.studio' },
  text: { text: 'Hello from NextGen Digital Studio — built in Bangladesh with care for every entrepreneur.' },
  wifi: { wifiSsid: 'NextGen-Guest', wifiPassword: 'welcome2025', wifiEncryption: 'WPA', wifiHidden: 'false' },
  vcard: {
    vcardName: 'MD. Nazmul Islam Taj',
    vcardPhone: '+8801712345678',
    vcardEmail: 'founder@nextgen.studio',
    vcardOrg: 'NextGen Digital Studio',
    vcardUrl: 'https://nextgen.studio',
  },
  email: {
    emailTo: 'hello@nextgen.studio',
    emailSubject: 'QR Code Inquiry',
    emailBody: 'Hi, I just scanned your QR code and would love to learn more about your services.',
  },
  phone: { phone: '+8801712345678' },
  sms: { smsPhone: '+8801712345678', smsMessage: 'Hi! I just scanned your QR code.' },
  geo: { geoLat: '23.8103', geoLng: '90.4125' },
  event: {
    eventTitle: 'NextGen AI Workshop 2025',
    eventLocation: 'Jessore, Bangladesh',
    eventStart: '2025-12-01T10:00',
    eventEnd: '2025-12-01T13:00',
    eventDescription: 'Hands-on AI for sales automation. Free for entrepreneurs.',
  },
}

export function QrClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('qr_code_generator_page')

  const [activeType, setActiveType] = React.useState<QrType>('url')
  const [formData, setFormData] = React.useState<Record<string, string>>(DEFAULT_FORM)
  const [size, setSize] = React.useState<number>(300)
  const [errorLevel, setErrorLevel] = React.useState<ErrorLevel>('M')
  const [moduleStyle, setModuleStyle] = React.useState<ModuleStyle>('square')
  const [frameStyle, setFrameStyle] = React.useState<FrameStyle>('none')
  const [bgColor, setBgColor] = React.useState<string>('#ffffff')
  const [fgColor, setFgColor] = React.useState<string>('#000000')
  const [logoDataUrl, setLogoDataUrl] = React.useState<string>('')
  const [showTimestamp, setShowTimestamp] = React.useState<boolean>(false)
  const [advancedOpen, setAdvancedOpen] = React.useState<boolean>(false)
  const [mode, setMode] = React.useState<Mode>('generator')
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([])
  const [history, setHistory] = React.useState<HistoryItem[]>([])
  const [scanStatus, setScanStatus] = React.useState<ScanStatus>('idle')
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [genError, setGenError] = React.useState<string | null>(null)
  const [previewDataUrl, setPreviewDataUrl] = React.useState<string>('')
  // Mount guard — prevents Radix Accordion useId hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Keyboard shortcuts dialog
  const [showShortcuts, setShowShortcuts] = React.useState(false)

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const generatorRef = React.useRef<HTMLDivElement>(null)
  const generateAgainRef = React.useRef<() => void>(() => {})

  /* ---------- Build full QR options object ---------- */
  const buildOpts = React.useCallback(
    (): QrOptions => ({
      size,
      errorLevel,
      moduleStyle,
      frameStyle,
      bgColor,
      fgColor,
      logoDataUrl: logoDataUrl || undefined,
      timestamp: showTimestamp,
    }),
    [size, errorLevel, moduleStyle, frameStyle, bgColor, fgColor, logoDataUrl, showTimestamp],
  )

  /* ---------- Load history + favorites on mount ---------- */
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryItem[]
        if (Array.isArray(parsed)) setHistory(parsed.slice(0, HISTORY_MAX))
      }
    } catch {
      /* ignore */
    }
    try {
      const rawF = localStorage.getItem(FAVORITES_KEY)
      if (rawF) {
        const parsedF = JSON.parse(rawF) as FavoriteItem[]
        if (Array.isArray(parsedF)) setFavorites(parsedF.slice(0, FAVORITES_MAX))
      }
    } catch {
      /* ignore */
    }
  }, [])

  /* ---------- Compute payload ---------- */
  const payload = React.useMemo(
    () => buildPayload(activeType, formData),
    [activeType, formData],
  )
  const payloadBytes = payload.length
  const capacityPct = Math.min(100, (payloadBytes / MAX_BYTES) * 100)

  /* ---------- Live preview (debounced 300ms, async for logo load) ---------- */
  React.useEffect(() => {
    if (!payload) {
      setScanStatus('idle')
      setGenError(null)
      setPreviewDataUrl('')
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }
    if (payloadBytes > MAX_BYTES) {
      setScanStatus('failed')
      setGenError(
        isBn
          ? `ডেটা বেশি বড় (${bn(payloadBytes, isBn)} / ${bn(MAX_BYTES, isBn)} বাইট)। ছোট করুন বা error correction কমান।`
          : `Data too large (${payloadBytes} / ${MAX_BYTES} bytes). Shorten it or lower error correction.`,
      )
      return
    }
    setIsGenerating(true)
    setGenError(null)
    let cancelled = false
    const t = setTimeout(async () => {
      const canvas = canvasRef.current
      if (!canvas) {
        if (!cancelled) setIsGenerating(false)
        return
      }
      const result = await renderQrToCanvas(canvas, payload, buildOpts())
      if (cancelled) return
      if (!result.ok) {
        setGenError(result.error ?? 'Generation failed')
        setScanStatus('failed')
        setIsGenerating(false)
        return
      }
      try {
        setPreviewDataUrl(canvas.toDataURL('image/png'))
      } catch {
        /* ignore */
      }
      setScanStatus('verifying')
      const ok = verifyScannable(canvas)
      setScanStatus(ok ? 'verified' : 'failed')
      setIsGenerating(false)
    }, 300)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [payload, payloadBytes, buildOpts, isBn])

  /* ---------- Derived UI bits (declared early so other handlers can reference) ---------- */
  const activeTypeMeta = QR_TYPES.find((q) => q.key === activeType)!
  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* ---------- Helpers ---------- */
  const setField = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  const resetForm = () => {
    setFormData((prev) => {
      const next = { ...prev }
      const typeFields = TYPE_FIELDS[activeType]
      for (const f of typeFields) next[f] = ''
      return next
    })
  }

  const tryExample = () => {
    const ex = EXAMPLES[activeType] ?? {}
    setFormData((prev) => ({ ...prev, ...ex }))
    toast.success(isBn ? 'উদাহরণ লোড হয়েছে' : 'Example loaded')
    trackClick('qr_action', 'qr_try_example', { type: activeType })
  }

  const clearAll = () => {
    resetForm()
    toast.success(isBn ? 'ফর্ম মুছে ফেলা হয়েছে' : 'Form cleared')
  }

  const generateAgain = async () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    setIsGenerating(true)
    setGenError(null)
    const result = await renderQrToCanvas(canvas, payload, buildOpts())
    if (!result.ok) {
      setGenError(result.error ?? 'Generation failed')
      setScanStatus('failed')
      setIsGenerating(false)
      return
    }
    try {
      setPreviewDataUrl(canvas.toDataURL('image/png'))
    } catch {
      /* ignore */
    }
    setScanStatus('verifying')
    const ok = verifyScannable(canvas)
    setScanStatus(ok ? 'verified' : 'failed')
    setIsGenerating(false)
    toast.success(isBn ? 'QR রি-জেনারেট হয়েছে' : 'QR regenerated')
    trackClick('qr_action', 'qr_generate_again', { type: activeType })
  }
  // Keep ref in sync so the global keyboard handler always calls latest
  generateAgainRef.current = generateAgain

  /* ---------- Logo upload ---------- */
  const handleLogoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error(isBn ? 'শুধুমাত্র ইমেজ ফাইল' : 'Image files only')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error(isBn ? 'লোগো ২MB এর কম হতে হবে' : 'Logo must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setLogoDataUrl(String(reader.result))
      setErrorLevel('H')
      toast.success(isBn ? 'লোগো যোগ হয়েছে · Error level H' : 'Logo added · Error level H')
      trackClick('qr_action', 'qr_logo_upload', {})
    }
    reader.onerror = () => toast.error(isBn ? 'লোগো পড়তে সমস্যা' : 'Failed to read logo')
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogoDataUrl('')
    toast.success(isBn ? 'লোগো সরানো হয়েছে' : 'Logo removed')
  }

  /* ---------- Favorites ---------- */
  const persistFavorites = (next: FavoriteItem[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const saveFavorite = () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const fav: FavoriteItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: `${activeTypeMeta.labelEn} · ${new Date().toLocaleDateString()}`,
      type: activeType,
      data: { ...formData },
      size,
      errorLevel,
      moduleStyle,
      frameStyle,
      bgColor,
      fgColor,
      timestamp: Date.now(),
    }
    const next = [fav, ...favorites].slice(0, FAVORITES_MAX)
    setFavorites(next)
    persistFavorites(next)
    toast.success(isBn ? 'ফেভারিট সেভ হয়েছে' : 'Favorite saved')
    trackClick('qr_action', 'qr_save_favorite', { type: activeType })
  }

  const restoreFavorite = (fav: FavoriteItem) => {
    setActiveType(fav.type)
    setFormData((prev) => ({ ...prev, ...fav.data }))
    setSize(fav.size)
    setErrorLevel(fav.errorLevel)
    setModuleStyle(fav.moduleStyle)
    setFrameStyle(fav.frameStyle)
    setBgColor(fav.bgColor)
    setFgColor(fav.fgColor)
    toast.success(isBn ? 'ফেভারিট রিস্টোর হয়েছে' : 'Favorite restored')
    scrollToGenerator()
  }

  const deleteFavorite = (id: string) => {
    const next = favorites.filter((f) => f.id !== id)
    setFavorites(next)
    persistFavorites(next)
    toast.success(isBn ? 'ফেভারিট মুছে ফেলা হয়েছে' : 'Favorite deleted')
  }

  /* ---------- Encoded payload copy ---------- */
  const copyPayload = async () => {
    if (!payload) return
    try {
      await navigator.clipboard.writeText(payload)
      toast.success(isBn ? 'পেলোড কপি হয়েছে' : 'Payload copied')
    } catch {
      toast.error(isBn ? 'কপি ব্যর্থ' : 'Copy failed')
    }
  }

  /* ---------- Copy image to clipboard ---------- */
  const copyImageToClipboard = async () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      )
      if (!blob) throw new Error('no blob')
      const w = window as unknown as { ClipboardItem?: new (data: Record<string, Blob>) => unknown }
      const nav = navigator as unknown as { clipboard?: { write?: (items: unknown[]) => Promise<void> } }
      if (w.ClipboardItem && nav.clipboard?.write) {
        const item = new w.ClipboardItem({ 'image/png': blob })
        await nav.clipboard.write([item])
        toast.success(isBn ? 'ছবি কপি হয়েছে' : 'Image copied to clipboard')
        trackClick('qr_action', 'qr_copy_image', { type: activeType })
      } else {
        throw new Error('unsupported')
      }
    } catch {
      toast.error(isBn ? 'কপি ব্যর্থ — ব্রাউজার সম্ভবত সাপোর্ট করছে না' : 'Copy failed — browser may not support this')
    }
  }

  /* ---------- Print QR ---------- */
  const printQr = () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const win = window.open('', '_blank', 'width=600,height=600')
    if (!win) {
      toast.error(isBn ? 'পপআপ ব্লক করা হয়েছে' : 'Popup blocked')
      return
    }
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"/><title>Print QR Code</title><style>body{margin:0;padding:40px;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff}img{max-width:100%;max-height:80vh}@media print{body{padding:0}}</style></head><body><img src="${dataUrl}" alt="QR Code" onload="window.focus();window.print()"/></body></html>`,
    )
    win.document.close()
    trackClick('qr_action', 'qr_print', { type: activeType })
  }

  /* ---------- Animated SVG ---------- */
  const downloadAnimatedSvg = () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    try {
      const svg = generateAnimatedSvg(payload, buildOpts())
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      saveAs(blob, `qr-code-animated-${activeType}-${Date.now()}.svg`)
      toast.success(isBn ? 'অ্যানিমেটেড SVG ডাউনলোড হয়েছে' : 'Animated SVG downloaded')
      trackClick('qr_download', 'qr_animated_svg', { type: activeType })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Animated SVG failed')
    }
  }

  /* ---------- Batch ZIP from history ---------- */
  const downloadBatchZip = async () => {
    if (history.length === 0) {
      toast.error(isBn ? 'কোনো হিস্ট্রি নেই' : 'No history to zip')
      return
    }
    try {
      toast.info(isBn ? 'ZIP তৈরি হচ্ছে...' : 'Building ZIP...')
      const zip = new JSZip()
      for (let i = 0; i < history.length; i++) {
        const item = history[i]
        const tmp = document.createElement('canvas')
        const result = await renderQrToCanvas(tmp, item.payload, {
          size: 300,
          errorLevel: item.errorLevel ?? 'M',
          moduleStyle: item.moduleStyle ?? 'square',
          frameStyle: 'none',
          bgColor: item.bgColor ?? '#ffffff',
          fgColor: item.fgColor ?? '#000000',
          timestamp: false,
        })
        if (result.ok) {
          const blob = await new Promise<Blob | null>((resolve) =>
            tmp.toBlob(resolve, 'image/png'),
          )
          if (blob) {
            const idx = String(i + 1).padStart(2, '0')
            zip.file(`qr-${idx}-${item.type}.png`, blob)
          }
        }
        zip.file(`qr-${String(i + 1).padStart(2, '0')}-${item.type}.txt`, item.payload)
      }
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, `nextgen-qr-batch-${Date.now()}.zip`)
      toast.success(
        isBn ? `ZIP ডাউনলোড হয়েছে (${bn(history.length, isBn)} আইটেম)` : `ZIP downloaded (${history.length} items)`,
      )
      trackClick('qr_download', 'qr_batch_zip', { count: history.length })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'ZIP failed')
    }
  }

  /* ---------- Config JSON export ---------- */
  const exportConfigJson = () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const config = {
      contentType: activeType,
      formData,
      size,
      errorLevel,
      moduleStyle,
      frameStyle,
      bgColor,
      fgColor,
      logoIncluded: !!logoDataUrl,
      timestamp: showTimestamp,
      exportedAt: new Date().toISOString(),
      generator: 'NextGen Digital Studio QR Code Generator',
    }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    saveAs(blob, `qr-config-${activeType}-${Date.now()}.json`)
    toast.success(isBn ? 'কনফিগ JSON ডাউনলোড হয়েছে' : 'Config JSON downloaded')
    trackClick('qr_download', 'qr_config_json', { type: activeType })
  }

  /* ---------- Keyboard shortcuts: ⌘+K focus, ⌘+↵ generate ---------- */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      if (e.key === 'k' || e.key === 'K') {
        // Don't hijack when user is typing in a color input or textarea
        const target = e.target as HTMLElement | null
        if (target && (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'color')) return
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>(
          '#qr-url, #qr-text, #qr-wifi-ssid, #qr-vc-name, #qr-em-to, #qr-ph, #qr-sms-ph, #qr-geo-lat, #qr-ev-title',
        )
        if (input) {
          input.focus()
          input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        generateAgainRef.current?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const saveHistory = React.useCallback(
    (item: HistoryItem) => {
      setHistory((prev) => {
        const next = [item, ...prev.filter((p) => p.payload !== item.payload)].slice(0, HISTORY_MAX)
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [],
  )

  const addToHistory = () => {
    if (!payload) return
    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: activeType,
      data: { ...formData },
      payload,
      preview: previewDataUrl,
      timestamp: Date.now(),
      size,
      errorLevel,
      moduleStyle,
      frameStyle,
      bgColor,
      fgColor,
    }
    saveHistory(item)
  }

  const restoreHistory = (item: HistoryItem) => {
    setActiveType(item.type)
    setFormData((prev) => ({ ...prev, ...item.data }))
    if (item.size) setSize(item.size)
    if (item.errorLevel) setErrorLevel(item.errorLevel)
    if (item.moduleStyle) setModuleStyle(item.moduleStyle)
    if (item.frameStyle) setFrameStyle(item.frameStyle)
    if (item.bgColor) setBgColor(item.bgColor)
    if (item.fgColor) setFgColor(item.fgColor)
    toast.success(isBn ? 'হিস্ট্রি রিস্টোর হয়েছে' : 'History restored')
  }

  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch {
      /* ignore */
    }
    toast.success(isBn ? 'হিস্ট্রি মুছে ফেলা হয়েছে' : 'History cleared')
  }

  /* ---------- Download handlers ---------- */
  const downloadPng = async () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const result = await renderQrToCanvas(canvas, payload, buildOpts())
    if (!result.ok) {
      toast.error(result.error ?? 'Generation failed')
      return
    }
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `qr-code-${activeType}-${Date.now()}.png`)
        toast.success(isBn ? 'PNG ডাউনলোড হয়েছে' : 'PNG downloaded')
        addToHistory()
        trackClick('qr_download', `qr_png_${activeType}`, { type: activeType, size })
      }
    }, 'image/png')
  }

  const downloadSvg = () => {
    if (!payload) {
      toast.error(isBn ? 'প্রথমে কনটেন্ট লিখুন' : 'Enter content first')
      return
    }
    try {
      const svg = generateSvg(payload, buildOpts())
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      saveAs(blob, `qr-code-${activeType}-${Date.now()}.svg`)
      toast.success(isBn ? 'SVG ডাউনলোড হয়েছে' : 'SVG downloaded')
      addToHistory()
      trackClick('qr_download', `qr_svg_${activeType}`, { type: activeType, size })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'SVG generation failed')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />
      <FloatingButtons />

      <main className="flex-1">
        {/* ============================================================ */}
        {/* HERO                                                          */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/20 dark:via-background" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-5xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
            <div className="flex flex-col items-center text-center">
              <LandingEyebrow>
                <Sparkles className="h-3 w-3" />
                {isBn ? 'ফ্রি টুল · QR জেনারেটর' : 'Free Tool · QR Generator'}
              </LandingEyebrow>

              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  {isBn ? 'ফ্রি QR কোড জেনারেটর' : 'Free QR Code Generator'}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {isBn
                  ? 'URL, টেক্সট, WiFi, vCard, ইমেইল, ফোন, SMS, লোকেশন ও ইভেন্টের জন্য কাস্টম QR কোড তৈরি করুন — সম্পূর্ণ আপনার ব্রাউজারে। প্রাইভেসি-ফার্স্ট, PNG ও SVG ডাউনলোড।'
                  : 'Create custom QR codes for URLs, text, WiFi, vCards, email, phone, SMS, locations and events — directly in your browser. Privacy-first. PNG + SVG downloads.'}
              </p>

              {/* CTA buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Button
                  onClick={scrollToGenerator}
                  className="h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.03]"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  {isBn ? 'এখনই জেনারেট করুন' : 'Start Generating'}
                </Button>
                <a
                  href="#qr-types"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-background/60 px-7 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted"
                >
                  {isBn ? '৯ ধরনের QR দেখুন' : 'View 9 QR Types'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {TRUST_BADGES.map((b) => {
                  const Icon = b.icon
                  return (
                    <div
                      key={b.labelEn}
                      className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 p-4 backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <div className="font-heading text-lg font-bold">
                        {isBn ? b.valueBn : b.valueEn}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isBn ? b.labelBn : b.labelEn}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MAIN GENERATOR                                                */}
        {/* ============================================================ */}
        <section ref={generatorRef} className="relative scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <LandingEyebrow>
                <Cpu className="h-3 w-3" />
                {isBn ? 'জেনারেটর' : 'Generator'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'আপনার QR কোড তৈরি করুন' : 'Build your QR code'}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {isBn
                  ? 'টাইপ সিলেক্ট করুন, কনটেন্ট লিখুন, লাইভ প্রিভিউ দেখুন, ডাউনলোড করুন।'
                  : 'Pick a type, enter content, watch the live preview, download.'}
              </p>

              {/* Mode toggle: Generator / Scanner */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-full border border-border/60 bg-card/60 p-1">
                  <button
                    type="button"
                    onClick={() => setMode('generator')}
                    className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition-colors ${mode === 'generator' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <QrCode className="mr-1.5 h-4 w-4" />
                    {isBn ? 'জেনারেটর' : 'Generator'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('scanner')}
                    className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition-colors ${mode === 'scanner' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <ScanLine className="mr-1.5 h-4 w-4" />
                    {isBn ? 'স্ক্যানার' : 'Scanner'}
                  </button>
                </div>

                {/* Keyboard shortcuts button */}
                <button
                  type="button"
                  onClick={() => setShowShortcuts(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={isBn ? 'কীবোর্ড শর্টকাট দেখুন' : 'View keyboard shortcuts'}
                >
                  <Keyboard className="h-4 w-4" />
                  {isBn ? 'শর্টকাট' : 'Shortcuts'}
                </button>
              </div>
            </div>

            {mode === 'generator' ? (
            <div className="grid gap-6 lg:grid-cols-5">
              {/* LEFT: Form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
                  {/* Content type selector */}
                  <Tabs value={activeType} onValueChange={(v) => setActiveType(v as QrType)}>
                    <div className="mb-5">
                      <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {isBn ? 'কনটেন্ট টাইপ' : 'Content Type'}
                      </Label>
                      <TabsList className="grid h-auto w-full grid-cols-3 gap-1.5 sm:grid-cols-3 md:grid-cols-3">
                        {QR_TYPES.map((q) => {
                          const Icon = q.icon
                          return (
                            <TabsTrigger
                              key={q.key}
                              value={q.key}
                              className="flex h-auto flex-col items-center gap-1 px-2 py-2.5 text-xs sm:flex-row sm:gap-2 sm:px-3"
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">
                                {isBn ? q.labelBn : q.labelEn}
                              </span>
                            </TabsTrigger>
                          )
                        })}
                      </TabsList>
                    </div>

                    {/* Form per type */}
                    {QR_TYPES.map((q) => (
                      <TabsContent key={q.key} value={q.key} className="mt-0 focus-visible:outline-none">
                        <TypeForm
                          type={q.key}
                          data={formData}
                          setField={setField}
                          isBn={isBn}
                        />
                      </TabsContent>
                    ))}
                  </Tabs>

                  {/* Options */}
                  <Separator className="my-5" />

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Size */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {isBn ? 'সাইজ' : 'Size'}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-foreground"
                              aria-label={isBn ? 'সাইজ কি?' : 'What is size?'}
                            >
                              <HelpCircle className="h-3.5 w-3.5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 text-xs" side="top">
                            <p className="font-semibold">
                              {isBn ? 'QR সাইজ কী?' : 'What is QR Size?'}
                            </p>
                            <p className="mt-1 text-muted-foreground">
                              {isBn
                                ? 'সাইজ বড় হলে QR কোড বড় হয় এবং দূর থেকে স্ক্যান করা সহজ হয়। Small (২০০px) মোবাইলের জন্য, Medium (৩০০px) সাধারণ ব্যবহারের জন্য, Large (৪০০px) প্রিন্ট ও পোস্টারের জন্য আদর্শ।'
                                : 'Larger size means a bigger QR code that is easier to scan from a distance. Small (200px) for mobile, Medium (300px) for general use, Large (400px) ideal for print and posters.'}
                            </p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="200">
                            {isBn ? `ছোট (২০০px)` : 'Small (200px)'}
                          </SelectItem>
                          <SelectItem value="300">
                            {isBn ? `মাঝারি (৩০০px)` : 'Medium (300px)'}
                          </SelectItem>
                          <SelectItem value="400">
                            {isBn ? `বড় (৪০০px)` : 'Large (400px)'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Error correction */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {isBn ? 'Error Correction' : 'Error Correction'}
                      </Label>
                      <Select value={errorLevel} onValueChange={(v) => setErrorLevel(v as ErrorLevel)}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L · {isBn ? '৭%' : '7%'}</SelectItem>
                          <SelectItem value="M">M · {isBn ? '১৫%' : '15%'}</SelectItem>
                          <SelectItem value="Q">Q · {isBn ? '২৫%' : '25%'}</SelectItem>
                          <SelectItem value="H">H · {isBn ? '৩০%' : '30%'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Module style */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {isBn ? 'মডিউল স্টাইল' : 'Module Style'}
                      </Label>
                      <Select value={moduleStyle} onValueChange={(v) => setModuleStyle(v as ModuleStyle)}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">
                            {isBn ? 'বর্গাকার' : 'Square'}
                          </SelectItem>
                          <SelectItem value="rounded">
                            {isBn ? 'গোলাকার কোণ' : 'Rounded'}
                          </SelectItem>
                          <SelectItem value="dot">
                            {isBn ? 'বিন্দু' : 'Dot'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Frame style */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {isBn ? 'ফ্রেম স্টাইল' : 'Frame Style'}
                      </Label>
                      <Select value={frameStyle} onValueChange={(v) => setFrameStyle(v as FrameStyle)}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{isBn ? 'কিছু না' : 'None'}</SelectItem>
                          <SelectItem value="rounded">{isBn ? 'গোলাকার' : 'Rounded'}</SelectItem>
                          <SelectItem value="gradient">{isBn ? 'গ্রেডিয়েন্ট' : 'Gradient'}</SelectItem>
                          <SelectItem value="dotted">{isBn ? 'ডটেড' : 'Dotted'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Action row: Try Example · Clear · Generate Again */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={tryExample} variant="outline" size="sm" className="h-9">
                      <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'উদাহরণ' : 'Try Example'}
                    </Button>
                    <Button onClick={clearAll} variant="ghost" size="sm" className="h-9 text-muted-foreground">
                      <Eraser className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'মুছুন' : 'Clear'}
                    </Button>
                    <Button
                      onClick={generateAgain}
                      size="sm"
                      className="ml-auto h-9 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      disabled={!payload}
                    >
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'আবার জেনারেট' : 'Generate Again'}
                    </Button>
                  </div>

                  {/* Capacity indicator */}
                  <div className="mt-5 rounded-xl border border-border/40 bg-muted/30 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground">
                        {isBn ? 'ক্যাপাসিটি' : 'Capacity'}
                      </span>
                      <span className={`font-mono font-semibold ${capacityPct > 80 ? 'text-rose-500' : capacityPct > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {bn(payloadBytes, isBn)} / {bn(MAX_BYTES, isBn)} {isBn ? 'বাইট' : 'bytes'}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${capacityPct > 80 ? 'bg-rose-500' : capacityPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.max(2, capacityPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Logo upload */}
                  <div className="mt-5 rounded-xl border border-border/40 bg-muted/20 p-4">
                    <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <ImageIcon className="mr-1 inline h-3 w-3" />
                      {isBn ? 'লোগো (অপশনাল)' : 'Logo (optional)'}
                    </Label>
                    {logoDataUrl ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={logoDataUrl}
                          alt={isBn ? 'লোগো প্রিভিউ' : 'Logo preview'}
                          className="h-12 w-12 rounded-md border border-border bg-white object-contain p-1"
                        />
                        <div className="flex-1 text-xs text-muted-foreground">
                          {isBn ? 'Error level স্বয়ংক্রিয় H তে সেট হয়েছে' : 'Error level auto-set to H'}
                        </div>
                        <Button
                          onClick={removeLogo}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-rose-500 hover:text-rose-600"
                          aria-label={isBn ? 'লোগো সরান' : 'Remove logo'}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-border/60 bg-background/40 px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-amber-400 hover:bg-amber-50/40 dark:hover:bg-amber-950/20">
                        <Upload className="mr-1.5 h-4 w-4" />
                        {isBn ? 'PNG/JPG/SVG আপলোড করুন (সর্বোচ্চ ২MB)' : 'Upload PNG/JPG/SVG (max 2MB)'}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) handleLogoUpload(f)
                            e.target.value = ''
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Advanced Options */}
                  <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen} className="mt-4 rounded-xl border border-border/40 bg-muted/20 p-4">
                    <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-semibold">
                      <span className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        {isBn ? 'অ্যাডভান্সড অপশন' : 'Advanced Options'}
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-90' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      {/* Timestamp toggle */}
                      <div className="flex items-center justify-between gap-3">
                        <Label htmlFor="qr-timestamp" className="text-sm">
                          {isBn ? 'টাইমস্ট্যাম্প ওয়াটারমার্ক' : 'Timestamp Watermark'}
                        </Label>
                        <Switch
                          id="qr-timestamp"
                          checked={showTimestamp}
                          onCheckedChange={setShowTimestamp}
                        />
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="mb-1.5 block text-xs font-medium">
                            {isBn ? 'ব্যাকগ্রাউন্ড কালার' : 'Background Color'}
                          </Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="h-9 w-9 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
                              aria-label={isBn ? 'ব্যাকগ্রাউন্ড কালার' : 'Background color'}
                            />
                            <Input
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="h-9 font-mono text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-xs font-medium">
                            {isBn ? 'ফোরগ্রাউন্ড কালার' : 'Foreground Color'}
                          </Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="h-9 w-9 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
                              aria-label={isBn ? 'ফোরগ্রাউন্ড কালার' : 'Foreground color'}
                            />
                            <Input
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="h-9 font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

              {/* RIGHT: Preview */}
              <div className="lg:col-span-2">
                <div className="sticky top-20 rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-heading text-lg font-bold">
                      {isBn ? 'লাইভ প্রিভিউ' : 'Live Preview'}
                    </h3>
                    <ScanBadge status={scanStatus} isBn={isBn} />
                  </div>

                  {/* Canvas display — frame style applied as CSS wrapper */}
                  <div
                    className={`flex aspect-square w-full items-center justify-center bg-white p-4 ${
                      frameStyle === 'none'
                        ? 'rounded-xl border border-border/40'
                        : frameStyle === 'rounded'
                          ? 'rounded-xl border-4 border-amber-500'
                          : frameStyle === 'gradient'
                            ? 'rounded-xl p-[4px] bg-gradient-to-br from-amber-500 via-orange-500 to-amber-500'
                            : 'rounded-xl border-4 border-dotted border-emerald-500'
                    }`}
                  >
                    {payload ? (
                      <canvas
                        ref={canvasRef}
                        className="h-auto w-full max-w-[280px] bg-white"
                        aria-label={isBn ? 'জেনারেটেড QR কোড' : 'Generated QR code'}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                        <QrCode className="h-16 w-16 opacity-30" />
                        <p className="text-xs">
                          {isBn
                            ? `${activeTypeMeta.emoji} ${activeTypeMeta.labelBn} ফর্ম পূরণ করুন`
                            : `Fill the ${activeTypeMeta.emoji} ${activeTypeMeta.labelEn} form`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Loading + error states */}
                  {isGenerating && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      {isBn ? 'জেনারেট হচ্ছে...' : 'Generating...'}
                    </div>
                  )}
                  {genError && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{genError}</span>
                    </div>
                  )}

                  {/* Download buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                      onClick={downloadPng}
                      disabled={!payload}
                      className="h-11 bg-gradient-to-r from-amber-500 to-orange-500 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <FileImage className="mr-1.5 h-4 w-4" />
                      PNG
                    </Button>
                    <Button
                      onClick={downloadSvg}
                      disabled={!payload}
                      variant="outline"
                      className="h-11 border-amber-300 text-sm font-semibold text-amber-700 hover:bg-amber-50 disabled:opacity-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/30"
                    >
                      <FileCode className="mr-1.5 h-4 w-4" />
                      SVG
                    </Button>
                  </div>

                  {/* Additional action buttons */}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button
                      onClick={copyImageToClipboard}
                      disabled={!payload}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'কপি' : 'Copy Image'}
                    </Button>
                    <Button
                      onClick={printQr}
                      disabled={!payload}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Printer className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'প্রিন্ট' : 'Print'}
                    </Button>
                    <Button
                      onClick={downloadAnimatedSvg}
                      disabled={!payload}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'অ্যানিমেটেড' : 'Animated SVG'}
                    </Button>
                    <Button
                      onClick={downloadBatchZip}
                      disabled={history.length === 0}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Archive className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'ZIP' : 'Batch ZIP'}
                    </Button>
                  </div>

                  {/* Save Favorite + Config JSON */}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button
                      onClick={saveFavorite}
                      disabled={!payload}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Star className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'সেভ ফেভারিট' : 'Save Favorite'}
                    </Button>
                    <Button
                      onClick={exportConfigJson}
                      disabled={!payload}
                      variant="outline"
                      size="sm"
                      className="h-10"
                    >
                      <Code2 className="mr-1.5 h-3.5 w-3.5" />
                      {isBn ? 'কনফিগ JSON' : 'Config JSON'}
                    </Button>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    {isBn
                      ? 'PNG: সাদা ব্যাকগ্রাউন্ড + কোয়াইট জোন · SVG: ভেক্টর, অসীম স্কেল'
                      : 'PNG: white background + quiet zone · SVG: vector, infinite scale'}
                  </p>

                  {/* Keyboard shortcuts hint */}
                  <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
                    <Keyboard className="h-3 w-3" />
                    {isBn ? '⌘ + K ফোকাস · ⌘ + ↵ জেনারেট' : '⌘ + K focus · ⌘ + ↵ generate'}
                  </p>

                  {/* Encoded payload display */}
                  {payload && (
                    <div className="mt-4 rounded-xl border border-border/40 bg-muted/20 p-3">
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          <Code2 className="mr-1 inline h-3 w-3" />
                          {isBn ? 'এনকোডেড পেলোড' : 'Encoded Payload'}
                        </Label>
                        <button
                          onClick={copyPayload}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 hover:underline dark:text-amber-400"
                        >
                          <Copy className="h-3 w-3" />
                          {isBn ? 'কপি' : 'Copy'}
                        </button>
                      </div>
                      <Textarea
                        value={payload}
                        readOnly
                        rows={3}
                        className="resize-none font-mono text-[11px]"
                        aria-label={isBn ? 'এনকোডেড পেলোড' : 'Encoded payload'}
                      />
                    </div>
                  )}

                  {/* History */}
                  {history.length > 0 && (
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <History className="h-3 w-3" />
                          {isBn ? 'সাম্প্রতিক' : 'Recent'}
                        </span>
                        <button
                          onClick={clearHistory}
                          className="text-[11px] text-muted-foreground hover:text-rose-500"
                        >
                          {isBn ? 'মুছুন' : 'Clear'}
                        </button>
                      </div>
                      <div className="grid max-h-48 grid-cols-4 gap-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                        {history.map((item) => {
                          const meta = QR_TYPES.find((q) => q.key === item.type)!
                          return (
                            <button
                              key={item.id}
                              onClick={() => restoreHistory(item)}
                              title={`${isBn ? meta.labelBn : meta.labelEn} · ${new Date(item.timestamp).toLocaleString()}`}
                              className="group relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-white p-1 transition-transform hover:scale-105 hover:border-amber-400"
                            >
                              {item.preview ? (
                                <img
                                  src={item.preview}
                                  alt={isBn ? meta.labelBn : meta.labelEn}
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <div className="grid h-full place-items-center text-lg">
                                  {meta.emoji}
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Favorites */}
                  {favorites.length > 0 && (
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {isBn ? 'ফেভারিট' : 'Favorites'}
                        </span>
                      </div>
                      <div className="max-h-48 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                        {favorites.map((fav) => {
                          const meta = QR_TYPES.find((q) => q.key === fav.type)!
                          return (
                            <div
                              key={fav.id}
                              className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/60 px-3 py-2 text-xs"
                            >
                              <button
                                onClick={() => restoreFavorite(fav)}
                                className="flex flex-1 items-center gap-2 text-left hover:text-amber-600 dark:hover:text-amber-400"
                              >
                                <span aria-hidden>{meta.emoji}</span>
                                <span className="truncate font-medium">{fav.name}</span>
                                <span className="ml-auto shrink-0 text-muted-foreground">
                                  {bn(fav.size, isBn)}px · {fav.errorLevel}
                                </span>
                              </button>
                              <button
                                onClick={() => deleteFavorite(fav.id)}
                                className="shrink-0 text-muted-foreground hover:text-rose-500"
                                aria-label={isBn ? 'ফেভারিট মুছুন' : 'Delete favorite'}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            ) : (
              <ScannerSection isBn={isBn} />
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* HOW IT WORKS                                                  */}
        {/* ============================================================ */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <LandingEyebrow>
                <Zap className="h-3 w-3" />
                {isBn ? '৩ ধাপ' : '3 Steps'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'কীভাবে কাজ করে' : 'How it works'}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.n}
                    className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="absolute right-5 top-5 font-heading text-4xl font-extrabold text-amber-500/15">
                      {bn(s.n, isBn)}
                    </div>
                    <h3 className="font-heading text-lg font-bold">
                      {isBn ? s.titleBn : s.titleEn}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {isBn ? s.descBn : s.descEn}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* QR TYPES                                                      */}
        {/* ============================================================ */}
        <section id="qr-types" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <LandingEyebrow>
                <QrCode className="h-3 w-3" />
                {isBn ? '৯ ধরনের QR' : '9 QR Types'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'যেকোনো কনটেন্টের জন্য QR' : 'A QR for every purpose'}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {isBn
                  ? 'প্রতিটি ক্যাটাগরির জন্য আলাদা ফরম্যাট — সব স্ট্যান্ডার্ড স্ক্যানার দিয়ে স্ক্যানযোগ্য।'
                  : 'A dedicated format for each category — all scannable with any standard QR scanner.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {QR_TYPES.map((q) => {
                const Icon = q.icon
                return (
                  <button
                    key={q.key}
                    onClick={() => {
                      setActiveType(q.key)
                      scrollToGenerator()
                    }}
                    className="group flex flex-col items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-2xl">
                        <span aria-hidden>{q.emoji}</span>
                      </div>
                      <Icon className="h-5 w-5 text-amber-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-amber-400" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">
                      {isBn ? q.labelBn : q.labelEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isBn ? q.descBn : q.descEn}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {isBn ? 'তৈরি করুন' : 'Create'}
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ABOUT — What is a QR Code? / Privacy / Tip                   */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* What is a QR Code? */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                  <QrCode className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {isBn ? 'QR Code কী?' : 'What is a QR Code?'}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isBn
                    ? 'QR Code (Quick Response Code) হলো একটি two-dimensional barcode, যেখানে Text বা URL-এর মতো তথ্য encode করা যায় এবং compatible device দিয়ে scan করা যায়।'
                    : 'A QR Code (Quick Response Code) is a two-dimensional barcode that stores text, URLs, contact info and more — scannable by any phone camera.'}
                </p>
              </div>

              {/* Privacy & Processing */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {isBn ? 'প্রাইভেসি ও প্রসেসিং' : 'Privacy & Processing'}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isBn
                    ? 'QR generation আপনার browser-এই হয়। এই app-এ কোনো backend বা database নেই যেখানে আপনার input সংরক্ষিত হবে। তবে চালু করতে ইন্টারনেট সংযোগ প্রয়োজন।'
                    : 'QR generation happens in your browser. No backend or database stores your input. An internet connection is needed to initially load the app.'}
                </p>
              </div>

              {/* Tip */}
              <div className="rounded-2xl border border-amber-300/60 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-800/40 dark:from-amber-950/20 dark:to-orange-950/10">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {isBn ? 'টিপস' : 'Tip'}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {isBn
                    ? 'QR Code ব্যবহার করার আগে encoded URL বা content যাচাই করুন। উচ্চ error-correction (H) বেশি damage tolerance দেয়।'
                    : 'Verify the encoded URL or content before using the QR Code. Higher error-correction (H) gives more damage tolerance.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ                                                           */}
        {/* ============================================================ */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <LandingEyebrow>
                <ShieldCheck className="h-3 w-3" />
                {isBn ? 'প্রশ্নোত্তর' : 'FAQ'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently asked questions'}
              </h2>
            </div>
            {mounted ? (
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {isBn ? f.qBn : f.qEn}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {isBn ? f.aBn : f.aEn}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="w-full space-y-3">
                {FAQS.map((f, i) => (
                  <div key={i} className="rounded-lg border border-border/60 p-4">
                    <p className="text-base font-semibold">{isBn ? f.qBn : f.qEn}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* FOUNDER PROMO                                                 */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50 via-card to-orange-50 p-8 shadow-sm dark:border-amber-800/40 dark:from-amber-950/30 dark:via-card dark:to-orange-950/20 sm:p-10">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative grid gap-8 md:grid-cols-2">
                <div>
                  <Badge className="mb-4 bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {isBn ? 'NextGen Digital Studio' : 'NextGen Digital Studio'}
                  </Badge>
                  <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                    {isBn
                      ? 'NextGen Digital Studio দ্বারা নির্মিত'
                      : 'Built by NextGen Digital Studio'}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {isBn
                      ? 'বাংলাদেশের প্রিমিয়াম AI সেলস অটোমেশন এজেন্সি। আমরা ব্যবসাকে AI দিয়ে স্কেল করি — নতুন লোক নিয়োগ নয়। এই ফ্রি টুল আমাদের প্রতিশ্রুতির অংশ: প্রতিটি উদ্যোক্তার জন্য প্রিমিয়াম টুল সহজলভ্য।'
                      : "Bangladesh's premium AI sales automation agency. We help businesses scale with AI — not more hires. This free tool is part of our commitment: premium tools accessible to every entrepreneur."}
                  </p>

                  <div className="mt-5 rounded-xl border border-border/60 bg-card/80 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isBn ? 'প্রতিষ্ঠাতা ও সিইও' : 'Founder & CEO'}
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold">
                      MD. Nazmul Islam Taj
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isBn
                        ? 'Bangladesh\'s AI Revenue System Architect · Jessore'
                        : "Bangladesh's AI Revenue System Architect · Jessore"}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/founder"
                      onClick={() => trackClick('qr_founder_link', 'qr_founder_page', {})}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-transform hover:scale-[1.02]"
                    >
                      {isBn ? 'প্রতিষ্ঠাতার সাথে পরিচিত হোন' : 'Meet the Founder'}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                    <Link
                      href="/"
                      onClick={() => trackClick('qr_home_link', 'qr_home_page', {})}
                      className="inline-flex h-10 items-center justify-center rounded-full border border-border/60 bg-background/60 px-5 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted"
                    >
                      <Globe className="mr-1.5 h-4 w-4" />
                      {isBn ? 'হোমপেজ' : 'Visit Home'}
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isBn ? 'আমাদের সেবাসমূহ' : 'Our Services'}
                  </p>
                  <div className="grid gap-2">
                    {NGS_SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => trackClick('qr_service_link', `qr_service_${s.href}`, {})}
                        className="group flex items-center justify-between rounded-lg border border-border/40 bg-card/60 px-3 py-2.5 text-sm transition-colors hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                      >
                        <span className="font-medium">
                          {isBn ? s.labelBn : s.labelEn}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />

      {/* Keyboard shortcuts dialog */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-amber-500" />
              {isBn ? 'কীবোর্ড শর্টকাট' : 'Keyboard Shortcuts'}
            </DialogTitle>
            <DialogDescription>
              {isBn
                ? 'দ্রুত কাজের জন্য এই শর্টকাটগুলো ব্যবহার করুন।'
                : 'Use these shortcuts for faster workflow.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {[
              { keys: ['⌘', 'K'], label: isBn ? 'ইনপুট ফিল্ডে ফোকাস' : 'Focus input field' },
              { keys: ['⌘', '↵'], label: isBn ? 'QR কোড জেনারেট করুন' : 'Generate QR code' },
              { keys: ['Esc'], label: isBn ? 'ডায়ালগ বন্ধ করুন' : 'Close dialog' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                <span className="text-sm">{s.label}</span>
                <div className="flex gap-1">
                  {s.keys.map((k, j) => (
                    <kbd key={j} className="rounded-md border border-border bg-muted px-2 py-1 text-xs font-bold">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scan status badge                                                          */
/* -------------------------------------------------------------------------- */

function ScanBadge({ status, isBn }: { status: ScanStatus; isBn: boolean }) {
  if (status === 'idle') {
    return (
      <Badge variant="outline" className="border-border/60 text-muted-foreground">
        <Clock className="mr-1 h-3 w-3" />
        {isBn ? 'অপেক্ষমাণ' : 'Idle'}
      </Badge>
    )
  }
  if (status === 'verifying') {
    return (
      <Badge variant="outline" className="border-amber-400/50 text-amber-600 dark:text-amber-400">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        {isBn ? 'যাচাই হচ্ছে...' : 'Verifying...'}
      </Badge>
    )
  }
  if (status === 'verified') {
    return (
      <Badge className="border-emerald-400 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        {isBn ? 'স্ক্যান যাচাই ✓' : 'Scan verified ✓'}
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="border-rose-400/50 text-rose-600 dark:text-rose-400">
      <AlertCircle className="mr-1 h-3 w-3" />
      {isBn ? 'স্ক্যান ব্যর্থ' : 'Scan failed'}
    </Badge>
  )
}

/* -------------------------------------------------------------------------- */
/*  Per-type form fields map                                                   */
/* -------------------------------------------------------------------------- */

const TYPE_FIELDS: Record<QrType, string[]> = {
  url: ['url'],
  text: ['text'],
  wifi: ['wifiSsid', 'wifiPassword', 'wifiEncryption', 'wifiHidden'],
  vcard: ['vcardName', 'vcardPhone', 'vcardEmail', 'vcardOrg', 'vcardUrl'],
  email: ['emailTo', 'emailSubject', 'emailBody'],
  phone: ['phone'],
  sms: ['smsPhone', 'smsMessage'],
  geo: ['geoLat', 'geoLng'],
  event: ['eventTitle', 'eventLocation', 'eventStart', 'eventEnd', 'eventDescription'],
}

/* -------------------------------------------------------------------------- */
/*  Type form — renders fields based on QR type                                */
/* -------------------------------------------------------------------------- */

function TypeForm({
  type,
  data,
  setField,
  isBn,
}: {
  type: QrType
  data: Record<string, string>
  setField: (k: string, v: string) => void
  isBn: boolean
}) {
  switch (type) {
    case 'url':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-url" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'ওয়েবসাইট লিংক' : 'Website URL'}
            </Label>
            <Input
              id="qr-url"
              value={data.url ?? ''}
              onChange={(e) => setField('url', e.target.value)}
              placeholder="example.com"
              className="h-11"
              inputMode="url"
              autoComplete="url"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {isBn ? 'https:// অটোমেটিক যোগ হবে' : 'https:// will be auto-added'}
            </p>
          </div>
        </div>
      )
    case 'text':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-text" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'টেক্সট' : 'Text'}
            </Label>
            <Textarea
              id="qr-text"
              value={data.text ?? ''}
              onChange={(e) => setField('text', e.target.value)}
              placeholder={isBn ? 'যেকোনো টেক্সট লিখুন...' : 'Enter any text...'}
              rows={5}
            />
          </div>
        </div>
      )
    case 'wifi':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-wifi-ssid" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'নেটওয়ার্ক নাম (SSID)' : 'Network Name (SSID)'}
            </Label>
            <Input
              id="qr-wifi-ssid"
              value={data.wifiSsid ?? ''}
              onChange={(e) => setField('wifiSsid', e.target.value)}
              placeholder={isBn ? 'আপনার WiFi নাম' : 'MyWiFi'}
              className="h-11"
            />
          </div>
          <div>
            <Label htmlFor="qr-wifi-pw" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
            </Label>
            <Input
              id="qr-wifi-pw"
              value={data.wifiPassword ?? ''}
              onChange={(e) => setField('wifiPassword', e.target.value)}
              placeholder={isBn ? 'WiFi পাসওয়ার্ড' : 'WiFi password'}
              className="h-11"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="qr-wifi-enc" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'এনক্রিপশন' : 'Encryption'}
              </Label>
              <Select value={data.wifiEncryption ?? 'WPA'} onValueChange={(v) => setField('wifiEncryption', v)}>
                <SelectTrigger id="qr-wifi-enc" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">{isBn ? 'কোনো পাসওয়ার্ড নেই' : 'None'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="qr-wifi-hidden" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'হিডেন নেটওয়ার্ক' : 'Hidden Network'}
              </Label>
              <Select value={data.wifiHidden ?? 'false'} onValueChange={(v) => setField('wifiHidden', v)}>
                <SelectTrigger id="qr-wifi-hidden" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">{isBn ? 'না' : 'No'}</SelectItem>
                  <SelectItem value="true">{isBn ? 'হ্যাঁ' : 'Yes'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    case 'vcard':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-vc-name" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'পূর্ণ নাম' : 'Full Name'}
            </Label>
            <Input
              id="qr-vc-name"
              value={data.vcardName ?? ''}
              onChange={(e) => setField('vcardName', e.target.value)}
              placeholder={isBn ? 'যেমন: মোঃ নাজমুল ইসলাম' : 'e.g., John Doe'}
              className="h-11"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="qr-vc-phone" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'ফোন' : 'Phone'}
              </Label>
              <Input
                id="qr-vc-phone"
                value={data.vcardPhone ?? ''}
                onChange={(e) => setField('vcardPhone', e.target.value)}
                placeholder="+8801XXXXXXXXX"
                className="h-11"
                inputMode="tel"
              />
            </div>
            <div>
              <Label htmlFor="qr-vc-email" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'ইমেইল' : 'Email'}
              </Label>
              <Input
                id="qr-vc-email"
                value={data.vcardEmail ?? ''}
                onChange={(e) => setField('vcardEmail', e.target.value)}
                placeholder="you@example.com"
                className="h-11"
                inputMode="email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="qr-vc-org" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'প্রতিষ্ঠান' : 'Organization'}
              </Label>
              <Input
                id="qr-vc-org"
                value={data.vcardOrg ?? ''}
                onChange={(e) => setField('vcardOrg', e.target.value)}
                placeholder={isBn ? 'কোম্পানি নাম' : 'Company name'}
                className="h-11"
              />
            </div>
            <div>
              <Label htmlFor="qr-vc-url" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'ওয়েবসাইট' : 'Website'}
              </Label>
              <Input
                id="qr-vc-url"
                value={data.vcardUrl ?? ''}
                onChange={(e) => setField('vcardUrl', e.target.value)}
                placeholder="example.com"
                className="h-11"
                inputMode="url"
              />
            </div>
          </div>
        </div>
      )
    case 'email':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-em-to" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'প্রাপক' : 'Recipient'}
            </Label>
            <Input
              id="qr-em-to"
              value={data.emailTo ?? ''}
              onChange={(e) => setField('emailTo', e.target.value)}
              placeholder="someone@example.com"
              className="h-11"
              inputMode="email"
            />
          </div>
          <div>
            <Label htmlFor="qr-em-subj" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'সাবজেক্ট' : 'Subject'}
            </Label>
            <Input
              id="qr-em-subj"
              value={data.emailSubject ?? ''}
              onChange={(e) => setField('emailSubject', e.target.value)}
              placeholder={isBn ? 'ইমেইল সাবজেক্ট' : 'Email subject'}
              className="h-11"
            />
          </div>
          <div>
            <Label htmlFor="qr-em-body" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'বডি' : 'Body'}
            </Label>
            <Textarea
              id="qr-em-body"
              value={data.emailBody ?? ''}
              onChange={(e) => setField('emailBody', e.target.value)}
              placeholder={isBn ? 'ইমেইল বডি...' : 'Email body...'}
              rows={4}
            />
          </div>
        </div>
      )
    case 'phone':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-ph" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'ফোন নম্বর' : 'Phone Number'}
            </Label>
            <Input
              id="qr-ph"
              value={data.phone ?? ''}
              onChange={(e) => setField('phone', e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="h-11"
              inputMode="tel"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {isBn ? 'স্ক্যান করলে সাথে সাথে কল শুরু হবে' : 'Scanning will trigger a call instantly'}
            </p>
          </div>
        </div>
      )
    case 'sms':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-sms-ph" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'ফোন নম্বর' : 'Phone Number'}
            </Label>
            <Input
              id="qr-sms-ph"
              value={data.smsPhone ?? ''}
              onChange={(e) => setField('smsPhone', e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="h-11"
              inputMode="tel"
            />
          </div>
          <div>
            <Label htmlFor="qr-sms-msg" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'মেসেজ' : 'Message'}
            </Label>
            <Textarea
              id="qr-sms-msg"
              value={data.smsMessage ?? ''}
              onChange={(e) => setField('smsMessage', e.target.value)}
              placeholder={isBn ? 'SMS মেসেজ...' : 'SMS message...'}
              rows={3}
            />
          </div>
        </div>
      )
    case 'geo':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="qr-geo-lat" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'অক্ষাংশ (Lat)' : 'Latitude'}
              </Label>
              <Input
                id="qr-geo-lat"
                value={data.geoLat ?? ''}
                onChange={(e) => setField('geoLat', e.target.value)}
                placeholder="23.8103"
                className="h-11"
                inputMode="decimal"
              />
            </div>
            <div>
              <Label htmlFor="qr-geo-lng" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'দ্রাঘিমা (Lng)' : 'Longitude'}
              </Label>
              <Input
                id="qr-geo-lng"
                value={data.geoLng ?? ''}
                onChange={(e) => setField('geoLng', e.target.value)}
                placeholder="90.4125"
                className="h-11"
                inputMode="decimal"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {isBn
              ? 'টিপ: Google Maps-এ রাইট-ক্লিক করে অক্ষাংশ/দ্রাঘিমা কপি করুন।'
              : 'Tip: Right-click in Google Maps to copy lat/lng.'}
          </p>
        </div>
      )
    case 'event':
      return (
        <div className="space-y-3">
          <div>
            <Label htmlFor="qr-ev-title" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'ইভেন্ট শিরোনাম' : 'Event Title'}
            </Label>
            <Input
              id="qr-ev-title"
              value={data.eventTitle ?? ''}
              onChange={(e) => setField('eventTitle', e.target.value)}
              placeholder={isBn ? 'যেমন: বছরের সভা ২০২৫' : 'e.g., Annual Meeting 2025'}
              className="h-11"
            />
          </div>
          <div>
            <Label htmlFor="qr-ev-loc" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'লোকেশন' : 'Location'}
            </Label>
            <Input
              id="qr-ev-loc"
              value={data.eventLocation ?? ''}
              onChange={(e) => setField('eventLocation', e.target.value)}
              placeholder={isBn ? 'ভেন্যু ঠিকানা' : 'Venue address'}
              className="h-11"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="qr-ev-start" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'শুরু' : 'Start'}
              </Label>
              <Input
                id="qr-ev-start"
                type="datetime-local"
                value={data.eventStart ?? ''}
                onChange={(e) => setField('eventStart', e.target.value)}
                className="h-11"
              />
            </div>
            <div>
              <Label htmlFor="qr-ev-end" className="mb-1.5 block text-sm font-medium">
                {isBn ? 'শেষ' : 'End'}
              </Label>
              <Input
                id="qr-ev-end"
                type="datetime-local"
                value={data.eventEnd ?? ''}
                onChange={(e) => setField('eventEnd', e.target.value)}
                className="h-11"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="qr-ev-desc" className="mb-1.5 block text-sm font-medium">
              {isBn ? 'বর্ণনা' : 'Description'}
            </Label>
            <Textarea
              id="qr-ev-desc"
              value={data.eventDescription ?? ''}
              onChange={(e) => setField('eventDescription', e.target.value)}
              placeholder={isBn ? 'ইভেন্টের বিবরণ...' : 'Event description...'}
              rows={3}
            />
          </div>
        </div>
      )
    default:
      return null
  }
}

/* -------------------------------------------------------------------------- */
/*  Scanner section — camera + file upload QR decode                           */
/* -------------------------------------------------------------------------- */

function ScannerSection({ isBn }: { isBn: boolean }) {
  const [status, setStatus] = React.useState<ScannerStatus>('idle')
  const [result, setResult] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const [recent, setRecent] = React.useState<string[]>([])

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const scanCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const streamRef = React.useRef<MediaStream | null>(null)
  const rafRef = React.useRef<number | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const stopCamera = React.useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  const scanLoop = React.useCallback(() => {
    if (!videoRef.current || !scanCanvasRef.current) return
    const video = videoRef.current
    const canvas = scanCanvasRef.current
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(scanLoop)
      return
    }
    const w = video.videoWidth
    const h = video.videoHeight
    if (w === 0 || h === 0) {
      rafRef.current = requestAnimationFrame(scanLoop)
      return
    }
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, w, h)
    try {
      const imageData = ctx.getImageData(0, 0, w, h)
      const decoded = jsQR(imageData.data, w, h, { inversionAttempts: 'dontInvert' })
      if (decoded && decoded.data) {
        setStatus('detected')
        setResult(decoded.data)
        setRecent((prev) =>
          [decoded.data, ...prev.filter((p) => p !== decoded.data)].slice(0, 8),
        )
        stopCamera()
        return
      }
    } catch {
      /* ignore frame errors */
    }
    rafRef.current = requestAnimationFrame(scanLoop)
  }, [stopCamera])

  const startCamera = React.useCallback(async () => {
    setStatus('scanning')
    setError('')
    setResult('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        scanLoop()
      }
    } catch {
      setStatus('error')
      setError(
        isBn
          ? 'ক্যামেরা অ্যাক্সেস ব্যর্থ। ব্রাউজার অনুমতি দিন অথবা নিচের ইমেজ আপলোড বিকল্প ব্যবহার করুন।'
          : 'Camera access failed. Grant browser permission or use the Upload Image option below.',
      )
    }
  }, [isBn, scanLoop])

  // Cleanup on unmount
  React.useEffect(() => () => stopCamera(), [stopCamera])

  const handleFile = async (file: File) => {
    setStatus('scanning')
    setError('')
    setResult('')
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('not image')
      }
      const url = URL.createObjectURL(file)
      const img = await loadImage(url)
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no ctx')
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const decoded = jsQR(imageData.data, canvas.width, canvas.height, {
        inversionAttempts: 'attemptBoth',
      })
      URL.revokeObjectURL(url)
      if (decoded && decoded.data) {
        setStatus('detected')
        setResult(decoded.data)
        setRecent((prev) =>
          [decoded.data, ...prev.filter((p) => p !== decoded.data)].slice(0, 8),
        )
      } else {
        setStatus('error')
        setError(
          isBn ? 'এই ছবিতে কোনো QR কোড পাওয়া যায়নি' : 'No QR code found in this image',
        )
      }
    } catch {
      setStatus('error')
      setError(isBn ? 'ছবি পড়তে সমস্যা হয়েছে' : 'Failed to read image')
    }
  }

  const copyResult = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      toast.success(isBn ? 'কপি হয়েছে' : 'Copied')
    } catch {
      toast.error(isBn ? 'কপি ব্যর্থ' : 'Copy failed')
    }
  }

  const reset = () => {
    setStatus('idle')
    setResult('')
    setError('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* LEFT: Camera + upload */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
        <h3 className="mb-4 font-heading text-lg font-bold">
          {isBn ? 'ক্যামেরা স্ক্যান' : 'Camera Scan'}
        </h3>

        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border/40 bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted
          />
          {status === 'scanning' && (
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 bg-rose-500 shadow-[0_0_10px_2px_rgba(244,63,94,0.6)]"
                style={{ animation: 'qrScanLine 2s ease-in-out infinite' }}
              />
              <div className="absolute inset-8 rounded-xl border-2 border-amber-400/60" />
            </div>
          )}
          {status === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
              <Camera className="h-12 w-12" />
              <p className="text-sm">
                {isBn ? 'ক্যামেরা শুরু করুন বা ছবি আপলোড করুন' : 'Start camera or upload an image'}
              </p>
            </div>
          )}
          {status === 'detected' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-emerald-500/15 text-emerald-300">
              <CheckCircle2 className="h-12 w-12" />
              <p className="text-sm font-semibold">
                {isBn ? 'QR ডিটেক্ট হয়েছে' : 'QR detected'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {status !== 'scanning' ? (
            <Button
              onClick={startCamera}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            >
              <Camera className="mr-1.5 h-4 w-4" />
              {isBn ? 'ক্যামেরা শুরু' : 'Start Camera'}
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="destructive">
              <X className="mr-1.5 h-4 w-4" />
              {isBn ? 'স্টপ' : 'Stop'}
            </Button>
          )}

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            <Upload className="mr-1.5 h-4 w-4" />
            {isBn ? 'ছবি আপলোড' : 'Upload Image'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
              e.target.value = ''
            }}
          />
        </div>

        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {isBn
            ? 'প্রাইভেসি: স্ক্যান সম্পূর্ণ আপনার ব্রাউজারে — কিছুই সার্ভারে যায় না।'
            : 'Privacy: scanning happens entirely in your browser — nothing is uploaded.'}
        </p>

        {/* Hidden canvas for camera frame capture */}
        <canvas ref={scanCanvasRef} className="hidden" />

        {/* Scan line keyframes (injected once) */}
        <style>{`@keyframes qrScanLine{0%,100%{transform:translateY(-40%)}50%{transform:translateY(40%)}}`}</style>
      </div>

      {/* RIGHT: Result */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
        <h3 className="mb-4 font-heading text-lg font-bold">
          {isBn ? 'স্ক্যান ফলাফল' : 'Scan Result'}
        </h3>

        {status === 'detected' && result ? (
          <div className="space-y-3">
            <Badge className="border-emerald-400 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {isBn ? 'স্ক্যান সফল' : 'Scan successful'}
            </Badge>
            <Textarea
              value={result}
              readOnly
              rows={6}
              className="font-mono text-sm"
              aria-label={isBn ? 'ডিকোড করা টেক্সট' : 'Decoded text'}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={copyResult} size="sm">
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                {isBn ? 'কপি' : 'Copy'}
              </Button>
              {result.startsWith('http://') || result.startsWith('https://') ? (
                <a href={result} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">
                    <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
                    {isBn ? 'খুলুন' : 'Open'}
                  </Button>
                </a>
              ) : null}
              <Button onClick={reset} size="sm" variant="ghost">
                {isBn ? 'আবার স্ক্যান' : 'Scan again'}
              </Button>
            </div>
          </div>
        ) : status === 'scanning' ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p className="text-sm">
              {isBn ? 'স্ক্যান হচ্ছে... QR কোড ক্যামেরার সামনে ধরুন' : 'Scanning... point camera at a QR code'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
            <ScanLine className="h-12 w-12 opacity-30" />
            <p className="text-sm">
              {isBn ? 'এখানে ডিকোড করা টেক্সট দেখা যাবে' : 'Decoded text will appear here'}
            </p>
          </div>
        )}

        {recent.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isBn ? 'সাম্প্রতিক স্ক্যান' : 'Recent Scans'}
            </p>
            <div className="max-h-48 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
              {recent.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setResult(h)
                    setStatus('detected')
                  }}
                  className="block w-full truncate rounded-lg border border-border/40 bg-card/60 px-3 py-2 text-left text-xs hover:border-amber-400 hover:bg-amber-50/40 dark:hover:bg-amber-950/20"
                  title={h}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
