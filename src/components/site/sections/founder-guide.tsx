'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Brain,
  Cpu,
  GraduationCap,
  TrendingUp,
  Megaphone,
  Wrench,
  ArrowRight,
  Compass,
  Lightbulb,
  Repeat,
  X,
  Check,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

/**
 * Founder / Guide section — ERMOS Controlled Micro-Update.
 *
 * Per NGS StoryBrand architecture:
 *   Customer = HERO
 *   NGS = GUIDE
 *   Founder = GUIDE (not hero of customer's story)
 *
 * Positioning: "Guide, not Guru."
 *
 * DO NOT reintroduce fabricated claims (years, client counts, revenue,
 * ratings, awards, etc.) — ERMOS §10. Areas of Focus are NOT credentials.
 */

const FOCUS_AREAS = [
  { icon: Compass, label: 'Digital Strategy' },
  { icon: Cpu, label: 'AI & Automation' },
  { icon: GraduationCap, label: 'Digital Skills' },
  { icon: TrendingUp, label: 'Business Growth' },
  { icon: Megaphone, label: 'Marketing' },
  { icon: Wrench, label: 'Technology & Implementation' },
] as const

export function FounderGuideSection() {
  const { t } = useLang()

  const PRINCIPLES = [
    {
      n: '01',
      t: t('founder.p1.title'),
      d: t('founder.p1.desc'),
      icon: Brain,
    },
    {
      n: '02',
      t: t('founder.p2.title'),
      d: t('founder.p2.desc'),
      icon: Lightbulb,
    },
    {
      n: '03',
      t: t('founder.p3.title'),
      d: t('founder.p3.desc'),
      icon: Repeat,
    },
  ] as const

  return (
    <section
      id="founder-guide"
      className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="founder-guide-heading"
    >
      {/* Decorative background — subtle premium feel, no clutter */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <Compass className="h-3.5 w-3.5" />
            {t('founder.eyebrow')}
          </div>
          <h2
            id="founder-guide-heading"
            className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('founder.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              {t('founder.heading2')}
            </span>
          </h2>
        </Reveal>

        {/* Founder composition — two-column desktop / stacked mobile */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* LEFT — Founder portrait */}
          <Reveal>
            <div className="mx-auto max-w-[360px] lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-card shadow-2xl shadow-emerald-900/10"
              >
                {/* Premium accent strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400" />

                {/* Founder image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <Image
                    src="/founder.png"
                    alt="MD Nazmul Islam Taj — Founder, NextGen Digital Studio"
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={false}
                  />
                  {/* Subtle bottom gradient for premium feel */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent"
                    aria-hidden
                  />
                </div>

                {/* Identity strip */}
                <div className="bg-background/95 px-5 py-4 backdrop-blur-sm">
                  <p className="font-heading text-lg font-extrabold text-foreground">
                    MD Nazmul Islam Taj
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                    Founder | NextGen Digital Studio
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                      Guide, not Guru.
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* RIGHT — Philosophy + Areas of Focus + Principles + Comparison + CTA */}
          <Reveal delay={0.1}>
            <div className="space-y-8">
              {/* Core copy */}
              <div>
                <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {t('founder.coreCopy')}
                </p>
              </div>

              {/* Areas of Focus */}
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('founder.focusLabel')}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-3 py-2.5 text-xs font-medium text-foreground/90 transition-colors hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/15"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder Thinking Principles */}
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('founder.principlesLabel')}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PRINCIPLES.map(({ n, t: pt, d, icon: Icon }) => (
                    <div
                      key={n}
                      className="rounded-2xl border border-border/60 bg-background p-4 transition-colors hover:border-emerald-500/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-2xl font-extrabold text-emerald-600/30 dark:text-emerald-400/30">
                          {n}
                        </span>
                        <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground">
                        {pt}
                      </h3>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Random Advice vs Structured Guidance — compact comparison */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/30 bg-rose-50/30 p-5 dark:bg-rose-950/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600">
                    {t('founder.randomLabel')}
                  </p>
                  <p className="mt-2 text-sm italic text-muted-foreground">{t('founder.randomQuote')}</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                    {t('founder.structuredLabel')}
                  </p>
                  <p className="mt-2 text-sm italic text-foreground">
                    {t('founder.structuredQuote')}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/consulting"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  aria-label={t('founder.ctaPrimary')}
                >
                  {t('founder.ctaPrimary')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-background px-6 py-3 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/40 hover:shadow-md dark:text-emerald-300 dark:hover:bg-emerald-950/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  aria-label={t('founder.ctaSecondary')}
                >
                  {t('founder.ctaSecondary')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Brand tagline — bottom anchor */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex items-center justify-center gap-4 text-muted-foreground/40">
            <span className="h-px w-10 bg-border/60" aria-hidden />
            <p className="whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.4em]">
              LEARN · GROW · BUILD · TOGETHER
            </p>
            <span className="h-px w-10 bg-border/60" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default FounderGuideSection
