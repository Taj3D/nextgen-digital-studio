'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const STAGE_EMOJIS = ['📥', '✅', '⚡', '🔄', '📅', '💰', '📊', '📈']

const STAGE_KEYS = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1
  return {
    titleKey: `framework.stage${n}Title`,
    descKey: `framework.stage${n}Desc`,
  }
})

const bn = (s: string | number, isBn: boolean) =>
  isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

export function FrameworkSection() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <SectionShell
      id="framework"
      aria-label={t('aria.framework')}
      className="relative overflow-hidden"
    >
      {/* Premium background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('framework.eyebrow')}
        </span>
        <h2 className="mt-5 gradient-text text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t('framework.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('framework.subtitle')}
        </p>
      </Reveal>

      {/* 8-stage grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {STAGE_KEYS.map((stage, i) => (
          <motion.div key={stage.titleKey} variants={staggerItem}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-emerald-500/40">
              {/* Step number badge */}
              <span
                aria-hidden
                className="gradient-brand absolute left-4 top-4 grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white shadow-sm"
              >
                {bn(i + 1, isBn)}
              </span>

              {/* Emoji icon */}
              <div className="mt-2 text-4xl leading-none" aria-hidden>
                {STAGE_EMOJIS[i]}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-base sm:text-lg font-bold text-foreground">
                {t(stage.titleKey)}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(stage.descKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button
          onClick={() => scrollToId('services')}
          size="lg"
          className="gradient-brand h-14 px-8 text-base text-white hover:opacity-95"
        >
          {t('framework.cta')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default FrameworkSection
