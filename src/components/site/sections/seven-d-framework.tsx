'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Target,
  Stethoscope,
  AlertTriangle,
  Flag,
  Compass,
  Rocket,
  ArrowRight,
  Layers,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

/**
 * NGS 7D Diagnostic Framework — compact homepage section.
 *
 * Source-verified definitions from /consulting page (SECTION 08).
 * DO NOT modify wording — keep EXACT definitions:
 *
 *   1. DISCOVER — "বর্তমান Situation এবং context বোঝা"
 *   2. DEFINE — "Problem এবং Desired Outcome পরিষ্কার করা"
 *   3. DIAGNOSE — "আসল Problem এবং সম্ভাব্য Root Cause বিশ্লেষণ"
 *   4. DETECT — "Bottleneck এবং highest-impact constraint খুঁজে বের করা"
 *   5. DECIDE — "কোন Problem আগে solve করতে হবে তা নির্ধারণ"
 *   6. DESIGN — "Strategy এবং Action Direction তৈরি করা"
 *   7. DEPLOY — "বাস্তব Implementation-এর দিকে এগিয়ে যাওয়া"
 *
 * Headline (fixed by brief):
 *   "NGS 7D Diagnostic Framework"
 * Subheading (fixed by brief):
 *   "NGS random advice দেয় না; problem বুঝে structured direction তৈরি করে।"
 *
 * Layout: 7 compact cards — 4+3 on desktop (col-span trick), stacked on mobile.
 * Kept visually compact per brief — NOT too large.
 */

type DStep = {
  n: string
  label: string
  descKey: string
  icon: typeof Search
}

const steps: DStep[] = [
  { n: '01', label: 'DISCOVER', descKey: 'framework7d.step1.desc', icon: Search },
  { n: '02', label: 'DEFINE', descKey: 'framework7d.step2.desc', icon: Target },
  { n: '03', label: 'DIAGNOSE', descKey: 'framework7d.step3.desc', icon: Stethoscope },
  { n: '04', label: 'DETECT', descKey: 'framework7d.step4.desc', icon: AlertTriangle },
  { n: '05', label: 'DECIDE', descKey: 'framework7d.step5.desc', icon: Flag },
  { n: '06', label: 'DESIGN', descKey: 'framework7d.step6.desc', icon: Compass },
  { n: '07', label: 'DEPLOY', descKey: 'framework7d.step7.desc', icon: Rocket },
]

export function SevenDFrameworkSection() {
  const { t } = useLang()
  return (
    <section
      id="seven-d-framework"
      className="scroll-mt-20 relative overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="seven-d-framework-heading"
    >
      {/* Premium dark backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-emerald-950/20" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header — compact */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <Layers className="h-3.5 w-3.5" />
            {t('framework7d.eyebrow')}
          </div>
          <h2
            id="seven-d-framework-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.25rem]"
          >
            {t('framework7d.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-cyan-300">
              {t('framework7d.heading2')}
            </span>{' '}
            {t('framework7d.heading3')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('framework7d.subtitle')}
          </p>
        </Reveal>

        {/* 7 compact cards — 4+3 layout on desktop, 2-col on tablet, 1-col on mobile */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            // Last 3 cards center themselves on desktop via lg:col-span trick.
            // Layout: row 1 = 4 cards (i=0..3), row 2 = 3 cards (i=4..6) centered
            // We achieve centering by adding left margin offset on the first
            // card of the second row at lg breakpoint.
            const isFirstOfSecondRow = i === 4
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-50/30 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-emerald-950/15 ${isFirstOfSecondRow ? 'lg:col-start-2' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-base font-extrabold tracking-tight text-emerald-700 dark:text-emerald-300">
                    {step.label}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
                {/* Step number — subtle bottom-right */}
                <span className="pointer-events-none absolute bottom-2 right-3 font-heading text-3xl font-extrabold text-emerald-600/10 dark:text-emerald-400/10">
                  {step.n}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Soft CTA — Explore Consulting */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/consulting"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-background px-6 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/40 hover:shadow-md dark:text-emerald-300 dark:hover:bg-emerald-950/20"
              aria-label={t('framework7d.cta')}
            >
              {t('framework7d.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-center text-[10px] italic text-muted-foreground">
            {t('framework7d.footer')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default SevenDFrameworkSection
