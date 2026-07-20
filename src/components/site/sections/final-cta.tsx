'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { waLink } from '@/lib/whatsapp'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Background orbs — slow infinite float. */
const ORBS = [
  {
    className: 'bg-emerald-500/25',
    size: 'h-72 w-72 sm:h-96 sm:w-96',
    pos: '-top-24 -left-24',
    delay: 0,
    dur: 11,
  },
  {
    className: 'bg-teal-500/25',
    size: 'h-80 w-80 sm:h-[28rem] sm:w-[28rem]',
    pos: 'top-1/3 -right-28',
    delay: 1.8,
    dur: 13,
  },
  {
    className: 'bg-amber-400/20',
    size: 'h-64 w-64 sm:h-80 sm:w-80',
    pos: '-bottom-24 left-1/4',
    delay: 3.4,
    dur: 12,
  },
] as const

/** Deterministic particle positions — SSR-safe (useMemo, no Math.random). */
function useParticles(count = 18) {
  return React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: ((i * 37 + 11) % 100),
        bottom: ((i * 23 + 7) % 25),
        size: 3 + (i % 4),
        delay: (i * 0.45) % 7,
        duration: 9 + (i % 5) * 2,
      })),
    [count],
  )
}

function FloatingParticles() {
  const particles = useParticles(18)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-emerald-400/60"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -120 - (p.id % 4) * 30],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

export function FinalCta() {
  const { t } = useLang()

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-card py-24 sm:py-32 lg:py-40"
      aria-label="Call to Action"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />

      {/* Radial vignette (darken edges) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%)',
        }}
        aria-hidden
      />

      {/* Animated orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${orb.pos} ${orb.size} rounded-full ${orb.className} blur-3xl`}
          animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-2 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>{t('final.eyebrow')}</span>
          </div>
        </Reveal>

        {/* H2 */}
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="gradient-text">{t('final.title')}</span>
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('final.subtitle')}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollToId('lead-form')}
              className="gradient-brand animate-pulse-glow h-14 min-w-[16rem] px-8 text-base text-white hover:opacity-95 w-full sm:w-auto"
              size="lg"
            >
              {t('final.ctaPrimary')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 min-w-[16rem] px-8 text-base border-amber-400/40 text-foreground hover:bg-amber-400/10 hover:text-foreground w-full sm:w-auto"
              size="lg"
            >
              <a href="#pricing" onClick={(e) => { e.preventDefault(); const el = document.getElementById('pricing'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                <ArrowRight className="h-5 w-5 text-amber-400" />
                {t('final.ctaSecondary')}
              </a>
            </Button>
          </div>
        </Reveal>

        {/* Guarantee */}
        <Reveal delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
            <span>{t('final.guarantee')}</span>
          </div>
        </Reveal>

        {/* Particles tagline */}
        <Reveal delay={0.5}>
          <p className="mt-6 text-xs text-muted-foreground/70 uppercase tracking-wider">
            {t('final.particles')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default FinalCta
