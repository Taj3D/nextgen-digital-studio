'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Clock,
  Users,
  Unlock,
  HeartHandshake,
  BadgeDollarSign,
  Headset,
  FileCheck,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, SectionShell, Eyebrow, staggerContainer, staggerItem } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card } from '@/components/ui/card'

type RiskItem = {
  icon: LucideIcon
  titleEn: string
  titleBn: string
  descEn: string
  descBn: string
}

const RISK_ITEMS: RiskItem[] = [
  {
    icon: ShieldCheck,
    titleEn: '60-Day ROI Guarantee',
    titleBn: '৬০ দিনের ROI গ্যারান্টি',
    descEn: 'No measurable revenue lift in 60 days? We work for free until you do.',
    descBn: '৬০ দিনে কোনো পরিমেয় রাজস্ব উত্থান না থাকলে? ফল না হওয়া পর্যন্ত ফ্রি কাজ করি।',
  },
  {
    icon: BadgeDollarSign,
    titleEn: 'Free AI Audit',
    titleBn: 'ফ্রি AI অডিট',
    descEn: 'Full audit of your sales funnel — ৳15,000 value, yours free, no strings.',
    descBn: 'আপনার সেলস ফানেলের সম্পূর্ণ অডিট — ৳১৫,০০০ মূল্য, আপনার ফ্রি, কোনো শর্ত নেই।',
  },
  {
    icon: HeartHandshake,
    titleEn: 'Free Strategy Session',
    titleBn: 'ফ্রি স্ট্র্যাটেজি সেশন',
    descEn: '30-minute custom AI roadmap call. Zero obligation, zero pressure.',
    descBn: '৩০-মিনিট কাস্টম AI রোডম্যাপ কল। কোনো বাধ্যবাধকতা নেই, কোনো চাপ নেই।',
  },
  {
    icon: Unlock,
    titleEn: 'Cancel Anytime',
    titleBn: 'যেকোনো সময় ক্যানসেল',
    descEn: 'Month-to-month plans. 7 days notice. No lock-in, no cancellation fees.',
    descBn: 'মাসে-টু-মাস প্ল্যান। ৭ দিন নোটিশ। কোনো লক-ইন নেই, কোনো ক্যানসেলেশন ফি নেই।',
  },
  {
    icon: FileCheck,
    titleEn: 'No Hidden Fees',
    titleBn: 'কোনো হিডেন ফি নেই',
    descEn: 'Transparent pricing. Third-party costs billed at cost — never marked up.',
    descBn: 'স্বচ্ছ মূল্য। থার্ড-পার্টি খরচ মূল্যে বিল — কখনো বাড়ানো নয়।',
  },
  {
    icon: Headset,
    titleEn: 'Dedicated Support',
    titleBn: 'ডেডিকেটেড সাপোর্ট',
    descEn: 'Your own account manager on WhatsApp. Replies within 2 business hours.',
    descBn: 'WhatsApp-এ আপনার নিজের অ্যাকাউন্ট ম্যানেজার। ২ ব্যবসায়িক ঘণ্টায় উত্তর।',
  },
  {
    icon: Users,
    titleEn: 'You Own Everything',
    titleBn: 'সবকিছু আপনার',
    descEn: 'AI agents, automations, data, code — all yours. We hand over on exit.',
    descBn: 'AI এজেন্ট, অটোমেশন, ডেটা, কোড — সব আপনার। বের হওয়ার সময় হ্যান্ডওভার করি।',
  },
  {
    icon: Clock,
    titleEn: '30-Day Transition',
    titleBn: '৩০ দিনের ট্রানজিশন',
    descEn: 'Cancel? We give 30 days free transition support so nothing breaks.',
    descBn: 'ক্যানসেল? আমরা ৩০ দিন ফ্রি ট্রানজিশন সাপোর্ট দিই যাতে কিছু না ভাঙে।',
  },
]

export function GuaranteeSection() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <SectionShell id="guarantee" aria-label={isBn ? 'ঝুঁকি বিপরীতমুখী গ্যারান্টি' : 'Risk reversal guarantee'}>
      <Reveal>
        <div className="rounded-3xl gradient-brand-soft border border-emerald-500/20 p-8 sm:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid h-16 w-16 place-items-center rounded-2xl gradient-brand text-white shadow-glow"
            >
              <ShieldCheck className="h-8 w-8" aria-hidden />
            </motion.div>
            <Eyebrow>{isBn ? 'ঝুঁকি আমাদের, ফল আপনার' : 'Our Risk, Your Reward'}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text max-w-3xl">
              {isBn
                ? '৮টি গ্যারান্টি — আপনার পুরো ঝুঁকি আমরা নিই'
                : '8 Guarantees — We Take All The Risk'}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'আপনি কোনো ঝুঁকি ছাড়াই শুরু করেন। আমরা ফল না হলে ফ্রি কাজ করি, যেকোনো সময় ক্যানসেল করতে পারেন, এবং সবকিছু আপনার মালিকানায় থাকে।'
                : 'You start with zero risk. We work free if results don\'t come, you can cancel anytime, and you own everything. We earn your business every single month.'}
            </p>
          </div>

          {/* 8 risk-reversal cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {RISK_ITEMS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={i} variants={staggerItem}>
                  <Card className="h-full bg-background/70 backdrop-blur-sm border-border/60 hover:border-emerald-500/40 hover:shadow-glow transition-all duration-300 p-5 flex flex-col gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isBn ? item.descBn : item.descEn}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default GuaranteeSection
