'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Quote,
  BadgeCheck,
  BookOpen,
  Mic,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, SectionShell, staggerContainer, staggerItem } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

type Credential = {
  icon: LucideIcon
  labelEn: string
  labelBn: string
}

const CREDENTIALS: Credential[] = [
  { icon: BookOpen, labelEn: 'AI Automation Author', labelBn: 'AI অটোমেশন লেখক' },
  { icon: Mic, labelEn: 'Keynote Speaker', labelBn: 'কীনোট স্পিকার' },
  { icon: GraduationCap, labelEn: 'AI Trainer (500+ students)', labelBn: 'AI ট্রেইনার (৫০০+ ছাত্র)' },
  { icon: Users, labelEn: '120+ Businesses Served', labelBn: '১২০+ ব্যবসা সেবা' },
  { icon: Award, labelEn: 'Founder, NextGen Digital Studio', labelBn: 'প্রতিষ্ঠাতা, NextGen Digital Studio' },
  { icon: BadgeCheck, labelEn: 'TIN · Trade License · BIN', labelBn: 'TIN · ট্রেড লাইসেন্স · BIN' },
]

const STATS = [
  { valueEn: '2+', valueBn: '২+', labelEn: 'Years Building AI Systems', labelBn: 'বছর AI সিস্টেম বানাচ্ছি' },
  { valueEn: '120+', valueBn: '১২০+', labelEn: 'Businesses Automated', labelBn: 'ব্যবসা অটোমেট করেছি' },
  { valueEn: '500+', valueBn: '৫০০+', labelEn: 'Students Trained', labelBn: 'ছাত্র ট্রেইনড' },
  { valueEn: '15K+', valueBn: '১৫হাজার+', labelEn: 'Leads Generated', labelBn: 'লিড তৈরি' },
]

export function FounderSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  const alt = isBn
    ? 'মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) — NextGen Digital Studio-এর প্রতিষ্ঠাতা ও CEO'
    : 'Md. Najmul Islam Taj (Taj Bhai) — Founder & CEO, NextGen Digital Studio'

  return (
    <SectionShell
      id="founder"
      aria-label={isBn ? 'প্রতিষ্ঠাতা' : 'Founder'}
      className="bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/10"
    >
      {/* Eyebrow */}
      <Reveal className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          {isBn ? 'আপনার AI গ্রোথ পার্টনার' : 'Meet Your AI Growth Partner'}
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {isBn ? (
            <>
              <span className="gradient-text">তাজ ভাই</span> — যিনি বাংলাদেশের ব্যবসাকে AI দিয়ে এগিয়ে নিচ্ছেন
            </>
          ) : (
            <>
              <span className="gradient-text">Taj Bhai</span> — Leading Bangladesh&apos;s AI Revolution
            </>
          )}
        </h2>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        {/* LEFT — Founder photo + stats */}
        <Reveal>
          <div className="flex flex-col gap-6">
            <div className="relative mx-auto w-fit">
              {/* Glow ring */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-amber-500/20 blur-2xl"
              />
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-500/30 shadow-xl">
                <Image
                  src="/founder.png"
                  alt={alt}
                  width={360}
                  height={360}
                  className="object-cover"
                  priority={false}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background border border-amber-500/30 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 shadow-lg flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5" />
                {isBn ? 'প্রতিষ্ঠাতা ও CEO' : 'Founder & CEO'}
              </div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 bg-card/60 p-3 text-center"
                >
                  <div className="text-xl font-bold gradient-text">
                    {isBn ? s.valueBn : s.valueEn}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {isBn ? s.labelBn : s.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* RIGHT — Bio + quote + credentials + CTA */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5">
            {/* Name + title */}
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {isBn ? 'মোঃ নাজমুল ইসলাম তাজ' : 'Mohammad Nazmul Islam Taj'}
              </h3>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
                {isBn
                  ? 'প্রতিষ্ঠাতা ও CEO · NextGen Digital Studio · যশোর, বাংলাদেশ'
                  : 'Founder & CEO · NextGen Digital Studio · Jessore, Bangladesh'}
              </p>
            </div>

            {/* Bio */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {isBn
                ? 'তাজ ভাই বাংলাদেশের AI সেলস অটোমেশনের অগ্রগণ্য পথিক। ২+ বছর ধরে তিনি ১২০+ বাংলাদেশি ব্যবসাকে AI এজেন্ট, WhatsApp অটোমেশন ও CRM সিস্টেম দিয়ে সেলস মেশিনে পরিণত করেছেন।'
                : 'Taj Bhai is a pioneer of AI sales automation in Bangladesh. For 2+ years, he has transformed 120+ Bangladeshi businesses into sales machines using AI agents, WhatsApp automation, and CRM systems.'}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {isBn
                ? 'তিনি বিশ্বাস করেন — AI শুধু বড় কোম্পানির জিনিস নয়। বাংলাদেশের প্রতিটি ব্যবসা, ছোট হোক বা বড়, AI দিয়ে গ্রোথ করতে পারে। তার মিশন — বাংলাদেশের প্রতিটি ব্যবসাকে AI-চালিত করা।'
                : 'He believes AI isn\'t just for big companies. Every Bangladeshi business — small or large — can grow with AI. His mission: make every business in Bangladesh AI-powered.'}
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-lg font-medium italic text-foreground">
              &ldquo;{isBn
                ? 'আমি শুধু টুল বিক্রি করি না। আমি আপনার ব্যবসাকে এমন একটি সিস্টেম দিই যা ২৪/৭ আপনার জন্য কাজ করে — আপনি ঘুমানোর সময়ও।'
                : 'I don\'t just sell tools. I give your business a system that works for you 24/7 — even while you sleep.'}&rdquo;
            </blockquote>

            {/* Credentials grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {CREDENTIALS.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-card/60 px-3 py-2.5 text-sm text-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">{isBn ? c.labelBn : c.labelEn}</span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                onClick={() => {
                  const el = document.getElementById('lead-form')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="gradient-brand text-white h-12"
                size="lg"
              >
                {isBn ? 'তাজ ভাইয়ের সাথে কথা বলুন' : 'Talk to Taj Bhai'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  window.location.href = '/founder'
                }}
                variant="outline"
                className="border-amber-500/40 text-foreground hover:bg-amber-500/10 hover:text-foreground h-12"
                size="lg"
              >
                {isBn ? 'সম্পূর্ণ গল্প পড়ুন' : 'Read Full Story'}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default FounderSection
