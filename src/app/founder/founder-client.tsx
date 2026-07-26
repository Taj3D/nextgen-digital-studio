'use client'

/**
 * Founder Authority OS™ — Enterprise Founder Authority Platform
 * Bangladesh's strongest AI Founder Authority Page.
 *
 * Design: Navy (#1E3A5F) + Gold (#D4A853) premium executive palette.
 * 25+ sections, bilingual (Bn/En), scroll progress, sticky CTA bar,
 * animated reveals, accessible accordion FAQ, lead form.
 */

import * as React from 'react'
import Image from 'next/image'
import {
  TopBar,
} from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingFooter,
  LandingLeadForm,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import { siteConfig } from '@/lib/site-data'
import {
  founderHero,
  founderTrust,
  founderMediaMentions,
  founderMediaKit,
  founderCertifications,
  founderAwards,
  founderStory,
  founderPhilosophy,
  founderManifesto,
  founderFramework,
  founderTechStack,
  founderExpertise,
  founderIndustries,
  founderDocumentary,
  founderPersonalMetrics,
  founderRoutine,
  founderBooks,
  founderCaseStudies,
  founderSpeaking,
  founderSpeakingTopics,
  founderTraining,
  founderValues,
  founderPrinciples,
  founderWhyMe,
  founderThoughtLeadership,
  founderPublications,
  founderQuotes,
  founderFutureProjects,
  founderOpenLetter,
  founderGuarantee,
  founderLegacy,
  founderClosing,
  founderFaqs,
  founderFaqCategories,
  founderFaqCategoryLabels,
  founderCommunityPlatforms,
  founderSignature,
  founderFinalCTA,
  founderMission,
  founderVision,
} from '@/lib/founder-data'
import {
  Award,
  MapPin,
  Users,
  Star,
  Bot,
  ShieldCheck,
  Lightbulb,
  Handshake,
  GraduationCap,
  Eye,
  CheckCircle2,
  Quote,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  BookOpen,
  Clock,
  Rocket,
  Building,
  Crown,
  Terminal,
  Wrench,
  Code,
  CalendarCheck,
  Mic,
  HeartPulse,
  ShoppingBag,
  ShoppingCart,
  Factory,
  Building2,
  Briefcase,
  Sparkles,
  PlayCircle,
  Video,
  Send,
  Lock,
  AlertCircle,
  Search,
  Download,
  FileText,
  PenTool,
  Target,
  TrendingUp,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                     */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Users, Star, Bot, ShieldCheck, Lightbulb, Handshake, GraduationCap,
  Eye, Award, Rocket, Building, Crown, Terminal, Wrench, Code, CalendarCheck,
  Mic, HeartPulse, ShoppingBag, ShoppingCart, Factory, Building2, Briefcase,
  BookOpen, AlertCircle, Send, Sparkles, Target, TrendingUp, FileText,
}

function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? Sparkles
  return <C className={className} />
}

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                  */
/* ------------------------------------------------------------------ */

type Bn = { bn: string; en: string }
function T(b: Bn, isBn: boolean) {
  return isBn ? b.bn : b.en
}

/* ------------------------------------------------------------------ */
/*  Premium section wrapper                                           */
/* ------------------------------------------------------------------ */

