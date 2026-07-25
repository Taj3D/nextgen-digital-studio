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
  founderCertifications,
  founderAwards,
  founderStory,
  founderPhilosophy,
  founderManifesto,
  founderFramework,
  founderTechStack,
  founderExpertise,
  founderIndustries,
  founderVisionTimeline,
  founderImpact,
  founderRoutine,
  founderReadingList,
  founderCaseStudies,
  founderSpeaking,
  founderTraining,
  founderValues,
  founderBeliefs,
  founderQuotes,
  founderFutureProjects,
  founderOpenLetter,
  founderGuarantee,
  founderLegacy,
  founderClosing,
  founderFaqs,
  founderMission,
  founderVision,
} from '@/lib/founder-data'
import {
  Award,
  ArrowRight,
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
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                     */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Users, Star, Bot, ShieldCheck, Lightbulb, Handshake, GraduationCap,
  Eye, Award, Rocket, Building, Crown, Terminal, Wrench, Code, CalendarCheck,
  Mic, HeartPulse, ShoppingBag, ShoppingCart, Factory, Building2, Briefcase,
  BookOpen,
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
/* ------------------------------------------------------------------ */

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            ob.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    ob.observe(el)
    return () => ob.disconnect()
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
    <div className="overflow-hidden rounded-xl border border-[#E8DDD4] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[#1C1C1C] transition-colors hover:bg-[#FAF7F3] sm:px-5 sm:text-[15px]"
      >
        <span>{T(q, isBn)}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#B8923A] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-[#4A4A4A] sm:px-5">{T(a, isBn)}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export function FounderClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('founder_page_v3')

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#FAF7F3] text-[#1C1C1C]"
      /*
        Force light-mode CSS variables for this page so shadcn form inputs
        (LandingLeadForm) render with light backgrounds/text even though the
        global ThemeProvider defaults to 'dark'. The founder page is an
        explicit light (navy + gold on cream) design.
      */
      style={{
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.21 0.034 264)',
        '--card': 'oklch(1 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--input': 'oklch(0.922 0.008 264)',
        '--border': 'oklch(0.922 0.008 264)',
        '--ring': 'oklch(0.546 0.215 262.88)',
        '--muted': 'oklch(0.97 0.006 264)',
        '--muted-foreground': 'oklch(0.45 0.02 264)',
        '--primary': 'oklch(0.3 0.08 255)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--accent': 'oklch(0.96 0.02 95)',
        '--accent-foreground': 'oklch(0.3 0.08 255)',
        colorScheme: 'light',
      } as React.CSSProperties}
    >
      <TopBar />

      <main id="main-content" className="flex-1 pb-20">
        {/* ===== 1. HERO ===== */}
        <section className="relative overflow-hidden px-4 pb-6 pt-10 text-center sm:px-6 sm:pt-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4A853]/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A853] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Crown className="h-3 w-3" /> {T(founderHero.badge, isBn)}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {T(founderHero.name, isBn)}
              <br />
              <span className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] bg-clip-text text-transparent">
                {T(founderHero.brand, isBn)}
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-[#4A4A4A] sm:text-lg">
              {T(founderHero.positioning, isBn)}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-[#7A7A7A]">
              {T(founderHero.subPositioning, isBn)}
            </p>

            {/* Manifesto */}
            <div className="mt-5 rounded-xl border border-[#E8DDD4] bg-[#F5F0EB] p-4 sm:p-5">
              <p className="text-[15px] italic leading-relaxed text-[#1C1C1C] sm:text-base">
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
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-[#E8DDD4] bg-white p-4 shadow-sm sm:grid-cols-4 sm:gap-4 sm:p-6">
              {founderHero.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                    {T(s.v, isBn)}
                  </div>
                  <div className="mt-0.5 text-xs text-[#7A7A7A]">{T(s.l, isBn)}</div>
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#E8DDD4] pt-4 text-xs text-[#4A4A4A] sm:text-sm">
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
            <div className="grid gap-3 rounded-2xl border border-[#E8DDD4] bg-white p-4 sm:grid-cols-2 sm:p-5">
              {founderTrust.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#1C1C1C]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4A853]" />
                  {T(t, isBn)}
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 3. MEDIA MENTIONS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📰">{isBn ? 'যেখানে দেখা গেছে' : 'As Seen On'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap gap-2">
              {founderMediaMentions.map((m, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#E8DDD4] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#4A4A4A]"
                >
                  {m}
                </span>
              ))}
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
            <div className="space-y-3 text-[15px] leading-relaxed text-[#4A4A4A]">
              {founderStory.paragraphs.map((p, i) => (
                <p key={i}>{T(p, isBn)}</p>
              ))}
              <div className="rounded-r-xl border-l-4 border-[#D4A853] bg-[#FAF7F3] px-5 py-4">
                <p className="italic text-[#4A4A4A]">
                  <Quote className="mr-1 inline h-4 w-4 text-[#D4A853]" />
                  {T(founderStory.quote, isBn)}
                </p>
              </div>
              {founderStory.paragraphs2.map((p, i) => (
                <p key={i}>{T(p, isBn)}</p>
              ))}
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

        {/* ===== 8. AI MANIFESTO ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📢">{isBn ? 'বাংলাদেশের জন্য AI — মেনিফেস্টো' : 'Why Bangladesh Needs AI — Manifesto'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {founderManifesto.map((m, i) => (
                <div key={i} className="rounded-xl border border-[#E8DDD4] bg-white p-4 text-center">
                  <span className="block text-2xl font-extrabold text-[#D4A853]">
                    {isBn ? ['০১', '০২', '০৩', '০৪', '০৫', '০৬'][i] : String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 text-sm font-medium text-[#1C1C1C]">{T(m, isBn)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 9. TAJ FRAMEWORK ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="⚡">{T(founderFramework.title, isBn)}</SectionTitle>
            <p className="mb-3 text-sm text-[#7A7A7A]">{T(founderFramework.subtitle, isBn)}</p>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {founderFramework.steps.map((s, i) => (
                <div key={i} className="rounded-xl border border-[#E8DDD4] bg-white p-3 text-center sm:p-4">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] text-sm font-bold text-white">
                    {T(s.num, isBn)}
                  </div>
                  <h4 className="text-sm font-bold">{T(s.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[#7A7A7A]">{T(s.desc, isBn)}</p>
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
                  className="rounded-full border border-[#1E3A5F]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1E3A5F] sm:text-sm"
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
                <div key={i} className="rounded-xl border border-[#E8DDD4] bg-white p-3 text-center">
                  <div className="text-sm font-bold text-[#1E3A5F]">{t.name}</div>
                  <div className="mt-0.5 text-xs text-[#7A7A7A]">{T(t.use, isBn)}</div>
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
                <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl border border-[#E8DDD4] bg-white p-3 text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F3]">
                    <Icon name={ind.icon} className="h-4 w-4 text-[#D4A853]" />
                  </div>
                  <span className="text-xs font-semibold text-[#1C1C1C] sm:text-sm">{T(ind, isBn)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 13. VISION TIMELINE ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🔭">{isBn ? 'ভিশন টাইমলাইন' : 'Vision Timeline'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap items-center justify-center gap-2">
              {founderVisionTimeline.map((v, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ArrowRight className="h-4 w-4 text-[#D4A853]" />}
                  <span className="rounded-full border border-[#E8DDD4] bg-white px-4 py-2 text-xs font-bold text-[#1E3A5F] sm:text-sm">
                    {T(v, isBn)}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 14. IMPACT COUNTERS ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📊">{isBn ? 'সংখ্যায় প্রভাব' : 'Impact in Numbers'}</SectionTitle>
            <SectionDivider />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {founderImpact.map((c, i) => (
                <div key={i} className="rounded-xl border border-[#E8DDD4] bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-[#1E3A5F]">{c.num}</div>
                  <div className="mt-0.5 text-xs text-[#7A7A7A]">{T(c.label, isBn)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 15. MISSION & VISION ===== */}
        <Section>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-l-4 border-[#1E3A5F] bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E3A5F]">
                  <Rocket className="h-5 w-5" /> {T(founderMission.title, isBn)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">{T(founderMission.body, isBn)}</p>
              </div>
              <div className="rounded-2xl border-l-4 border-[#D4A853] bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E3A5F]">
                  <Eye className="h-5 w-5" /> {T(founderVision.title, isBn)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">{T(founderVision.body, isBn)}</p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 16. CORE BELIEFS (10 principles) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="💎">{isBn ? '১০টি প্রতিষ্ঠাতা নীতি' : '10 Founder Principles'}</SectionTitle>
            <SectionDivider />
            <div className="grid gap-2.5 sm:grid-cols-2">
              {founderBeliefs.map((b, i) => (
                <div key={i} className="rounded-xl border border-[#E8DDD4] bg-white p-4">
                  <span className="mb-1 inline-block rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] px-2.5 py-0.5 text-xs font-bold text-white">
                    {isBn ? ['০১', '০২', '০৩', '০৪', '০৫', '০৬', '০৭', '০৮', '০৯', '১০'][i] : String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-medium text-[#1C1C1C]">{T(b, isBn)}</p>
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
                <div key={i} className="rounded-2xl border border-[#E8DDD4] bg-white p-5 shadow-sm">
                  <h4 className="text-base font-bold text-[#1E3A5F]">{T(c.title, isBn)}</h4>
                  <div className="mt-2 space-y-1.5 text-sm text-[#4A4A4A]">
                    <p><span className="font-semibold text-[#1C1C1C]">{isBn ? 'সমস্যা:' : 'Problem:'}</span> {T(c.problem, isBn)}</p>
                    <p><span className="font-semibold text-[#1C1C1C]">{isBn ? 'সমাধান:' : 'Solution:'}</span> {T(c.solution, isBn)}</p>
                    <p><span className="font-semibold text-[#1C1C1C]">{isBn ? 'ফলাফল:' : 'Result:'}</span> {T(c.result, isBn)}</p>
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

        {/* ===== 18. SPEAKING ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🎤">{isBn ? 'স্পিকিং' : 'Speaking'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap gap-2">
              {founderSpeaking.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD4] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1E3A5F] sm:text-sm"
                >
                  <Icon name={s.icon} className="h-3.5 w-3.5 text-[#D4A853]" />
                  {T(s, isBn)}
                </span>
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
                <div key={i} className="rounded-2xl border border-[#E8DDD4] bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E]">
                    <Icon name={t.icon} className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold">{T(t.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[#7A7A7A]">{T(t.desc, isBn)}</p>
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
                <div key={i} className="rounded-2xl border border-[#E8DDD4] bg-white p-5 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F3]">
                    <Icon name={v.icon} className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E3A5F]">{T(v.title, isBn)}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#4A4A4A]">{T(v.story, isBn)}</p>
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
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[#E8DDD4] bg-white p-3">
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#1E3A5F] px-2.5 py-1 text-xs font-bold text-white">
                    <Clock className="h-3 w-3" /> {r.time}
                  </span>
                  <span className="text-sm text-[#1C1C1C]">{T(r.desc, isBn)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 22. READING LIST ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="📚">{isBn ? 'আমার পড়ার তালিকা' : 'Books I Recommend'}</SectionTitle>
            <SectionDivider />
            <div className="flex flex-wrap gap-2">
              {founderReadingList.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD4] bg-white px-3.5 py-1.5 text-xs font-medium text-[#1C1C1C] sm:text-sm"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#D4A853]" /> {b}
                </span>
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
                <div key={i} className="rounded-xl border-l-4 border-[#D4A853] bg-white p-4 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-[#1C1C1C]">
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
              {[
                { icon: 'Crown', label: isBn ? 'হিরো' : 'Hero' },
                { icon: 'Code', label: isBn ? 'কাজ' : 'Working' },
                { icon: 'Mic', label: isBn ? 'স্পিকিং' : 'Speaking' },
                { icon: 'Handshake', label: isBn ? 'মিটিং' : 'Meeting' },
                { icon: 'Building', label: isBn ? 'অফিস' : 'Office' },
                { icon: 'GraduationCap', label: isBn ? 'ট্রেইনিং' : 'Training' },
              ].map((p, i) => (
                <div key={i} className="flex h-28 flex-col items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD4] bg-[#F5F0EB]">
                  <Icon name={p.icon} className="h-6 w-6 text-[#D4A853]" />
                  <span className="text-xs font-medium text-[#7A7A7A]">{p.label}</span>
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
                <div key={i} className="rounded-2xl border border-[#E8DDD4] bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F3]">
                    <Icon name={p.icon} className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <h4 className="text-sm font-bold">{T(p.title, isBn)}</h4>
                  <p className="mt-0.5 text-xs text-[#7A7A7A]">{T(p.desc, isBn)}</p>
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
            <div className="rounded-2xl border border-[#E8DDD4] bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-bold text-[#1E3A5F]">{T(founderOpenLetter.greeting, isBn)}</h3>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#4A4A4A]">
                {founderOpenLetter.paragraphs.map((p, i) => (
                  <p key={i}>{T(p, isBn)}</p>
                ))}
              </div>
              <p className="mt-3 font-bold text-[#1E3A5F]">{T(founderOpenLetter.sign, isBn)}</p>
            </div>
          </Reveal>
        </Section>

        {/* ===== 30. LEGACY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🏛️">{isBn ? 'আমার লিগেসি' : 'My Legacy'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl border-l-[6px] border-[#D4A853] bg-[#F5F0EB] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-[#1C1C1C] sm:text-[15px]">
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

        {/* ===== 32. FAQ (30+) ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="❓">{isBn ? 'প্রায়শই জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}</SectionTitle>
            <SectionDivider />
            <div className="space-y-2.5">
              {founderFaqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} isBn={isBn} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ===== 33. COMMUNITY ===== */}
        <Section>
          <Reveal>
            <SectionTitle emoji="🌐">{isBn ? 'কমিউনিটি' : 'Community'}</SectionTitle>
            <SectionDivider />
            <div className="rounded-2xl border border-[#E8DDD4] bg-white p-5 text-center shadow-sm sm:p-6">
              <p className="text-sm text-[#4A4A4A]">
                {isBn
                  ? '৩,০০০+ বাংলাদেশি প্রতিষ্ঠাতার সাথে যোগ দিন।'
                  : 'Join 3,000+ Bangladeshi founders.'}
              </p>
              <div className="mt-4 flex justify-center">
                <LandingSocials />
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 34. CONTACT / LEAD FORM ===== */}
        {/* Sentinel: tells the global StickyBookBar to auto-hide near the form */}
        <div id="lead-form" aria-hidden className="sr-only" />
        <Section id="contact" className="scroll-mt-20">
          <Reveal>
            <div className="rounded-3xl border border-[#E8DDD4] bg-white p-6 shadow-lg sm:p-8">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8923A]">
                  <Phone className="h-3 w-3" /> {isBn ? 'সরাসরি কথা বলুন' : 'Talk directly'}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
                  {isBn ? 'একসাথে আপনার ব্যবসার ভবিষ্যৎ গড়ি' : 'Let\'s build the future of your business together'}
                </h2>
                <p className="mt-2 text-sm text-[#7A7A7A]">
                  {isBn ? 'আপনার ব্যবসার জন্য AI রোডম্যাপ পেতে ফর্ম পূরণ করুন।' : 'Fill the form to get an AI roadmap for your business.'}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-[#4A4A4A]">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F3] px-3 py-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#D4A853]" /> {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F3] px-3 py-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#D4A853]" /> {siteConfig.phone}
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F3] px-3 py-1.5">
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

              <div className="mt-6 border-t border-[#E8DDD4] pt-4 text-center">
                <p className="mb-2 text-sm font-semibold text-[#1C1C1C]">
                  {isBn ? 'অথবা সরাসরি হোয়াটসঅ্যাপ করুন' : 'Or WhatsApp directly'}
                </p>
                <div className="flex justify-center">
                  <WhatsAppCTA isBn={isBn} />
                </div>
                <p className="mt-3 flex items-center justify-center gap-1 text-xs text-[#7A7A7A]">
                  <Lock className="h-3 w-3" /> {isBn ? 'আপনার ডেটা নিরাপদ। আমরা শেয়ার করি না।' : 'Your data is safe. We never share.'}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ===== 35. NEWSLETTER ===== */}
        <Section>
          <Reveal>
            <div className="rounded-2xl border border-[#E8DDD4] bg-[#F5F0EB] p-5 text-center sm:p-6">
              <h4 className="flex items-center justify-center gap-2 text-base font-bold text-[#1E3A5F]">
                <Send className="h-4 w-4 text-[#D4A853]" />
                {isBn ? 'প্রতি সপ্তাহে AI গ্রোথ ইনসাইটস পান' : 'Get weekly AI growth insights'}
              </h4>
              <p className="mt-1 text-sm text-[#4A4A4A]">
                {isBn ? '৩,০০০+ বাংলাদেশি প্রতিষ্ঠাতার সাথে যোগ দিন।' : 'Join 3,000+ Bangladeshi founders.'}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert(isBn ? 'ধন্যবাদ! সাবস্ক্রাইব সম্পন্ন।' : 'Thank you! Subscribed.')
                }}
                className="mx-auto mt-3 flex max-w-sm flex-col gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder={isBn ? 'আপনার ইমেইল' : 'Your email'}
                  className="h-11 rounded-full border border-[#E8DDD4] bg-white px-4 text-sm outline-none focus:border-[#1E3A5F]"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#D4A853] px-5 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  {isBn ? 'সাবস্ক্রাইব' : 'Subscribe'}
                </button>
              </form>
              <p className="mt-2 text-xs text-[#7A7A7A]">
                {isBn ? 'কোনো স্প্যাম নেই, যেকোনো সময় আনসাবস্ক্রাইব করুন।' : 'No spam, unsubscribe anytime.'}
              </p>
            </div>
          </Reveal>
        </Section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}
