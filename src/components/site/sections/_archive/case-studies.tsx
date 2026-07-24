'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingUp, X } from "lucide-react"
import { Reveal, Eyebrow } from "../reveal"
import { caseStudies, type CaseStudy } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"

export function CaseStudies() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [active, setActive] = React.useState<CaseStudy | null>(null)

  return (
    <section id="case-studies" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('caseStudies.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('caseStudies.title1')}{" "}
            <span className="text-gradient">{t('caseStudies.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('caseStudies.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.1}>
              <button
                onClick={() => setActive(cs)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-7 text-left card-hover hover:border-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
                    {tr(cs.industry)}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold leading-snug">
                  {tr(cs.title)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{tr(cs.client)}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tr(cs.summary)}
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/60 pt-5">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-heading text-2xl font-extrabold text-gradient">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                        {tr(m.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <CaseStudyModal cs={active} onClose={() => setActive(null)} onBook={() => openWith(`Case study: ${active.client}`)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function CaseStudyModal({
  cs,
  onClose,
  onBook,
}: {
  cs: CaseStudy
  onClose: () => void
  onBook: () => void
}) {
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
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
      >
        <div className="relative h-28 bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-6 flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-semibold">{tr(cs.industry)}</span>
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <p className="text-sm font-semibold text-blue-600">{tr(cs.client)}</p>
          <h3 className="mt-1 font-heading text-2xl font-bold leading-snug">{tr(cs.title)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tr(cs.summary)}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border/60 bg-muted/40 p-3 text-center">
                <p className="font-heading text-xl font-extrabold text-gradient">{m.value}</p>
                <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{tr(m.label)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services used
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cs.services.map((s) => (
                <span key={s} className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-600">
                  {tr(s)}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onBook}
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
          >
            Get similar results for my business
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
