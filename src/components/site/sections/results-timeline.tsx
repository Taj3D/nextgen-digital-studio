'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Map,
  Bot,
  Database,
  TrendingUp,
  Trophy,
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

type Milestone = {
  day: number
  Icon: LucideIcon
  titleEn: string
  titleBn: string
  descEn: string
  descBn: string
}

const MILESTONES: Milestone[] = [
  {
    day: 1,
    Icon: Rocket,
    titleEn: 'Kickoff & Audit',
    titleBn: 'কিকঅফ ও অডিট',
    descEn:
      "Deep-dive audit of your current sales process, tech stack and lead flow. We map every bottleneck.",
    descBn:
      'বর্তমান সেলস প্রসেস, টেক স্ট্যাক ও লিড ফ্লোর ডিপ-ডাইভ অডিট। প্রতিটি বাধা চিহ্নিত করি।',
  },
  {
    day: 3,
    Icon: Map,
    titleEn: 'Strategy & Roadmap',
    titleBn: 'স্ট্র্যাটেজি ও রোডম্যাপ',
    descEn:
      'Custom AI + automation roadmap delivered. You approve the 90-day plan before we build.',
    descBn:
      'কাস্টম AI + অটোমেশন রোডম্যাপ ডেলিভারি। বিল্ডের আগে আপনি ৯০ দিনের প্ল্যান অনুমোদন করেন।',
  },
  {
    day: 7,
    Icon: Bot,
    titleEn: 'AI Agent Goes Live',
    titleBn: 'AI এজেন্ট লাইভ',
    descEn:
      'Your AI sales agent is deployed on WhatsApp + website. Starts qualifying leads 24/7, instantly.',
    descBn:
      'আপনার AI সেলস এজেন্ট WhatsApp + ওয়েবসাইটে ডিপ্লয় হয়। ২৪/৭ তাৎক্ষণিকভাবে লিড যাচাই শুরু করে।',
  },
  {
    day: 30,
    Icon: Database,
    titleEn: 'CRM + Automation Live',
    titleBn: 'CRM + অটোমেশন লাইভ',
    descEn:
      'Full CRM automation, follow-up sequences and booking system operational. First revenue lift measured.',
    descBn:
      'সম্পূর্ণ CRM অটোমেশন, ফলো-আপ সিকোয়েন্স ও বুকিং সিস্টেম চালু। প্রথম রাজস্ব উত্থান পরিমাপ।',
  },
  {
    day: 60,
    Icon: TrendingUp,
    titleEn: 'Optimization & Scale',
    titleBn: 'অপটিমাইজেশন ও স্কেল',
    descEn:
      'Data-driven optimization cycle. Conversion rates improve. We add channels (Messenger, Email, Voice).',
    descBn:
      'ডেটা-চালিত অপটিমাইজেশন সাইকেল। কনভার্সন রেট উন্নত। নতুন চ্যানেল যোগ (Messenger, ইমেইল, ভয়েস)।',
  },
  {
    day: 90,
    Icon: Trophy,
    titleEn: 'ROI Proven',
    titleBn: 'ROI প্রমাণিত',
    descEn:
      'Measurable ROI achieved. You receive a full performance report + next-quarter growth plan.',
    descBn:
      'পরিমেয় ROI অর্জিত। সম্পূর্ণ পারফরম্যান্স রিপোর্ট + পরবর্তী কোয়ার্টার গ্রোথ প্ল্যান গ্রহণ।',
  },
]

export function ResultsTimeline() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
      : String(s)

  return (
    <SectionShell
      id="results-timeline"
      className="relative"
      aria-label={isBn ? '৯০ দিনের রোডম্যাপ' : '90-day results roadmap'}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>
          <Map className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? 'রোডম্যাপ' : 'The Roadmap'}
        </Eyebrow>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {isBn ? 'হ্যাঁ বলার পর কী হয়' : 'What Happens After You Say Yes'}
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {isBn
            ? 'কিকঅফ থেকে পরিমেয় ROI পর্যন্ত ৯০ দিনের স্পষ্ট রোডম্যাপ।'
            : 'A clear 90-day roadmap from kickoff to measurable ROI.'}
        </p>
      </Reveal>

      {/* Timeline card */}
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
        <Card className="border-emerald-500/25 gradient-brand-soft overflow-hidden">
          <CardContent className="pt-2">
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              {/* Vertical line */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[18px] sm:left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-amber-500/40"
              />

              {MILESTONES.map((m, i) => {
                const { Icon } = m
                return (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
                  >
                    {/* Dot + icon */}
                    <div className="relative z-10 shrink-0">
                      <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full gradient-brand shadow-glow ring-4 ring-background">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-glow">
                          {isBn ? 'দিন' : 'Day'} {bn(m.day)}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {isBn ? m.titleBn : m.titleEn}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {isBn ? m.descBn : m.descEn}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ol>
          </CardContent>
        </Card>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.15} className="mx-auto mt-10 max-w-3xl text-center">
        <Button
          onClick={() => scrollToId('lead-form')}
          className="h-14 px-8 text-base sm:text-lg font-semibold gradient-brand animate-pulse-glow text-white hover:opacity-95"
          size="lg"
        >
          <Rocket className="mr-2 h-5 w-5" />
          {isBn ? 'আপনার ৯০ দিনের যাত্রা শুরু করুন' : 'Start Your 90-Day Journey'}
        </Button>
      </Reveal>
    </SectionShell>
  )
}

export default ResultsTimeline
