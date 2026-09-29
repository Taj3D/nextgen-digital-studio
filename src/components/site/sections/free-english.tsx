'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Gift,
  Mic,
  MessageCircle,
  Target,
  TrendingUp,
  HelpCircle,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { Button } from '@/components/ui/button'
import { useLang } from '@/components/site/language-provider'

/**
 * Free English Speaking Initiative — Homepage (Marketing Strategy v2 micro-update).
 *
 * ERMOS controlled change. Compact homepage structure preserved per previous §22.
 * Strengthened value proposition per §03-§06:
 *   - "Why this matters" block (§03)
 *   - 4-part Value Stack: SPEAK / COMMUNICATE / BUILD CONFIDENCE / GROW (§04)
 *   - Student Problem → Value Map (§05) — customer recognition, no shaming
 *   - Student Journey EXPLORE step (§06) — future learning opportunities (NOT auto-conversion)
 *
 * CTA destinations per §11:
 *   - Primary "Explore Free English Initiative" → /free-english-course
 *   - Secondary "Register Interest" → /free-english-course#register-interest
 *     (dedicated page form preserves student-specific segmentation data)
 *
 * Governance (ERMOS §02 from previous):
 *   - DO NOT invent schedule/duration/teacher count/students/certificate/exam/score
 *   - CTA: "Register Interest" / "Register Your Interest" (NOT "Join Now")
 *   - Use "focus", "practice", "opportunity", "development" language
 *   - Avoid guaranteed outcomes
 *   - No career/job/freelancing income/IELTS-TOEFL claims
 */
export function FreeEnglishSection() {
  const { t } = useLang()

  const valueStack = [
    {
      n: '01',
      t: 'SPEAK',
      d: t('freeEnglish.value1.desc'),
      icon: Mic,
    },
    {
      n: '02',
      t: 'COMMUNICATE',
      d: t('freeEnglish.value2.desc'),
      icon: MessageCircle,
    },
    {
      n: '03',
      t: 'BUILD CONFIDENCE',
      d: t('freeEnglish.value3.desc'),
      icon: Target,
    },
    {
      n: '04',
      t: 'GROW',
      d: t('freeEnglish.value4.desc'),
      icon: TrendingUp,
    },
  ]

  const problemMap = [
    { p: t('freeEnglish.problem1'), v: 'Speaking Practice' },
    { p: t('freeEnglish.problem2'), v: 'Conversation Practice' },
    { p: t('freeEnglish.problem3'), v: 'Confidence Building' },
    { p: t('freeEnglish.problem4'), v: 'Regular Practice' },
  ]

  return (
    <section
      id="free-english"
      className="scroll-mt-20 relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Premium dark background per design system #050505 with accent glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-background to-cyan-950/30" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          {/* EYEBROW per §03 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            <Gift className="h-3.5 w-3.5" />
            {t('freeEnglish.eyebrow')}
          </div>

          {/* HEADLINE per §03 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('freeEnglish.heading1')} <span className="text-emerald-500">{t('freeEnglish.heading2')}</span>
          </motion.h2>

          {/* SUBHEAD per §03 */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('freeEnglish.subtitle')}
          </p>

          {/* WHY THIS MATTERS per §03 */}
          <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-50/30 px-5 py-4 text-left dark:bg-emerald-950/15">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('freeEnglish.why1')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t('freeEnglish.why2')}
            </p>
          </div>
        </Reveal>

        {/* VALUE STACK per §04 — 4-part value structure */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueStack.map(({ n, t: vt, d, icon: Icon }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-extrabold text-emerald-600/30 dark:text-emerald-400/30">
                    {n}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground">{vt}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* STUDENT PROBLEM → VALUE MAP per §05 — customer recognition, no shaming */}
        <Reveal delay={0.15}>
          <div className="mt-12">
            <h3 className="text-center font-heading text-xl font-bold text-foreground sm:text-2xl">
              {t('freeEnglish.mapHeading')}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-xs text-muted-foreground">
              {t('freeEnglish.mapSub')}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {problemMap.map(({ p, v }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="rounded-xl border border-border/60 bg-background p-4 text-center transition-colors hover:border-emerald-500/40"
                >
                  <p className="text-xs italic text-muted-foreground">&ldquo;{p}&rdquo;</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <ArrowRight className="h-3 w-3 text-emerald-500/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {v}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] italic text-muted-foreground">
              {t('freeEnglish.mapNote')}
            </p>
          </div>
        </Reveal>

        {/* CTA per §10 + §11 */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/free-english-course"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:scale-[1.02] sm:w-auto"
              aria-label={t('freeEnglish.ctaPrimary')}
            >
              {t('freeEnglish.ctaPrimary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/free-english-course#register-interest"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-background px-7 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/40 dark:text-emerald-300 dark:hover:bg-emerald-950/20 sm:w-auto"
              aria-label={t('freeEnglish.ctaSecondary')}
            >
              <Sparkles className="h-4 w-4" />
              {t('freeEnglish.ctaSecondary')}
            </Link>
          </div>
          <p className="mt-5 text-center text-xs italic text-muted-foreground">
            {t('freeEnglish.disclaimer')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
