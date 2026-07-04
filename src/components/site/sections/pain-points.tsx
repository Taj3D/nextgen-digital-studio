'use client'

import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { useBooking } from "../booking-modal"
import { Clock, Users, Eye, Zap, TrendingDown, AlertCircle, ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const painPoints = [
  { key: 'pain.1', icon: Clock, color: 'from-rose-500 to-red-500' },
  { key: 'pain.2', icon: Users, color: 'from-amber-500 to-orange-500' },
  { key: 'pain.3', icon: Eye, color: 'from-violet-500 to-purple-500' },
  { key: 'pain.4', icon: Zap, color: 'from-cyan-500 to-blue-500' },
  { key: 'pain.5', icon: TrendingDown, color: 'from-rose-500 to-pink-500' },
  { key: 'pain.6', icon: AlertCircle, color: 'from-amber-500 to-yellow-500' },
]

export function PainPoints() {
  const { t } = useLang()
  const { openWith } = useBooking()

  return (
    <section id="pain-points" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto border-rose-500/20 bg-rose-500/5 text-rose-600">
            {t('pain.eyebrow')}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('pain.title1')}{" "}
            <span className="text-gradient">{t('pain.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t('pain.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.key} delay={(i % 3) * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5">
                  <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20", p.color)} />
                  <div className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110", p.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold">{t(`${p.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${p.key}.desc`)}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Emotional recognition CTA */}
        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600/[0.06] to-cyan-500/[0.06] p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="font-heading text-lg font-bold sm:text-xl">{t('pain.recognize')}</p>
            </div>
            <button
              onClick={() => openWith('Pain Points → Solution')}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
            >
              {t('pain.seeSolution')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
