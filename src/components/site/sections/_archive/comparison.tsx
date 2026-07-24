'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Check, X, Sparkles, ShieldCheck } from "lucide-react"
import { comparisonRows } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Comparison() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="comparison" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('comparison.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('comparison.title1')}{" "}
            <span className="text-gradient">{t('comparison.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('comparison.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-muted/40">
              <div className="px-4 py-5 sm:px-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {tr('Feature')}
                </span>
              </div>
              <div className="relative border-x border-border/60 px-4 py-5 sm:px-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="font-heading text-sm font-extrabold text-foreground sm:text-base">
                    NextGen
                  </span>
                </div>
                <p className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                  AI Automation Agency
                </p>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <span className="font-heading text-sm font-bold text-muted-foreground sm:text-base">
                  {tr('Typical Agencies')}
                </span>
                <p className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                  {tr('& freelancers')}
                </p>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/60">
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1.4fr_1fr_1fr] transition-colors hover:bg-blue-600/[0.02]"
                >
                  <div className="flex items-center px-4 py-4 text-sm font-medium text-foreground sm:px-6 sm:text-[15px]">
                    {tr(row.feature)}
                  </div>
                  <div className="flex items-start gap-2 border-x border-border/60 bg-blue-600/[0.03] px-4 py-4 sm:px-6">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-xs font-medium text-foreground sm:text-sm">
                      {tr(row.nextgen)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 px-4 py-4 sm:px-6">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      {tr(row.others)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Guarantee strip */}
        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5 sm:flex-row sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-base font-bold">
                  30-Day ROI Promise
                </p>
                <p className="text-sm text-muted-foreground">
                  See qualified leads in your first month — or we keep working free until you do.
                </p>
              </div>
            </div>
            <Button
              onClick={() => openWith("Comparison → Strategy Call")}
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 font-semibold shadow-lg shadow-blue-600/25"
            >
              Start risk-free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
