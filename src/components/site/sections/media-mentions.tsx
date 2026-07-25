'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

// Bangladeshi publications — rendered as styled text "logo" chips
// (we don't ship real logos, so we use a uniform grayscale treatment).
const MEDIA_LOGOS: string[] = [
  'Daily Star',
  'Prothom Alo',
  'The Business Standard',
  'BSS',
  'Dhaka Tribune',
  'YourStory BD',
]

// Generic but plausible client names across the verticals we serve.
const CLIENT_LOGOS: string[] = [
  'Apex Real Estate',
  'MediCare BD',
  'ShopZilla',
  'EduPro Academy',
  'Globe Properties',
  'FreshCart',
  'UrbanNest',
  'HealthPlus',
  'ByteCraft',
  'Skyline Devs',
]

export function MediaMentions() {
  const { t } = useLang()

  return (
    <SectionShell
      id="media-mentions"
      className="relative"
      aria-label={t('aria.mediaMentions')}
    >
      {/* ===================== Part A — As Featured In ===================== */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('media.eyebrow')}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('media.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('media.subtitle')}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {MEDIA_LOGOS.map((name) => (
            <div
              key={name}
              className="bg-muted/40 border border-border rounded-lg px-5 py-3 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider transition-colors hover:border-emerald-500/30 hover:text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Divider */}
      <div className="my-16 h-px w-full bg-border" aria-hidden />

      {/* ===================== Part B — Trusted By ===================== */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-500">
          {t('media.clientsEyebrow')}
        </span>
        <h3 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('media.clientsTitle')}
        </h3>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('media.clientsSubtitle')}
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
      >
        {CLIENT_LOGOS.map((name) => (
          <motion.div key={name} variants={staggerItem}>
            <div className="bg-muted/40 border border-border rounded-lg px-4 py-5 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:text-foreground">
              {name}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

export default MediaMentions
