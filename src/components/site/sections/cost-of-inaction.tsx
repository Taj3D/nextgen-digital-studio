'use client'

import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { useBooking } from "../booking-modal"
import { TrendingDown, ArrowRight, Calculator } from "lucide-react"
import { motion } from "framer-motion"
import { useCountUp } from "@/hooks/use-count-up"
import * as React from "react"

export function CostOfInaction() {
  const { t } = useLang()
  const { openWith } = useBooking()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = React.useRef(false)

  // Simple intersection observer
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) inView.current = true },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const leadLoss = useCountUp(15, 1500, true)
  const monthlyLoss = useCountUp(1.8, 1500, true) // lakh
  const yearlyLoss = useCountUp(21.6, 1500, true) // lakh

  return (
    <section ref={ref} id="cost-of-inaction" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto border-rose-500/20 bg-rose-500/5 text-rose-600">
            {t('cost.eyebrow')}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('cost.title1')}{" "}
            <span className="text-rose-500">{t('cost.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t('cost.subtitle')}</p>
        </Reveal>

        {/* Loss calculator visualization */}
        <Reveal delay={0.1} className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-6 text-center">
              <TrendingDown className="mx-auto h-8 w-8 text-rose-500" />
              <p className="mt-3 font-heading text-4xl font-extrabold text-rose-500">
                {leadLoss.toFixed(0)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('cost.losingLeads')}</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 text-center">
              <TrendingDown className="mx-auto h-8 w-8 text-amber-500" />
              <p className="mt-3 font-heading text-4xl font-extrabold text-amber-500">
                ৳{monthlyLoss.toFixed(1)}L
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('cost.losingRevenue')}</p>
            </div>
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-6 text-center">
              <TrendingDown className="mx-auto h-8 w-8 text-rose-500" />
              <p className="mt-3 font-heading text-4xl font-extrabold text-rose-500">
                ৳{yearlyLoss.toFixed(1)}L
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('cost.losingYearly')}</p>
            </div>
          </div>
        </Reveal>

        {/* Explanation */}
        <Reveal delay={0.15} className="mt-6">
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <div className="flex items-start gap-3">
              <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <p className="text-sm leading-relaxed text-muted-foreground">{t('cost.calc')}</p>
            </div>
          </div>
        </Reveal>

        {/* Solution contrast */}
        <Reveal delay={0.2} className="mt-6">
          <div className="overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {t('cost.automationCost')}
                </p>
              </div>
              <button
                onClick={() => openWith('Cost of Inaction → Strategy Call')}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-transform hover:scale-[1.02]"
              >
                {t('cost.stopLosing')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
