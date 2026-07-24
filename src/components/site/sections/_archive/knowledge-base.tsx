'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import {
  Search, MessagesSquare, Bot, Workflow, Target, Building2,
  BookOpen, Clock, ArrowRight, X, type LucideIcon,
} from "lucide-react"
import { knowledgeArticles, type KnowledgeArticle } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  whatsapp: MessagesSquare,
  bot: Bot,
  crm: Workflow,
  target: Target,
  workflow: Workflow,
  building: Building2,
}

const categories = ['All', 'WhatsApp', 'AI Agents', 'Automation', 'Marketing', 'Industry']

export function KnowledgeBase() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')
  const [active, setActive] = React.useState<KnowledgeArticle | null>(null)

  const filtered = knowledgeArticles.filter((a) => {
    const matchesCat = category === 'All' || a.category === category
    const matchesQuery = !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <section id="knowledge-base" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('kb.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('kb.title1')}{" "}
            <span className="text-gradient">{t('kb.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('kb.subtitle')}
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
              placeholder={t('kb.searchPlaceholder')}
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

        {/* Articles grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center"
              >
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No articles found. Try a different search or category.
                </p>
              </motion.div>
            ) : (
              filtered.map((a) => {
                const Icon = iconMap[a.icon] ?? BookOpen
                return (
                  <motion.button
                    layout
                    key={a.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    onClick={() => setActive(a)}
                    className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 text-left card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                        {a.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-bold leading-snug group-hover:text-blue-600">
                      {tr(a.title)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {tr(a.excerpt)}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {a.readTime} read
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.button>
                )
              })
            )}
          </AnimatePresence>
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            {t('kb.bookCall')}{" "}
            <button
              onClick={() => openWith("Knowledge base → call")}
              className="font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              {t('kb.bookCallLink')} →
            </button>
          </p>
        </Reveal>
      </div>

      {/* Article preview modal */}
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
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
            >
              <div className="relative h-28 bg-gradient-to-br from-blue-600 to-cyan-500">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-card bg-blue-600 text-white shadow-lg">
                  {(() => {
                    const Icon = iconMap[active.icon] ?? BookOpen
                    return <Icon className="h-7 w-7" />
                  })()}
                </div>
              </div>
              <div className="p-6 pt-8">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
                  {active.category}
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold leading-snug">{tr(active.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr(active.excerpt)}</p>
                <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {active.readTime} min read
                </p>
                <button
                  onClick={() => {
                    setActive(null)
                    openWith("Article → full guide")
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
                >
                  Get the full guide
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
