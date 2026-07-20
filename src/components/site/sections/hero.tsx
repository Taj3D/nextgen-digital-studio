'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const orbs = [
  {
    className: 'bg-emerald-500/30',
    size: 'h-72 w-72 sm:h-96 sm:w-96',
    pos: '-top-24 -left-24',
    delay: 0,
    dur: 9,
  },
  {
    className: 'bg-teal-500/30',
    size: 'h-80 w-80 sm:h-[28rem] sm:w-[28rem]',
    pos: 'top-32 -right-28',
    delay: 1.5,
    dur: 11,
  },
  {
    className: 'bg-amber-400/25',
    size: 'h-64 w-64 sm:h-80 sm:w-80',
    pos: '-bottom-24 left-1/3',
    delay: 3,
    dur: 10,
  },
]

const stats = [
  { value: 'hero.stat1Value', label: 'hero.stat1Label' },
  { value: 'hero.stat2Value', label: 'hero.stat2Label' },
  { value: 'hero.stat3Value', label: 'hero.stat3Label' },
  { value: 'hero.stat4Value', label: 'hero.stat4Label' },
] as const

export function HeroSection() {
  const { t } = useLang()

  const title = t('hero.title')
  const highlight = t('hero.titleHighlight')
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title]

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />

      {/* Floating gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${orb.pos} ${orb.size} rounded-full ${orb.className} blur-3xl`}
          animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>{t('hero.eyebrow')}</span>
            </div>
          </Reveal>

          {/* H1 */}
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.1]">
              {parts.length > 1 ? (
                <>
                  {parts[0]}
                  <span className="gradient-text">{highlight}</span>
                  {parts[1]}
                </>
              ) : (
                title
              )}
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.2}>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                onClick={() => scrollToId('lead-form')}
                className="gradient-brand animate-pulse-glow h-14 px-8 text-base text-white w-full sm:w-auto hover:opacity-95"
                size="lg"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToId('how')}
                className="h-14 px-8 text-base w-full sm:w-auto border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                size="lg"
              >
                <Play className="h-5 w-5" />
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </Reveal>

          {/* Trust badges */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2">
              {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3')].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.5} className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 w-full">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 text-center"
                >
                  <div className="gradient-text text-3xl font-bold">{t(s.value)}</div>
                  <div className="text-muted-foreground text-sm mt-1">{t(s.label)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
