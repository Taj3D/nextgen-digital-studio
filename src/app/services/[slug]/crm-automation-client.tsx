'use client'

/**
 * CrmAutomationClient — Enterprise CRM automation landing page.
 *
 * This is a DEDICATED component rendered ONLY when slug === 'crm-automation'
 * (see page.tsx). The other 11 services still use the generic LandingClient
 * template — they are NOT affected by this file.
 *
 * Architecture:
 *  - All bilingual content lives in ./crm-automation-data.ts
 *  - Uses the site design system: shadcn/ui + Tailwind + Lucide
 *  - Bilingual via useLang() from language-provider
 *  - Reuses LandingLeadForm, WhatsAppCTA, FloatingButtons, TopBar, LandingFooter
 *  - FAQ + case studies + objections use native <details>/<summary> (no extra JS)
 *  - ROI calculator + CRM maturity + exit popup + sticky CTA use minimal useState
 *  - Emerald/teal accent (matches CRM service gradient from site-data)
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
  ShoppingBag, Trophy, Table2, Folder, Video, ClipboardCheck, Compass,
  UserX, EyeOff, ZapOff, Copy, CalendarX, FileX,
  ClipboardList, ClipboardCheck as ClipboardCheckIcon, Music, Play,
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
  WHY_NEXTGEN, HOW_IT_WORKS, CRM_FRAMEWORK, FEATURES, USE_CASES,
  AI_AUTOMATION, INTEGRATIONS, COMPARISON, BEFORE_AFTER,
  BENEFITS, BUSINESS_OUTCOMES, INDUSTRIES, CASE_STUDIES, METRICS,
  STATISTICS, DELIVERABLES, PRICING, GUARANTEES, TIMELINE, PROCESS,
  TEAM, ROI_CALCULATOR, CRM_MATURITY, FAQS, OBJECTIONS, TESTIMONIALS,
  TRUST, SECURITY, FINAL_CTA, EXIT_POPUP, STICKY_CTA, URGENCY,
  VIDEO_DEMO, RESOURCES,
  type Bilingual,
} from './crm-automation-data'

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
  tag: Tag, trophy: Trophy, table: Table2, folder: Folder,
  video: Video, 'clipboard-check': ClipboardCheck, architecture: Compass,
  'user-x': UserX, 'eye-off': EyeOff, 'zap-off': ZapOff,
  'bot-off': Bot, 'cpu-off': Cpu, 'plug-off': Plug, copy: Copy, 'calendar-x': CalendarX,
  'file-x': FileX, 'user-tie': UserCheck, 'clipboard-list': ClipboardList,
  music: Music, 'spreadsheet': Table2, 'user-lock': UserCheck,
  'maturity': Gauge, 'qualification': Filter, 'booking': Calendar,
  'payment': CreditCard, 'repeat': RefreshCw, 'sales-team': Users,
  'retention': Heart, 'abandoned-cart': ShoppingCart, 'coupon': Ticket,
  'reminder': Bell, 'reactivation': RefreshCw, 'nurturing': Sprout,
  'upsell': TrendingUp, 'cross-sell': GitBranch, 'referral': Gift,
  'broadcast': Megaphone, 'funnels': Filter, 'campaign': Calendar,
  'notifications': Bell, 'appointment': Calendar, 'lead-scoring': Star,
  'segmentation': Filter, 'quick-replies': MessageCircle,
  'buttons': MousePointerClick, 'catalog': ShoppingCart,
  'commerce': ShoppingCart, 'templates': FileText, 'flows': Workflow,
  'team-inbox': Users, 'analytics': BarChart3, 'voice-agent': Mic,
  'multilingual': Globe, 'knowledge-base': BookOpen, 'crm-sync': Database,
  'intent-detection': Target, 'auto-escalation': AlertTriangle,
  'human-handoff': Hand, 'conversation-routing': Shuffle, 'sentiment': Smile,
  'api-webhooks': Code, 'official-api': BadgeCheck, 'green-tick': BadgeCheck,
  'messaging-limits': Gauge, 'quality-rating': Star, 'commerce-api': ShoppingCart,
  'shopping-bag': ShoppingBag, 'sliders': Sliders,
}

function getIcon(name?: string): React.ElementType {
  if (!name) return FileText
  return iconMap[name] || FileText
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function L(b: Bilingual | string | undefined, isBn: boolean): string {
  if (!b) return ''
  if (typeof b === 'string') return b
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

function Section({
  id, children, className = '', bgClass = '',
}: {
  id?: string; children: React.ReactNode; className?: string; bgClass?: string
}) {
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
  eyebrow, title, subtitle, isBn, align = 'center',
}: {
  eyebrow: string; title: string; subtitle?: string; isBn: boolean; align?: 'center' | 'left'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <LandingEyebrow>{eyebrow}</LandingEyebrow>
      <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[15px] leading-relaxed text-muted-foreground ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ========================================================================== */
/*  HERO                                                                       */
/* ========================================================================== */

function HeroSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.08),transparent_50%)]" />

      <Container className="relative py-16 text-center sm:py-24">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {HERO.badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30"
            >
              {i === 0 && <Sparkles className="h-3 w-3" />}
              {L(b, isBn)}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {L(HERO.titleA, isBn)}{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            {L(HERO.titleB, isBn)}
          </span>{' '}
          {L(HERO.titleC, isBn)}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {L(HERO.subtitle, isBn)}
        </p>

        {/* Flow badge */}
        <div className="mx-auto mt-8 inline-flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
          <span className="text-base font-bold text-emerald-300 sm:text-lg">
            {L(HERO.flowBadge, isBn)}
          </span>
          <span className="text-xs text-slate-400">{L(HERO.flowSub, isBn)}</span>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 hover:scale-[1.02]"
          >
            <CalendarCheck className="h-4 w-4" />
            {L(HERO.primaryCta, isBn)}
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            <ArrowRight className="h-4 w-4" />
            {L(HERO.secondaryCta, isBn)}
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {HERO.trustBadges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>

        {/* Trust row */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400">
          {HERO.trustRow.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>

        {/* Dashboard preview mockup — hidden on mobile (video demo section has its own) */}
        <div className="mx-auto mt-14 hidden max-w-5xl sm:block">
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 mx-4 hidden sm:block">
                <div className="mx-auto max-w-md rounded-md bg-white/5 px-3 py-1 text-center text-[10px] text-slate-400">
                  crm.nextgendigital.studio/dashboard
                </div>
              </div>
              <span className="text-[10px] text-slate-500">● Live</span>
            </div>

            {/* Dashboard body */}
            <div className="grid gap-3 p-2 sm:grid-cols-4 sm:gap-4 sm:p-4">
              {/* KPI cards */}
              <div className="rounded-xl bg-white/5 p-3 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase text-emerald-300 sm:text-[10px]">New Leads</span>
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                </div>
                <div className="mt-1 text-xl font-extrabold text-white sm:text-2xl">247</div>
                <div className="text-[9px] text-emerald-400">↑ 32% vs last mo</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase text-emerald-300 sm:text-[10px]">Pipeline</span>
                  <DollarSign className="h-3 w-3 text-emerald-400" />
                </div>
                <div className="mt-1 text-xl font-extrabold text-white sm:text-2xl">৳42L</div>
                <div className="text-[9px] text-emerald-400">↑ ৳8L vs last mo</div>
              </div>
              {/* Chart */}
              <div className="rounded-xl bg-white/5 p-3 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase text-emerald-300 sm:text-[10px]">Revenue Trend</span>
                  <span className="text-[9px] text-slate-400">Last 12 months</span>
                </div>
                <div className="mt-2 flex h-16 items-end gap-1 sm:h-20 sm:gap-1.5">
                  {[28, 35, 42, 38, 52, 48, 62, 58, 70, 65, 82, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/60 to-teal-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Workflow strip */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-lg bg-white/5 p-2 sm:gap-2 sm:p-3">
              <span className="text-[9px] font-semibold text-slate-400 sm:text-[10px]">AUTO-FLOW:</span>
              {['Lead', 'Score', 'Assign', 'Follow-up', 'Book', 'Close'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 sm:text-[10px]">
                    {step}
                  </span>
                  {i < 5 && <ArrowRight className="h-2.5 w-2.5 text-slate-600" />}
                </React.Fragment>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 sm:text-[10px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Running
              </span>
            </div>
          </div>
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
    <Section bgClass="border-b border-border/60 bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(HERO_METRICS.eyebrow, isBn)}
          title={L(HERO_METRICS.title, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HERO_METRICS.stats.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm transition hover:shadow-md">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                  {L(s.label, isBn)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  PROBLEM                                                                    */
/* ========================================================================== */

function ProblemSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section id="problem">
      <Container>
        <SectionHeader
          eyebrow={L(PROBLEM.eyebrow, isBn)}
          title={L(PROBLEM.title, isBn)}
          subtitle={L(PROBLEM.subtitle, isBn)}
          isBn={isBn}
        />

        {/* Cost stats */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PROBLEM.costStats.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-center">
                <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                  {c.value}
                </div>
                <div className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {L(c.desc, isBn)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pains grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM.pains.map((p, i) => {
            const Icon = getIcon(p.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold sm:text-base">
                        {L(p.title, isBn)}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {L(p.desc, isBn)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Warning + CTA */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
          <p className="mt-3 text-base font-semibold text-amber-900 dark:text-amber-200">
            {L(PROBLEM.warning, isBn)}
          </p>
          <button
            onClick={onCta}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-amber-400"
          >
            <CalendarCheck className="h-4 w-4" />
            {L(PROBLEM.cta, isBn)}
          </button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  EMOTIONAL COST                                                             */
/* ========================================================================== */

function EmotionalCostSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(EMOTIONAL_COST.eyebrow, isBn)}
          title={L(EMOTIONAL_COST.title, isBn)}
          subtitle={L(EMOTIONAL_COST.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EMOTIONAL_COST.items.map((item, i) => {
            const Icon = getIcon(item.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <Icon className="h-7 w-7 text-violet-500" />
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(item.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(item.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Promise */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 p-8 text-center text-white shadow-xl">
            <Heart className="mx-auto h-10 w-10 text-white/90" />
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed sm:text-lg">
              {L(EMOTIONAL_COST.promise, isBn)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  WHY TRADITIONAL FAILS                                                      */
/* ========================================================================== */

function WhyTraditionalSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(WHY_TRADITIONAL_FAILS.eyebrow, isBn)}
          title={L(WHY_TRADITIONAL_FAILS.title, isBn)}
          subtitle={L(WHY_TRADITIONAL_FAILS.subtitle, isBn)}
          isBn={isBn}
        />

        {/* Failure stat */}
        <Reveal>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-center">
            <div className="text-5xl font-extrabold text-red-600 dark:text-red-400">
              {WHY_TRADITIONAL_FAILS.stat.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {L(WHY_TRADITIONAL_FAILS.stat.label, isBn)}
            </div>
          </div>
        </Reveal>

        {/* Failures grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_TRADITIONAL_FAILS.failures.map((f, i) => {
            const Icon = getIcon(f.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(f.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(f.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  WHY NEXTGEN                                                                */
/* ========================================================================== */

function WhyNextgenSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(WHY_NEXTGEN.eyebrow, isBn)}
          title={L(WHY_NEXTGEN.title, isBn)}
          subtitle={L(WHY_NEXTGEN.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_NEXTGEN.pillars.map((p, i) => {
            const Icon = getIcon(p.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-emerald-500/20 bg-background p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(p.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(p.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Proof + CTA */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-muted-foreground sm:text-base">
              {L(WHY_NEXTGEN.proof, isBn)}
            </p>
            <button
              onClick={onCta}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              <CalendarCheck className="h-4 w-4" />
              {L(WHY_NEXTGEN.cta, isBn)}
            </button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  HOW IT WORKS                                                               */
/* ========================================================================== */

function HowItWorksSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader
          eyebrow={L(HOW_IT_WORKS.eyebrow, isBn)}
          title={L(HOW_IT_WORKS.title, isBn)}
          subtitle={L(HOW_IT_WORKS.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => {
            const Icon = getIcon(step.icon)
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="absolute -top-3 left-5 rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 px-3 py-1 text-xs font-bold text-white">
                    {step.number}
                  </div>
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(step.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(step.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Promise */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-center text-white shadow-xl">
            <p className="text-sm font-semibold sm:text-base">
              {L(HOW_IT_WORKS.promise, isBn)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CRM FRAMEWORK — 12-stage lifecycle                                         */
/* ========================================================================== */

function FrameworkSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(CRM_FRAMEWORK.eyebrow, isBn)}
          title={L(CRM_FRAMEWORK.title, isBn)}
          subtitle={L(CRM_FRAMEWORK.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CRM_FRAMEWORK.stages.map((stage, i) => {
            const Icon = getIcon(stage.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 50}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {isBn ? `ধাপ ${toBnNum(stage.step)}` : `Stage ${stage.step}`}
                      </span>
                      <h3 className="font-heading text-sm font-bold">{L(stage.title, isBn)}</h3>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {L(stage.desc, isBn)}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-emerald-500/10 p-4 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {L(CRM_FRAMEWORK.promise, isBn)}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FEATURES                                                                   */
/* ========================================================================== */

function FeaturesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="features">
      <Container>
        <SectionHeader
          eyebrow={L(FEATURES.eyebrow, isBn)}
          title={L(FEATURES.title, isBn)}
          subtitle={L(FEATURES.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.groups.map((group, i) => {
            const Icon = getIcon(group.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold">{L(group.name, isBn)}</h3>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <span>{L(item, isBn)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-muted/60 p-4 text-center text-sm font-medium text-foreground">
            {L(FEATURES.total, isBn)}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  USE CASES                                                                  */
/* ========================================================================== */

function UseCasesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(USE_CASES.eyebrow, isBn)}
          title={L(USE_CASES.title, isBn)}
          subtitle={L(USE_CASES.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.audiences.map((a, i) => {
            const Icon = getIcon(a.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold">{L(a.title, isBn)}</h3>
                  </div>
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-semibold text-red-600 dark:text-red-400">
                        {isBn ? 'সমস্যা:' : 'Problem:'}
                      </div>
                      <p className="mt-1 text-muted-foreground">{L(a.problem, isBn)}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {isBn ? 'ফলাফল:' : 'Outcome:'}
                      </div>
                      <p className="mt-1 text-muted-foreground">{L(a.outcome, isBn)}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {isBn ? 'কীভাবে:' : 'How:'}
                      </div>
                      <p className="mt-1 text-muted-foreground">{L(a.how, isBn)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Not for you */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h3 className="text-center font-heading text-base font-bold text-amber-900 dark:text-amber-200">
              {L(USE_CASES.notForYou.title, isBn)}
            </h3>
            <ul className="mt-4 space-y-2">
              {USE_CASES.notForYou.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200 sm:text-sm">
                  <XCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                  <span>{L(item, isBn)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Helper: convert Latin digits to Bengali numerals                          */
/* -------------------------------------------------------------------------- */
function toBnNum(n: number | string): string {
  const map: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  }
  return String(n).replace(/[0-9]/g, (d) => map[d] || d)
}

/* ========================================================================== */
/*  AI AUTOMATION                                                              */
/* ========================================================================== */

function AiAutomationSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(AI_AUTOMATION.eyebrow, isBn)}
          title={L(AI_AUTOMATION.title, isBn)}
          subtitle={L(AI_AUTOMATION.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_AUTOMATION.features.map((f, i) => {
            const Icon = getIcon(f.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 50}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(f.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(f.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Cost comparison */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <h3 className="text-center font-heading text-base font-bold text-emerald-700 dark:text-emerald-300">
              {L(AI_AUTOMATION.costCompare.label, isBn)}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {AI_AUTOMATION.costCompare.items.map((item, i) => (
                <div key={i} className="rounded-lg bg-background p-3 text-center">
                  <div className="text-xs font-semibold">{L(item.role, isBn)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{item.cost}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-center gap-2 border-t border-emerald-500/20 pt-4 text-center">
              <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {L(AI_AUTOMATION.costCompare.total, isBn)}
              </div>
              <div className="text-xs text-muted-foreground">
                {L(AI_AUTOMATION.costCompare.vs, isBn)}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  INTEGRATIONS                                                               */
/* ========================================================================== */

function IntegrationsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(INTEGRATIONS.eyebrow, isBn)}
          title={L(INTEGRATIONS.title, isBn)}
          subtitle={L(INTEGRATIONS.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.groups.map((group, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                <h3 className="font-heading text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  {L(group.name, isBn)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item, j) => {
                    const Icon = getIcon(item.icon)
                    return (
                      <li key={j} className="flex items-center gap-2 text-xs sm:text-sm">
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <span>{item.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-emerald-500/10 p-4 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {L(INTEGRATIONS.custom, isBn)}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  COMPARISON TABLE                                                           */
/* ========================================================================== */

function ComparisonSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(COMPARISON.eyebrow, isBn)}
          title={L(COMPARISON.title, isBn)}
          subtitle={L(COMPARISON.subtitle, isBn)}
          isBn={isBn}
        />

        <Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border/60 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse bg-background">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left text-sm font-semibold">
                    {isBn ? 'মেট্রিক' : 'Metric'}
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">
                    {L(COMPARISON.headers.traditional, isBn)}
                  </th>
                  <th className="bg-emerald-600 p-4 text-left text-sm font-semibold">
                    {L(COMPARISON.headers.nextgen, isBn)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-muted/30' : 'bg-background'}>
                    <td className="border-t border-border/60 p-4 text-sm font-medium">
                      {L(row.metric, isBn)}
                    </td>
                    <td className="border-t border-border/60 p-4 text-sm text-red-600 dark:text-red-400">
                      <XCircle className="mr-1 inline h-3.5 w-3.5" />
                      {L(row.traditional, isBn)}
                    </td>
                    <td className="border-t border-border/60 bg-emerald-500/5 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                      {L(row.nextgen, isBn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-5 text-center text-white shadow-lg">
            <p className="text-sm font-semibold sm:text-base">
              {L(COMPARISON.verdict, isBn)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  BEFORE / AFTER                                                             */
/* ========================================================================== */

function BeforeAfterSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(BEFORE_AFTER.eyebrow, isBn)}
          title={L(BEFORE_AFTER.title, isBn)}
          subtitle={L(BEFORE_AFTER.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Before */}
          <Reveal>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-red-600 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                {L(BEFORE_AFTER.before.label, isBn)}
              </h3>
              <div className="mt-4 space-y-2">
                {BEFORE_AFTER.before.metrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-red-500/10 py-2 text-sm last:border-0">
                    <span className="text-muted-foreground">{L(m.label, isBn)}</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{L(m.value, isBn)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={100}>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                {L(BEFORE_AFTER.after.label, isBn)}
              </h3>
              <div className="mt-4 space-y-2">
                {BEFORE_AFTER.after.metrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-emerald-500/10 py-2 text-sm last:border-0">
                    <span className="text-muted-foreground">{L(m.label, isBn)}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{L(m.value, isBn)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-5 text-center text-white shadow-lg">
            <p className="text-sm font-semibold sm:text-base">
              {L(BEFORE_AFTER.transformation, isBn)}
            </p>
          </div>
        </Reveal>
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
          eyebrow={L(BENEFITS.eyebrow, isBn)}
          title={L(BENEFITS.title, isBn)}
          subtitle={L(BENEFITS.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.items.map((b, i) => {
            const Icon = getIcon(b.icon)
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(b.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(b.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  BUSINESS OUTCOMES                                                          */
/* ========================================================================== */

function BusinessOutcomesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(BUSINESS_OUTCOMES.eyebrow, isBn)}
          title={L(BUSINESS_OUTCOMES.title, isBn)}
          subtitle={L(BUSINESS_OUTCOMES.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESS_OUTCOMES.outcomes.map((o, i) => {
            const Icon = getIcon(o.icon)
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm">
                  <Icon className="mx-auto h-8 w-8 text-emerald-500" />
                  <div className="mt-3 bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-3xl font-extrabold text-transparent">
                    {o.metric}
                  </div>
                  <h3 className="mt-2 font-heading text-sm font-bold">{L(o.title, isBn)}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {L(o.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  INDUSTRIES                                                                 */
/* ========================================================================== */

function IndustriesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(INDUSTRIES.eyebrow, isBn)}
          title={L(INDUSTRIES.title, isBn)}
          subtitle={L(INDUSTRIES.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.items.map((ind, i) => {
            const Icon = getIcon(ind.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 50}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold">{L(ind.name, isBn)}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(ind.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CASE STUDIES                                                              */
/* ========================================================================== */

function CaseStudiesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(CASE_STUDIES.eyebrow, isBn)}
          title={L(CASE_STUDIES.title, isBn)}
          subtitle={L(CASE_STUDIES.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {CASE_STUDIES.studies.map((study, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <details className="group rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                  <div>
                    <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                      {L(study.industry, isBn)}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-bold">{L(study.company, isBn)}</h3>
                  </div>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition group-open:rotate-180" />
                </summary>

                <div className="mt-4 space-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-red-600 dark:text-red-400">
                      {isBn ? 'সমস্যা:' : 'Problem:'}
                    </div>
                    <p className="mt-1 text-muted-foreground">{L(study.problem, isBn)}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {isBn ? 'সমাধান:' : 'Solution:'}
                    </div>
                    <p className="mt-1 text-muted-foreground">{L(study.solution, isBn)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {study.results.map((r, j) => (
                      <div key={j} className="rounded-lg bg-muted/60 p-2 text-center">
                        <div className="text-[10px] text-muted-foreground">{L(r.metric, isBn)}</div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-xs">
                          <span className="text-red-500 line-through">{L(r.before, isBn)}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{L(r.after, isBn)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-3 text-center text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {L(study.roi, isBn)}
                  </div>
                  <blockquote className="border-l-2 border-emerald-500 pl-3 text-xs italic text-muted-foreground sm:text-sm">
                    "{L(study.quote, isBn)}"
                    <footer className="mt-1 not-italic font-semibold text-foreground">
                      — {L(study.author, isBn)}
                    </footer>
                  </blockquote>
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
/*  METRICS — KPIs                                                             */
/* ========================================================================== */

function MetricsKpiSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(METRICS.eyebrow, isBn)}
          title={L(METRICS.title, isBn)}
          subtitle={L(METRICS.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.items.map((m, i) => {
            const Icon = getIcon(m.icon)
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-heading text-sm font-bold">{m.metric}</h3>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="rounded bg-red-500/10 px-2 py-0.5 font-semibold text-red-600 dark:text-red-400">
                      {L(m.current, isBn)}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                      {L(m.target, isBn)}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {L(m.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
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
    <Section bgClass="bg-slate-950 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <LandingEyebrow>
            <span className="text-emerald-300">{L(STATISTICS.eyebrow, isBn)}</span>
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {L(STATISTICS.title, isBn)}
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {STATISTICS.stats.map((s, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                <div className="bg-gradient-to-br from-emerald-300 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-medium text-slate-300 sm:text-sm">
                  {L(s.label, isBn)}
                </div>
              </div>
            </Reveal>
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
          eyebrow={L(DELIVERABLES.eyebrow, isBn)}
          title={L(DELIVERABLES.title, isBn)}
          subtitle={L(DELIVERABLES.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DELIVERABLES.items.map((d, i) => {
            const Icon = getIcon(d.icon)
            return (
              <Reveal key={i} delay={(i % 5) * 50}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-4 shadow-sm">
                  <Icon className="h-7 w-7 text-emerald-500" />
                  <h3 className="mt-2 font-heading text-xs font-bold sm:text-sm">
                    {L(d.title, isBn)}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {L(d.desc, isBn)}
                  </p>
                </div>
              </Reveal>
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
  return (
    <Section id="pricing" bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(PRICING.eyebrow, isBn)}
          title={L(PRICING.title, isBn)}
          subtitle={L(PRICING.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PRICING.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border-2 p-6 shadow-sm ${
                  tier.popular
                    ? 'border-emerald-500 bg-background shadow-lg ring-2 ring-emerald-500/20'
                    : 'border-border/60 bg-background'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-1 text-xs font-bold text-white">
                    {isBn ? 'জনপ্রিয়' : 'Most Popular'}
                  </div>
                )}
                <h3 className="font-heading text-xl font-bold">{L(tier.name, isBn)}</h3>
                <div className="mt-2 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {L(tier.price, isBn)}
                </div>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {L(tier.tagline, isBn)}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                      <span>{L(f, isBn)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onCta}
                  className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-bold transition ${
                    tier.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:scale-[1.02]'
                      : 'border border-emerald-500 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400'
                  }`}
                >
                  {isBn ? 'শুরু করুন' : 'Get Started'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Value stack */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <h3 className="text-center font-heading text-base font-bold text-emerald-700 dark:text-emerald-300">
              {L(PRICING.valueStack.title, isBn)}
            </h3>
            <div className="mt-4 space-y-2">
              {PRICING.valueStack.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-emerald-500/10 py-2 text-sm last:border-0">
                  <span className="text-muted-foreground">{L(item.name, isBn)}</span>
                  <span className="font-semibold line-through">{item.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-emerald-500/20 pt-3 text-sm font-bold">
                <span className="text-emerald-700 dark:text-emerald-300">
                  {L(PRICING.valueStack.total, isBn)}
                </span>
                <span className="text-emerald-700 dark:text-emerald-300">
                  {PRICING.valueStack.totalValue}
                </span>
              </div>
              <div className="flex items-center justify-between bg-emerald-500/10 px-3 py-2 text-sm font-bold">
                <span>{L(PRICING.valueStack.yourPrice, isBn)}</span>
                <span className="text-emerald-700 dark:text-emerald-300">
                  {PRICING.valueStack.yourPriceValue}
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {L(PRICING.valueStack.saving, isBn)}
            </p>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {L(PRICING.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  GUARANTEES                                                                 */
/* ========================================================================== */

function GuaranteesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(GUARANTEES.eyebrow, isBn)}
          title={L(GUARANTEES.title, isBn)}
          subtitle={L(GUARANTEES.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.items.map((g, i) => {
            const Icon = getIcon(g.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-sm">
                  <Icon className="h-8 w-8 text-emerald-500" />
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(g.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(g.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-medium text-foreground">
            {L(GUARANTEES.bottom, isBn)}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TIMELINE                                                                   */
/* ========================================================================== */

function TimelineSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(TIMELINE.eyebrow, isBn)}
          title={L(TIMELINE.title, isBn)}
          subtitle={L(TIMELINE.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIMELINE.phases.map((phase, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                <div className="inline-block rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1 text-xs font-bold text-white">
                  {L(phase.phase, isBn)}
                </div>
                <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                  {L(phase.title, isBn)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {L(phase.desc, isBn)}
                </p>
                <ul className="mt-3 space-y-1">
                  {phase.deliverables.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-500" />
                      <span>{L(d, isBn)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
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
          eyebrow={L(PROCESS.eyebrow, isBn)}
          title={L(PROCESS.title, isBn)}
          subtitle={L(PROCESS.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.principles.map((p, i) => {
            const Icon = getIcon(p.icon)
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(p.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {L(p.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TEAM                                                                       */
/* ========================================================================== */

function TeamSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(TEAM.eyebrow, isBn)}
          title={L(TEAM.title, isBn)}
          subtitle={L(TEAM.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.members.map((m, i) => {
            const Icon = getIcon(m.icon)
            return (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm">
                  <Icon className="mx-auto h-10 w-10 text-emerald-500" />
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(m.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {L(m.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  ROI CALCULATOR                                                             */
/* ========================================================================== */

function RoiSlider({
  label, value, set, min, max, step, fmt, isBn,
}: {
  label: string; value: number; set: (v: number) => void
  min: number; max: number; step: number; fmt: (v: number) => string; isBn: boolean
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold sm:text-sm">{label}</Label>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
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
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-500"
      />
    </div>
  )
}

function fmtNum(v: number) { return v.toLocaleString() }
function fmtBDT(v: number) { return `৳${Math.round(v).toLocaleString()}` }
function fmtPct(v: number) { return `${v}%` }

function RoiCalculatorSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const s = ROI_CALCULATOR.sliders
  const [leads, setLeads] = React.useState(s.monthlyLeads.default)
  const [conv, setConv] = React.useState(s.conversionRate.default)
  const [deal, setDeal] = React.useState(s.avgDealSize.default)
  const [team, setTeam] = React.useState(s.salesTeamSize.default)
  const [hours, setHours] = React.useState(s.manualHours.default)
  const [invest, setInvest] = React.useState(s.monthlyInvestment.default)

  // Calculations
  const currentRevenue = leads * (conv / 100) * deal * 12
  const projectedRevenue = currentRevenue * 1.4 // 40% revenue lift
  const revenueIncrease = projectedRevenue - currentRevenue
  const timeSaved = hours * 52 * team * 0.7 // hours/yr across team, 70% reclaimed
  const costPerHour = 500 // BDT
  const costSaved = timeSaved * costPerHour
  const annualInvest = invest * 12
  const totalBenefit = revenueIncrease + costSaved
  const roi = annualInvest > 0 ? totalBenefit / annualInvest : 0
  const paybackDays = totalBenefit > 0 ? Math.round((annualInvest / totalBenefit) * 365) : 0

  const r = ROI_CALCULATOR.results

  return (
    <Section id="roi-calculator">
      <Container>
        <SectionHeader
          eyebrow={L(ROI_CALCULATOR.eyebrow, isBn)}
          title={L(ROI_CALCULATOR.title, isBn)}
          subtitle={L(ROI_CALCULATOR.subtitle, isBn)}
          isBn={isBn}
        />

        <Reveal>
          <div className="mt-10 grid gap-6 rounded-2xl border border-border/60 bg-background p-6 shadow-sm lg:grid-cols-2">
            {/* Sliders */}
            <div className="space-y-5">
              <RoiSlider label={L(s.monthlyLeads.label, isBn)} value={leads} set={setLeads}
                min={s.monthlyLeads.min} max={s.monthlyLeads.max} step={s.monthlyLeads.step} fmt={fmtNum} isBn={isBn} />
              <RoiSlider label={L(s.conversionRate.label, isBn)} value={conv} set={setConv}
                min={s.conversionRate.min} max={s.conversionRate.max} step={s.conversionRate.step} fmt={fmtPct} isBn={isBn} />
              <RoiSlider label={L(s.avgDealSize.label, isBn)} value={deal} set={setDeal}
                min={s.avgDealSize.min} max={s.avgDealSize.max} step={s.avgDealSize.step} fmt={fmtBDT} isBn={isBn} />
              <RoiSlider label={L(s.salesTeamSize.label, isBn)} value={team} set={setTeam}
                min={s.salesTeamSize.min} max={s.salesTeamSize.max} step={s.salesTeamSize.step} fmt={fmtNum} isBn={isBn} />
              <RoiSlider label={L(s.manualHours.label, isBn)} value={hours} set={setHours}
                min={s.manualHours.min} max={s.manualHours.max} step={s.manualHours.step} fmt={fmtNum} isBn={isBn} />
              <RoiSlider label={L(s.monthlyInvestment.label, isBn)} value={invest} set={setInvest}
                min={s.monthlyInvestment.min} max={s.monthlyInvestment.max} step={s.monthlyInvestment.step} fmt={fmtBDT} isBn={isBn} />
            </div>

            {/* Results */}
            <div className="space-y-3">
              <div className="rounded-xl bg-emerald-500/10 p-4">
                <div className="text-xs font-medium text-muted-foreground">{L(r.revenueIncrease.label, isBn)}</div>
                <div className="mt-1 bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                  {fmtBDT(revenueIncrease)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{L(r.timeSaved.label, isBn)}</div>
                  <div className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                    {fmtNum(Math.round(timeSaved))}
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{L(r.costSaved.label, isBn)}</div>
                  <div className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                    {fmtBDT(costSaved)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-4 text-white">
                  <div className="text-xs font-medium text-white/80">{L(r.roi.label, isBn)}</div>
                  <div className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    {roi.toFixed(1)}x
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{L(r.paybackDays.label, isBn)}</div>
                  <div className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                    {paybackDays > 0 ? toBnOrLatin(paybackDays, isBn) : '—'}
                  </div>
                </div>
              </div>
              <button
                onClick={onCta}
                className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                {L(ROI_CALCULATOR.cta, isBn)}
              </button>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">
          {L(ROI_CALCULATOR.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/** Returns Bengali numerals if isBn, else Latin. */
function toBnOrLatin(n: number, isBn: boolean): string {
  return isBn ? toBnNum(n) : n.toLocaleString()
}

/* ========================================================================== */
/*  CRM MATURITY ASSESSMENT                                                    */
/* ========================================================================== */

function CrmMaturitySection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [answers, setAnswers] = React.useState<number[]>(CRM_MATURITY.questions.map(() => 0))
  const [submitted, setSubmitted] = React.useState(false)

  const total = answers.reduce((sum, v) => sum + v, 0)
  const maxTotal = CRM_MATURITY.questions.length * 2
  const score = Math.round((total / maxTotal) * 100)
  const result = CRM_MATURITY.results.find((r) => score >= r.min && score <= r.max) || CRM_MATURITY.results[0]

  return (
    <Section id="maturity" bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(CRM_MATURITY.eyebrow, isBn)}
          title={L(CRM_MATURITY.title, isBn)}
          subtitle={L(CRM_MATURITY.subtitle, isBn)}
          isBn={isBn}
        />

        <Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
            <div className="space-y-4">
              {CRM_MATURITY.questions.map((q, i) => (
                <div key={i}>
                  <Label className="text-xs font-semibold sm:text-sm">
                    {isBn ? `${toBnNum(i + 1)}. ` : `${i + 1}. `}{L(q.q, isBn)}
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => {
                          setAnswers((prev) => {
                            const next = [...prev]
                            next[i] = opt.value
                            return next
                          })
                          setSubmitted(false)
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                          answers[i] === opt.value
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-border/60 bg-background text-muted-foreground hover:border-emerald-500/50'
                        }`}
                      >
                        {L(opt.label, isBn)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              {isBn ? 'স্কোর দেখুন' : 'See my score'}
            </button>

            {submitted && (
              <div className="mt-6 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-center text-white">
                <div className="text-5xl font-extrabold">
                  {isBn ? toBnNum(score) : score}
                  <span className="text-2xl font-semibold text-white/70">/100</span>
                </div>
                <div className="mt-2 text-base font-bold">{L(result.label, isBn)}</div>
                <p className="mx-auto mt-2 max-w-md text-xs text-white/90 sm:text-sm">
                  {L(result.desc, isBn)}
                </p>
                <button
                  onClick={onCta}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]"
                >
                  <CalendarCheck className="h-4 w-4" />
                  {L(result.cta, isBn)}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FAQ                                                                        */
/* ========================================================================== */

function FaqSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="faq">
      <Container>
        <SectionHeader
          eyebrow={L(FAQS.eyebrow, isBn)}
          title={L(FAQS.title, isBn)}
          subtitle={L(FAQS.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {FAQS.groups.map((group, gi) => (
            <Reveal key={gi} delay={gi * 60}>
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-bold text-emerald-700 dark:text-emerald-300">
                  <HelpCircle className="h-4 w-4" />
                  {L(group.name, isBn)}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <details key={i} className="group rounded-xl border border-border/60 bg-background">
                      <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-sm font-semibold list-none">
                        <span>{L(item.q, isBn)}</span>
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {L(item.a, isBn)}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  OBJECTIONS                                                                 */
/* ========================================================================== */

function ObjectionsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(OBJECTIONS.eyebrow, isBn)}
          title={L(OBJECTIONS.title, isBn)}
          subtitle={L(OBJECTIONS.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIONS.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 50}>
              <div className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <h3 className="font-heading text-xs font-bold text-amber-900 dark:text-amber-200 sm:text-sm">
                    {L(item.objection, isBn)}
                  </h3>
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {L(item.answer, isBn)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TESTIMONIALS                                                               */
/* ========================================================================== */

function TestimonialsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(TESTIMONIALS.eyebrow, isBn)}
          title={L(TESTIMONIALS.title, isBn)}
          subtitle={L(TESTIMONIALS.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.items.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-xs leading-relaxed text-foreground sm:text-sm">
                  "{L(t.quote, isBn)}"
                </blockquote>
                <div className="mt-4 border-t border-border/60 pt-3">
                  <div className="text-sm font-bold">{L(t.author, isBn)}</div>
                  <div className="text-xs text-muted-foreground">{L(t.role, isBn)}</div>
                  <div className="mt-1 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                    {L(t.industry, isBn)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TRUST                                                                      */
/* ========================================================================== */

function TrustSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(TRUST.eyebrow, isBn)}
          title={L(TRUST.title, isBn)}
          subtitle={L(TRUST.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST.stats.map((s, i) => (
            <Reveal key={i} delay={(i % 6) * 50}>
              <div className="rounded-2xl border border-border/60 bg-background p-4 text-center shadow-sm">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
                  {L(s.label, isBn)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
            <div className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {isBn ? 'পার্টনার ও সার্টিফিকেশন' : 'Partners & Certifications'}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {TRUST.partners.map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {L(p, isBn)}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  SECURITY                                                                   */
/* ========================================================================== */

function SecuritySection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={L(SECURITY.eyebrow, isBn)}
          title={L(SECURITY.title, isBn)}
          subtitle={L(SECURITY.subtitle, isBn)}
          isBn={isBn}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-bold sm:text-base">
                    {L(c.title, isBn)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {L(c.desc, isBn)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  VIDEO DEMO                                                                 */
/* ========================================================================== */

function VideoDemoSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [playing, setPlaying] = React.useState(false)
  return (
    <Section id="video-demo" bgClass="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(VIDEO_DEMO.eyebrow, isBn)}
          title={L(VIDEO_DEMO.title, isBn)}
          subtitle={L(VIDEO_DEMO.subtitle, isBn)}
          isBn={isBn}
        />

        <Reveal>
          <div className="mx-auto mt-10 max-w-4xl">
            {/* Video player frame */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-slate-950 shadow-2xl">
              {/* Dashboard mockup as poster */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.85),rgba(13,148,136,0.25))]" />

              {/* Mock dashboard UI */}
              <div className="absolute inset-0 flex flex-col p-6 text-left text-white sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-medium text-white/60 sm:text-xs">
                    crm.nextgendigital.studio
                  </span>
                </div>

                <div className="mt-6 grid flex-1 grid-cols-3 gap-3 sm:gap-4">
                  <div className="col-span-1 space-y-2">
                    <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur-sm sm:p-3">
                      <div className="text-[9px] font-semibold text-emerald-300 sm:text-[10px]">NEW LEADS</div>
                      <div className="mt-1 text-base font-extrabold sm:text-2xl">247</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur-sm sm:p-3">
                      <div className="text-[9px] font-semibold text-emerald-300 sm:text-[10px]">PIPELINE</div>
                      <div className="mt-1 text-base font-extrabold sm:text-2xl">৳42L</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur-sm sm:p-3">
                      <div className="text-[9px] font-semibold text-emerald-300 sm:text-[10px]">WIN RATE</div>
                      <div className="mt-1 text-base font-extrabold sm:text-2xl">34%</div>
                    </div>
                  </div>
                  <div className="col-span-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                    <div className="text-[9px] font-semibold text-white/70 sm:text-[10px]">REVENUE TREND</div>
                    <div className="mt-2 flex h-20 items-end gap-1 sm:h-28 sm:gap-1.5">
                      {[35, 48, 42, 60, 55, 72, 68, 85, 78, 92, 88, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-teal-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              {!playing && (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/30"
                  aria-label={L(VIDEO_DEMO.playLabel, isBn)}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-2xl transition hover:scale-110 sm:h-20 sm:w-20">
                    <Play className="h-7 w-7 fill-white text-white sm:h-9 sm:w-9" />
                  </div>
                </button>
              )}

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white sm:bottom-4 sm:right-4 sm:text-xs">
                {L(VIDEO_DEMO.duration, isBn)}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {VIDEO_DEMO.stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-border/60 bg-background p-4 text-center">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {L(s.label, isBn)}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights timeline */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-background p-5 sm:p-6">
              <h3 className="text-sm font-bold text-foreground sm:text-base">
                {isBn ? 'ভিডিওতে যা দেখবেন' : 'What you will see in the video'}
              </h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {VIDEO_DEMO.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/40 p-2.5">
                    <span className="flex-shrink-0 rounded-md bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 sm:text-xs">
                      {h.time}
                    </span>
                    <span className="text-xs font-medium text-foreground sm:text-sm">
                      {L(h.label, isBn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <button
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                <CalendarCheck className="h-4 w-4" />
                {L(VIDEO_DEMO.cta, isBn)}
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  RESOURCE CENTER                                                            */
/* ========================================================================== */

function ResourcesSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  return (
    <Section id="resources" bgClass="border-t border-border/60 bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow={L(RESOURCES.eyebrow, isBn)}
          title={L(RESOURCES.title, isBn)}
          subtitle={L(RESOURCES.subtitle, isBn)}
          isBn={isBn}
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
          {RESOURCES.items.map((item, i) => {
            const Icon = iconMap[item.icon] || FileText
            return (
              <Reveal key={i} delay={i * 60}>
                <a
                  href={item.href}
                  className={`group flex h-full flex-col rounded-2xl border bg-background p-6 shadow-sm transition hover:shadow-md ${
                    item.featured
                      ? 'border-emerald-500/50 ring-1 ring-emerald-500/20'
                      : 'border-border/60 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                      item.featured
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">
                          {L(item.title, isBn)}
                        </h3>
                        {item.featured && (
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                            {isBn ? 'জনপ্রিয়' : 'Popular'}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {L(item.desc, isBn)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                        {L(item.type, isBn)}
                      </span>
                      <span className={`text-[10px] font-bold sm:text-xs ${
                        item.price.en === 'Free'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        {L(item.price, isBn)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 transition group-hover:gap-2 dark:text-emerald-300">
                      <Download className="h-3.5 w-3.5" />
                      {isBn ? 'ডাউনলোড' : 'Download'}
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:gap-3 dark:text-emerald-300"
          >
            {L(RESOURCES.cta, isBn)}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FINAL CTA                                                                  */
/* ========================================================================== */

function FinalCtaSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn ? 'আসসালামু আলাইকুম, আমি CRM অটোমেশন সেবা নিয়ে জানতে চাই।' : "Hi, I'd like to know more about CRM Automation.",
  )}`

  return (
    <Section id="cta" className="bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            {L(FINAL_CTA.eyebrow, isBn)}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {L(FINAL_CTA.title, isBn)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-emerald-50 sm:text-base">
            {L(FINAL_CTA.subtitle, isBn)}
          </p>

          {/* Transformation */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
            <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <div className="text-left">
                <div className="text-xs font-semibold text-red-200">{isBn ? 'আজ' : 'Today'}</div>
                <p className="mt-1 text-xs text-white/90">{L(FINAL_CTA.transformation.before, isBn)}</p>
              </div>
              <div className="flex flex-col items-center">
                <ArrowRight className="hidden h-5 w-5 text-white/70 sm:block" />
                <span className="text-[10px] font-semibold uppercase text-white/70">
                  {L(FINAL_CTA.transformation.arrow, isBn)}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs font-semibold text-emerald-100">{isBn ? '৩০ দিন পর' : 'In 30 days'}</div>
                <p className="mt-1 text-xs text-white/90">{L(FINAL_CTA.transformation.after, isBn)}</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition hover:scale-[1.02]"
            >
              <CalendarCheck className="h-4 w-4" />
              {L(FINAL_CTA.primaryCta, isBn)}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/30 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-emerald-500/40"
            >
              <MessageCircle className="h-4 w-4" />
              {L(FINAL_CTA.secondaryCta, isBn)}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/30 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-emerald-500/40"
            >
              <Mail className="h-4 w-4" />
              {L(FINAL_CTA.tertiaryCta, isBn)}
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-50">
            {FINAL_CTA.trustRow.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {L(t, isBn)}
              </span>
            ))}
          </div>
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
    <Section id="order" bgClass="bg-muted/30">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <LandingEyebrow>
              {isBn ? 'ফ্রি স্ট্র্যাটেজি কল রিকোয়েস্ট' : 'Request Free Strategy Call'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'আপনার ফ্রি CRM ব্লুপ্রিন্ট পান' : 'Get your free CRM blueprint'}
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
              source="service_crm-automation"
              serviceName={isBn ? 'CRM অটোমেশন' : 'CRM Automation'}
              submitLabel={isBn ? 'ফ্রি কল রিকোয়েস্ট পাঠান' : 'Send Request'}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  QUICK NAV — sticky pill bar for jumping to key sections                    */
/* ========================================================================== */

function QuickNav({ isBn }: { isBn: boolean }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#video-demo', label: isBn ? 'ডেমো' : 'Demo' },
    { href: '#framework', label: isBn ? 'ফ্রেমওয়ার্ক' : 'Framework' },
    { href: '#pricing', label: isBn ? 'প্রাইসিং' : 'Pricing' },
    { href: '#roi-calculator', label: isBn ? 'ROI' : 'ROI' },
    { href: '#maturity', label: isBn ? 'অ্যাসেসমেন্ট' : 'Assessment' },
    { href: '#faq', label: isBn ? 'প্রশ্ন' : 'FAQ' },
    { href: '#order', label: isBn ? 'বুক করুন' : 'Book' },
  ]

  if (!visible) return null

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed left-1/2 top-16 z-30 -translate-x-1/2 px-2 sm:top-20">
      <nav
        className="flex max-w-[95vw] items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-background/95 p-1.5 shadow-lg backdrop-blur-sm"
        aria-label={isBn ? 'দ্রুত নেভিগেশন' : 'Quick navigation'}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={scrollTo(l.href)}
            className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

/* ========================================================================== */
/*  URGENCY BAND                                                               */
/* ========================================================================== */

function UrgencyBand({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || !URGENCY.enabled) return null

  return (
    <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 px-4">
      <div className="flex items-center gap-3 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-lg sm:text-sm">
        <Clock className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{L(URGENCY.message, isBn)}</span>
        <span className="sm:hidden">{isBn ? '৩ স্লট বাকি!' : '3 slots left!'}</span>
        <button
          onClick={onCta}
          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-600 transition hover:scale-105"
        >
          {L(URGENCY.cta, isBn)}
        </button>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  STICKY CTA BAR (mobile only)                                               */
/* ========================================================================== */

function StickyCtaBar({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  if (!STICKY_CTA.enabled) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {L(STICKY_CTA.price, isBn)}
          </div>
          <div className="text-[10px] text-muted-foreground">{L(STICKY_CTA.sub, isBn)}</div>
        </div>
        <button
          onClick={onCta}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          {L(STICKY_CTA.cta, isBn)}
        </button>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  EXIT POPUP                                                                 */
/* ========================================================================== */

function ExitPopup({ isBn, onClose, onCta }: { isBn: boolean; onClose: () => void; onCta: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
            <Gift className="h-7 w-7" />
          </div>
          <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            {L(EXIT_POPUP.eyebrow, isBn)}
          </span>
          <h3 className="mt-2 font-heading text-xl font-bold sm:text-2xl">
            {L(EXIT_POPUP.title, isBn)}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {L(EXIT_POPUP.subtitle, isBn)}
          </p>
          <button
            onClick={() => {
              onClose()
              onCta()
            }}
            className="mt-5 w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            {L(EXIT_POPUP.cta, isBn)}
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            {L(EXIT_POPUP.noThanks, isBn)}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  MAIN COMPONENT                                                             */
/* ========================================================================== */

export function CrmAutomationClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const trackingMeta = React.useMemo(() => ({ slug: 'crm-automation' }), [])
  usePageViewTracking('service_detail_page', trackingMeta)

  // Reading progress bar — fills as user scrolls through the page
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lead form scroll target
  const scrollToLeadForm = React.useCallback(() => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('order')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  // Exit popup logic: trigger on mouseleave (only after mouse has entered + 7s
  // dwell) OR after EXIT_POPUP.delayMs (30s fallback). The dwell gate prevents
  // the popup firing on page load when the mouse starts outside the viewport.
  const [showExit, setShowExit] = React.useState(false)
  React.useEffect(() => {
    if (!EXIT_POPUP.enabled) return
    let shown = false
    let armed = false
    let entered = false
    const trigger = () => {
      if (!shown && armed) {
        shown = true
        setShowExit(true)
      }
    }
    const onMouseEnter = () => {
      entered = true
    }
    const onMouseLeave = (e: MouseEvent) => {
      // Only fire if the mouse has previously entered the viewport AND the
      // arm timer has elapsed. This prevents immediate firing on load.
      if (e.clientY < 0 && entered && armed) trigger()
    }
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    // Arm after 7s dwell so popup doesn't fire during initial scroll
    const armTimer = setTimeout(() => { armed = true }, 7000)
    // Fallback: show after 30s regardless
    const fallbackTimer = setTimeout(trigger, EXIT_POPUP.delayMs)
    return () => {
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(armTimer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Reading progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <TopBar />

      {/* Quick navigation — appears after scrolling past hero */}
      <QuickNav isBn={isBn} />

      <main className="flex-1">
        <HeroSection isBn={isBn} onCta={scrollToLeadForm} />
        <MetricsSection isBn={isBn} />
        <VideoDemoSection isBn={isBn} onCta={scrollToLeadForm} />
        <ProblemSection isBn={isBn} onCta={scrollToLeadForm} />
        <EmotionalCostSection isBn={isBn} />
        <WhyTraditionalSection isBn={isBn} />
        <WhyNextgenSection isBn={isBn} onCta={scrollToLeadForm} />
        <HowItWorksSection isBn={isBn} />
        <FrameworkSection isBn={isBn} />
        <FeaturesSection isBn={isBn} />
        <UseCasesSection isBn={isBn} />
        <AiAutomationSection isBn={isBn} />
        <IntegrationsSection isBn={isBn} />
        <ComparisonSection isBn={isBn} />
        <BeforeAfterSection isBn={isBn} />
        <BenefitsSection isBn={isBn} />
        <BusinessOutcomesSection isBn={isBn} />
        <IndustriesSection isBn={isBn} />
        <CaseStudiesSection isBn={isBn} />
        <MetricsKpiSection isBn={isBn} />
        <StatisticsSection isBn={isBn} />
        <DeliverablesSection isBn={isBn} />
        <PricingSection isBn={isBn} onCta={scrollToLeadForm} />
        <GuaranteesSection isBn={isBn} />
        <TimelineSection isBn={isBn} />
        <ProcessSection isBn={isBn} />
        <TeamSection isBn={isBn} />
        <RoiCalculatorSection isBn={isBn} onCta={scrollToLeadForm} />
        <CrmMaturitySection isBn={isBn} onCta={scrollToLeadForm} />
        <FaqSection isBn={isBn} />
        <ObjectionsSection isBn={isBn} />
        <TestimonialsSection isBn={isBn} />
        <TrustSection isBn={isBn} />
        <SecuritySection isBn={isBn} />
        <ResourcesSection isBn={isBn} onCta={scrollToLeadForm} />
        <FinalCtaSection isBn={isBn} onCta={scrollToLeadForm} />
        <LeadFormSection isBn={isBn} />
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />

      {/* Conversion optimization overlays */}
      <UrgencyBand isBn={isBn} onCta={scrollToLeadForm} />
      <StickyCtaBar isBn={isBn} onCta={scrollToLeadForm} />
      {showExit && (
        <ExitPopup isBn={isBn} onClose={() => setShowExit(false)} onCta={scrollToLeadForm} />
      )}

      {/* Bottom padding so sticky CTA does not cover footer content on mobile */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </div>
  )
}
