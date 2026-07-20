'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"
import { Reveal, Eyebrow } from "../reveal"
import { industries } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

export function Industries() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [active, setActive] = React.useState<number | null>(null)

  return (
    <section id="industries" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('industries.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('industries.title1')}{" "}
            <span className="text-gradient">{t('industries.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('industries.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 4) * 0.05}>
              <button
                onClick={() => setActive(i)}
                className="group relative flex h-full w-full flex-col items-start overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                  <ind.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold leading-tight">{tr(ind.name)}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{tr(ind.blurb)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  View outcomes <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <IndustryModal
            index={active}
            onClose={() => setActive(null)}
            onBook={() => {
              if (active !== null) {
                const industryName = industries[active].name
                setActive(null)
                setTimeout(() => openWith(`Industry: ${industryName}`), 50)
              }
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function IndustryModal({
  index,
  onClose,
  onBook,
}: {
  index: number
  onClose: () => void
  onBook: () => void
}) {
  const ind = industries[index]
  const { tr } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
      >
        <div className="relative h-24 bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-card bg-blue-600 text-white shadow-lg">
            <ind.icon className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-2xl font-bold">{tr(ind.name)}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tr(ind.blurb)}</p>
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Outcomes we deliver
            </p>
            <div className="grid gap-2">
              {ind.outcomes.map((o) => (
                <div key={o} className="flex items-center gap-2.5 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{tr(o)}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onBook}
            className={cn(
              "mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]",
            )}
          >
            Get a custom plan for {tr(ind.name)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
