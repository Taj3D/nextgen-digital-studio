'use client'

/**
 * LeadGenerationClient — Enterprise lead-generation landing page.
 *
 * This is a DEDICATED component rendered ONLY when slug === 'lead-generation'
 * (see page.tsx). The other 11 services still use the generic LandingClient
 * template — they are NOT affected by this file.
 *
 * Architecture:
 *  - All bilingual content lives in ./lead-generation-data.ts
 *  - Uses the site design system: shadcn/ui + Tailwind + Lucide
 *  - Bilingual via useLang() from language-provider
 *  - Reuses LandingLeadForm, WhatsAppCTA, FloatingButtons, TopBar, LandingFooter
 *  - FAQ + case studies use native <details>/<summary> (no extra client JS,
 *    keeps the page memory-light — same pattern as /terms)
 *  - ROI calculator + exit popup + sticky CTA use minimal useState
 *  - shadcn/ui Accordion NOT used (too heavy for this page size); native details instead
 */
import * as React from 'react'
import Link from 'next/link'
import {
  ArrowRight, ArrowUp, ArrowDown, Sparkles, Target, Zap, ShieldCheck, Clock,
  CheckCircle2, AlertTriangle, Info, Mail, Phone, MessageCircle, CalendarClock,
  FileText, Ban, Scale, Globe, History, Bot, Database, RefreshCw, Brain,
  AlertCircle, CreditCard, Server, Cog, UserCheck, Users, Megaphone, Sliders,
  Store, Building2, Hospital, Factory, School, Laptop, Rocket, TrendingUp,
  Heart, Hand, Shield, Lock, Cloud, Key, FileSignature, Gavel, Headset,
  Search, Mail as MailIcon, BarChart3, Code, Linkedin, Ship, ShoppingCart,
  Lightbulb, Briefcase, Home, Gift, Activity, Star, ChevronDown, X, Download,
  GraduationCap, BookOpen, MessageSquare, Settings, DollarSign, Cookie,
  CookieIcon, PieChart, Layers, Award, BadgeCheck, Check, XCircle, Eye,
  EyeOff, Pencil, Trash2, ChartLine, UserLock, Pen, UserCog, UserX, User,
  Cpu, Network, Workflow, Gauge, LineChart, PhoneCall, Calendar, CalendarCheck,
  Building, Wrench, Package, Boxes, Truck, FileBarChart, Target as TargetIcon,
  HelpCircle,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-data'
import { useLang } from '@/components/site/language-provider'
import {
  LandingEyebrow,
  LandingFooter,
  LandingLeadForm,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { TopBar } from '@/components/site/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  HERO, WHO_FOR, PROBLEM, DREAM, HORMOZI, STORYBRAND, OFFER_STACK,
  GUARANTEES, OBJECTIONS, SOCIAL_PROOF, CASE_STUDIES, PRICING, ROI_CALCULATOR,
  TRUST, TECH_STACK, TIMELINE, COMPARISON, FAQS, QUALIFICATION, SLA,
  FINAL_CTA, EXIT_POPUP, STICKY_CTA, LEAD_GEN_META,
  type Bilingual,
} from './lead-generation-data'

/* -------------------------------------------------------------------------- */
/*  Icon resolver — maps string keys from data → Lucide components            */
/* -------------------------------------------------------------------------- */
const iconMap: Record<string, React.ElementType> = {
  store: Store, building: Building2, hospital: Hospital, industry: Factory,
  school: School, laptop: Laptop, rocket: Rocket, 'trending-up': TrendingUp,
  clock: Clock, globe: Globe, heart: Heart, users: Users, 'arrow-up': ArrowUp,
  'shield-check': ShieldCheck, zap: Zap, hand: Hand, shield: Shield, lock: Lock,
  cloud: Cloud, 'credit-card': CreditCard, database: Database, key: Key,
  'file-text': FileText, megaphone: Megaphone, linkedin: Linkedin,
  'message-circle': MessageCircle, mail: Mail, search: Search, bot: Bot,
  phone: Phone, code: Code, 'bar-chart': BarChart3, dashboard: BarChart3,
  home: Home, ship: Ship, 'shopping-cart': ShoppingCart, lightbulb: Lightbulb,
  briefcase: Briefcase, gift: Gift, activity: Activity, headset: Headset,
  target: Target, scale: Scale, gavel: Gavel, refresh: RefreshCw,
  'refresh-cw': RefreshCw, brain: Brain, 'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle, server: Server, cogs: Cog, 'user-check': UserCheck,
  history: History, settings: Settings, 'dollar-sign': DollarSign,
  'graduation-cap': GraduationCap, 'book-open': BookOpen, 'file-contract': FileSignature,
  eye: Eye, 'user-lock': UserLock, pen: Pen, 'user-cog': UserCog,
  'user-x': UserX, user: User, cpu: Cpu, network: Network, workflow: Workflow,
  gauge: Gauge, 'line-chart': LineChart, 'chart-line': ChartLine,
  'phone-call': PhoneCall, calendar: Calendar, 'calendar-check': CalendarCheck,
  award: Award, 'badge-check': BadgeCheck, cookie: Cookie, 'cookie-icon': CookieIcon,
  'pie-chart': PieChart, layers: Layers, wrench: Wrench, package: Package,
  boxes: Boxes, truck: Truck, 'file-bar-chart': FileBarChart,
}

function getIcon(name?: string): React.ElementType {
  if (!name) return FileText
  return iconMap[name] || FileText
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Pick the right language string from a Bilingual object (undefined-safe). */
function L(b: Bilingual | undefined, isBn: boolean): string {
  if (!b) return ''
  return isBn ? b.bn : b.en
}

/** Section wrapper with consistent vertical rhythm + optional background. */
function Section({
  id, children, className = '', bg = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
  bg?: 'muted' | 'dark' | 'gradient' | ''
}) {
  const bgClass =
    bg === 'muted' ? 'bg-muted/30' :
    bg === 'dark' ? 'bg-slate-950 text-white' :
    bg === 'gradient' ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' :
    ''
  return (
    <section id={id} className={`relative scroll-mt-20 py-14 sm:py-20 ${bgClass} ${className}`}>
      {children}
    </section>
  )
}

/** Container. */
function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

/** Section header: eyebrow badge + title + subtitle, centered. */
function SectionHeader({
  badge, title, subtitle, isBn, light = false,
}: {
  badge?: Bilingual
  title: Bilingual
  subtitle?: Bilingual
  isBn: boolean
  light?: boolean
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${light ? 'bg-white/15 text-white' : 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300'}`}>
          {L(badge, isBn)}
        </span>
      )}
      <h2 className={`mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : ''}`}>
        {L(title, isBn)}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-blue-50' : 'text-muted-foreground'}`}>
          {L(subtitle, isBn)}
        </p>
      )}
    </div>
  )
}

