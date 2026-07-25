'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle2, X, Check } from 'lucide-react'
import { Reveal, SectionShell, staggerContainer, staggerItem } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

const BEFORE_KEYS = [
  'transformation.before1',
  'transformation.before2',
  'transformation.before3',
  'transformation.before4',
  'transformation.before5',
  'transformation.before6',
] as const

const AFTER_KEYS = [
  'transformation.after1',
  'transformation.after2',
  'transformation.after3',
  'transformation.after4',
  'transformation.after5',
  'transformation.after6',
] as const

export function TransformationSection() {
  const { t } = useLang()

  return (
    <SectionShell id="transformation" aria-label="Business transformation">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('transformation.eyebrow')}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('transformation.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('transformation.subtitle')}
        </p>
      </Reveal>

      {/* Two-column comparison */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 lg:grid-cols-2"
      >
        {/* BEFORE — Today (Manual) */}
        <motion.div variants={staggerItem}>
          <div className="h-full rounded-2xl border border-rose-200 bg-rose-50/50 p-6 sm:p-8 dark:border-rose-900/50 dark:bg-rose-950/20">
            <div className="flex items-center gap-3 pb-4 border-b border-rose-200/70 dark:border-rose-900/50">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
                <XCircle className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300">
                {t('transformation.beforeTitle')}
              </h3>
            </div>
            <ul role="list" className="mt-5 space-y-3">
              {BEFORE_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm sm:text-base text-rose-900/80 dark:text-rose-100/80">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* AFTER — With AI (Automated) */}
        <motion.div variants={staggerItem}>
          <div className="h-full rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3 pb-4 border-b border-emerald-200/70 dark:border-emerald-900/50">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {t('transformation.afterTitle')}
              </h3>
            </div>
            <ul role="list" className="mt-5 space-y-3">
              {AFTER_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm sm:text-base text-emerald-900/80 dark:text-emerald-100/80">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Closing highlight band */}
      <Reveal delay={0.1} className="mt-10">
        <div className="gradient-brand-soft rounded-2xl border border-emerald-500/20 px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="mx-auto max-w-3xl text-lg sm:text-xl font-semibold italic text-foreground sm:text-2xl">
            &ldquo;{t('transformation.closing')}&rdquo;
          </p>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default TransformationSection
