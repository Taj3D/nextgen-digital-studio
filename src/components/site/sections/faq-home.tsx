'use client'

import * as React from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { faqs, FAQ_CATEGORIES, type FaqCategory } from '@/lib/site-data'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function FaqSection() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // SSR-safe initial state — constants only, no Math.random / Date.
  const [activeCat, setActiveCat] = React.useState<FaqCategory>('general')
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const catLabels: Record<FaqCategory, string> = {
    general: t('faqHome.catGeneral'),
    pricing: t('faqHome.catPricing'),
    implementation: t('faqHome.catImplementation'),
    support: t('faqHome.catSupport'),
  }

  const filtered = faqs.filter((f) => (f.category ?? 'general') === activeCat)

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i))

  const handleCatChange = (cat: FaqCategory) => {
    setActiveCat(cat)
    setOpenIndex(null)
  }

  return (
    <SectionShell id="faq" aria-label="Frequently asked questions">
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <Reveal>
          <Eyebrow>{t('faqHome.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('faqHome.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('faqHome.subtitle')}</p>
        </Reveal>
      </div>

      {/* Category filter */}
      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FAQ_CATEGORIES.map((cat) => {
            const active = cat === activeCat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCatChange(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'gradient-brand text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                }`}
                aria-pressed={active}
              >
                {catLabels[cat]}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* FAQ list */}
      <div className="mx-auto max-w-3xl flex flex-col gap-3">
        {filtered.map((f, i) => {
          const isOpen = openIndex === i
          return (
            <Reveal key={`${activeCat}-${i}`} delay={i * 0.04}>
              <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-base font-semibold text-foreground">
                    {isBn ? f.qBn : f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {isBn ? f.aBn : f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Bottom note — strategy call CTA */}
      <Reveal delay={0.1}>
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => scrollToId('lead-form')}
            variant="outline"
            className="border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
            size="lg"
          >
            {t('kb.bookCallLink')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default FaqSection
