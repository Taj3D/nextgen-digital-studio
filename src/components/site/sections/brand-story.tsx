'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  AlertTriangle,
  Compass,
  Map,
  ArrowRight,
  Sparkles,
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

type Chapter = {
  num: number
  Icon: LucideIcon
  labelEn: string
  labelBn: string
  textEn: string
  textBn: string
}

const CHAPTERS: Chapter[] = [
  {
    num: 1,
    Icon: User,
    labelEn: 'THE CHARACTER',
    labelBn: 'চরিত্র',
    textEn:
      'You — a Bangladeshi business owner working 14-hour days, chasing leads, missing calls, losing customers to slower response times.',
    textBn:
      'আপনি — একজন বাংলাদেশি ব্যবসায়ী, ১৪ ঘণ্টা কাজ, লিড ধাওয়া, কল মিস, ধীর রেসপন্সে কাস্টমার হারাচ্ছেন।',
  },
  {
    num: 2,
    Icon: AlertTriangle,
    labelEn: 'THE PROBLEM',
    labelBn: 'সমস্যা',
    textEn:
      'Manual work is killing your growth. Every missed lead is revenue lost. Competitors with AI are winning your customers while you sleep.',
    textBn:
      'ম্যানুয়াল কাজ আপনার গ্রোথ মারছে। প্রতিটি মিস করা লিড হারিয়ে যাওয়া রাজস্ব। AI-যুক্ত প্রতিযোগীরা আপনি ঘুমানোর সময় কাস্টমার জিতছে।',
  },
  {
    num: 3,
    Icon: Compass,
    labelEn: 'THE GUIDE',
    labelBn: 'গাইড',
    textEn:
      "Meet NextGen — Bangladesh's AI automation authority. We've spent 2+ years building AI systems that turn businesses into sales machines. We know your market because we ARE your market.",
    textBn:
      'পরিচয় NextGen — বাংলাদেশের AI অটোমেশন অথরিটি। ২+ বছর ধরে AI সিস্টেম বানাচ্ছি যা ব্যবসাকে সেলস মেশিনে পরিণত করে। আমরা আপনার মার্কেট জানি কারণ আমরা আপনার মার্কেট।',
  },
  {
    num: 4,
    Icon: Map,
    labelEn: 'THE PLAN',
    labelBn: 'পরিকল্পনা',
    textEn:
      'A 3-step plan: (1) Audit your funnel, (2) Deploy AI agents on WhatsApp + web, (3) Automate follow-ups + booking. Simple, proven, fast.',
    textBn:
      '৩-ধাপ প্ল্যান: (১) আপনার ফানেল অডিট, (২) WhatsApp + ওয়েবে AI এজেন্ট ডিপ্লয়, (৩) ফলো-আপ + বুকিং অটোমেট। সহজ, প্রমাণিত, দ্রুত।',
  },
  {
    num: 5,
    Icon: ArrowRight,
    labelEn: 'THE CALL',
    labelBn: 'কল টু অ্যাকশন',
    textEn:
      "Book a free 30-minute strategy call. We'll audit your business and build a custom AI roadmap — zero obligation.",
    textBn:
      'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কল বুক করুন। আমরা আপনার ব্যবসা অডিট করে কাস্টম AI রোডম্যাপ বানাবো — কোনো বাধ্যবাধকতা নেই।',
  },
  {
    num: 6,
    Icon: Sparkles,
    labelEn: 'THE TRANSFORMATION',
    labelBn: 'রূপান্তর',
    textEn:
      "Imagine: leads auto-qualified 24/7, calls booked while you sleep, follow-ups never missed, revenue climbing on autopilot. That's the NextGen transformation.",
    textBn:
      'কল্পনা করুন: ২৪/৭ লিড অটো-যাচাই, ঘুমানোর সময় কল বুকড, ফলো-আপ কখনো মিস না, অটোপাইলটে রাজস্ব বাড়ছে। এটাই NextGen রূপান্তর।',
  },
  {
    num: 7,
    Icon: Trophy,
    labelEn: 'THE SUCCESS',
    labelBn: 'সাফল্য',
    textEn:
      '120+ businesses later — more leads, more calls, more revenue, less stress. Your business runs on AI. You get your time back. That\'s success.',
    textBn:
      '১২০+ ব্যবসা পরে — বেশি লিড, বেশি কল, বেশি রাজস্ব, কম স্ট্রেস। আপনার ব্যবসা AI-এ চলে। আপনি আপনার সময় ফিরে পান। এটাই সাফল্য।',
  },
]

export function BrandStory() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  return (
    <SectionShell
      id="brand-story"
      aria-label={isBn ? 'NextGen ব্র্যান্ড গল্প' : 'NextGen brand story'}
    >
      <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <Eyebrow className="mb-4">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? 'আমাদের গল্প' : 'Our Story'}
        </Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {isBn ? (
            <>
              <span className="gradient-text">NextGen</span>-এর গল্প
            </>
          ) : (
            <>
              The <span className="gradient-text">NextGen</span> Story
            </>
          )}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {isBn
            ? '৭টি অধ্যায়ের একটি গল্প — আপনার চরিত্র থেকে শুরু করে আপনার সাফল্য পর্যন্ত।'
            : 'A 7-chapter story — from your character to your success.'}
        </p>
      </Reveal>

      {/* Card-like container with subtle background */}
      <Reveal className="mx-auto max-w-3xl">
        <Card className="overflow-hidden border-border/60 bg-card/40 backdrop-blur-sm">
          <CardContent className="p-0">
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative border-l border-emerald-500/30 pl-6 pr-4 py-8 sm:pl-8 sm:pr-6 sm:py-10"
            >
              {/* Vertical gradient line overlay on the border-l */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/60 to-amber-500/0"
              />
              {CHAPTERS.map((ch, idx) => {
                const Icon = ch.Icon
                return (
                  <motion.li
                    key={ch.num}
                    variants={staggerItem}
                    className={`relative ${idx === CHAPTERS.length - 1 ? 'pb-0' : 'pb-8 sm:pb-10'}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                      {/* Numbered badge + icon (sits on the vertical line) */}
                      <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
                        <div
                          aria-hidden
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white shadow-glow ring-4 ring-background sm:absolute sm:-left-[2.1rem] sm:h-12 sm:w-12"
                        >
                          {bn(ch.num)}
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 gradient-brand-soft text-emerald-600 dark:text-emerald-300 sm:hidden">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Chapter content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 hidden items-center gap-2 sm:flex">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 gradient-brand-soft text-emerald-600 dark:text-emerald-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            {isBn ? ch.labelBn : ch.labelEn}
                          </span>
                        </div>
                        {/* Mobile label */}
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 sm:hidden">
                          {isBn ? ch.labelBn : ch.labelEn}
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                          {isBn ? ch.textBn : ch.textEn}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ol>
          </CardContent>
        </Card>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mt-10 text-center sm:mt-12" delay={0.1}>
        <Button
          onClick={() => scrollToId('lead-form')}
          size="lg"
          className="h-12 gap-2 rounded-full gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:h-14 sm:px-8 sm:text-base"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          {isBn ? 'আপনার রূপান্তর শুরু করুন' : 'Start Your Transformation'}
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
          {isBn
            ? `${bn(120)}+ ব্যবসা ইতিমধ্যে তাদের গল্প শুরু করেছে। আপনার পালা।`
            : `120+ businesses already started their story. Now it's your turn.`}
        </p>
      </Reveal>
    </SectionShell>
  )
}

export default BrandStory
