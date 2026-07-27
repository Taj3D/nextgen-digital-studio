'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  TopBar,
} from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingFooter,
  LandingLeadForm,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import { siteConfig } from '@/lib/site-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  HardDrive,
  Files,
  Download,
  CheckCircle2,
  X,
  Zap,
  ArrowRight,
  Clock,
  Gift,
  Star,
  Users2,
  ShieldCheck,
  Lock,
  Headset,
  RefreshCw,
  Video,
  Quote,
  Sparkles,
  TrendingUp,
  Award,
  Package,
  FolderTree,
  Search,
  AlertTriangle,
  Rocket,
  Crown,
} from 'lucide-react'
import {
  BUNDLE,
  FOLDERS,
  GALLERY,
  BONUSES,
  VALUE_STACK,
  COMPARISON,
  TESTIMONIALS,
  CASE_STUDIES,
  WHO_FOR,
  WHO_NOT_FOR,
  FAQS,
  GUARANTEES,
  BEFORE_AFTER,
  PROBLEMS,
} from './cnc-bundle-data'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const toBn = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

function CtaButton({
  label,
  href = '#order',
  icon = 'bolt',
  className = '',
}: {
  label: string
  href?: string
  icon?: 'bolt' | 'arrow' | 'check'
  className?: string
}) {
  const IconCmp = icon === 'arrow' ? ArrowRight : icon === 'check' ? CheckCircle2 : Zap
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        scrollToId(href.replace('#', ''))
      }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.03] hover:shadow-emerald-600/50 ${className}`}
    >
      <IconCmp className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      {label}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Countdown timer — 72-hour launch window                                    */
/* -------------------------------------------------------------------------- */
function CountdownTimer() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  // 72-hour countdown that persists across reloads via localStorage
  const [remaining, setRemaining] = React.useState(72 * 60 * 60)

  React.useEffect(() => {
    const KEY = 'cnc_bundle_deadline'
    const stored = localStorage.getItem(KEY)
    let deadline: number
    if (stored) {
      deadline = parseInt(stored, 10)
      if (isNaN(deadline) || deadline < Date.now()) {
        deadline = Date.now() + 72 * 60 * 60 * 1000
        localStorage.setItem(KEY, String(deadline))
      }
    } else {
      deadline = Date.now() + 72 * 60 * 60 * 1000
      localStorage.setItem(KEY, String(deadline))
    }
    const tick = () => {
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000))
      setRemaining(diff)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
      <Clock className="h-4 w-4" />
      <span className="text-emerald-200/80">{isBn ? 'লঞ্চ অফার শেষ হতে' : 'Launch offer ends in'}</span>
      <span className="font-mono text-base font-bold tabular-nums text-foreground">
        {isBn ? toBn(pad(h)) : pad(h)}:{isBn ? toBn(pad(m)) : pad(m)}:{isBn ? toBn(pad(s)) : pad(s)}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper                                                            */
/* -------------------------------------------------------------------------- */
function Section({
  id,
  children,
  className = '',
  eyebrow,
  title,
  subtitle,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  eyebrow?: string
  title?: React.ReactNode
  subtitle?: string
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/* ============================================================================ */
/*  MAIN COMPONENT                                                              */
/* ============================================================================ */

export function CncBundleClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('cnc_bundle_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Ambient gradient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-teal-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-700/10 blur-[120px]" />
      </div>

      <ScrollProgress />
      <StickyHeader />
      <TopBar />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <FounderVideoSection />
        <ProblemSection />
        <ImagineSection />
        <BeforeAfterSection />
        <WhatsInsideSection />
        <GallerySection />
        <BundleBreakdownSection />
        <BonusSection />
        <ValueStackSection />
        <Why150Section />
        <ComparisonSection />
        <TestimonialsSection />
        <CaseStudiesSection />
        <WhoForSection />
        <WhoNotForSection />
        <FaqSection />
        <GuaranteeSection />
        <OrderSection />
        <ExitCtaSection />
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      <StickyBottomCta />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scroll progress bar                                                        */
/* -------------------------------------------------------------------------- */
function ScrollProgress() {
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? (top / height) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky header CTA                                                          */
/* -------------------------------------------------------------------------- */
function StickyHeader() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 bg-background/95 px-4 py-2.5 shadow-lg shadow-black/5 dark:shadow-black/40 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-bold text-emerald-500">CNC Bundle</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {isBn ? '১৫০ ৳' : '150 ৳'} · 150 GB
          </span>
        </div>
        <button
          onClick={() => scrollToId('order')}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 sm:text-sm"
        >
          <Zap className="h-3.5 w-3.5" />
          {isBn ? 'এখনই কিনুন' : 'Buy Now'}
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky bottom CTA (mobile)                                                 */
/* -------------------------------------------------------------------------- */
function StickyBottomCta() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(y > 700 && y < max - 800)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-2 border-t border-emerald-500/20 bg-background/95 px-3 py-3 backdrop-blur">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground/70">
            {isBn ? 'সীমিত অফার' : 'Limited Offer'}
          </div>
          <div className="text-sm font-bold text-foreground">
            {isBn ? '১৫০ ৳' : '150 ৳'}{' '}
            <span className="text-xs font-normal text-muted-foreground/70 line-through">
              {isBn ? '১,৫০০ ৳' : '1,500 ৳'}
            </span>
          </div>
        </div>
        <button
          onClick={() => scrollToId('order')}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg"
        >
          <Zap className="h-3.5 w-3.5" />
          {isBn ? 'কিনুন' : 'Buy'}
        </button>
      </div>
    </div>
  )
}

/* ============================================================================ */
/*  SECTION 1 — HERO                                                            */
/* ============================================================================ */
function HeroSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Urgency badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {isBn
            ? `🔥 লঞ্চ অফার — শুধুমাত্র প্রথম ১০০ জনের জন্য`
            : `🔥 Launch Offer — First 100 customers only`}
        </span>

        {/* Headline */}
        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            {isBn ? '২,৫০০+ CNC ডিজাইন ফাইল' : '2,500+ CNC Design Files'}
          </span>
          <br />
          {isBn ? 'এক ক্লিকে, আজীবন আপনার' : 'one click, yours forever'}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isBn ? (
            <>
              <strong className="text-foreground">১৫০ জিবি রেডি-টু-কাট ফাইল</strong> — STL, DXF, Aspire,
              ArtCAM, Vectric ফরম্যাটে। দরজা, চেয়ার, বিছানা, ওয়ার্ডরোব, রিলিফ, মন্দির সহ{' '}
              <strong className="text-emerald-400">১২+ ক্যাটাগরি</strong>। আর কখনো নতুন করে ডিজাইন করতে
              হবে না — ফাইল নিয়ে সরাসরি কাট শুরু করুন।
            </>
          ) : (
            <>
              <strong className="text-foreground">150 GB of ready-to-cut files</strong> — in STL, DXF, Aspire,
              ArtCAM, and Vectric formats. Doors, chairs, beds, wardrobes, reliefs, temples across{' '}
              <strong className="text-emerald-400">12+ categories</strong>. Never design from scratch again —
              pull a file and start cutting.
            </>
          )}
        </p>

        {/* Big promise */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-200 sm:text-base">
            {isBn ? (
              <>প্রতিটা অর্ডারে <strong className="text-foreground">২-৩ দিন সময় বাঁচান</strong> — ফাইল খুঁজে বের করতে মাত্র ৩০ সেকেন্ড</>
            ) : (
              <>Save <strong className="text-foreground">2–3 days per order</strong> — find any file in 30 seconds</>
            )}
          </span>
        </div>

        {/* Proof row */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: HardDrive, num: isBn ? '১৫০ GB' : '150 GB', label: isBn ? 'ফাইল সাইজ' : 'File size' },
            { icon: Files, num: isBn ? '২,৫০০+' : '2,500+', label: isBn ? 'ফাইল' : 'Files' },
            { icon: Download, num: isBn ? 'ইনস্ট্যান্ট' : 'Instant', label: isBn ? 'ডাউনলোড' : 'Download' },
            { icon: Star, num: isBn ? '৪.৯/৫' : '4.9/5', label: isBn ? 'রেটিং' : 'Rating' },
          ].map(({ icon: I, num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted/50 px-3 py-3"
            >
              <I className="h-4 w-4 text-emerald-400" />
              <div className="text-base font-bold text-foreground">{num}</div>
              <div className="text-[10px] text-muted-foreground/70">{label}</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-5xl font-extrabold text-emerald-400">
              {isBn ? '১৫০ ৳' : '150 ৳'}
            </span>
            <span className="text-xl text-muted-foreground/50 line-through">
              {isBn ? '১,৫০০ ৳' : '1,500 ৳'}
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              {isBn ? '-৯০% ছাড়' : '-90% OFF'}
            </span>
          </div>

          {/* Seats */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users2 className="h-4 w-4 text-emerald-400" />
            {isBn ? (
              <>
                <strong className="text-foreground">{toBn(BUNDLE.totalSeats - BUNDLE.seatsLeft)}</strong> জন কিনেছেন
                <span className="font-semibold text-emerald-400">🔥 {toBn(BUNDLE.seatsLeft)} সিট বাকি</span>
              </>
            ) : (
              <>
                <strong className="text-foreground">{BUNDLE.totalSeats - BUNDLE.seatsLeft}</strong> sold
                <span className="font-semibold text-emerald-400">🔥 {BUNDLE.seatsLeft} seats left</span>
              </>
            )}
          </div>

          <CountdownTimer />
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton
            label={isBn ? 'এখনই ডাউনলোড করুন — ১৫০ ৳' : 'Download Now — ৳150'}
            href="#order"
            icon="bolt"
          />
          <button
            onClick={() => scrollToId('whats-inside')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-6 py-3.5 text-sm font-bold text-foreground/90 transition-colors hover:border-emerald-500/50 hover:text-foreground"
          >
            <FolderTree className="h-4 w-4" />
            {isBn ? 'কী কী আছে দেখুন' : 'See What\'s Inside'}
          </button>
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
          {[
            { icon: Download, label: isBn ? 'ইনস্ট্যান্ট ডাউনলোড' : 'Instant Download' },
            { icon: ShieldCheck, label: isBn ? 'কমার্শিয়াল লাইসেন্স' : 'Commercial License' },
            { icon: RefreshCw, label: isBn ? 'লাইফটাইম আপডেট' : 'Lifetime Updates' },
            { icon: Headset, label: isBn ? 'WhatsApp সাপোর্ট' : 'WhatsApp Support' },
            { icon: Lock, label: isBn ? 'নিরাপদ পেমেন্ট' : 'Secure Payment' },
          ].map(({ icon: I, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <I className="h-3.5 w-3.5 text-emerald-400" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================================ */
/*  SECTION 2 — FOUNDER VIDEO                                                   */
/* ============================================================================ */
const FOUNDER_VIDEO_ID = 'o3S_SM6b2Tg'

function FounderVideoSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const [playing, setPlaying] = React.useState(false)

  return (
    <section className="relative z-10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Video className="h-3.5 w-3.5" />
            {isBn ? 'প্রতিষ্ঠাতার ভিডিও' : 'Founder Video'}
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {isBn ? '🎬 কেন এই বান্ডল? তাজ ভাইয়ের কাছ থেকে জানুন' : '🎬 Why this bundle? Hear from Taj Bhai'}
          </h2>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-emerald-500/30 bg-black shadow-2xl shadow-emerald-900/30">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${FOUNDER_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title={isBn ? 'Founder Video — CNC Bundle' : 'Founder Video — CNC Bundle'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label={isBn ? 'Founder ভিডিও চালু করুন' : 'Play the Founder video'}
            >
              <img
                src={`https://i.ytimg.com/vi/${FOUNDER_VIDEO_ID}/hqdefault.jpg`}
                alt={isBn ? 'Founder ভিডিও — তাজ ভাই' : 'Founder video — Taj Bhai'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl shadow-emerald-600/50 transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                  <svg viewBox="0 0 24 24" className="relative h-9 w-9 translate-x-0.5 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  ▶ {isBn ? 'চালু করুন' : 'Play now'}
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Founder photo + caption */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-emerald-500/40">
            <Image
              src="/founder.png"
              alt={isBn ? 'তাজ ভাই — Founder' : 'Taj Bhai — Founder'}
              fill
              sizes="4rem"
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-heading text-sm font-bold text-foreground">
              {isBn ? BUNDLE.founderNameBn : BUNDLE.founderName}
            </div>
            <div className="text-xs text-muted-foreground">
              {isBn ? 'Founder, NextGen Digital Studio · ৭+ বছর CNC অভিজ্ঞতা' : 'Founder, NextGen Digital Studio · 7+ years CNC experience'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================ */
/*  SECTION 3 — THE PROBLEM                                                     */
/* ============================================================================ */
function ProblemSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'The Hidden Cost' : 'The Hidden Cost'}
      title={
        isBn ? (
          <><span className="text-red-400">⚠️</span> আপনি প্রতিদিন কত টাকা হারাচ্ছেন?</>
        ) : (
          <><span className="text-red-400">⚠️</span> How much are you losing every day?</>
        )
      }
      subtitle={
        isBn
          ? 'প্রতিটা অর্ডারে নতুন করে ডিজাইন করা — এটাই আপনার সবচেয়ে বড় লোকসান। হিসাব করে দেখুন।'
          : 'Redesigning for every order — that is your biggest hidden loss. Do the math.'
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p) => (
          <div
            key={isBn ? p.title : p.titleEn}
            className="flex items-start gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
          >
            <span className="text-3xl">{p.emoji}</span>
            <div>
              <h4 className="font-bold text-foreground">{isBn ? p.title : p.titleEn}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{isBn ? p.desc : p.descEn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Consequence */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div>
          <strong className="text-foreground">{isBn ? 'এক বছরে ক্ষতি:' : 'Annual loss:'}</strong>{' '}
          <span className="text-muted-foreground">
            {isBn
              ? 'মাসে ১০টি অর্ডার × ২ দিন = মাসে ২০ দিন শুধু ডিজাইনে। বছরে ২৪০ দিন — আপনার ৮ মাস শুধু ডিজাইনেই চলে যায়। এই সময়ে আপনি কতগুলো অর্ডার নিতে পারতেন?'
              : '10 orders/month × 2 days = 20 days/month on design. 240 days/year — 8 months spent just designing. How many more orders could you have taken in that time?'}
          </span>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 4 — IMAGINE                                                         */
/* ============================================================================ */
function ImagineSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const items = isBn
    ? [
        'একটি ফোল্ডার খুলুন — সব ফাইল সাজানো, নাম দেওয়া, রেডি',
        'ক্লায়েন্ট যা চায় — ৩০ সেকেন্ডে খুঁজে বের করুন',
        'আর নতুন করে ডিজাইন করতে হবে না — শুধু কাট শুরু করুন',
        'ক্লায়েন্ট অবাক হবে আপনার স্পিডে — আরও অর্ডার পাবেন',
        'ফ্যাক্টরি দ্রুত চলবে — ডেলিভারি সময় অর্ধেক',
        'আয় বাড়বে — সময় বাঁচবে — জীবন সহজ হবে',
      ]
    : [
        'Open one folder — every file organized, named, ready',
        'Find what the client wants in 30 seconds',
        'No more designing from scratch — just start cutting',
        'Clients are amazed by your speed — more orders come',
        'Factory runs faster — delivery time halved',
        'Income grows — time saved — life gets easier',
      ]
  return (
    <Section
      eyebrow={isBn ? 'Imagine This' : 'Imagine This'}
      title={
        isBn ? (
          <>✨ <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">কল্পনা করুন</span> — এক মাস পর</>
        ) : (
          <>✨ <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Imagine</span> — one month from now</>
        )
      }
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((t, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-sm font-medium text-foreground sm:text-base">{t}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-bold text-foreground">
          {isBn ? 'এটাই সম্ভব — যখন আপনার কাছে সঠিক লাইব্রেরি থাকে।' : 'This is possible — when you have the right library.'}
        </p>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 5 — BEFORE VS AFTER                                                 */
/* ============================================================================ */
function BeforeAfterSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="before-after"
      eyebrow={isBn ? 'Before vs After' : 'Before vs After'}
      title={isBn ? 'আগে vs পরে — পার্থক্যটা দেখুন' : 'Before vs After — see the difference'}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Before */}
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <X className="h-5 w-5 text-red-400" />
            <h3 className="font-heading text-lg font-bold text-red-300">
              {isBn ? BEFORE_AFTER.before.title : BEFORE_AFTER.before.titleEn}
            </h3>
          </div>
          <ul className="space-y-3">
            {BEFORE_AFTER.before.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                {isBn ? item.bn : item.en}
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="font-heading text-lg font-bold text-emerald-300">
              {isBn ? BEFORE_AFTER.after.title : BEFORE_AFTER.after.titleEn}
            </h3>
          </div>
          <ul className="space-y-3">
            {BEFORE_AFTER.after.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {isBn ? item.bn : item.en}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 6 — WHAT'S INSIDE                                                   */
/* ============================================================================ */
function WhatsInsideSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="whats-inside"
      eyebrow={isBn ? "What's Inside" : "What's Inside"}
      title={isBn ? 'এক ফোল্ডারে পুরো ফার্নিচার দুনিয়া' : 'An entire furniture world in one folder'}
      subtitle={
        isBn
          ? '১২+ ক্যাটাগরি, ২,৫০০+ ফাইল, সব ফরম্যাটে — সবকিছু সাজানো, নাম দেওয়া, সার্চ-রেডি।'
          : '12+ categories, 2,500+ files, all formats — organized, named, search-ready.'
      }
    >
      {/* File types */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {BUNDLE.fileTypes.map((ft) => (
          <span
            key={ft}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground"
          >
            <FileBadge />
            {ft}
          </span>
        ))}
      </div>

      {/* Folder grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOLDERS.map((f) => (
          <div
            key={isBn ? f.name : f.nameEn}
            className="group rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-emerald-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{f.emoji}</span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                {f.size}
              </span>
            </div>
            <h4 className="mt-3 font-bold text-foreground">{isBn ? f.name : f.nameEn}</h4>
            <div className="mt-1 text-sm text-muted-foreground">{isBn ? f.files : f.filesEn}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {f.types.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FileBadge() {
  return <Files className="h-3 w-3 text-emerald-400" />
}

/* ============================================================================ */
/*  SECTION 7 — GALLERY PREVIEW                                                 */
/* ============================================================================ */
function GallerySection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="gallery"
      eyebrow={isBn ? 'Preview Gallery' : 'Preview Gallery'}
      title={isBn ? 'যা পাবেন — এক ঝলক দেখুন' : 'What you get — a quick preview'}
      subtitle={
        isBn
          ? 'বান্ডলের প্রতিটি ক্যাটাগরি থেকে স্যাম্পল। আসল ফাইল আরও বিস্তারিত ও উচ্চ-কোয়ালিটির।'
          : 'Samples from each bundle category. The actual files are even more detailed and higher quality.'
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {GALLERY.map((g) => (
          <div
            key={isBn ? g.label : g.labelEn}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 text-center transition-colors hover:border-emerald-500/40"
          >
            <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{g.emoji}</div>
            <div className="mt-2 text-sm font-bold text-foreground">{isBn ? g.label : g.labelEn}</div>
            <div className="text-[10px] text-muted-foreground/70">{isBn ? g.sub : g.subEn}</div>
          </div>
        ))}
      </div>

      {/* Proof note */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <p className="text-sm text-muted-foreground">
          {isBn
            ? '⚠ এখানে আসল ফাইলের প্রিভিউ ছবি বসাতে হবে — Google Drive স্ক্রিনশট, রেন্ডার ছবি, বা কাট করা প্রোডাক্টের ফটো। এমোজি শুধু placeholder।'
            : '⚠ Real file preview images should be placed here — Google Drive screenshots, render images, or photos of cut products. Emojis are placeholders only.'}
        </p>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 8 — BUNDLE BREAKDOWN                                                */
/* ============================================================================ */
function BundleBreakdownSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'বান্ডল ব্রেকডাউন' : 'Bundle Breakdown'}
      title={isBn ? 'কীভাবে সাজানো — ভেতরে ঢুকে দেখুন' : 'How it\'s organized — look inside'}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Size */}
        <div className="rounded-2xl border border-border bg-card/60 p-6 text-center">
          <HardDrive className="mx-auto h-8 w-8 text-emerald-400" />
          <div className="mt-3 font-heading text-3xl font-extrabold text-foreground">{isBn ? '১৫০ GB' : '150 GB'}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isBn ? 'মোট সাইজ' : 'Total size'}</div>
        </div>
        {/* Files */}
        <div className="rounded-2xl border border-border bg-card/60 p-6 text-center">
          <Files className="mx-auto h-8 w-8 text-emerald-400" />
          <div className="mt-3 font-heading text-3xl font-extrabold text-foreground">{isBn ? '২,৫০০+' : '2,500+'}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isBn ? 'ফাইল সংখ্যা' : 'Total files'}</div>
        </div>
        {/* Categories */}
        <div className="rounded-2xl border border-border bg-card/60 p-6 text-center">
          <FolderTree className="mx-auto h-8 w-8 text-emerald-400" />
          <div className="mt-3 font-heading text-3xl font-extrabold text-foreground">{isBn ? '১২+' : '12+'}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isBn ? 'ক্যাটাগরি' : 'Categories'}</div>
        </div>
      </div>

      {/* Organization system */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <FolderTree className="h-6 w-6 text-emerald-400" />
          <h4 className="mt-2 font-bold text-foreground">{isBn ? 'ফোল্ডার স্ট্রাকচার' : 'Folder Structure'}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {isBn
              ? 'প্রতিটি ক্যাটাগরি আলাদা ফোল্ডারে, সাব-ক্যাটাগরি সহ। যেমন: Door-Panels/Royal/, Door-Panels/Modern/'
              : 'Each category in its own folder with sub-categories. e.g., Door-Panels/Royal/, Door-Panels/Modern/'}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <Search className="h-6 w-6 text-emerald-400" />
          <h4 className="mt-2 font-bold text-foreground">{isBn ? 'নামকরণ সিস্টেম' : 'Naming System'}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {isBn
              ? 'প্রতিটি ফাইলের নামে ক্যাটাগরি + স্টাইল + সাইজ। যেমন: Door-Panels-Royal-900x2100.stl'
              : 'Every file named with category + style + size. e.g., Door-Panels-Royal-900x2100.stl'}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <Search className="h-6 w-6 text-emerald-400" />
          <h4 className="mt-2 font-bold text-foreground">{isBn ? 'সার্চ সিস্টেম' : 'Search System'}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {isBn
              ? 'Google Drive-এ সার্চ করলেই পাবেন। নাম, টাইপ, সাইজ যেকোনো কিছু দিয়ে খুঁজুন।'
              : 'Search directly in Google Drive. Find by name, type, or size — instantly.'}
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 9 — BONUSES                                                         */
/* ============================================================================ */
function BonusSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Free Bonuses' : 'Free Bonuses'}
      title={isBn ? '৬টি ফ্রি বোনাস — মূল্য ১২,৫০০ ৳' : '6 free bonuses — value 12,500 ৳'}
      subtitle={
        isBn
          ? 'বান্ডলের সাথে এই সব বোনাস সম্পূর্ণ ফ্রি। শুধু আজকের লঞ্চ অফারে।'
          : 'All these bonuses included free with the bundle. Today\'s launch offer only.'
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BONUSES.map((b, i) => (
          <div
            key={isBn ? b.name : b.nameEn}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-card to-emerald-500/5 p-6"
          >
            <span className="absolute right-3 top-3 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              {isBn ? 'ফ্রি' : 'FREE'}
            </span>
            <div className="text-3xl">{b.emoji}</div>
            <h4 className="mt-3 font-bold text-foreground">{isBn ? b.name : b.nameEn}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{isBn ? b.desc : b.descEn}</p>
            <div className="mt-3 text-sm font-semibold text-emerald-400">
              {isBn ? `মূল্য: ${toBn(b.value)} ৳` : `Value: ${b.value} ৳`}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 10 — VALUE STACK                                                    */
/* ============================================================================ */
function ValueStackSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const total = VALUE_STACK.reduce((s, v) => s + v.value, 0)
  return (
    <Section
      eyebrow={isBn ? 'Value Stack' : 'Value Stack'}
      title={isBn ? 'আপনি যা পাচ্ছেন — পুরো হিসাব' : 'What you\'re getting — the full math'}
    >
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border bg-card/60">
        {VALUE_STACK.map((v, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 border-b border-border/50 px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm font-medium text-foreground">{isBn ? v.name : v.nameEn}</span>
            </div>
            <span className="text-sm font-bold text-muted-foreground line-through">
              {isBn ? `${toBn(v.value)} ৳` : `${v.value} ৳`}
            </span>
          </div>
        ))}
        {/* Total */}
        <div className="flex items-center justify-between gap-4 bg-emerald-500/10 px-5 py-4">
          <span className="font-bold text-foreground">{isBn ? 'মোট মূল্য (Total Value)' : 'Total Value'}</span>
          <span className="font-heading text-xl font-extrabold text-muted-foreground line-through">
            {isBn ? `${toBn(total)} ৳` : `${total} ৳`}
          </span>
        </div>
        {/* Today */}
        <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-5 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {isBn ? 'আজকের লঞ্চ মূল্য' : 'Today\'s launch price'}
            </div>
            <div className="font-heading text-3xl font-extrabold text-emerald-400">
              {isBn ? '১৫০ ৳' : '150 ৳'}
            </div>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
            {isBn ? `${toBn(Math.round((1 - BUNDLE.price / total) * 100))}% ছাড়` : `${Math.round((1 - BUNDLE.price / total) * 100)}% OFF`}
          </span>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 11 — WHY ONLY 150 BDT                                               */
/* ============================================================================ */
function Why150Section() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Why 150 ৳?' : 'Why 150 ৳?'}
      title={isBn ? 'এত সসতায় কেন? সত্যি কথা বলি' : 'Why so cheap? Let me be honest'}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-emerald-400" />
            <h4 className="font-bold text-foreground">{isBn ? '১. কমিউনিটি গড়তে চাই' : '1. We want to build a community'}</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn
              ? 'আমাদের লক্ষ্য বাংলাদেশের প্রতিটি CNC ওয়ার্কশপে এই বান্ডল পৌঁছানো। দাম কম রাখলে বেশি মানুষ কিনবে, কমিউনিটি বড় হবে, সবাই উপকৃত হবে।'
              : 'Our goal is to put this bundle in every CNC workshop in Bangladesh. A low price means more buyers, a bigger community, everyone benefits.'}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h4 className="font-bold text-foreground">{isBn ? '২. লঞ্চ প্রমোশন' : '2. Launch promotion'}</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn
              ? 'এটি একটি নতুন প্রোডাক্ট। প্রথম ১০০ জন কাস্টমার পাবেন এই দামে। ১০০ জন পূর্ণ হলে মূল্য ১,৫০০ ৳-এ ফিরে যাবে।'
              : 'This is a new product. The first 100 customers get this price. After 100, the price returns to 1,500 ৳.'}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-emerald-400" />
            <h4 className="font-bold text-foreground">{isBn ? '৩. দীর্ঘমেয়াদি সম্পর্ক' : '3. Long-term relationship'}</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn
              ? 'আজ আপনি ১৫০ ৳ দিয়ে কিনলেন, ভালো লাগলে পরে ৭ দিনের বুটক্যাম্প, কাস্টম ডিজাইন সার্ভিস, আরও প্রোডাক্ট নেবেন। আমরা সম্পর্ক চাই, এককালীন লেনদেন না।'
              : 'Today you buy for 150 ৳, and if you like it you will come back for the 7-day bootcamp, custom design service, and more products. We want a relationship, not a one-time sale.'}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm font-bold text-amber-400">
          {isBn
            ? '⚠ সতর্কতা: প্রথম ১০০ সিট পূর্ণ হলে দাম ১০ গুণ বাড়বে। আজই কিনুন।'
            : '⚠ Warning: once the first 100 seats are filled the price goes up 10×. Buy today.'}
        </p>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 12 — COMPARISON                                                     */
/* ============================================================================ */
function ComparisonSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Comparison' : 'Comparison'}
      title={isBn ? 'অন্যান্য উৎস vs NextGen Bundle' : 'Other sources vs NextGen Bundle'}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] overflow-hidden rounded-2xl border border-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {isBn ? 'বৈশিষ্ট্য' : 'Feature'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {isBn ? 'Pinterest / Google / অন্য সেলার' : 'Pinterest / Google / Other sellers'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-emerald-400">
                NextGen Bundle
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => (
              <tr key={i} className="border-t border-border/50">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{isBn ? row.feature : row.featureEn}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <X className="h-3.5 w-3.5 shrink-0 text-red-400/70" />
                    {isBn ? row.others : row.othersEn}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {isBn ? row.nextgen : row.nextgenEn}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 13 — TESTIMONIALS                                                   */
/* ============================================================================ */
function TestimonialsSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Reviews' : 'Reviews'}
      title={isBn ? 'যারা কিনেছেন — তাদের কথা' : 'From people who bought it'}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6"
          >
            {/* Proof badge */}
            {t.proof === 'warn' && (
              <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                <AlertTriangle className="h-3 w-3" />
                {isBn ? '⚠ Replace with Real Proof' : '⚠ Replace with Real Proof'}
              </div>
            )}
            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <Quote className="mt-3 h-5 w-5 text-emerald-400/40" />
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              &ldquo;{isBn ? t.quote : t.quoteEn}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                {(isBn ? t.author : t.authorEn).charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{isBn ? t.author : t.authorEn}</div>
                <div className="text-xs text-muted-foreground">
                  {isBn ? `${t.role}, ${t.city}` : `${t.roleEn}, ${t.cityEn}`}
                </div>
              </div>
            </div>
            {t.proof === 'warn' && (
              <p className="mt-3 text-[10px] text-amber-400/70">{isBn ? t.proofNote : t.proofNoteEn}</p>
            )}
          </div>
        ))}
      </div>

      {/* Proof recommendation */}
      <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">{isBn ? 'প্রমাণ যোগ করুন:' : 'Add real proof:'}</strong>{' '}
            {isBn
              ? 'Facebook রিভিউ স্ক্রিনশট, WhatsApp চ্যাট স্ক্রিনশট, ফ্যাক্টরি/প্রোডাক্ট ছবি, ক্লায়েন্ট প্রজেক্ট ফটো এখানে বসান। ভুয়া রিভিউ ব্যবহার করবেন না।'
              : 'Add Facebook review screenshots, WhatsApp chat screenshots, factory/product photos, and client project photos here. Do not use fake reviews.'}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 14 — CASE STUDIES                                                   */
/* ============================================================================ */
function CaseStudiesSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Case Studies' : 'Case Studies'}
      title={isBn ? 'তিনটি বাস্তব উদাহরণ' : 'Three real examples'}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {CASE_STUDIES.map((cs, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6"
          >
            <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              {isBn ? '⚠ Replace with Real Proof' : '⚠ Replace with Real Proof'}
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground">{isBn ? cs.name : cs.nameEn}</h4>
            <div className="text-xs text-emerald-400">{isBn ? cs.business : cs.businessEn}</div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-red-500/5 p-3">
                <div className="text-[10px] font-bold uppercase text-red-400">{isBn ? 'আগে' : 'Before'}</div>
                <p className="mt-1 text-xs text-muted-foreground">{isBn ? cs.before : cs.beforeEn}</p>
              </div>
              <div className="rounded-lg bg-emerald-500/5 p-3">
                <div className="text-[10px] font-bold uppercase text-emerald-400">{isBn ? 'পরে' : 'After'}</div>
                <p className="mt-1 text-xs text-foreground">{isBn ? cs.after : cs.afterEn}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <Clock className="mx-auto h-4 w-4 text-emerald-400" />
                <div className="mt-1 text-[10px] text-muted-foreground">{isBn ? 'সময় সাশ্রয়' : 'Time saved'}</div>
                <div className="text-[11px] font-bold text-foreground">{isBn ? cs.timeSaved : cs.timeSavedEn}</div>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <TrendingUp className="mx-auto h-4 w-4 text-emerald-400" />
                <div className="mt-1 text-[10px] text-muted-foreground">{isBn ? 'আয় বৃদ্ধি' : 'Income up'}</div>
                <div className="text-[11px] font-bold text-foreground">{isBn ? cs.moneySaved : cs.moneySavedEn}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-amber-400/70">
        {isBn
          ? '⚠ উপরের সংখ্যাগুলো উদাহরণস্বরূপ। আসল ক্লায়েন্টের অনুমতি নিয়ে ছবি ও সাক্ষাৎ যোগ করুন।'
          : '⚠ The numbers above are examples. Add real photos and testimonials with client permission.'}
      </p>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 15 — WHO IS THIS FOR                                                */
/* ============================================================================ */
function WhoForSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Who Is This For' : 'Who Is This For'}
      title={isBn ? 'এই বান্ডল কাদের জন্য?' : 'Who is this bundle for?'}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {WHO_FOR.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-sm font-medium text-foreground">{isBn ? item.bn : item.en}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 16 — WHO SHOULD NOT BUY                                             */
/* ============================================================================ */
function WhoNotForSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Who Should NOT Buy' : 'Who Should NOT Buy'}
      title={isBn ? 'সততার সাথে — কাদের জন্য না' : 'Honestly — who should skip this'}
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {WHO_NOT_FOR.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4"
          >
            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <span className="text-sm font-medium text-foreground">{isBn ? item.bn : item.en}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {isBn
            ? 'আমরা আপনার টাকা নষ্ট করতে চাই না। উপরের যেকোনো পয়েন্ট আপনার ক্ষেত্রে প্রযোজ্য হলে কিনবেন না।'
            : 'We do not want to waste your money. If any point above applies to you, do not buy.'}
        </p>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 17 — FAQ                                                            */
/* ============================================================================ */
function FaqSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="faq"
      eyebrow={isBn ? 'FAQ' : 'FAQ'}
      title={isBn ? 'প্রশ্ন ও উত্তর' : 'Questions & answers'}
      subtitle={
        isBn
          ? '৪০+ প্রশ্নের উত্তর — যা আপনি জানতে চান। আরও থাকলে WhatsApp-এ জিজ্ঞাসা করুন।'
          : '40+ answered questions. If you have more, ask on WhatsApp.'
      }
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card/60 px-5"
            >
              <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline">
                {isBn ? f.q : f.qEn}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {isBn ? f.a : f.aEn}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 18 — RISK REVERSAL / GUARANTEES                                     */
/* ============================================================================ */
function GuaranteeSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Risk Reversal' : 'Risk Reversal'}
      title={isBn ? '৪টি গ্যারান্টি — আপনার কোনো ঝুঁকি নেই' : '4 guarantees — zero risk to you'}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GUARANTEES.map((g, i) => (
          <div
            key={i}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"
          >
            <div className="text-3xl">{g.emoji}</div>
            <h4 className="mt-3 font-bold text-foreground">{isBn ? g.title : g.titleEn}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{isBn ? g.desc : g.descEn}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-emerald-400" />
        <p className="mt-3 text-lg font-bold text-foreground">
          {isBn ? 'আপনার সন্তুষ্টি ১০০% গ্যারান্টিযুক্ত' : 'Your satisfaction is 100% guaranteed'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isBn
            ? 'কোনো কারণে সন্তুষ্ট না হলে WhatsApp-এ জানান — আমরা সমাধান করব।'
            : 'If you are not satisfied for any reason, message us on WhatsApp — we will make it right.'}
        </p>
      </div>
    </Section>
  )
}

/* ============================================================================ */
/*  SECTION 19 — ORDER FORM                                                     */
/* ============================================================================ */
function OrderSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section id="order" className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-emerald-500/30 bg-card/60 shadow-2xl shadow-emerald-900/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-8 text-center text-white sm:px-8">
            <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
              {isBn ? 'এখনই অর্ডার করুন' : 'Order Now'}
            </h2>
            <p className="mt-2 text-sm text-emerald-50">
              {isBn ? '১৫০ ৳ পেমেন্ট করুন — সাথে সাথে Google Drive লিংক পাবেন' : 'Pay 150 ৳ — get the Google Drive link instantly'}
            </p>
          </div>

          {/* Price box */}
          <div className="border-b border-border/50 px-6 py-6 text-center sm:px-8">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-heading text-5xl font-extrabold text-emerald-400">
                {isBn ? '১৫০ ৳' : '150 ৳'}
              </span>
              <span className="text-xl text-muted-foreground/50 line-through">
                {isBn ? '১,৫০০ ৳' : '1,500 ৳'}
              </span>
            </div>
            <div className="mt-2">
              <CountdownTimer />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users2 className="h-4 w-4 text-emerald-400" />
              {isBn
                ? `🔥 শুধুমাত্র ${toBn(BUNDLE.seatsLeft)} সিট বাকি`
                : `🔥 Only ${BUNDLE.seatsLeft} seats left`}
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-6 sm:px-8">
            <LandingLeadForm
              isBn={isBn}
              source="cnc_bundle_order"
              serviceName={`NextGen CNC Design Bundle (${BUNDLE.price} ৳)`}
              submitLabel={isBn ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}
              successMessage={
                isBn
                  ? 'আপনার অর্ডার গ্রহণ করা হয়েছে! নিচের পেমেন্ট ইনস্ট্রাকশন অনুসরণ করুন। পেমেন্ট নিশ্চিত হলেই Google Drive লিংক পাবেন।'
                  : 'Your order has been received! Follow the payment instructions below. You will get the Google Drive link as soon as payment is confirmed.'
              }
              paymentAmount={BUNDLE.price}
              paymentNote={isBn ? 'CNC Bundle — লঞ্চ অফার' : 'CNC Bundle — launch offer'}
            />

            {/* Payment methods */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-border/50 pt-6">
              <span className="text-xs font-semibold text-muted-foreground">{isBn ? 'পেমেন্ট:' : 'Payment:'}</span>
              {['bKash', 'Nagad', 'Rocket', 'Bank'].map((m) => (
                <span key={m} className="rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-foreground">{m}</span>
              ))}
            </div>

            {/* WhatsApp alt */}
            <div className="mt-6 text-center">
              <p className="mb-3 text-xs text-muted-foreground">
                {isBn ? 'অথবা সরাসরি WhatsApp-এ অর্ডার করুন:' : 'Or order directly on WhatsApp:'}
              </p>
              <WhatsAppCTA
                isBn={isBn}
                message={
                  isBn
                    ? 'আমি NextGen CNC Design Bundle অর্ডার করতে চাই (১৫০ ৳)। পেমেন্ট ডিটেইলস দিন।'
                    : 'I want to order the NextGen CNC Design Bundle (150 ৳). Please share payment details.'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================ */
/*  SECTION 20 — EXIT CTA                                                       */
/* ============================================================================ */
function ExitCtaSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'One Year Later' : 'One Year Later'}
      title={
        isBn ? (
          <>{'এক বছর পর কোথায় থাকতে চান? '}<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">আপনি সিদ্ধান্ত নিন</span></>
        ) : (
          <>{'Where do you want to be in one year? '}<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">You decide</span></>
        )
      }
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Option A — without bundle */}
          <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-8">
            <div className="text-4xl">😔</div>
            <h3 className="mt-3 font-heading text-xl font-bold text-red-300">
              {isBn ? 'বান্ডল না কিনলে' : 'Without the bundle'}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(isBn
                ? [
                    'একই রকম ডিজাইন বারবার করবেন',
                    'প্রতিটা অর্ডারে ২-৩ দিন নষ্ট',
                    'ক্লায়েন্ট অন্য কাউকে দিয়ে দেবে',
                    'এক বছর পর একই জায়গায়',
                  ]
                : [
                    'Redesigning the same files again & again',
                    '2–3 days wasted per order',
                    'Clients go to someone faster',
                    'One year later — same place',
                  ]
              ).map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Option B — with bundle */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8">
            <div className="text-4xl">🚀</div>
            <h3 className="mt-3 font-heading text-xl font-bold text-emerald-300">
              {isBn ? 'বান্ডল কিনলে' : 'With the bundle'}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {(isBn
                ? [
                    '৩০ সেকেন্ডে যেকোনো ফাইল খুঁজে পাবেন',
                    'ডেলিভারি সময় অর্ধেক — আয় দ্বিগুণ',
                    'ক্লায়েন্ট আপনার কাছেই ফিরে আসবে',
                    'এক বছর পর — আপনার ব্যবসা বড়',
                  ]
                : [
                    'Find any file in 30 seconds',
                    'Delivery time halved — income doubled',
                    'Clients keep coming back to you',
                    'One year later — your business has grown',
                  ]
              ).map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-10 text-center">
          <p className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            {isBn ? '১৫০ ৳ আজ — বা লক্ষাধিক টাকা নষ্ট প্রতি বছর।' : '150 ৳ today — or lakhs lost every year.'}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn ? 'পছন্দ আপনার।' : 'The choice is yours.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <CtaButton
              label={isBn ? 'হ্যাঁ, আমি প্রস্তুত — ১৫০ ৳' : 'Yes, I\'m in — ৳150'}
              href="#order"
              icon="check"
            />
            <button
              onClick={() => scrollToId('faq')}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-6 py-3.5 text-sm font-bold text-foreground/90 transition-colors hover:border-emerald-500/50"
            >
              {isBn ? 'আরও প্রশ্ন আছে?' : 'Still have questions?'}
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}
