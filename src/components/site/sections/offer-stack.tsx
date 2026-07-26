'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Database,
  MessageCircle,
  GraduationCap,
  LayoutDashboard,
  Map,
  TrendingUp,
  FileText,
  BookOpen,
  Video,
  CalendarCheck,
  Check,
  Gift,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type StackItem = {
  Icon: LucideIcon
  nameEn: string
  nameBn: string
  value: number
}

const STACK_ITEMS: StackItem[] = [
  { Icon: Bot, nameEn: 'AI Sales Agent Setup', nameBn: 'AI সেলস এজেন্ট সেটআপ', value: 45000 },
  { Icon: Database, nameEn: 'CRM Automation', nameBn: 'CRM অটোমেশন', value: 35000 },
  { Icon: MessageCircle, nameEn: 'WhatsApp Automation', nameBn: 'WhatsApp অটোমেশন', value: 30000 },
  { Icon: Bot, nameEn: 'AI Chatbot Integration', nameBn: 'AI চ্যাটবট ইন্টিগ্রেশন', value: 25000 },
  { Icon: GraduationCap, nameEn: 'Team Training (2 sessions)', nameBn: 'টিম ট্রেনিং (২ সেশন)', value: 20000 },
  { Icon: LayoutDashboard, nameEn: 'Live Revenue Dashboard', nameBn: 'লাইভ রেভিনিউ ড্যাশবোর্ড', value: 40000 },
  { Icon: Map, nameEn: 'Growth Strategy Roadmap', nameBn: 'গ্রোথ স্ট্র্যাটেজি রোডম্যাপ', value: 35000 },
  { Icon: TrendingUp, nameEn: 'Ongoing Optimization', nameBn: 'চলমান অপটিমাইজেশন', value: 30000 },
  { Icon: FileText, nameEn: 'Template Library (50+ templates)', nameBn: 'টেমপ্লেট লাইব্রেরি (৫০+ টেমপ্লেট)', value: 25000 },
  { Icon: BookOpen, nameEn: 'Documentation & SOPs', nameBn: 'ডকুমেন্টেশন ও SOP', value: 15000 },
  { Icon: Video, nameEn: 'Video Training Library', nameBn: 'ভিডিও ট্রেনিং লাইব্রেরি', value: 20000 },
  { Icon: CalendarCheck, nameEn: 'Weekly Performance Review', nameBn: 'সাপ্তাহিক পারফরম্যান্স রিভিউ', value: 25000 },
]

// Total value is derived from the stack items so it can never drift if items
// are added/removed/edited.
const TOTAL_VALUE = STACK_ITEMS.reduce((sum, item) => sum + item.value, 0)
const TODAYS_PRICE = 35000

export function OfferStack() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
      : String(s)

  const formatTaka = (n: number) => '৳' + bn(n.toLocaleString('en-IN'))

  return (
    <SectionShell
      id="offer-stack"
      className="relative"
      aria-label={isBn ? 'অফার স্ট্যাক' : 'Offer stack'}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>
          <Gift className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? 'অফার' : 'The Offer'}
        </Eyebrow>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {isBn ? 'যা পাবেন — মূল্য ' : 'Everything You Get — Worth '}
          <span className="gradient-text">{formatTaka(TOTAL_VALUE)}</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {isBn
            ? `আজকের মূল্য: ${formatTaka(TODAYS_PRICE)} সেটআপ + মাসিক প্ল্যান। সম্পূর্ণ স্ট্যাক দেখুন।`
            : `Today's price: ${formatTaka(TODAYS_PRICE)} setup + monthly plan. Here's the full stack.`}
        </p>
      </Reveal>

      {/* Stack list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto mt-12 max-w-3xl"
      >
        <Card className="border-emerald-500/20 bg-card/70 backdrop-blur-sm">
          <CardContent className="flex flex-col gap-2">
            {STACK_ITEMS.map((item, i) => {
              const { Icon } = item
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border/50 bg-background/60 px-3 py-3 sm:px-4 sm:py-3.5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5"
                >
                  {/* Icon tile */}
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg gradient-brand-soft border border-emerald-500/20">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                      {isBn ? item.nameBn : item.nameEn}
                    </p>
                  </div>

                  {/* Value */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                      {formatTaka(item.value)}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full gradient-brand text-white"
                    >
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Total value + Today's price highlight */}
      <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
        <Card className="border-2 border-emerald-500/40 gradient-brand-soft overflow-hidden">
          <CardContent className="flex flex-col gap-6">
            {/* Total value line */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? 'মোট মূল্য' : 'Total Value'}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-muted-foreground line-through decoration-red-500/70 decoration-2 tabular-nums">
                {formatTaka(TOTAL_VALUE)}
              </span>
            </div>

            {/* Today's price box */}
            <div className="rounded-2xl gradient-brand p-5 sm:p-7 text-center shadow-glow">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                <Sparkles className="h-3.5 w-3.5" />
                {isBn ? "আজকের মূল্য" : "Today's Price"}
              </div>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                  {formatTaka(TODAYS_PRICE)}
                </span>
                <span className="text-base sm:text-lg font-medium text-white/90">
                  {isBn ? 'সেটআপ' : 'setup'}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">
                {isBn ? '+ মাসিক প্ল্যান' : '+ monthly plan'}
              </p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => scrollToId('lead-form')}
              className="h-14 w-full text-base sm:text-lg font-semibold gradient-brand animate-pulse-glow text-white hover:opacity-95"
              size="lg"
            >
              <Gift className="mr-2 h-5 w-5" />
              {isBn ? 'অফারটি নিন' : 'Claim This Offer'}
            </Button>
          </CardContent>
        </Card>
      </Reveal>

      {/* Trust note */}
      <Reveal delay={0.15} className="mx-auto mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground text-center">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            {isBn ? 'কোনো লুকানো ফি নেই' : 'No hidden fees'}
          </span>
          <span aria-hidden className="text-emerald-500/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            {isBn ? 'যেকোনো সময় বাতিল করুন' : 'Cancel anytime'}
          </span>
          <span aria-hidden className="text-emerald-500/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            {isBn ? '৬০ দিনের ROI গ্যারান্টি' : '60-day ROI guarantee'}
          </span>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default OfferStack
