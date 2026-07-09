'use client'

import * as React from 'react'
import Image from 'next/image'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingEyebrow,
  LandingFooter,
  LandingLeadForm,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import { Check, Clock, Calendar, Brain, MessageSquare, Code, Rocket, Star, Users, Heart, Sparkles, Target } from 'lucide-react'

/* 4 course modules (per user spec) */
const MODULES = [
  {
    n: 1,
    t_en: 'AI Mindset',
    t_bn: 'এআই মানসিকতা',
    d_en: 'What AI is, how it works, and why it changes everything.',
    d_bn: 'এআই কী, কিভাবে কাজ করে, এবং কেন এটি সব বদলে দিচ্ছে।',
    Icon: Brain,
  },
  {
    n: 2,
    t_en: 'Prompt Engineering',
    t_bn: 'প্রম্পট ইঞ্জিনিয়ারিং',
    d_en: 'Write the right prompts to get the best results.',
    d_bn: 'সঠিক প্রম্পট লিখে সেরা ফল পান।',
    Icon: MessageSquare,
  },
  {
    n: 3,
    t_en: 'Hands-on Project',
    t_bn: 'হাতে কলমে প্রজেক্ট',
    d_en: 'Build a real software from scratch.',
    d_bn: 'বাস্তব সফটওয়্যার তৈরি করুন শূন্য থেকে।',
    Icon: Code,
  },
  {
    n: 4,
    t_en: 'Launch & Marketing',
    t_bn: 'লঞ্চ ও মার্কেটিং',
    d_en: 'Strategies to release your product to the market.',
    d_bn: 'আপনার প্রোডাক্ট বাজারে ছাড়ার কৌশল।',
    Icon: Rocket,
  },
]

/* What you'll learn (8 items) */
const LEARN = [
  { t_en: 'Code with AI', t_bn: 'এআই দিয়ে কোড' },
  { t_en: 'Prompt writing', t_bn: 'প্রম্পট লেখা' },
  { t_en: 'Websites / Apps / Bots', t_bn: 'ওয়েবসাইট / অ্যাপ / বট' },
  { t_en: 'Debugging', t_bn: 'ডিবাগিং' },
  { t_en: 'Launch', t_bn: 'লঞ্চ' },
  { t_en: 'Freelancing', t_bn: 'ফ্রিল্যান্সিং' },
  { t_en: 'AI tools mastery', t_bn: 'এআই টুলস দক্ষতা' },
  { t_en: 'Real project building', t_bn: 'বাস্তব প্রজেক্ট তৈরি' },
]

