'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { TESTIMONIALS, type Testimonial } from '@/lib/site-data'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const { lang } = useLang()
  const name = lang === 'bn' ? t.nameBn : t.name
  const role = lang === 'bn' ? t.roleBn : t.role
  const company = lang === 'bn' ? t.companyBn : t.company
  const quote = lang === 'bn' ? t.quoteBn : t.quote
  const metric = lang === 'bn' ? t.metricBn : t.metric

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
      {/* Top: avatar + name */}
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-brand text-white font-semibold text-sm shadow-glow">
          {t.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-foreground truncate">{name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {role} · {company}
          </div>
        </div>
      </div>

      {/* Stars */}
      <Stars rating={t.rating} />

      {/* Quote */}
      <div className="relative flex-1">
        <Quote
          className="absolute -top-1 -left-1 h-5 w-5 text-emerald-500/30"
          aria-hidden
        />
        <p className="pl-5 text-sm text-foreground/90 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Metric badge */}
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full gradient-brand-soft px-3 py-1.5 text-xs font-semibold text-emerald-500">
        <Star className="h-3 w-3 fill-emerald-500" />
        <span>{metric}</span>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { t } = useLang()

  return (
    <SectionShell id="testimonials" className="relative" aria-label="Testimonials">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-2 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Star className="h-4 w-4 shrink-0 fill-amber-400" />
          <span>{t('testimonials.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('testimonials.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('testimonials.subtitle')}
        </p>
      </Reveal>

      {/* Testimonial grid: mobile horizontal scroll, desktop 3-col grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 custom-scrollbar lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
      >
        {TESTIMONIALS.map((item) => (
          <motion.div
            key={item.id}
            variants={staggerItem}
            className="min-w-[85%] snap-start sm:min-w-[60%] lg:min-w-0"
          >
            <TestimonialCard t={item} />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

export default Testimonials
