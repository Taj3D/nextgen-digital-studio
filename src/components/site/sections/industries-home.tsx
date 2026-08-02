'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionShell, staggerContainer, staggerItem } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { INDUSTRIES } from '@/lib/site-data'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function IndustriesSection() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <SectionShell id="industries" aria-label={t('aria.industries')}>
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('industriesHome.eyebrow')}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('industriesHome.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('industriesHome.subtitle')}
        </p>
      </Reveal>

      {/* 9-card grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
      >
        {INDUSTRIES.map((ind) => (
          <motion.div key={ind.slug} variants={staggerItem}>
            <div className="group h-full rounded-2xl border border-border/60 bg-card/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg">
              <div
                className="text-4xl leading-none transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                {ind.icon}
              </div>
              <h3 className="mt-3 text-base sm:text-lg font-bold text-foreground">
                {isBn ? ind.nameBn : ind.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {isBn ? ind.descBn : ind.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA — exit point to lead form */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => scrollToId('lead-form')}
            className="gradient-brand text-white"
            size="lg"
          >
            {isBn ? 'আপনার ইন্ডাস্ট্রি শুরু করুন' : 'Start in Your Industry'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default IndustriesSection
