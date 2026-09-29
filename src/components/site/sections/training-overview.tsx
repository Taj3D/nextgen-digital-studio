'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Cpu,
  Wrench,
  Code,
  Megaphone,
  ArrowRight,
  GraduationCap,
  Repeat,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

/**
 * Training Overview — compact homepage section.
 *
 * Shows:
 *   - 4 training categories (verified routes only):
 *       1. AI & Digital Skills    → /ai-training  (icon: Cpu)
 *       2. CNC Design              → /cnc-training (icon: Wrench)
 *       3. Web Development         → category only (icon: Code)
 *       4. Digital Marketing       → category only (icon: Megaphone)
 *   - Verified training topics as chips
 *   - Learning philosophy: Learn → Practice → Apply → Improve
 *   - CTA "Explore Training →" → /ai-training
 *
 * Governance:
 *   - NO student counts, NO certificates, NO batch sizes,
 *     NO schedule, NO guarantees, NO "Join Now" / "Enroll Now".
 *   - Web Development & Digital Marketing have NO verified routes —
 *     shown as category cards only (no CTA link), with a small
 *     "Upcoming" label to be honest with the user.
 *   - Founder name = "MD Nazmul Islam Taj".
 */

type TrainingCategory = {
  icon: typeof Cpu
  label: string
  descKey: string
  href?: string
  upcoming?: boolean
}

const categories: TrainingCategory[] = [
  {
    icon: Cpu,
    label: 'AI & Digital Skills',
    descKey: 'training.cat.ai.desc',
    href: '/ai-training',
  },
  {
    icon: Wrench,
    label: 'CNC Design',
    descKey: 'training.cat.cnc.desc',
    href: '/cnc-training',
  },
  {
    icon: Code,
    label: 'Web Development',
    descKey: 'training.cat.web.desc',
  },
  {
    icon: Megaphone,
    label: 'Digital Marketing',
    descKey: 'training.cat.marketing.desc',
  },
]

// §2 note removed per ERMOS v5.3 — "More learning areas may be introduced over time"
// adds no verified value. No replacement future promise.

const trainingTopics: string[] = [
  'AI tools',
  'Prompt Engineering',
  'Custom GPT',
  'AI for Work',
  'ArtCAM',
  'V-Carve',
  'CNC Design',
  'Web Development',
  'Digital Marketing',
]

const philosophySteps: string[] = [
  'Learn',
  'Practice',
  'Apply',
  'Improve',
]

export function TrainingOverviewSection() {
  const { t } = useLang()
  return (
    <section
      id="training-overview"
      className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="training-overview-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <GraduationCap className="h-3.5 w-3.5" />
            {t('training.eyebrow')}
          </div>
          <h2
            id="training-overview-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('training.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              {t('training.heading2')}
            </span>{' '}
            {t('training.heading3')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('training.subtitle')}
          </p>
        </Reveal>

        {/* Categories — 2 columns desktop */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative flex flex-col rounded-2xl border border-border/60 bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  {cat.upcoming ? (
                    <span className="font-heading text-2xl font-extrabold text-foreground/5">
                      {`0${i + 1}`}
                    </span>
                  ) : (
                    <span className="font-heading text-2xl font-extrabold text-foreground/5">
                      {`0${i + 1}`}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-foreground">
                  {cat.label}
                </h3>
                <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-muted-foreground">
                  {t(cat.descKey)}
                </p>
                {cat.href && (
                  <Link
                    href={cat.href}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 transition-all group-hover:gap-2 dark:text-emerald-400"
                  >
                    {t('training.explore')}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Training topics — chips */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {t('training.topicsLabel')}
            </p>
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
              {trainingTopics.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Learning philosophy */}
        <Reveal delay={0.15}>
          <div className="mt-10 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-6">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {t('training.philosophyLabel')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {philosophySteps.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold text-foreground">
                    <Repeat className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {step}
                  </span>
                  {i < philosophySteps.length - 1 && (
                    <ArrowRight
                      className="h-3 w-3 text-emerald-500/60"
                      aria-hidden
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-3 text-center text-[10px] italic text-muted-foreground">
              {t('training.philosophyNote')}
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/ai-training"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] sm:w-auto"
              aria-label={t('training.cta')}
            >
              {t('training.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            {t('training.disclaimer')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default TrainingOverviewSection
