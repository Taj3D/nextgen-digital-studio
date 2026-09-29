'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { FAQS } from '@/lib/site-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQ() {
  const { t, lang } = useLang()

  return (
    <SectionShell id="faq" className="relative">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>{t('faq.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('faq.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('faq.subtitle')}
        </p>
      </Reveal>

      {/* Accordion */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto mt-12 max-w-3xl"
      >
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm px-6 sm:px-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/60"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-emerald-500 hover:no-underline py-5">
                  {lang === 'bn' ? item.q.bn : item.q.en}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {lang === 'bn' ? item.a.bn : item.a.en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </SectionShell>
  )
}

export default FAQ
