'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal, Eyebrow } from "../reveal"
import { testimonials } from "@/lib/site-data"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [page, setPage] = React.useState(0)
  const perPage = 3
  const pages = Math.ceil(testimonials.length / perPage)
  const visible = testimonials.slice(page * perPage, page * perPage + perPage)
  const { t, tr } = useLang()

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('testimonials.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('testimonials.title1')}{" "}
            <span className="text-gradient">{t('testimonials.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {visible.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm",
                i === 1 && "md:-translate-y-3 md:shadow-xl md:shadow-blue-600/5",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-blue-600/20" />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{tr(t.quote)}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">{tr(t.name)}</p>
                  <p className="text-xs text-muted-foreground">
                    {tr(t.role)}, {tr(t.company)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-3">
          <button
            aria-label="Previous testimonials"
            onClick={() => setPage((p) => (p - 1 + pages) % pages)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-foreground/70 transition-colors hover:border-blue-600/40 hover:bg-blue-600/5 hover:text-blue-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background px-2 py-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => setPage(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === page
                    ? "w-7 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm shadow-blue-600/30"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-125",
                )}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonials"
            onClick={() => setPage((p) => (p + 1) % pages)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-foreground/70 transition-colors hover:border-blue-600/40 hover:bg-blue-600/5 hover:text-blue-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