function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 ${className}`}>
      {children}
    </section>
  )
}

function SectionTitle({
  emoji,
  children,
}: {
  emoji?: string
  children: React.ReactNode
}) {
  return (
    <h2 className="mt-6 mb-1 flex items-center gap-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
      {emoji && <span aria-hidden>{emoji}</span>}
      {children}
    </h2>
  )
}

function SectionDivider() {
  return <div className="mb-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#D4A853]" />
}

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper                                          */
/*  Uses a single SHARED IntersectionObserver for ALL Reveal instances */
/*  on the page — far cheaper than ~30 individual observers.           */
/* ------------------------------------------------------------------ */

type RevealEntry = { el: HTMLElement; show: () => void }
let __sharedObserver: IntersectionObserver | null = null
const __revealQueue: Set<RevealEntry> = new Set()

function getSharedObserver() {
  if (typeof window === 'undefined') return null
  if (__sharedObserver) return __sharedObserver
  __sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target as HTMLElement
          __revealQueue.forEach((entry) => {
            if (entry.el === target) {
              entry.show()
              __sharedObserver?.unobserve(target)
              __revealQueue.delete(entry)
            }
          })
        }
      })
      // Once everything has revealed, disconnect to free up memory.
      if (__revealQueue.size === 0 && __sharedObserver) {
        __sharedObserver.disconnect()
        __sharedObserver = null
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  return __sharedObserver
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    // Fallback for SSR / no-IO: show immediately.
    const ob = getSharedObserver()
    if (!ob) {
      setShown(true)
      return
    }
    const entry: RevealEntry = { el, show: () => setShown(true) }
    __revealQueue.add(entry)
    ob.observe(el)
    return () => {
      __revealQueue.delete(entry)
      ob.unobserve(el)
    }
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion item                                                */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a, isBn }: { q: Bn; a: Bn; isBn: boolean }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[var(--foundry-text)] transition-colors hover:bg-[var(--foundry-tint)] sm:px-5 sm:text-[15px]"
      >
        <span>{T(q, isBn)}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#B8923A] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-[var(--foundry-subtle)] sm:px-5">{T(a, isBn)}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Searchable + category-based FAQ section                            */
/* ------------------------------------------------------------------ */

function FaqSection({ isBn }: { isBn: boolean }) {
  const [query, setQuery] = React.useState('')
  const [activeCat, setActiveCat] = React.useState<string>('all')

  // Build list of FAQs with their categories (zip founderFaqs + founderFaqCategories)
  const items = React.useMemo(
    () => founderFaqs.map((f, i) => ({ ...f, category: founderFaqCategories[i] ?? 'about' })),
    [],
  )

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((f) => {
      const matchesCat = activeCat === 'all' || f.category === activeCat
      if (!matchesCat) return false
      if (!q) return true
      const text = (isBn ? f.q.bn + ' ' + f.a.bn : f.q.en + ' ' + f.a.en).toLowerCase()
      return text.includes(q)
    })
  }, [items, query, activeCat, isBn])

  const categories = ['all', 'about', 'services', 'process', 'pricing', 'results', 'partnership']

  return (
    <>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8923A]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isBn ? 'প্রশ্ন খুঁজুন...' : 'Search questions...'}
          aria-label={isBn ? 'প্রশ্ন খুঁজুন' : 'Search questions'}
          className="h-11 w-full rounded-full border border-[var(--foundry-border)] bg-[var(--foundry-card)] pl-10 pr-4 text-sm text-[var(--foundry-text)] outline-none focus:border-[#1E3A5F]"
        />
      </div>

      {/* Category filter pills */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCat(c)}
            aria-pressed={activeCat === c}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeCat === c
                ? 'bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] text-white'
                : 'border border-[var(--foundry-border)] bg-[var(--foundry-card)] text-[var(--foundry-subtle)] hover:bg-[var(--foundry-tint)]'
            }`}
          >
            {T(founderFaqCategoryLabels[c], isBn)}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="mb-2 text-xs text-[var(--foundry-muted)]">
        {isBn
          ? `${filtered.length}টি প্রশ্ন পাওয়া গেছে`
          : `${filtered.length} question${filtered.length === 1 ? '' : 's'} found`}
      </p>

      {/* Filtered FAQ list */}
      {filtered.length > 0 ? (
        <div className="space-y-2.5">
          {filtered.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} isBn={isBn} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-6 text-center">
          <p className="text-sm text-[var(--foundry-muted)]">
            {isBn ? 'কোনো প্রশ্ন পাওয়া যায়নি। অন্য কীওয়ার্ড চেষ্টা করুন।' : 'No questions found. Try a different keyword.'}
          </p>
        </div>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Manifesto PDF download                                            */
/*  Generates a self-contained printable HTML document in a new tab.  */
/*  The user can then Ctrl+P → “Save as PDF” or just read it.         */
/* ------------------------------------------------------------------ */

function downloadManifestoPdf(isBn: boolean) {
  const title = isBn ? 'বাংলাদেশের জন্য AI — মেনিফেস্টো' : 'Why Bangladesh Needs AI — Manifesto'
  const subtitle = isBn
    ? 'মোঃ নাজমুল ইসলাম তাজ — প্রতিষ্ঠাতা ও সিইও, NextGen Digital Studio'
    : 'Md. Najmul Islam Taj — Founder & CEO, NextGen Digital Studio'
  const intro = isBn
    ? 'এই মেনিফেস্টো বাংলাদেশের ব্যবসার জন্য AI গ্রহণের একটি রোডম্যাপ। ছয়টি স্তম্ভের উপর দাঁড়িয়ে আছে — যা প্রতিটি ছোট ও মাঝারি ব্যবসাকে প্রতিযোগিতামূলক করে তুলবে।'
    : 'This manifesto is a roadmap for AI adoption in Bangladeshi business. It stands on six pillars — each one designed to make every SME competitive.'
  const points = founderManifesto.map((m, i) => ({
    num: isBn ? ['০১', '০২', '০৩', '০৪', '০৫', '০৬'][i] : String(i + 1).padStart(2, '0'),
    text: T(m, isBn),
  }))
  const closing = isBn
    ? 'আসুন একসাথে বাংলাদেশকে দক্ষিণ এশিয়ার AI হাবে পরিণত করি। যোগাযোগ: nextgendigitalstudio1@gmail.com · +8801711731354'
    : 'Let us together make Bangladesh the AI hub of South Asia. Contact: nextgendigitalstudio1@gmail.com · +8801711731354'

  const html = `<!DOCTYPE html><html lang="${isBn ? 'bn' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', 'Noto Sans Bengali', system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 48px 32px; color: #1C1C1C; background: #FAF7F3; line-height: 1.6; }
    .brand { text-align: center; border-bottom: 3px solid #D4A853; padding-bottom: 16px; margin-bottom: 32px; }
    .brand h1 { color: #1E3A5F; font-size: 28px; margin: 0 0 8px; }
    .brand p { color: #B8923A; font-weight: 600; margin: 0; font-size: 14px; letter-spacing: 0.5px; }
    .intro { font-size: 16px; color: #4A4A4A; margin-bottom: 32px; padding: 16px 20px; background: #F5F0EB; border-left: 4px solid #D4A853; border-radius: 8px; }
    .point { display: flex; gap: 16px; padding: 20px 0; border-bottom: 1px solid #E8DDD4; }
    .point:last-of-type { border-bottom: none; }
    .point .num { flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #1E3A5F, #2D5A8E); color: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; }
    .point .text { font-size: 15px; color: #1C1C1C; padding-top: 12px; }
    .closing { margin-top: 32px; padding: 20px; background: linear-gradient(135deg, #1E3A5F, #2D5A8E); color: #fff; border-radius: 12px; text-align: center; font-size: 14px; }
    .sign { text-align: center; margin-top: 24px; font-style: italic; color: #1E3A5F; font-size: 18px; font-family: 'Brush Script MT', cursive; }
    .meta { text-align: center; margin-top: 8px; color: #7A7A7A; font-size: 12px; }
    @media print { body { background: #fff; padding: 24px; } .point { break-inside: avoid; } }
  </style></head><body>
    <div class="brand">
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    <div class="intro">${intro}</div>
    ${points.map((p) => `<div class="point"><div class="num">${p.num}</div><div class="text">${p.text}</div></div>`).join('')}
    <div class="closing">${closing}</div>
    <div class="sign">— ${isBn ? 'তাজ ভাই' : 'Taj Bhai'}</div>
    <div class="meta">NextGen Digital Studio · nextgendigitalstudio.com/founder</div>
  </body></html>`

  // Open in new tab — user can read, print to PDF, or save as HTML.
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  // Fallback: if popup blocked, trigger a direct download.
  if (!win) {
    const a = document.createElement('a')
    a.href = url
    a.download = isBn ? 'ai-manifesto-bangladesh.html' : 'ai-manifesto-bangladesh.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  // Revoke after 60s (enough time for the tab to load).
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

/* ------------------------------------------------------------------ */
/*  Newsletter form (real API integration)                            */
/* ------------------------------------------------------------------ */

function NewsletterForm({ isBn }: { isBn: boolean }) {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = React.useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Request failed')
      setStatus('done')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-2 rounded-full bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="h-4 w-4" />
        {isBn ? 'ধন্যবাদ! সাবস্ক্রাইব সম্পন্ন।' : 'Thank you! Subscribed.'}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-3 flex max-w-sm flex-col gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        placeholder={isBn ? 'আপনার ইমেইল' : 'Your email'}
        aria-label={isBn ? 'ইমেইল ঠিকানা' : 'Email address'}
        className="h-11 rounded-full border border-[var(--foundry-border)] bg-[var(--foundry-card)] px-4 text-sm text-[var(--foundry-text)] outline-none focus:border-[#1E3A5F]"
      />
      {status === 'error' && (
        <p className="text-xs text-red-600 dark:text-red-400">{errorMsg || (isBn ? 'সাবস্ক্রাইব ব্যর্থ হয়েছে।' : 'Subscription failed.')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#D4A853] px-5 text-sm font-bold text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            {isBn ? 'পাঠানো হচ্ছে...' : 'Subscribing...'}
          </>
        ) : (
          isBn ? 'সাবস্ক্রাইব' : 'Subscribe'
        )}
      </button>
    </form>
  )
}


export function FounderClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('founder_page_v3')

  return (
    <>
      {/*
        Founder page theme tokens — adapt to BOTH light and dark modes.
        Kept inline (rather than in globals.css) because Tailwind v4's
        CSS engine strips plain custom-property rules from the compiled
        output. Inline <style> guarantees the variables are present.
        Light: cream + navy + gold premium executive palette.
        Dark:  deep navy + warm gold + soft cream text.
        Also re-declares shadcn/ui CSS variables so LandingLeadForm inputs
        render with the correct theme.
      */}
      <style>{`
        .founder-page {
          --foundry-bg: #FAF7F3;
          --foundry-text: #1C1C1C;
          --foundry-card: #FFFFFF;
          --foundry-tint: #F5F0EB;
          --foundry-border: #E8DDD4;
          --foundry-subtle: #4A4A4A;
          --foundry-muted: #7A7A7A;
          --foundry-shadow: rgba(30, 58, 95, 0.08);
          --background: oklch(1 0 0);
          --foreground: oklch(0.21 0.034 264);
          --card: oklch(1 0 0);
          --popover: oklch(1 0 0);
          --input: oklch(0.922 0.008 264);
          --border: oklch(0.922 0.008 264);
          --ring: oklch(0.546 0.215 262.88);
          --muted: oklch(0.97 0.006 264);
          --muted-foreground: oklch(0.45 0.02 264);
          --primary: oklch(0.3 0.08 255);
          --primary-foreground: oklch(0.985 0 0);
          --accent: oklch(0.96 0.02 95);
          --accent-foreground: oklch(0.3 0.08 255);
          color-scheme: light;
        }
        .dark .founder-page {
          --foundry-bg: #0A1428;
          --foundry-text: #F5F0EB;
          --foundry-card: #15202B;
          --foundry-tint: #0F1A2E;
          --foundry-border: #243248;
          --foundry-subtle: #B8C5D6;
          --foundry-muted: #8B9DAF;
          --foundry-shadow: rgba(0, 0, 0, 0.4);
          --background: oklch(0.16 0.02 264);
          --foreground: oklch(0.96 0.005 264);
          --card: oklch(0.2 0.02 264);
          --popover: oklch(0.2 0.02 264);
          --input: oklch(0.26 0.02 264);
          --border: oklch(0.3 0.02 264);
          --ring: oklch(0.646 0.18 62);
          --muted: oklch(0.22 0.02 264);
          --muted-foreground: oklch(0.7 0.02 264);
          --primary: oklch(0.7 0.15 62);
          --primary-foreground: oklch(0.16 0.02 264);
          --accent: oklch(0.3 0.08 62);
          --accent-foreground: oklch(0.96 0.005 264);
          color-scheme: dark;
        }
      `}</style>
      <div className="founder-page relative flex min-h-screen flex-col bg-[var(--foundry-bg)] text-[var(--foundry-text)]">
      {/* Skip-to-content link for screen readers & keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#1E3A5F] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        {isBn ? 'কনটেন্টে যান' : 'Skip to content'}
      </a>
      <TopBar />

      <main id="main-content" className="flex-1 pb-20">
        {/* ===== 1. HERO ===== */}
        <section className="relative overflow-hidden px-4 pb-6 pt-10 text-center sm:px-6 sm:pt-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4A853]/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A853] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Crown className="h-3 w-3" /> {T(founderHero.badge, isBn)}
            </span>

            {/* Founder Portrait — focal point of the page */}
            <div className="relative mx-auto mb-4 mt-5 h-32 w-32 sm:h-40 sm:w-40">
              {/* Soft gold glow */}
              <div className="absolute -inset-3 rounded-full bg-[#D4A853]/25 blur-2xl" aria-hidden />
              {/* Gold gradient ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#D4A853] via-[#E8C97A] to-[#B8923A]" aria-hidden />
              {/* Image */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[var(--foundry-card)] shadow-xl">
                <Image
                  src="/founder.png"
                  alt="Md. Najmul Islam Taj (Taj Bhai) — Founder & CEO, NextGen Digital Studio"
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Name badge */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1E3A5F] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4A853] shadow-md ring-2 ring-[var(--foundry-card)]">
                Taj Bhai
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              <span aria-label={`${T(founderHero.name, isBn)} — ${T(founderHero.brand, isBn)}`}>
                {T(founderHero.name, isBn)}
                <br />
                <span className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] bg-clip-text text-transparent dark:from-[#7BA4D9] dark:to-[#A8C8E8]">
                  {T(founderHero.brand, isBn)}
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-[var(--foundry-subtle)] sm:text-lg">
              {T(founderHero.positioning, isBn)}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-[var(--foundry-muted)]">
              {T(founderHero.subPositioning, isBn)}
            </p>

            {/* Manifesto */}
            <div className="mt-5 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-tint)] p-4 sm:p-5">
              <p className="text-[15px] italic leading-relaxed text-[var(--foundry-text)] sm:text-base">
                <Quote className="mr-1 inline h-4 w-4 shrink-0 text-[#D4A853]" />
                {T(founderHero.manifesto, isBn)}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1E3A5F]/30 transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <Calendar className="h-4 w-4" />
                {isBn ? 'স্ট্র্যাটেজি কল বুক করুন' : 'Book Strategy Call'}
              </a>
              <WhatsAppCTA isBn={isBn} className="w-full max-w-[320px] sm:w-auto" />
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm sm:grid-cols-4 sm:gap-4 sm:p-6">
              {founderHero.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                    {T(s.v, isBn)}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--foundry-muted)]">{T(s.l, isBn)}</div>
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[var(--foundry-border)] pt-4 text-xs text-[var(--foundry-subtle)] sm:text-sm">
              {founderHero.trustBar.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <Icon name={t.icon} className="h-3.5 w-3.5 text-[#D4A853]" />
                  {T(t, isBn)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 2. WHY TRUST ME ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🔒">{isBn ? 'কেন আমাকে বিশ্বাস করবেন?' : 'Why Trust Me?'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 sm:grid-cols-2 sm:p-5">
              {founderTrust.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[var(--foundry-text)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4A853]" />
                  {T(t, isBn)}
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 3. MEDIA KIT (As Seen On + Available for Media) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📰">{isBn ? 'মিডিয়া কিট' : 'Media Kit'}</SectionTitle>
            <SectionDivider />
            {/* As seen on (existing mentions) */}
            <div className="flex flex-wrap gap-2">
              {founderMediaMentions.map((m, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[var(--foundry-border)] bg-[var(--foundry-card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foundry-subtle)]"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Appearances */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {founderMediaKit.appearances.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3"
                >
                  <Mic className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" />
                  <div>
                    <div className="text-sm font-bold text-[#1E3A5F]">{T(a.outlet, isBn)}</div>
                    <div className="text-xs text-[var(--foundry-muted)]">{T(a.desc, isBn)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Available for Media CTA */}
            <div className="mt-4 rounded-2xl border-l-4 border-[#D4A853] bg-[var(--foundry-tint)] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3A5F]">
                <Sparkles className="h-4 w-4 text-[#D4A853]" />
                {T(founderMediaKit.available.title, isBn)}
              </div>
              <p className="mt-1 text-sm text-[var(--foundry-subtle)]">
                {T(founderMediaKit.available.desc, isBn)}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {founderMediaKit.available.topics.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[#1E3A5F] px-2.5 py-0.5 text-[11px] font-semibold text-white"
                  >
                    {T(t, isBn)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 4. CERTIFICATIONS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📜">{isBn ? 'সার্টিফিকেশন' : 'Certifications'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap justify-center gap-2">
              {founderCertifications.map((c, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 5. AWARDS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🏆">{isBn ? 'পুরস্কার' : 'Awards'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap justify-center gap-2">
              {founderAwards.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A853] px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  <Award className="h-3 w-3" /> {T(a, isBn)}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 6. ORIGIN STORY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📖">{T(founderStory.title, isBn)}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-start">
              {/* Founder portrait */}
              <div className="mx-auto h-44 w-44 sm:mx-0 sm:h-auto sm:w-full">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#B8923A]" aria-hidden />
                  <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[var(--foundry-card)] shadow-lg">
                    <Image
                      src="/founder.png"
                      alt="Md. Najmul Islam Taj — building NextGen Digital Studio from Jessore"
                      fill
                      sizes="(max-width: 640px) 176px, 180px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-center text-xs font-semibold text-[var(--foundry-muted)]">
                  {isBn ? 'নাজমুল ইসলাম তাজ' : 'Nazmul Islam Taj'}
                </p>
              </div>
              {/* Story text */}
              <div className="space-y-3 text-[15px] leading-relaxed text-[var(--foundry-subtle)]">
                {founderStory.paragraphs.map((p, i) => (
                  <p key={i}>{T(p, isBn)}</p>
                ))}
                <div className="rounded-r-xl border-l-4 border-[#D4A853] bg-[var(--foundry-bg)] px-5 py-4">
                  <p className="italic text-[var(--foundry-subtle)]">
                    <Quote className="mr-1 inline h-4 w-4 text-[#D4A853]" />
                    {T(founderStory.quote, isBn)}
                  </p>
                </div>
                {founderStory.paragraphs2.map((p, i) => (
                  <p key={i}>{T(p, isBn)}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 7. AI PHILOSOPHY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🧠">{isBn ? 'আমার AI দর্শন' : 'My AI Philosophy'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] p-6 text-center text-white sm:p-8">
              <p className="text-base font-semibold leading-relaxed sm:text-lg">
                &ldquo;{T(founderPhilosophy, isBn)}&rdquo;
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 7.5. THOUGHT LEADERSHIP ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="💡">{isBn ? 'থট লিডারশিপ' : 'Thought Leadership'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2">
              {founderThoughtLeadership.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--foundry-tint)]">
                      <Icon name={t.icon} className="h-4 w-4 text-[#D4A853]" />
                    </div>
                    <span className="rounded-full bg-[#D4A853]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                      {T(t.category, isBn)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1E3A5F]">{T(t.title, isBn)}</h4>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-[var(--foundry-subtle)]">
                    {T(t.thesis, isBn)}
                  </p>
                  <div className="mt-2 border-t border-[var(--foundry-border)] pt-2">
                    <span className="text-[11px] font-semibold text-[#D4A853]">
                      ★ {isBn ? 'কী শিখবেন:' : 'Takeaway:'}
                    </span>{' '}
                    <span className="text-[11px] text-[var(--foundry-text)]">
                      {T(t.takeaway, isBn)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 8. AI MANIFESTO ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📢">{isBn ? 'বাংলাদেশের জন্য AI — মেনিফেস্টো' : 'Why Bangladesh Needs AI — Manifesto'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderManifesto.map((m, i) => (
                <div key={i} className="rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 text-center">
                  <span className="block text-2xl font-extrabold text-[#D4A853]">
                    {isBn ? ['০১', '০২', '০৩', '০৪', '০৫', '০৬'][i] : String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 text-sm font-medium text-[var(--foundry-text)]">{T(m, isBn)}</p>
                </div>
              ))}
            </div>
            {/* Download Manifesto PDF — generates a real printable HTML document
                that the browser can save as PDF (or save as .html). No alert(). */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => downloadManifestoPdf(isBn)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D4A853] bg-[var(--foundry-card)] px-5 py-2.5 text-sm font-bold text-[#1E3A5F] transition-transform hover:scale-105"
              >
                <Download className="h-4 w-4 text-[#D4A853]" />
                {isBn ? 'মেনিফেস্টো PDF ডাউনলোড' : 'Download Manifesto PDF'}
              </button>
            </div>
          </Reveal>
        </Section>

        {/* ===== 9. TAJ FRAMEWORK ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="⚡">{T(founderFramework.title, isBn)}</SectionTitle>
            <p className="mb-3 text-sm text-[var(--foundry-muted)]">{T(founderFramework.subtitle, isBn)}</p>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {founderFramework.steps.map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3 text-center sm:p-4">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] text-sm font-bold text-white">
                    {T(s.num, isBn)}
                  </div>
                  <h4 className="text-sm font-bold">{T(s.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[var(--foundry-muted)]">{T(s.desc, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 10. EXPERTISE ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎯">{isBn ? 'দক্ষতা' : 'Expertise'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap gap-2">
              {founderExpertise.map((e, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#1E3A5F]/30 bg-[var(--foundry-card)] px-3.5 py-1.5 text-xs font-semibold text-[#1E3A5F] sm:text-sm"
                >
                  {T(e, isBn)}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 11. TECH STACK ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="⚙️">{isBn ? 'আমার AI স্ট্যাক' : 'My AI Stack'}</SectionTitle>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {founderTechStack.map((t, i) => (
                <div key={i} className="rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3 text-center">
                  <div className="text-sm font-bold text-[#1E3A5F]">{t.name}</div>
                  <div className="mt-0.5 text-xs text-[var(--foundry-muted)]">{T(t.use, isBn)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 12. INDUSTRIES SERVED ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🏭">{isBn ? 'যেসব ইন্ডাস্ট্রিতে কাজ করেছি' : 'Industries Served'}</SectionTitle>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {founderIndustries.map((ind, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3 text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foundry-bg)]">
                    <Icon name={ind.icon} className="h-4 w-4 text-[#D4A853]" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--foundry-text)] sm:text-sm">{T(ind, isBn)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 13. DOCUMENTARY TIMELINE (year: problem, decision, challenge, success, lesson) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎬">{isBn ? 'আমার যাত্রা — ডকুমেন্টারি টাইমলাইন' : 'My Journey — Documentary Timeline'}</SectionTitle>
            <SectionDivider />
            <div className="space-y-3">
              {founderDocumentary.map((d, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm sm:p-5"
                >
                  {/* Year badge */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex h-9 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] text-sm font-extrabold text-white">
                      {d.year}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A853]">
                      {isBn ? `অধ্যায় ${['১','২','৩','৪','৫','৬'][i]}` : `Chapter ${i + 1}`}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                        {isBn ? 'সমস্যা' : 'Problem'}
                      </div>
                      <p className="text-xs text-[var(--foundry-subtle)]">{T(d.problem, isBn)}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                        {isBn ? 'সিদ্ধান্ত' : 'Decision'}
                      </div>
                      <p className="text-xs text-[var(--foundry-subtle)]">{T(d.decision, isBn)}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                        {isBn ? 'চ্যালেঞ্জ' : 'Challenge'}
                      </div>
                      <p className="text-xs text-[var(--foundry-subtle)]">{T(d.challenge, isBn)}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                        {isBn ? 'সাফল্য' : 'Success'}
                      </div>
                      <p className="text-xs text-[var(--foundry-subtle)]">{T(d.success, isBn)}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                        {isBn ? 'শিক্ষা' : 'Lesson'}
                      </div>
                      <p className="text-xs font-semibold italic text-[#1E3A5F]">{T(d.lesson, isBn)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 14. IMPACT COUNTERS (expanded personal metrics) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📊">{isBn ? 'সংখ্যায় প্রভাব' : 'Impact in Numbers'}</SectionTitle>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {founderPersonalMetrics.map((c, i) => (
                <div key={i} className="rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3 text-center shadow-sm sm:p-4">
                  <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
                    {c.num}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--foundry-muted)] sm:text-xs">{T(c.label, isBn)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 15. MISSION & VISION ===== */}
        <Section>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-l-4 border-[#1E3A5F] bg-[var(--foundry-card)] p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E3A5F]">
                  <Rocket className="h-5 w-5" /> {T(founderMission.title, isBn)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foundry-subtle)]">{T(founderMission.body, isBn)}</p>
              </div>
              <div className="rounded-2xl border-l-4 border-[#D4A853] bg-[var(--foundry-card)] p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E3A5F]">
                  <Eye className="h-5 w-5" /> {T(founderVision.title, isBn)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foundry-subtle)]">{T(founderVision.body, isBn)}</p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 16. FOUNDER PRINCIPLES (10 — with story, lesson, business application) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="💎">{isBn ? '১০টি প্রতিষ্ঠাতা নীতি' : '10 Founder Principles'}</SectionTitle>
            <p className="mb-3 text-sm text-[var(--foundry-muted)]">
              {isBn
                ? 'প্রতিটি নীতির পেছনে একটি বাস্তব গল্প, একটি শিক্ষা, এবং একটি ব্যবসায়িক প্রয়োগ।'
                : 'Each principle has a real story, a lesson, and a business application.'}
            </p>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2">
              {founderPrinciples.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] text-xs font-bold text-white">
                      {isBn ? ['০১','০২','০৩','০৪','০৫','০৬','০৭','০৮','০৯','১০'][i] : String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-bold text-[#1E3A5F]">{T(p.title, isBn)}</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--foundry-subtle)]">
                    <span className="font-semibold text-[#B8923A]">{isBn ? 'গল্প:' : 'Story:'}</span>{' '}
                    {T(p.story, isBn)}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed italic text-[#1E3A5F]">
                    <span className="not-italic font-semibold text-[#B8923A]">{isBn ? 'শিক্ষা:' : 'Lesson:'}</span>{' '}
                    {T(p.lesson, isBn)}
                  </p>
                  <p className="mt-1.5 rounded-lg bg-[var(--foundry-tint)] px-2.5 py-1.5 text-xs leading-relaxed text-[var(--foundry-text)]">
                    <span className="font-semibold text-[#B8923A]">{isBn ? 'প্রয়োগ:' : 'Apply:'}</span>{' '}
                    {T(p.application, isBn)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 16.5. WHY ME? (8 reasons to work with Taj) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎯">{isBn ? 'কেন আমার সাথে কাজ করবেন?' : 'Why Work With Taj?'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {founderWhyMe.map((w, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foundry-tint)]">
                    <Icon name={w.icon} className="h-4 w-4 text-[#D4A853]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1E3A5F]">{T(w.title, isBn)}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--foundry-subtle)]">{T(w.desc, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 17. CASE STUDIES ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📊">{isBn ? 'কেস স্টাডি' : 'Case Studies'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2">
              {founderCaseStudies.map((c, i) => (
                <div key={i} className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-5 shadow-sm">
                  <h4 className="text-base font-bold text-[#1E3A5F]">{T(c.title, isBn)}</h4>
                  <div className="mt-2 space-y-1.5 text-sm text-[var(--foundry-subtle)]">
                    <p><span className="font-semibold text-[var(--foundry-text)]">{isBn ? 'সমস্যা:' : 'Problem:'}</span> {T(c.problem, isBn)}</p>
                    <p><span className="font-semibold text-[var(--foundry-text)]">{isBn ? 'সমাধান:' : 'Solution:'}</span> {T(c.solution, isBn)}</p>
                    <p><span className="font-semibold text-[var(--foundry-text)]">{isBn ? 'ফলাফল:' : 'Result:'}</span> {T(c.result, isBn)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4A853]">ROI: {c.roi}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {isBn ? 'সফল' : 'Success'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 18. SPEAKING + SPEAKING TOPICS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎤">{isBn ? 'স্পিকিং' : 'Speaking'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap gap-2">
              {founderSpeaking.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--foundry-border)] bg-[var(--foundry-card)] px-3.5 py-1.5 text-xs font-semibold text-[#1E3A5F] sm:text-sm"
                >
                  <Icon name={s.icon} className="h-3.5 w-3.5 text-[#D4A853]" />
                  {T(s, isBn)}
                </span>
              ))}
            </div>

            {/* Speaking Topics (EEAT) */}
            <h4 className="mt-5 mb-2 text-sm font-bold text-[#1E3A5F]">
              {isBn ? 'স্পিকিং টপিকস:' : 'Speaking Topics:'}
            </h4>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {founderSpeakingTopics.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--foundry-tint)]">
                    <Icon name={t.icon} className="h-4 w-4 text-[#D4A853]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--foundry-text)]">{T(t.title, isBn)}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D4A853]">
                      ⏱ {t.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 19. TRAINING ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎓">{isBn ? 'ট্রেইনিং প্রোগ্রাম' : 'Training Programs'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderTraining.map((t, i) => (
                <div key={i} className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E]">
                    <Icon name={t.icon} className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold">{T(t.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[var(--foundry-muted)]">{T(t.desc, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 19.5. PUBLICATIONS / RESEARCH / WHITEPAPER (EEAT) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📑">{isBn ? 'প্রকাশনা ও গবেষণা' : 'Publications & Research'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-3">
              {founderPublications.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#D4A853]" />
                    <span className="rounded-full bg-[#D4A853]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B8923A]">
                      {T(p.type, isBn)}
                    </span>
                  </div>
                  <p className="flex-1 text-sm font-bold text-[#1E3A5F]">{T(p.title, isBn)}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--foundry-muted)]">📅 {p.year}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 20. VALUES WITH STORIES ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="💎">{isBn ? 'আমার মূল্যবোধ' : 'My Values'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderValues.map((v, i) => (
                <div key={i} className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-5 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foundry-bg)]">
                    <Icon name={v.icon} className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E3A5F]">{T(v.title, isBn)}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--foundry-subtle)]">{T(v.story, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 21. DAILY ROUTINE ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="⏰">{isBn ? 'আমার দৈনিক রুটিন' : 'My Daily Routine'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-2 sm:grid-cols-2">
              {founderRoutine.map((r, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-3">
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#1E3A5F] px-2.5 py-1 text-xs font-bold text-white">
                    <Clock className="h-3 w-3" /> {r.time}
                  </span>
                  <span className="text-sm text-[var(--foundry-text)]">{T(r.desc, isBn)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 22. BOOKS I RECOMMEND (with lessons) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📚">{isBn ? 'যেসব বই আমাকে গড়েছে' : 'Books That Shaped Me'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderBooks.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border-l-4 border-[#D4A853] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 shrink-0 text-[#D4A853]" />
                    <div>
                      <p className="text-sm font-bold text-[#1E3A5F]">{b.title}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B8923A]">
                        ✍ {b.author}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs italic leading-relaxed text-[var(--foundry-subtle)]">
                    <span className="not-italic font-semibold text-[#B8923A]">{isBn ? 'শিক্ষা:' : 'Lesson:'}</span>{' '}
                    {T(b.lesson, isBn)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 23. FOUNDER QUOTES ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="💬">{isBn ? 'প্রতিষ্ঠাতার উক্তি' : 'Founder Quotes'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2">
              {founderQuotes.map((q, i) => (
                <div key={i} className="rounded-xl border-l-4 border-[#D4A853] bg-[var(--foundry-card)] p-4 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-[var(--foundry-text)]">
                    &ldquo;{T(q, isBn)}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 24. PHOTO GALLERY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📸">{isBn ? 'আমার জগৎ' : 'My World'}</SectionTitle>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Real founder photo as featured first item */}
              <div className="relative h-28 overflow-hidden rounded-xl border border-[var(--foundry-border)] shadow-sm">
                <Image
                  src="/founder.png"
                  alt="Md. Najmul Islam Taj (Taj Bhai) — portrait"
                  fill
                  sizes="(max-width: 640px) 160px, 200px"
                  className="object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {isBn ? 'হিরো' : 'Hero'}
                </span>
              </div>
              {[
                { icon: 'Code', label: isBn ? 'কাজ' : 'Working' },
                { icon: 'Mic', label: isBn ? 'স্পিকিং' : 'Speaking' },
                { icon: 'Handshake', label: isBn ? 'মিটিং' : 'Meeting' },
                { icon: 'Building', label: isBn ? 'অফিস' : 'Office' },
                { icon: 'GraduationCap', label: isBn ? 'ট্রেইনিং' : 'Training' },
              ].map((p, i) => (
                <div key={i} className="flex h-28 flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--foundry-border)] bg-[var(--foundry-tint)]">
                  <Icon name={p.icon} className="h-6 w-6 text-[#D4A853]" />
                  <span className="text-xs font-medium text-[var(--foundry-muted)]">{p.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 25. BEHIND THE SCENES VIDEO ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎬">{isBn ? 'পর্দার পেছনে' : 'Behind the Scenes'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#1C1C1C] p-8 text-center text-white sm:p-12">
              <PlayCircle className="h-12 w-12 text-[#D4A853]" />
              <p className="text-sm sm:text-base">{isBn ? 'আমার একদিন — শীঘ্রই আসছে' : 'A Day in My Life — Coming Soon'}</p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 26. FOUNDER VIDEO ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎥">{isBn ? 'ফাউন্ডার ভিডিও' : 'Founder Video'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#1C1C1C] p-8 text-center text-white sm:p-12">
              <Video className="h-12 w-12 text-[#D4A853]" />
              <p className="text-sm sm:text-base">{isBn ? '২ মিনিটের পরিচিতি দেখুন' : 'Watch my 2-minute introduction'}</p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 27. FUTURE PROJECTS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🚀">{isBn ? 'ভবিষ্যৎ প্রজেক্ট' : 'Future Projects'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderFutureProjects.map((p, i) => (
                <div key={i} className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foundry-bg)]">
                    <Icon name={p.icon} className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <h4 className="text-sm font-bold">{T(p.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[var(--foundry-muted)]">{T(p.desc, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 28. GUARANTEE ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🛡️">{isBn ? 'ফাউন্ডার গ্যারান্টি' : 'Founder Guarantee'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] p-6 text-center text-white sm:p-8">
              <Handshake className="mx-auto mb-3 h-10 w-10 text-[#D4A853]" />
              <p className="text-base font-semibold leading-relaxed sm:text-lg">
                &ldquo;{T(founderGuarantee, isBn)}&rdquo;
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 29. OPEN LETTER ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="✉️">{isBn ? 'খোলা চিঠি' : 'Open Letter'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-bold text-[#1E3A5F]">{T(founderOpenLetter.greeting, isBn)}</h3>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--foundry-subtle)]">
                {founderOpenLetter.paragraphs.map((p, i) => (
                  <p key={i}>{T(p, isBn)}</p>
                ))}
              </div>
              <p className="mt-3 font-bold text-[#1E3A5F]">{T(founderOpenLetter.sign, isBn)}</p>
              {/* CTA line */}
              <div className="mt-3 rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] px-4 py-3 text-center">
                <p className="text-sm font-semibold text-white">
                  &ldquo;{T(founderOpenLetter.cta, isBn)}&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 30. LEGACY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🏛️">{isBn ? 'আমার লিগেসি' : 'My Legacy'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl border-l-[6px] border-[#D4A853] bg-[var(--foundry-tint)] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-[var(--foundry-text)] sm:text-[15px]">
                {T(founderLegacy, isBn)}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 31. FINAL EMOTIONAL CLOSING ===== */}
        <Section>
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] p-8 text-center text-white sm:p-10">
              <p className="mx-auto max-w-xl text-lg font-bold leading-relaxed sm:text-xl">
                <span aria-hidden>&ldquo;</span>
                {founderClosing.lines.map((l, i) => (
                  <React.Fragment key={i}>
                    {T(l, isBn)}
                    {i < founderClosing.lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
                <br />
                <span className="text-[#E8C97A]">{T(founderClosing.highlight, isBn)}</span>
                <span aria-hidden>&rdquo;</span>
              </p>
              <p className="mt-4 text-base">— {T(founderClosing.sign, isBn)}</p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 32. FAQ (30+ — searchable + category-based) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="❓">{isBn ? 'প্রায়শই জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}</SectionTitle>
            <SectionDivider />
            <FaqSection isBn={isBn} />
          </Reveal>
        </Section>

        {/* ===== 33. COMMUNITY (multiple platforms) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🌐">{isBn ? 'কমিউনিটি — যোগ দিন' : 'Community — Join Us'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderCommunityPlatforms.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-4 shadow-sm"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foundry-tint)]">
                    <Icon name={p.icon} className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1E3A5F]">{T(p.name, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[var(--foundry-subtle)]">{T(p.desc, isBn)}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#D4A853]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#B8923A]">
                    <Users className="h-3 w-3" /> {T(p.members, isBn)}
                  </span>
                </div>
              ))}
            </div>
            {/* Direct socials */}
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </Reveal>
        </Section>

        {/* ===== 33.5. FINAL CTA — "Ready to Build Your AI Business?" ===== */}
        <Section>
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] p-6 text-center text-white shadow-xl sm:p-10">
              <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                {T(founderFinalCTA.title, isBn)}
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-white/80 sm:text-base">
                {T(founderFinalCTA.subtitle, isBn)}
              </p>
              {/* Checklist */}
              <div className="mx-auto mt-5 max-w-md space-y-2 text-left">
                {founderFinalCTA.checklist.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg bg-white/10 px-3 py-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" />
                    <span className="text-sm font-medium text-white">{T(c, isBn)}</span>
                  </div>
                ))}
              </div>
              {/* CTA button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A853] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#D4A853]/30 transition-transform hover:scale-105 sm:text-base"
              >
                <Calendar className="h-4 w-4" />
                {T(founderFinalCTA.cta, isBn)}
              </a>
              <p className="mt-3 text-xs text-white/70">{T(founderFinalCTA.note, isBn)}</p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 33.6. DIGITAL SIGNATURE ===== */}
        <Section>
          <Reveal>
            <div className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-6 text-center shadow-sm sm:p-8">
              {/* Small founder portrait above signature */}
              <div className="relative mx-auto mb-3 h-16 w-16">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8923A]" aria-hidden />
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--foundry-card)]">
                  <Image
                    src="/founder.png"
                    alt="Md. Najmul Islam Taj — digital signature portrait"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </div>
              <PenTool className="mx-auto h-7 w-7 text-[#D4A853]" />
              {/* Signature-style name */}
              <p
                className="mt-3 text-2xl italic text-[#1E3A5F] sm:text-3xl"
                style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive, serif' }}
              >
                {T(founderSignature.name, isBn)}
              </p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wider text-[#B8923A]">
                {T(founderSignature.role, isBn)}
              </p>
              <p className="text-xs font-semibold text-[var(--foundry-subtle)]">
                {founderSignature.company}
              </p>
              <p className="mx-auto mt-3 max-w-md text-xs italic leading-relaxed text-[var(--foundry-muted)]">
                &ldquo;{T(founderSignature.tagline, isBn)}&rdquo;
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 34. CONTACT / LEAD FORM ===== */}
        {/* Sentinel: tells the global StickyBookBar to auto-hide near the form */}
        <div id="lead-form" aria-hidden className="sr-only" />
        <Section id="contact" className="scroll-mt-20">
          <Reveal>
            <div className="rounded-3xl border border-[var(--foundry-border)] bg-[var(--foundry-card)] p-6 shadow-lg sm:p-8">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8923A]">
                  <Phone className="h-3 w-3" /> {isBn ? 'সরাসরি কথা বলুন' : 'Talk directly'}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
                  {isBn ? 'একসাথে আপনার ব্যবসার ভবিষ্যৎ গড়ি' : 'Let\'s build the future of your business together'}
                </h2>
                <p className="mt-2 text-sm text-[var(--foundry-muted)]">
                  {isBn ? 'আপনার ব্যবসার জন্য AI রোডম্যাপ পেতে ফর্ম পূরণ করুন।' : 'Fill the form to get an AI roadmap for your business.'}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-[var(--foundry-subtle)]">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foundry-bg)] px-3 py-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#D4A853]" /> {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foundry-bg)] px-3 py-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#D4A853]" /> {siteConfig.phone}
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foundry-bg)] px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#D4A853]" /> {isBn ? 'যশোর, বাংলাদেশ' : 'Jessore, Bangladesh'}
                </span>
              </div>

              <div className="mt-6">
                <LandingLeadForm
                  isBn={isBn}
                  source="founder_authority_v3"
                  serviceName={isBn ? 'ফাউন্ডারের সাথে স্ট্র্যাটেজি কল' : 'Strategy Call with Founder'}
                  submitLabel={isBn ? 'অনুরোধ পাঠান' : 'Send Request'}
                />
              </div>

              <div className="mt-6 border-t border-[var(--foundry-border)] pt-4 text-center">
                <p className="mb-2 text-sm font-semibold text-[var(--foundry-text)]">
                  {isBn ? 'অথবা সরাসরি হোয়াটসঅ্যাপ করুন' : 'Or WhatsApp directly'}
                </p>
                <div className="flex justify-center">
                  <WhatsAppCTA isBn={isBn} />
                </div>
                <p className="mt-3 flex items-center justify-center gap-1 text-xs text-[var(--foundry-muted)]">
                  <Lock className="h-3 w-3" /> {isBn ? 'আপনার ডেটা নিরাপদ। আমরা শেয়ার করি না।' : 'Your data is safe. We never share.'}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 35. NEWSLETTER ===== */}
        <Section>
          <Reveal>
            <div className="rounded-2xl border border-[var(--foundry-border)] bg-[var(--foundry-tint)] p-5 text-center sm:p-6">
              <h4 className="flex items-center justify-center gap-2 text-base font-bold text-[#1E3A5F]">
                <Send className="h-4 w-4 text-[#D4A853]" />
                {isBn ? 'প্রতি সপ্তাহে AI গ্রোথ ইনসাইটস পান' : 'Get weekly AI growth insights'}
              </h4>
              <p className="mt-1 text-sm text-[var(--foundry-subtle)]">
                {isBn ? '৩,০০০+ বাংলাদেশি প্রতিষ্ঠাতার সাথে যোগ দিন।' : 'Join 3,000+ Bangladeshi founders.'}
              </p>
              <NewsletterForm isBn={isBn} />
              <p className="mt-2 text-xs text-[var(--foundry-muted)]">
                {isBn ? 'কোনো স্প্যাম নেই, যেকোনো সময় আনসাবস্ক্রাইব করুন।' : 'No spam, unsubscribe anytime.'}
              </p>
            </div>
          </Reveal>
        </Section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      </div>
    </>
  )
}
