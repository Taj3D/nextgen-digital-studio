'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

type LangCode = 'en' | 'bn'

/** Inline category-label translations — matches navbar conventions. */
const CATEGORY_LABELS: Record<LangCode, string[]> = {
  en: ['General', 'Consulting', 'Training', 'Digital Solutions', 'Free English'],
  bn: ['সাধারণ', 'কনসালটিং', 'ট্রেইনিং', 'ডিজিটাল সলিউশনস', 'ফ্রি ইংলিশ'],
}

/**
 * Homepage FAQ — accordion-style section.
 *
 * 5 categories × 2 questions = 10 total Q&As.
 *
 * Categories:
 *   1. GENERAL
 *   2. CONSULTING
 *   3. TRAINING
 *   4. DIGITAL SOLUTIONS
 *   5. FREE ENGLISH
 *
 * Pattern: each category has a small label badge, then its own collapsible
 * Q&A items. Uses a controlled accordion with ChevronDown rotation.
 *
 * Governance:
 *   - All copy is fixed/hardcoded (Banglish mix — Bangla + English).
 *   - No fabricated schedule/duration/certificate/student count.
 *   - No "Join Now" / "Enroll Now" / "Limited Seats".
 *   - Founder name = "MD Nazmul Islam Taj" (not "Md.").
 */

type QA = {
  qKey: string
  aKey: string
}

type Category = {
  label: string
  items: QA[]
}

const categories: Category[] = [
  {
    label: 'General',
    items: [
      { qKey: 'faq.q1', aKey: 'faq.a1' },
      { qKey: 'faq.q2', aKey: 'faq.a2' },
    ],
  },
  {
    label: 'Consulting',
    items: [
      { qKey: 'faq.q3', aKey: 'faq.a3' },
      { qKey: 'faq.q4', aKey: 'faq.a4' },
    ],
  },
  {
    label: 'Training',
    items: [
      { qKey: 'faq.q5', aKey: 'faq.a5' },
      { qKey: 'faq.q6', aKey: 'faq.a6' },
    ],
  },
  {
    label: 'Digital Solutions',
    items: [
      { qKey: 'faq.q7', aKey: 'faq.a7' },
      { qKey: 'faq.q8', aKey: 'faq.a8' },
    ],
  },
  {
    label: 'Free English',
    items: [
      { qKey: 'faq.q9', aKey: 'faq.a9' },
      { qKey: 'faq.q10', aKey: 'faq.a10' },
    ],
  },
]

export function HomepageFAQSection() {
  const { t, lang } = useLang()
  // Track which questions are open. Format: `${catIdx}-${qIdx}`
  const [openKey, setOpenKey] = React.useState<string | null>('0-0')

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <section
      id="homepage-faq"
      className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="homepage-faq-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <HelpCircle className="h-3.5 w-3.5" />
            {t('faq.home.eyebrow')}
          </div>
          <h2
            id="homepage-faq-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('faq.home.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              {t('faq.home.heading2')}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('faq.home.subtitle')}
          </p>
        </Reveal>

        {/* Accordion groups — one per category */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm sm:p-5">
                {/* Category label badge */}
                <div className="mb-3 flex items-center gap-2">
                  <MessageCircleQuestion className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                    {CATEGORY_LABELS[lang][catIdx]}
                  </span>
                </div>

                {/* Q&A items */}
                <div className="divide-y divide-border/60">
                  {cat.items.map((qa, qIdx) => {
                    const key = `${catIdx}-${qIdx}`
                    const isOpen = openKey === key
                    return (
                      <div key={key} className="py-2 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-content-${key}`}
                          className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left transition-colors hover:bg-emerald-50/30 dark:hover:bg-emerald-950/15"
                        >
                          <span className="text-sm font-semibold text-foreground sm:text-base">
                            {t(qa.qKey)}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-300 dark:text-emerald-400 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-content-${key}`}
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <p className="px-2 pb-3 pt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                {t(qa.aKey)}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-[10px] italic text-muted-foreground">
            {t('faq.home.note')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default HomepageFAQSection
