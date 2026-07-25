'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Bot,
  Lightbulb,
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
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Module = {
  icon: LucideIcon
  titleKey: string
  descKey: string
  highlight?: boolean
}

const MODULES: Module[] = [
  {
    icon: GraduationCap,
    titleKey: 'os.module1Title',
    descKey: 'os.module1Desc',
  },
  {
    icon: Bot,
    titleKey: 'os.module2Title',
    descKey: 'os.module2Desc',
    highlight: true,
  },
  {
    icon: Lightbulb,
    titleKey: 'os.module3Title',
    descKey: 'os.module3Desc',
  },
]

const FLOW_KEYS = [
  'os.flow1',
  'os.flow2',
  'os.flow3',
  'os.flow4',
  'os.flow5',
  'os.flow6',
] as const

export function AiRevenueOs() {
  const { t } = useLang()

  return (
    <SectionShell
      id="ai-revenue-os"
      className="relative overflow-hidden"
      aria-label={t('aria.aiRevenueOs')}
    >
      {/* Premium background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      {/* ============ Part A — Header ============ */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Bot className="h-4 w-4 shrink-0" aria-hidden />
          {t('os.eyebrow')}
        </span>
        <h2 className="mt-5 gradient-text text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t('os.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('os.subtitle')}
        </p>
      </Reveal>

      {/* ============ Part B — 3 Division Cards ============ */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {MODULES.map((m) => {
          const Icon = m.icon
          return (
            <motion.div key={m.titleKey} variants={staggerItem} className="relative">
              {/* "Core" badge on the highlighted (middle) card */}
              {m.highlight && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Core
                  </span>
                </div>
              )}

              <Card
                className={`group h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow ${
                  m.highlight
                    ? 'ring-2 ring-emerald-500/40 border-emerald-500/30'
                    : ''
                }`}
              >
                <CardContent className="flex flex-col gap-4 px-6 py-8">
                  {/* Icon */}
                  <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand-soft text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t(m.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(m.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* ============ Part C — Product Ecosystem Flow ============ */}
      <Reveal delay={0.1} className="mt-14">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {FLOW_KEYS.map((key, i) => (
            <React.Fragment key={key}>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400">
                {t(key)}
              </span>
              {i < FLOW_KEYS.length - 1 && (
                <ArrowRight
                  className="h-4 w-4 text-emerald-500"
                  aria-hidden
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Reveal>

      {/* ============ Part D — CTA ============ */}
      <Reveal delay={0.15} className="mt-12 flex justify-center">
        <Button
          onClick={() => scrollToId('services')}
          size="lg"
          className="gradient-brand h-14 px-8 text-base text-white hover:opacity-95"
        >
          {t('os.cta')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default AiRevenueOs
