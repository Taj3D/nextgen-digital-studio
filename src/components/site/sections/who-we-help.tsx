'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Laptop,
  Briefcase,
  Lightbulb,
  ArrowRight,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

type LangCode = 'en' | 'bn'

/** Inline audience + journey translations — keeps labels bilingual without
 *  adding new translation keys (matches the speaking-workshops pattern). */
const AUDIENCE_LABELS: Record<LangCode, string[]> = {
  en: ['Students', 'Freelancers', 'Business Owners', 'Entrepreneurs'],
  bn: ['শিক্ষার্থী', 'ফ্রিল্যান্সার', 'ব্যবসায়ী', 'উদ্যোক্তা'],
}
const JOURNEY_LABELS: Record<LangCode, string[]> = {
  en: [
    'Skill → Confidence → Career',
    'Skill → Value → Clients → Growth',
    'Problem → System → Growth',
    'Idea → Validation → Model → Execution',
  ],
  bn: [
    'দক্ষতা → আত্মবিশ্বাস → ক্যারিয়ার',
    'দক্ষতা → মূল্য → ক্লায়েন্ট → প্রবৃদ্ধি',
    'সমস্যা → ব্যবস্থা → প্রবৃদ্ধি',
    'ধারণা → যাচাই → মডেল → বাস্তবায়ন',
  ],
}

/**
 * Who We Help — identity + desired journey.
 *
 * NOT a duplicate of pain-points (which is about friction/problems).
 * This section is about WHO the customer is and the JOURNEY they want
 * to walk through with NGS as their Guide.
 *
 * StoryBrand: Customer = Hero, NGS = Guide.
 *
 * Governance:
 *   - No income/employment guarantee.
 *   - No "Join Now" / "Enroll Now" — use "Explore" only.
 *   - Founder name = "MD Nazmul Islam Taj" (not "Md.").
 */

type Audience = {
  icon: typeof GraduationCap
  label: string
  journey: string
  descKey: string
  tone: 'emerald' | 'cyan' | 'amber' | 'violet'
}

const audiences: Audience[] = [
  {
    icon: GraduationCap,
    label: 'Students',
    journey: 'Skill → Confidence → Career',
    descKey: 'who.audience.students.desc',
    tone: 'emerald',
  },
  {
    icon: Laptop,
    label: 'Freelancers',
    journey: 'Skill → Value → Clients → Growth',
    descKey: 'who.audience.freelancers.desc',
    tone: 'cyan',
  },
  {
    icon: Briefcase,
    label: 'Business Owners',
    journey: 'Problem → System → Growth',
    descKey: 'who.audience.business.desc',
    tone: 'amber',
  },
  {
    icon: Lightbulb,
    label: 'Entrepreneurs',
    journey: 'Idea → Validation → Model → Execution',
    descKey: 'who.audience.entrepreneurs.desc',
    tone: 'violet',
  },
]

const toneRing: Record<Audience['tone'], string> = {
  emerald: 'hover:border-emerald-500/60',
  cyan: 'hover:border-cyan-500/60',
  amber: 'hover:border-amber-500/60',
  violet: 'hover:border-violet-500/60',
}
const toneIcon: Record<Audience['tone'], string> = {
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
}
const toneFlow: Record<Audience['tone'], string> = {
  emerald: 'text-emerald-600 dark:text-emerald-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
  amber: 'text-amber-600 dark:text-amber-400',
  violet: 'text-violet-600 dark:text-violet-400',
}

export function WhoWeHelpSection() {
  const { t, lang } = useLang()
  return (
    <section
      id="who-we-help"
      className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="who-we-help-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <Users className="h-3.5 w-3.5" />
            {t('who.eyebrow')}
          </div>
          <h2
            id="who-we-help-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('who.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              {t('who.heading2')}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('who.subtitle')}
          </p>
        </Reveal>

        {/* Audience cards — 2 columns on desktop */}
        <div className="grid gap-5 sm:grid-cols-2">
          {audiences.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div
                key={a.descKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group flex flex-col rounded-2xl border border-border/60 bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7 ${toneRing[a.tone]}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${toneIcon[a.tone]}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-heading text-3xl font-extrabold text-foreground/5">
                    {`0${i + 1}`}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-lg font-extrabold tracking-tight text-foreground">
                  {AUDIENCE_LABELS[lang][i]}
                </h3>

                {/* Journey flow — the desired transformation path */}
                <p className={`mt-2 font-mono text-[11px] font-bold uppercase tracking-wider ${toneFlow[a.tone]}`}>
                  {JOURNEY_LABELS[lang][i]}
                </p>

                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {t(a.descKey)}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Section-level StoryBrand principle — shown ONCE, not on each card */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[11px] italic text-muted-foreground/70">
            Customer = Hero · NGS = Guide
          </p>
        </Reveal>

        {/* Soft CTA — no "Join Now", only exploration */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/#lead-form"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-background px-6 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/40 hover:shadow-md dark:text-emerald-300 dark:hover:bg-emerald-950/20"
              aria-label={t('who.cta')}
            >
              {t('who.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        {/* Brand tagline — bottom anchor */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex items-center justify-center gap-4 text-muted-foreground/40">
            <span className="h-px w-8 bg-border/60" aria-hidden />
            <p className="whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.4em]">
              LEARN · GROW · BUILD · TOGETHER
            </p>
            <span className="h-px w-8 bg-border/60" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default WhoWeHelpSection
