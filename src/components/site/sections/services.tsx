'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"
import { Reveal, Eyebrow } from "../reveal"
import { services } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

export function Services() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [active, setActive] = React.useState<number | null>(null)

  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('services.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('services.title1')}{" "}
            <span className="text-gradient">{t('services.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setActive(i)}
                className="group relative flex h-full w-full flex-col rounded-2xl border border-border/60 bg-card p-6 text-left card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110",
                      s.gradient,
                    )}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                </div>
                <h3 className="font-heading text-lg font-bold">{tr(s.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tr(s.short)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tr(f)}
                    </span>
                  ))}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Service detail modal */}
      <ServiceModal
        index={active}
        onClose={() => setActive(null)}
        onBook={() => {
          if (active !== null) openWith(services[active].title)
        }}
      />
    </section>
  )
}

function ServiceModal({
  index,
  onClose,
  onBook,
}: {
  index: number | null
  onClose: () => void
  onBook: () => void
}) {
  const service = index !== null ? services[index] : null
  const { tr } = useLang()

  return (
    <AnimatePresence>
      {service && (
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
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
          >
            <div className={cn("h-2 w-full bg-gradient-to-r", service.gradient)} />
            <div className="p-6 sm:p-8">
              <div
                className={cn(
                  "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  service.gradient,
                )}
              >
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold">{tr(service.title)}</h3>
              <p className="mt-2 text-muted-foreground">{tr(service.description)}</p>
              <div className="mt-5 grid gap-2">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="font-medium">{tr(f)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={onBook}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
                >
                  Book a strategy call
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
