'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  TopBar,
} from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingEyebrow,
  LandingFooter,
  LandingLeadForm,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Cpu,
  Layers,
  PenTool,
  Boxes,
  Wrench,
  Gift,
  Award,
  Armchair,
  Sofa,
  Palette,
  Settings,
  FileText,
  RefreshCw,
  Users,
  Briefcase,
  HelpCircle,
  Map as MapIcon,
  Clock,
  Laptop,
  Languages,
  Paintbrush,
  Smartphone,
  Video,
  Download,
  Headset,
  RotateCcw,
  Check,
  CheckCircle2,
  X,
  ChevronRight,
  Star,
  Users2,
  FileCode2,
  Factory,
  CalendarDays,
  ShieldCheck,
  Lock,
  Zap,
  ArrowRight,
  Quote,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import {
  CNC_COURSE,
  CURRICULUM,
  GALLERY,
  BONUSES,
  VALUE_STACK,
  COMPARISON,
  CASE_STUDIES,
  TESTIMONIALS,
  OBJECTIONS,
  WHO_FOR,
  WHO_NOT_FOR,
  CAREER_STEPS,
  INCOME_OPPORTUNITIES,
  GUARANTEE_BADGES,
  FAQS,
} from './cnc-data'

/* -------------------------------------------------------------------------- */
/*  Icon resolver — map string names → Lucide components                      */
/* -------------------------------------------------------------------------- */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu, Layers, PenTool, Boxes, Wrench, Gift, Award, Armchair, Sofa, Palette,
  Settings, FileText, RefreshCw, Users, Briefcase, HelpCircle, Map: MapIcon,
  Clock, Laptop, Languages, Paintbrush, Smartphone, Video, Download, Headset,
  RotateCcw,
}

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? HelpCircle
  return <Cmp className={className} />
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Scroll smoothly to a section by id. */
function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Reusable gradient CTA button. */
function CtaButton({
  label,
  href = '#register',
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
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.03] hover:shadow-orange-600/50 ${className}`}
    >
      <IconCmp className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      {label}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Countdown timer                                                            */
/* -------------------------------------------------------------------------- */
function CountdownTimer() {
  // Counts down 7 hours from first mount — resets daily feel.
  const [remaining, setRemaining] = React.useState(7 * 60 * 60)

  React.useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 7 * 60 * 60))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
      <Clock className="h-4 w-4" />
      <span className="text-orange-200/80">অফার শেষ হতে</span>
      <span className="font-mono text-base font-bold tabular-nums text-white">
        {pad(h)} : {pad(m)} : {pad(s)}
      </span>
      <span className="text-orange-200/80">বাকি</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper — consistent dark industrial styling                        */
/* -------------------------------------------------------------------------- */
function Section({
  id,
  children,
  className = '',
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  eyebrow?: string
  title?: React.ReactNode
  subtitle?: string
  dark?: boolean
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
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

export function CncTrainingClient() {
  usePageViewTracking('cnc_training_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Ambient industrial gradient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-orange-700/10 blur-[120px]" />
      </div>

      {/* Top progress bar */}
      <ScrollProgress />

      {/* Sticky header CTA (appears after hero) */}
      <StickyHeader />

      <TopBar />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <FreeBonusBanner />
        <VideoLetter />
        <InstructorSection />
        <ProblemSection />
        <StorySection />
        <ObjectionSection />
        <BeforeAfterSection />
        <CurriculumSection />
        <GallerySection />
        <BonusSection />
        <ValueStackSection />
        <Why250Section />
        <ComparisonSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <CertificateSection />
        <WhoForSection />
        <CareerSection />
        <IncomeSection />
        <GuaranteeSection />
        <FutureVisionSection />
        <FinalCtaSection />
        <SeoSection />
        <FaqSection />
        <RegisterSection />
        <DownsellSection />
      </main>

      <LandingFooter isBn={true} />
      <FloatingButtons />

      {/* Sticky bottom CTA (mobile) */}
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
        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky header CTA                                                          */
/* -------------------------------------------------------------------------- */
function StickyHeader() {
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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 bg-zinc-900/95 px-4 py-2.5 shadow-lg shadow-black/40 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-orange-400">CNC Bootcamp</span>
          <span className="hidden text-xs text-zinc-400 sm:inline">· ২৫০ ৳ · ৭ দিন</span>
        </div>
        <button
          onClick={() => scrollToId('register')}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 sm:text-sm"
        >
          <Zap className="h-3.5 w-3.5" />
          রেজিস্টার করুন
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky bottom CTA (mobile)                                                 */
/* -------------------------------------------------------------------------- */
function StickyBottomCta() {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      // show after hero, hide near the register form & footer
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
      <div className="flex items-center gap-2 border-t border-orange-500/20 bg-zinc-900/95 px-3 py-3 backdrop-blur">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wide text-zinc-500">সীমিত আসন</div>
          <div className="text-sm font-bold text-white">
            ২৫০ ৳ <span className="text-xs font-normal text-zinc-500 line-through">৫,৯৯০ ৳</span>
          </div>
        </div>
        <button
          onClick={() => scrollToId('register')}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md"
        >
          <Zap className="h-4 w-4" />
          রেজিস্টার
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  1. HERO                                                                    */
/* -------------------------------------------------------------------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Urgency badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-300 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          🔥 লাইভ ব্যাচ শুরু হচ্ছে {CNC_COURSE.batchStart}, রাত ৯টায়
        </span>

        {/* Headline — sells the OUTCOME not the course */}
        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            মাত্র ৭ দিনে Professional CNC Designer
          </span>
          <br />
          হওয়ার রোডম্যাপ শুরু করুন
        </h1>

        {/* Subheadline — Who / What / Outcome / Timeline / Support / Bonus */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          <strong className="text-white">প্রতিদিন রাত ৯টায় লাইভ জুম ক্লাস</strong> — ৭ দিনে{' '}
          <strong className="text-orange-400">১৫+ প্রজেক্ট</strong>, সার্টিফিকেট + সম্পূর্ণ ফ্রি{' '}
          <strong className="text-amber-400">Chair Leg Design</strong> ফাইল (মূল্য ৩০০ টাকা)।
          আগামী ৩০-৯০ দিনের মধ্যে Freelancing, Factory Job অথবা নিজের Furniture Business থেকে আয় করার জন্য প্রস্তুত হোন।
        </p>

        <div className="mt-4 text-sm font-medium text-zinc-400">
          Aspire, Vectric, ArtCAM — ইন্ডাস্ট্রি-স্ট্যান্ডার্ড সফটওয়্যার শিখুন
        </div>

        {/* Big promise */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-200 sm:text-base">
            এই কোর্স শেষ করার পর আপনি <strong className="text-white">অন্তত ৭টি Professional CNC Project</strong> তৈরি করবেন
          </span>
        </div>

        {/* Proof row */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { icon: Users2, num: '১৫০+', label: 'শিক্ষার্থী' },
            { icon: Star, num: '৪.৮', label: '/৫ রেটিং' },
            { icon: FileCode2, num: '৪,০০০+', label: 'ডিজাইন ফাইল' },
            { icon: Factory, num: '৩০+', label: 'ফ্যাক্টরি' },
            { icon: CalendarDays, num: '৭+', label: 'বছর অভিজ্ঞতা' },
          ].map(({ icon: I, num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-3"
            >
              <I className="h-4 w-4 text-orange-400" />
              <div className="text-base font-bold text-white">{num}</div>
              <div className="text-[10px] text-zinc-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Price + seat */}
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-5xl font-extrabold text-orange-400">২৫০ ৳</span>
            <span className="text-xl text-zinc-600 line-through">৫,৯৯০ ৳</span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              + Chair Leg ফ্রি
            </span>
          </div>

          {/* Seat counter */}
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Users2 className="h-4 w-4 text-orange-400" />
            এই ব্যাচে <strong className="text-white">{CNC_COURSE.seatsTaken}</strong> জন রেজিস্টার করেছেন
            <span className="text-zinc-600">(সর্বোচ্চ {CNC_COURSE.maxSeats})</span>
            <span className="font-semibold text-orange-400">🔥 {CNC_COURSE.seatsLeft} সিট বাকি</span>
          </div>

          {/* Deadline */}
          <div className="text-xs font-semibold text-amber-400">
            ⏰ আজ রাত ১১:৫৯ পর্যন্ত রেজিস্ট্রেশন খোলা — তারপর আগামী ব্যাচের জন্য অপেক্ষা
          </div>

          {/* Countdown */}
          <CountdownTimer />
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton label="রেজিস্টার করুন — ২৫০ টাকা" href="#register" icon="check" />
          <button
            onClick={() => scrollToId('curriculum')}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 text-sm font-bold text-zinc-200 transition-colors hover:border-orange-500/50 hover:text-white"
          >
            <Video className="h-4 w-4" />
            কারিকুলাম দেখুন
          </button>
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-400 sm:text-sm">
          {[
            { icon: Award, label: 'সার্টিফিকেট' },
            { icon: Gift, label: 'Chair Leg ফ্রি' },
            { icon: Video, label: 'লাইভ ক্লাস' },
            { icon: RotateCcw, label: 'রেকর্ডিং' },
            { icon: Users2, label: '১৫০+ শিক্ষার্থী' },
            { icon: Star, label: '৪.৮/৫' },
          ].map(({ icon: I, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <I className="h-3.5 w-3.5 text-orange-400" />
              {label}
            </span>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-zinc-500">
          {[
            { icon: Lock, label: 'SSL' },
            { icon: ShieldCheck, label: 'Secure Payment' },
            { icon: Award, label: 'Certificate' },
            { icon: Headset, label: 'WhatsApp Support' },
            { icon: Video, label: 'Zoom Live' },
          ].map(({ icon: I, label }) => (
            <span key={label} className="inline-flex items-center gap-1">
              <I className="h-3 w-3" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Free bonus banner                                                       */
/* -------------------------------------------------------------------------- */
function FreeBonusBanner() {
  return (
    <div className="relative z-10 bg-gradient-to-r from-orange-600 to-amber-500 py-3 text-center shadow-lg shadow-orange-900/30">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 text-sm font-bold text-white sm:text-base">
        <Gift className="h-5 w-5" />
        রেজিস্টার করলেই একটি সম্পূর্ণ Chair Leg Design ফাইল ফ্রি পাবেন (মূল্য ৩০০ টাকা)!
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Video sales letter placeholder                                          */
/* -------------------------------------------------------------------------- */
function VideoLetter() {
  return (
    <section className="relative z-10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          className="group relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-zinc-900 to-zinc-900/50 px-6 py-16 text-center transition-colors hover:border-orange-500/60"
          aria-label="Founder ভিডিও দেখুন"
        >
          <div className="absolute inset-0 bg-orange-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-600/40 transition-transform group-hover:scale-110">
            <Video className="h-9 w-9 text-white" />
          </div>
          <div className="relative mt-2 text-lg font-bold text-white">🎬 Founder Video — ৩ মিনিট</div>
          <div className="relative text-sm text-zinc-400">CNC ডিজাইনার হওয়ার সম্পূর্ণ রোডম্যাপ</div>
        </button>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Instructor authority (E-E-A-T)                                          */
/* -------------------------------------------------------------------------- */
function InstructorSection() {
  return (
    <Section
      eyebrow="Meet Your Trainer"
      title={<>👨‍🏫 তাজ ভাই — আপনার গাইড</>}
      subtitle="৭+ বছরের অভিজ্ঞতা, ১৫০+ শিক্ষার্থী, ৩০+ ফ্যাক্টরি — আপনি সঠিক হাতে আছেন"
    >
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          {/* Avatar */}
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 ring-2 ring-orange-500/30">
            <div className="text-center">
              <div className="font-heading text-5xl font-extrabold text-orange-400">তাজ</div>
              <div className="mt-1 text-xs text-zinc-500">Founder</div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">{CNC_COURSE.instructorNameBn}</h3>
            <div className="mt-1 text-sm font-medium text-orange-400">{CNC_COURSE.instructorTitleBn}</div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              ৭+ বছর অভিজ্ঞতা, ১৫০+ শিক্ষার্থীকে CNC ডিজাইন শিখিয়েছেন। ৩০+ ফ্যাক্টরির সাথে কাজ
              করেছেন। ৪,০০০+ ডিজাইন ফাইল তৈরি করেছেন।
            </p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Users2, label: '১৫০+ শিক্ষার্থী' },
                { icon: Star, label: '৪.৮/৫' },
                { icon: Settings, label: '৭+ বছর' },
                { icon: Factory, label: '৩০+ ফ্যাক্টরি' },
                { icon: FileCode2, label: '৪,০০০+ ফাইল' },
              ].map(({ icon: I, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  <I className="h-3.5 w-3.5 text-orange-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['CNC Specialist', 'Furniture Designer', 'Freelance Mentor', 'Factory Consultant'].map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-300"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Authority quote */}
            <div className="mt-5 rounded-2xl border-l-4 border-orange-500 bg-zinc-800/40 px-4 py-3">
              <Quote className="mb-1 h-4 w-4 text-orange-500" />
              <p className="text-sm italic text-zinc-300">
                &ldquo;আমি নিজে ৭ বছর CNC ডিজাইন করেছি। ১৫০+ শিক্ষার্থীকে শিখিয়েছি। ৩০+ ফ্যাক্টরিতে
                কাজ করেছি। আমি জানি কী কাজ করে — এবং আমি তা শেখাব।&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  5. Problem section (StoryBrand — external/internal/philosophical)         */
/* -------------------------------------------------------------------------- */
function ProblemSection() {
  const pains = [
    { t: 'কোথায় শুরু করবেন বুঝতে পারেন না', d: 'সফটওয়্যার, টুলস, সেটআপ — সবকিছুই জটিল মনে হয়' },
    { t: 'ভালো প্রশিক্ষক নেই', d: 'ইউটিউবে ছোটাছুটি করেন, কিন্তু সঠিক গাইডলাইন পান না' },
    { t: 'প্র্যাকটিক্যাল প্রজেক্টের অভাব', d: 'শুধু থিওরি শিখে বাস্তবে কাজ করতে পারেন না' },
    { t: 'ব্যয়বহুল কোর্স', d: '১০,০০০-২০,০০০ টাকার কোর্স, কিন্তু গ্যারান্টি নেই' },
    { t: 'পোর্টফোলিও নেই', d: 'চাকরি বা ফ্রিল্যান্সিং এর জন্য প্রমাণপত্র নেই' },
  ]
  return (
    <Section
      eyebrow="The Problem"
      title={
        <>
          <span className="text-orange-400">⚠️</span> CNC ডিজাইন শিখতে গিয়ে এই সমস্যাগুলোর মুখোমুখি
          হয়েছেন?
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pains.map((p) => (
          <div
            key={p.t}
            className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
          >
            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div>
              <h4 className="font-bold text-white">{p.t}</h4>
              <p className="mt-1 text-sm text-zinc-400">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Consequence */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
        <span className="text-2xl">⚠️</span>
        <div>
          <strong className="text-white">ফলাফল:</strong>{' '}
          <span className="text-zinc-300">
            আপনি আটকে থাকেন, আয়ের সুযোগ হারান, আর প্রতিযোগীরা এগিয়ে যায়।
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <CtaButton label="এই সুযোগ হাতছাড়া করতে চাই না — রেজিস্টার" href="#register" icon="bolt" />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  6. Story section (Donald Miller — guide empathy)                          */
/* -------------------------------------------------------------------------- */
function StorySection() {
  return (
    <Section
      eyebrow="The Story"
      title={<>📖 আমি কেন এই কোর্স তৈরি করেছি</>}
    >
      <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-zinc-300">
        <p>
          <strong className="text-white">আমি ৭ বছর ধরে Furniture Industry তে CNC Design করেছি।</strong>{' '}
          যশোরের ছোট একটি ওয়ার্কশপ থেকে শুরু করে বড় ফ্যাক্টরি পর্যন্ত কাজ করেছি।
        </p>
        <p>
          সেই অভিজ্ঞতায় আমি দেখেছি — <strong className="text-white">নতুনরা প্রতিবার একই ভুল করে।</strong>{' '}
          তারা সফটওয়্যার শিখে, কিন্তু প্রজেক্ট তৈরি করতে পারে না। তারা প্রজেক্ট তৈরি করে, কিন্তু
          পোর্টফোলিও তৈরি করে না। তারা পোর্টফোলিও তৈরি করে, কিন্তু ক্লায়েন্ট পায় না।
        </p>
        <div className="rounded-2xl border-l-4 border-orange-500 bg-zinc-900/60 px-5 py-4">
          <Quote className="mb-1 h-4 w-4 text-orange-500" />
          <p className="italic text-zinc-200">
            &ldquo;আমি সেই ভুলগুলো এড়ানোর জন্য এই Bootcamp বানিয়েছি — যাতে আপনি সরাসরি প্রফেশনাল
            লেভেল থেকে শুরু করতে পারেন।&rdquo;
          </p>
        </div>
        <p>
          <strong className="text-white">আমার লক্ষ্য:</strong> আপনি যখন এই কোর্স শেষ করবেন, তখন আপনার
          হাতে <strong className="text-orange-400">৭টি প্রফেশনাল প্রজেক্ট</strong> থাকবে,{' '}
          <strong className="text-orange-400">১টি সার্টিফিকেট</strong> থাকবে, এবং{' '}
          <strong className="text-orange-400">আত্মবিশ্বাস</strong> থাকবে যে আপনি ফ্রিল্যান্সিং বা
          চাকরি শুরু করতে পারেন।
        </p>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  7. Objection handling                                                      */
/* -------------------------------------------------------------------------- */
function ObjectionSection() {
  return (
    <Section
      eyebrow="Objection Handling"
      title={<>🧠 আপনার মনে যে প্রশ্নগুলো আসছে...</>}
      subtitle="আমরা আগেই উত্তর দিয়ে রেখেছি"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {OBJECTIONS.map((o) => (
          <div
            key={o.q}
            className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-orange-500/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Icon name={o.icon} className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">{o.q}</h4>
              <p className="mt-1 text-sm text-zinc-400">{o.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  8. Before / After                                                          */
/* -------------------------------------------------------------------------- */
function BeforeAfterSection() {
  return (
    <Section
      eyebrow="Transformation"
      title={<>⚡ আগে → পরে</>}
      subtitle="৭ দিনের পার্থক্য"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Before */}
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-300">
            আগে
          </span>
          <h4 className="mt-3 font-heading text-xl font-bold text-white">CNC ডিজাইন জানতেন না</h4>
          <ul className="mt-4 space-y-2">
            {[
              'কোথায় শুরু করবেন জানতেন না',
              'কোনো প্রজেক্ট ছিল না',
              'আয়ের সুযোগ ছিল না',
              'কনফিউজড ছিলেন',
            ].map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                <X className="h-4 w-4 shrink-0 text-red-400" />
                {i}
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
            ৭ দিন পর
          </span>
          <h4 className="mt-3 font-heading text-xl font-bold text-white">প্রফেশনাল CNC ডিজাইনার</h4>
          <ul className="mt-4 space-y-2">
            {[
              '১৫+ প্রজেক্ট তৈরি করেছেন',
              'পোর্টফোলিও তৈরি হয়েছে',
              'ফ্রিল্যান্সিং শুরু করতে পারছেন',
              'আত্মবিশ্বাসী',
            ].map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  9. Curriculum                                                              */
/* -------------------------------------------------------------------------- */
function CurriculumSection() {
  return (
    <Section
      id="curriculum"
      eyebrow="Curriculum"
      title={<>📚 ৭ দিনে ৭টি মূল প্রজেক্ট + ৮টি বোনাস প্রজেক্ট</>}
      subtitle="প্রতিদিন রাত ৯টায় — প্রতিদিন ১টি নতুন দক্ষতা"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CURRICULUM.map(({ day, title, desc, project, isMain, isGraduation }) => (
          <div
            key={day}
            className={`relative flex flex-col gap-3 rounded-2xl border p-5 transition-colors ${
              isMain
                ? 'border-orange-500/50 bg-orange-500/10'
                : isGraduation
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-orange-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-heading text-lg font-extrabold text-white shadow-md ${
                  isMain
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                    : isGraduation
                      ? 'bg-gradient-to-br from-amber-500 to-yellow-500'
                      : 'bg-gradient-to-br from-zinc-700 to-zinc-800'
                }`}
              >
                D{day}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-white">{title}</h3>
                <p className="mt-0.5 text-sm text-zinc-400">{desc}</p>
              </div>
            </div>
            <span
              className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                isMain
                  ? 'bg-orange-500/20 text-orange-300'
                  : isGraduation
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              {project}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-zinc-400">
        <Gift className="mr-1 inline h-4 w-4 text-orange-400" />
        বোনাস: ৮টি অতিরিক্ত প্রজেক্ট ফাইল (মূল্য ৫,০০০+ টাকা)
      </p>

      <div className="mt-6 text-center">
        <CtaButton label="আমি এই ১৫+ প্রজেক্ট তৈরি করতে চাই — রেজিস্টার" href="#register" icon="bolt" />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  10. Project gallery                                                        */
/* -------------------------------------------------------------------------- */
function GallerySection() {
  return (
    <Section
      eyebrow="Portfolio Preview"
      title={<>🖼️ আপনি যা তৈরি করতে পারবেন</>}
      subtitle="এই কোর্স শেষে আপনার পোর্টফোলিওতে থাকবে এসব প্রজেক্ট"
    >
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {GALLERY.map((g) => (
          <div
            key={g.label}
            className="group flex flex-col items-center justify-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-center transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-zinc-900"
          >
            <span className="text-3xl transition-transform group-hover:scale-110 sm:text-4xl">{g.emoji}</span>
            <span className="text-sm font-bold text-white">{g.label}</span>
            <span className="text-[10px] text-zinc-500">{g.sub}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  11. Bonus stack                                                            */
/* -------------------------------------------------------------------------- */
function BonusSection() {
  const totalBonus = BONUSES.reduce((s, b) => s + b.value, 0)
  return (
    <Section
      eyebrow="Bonus Stack"
      title={<>🎁 বোনাস প্যাকেজ — মোট মূল্য ৳{totalBonus.toLocaleString('bn-BD')}+</>}
      subtitle="আপনি শুধু কোর্স নয়, সম্পূর্ণ ইকোসিস্টেম পাচ্ছেন"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {BONUSES.map((b) => (
          <div
            key={b.title}
            className="flex items-start gap-3 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-zinc-900/30 p-5 transition-colors hover:border-orange-500/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Icon name={b.icon} className="h-5 w-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <strong className="text-white">{b.title}</strong>
                <span className="shrink-0 text-xs font-bold text-amber-400">
                  (মূল্য {b.value.toLocaleString('bn-BD')} টাকা)
                </span>
              </div>
              <p className="mt-0.5 text-sm text-zinc-400">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  12. Value stack                                                            */
/* -------------------------------------------------------------------------- */
function ValueStackSection() {
  const total = VALUE_STACK.reduce((s, i) => s + i.value, 0)
  const savings = total - CNC_COURSE.price
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-orange-950/30 p-8 text-center shadow-2xl shadow-orange-900/20 sm:p-10">
        <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
          💎 মোট মূল্য
        </h2>
        <div className="mt-6 space-y-2 text-left">
          {VALUE_STACK.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-zinc-800 pb-2 text-sm"
            >
              <span className="text-zinc-300">{item.label}</span>
              <span className="font-semibold text-zinc-400">
                {item.value.toLocaleString('bn-BD')} ৳
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-zinc-500">মোট মূল্য</div>
        <div className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
          ৳{total.toLocaleString('bn-BD')}{' '}
          <span className="text-lg font-normal text-zinc-600 line-through">৫,৯৯০</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-300">
          ✅ আপনি বাঁচাচ্ছেন ৳{savings.toLocaleString('bn-BD')}
        </div>
        <div className="mt-5">
          <span className="inline-block rounded-full bg-white/10 px-6 py-2 text-sm text-zinc-300">
            আজকে মাত্র{' '}
            <strong className="text-orange-400">২৫০ ৳</strong>
          </span>
        </div>
        <div className="mt-6">
          <CtaButton label="আমি সেরা অফারটি নিতে চাই — রেজিস্টার" href="#register" icon="bolt" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  13. Why only 250 TK                                                        */
/* -------------------------------------------------------------------------- */
function Why250Section() {
  return (
    <Section eyebrow="Why So Cheap?" title={<>🤔 কেন মাত্র ২৫০ টাকা?</>}>
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 text-base leading-relaxed text-zinc-300 sm:p-8">
        <p>
          <strong className="text-white">কারণ এটি একটি প্রমোশনাল ক্যাম্পেইন।</strong> আমরা চাই{' '}
          <strong className="text-orange-400">বাংলাদেশের ১০,০০০+ মানুষ</strong> CNC ডিজাইন শিখুক।
        </p>
        <p className="mt-4">
          এই ব্যাচের শিক্ষার্থীদের কেস স্টাডি, টেস্টিমোনিয়াল এবং প্রজেক্টগুলো আমরা আমাদের ভবিষ্যৎ
          অ্যাডভান্সড কোর্সের জন্য ব্যবহার করব।
        </p>
        <p className="mt-4 text-lg font-bold text-white">
          এটাই আপনার সুযোগ — কম খরচে প্রফেশনাল স্কিল অর্জন করার।
        </p>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  14. Comparison table                                                       */
/* -------------------------------------------------------------------------- */
function ComparisonSection() {
  return (
    <Section eyebrow="Comparison" title={<>⚖️ তুলনা করে দেখুন</>}>
      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-zinc-900">
                <th className="px-4 py-4 text-left font-bold text-zinc-300">বৈশিষ্ট্য</th>
                <th className="px-4 py-4 text-left font-bold text-zinc-400">অন্য কোর্স</th>
                <th className="px-4 py-4 text-left font-bold text-orange-400">NextGen CNC Bootcamp</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? 'bg-zinc-950/50' : 'bg-zinc-900/30'}
                >
                  <td className="px-4 py-3 font-medium text-white">{row.feature}</td>
                  <td className="px-4 py-3 text-zinc-500">{row.other}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">
                    <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px]">
                      ✓
                    </span>
                    {row.ours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 text-center">
        <CtaButton label="আমি সেরা অফারটি নিতে চাই — রেজিস্টার" href="#register" icon="bolt" />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  15. Case studies                                                           */
/* -------------------------------------------------------------------------- */
function CaseStudiesSection() {
  return (
    <Section
      eyebrow="Case Studies"
      title={<>📊 রিয়েল শিক্ষার্থীদের সাফল্যের গল্প</>}
      subtitle="১০+ শিক্ষার্থীর বাস্তব ফলাফল"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-orange-500/40"
          >
            <div className="flex items-center justify-between gap-2">
              <strong className="text-white">{c.name}</strong>
              <span className="text-xs text-zinc-500">{c.city}</span>
            </div>
            <p className="text-sm text-zinc-400">
              <span className="text-red-400">আগে:</span> {c.before}
              <br />
              <span className="text-emerald-400">পরে:</span> {c.after}
            </p>
            <span className="mt-auto inline-flex w-fit rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
              {c.result}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  16. Testimonials                                                           */
/* -------------------------------------------------------------------------- */
function TestimonialsSection() {
  return (
    <Section
      eyebrow="Testimonials"
      title={<>📣 শিক্ষার্থীদের মতামত</>}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-zinc-200">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-800 pt-3">
              <div>
                <div className="text-sm font-bold text-white">— {t.author}</div>
                <div className="text-xs text-zinc-500">{t.city}</div>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                {t.result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  17. Certificate preview                                                    */
/* -------------------------------------------------------------------------- */
function CertificateSection() {
  return (
    <Section
      eyebrow="Certificate"
      title={<>📜 সার্টিফিকেট কেমন?</>}
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-zinc-900 to-amber-950/20 p-8 text-center shadow-2xl shadow-amber-900/20 sm:p-12">
          <Award className="mx-auto h-14 w-14 text-amber-400" />
          <div className="mt-3 text-lg font-bold text-white sm:text-xl">
            CNC 3D ডিজাইনার সার্টিফিকেট
          </div>
          <div className="mt-1 text-xs text-zinc-400">NextGen Digital Studio কর্তৃক প্রদত্ত</div>
          <div className="mt-5 inline-block rounded-lg border border-amber-500/30 bg-white/5 px-6 py-2">
            <span className="font-bold text-white">{CNC_COURSE.instructorNameBn}</span>
            <span className="text-xs text-zinc-500"> — স্বাক্ষর</span>
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            কোর্স সম্পন্নের পর ডিজিটাল সার্টিফিকেট পাবেন
          </div>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  18. Who is this for                                                        */
/* -------------------------------------------------------------------------- */
function WhoForSection() {
  return (
    <Section
      eyebrow="Who Is This For?"
      title={<>🎯 এই কোর্স কার জন্য?</>}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* For */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
          <h4 className="flex items-center gap-2 font-heading text-xl font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" /> যাদের জন্য
          </h4>
          <ul className="mt-4 space-y-2.5">
            {WHO_FOR.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {w}
              </li>
            ))}
          </ul>
        </div>
        {/* Not for */}
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 sm:p-8">
          <h4 className="flex items-center gap-2 font-heading text-xl font-bold text-red-300">
            <X className="h-5 w-5" /> যাদের জন্য নয়
          </h4>
          <ul className="mt-4 space-y-2.5">
            {WHO_NOT_FOR.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-zinc-400">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  19. Career roadmap                                                         */
/* -------------------------------------------------------------------------- */
function CareerSection() {
  return (
    <Section
      eyebrow="Career Path"
      title={<>🚀 ক্যারিয়ার রোডম্যাপ</>}
      subtitle="শেখা থেকে শুরু করে নিজের ব্যবসা পর্যন্ত"
    >
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        {CAREER_STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
              <span className="text-3xl">{step.icon}</span>
              <h4 className="font-heading text-sm font-bold text-white">{step.title}</h4>
              <p className="text-xs text-zinc-400">{step.desc}</p>
            </div>
            {i < CAREER_STEPS.length - 1 && (
              <ChevronRight className="mx-auto hidden h-6 w-6 shrink-0 rotate-90 text-orange-500 sm:block sm:rotate-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  20. Income opportunity                                                     */
/* -------------------------------------------------------------------------- */
function IncomeSection() {
  return (
    <Section
      eyebrow="Income Potential"
      title={<>💰 আয়ের সুযোগ</>}
      subtitle="CNC ডিজাইন স্কিল দিয়ে আয়ের একাধিক পথ"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {INCOME_OPPORTUNITIES.map((inc) => (
          <div
            key={inc.label}
            className="flex flex-col items-center gap-1 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-orange-950/20 p-5 text-center"
          >
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <div className="font-heading text-2xl font-extrabold text-emerald-400">{inc.amount}</div>
            <div className="text-xs text-zinc-400">{inc.label}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-zinc-500">
        ⚠️ আয়ের উদাহরণগুলো শিক্ষার্থীদের বাস্তব অভিজ্ঞতা ও বাজার পরিস্থিতির ভিত্তিতে দেওয়া হয়েছে।
        ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।
      </p>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  21. Guarantee / risk reversal                                             */
/* -------------------------------------------------------------------------- */
function GuaranteeSection() {
  return (
    <Section
      eyebrow="Risk Reversal"
      title={null}
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 to-zinc-900 p-6 text-center shadow-2xl shadow-emerald-900/20 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <ShieldCheck className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="mt-4 font-heading text-xl font-extrabold leading-snug text-white sm:text-2xl">
          প্রথম ক্লাস, প্রথম অ্যাসাইনমেন্ট এবং আমাদের নির্দেশনা অনুসরণ করার পরও যদি মনে হয় এই কোর্স
          আপনার জন্য নয় — <span className="text-emerald-400">পুরো টাকা ফেরত</span>
        </h2>
        <p className="mt-4 text-base text-zinc-300">
          <strong className="text-white">কোনো প্রশ্ন থাকবে না।</strong> আপনি ঝুঁকি নিচ্ছেন না — আমরা নিচ্ছি।
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          <Check className="mr-1 inline h-4 w-4 text-emerald-400" />
          Chair Leg Design ফাইলটি <strong className="text-white">আপনারই থাকবে</strong> — এমনকি রিফান্ড নিলেও।
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {GUARANTEE_BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"
            >
              <Icon name={b.icon} className="h-3.5 w-3.5" />
              {b.label}
            </span>
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          ℹ️ <strong className="text-zinc-400">শর্ত:</strong> প্রথম ক্লাসের ২৪ ঘন্টার মধ্যে অসন্তুষ্ট হলে —
          পুরো টাকা ফেরত। Chair Leg Design ফাইলটি আপনারই থাকবে।
        </p>
      </div>

      <div className="mt-8 text-center">
        <CtaButton label="কোন ঝুঁকি নেই — আমি রেজিস্টার করতে চাই" href="#register" icon="bolt" />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  22. Future vision (emotional future pacing)                               */
/* -------------------------------------------------------------------------- */
function FutureVisionSection() {
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-zinc-900 to-zinc-900 p-8 text-center shadow-2xl sm:p-12">
        <Sparkles className="mx-auto h-10 w-10 text-orange-400" />
        <h2 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Imagine...
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          আজ থেকে <strong className="text-orange-400">১ বছর পরে</strong>...
          <br />
          <br />
          আপনি হয়তো <strong className="text-white">নিজের ফার্নিচার ফ্যাক্টরি</strong> চালাচ্ছেন, অথবা{' '}
          <strong className="text-white">ফ্রিল্যান্সিং</strong> করে মাসে ৫০,০০০+ টাকা আয় করছেন, অথবা{' '}
          <strong className="text-white">CNC ডিজাইন কনসালট্যান্ট</strong> হিসেবে কাজ করছেন।
          <br />
          <br />
          সবকিছুর শুরু — <strong className="text-orange-400">আজকের ২৫০ টাকা বিনিয়োগ।</strong>
        </p>
        <p className="mt-6 text-xl font-bold text-orange-400 sm:text-2xl">
          আপনি কি অপেক্ষা করবেন?
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton label="হ্যাঁ, আমি আমার ভবিষ্যত তৈরি করতে চাই — ২৫০ টাকা" href="#register" icon="bolt" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  23. Final CTA                                                              */
/* -------------------------------------------------------------------------- */
function FinalCtaSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-orange-500/30 bg-zinc-900/60 p-8 text-center sm:p-10">
        <p className="font-heading text-2xl font-bold text-white sm:text-3xl">
          আজ মাত্র ২৫০ টাকা বিনিয়োগ করুন।
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
          আগামী ৭ দিনে আপনার প্রথম CNC Portfolio তৈরি করুন। এরপর আপনার প্রথম ক্লায়েন্ট, প্রথম আয় এবং
          নতুন ক্যারিয়ারের পথে যাত্রা শুরু করুন।
        </p>
        <p className="mt-4 text-lg font-bold text-orange-400">
          <span className="rounded bg-orange-500/20 px-2 py-0.5">
            আজই শুরু করুন — কারণ অপেক্ষার কোনো মূল্য নেই।
          </span>
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton label="আমি শুরু করতে প্রস্তুত — রেজিস্টার" href="#register" icon="bolt" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  24. SEO content section                                                    */
/* -------------------------------------------------------------------------- */
function SeoSection() {
  return (
    <Section
      eyebrow="About CNC Design"
      title={<>🔍 CNC 3D ডিজাইন কী এবং কেন এটি শিখবেন?</>}
    >
      <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
        <p>
          <strong className="text-white">CNC 3D ডিজাইন</strong> হলো কম্পিউটার-এডেড ডিজাইন (CAD) সফটওয়্যার
          ব্যবহার করে ত্রিমাত্রিক মডেল তৈরি করা যা CNC মেশিনে কাটার জন্য ব্যবহৃত হয়।{' '}
          <strong className="text-orange-400">Aspire</strong>,{' '}
          <strong className="text-orange-400">Vectric</strong>,{' '}
          <strong className="text-orange-400">ArtCAM</strong> — এগুলি ইন্ডাস্ট্রি-স্ট্যান্ডার্ড CNC ডিজাইন
          সফটওয়্যার।
        </p>
        <p>
          বাংলাদেশে <strong className="text-white">CNC ট্রেনিং</strong> এর চাহিদা দিন দিন বাড়ছে।{' '}
          <strong className="text-white">Furniture Design</strong>,{' '}
          <strong className="text-white">Chair Leg Design</strong>,{' '}
          <strong className="text-white">Door Panel Design</strong>,{' '}
          <strong className="text-white">Relief Design</strong> — এসব দক্ষতা অর্জন করলে আপনি{' '}
          <strong className="text-white">ফ্রিল্যান্সিং</strong>,{' '}
          <strong className="text-white">ফ্যাক্টরি জব</strong> অথবা{' '}
          <strong className="text-white">নিজের ব্যবসা</strong> শুরু করতে পারেন।
        </p>
        <p>
          আমাদের <strong className="text-white">CNC 3D Design Bootcamp</strong> আপনাকে ৭ দিনে
          প্রফেশনাল দক্ষতা দেয়। লাইভ ক্লাস, রিয়েল প্রজেক্ট, সার্টিফিকেট এবং ফ্রি Chair Leg Design ফাইল —
          সবকিছু মাত্র ২৫০ টাকায়।
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            'CNC Design', 'Aspire Software', 'ArtCAM', 'Vectric Aspire', 'Furniture Design',
            'Chair Leg Design', 'Door Panel Design', 'Relief Design', 'Freelancing',
            'Factory Career', 'Bangladesh CNC Training',
          ].map((k) => (
            <span
              key={k}
              className="rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  25. FAQ (40+ questions)                                                    */
/* -------------------------------------------------------------------------- */
function FaqSection() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title={<>❓ প্রায়শই জিজ্ঞাসিত প্রশ্ন ({FAQS.length}+)</>}
      subtitle="আপনার সব প্রশ্নের উত্তর এখানে"
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-bold text-white hover:no-underline sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-zinc-400">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-8 text-center">
        <CtaButton label="আমি এখনই রেজিস্টার করতে চাই" href="#register" icon="bolt" />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  26. Registration form                                                      */
/* -------------------------------------------------------------------------- */
function RegisterSection() {
  return (
    <section id="register" className="relative z-10 scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border-2 border-orange-500/40 bg-gradient-to-br from-zinc-900 to-orange-950/20 p-6 shadow-2xl shadow-orange-900/20 sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
              Registration
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              📝 CNC ট্রেইনিংয়ে নাম লেখান
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              নিচের ফর্ম পূরণ করুন, আমরা ২ ঘন্টায় যোগাযোগ করে পেমেন্ট + জুম লিংক + ফ্রি Chair Leg ফাইল পাঠাব।
            </p>

            {/* Bonus note */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-300">
              <Gift className="h-4 w-4" />
              রেজিস্টার করলেই Chair Leg Design ফাইল ফ্রি (৩০০ টাকা) + ৭টি বোনাস প্রজেক্ট
            </div>

            {/* Price */}
            <div className="mt-5 inline-flex items-baseline gap-2">
              <span className="font-heading text-5xl font-extrabold text-orange-400">২৫০ ৳</span>
              <span className="text-sm text-zinc-500">/ সম্পূর্ণ কোর্স</span>
              <span className="text-lg text-zinc-600 line-through">৫,৯৯০ ৳</span>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <LandingLeadForm
              isBn={true}
              source="cnc_training_bootcamp"
              serviceName="CNC 3D Design Bootcamp (২৫০ টাকা, ৭ দিন)"
              submitLabel="রেজিস্টার করুন — ২৫০ টাকা"
              paymentAmount={250}
              paymentNote="পেমেন্টের পর জুম লিংক + ফ্রি Chair Leg ফাইল পাবেন"
            />
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-6 border-t border-zinc-800 pt-6 text-center">
            <p className="mb-3 text-sm font-bold text-zinc-300">অথবা সরাসরি হোয়াটসঅ্যাপ করুন</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <WhatsAppCTA
                isBn={true}
                message="আমি CNC 3D Design Bootcamp-এ রেজিস্টার করতে চাই (২৫০ টাকা)"
              />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
              <Lock className="h-3 w-3" />
              আপনার ডেটা নিরাপদ। আমরা শেয়ার করি না।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  27. Downsell (free chair leg file)                                         */
/* -------------------------------------------------------------------------- */
function DownsellSection() {
  const [email, setEmail] = React.useState('')
  const [done, setDone] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Free Chair Leg File Request',
          email,
          phone: '',
          message: 'Free Chair Leg Design file — downsell from CNC training page',
          source: 'cnc_downsell',
          service: 'Free Chair Leg File',
        }),
      }).catch(() => {})
    } catch {
      /* no-op */
    }
    setDone(true)
    setLoading(false)
  }

  return (
    <section className="relative z-10 px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 text-center sm:p-8">
        <div className="text-3xl">📩</div>
        <h3 className="mt-2 font-heading text-xl font-bold text-white">ফ্রি Chair Leg Design ফাইল নিন</h3>
        <p className="mt-1 text-sm text-zinc-400">
          কোর্স না নিলেও — Chair Leg Design ফাইলটি ফ্রি পাবেন।
        </p>

        {done ? (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            ধন্যবাদ! আপনার ইমেইলে ফাইল পাঠানো হবে।
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল"
              className="flex-1 rounded-full border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'ফাইল পাঠান'}
            </button>
          </form>
        )}
        <p className="mt-2 text-[10px] text-zinc-600">
          কোনো স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন।
        </p>
      </div>
    </section>
  )
}
