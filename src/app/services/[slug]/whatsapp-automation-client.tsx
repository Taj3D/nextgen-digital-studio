'use client'

/**
 * WhatsAppAutomationClient — Enterprise WhatsApp automation landing page.
 *
 * This is a DEDICATED component rendered ONLY when slug === 'whatsapp-automation'
 * (see page.tsx). The other 11 services still use the generic LandingClient
 * template — they are NOT affected by this file.
 *
 * Architecture:
 *  - All bilingual content lives in ./whatsapp-automation-data.ts
 *  - Uses the site design system: shadcn/ui + Tailwind + Lucide
 *  - Bilingual via useLang() from language-provider
 *  - Reuses LandingLeadForm, WhatsAppCTA, FloatingButtons, TopBar, LandingFooter
 *  - FAQ + case studies + objections use native <details>/<summary> (no extra JS)
 *  - ROI calculator + exit popup + sticky CTA use minimal useState
 *  - WhatsApp green accent via Tailwind emerald palette (#25D366 equivalent)
 */
import * as React from 'react'
import {
  ArrowRight, ArrowUp, ArrowDown, Sparkles, Target, Zap, ShieldCheck, Clock,
  CheckCircle2, AlertTriangle, Info, Mail, Phone, MessageCircle, CalendarClock,
  FileText, Ban, Scale, Globe, History, Bot, Database, RefreshCw, Brain,
  AlertCircle, CreditCard, Server, Cog, UserCheck, Users, Megaphone, Sliders,
  Store, Building2, Hospital, Factory, School, Laptop, Rocket, TrendingUp,
  Heart, Hand, Shield, Lock, Cloud, Key, FileSignature, Gavel, Headset,
  Search, BarChart3, Code, Ship, ShoppingCart,
  Lightbulb, Briefcase, Home, Gift, Activity, Star, ChevronDown, X, Download,
  GraduationCap, BookOpen, MessageSquare, Settings, DollarSign,
  PieChart, Layers, Award, BadgeCheck, Check, XCircle, Eye,
  Cpu, Network, Workflow, Gauge, LineChart, PhoneCall, Calendar, CalendarCheck,
  Building, Wrench, Package, Boxes, Truck, FileBarChart,
  HelpCircle, MessageCircle as ChatIcon, MapPin, Eye as EyeIcon, FileSearch,
  MousePointerClick, Mic, Filter, Smile, Shuffle, Hand as HandIcon, Bell,
  Ticket, Sprout, GitBranch, Banknote, Maximize, Moon, FlaskConical, Map,
  Plane, Banknote as BankIcon, HeartHandshake, Utensils, ShoppingCart as CartIcon,
  MousePointer, BadgeCheck as BadgeCheckIcon, Plug, BarChart as BarChartIcon,
  BookOpen as BookOpenIcon, Frown, TrendingDown, Star as StarIcon, Tag,
  ShoppingBag, Trophy,
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
  HERO, HERO_METRICS, PROBLEM, EMOTIONAL_COST, WHY_TRADITIONAL_FAILS,
  WHY_NEXTGEN, HOW_IT_WORKS, FEATURES, USE_CASES, AI_AUTOMATION,
  MARKETING_AUTOMATION, CRM_INTEGRATION, TECH_STACK, BENEFITS, COMPARISON,
  CASE_STUDIES, STATISTICS, DELIVERABLES, PRICING, ROI_CALCULATOR,
  TIMELINE, PROCESS, FAQS, OBJECTIONS, GUARANTEES, TRUST, SECURITY,
  FINAL_CTA, EXIT_POPUP, STICKY_CTA,
  LEAD_QUAL_CALC, BROADCAST_ESTIMATOR, INTEGRATIONS, BEFORE_AFTER, URGENCY,
  type Bilingual,
} from './whatsapp-automation-data'

