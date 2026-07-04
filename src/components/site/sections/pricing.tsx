'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { pricingPlans } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

export function Pricing() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('pricing.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('pricing.title1')}{" "}
            <span className="text-gradient">{t('pricing.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300",
                  plan.popular
                    ? "border-blue-600/40 bg-gradient-to-b from-blue-600/[0.06] to-cyan-500/[0.03] shadow-2xl shadow-blue-600/10 lg:-mt-4 lg:mb-0"
                    : "border-border/60 bg-card hover:border-border",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      <Sparkles className="h-3 w-3" /> {t('pricing.mostPopular')}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-xl font-bold">{tr(plan.name)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tr(plan.tagline)}</p>
                </div>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-heading text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm text-muted-foreground">{tr(plan.period)}</span>
                </div>
                <button
                  onClick={() => openWith(`Pricing: ${plan.name}`)}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]",
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                      : "border border-border bg-background hover:bg-muted",
                  )}
                >
                  {tr(plan.cta)}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="mt-7 h-px w-full bg-border/60" />
                <ul className="mt-6 grid gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{tr(f)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            {t('pricing.needCustom')}{" "}
            <button
              onClick={() => openWith("Enterprise / Custom")}
              className="font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              Talk to our team →
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
