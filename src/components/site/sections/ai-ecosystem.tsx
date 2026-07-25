'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  MousePointerClick,
  Bot,
  Database,
  Workflow,
  Mail,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

const STEPS: { icon: LucideIcon; nameKey: string; descKey: string }[] = [
  { icon: Globe, nameKey: 'eco.s1', descKey: 'eco.s1d' },
  { icon: MousePointerClick, nameKey: 'eco.s2', descKey: 'eco.s2d' },
  { icon: Bot, nameKey: 'eco.s3', descKey: 'eco.s3d' },
  { icon: Database, nameKey: 'eco.s4', descKey: 'eco.s4d' },
  { icon: Workflow, nameKey: 'eco.s5', descKey: 'eco.s5d' },
  { icon: Mail, nameKey: 'eco.s6', descKey: 'eco.s6d' },
  { icon: ShoppingCart, nameKey: 'eco.s7', descKey: 'eco.s7d' },
  { icon: BarChart3, nameKey: 'eco.s8', descKey: 'eco.s8d' },
  { icon: TrendingUp, nameKey: 'eco.s9', descKey: 'eco.s9d' },
]

export function AiEcosystem() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // BN digit helper — converts ASCII digits to Bengali numerals.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  return (
    <SectionShell id="ai-ecosystem" className="relative" aria-label={t('aria.aiEcosystem')}>
      {/* Blueprint grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />

      <div className="relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Workflow className="h-4 w-4 shrink-0" />
            <span>{t('eco.eyebrow')}</span>
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('eco.title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t('eco.subtitle')}
          </p>
        </Reveal>

        {/* Connected flow of 9 nodes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 flex flex-col lg:flex-row flex-wrap items-stretch justify-center gap-3"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <React.Fragment key={i}>
                <motion.div
                  variants={staggerItem}
                  className="flex-1 min-w-[120px] max-w-[180px]"
                >
                  <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-border bg-card/60 p-4 text-center">
                    <div className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-white text-xs font-bold">
                      {bn(i + 1)}
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {t(step.nameKey)}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {t(step.descKey)}
                    </div>
                  </div>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center shrink-0"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4 text-emerald-500" />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default AiEcosystem