/* -------------------------------------------------------------------------- */
/*  Icon resolver — maps string keys from data → Lucide components            */
/* -------------------------------------------------------------------------- */
const iconMap: Record<string, React.ElementType> = {
  store: Store, building: Building2, hospital: Hospital, factory: Factory,
  school: School, laptop: Laptop, rocket: Rocket, 'trending-up': TrendingUp,
  'trending-down': TrendingDown, clock: Clock, globe: Globe, heart: Heart,
  users: Users, 'arrow-up': ArrowUp, 'arrow-down': ArrowDown,
  'shield-check': ShieldCheck, zap: Zap, hand: Hand, shield: Shield, lock: Lock,
  cloud: Cloud, 'credit-card': CreditCard, database: Database, key: Key,
  'file-text': FileText, megaphone: Megaphone,
  'message-circle': MessageCircle, mail: Mail, search: Search, bot: Bot,
  phone: Phone, code: Code, 'bar-chart': BarChart3, dashboard: BarChart3,
  home: Home, ship: Ship, 'shopping-cart': ShoppingCart, lightbulb: Lightbulb,
  briefcase: Briefcase, gift: Gift, activity: Activity, headset: Headset,
  target: Target, scale: Scale, gavel: Gavel, 'refresh-cw': RefreshCw,
  refresh: RefreshCw, brain: Brain, 'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle, server: Server, cogs: Cog, 'user-check': UserCheck,
  history: History, settings: Settings, 'dollar-sign': DollarSign,
  'graduation-cap': GraduationCap, 'book-open': BookOpen, eye: Eye,
  cpu: Cpu, network: Network, workflow: Workflow, gauge: Gauge,
  'line-chart': LineChart, 'chart-line': LineChart,
  'phone-call': PhoneCall, calendar: Calendar, 'calendar-check': CalendarCheck,
  award: Award, 'badge-check': BadgeCheck,
  'pie-chart': PieChart, layers: Layers, wrench: Wrench, package: Package,
  boxes: Boxes, truck: Truck, 'file-bar-chart': FileBarChart,
  money: Banknote, star: Star, frown: Frown,
  'heart-handshake': HeartHandshake, utensils: Utensils, plane: Plane,
  banknote: Banknote, 'bank-note': Banknote, 'map-pin': MapPin,
  'file-search': FileSearch, 'mouse-pointer-click': MousePointerClick,
  mic: Mic, filter: Filter, smile: Smile, shuffle: Shuffle,
  bell: Bell, ticket: Ticket, sprout: Sprout, 'git-branch': GitBranch,
  maximize: Maximize, moon: Moon, 'flask-conical': FlaskConical, map: Map,
  'mouse-pointer': MousePointer, plug: Plug, check: Check,
  'facebook': MessageCircle, 'facebook-ad': Megaphone,
  'qualification': Filter, 'booking': Calendar, 'payment': CreditCard,
  'repeat': RefreshCw, 'sales-team': Users, 'retention': Heart,
  'abandoned-cart': ShoppingCart, 'coupon': Ticket, 'reminder': Bell,
  'reactivation': RefreshCw, 'nurturing': Sprout, 'upsell': TrendingUp,
  'cross-sell': GitBranch, 'referral': Gift, 'broadcast': Megaphone,
  'funnels': Filter, 'campaign': Calendar, 'notifications': Bell,
  'appointment': Calendar, 'lead-scoring': Star, 'segmentation': Filter,
  'quick-replies': MessageCircle, 'buttons': MousePointerClick,
  'catalog': ShoppingCart, 'commerce': ShoppingCart, 'templates': FileText,
  'flows': Workflow, 'team-inbox': Users, 'analytics': BarChart3,
  'voice-agent': Mic, 'multilingual': Globe, 'knowledge-base': BookOpen,
  'crm-sync': Database, 'intent-detection': Target, 'auto-escalation': AlertTriangle,
  'human-handoff': Hand, 'conversation-routing': Shuffle, 'sentiment': Smile,
  'api-webhooks': Code, 'official-api': BadgeCheck, 'green-tick': BadgeCheck,
  'messaging-limits': Gauge, 'quality-rating': Star, 'commerce-api': ShoppingCart,
  'shopping-bag': ShoppingBag, 'sliders': Sliders, 'trophy': Trophy,
}

function getIcon(name?: string): React.ElementType {
  if (!name) return FileText
  return iconMap[name] || FileText
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function L(b: Bilingual | undefined, isBn: boolean): string {
  if (!b) return ''
  return isBn ? b.bn : b.en
}

/** Scroll-reveal wrapper: fades + slides children into view once.
 *  SSR-safe — children always render; the hidden class only applies after
 *  mount (prevents hydration mismatch). */
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        mounted && !visible ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/** Section wrapper with WhatsApp-green accent option. */
function Section({
  id, children, className = '', bg = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
  bg?: 'muted' | 'dark' | 'whatsapp' | 'gradient' | ''
}) {
  const bgClass =
    bg === 'muted' ? 'bg-muted/30' :
    bg === 'dark' ? 'bg-slate-950 text-white' :
    bg === 'whatsapp' ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white' :
    bg === 'gradient' ? 'bg-gradient-to-br from-emerald-600 to-cyan-500 text-white' :
    ''
  return (
    <section id={id} className={`relative scroll-mt-20 py-14 sm:py-20 ${bgClass} ${className}`}>
      {children}
    </section>
  )
}

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

function SectionHeader({
  badge, title, subtitle, isBn, light = false, accent = 'blue',
}: {
  badge?: Bilingual
  title: Bilingual
  subtitle?: Bilingual
  isBn: boolean
  light?: boolean
  accent?: 'blue' | 'emerald'
}) {
  const badgeClass = light
    ? 'bg-white/15 text-white'
    : accent === 'emerald'
    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300'
    : 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300'
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badgeClass}`}>
          {L(badge, isBn)}
        </span>
      )}
      <h2 className={`mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : ''}`}>
        {L(title, isBn)}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-emerald-50' : 'text-muted-foreground'}`}>
          {L(subtitle, isBn)}
        </p>
      )}
    </div>
  )
}

/* ========================================================================== */
/*  HERO SECTION                                                               */
/* ========================================================================== */

function HeroSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* WhatsApp-green radial glow */}
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <Container className="relative py-16 text-center sm:py-24">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
            <MessageCircle className="h-3 w-3" /> {L(HERO.eyebrow, isBn)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
            {isBn ? 'মেটা পার্টনার' : 'Meta Partner'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
            {isBn ? '৬০-দিন ROI গ্যারান্টি' : '60-day ROI guarantee'}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {L(HERO.titleA, isBn)}
          </span>
          <br />
          {L(HERO.titleB, isBn)}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {L(HERO.subtitle, isBn)}
        </p>

        {/* ROI Badge */}
        <div className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm">
          <div className="text-xl font-bold text-emerald-400 sm:text-2xl">
            {L(HERO.roiBadge, isBn)}
          </div>
          <div className="mt-1 text-sm text-slate-400">
            {L(HERO.roiSub, isBn)}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.02] hover:bg-emerald-600"
          >
            <MessageCircle className="h-5 w-5" />
            {L(HERO.primaryCta, isBn)}
          </button>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            {L(HERO.secondaryCta, isBn)}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          {HERO.trustBadges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-slate-400">
          {HERO.trustRow.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {L(t, isBn)}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ========================================================================== */
/*  HERO METRICS                                                               */
/* ========================================================================== */

function MetricsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {HERO_METRICS.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-emerald-600 sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {L(s.label, isBn)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CUSTOMER PROBLEMS                                                           */
/* ========================================================================== */

function ProblemSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={PROBLEM.eyebrow}
          title={PROBLEM.title}
          subtitle={PROBLEM.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Pains list */}
          <ul className="space-y-3">
            {PROBLEM.pains.map((p, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <div>
                  <div className="font-semibold">{L(p.title, isBn)}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{L(p.desc, isBn)}</div>
                </div>
              </li>
            ))}
          </ul>
          {/* Cost stats */}
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            {PROBLEM.costStats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-emerald-600 sm:text-4xl">
                  {s.value}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{L(s.desc, isBn)}</p>
              </div>
            ))}
            <p className="mt-2 font-bold text-red-600">
              {L(PROBLEM.warning, isBn)}
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" />
            {L(PROBLEM.cta, isBn)}
          </button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  EMOTIONAL COST                                                              */
/* ========================================================================== */

function EmotionalCostSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={EMOTIONAL_COST.eyebrow}
          title={EMOTIONAL_COST.title}
          subtitle={EMOTIONAL_COST.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EMOTIONAL_COST.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <Icon className="mb-3 h-10 w-10 text-emerald-600" />
                <h3 className="font-heading text-lg font-bold">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  WHY TRADITIONAL WHATSAPP FAILS                                             */
/* ========================================================================== */

function WhyTraditionalSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={WHY_TRADITIONAL_FAILS.eyebrow}
          title={WHY_TRADITIONAL_FAILS.title}
          subtitle={WHY_TRADITIONAL_FAILS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {WHY_TRADITIONAL_FAILS.rows.map((r, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-red-200/60 bg-red-50/50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
              <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <div>
                <div className="font-semibold">{L(r.problem, isBn)}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{L(r.desc, isBn)}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  WHY NEXTGEN AI WHATSAPP AUTOMATION                                         */
/* ========================================================================== */

function WhyNextgenSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={WHY_NEXTGEN.eyebrow}
          title={WHY_NEXTGEN.title}
          subtitle={WHY_NEXTGEN.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_NEXTGEN.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  HOW THE SYSTEM WORKS (Flow Diagram)                                        */
/* ========================================================================== */

function HowItWorksSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={HOW_IT_WORKS.eyebrow}
          title={HOW_IT_WORKS.title}
          subtitle={HOW_IT_WORKS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {HOW_IT_WORKS.steps.map((s, i) => {
              const Icon = getIcon(s.icon)
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-xs font-semibold sm:text-sm">{L(s.label, isBn)}</div>
                    <div className="mt-1 text-[10px] font-bold text-emerald-600">#{i + 1}</div>
                  </div>
                  {/* Arrow connector (hidden on small screens, shown between items) */}
                  {i < HOW_IT_WORKS.steps.length - 1 && (
                    <div className="hidden items-center justify-center lg:flex">
                      <ArrowRight className="h-5 w-5 text-emerald-400" />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {L(HOW_IT_WORKS.note, isBn)}
          </p>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FEATURES (Expanded)                                                        */
/* ========================================================================== */

function FeaturesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="features" bg="muted">
      <Container>
        <SectionHeader
          badge={FEATURES.eyebrow}
          title={FEATURES.title}
          subtitle={FEATURES.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.items.map((f, i) => {
            const Icon = getIcon(f.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">{L(f.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(f.what, isBn)}</p>
                <div className="mt-3 rounded-lg bg-emerald-50/60 p-2.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                  {isBn ? '💡 ভ্যালু: ' : '💡 Value: '}
                  {L(f.value, isBn)}
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
/*  USE CASES (12 industries)                                                  */
/* ========================================================================== */

function UseCasesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={USE_CASES.eyebrow}
          title={USE_CASES.title}
          subtitle={USE_CASES.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.items.map((u, i) => {
            const Icon = getIcon(u.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold">{L(u.industry, isBn)}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{L(u.use, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  AI AUTOMATION                                                              */
/* ========================================================================== */

function AiAutomationSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="dark">
      <Container>
        <SectionHeader
          badge={AI_AUTOMATION.eyebrow}
          title={AI_AUTOMATION.title}
          subtitle={AI_AUTOMATION.subtitle}
          isBn={isBn}
          light
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_AUTOMATION.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-sm text-slate-400">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  MARKETING AUTOMATION                                                       */
/* ========================================================================== */

function MarketingSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={MARKETING_AUTOMATION.eyebrow}
          title={MARKETING_AUTOMATION.title}
          subtitle={MARKETING_AUTOMATION.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETING_AUTOMATION.items.map((m, i) => {
            const Icon = getIcon(m.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(m.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(m.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CRM INTEGRATION                                                            */
/* ========================================================================== */

function CrmSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={CRM_INTEGRATION.eyebrow}
          title={CRM_INTEGRATION.title}
          subtitle={CRM_INTEGRATION.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CRM_INTEGRATION.items.map((c, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card p-4 text-center shadow-sm transition-transform hover:-translate-y-1">
              <div className="font-heading text-sm font-bold">{c.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{L(c.category, isBn)}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TECH STACK                                                                 */
/* ========================================================================== */

function TechStackSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={TECH_STACK.eyebrow}
          title={TECH_STACK.title}
          subtitle={TECH_STACK.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TECH_STACK.items.map((t, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background p-4 text-center shadow-sm">
              <div className="font-heading text-sm font-bold">{t.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{L(t.desc, isBn)}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  BENEFITS                                                                   */
/* ========================================================================== */

function BenefitsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={BENEFITS.eyebrow}
          title={BENEFITS.title}
          subtitle={BENEFITS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.cards.map((b, i) => {
            const Icon = getIcon(b.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{b.stat}</div>
                <h3 className="mt-1 font-heading text-base font-bold">{L(b.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(b.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  COMPARISON TABLE                                                           */
/* ========================================================================== */

function ComparisonSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={COMPARISON.eyebrow}
          title={COMPARISON.title}
          subtitle={COMPARISON.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
            <thead>
              <tr className="bg-slate-900 text-left text-white">
                <th className="p-4 text-sm font-semibold">{isBn ? 'ফিচার' : 'Feature'}</th>
                <th className="p-4 text-sm font-semibold">{isBn ? 'প্রচলিত WhatsApp' : 'Traditional WhatsApp'}</th>
                <th className="bg-emerald-600 p-4 text-sm font-semibold">{isBn ? 'NextGen AI' : 'NextGen AI'}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="p-4 text-sm font-medium">{L(r.feature, isBn)}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                      {L(r.traditional, isBn)}
                    </span>
                  </td>
                  <td className="bg-emerald-50/60 p-4 text-sm font-medium dark:bg-emerald-950/20">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {L(r.nextgen, isBn)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CASE STUDIES (native details accordion)                                    */
/* ========================================================================== */

function CaseStudiesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={CASE_STUDIES.eyebrow}
          title={CASE_STUDIES.title}
          subtitle={CASE_STUDIES.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {CASE_STUDIES.items.map((cs, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-heading text-base font-bold marker:content-['']">
                  <span className="flex items-center gap-2">
                    <span>{L(cs.industry, isBn)}</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                      ROI {cs.roi}
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-red-600">{isBn ? 'সমস্যা: ' : 'Problem: '}</span>
                    <span className="text-muted-foreground">{L(cs.problem, isBn)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-600">{isBn ? 'সমাধান: ' : 'Solution: '}</span>
                    <span className="text-muted-foreground">{L(cs.solution, isBn)}</span>
                  </div>
                  <div>
                    <span className="font-semibold">{isBn ? 'টাইমলাইন: ' : 'Timeline: '}</span>
                    <span className="text-muted-foreground">{L(cs.timeline, isBn)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cs.metrics.map((m, j) => (
                      <span key={j} className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {L(m, isBn)}
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  STATISTICS                                                                 */
/* ========================================================================== */

function StatisticsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={STATISTICS.eyebrow}
          title={STATISTICS.title}
          subtitle={STATISTICS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATISTICS.stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600 sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs text-muted-foreground sm:text-sm">
                {L(s.label, isBn)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  DELIVERABLES                                                               */
/* ========================================================================== */

function DeliverablesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={DELIVERABLES.eyebrow}
          title={DELIVERABLES.title}
          subtitle={DELIVERABLES.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.items.map((d, i) => {
            const Icon = getIcon(d.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(d.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(d.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  PRICING                                                                    */
/* ========================================================================== */

function PricingSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [annual, setAnnual] = React.useState(false)

  /** Parse the numeric portion of a price string (e.g. "৳25,000/mo" → 25000).
   *  Returns 0 for "Custom" or unparseable strings. */
  function parsePrice(s: string): number {
    const m = s.replace(/[^\d]/g, '')
    return m ? parseInt(m, 10) : 0
  }

  function formatBDT(n: number): string {
    return `৳${n.toLocaleString('en-IN')}`
  }

  return (
    <Section id="pricing" bg="muted">
      <Container>
        <SectionHeader
          badge={PRICING.eyebrow}
          title={PRICING.title}
          subtitle={PRICING.subtitle}
          isBn={isBn}
          accent="emerald"
        />

        {/* Monthly / Annual toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>
            {isBn ? 'মাসিক' : 'Monthly'}
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            role="switch"
            aria-checked={annual}
            aria-label={isBn ? 'মাসিক বা বার্ষিক টগল' : 'Monthly or annual toggle'}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              annual ? 'bg-emerald-600' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                annual ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
            {isBn ? 'বার্ষিক' : 'Annual'}
          </span>
          {annual && (
            <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              {isBn ? '১৫% ছাড় + সেটআপ ফ্রি' : 'Save 15% + Free setup'}
            </span>
          )}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRICING.tiers.map((tier, i) => {
            const monthlyNum = parsePrice(L(tier.price, isBn))
            const isCustom = monthlyNum === 0
            const annualMonthly = isCustom ? 0 : Math.round(monthlyNum * 0.85)
            const annualSavings = isCustom ? 0 : monthlyNum * 12 - annualMonthly * 12

            return (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                  tier.popular
                    ? 'border-emerald-500 bg-background ring-2 ring-emerald-500/30 lg:-mt-4 lg:mb-4'
                    : 'border-border/60 bg-background'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white">
                    {isBn ? 'সর্বাধিক জনপ্রিয়' : 'Most Popular'}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold">{L(tier.name, isBn)}</h3>
                <div className="mt-2">
                  {isCustom ? (
                    <div className="text-3xl font-extrabold text-emerald-600">
                      {L(tier.price, isBn)}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-emerald-600">
                          {annual ? formatBDT(annualMonthly) : formatBDT(monthlyNum)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {isBn ? '/মাস' : '/mo'}
                        </span>
                      </div>
                      {annual && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          <span className="line-through">{formatBDT(monthlyNum)}</span>
                          <span className="ml-1.5 font-semibold text-emerald-600">
                            {isBn ? `বছরে ${formatBDT(annualSavings)} সাশ্রয়` : `Save ${formatBDT(annualSavings)}/yr`}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{L(tier.tagline, isBn)}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span>{L(f, isBn)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onCta}
                  className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition-transform hover:scale-[1.02] ${
                    tier.popular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'border border-border bg-background hover:bg-muted'
                  }`}
                >
                  {isBn ? 'শুরু করুন' : 'Get Started'}
                </button>
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {L(PRICING.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  ROI CALCULATOR (interactive)                                              */
/* ========================================================================== */

function RoiCalculatorSection({ isBn }: { isBn: boolean }) {
  const [messages, setMessages] = React.useState(ROI_CALCULATOR.sliders.messages.default)
  const [openRate, setOpenRate] = React.useState(ROI_CALCULATOR.sliders.openRate.default)
  const [replyRate, setReplyRate] = React.useState(ROI_CALCULATOR.sliders.replyRate.default)
  const [customerValue, setCustomerValue] = React.useState(ROI_CALCULATOR.sliders.customerValue.default)
  const [monthlyCost, setMonthlyCost] = React.useState(ROI_CALCULATOR.sliders.monthlyCost.default)

  const opened = Math.round((messages * openRate) / 100)
  const replies = Math.round((opened * replyRate) / 100)
  const revenue = replies * customerValue
  const profit = revenue - monthlyCost
  const roi = monthlyCost > 0 ? revenue / monthlyCost : 0
  const annual = profit * 12

  const fmtBDT = (n: number) => '৳' + Math.round(n).toLocaleString('en-IN')

  const sliders = [
    { val: messages, set: setMessages, ...ROI_CALCULATOR.sliders.messages },
    { val: openRate, set: setOpenRate, ...ROI_CALCULATOR.sliders.openRate },
    { val: replyRate, set: setReplyRate, ...ROI_CALCULATOR.sliders.replyRate },
    { val: customerValue, set: setCustomerValue, ...ROI_CALCULATOR.sliders.customerValue },
    { val: monthlyCost, set: setMonthlyCost, ...ROI_CALCULATOR.sliders.monthlyCost },
  ]

  const results = [
    { label: ROI_CALCULATOR.results.opened.label, value: opened.toLocaleString(), color: 'text-emerald-600' },
    { label: ROI_CALCULATOR.results.replies.label, value: replies.toLocaleString(), color: 'text-emerald-600' },
    { label: ROI_CALCULATOR.results.revenue.label, value: fmtBDT(revenue), color: 'text-emerald-600' },
    { label: ROI_CALCULATOR.results.roi.label, value: roi.toFixed(1) + 'x', color: roi >= 3 ? 'text-emerald-600' : 'text-amber-600' },
    { label: ROI_CALCULATOR.results.profit.label, value: fmtBDT(profit), color: profit > 0 ? 'text-emerald-600' : 'text-red-600' },
    { label: ROI_CALCULATOR.results.annual.label, value: fmtBDT(annual), color: 'text-emerald-600' },
  ]

  return (
    <Section id="roi-calculator">
      <Container>
        <SectionHeader
          badge={ROI_CALCULATOR.eyebrow}
          title={ROI_CALCULATOR.title}
          subtitle={ROI_CALCULATOR.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Sliders */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              {sliders.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold">{L(s.label, isBn)}</label>
                    <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-sm font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                      {s.val >= 1000 ? (s.val / 1000).toFixed(s.val >= 10000 ? 0 : 1) + 'K' : s.val}
                      {s.label.en.includes('(৳)') ? '' : s.label.en.includes('(%)') ? '%' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.val}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-600"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{L(ROI_CALCULATOR.note, isBn)}</p>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm">
                <div className={`text-2xl font-extrabold sm:text-3xl ${r.color}`}>
                  {r.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {L(r.label, isBn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TIMELINE                                                                   */
/* ========================================================================== */

function TimelineSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={TIMELINE.eyebrow}
          title={TIMELINE.title}
          subtitle={TIMELINE.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {TIMELINE.phases.map((p, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border-l-4 border-emerald-500 bg-background p-4 shadow-sm">
              <div className="min-w-[80px] font-bold text-emerald-600">
                {L(p.when, isBn)}
              </div>
              <div>
                <h3 className="font-heading text-base font-bold">{L(p.title, isBn)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{L(p.desc, isBn)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  PROCESS                                                                    */
/* ========================================================================== */

function ProcessSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={PROCESS.eyebrow}
          title={PROCESS.title}
          subtitle={PROCESS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.steps.map((s, i) => {
            const Icon = getIcon(s.icon)
            return (
              <div key={i} className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(s.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(s.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FAQ (native details accordion, grouped)                                    */
/* ========================================================================== */

function FaqSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="faq" bg="muted">
      <Container>
        <SectionHeader
          badge={FAQS.eyebrow}
          title={FAQS.title}
          subtitle={FAQS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          {FAQS.groups.map((g, gi) => (
            <div key={gi}>
              <h3 className="mb-3 font-heading text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {L(g.name, isBn)}
              </h3>
              <div className="space-y-2">
                {g.items.map((item, ii) => (
                  <details key={ii} className="group rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold marker:content-['']">
                      {L(item.q, isBn)}
                      <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {L(item.a, isBn)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  OBJECTION HANDLING (native details accordion)                              */
/* ========================================================================== */

function ObjectionsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={OBJECTIONS.eyebrow}
          title={OBJECTIONS.title}
          subtitle={OBJECTIONS.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {OBJECTIONS.items.map((o, i) => (
            <details key={i} className="group rounded-xl border border-border/60 bg-card p-4 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 marker:content-['']">
                <span className="font-heading text-sm font-bold text-red-600 sm:text-base">
                  {L(o.objection, isBn)}
                </span>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {L(o.response, isBn)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  GUARANTEES                                                                 */
/* ========================================================================== */

function GuaranteesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="whatsapp">
      <Container>
        <SectionHeader
          badge={GUARANTEES.eyebrow}
          title={GUARANTEES.title}
          subtitle={GUARANTEES.subtitle}
          isBn={isBn}
          light
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.cards.map((g, i) => {
            const Icon = getIcon(g.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{L(g.title, isBn)}</h3>
                <p className="mt-2 text-sm text-emerald-50">{L(g.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TRUST (Testimonials + Stats + Partners)                                    */
/* ========================================================================== */

function TrustSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={TRUST.eyebrow}
          title={TRUST.title}
          subtitle={TRUST.subtitle}
          isBn={isBn}
          accent="emerald"
        />
        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {L(s.label, isBn)}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{L(t.quote, isBn)}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  {L(t.author, isBn).charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{L(t.author, isBn)}</div>
                  <div className="text-xs text-muted-foreground">{L(t.role, isBn)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST.partners.map((p, i) => (
              <span key={i} className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm">
                {L(p, isBn)}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  SECURITY                                                                   */
/* ========================================================================== */

function SecuritySection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="dark">
      <Container>
        <SectionHeader
          badge={SECURITY.eyebrow}
          title={SECURITY.title}
          subtitle={SECURITY.subtitle}
          isBn={isBn}
          light
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-sm text-slate-400">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
        {/* Compliance badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SECURITY.compliance.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              {L(c, isBn)}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FINAL CTA                                                                  */
/* ========================================================================== */

function FinalCtaSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn
      ? 'আসসালামু আলাইকুম, আমি WhatsApp অটোমেশন সেবা সম্পর্কে জানতে চাই।'
      : "Hi, I'd like to know more about WhatsApp Automation service.",
  )}`
  return (
    <Section id="cta" bg="whatsapp">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {L(FINAL_CTA.eyebrow, isBn)}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {L(FINAL_CTA.title, isBn)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-50 sm:text-lg">
            {L(FINAL_CTA.subtitle, isBn)}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-700 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <CalendarClock className="h-5 w-5" />
              {L(FINAL_CTA.primaryCta, isBn)}
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              {L(FINAL_CTA.secondaryCta, isBn)}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-emerald-50">
            {FINAL_CTA.reassurance.map((r, i) => (
              <li key={i} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {L(r, isBn)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  LEAD FORM                                                                  */
/* ========================================================================== */

function LeadFormSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="order">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <LandingEyebrow>
              <MessageCircle className="h-3 w-3" /> {isBn ? 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' : 'Book Your Free Strategy Call'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {isBn ? 'আপনার WhatsApp অটোমেশন রোডম্যাপ পান' : 'Get Your WhatsApp Automation Roadmap'}
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
              source="service_whatsapp-automation"
              serviceName={isBn ? 'WhatsApp অটোমেশন' : 'WhatsApp Automation'}
              submitLabel={isBn ? 'ফ্রি কল রিকোয়েস্ট করুন' : 'Request My Free Call'}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  LEAD QUALIFICATION CALCULATOR                                              */
/* ========================================================================== */

function LeadQualCalculatorSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [answers, setAnswers] = React.useState<number[]>(Array(LEAD_QUAL_CALC.questions.length).fill(-1))
  const [current, setCurrent] = React.useState(0)
  const [showResult, setShowResult] = React.useState(false)

  // Sum of selected option scores across all questions
  const score = answers.reduce((sum, aIdx, qIdx) => {
    if (aIdx < 0) return sum
    return sum + LEAD_QUAL_CALC.questions[qIdx].options[aIdx].score
  }, 0)
  const maxScore = LEAD_QUAL_CALC.questions.length * 4

  const result = LEAD_QUAL_CALC.results.find((r) => score >= r.min && score <= r.max) || LEAD_QUAL_CALC.results[LEAD_QUAL_CALC.results.length - 1]

  function selectAnswer(qIdx: number, aIdx: number) {
    const next = [...answers]
    next[qIdx] = aIdx
    setAnswers(next)
    if (qIdx < LEAD_QUAL_CALC.questions.length - 1) {
      setTimeout(() => setCurrent(qIdx + 1), 200)
    } else {
      setTimeout(() => setShowResult(true), 200)
    }
  }

  function retake() {
    setAnswers(Array(LEAD_QUAL_CALC.questions.length).fill(-1))
    setCurrent(0)
    setShowResult(false)
  }

  const pct = Math.round((score / maxScore) * 100)

  return (
    <Section id="lead-qual-calculator" bg="muted">
      <Container>
        <SectionHeader
          eyebrow={L(LEAD_QUAL_CALC.eyebrow, isBn)}
          title={L(LEAD_QUAL_CALC.title, isBn)}
          subtitle={L(LEAD_QUAL_CALC.subtitle, isBn)}
          accent="emerald"
        />

        {!showResult ? (
          <div className="mx-auto mt-10 max-w-2xl">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{isBn ? `প্রশ্ন ${current + 1} / ${LEAD_QUAL_CALC.questions.length}` : `Question ${current + 1} / ${LEAD_QUAL_CALC.questions.length}`}</span>
                <span>{Math.round(((current) / LEAD_QUAL_CALC.questions.length) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(current / LEAD_QUAL_CALC.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
              <h3 className="font-heading text-xl font-bold sm:text-2xl">
                {L(LEAD_QUAL_CALC.questions[current].q, isBn)}
              </h3>
              <div className="mt-6 space-y-3">
                {LEAD_QUAL_CALC.questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(current, i)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition-all hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 sm:text-base ${
                      answers[current] === i ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'border-border'
                    }`}
                  >
                    <span>{L(opt.label, isBn)}</span>
                    {answers[current] === i && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  </button>
                ))}
              </div>
              {current > 0 && (
                <button
                  onClick={() => setCurrent(current - 1)}
                  className="mt-4 text-sm text-muted-foreground underline-offset-2 hover:underline"
                >
                  ← {isBn ? 'আগের প্রশ্ন' : 'Previous question'}
                </button>
              )}
            </div>

            {/* Quick nav dots */}
            <div className="mt-4 flex justify-center gap-2">
              {LEAD_QUAL_CALC.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Question ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? 'w-8 bg-emerald-500' : answers[i] >= 0 ? 'w-2.5 bg-emerald-300' : 'w-2.5 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-3xl border border-border bg-background p-8 text-center shadow-lg sm:p-12">
              {/* Score ring */}
              <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" fill="none" strokeWidth="12" className="stroke-muted" />
                  <circle
                    cx="80" cy="80" r="70" fill="none" strokeWidth="12"
                    strokeLinecap="round"
                    className={result.color === 'emerald' ? 'stroke-emerald-500' : 'stroke-amber-500'}
                    strokeDasharray={`${(pct / 100) * 440} 440`}
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="font-heading text-4xl font-bold">{pct}%</div>
                  <div className="text-xs text-muted-foreground">{isBn ? 'ফিট স্কোর' : 'Fit Score'}</div>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
                result.color === 'emerald'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
              }`}>
                {result.color === 'emerald' ? <CheckCircle2 className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                {L(result.label, isBn)}
              </div>

              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                {L(result.verdict, isBn)}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={onCta}
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 ${
                    result.color === 'emerald' ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  {L(result.cta, isBn)}
                </button>
                <button
                  onClick={retake}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" />
                  {L(LEAD_QUAL_CALC.retake, isBn)}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  BROADCAST REACH ESTIMATOR                                                  */
/* ========================================================================== */

/** Standalone slider for the Broadcast Estimator (extracted to satisfy
 *  react-hooks/static-components lint rule). */
function BroadcastSlider({ label, value, set, min, max, step, fmt }: {
  label: string; value: number; set: (v: number) => void
  min: number; max: number; step: number; fmt: (v: number) => string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-sm font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          {fmt(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-600"
      />
    </div>
  )
}

function fmtNum(v: number) { return v.toLocaleString() }
function fmtBDT(v: number) { return `৳${v.toLocaleString()}` }
function fmtPct(v: number) { return `${v}%` }

function BroadcastEstimatorSection({ isBn }: { isBn: boolean }) {
  const s = BROADCAST_ESTIMATOR.sliders
  const [audience, setAudience] = React.useState(s.audience.default)
  const [openRate, setOpenRate] = React.useState(s.openRate.default)
  const [ctr, setCtr] = React.useState(s.ctr.default)
  const [conversion, setConversion] = React.useState(s.conversion.default)
  const [aov, setAov] = React.useState(s.aov.default)

  const opens = Math.round(audience * (openRate / 100))
  const clicks = Math.round(opens * (ctr / 100))
  const buyers = Math.round(clicks * (conversion / 100))
  const revenue = buyers * aov
  const emailRevenue = Math.round(audience * 0.2 * 0.06 * 0.03 * aov)
  const uplift = revenue > 0 && emailRevenue > 0 ? Math.round((revenue / emailRevenue) * 10) / 10 : 0

  return (
    <Section id="broadcast-estimator">
      <Container>
        <SectionHeader
          eyebrow={L(BROADCAST_ESTIMATOR.eyebrow, isBn)}
          title={L(BROADCAST_ESTIMATOR.title, isBn)}
          subtitle={L(BROADCAST_ESTIMATOR.subtitle, isBn)}
          accent="emerald"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Sliders */}
          <div className="space-y-5 rounded-2xl border border-border bg-background p-6 sm:p-8">
            <BroadcastSlider label={L(s.audience.label, isBn)} value={audience} set={setAudience} min={s.audience.min} max={s.audience.max} step={s.audience.step} fmt={fmtNum} />
            <BroadcastSlider label={L(s.openRate.label, isBn)} value={openRate} set={setOpenRate} min={s.openRate.min} max={s.openRate.max} step={s.openRate.step} fmt={fmtPct} />
            <BroadcastSlider label={L(s.ctr.label, isBn)} value={ctr} set={setCtr} min={s.ctr.min} max={s.ctr.max} step={s.ctr.step} fmt={fmtPct} />
            <BroadcastSlider label={L(s.conversion.label, isBn)} value={conversion} set={setConversion} min={s.conversion.min} max={s.conversion.max} step={s.conversion.step} fmt={fmtPct} />
            <BroadcastSlider label={L(s.aov.label, isBn)} value={aov} set={setAov} min={s.aov.min} max={s.aov.max} step={s.aov.step} fmt={fmtBDT} />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <div className="text-2xl font-bold text-emerald-600 sm:text-3xl">{fmtNum(opens)}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{L(BROADCAST_ESTIMATOR.results.opens.label, isBn)}</div>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <div className="text-2xl font-bold text-emerald-600 sm:text-3xl">{fmtNum(clicks)}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{L(BROADCAST_ESTIMATOR.results.clicks.label, isBn)}</div>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <div className="text-2xl font-bold text-emerald-600 sm:text-3xl">{fmtNum(buyers)}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{L(BROADCAST_ESTIMATOR.results.buyers.label, isBn)}</div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 sm:text-3xl">{fmtBDT(revenue)}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{L(BROADCAST_ESTIMATOR.results.revenue.label, isBn)}</div>
              </div>
            </div>

            {uplift > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                <TrendingUp className="h-6 w-6 flex-shrink-0 text-emerald-600" />
                <div className="text-sm">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{uplift}x</span>
                  <span className="text-muted-foreground"> {L(BROADCAST_ESTIMATOR.results.emailComparison.label, isBn)}</span>
                </div>
              </div>
            )}

            <p className="text-xs text-muted-foreground">{L(BROADCAST_ESTIMATOR.note, isBn)}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  INTEGRATIONS MARQUEE                                                       */
/* ========================================================================== */

function IntegrationsSection({ isBn }: { isBn: boolean }) {
  const items = INTEGRATIONS.items
  // Duplicate for seamless loop
  const loop = [...items, ...items]
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          eyebrow={L(INTEGRATIONS.eyebrow, isBn)}
          title={L(INTEGRATIONS.title, isBn)}
          subtitle={L(INTEGRATIONS.subtitle, isBn)}
          accent="emerald"
        />
      </Container>
      <div className="relative mt-10 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-muted to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-muted to-transparent sm:w-32" />
        <div className="flex w-max animate-[scroll_40s_linear_infinite] gap-3">
          {loop.map((name, i) => (
            <div
              key={i}
              className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold shadow-sm"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-950/50">
                <Plug className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              {name}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  )
}

/* ========================================================================== */
/*  BEFORE / AFTER TRANSFORMATION                                              */
/* ========================================================================== */

function BeforeAfterSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="before-after" bg="muted">
      <Container>
        <SectionHeader
          eyebrow={L(BEFORE_AFTER.eyebrow, isBn)}
          title={L(BEFORE_AFTER.title, isBn)}
          subtitle={L(BEFORE_AFTER.subtitle, isBn)}
          accent="emerald"
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {BEFORE_AFTER.pairs.map((pair, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-4"
            >
              {/* Before */}
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-900 dark:text-red-300 sm:text-base">
                  {L(pair.before, isBn)}
                </span>
              </div>
              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
              {/* After */}
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-emerald-900 dark:text-emerald-300 sm:text-base">
                  {L(pair.after, isBn)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  URGENCY BAND                                                               */
/* ========================================================================== */

function UrgencyBand({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const slots = 3
  return (
    <div className="border-y border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:border-emerald-900">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
                {L(URGENCY.badge, isBn)}
              </div>
              <div className="text-sm font-bold sm:text-base">
                {L(URGENCY.text, isBn)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-heading text-2xl font-bold">{slots}</div>
              <div className="text-[10px] uppercase text-emerald-100">{L(URGENCY.slotsLabel, isBn)}</div>
            </div>
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition-transform hover:scale-105"
            >
              <Calendar className="h-4 w-4" />
              {L(URGENCY.cta, isBn)}
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* ========================================================================== */
/*  STICKY MOBILE CTA                                                          */
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
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm lg:hidden">
      <div>
        <div className="text-sm font-bold text-emerald-600">{L(STICKY_CTA.price, isBn)}</div>
        <div className="text-xs text-muted-foreground">{L(STICKY_CTA.roi, isBn)}</div>
      </div>
      <button
        onClick={onCta}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        {L(STICKY_CTA.cta, isBn)}
      </button>
    </div>
  )
}

/* ========================================================================== */
/*  EXIT POPUP                                                                 */
/* ========================================================================== */

function ExitPopup({ isBn, onClose }: { isBn: boolean; onClose: () => void }) {
  const [email, setEmail] = React.useState('')
  const [done, setDone] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'wa_exit_popup',
          tag: 'whatsapp_automation_audit',
        }),
      })
    } catch {
      /* swallow — still show success */
    }
    setDone(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-background p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
            <Gift className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-heading text-xl font-bold">{L(EXIT_POPUP.title, isBn)}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{L(EXIT_POPUP.desc, isBn)}</p>
          {done ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
              <CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
              {L(EXIT_POPUP.success, isBn)}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <Label htmlFor="wa-exit-email" className="sr-only">
                {L(EXIT_POPUP.emailLabel, isBn)}
              </Label>
              <Input
                id="wa-exit-email"
                type="email"
                required
                placeholder={L(EXIT_POPUP.emailPlaceholder, isBn)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                <Download className="h-4 w-4" />
                {L(EXIT_POPUP.cta, isBn)}
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">{L(EXIT_POPUP.privacy, isBn)}</p>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  MAIN COMPONENT                                                             */
/* ========================================================================== */

export function WhatsAppAutomationClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const trackingMeta = React.useMemo(() => ({ slug: 'whatsapp-automation' }), [])
  usePageViewTracking('service_detail_page', trackingMeta)

  const [showExit, setShowExit] = React.useState(false)
  const [exitSeen, setExitSeen] = React.useState(false)
  const exitTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Exit-intent: trigger once via mouseleave (desktop) + 30s fallback (mobile). */
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
        <UrgencyBand isBn={isBn} onCta={scrollToLeadForm} />
        <MetricsSection isBn={isBn} />
        <ProblemSection isBn={isBn} onCta={scrollToLeadForm} />
        <EmotionalCostSection isBn={isBn} />
        <WhyTraditionalSection isBn={isBn} />
        <WhyNextgenSection isBn={isBn} />
        <HowItWorksSection isBn={isBn} />
        <FeaturesSection isBn={isBn} />
        <UseCasesSection isBn={isBn} />
        <AiAutomationSection isBn={isBn} />
        <MarketingSection isBn={isBn} />
        <CrmSection isBn={isBn} />
        <TechStackSection isBn={isBn} />
        <IntegrationsSection isBn={isBn} />
        <BenefitsSection isBn={isBn} />
        <ComparisonSection isBn={isBn} />
        <BeforeAfterSection isBn={isBn} />
        <CaseStudiesSection isBn={isBn} />
        <StatisticsSection isBn={isBn} />
        <DeliverablesSection isBn={isBn} />
        <PricingSection isBn={isBn} onCta={scrollToLeadForm} />
        <RoiCalculatorSection isBn={isBn} />
        <LeadQualCalculatorSection isBn={isBn} onCta={scrollToLeadForm} />
        <BroadcastEstimatorSection isBn={isBn} />
        <TimelineSection isBn={isBn} />
        <ProcessSection isBn={isBn} />
        <FaqSection isBn={isBn} />
        <ObjectionsSection isBn={isBn} />
        <GuaranteesSection isBn={isBn} />
        <TrustSection isBn={isBn} />
        <SecuritySection isBn={isBn} />
        <FinalCtaSection isBn={isBn} onCta={scrollToLeadForm} />
        <LeadFormSection isBn={isBn} />
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      <StickyCtaBar isBn={isBn} onCta={scrollToLeadForm} />
      {showExit && <ExitPopup isBn={isBn} onClose={() => setShowExit(false)} />}
    </div>
  )
}
