'use client'

/**
 * AiVoiceAgentClient — Enterprise AI Voice Agent landing page.
 *
 * This is a DEDICATED component rendered ONLY when slug === 'ai-voice-agent'
 * (see page.tsx). The other 11 services still use the generic LandingClient
 * template or their own dedicated page — they are NOT affected by this file.
 *
 * Architecture:
 *  - All bilingual content lives in ./ai-voice-agent-data.ts
 *  - Uses the site design system: shadcn/ui + Tailwind + Lucide
 *  - Bilingual via useLang() from language-provider
 *  - Reuses LandingLeadForm, WhatsAppCTA, FloatingButtons, TopBar, LandingFooter
 *  - FAQ + case studies + objections use native <details>/<summary> (no extra JS)
 *  - ROI calculator + exit popup + sticky CTA use minimal useState
 *  - Voice blue/indigo accent via Tailwind blue palette
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
  ShoppingBag, Trophy, PlayCircle, PhoneIncoming, PhoneOutgoing, PhoneMissed,
  PhoneForwarded, Languages, Volume2, AudioLines, Waves, ScanFace, Ear,
  Hotel,
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
  HERO, HERO_METRICS, TRUSTED_BY, PROBLEM, EMOTIONAL_COST, WHY_TRADITIONAL_FAILS,
  WHY_NEXTGEN, VOICE_AGENT_FRAMEWORK, HOW_IT_WORKS, CONVERSATION_EXAMPLE,
  USE_CASES, FEATURES, VOICE_AI_CAPABILITIES, INTEGRATIONS, INDUSTRY_SOLUTIONS,
  COMPARISON, COMPETITOR_COMPARISON, BEFORE_AFTER, AI_VS_HUMAN_DEMO, ROI_CALCULATOR, CALL_FLOW,
  AUTOMATION_WORKFLOWS, DASHBOARD_PREVIEW, CASE_STUDIES, TESTIMONIALS,
  STATISTICS, DELIVERABLES, PRICING, GUARANTEES, FAQS, OBJECTIONS,
  SECURITY, DEVELOPER_SECTION, KNOWLEDGE_BASE, TIMELINE, PROCESS, TRUST,
  FINAL_CTA, EXIT_POPUP, STICKY_CTA, URGENCY,
  type Bilingual,
} from './ai-voice-agent-data'

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
  hotel: Hotel, 'play-circle': PlayCircle,
  'phone-incoming': PhoneIncoming, 'phone-outgoing': PhoneOutgoing,
  'phone-missed': PhoneMissed, 'phone-forwarded': PhoneForwarded,
  'languages': Languages, 'volume': Volume2, 'audio-lines': AudioLines,
  'waves': Waves, 'scan-face': ScanFace, 'ear': Ear,
  'voice-biometrics': ScanFace, 'noise-reduction': Volume2,
  'speech-recognition': Mic, 'nlu': Brain, 'context-memory': Database,
  'emotion-detection': Smile, 'silence-detection': Clock,
  'voicemail-detection': PhoneMissed, 'voice-cloning': Mic,
  'call-recording': Mic, 'transcription': FileText, 'ai-summary': FileText,
  'ai-notes': FileText, 'smart-routing': Shuffle, 'custom-voice': Mic,
  'real-time-analytics': BarChart3, 'rest-api': Code, 'webhooks': Plug,
  'sms-followup': MessageCircle, 'whatsapp-handoff': MessageCircle,
  'email-summary': Mail, 'multi-call': Zap, 'uptime': Clock,
  'inbound-sales': PhoneIncoming, 'outbound-sales': PhoneOutgoing,
  'appointment-booking': CalendarCheck, 'customer-support': Headset,
  'lead-qualification': Filter, 'payment-reminder': CreditCard,
  'collections': RefreshCw, 'order-confirmation': Package,
  'healthcare': Heart, 'clinic': Hospital, 'education': GraduationCap,
  'insurance': Shield, 'real-estate': Home, 'manufacturing': Factory,
  'recruitment': Briefcase, 'emergency-hotline': AlertTriangle,
  'internal-helpdesk': Headset, 'membership-renewal': RefreshCw,
  'restaurant': Utensils, 'travel': Plane, 'law-firm': Gavel, 'agency': Briefcase,
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

/** Section wrapper with voice-blue accent option. */
function Section({
  id, children, className = '', bg = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
  bg?: 'muted' | 'dark' | 'voice' | 'gradient' | ''
}) {
  const bgClass =
    bg === 'muted' ? 'bg-muted/30' :
    bg === 'dark' ? 'bg-slate-950 text-white' :
    bg === 'voice' ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' :
    bg === 'gradient' ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' :
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
    : 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300'
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
        <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-blue-50' : 'text-muted-foreground'}`}>
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
      {/* Voice-blue radial glow */}
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <Container className="relative py-16 text-center sm:py-24">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            <PhoneCall className="h-3 w-3" /> {L(HERO.eyebrow, isBn)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
            {isBn ? '৬০-দিন ROI গ্যারান্টি' : '60-day ROI guarantee'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
            {isBn ? 'বাংলা + ইংরেজি' : 'Bangla + English'}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
          <div className="text-xl font-bold text-blue-400 sm:text-2xl">
            {L(HERO.roiBadge, isBn)}
          </div>
          <div className="mt-1 text-sm text-slate-400">
            {L(HERO.roiSub, isBn)}
          </div>
        </div>

        {/* Voice Agent Illustration — animated waveform */}
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/40">
            {/* Pulsing rings */}
            <span className="absolute inset-0 animate-ping rounded-full bg-blue-400/30" style={{ animationDuration: '3s' }} />
            <span className="absolute -inset-2 animate-ping rounded-full bg-blue-400/20" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            <PhoneCall className="relative h-10 w-10 text-white" />
          </div>
          {/* Animated waveform bars */}
          <div className="mt-6 flex h-12 items-center justify-center gap-1">
            {[0.2, 0.5, 0.8, 0.4, 1, 0.6, 0.3, 0.9, 0.5, 0.7, 0.4, 0.8, 0.3, 0.6, 0.5].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-indigo-400"
                style={{
                  height: `${h * 100}%`,
                  animation: `voiceWave 1.2s ease-in-out ${i * 0.08}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs font-medium text-slate-400">
            {isBn ? '🔴 লাইভ — AI এখন কথা বলছে' : '🔴 LIVE — AI is speaking now'}
          </div>
        </div>
        <style jsx>{`
          @keyframes voiceWave {
            0% { transform: scaleY(0.3); opacity: 0.6; }
            100% { transform: scaleY(1); opacity: 1; }
          }
        `}</style>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-[1.02] hover:bg-blue-700"
          >
            <PhoneCall className="h-5 w-5" />
            {L(HERO.primaryCta, isBn)}
          </button>
          <a
            href="#conversation-example"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            <PlayCircle className="h-5 w-5" />
            {L(HERO.secondaryCta, isBn)}
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          {HERO.trustBadges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              {L(b, isBn)}
            </span>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-slate-400">
          {HERO.trustRow.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
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
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {L(HERO_METRICS.title, isBn)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {L(HERO_METRICS.eyebrow, isBn)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {HERO_METRICS.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-blue-600 sm:text-4xl">
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
/*  TRUSTED BY (partner / infrastructure logos)                                */
/* ========================================================================== */

function TrustedBySection({ isBn }: { isBn: boolean }) {
  return (
    <div className="border-y border-border/60 bg-background">
      <Container>
        <p className="py-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {L(TRUSTED_BY.eyebrow, isBn)}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-8 sm:gap-x-12">
          {TRUSTED_BY.logos.map((logo, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center"
              title={isBn ? logo.note.bn : logo.note.en}
            >
              <div className="text-lg font-bold tracking-tight text-muted-foreground transition-colors group-hover:text-blue-600 sm:text-xl">
                {logo.name}
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground/70">
                {isBn ? logo.note.bn : logo.note.en}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/* ========================================================================== */
/*  CUSTOMER PROBLEMS                                                          */
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
          accent="blue"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Pains list */}
          <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
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
                <div className="text-3xl font-extrabold text-blue-600 sm:text-4xl">
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
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700"
          >
            <PhoneCall className="h-4 w-4" />
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
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={EMOTIONAL_COST.eyebrow}
          title={EMOTIONAL_COST.title}
          subtitle={EMOTIONAL_COST.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EMOTIONAL_COST.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <Icon className="mb-3 h-10 w-10 text-blue-600" />
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
/*  WHY TRADITIONAL CALL HANDLING FAILS                                        */
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
          accent="blue"
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
/*  WHY NEXTGEN AI VOICE AGENT                                                 */
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
          accent="blue"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_NEXTGEN.cards.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
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
/*  VOICE AGENT FRAMEWORK (13-step pipeline)                                   */
/* ========================================================================== */

function FrameworkSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={VOICE_AGENT_FRAMEWORK.eyebrow}
          title={VOICE_AGENT_FRAMEWORK.title}
          subtitle={VOICE_AGENT_FRAMEWORK.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {VOICE_AGENT_FRAMEWORK.steps.map((s, i) => {
            const Icon = getIcon(s.icon)
            return (
              <Reveal key={i} delay={i * 30}>
                <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">{i + 1}</span>
                      <h3 className="font-heading text-base font-bold">{L(s.label, isBn)}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{L(s.desc, isBn)}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-8 text-center text-sm font-semibold text-blue-600">
          {L(VOICE_AGENT_FRAMEWORK.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  HOW IT WORKS (12 visual steps)                                            */
/* ========================================================================== */

function HowItWorksSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={HOW_IT_WORKS.eyebrow}
          title={HOW_IT_WORKS.title}
          subtitle={HOW_IT_WORKS.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {HOW_IT_WORKS.steps.map((s, i) => {
              const Icon = getIcon(s.icon)
              return (
                <div key={i} className="flex flex-col items-center rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 text-center dark:border-blue-900/40 dark:bg-blue-950/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-xs font-semibold sm:text-sm">{L(s.label, isBn)}</div>
                  <div className="mt-1 text-[10px] font-bold text-blue-600">#{i + 1}</div>
                </div>
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
/*  CONVERSATION EXAMPLE (chat bubbles)                                        */
/* ========================================================================== */

function ConversationExampleSection({ isBn }: { isBn: boolean }) {
  const [playing, setPlaying] = React.useState(false)
  const [activeLine, setActiveLine] = React.useState(-1)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const playConversation = () => {
    if (playing) {
      setPlaying(false)
      setActiveLine(-1)
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    setPlaying(true)
    setActiveLine(0)
    let idx = 0
    timerRef.current = setInterval(() => {
      idx += 1
      if (idx >= CONVERSATION_EXAMPLE.lines.length) {
        setPlaying(false)
        setActiveLine(-1)
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        setActiveLine(idx)
      }
    }, 2200)
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <Section id="conversation-example">
      <Container>
        <SectionHeader
          badge={CONVERSATION_EXAMPLE.eyebrow}
          title={CONVERSATION_EXAMPLE.title}
          subtitle={CONVERSATION_EXAMPLE.subtitle}
          isBn={isBn}
          accent="blue"
        />
        {/* Play control */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={playConversation}
            className="inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-105 hover:bg-blue-700"
            aria-label={playing ? (isBn ? 'বিরতি দিন' : 'Pause') : (isBn ? 'কথোপকথন চালান' : 'Play conversation')}
          >
            {playing ? (
              <>
                <span className="flex h-2 w-2 items-center justify-center">
                  <span className="block h-3 w-1 bg-white" style={{ marginRight: 2 }} />
                  <span className="block h-3 w-1 bg-white" />
                </span>
                {isBn ? 'বিরতি দিন' : 'Pause'}
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5" />
                {isBn ? 'কথোপকথন চালান' : 'Play conversation'}
              </>
            )}
          </button>
        </div>
        <div className="mx-auto mt-8 max-w-2xl space-y-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          {CONVERSATION_EXAMPLE.lines.map((line, i) => {
            const isAi = line.speaker === 'ai'
            const isActive = i === activeLine
            return (
              <div
                key={i}
                className={`flex transition-all ${isAi ? 'justify-start' : 'justify-end'} ${
                  activeLine >= 0 && !isActive ? 'opacity-40' : 'opacity-100'
                } ${isActive ? 'scale-[1.02]' : 'scale-100'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    isAi
                      ? 'rounded-tl-sm bg-blue-50 border-l-4 border-blue-500 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100'
                      : 'rounded-tr-sm bg-muted text-foreground'
                  } ${isActive ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                >
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-bold opacity-70">
                    {isAi ? (
                      <>
                        <Bot className="h-3.5 w-3.5" />
                        {isBn ? 'AI Voice Agent' : 'AI Voice Agent'}
                        {isActive && (
                          <span className="ml-1 flex items-center gap-0.5">
                            {[0, 1, 2].map((b) => (
                              <span
                                key={b}
                                className="block w-0.5 rounded-full bg-blue-500"
                                style={{
                                  height: '10px',
                                  animation: `voiceWave 0.8s ease-in-out ${b * 0.15}s infinite alternate`,
                                }}
                              />
                            ))}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <Users className="h-3.5 w-3.5" />
                        {isBn ? 'গ্রাহক' : 'Customer'}
                      </>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed sm:text-[15px]">
                    {L(line.text, isBn)}
                  </p>
                </div>
              </div>
            )
          })}
          <style jsx>{`
            @keyframes voiceWave {
              0% { transform: scaleY(0.4); opacity: 0.6; }
              100% { transform: scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  USE CASES (20)                                                             */
/* ========================================================================== */

function UseCasesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={USE_CASES.eyebrow}
          title={USE_CASES.title}
          subtitle={USE_CASES.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.items.map((u, i) => {
            const Icon = getIcon(u.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(u.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(u.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  FEATURES (30)                                                              */
/* ========================================================================== */

function FeaturesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section id="features">
      <Container>
        <SectionHeader
          badge={FEATURES.eyebrow}
          title={FEATURES.title}
          subtitle={FEATURES.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.items.map((f, i) => {
            const Icon = getIcon(f.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(f.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(f.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  VOICE AI CAPABILITIES (10)                                                 */
/* ========================================================================== */

function VoiceCapabilitiesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="dark">
      <Container>
        <SectionHeader
          badge={VOICE_AI_CAPABILITIES.eyebrow}
          title={VOICE_AI_CAPABILITIES.title}
          subtitle={VOICE_AI_CAPABILITIES.subtitle}
          isBn={isBn}
          light
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VOICE_AI_CAPABILITIES.items.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-white">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-xs text-slate-400">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  INTEGRATIONS                                                               */
/* ========================================================================== */

function IntegrationsSection({ isBn }: { isBn: boolean }) {
  const items = INTEGRATIONS.items
  const loop = [...items, ...items]
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={INTEGRATIONS.eyebrow}
          title={INTEGRATIONS.title}
          subtitle={INTEGRATIONS.subtitle}
          isBn={isBn}
          accent="blue"
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
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950/50">
                <Plug className="h-3.5 w-3.5 text-blue-600" />
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
/*  INDUSTRY SOLUTIONS (12)                                                    */
/* ========================================================================== */

function IndustrySolutionsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={INDUSTRY_SOLUTIONS.eyebrow}
          title={INDUSTRY_SOLUTIONS.title}
          subtitle={INDUSTRY_SOLUTIONS.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_SOLUTIONS.items.map((s, i) => {
            const Icon = getIcon(s.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold">{L(s.industry, isBn)}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-red-600">{isBn ? 'সমস্যা: ' : 'Pain: '}</span>
                    <span className="text-muted-foreground">{L(s.pain, isBn)}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">{isBn ? 'সমাধান: ' : 'Solution: '}</span>
                    <span className="text-muted-foreground">{L(s.solution, isBn)}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-emerald-600">{isBn ? 'ফলাফল: ' : 'Outcome: '}</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">{L(s.outcome, isBn)}</span>
                  </p>
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
/*  COMPARISON TABLE (22 rows)                                                 */
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
          accent="blue"
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
            <thead>
              <tr className="bg-slate-900 text-left text-white">
                <th className="p-4 text-sm font-semibold">{L(COMPARISON.headers[0], isBn)}</th>
                <th className="p-4 text-sm font-semibold">{L(COMPARISON.headers[1], isBn)}</th>
                <th className="bg-blue-600 p-4 text-sm font-semibold">{isBn ? 'AI Voice Agent' : 'AI Voice Agent'}</th>
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
                  <td className="bg-blue-50/60 p-4 text-sm font-medium dark:bg-blue-950/20">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      {L(r.ai, isBn)}
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
/*  COMPETITOR COMPARISON (NextGen vs Air.ai / Vapi / Bland / Retell)          */
/* ========================================================================== */

function CompetitorComparisonSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={COMPETITOR_COMPARISON.eyebrow}
          title={COMPETITOR_COMPARISON.title}
          subtitle={COMPETITOR_COMPARISON.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
            <thead>
              <tr className="bg-slate-900 text-left text-white">
                {COMPETITOR_COMPARISON.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`p-3 text-xs font-semibold sm:p-4 sm:text-sm ${
                      i === 1 ? 'bg-blue-600' : ''
                    }`}
                  >
                    {L(h, isBn)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITOR_COMPARISON.rows.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="p-3 text-xs font-medium sm:p-4 sm:text-sm">{L(r.feature, isBn)}</td>
                  {r.values.map((v, j) => (
                    <td
                      key={j}
                      className={`p-3 text-xs sm:p-4 sm:text-sm ${
                        j === 0
                          ? 'bg-blue-50/60 font-bold text-blue-900 dark:bg-blue-950/30 dark:text-blue-300'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {j === 0 ? (
                          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-blue-500 sm:h-4 sm:w-4" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 flex-shrink-0 text-red-400 sm:h-4 sm:w-4" />
                        )}
                        {L(v, isBn)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          {L(COMPETITOR_COMPARISON.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  BEFORE / AFTER (15 pairs)                                                  */
/* ========================================================================== */

function BeforeAfterSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={BEFORE_AFTER.eyebrow}
          title={BEFORE_AFTER.title}
          subtitle={BEFORE_AFTER.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
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
              <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-blue-900 dark:text-blue-300 sm:text-base">
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
/*  AI VS HUMAN DEMO (8 rows)                                                  */
/* ========================================================================== */

function AiVsHumanSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={AI_VS_HUMAN_DEMO.eyebrow}
          title={AI_VS_HUMAN_DEMO.title}
          subtitle={AI_VS_HUMAN_DEMO.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
            <thead>
              <tr className="bg-slate-900 text-left text-white">
                <th className="p-4 text-sm font-semibold">{isBn ? 'মেট্রিক' : 'Metric'}</th>
                <th className="p-4 text-sm font-semibold text-red-300">{isBn ? 'হিউম্যান এজেন্ট' : 'Human Agent'}</th>
                <th className="bg-blue-600 p-4 text-sm font-semibold">{isBn ? 'AI Voice Agent' : 'AI Voice Agent'}</th>
              </tr>
            </thead>
            <tbody>
              {AI_VS_HUMAN_DEMO.rows.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="p-4 text-sm font-medium">{L(r.metric, isBn)}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                      {L(r.human, isBn)}
                    </span>
                  </td>
                  <td className="bg-blue-50/60 p-4 text-sm font-bold text-blue-900 dark:bg-blue-950/20 dark:text-blue-300">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      {L(r.ai, isBn)}
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
/*  ROI CALCULATOR (interactive, 6 sliders + 5 outputs)                        */
/* ========================================================================== */

/** Standalone slider for the ROI Calculator (extracted to satisfy
 *  react-hooks/static-components lint rule). */
function RoiSlider({ label, value, set, min, max, step, fmt }: {
  label: string; value: number; set: (v: number) => void
  min: number; max: number; step: number; fmt: (v: number) => string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
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
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-blue-600"
      />
    </div>
  )
}

function fmtInt(v: number) { return v.toLocaleString() }
function fmtBDT(v: number) { return `৳${Math.round(v).toLocaleString('en-IN')}` }
function fmtPct(v: number) { return `${v}%` }

function RoiCalculatorSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
  const [monthlyCalls, setMonthlyCalls] = React.useState(500)
  const [missedCallPct, setMissedCallPct] = React.useState(35)
  const [conversionRate, setConversionRate] = React.useState(20)
  const [avgDealSize, setAvgDealSize] = React.useState(15000)
  const [teamCostMonthly, setTeamCostMonthly] = React.useState(40000)
  const [responseTimeMin, setResponseTimeMin] = React.useState(3)
  const [emailForProjection, setEmailForProjection] = React.useState('')
  const [emailSent, setEmailSent] = React.useState(false)
  const [showEmailForm, setShowEmailForm] = React.useState(false)

  // Compute outputs (per task spec)
  // recoveredCalls = calls * (missed/100) * 0.9
  // revenueSaved = recoveredCalls * (conv/100) * deal * 12
  // hoursSaved = responseTime * 0.8 * 12 (per call) * monthlyCalls * 12 (annual)
  //   actually hoursSaved per task: responseTime * 0.8 * 12 — but that is too low; we interpret
  //   as the time saved per call (responseTimeMin * 0.8 minutes saved per call)
  //   times monthlyCalls * 12 (annual). We'll use:
  //   hoursSaved = (responseTimeMin * 0.8 * monthlyCalls * 12) / 60
  // appointments = recoveredCalls * (conv/100) * 12
  // roiMultiple = revenueSaved / (teamCost * 12)
  // paybackWeeks = 60000 / (revenueSaved / 52) — setup cost 60k
  const recoveredCalls = monthlyCalls * (missedCallPct / 100) * 0.9
  const revenueSaved = recoveredCalls * (conversionRate / 100) * avgDealSize * 12
  const hoursSaved = Math.round((responseTimeMin * 0.8 * monthlyCalls * 12) / 60)
  const appointments = Math.round(recoveredCalls * (conversionRate / 100) * 12)
  const annualTeamCost = teamCostMonthly * 12
  const roiMultiple = annualTeamCost > 0 ? revenueSaved / annualTeamCost : 0
  const weeklyRevenue = revenueSaved / 52
  const paybackWeeks = weeklyRevenue > 0 ? Math.max(1, Math.round(60000 / weeklyRevenue)) : 0

  const inputMap: Record<string, { val: number; set: (v: number) => void; fmt: (v: number) => string }> = {
    monthlyCalls: { val: monthlyCalls, set: setMonthlyCalls, fmt: fmtInt },
    missedCallPct: { val: missedCallPct, set: setMissedCallPct, fmt: fmtPct },
    conversionRate: { val: conversionRate, set: setConversionRate, fmt: fmtPct },
    avgDealSize: { val: avgDealSize, set: setAvgDealSize, fmt: fmtBDT },
    teamCostMonthly: { val: teamCostMonthly, set: setTeamCostMonthly, fmt: fmtBDT },
    responseTimeMin: { val: responseTimeMin, set: setResponseTimeMin, fmt: fmtInt },
  }

  const results = [
    { label: ROI_CALCULATOR.results[0].label, value: fmtBDT(revenueSaved), highlight: true },
    { label: ROI_CALCULATOR.results[1].label, value: fmtInt(hoursSaved), highlight: false },
    { label: ROI_CALCULATOR.results[2].label, value: fmtInt(appointments), highlight: false },
    { label: ROI_CALCULATOR.results[3].label, value: `${roiMultiple.toFixed(1)}x`, highlight: true },
    { label: ROI_CALCULATOR.results[4].label, value: `${paybackWeeks}`, highlight: false },
  ]

  async function sendProjection(e: React.FormEvent) {
    e.preventDefault()
    if (!emailForProjection) return
    const payload = {
      email: emailForProjection,
      source: 'voice_roi_projection',
      tag: 'ai_voice_agent_roi',
      projection: {
        monthlyCalls,
        missedCallPct,
        conversionRate,
        avgDealSize,
        teamCostMonthly,
        responseTimeMin,
        revenueSaved: fmtBDT(revenueSaved),
        hoursSaved,
        appointments,
        roiMultiple: roiMultiple.toFixed(1) + 'x',
        paybackWeeks,
      },
    }
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      /* swallow — still show success */
    }
    setEmailSent(true)
  }

  return (
    <Section id="roi-calculator" bg="muted">
      <Container>
        <SectionHeader
          badge={ROI_CALCULATOR.eyebrow}
          title={ROI_CALCULATOR.title}
          subtitle={ROI_CALCULATOR.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Sliders */}
          <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm sm:p-8">
            <div className="space-y-5">
              {ROI_CALCULATOR.inputs.map((inp) => {
                const state = inputMap[inp.key]
                if (!state) return null
                return (
                  <RoiSlider
                    key={inp.key}
                    label={L(inp.label, isBn)}
                    value={state.val}
                    set={state.set}
                    min={inp.min}
                    max={inp.max}
                    step={inp.step}
                    fmt={state.fmt}
                  />
                )
              })}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{L(ROI_CALCULATOR.note, isBn)}</p>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 text-center shadow-sm ${
                    r.highlight
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30'
                      : 'border-border/60 bg-background'
                  }`}
                >
                  <div className={`text-2xl font-extrabold sm:text-3xl ${r.highlight ? 'text-blue-700 dark:text-blue-400' : 'text-blue-600'}`}>
                    {r.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {L(r.label, isBn)}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onCta}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] hover:bg-blue-700"
            >
              <PhoneCall className="h-4 w-4" />
              {isBn ? 'আমার কাস্টম প্রজেকশন পান' : 'Get My Custom Projection'}
            </button>
            {/* Email-me-this-projection secondary CTA */}
            {!showEmailForm && !emailSent && (
              <button
                onClick={() => setShowEmailForm(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 py-2.5 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400"
              >
                <Mail className="h-3.5 w-3.5" />
                {isBn ? 'এই প্রজেকশন ইমেইলে পাঠান' : 'Email me this projection'}
              </button>
            )}
            {showEmailForm && !emailSent && (
              <form onSubmit={sendProjection} className="space-y-2 rounded-xl border border-border bg-background p-3">
                <Input
                  type="email"
                  required
                  placeholder={isBn ? 'আপনার ইমেইল' : 'your@email.com'}
                  value={emailForProjection}
                  onChange={(e) => setEmailForProjection(e.target.value)}
                  className="text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {isBn ? 'প্রজেকশন পাঠান' : 'Send projection'}
                </button>
              </form>
            )}
            {emailSent && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                {isBn
                  ? 'চমৎকার! আপনার প্রজেকশন ইমেইলে পাঠানো হয়েছে।'
                  : 'Projection sent! Check your inbox in 2 minutes.'}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CALL FLOW (8 steps)                                                        */
/* ========================================================================== */

function CallFlowSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={CALL_FLOW.eyebrow}
          title={CALL_FLOW.title}
          subtitle={CALL_FLOW.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {CALL_FLOW.steps.map((s, i) => {
              const Icon = getIcon(s.icon)
              return (
                <React.Fragment key={i}>
                  <div
                    className="relative flex flex-col items-center rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 text-center transition-transform hover:scale-105 dark:border-blue-900/40 dark:bg-blue-950/20"
                    style={{
                      animation: `flowPulse 3s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-xs font-semibold sm:text-sm">{L(s.label, isBn)}</div>
                    <div className="mt-1 text-[10px] font-bold text-blue-600">#{i + 1}</div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
          <style jsx>{`
            @keyframes flowPulse {
              0%, 100% { transform: translateY(0); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
              50% { transform: translateY(-3px); box-shadow: 0 4px 16px 0 rgba(37, 99, 235, 0.2); }
            }
          `}</style>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  AUTOMATION WORKFLOWS (10)                                                  */
/* ========================================================================== */

function WorkflowsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={AUTOMATION_WORKFLOWS.eyebrow}
          title={AUTOMATION_WORKFLOWS.title}
          subtitle={AUTOMATION_WORKFLOWS.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {AUTOMATION_WORKFLOWS.items.map((w, i) => {
            const Icon = getIcon(w.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold">{L(w.title, isBn)}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{L(w.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  DASHBOARD PREVIEW                                                          */
/* ========================================================================== */

function DashboardSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={DASHBOARD_PREVIEW.eyebrow}
          title={DASHBOARD_PREVIEW.title}
          subtitle={DASHBOARD_PREVIEW.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="ml-3 flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
              app.nextgenvoice.ai/dashboard
            </div>
          </div>
          {/* Dashboard body */}
          <div className="p-6">
            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {DASHBOARD_PREVIEW.metrics.map((m, i) => (
                <div key={i} className="rounded-xl border border-border/60 bg-background p-4">
                  <div className="text-xs text-muted-foreground">{L(m.label, isBn)}</div>
                  <div className="mt-1 text-2xl font-extrabold text-blue-600">{m.value}</div>
                  <div className="mt-1 text-xs font-semibold text-emerald-600">{m.trend}</div>
                </div>
              ))}
            </div>
            {/* Mini chart placeholder */}
            <div className="mt-6 rounded-xl border border-border/60 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
                {[40, 55, 35, 70, 60, 85, 75, 95, 80, 100, 90, 110].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-indigo-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 text-center text-xs text-muted-foreground">
                {isBn ? 'গত ১২ সপ্তাহের কল ভলিউম' : 'Call volume — last 12 weeks'}
              </div>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
          {L(DASHBOARD_PREVIEW.note, isBn)}
        </p>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  CASE STUDIES (6, native details accordion)                                 */
/* ========================================================================== */

function CaseStudiesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={CASE_STUDIES.eyebrow}
          title={CASE_STUDIES.title}
          subtitle={CASE_STUDIES.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {CASE_STUDIES.items.map((cs, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-heading text-base font-bold marker:content-['']">
                  <span className="flex items-center gap-2">
                    <span>{L(cs.company, isBn)}</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                      {L(cs.industry, isBn)} · {L(cs.location, isBn)}
                    </span>
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
                    <span className="font-semibold text-blue-600">{isBn ? 'সমাধান: ' : 'Solution: '}</span>
                    <span className="text-muted-foreground">{L(cs.solution, isBn)}</span>
                  </div>
                  <div>
                    <span className="font-semibold">{isBn ? 'ইমপ্লিমেন্টেশন: ' : 'Implementation: '}</span>
                    <span className="text-muted-foreground">{L(cs.implementation, isBn)}</span>
                  </div>
                  <div>
                    <span className="font-semibold">{isBn ? 'ফলাফল: ' : 'Results: '}</span>
                    <ul className="mt-1 space-y-1">
                      {cs.results.map((r, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                          {L(r, isBn)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cs.metrics.map((m, j) => (
                      <span key={j} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {L(m.label, isBn)}: {m.value}
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
/*  TESTIMONIALS (8)                                                           */
/* ========================================================================== */

function TestimonialsSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={TESTIMONIALS.eyebrow}
          title={TESTIMONIALS.title}
          subtitle={TESTIMONIALS.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.items.map((t, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="mb-3 flex gap-0.5">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{L(t.quote, isBn)}&rdquo;
              </p>
              <div className="mt-3 rounded-lg bg-blue-50 p-2 text-xs dark:bg-blue-950/30">
                <span className="font-semibold text-red-600">{isBn ? 'আগে: ' : 'Before: '}</span>
                <span className="text-muted-foreground">{L(t.before, isBn)}</span>
              </div>
              <div className="mt-1 rounded-lg bg-emerald-50 p-2 text-xs dark:bg-emerald-950/30">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{isBn ? 'পরে: ' : 'After: '}</span>
                <span className="text-muted-foreground">{L(t.after, isBn)}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" aria-hidden="true">
                  {L(t.author, isBn).charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{L(t.author, isBn)}</h4>
                  <div className="text-xs text-muted-foreground">{L(t.role, isBn)} · {L(t.company, isBn)}</div>
                  <div className="text-xs text-muted-foreground">{L(t.industry, isBn)}</div>
                </div>
              </div>
            </div>
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
          accent="blue"
        />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {STATISTICS.stats.map((s, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <div className="group rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-semibold sm:text-sm">
                  {L(s.label, isBn)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {L(s.desc, isBn)}
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
/*  DELIVERABLES (12)                                                          */
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
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERABLES.items.map((d, i) => {
            const Icon = getIcon(d.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold">{L(d.title, isBn)}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{L(d.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  PRICING (3 tiers + offer stack)                                            */
/* ========================================================================== */

function PricingSection({ isBn, onCta }: { isBn: boolean; onCta: () => void }) {
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
          accent="blue"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRICING.tiers.map((tier, i) => {
            const monthlyNum = parsePrice(L(tier.price, isBn))
            const isCustom = monthlyNum === 0
            return (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                  tier.popular
                    ? 'border-blue-500 bg-background ring-2 ring-blue-500/30 lg:-mt-4 lg:mb-4'
                    : 'border-border/60 bg-background'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                    {isBn ? 'সর্বাধিক জনপ্রিয়' : 'Most Popular'}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold">{L(tier.name, isBn)}</h3>
                <div className="mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-blue-600">
                      {isCustom ? L(tier.price, isBn) : formatBDT(monthlyNum)}
                    </span>
                    <span className="text-sm text-muted-foreground">{L(tier.period, isBn)}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{L(tier.tagline, isBn)}</p>
                <ul className="mt-5 max-h-72 flex-1 space-y-2 overflow-y-auto">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span>{L(f, isBn)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onCta}
                  className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition-transform hover:scale-[1.02] ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-border bg-background hover:bg-muted'
                  }`}
                >
                  {L(tier.cta, isBn)}
                </button>
              </div>
            )
          })}
        </div>

        {/* Offer stack */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h3 className="mb-4 text-center font-heading text-xl font-bold">
            {isBn ? 'আপনি যা পাচ্ছেন — ভ্যালু ব্রেকডাউন' : 'What you get — value breakdown'}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            {PRICING.offerStack.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/60 px-5 py-3 last:border-b-0">
                <span className="text-sm font-medium">{L(item.item, isBn)}</span>
                <span className="text-sm text-muted-foreground line-through">{L(item.value, isBn)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-blue-50 px-5 py-4 dark:bg-blue-950/30">
              <span className="font-bold">{isBn ? 'মোট ভ্যালু' : 'Total Value'}</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{L(PRICING.totalValue, isBn)}</span>
            </div>
            <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
              <span className="font-bold">{isBn ? 'আজকের বিনিয়োগ' : 'Today\'s Investment'}</span>
              <span className="font-bold">{L(PRICING.todayInvestment, isBn)}</span>
            </div>
          </div>
          {/* Bonus */}
          <div className="mt-4 space-y-2">
            {PRICING.bonus.map((b, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm dark:border-emerald-900 dark:bg-emerald-950/30">
                <Gift className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span className="text-emerald-800 dark:text-emerald-300">{L(b, isBn)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700"
            >
              <PhoneCall className="h-4 w-4" />
              {isBn ? 'আজই শুরু করুন' : 'Start Today'}
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">{L(PRICING.note, isBn)}</p>
        </div>

        {/* Transparency: what's NOT included + pricing FAQ */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-200/60 bg-amber-50/40 p-6 dark:border-amber-900/40 dark:bg-amber-950/10">
          <h3 className="font-heading text-lg font-bold">
            {isBn ? 'সততার সাথে বলি — যা অন্তর্ভুক্ত নয়' : 'Honestly — what is NOT included'}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {isBn
              ? 'আমরা লুকানো খরচ পছন্দ করি না। আপনার সম্পূর্ণ খরচের ছবি এখানে:'
              : 'We hate hidden costs. Here is your complete cost picture:'}
          </p>
          <ul className="mt-3 space-y-2">
            {PRICING.notIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <span className="text-muted-foreground">{L(item, isBn)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing FAQ */}
        <div className="mx-auto mt-8 max-w-3xl">
          <h3 className="mb-4 text-center font-heading text-lg font-bold">
            {isBn ? 'প্রাইসিং সম্পর্কে সাধারণ প্রশ্ন' : 'Pricing quick questions'}
          </h3>
          <div className="space-y-2">
            {PRICING.pricingFaq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-2 font-heading text-sm font-bold marker:content-['']">
                  {L(item.q, isBn)}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{L(item.a, isBn)}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  GUARANTEES (4)                                                             */
/* ========================================================================== */

function GuaranteesSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="voice">
      <Container>
        <SectionHeader
          badge={GUARANTEES.eyebrow}
          title={GUARANTEES.title}
          subtitle={GUARANTEES.subtitle}
          isBn={isBn}
          light
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.items.map((g, i) => {
            const Icon = getIcon(g.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{L(g.title, isBn)}</h3>
                <p className="mt-2 text-sm text-blue-50">{L(g.desc, isBn)}</p>
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
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          {FAQS.groups.map((g, gi) => (
            <div key={gi}>
              <h3 className="mb-3 font-heading text-lg font-bold text-blue-700 dark:text-blue-400">
                {L(g.title, isBn)}
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
          accent="blue"
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
/*  SECURITY (9 cards + certifications)                                        */
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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.items.map((c, i) => {
            const Icon = getIcon(c.icon)
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-white">{L(c.title, isBn)}</h3>
                <p className="mt-2 text-xs text-slate-400">{L(c.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
        {/* Compliance badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SECURITY.certifications.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              {L(c, isBn)}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  DEVELOPER SECTION (6 items + code snippet)                                 */
/* ========================================================================== */

function DeveloperSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={DEVELOPER_SECTION.eyebrow}
          title={DEVELOPER_SECTION.title}
          subtitle={DEVELOPER_SECTION.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEVELOPER_SECTION.items.map((d, i) => {
            const Icon = getIcon(d.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold">{L(d.title, isBn)}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{L(d.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
        {/* Code snippet */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-slate-950 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="ml-2 text-xs text-slate-400">trigger-call.js</span>
            </div>
            <span className="text-xs font-semibold text-blue-400">{DEVELOPER_SECTION.codeSnippet.language}</span>
          </div>
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-slate-200 sm:text-sm">
            <code>{DEVELOPER_SECTION.codeSnippet.code}</code>
          </pre>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  KNOWLEDGE BASE (4)                                                         */
/* ========================================================================== */

function KnowledgeBaseSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={KNOWLEDGE_BASE.eyebrow}
          title={KNOWLEDGE_BASE.title}
          subtitle={KNOWLEDGE_BASE.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KNOWLEDGE_BASE.items.map((k, i) => {
            const Icon = getIcon(k.icon)
            return (
              <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{L(k.title, isBn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{L(k.desc, isBn)}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TIMELINE (6 phases)                                                        */
/* ========================================================================== */

function TimelineSection({ isBn }: { isBn: boolean }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge={TIMELINE.eyebrow}
          title={TIMELINE.title}
          subtitle={TIMELINE.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {TIMELINE.phases.map((p, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border-l-4 border-blue-500 bg-background p-4 shadow-sm">
              <div className="min-w-[80px]">
                <div className="font-bold text-blue-600">{L(p.phase, isBn)}</div>
                <div className="text-xs text-muted-foreground">{L(p.duration, isBn)}</div>
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
/*  PROCESS (5 steps)                                                          */
/* ========================================================================== */

function ProcessSection({ isBn }: { isBn: boolean }) {
  return (
    <Section bg="muted">
      <Container>
        <SectionHeader
          badge={PROCESS.eyebrow}
          title={PROCESS.title}
          subtitle={PROCESS.subtitle}
          isBn={isBn}
          accent="blue"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
              <div className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.num}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold">{L(s.title, isBn)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{L(s.desc, isBn)}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/*  TRUST (8 badges + certifications)                                          */
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
          accent="blue"
        />
        {/* Trust badges */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TRUST.badges.map((b, i) => {
            const Icon = getIcon(b.icon)
            return (
              <div key={i} className="flex flex-col items-center rounded-xl border border-border/60 bg-card p-4 text-center shadow-sm">
                <Icon className="mb-2 h-7 w-7 text-blue-600" />
                <span className="text-xs font-semibold sm:text-sm">{L(b.label, isBn)}</span>
              </div>
            )
          })}
        </div>
        {/* Certifications */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST.certifications.map((c, i) => (
              <span key={i} className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm">
                {L(c, isBn)}
              </span>
            ))}
          </div>
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
      ? 'আসসালামু আলাইকুম, আমি AI Voice Agent সেবা সম্পর্কে জানতে চাই।'
      : "Hi, I'd like to know more about AI Voice Agent service.",
  )}`
  return (
    <Section id="cta" bg="voice">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {L(FINAL_CTA.eyebrow, isBn)}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {L(FINAL_CTA.title, isBn)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-50 sm:text-lg">
            {L(FINAL_CTA.subtitle, isBn)}
          </p>
          <div className="mt-6 inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white">
            {L(FINAL_CTA.urgencyNote, isBn)}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-transform hover:scale-[1.02]"
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
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
            {FINAL_CTA.trustRow.map((r, i) => (
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
              <PhoneCall className="h-3 w-3" /> {isBn ? 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' : 'Book Your Free Strategy Call'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {isBn ? 'আপনার AI Voice Agent রোডম্যাপ পান' : 'Get Your AI Voice Agent Roadmap'}
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
              source="service_ai-voice-agent"
              serviceName={isBn ? 'AI Voice Agent' : 'AI Voice Agent'}
              submitLabel={isBn ? 'ফ্রি কল রিকোয়েস্ট করুন' : 'Request My Free Call'}
            />
          </div>
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
    <div className="border-y border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:border-blue-900">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-100">
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
              <div className="text-[10px] uppercase text-blue-100">{L(URGENCY.slotsLabel, isBn)}</div>
            </div>
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-700 transition-transform hover:scale-105"
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
        <div className="text-sm font-bold text-blue-600">{L(STICKY_CTA.price, isBn)}</div>
        <div className="text-xs text-muted-foreground">{L(STICKY_CTA.roi, isBn)}</div>
      </div>
      <button
        onClick={onCta}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
      >
        <PhoneCall className="h-4 w-4" />
        {L(STICKY_CTA.cta, isBn)}
      </button>
    </div>
  )
}

/* ========================================================================== */
/*  DESKTOP SECTION NAVIGATOR (floating dots, desktop only)                    */
/* ========================================================================== */

/** Floating dot navigator on the right edge (desktop xl+). Click a dot to
 *  jump to that section. Shows progress through the page. */
const SECTION_NAV_ITEMS = [
  { id: 'conversation-example', label: { en: 'Demo', bn: 'ডেমো' } },
  { id: 'features', label: { en: 'Features', bn: 'ফিচার' } },
  { id: 'roi-calculator', label: { en: 'ROI', bn: 'ROI' } },
  { id: 'pricing', label: { en: 'Pricing', bn: 'প্রাইস' } },
  { id: 'faq', label: { en: 'FAQ', bn: 'প্রশ্ন' } },
  { id: 'cta', label: { en: 'Get Started', bn: 'শুরু' } },
  { id: 'order', label: { en: 'Contact', bn: 'যোগাযোগ' } },
] as const

function SectionNavigator({ isBn }: { isBn: boolean }) {
  const [active, setActive] = React.useState<string>('')
  React.useEffect(() => {
    function onScroll() {
      let current = ''
      for (const item of SECTION_NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 200) current = item.id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label={isBn ? 'সেকশন নেভিগেশন' : 'Section navigation'}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {SECTION_NAV_ITEMS.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => jump(item.id)}
            aria-label={isBn ? item.label.bn : item.label.en}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide opacity-0 transition-opacity group-hover:opacity-100 ${
                isActive ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
              }`}
            >
              {isBn ? item.label.bn : item.label.en}
            </span>
            <span
              className={`block h-2.5 w-2.5 rounded-full border-2 transition-all ${
                isActive
                  ? 'scale-125 border-blue-600 bg-blue-600'
                  : 'border-muted-foreground/40 bg-background hover:border-blue-400'
              }`}
            />
          </button>
        )
      })}
    </nav>
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
          source: 'voice_exit_popup',
          tag: 'ai_voice_agent_audit',
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
            <PhoneCall className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-heading text-xl font-bold">{L(EXIT_POPUP.title, isBn)}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{L(EXIT_POPUP.desc, isBn)}</p>
          {done ? (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400">
              <CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
              {L(EXIT_POPUP.success, isBn)}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <Label htmlFor="voice-exit-email" className="sr-only">
                {L(EXIT_POPUP.emailLabel, isBn)}
              </Label>
              <Input
                id="voice-exit-email"
                type="email"
                required
                placeholder={L(EXIT_POPUP.emailPlaceholder, isBn)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
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

export function AiVoiceAgentClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const trackingMeta = React.useMemo(() => ({ slug: 'ai-voice-agent' }), [])
  usePageViewTracking('service_detail_page', trackingMeta)

  const [showExit, setShowExit] = React.useState(false)
  const [exitSeen, setExitSeen] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const exitTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const mouseArmed = React.useRef(false)
  const mountTime = React.useRef(Date.now())

  /* Reading progress bar — tracks scroll position as % of page height. */
  React.useEffect(() => {
    function onScroll() {
      const h = document.documentElement
      const scrollTop = h.scrollTop || document.body.scrollTop
      const scrollHeight = h.scrollHeight - h.clientHeight
      setScrollProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Exit-intent: trigger once via mouseleave (desktop, after dwell-time + mouseenter)
   *  + 30s fallback (mobile). The dwell-time gate (7s) prevents the popup from
   *  firing immediately on page load (which happens because the mouse starts
   *  outside the viewport in headless browsers and some real users). */
  React.useEffect(() => {
    function onMouseEnter() {
      mouseArmed.current = true
    }
    function onLeave(e: MouseEvent) {
      if (e.clientY < 0 && mouseArmed.current && !exitSeen && Date.now() - mountTime.current > 7000) {
        setShowExit(true)
        setExitSeen(true)
      }
    }
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onLeave)
    exitTimer.current = setTimeout(() => {
      if (!exitSeen) {
        setShowExit(true)
        setExitSeen(true)
      }
    }, 30000)
    return () => {
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onLeave)
      if (exitTimer.current) clearTimeout(exitTimer.current)
    }
  }, [exitSeen])

  const scrollToLeadForm = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Reading progress bar — sticky at top, above TopBar */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <TopBar />

      <main className="flex-1">
        <HeroSection isBn={isBn} onCta={scrollToLeadForm} />
        <UrgencyBand isBn={isBn} onCta={scrollToLeadForm} />
        <MetricsSection isBn={isBn} />
        <TrustedBySection isBn={isBn} />
        <ProblemSection isBn={isBn} onCta={scrollToLeadForm} />
        <EmotionalCostSection isBn={isBn} />
        <WhyTraditionalSection isBn={isBn} />
        <WhyNextgenSection isBn={isBn} />
        <FrameworkSection isBn={isBn} />
        <HowItWorksSection isBn={isBn} />
        <ConversationExampleSection isBn={isBn} />
        <UseCasesSection isBn={isBn} />
        <FeaturesSection isBn={isBn} />
        <VoiceCapabilitiesSection isBn={isBn} />
        <IntegrationsSection isBn={isBn} />
        <IndustrySolutionsSection isBn={isBn} />
        <ComparisonSection isBn={isBn} />
        <CompetitorComparisonSection isBn={isBn} />
        <BeforeAfterSection isBn={isBn} />
        <AiVsHumanSection isBn={isBn} />
        <RoiCalculatorSection isBn={isBn} onCta={scrollToLeadForm} />
        <CallFlowSection isBn={isBn} />
        <WorkflowsSection isBn={isBn} />
        <DashboardSection isBn={isBn} />
        <CaseStudiesSection isBn={isBn} />
        <TestimonialsSection isBn={isBn} />
        <StatisticsSection isBn={isBn} />
        <DeliverablesSection isBn={isBn} />
        <PricingSection isBn={isBn} onCta={scrollToLeadForm} />
        <GuaranteesSection isBn={isBn} />
        <FaqSection isBn={isBn} />
        <ObjectionsSection isBn={isBn} />
        <SecuritySection isBn={isBn} />
        <DeveloperSection isBn={isBn} />
        <KnowledgeBaseSection isBn={isBn} />
        <TimelineSection isBn={isBn} />
        <ProcessSection isBn={isBn} />
        <TrustSection isBn={isBn} />
        <FinalCtaSection isBn={isBn} onCta={scrollToLeadForm} />
        <LeadFormSection isBn={isBn} />
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      <StickyCtaBar isBn={isBn} onCta={scrollToLeadForm} />
      <SectionNavigator isBn={isBn} />
      {showExit && <ExitPopup isBn={isBn} onClose={() => setShowExit(false)} />}
    </div>
  )
}
