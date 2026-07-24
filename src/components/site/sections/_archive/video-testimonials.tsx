'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Play, Quote, Star, Volume2, X } from "lucide-react"
import { videoTestimonials, type VideoTestimonial } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

export function VideoTestimonials() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [active, setActive] = React.useState<VideoTestimonial | null>(null)

  return (
    <section id="video-testimonials" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('videoTest.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('videoTest.title1')}{" "}
            <span className="text-gradient">{t('videoTest.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('videoTest.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {videoTestimonials.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1}>
              <button
                onClick={() => setActive(v)}
                className="group relative block h-full w-full overflow-hidden rounded-3xl text-left card-hover hover:shadow-2xl hover:shadow-blue-600/10"
              >
                {/* Video thumbnail */}
                <div className={cn("relative aspect-video overflow-hidden bg-gradient-to-br", v.gradient)}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Initials avatar */}
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white backdrop-blur">
                    {v.initials}
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform group-hover:scale-110">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
                      <Play className="ml-1 h-7 w-7 fill-blue-600 text-blue-600" />
                    </span>
                  </div>
                  {/* Duration */}
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                    {v.duration}
                  </span>
                  {/* Metric badge */}
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-blue-600 shadow">
                    {v.metric}
                  </span>
                </div>
                {/* Info */}
                <div className="rounded-b-3xl border border-t-0 border-border/60 bg-card p-5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/90 line-clamp-2">
                    &ldquo;{tr(v.quote)}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-[10px] font-bold text-white">
                      {v.initials}
                    </span>
                    <div>
                      <p className="text-xs font-bold leading-tight">{tr(v.name)}</p>
                      <p className="text-[11px] text-muted-foreground">{tr(v.role)}, {tr(v.company)}</p>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <button
            onClick={() => openWith("Video testimonials → call")}
            className="text-sm font-semibold text-blue-600 underline-offset-4 hover:underline"
          >
            {t('videoTest.becomeNext')} →
          </button>
        </Reveal>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
            >
              {/* Video area */}
              <div className={cn("relative aspect-video bg-gradient-to-br", active.gradient)}>
                <div className="absolute inset-0 bg-grid opacity-20" />
                <button
                  aria-label="Close video"
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <Volume2 className="h-10 w-10" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/80">Video preview</p>
                  <p className="mt-1 font-heading text-lg font-bold">{tr(active.name)}</p>
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <Quote className="h-8 w-8 text-blue-600/20" />
                <p className="mt-2 text-lg font-medium leading-relaxed text-foreground">
                  &ldquo;{tr(active.quote)}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                      {active.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{tr(active.name)}</p>
                      <p className="text-xs text-muted-foreground">{tr(active.role)}, {tr(active.company)}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600">
                    {active.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
