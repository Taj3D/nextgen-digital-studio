'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Play, CheckCircle2, TrendingUp, Bot, MessageCircle, Calendar, Users } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const orbs = [
  {
    className: 'bg-emerald-500/30',
    size: 'h-72 w-72 sm:h-96 sm:w-96',
    pos: '-top-24 -left-24',
    delay: 0,
    dur: 9,
  },
  {
    className: 'bg-teal-500/30',
    size: 'h-80 w-80 sm:h-[28rem] sm:w-[28rem]',
    pos: 'top-32 -right-28',
    delay: 1.5,
    dur: 11,
  },
  {
    className: 'bg-amber-400/25',
    size: 'h-64 w-64 sm:h-80 sm:w-80',
    pos: '-bottom-24 left-1/3',
    delay: 3,
    dur: 10,
  },
]

const stats = [
  { value: 'hero.stat1Value', label: 'hero.stat1Label' },
  { value: 'hero.stat2Value', label: 'hero.stat2Label' },
  { value: 'hero.stat3Value', label: 'hero.stat3Label' },
  { value: 'hero.stat4Value', label: 'hero.stat4Label' },
] as const

/** Animated revenue dashboard mockup — gives the hero "Category Leader" visual authority. */
function HeroDashboard() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  // Animated counter for revenue
  const [revenue, setRevenue] = React.useState(0)
  const targetRevenue = 184000
  React.useEffect(() => {
    const duration = 1800
    const steps = 60
    const inc = targetRevenue / steps
    let cur = 0
    const id = setInterval(() => {
      cur += inc
      if (cur >= targetRevenue) {
        cur = targetRevenue
        clearInterval(id)
      }
      setRevenue(Math.round(cur))
    }, duration / steps)
    return () => clearInterval(id)
  }, [])

  const fmt = (n: number) => '৳' + bn(Math.round(n).toLocaleString('en-US'))

  const bars = [40, 55, 35, 70, 60, 85, 75, 95]

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Glow behind dashboard */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-amber-400/15 blur-2xl"
      />

      {/* Dashboard card */}
      <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top bar — browser-like */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-background/60 px-3 py-1 text-[10px] text-muted-foreground font-mono truncate">
            app.nextgen.studio/dashboard
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-4 sm:p-5 grid grid-cols-3 gap-3">
          {/* Revenue card — spans 2 cols */}
          <div className="col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'মাসিক রাজস্ব' : 'Monthly Revenue'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                {bn('+34%')}
              </span>
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-bold gradient-text">
              {fmt(revenue)}
            </div>
            {/* Mini bar chart */}
            <div className="mt-3 flex items-end gap-1 h-12">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                  className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? 'bg-emerald-500' : 'bg-emerald-500/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Leads card */}
          <div className="rounded-xl border border-border/60 bg-card/60 p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {isBn ? 'লিড আজ' : 'Leads Today'}
            </span>
            <div className="mt-1 text-2xl font-bold text-foreground">{bn(47)}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              {isBn ? '৩২ যাচাই করা' : '32 qualified'}
            </div>
          </div>

          {/* AI Chat preview */}
          <div className="col-span-2 rounded-xl border border-border/60 bg-card/60 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Bot className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] font-semibold text-foreground">
                {isBn ? 'AI চ্যাট এজেন্ট' : 'AI Chat Agent'}
              </span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-muted px-2.5 py-1 text-[10px] text-foreground">
                  {isBn ? 'আপনার প্রোডাক্টের দাম কত?' : 'What is the price of your product?'}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-tr-sm gradient-brand px-2.5 py-1 text-[10px] text-white">
                  {isBn ? '৳১৫,০০০ থেকে শুরু। আপনার জন্য কোন প্যাকেজ সেরা?' : 'Starts at ৳15,000. Which package suits you?'}
                </div>
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'বুকড' : 'Booked'}
              </span>
            </div>
            <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">{bn(8)}</div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Users className="h-3 w-3" />
              {isBn ? 'আজ' : 'today'}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-3 w-3 text-emerald-500" />
            <span className="text-[10px] text-muted-foreground">
              {isBn ? 'WhatsApp সংযুক্ত' : 'WhatsApp connected'}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            {isBn ? '● লাইভ ২৪/৭' : '● Live 24/7'}
          </span>
        </div>
      </div>

      {/* Floating badge — "AI Powered" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -right-3 -top-3 sm:-right-6 sm:-top-6 rounded-full gradient-brand px-3 py-1.5 text-[10px] font-bold text-white shadow-lg flex items-center gap-1"
      >
        <Sparkles className="h-3 w-3" />
        {isBn ? 'AI চালিত' : 'AI Powered'}
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLang()

  const title = t('hero.title')
  const highlight = t('hero.titleHighlight')
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title]

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background"
      aria-label={t('aria.hero')}
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />

      {/* Floating gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${orb.pos} ${orb.size} rounded-full ${orb.className} blur-3xl`}
          animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — Copy + CTAs */}
          <div className="flex flex-col items-start text-left gap-6">
            {/* Eyebrow */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{t('home.heroBadge')}</span>
              </div>
            </Reveal>

            {/* H1 */}
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                {parts.length > 1 ? (
                  <>
                    {parts[0]}
                    <span className="gradient-text">{highlight}</span>
                    {parts[1]}
                  </>
                ) : (
                  title
                )}
              </h1>
            </Reveal>

            {/* Subtitle */}
            <Reveal delay={0.2}>
              <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            {/* Sub-subtitle (location) */}
            <Reveal delay={0.25}>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {t('home.heroSubSub')}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button
                  onClick={() => scrollToId('lead-form')}
                  className="gradient-brand animate-pulse-glow h-14 px-8 text-base text-white w-full sm:w-auto hover:opacity-95"
                  size="lg"
                >
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToId('lead-magnets')}
                  className="h-14 px-8 text-base w-full sm:w-auto border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  {t('home.heroCtaSecondary')}
                </Button>
              </div>
            </Reveal>

            {/* Trust badges — expanded to 6 chips */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-2">
                {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3'), t('home.trust4'), t('home.trust5'), t('home.trust6')].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Product dashboard visual */}
          <Reveal delay={0.35} className="order-first lg:order-last">
            <HeroDashboard />
          </Reveal>
        </div>

        {/* Stats — full width below */}
        <Reveal delay={0.5} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 text-center"
              >
                <div className="gradient-text text-3xl font-bold">{t(s.value)}</div>
                <div className="text-muted-foreground text-sm mt-1">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default HeroSection
