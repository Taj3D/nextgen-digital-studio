'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Stethoscope,
  Compass,
  Flag,
  ClipboardCheck,
  ArrowRight,
  Brain,
  ChevronRight,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

/**
 * Business Consulting — homepage overview section.
 *
 * Headline (fixed by brief):
 *   "শুধু পরামর্শ নয়— Problem থেকে Clarity, Clarity থেকে Strategy,
 *    Strategy থেকে Action।"
 *
 * Shows:
 *   - 7-step consulting process flow (Problem → Diagnosis → Priority →
 *     Strategy → Roadmap → Execution Guidance → Review)
 *   - Consulting areas as compact chips (NOT as service cards)
 *   - CTA "Explore Consulting →" → /consulting
 *
 * Governance:
 *   - No fabricated claims (no client count, no revenue, no ROI).
 *   - Founder name = "MD Nazmul Islam Taj".
 *   - DO NOT claim guaranteed results.
 */

type FlowStep = {
  n: string
  labelKey: string
  icon: typeof Stethoscope
}

const flowSteps: FlowStep[] = [
  { n: '01', labelKey: 'consulting.home.flow.problem', icon: Stethoscope },
  { n: '02', labelKey: 'consulting.home.flow.diagnosis', icon: Brain },
  { n: '03', labelKey: 'consulting.home.flow.priority', icon: Flag },
  { n: '04', labelKey: 'consulting.home.flow.strategy', icon: Compass },
  { n: '05', labelKey: 'consulting.home.flow.roadmap', icon: ClipboardCheck },
  { n: '06', labelKey: 'consulting.home.flow.execution', icon: ArrowRight },
  { n: '07', labelKey: 'consulting.home.flow.review', icon: ClipboardCheck },
]

const consultingAreas: { key: string }[] = [
  { key: 'consulting.home.area.businessGrowth' },
  { key: 'consulting.home.area.customerAcquisition' },
  { key: 'consulting.home.area.leadGeneration' },
  { key: 'consulting.home.area.salesConversion' },
  { key: 'consulting.home.area.marketingStrategy' },
  { key: 'consulting.home.area.offerDevelopment' },
  { key: 'consulting.home.area.positioning' },
  { key: 'consulting.home.area.personalBranding' },
  { key: 'consulting.home.area.freelancerGrowth' },
  { key: 'consulting.home.area.clientAcquisition' },
  { key: 'consulting.home.area.businessStrategy' },
  { key: 'consulting.home.area.aiDigitalStrategy' },
  { key: 'consulting.home.area.productivityExecution' },
  { key: 'consulting.home.area.systemProcess' },
]

export function BusinessConsultingSection() {
  const { t } = useLang()
  return (
    <section
      id="business-consulting"
      className="scroll-mt-20 relative overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="business-consulting-heading"
    >
      {/* Premium dark backdrop with subtle accent glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-950/30 via-background to-cyan-950/20" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <Stethoscope className="h-3.5 w-3.5" />
            {t('consulting.home.eyebrow')}
          </div>
          <h2
            id="business-consulting-heading"
            className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('consulting.home.heading1')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              {t('consulting.home.heading2')}
            </span>{' '}
            {t('consulting.home.heading3')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('consulting.home.subtitle')}
          </p>
        </Reveal>

        {/* Process flow — compact numbered chips with arrows */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-6">
            <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {t('consulting.home.processLabel')}
            </p>
            <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
              {flowSteps.map(({ n, labelKey, icon: Icon }, i) => (
                <React.Fragment key={n}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-background/80 px-3 py-2.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-[10px] font-bold text-white">
                      {n}
                    </span>
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-semibold text-foreground">{t(labelKey)}</span>
                  </motion.div>
                  {i < flowSteps.length - 1 && (
                    <ChevronRight
                      className="self-center h-4 w-4 text-emerald-500/50"
                      aria-hidden
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] italic text-muted-foreground">
              {t('consulting.home.processNote')}
            </p>
          </div>
        </Reveal>

        {/* Consulting areas — compact chips only */}
        <Reveal delay={0.15}>
          <div className="mt-10">
            <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {t('consulting.home.areasLabel')}
            </p>
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
              {consultingAreas.map((area, i) => (
                <motion.span
                  key={area.key}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {t(area.key)}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA — Explore Consulting */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/consulting"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] sm:w-auto"
              aria-label={t('consulting.home.cta')}
            >
              {t('consulting.home.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            {t('consulting.home.disclaimer')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default BusinessConsultingSection
