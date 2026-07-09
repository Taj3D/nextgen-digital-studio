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
}

const items: PainItem[] = [
  { icon: Clock, titleKey: 'pain.item1Title', descKey: 'pain.item1Desc' },
  { icon: Repeat, titleKey: 'pain.item2Title', descKey: 'pain.item2Desc' },
  { icon: TrendingDown, titleKey: 'pain.item3Title', descKey: 'pain.item3Desc' },
  { icon: AlertTriangle, titleKey: 'pain.item4Title', descKey: 'pain.item4Desc' },
  { icon: CalendarOff, titleKey: 'pain.item5Title', descKey: 'pain.item5Desc' },
  { icon: StarOff, titleKey: 'pain.item6Title', descKey: 'pain.item6Desc' },
]

export function PainPointsSection() {
  const { t } = useLang()

  return (
    <SectionShell id="pain" className="relative">
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
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Icon className="h-6 w-6" />
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
    </SectionShell>
  )
}

export default PainPointsSection
