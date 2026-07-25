'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Clock,
  Repeat,
  TrendingDown,
  CalendarOff,
  StarOff,
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

type PainItem = {
  icon: LucideIcon
  titleKey: string
  descKey: string
  costKey: string
}

const items: PainItem[] = [
  { icon: Clock, titleKey: 'pain.item1Title', descKey: 'pain.item1Desc', costKey: 'pain.cost1' },
  { icon: Repeat, titleKey: 'pain.item2Title', descKey: 'pain.item2Desc', costKey: 'pain.cost2' },
  { icon: TrendingDown, titleKey: 'pain.item3Title', descKey: 'pain.item3Desc', costKey: 'pain.cost3' },
  { icon: AlertTriangle, titleKey: 'pain.item4Title', descKey: 'pain.item4Desc', costKey: 'pain.cost4' },
  { icon: CalendarOff, titleKey: 'pain.item5Title', descKey: 'pain.item5Desc', costKey: 'pain.cost5' },
  { icon: StarOff, titleKey: 'pain.item6Title', descKey: 'pain.item6Desc', costKey: 'pain.cost6' },
]

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function PainPointsSection() {
  const { t } = useLang()

  return (
    <SectionShell id="pain" className="relative" aria-label={t('aria.painPoints')}>
      {/* Section header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('pain.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('pain.subtitle')}
        </p>
      </Reveal>

      {/* Pain cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div key={i} variants={staggerItem}>
              <Card className="h-full border-amber-500/20 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5">
                <CardContent className="flex flex-col gap-3 px-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                      {t(item.costKey)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Total consequence banner */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 to-amber-500/10 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            {t('pain.totalLabel')}
          </p>
          <p className="mt-2 text-4xl sm:text-5xl font-bold gradient-text">
            {t('pain.totalValue')}
          </p>
          <button
            onClick={() => scrollToId('lead-form')}
            className="mt-5 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            {t('pain.totalCta')}
          </button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default PainPointsSection
