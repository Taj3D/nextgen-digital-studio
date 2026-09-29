'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mic, Users, ArrowRight, Sparkles, Calendar } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { waLink } from '@/lib/whatsapp'
import { useLang } from '@/components/site/language-provider'

/**
 * Speaking & Workshops — compact homepage section.
 *
 * CRITICAL: Do NOT claim:
 *   - Number of events
 *   - Number of attendees
 *   - Previous institutions
 *   - Corporate clients
 *   - Workshop history
 *   - Audience size
 *
 * Topic areas shown are POTENTIAL topic areas only — not a track record.
 *
 * CTA "Invite for Workshop / Speaking →" uses waLink(undefined, 'workshop')
 * from '@/lib/whatsapp' (workshop-specific WhatsApp deep link).
 *
 * Governance:
 *   - Founder name = "MD Nazmul Islam Taj".
 *   - No fabricated counts / no fake social proof.
 */

type LangCode = 'en' | 'bn'

/** Inline audience translations — kept inline so no new translation keys are
 *  added (per v5.5.6-cleanup2 constraint). The component already used
 *  hardcoded English here; this fix makes BN render Bengali audience names. */
const AUDIENCE_LABELS: Record<LangCode, string[]> = {
  en: ['University', 'Corporate', 'Business Community', 'Students', 'Entrepreneurs'],
  bn: ['বিশ্ববিদ্যালয়', 'কর্পোরেট', 'ব্যবসা কমিউনিটি', 'শিক্ষার্থী', 'উদ্যোক্তা'],
}

const TOPIC_LABELS: Record<LangCode, string[]> = {
  en: [
    'Business Mindset',
    'Entrepreneurship',
    'AI & Future of Work',
    'Digital Skills',
    'Productivity & Deep Work',
    'Strategy & Execution',
    'Personal Branding',
    'Business Growth',
    'AI for Business',
  ],
  bn: [
    'ব্যবসায়িক মানসিকতা',
    'উদ্যোক্তা হওয়া',
    'AI ও ভবিষ্যতের কাজ',
    'ডিজিটাল দক্ষতা',
    'উৎপাদনশীলতা ও গভীর কাজ',
    'কৌশল ও বাস্তবায়ন',
    'পার্সোনাল ব্র্যান্ডিং',
    'ব্যবসার প্রবৃদ্ধি',
    'ব্যবসার জন্য AI',
  ],
}

export function SpeakingWorkshopsSection() {
  const { t, lang } = useLang()
  const inviteHref = waLink(undefined, 'workshop')
  const topicAreas = TOPIC_LABELS[lang]
  const audienceGroups = AUDIENCE_LABELS[lang]

  return (
    <section
      id="speaking-workshops"
      className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="speaking-workshops-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <Mic className="h-3.5 w-3.5" />
            {t('speaking.eyebrow')}
          </div>
          <h2
            id="speaking-workshops-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('speaking.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-cyan-300">
              {t('speaking.heading2')}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('speaking.subtitle')}
          </p>
        </Reveal>

        {/* Audience groups — small chips */}
        <Reveal delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {audienceGroups.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground/90"
              >
                <Users className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                {g}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Topic areas — POTENTIAL only, not a track record */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-3 flex items-center justify-center gap-2 text-center">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                {t('speaking.potentialLabel')}
              </p>
            </div>
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
              {topicAreas.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] italic text-muted-foreground">
              {t('speaking.topicNote')}
            </p>
          </div>
        </Reveal>

        {/* CTA — WhatsApp workshop deep link */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={inviteHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] sm:w-auto"
              aria-label={t('speaking.cta')}
            >
              <Calendar className="h-4 w-4" />
              {t('speaking.cta')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            {t('speaking.disclaimer')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default SpeakingWorkshopsSection