/* ========================================================================== */
/*  MAIN COMPONENT                                                             */
/* ========================================================================== */

export function LeadGenerationClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const trackingMeta = React.useMemo(() => ({ slug: 'lead-generation' }), [])
  usePageViewTracking('service_detail_page', trackingMeta)

  const [showExit, setShowExit] = React.useState(false)
  const [exitSeen, setExitSeen] = React.useState(false)
  const exitTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Exit-intent: trigger once via mouseleave (desktop) + 25s fallback (mobile). */
  React.useEffect(() => {
    function onLeave(e: MouseEvent) {
      if (e.clientY < 0 && !exitSeen) {
        setShowExit(true)
        setExitSeen(true)
      }
    }
    document.addEventListener('mouseleave', onLeave)
    exitTimer.current = setTimeout(() => {
      if (!exitSeen) {
        setShowExit(true)
        setExitSeen(true)
      }
    }, 30000)
    return () => {
      document.removeEventListener('mouseleave', onLeave)
      if (exitTimer.current) clearTimeout(exitTimer.current)
    }
  }, [exitSeen])

  const scrollToLeadForm = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        <HeroSection isBn={isBn} onCta={scrollToLeadForm} />
        <WhoForSection isBn={isBn} />
        <ProblemSection isBn={isBn} />
        <DreamSection isBn={isBn} />
        <HormoziSection isBn={isBn} />
        <StoryBrandSection isBn={isBn} />
        <OfferStackSection isBn={isBn} onCta={scrollToLeadForm} />
        <RiskReversalSection isBn={isBn} />
        <ObjectionsSection isBn={isBn} />
        <SocialProofSection isBn={isBn} />
        <CaseStudiesSection isBn={isBn} />
        <PricingSection isBn={isBn} onCta={scrollToLeadForm} />
        <RoiCalculatorSection isBn={isBn} />
        <TrustSection isBn={isBn} />
        <TechStackSection isBn={isBn} />
        <TimelineSection isBn={isBn} />
        <ComparisonSection isBn={isBn} />
        <FaqSection isBn={isBn} onCta={scrollToLeadForm} />
        <QualificationSection isBn={isBn} onCta={scrollToLeadForm} />
        <SlaSection isBn={isBn} />
        <FinalCtaSection isBn={isBn} onCta={scrollToLeadForm} />

        {/* Lead form */}
        <section id="order" className="scroll-mt-20 bg-muted/30 py-14 sm:py-20">
          <Container className="max-w-3xl">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
              <div className="text-center">
                <LandingEyebrow>
                  {isBn ? 'ফ্রি স্ট্র্যাটেজি কল রিকোয়েস্ট' : 'Request a Free Strategy Call'}
                </LandingEyebrow>
                <h2 className="mt-4 font-heading text-3xl font-bold">
                  {isBn ? 'আপনার ফ্রি কল বুক করুন' : 'Book Your Free Call'}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isBn
                    ? 'নিচের ফর্ম পূরণ করুন, আমরা ২ ঘন্টার মধ্যে যোগাযোগ করব।'
                    : 'Fill the form below. We will reach out within 2 hours.'}
                </p>
              </div>
              <div className="mt-8">
                <LandingLeadForm
                  isBn={isBn}
                  source="service_lead-generation"
                  serviceName={isBn ? 'Lead Generation' : 'Lead Generation'}
                  submitLabel={isBn ? 'কল রিকোয়েস্ট পাঠান' : 'Request My Call'}
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />

      {/* Sticky mobile CTA bar */}
      <StickyCtaBar isBn={isBn} onCta={scrollToLeadForm} />

      {/* Exit-intent popup */}
      {showExit && (
        <ExitPopup isBn={isBn} onClose={() => setShowExit(false)} />
      )}
    </div>
  )
}

