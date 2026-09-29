'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

type DayEntry = {
  titleKey: string
  descKey: string
}

const days: DayEntry[] = [
  { titleKey: 'how.day1Title', descKey: 'how.day1Desc' },
  { titleKey: 'how.day2Title', descKey: 'how.day2Desc' },
  { titleKey: 'how.day3Title', descKey: 'how.day3Desc' },
  { titleKey: 'how.day4Title', descKey: 'how.day4Desc' },
]

/** Split a "Day N — Title" string into [dayLabel, titleText] using em-dash. */
function splitDay(full: string): { dayLabel: string; titleText: string } {
  const idx = full.indexOf('—')
  if (idx === -1) return { dayLabel: full, titleText: '' }
  return {
    dayLabel: full.slice(0, idx).trim(),
    titleText: full.slice(idx + 1).trim(),
  }
}

export function HowItWorks() {
  const { t } = useLang()

  return (
    <SectionShell id="how" className="relative">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{t('how.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('how.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('how.subtitle')}
        </p>
      </Reveal>

      {/* Vertical timeline */}
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto mt-16 max-w-3xl"
      >
        {/* Vertical emerald line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/30 to-transparent"
        />

        {days.map((day, i) => {
          const { dayLabel, titleText } = splitDay(t(day.titleKey))
          return (
            <motion.li
              key={i}
              variants={staggerItem}
              className="relative border-l-2 border-emerald-500/30 pl-8 pb-10 last:pb-0"
            >
              {/* Dot */}
              <span
                aria-hidden
                className="absolute -left-[9px] top-2 h-4 w-4 rounded-full gradient-brand shadow-glow ring-4 ring-background"
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5">
                {/* Day badge */}
                <div className="mb-3 sm:mb-0 sm:shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-1.5 text-sm font-semibold text-white shadow-glow">
                    <Calendar className="h-3.5 w-3.5" />
                    {dayLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {titleText && (
                    <h3 className="text-xl font-semibold text-foreground">
                      {titleText}
                    </h3>
                  )}
                  {!titleText && (
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(day.titleKey)}
                    </h3>
                  )}
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {t(day.descKey)}
                  </p>
                </div>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </SectionShell>
  )
}

export default HowItWorks
