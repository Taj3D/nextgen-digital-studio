'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  MessageSquare,
  Cpu,
  Building2,
  Smile,
  Star,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'

type Metric = {
  icon: LucideIcon
  valueKey: string
  labelKey: string
}

const METRICS: Metric[] = [
  { icon: TrendingUp, valueKey: 'ent.revenueValue', labelKey: 'ent.revenueLabel' },
  { icon: MessageSquare, valueKey: 'ent.convValue', labelKey: 'ent.convLabel' },
  { icon: Cpu, valueKey: 'ent.sysValue', labelKey: 'ent.sysLabel' },
  { icon: Building2, valueKey: 'ent.indValue', labelKey: 'ent.indLabel' },
  { icon: Smile, valueKey: 'ent.satValue', labelKey: 'ent.satLabel' },
  { icon: Star, valueKey: 'ent.ratingValue', labelKey: 'ent.ratingLabel' },
  { icon: Activity, valueKey: 'ent.uptimeValue', labelKey: 'ent.uptimeLabel' },
]

export function EnterpriseNumbers() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // BN digit helper — converts ASCII digits to Bengali numerals.
  // Non-digit characters (৳, +, %, ★, comma, space) are left untouched.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  return (
    <SectionShell
      id="enterprise-numbers"
      className="relative"
      aria-label={t('aria.enterpriseNumbers')}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('ent.eyebrow')}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('ent.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('ent.subtitle')}
        </p>
      </Reveal>

      {/* 7-metric grid (4 + 3 on desktop, 3 per row on sm, 2 per row on mobile) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
      >
        {METRICS.map((m) => {
          const Icon = m.icon
          return (
            <motion.div key={m.valueKey} variants={staggerItem}>
              <Card className="group h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <CardContent className="flex flex-col gap-3 px-5 py-6">
                  {/* Icon — gradient-soft rounded square */}
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-soft text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>

                  {/* Big gradient value */}
                  <div className="mt-1 text-3xl sm:text-4xl font-bold gradient-text leading-tight">
                    {bn(t(m.valueKey))}
                  </div>

                  {/* Label */}
                  <div className="text-sm text-muted-foreground leading-snug">
                    {t(m.labelKey)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default EnterpriseNumbers
