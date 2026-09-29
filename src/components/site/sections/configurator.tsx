'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import {
  MessageSquare, PhoneCall, MessagesSquare, Workflow, Target,
  Filter, TrendingUp, Globe, LayoutTemplate, BrainCircuit,
  Check, Plus, Sparkles, ArrowRight, RotateCcw, type LucideIcon,
} from "lucide-react"
import { configuratorItems, type ConfiguratorItem } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  chat: MessageSquare,
  phone: PhoneCall,
  whatsapp: MessagesSquare,
  crm: Workflow,
  target: Target,
  funnel: Filter,
  trending: TrendingUp,
  globe: Globe,
  layout: LayoutTemplate,
  brain: BrainCircuit,
}

const categories = ['All', 'AI Agents', 'Automation', 'Marketing', 'Web'] as const

export function Configurator() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['chat-agent', 'whatsapp-bot', 'lead-gen']))
  const [category, setCategory] = React.useState<(typeof categories)[number]>('All')
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  const filtered = category === 'All' ? configuratorItems : configuratorItems.filter((i) => i.category === category)
  const selectedItems = configuratorItems.filter((i) => selected.has(i.id))
  const total = selectedItems.reduce((sum, i) => sum + i.price, 0)
  const bundleDiscount = selectedItems.length >= 4 ? 0.15 : selectedItems.length >= 3 ? 0.1 : selectedItems.length >= 2 ? 0.05 : 0
  const discountedTotal = Math.round(total * (1 - bundleDiscount))
  const savings = total - discountedTotal

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function reset() {
    setSelected(new Set())
  }

  return (
    <section id="configurator" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('configurator.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('configurator.title1')}{" "}
            <span className="text-gradient">{t('configurator.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('configurator.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: items */}
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card p-5 sm:p-6">
              {/* Category filter */}
              <div className="mb-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                      category === c
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/25"
                        : "border border-border/60 text-muted-foreground hover:border-blue-600/40 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {filtered.map((item) => {
                  const Icon = iconMap[item.icon] ?? Sparkles
                  const isSelected = selected.has(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={cn(
                        "group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all",
                        isSelected
                          ? "border-blue-600/50 bg-blue-600/[0.04] shadow-md shadow-blue-600/10"
                          : "border-border/60 hover:border-blue-600/30 hover:bg-muted/30",
                      )}
                    >
                      {item.popular && (
                        <span className="absolute right-3 top-3 rounded-full bg-amber-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-600">
                          Popular
                        </span>
                      )}
                      <div className="mb-3 flex w-full items-center justify-between">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                          isSelected ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white" : "bg-blue-600/10 text-blue-600",
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-border text-transparent",
                        )}>
                          {isSelected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </div>
                      <h3 className="font-heading text-sm font-bold leading-tight">{tr(item.name)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tr(item.desc)}</p>
                      <p className="mt-2 font-heading text-base font-extrabold text-gradient">
                        ৳{item.price.toLocaleString()}<span className="text-xs font-medium text-muted-foreground">/mo</span>
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Right: summary */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-2xl shadow-blue-600/20">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">{t('configurator.yourStack')}</h3>
                  {selected.size > 0 && (
                    <button
                      onClick={reset}
                      className="flex items-center gap-1 text-xs text-blue-50/80 transition-colors hover:text-white"
                    >
                      <RotateCcw className="h-3 w-3" /> {t('configurator.reset')}
                    </button>
                  )}
                </div>

                {/* Selected items */}
                <div className="mt-4 min-h-[6rem] space-y-2">
                  <AnimatePresence mode="popLayout">
                    {selectedItems.length === 0 ? (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-6 text-center text-sm text-blue-50/70"
                      >
                        {t('configurator.selectServices')}
                      </motion.p>
                    ) : (
                      selectedItems.map((item) => {
                        const Icon = iconMap[item.icon] ?? Sparkles
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2.5 rounded-lg bg-white/12 px-3 py-2 backdrop-blur"
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="flex-1 truncate text-sm font-medium">{tr(item.name)}</span>
                            <span className="text-xs font-semibold">৳{item.price.toLocaleString()}</span>
                            <button
                              aria-label={`Remove ${item.name}`}
                              onClick={() => toggle(item.id)}
                              className="flex h-5 w-5 items-center justify-center rounded text-blue-50/60 hover:bg-white/20 hover:text-white"
                            >
                              ✕
                            </button>
                          </motion.div>
                        )
                      })
                    )}
                  </AnimatePresence>
                </div>

                {/* Bundle discount badge */}
                {bundleDiscount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-amber-400/20 px-3 py-2 text-amber-100"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold">
                      {bundleDiscount * 100}% {t('configurator.bundleDiscount')}
                    </span>
                  </motion.div>
                )}

                {/* Pricing */}
                <div className="mt-5 space-y-2 border-t border-white/20 pt-4">
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-blue-50/80">
                      <span>{t('configurator.subtotal')}</span>
                      <span className="line-through">৳{total.toLocaleString()}</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-amber-200">
                      <span>{t('configurator.youSave')}</span>
                      <span>−৳{savings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-end justify-between">
                    <span className="text-sm text-blue-50/90">{t('configurator.monthlyTotal')}</span>
                    <motion.span
                      key={discountedTotal}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-heading text-3xl font-extrabold"
                    >
                      ৳{discountedTotal.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                <button
                  onClick={() => openWith(`Custom Stack: ${selectedItems.map((i) => i.name).join(', ')} (৳${discountedTotal}/mo)`)}
                  disabled={selectedItems.length === 0}
                  className={cn(
                    "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-transform",
                    selectedItems.length > 0
                      ? "bg-white text-blue-700 shadow-lg hover:scale-[1.02]"
                      : "cursor-not-allowed bg-white/20 text-white/50",
                  )}
                >
                  {t('configurator.getThisStack')}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-2 text-center text-[11px] text-blue-50/70">
                  {t('configurator.freeCall')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
