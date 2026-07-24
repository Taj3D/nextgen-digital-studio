'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Calculator, TrendingUp, Clock, Users, ArrowRight, Sparkles } from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const businessSizes = [
  { id: "small", label: "Small Business", leads: 40, value: 8000, emoji: "🌱" },
  { id: "medium", label: "Medium Business", leads: 120, value: 25000, emoji: "🚀" },
  { id: "corporate", label: "Corporate", leads: 350, value: 80000, emoji: "🏢" },
]

export function RoiCalculator() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [size, setSize] = React.useState("medium")
  const [responseRate, setResponseRate] = React.useState(60) // % improvement
  const [hoursSaved, setHoursSaved] = React.useState(40) // hrs/week

  const selected = businessSizes.find((b) => b.id === size)!
  const extraLeads = Math.round((selected.leads * responseRate) / 100)
  const extraRevenue = extraLeads * (selected.value / 10)
  const monthlyHours = hoursSaved * 4
  const yearlySavings = monthlyHours * 12 * 500 // ৳500/hr value
  const yearlyRevenue = extraRevenue * 12
  const totalYearly = yearlyRevenue + yearlySavings
  const roiMultiple = (totalYearly / 60000).toFixed(1) // vs Growth plan ৳60k/mo

  return (
    <section id="roi-calculator" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute left-0 bottom-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('roi.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('roi.title1')}{" "}
            <span className="text-gradient">{t('roi.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('roi.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Controls */}
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-semibold text-foreground">
                    {t('roi.businessSize')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {businessSizes.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSize(b.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all",
                          size === b.id
                            ? "border-blue-600/50 bg-blue-600/5 shadow-md shadow-blue-600/10"
                            : "border-border/60 hover:border-border hover:bg-muted/40",
                        )}
                      >
                        <span className="text-xl">{b.emoji}</span>
                        <span className="text-[11px] font-semibold leading-tight text-foreground">
                          {tr(b.label)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Slider
                  icon={<TrendingUp className="h-4 w-4" />}
                  label={t('roi.leadResponse')}
                  value={responseRate}
                  min={20}
                  max={200}
                  step={5}
                  unit="%"
                  onChange={setResponseRate}
                  hint={t('roi.leadResponseHint')}
                />

                <div className="mt-5" />

                <Slider
                  icon={<Clock className="h-4 w-4" />}
                  label={t('roi.hoursSaved')}
                  value={hoursSaved}
                  min={10}
                  max={120}
                  step={5}
                  unit=" hrs"
                  onChange={setHoursSaved}
                  hint={t('roi.hoursSavedHint')}
                />

                <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-blue-600/5 px-4 py-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <p className="text-xs text-muted-foreground">
                    {t('roi.disclaimer')}
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white sm:p-8">
                <div className="absolute inset-0 bg-grid opacity-15" />
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-50/90">
                      {t('roi.yourProjected')}
                    </span>
                  </div>

                  <motion.div
                    key={totalYearly}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="font-heading text-5xl font-extrabold tracking-tight sm:text-6xl">
                      ৳{Math.round(totalYearly / 1000)}L+
                    </p>
                    <p className="mt-1 text-sm text-blue-50/90">
                      {t('roi.totalValue')}
                    </p>
                  </motion.div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <ResultCard
                      label={t('roi.extraLeads')}
                      value={`+${extraLeads}`}
                    />
                    <ResultCard
                      label={t('roi.revenueUplift')}
                      value={`৳${Math.round(yearlyRevenue / 100000)}L`}
                    />
                    <ResultCard
                      label={t('roi.hoursSavedYear')}
                      value={`${monthlyHours * 12}h`}
                    />
                    <ResultCard
                      label={t('roi.labourSaved')}
                      value={`৳${Math.round(yearlySavings / 1000)}k`}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-50/90">
                        {t('roi.roiMultiple')}
                      </span>
                      <span className="flex items-center gap-1 font-heading text-xl font-extrabold">
                        <Sparkles className="h-4 w-4" />
                        {roiMultiple}x
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openWith("ROI Calculator")}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    {t('roi.getDetailedROI')}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Slider({
  icon,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
  hint?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
            {icon}
          </span>
          {label}
        </span>
        <span className="rounded-lg bg-blue-600/10 px-2.5 py-1 font-heading text-sm font-bold text-blue-600">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full"
        style={{
          background: `linear-gradient(to right, oklch(0.546 0.215 262.88) 0%, oklch(0.715 0.143 194) ${pct}%, oklch(0.92 0 0) ${pct}%, oklch(0.92 0 0) 100%)`,
        }}
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/12 px-3.5 py-3 backdrop-blur">
      <p className="font-heading text-lg font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[11px] leading-tight text-blue-50/85">{label}</p>
    </div>
  )
}
