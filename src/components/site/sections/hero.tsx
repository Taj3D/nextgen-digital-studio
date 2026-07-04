'use client'

import * as React from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  PlayCircle,
  Star,
  Sparkles,
  Bot,
  Check,
  TrendingUp,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "../reveal"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { stats } from "@/lib/site-data"

const trustBadgeKeys = [
  { icon: Clock, key: "hero.freeCall" },
  { icon: ShieldCheck, key: "hero.noCommitment" },
  { icon: Check, key: "hero.bilingual" },
]

export function Hero() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] animate-blob rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -right-24 top-24 h-[30rem] w-[30rem] animate-blob rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 animate-blob rounded-full bg-indigo-500/10 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex justify-center lg:justify-start"
            >
              <Eyebrow>{t('hero.badge')}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
            >
              {t('hero.title1')}{" "}
              <span className="text-gradient">{t('hero.title2')}</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center"
            >
              <Button
                onClick={() => openWith()}
                size="lg"
                className="h-13 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 text-[15px] font-semibold shadow-xl shadow-blue-600/25 transition-transform hover:scale-[1.02] sm:w-auto"
              >
                {t('cta.bookFreeCall')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 w-full rounded-xl border-border/70 bg-background/60 px-6 text-[15px] font-semibold backdrop-blur sm:w-auto"
              >
                <a href="#services">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {t('cta.exploreServices')}
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["TA", "NJ", "RH", "SR"].map((i) => (
                    <span
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white"
                    >
                      {i}
                    </span>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('hero.trustedPrefix')} <span className="font-semibold text-foreground">{t('hero.businessesCount')}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              {trustBadgeKeys.map((b) => (
                <span
                  key={b.key}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                >
                  <b.icon className="h-3.5 w-3.5 text-blue-600" />
                  {t(b.key)}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: floating AI agent mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-transparent blur-2xl" />

              {/* Main chat card */}
              <div className="glass-strong rounded-3xl p-5 shadow-2xl shadow-blue-600/10">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                      <Bot className="h-5 w-5 text-white" />
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">{t('hero.aiAgent')}</p>
                      <p className="text-[11px] text-emerald-500">{t('hero.onlineBilingual')}</p>
                    </div>
                  </div>
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>

                <div className="space-y-3 py-4">
                  <div className="flex justify-end">
                    <p className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-cyan-500 px-3.5 py-2 text-[13px] text-white shadow">
                      {t('hero.chatUser1')}
                    </p>
                  </div>
                  <div className="flex justify-start">
                    <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-[13px]">
                      আসসালামু আলাইকুম! Yes, the 3-bed Gulshan apartment is available. Would you like to book a site visit this weekend? 🏠
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <p className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-cyan-500 px-3.5 py-2 text-[13px] text-white shadow">
                      {t('hero.chatUser2')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 pl-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-500/10 px-3.5 py-2.5">
                  <p className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" /> {t('hero.chatSuccess')}
                  </p>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/4 hidden rounded-2xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-none">+212%</p>
                    <p className="text-[10px] text-muted-foreground">{t('hero.qualifiedLeads')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-10 hidden rounded-2xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-none">&lt; 5s</p>
                    <p className="text-[10px] text-muted-foreground">{t('hero.responseTime')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-sm backdrop-blur lg:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative px-6 py-7 text-center transition-colors hover:bg-blue-600/[0.03] sm:px-8 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r border-border/50"
              >
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="font-heading text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl lg:text-[2.5rem]">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                  {tr(s.label)}
                </p>
                <span className="mx-auto mt-3 block h-1 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-30 transition-all group-hover:w-12 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
