'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, XCircle, CheckCircle2, X, Check } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Row keys — Traditional (rXT) and AI-Powered (rXA) pairs.
const ROW_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const

export function Comparison() {
  const { t } = useLang()

  return (
    <SectionShell
      id="comparison"
      className="relative"
      aria-label={t('aria.comparison')}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('cmp.eyebrow')}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('cmp.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('cmp.subtitle')}
        </p>
      </Reveal>

      {/* Two-column comparison */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {/* LEFT — Traditional (muted/gray) */}
        <motion.div variants={staggerItem}>
          <Card className="h-full border-border bg-muted/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/30">
            <div className="flex items-center gap-3 border-b border-border px-6 py-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-500">
                <XCircle className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="text-xl font-bold text-muted-foreground">
                {t('cmp.traditional')}
              </h3>
            </div>
            <ul role="list" className="space-y-4 px-6 py-6">
              {ROW_KEYS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-400">
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {t(`cmp.${r}T`)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* RIGHT — AI-Powered (emerald gradient-soft, highlighted) */}
        <motion.div variants={staggerItem} className="relative">
          {/* "Recommended" badge */}
          <div className="absolute -top-3 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t('cmp.aiPowered')}
            </span>
          </div>

          <Card className="h-full border-emerald-500/30 bg-emerald-500/5 ring-2 ring-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-glow">
            <div className="flex items-center gap-3 border-b border-emerald-500/20 px-6 py-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="text-xl font-bold text-foreground">
                {t('cmp.aiPowered')}
              </h3>
            </div>
            <ul role="list" className="space-y-4 px-6 py-6">
              {ROW_KEYS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-foreground">
                    {t(`cmp.${r}A`)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>

      {/* CTA */}
      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button
          onClick={() => scrollToId('lead-form')}
          size="lg"
          className="gradient-brand h-14 px-8 text-base text-white hover:opacity-95"
        >
          {t('cmp.cta')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default Comparison
