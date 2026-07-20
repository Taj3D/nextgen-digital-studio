'use client'

import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { useBooking } from "../booking-modal"
import { ArrowRight, Zap, Clock, Target, Moon, TrendingDown } from "lucide-react"

const comparisons = [
  { key: 'competitor.1', icon: Zap },
  { key: 'competitor.2', icon: Clock },
  { key: 'competitor.3', icon: Target },
  { key: 'competitor.4', icon: Moon },
  { key: 'competitor.5', icon: TrendingDown },
]

export function CompetitorFomo() {
  const { t } = useLang()
  const { openWith } = useBooking()

  return (
    <section id="competitor-fomo" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto border-amber-500/20 bg-amber-500/5 text-amber-600">
            {t('competitor.eyebrow')}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('competitor.title1')}{" "}
            <span className="text-gradient">{t('competitor.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t('competitor.subtitle')}</p>
        </Reveal>

        {/* Comparison list */}
        <div className="mt-12 space-y-3">
          {comparisons.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.key} delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-amber-500/30 sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="flex-1 text-sm font-medium text-foreground/90 sm:text-base">{t(c.key)}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Urgent CTA */}
        <Reveal delay={0.3} className="mt-10">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.06] p-8 text-center">
            <p className="font-heading text-xl font-bold text-amber-700 dark:text-amber-400 sm:text-2xl">
              {t('competitor.question')}
            </p>
            <button
              onClick={() => openWith('Competitor FOMO → Strategy Call')}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.02]"
            >
              {t('competitor.catchUp')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
