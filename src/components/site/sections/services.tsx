'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  Repeat,
  Bot,
  BarChart3,
  LayoutGrid,
  Check,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { SERVICES } from '@/lib/site-data'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/** Map homepage service id → dedicated service route slug. */
const SERVICE_SLUG_MAP: Record<string, string> = {
  'lead-capture': 'lead-generation',
  'follow-up': 'ai-sales-automation',
  'chatbot': 'ai-chat-agent',
  'full': 'crm-automation',
}

/** Map icon string from site-data to lucide component. */
const ICONS: Record<string, LucideIcon> = {
  Target,
  Repeat,
  Bot,
  BarChart3,
}

export function Services() {
  const { t, lang } = useLang()

  return (
    <SectionShell id="services" className="relative" aria-label="Services">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <LayoutGrid className="h-4 w-4 shrink-0" />
          <span>{t('services.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('services.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('services.subtitle')}
        </p>
      </Reveal>

      {/* Service cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SERVICES.map((service, i) => {
          const num = i + 1
          const Icon = ICONS[service.icon] ?? Target
          const titleKey = `services.s${num}Title`
          const descKey = `services.s${num}Desc`

          return (
            <motion.div key={service.id} variants={staggerItem}>
              <Link href={`/services/${SERVICE_SLUG_MAP[service.id] ?? 'ai-sales-automation'}`} className="block h-full group">
                <Card className="h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-emerald-500/40">
                  <CardContent className="flex flex-col gap-4 px-6">
                    {/* Icon */}
                    <div className="grid h-12 w-12 place-items-center rounded-xl gradient-brand-soft text-emerald-500">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title + desc */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                        {t(titleKey)}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {t(descKey)}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="mt-1 flex flex-col gap-2 border-t border-border/60 pt-4">
                      {service.features.map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{lang === 'bn' ? f.bn : f.en}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn more indicator */}
                    <div className="mt-auto pt-2 flex items-center gap-1 text-sm font-semibold text-emerald-500">
                      <span>{lang === 'bn' ? 'বিস্তারিত জানুন' : 'Learn more'}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default Services
