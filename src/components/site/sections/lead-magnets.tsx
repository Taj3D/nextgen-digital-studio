'use client'

import * as React from 'react'
import { BrainCircuit, Calculator, ArrowRight } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function LeadMagnetSection() {
  const { t } = useLang()

  return (
    <SectionShell id="lead-magnets" aria-label="Free resources">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('leadMagnet.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('leadMagnet.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('leadMagnet.subtitle')}
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 — AI Readiness Assessment */}
        <Reveal>
          <div className="rounded-2xl border border-border/60 bg-card p-8 hover:border-emerald-500/40 hover:shadow-lg transition-all h-full flex flex-col gap-5">
            <span
              aria-hidden
              className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500"
            >
              <BrainCircuit className="h-7 w-7" />
            </span>
            <h3 className="text-2xl font-bold text-foreground">
              {t('leadMagnet.assessmentTitle')}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed flex-1">
              {t('leadMagnet.assessmentDesc')}
            </p>
            <Button
              onClick={() => scrollToId('lead-form')}
              className="gradient-brand text-white w-fit"
              size="lg"
            >
              {t('leadMagnet.assessmentCta')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        {/* Card 2 — ROI Calculator */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card p-8 hover:border-amber-500/40 hover:shadow-lg transition-all h-full flex flex-col gap-5">
            <span
              aria-hidden
              className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-500/10 text-amber-500"
            >
              <Calculator className="h-7 w-7" />
            </span>
            <h3 className="text-2xl font-bold text-foreground">
              {t('leadMagnet.calculatorTitle')}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed flex-1">
              {t('leadMagnet.calculatorDesc')}
            </p>
            <Button
              onClick={() => scrollToId('roi-calculator')}
              variant="outline"
              className="border-amber-500/40 text-foreground hover:bg-amber-500/10 hover:text-foreground w-fit"
              size="lg"
            >
              {t('leadMagnet.calculatorCta')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default LeadMagnetSection