export function TrainingClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('ai_training_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-background to-background dark:from-blue-950/30" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
            <LandingEyebrow>
              <Sparkles className="h-3 w-3" /> {isBn ? '১ সপ্তাহ · রাত ৯টা · হাতে কলমে' : '1 Week · 9 PM · Hands-on'}
            </LandingEyebrow>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {isBn ? (
                <>
                  🔥 মাত্র <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">১০০০ টাকায়</span> হাতে কলমে এআই শিখুন!
                </>
              ) : (
                <>
                  🔥 Learn AI hands-on for just <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">1000TK!</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-lg font-bold text-blue-600 dark:text-blue-400">
              {isBn ? '"এআই দিয়ে সফটওয়্যার তৈরি শিখুন"' : '"Learn to build software with AI"'}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {isBn
                ? 'প্রতিদিন রাত ৯টায় লাইভ জুম ক্লাস, ১ সপ্তাহে ৪টি মডিউল, হাতে কলমে প্রজেক্ট। কোনো প্রোগ্রামিং জ্ঞান লাগবে না — শুধু শেখার তাগিদ।'
                : 'Daily live Zoom at 9 PM, 4 modules in 1 week, hands-on projects. No programming background needed — just the desire to learn.'}
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{isBn ? 'সময়' : 'Time'}</div>
                  <div className="text-sm font-bold">{isBn ? 'রাত ৯টা' : '9 PM'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
                <Calendar className="h-5 w-5 text-cyan-600" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{isBn ? 'সময়কাল' : 'Duration'}</div>
                  <div className="text-sm font-bold">{isBn ? '১ সপ্তাহ' : '1 week'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-50 px-4 py-3 dark:bg-blue-950/30">
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{isBn ? 'ফি' : 'Fee'}</div>
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300">৳1,000</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppCTA isBn={isBn} />
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* 2. Pain */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Heart className="h-3 w-3" /> {isBn ? 'আপনার কষ্ট আমরা বুঝি' : 'We understand your pain'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'সফটওয়্যার তৈরি করতে চান কিন্তু...' : 'You want to build software but...'}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                isBn ? 'কোডিং শিখতে মাসের পর মাস লাগে' : 'Coding takes months to learn',
                isBn ? 'ইউনিভার্সিটিতে ৪ বছর লাগে' : 'University takes 4 years',
                isBn ? 'অন্যরা এআই দিয়ে আয় করছে, আপনি পিছিয়ে' : 'Others earn with AI, you lag behind',
                isBn ? 'আইডিয়া আছে কিন্তু বানাতে পারছেন না' : 'You have ideas but can\'t build them',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-rose-200/60 bg-card p-5 shadow-sm dark:border-rose-900/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600 dark:bg-rose-950/50">
                    ✕
                  </div>
                  <p className="text-sm font-medium">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Desire */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Target className="h-3 w-3" /> {isBn ? 'কল্পনা করুন' : 'Imagine'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'কল্পনা করুন — আপনি নিজে সফটওয়্যার বানিয়ে ফেলছেন' : 'Imagine — you build software yourself'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {isBn
                ? 'মাত্র ১ সপ্তাহে, এআই-এর সাহায্যে, আপনি শিখবেন কীভাবে আইডিয়াকে বাস্তব সফটওয়্যারে রূপ দিতে হয়।'
                : 'In just 1 week, with AI assistance, you learn to turn ideas into real software.'}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(({ n, t_en, t_bn, d_en, d_bn, Icon }) => (
              <div
                key={n}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 font-heading font-bold text-white shadow-md">
                    {n}
                  </div>
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mt-3 font-heading font-bold">{isBn ? t_bn : t_en}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{isBn ? d_bn : d_en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. What You'll Learn */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'আপনি যা শিখবেন' : "What you'll learn"}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? '৮টি বিষয়ে দক্ষতা' : '8 Skills You\'ll Master'}
              </h2>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {LEARN.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium">{isBn ? item.t_bn : item.t_en}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Price */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center shadow-xl dark:from-blue-950/30 dark:to-cyan-950/20">
            <LandingEyebrow>{isBn ? 'মূল্য' : 'Price'}</LandingEyebrow>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">৳1,000</span>
              <span className="text-lg text-muted-foreground line-through">৳3,000</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-600">
                {isBn ? '৬৭% ছাড়' : '67% OFF'}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {isBn ? '১ সপ্তাহ · হাতে কলমে · সার্টিফিকেট সহ' : '1 week · Hands-on · Certificate included'}
            </p>
            <div className="mt-6 grid gap-2 text-left text-sm sm:grid-cols-2">
              {[
                isBn ? '৪টি লাইভ মডিউল' : '4 live modules',
                isBn ? 'প্রতিটি ক্লাসের রেকর্ডিং' : 'Recording of every class',
                isBn ? 'হাতে কলমে প্রজেক্ট' : 'Hands-on project',
                isBn ? 'কোর্স সার্টিফিকেট' : 'Course certificate',
                isBn ? 'প্রাইভেট সাপোর্ট গ্রুপ' : 'Private support group',
                isBn ? 'লাইফটাইম রিসোর্স' : 'Lifetime resources',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Instructor */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="relative mx-auto max-w-xs">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-500/30 to-cyan-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
                  <Image
                    src="/founder.png"
                    alt={isBn ? 'তাজ ভাই — ইন্সট্রাক্টর' : 'Taj Bhai — Instructor'}
                    width={512}
                    height={512}
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl border border-border/60 bg-card px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground">
                    {isBn ? '৫.০ রেটিং · ১২০+ ছাত্র' : '5.0 rating · 120+ students'}
                  </p>
                </div>
              </div>
              <div>
                <LandingEyebrow>{isBn ? 'ইন্সট্রাক্টর' : 'Instructor'}</LandingEyebrow>
                <h2 className="mt-3 font-heading text-3xl font-bold">
                  {isBn ? 'তাজ ভাই' : 'Taj Bhai'}
                </h2>
                <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {isBn ? 'NextGen Digital Studio প্রতিষ্ঠাতা · ৭+ বছর অভিজ্ঞতা' : 'Founder of NextGen Digital Studio · 7+ years'}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {isBn
                    ? 'তাজ ভাই ১২০+ ব্যবসাকে এআই ও অটোমেশনে রূপান্তর করেছেন। তার সহজ শেখানোর পদ্ধতিতে যে কেউ জিরো থেকে এআই মাস্টারি করতে পারে। এই ট্রেইনিংয়ে তিনি নিজে হাতে কলমে শেখাবেন কীভাবে এআই দিয়ে সফটওয়্যার তৈরি করতে হয়।'
                    : 'Taj Bhai has transformed 120+ businesses with AI and automation. His easy teaching method lets anyone master AI from zero. In this training, he personally teaches hands-on how to build software with AI.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">120+</span>
                    <span className="text-muted-foreground">{isBn ? 'ছাত্র' : 'students'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">5.0</span>
                    <span className="text-muted-foreground">{isBn ? 'রেটিং' : 'rating'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">7+</span>
                    <span className="text-muted-foreground">{isBn ? 'বছর' : 'years'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Registration Form */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'রেজিস্ট্রেশন' : 'Registration'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? 'AI ট্রেইনিংয়ে নাম লেখান' : 'Register for AI Training'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'নিচের ফর্ম পূরণ করুন, তারপর পেমেন্ট করুন ১০০০ টাকা। জুম লিংক WhatsApp-এ পাবেন।'
                  : 'Fill the form below, then pay 1000TK. Zoom link sent on WhatsApp.'}
              </p>
              <div className="mt-4 inline-flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">৳1,000</span>
                <span className="text-sm text-muted-foreground">/{isBn ? 'সম্পূর্ণ কোর্স' : 'full course'}</span>
              </div>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="ai_training_page"
                serviceName={isBn ? 'AI ট্রেইনিং (1000TK, 1 সপ্তাহ)' : 'AI Training (1000TK, 1 week)'}
                submitLabel={isBn ? 'রেজিস্টার করুন' : 'Register Now'}
                paymentAmount={1000}
                paymentNote={isBn ? 'পেমেন্টের পর জুম লিংক পাবেন' : 'Zoom link sent after payment'}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <WhatsAppCTA isBn={isBn} message={isBn ? 'আসসালামু আলাইকুম, আমি AI ট্রেইনিংয়ে রেজিস্টার করতে চাই।' : 'Hi, I want to register for the AI Training.'} />
            </div>
          </div>
        </section>

        {/* 8. Social Links */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>{isBn ? 'আমাদের অনুসরণ করুন' : 'Follow us'}</LandingEyebrow>
            <h2 className="mt-3 font-heading text-xl font-bold">
              {isBn ? 'সোশ্যাল মিডিয়ায় যুক্ত থাকুন' : 'Stay connected on social media'}
            </h2>
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* 9. CTA */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              {isBn ? 'আজই শুরু করুন আপনার সফটওয়্যার যাত্রা!' : 'Start your software journey today!'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              {isBn
                ? 'মাত্র ১০০০ টাকায়, ১ সপ্তাহে, হাতে কলমে শিখুন এআই দিয়ে সফটওয়্যার তৈরি।'
                : 'For just 1000TK, in 1 week, learn hands-on to build software with AI.'}
            </p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-blue-600 shadow-lg transition-transform hover:scale-105"
            >
              {isBn ? 'এখনই রেজিস্টার করুন' : 'Register Now'}
            </a>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}
