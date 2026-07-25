'use client'

import * as React from 'react'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function RoiCalculatorSection() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const [monthlyLeads, setMonthlyLeads] = React.useState(100)
  const [leadValue, setLeadValue] = React.useState(5000)
  const [currentConversion, setCurrentConversion] = React.useState(5)
  const [aiConversion, setAiConversion] = React.useState(15)

  // BN digit helper — converts ASCII digits to Bengali numerals.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  // Currency formatter — ৳ prefix + thousands separators + BN digit conversion.
  const fmt = (n: number) => {
    const s = Math.round(n).toLocaleString('en-US')
    return '৳' + (isBn ? s.replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : s)
  }

  const currentRevenue = monthlyLeads * leadValue * (currentConversion / 100)
  const aiRevenue = monthlyLeads * leadValue * (aiConversion / 100)
  const monthlyGain = aiRevenue - currentRevenue
  const yearlyGain = monthlyGain * 12

  const inputs = [
    {
      label: t('calc.monthlyLeadsLabel'),
      value: monthlyLeads,
      set: setMonthlyLeads,
      min: 10,
      max: 1000,
      step: 10,
      display: bn(monthlyLeads),
    },
    {
      label: t('calc.leadValueLabel'),
      value: leadValue,
      set: setLeadValue,
      min: 500,
      max: 50000,
      step: 500,
      display: '৳' + bn(leadValue.toLocaleString('en-US')),
    },
    {
      label: t('calc.currentConversionLabel'),
      value: currentConversion,
      set: setCurrentConversion,
      min: 1,
      max: 30,
      step: 1,
      display: bn(currentConversion) + '%',
    },
    {
      label: t('calc.aiConversionLabel'),
      value: aiConversion,
      set: setAiConversion,
      min: 5,
      max: 50,
      step: 1,
      display: bn(aiConversion) + '%',
    },
  ]

  const results = [
    { label: t('calc.currentRevenueLabel'), value: fmt(currentRevenue), highlight: false },
    { label: t('calc.aiRevenueLabel'), value: fmt(aiRevenue), highlight: false },
    { label: t('calc.monthlyGainLabel'), value: fmt(monthlyGain), highlight: true },
    { label: t('calc.yearlyGainLabel'), value: fmt(yearlyGain), highlight: true },
  ]

  return (
    <SectionShell id="roi-calculator" aria-label="ROI Calculator">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('calc.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('calc.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('calc.subtitle')}</p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT — sliders */}
        <Reveal>
          <Card className="p-6 sm:p-8 gap-6">
            <div className="flex flex-col gap-6">
              {inputs.map((inp, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor={`roi-input-${i}`}
                      className="text-sm font-medium text-foreground"
                    >
                      {inp.label}
                    </label>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {inp.display}
                    </span>
                  </div>
                  <input
                    id={`roi-input-${i}`}
                    type="range"
                    min={inp.min}
                    max={inp.max}
                    step={inp.step}
                    value={inp.value}
                    onChange={(e) => inp.set(Number(e.target.value))}
                    className="accent-emerald-500 w-full cursor-pointer"
                    aria-label={inp.label}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* RIGHT — results */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl gradient-brand-soft border border-emerald-500/20 p-6 sm:p-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {t('calc.eyebrow')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 ${
                    r.highlight
                      ? 'bg-background/80 border border-emerald-500/30'
                      : 'bg-background/50'
                  }`}
                >
                  <div className="text-xs text-muted-foreground">{r.label}</div>
                  <div
                    className={`mt-1 font-bold ${
                      r.highlight
                        ? 'text-2xl sm:text-3xl gradient-text'
                        : 'text-xl sm:text-2xl text-foreground'
                    }`}
                  >
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{t('calc.disclaimer')}</p>
            <Button
              onClick={() => scrollToId('lead-form')}
              className="mt-4 w-full gradient-brand text-white h-12"
              size="lg"
            >
              {t('calc.cta')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default RoiCalculatorSection
