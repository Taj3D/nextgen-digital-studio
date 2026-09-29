'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, GraduationCap, Wrench, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

/**
 * NGS Three-Pillar Architecture
 *
 * CONSULTING → Think → Decide → Strategise → Execute
 * TRAINING → Learn → Practice → Build → Grow
 * DIGITAL SOLUTIONS → Build → Automate → Improve → Scale
 *
 * Per NGS-WEB-CORRECTION v1.0: do NOT create a misleading separation.
 * When implementation is required, it is delivered through Digital Solutions
 * "when applicable".
 */
export function ThreePillarSection() {
  const { t } = useLang()

  const pillars = [
    {
      icon: Brain,
      tag: 'CONSULTING',
      flow: 'Think → Decide → Strategise → Execute',
      desc: t('pillars.consulting.desc'),
      cta: t('pillars.consulting.cta'),
      href: '/consulting',
      tone: 'emerald' as const,
    },
    {
      icon: GraduationCap,
      tag: 'TRAINING',
      flow: 'Learn → Practice → Build → Grow',
      desc: t('pillars.training.desc'),
      cta: t('pillars.training.cta'),
      href: '/ai-training',
      tone: 'cyan' as const,
    },
    {
      icon: Wrench,
      tag: 'DIGITAL SOLUTIONS',
      flow: 'Build → Automate → Improve → Scale',
      desc: t('pillars.digital.desc'),
      cta: t('pillars.digital.cta'),
      href: '/#lead-form',
      tone: 'amber' as const,
    },
  ]

  const toneRing: Record<'emerald' | 'cyan' | 'amber', string> = {
    emerald: 'border-emerald-500/40 hover:border-emerald-500/70',
    cyan: 'border-cyan-500/40 hover:border-cyan-500/70',
    amber: 'border-amber-500/40 hover:border-amber-500/70',
  }
  const toneIcon: Record<'emerald' | 'cyan' | 'amber', string> = {
    emerald: 'bg-emerald-500/15 text-emerald-500',
    cyan: 'bg-cyan-500/15 text-cyan-400',
    amber: 'bg-amber-500/15 text-amber-500',
  }
  const toneFlow: Record<'emerald' | 'cyan' | 'amber', string> = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    amber: 'text-amber-600 dark:text-amber-400',
  }

  return (
    <section id="pillars" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {t('pillars.eyebrow')}
          </p>
          <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]">
            Consulting <span className="text-muted-foreground/50">|</span> Training{' '}
            <span className="text-muted-foreground/50">|</span> Digital Solutions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('pillars.subtitle')}
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, tag, flow, desc, cta, href, tone }, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7 ${toneRing[tone]}`}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${toneIcon[tone]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-3xl font-extrabold text-foreground/5">{`0${i + 1}`}</span>
              </div>
              <h3 className="mt-4 font-heading text-base font-extrabold uppercase tracking-[0.18em] text-foreground">
                {tag}
              </h3>
              <p className={`mt-2 font-mono text-[11px] font-bold uppercase tracking-wider ${toneFlow[tone]}`}>{flow}</p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              <Link
                href={href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-all group-hover:gap-2.5"
              >
                {cta}
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs italic text-muted-foreground">
          {t('pillars.boundaryNote')}
        </p>

        {/* Tagline */}
        <div className="mt-10 flex items-center justify-center gap-4 text-muted-foreground/40">
          <span className="h-px w-8 bg-border/60" aria-hidden />
          <p className="whitespace-nowrap text-[0.68rem] font-semibold tracking-[0.4em]">
            LEARN · GROW · BUILD · TOGETHER
          </p>
          <span className="h-px w-8 bg-border/60" aria-hidden />
        </div>
      </div>
    </section>
  )
}