/* ========================================================================== */
/*  1. HERO                                                                     */
/* ========================================================================== */

function HeroSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background text-white">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <Container className="relative py-16 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-slate-900">
          <Zap className="h-4 w-4" /> {L(HERO.badge, isBn)}
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            {L(HERO.titleA, isBn)}
          </span>
          <br />
          <span className="text-white">{L(HERO.titleB, isBn)}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          {L(HERO.subtitle, isBn)}
        </p>

        {/* Promise box */}
        <div className="mx-auto mt-8 inline-block rounded-2xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur">
          <div className="text-2xl font-bold text-amber-300 sm:text-3xl">
            {L(HERO.promiseBox.big, isBn)}
          </div>
          <div className="mt-1 text-sm text-slate-400">
            {L(HERO.promiseBox.small, isBn)}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={onCta}
            size="lg"
            className="h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 text-base font-bold text-slate-900 shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
          >
            <CalendarCheck className="mr-2 h-5 w-5" />
            {L(HERO.primaryCta, isBn)}
          </Button>
          <WhatsAppCTA
            isBn={isBn}
            message={isBn
              ? 'আমি লিড জেনারেশন সেবা নিয়ে জানতে চাই।'
              : "Hi, I'd like to know more about Lead Generation."}
            className="h-14 px-8 text-base"
          />
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
          {HERO.trustBadges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>
        {/* Micro badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          {HERO.microBadges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ========================================================================== */
/*  2. WHO THIS IS FOR                                                          */
/* ========================================================================== */

function WhoForSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={{ en: 'For You', bn: 'আপনার জন্য' }}
          title={{ en: 'Who Is This Service For?', bn: 'এই সেবা কার জন্য?' }}
          subtitle={{
            en: 'We work with businesses stuck without leads — or those dreaming bigger.',
            bn: 'আমরা সেই ব্যবসাগুলোর জন্য কাজ করি যারা লিডের অভাবে আটকে আছেন — বা বড় স্বপ্ন দেখেন।',
          }}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {WHO_FOR.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">{L(c.title, isBn)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  3. PROBLEM SECTION                                                          */
/* ========================================================================== */

function ProblemSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={PROBLEM.badge}
          title={PROBLEM.title}
          subtitle={PROBLEM.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Left: pain list */}
          <div>
            <ul className="space-y-3">
              {PROBLEM.pains.map((p, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.03] p-4">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="text-sm font-medium">{L(p.text, isBn)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-semibold">{L(PROBLEM.resultLine, isBn)}</p>
            <p className="mt-2 font-semibold text-red-600">{L(PROBLEM.warningLine, isBn)}</p>
          </div>
          {/* Right: stats */}
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            {PROBLEM.stats.map((s, i) => (
              <div key={i}>
                <div className="font-heading text-3xl font-extrabold text-red-600 sm:text-4xl">
                  {L(s.value, isBn)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{L(s.label, isBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  4. DREAM OUTCOME                                                            */
/* ========================================================================== */

function DreamSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={DREAM.badge}
          title={DREAM.title}
          subtitle={DREAM.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {DREAM.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">{L(c.title, isBn)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  5. HORMOZI VALUE EQUATION                                                   */
/* ========================================================================== */

function HormoziSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={HORMOZI.badge}
          title={HORMOZI.title}
          subtitle={HORMOZI.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {HORMOZI.quadrants.map((q, i) => {
            const Icon = getIcon(q.icon)
            const isIncrease = q.quadrant.en.startsWith('↑')
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${isIncrease ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {L(q.quadrant, isBn)}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">{L(q.title, isBn)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{L(q.desc, isBn)}</p>
                <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 text-xs font-medium">
                  {L(q.action, isBn)}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  6. STORYBRAND FRAMEWORK                                                     */
/* ========================================================================== */

function StoryBrandSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={STORYBRAND.badge}
          title={STORYBRAND.title}
          subtitle={STORYBRAND.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORYBRAND.steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="absolute -top-3 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow">
                {s.step}
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {L(s.label, isBn)}
              </div>
              <h3 className="mt-1 font-heading text-base font-bold">{L(s.title, isBn)}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{L(s.desc, isBn)}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  7. OFFER STACK                                                              */
/* ========================================================================== */

function OfferStackSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={OFFER_STACK.badge}
          title={OFFER_STACK.title}
          subtitle={OFFER_STACK.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFER_STACK.items.map((item, i) => {
            const Icon = getIcon(item.icon)
            const isCore = L(item.badge, isBn).toUpperCase().includes('CORE') || L(item.badge, isBn).includes('মূল')
            return (
              <div
                key={i}
                className={`relative rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
                  isCore
                    ? 'border-amber-500/40 bg-amber-500/[0.04] ring-1 ring-amber-500/20'
                    : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${isCore ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-blue-600 to-cyan-500'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    isCore ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {L(item.badge, isBn)}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">{L(item.title, isBn)}</h3>
                <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {L(item.value, isBn)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{L(item.desc, isBn)}</p>
              </div>
            )
          })}
        </div>

        {/* Total value summary */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center text-white shadow-xl">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
            {L(OFFER_STACK.totalValue, isBn)}
          </p>
          <p className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">
            {L(OFFER_STACK.yourPrice, isBn)}
          </p>
          <Button
            onClick={onCta}
            size="lg"
            className="mt-5 h-12 rounded-full bg-white px-8 text-base font-bold text-blue-700 hover:bg-blue-50"
          >
            {isBn ? 'এখনই শুরু করুন' : 'Get Started Now'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  8. RISK REVERSAL                                                            */
/* ========================================================================== */

function RiskReversalSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={GUARANTEES.badge}
          title={GUARANTEES.title}
          subtitle={GUARANTEES.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.items.map((g, i) => {
            const Icon = getIcon(g.icon)
            return (
              <div key={i} className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">{L(g.title, isBn)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{L(g.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  9. OBJECTION HANDLING                                                       */
/* ========================================================================== */

function ObjectionsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={OBJECTIONS.badge}
          title={OBJECTIONS.title}
          subtitle={OBJECTIONS.subtitle}
          isBn={isBn}
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {OBJECTIONS.items.map((o, i) => (
            <details key={i} className="group rounded-xl border border-border/60 bg-card p-4 shadow-sm [&_summary]:cursor-pointer">
              <summary className="flex items-center justify-between gap-3 list-none">
                <span className="flex items-center gap-3 text-sm font-semibold sm:text-base">
                  <HelpCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  {L(o.q, isBn)}
                </span>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 border-t border-border/40 pt-3 text-sm leading-relaxed text-muted-foreground">
                {L(o.a, isBn)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  10. SOCIAL PROOF                                                            */
/* ========================================================================== */

function SocialProofSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={SOCIAL_PROOF.badge}
          title={SOCIAL_PROOF.title}
          subtitle={SOCIAL_PROOF.subtitle}
          isBn={isBn}
        />
        {/* Stats row */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SOCIAL_PROOF.stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 text-center shadow-sm">
              <div className="font-heading text-2xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-3xl">
                {L(s.value, isBn)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{L(s.label, isBn)}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_PROOF.testimonials.map((t, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed">"{L(t.quote, isBn)}"</p>
              <div className="mt-4 border-t border-border/40 pt-4">
                <p className="font-heading text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{L(t.role, isBn)}</p>
                <p className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {L(t.metric, isBn)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{L(t.industry, isBn)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos as text chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_PROOF.partners.map((p, i) => (
            <span key={i} className="rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold text-muted-foreground">
              {p}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  11. CASE STUDIES                                                            */
/* ========================================================================== */

function CaseStudiesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={CASE_STUDIES.badge}
          title={CASE_STUDIES.title}
          subtitle={CASE_STUDIES.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.items.map((cs, i) => {
            const Icon = getIcon(cs.icon)
            return (
              <details key={i} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-3 list-none">
                  <span className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold">{L(cs.industry, isBn)}</h3>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{L(cs.roi, isBn)}</p>
                    </div>
                  </span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-3 border-t border-border/40 pt-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-500">{isBn ? 'সমস্যা' : 'Problem'}</p>
                    <p className="mt-1 text-muted-foreground">{L(cs.problem, isBn)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{isBn ? 'সমাধান' : 'Solution'}</p>
                    <p className="mt-1 text-muted-foreground">{L(cs.solution, isBn)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-600">{isBn ? 'বাস্তবায়ন' : 'Implementation'}</p>
                    <p className="mt-1 text-muted-foreground">{L(cs.implementation, isBn)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">{isBn ? 'ফলাফল' : 'Result'}</p>
                    <p className="mt-1 font-medium text-foreground">{L(cs.result, isBn)}</p>
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  12. PRICING                                                                 */
/* ========================================================================== */

function PricingSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={PRICING.badge}
          title={PRICING.title}
          subtitle={PRICING.subtitle}
          isBn={isBn}
        />

        {/* Anchor: cost of doing nothing */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/[0.04] p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-red-500">{L(PRICING.anchor.label, isBn)}</p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-red-600">{L(PRICING.anchor.value, isBn)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{L(PRICING.anchor.note, isBn)}</p>
        </div>

        {/* Tiers */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {PRICING.tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl border p-6 shadow-sm ${
                tier.highlighted
                  ? 'border-blue-500 bg-card ring-2 ring-blue-500/40 lg:-mt-4 lg:mb-4'
                  : 'border-border/60 bg-card'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-bold text-white shadow">
                  {L(tier.badge, isBn)}
                </span>
              )}
              <h3 className="font-heading text-xl font-bold">{L(tier.name, isBn)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{L(tier.tagline, isBn)}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-3xl font-extrabold">{L(tier.price, isBn)}</span>
                <span className="text-sm text-muted-foreground">{L(tier.period, isBn)}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span>{L(f, isBn)}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onCta}
                className={`mt-6 h-11 w-full rounded-xl text-sm font-bold ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                    : 'bg-muted text-foreground hover:bg-muted/70'
                }`}
              >
                {L(tier.cta, isBn)}
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{L(PRICING.note, isBn)}</p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  13. ROI CALCULATOR (interactive)                                            */
/* ========================================================================== */

function RoiCalculatorSection({ isBn }: { isBn: boolean }) {
  const [investment, setInvestment] = React.useState(ROI_CALCULATOR.defaults.investment)
  const [leads, setLeads] = React.useState(ROI_CALCULATOR.defaults.leads)
  const [convRate, setConvRate] = React.useState(ROI_CALCULATOR.defaults.conversionRate)
  const [customerValue, setCustomerValue] = React.useState(ROI_CALCULATOR.defaults.customerValue)

  const customers = Math.round((leads * convRate) / 100)
  const revenue = customers * customerValue
  const roi = investment > 0 ? (revenue / investment).toFixed(1) : '0'
  const paybackMonths = revenue > 0 ? Math.max(1, Math.ceil(investment / (revenue / 30))) : 0
  const ltv = revenue * 12
  const cac = customers > 0 ? Math.round(investment / customers) : 0

  const fmt = (n: number) => n.toLocaleString(isBn ? 'bn-BD' : 'en-US')

  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={ROI_CALCULATOR.badge}
          title={ROI_CALCULATOR.title}
          subtitle={ROI_CALCULATOR.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Sliders */}
          <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <RoiSlider
              label={L(ROI_CALCULATOR.labels.investment, isBn)}
              value={investment}
              min={ROI_CALCULATOR.ranges.investment.min}
              max={ROI_CALCULATOR.ranges.investment.max}
              step={ROI_CALCULATOR.ranges.investment.step}
              onChange={setInvestment}
              display={`৳${fmt(investment)}`}
            />
            <RoiSlider
              label={L(ROI_CALCULATOR.labels.leads, isBn)}
              value={leads}
              min={ROI_CALCULATOR.ranges.leads.min}
              max={ROI_CALCULATOR.ranges.leads.max}
              step={ROI_CALCULATOR.ranges.leads.step}
              onChange={setLeads}
              display={fmt(leads)}
            />
            <RoiSlider
              label={L(ROI_CALCULATOR.labels.conversionRate, isBn)}
              value={convRate}
              min={ROI_CALCULATOR.ranges.conversionRate.min}
              max={ROI_CALCULATOR.ranges.conversionRate.max}
              step={ROI_CALCULATOR.ranges.conversionRate.step}
              onChange={setConvRate}
              display={`${convRate}%`}
            />
            <RoiSlider
              label={L(ROI_CALCULATOR.labels.customerValue, isBn)}
              value={customerValue}
              min={ROI_CALCULATOR.ranges.customerValue.min}
              max={ROI_CALCULATOR.ranges.customerValue.max}
              step={ROI_CALCULATOR.ranges.customerValue.step}
              onChange={setCustomerValue}
              display={`৳${fmt(customerValue)}`}
            />
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            <RoiResultCard label={L(ROI_CALCULATOR.results.customers, isBn)} value={fmt(customers)} tone="blue" />
            <RoiResultCard label={L(ROI_CALCULATOR.results.revenue, isBn)} value={`৳${fmt(revenue)}`} tone="emerald" />
            <RoiResultCard label={L(ROI_CALCULATOR.results.roi, isBn)} value={`${roi}x`} tone="amber" />
            <RoiResultCard label={L(ROI_CALCULATOR.results.payback, isBn)} value={isBn ? `${paybackMonths} দিন` : `${paybackMonths} days`} tone="violet" />
            <RoiResultCard label={L(ROI_CALCULATOR.results.ltv, isBn)} value={`৳${fmt(ltv)}`} tone="teal" />
            <RoiResultCard label={L(ROI_CALCULATOR.results.cac, isBn)} value={`৳${fmt(cac)}`} tone="rose" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function RoiSlider({
  label, value, min, max, step, onChange, display,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="rounded-lg bg-muted px-2.5 py-1 text-sm font-bold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-blue-600"
        aria-label={label}
      />
    </div>
  )
}

function RoiResultCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  const tones: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/[0.04] text-blue-600 dark:text-blue-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/[0.04] text-emerald-600 dark:text-emerald-400',
    amber: 'border-amber-500/30 bg-amber-500/[0.04] text-amber-600 dark:text-amber-400',
    violet: 'border-violet-500/30 bg-violet-500/[0.04] text-violet-600 dark:text-violet-400',
    teal: 'border-teal-500/30 bg-teal-500/[0.04] text-teal-600 dark:text-teal-400',
    rose: 'border-rose-500/30 bg-rose-500/[0.04] text-rose-600 dark:text-rose-400',
  }
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.blue}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-xl font-extrabold sm:text-2xl">{value}</p>
    </div>
  )
}

/* ========================================================================== */
/*  14. TRUST ARCHITECTURE                                                      */
/* ========================================================================== */

function TrustSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={TRUST.badge}
          title={TRUST.title}
          subtitle={TRUST.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.items.map((t, i) => {
            const Icon = getIcon(t.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold">{L(t.title, isBn)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{L(t.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {TRUST.partners.map((p, i) => (
            <span key={i} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
              {p}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  15. TECH STACK                                                              */
/* ========================================================================== */

function TechStackSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={TECH_STACK.badge}
          title={TECH_STACK.title}
          subtitle={TECH_STACK.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.items.map((t, i) => {
            const Icon = getIcon(t.icon)
            return (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">{L(t.name, isBn)}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{L(t.desc, isBn)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  16. IMPLEMENTATION TIMELINE                                                 */
/* ========================================================================== */

function TimelineSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={TIMELINE.badge}
          title={TIMELINE.title}
          subtitle={TIMELINE.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIMELINE.steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              {/* Phase badge */}
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 text-xs font-bold text-white">
                {L(s.phase, isBn)}
              </span>
              <h3 className="mt-3 font-heading text-base font-bold">{L(s.title, isBn)}</h3>
              <ul className="mt-3 space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{L(item, isBn)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  17. COMPETITIVE COMPARISON                                                  */
/* ========================================================================== */

function ComparisonSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={COMPARISON.badge}
          title={COMPARISON.title}
          subtitle={COMPARISON.subtitle}
          isBn={isBn}
        />
        {/* Mobile: stacked cards. Desktop: table. */}
        <div className="mt-10 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse overflow-hidden rounded-2xl border border-border/60 text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th className="border-b border-border/60 p-4 text-left font-heading font-bold">
                  {L(COMPARISON.headers.feature, isBn)}
                </th>
                <th className="border-b border-border/60 p-4 text-center font-heading font-bold text-muted-foreground">
                  {L(COMPARISON.headers.traditional, isBn)}
                </th>
                <th className="border-b border-border/60 p-4 text-center font-heading font-bold text-muted-foreground">
                  {L(COMPARISON.headers.freelancer, isBn)}
                </th>
                <th className="border-b border-border/60 p-4 text-center font-heading font-bold text-muted-foreground">
                  {L(COMPARISON.headers.inhouse, isBn)}
                </th>
                <th className="border-b border-border/60 p-4 text-center font-heading font-bold text-muted-foreground">
                  {L(COMPARISON.headers.diy, isBn)}
                </th>
                <th className="border-b border-border/60 bg-blue-500/10 p-4 text-center font-heading font-bold text-blue-600 dark:text-blue-400">
                  {L(COMPARISON.headers.nextgen, isBn)}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="border-b border-border/40 p-4 font-medium">{L(row.feature, isBn)}</td>
                  <td className="border-b border-border/40 p-4 text-center text-muted-foreground">{L(row.traditional, isBn)}</td>
                  <td className="border-b border-border/40 p-4 text-center text-muted-foreground">{L(row.freelancer, isBn)}</td>
                  <td className="border-b border-border/40 p-4 text-center text-muted-foreground">{L(row.inhouse, isBn)}</td>
                  <td className="border-b border-border/40 p-4 text-center text-muted-foreground">{L(row.diy, isBn)}</td>
                  <td className="border-b border-border/40 bg-blue-500/5 p-4 text-center font-semibold text-blue-700 dark:text-blue-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {L(row.nextgen, isBn)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked */}
        <div className="mt-8 space-y-4 lg:hidden">
          {COMPARISON.rows.map((row, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
              <p className="font-heading text-sm font-bold">{L(row.feature, isBn)}</p>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">{L(COMPARISON.headers.traditional, isBn)}:</span><span className="text-right">{L(row.traditional, isBn)}</span></div>
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">{L(COMPARISON.headers.freelancer, isBn)}:</span><span className="text-right">{L(row.freelancer, isBn)}</span></div>
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">{L(COMPARISON.headers.inhouse, isBn)}:</span><span className="text-right">{L(row.inhouse, isBn)}</span></div>
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">{L(COMPARISON.headers.diy, isBn)}:</span><span className="text-right">{L(row.diy, isBn)}</span></div>
                <div className="flex justify-between gap-2 rounded-lg bg-blue-500/10 px-2 py-1.5"><span className="font-bold text-blue-600">{L(COMPARISON.headers.nextgen, isBn)}:</span><span className="text-right font-semibold text-blue-700 dark:text-blue-300">{L(row.nextgen, isBn)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  18. FAQ                                                                     */
/* ========================================================================== */

function FaqSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={FAQS.badge}
          title={FAQS.title}
          subtitle={FAQS.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 space-y-8">
          {FAQS.groups.map((group, gi) => {
            const GIcon = getIcon(group.icon)
            return (
              <div key={gi}>
                <div className="mb-3 flex items-center gap-2">
                  <GIcon className="h-5 w-5 text-blue-600" />
                  <h3 className="font-heading text-lg font-bold">{L(group.category, isBn)}</h3>
                </div>
                <div className="space-y-2">
                  {group.items.map((item, ii) => (
                    <details key={ii} className="group rounded-xl border border-border/60 bg-card p-4 shadow-sm [&_summary]:cursor-pointer">
                      <summary className="flex items-center justify-between gap-3 list-none">
                        <span className="text-sm font-medium">{L(item.q, isBn)}</span>
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 border-t border-border/40 pt-3 text-sm leading-relaxed text-muted-foreground">
                        {L(item.a, isBn)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Button onClick={onCta} className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-bold text-white">
            {isBn ? 'আরও প্রশ্ন? ফ্রি কল বুক করুন' : 'More questions? Book a free call'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  19. LEAD QUALIFICATION                                                      */
/* ========================================================================== */

function QualificationSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={QUALIFICATION.badge}
          title={QUALIFICATION.title}
          subtitle={QUALIFICATION.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Ideal */}
          <div className="rounded-2xl border-l-4 border-emerald-500 border-t border-r border-b border-border/60 bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-emerald-600">
              <CheckCircle2 className="h-5 w-5" /> {L(QUALIFICATION.ideal.title, isBn)}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUALIFICATION.ideal.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{L(it.text, isBn)}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Not ideal */}
          <div className="rounded-2xl border-l-4 border-red-500 border-t border-r border-b border-border/60 bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-red-600">
              <XCircle className="h-5 w-5" /> {L(QUALIFICATION.notIdeal.title, isBn)}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUALIFICATION.notIdeal.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span>{L(it.text, isBn)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button onClick={onCta} className="h-11 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-sm font-bold text-white">
            {L(QUALIFICATION.cta, isBn)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  20. SLA                                                                     */
/* ========================================================================== */

function SlaSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={SLA.badge}
          title={SLA.title}
          subtitle={SLA.subtitle}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SLA.items.map((s, i) => {
            const Icon = getIcon(s.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold">{L(s.title, isBn)}</h3>
                {s.desc && <p className="mt-1 text-xs text-muted-foreground">{L(s.desc, isBn)}</p>}
                {s.items && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <span className="text-muted-foreground">{L(it, isBn)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('SLA Document Request — Lead Generation')}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            {L(SLA.downloadLabel, isBn)}
          </a>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  21. FINAL CTA                                                               */
/* ========================================================================== */

function FinalCtaSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section bg="gradient">
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          {L(FINAL_CTA.title, isBn)}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-blue-50 sm:text-lg">
          {L(FINAL_CTA.subtitle, isBn)}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={onCta}
            size="lg"
            className="h-14 rounded-full bg-white px-8 text-base font-bold text-blue-700 shadow-lg hover:bg-blue-50"
          >
            <CalendarCheck className="mr-2 h-5 w-5" />
            {L(FINAL_CTA.primaryCta, isBn)}
          </Button>
          <WhatsAppCTA
            isBn={isBn}
            message={isBn
              ? 'আমি লিড জেনারেশন সেবা নিয়ে জানতে চাই।'
              : "Hi, I'd like to know more about Lead Generation."}
            className="h-14 px-8 text-base"
          />
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/40 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Mail className="h-5 w-5" />
            {L(FINAL_CTA.tertiaryCta, isBn)}
          </a>
        </div>
        <p className="mt-6 text-sm text-blue-100">{L(FINAL_CTA.micro, isBn)}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-blue-100">
          {FINAL_CTA.badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              {L(b, isBn)}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  STICKY MOBILE CTA BAR                                                       */
/* ========================================================================== */

function StickyCtaBar({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 shadow-lg backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold">{L(STICKY_CTA.price, isBn)}</p>
          <p className="text-xs text-muted-foreground">{L(STICKY_CTA.roi, isBn)}</p>
        </div>
        <Button
          onClick={onCta}
          className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-bold text-white"
        >
          <CalendarCheck className="mr-2 h-4 w-4" />
          {L(STICKY_CTA.button, isBn)}
        </Button>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  EXIT-INTENT POPUP                                                           */
/* ========================================================================== */

function ExitPopup({ isBn, onClose }: { isBn: boolean; onClose: () => void }) {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Fire-and-forget to /api/contact (newsletter-style)
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'lead-gen-exit-popup' }),
    }).catch(() => {})
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/70"
        >
          <X className="h-5 w-5" />
        </button>
        {!submitted ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
              <Gift className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold">{L(EXIT_POPUP.title, isBn)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{L(EXIT_POPUP.body, isBn)}</p>
            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <Input
                type="email"
                required
                placeholder={L(EXIT_POPUP.placeholder, isBn)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
              <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-sm font-bold text-white">
                {L(EXIT_POPUP.button, isBn)}
              </Button>
            </form>
            <p className="mt-3 text-center text-xs text-muted-foreground">{L(EXIT_POPUP.micro, isBn)}</p>
          </>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h3 className="mt-4 font-heading text-xl font-bold">
              {isBn ? 'ধন্যবাদ!' : 'Thank you!'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isBn
                ? 'অডিট লিংক আপনার ইমেইলে পাঠানো হয়েছে। ইনবক্স চেক করুন।'
                : 'Your audit link has been sent to your email. Check your inbox.'}
            </p>
            <Button onClick={onClose} variant="outline" className="mt-5">
              {isBn ? 'বন্ধ করুন' : 'Close'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
