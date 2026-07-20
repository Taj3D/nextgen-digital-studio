'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Mail, CheckCircle, ArrowRight, type LucideIcon } from 'lucide-react'
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

type Step = {
  num: number
  icon: LucideIcon
  titleKey: string
  descKey: string
}

const steps: Step[] = [
  { num: 1, icon: Zap, titleKey: 'solution.step1Title', descKey: 'solution.step1Desc' },
  { num: 2, icon: Mail, titleKey: 'solution.step2Title', descKey: 'solution.step2Desc' },
  { num: 3, icon: CheckCircle, titleKey: 'solution.step3Title', descKey: 'solution.step3Desc' },
]

export function Solution() {
  const { t } = useLang()

  return (
    <SectionShell id="solution" className="relative">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>{t('solution.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('solution.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('solution.subtitle')}
        </p>
      </Reveal>

      {/* 3-step flow */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6"
      >
        {/* Connecting line (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent md:block"
        />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              className="relative flex flex-col items-center text-center"
            >
              {/* Numbered circle */}
              <div className="relative grid h-16 w-16 place-items-center rounded-full gradient-brand shadow-glow">
                <span className="text-2xl font-bold text-white">{step.num}</span>
              </div>

              {/* Connecting arrow dot (desktop, between cards) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-7 hidden h-2 w-2 rounded-full bg-emerald-500/60 md:block"
                  style={{ left: 'calc(50% + 40px)' }}
                />
              )}

              {/* Icon */}
              <div className="mt-5 grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {t(step.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t(step.descKey)}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA */}
      <Reveal delay={0.2} className="mt-14 flex justify-center">
        <Button
          variant="outline"
          onClick={() => scrollToId('services')}
          className="h-12 px-7 border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
          size="lg"
        >
          {t('solution.cta')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default Solution
