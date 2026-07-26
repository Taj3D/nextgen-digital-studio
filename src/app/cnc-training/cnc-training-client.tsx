'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

/** Convert ASCII digits in a string/number to Bengali digits (০১২৩৪৫৬৭৮৯). */
const toBn = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

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
  const { lang } = useLang()
  const isBn = lang === 'bn'
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
      <span className="text-orange-200/80">{isBn ? 'অফার শেষ হতে' : 'Offer ends in'}</span>
      <span className="font-mono text-base font-bold tabular-nums text-foreground">
        {isBn ? toBn(pad(h)) : pad(h)} : {isBn ? toBn(pad(m)) : pad(m)} : {isBn ? toBn(pad(s)) : pad(s)}
      </span>
      <span className="text-orange-200/80">{isBn ? 'বাকি' : 'left'}</span>
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('cnc_training_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
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

      <LandingFooter isBn={isBn} />
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
          <span className="text-sm font-bold text-orange-400">CNC Bootcamp</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {isBn ? '২৫০ ৳' : '250 ৳'} · {isBn ? CNC_COURSE.durationBn : CNC_COURSE.duration}
          </span>
        </div>
        <button
          onClick={() => scrollToId('register')}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 sm:text-sm"
        >
          <Zap className="h-3.5 w-3.5" />
          {isBn ? 'রেজিস্টার করুন' : 'Register Now'}
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
      <div className="flex items-center gap-2 border-t border-orange-500/20 bg-background/95 px-3 py-3 backdrop-blur">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground/70">
            {isBn ? 'সীমিত আসন' : 'Limited Seats'}
          </div>
          <div className="text-sm font-bold text-foreground">
            {isBn ? '২৫০ ৳' : '250 ৳'}{' '}
            <span className="text-xs font-normal text-muted-foreground/70 line-through">
              {isBn ? '৫,৯৯০ ৳' : '5,990 ৳'}
            </span>
          </div>
        </div>
        <button
          onClick={() => scrollToId('register')}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md"
        >
          <Zap className="h-4 w-4" />
          {isBn ? 'রেজিস্টার' : 'Register'}
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  1. HERO                                                                    */
/* -------------------------------------------------------------------------- */
function HeroSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Urgency badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-300 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          {isBn
            ? `🔥 লাইভ ব্যাচ শুরু হচ্ছে ${CNC_COURSE.batchStart}, রাত ৯টায়`
            : `🔥 Live batch starts ${CNC_COURSE.batchStartEn}, 9 PM`}
        </span>

        {/* Headline — sells the OUTCOME not the course */}
        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            {isBn ? 'মাত্র ৭ দিনে Professional CNC Designer' : 'Become a Professional CNC Designer in Just 7 Days'}
          </span>
          <br />
          {isBn ? 'হওয়ার রোডম্যাপ শুরু করুন' : 'Start your roadmap today'}
        </h1>

        {/* Subheadline — Who / What / Outcome / Timeline / Support / Bonus */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isBn ? (
            <>
              <strong className="text-foreground">প্রতিদিন রাত ৯টায় লাইভ জুম ক্লাস</strong> — ৭ দিনে{' '}
              <strong className="text-orange-400">১৫+ প্রজেক্ট</strong>, সার্টিফিকেট + সম্পূর্ণ ফ্রি{' '}
              <strong className="text-amber-400">Chair Leg Design</strong> ফাইল (মূল্য ৩০০ টাকা)।
              আগামী ৩০-৯০ দিনের মধ্যে Freelancing, Factory Job অথবা নিজের Furniture Business থেকে আয় করার জন্য প্রস্তুত হোন।
            </>
          ) : (
            <>
              <strong className="text-foreground">Live Zoom classes every night at 9 PM</strong> — 7 days,{' '}
              <strong className="text-orange-400">15+ projects</strong>, certificate + a completely free{' '}
              <strong className="text-amber-400">Chair Leg Design</strong> file (value ৳300).
              Get ready to earn from freelancing, a factory job, or your own furniture business within the next 30–90 days.
            </>
          )}
        </p>

        <div className="mt-4 text-sm font-medium text-muted-foreground">
          {isBn
            ? 'Aspire, Vectric, ArtCAM — ইন্ডাস্ট্রি-স্ট্যান্ডার্ড সফটওয়্যার শিখুন'
            : 'Learn Aspire, Vectric, ArtCAM — industry-standard software'}
        </div>

        {/* Big promise */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-200 sm:text-base">
            {isBn ? (
              <>
                এই কোর্স শেষ করার পর আপনি <strong className="text-foreground">অন্তত ৭টি Professional CNC Project</strong> তৈরি করবেন
              </>
            ) : (
              <>
                After finishing this course you will build <strong className="text-foreground">at least 7 professional CNC projects</strong>
              </>
            )}
          </span>
        </div>

        {/* Proof row */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { icon: Users2, num: isBn ? '১৫০+' : '150+', label: isBn ? 'শিক্ষার্থী' : 'Students' },
            { icon: Star, num: isBn ? '৪.৮' : '4.8', label: isBn ? '/৫ রেটিং' : '/5 rating' },
            { icon: FileCode2, num: isBn ? '৪,০০০+' : '4,000+', label: isBn ? 'ডিজাইন ফাইল' : 'Design files' },
            { icon: Factory, num: isBn ? '৩০+' : '30+', label: isBn ? 'ফ্যাক্টরি' : 'Factories' },
            { icon: CalendarDays, num: isBn ? '৭+' : '7+', label: isBn ? 'বছর অভিজ্ঞতা' : 'Years experience' },
          ].map(({ icon: I, num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted/50 px-3 py-3"
            >
              <I className="h-4 w-4 text-orange-400" />
              <div className="text-base font-bold text-foreground">{num}</div>
              <div className="text-[10px] text-muted-foreground/70">{label}</div>
            </div>
          ))}
        </div>

        {/* Price + seat */}
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-5xl font-extrabold text-orange-400">
              {isBn ? '২৫০ ৳' : '250 ৳'}
            </span>
            <span className="text-xl text-muted-foreground/50 line-through">
              {isBn ? '৫,৯৯০ ৳' : '5,990 ৳'}
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              {isBn ? '+ Chair Leg ফ্রি' : '+ Free Chair Leg'}
            </span>
          </div>

          {/* Seat counter */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users2 className="h-4 w-4 text-orange-400" />
            {isBn ? (
              <>
                এই ব্যাচে <strong className="text-foreground">{CNC_COURSE.seatsTaken}</strong> জন রেজিস্টার করেছেন
                <span className="text-muted-foreground/50">(সর্বোচ্চ {CNC_COURSE.maxSeats})</span>
                <span className="font-semibold text-orange-400">🔥 {CNC_COURSE.seatsLeft} সিট বাকি</span>
              </>
            ) : (
              <>
                <strong className="text-foreground">{CNC_COURSE.seatsTaken}</strong> people have registered for this batch
                <span className="text-muted-foreground/50">(max {CNC_COURSE.maxSeats})</span>
                <span className="font-semibold text-orange-400">🔥 {CNC_COURSE.seatsLeft} seats left</span>
              </>
            )}
          </div>

          {/* Deadline */}
          <div className="text-xs font-semibold text-amber-400">
            {isBn
              ? '⏰ আজ রাত ১১:৫৯ পর্যন্ত রেজিস্ট্রেশন খোলা — তারপর আগামী ব্যাচের জন্য অপেক্ষা'
              : '⏰ Registration open until 11:59 PM tonight — then wait for the next batch'}
          </div>

          {/* Countdown */}
          <CountdownTimer />
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton
            label={isBn ? 'রেজিস্টার করুন — ২৫০ টাকা' : 'Register Now — ৳250'}
            href="#register"
            icon="check"
          />
          <button
            onClick={() => scrollToId('curriculum')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-6 py-3.5 text-sm font-bold text-foreground/90 transition-colors hover:border-orange-500/50 hover:text-foreground"
          >
            <Video className="h-4 w-4" />
            {isBn ? 'কারিকুলাম দেখুন' : 'View Curriculum'}
          </button>
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
          {[
            { icon: Award, label: isBn ? 'সার্টিফিকেট' : 'Certificate' },
            { icon: Gift, label: isBn ? 'Chair Leg ফ্রি' : 'Free Chair Leg' },
            { icon: Video, label: isBn ? 'লাইভ ক্লাস' : 'Live Classes' },
            { icon: RotateCcw, label: isBn ? 'রেকর্ডিং' : 'Recordings' },
            { icon: Users2, label: isBn ? '১৫০+ শিক্ষার্থী' : '150+ Students' },
            { icon: Star, label: isBn ? '৪.৮/৫' : '4.8/5' },
          ].map(({ icon: I, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <I className="h-3.5 w-3.5 text-orange-400" />
              {label}
            </span>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground/70">
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <div className="relative z-10 bg-gradient-to-r from-orange-600 to-amber-500 py-3 text-center shadow-lg shadow-orange-900/30">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 text-sm font-bold text-white sm:text-base">
        <Gift className="h-5 w-5" />
        {isBn
          ? 'রেজিস্টার করলেই একটি সম্পূর্ণ Chair Leg Design ফাইল ফ্রি পাবেন (মূল্য ৩০০ টাকা)!'
          : 'Register now and get a complete Chair Leg Design file FREE (value ৳300)!'}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Founder video sales letter (YouTube embed — facade + click-to-play)     */
/* -------------------------------------------------------------------------- */
const FOUNDER_VIDEO_ID = 'o3S_SM6b2Tg'
const FOUNDER_VIDEO_THUMB = `https://i.ytimg.com/vi/${FOUNDER_VIDEO_ID}/hqdefault.jpg`

function VideoLetter() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const [playing, setPlaying] = React.useState(false)

  return (
    <section className="relative z-10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
            <Video className="h-3.5 w-3.5" />
            {isBn ? 'Founder Video' : 'Founder Video'}
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {isBn ? '🎬 ফাউন্ডারের ভিডিও দেখুন' : '🎬 Watch the Founder’s Video'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {isBn
              ? 'CNC ডিজাইনার হওয়ার সম্পূর্ণ রোডম্যাপ — সরাসরি তাজ ভাইয়ের কাছ থেকে'
              : 'The complete roadmap to becoming a CNC designer — directly from Taj Bhai'}
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-orange-500/30 bg-black shadow-2xl shadow-orange-900/30">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${FOUNDER_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title={isBn ? 'Founder Video — CNC ডিজাইনার রোডম্যাপ' : 'Founder Video — CNC Designer Roadmap'}
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
              {/* Thumbnail */}
              <img
                src={FOUNDER_VIDEO_THUMB}
                alt={isBn ? 'Founder ভিডিও — তাজ ভাই' : 'Founder video — Taj Bhai'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Dark overlay for contrast */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

              {/* Play button */}
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl shadow-orange-600/50 transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400/40" />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative h-9 w-9 translate-x-0.5 text-white"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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

        {/* Caption under the video */}
        <p className="mt-3 text-center text-xs text-muted-foreground/80">
          {isBn
            ? 'তাজ ভাই — Founder, NextGen Digital Studio · ৭+ বছর CNC ডিজাইন অভিজ্ঞতা'
            : 'Taj Bhai — Founder, NextGen Digital Studio · 7+ years of CNC design experience'}
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Instructor authority (E-E-A-T)                                          */
/* -------------------------------------------------------------------------- */
function InstructorSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Meet Your Trainer' : 'Meet Your Trainer'}
      title={isBn ? <>👨‍🏫 তাজ ভাই — আপনার গাইড</> : <>👨‍🏫 Taj Bhai — Your Guide</>}
      subtitle={
        isBn
          ? '৭+ বছরের অভিজ্ঞতা, ১৫০+ শিক্ষার্থী, ৩০+ ফ্যাক্টরি — আপনি সঠিক হাতে আছেন'
          : '7+ years experience, 150+ students, 30+ factories — you are in the right hands'
      }
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-card/60 p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          {/* Founder photo */}
          <div className="mx-auto flex flex-col items-center gap-3">
            <div className="relative h-44 w-44 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 ring-2 ring-orange-500/40 shadow-xl shadow-orange-900/20 sm:h-48 sm:w-48">
              <Image
                src="/founder.png"
                alt={isBn ? 'তাজ ভাই — Founder, NextGen Digital Studio' : 'Taj Bhai — Founder, NextGen Digital Studio'}
                fill
                sizes="(max-width: 640px) 11rem, 12rem"
                className="object-cover"
                priority
              />
              {/* Verified badge */}
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3" /> {isBn ? 'যাচাইকৃত' : 'Verified'}
              </span>
            </div>
            <div className="text-center">
              <div className="font-heading text-base font-bold text-foreground">
                {isBn ? 'তাজ ভাই' : 'Taj Bhai'}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground/70">
                {isBn ? 'প্রতিষ্ঠাতা, NextGen Digital Studio' : 'Founder, NextGen Digital Studio'}
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              {isBn ? CNC_COURSE.instructorNameBn : CNC_COURSE.instructorName}
            </h3>
            <div className="mt-1 text-sm font-medium text-orange-400">
              {isBn ? CNC_COURSE.instructorTitleBn : CNC_COURSE.instructorTitle}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isBn
                ? '৭+ বছর অভিজ্ঞতা, ১৫০+ শিক্ষার্থীকে CNC ডিজাইন শিখিয়েছেন। ৩০+ ফ্যাক্টরির সাথে কাজ করেছেন। ৪,০০০+ ডিজাইন ফাইল তৈরি করেছেন।'
                : '7+ years of experience, has taught CNC design to 150+ students. Worked with 30+ factories. Created 4,000+ design files.'}
            </p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Users2, label: isBn ? '১৫০+ শিক্ষার্থী' : '150+ students' },
                { icon: Star, label: isBn ? '৪.৮/৫' : '4.8/5' },
                { icon: Settings, label: isBn ? '৭+ বছর' : '7+ years' },
                { icon: Factory, label: isBn ? '৩০+ ফ্যাক্টরি' : '30+ factories' },
                { icon: FileCode2, label: isBn ? '৪,০০০+ ফাইল' : '4,000+ files' },
              ].map(({ icon: I, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <I className="h-3.5 w-3.5 text-orange-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                isBn ? 'CNC Specialist' : 'CNC Specialist',
                isBn ? 'Furniture Designer' : 'Furniture Designer',
                isBn ? 'Freelance Mentor' : 'Freelance Mentor',
                isBn ? 'Factory Consultant' : 'Factory Consultant',
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-300"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Authority quote */}
            <div className="mt-5 rounded-2xl border-l-4 border-orange-500 bg-muted/40 px-4 py-3">
              <Quote className="mb-1 h-4 w-4 text-orange-500" />
              <p className="text-sm italic text-muted-foreground">
                {isBn ? (
                  <>
                    &ldquo;আমি নিজে ৭ বছর CNC ডিজাইন করেছি। ১৫০+ শিক্ষার্থীকে শিখিয়েছি। ৩০+ ফ্যাক্টরিতে
                    কাজ করেছি। আমি জানি কী কাজ করে — এবং আমি তা শেখাব।&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;I have personally done CNC design for 7 years. Taught 150+ students. Worked in
                    30+ factories. I know what works — and I will teach it to you.&rdquo;
                  </>
                )}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const pains = isBn
    ? [
        { t: 'কোথায় শুরু করবেন বুঝতে পারেন না', d: 'সফটওয়্যার, টুলস, সেটআপ — সবকিছুই জটিল মনে হয়' },
        { t: 'ভালো প্রশিক্ষক নেই', d: 'ইউটিউবে ছোটাছুটি করেন, কিন্তু সঠিক গাইডলাইন পান না' },
        { t: 'প্র্যাকটিক্যাল প্রজেক্টের অভাব', d: 'শুধু থিওরি শিখে বাস্তবে কাজ করতে পারেন না' },
        { t: 'ব্যয়বহুল কোর্স', d: '১০,০০০-২০,০০০ টাকার কোর্স, কিন্তু গ্যারান্টি নেই' },
        { t: 'পোর্টফোলিও নেই', d: 'চাকরি বা ফ্রিল্যান্সিং এর জন্য প্রমাণপত্র নেই' },
      ]
    : [
        { t: 'Not sure where to start', d: 'Software, tools, setup — everything feels overwhelming' },
        { t: 'No good mentor', d: 'You jump around YouTube but never get proper guidance' },
        { t: 'Lack of practical projects', d: 'You learn theory but cannot do real work' },
        { t: 'Expensive courses', d: '৳10,000–20,000 courses with no guarantee' },
        { t: 'No portfolio', d: 'No proof for jobs or freelancing' },
      ]
  return (
    <Section
      eyebrow={isBn ? 'The Problem' : 'The Problem'}
      title={
        isBn ? (
          <>
            <span className="text-orange-400">⚠️</span> CNC ডিজাইন শিখতে গিয়ে এই সমস্যাগুলোর মুখোমুখি
            হয়েছেন?
          </>
        ) : (
          <>
            <span className="text-orange-400">⚠️</span> Have you faced these problems while learning CNC design?
          </>
        )
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
              <h4 className="font-bold text-foreground">{p.t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Consequence */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
        <span className="text-2xl">⚠️</span>
        <div>
          <strong className="text-foreground">{isBn ? 'ফলাফল:' : 'Result:'}</strong>{' '}
          <span className="text-muted-foreground">
            {isBn
              ? 'আপনি আটকে থাকেন, আয়ের সুযোগ হারান, আর প্রতিযোগীরা এগিয়ে যায়।'
              : 'You stay stuck, lose income opportunities, and your competitors move ahead.'}
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <CtaButton
          label={isBn ? 'এই সুযোগ হাতছাড়া করতে চাই না — রেজিস্টার' : "I don't want to miss this — Register"}
          href="#register"
          icon="bolt"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  6. Story section (Donald Miller — guide empathy)                          */
/* -------------------------------------------------------------------------- */
function StorySection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'The Story' : 'The Story'}
      title={isBn ? <>📖 আমি কেন এই কোর্স তৈরি করেছি</> : <>📖 Why I created this course</>}
    >
      <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>
          {isBn ? (
            <>
              <strong className="text-foreground">আমি ৭ বছর ধরে Furniture Industry তে CNC Design করেছি।</strong>{' '}
              যশোরের ছোট একটি ওয়ার্কশপ থেকে শুরু করে বড় ফ্যাক্টরি পর্যন্ত কাজ করেছি।
            </>
          ) : (
            <>
              <strong className="text-foreground">I have been doing CNC Design in the Furniture Industry for 7 years.</strong>{' '}
              From a small workshop in Jashore to large factories — I have worked across the spectrum.
            </>
          )}
        </p>
        <p>
          {isBn ? (
            <>
              সেই অভিজ্ঞতায় আমি দেখেছি — <strong className="text-foreground">নতুনরা প্রতিবার একই ভুল করে।</strong>{' '}
              তারা সফটওয়্যার শিখে, কিন্তু প্রজেক্ট তৈরি করতে পারে না। তারা প্রজেক্ট তৈরি করে, কিন্তু
              পোর্টফোলিও তৈরি করে না। তারা পোর্টফোলিও তৈরি করে, কিন্তু ক্লায়েন্ট পায় না।
            </>
          ) : (
            <>
              In that journey I have seen — <strong className="text-foreground">beginners make the same mistakes every time.</strong>{' '}
              They learn the software but cannot build projects. They build projects but do not build a portfolio.
              They build a portfolio but cannot find clients.
            </>
          )}
        </p>
        <div className="rounded-2xl border-l-4 border-orange-500 bg-card/60 px-5 py-4">
          <Quote className="mb-1 h-4 w-4 text-orange-500" />
          <p className="italic text-foreground/90">
            {isBn ? (
              <>
                &ldquo;আমি সেই ভুলগুলো এড়ানোর জন্য এই Bootcamp বানিয়েছি — যাতে আপনি সরাসরি প্রফেশনাল
                লেভেল থেকে শুরু করতে পারেন।&rdquo;
              </>
            ) : (
              <>
                &ldquo;I built this Bootcamp to help you avoid those mistakes — so you can start straight from a
                professional level.&rdquo;
              </>
            )}
          </p>
        </div>
        <p>
          {isBn ? (
            <>
              <strong className="text-foreground">আমার লক্ষ্য:</strong> আপনি যখন এই কোর্স শেষ করবেন, তখন আপনার
              হাতে <strong className="text-orange-400">৭টি প্রফেশনাল প্রজেক্ট</strong> থাকবে,{' '}
              <strong className="text-orange-400">১টি সার্টিফিকেট</strong> থাকবে, এবং{' '}
              <strong className="text-orange-400">আত্মবিশ্বাস</strong> থাকবে যে আপনি ফ্রিল্যান্সিং বা
              চাকরি শুরু করতে পারেন।
            </>
          ) : (
            <>
              <strong className="text-foreground">My goal:</strong> When you finish this course, you will have{' '}
              <strong className="text-orange-400">7 professional projects</strong>,{' '}
              <strong className="text-orange-400">1 certificate</strong>, and the{' '}
              <strong className="text-orange-400">confidence</strong> to start freelancing or land a job.
            </>
          )}
        </p>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  7. Objection handling                                                      */
/* -------------------------------------------------------------------------- */
function ObjectionSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Objection Handling' : 'Objection Handling'}
      title={isBn ? <>🧠 আপনার মনে যে প্রশ্নগুলো আসছে...</> : <>🧠 The questions on your mind...</>}
      subtitle={isBn ? 'আমরা আগেই উত্তর দিয়ে রেখেছি' : 'We have answered them up front'}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {OBJECTIONS.map((o) => (
          <div
            key={o.q}
            className="flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-5 transition-colors hover:border-orange-500/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Icon name={o.icon} className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">{isBn ? o.q : o.qEn}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{isBn ? o.a : o.aEn}</p>
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Transformation' : 'Transformation'}
      title={isBn ? <>⚡ আগে → পরে</> : <>⚡ Before → After</>}
      subtitle={isBn ? '৭ দিনের পার্থক্য' : 'The 7-day difference'}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Before */}
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-300">
            {isBn ? 'আগে' : 'Before'}
          </span>
          <h4 className="mt-3 font-heading text-xl font-bold text-foreground">
            {isBn ? 'CNC ডিজাইন জানতেন না' : 'No CNC design knowledge'}
          </h4>
          <ul className="mt-4 space-y-2">
            {(isBn
              ? [
                  'কোথায় শুরু করবেন জানতেন না',
                  'কোনো প্রজেক্ট ছিল না',
                  'আয়ের সুযোগ ছিল না',
                  'কনফিউজড ছিলেন',
                ]
              : [
                  'Did not know where to start',
                  'Had no projects',
                  'No income opportunities',
                  'Felt confused',
                ]
            ).map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4 shrink-0 text-red-400" />
                {i}
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
            {isBn ? '৭ দিন পর' : 'After 7 days'}
          </span>
          <h4 className="mt-3 font-heading text-xl font-bold text-foreground">
            {isBn ? 'প্রফেশনাল CNC ডিজাইনার' : 'Professional CNC designer'}
          </h4>
          <ul className="mt-4 space-y-2">
            {(isBn
              ? [
                  '১৫+ প্রজেক্ট তৈরি করেছেন',
                  'পোর্টফোলিও তৈরি হয়েছে',
                  'ফ্রিল্যান্সিং শুরু করতে পারছেন',
                  'আত্মবিশ্বাসী',
                ]
              : [
                  'Built 15+ projects',
                  'Portfolio ready',
                  'Ready to start freelancing',
                  'Confident',
                ]
            ).map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="curriculum"
      eyebrow={isBn ? 'Curriculum' : 'Curriculum'}
      title={isBn ? <>📚 ৭ দিনে ৭টি মূল প্রজেক্ট + ৮টি বোনাস প্রজেক্ট</> : <>📚 7 main projects in 7 days + 8 bonus projects</>}
      subtitle={isBn ? 'প্রতিদিন রাত ৯টায় — প্রতিদিন ১টি নতুন দক্ষতা' : 'Every night at 9 PM — one new skill each day'}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CURRICULUM.map(({ day, title, titleEn, desc, descEn, project, projectEn, isMain, isGraduation }) => (
          <div
            key={day}
            className={`relative flex flex-col gap-3 rounded-2xl border p-5 transition-colors ${
              isMain
                ? 'border-orange-500/50 bg-orange-500/10'
                : isGraduation
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-border bg-muted/50 hover:border-orange-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-heading text-lg font-extrabold shadow-md ${
                  isMain
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white'
                    : isGraduation
                      ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white'
                      : 'bg-gradient-to-br from-muted to-muted text-foreground'
                }`}
              >
                D{day}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-foreground">{isBn ? title : titleEn}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{isBn ? desc : descEn}</p>
              </div>
            </div>
            <span
              className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                isMain
                  ? 'bg-orange-500/20 text-orange-300'
                  : isGraduation
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {isBn ? project : projectEn}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Gift className="mr-1 inline h-4 w-4 text-orange-400" />
        {isBn ? 'বোনাস: ৮টি অতিরিক্ত প্রজেক্ট ফাইল (মূল্য ৫,০০০+ টাকা)' : 'Bonus: 8 extra project files (value ৳5,000+)'}
      </p>

      <div className="mt-6 text-center">
        <CtaButton
          label={isBn ? 'আমি এই ১৫+ প্রজেক্ট তৈরি করতে চাই — রেজিস্টার' : 'I want to build these 15+ projects — Register'}
          href="#register"
          icon="bolt"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  10. Project gallery                                                        */
/* -------------------------------------------------------------------------- */
function GallerySection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Portfolio Preview' : 'Portfolio Preview'}
      title={isBn ? <>🖼️ আপনি যা তৈরি করতে পারবেন</> : <>🖼️ What you will be able to build</>}
      subtitle={isBn ? 'এই কোর্স শেষে আপনার পোর্টফোলিওতে থাকবে এসব প্রজেক্ট' : 'These projects will be in your portfolio after the course'}
    >
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {GALLERY.map((g) => (
          <div
            key={g.label}
            className="group flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-muted/50 p-4 text-center transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-card"
          >
            <span className="text-3xl transition-transform group-hover:scale-110 sm:text-4xl">{g.emoji}</span>
            <span className="text-sm font-bold text-foreground">{isBn ? g.label : g.labelEn}</span>
            <span className="text-[10px] text-muted-foreground/70">{isBn ? g.sub : g.subEn}</span>
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const totalBonus = BONUSES.reduce((s, b) => s + b.value, 0)
  return (
    <Section
      eyebrow={isBn ? 'Bonus Stack' : 'Bonus Stack'}
      title={isBn ? <>🎁 বোনাস প্যাকেজ — মোট মূল্য ৳{totalBonus.toLocaleString('bn-BD')}+</> : <>🎁 Bonus package — total value ৳{totalBonus.toLocaleString('en-US')}+</>}
      subtitle={isBn ? 'আপনি শুধু কোর্স নয়, সম্পূর্ণ ইকোসিস্টেম পাচ্ছেন' : "You're not just getting a course — you're getting a complete ecosystem"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {BONUSES.map((b) => (
          <div
            key={b.title}
            className="flex items-start gap-3 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-card to-card/30 p-5 transition-colors hover:border-orange-500/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Icon name={b.icon} className="h-5 w-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <strong className="text-foreground">{isBn ? b.title : b.titleEn}</strong>
                <span className="shrink-0 text-xs font-bold text-amber-400">
                  ({isBn ? `মূল্য ${b.value.toLocaleString('bn-BD')} টাকা` : `value ৳${b.value.toLocaleString('en-US')}`})
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{isBn ? b.desc : b.descEn}</p>
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const locale = isBn ? 'bn-BD' : 'en-US'
  const total = VALUE_STACK.reduce((s, i) => s + i.value, 0)
  const savings = total - CNC_COURSE.price
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-card via-card to-orange-950/30 p-8 text-center shadow-2xl shadow-orange-900/20 sm:p-10">
        <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          {isBn ? '💎 মোট মূল্য' : '💎 Total Value'}
        </h2>
        <div className="mt-6 space-y-2 text-left">
          {VALUE_STACK.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-border pb-2 text-sm"
            >
              <span className="text-muted-foreground">{isBn ? item.label : item.labelEn}</span>
              <span className="font-semibold text-muted-foreground">
                {item.value.toLocaleString(locale)} ৳
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground/70">{isBn ? 'মোট মূল্য' : 'Total value'}</div>
        <div className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
          ৳{total.toLocaleString(locale)}{' '}
          <span className="text-lg font-normal text-muted-foreground/50 line-through">
            {isBn ? '৫,৯৯০' : '5,990'}
          </span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-300">
          {isBn ? `✅ আপনি বাঁচাচ্ছেন ৳${savings.toLocaleString(locale)}` : `✅ You save ৳${savings.toLocaleString(locale)}`}
        </div>
        <div className="mt-5">
          <span className="inline-block rounded-full bg-foreground/10 px-6 py-2 text-sm text-muted-foreground">
            {isBn ? (
              <>আজকে মাত্র <strong className="text-orange-400">২৫০ ৳</strong></>
            ) : (
              <>Today only <strong className="text-orange-400">৳250</strong></>
            )}
          </span>
        </div>
        <div className="mt-6">
          <CtaButton
            label={isBn ? 'আমি সেরা অফারটি নিতে চাই — রেজিস্টার' : 'I want the best offer — Register'}
            href="#register"
            icon="bolt"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  13. Why only 250 TK                                                        */
/* -------------------------------------------------------------------------- */
function Why250Section() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Why So Cheap?' : 'Why So Cheap?'}
      title={isBn ? <>🤔 কেন মাত্র ২৫০ টাকা?</> : <>🤔 Why only ৳250?</>}
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/60 p-6 text-base leading-relaxed text-muted-foreground sm:p-8">
        <p>
          {isBn ? (
            <>
              <strong className="text-foreground">কারণ এটি একটি প্রমোশনাল ক্যাম্পেইন।</strong> আমরা চাই{' '}
              <strong className="text-orange-400">বাংলাদেশের ১০,০০০+ মানুষ</strong> CNC ডিজাইন শিখুক।
            </>
          ) : (
            <>
              <strong className="text-foreground">Because this is a promotional campaign.</strong> We want{' '}
              <strong className="text-orange-400">10,000+ people in Bangladesh</strong> to learn CNC design.
            </>
          )}
        </p>
        <p className="mt-4">
          {isBn
            ? 'এই ব্যাচের শিক্ষার্থীদের কেস স্টাডি, টেস্টিমোনিয়াল এবং প্রজেক্টগুলো আমরা আমাদের ভবিষ্যৎ অ্যাডভান্সড কোর্সের জন্য ব্যবহার করব।'
            : 'We will use the case studies, testimonials, and projects from this batch for our future advanced course.'}
        </p>
        <p className="mt-4 text-lg font-bold text-foreground">
          {isBn
            ? 'এটাই আপনার সুযোগ — কম খরচে প্রফেশনাল স্কিল অর্জন করার।'
            : 'This is your chance — to gain a professional skill at a low cost.'}
        </p>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  14. Comparison table                                                       */
/* -------------------------------------------------------------------------- */
function ComparisonSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Comparison' : 'Comparison'}
      title={isBn ? <>⚖️ তুলনা করে দেখুন</> : <>⚖️ See the comparison</>}
    >
      <div className="overflow-hidden rounded-3xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-card">
                <th className="px-4 py-4 text-left font-bold text-muted-foreground">
                  {isBn ? 'বৈশিষ্ট্য' : 'Feature'}
                </th>
                <th className="px-4 py-4 text-left font-bold text-muted-foreground">
                  {isBn ? 'অন্য কোর্স' : 'Other courses'}
                </th>
                <th className="px-4 py-4 text-left font-bold text-orange-400">NextGen CNC Bootcamp</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? 'bg-muted/30' : 'bg-muted/30'}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{isBn ? row.feature : row.featureEn}</td>
                  <td className="px-4 py-3 text-muted-foreground/70">{isBn ? row.other : row.otherEn}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">
                    <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px]">
                      ✓
                    </span>
                    {isBn ? row.ours : row.oursEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 text-center">
        <CtaButton
          label={isBn ? 'আমি সেরা অফারটি নিতে চাই — রেজিস্টার' : 'I want the best offer — Register'}
          href="#register"
          icon="bolt"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  15. Case studies                                                           */
/* -------------------------------------------------------------------------- */
function CaseStudiesSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Case Studies' : 'Case Studies'}
      title={isBn ? <>📊 রিয়েল শিক্ষার্থীদের সাফল্যের গল্প</> : <>📊 Real student success stories</>}
      subtitle={isBn ? '১০+ শিক্ষার্থীর বাস্তব ফলাফল' : 'Real results from 10+ students'}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/50 p-5 transition-colors hover:border-orange-500/40"
          >
            <div className="flex items-center justify-between gap-2">
              <strong className="text-foreground">{isBn ? c.name : c.nameEn}</strong>
              <span className="text-xs text-muted-foreground/70">{isBn ? c.city : c.cityEn}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-red-400">{isBn ? 'আগে:' : 'Before:'}</span> {isBn ? c.before : c.beforeEn}
              <br />
              <span className="text-emerald-400">{isBn ? 'পরে:' : 'After:'}</span> {isBn ? c.after : c.afterEn}
            </p>
            <span className="mt-auto inline-flex w-fit rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
              {isBn ? c.result : c.resultEn}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Testimonials' : 'Testimonials'}
      title={isBn ? <>📣 শিক্ষার্থীদের মতামত</> : <>📣 What students say</>}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="flex flex-col gap-3 rounded-3xl border border-border bg-card/60 p-6"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              &ldquo;{isBn ? t.quote : t.quoteEn}&rdquo;
            </p>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
              <div>
                <div className="text-sm font-bold text-foreground">— {isBn ? t.author : t.authorEn}</div>
                <div className="text-xs text-muted-foreground/70">{isBn ? t.city : t.cityEn}</div>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                {isBn ? t.result : t.resultEn}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Certificate' : 'Certificate'}
      title={isBn ? <>📜 সার্টিফিকেট কেমন?</> : <>📜 What does the certificate look like?</>}
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-card to-amber-950/20 p-8 text-center shadow-2xl shadow-amber-900/20 sm:p-12">
          <Award className="mx-auto h-14 w-14 text-amber-400" />
          <div className="mt-3 text-lg font-bold text-foreground sm:text-xl">
            {isBn ? 'CNC 3D ডিজাইনার সার্টিফিকেট' : 'CNC 3D Designer Certificate'}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {isBn ? 'NextGen Digital Studio কর্তৃক প্রদত্ত' : 'Issued by NextGen Digital Studio'}
          </div>
          <div className="mt-5 inline-block rounded-lg border border-amber-500/30 bg-foreground/5 px-6 py-2">
            <span className="font-bold text-foreground">
              {isBn ? CNC_COURSE.instructorNameBn : CNC_COURSE.instructorName}
            </span>
            <span className="text-xs text-muted-foreground/70"> — {isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/70">
            {isBn
              ? 'কোর্স সম্পন্নের পর ডিজিটাল সার্টিফিকেট পাবেন'
              : 'You will receive a digital certificate after completing the course'}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Who Is This For?' : 'Who Is This For?'}
      title={isBn ? <>🎯 এই কোর্স কার জন্য?</> : <>🎯 Who is this course for?</>}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* For */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
          <h4 className="flex items-center gap-2 font-heading text-xl font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" /> {isBn ? 'যাদের জন্য' : 'Who it is for'}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {WHO_FOR.map((w) => (
              <li key={w.en} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {isBn ? w.bn : w.en}
              </li>
            ))}
          </ul>
        </div>
        {/* Not for */}
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 sm:p-8">
          <h4 className="flex items-center gap-2 font-heading text-xl font-bold text-red-300">
            <X className="h-5 w-5" /> {isBn ? 'যাদের জন্য নয়' : 'Who it is NOT for'}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {WHO_NOT_FOR.map((w) => (
              <li key={w.en} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {isBn ? w.bn : w.en}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Career Path' : 'Career Path'}
      title={isBn ? <>🚀 ক্যারিয়ার রোডম্যাপ</> : <>🚀 Career Roadmap</>}
      subtitle={isBn ? 'শেখা থেকে শুরু করে নিজের ব্যবসা পর্যন্ত' : 'From learning to your own business'}
    >
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        {CAREER_STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-border bg-muted/50 p-5 text-center">
              <span className="text-3xl">{step.icon}</span>
              <h4 className="font-heading text-sm font-bold text-foreground">{isBn ? step.title : step.titleEn}</h4>
              <p className="text-xs text-muted-foreground">{isBn ? step.desc : step.descEn}</p>
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Income Potential' : 'Income Potential'}
      title={isBn ? <>💰 আয়ের সুযোগ</> : <>💰 Income Opportunities</>}
      subtitle={isBn ? 'CNC ডিজাইন স্কিল দিয়ে আয়ের একাধিক পথ' : 'Multiple income paths with CNC design skills'}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {INCOME_OPPORTUNITIES.map((inc) => (
          <div
            key={inc.label}
            className="flex flex-col items-center gap-1 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-card to-orange-950/20 p-5 text-center"
          >
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <div className="font-heading text-2xl font-extrabold text-emerald-400">
              {isBn ? inc.amount : inc.amountEn}
            </div>
            <div className="text-xs text-muted-foreground">{isBn ? inc.label : inc.labelEn}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground/70">
        {isBn
          ? '⚠️ আয়ের উদাহরণগুলো শিক্ষার্থীদের বাস্তব অভিজ্ঞতা ও বাজার পরিস্থিতির ভিত্তিতে দেওয়া হয়েছে। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।'
          : '⚠️ Income examples are based on real student experiences and market conditions. Results may vary from person to person.'}
      </p>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  21. Guarantee / risk reversal                                             */
/* -------------------------------------------------------------------------- */
function GuaranteeSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'Risk Reversal' : 'Risk Reversal'}
      title={null}
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 to-card p-6 text-center shadow-2xl shadow-emerald-900/20 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <ShieldCheck className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="mt-4 font-heading text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
          {isBn ? (
            <>
              প্রথম ক্লাস, প্রথম অ্যাসাইনমেন্ট এবং আমাদের নির্দেশনা অনুসরণ করার পরও যদি মনে হয় এই কোর্স
              আপনার জন্য নয় — <span className="text-emerald-400">পুরো টাকা ফেরত</span>
            </>
          ) : (
            <>
              If after the first class, the first assignment, and following our guidance you still feel this
              course is not for you — <span className="text-emerald-400">100% money-back</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          {isBn ? (
            <>
              <strong className="text-foreground">কোনো প্রশ্ন থাকবে না।</strong> আপনি ঝুঁকি নিচ্ছেন না — আমরা নিচ্ছি।
            </>
          ) : (
            <>
              <strong className="text-foreground">No questions asked.</strong> You are not taking the risk — we are.
            </>
          )}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <Check className="mr-1 inline h-4 w-4 text-emerald-400" />
          {isBn ? (
            <>
              Chair Leg Design ফাইলটি <strong className="text-foreground">আপনারই থাকবে</strong> — এমনকি রিফান্ড নিলেও।
            </>
          ) : (
            <>
              The Chair Leg Design file is <strong className="text-foreground">yours to keep</strong> — even if you refund.
            </>
          )}
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {GUARANTEE_BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"
            >
              <Icon name={b.icon} className="h-3.5 w-3.5" />
              {isBn ? b.label : b.labelEn}
            </span>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground/70">
          {isBn ? (
            <>
              ℹ️ <strong className="text-muted-foreground">শর্ত:</strong> প্রথম ক্লাসের ২৪ ঘন্টার মধ্যে অসন্তুষ্ট হলে —
              পুরো টাকা ফেরত। Chair Leg Design ফাইলটি আপনারই থাকবে।
            </>
          ) : (
            <>
              ℹ️ <strong className="text-muted-foreground">Condition:</strong> If you are unsatisfied within 24 hours of the
              first class — full refund. The Chair Leg Design file stays yours.
            </>
          )}
        </p>
      </div>

      <div className="mt-8 text-center">
        <CtaButton
          label={isBn ? 'কোন ঝুঁকি নেই — আমি রেজিস্টার করতে চাই' : 'No risk — I want to register'}
          href="#register"
          icon="bolt"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  22. Future vision (emotional future pacing)                               */
/* -------------------------------------------------------------------------- */
function FutureVisionSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-card to-card p-8 text-center shadow-2xl sm:p-12">
        <Sparkles className="mx-auto h-10 w-10 text-orange-400" />
        <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
          {isBn ? 'কল্পনা করুন...' : 'Imagine...'}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isBn ? (
            <>
              আজ থেকে <strong className="text-orange-400">১ বছর পরে</strong>...
              <br />
              <br />
              আপনি হয়তো <strong className="text-foreground">নিজের ফার্নিচার ফ্যাক্টরি</strong> চালাচ্ছেন, অথবা{' '}
              <strong className="text-foreground">ফ্রিল্যান্সিং</strong> করে মাসে ৫০,০০০+ টাকা আয় করছেন, অথবা{' '}
              <strong className="text-foreground">CNC ডিজাইন কনসালট্যান্ট</strong> হিসেবে কাজ করছেন।
              <br />
              <br />
              সবকিছুর শুরু — <strong className="text-orange-400">আজকের ২৫০ টাকা বিনিয়োগ।</strong>
            </>
          ) : (
            <>
              <strong className="text-orange-400">1 year from today</strong>...
              <br />
              <br />
              You might be running <strong className="text-foreground">your own furniture factory</strong>, or{' '}
              <strong className="text-foreground">freelancing</strong> and earning ৳50,000+ per month, or working as a{' '}
              <strong className="text-foreground">CNC design consultant</strong>.
              <br />
              <br />
              It all starts with <strong className="text-orange-400">today's ৳250 investment.</strong>
            </>
          )}
        </p>
        <p className="mt-6 text-xl font-bold text-orange-400 sm:text-2xl">
          {isBn ? 'আপনি কি অপেক্ষা করবেন?' : 'Will you wait?'}
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton
            label={isBn ? 'হ্যাঁ, আমি আমার ভবিষ্যত তৈরি করতে চাই — ২৫০ টাকা' : 'Yes, I want to build my future — ৳250'}
            href="#register"
            icon="bolt"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  23. Final CTA                                                              */
/* -------------------------------------------------------------------------- */
function FinalCtaSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section className="relative z-10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-orange-500/30 bg-card/60 p-8 text-center sm:p-10">
        <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {isBn ? 'আজ মাত্র ২৫০ টাকা বিনিয়োগ করুন।' : 'Invest just ৳250 today.'}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          {isBn
            ? 'আগামী ৭ দিনে আপনার প্রথম CNC Portfolio তৈরি করুন। এরপর আপনার প্রথম ক্লায়েন্ট, প্রথম আয় এবং নতুন ক্যারিয়ারের পথে যাত্রা শুরু করুন।'
            : 'Build your first CNC Portfolio in the next 7 days. Then begin the journey toward your first client, first income, and a new career.'}
        </p>
        <p className="mt-4 text-lg font-bold text-orange-400">
          <span className="rounded bg-orange-500/20 px-2 py-0.5">
            {isBn ? 'আজই শুরু করুন — কারণ অপেক্ষার কোনো মূল্য নেই।' : 'Start today — because waiting has no value.'}
          </span>
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton
            label={isBn ? 'আমি শুরু করতে প্রস্তুত — রেজিস্টার' : "I'm ready to start — Register"}
            href="#register"
            icon="bolt"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  24. SEO content section                                                    */
/* -------------------------------------------------------------------------- */
function SeoSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      eyebrow={isBn ? 'About CNC Design' : 'About CNC Design'}
      title={isBn ? <>🔍 CNC 3D ডিজাইন কী এবং কেন এটি শিখবেন?</> : <>🔍 What is CNC 3D design and why should you learn it?</>}
    >
      <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          {isBn ? (
            <>
              <strong className="text-foreground">CNC 3D ডিজাইন</strong> হলো কম্পিউটার-এডেড ডিজাইন (CAD) সফটওয়্যার
              ব্যবহার করে ত্রিমাত্রিক মডেল তৈরি করা যা CNC মেশিনে কাটার জন্য ব্যবহৃত হয়।{' '}
              <strong className="text-orange-400">Aspire</strong>,{' '}
              <strong className="text-orange-400">Vectric</strong>,{' '}
              <strong className="text-orange-400">ArtCAM</strong> — এগুলি ইন্ডাস্ট্রি-স্ট্যান্ডার্ড CNC ডিজাইন
              সফটওয়্যার।
            </>
          ) : (
            <>
              <strong className="text-foreground">CNC 3D design</strong> is the process of creating three-dimensional
              models using computer-aided design (CAD) software that are then cut on a CNC machine.{' '}
              <strong className="text-orange-400">Aspire</strong>,{' '}
              <strong className="text-orange-400">Vectric</strong>, and{' '}
              <strong className="text-orange-400">ArtCAM</strong> are industry-standard CNC design software.
            </>
          )}
        </p>
        <p>
          {isBn ? (
            <>
              বাংলাদেশে <strong className="text-foreground">CNC ট্রেনিং</strong> এর চাহিদা দিন দিন বাড়ছে।{' '}
              <strong className="text-foreground">Furniture Design</strong>,{' '}
              <strong className="text-foreground">Chair Leg Design</strong>,{' '}
              <strong className="text-foreground">Door Panel Design</strong>,{' '}
              <strong className="text-foreground">Relief Design</strong> — এসব দক্ষতা অর্জন করলে আপনি{' '}
              <strong className="text-foreground">ফ্রিল্যান্সিং</strong>,{' '}
              <strong className="text-foreground">ফ্যাক্টরি জব</strong> অথবা{' '}
              <strong className="text-foreground">নিজের ব্যবসা</strong> শুরু করতে পারেন।
            </>
          ) : (
            <>
              The demand for <strong className="text-foreground">CNC training</strong> in Bangladesh is growing day by day.{' '}
              With skills in <strong className="text-foreground">Furniture Design</strong>,{' '}
              <strong className="text-foreground">Chair Leg Design</strong>,{' '}
              <strong className="text-foreground">Door Panel Design</strong>, and{' '}
              <strong className="text-foreground">Relief Design</strong>, you can start{' '}
              <strong className="text-foreground">freelancing</strong>, land a{' '}
              <strong className="text-foreground">factory job</strong>, or launch{' '}
              <strong className="text-foreground">your own business</strong>.
            </>
          )}
        </p>
        <p>
          {isBn ? (
            <>
              আমাদের <strong className="text-foreground">CNC 3D Design Bootcamp</strong> আপনাকে ৭ দিনে
              প্রফেশনাল দক্ষতা দেয়। লাইভ ক্লাস, রিয়েল প্রজেক্ট, সার্টিফিকেট এবং ফ্রি Chair Leg Design ফাইল —
              সবকিছু মাত্র ২৫০ টাকায়।
            </>
          ) : (
            <>
              Our <strong className="text-foreground">CNC 3D Design Bootcamp</strong> gives you professional skills in 7 days.
              Live classes, real projects, a certificate, and a free Chair Leg Design file — all for just ৳250.
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            'CNC Design', 'Aspire Software', 'ArtCAM', 'Vectric Aspire', 'Furniture Design',
            'Chair Leg Design', 'Door Panel Design', 'Relief Design', 'Freelancing',
            'Factory Career', 'Bangladesh CNC Training',
          ].map((k) => (
            <span
              key={k}
              className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <Section
      id="faq"
      eyebrow={isBn ? 'FAQ' : 'FAQ'}
      title={isBn ? <>❓ প্রায়শই জিজ্ঞাসিত প্রশ্ন ({FAQS.length}+)</> : <>❓ Frequently Asked Questions ({FAQS.length}+)</>}
      subtitle={isBn ? 'আপনার সব প্রশ্নের উত্তর এখানে' : 'All your questions answered here'}
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-muted/50 px-5"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-bold text-foreground hover:no-underline sm:text-base">
                {isBn ? f.q : f.qEn}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {isBn ? f.a : f.aEn}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-8 text-center">
        <CtaButton
          label={isBn ? 'আমি এখনই রেজিস্টার করতে চাই' : 'I want to register now'}
          href="#register"
          icon="bolt"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  26. Registration form                                                      */
/* -------------------------------------------------------------------------- */
function RegisterSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  return (
    <section id="register" className="relative z-10 scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border-2 border-orange-500/40 bg-gradient-to-br from-card to-orange-950/20 p-6 shadow-2xl shadow-orange-900/20 sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
              {isBn ? 'Registration' : 'Registration'}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              {isBn ? '📝 CNC ট্রেইনিংয়ে নাম লেখান' : '📝 Enroll in CNC Training'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isBn
                ? 'নিচের ফর্ম পূরণ করুন, আমরা ২ ঘন্টায় যোগাযোগ করে পেমেন্ট + জুম লিংক + ফ্রি Chair Leg ফাইল পাঠাব।'
                : 'Fill out the form below — we will contact you within 2 hours with payment details, the Zoom link, and your free Chair Leg file.'}
            </p>

            {/* Bonus note */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-300">
              <Gift className="h-4 w-4" />
              {isBn
                ? 'রেজিস্টার করলেই Chair Leg Design ফাইল ফ্রি (৩০০ টাকা) + ৭টি বোনাস প্রজেক্ট'
                : 'Register now to get the Chair Leg Design file free (৳300) + 7 bonus projects'}
            </div>

            {/* Price */}
            <div className="mt-5 inline-flex items-baseline gap-2">
              <span className="font-heading text-5xl font-extrabold text-orange-400">
                {isBn ? '২৫০ ৳' : '250 ৳'}
              </span>
              <span className="text-sm text-muted-foreground/70">
                {isBn ? '/ সম্পূর্ণ কোর্স' : '/ full course'}
              </span>
              <span className="text-lg text-muted-foreground/50 line-through">
                {isBn ? '৫,৯৯০ ৳' : '5,990 ৳'}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <LandingLeadForm
              isBn={isBn}
              source="cnc_training_bootcamp"
              serviceName={isBn ? 'CNC 3D Design Bootcamp (২৫০ টাকা, ৭ দিন)' : 'CNC 3D Design Bootcamp (৳250, 7 days)'}
              submitLabel={isBn ? 'রেজিস্টার করুন — ২৫০ টাকা' : 'Register Now — ৳250'}
              paymentAmount={250}
              paymentNote={isBn ? 'পেমেন্টের পর জুম লিংক + ফ্রি Chair Leg ফাইল পাবেন' : 'After payment you will receive the Zoom link + free Chair Leg file'}
            />
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="mb-3 text-sm font-bold text-muted-foreground">
              {isBn ? 'অথবা সরাসরি হোয়াটসঅ্যাপ করুন' : 'Or message us directly on WhatsApp'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <WhatsAppCTA
                isBn={isBn}
                message={isBn ? 'আমি CNC 3D Design Bootcamp-এ রেজিস্টার করতে চাই (২৫০ টাকা)' : 'I want to register for the CNC 3D Design Bootcamp (৳250)'}
              />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
              <Lock className="h-3 w-3" />
              {isBn ? 'আপনার ডেটা নিরাপদ। আমরা শেয়ার করি না।' : 'Your data is safe. We never share it.'}
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
  const { lang } = useLang()
  const isBn = lang === 'bn'
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
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-muted/50 p-6 text-center sm:p-8">
        <div className="text-3xl">📩</div>
        <h3 className="mt-2 font-heading text-xl font-bold text-foreground">
          {isBn ? 'ফ্রি Chair Leg Design ফাইল নিন' : 'Get the Free Chair Leg Design file'}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {isBn
            ? 'কোর্স না নিলেও — Chair Leg Design ফাইলটি ফ্রি পাবেন।'
            : 'Even if you skip the course — you can still get the Chair Leg Design file for free.'}
        </p>

        {done ? (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            {isBn ? 'ধন্যবাদ! আপনার ইমেইলে ফাইল পাঠানো হবে।' : 'Thank you! The file will be sent to your email.'}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isBn ? 'আপনার ইমেইল' : 'Your email'}
              className="flex-1 rounded-full border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              {loading
                ? isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'
                : isBn ? 'ফাইল পাঠান' : 'Send File'}
            </button>
          </form>
        )}
        <p className="mt-2 text-[10px] text-muted-foreground/50">
          {isBn ? 'কোনো স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন।' : 'No spam. Unsubscribe anytime.'}
        </p>
      </div>
    </section>
  )
}
