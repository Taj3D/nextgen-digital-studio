'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  PlayCircle,
  Calculator,
  FileBarChart,
  SearchCheck,
  MessageSquare,
  Download,
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
import { Card, CardContent } from '@/components/ui/card'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Cta = {
  icon: LucideIcon
  titleKey: string
  descKey: string
  target: string
}

const CTAS: Cta[] = [
  { icon: PlayCircle, titleKey: 'ecta.demo', descKey: 'ecta.demoDesc', target: 'ai-demo' },
  { icon: Calculator, titleKey: 'ecta.roi', descKey: 'ecta.roiDesc', target: 'roi-calculator' },
  { icon: FileBarChart, titleKey: 'ecta.case', descKey: 'ecta.caseDesc', target: 'case-studies' },
  { icon: SearchCheck, titleKey: 'ecta.audit', descKey: 'ecta.auditDesc', target: 'lead-form' },
  { icon: MessageSquare, titleKey: 'ecta.talk', descKey: 'ecta.talkDesc', target: 'ai-demo' },
  { icon: Download, titleKey: 'ecta.guide', descKey: 'ecta.guideDesc', target: 'resources-hub' },
]

export function EnterpriseCta() {
  const { t } = useLang()

  return (
    <SectionShell
      id="enterprise-cta"
      className="relative"
      aria-label={t('aria.enterpriseCta')}
    >
      {/* Header — centered */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Compass className="h-4 w-4 shrink-0" />
          <span>{t('ecta.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('ecta.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {t('ecta.subtitle')}
        </p>
      </Reveal>

      {/* 6 CTAs grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CTAS.map((cta, i) => {
          const Icon = cta.icon
          return (
            <motion.div key={i} variants={staggerItem}>
              <button
                type="button"
                onClick={() => scrollToId(cta.target)}
                className="group text-left w-full h-full"
                aria-label={t(cta.titleKey)}
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    {/* Icon */}
                    <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-soft text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title + desc */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {t(cta.titleKey)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {t(cta.descKey)}
                      </p>
                    </div>

                    {/* Arrow — animates on hover */}
                    <div className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </button>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default EnterpriseCta
