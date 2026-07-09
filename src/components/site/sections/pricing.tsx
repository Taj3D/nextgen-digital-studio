'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Tag, Check, ShieldCheck } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang, type Lang } from '@/components/site/language-provider'
import { PRICING_PLANS, type PricingPlan } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/** Localized plan name overrides (ids 'starter' / 'growth' / 'dominant'). */
const PLAN_NAMES: Record<PricingPlan['id'], { en: string; bn: string }> = {
  starter: { en: 'Starter', bn: 'স্টার্টার' },
  growth: { en: 'Growth', bn: 'গ্রোথ' },
  dominant: { en: 'Dominant', bn: 'ডোমিন্যান্ট' },
}

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Pricing() {
  const { t, lang } = useLang()
  const [billing, setBilling] = React.useState<'monthly' | 'yearly'>('monthly')

  /** Convert ASCII digits to Bengali digits when lang === 'bn'. */
  const bn = React.useCallback(
    (s: string | number) =>
      lang === 'bn'
        ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
        : String(s),
    [lang],
  )

  /** Format a price with ৳ symbol + Indian/Bangladesh digit grouping. */
  const formatPrice = React.useCallback(
    (n: number) => '৳' + bn(n.toLocaleString('en-IN')),
    [bn],
  )

  return (
    <SectionShell id="pricing" className="relative">
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Tag className="h-4 w-4 shrink-0" />
          <span>{t('pricing.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t('pricing.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('pricing.subtitle')}
        </p>
      </Reveal>

      {/* Billing toggle */}
      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-border bg-card/60 p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`relative h-11 px-6 rounded-full text-sm font-medium transition-all ${
              billing === 'monthly'
                ? 'gradient-brand text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={billing === 'monthly'}
          >
            {t('pricing.monthly')}
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`relative h-11 px-6 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'yearly'
                ? 'gradient-brand text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={billing === 'yearly'}
          >
            {t('pricing.yearly')}
            <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 px-2 py-0">
              {t('pricing.yearlyBadge')}
            </Badge>
          </button>
        </div>
      </Reveal>

      {/* Plan cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8 items-stretch"
      >
        {PRICING_PLANS.map((plan) => {
          const name = lang === 'bn' ? PLAN_NAMES[plan.id].bn : PLAN_NAMES[plan.id].en
          const price = billing === 'monthly' ? plan.monthly : plan.yearly
          const unit = billing === 'monthly' ? t('pricing.perMonth') : t('pricing.perYear')

          return (
            <motion.div key={plan.id} variants={staggerItem} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-card/70 backdrop-blur-sm p-7 transition-all duration-300 ${
                  plan.popular
                    ? 'border-emerald-500/60 lg:scale-105 shadow-glow'
                    : 'border-border/60 hover:-translate-y-1 hover:border-emerald-500/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full gradient-brand px-4 py-1 text-xs font-semibold text-white shadow-glow">
                      <Check className="h-3 w-3" />
                      {t('pricing.popular')}
                    </div>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-xl font-bold text-foreground">{name}</h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="gradient-text text-4xl lg:text-5xl font-bold">
                    {formatPrice(price)}
                  </span>
                  <span className="text-sm text-muted-foreground">{unit}</span>
                </div>

                {/* Features */}
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border/60 pt-6">
                  {plan.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{lang === 'bn' ? f.bn : f.en}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => scrollToId('lead-form')}
                  className={`mt-7 h-12 w-full text-base ${
                    plan.popular
                      ? 'gradient-brand animate-pulse-glow text-white hover:opacity-95'
                      : 'border border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {t('pricing.cta')}
                </Button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Guarantee note */}
      <Reveal delay={0.2} className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground text-center max-w-2xl">
          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
          <span>{t('pricing.guarantee')}</span>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default Pricing
