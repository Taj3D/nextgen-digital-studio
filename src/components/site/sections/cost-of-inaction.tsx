'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Reveal,
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

const stats = [
  {
    label: 'cost.lostLeadsLabel',
    value: 'cost.lostLeadsValue',
    money: 'cost.lostLeadsMoney',
  },
  {
    label: 'cost.followupLabel',
    value: 'cost.followupValue',
    money: 'cost.followupMoney',
  },
  {
    label: 'cost.afterHoursLabel',
    value: 'cost.afterHoursValue',
    money: 'cost.afterHoursMoney',
  },
] as const

export function CostOfInactionSection() {
  const { t } = useLang()

  return (
    <section
      id="cost"
      className="relative overflow-hidden bg-card py-20 sm:py-24 lg:py-28"
      aria-label="Cost of Inaction"
    >
      {/* Dotted overlay for urgent tone */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {t('cost.title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t('cost.subtitle')}
          </p>
        </Reveal>

        {/* Big stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-red-500/20 bg-background/60 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40">
                {/* Decorative red glow */}
                <div className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-red-500/10 blur-2xl" aria-hidden />
                <p className="relative text-sm text-muted-foreground uppercase tracking-wider">
                  {t(s.label)}
                </p>
                <p className="relative mt-3 text-5xl sm:text-6xl font-bold text-red-400">
                  {t(s.value)}
                </p>
                <p className="relative mt-3 text-emerald-400 font-semibold">
                  {t(s.money)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <Button
            onClick={() => scrollToId('lead-form')}
            className="gradient-brand animate-pulse-glow h-14 px-8 text-base text-white hover:opacity-95"
            size="lg"
          >
            {t('cost.cta')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default CostOfInactionSection
