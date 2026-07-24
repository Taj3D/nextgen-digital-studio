'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Search, X, Plug, ArrowRight } from "lucide-react"
import { integrations, type Integration } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = ['All', 'AI & LLM', 'CRM', 'Messaging', 'Marketing', 'Automation', 'Analytics', 'Web'] as const

export function Integrations() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [category, setCategory] = React.useState<(typeof categories)[number]>('All')
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState<Integration | null>(null)

  const filtered = integrations.filter((i) => {
    const matchesCat = category === 'All' || i.category === category
    const matchesQuery = !query || i.name.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <section id="integrations" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('integrations.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('integrations.title1')}{" "}
            <span className="text-gradient">{t('integrations.title2')}</span> {t('integrations.title3')}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </Reveal>

        {/* Search + filter */}
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('integrations.searchPlaceholder')}
              className="h-12 w-full rounded-xl border border-border/60 bg-card pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/15"
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                  category === c
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/25"
                    : "border border-border/60 text-muted-foreground hover:border-blue-600/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((int) => (
              <motion.button
                layout
                key={int.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActive(int)}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 text-center transition-all hover:border-blue-600/40 hover:shadow-lg hover:shadow-blue-600/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-2xl transition-transform group-hover:scale-110">
                  {int.emoji}
                </span>
                <span className="text-sm font-bold leading-tight">{tr(int.name)}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{tr(int.category)}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No integrations found. We can still build a custom integration for you.
          </p>
        )}

        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 p-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <Plug className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-base font-bold">{t('integrations.dontSeeTool')}</p>
                <p className="text-sm text-muted-foreground">{t('integrations.dontSeeDesc')}</p>
              </div>
            </div>
            <Button
              onClick={() => openWith("Custom integration request")}
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 font-semibold shadow-lg shadow-blue-600/25"
            >
              {t('integrations.requestIntegration')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Integration detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
            >
              <div className="relative h-24 bg-gradient-to-br from-blue-600 to-cyan-500">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute -bottom-7 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-card bg-white text-3xl shadow-lg">
                  {active.emoji}
                </div>
              </div>
              <div className="p-6 pt-9">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
                  {active.category}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold">{tr(active.name)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{tr(active.desc)}</p>
                <p className="mt-3 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  Our team is certified to build &amp; maintain {tr(active.name)} integrations for your business.
                </p>
                <button
                  onClick={() => {
                    setActive(null)
                    openWith(`Integration: ${active.name}`)
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
                >
                  Build this integration
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
