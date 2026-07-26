'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  Inbox,
  Bot,
  CheckCircle,
  RefreshCw,
  CalendarCheck,
  Database,
  Handshake,
  BarChart3,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Stage = {
  num: number
  Icon: LucideIcon
  nameEn: string
  nameBn: string
  descEn: string
  descBn: string
  widthPct: number
}

const STAGES: Stage[] = [
  {
    num: 1,
    Icon: Inbox,
    nameEn: 'Lead Captured',
    nameBn: 'লিড গৃহীত',
    descEn: 'From website, WhatsApp, Messenger, ads',
    descBn: 'ওয়েবসাইট, WhatsApp, Messenger, অ্যাড থেকে',
    widthPct: 100,
  },
  {
    num: 2,
    Icon: Bot,
    nameEn: 'AI Engages',
    nameBn: 'AI এঙ্গেজ করে',
    descEn: 'Instant reply, 24/7, bilingual',
    descBn: 'তাৎক্ষণিক উত্তর, ২৪/৭, দ্বিভাষিক',
    widthPct: 92,
  },
  {
    num: 3,
    Icon: CheckCircle,
    nameEn: 'Qualification',
    nameBn: 'যোগ্যতা যাচাই',
    descEn: 'AI scores & filters hot leads',
    descBn: 'AI হট লিড স্কোর ও ফিল্টার করে',
    widthPct: 84,
  },
  {
    num: 4,
    Icon: RefreshCw,
    nameEn: 'Auto Follow-up',
    nameBn: 'অটো ফলো-আপ',
    descEn: '3-7 touchpoints, no lead forgotten',
    descBn: '৩-৭ টাচপয়েন্ট, কোনো লিড ভুল না',
    widthPct: 76,
  },
  {
    num: 5,
    Icon: CalendarCheck,
    nameEn: 'Booking',
    nameBn: 'বুকিং',
    descEn: 'Auto-scheduled in your calendar',
    descBn: 'আপনার ক্যালেন্ডারে অটো-শিডিউল',
    widthPct: 68,
  },
  {
    num: 6,
    Icon: Database,
    nameEn: 'CRM Update',
    nameBn: 'CRM আপডেট',
    descEn: 'Every interaction logged',
    descBn: 'প্রতিটি ইন্টারঅ্যাকশন লগড',
    widthPct: 60,
  },
  {
    num: 7,
    Icon: Handshake,
    nameEn: 'Sales Close',
    nameBn: 'সেলস ক্লোজ',
    descEn: 'Your team closes warmer leads',
    descBn: 'আপনার টিম উষ্ণ লিড ক্লোজ করে',
    widthPct: 52,
  },
  {
    num: 8,
    Icon: BarChart3,
    nameEn: 'Reporting',
    nameBn: 'রিপোর্টিং',
    descEn: 'Live dashboard, weekly insights',
    descBn: 'লাইভ ড্যাশবোর্ড, সাপ্তাহিক ইনসাইট',
    widthPct: 44,
  },
]

const funnelContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const funnelItem: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const arrowItem: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function AiFrameworkFunnel() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  return (
    <SectionShell
      id="ai-framework-funnel"
      aria-label={isBn ? 'AI রেভিনিউ ফানেল' : 'AI Revenue Funnel'}
    >
      <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <Eyebrow className="mb-4">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? 'রাজস্ব ফানেল' : 'The Revenue Funnel'}
        </Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {isBn ? (
            <>
              একটি ফানেল। <span className="gradient-text">আটটি ধাপ।</span>{' '}
              শূন্য লিক।
            </>
          ) : (
            <>
              One Funnel. <span className="gradient-text">Eight Stages.</span>{' '}
              Zero Leaks.
            </>
          )}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          {isBn
            ? 'প্রতিটি লিড উপরে প্রবেশ করে। AI প্রতিটি ধাপে তাদের বহন করে — স্বয়ংক্রিয়ভাবে।'
            : 'Every lead enters at the top. AI carries them through every stage — automatically.'}
        </p>
      </Reveal>

      {/* Vertical funnel — centered, max-w-2xl */}
      <Reveal className="mx-auto max-w-2xl">
        <motion.ol
          variants={funnelContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center"
        >
          {STAGES.map((stage, idx) => {
            const Icon = stage.Icon
            const isLast = idx === STAGES.length - 1
            // Alternate background fill: even index = gradient-brand, odd = gradient-brand-soft
            const solid = idx % 2 === 0
            return (
              <React.Fragment key={stage.num}>
                <motion.li
                  variants={funnelItem}
                  className="w-full"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-all hover:shadow-glow sm:gap-4 sm:px-5 sm:py-4 ${
                      solid
                        ? 'gradient-brand border-emerald-500/40 text-white'
                        : 'gradient-brand-soft border-emerald-500/30 text-foreground'
                    }`}
                    style={{ width: `${stage.widthPct}%` }}
                  >
                    {/* Stage number badge */}
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${
                        solid
                          ? 'bg-white/20 text-white ring-1 ring-white/40'
                          : 'gradient-brand text-white ring-1 ring-emerald-500/30'
                      }`}
                    >
                      {bn(stage.num)}
                    </span>
                    {/* Icon */}
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                        solid
                          ? 'bg-white/15 text-white'
                          : 'gradient-brand text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    {/* Stage name + description */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-bold sm:text-base ${
                          solid ? 'text-white' : 'text-foreground'
                        }`}
                      >
                        {isBn ? stage.nameBn : stage.nameEn}
                      </p>
                      <p
                        className={`truncate text-xs sm:text-sm ${
                          solid
                            ? 'text-white/80'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {isBn ? stage.descBn : stage.descEn}
                      </p>
                    </div>
                  </div>
                </motion.li>

                {/* ChevronDown between stages */}
                {!isLast && (
                  <motion.div
                    variants={arrowItem}
                    aria-hidden
                    className="my-1 flex items-center justify-center text-emerald-500/60 sm:my-1.5"
                  >
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                )}
              </React.Fragment>
            )
          })}
        </motion.ol>
      </Reveal>

      {/* Stat below funnel */}
      <Reveal className="mx-auto mt-8 max-w-2xl sm:mt-10" delay={0.05}>
        <div className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-500/30 gradient-brand-soft px-5 py-2.5 text-center text-sm sm:text-base">
          <TrendingUp className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
          <span className="font-semibold text-foreground">
            {isBn ? (
              <>
                ম্যানুয়ালের তুলনায় গড়{' '}
                <span className="gradient-text font-bold">{bn('3.2')}x</span>{' '}
                বেশি লিড বুকিং স্টেজে পৌঁছায়
              </>
            ) : (
              <>
                Avg.{' '}
                <span className="gradient-text font-bold">3.2x</span> more
                leads reach booking stage vs. manual
              </>
            )}
          </span>
        </div>
      </Reveal>

      {/* Bottom CTA */}
      <Reveal className="mt-8 text-center sm:mt-10" delay={0.1}>
        <Button
          onClick={() => scrollToId('lead-form')}
          size="lg"
          className="h-12 gap-2 rounded-full gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:h-14 sm:px-8 sm:text-base"
        >
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
          {isBn ? 'আপনার ফানেল বিল্ড করুন' : 'Build Your Funnel'}
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default AiFrameworkFunnel
