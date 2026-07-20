'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  MapPin,
  ShieldCheck,
  Wrench,
  Users,
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

const REASONS: { icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { icon: MapPin, titleKey: 'why.r1Title', descKey: 'why.r1Desc' },
  { icon: ShieldCheck, titleKey: 'why.r2Title', descKey: 'why.r2Desc' },
  { icon: Wrench, titleKey: 'why.r3Title', descKey: 'why.r3Desc' },
  { icon: Users, titleKey: 'why.r4Title', descKey: 'why.r4Desc' },
]

export function WhyChooseUs() {
  const { t } = useLang()

  return (
    <SectionShell id="why" className="relative" aria-label="Why Choose Us">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Award className="h-4 w-4 shrink-0" />
          <span>{t('why.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('why.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('why.subtitle')}
        </p>
      </Reveal>

      {/* Reason cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {REASONS.map((r, i) => {
          const Icon = r.icon
          return (
            <motion.div key={i} variants={staggerItem}>
              <Card className="group h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <CardContent className="flex flex-col gap-4 px-6">
                  {/* Icon */}
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-brand-soft text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(r.titleKey)}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {t(r.descKey)}
                    </p>
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

export default WhyChooseUs
