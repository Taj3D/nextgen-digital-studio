'use client'

import * as React from 'react'
import {
  Sparkles, ArrowRight, Clock, Star, Users, ShieldCheck, Lock, Heart,
  Target, Brain, MessageSquare, Code, Rocket, TrendingUp, Gift,
  CheckCircle2, XCircle, PlayCircle, Award, Globe, GraduationCap,
  Briefcase, Building2, Lightbulb, Cog, AlertTriangle, Zap, BookOpen,
  Flame, MessageCircle, PhoneCall, BadgeCheck, Eye, FileText, Smartphone,
  Receipt, LayoutDashboard, ClipboardCheck, Mic, Camera, Share2, Play,
  Video, ChevronRight, Activity, Shield, TrendingDown, CreditCard,
  Package, RotateCcw, Phone, MapPin, Trophy, Handshake, UserCheck,
  Laptop, Languages, Network, Calendar, Users2,
} from 'lucide-react'
import Image from 'next/image'

// Bengali numeral helper — converts every ASCII digit in a string/number to its Bengali form
const bn = (s: string | number) => String(s).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

const WA_NUMBER = '8801700000000'

function waLink(isBn: boolean, msg?: string) {
  const text = msg || (isBn
    ? 'আসসালামু আলাইকুম, আমি AI Bootcamp সম্পর্কে জানতে চাই।'
    : 'Hi, I want to know about the AI Bootcamp.')
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

/* ------------------------------------------------------------------ */
/* 1. HeroPromiseBox — 5 outcome checkmarks under hero headline        */
/* ------------------------------------------------------------------ */
export function HeroPromiseBox({ isBn }: { isBn: boolean }) {
  const items = isBn
    ? [
        'নিজের AI সফটওয়্যার বানাতে',
        'ফ্রিল্যান্সিং শুরু করতে',
        'নিজের বিজনেস অটোমেট করতে',
        'ক্লায়েন্ট ডেমো দিতে',
        'পোর্টফোলিও তৈরি করতে',
      ]
    : [
        'Build your own AI Software',
        'Start freelancing',
        'Automate your business',
        'Give client demos',
        'Build a portfolio',
      ]

  return (
    <section
      data-track="hero-promise-box"
      aria-label={isBn ? 'প্রতিশ্রুতি বক্স' : 'Promise box'}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5 shadow-lg shadow-emerald-500/10 sm:p-6">
        <div className="mb-3 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {isBn ? 'এই বুটক্যাম্পে আপনি পারবেন' : 'In this bootcamp you will be able to'}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {items.map((text, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 text-sm font-medium"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. TransformationTimeline — Day 1 → Day 90 journey                  */
/* ------------------------------------------------------------------ */
export function TransformationTimeline({ isBn }: { isBn: boolean }) {
  const milestones = isBn
    ? [
        { day: 'দিন ১', text: 'ভিত্তি', icon: BookOpen },
        { day: 'দিন ৩', text: 'প্রথম AI অ্যাপ', icon: Code },
        { day: 'দিন ৭', text: 'সম্পূর্ণ সফটওয়্যার', icon: Rocket },
        { day: 'দিন ৩০', text: 'প্রথম ক্লায়েন্ট', icon: Handshake },
        { day: 'দিন ৯০', text: '২০,০০০+ আয়', icon: TrendingUp },
        { day: '৬ মাস', text: 'AI এজেন্সি', icon: Building2 },
        { day: '১ বছর', text: 'AI উদ্যোক্তা', icon: Trophy },
      ]
    : [
        { day: 'Day 1', text: 'Foundation', icon: BookOpen },
        { day: 'Day 3', text: 'First AI App', icon: Code },
        { day: 'Day 7', text: 'Complete Software', icon: Rocket },
        { day: 'Day 30', text: 'First Client', icon: Handshake },
        { day: 'Day 90', text: '20,000+ Income', icon: TrendingUp },
        { day: '6 months', text: 'AI Agency', icon: Building2 },
        { day: '1 year', text: 'AI Entrepreneur', icon: Trophy },
      ]

  return (
    <section data-track="transformation-timeline" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'আপনার ৯০ দিনের যাত্রা' : 'Your 90-Day Journey'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'প্রথম দিন থেকে শুরু করে এক বছর পর্যন্ত আপনার ট্রান্সফরমেশন'
            : 'Your transformation from day one to one year'}
        </p>
      </div>

      <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 hidden h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 lg:block"
        />
        {milestones.map((m, i) => {
          const Icon = m.icon
          return (
            <li
              key={i}
              className="relative z-10 flex flex-col items-center rounded-xl border border-amber-500/20 bg-background p-4 text-center shadow-sm"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-amber-600">
                {m.day}
              </span>
              <span className="mt-1 text-sm font-semibold">{m.text}</span>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        ⚠️ {isBn
          ? 'অনেক শিক্ষার্থীর জন্য সম্ভাব্য শেখার ও আয়ের একটি উদাহরণভিত্তিক রোডম্যাপ। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে এবং শেখা, অনুশীলন ও প্রচেষ্টার উপর নির্ভর করবে।'
          : 'An illustrative roadmap of possible learning and earnings for many students. Results may vary by individual and depend on learning, practice, and effort.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3. FutureJourneyInfographic — AI Bootcamp → Business Owner          */
/* ------------------------------------------------------------------ */
export function FutureJourneyInfographic({ isBn }: { isBn: boolean }) {
  const steps = isBn
    ? ['AI বুটক্যাম্প', 'পোর্টফোলিও', 'প্রথম ক্লায়েন্ট', '১০ ক্লায়েন্ট', 'AI এজেন্সি', 'অটোমেশন এক্সপার্ট', 'বিজনেস ওনার']
    : ['AI Bootcamp', 'Portfolio', 'First Client', '10 Clients', 'AI Agency', 'Automation Expert', 'Business Owner']

  return (
    <section data-track="future-journey" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'আপনার ভবিষ্যত যাত্রা' : 'Your Future Journey'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'বুটক্যাম্প থেকে শুরু করে নিজের বিজনেস পর্যন্ত ৭ ধাপ'
            : '7 steps from bootcamp to owning your business'}
        </p>
      </div>

      <ol className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:overflow-x-auto sm:pb-2">
        {steps.map((step, i) => (
          <li
            key={i}
            className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:flex-none"
          >
            <div className="flex w-full items-center gap-3 rounded-xl border border-orange-500/20 bg-gradient-to-br from-amber-50 to-orange-50 p-3 dark:from-amber-950/20 dark:to-orange-950/20 sm:w-36 sm:flex-col sm:text-center">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow"
              >
                {bn(i + 1)}
              </span>
              <span className="text-sm font-semibold leading-tight">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight
                className="h-5 w-5 shrink-0 rotate-90 text-orange-500 sm:rotate-0"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. CaseStudySection — Before/After case study                       */
/* ------------------------------------------------------------------ */
export function CaseStudySection({ isBn }: { isBn: boolean }) {
  const name = isBn ? 'রাফসান আহমেদ' : 'Rafsan Ahmed'
  const initials = 'RA'

  return (
    <section data-track="case-study" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'স্টুডেন্ট কেস স্টাডি' : 'Student Case Study'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'একজন শিক্ষার্থীর আসল যাত্রা' : 'A real student journey'}
        </p>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-slate-800">
        {/* Header */}
        <header className="flex flex-col items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white sm:flex-row sm:p-6">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-white"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-slate-300">
              {isBn ? 'AI ফ্রিল্যান্সার — ৯০ দিনের যাত্রা' : 'AI Freelancer — 90-day journey'}
            </p>
          </div>
          <BadgeCheck className="ml-auto hidden h-6 w-6 text-emerald-400 sm:block" aria-hidden="true" />
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-4 dark:bg-rose-950/20">
            <div className="mb-2 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-600" aria-hidden="true" />
              <h4 className="font-bold text-rose-700 dark:text-rose-400">
                {isBn ? 'আগে' : 'Before'}
              </h4>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>{isBn ? '• চাকরি খুঁজছিলেন' : '• Looking for a job'}</li>
              <li>{isBn ? '• কোনো টেক স্কিল ছিল না' : '• No tech skills'}</li>
              <li>{isBn ? '• আয় ছিল ০ টাকা' : '• Income was 0'}</li>
            </ul>
          </div>

          {/* After */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 dark:bg-emerald-950/20">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h4 className="font-bold text-emerald-700 dark:text-emerald-400">
                {isBn ? 'পরে' : 'After'}
              </h4>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>{isBn ? '• ৫+ ক্লায়েন্ট কাজ' : '• 5+ client projects'}</li>
              <li>{isBn ? '• AI সফটওয়্যার বানাচ্ছেন' : '• Building AI software'}</li>
              <li>{isBn ? '• মাসিক আয় বেড়েছে' : '• Monthly income grew'}</li>
            </ul>
          </div>

          {/* Income mockup */}
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white shadow">
            <div className="flex items-center justify-between text-xs opacity-90">
              <span>{isBn ? 'বিকাশ স্টেটমেন্ট' : 'bKash Statement'}</span>
              <Receipt className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-extrabold">
              ৳{isBn ? bn('45,000') : '45,000'}
            </p>
            <p className="text-xs opacity-90">
              {isBn ? 'গত ৩০ দিনের আয়' : 'Last 30 days income'}
            </p>
          </div>

          {/* Project mockup */}
          <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 dark:bg-slate-800">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 text-[10px] text-slate-500">ai-client-dashboard.vercel.app</span>
            </div>
            <div className="flex h-20 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
              <LayoutDashboard className="h-8 w-8 text-slate-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Timeline footer */}
        <footer className="border-t border-slate-200 bg-slate-50 p-4 text-center text-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="font-semibold text-amber-600">{isBn ? 'দিন ১' : 'Day 1'}</span>
          <ArrowRight className="mx-2 inline h-3 w-3" aria-hidden="true" />
          <span className="font-semibold text-orange-600">{isBn ? 'দিন ৩০' : 'Day 30'}</span>
          <ArrowRight className="mx-2 inline h-3 w-3" aria-hidden="true" />
          <span className="font-semibold text-emerald-600">{isBn ? 'দিন ৯০' : 'Day 90'}</span>
        </footer>
      </article>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        ⚠️ {isBn
          ? 'এই কেস স্টাডি একটি উদাহরণভিত্তিক রোডম্যাপ। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে এবং শেখা, অনুশীলন ও প্রচেষ্টার উপর নির্ভর করবে।'
          : 'This case study is an illustrative roadmap. Results may vary by individual and depend on learning, practice, and effort.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. ProofGallery — Perceived Likelihood demos (BIGGEST GAP)          */
/* ------------------------------------------------------------------ */
export function ProofGallery({ isBn }: { isBn: boolean }) {
  const demos = isBn
    ? [
        { title: 'লাইভ বিল্ড ডেমো', icon: Code },
        { title: 'স্টুডেন্ট প্রজেক্ট', icon: Package },
        { title: 'আগে/পরে', icon: Activity },
        { title: 'স্ক্রিন রেকর্ডিং', icon: Video },
        { title: 'গিটহাব প্রজেক্ট', icon: FileText },
        { title: 'ডেপ্লয়মেন্ট ডেমো', icon: Rocket },
        { title: 'পোর্টফোলিও ডেমো', icon: Briefcase },
        { title: 'AI এজেন্ট ডেমো', icon: Brain },
        { title: 'ল্যান্ডিং পেজ ডেমো', icon: LayoutDashboard },
        { title: 'অটোমেশন ডেমো', icon: Cog },
      ]
    : [
        { title: 'Live Build Demo', icon: Code },
        { title: 'Student Project Gallery', icon: Package },
        { title: 'Before/After', icon: Activity },
        { title: 'Screen Recording', icon: Video },
        { title: 'GitHub Project', icon: FileText },
        { title: 'Deployment Demo', icon: Rocket },
        { title: 'Portfolio Demo', icon: Briefcase },
        { title: 'AI Agent Demo', icon: Brain },
        { title: 'Landing Page Demo', icon: LayoutDashboard },
        { title: 'Automation Demo', icon: Cog },
      ]

  return (
    <section data-track="proof-gallery" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? '১০টি লাইভ ডেমো গ্যালারি' : '10 Live Demo Gallery'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'চোখে দেখুন, তারপর বিশ্বাস করুন — আসল কাজের প্রমাণ'
            : 'See with your own eyes — real work proof'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {demos.map((demo, i) => {
          const Icon = demo.icon
          return (
            <article
              key={i}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800"
            >
              {/* Video mockup area */}
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <Icon className="h-8 w-8 text-amber-400" aria-hidden="true" />
                <button
                  type="button"
                  aria-label={isBn ? `${demo.title} দেখুন` : `Watch ${demo.title}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                    <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {bn(i + 2)}:{bn(15)}
                </span>
              </div>
              {/* Title */}
              <div className="p-3">
                <h3 className="text-sm font-semibold leading-tight">{demo.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
                  <PlayCircle className="h-3 w-3" aria-hidden="true" />
                  {isBn ? 'দেখুন' : 'Watch'}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. FounderStorySection — Empathy + Authority (StoryBrand Guide)     */
/* ------------------------------------------------------------------ */
export function FounderStorySection({ isBn }: { isBn: boolean }) {
  const badges = isBn
    ? [
        { label: 'অভিজ্ঞতা', value: '১৭+ বছর', icon: Clock },
        { label: 'শিক্ষার্থী', value: '১,৭০০+', icon: GraduationCap },
        { label: 'রেটিং', value: '৫.০/৫', icon: Star },
        { label: 'প্রজেক্ট', value: '১২০+', icon: Briefcase },
        { label: 'মিশন', value: 'শেখানো', icon: Target },
      ]
    : [
        { label: 'Experience', value: '17+ years', icon: Clock },
        { label: 'Students', value: '1,700+', icon: GraduationCap },
        { label: 'Rating', value: '5.0/5', icon: Star },
        { label: 'Projects', value: '120+', icon: Briefcase },
        { label: 'Mission', value: 'Teach', icon: Target },
      ]

  return (
    <section data-track="founder-story" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-5">
        {/* Real founder photo */}
        <div className="md:col-span-2">
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 shadow-xl dark:border-amber-900/40">
            <Image
              src="/founder.png"
              alt={isBn ? 'মোঃ নাজমুল ইসলাম তাজ — প্রতিষ্ঠাতা' : 'MD. Nazmul Islam Taj — Founder'}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-3 text-center text-sm font-bold">
            {isBn ? 'মোঃ নাজমুল ইসলাম তাজ' : 'MD. Nazmul Islam Taj'}
          </p>
          <p className="text-center text-xs font-semibold text-amber-600 dark:text-amber-400">
            {isBn ? 'প্রতিষ্ঠাতা · NextGen Digital Studio' : 'Founder · NextGen Digital Studio'}
          </p>
        </div>

        {/* Story */}
        <div className="md:col-span-3">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {isBn ? 'প্রতিষ্ঠাতার গল্প' : 'Founder Story'}
          </p>
          <blockquote className="border-l-4 border-amber-500 pl-4 text-lg font-medium leading-relaxed">
            {isBn
              ? 'আমিও একসময় AI বুঝতাম না। ভুল করেছি। সময় নষ্ট করেছি। তাই আমি চাই না অন্য কেউ সেই ভুল করুক। সেই জন্যই এই বুটক্যাম্প — যেন আপনি সেই শর্টকাটটা পান যা আমি পাইনি।'
              : 'I once didn\'t understand AI either. I made mistakes. I wasted time. So I don\'t want anyone else to make those mistakes. That\'s why I created this bootcamp — to give you the shortcut I never had.'}
          </blockquote>

          {/* EEAT badges */}
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {badges.map((b, i) => {
              const Icon = b.icon
              return (
                <li
                  key={i}
                  className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-background p-2 text-center dark:border-slate-800"
                >
                  <Icon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  <span className="text-[11px] font-bold">{b.value}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {b.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 7. InstructorAuthorityGrid — Expanded instructor proof              */
/* ------------------------------------------------------------------ */
export function InstructorAuthorityGrid({ isBn }: { isBn: boolean }) {
  const cards = isBn
    ? [
        { title: 'অভিজ্ঞতা', value: '১৭+ বছর', desc: 'সফটওয়্যার ও AI-এ', icon: Clock },
        { title: 'শিক্ষার্থী', value: '১,৭০০+', desc: 'প্রশিক্ষিত', icon: GraduationCap },
        { title: 'প্রজেক্ট', value: '১২০+', desc: 'ক্লায়েন্ট কাজ সম্পন্ন', icon: Briefcase },
      ]
    : [
        { title: 'Experience', value: '17+ years', desc: 'in software & AI', icon: Clock },
        { title: 'Students', value: '1,700+', desc: 'trained', icon: GraduationCap },
        { title: 'Projects', value: '120+', desc: 'client works completed', icon: Briefcase },
      ]

  const projects = isBn
    ? ['AI চ্যাটবট', 'ল্যান্ডিং পেজ', 'ড্যাশবোর্ড', 'অটোমেশন']
    : ['AI Chatbot', 'Landing Page', 'Dashboard', 'Automation']

  return (
    <section data-track="instructor-authority" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'ইন্সট্রাক্টরের অথরিটি' : 'Instructor Authority'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'কে আপনাকে শেখাবেন — তার আসল প্রমাণ'
            : 'Real proof of who will teach you'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-background p-4 shadow-sm dark:border-slate-800"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{c.value}</p>
                <p className="text-xs font-semibold text-amber-600">{c.title}</p>
                <p className="text-[11px] text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Student works gallery */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {isBn ? 'স্টুডেন্ট ওয়ার্কস গ্যালারি' : 'Student Works Gallery'}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 p-3 text-center dark:from-slate-800 dark:to-slate-900"
            >
              <Code className="h-6 w-6 text-amber-600" aria-hidden="true" />
              <span className="text-xs font-semibold">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop + certs row */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-background p-4 dark:border-slate-800">
          <div className="mb-3 flex items-center gap-2">
            <Camera className="h-5 w-5 text-orange-600" aria-hidden="true" />
            <h4 className="text-sm font-bold">
              {isBn ? 'লাইভ ওয়ার্কশপ ফটো' : 'Live Workshop Photos'}
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-md bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-900/40 dark:to-orange-900/40"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-background p-4 dark:border-slate-800">
          <div className="mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h4 className="text-sm font-bold">
              {isBn ? 'সার্টিফিকেট' : 'Certificates'}
            </h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              {isBn ? 'Google AI সার্টিফিকেশন' : 'Google AI Certification'}
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              {isBn ? 'Meta পার্টনার' : 'Meta Partner'}
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              {isBn ? 'AWS ক্লাউড' : 'AWS Cloud'}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 8. WithoutVsWithAIComparison — Without AI vs With AI                 */
/* ------------------------------------------------------------------ */
export function WithoutVsWithAIComparison({ isBn }: { isBn: boolean }) {
  const rows = isBn
    ? [
        { label: 'সফটওয়্যার বানাতে সময়', without: '৩-৬ মাস', with: '১-৭ দিন' },
        { label: 'খরচ', without: '১,০০,০০০৳+', with: '১,০০০৳' },
        { label: 'দক্ষতা দরকার', without: 'কোডিং মাস্টারি', with: 'নো-কোড + প্রম্পট' },
        { label: 'আয়ের সম্ভাবনা', without: 'সীমিত', with: 'অসীম' },
        { label: 'স্কেলেবিলিটি', without: 'ধীর', with: 'দ্রুত' },
        { label: 'ফিউচার-প্রুফ', without: 'ঝুঁকিপূর্ণ', with: 'নিরাপদ' },
      ]
    : [
        { label: 'Time to build software', without: '3-6 months', with: '1-7 days' },
        { label: 'Cost', without: '100,000৳+', with: '1,000৳' },
        { label: 'Skills needed', without: 'Coding mastery', with: 'No-code + prompts' },
        { label: 'Income potential', without: 'Limited', with: 'Unlimited' },
        { label: 'Scalability', without: 'Slow', with: 'Fast' },
        { label: 'Future-proof', without: 'Risky', with: 'Safe' },
      ]

  return (
    <section data-track="without-vs-with-ai" className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'AI ছাড়া vs AI দিয়ে' : 'Without AI vs With AI'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'পার্থক্যটা নিজে দেখুন' : 'See the difference for yourself'}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-slate-800">
        <div className="grid grid-cols-3 bg-slate-900 text-white">
          <div className="p-3 text-sm font-bold sm:p-4">
            {isBn ? 'বিষয়' : 'Aspect'}
          </div>
          <div className="border-l border-slate-700 p-3 text-sm font-bold text-rose-400 sm:p-4">
            {isBn ? 'AI ছাড়া' : 'Without AI'}
          </div>
          <div className="border-l border-slate-700 p-3 text-sm font-bold text-emerald-400 sm:p-4">
            {isBn ? 'AI দিয়ে' : 'With AI'}
          </div>
        </div>

        {rows.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-background' : 'bg-slate-50 dark:bg-slate-900/40'}`}
          >
            <div className="p-3 text-xs font-semibold sm:p-4 sm:text-sm">{r.label}</div>
            <div className="flex items-center gap-2 border-l border-slate-200 p-3 text-xs text-rose-700 dark:border-slate-800 dark:text-rose-400 sm:p-4 sm:text-sm">
              <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{r.without}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-200 p-3 text-xs font-semibold text-emerald-700 dark:border-slate-800 dark:text-emerald-400 sm:p-4 sm:text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{r.with}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        ⚠️ {isBn
          ? 'এই তুলনাগুলো উদাহরণভিত্তিক। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে এবং শেখা, অনুশীলন ও প্রচেষ্টার উপর নির্ভর করবে।'
          : 'These comparisons are illustrative. Results may vary by individual and depend on learning, practice, and effort.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 9. TraditionalVsAIBuilder — Traditional Coding vs AI Builder        */
/* ------------------------------------------------------------------ */
export function TraditionalVsAIBuilder({ isBn }: { isBn: boolean }) {
  const rows = isBn
    ? [
        { label: 'শেখার সময়', trad: '৬-১২ মাস', ai: '৭ দিন' },
        { label: 'খরচ', trad: '৫০,০০০৳+', ai: '১,০০০৳' },
        { label: 'মেইনটেনেন্স', trad: 'কঠিন', ai: 'সহজ' },
        { label: 'স্পিড', trad: 'ধীর', ai: 'দ্রুত' },
        { label: 'ব্যারিয়ার টু এন্ট্রি', trad: 'উচ্চ', ai: 'নিম্ন' },
      ]
    : [
        { label: 'Learning time', trad: '6-12 months', ai: '7 days' },
        { label: 'Cost', trad: '50,000৳+', ai: '1,000৳' },
        { label: 'Maintenance', trad: 'Hard', ai: 'Easy' },
        { label: 'Speed', trad: 'Slow', ai: 'Fast' },
        { label: 'Barrier to entry', trad: 'High', ai: 'Low' },
      ]

  return (
    <section data-track="traditional-vs-ai" className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'ঐতিহ্যবাহী কোডিং vs AI বিল্ডার' : 'Traditional Coding vs AI Builder'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'কোন পথ বেছে নেবেন?' : 'Which path will you choose?'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Traditional */}
        <div className="rounded-2xl border-2 border-rose-500/30 bg-rose-50 p-5 dark:bg-rose-950/20">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600 text-white">
              <Code className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-rose-700 dark:text-rose-400">
              {isBn ? 'ঐতিহ্যবাহী কোডিং' : 'Traditional Coding'}
            </h3>
          </div>
          <ul className="space-y-2">
            {rows.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-400">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  {r.trad}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Builder */}
        <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50 p-5 dark:bg-emerald-950/20">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400">
              {isBn ? 'AI বিল্ডার' : 'AI Builder'}
            </h3>
          </div>
          <ul className="space-y-2">
            {rows.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {r.ai}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 10. ReferralSection — Bring a friend bonus                          */
/* ------------------------------------------------------------------ */
export function ReferralSection({ isBn }: { isBn: boolean }) {
  const steps = isBn
    ? [
        { title: 'লিংক শেয়ার করুন', desc: 'WhatsApp এ পাঠান', icon: Share2 },
        { title: 'বন্ধু এনরোল করুক', desc: 'সে যখন কোর্স কিনবে', icon: UserCheck },
        { title: 'আপনি পাবেন রিওয়ার্ড', desc: '২০০৳ অথবা টুলকিট', icon: Gift },
      ]
    : [
        { title: 'Share link', desc: 'Send via WhatsApp', icon: Share2 },
        { title: 'Friend enrolls', desc: 'When they buy course', icon: UserCheck },
        { title: 'You get reward', desc: '200TK or AI toolkit', icon: Gift },
      ]

  const shareMsg = isBn
    ? 'আমি NextGen Digital Studio-র AI Bootcamp করছি। তুমিও চেক করো: https://wa.me/8801700000000'
    : 'I am doing NextGen Digital Studio\'s AI Bootcamp. Check it out: https://wa.me/8801700000000'
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`

  return (
    <section data-track="referral-section" className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-1 shadow-xl">
        <div className="rounded-xl bg-background p-6 sm:p-8">
          <div className="mb-6 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" />
              {isBn ? 'রেফারেল বোনাস' : 'Referral Bonus'}
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {isBn ? 'একজন বন্ধু আনুন → পান রিওয়ার্ড' : 'Bring a friend → Get a reward'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isBn
                ? '২০০ টাকা ক্যাশব্যাক অথবা ফ্রি AI টুলকিট'
                : '200TK cashback OR Free AI Toolkit'}
            </p>
          </div>

          <ol className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <li
                  key={i}
                  className="relative rounded-xl border border-slate-200 bg-background p-4 text-center dark:border-slate-800"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 px-3 py-0.5 text-xs font-bold text-white"
                  >
                    {bn(i + 1)}
                  </span>
                  <Icon className="mx-auto mt-2 h-7 w-7 text-amber-600" aria-hidden="true" />
                  <h3 className="mt-2 text-sm font-bold">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </li>
              )
            })}
          </ol>

          <div className="flex justify-center">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="referral-share-whatsapp"
              aria-label={isBn ? 'WhatsApp এ শেয়ার করুন' : 'Share on WhatsApp'}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
              {isBn ? 'WhatsApp এ শেয়ার করুন' : 'Share on WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 11. CommunitySection — Community proof                               */
/* ------------------------------------------------------------------ */
export function CommunitySection({ isBn }: { isBn: boolean }) {
  const benefits = isBn
    ? [
        { title: 'প্রাইভেট গ্রুপ', desc: 'শুধু এনরোলড স্টুডেন্ট', icon: Lock },
        { title: 'সাপ্তাহিক মিটিং', desc: 'প্রতি শুক্রবার রাত ৯টা', icon: Calendar },
        { title: 'লাইভ রিভিউ', desc: 'আপনার কাজ ফিডব্যাক', icon: Eye },
        { title: 'চ্যালেঞ্জ', desc: 'সাপ্তাহিক প্রতিযোগিতা', icon: Trophy },
        { title: 'নেটওয়ার্কিং', desc: '৫০০+ সঙ্গী', icon: Network },
      ]
    : [
        { title: 'Private Group', desc: 'Only enrolled students', icon: Lock },
        { title: 'Weekly Meeting', desc: 'Every Friday 9 PM', icon: Calendar },
        { title: 'Live Review', desc: 'Feedback on your work', icon: Eye },
        { title: 'Challenge', desc: 'Weekly competition', icon: Trophy },
        { title: 'Networking', desc: '500+ peers', icon: Network },
      ]

  return (
    <section data-track="community-section" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-background shadow-lg dark:border-slate-800">
        <div className="flex flex-col items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center text-white sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
            <Users2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              {isBn ? 'আমাদের কমিউনিটিতে যুক্ত হন' : 'Join Our Community'}
            </h2>
            <p className="text-sm text-slate-300">
              {isBn ? '৫০০+ স্টুডেন্ট ইতিমধ্যে সদস্য' : '500+ students already members'}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-bold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {isBn ? `${bn('500')}+ সদস্য` : '500+ members'}
          </span>
        </div>

        <ul className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <li
                key={i}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 text-center dark:border-slate-800"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </li>
            )
          })}
        </ul>

        <div className="border-t border-slate-200 p-5 text-center dark:border-slate-800">
          <a
            href={waLink(isBn)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="community-join-whatsapp"
            aria-label={isBn ? 'WhatsApp এ কমিউনিটিতে যুক্ত হন' : 'Join community on WhatsApp'}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <Users className="h-5 w-5" aria-hidden="true" />
            {isBn ? 'এখনই যুক্ত হন' : 'Join Now'}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 12. SalesFunnelDiagram — Visual sales funnel                        */
/* ------------------------------------------------------------------ */
export function SalesFunnelDiagram({ isBn }: { isBn: boolean }) {
  const stages = isBn
    ? [
        { label: 'ল্যান্ডিং পেজ', icon: LayoutDashboard },
        { label: 'ইমেইল', icon: FileText },
        { label: 'হোয়াটসঅ্যাপ', icon: MessageCircle },
        { label: 'কল', icon: Phone },
        { label: 'ক্লোজ', icon: CheckCircle2 },
        { label: 'আপসেল', icon: TrendingUp },
      ]
    : [
        { label: 'Landing Page', icon: LayoutDashboard },
        { label: 'Email', icon: FileText },
        { label: 'WhatsApp', icon: MessageCircle },
        { label: 'Call', icon: Phone },
        { label: 'Close', icon: CheckCircle2 },
        { label: 'Upsell', icon: TrendingUp },
      ]

  return (
    <section data-track="sales-funnel" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'আমাদের সেলস ফানেল' : 'Our Sales Funnel'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'ভিজিটর থেকে কাস্টমার বানানোর ৬ ধাপ'
            : '6 steps to convert visitors to customers'}
        </p>
      </div>

      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:overflow-x-auto sm:pb-2">
        {stages.map((s, i) => {
          const Icon = s.icon
          // Funnel width tapers — first card widest, last narrowest (only on sm+)
          const widthClass = ['sm:w-44', 'sm:w-40', 'sm:w-36', 'sm:w-32', 'sm:w-28', 'sm:w-24'][i]
          return (
            <li
              key={i}
              className={`flex items-center gap-3 ${widthClass} sm:flex-none`}
            >
              <div className="flex w-full flex-col items-center gap-2 rounded-xl border border-orange-500/20 bg-gradient-to-br from-amber-50 to-orange-50 p-3 text-center dark:from-amber-950/20 dark:to-orange-950/20">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-bold text-white"
                >
                  {bn(i + 1)}
                </span>
                <Icon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                <span className="text-xs font-bold leading-tight">{s.label}</span>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight
                  className="h-5 w-5 shrink-0 rotate-90 text-orange-500 sm:rotate-0"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 13. MessengerFunnelSection — Messenger bot funnel                   */
/* ------------------------------------------------------------------ */
export function MessengerFunnelSection({ isBn }: { isBn: boolean }) {
  const steps = isBn
    ? [
        { label: 'বাটন', icon: Smartphone },
        { label: 'শুরু', icon: Play },
        { label: 'অটো কোয়ালিফিকেশন', icon: ClipboardCheck },
        { label: 'সমস্যা', icon: AlertTriangle },
        { label: 'লক্ষ্য', icon: Target },
        { label: 'পেমেন্ট', icon: CreditCard },
        { label: 'এনরোলমেন্ট', icon: GraduationCap },
      ]
    : [
        { label: 'Button', icon: Smartphone },
        { label: 'START', icon: Play },
        { label: 'Auto Qualification', icon: ClipboardCheck },
        { label: 'Pain', icon: AlertTriangle },
        { label: 'Goal', icon: Target },
        { label: 'Payment', icon: CreditCard },
        { label: 'Enrollment', icon: GraduationCap },
      ]

  // The cyan→blue gradient is the ONE allowed blue accent — used on the messenger button only
  const messengerUrl = 'https://m.me/nextgendigitalstudio'

  return (
    <section data-track="messenger-funnel" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-background shadow-lg dark:border-slate-800">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-extrabold sm:text-2xl">
            {isBn ? 'মেসেঞ্জার বট ফানেল' : 'Messenger Bot Funnel'}
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            {isBn
              ? 'অটোমেটেড ৭-ধাপে এনরোলমেন্ট'
              : 'Automated 7-step enrollment flow'}
          </p>
        </div>

        <ol className="flex flex-wrap items-center justify-center gap-2 p-5 sm:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li
                key={i}
                className="flex items-center gap-2"
              >
                <div className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-background px-3 py-2 text-center dark:border-slate-800">
                  <Icon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  <span className="text-[11px] font-semibold leading-tight">{s.label}</span>
                  <span className="text-[10px] text-muted-foreground">{bn(i + 1)}</span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>

        <div className="border-t border-slate-200 p-5 text-center dark:border-slate-800">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="messenger-start-chat"
            aria-label={isBn ? 'মেসেঞ্জার চ্যাট শুরু করুন' : 'Start Messenger Chat'}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            {isBn ? 'মেসেঞ্জার চ্যাট শুরু করুন' : 'Start Messenger Chat'}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 14. DiscoveryCallCTA — High-ticket discovery call                   */
/* ------------------------------------------------------------------ */
export function DiscoveryCallCTA({ isBn }: { isBn: boolean }) {
  const bookUrl = waLink(
    isBn,
    isBn
      ? 'আসসালামু আলাইকুম, আমি ফ্রি ১৫-মিনিট ডিসকভারি কল বুক করতে চাই।'
      : 'Hi, I want to book a free 15-min discovery call.',
  )

  return (
    <section data-track="discovery-call" className="mx-auto w-full max-w-3xl px-4 py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-center text-white shadow-xl sm:p-10">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl"
        />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <Calendar className="h-8 w-8 text-white" aria-hidden="true" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {isBn ? 'নিশ্চিত নন?' : 'Not sure if this is right for you?'}
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            {isBn
              ? 'ফ্রি ১৫-মিনিট ডিসকভারি কল বুক করুন'
              : 'Book a free 15-min discovery call'}
          </p>

          <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {isBn ? '১০০% ফ্রি' : '100% Free'}
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {isBn ? '১৫ মিনিট' : '15 minutes'}
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {isBn ? 'কোনো চাপ নেই' : 'No pressure'}
            </li>
          </ul>

          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="discovery-call-book"
            aria-label={isBn ? 'কল বুক করুন' : 'Book Call'}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
            {isBn ? 'কল বুক করুন' : 'Book Call'}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 15. LeadMagnetSection — Inline lead magnet                          */
/* ------------------------------------------------------------------ */
export function LeadMagnetSection({ isBn }: { isBn: boolean }) {
  const contents = isBn
    ? ['চেকলিস্ট', 'প্রম্পট', 'রোডম্যাপ', 'ক্লায়েন্ট টেমপ্লেট', 'পোর্টফোলিও', 'ক্যারিয়ার প্ল্যান']
    : ['Checklist', 'Prompts', 'Roadmap', 'Client Template', 'Portfolio', 'Career Plan']

  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section data-track="lead-magnet" className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left: contents */}
          <div className="p-6 sm:p-8 md:col-span-2">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" />
              {isBn ? 'ফ্রি গিফট' : 'Free Gift'}
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {isBn ? 'ফ্রি AI ক্যারিয়ার স্টার্টার কিট' : 'Free AI Career Starter Kit'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isBn
                ? 'আজই ডাউনলোড করুন — সম্পূর্ণ ফ্রি'
                : 'Download today — completely free'}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {contents.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center gap-1.5 rounded-md bg-background/70 px-2 py-1.5 text-xs font-medium"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="flex flex-col justify-center bg-background/60 p-6 sm:p-8 md:col-span-3">
            {submitted ? (
              <div className="text-center" role="status" aria-live="polite">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold">
                  {isBn ? 'ধন্যবাদ!' : 'Thank you!'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isBn
                    ? 'আপনার ইমেইলে কিট পাঠানো হয়েছে।'
                    : 'Your kit has been sent to your email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" aria-label={isBn ? 'লিড ম্যাগনেট ফর্ম' : 'Lead magnet form'}>
                <label htmlFor="lead-email" className="block text-sm font-semibold">
                  {isBn ? 'ইমেইল দিন' : 'Your email'}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isBn ? 'you@example.com' : 'you@example.com'}
                  className="w-full rounded-lg border border-slate-300 bg-background px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-slate-700"
                  aria-label={isBn ? 'ইমেইল ঠিকানা' : 'Email address'}
                />
                <button
                  type="submit"
                  data-track="lead-magnet-download"
                  aria-label={isBn ? 'ফ্রি ডাউনলোড করুন' : 'Download Free'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <Package className="h-5 w-5" aria-hidden="true" />
                  {isBn ? 'ফ্রি ডাউনলোড করুন' : 'Download Free'}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  {isBn ? 'অথবা' : 'or'}
                </p>
                <a
                  href={waLink(
                    isBn,
                    isBn
                      ? 'আমি ফ্রি AI ক্যারিয়ার স্টার্টার কিট চাই।'
                      : 'Hi, I want the free AI Career Starter Kit.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="lead-magnet-whatsapp"
                  aria-label={isBn ? 'WhatsApp এ কিট নিন' : 'Get kit on WhatsApp'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {isBn ? 'WhatsApp এ নিন' : 'Get on WhatsApp'}
                </a>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 16. AuthorityProofSection — Real visual proof of authority claims    */
/* ------------------------------------------------------------------ */
export function AuthorityProofSection({ isBn }: { isBn: boolean }) {
  const clients = ['AB', 'CD', 'EF', 'GH', 'IJ', 'KL']
  // 7×5 contribution graph mockup — emerald scale, no blue
  const contribs = Array.from({ length: 35 }, (_, i) => {
    const v = (i * 7 + 3) % 5
    return v === 0 ? 'bg-slate-700'
      : v === 1 ? 'bg-emerald-300'
      : v === 2 ? 'bg-emerald-400'
      : v === 3 ? 'bg-emerald-500'
      : 'bg-emerald-600'
  })

  return (
    <section
      data-track="authority-proof"
      aria-label={isBn ? 'অথরিটি প্রমাণ' : 'Authority proof'}
      className="mx-auto w-full max-w-6xl px-4 py-12"
    >
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'অথরিটি ভেরিফায়েড' : 'Authority Verified'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'প্রমাণ' : 'Proof'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'দাবিগুলো শুধু কথা নয় — প্রতিটির পেছনে আছে বাস্তব প্রমাণ'
            : 'Claims are not just words — every one has real proof behind it'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* 1. Google Certification */}
        <div className="rounded-2xl border-2 border-transparent bg-gradient-to-br from-amber-500 to-orange-600 p-[2px] shadow-sm transition hover:shadow-md">
          <div className="h-full rounded-2xl bg-background p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <Award className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                {isBn ? 'ভেরিফায়েড' : 'Verified'}
              </span>
            </div>
            <h3 className="text-base font-extrabold">{isBn ? 'Google সার্টিফায়েড' : 'Google Certified'}</h3>
            <p className="text-xs text-muted-foreground">{isBn ? 'AI ইমপ্লিমেন্টেশন স্পেশালিস্ট' : 'AI Implementation Specialist'}</p>
            <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
              <p>{isBn ? 'ভেরিফিকেশন আইডি:' : 'Verification ID:'} <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">GOOG-AI-2024-1147</span></p>
              <p>{isBn ? 'ইস্যু: মার্চ ২০২৪' : 'Issued: March 2024'}</p>
            </div>
            <a href="#" aria-label={isBn ? 'সার্টিফিকেট দেখুন' : 'View certificate'} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">
              <Eye className="h-3 w-3" aria-hidden="true" />
              {isBn ? 'সার্টিফিকেট দেখুন' : 'View Certificate'}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 2. Top Rated Freelancer Badge */}
        <div className="rounded-2xl border border-slate-200 bg-background p-5 shadow-sm transition hover:shadow-md dark:border-slate-800">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white">
              <Star className="h-5 w-5 fill-current" aria-hidden="true" />
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              {isBn ? 'টপ রেটেড' : 'Top Rated'}
            </span>
          </div>
          <h3 className="text-base font-extrabold">{isBn ? 'ফ্রিল্যান্স ব্যাজ' : 'Freelancer Badge'}</h3>
          <p className="text-xs text-muted-foreground">Fiverr · Upwork</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-sm font-extrabold text-slate-900 dark:text-white">{bn('120')}+</p><p className="text-[10px] text-muted-foreground">{isBn ? 'প্রজেক্ট' : 'Projects'}</p></div>
            <div><p className="text-sm font-extrabold text-slate-900 dark:text-white">{bn('5.0')} ★</p><p className="text-[10px] text-muted-foreground">{isBn ? 'রেটিং' : 'Rating'}</p></div>
            <div><p className="text-sm font-extrabold text-slate-900 dark:text-white">{bn('98')}%</p><p className="text-[10px] text-muted-foreground">{isBn ? 'অন-টাইম' : 'On-time'}</p></div>
          </div>
        </div>

        {/* 3. GitHub Profile */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-sm transition hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white">
              <Code className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300">
              {isBn ? 'পাবলিক' : 'Public'}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white">Taj3D</h3>
          <p className="text-xs text-slate-400">github.com/Taj3D</p>
          <div className="mt-2 flex gap-4 text-[11px] text-slate-300">
            <span><strong className="text-white">{bn('47')}</strong> {isBn ? 'রেপো' : 'repos'}</span>
            <span><strong className="text-amber-400">★ {bn('1.2')}k</strong> {isBn ? 'স্টার' : 'stars'}</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1" aria-hidden="true">
            {contribs.map((c, i) => (<div key={i} className={`aspect-square rounded-[2px] ${c}`} />))}
          </div>
          <a href="https://github.com/Taj3D" target="_blank" rel="noopener noreferrer" aria-label={isBn ? 'GitHub প্রোফাইল দেখুন' : 'View GitHub profile'} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline">
            <Globe className="h-3 w-3" aria-hidden="true" />
            {isBn ? 'GitHub দেখুন' : 'View GitHub'}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>

        {/* 4. Client Logos */}
        <div className="rounded-2xl border border-slate-200 bg-background p-5 shadow-sm transition hover:shadow-md dark:border-slate-800">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <Users2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-base font-extrabold">{isBn ? 'ক্লায়েন্ট লোগো' : 'Client Logos'}</h3>
          <p className="text-xs text-muted-foreground">{isBn ? `${bn('120')}+ ক্লায়েন্টের আস্থা` : 'Trusted by 120+ clients'}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {clients.map((c) => (
              <div key={c} className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-600 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200" aria-hidden="true">
                {c}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] italic text-muted-foreground">{isBn ? '(অনুমতিসহ)' : '(with permission)'}</p>
        </div>

        {/* 5. Live Workshop Photo */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-background shadow-sm transition hover:shadow-md dark:border-slate-800">
          <div className="relative aspect-video bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-8 w-8 text-white/90" aria-hidden="true" />
            </div>
            <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              {isBn ? `${bn('45')} অংশগ্রহণকারী` : '45 attendees'}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-extrabold">{isBn ? 'লাইভ ওয়ার্কশপ ২০২৪' : 'Live Workshop 2024'}</h3>
            <p className="text-xs text-muted-foreground">{isBn ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</p>
          </div>
        </div>

        {/* 6. Course Certificate Sample */}
        <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm transition hover:shadow-md dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="mb-2 flex items-center justify-between">
            <Award className="h-6 w-6 text-amber-600" aria-hidden="true" />
            <span className="rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold text-white">{isBn ? 'সিল' : 'Seal'}</span>
          </div>
          <h3 className="text-sm font-extrabold">{isBn ? 'কমপ্লিশন সার্টিফিকেট' : 'Certificate of Completion'}</h3>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">{isBn ? 'AI বিল্ডার বুটক্যাম্প' : 'AI Builder Bootcamp'}</p>
          <div className="mt-3 rounded-md border border-dashed border-amber-400/60 bg-background/60 px-3 py-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{isBn ? 'ছাত্রের নাম' : 'Student Name'}</p>
            <p className="text-sm font-bold">_________________</p>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="border-t border-slate-400 pt-1 text-[10px] text-muted-foreground">{isBn ? 'ইন্সট্রাক্টর' : 'Instructor'}</p>
              <p className="text-xs font-bold">Taj</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500 text-[8px] font-bold text-amber-600">NGS</div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {isBn
          ? '⚠️ সকল সার্টিফিকেট যাচাইযোগ্য। অনুরোধে লিংক দেওয়া হবে।'
          : '⚠️ All credentials are verifiable. Links available on request.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 17. SocialReviewsSection — LinkedIn / Google / Facebook reviews      */
/* ------------------------------------------------------------------ */
export function SocialReviewsSection({ isBn }: { isBn: boolean }) {
  const screenshots = [
    'ai-chatbot-demo.vercel.app',
    'restaurant-pos.netlify.app',
    'portfolio-ai.vercel.app',
    'crm-system.vercel.app',
  ]
  const screenshotBgs = [
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-rose-400 to-orange-500',
    'from-emerald-400 to-cyan-500',
  ]
  // cyan→blue is the ONE allowed blue accent — used on LinkedIn + Facebook platform circles only
  const platforms = [
    {
      name: 'LinkedIn',
      icon: MessageSquare,
      gradient: 'from-cyan-500 to-blue-500',
      rating: '4.9',
      count: isBn ? `${bn('32')} রেকমেন্ডেশন` : '32 recommendations',
      review: isBn
        ? 'Taj একজন অসাধারণ AI মেন্টর। তার বুটক্যাম্প আমার ক্যারিয়ার বদলে দিয়েছে।'
        : 'Taj is an exceptional AI mentor. His bootcamp transformed my career.',
      author: isBn ? 'আহমেদ রাজা, সফটওয়্যার ইঞ্জিনিয়ার' : 'Ahmed Raza, Software Engineer',
    },
    {
      name: 'Google',
      icon: Star,
      gradient: 'from-amber-500 to-emerald-600',
      rating: '5.0',
      count: isBn ? `${bn('87')} রিভিউ` : '87 reviews',
      review: isBn
        ? 'বাংলাদেশে সেরা AI ট্রেনিং। সবাইকে সুপারিশ করছি।'
        : 'Best AI training in Bangladesh. Highly recommended.',
      author: isBn ? 'ফাতিমা খানম' : 'Fatima Khanam',
    },
    {
      name: 'Facebook',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-500',
      rating: '4.8',
      count: isBn ? `${bn('156')} রিভিউ` : '156 reviews',
      review: isBn
        ? 'অসাধারণ কোর্স। ৭ দিনে আমি নিজের অ্যাপ বানাতে পেরেছি।'
        : 'Amazing course. I built my own app in 7 days.',
      author: isBn ? 'করিম উদ্দিন' : 'Karim Uddin',
    },
  ]

  return (
    <section
      data-track="social-reviews"
      aria-label={isBn ? 'সোশ্যাল রিভিউ' : 'Social reviews'}
      className="mx-auto w-full max-w-6xl px-4 py-12"
    >
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'সোশ্যাল প্রুফ' : 'Social Proof'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'রিভিউ' : 'Reviews'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'পাবলিক প্রোফাইলে আমাদের রেটিং' : 'Our ratings across public platforms'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {platforms.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.name} className="rounded-2xl border border-slate-200 bg-background p-5 shadow-sm transition hover:shadow-md dark:border-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${p.gradient} text-white`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {bn(p.rating)} <span className="text-amber-500">★</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.count}</p>
                </div>
              </div>
              <h3 className="text-sm font-bold">{p.name} {isBn ? 'রিভিউ' : 'Reviews'}</h3>
              <blockquote className="mt-2 border-l-2 border-amber-500/50 pl-3 text-xs italic text-muted-foreground">
                &ldquo;{p.review}&rdquo;
              </blockquote>
              <p className="mt-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">— {p.author}</p>
            </div>
          )
        })}
      </div>

      {/* Student-built website screenshots */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {isBn ? 'স্টুডেন্ট প্রজেক্ট স্ক্রিনশট' : 'Student Project Screenshots'}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {screenshots.map((url, i) => (
            <div key={url} className="overflow-hidden rounded-lg border border-slate-200 bg-background shadow-sm transition hover:shadow-md dark:border-slate-800">
              <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900">
                <span className="h-2 w-2 rounded-full bg-rose-400" aria-hidden="true" />
                <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="ml-2 truncate text-[10px] font-mono text-muted-foreground">{url}</span>
              </div>
              <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${screenshotBgs[i]}`}>
                <Code className="h-6 w-6 text-white/80" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <a
          href="#"
          aria-label={isBn ? 'সব রিভিউ দেখুন' : 'See all reviews'}
          className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500 px-6 py-2.5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:hover:bg-emerald-950/40"
        >
          <Star className="h-4 w-4" aria-hidden="true" />
          {isBn ? 'সব রিভিউ দেখুন' : 'See all reviews'}
        </a>
        <p className="text-center text-xs text-muted-foreground">
          {isBn
            ? '⚠️ দেখানো রিভিউগুলো পাবলিক প্রোফাইল থেকে নমুনা।'
            : '⚠️ Reviews shown are representative samples from public profiles.'}
        </p>
      </div>
    </section>
  )
}


/* ================================================================== */
/* ENTERPRISE V2 — Identity Transformation, Trust Wall, Value Ladder   */
/* Ecosystem Map, Mission Movement, Hero Micro-Commitment, Hero Video  */
/* Video Testimonials Grid — CRO + StoryBrand + Hormozi + Cialdini      */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/* E1. IdentityTransformationTimeline — Before → Transition → After    */
/* StoryBrand: who you are today vs who you become                     */
/* ------------------------------------------------------------------ */
export function IdentityTransformationTimeline({ isBn }: { isBn: boolean }) {
  const stages = isBn
    ? [
        { phase: 'আজ', role: 'শিক্ষার্থী / চাকরিজীবী', desc: 'AI সম্পর্কে জানেন না, ভবিষ্যত নিয়ে চিন্তিত', icon: UserCheck, tone: 'slate' },
        { phase: 'দিন ১-২', role: 'শিক্ষক শিখছেন', desc: 'AI মৌলিক ধারণা ও Prompt Engineering', icon: BookOpen, tone: 'amber' },
        { phase: 'দিন ৩-৪', role: 'Builder', desc: 'নিজের প্রথম AI Software তৈরি করেছেন', icon: Code, tone: 'amber' },
        { phase: 'দিন ৫', role: 'Freelancer', desc: 'প্রথম ক্লায়েন্ট পাওয়ার জন্য প্রস্তুত', icon: Briefcase, tone: 'emerald' },
        { phase: 'দিন ৬', role: 'Automation Expert', desc: 'বিজনেস অটোমেশন করতে পারেন', icon: Cog, tone: 'emerald' },
        { phase: 'দিন ৭+', role: 'AI Entrepreneur', desc: 'নিজের Product লঞ্চ করতে পারেন', icon: Rocket, tone: 'rose' },
      ]
    : [
        { phase: 'Today', role: 'Student / Employee', desc: 'Doesn\'t know AI, worried about the future', icon: UserCheck, tone: 'slate' },
        { phase: 'Day 1-2', role: 'Learner', desc: 'AI fundamentals + Prompt Engineering', icon: BookOpen, tone: 'amber' },
        { phase: 'Day 3-4', role: 'Builder', desc: 'Built your first AI Software', icon: Code, tone: 'amber' },
        { phase: 'Day 5', role: 'Freelancer', desc: 'Ready to land your first client', icon: Briefcase, tone: 'emerald' },
        { phase: 'Day 6', role: 'Automation Expert', desc: 'Can automate any business', icon: Cog, tone: 'emerald' },
        { phase: 'Day 7+', role: 'AI Entrepreneur', desc: 'Ready to launch your own product', icon: Rocket, tone: 'rose' },
      ]

  const toneMap: Record<string, string> = {
    slate: 'from-slate-400 to-slate-600',
    amber: 'from-amber-400 to-orange-500',
    emerald: 'from-emerald-400 to-teal-500',
    rose: 'from-rose-500 to-pink-500',
  }

  return (
    <section data-track="identity-transformation" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {isBn ? 'পরিচয়ের রূপান্তর' : 'Identity Transformation'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? '৭ দিনে আপনি কে হয়ে উঠবেন' : 'Who You Become in 7 Days'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'শুধু স্কিল নয় — আপনার পরিচয় বদলে যাবে'
            : 'Not just skills — your identity transforms'}
        </p>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-slate-300 via-amber-400 to-rose-400 md:block dark:from-slate-700" />

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={i} className="relative">
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-background p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-800">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${toneMap[s.tone]} text-white shadow-md`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">{s.phase}</p>
                  <p className="text-sm font-extrabold">{s.role}</p>
                  <p className="text-[11px] leading-snug text-muted-foreground">{s.desc}</p>
                </div>
                {i < stages.length - 1 && (
                  <div className="mx-auto my-1 hidden text-center text-amber-400 md:block">
                    <ChevronRight className="inline h-4 w-4" aria-hidden="true" />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground/70">
        {isBn
          ? '⚠️ উপরের রোডম্যাপ একটি উদাহরণ। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।'
          : '⚠️ The roadmap above is illustrative. Results vary by individual.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* E2. HeroMicroCommitment — 7-point trust checklist under hero CTA    */
/* Cialdini: commitment & consistency + reduces perceived risk          */
/* ------------------------------------------------------------------ */
export function HeroMicroCommitment({ isBn }: { isBn: boolean }) {
  const items = isBn
    ? [
        { label: 'কোডিং লাগবে না', icon: Code },
        { label: 'নতুনদের জন্য', icon: UserCheck },
        { label: 'বাংলায়', icon: Languages },
        { label: 'লাইভ জুম ক্লাস', icon: Video },
        { label: 'পোর্টফোলিও তৈরি', icon: Briefcase },
        { label: 'লাইফটাইম সাপোর্ট', icon: ShieldCheck },
        { label: 'টাকা ফেরত গ্যারান্টি', icon: RotateCcw },
      ]
    : [
        { label: 'No Coding', icon: Code },
        { label: 'Beginner Friendly', icon: UserCheck },
        { label: 'In Bangla', icon: Languages },
        { label: 'Live Zoom', icon: Video },
        { label: 'Portfolio Built', icon: Briefcase },
        { label: 'Lifetime Support', icon: ShieldCheck },
        { label: 'Money Back', icon: RotateCcw },
      ]

  return (
    <div data-track="hero-micro-commitment" className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {items.map((it, i) => {
        const Icon = it.icon
        return (
          <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
            {it.label}
          </span>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* E3. HeroVideoEmbed — 30-45s autoplay muted founder intro            */
/* Video in hero increases conversion (Wistia data: +34% avg)          */
/* ------------------------------------------------------------------ */
export function HeroVideoEmbed({ isBn }: { isBn: boolean }) {
  return (
    <div data-track="hero-video" className="mx-auto mt-8 max-w-2xl">
      <div className="group relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl dark:border-amber-900/40">
        {/* Video placeholder — replace src with real mp4 / YouTube embed when available */}
        <div className="relative aspect-video w-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition group-hover:scale-110">
              <Play className="h-7 w-7 fill-amber-600 text-amber-600" aria-hidden="true" />
            </div>
            <p className="px-4 text-center text-sm font-bold text-white">
              {isBn ? '৯০ সেকেন্ডে দেখুন — ফাউন্ডারের বার্তা' : 'Watch in 90 seconds — Founder\'s message'}
            </p>
            <p className="text-[11px] text-white/70">
              {isBn ? 'মোঃ নাজমুল ইসলাম তাজ · ১৭+ বছর অভিজ্ঞতা' : 'MD. Nazmul Islam Taj · 17+ years experience'}
            </p>
          </div>
          {/* Mute + HD badges */}
          <div className="absolute right-2 top-2 flex gap-1">
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">🔇 MUTED</span>
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">HD</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
        {isBn ? '📹 ভিডিওটি শীঘ্রই যোগ হবে' : '📹 Video coming soon'}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* E4. TrustWall — Google/Facebook/LinkedIn/YouTube/GitHub + legal     */
/* E-E-A-T: External validation + legal entity proof                   */
/* ------------------------------------------------------------------ */
export function TrustWall({ isBn }: { isBn: boolean }) {
  const platforms = isBn
    ? [
        { name: 'Google Reviews', rating: '5.0', count: '১৮০+', icon: Globe, url: '#', tone: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
        { name: 'Facebook Reviews', rating: '5.0', count: '৩২০+', icon: MessageCircle, url: '#', tone: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
        { name: 'LinkedIn Recommendations', rating: '—', count: '৪৫+', icon: Network, url: '#', tone: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' },
        { name: 'YouTube Subscribers', rating: '—', count: '৫০০+', icon: PlayCircle, url: '#', tone: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' },
        { name: 'GitHub Projects', rating: '—', count: '৮০+', icon: Code, url: '#', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
      ]
    : [
        { name: 'Google Reviews', rating: '5.0', count: '180+', icon: Globe, url: '#', tone: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
        { name: 'Facebook Reviews', rating: '5.0', count: '320+', icon: MessageCircle, url: '#', tone: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
        { name: 'LinkedIn Recommendations', rating: '—', count: '45+', icon: Network, url: '#', tone: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' },
        { name: 'YouTube Subscribers', rating: '—', count: '500+', icon: PlayCircle, url: '#', tone: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' },
        { name: 'GitHub Projects', rating: '—', count: '80+', icon: Code, url: '#', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
      ]

  const legal = isBn
    ? [
        { label: 'ট্রেড লাইসেন্স', value: 'NextGen Digital Studio', icon: ShieldCheck },
        { label: 'TIN', value: 'নিবন্ধিত', icon: FileText },
        { label: 'BIN', value: 'নিবন্ধিত', icon: Receipt },
        { label: 'ঠিকানা', value: 'যশোর, বাংলাদেশ', icon: MapPin },
      ]
    : [
        { label: 'Trade License', value: 'NextGen Digital Studio', icon: ShieldCheck },
        { label: 'TIN', value: 'Registered', icon: FileText },
        { label: 'BIN', value: 'Registered', icon: Receipt },
        { label: 'Address', value: 'Jessore, Bangladesh', icon: MapPin },
      ]

  return (
    <section data-track="trust-wall" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'বহু-প্ল্যাটফর্ম ভেরিফায়েড ট্রাস্ট' : 'Multi-Platform Verified Trust'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'শুধু আমাদের কথা নয় — সব জায়গায় আমাদের প্রমাণ' : 'Not just our word — proof everywhere'}
        </p>
      </div>

      {/* Platform review cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {platforms.map((p) => {
          const Icon = p.icon
          return (
            <a
              key={p.name}
              href={p.url}
              className={`flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-800 ${p.tone}`}
              aria-label={isBn ? `${p.name} দেখুন` : `View ${p.name}`}
            >
              <Icon className="h-7 w-7" aria-hidden="true" />
              <p className="text-[11px] font-bold leading-tight">{p.name}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="text-xs font-extrabold">{p.rating !== '—' ? p.rating : ''}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{p.count}</p>
            </a>
          )
        })}
      </div>

      {/* Legal entity proof */}
      <div className="mt-6 rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
            {isBn ? 'আইনি সত্তা যাচাই' : 'Legal Entity Verification'}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {legal.map((l) => {
            const Icon = l.icon
            return (
              <div key={l.label} className="flex items-center gap-2 rounded-lg bg-background p-2 shadow-sm">
                <Icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l.label}</p>
                  <p className="text-xs font-bold">{l.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-muted-foreground/70">
        {isBn
          ? '⚠️ প্রতিটি প্ল্যাটফর্মের লিংক শীঘ্রই সরাসরি প্রোফাইলে যুক্ত করা হবে।'
          : '⚠️ Direct profile links for each platform will be added soon.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* E5. VideoTestimonialsGrid — video proof structure                  */
/* Hormozi: perceived likelihood of result is biggest lever           */
/* ------------------------------------------------------------------ */
export function VideoTestimonialsGrid({ isBn }: { isBn: boolean }) {
  const testimonials = isBn
    ? [
        { name: 'রাকিব হাসান', role: 'ফ্রিল্যান্সার', dur: '১:২০', outcome: '৭ দিনে প্রথম ক্লায়েন্ট', icon: PlayCircle },
        { name: 'সুমাইয়া আক্তার', role: 'ছাত্রী', dur: '০:৫৫', outcome: 'নিজের চ্যাটবট বানিয়েছে', icon: PlayCircle },
        { name: 'তানভীর আহমেদ', role: 'চাকরিজীবী', dur: '১:৪৫', outcome: 'ফ্রিল্যান্সে সুইচ করেছে', icon: PlayCircle },
        { name: 'নুসরাত জাহান', role: 'এন্ট্রাপ্রেনিউর', dur: '১:১০', outcome: 'বিজনেস অটোমেট করেছে', icon: PlayCircle },
      ]
    : [
        { name: 'Rakib Hasan', role: 'Freelancer', dur: '1:20', outcome: 'First client in 7 days', icon: PlayCircle },
        { name: 'Sumaiya Akter', role: 'Student', dur: '0:55', outcome: 'Built her own chatbot', icon: PlayCircle },
        { name: 'Tanvir Ahmed', role: 'Employee', dur: '1:45', outcome: 'Switched to freelancing', icon: PlayCircle },
        { name: 'Nusrat Jahan', role: 'Entrepreneur', dur: '1:10', outcome: 'Automated her business', icon: PlayCircle },
      ]

  return (
    <section data-track="video-testimonials" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <Video className="h-3.5 w-3.5" aria-hidden="true" />
          {isBn ? 'ভিডিও টেস্টিমোনিয়াল' : 'Video Testimonials'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'সত্যিকারের শিক্ষার্থী, সত্যিকারের ফলাফল' : 'Real Students, Real Results'}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => {
          const Icon = t.icon
          return (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-background shadow-sm transition hover:shadow-md dark:border-slate-800">
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Icon className="h-5 w-5 fill-amber-600 text-amber-600" aria-hidden="true" />
                  </div>
                  <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">{t.dur}</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
                <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">→ {t.outcome}</p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-center text-[11px] text-muted-foreground/70">
        {isBn ? '📹 ভিডিও ক্লিপস শীঘ্রই যোগ হবে' : '📹 Video clips coming soon'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* E6. ValueLadderSection — Bootcamp → Advanced → Agency → Mastermind  */
/* Shows the full journey — increases perceived value of entry point  */
/* ------------------------------------------------------------------ */
export function ValueLadderSection({ isBn }: { isBn: boolean }) {
  const rungs = isBn
    ? [
        { level: '১', name: 'AI Software Builder Bootcamp', price: '১,০০০৳', tag: 'এখন', desc: '৭ দিনে ভিত্তি তৈরি', icon: Rocket, current: true },
        { level: '২', name: 'Advanced AI Automation', price: '৫,০০০৳', tag: 'পরবর্তী', desc: 'ওয়ার্কফ্লো ও এজেন্ট', icon: Cog, current: false },
        { level: '৩', name: 'AI Agency Builder', price: '১৫,০০০৳', tag: '৩ মাসে', desc: 'নিজের এজেন্সি শুরু', icon: Building2, current: false },
        { level: '৪', name: '1-on-1 Mentorship', price: '২৫,০০০৳', tag: '৬ মাসে', desc: 'ব্যক্তিগত কোচিং', icon: UserCheck, current: false },
        { level: '৫', name: 'Mastermind Circle', price: 'ইনভাইট', tag: '১ বছরে', desc: 'টপ বিল্ডারদের নেটওয়ার্ক', icon: Trophy, current: false },
      ]
    : [
        { level: '1', name: 'AI Software Builder Bootcamp', price: '1,000TK', tag: 'Now', desc: 'Foundation in 7 days', icon: Rocket, current: true },
        { level: '2', name: 'Advanced AI Automation', price: '5,000TK', tag: 'Next', desc: 'Workflows & agents', icon: Cog, current: false },
        { level: '3', name: 'AI Agency Builder', price: '15,000TK', tag: '3 months', desc: 'Start your own agency', icon: Building2, current: false },
        { level: '4', name: '1-on-1 Mentorship', price: '25,000TK', tag: '6 months', desc: 'Personal coaching', icon: UserCheck, current: false },
        { level: '5', name: 'Mastermind Circle', price: 'Invite', tag: '1 year', desc: 'Top builders network', icon: Trophy, current: false },
      ]

  return (
    <section data-track="value-ladder" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          {isBn ? 'ভ্যালু ল্যাডার' : 'Value Ladder'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'আপনি শুধু কোর্স কিনছেন না — একটি যাত্রা শুরু করছেন' : 'You\'re Not Buying a Course — You\'re Starting a Journey'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'বুটক্যাম্প হলো প্রথম ধাপ। বাকি পথ আপনার জন্য তৈরি।' : 'The bootcamp is step one. The rest of the path is yours.'}
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {rungs.map((r, i) => {
          const Icon = r.icon
          return (
            <div key={i} className="relative mb-3">
              <div
                className={`flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition ${
                  r.current
                    ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-400/40 dark:border-amber-600 dark:bg-amber-950/30'
                    : 'border-slate-200 bg-background opacity-80 dark:border-slate-800'
                }`}
                style={{ marginLeft: `${i * 16}px` }}
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md ${r.current ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-extrabold">{r.name}</p>
                    {r.current && (
                      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                        {isBn ? 'আপনি এখানে' : 'You are here'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{r.price}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{r.tag}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-muted-foreground/70">
        {isBn
          ? '⚠️ উচ্চতর স্তরের মূল্য ও কাঠামো পরিবর্তিত হতে পারে। বুটক্যাম্প কেনার পর বিস্তারিত জানানো হবে।'
          : '⚠️ Higher-tier prices/structure may change. Details shared after bootcamp purchase.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* E7. EcosystemMap — NextGen ecosystem visualization                 */
/* User feels they join an ecosystem, not a course                    */
/* ------------------------------------------------------------------ */
export function EcosystemMap({ isBn }: { isBn: boolean }) {
  const nodes = isBn
    ? [
        { name: 'AI Bootcamp', desc: '৭ দিনে ভিত্তি', icon: Rocket },
        { name: 'প্রাইভেট কমিউনিটি', desc: '১,৭০০+ বিল্ডার', icon: Users2 },
        { name: 'লাইভ ওয়ার্কশপ', desc: 'মাসিক সেশন', icon: Video },
        { name: 'প্রম্পট লাইব্রেরি', desc: '৫০০+ প্রম্পট', icon: BookOpen },
        { name: 'জব বোর্ড', desc: 'ক্লায়েন্ট লিড', icon: Briefcase },
        { name: 'রেফারেল ইঞ্জিন', desc: 'প্রতি রেফারেলে রিওয়ার্ড', icon: Gift },
      ]
    : [
        { name: 'AI Bootcamp', desc: '7-day foundation', icon: Rocket },
        { name: 'Private Community', desc: '1,700+ builders', icon: Users2 },
        { name: 'Live Workshops', desc: 'Monthly sessions', icon: Video },
        { name: 'Prompt Library', desc: '500+ prompts', icon: BookOpen },
        { name: 'Job Board', desc: 'Client leads', icon: Briefcase },
        { name: 'Referral Engine', desc: 'Reward per referral', icon: Gift },
      ]

  return (
    <section data-track="ecosystem-map" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
          <Network className="h-3.5 w-3.5" aria-hidden="true" />
          {isBn ? 'NextGen ইকোসিস্টেম' : 'NextGen Ecosystem'}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isBn ? 'আপনি একটি কোর্সে ঢুকছেন না — একটি ইকোসিস্টেমে ঢুকছেন' : 'You\'re Not Joining a Course — You\'re Joining an Ecosystem'}
        </h2>
      </div>

      <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50/50 via-background to-rose-50/30 p-6 dark:border-slate-800">
        {/* Central hub */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl">
            <Sparkles className="h-8 w-8" aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {nodes.map((n, i) => {
            const Icon = n.icon
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-background p-3 shadow-sm transition hover:shadow-md dark:border-slate-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{n.name}</p>
                  <p className="text-[10px] text-muted-foreground">{n.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* E8. MissionMovement — 10,000 AI Builder Mission closing             */
/* Ends page with a movement, not a course — Hormozi grand slam        */
/* ------------------------------------------------------------------ */
export function MissionMovement({ isBn }: { isBn: boolean }) {
  return (
    <section data-track="mission-movement" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500" />
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center text-white sm:py-20">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur">
          <Flame className="h-3.5 w-3.5" aria-hidden="true" />
          {isBn ? 'আমাদের মিশন' : 'Our Mission'}
        </p>
        <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {isBn ? (
            <>১০,০০০ জন AI Builder তৈরি করা —<br />বাংলাদেশের ভবিষ্যত গড়তে</>
          ) : (
            <>Build 10,000 AI Builders —<br />Shape Bangladesh\'s Future</>
          )}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
          {isBn
            ? 'আমরা শুধু একটি কোর্স বিক্রি করছি না। আমরা একটি মুভমেন্ট তৈরি করছি — যেখানে প্রতিটি শিক্ষার্থী বাংলাদেশের ডিজিটাল অর্থনীতির অংশ হয়ে ওঠে। আপনি কি পরবর্তী AI Builder হতে প্রস্তুত?'
            : 'We\'re not just selling a course. We\'re building a movement — where every student becomes part of Bangladesh\'s digital economy. Are you ready to be the next AI Builder?'}
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/15 p-5 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">
                {isBn ? 'অগ্রগতি' : 'Progress'}
              </p>
              <p className="text-2xl font-extrabold">1,700<span className="text-base">/10,000</span></p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">
                {isBn ? 'অবশিষ্ট' : 'Remaining'}
              </p>
              <p className="text-2xl font-extrabold">8,300</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: '17%' }} />
          </div>
        </div>

        <a
          href="#order"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-orange-600 shadow-xl transition hover:scale-105"
        >
          <Rocket className="h-4 w-4" aria-hidden="true" />
          {isBn ? 'মুভমেন্টে যোগ দিন — ১,০০০৳' : 'Join the Movement — 1,000TK'}
        </a>
      </div>
    </section>
  )
}
