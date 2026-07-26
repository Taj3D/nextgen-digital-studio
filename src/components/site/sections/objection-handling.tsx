'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Wallet,
  Users,
  GraduationCap,
  Lock,
  Clock,
  Check,
  MessageCircleQuestion,
  ArrowRight,
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

type Objection = {
  Icon: LucideIcon
  questionEn: string
  questionBn: string
  answerEn: string
  answerBn: string
  proofEn: string
  proofBn: string
}

const OBJECTIONS: Objection[] = [
  {
    Icon: Brain,
    questionEn: "Will AI really understand my business?",
    questionBn: "AI কি সত্যিই আমার ব্যবসা বুঝবে?",
    answerEn:
      "Yes. We train your AI agent on YOUR products, pricing, FAQs and tone. It learns your business before it ever talks to a customer.",
    answerBn:
      "হ্যাঁ। আমরা আপনার AI এজেন্টকে আপনার প্রোডাক্ট, প্রাইসিং, FAQ ও টোনে ট্রেইন করি। কাস্টমারের সাথে কথা বলার আগেই সে আপনার ব্যবসা শেখে।",
    proofEn: "Trained on 200+ data points per business",
    proofBn: "প্রতি ব্যবসায় ২০০+ ডেটা পয়েন্টে ট্রেইন্ড",
  },
  {
    Icon: Wallet,
    questionEn: "Is it too expensive?",
    questionBn: "খরচ কি অনেক?",
    answerEn:
      "Our Starter plan is ৳15,000/month — less than a part-time employee. Most clients recover the cost within 30-60 days from new booked calls.",
    answerBn:
      "আমাদের Starter প্ল্যান ৳১৫,০০০/মাস — একজন পার্ট-টাইম কর্মীর চেয়ে কম। বেশিরভাগ ক্লায়েন্ট ৩০-৬০ দিনে নতুন বুকড কল থেকে খরচ উদ্ধার করেন।",
    proofEn: "Avg. ROI positive in 45 days",
    proofBn: "গড়ে ৪৫ দিনে ROI পজিটিভ",
  },
  {
    Icon: Users,
    questionEn: "Do I need to hire more staff?",
    questionBn: "আরও স্টাফ লাগবে?",
    answerEn:
      "No. That's the point. AI handles the repetitive work — lead qualification, follow-ups, booking — so your existing team focuses on closing.",
    answerBn:
      "না। এটাই মূল কথা। AI পুনরাবৃত্তিমূলক কাজ — লিড যাচাই, ফলো-আপ, বুকিং — সামলায়, যাতে আপনার বিদ্যমান টিম ক্লোজিং-এ ফোকাস করে।",
    proofEn: "Cuts manual work by 70%",
    proofBn: "ম্যানুয়াল কাজ ৭০% কমায়",
  },
  {
    Icon: GraduationCap,
    questionEn: "I'm not technical — can I use this?",
    questionBn: "আমি টেকনিক্যাল নই — ব্যবহার করতে পারব?",
    answerEn:
      "Absolutely. We handle 100% of setup, integration and maintenance. You get a simple dashboard and qualified leads delivered to you.",
    answerBn:
      "একদমই। আমরা ১০০% সেটআপ, ইন্টিগ্রেশন ও রক্ষণাবেক্ষণ সামলাই। আপনি একটি সহজ ড্যাশবোর্ড ও যাচাই করা লিড পান।",
    proofEn: "Zero technical skill required",
    proofBn: "শূন্য টেকনিক্যাল দক্ষতা প্রয়োজন",
  },
  {
    Icon: Lock,
    questionEn: "Is my data safe?",
    questionBn: "আমার ডেটা কি নিরাপদ?",
    answerEn:
      "Yes. All data is encrypted in transit and at rest. We sign NDAs, follow GDPR-aligned practices, and you own your data — always.",
    answerBn:
      "হ্যাঁ। সব ডেটা transit ও at-rest এ এনক্রিপ্টেড। আমরা NDA সাইন করি, GDPR-অনুযায়ী কাজ করি, এবং ডেটার মালিকানা সব সময় আপনার।",
    proofEn: "NDA + GDPR-aligned + encrypted",
    proofBn: "NDA + GDPR-অনুযায়ী + এনক্রিপ্টেড",
  },
  {
    Icon: Clock,
    questionEn: "How fast can I see results?",
    questionBn: "কত দ্রুত ফল দেখব?",
    answerEn:
      "Your AI agent goes live in 7 days. First qualified leads typically arrive within 48 hours of launch. Measurable revenue lift in 30-60 days.",
    answerBn:
      "আপনার AI এজেন্ট ৭ দিনে লাইভ হয়। প্রথম যাচাই করা লিড সাধারণত লঞ্চের ৪৮ ঘণ্টার মধ্যে আসে। ৩০-৬০ দিনে পরিমেয় রাজস্ব উত্থান।",
    proofEn: "Live in 7 days · leads in 48 hrs",
    proofBn: "৭ দিনে লাইভ · ৪৮ ঘণ্টায় লিড",
  },
]

export function ObjectionHandling() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <SectionShell
      id="objection-handling"
      className="relative"
      aria-label={isBn ? 'আপত্তি নিরসন' : 'Objection handling'}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>
          <MessageCircleQuestion className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? 'আপনার প্রশ্ন, উত্তর দেওয়া হলো' : 'Your Questions, Answered'}
        </Eyebrow>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {isBn ? (
            <>
              কী থামাচ্ছে — <span className="gradient-text">দূর করি</span>
            </>
          ) : (
            <>
              What&apos;s Stopping You — <span className="gradient-text">Let&apos;s Clear It Up</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {isBn
            ? '৬টি বড় উদ্বেগ যা শুনি — এবং কীভাবে দূর করি।'
            : 'The 6 biggest concerns we hear — and how we eliminate each one.'}
        </p>
      </Reveal>

      {/* Objection grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
      >
        {OBJECTIONS.map((item, i) => {
          const { Icon } = item
          return (
            <motion.div key={i} variants={staggerItem}>
              <Card className="h-full border-border/60 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
                  {/* Icon + question */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full gradient-brand-soft border border-emerald-500/25"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground pt-1.5">
                      {isBn ? item.questionBn : item.questionEn}
                    </h3>
                  </div>

                  {/* Answer */}
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {isBn ? item.answerBn : item.answerEn}
                  </p>

                  {/* Proof point */}
                  <div className="mt-auto flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                    <span
                      aria-hidden
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full gradient-brand text-white"
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {isBn ? 'যেভাবে সামলাই: ' : 'How we handle it: '}
                      {isBn ? item.proofBn : item.proofEn}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom CTA */}
      <Reveal delay={0.1} className="mt-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-base sm:text-lg font-semibold text-foreground">
            {isBn ? 'এখনও প্রশ্ন আছে? কথা বলি।' : 'Still have a question? Talk to us.'}
          </p>
          <Button
            onClick={() => scrollToId('lead-form')}
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8 text-base gradient-brand text-white border-0 hover:opacity-95 animate-pulse-glow"
          >
            {isBn ? 'আমাদের সাথে কথা বলুন' : 'Talk to our team'}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default ObjectionHandling
