'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ArrowRight, AlertTriangle, Clock, Zap } from 'lucide-react'
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
  const [responseTime, setResponseTime] = React.useState(60) // minutes
  const [lostLeadsPct, setLostLeadsPct] = React.useState(35) // % of leads lost to slow response

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

  // "You are losing" calculation — leads lost to slow response + low conversion
  const lostLeads = Math.round(monthlyLeads * (lostLeadsPct / 100))
  const lostRevenue = lostLeads * leadValue * (aiConversion / 100)

  const inputs = [
    {
      label: isBn ? 'মাসিক লিড সংখ্যা' : 'Monthly Leads',
      value: monthlyLeads,
      set: setMonthlyLeads,
      min: 10,
      max: 1000,
      step: 10,
      display: bn(monthlyLeads),
    },
    {
      label: isBn ? 'প্রতি লিডের মূল্য' : 'Average Order Value',
      value: leadValue,
      set: setLeadValue,
      min: 500,
      max: 50000,
      step: 500,
      display: '৳' + bn(leadValue.toLocaleString('en-US')),
    },
    {
      label: isBn ? 'বর্তমান কনভার্সন রেট' : 'Current Conversion Rate',
      value: currentConversion,
      set: setCurrentConversion,
      min: 1,
      max: 30,
      step: 1,
      display: bn(currentConversion) + '%',
    },
    {
      label: isBn ? 'AI কনভার্সন রেট' : 'AI Conversion Rate',
      value: aiConversion,
      set: setAiConversion,
      min: 5,
      max: 50,
      step: 1,
      display: bn(aiConversion) + '%',
    },
    {
      label: isBn ? 'রেসপন্স টাইম (মিনিট)' : 'Response Time (minutes)',
      value: responseTime,
      set: setResponseTime,
      min: 1,
      max: 240,
      step: 1,
      display: bn(responseTime) + ' ' + (isBn ? 'মিনিট' : 'min'),
    },
    {
      label: isBn ? 'ধীর রেসপন্সে হারানো লিড %' : 'Leads Lost to Slow Response',
      value: lostLeadsPct,
      set: setLostLeadsPct,
      min: 0,
      max: 80,
      step: 5,
      display: bn(lostLeadsPct) + '%',
    },
  ]

  const results = [
    { label: isBn ? 'বর্তমান মাসিক রাজস্ব' : 'Current Monthly Revenue', value: fmt(currentRevenue), highlight: false },
    { label: isBn ? 'AI মাসিক রাজস্ব' : 'AI Monthly Revenue', value: fmt(aiRevenue), highlight: false },
    { label: isBn ? 'মাসিক অতিরিক্ত রাজস্ব' : 'Monthly Revenue Gain', value: fmt(monthlyGain), highlight: true },
    { label: isBn ? 'বার্ষিক অতিরিক্ত রাজস্ব' : 'Yearly Revenue Gain', value: fmt(yearlyGain), highlight: true },
  ]

  return (
    <SectionShell id="roi-calculator" aria-label={t('aria.roiCalculator')}>
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
          <div className="flex flex-col gap-4">
            {/* "You are losing" alert */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {isBn ? 'আপনি হারাচ্ছেন' : 'You Are Losing'}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lostRevenue}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-rose-600 dark:text-rose-400">
                    {fmt(lostRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {isBn ? 'প্রতি মাসে ধীর রেসপন্সে' : 'per month to slow response'}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {isBn ? `${bn(responseTime)} মিনিট রেসপন্স` : `${bn(responseTime)} min response`}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  {isBn ? `${bn(lostLeads)} লিড হারাচ্ছেন` : `${bn(lostLeads)} leads lost`}
                </span>
              </div>
            </div>

            {/* Revenue projection */}
            <div className="rounded-2xl gradient-brand-soft border border-emerald-500/20 p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {isBn ? 'AI দিয়ে আপনি পাবেন' : 'With AI You Get'}
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
              <p className="mt-5 text-xs text-muted-foreground">{t('calc.disclaimer')}</p>
              <Button
                onClick={() => scrollToId('lead-form')}
                className="mt-4 w-full gradient-brand text-white h-12"
                size="lg"
              >
                {t('calc.cta')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default RoiCalculatorSection
