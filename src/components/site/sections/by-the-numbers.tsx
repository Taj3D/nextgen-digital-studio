'use client'

import * as React from "react"
import { useInView } from "framer-motion"
import { useCountUp } from "@/hooks/use-count-up"
import { byTheNumbers } from "@/lib/site-data"
import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"

export function ByTheNumbers() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const { t, tr } = useLang()

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 text-white sm:py-24">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 animate-blob rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 animate-blob rounded-full bg-cyan-500/20 blur-[100px] [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto border-white/20 bg-white/10 text-cyan-300">
            {t('byNumbers.eyebrow')}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('byNumbers.title1')}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {t('byNumbers.title2')}
            </span>
          </h2>
          <p className="mt-5 text-lg text-blue-100/70">
            {t('byNumbers.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {byTheNumbers.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-slate-950/60">
              <div className="flex h-full flex-col items-center justify-center px-4 py-8 text-center backdrop-blur">
                <CountUp
                  end={s.num}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                  start={inView}
                />
                <p className="mt-2 text-xs font-medium leading-tight text-blue-100/60 sm:text-sm">
                  {tr(s.label)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-10 text-center">
          <p className="text-sm text-blue-100/50">
            * Based on aggregated data from 120+ client deployments across Bangladesh, 2023–2025.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function CountUp({
  end,
  decimals = 0,
  suffix = '',
  start = false,
}: {
  end: number
  decimals?: number
  suffix?: string
  start?: boolean
}) {
  const value = useCountUp(end, 1800, start)
  return (
    <span className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
      <span className="bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
        {value.toFixed(decimals)}
      </span>
      <span className="bg-gradient-to-br from-cyan-300 to-blue-400 bg-clip-text text-transparent">
        {suffix}
      </span>
    </span>
  )
}
