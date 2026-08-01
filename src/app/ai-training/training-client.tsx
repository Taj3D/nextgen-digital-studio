'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  TopBar,
} from '@/components/site/top-bar'
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
import { siteConfig } from '@/lib/site-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import {
  Sparkles, ArrowRight, Clock, Calendar, Star, Users, ShieldCheck, Lock,
  Heart, Target, Brain, MessageSquare, Code, Rocket, TrendingUp,
  Gift, CheckCircle2, XCircle, ChevronDown, PlayCircle, Award, Globe,
  GraduationCap, Briefcase, Building2, Lightbulb, Cog, AlertTriangle,
  Zap, BookOpen, Flame, MessageCircle, PhoneCall, BadgeCheck, X,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const PROJECTS_GALLERY = [
  { icon: '🤖', bn_title: 'AI চ্যাটবট', en_title: 'AI Chatbot', bn_desc: 'কাস্টমার সাপোর্ট বট', en_desc: 'Customer support bot' },
  { icon: '🍽️', bn_title: 'রেস্টুরেন্ট ওয়েবসাইট', en_title: 'Restaurant Website', bn_desc: 'অর্ডার ম্যানেজমেন্ট সিস্টেম', en_desc: 'Order management system' },
  { icon: '📦', bn_title: 'ইনভেন্টরি সিস্টেম', en_title: 'Inventory System', bn_desc: 'স্টক ট্র্যাকিং অ্যাপ', en_desc: 'Stock tracking app' },
  { icon: '💼', bn_title: 'পোর্টফোলিও সাইট', en_title: 'Portfolio Site', bn_desc: 'AI জেনারেটেড পোর্টফোলিও', en_desc: 'AI-generated portfolio' },
  { icon: '📊', bn_title: 'সিআরএম সিস্টেম', en_title: 'CRM System', bn_desc: 'লিড ম্যানেজমেন্ট টুল', en_desc: 'Lead management tool' },
  { icon: '📄', bn_title: 'ল্যান্ডিং পেজ', en_title: 'Landing Page', bn_desc: 'AI জেনারেটেড পেজ', en_desc: 'AI-generated page' },
] as const

const TESTIMONIALS = [
  {
    bn_text: 'আমি ফ্রিল্যান্স রাইটার। AI নিয়ে ভয় পেতাম। এখন আমি নিজের টুল বানিয়ে ৩x দ্রুত কাজ করি।',
    en_text: 'I was a freelance writer. I was scared of AI. Now I build my own tools and work 3x faster.',
    author_bn: 'তাসনিম জাহান',
    author_en: 'Tasnim Jahan',
    role_bn: 'ফ্রিল্যান্স রাইটার, ঢাকা',
    role_en: 'Freelance Writer, Dhaka',
    result_bn: 'আয় বেড়েছে ২০০%',
    result_en: 'Income up 200%',
  },
  {
    bn_text: 'কোনো টেক জ্ঞান ছিল না। এই বুটক্যাম্প আমাকে গাইড করেছে। এখন আমার নিজের লিড জেনারেশন সফটওয়্যার আছে!',
    en_text: 'No tech background. This bootcamp guided me. Now I have my own lead-gen software!',
    author_bn: 'রফিকুল ইসলাম',
    author_en: 'Rafiqul Islam',
    role_bn: 'ছোট ব্যবসায়ী, চট্টগ্রাম',
    role_en: 'Small Business Owner, Chittagong',
    result_bn: 'মাসে ৫০+ লিড পাচ্ছেন',
    result_en: 'Getting 50+ leads/month',
  },
  {
    bn_text: 'সবচেয়ে ভালো ইনভেস্টমেন্ট। চাকরি পেয়েছি যেখানে AI দক্ষতার জন্য বেতন দ্বিগুণ হয়েছে।',
    en_text: 'Best investment ever. Got a job where my salary doubled for AI skills.',
    author_bn: 'মারিয়া সুলতানা',
    author_en: 'Maria Sultana',
    role_bn: 'চাকরিপ্রার্থী, সিলেট',
    role_en: 'Job Seeker, Sylhet',
    result_bn: 'বেতন বেড়েছে ১০০%',
    result_en: 'Salary up 100%',
  },
  {
    bn_text: '১ সপ্তাহে আমার ব্যবসার জন্য AI চ্যাটবট বানিয়ে ফেলেছি। ক্লায়েন্টরা অবাক!',
    en_text: 'In 1 week I built an AI chatbot for my business. Clients are amazed!',
    author_bn: 'রাশেদ খান',
    author_en: 'Rashed Khan',
    role_bn: 'ব্যবসায়ী, ঢাকা',
    role_en: 'Business Owner, Dhaka',
    result_bn: 'সাপোর্ট খরচ কমেছে ৪০%',
    result_en: 'Support cost down 40%',
  },
] as const

const FAQS = [
  {
    q_bn: 'কোডিং না জানলে কি এই কোর্স করা যাবে?',
    q_en: 'Can I take this course without knowing coding?',
    a_bn: 'হ্যাঁ, সম্পূর্ণ শুরু থেকে শেখানো হয়। কোডিং জানার দরকার নেই।',
    a_en: 'Yes, taught from absolute scratch. No coding knowledge needed.',
  },
  {
    q_bn: 'লাইভ ক্লাস মিস করলে কী হবে?',
    q_en: 'What if I miss a live class?',
    a_bn: 'প্রতিটি ক্লাস রেকর্ড থাকবে, যেকোনো সময় দেখতে পারবেন।',
    a_en: 'Every class is recorded — watch anytime.',
  },
  {
    q_bn: 'কোর্স শেষে কী কী প্রজেক্ট তৈরি করতে পারব?',
    q_en: 'What projects will I be able to build after the course?',
    a_bn: 'AI চ্যাটবট, কনটেন্ট জেনারেটর, টাস্ক অটোমেশন ও ওয়েব অ্যাপ — কমপক্ষে ৩টি প্রজেক্ট।',
    a_en: 'AI chatbot, content generator, task automation, web app — at least 3 projects.',
  },
  {
    q_bn: 'টাকা ফেরতের গ্যারান্টি কিভাবে কাজ করে?',
    q_en: 'How does the money-back guarantee work?',
    a_bn: 'প্রথম ক্লাসের ২৪ ঘন্টার মধ্যে অসন্তুষ্ট হলে পুরো টাকা ফেরত দেওয়া হবে।',
    a_en: 'Request a full refund within 24 hours of the first class if unsatisfied.',
  },
  {
    q_bn: 'প্রতিদিন কত সময় দিতে হবে?',
    q_en: 'How much time per day?',
    a_bn: 'লাইভ ক্লাস ১ ঘন্টা + প্রজেক্টের জন্য আরও ৩০-৬০ মিনিট।',
    a_en: 'Live class 1 hour + 30-60 min for projects.',
  },
  {
    q_bn: 'সার্টিফিকেট দেওয়া হবে?',
    q_en: 'Will I get a certificate?',
    a_bn: 'হ্যাঁ, কোর্স শেষে "AI বিল্ডার" সার্টিফিকেট পাবেন।',
    a_en: 'Yes, you get an "AI Builder" certificate after course completion.',
  },
  {
    q_bn: 'কোন টুলস লাগবে?',
    q_en: 'What tools are needed?',
    a_bn: 'শুধু একটি কম্পিউটার ও ইন্টারনেট কানেকশন।',
    a_en: 'Just a computer and internet connection.',
  },
  {
    q_bn: 'বয়সের সীমা আছে?',
    q_en: 'Is there an age limit?',
    a_bn: 'না, যে কেউ অংশ নিতে পারেন, তবে কম্পিউটার ব্যবহারের মৌলিক ধারণা থাকলে ভালো।',
    a_en: 'No — anyone can join, but basic computer knowledge helps.',
  },
  {
    q_bn: 'আমি ব্যবসায়ী, কীভাবে উপকৃত হব?',
    q_en: 'I am a business owner — how will I benefit?',
    a_bn: 'অটোমেশন দিয়ে সময় বাঁচাবেন, নিজের টুল বানিয়ে খরচ কমাবেন।',
    a_en: 'Save time with automation, build your own tools to cut costs.',
  },
  {
    q_bn: 'শুধু ChatGPT ব্যবহার শেখাবেন?',
    q_en: 'Will you only teach ChatGPT?',
    a_bn: 'বেশ কিছু টুল, তবে মূল ফোকাস সফটওয়্যার বিল্ডিং মেথডলজি — যা যেকোনো টুলে কাজ করে।',
    a_en: 'Several tools, but the focus is software-building methodology that works on any tool.',
  },
  {
    q_bn: 'এই কোর্স কাদের জন্য না?',
    q_en: 'Who is this course NOT for?',
    a_bn: 'যারা ইতিমধ্যে সিনিয়র ডেভেলপার বা "দ্রুত ধনী" হতে চান, তাদের জন্য না।',
    a_en: 'Not for senior developers or those who want to "get rich quick".',
  },
  {
    q_bn: 'ক্লাস কখন হয়?',
    q_en: 'When are the classes?',
    a_bn: 'প্রতিদিন রাত ৯টা, লাইভ জুমে।',
    a_en: 'Every day at 9 PM, live on Zoom.',
  },
  {
    q_bn: 'পেমেন্টের পর কী পাব?',
    q_en: 'What do I get after payment?',
    a_bn: 'ইমেইলে ওয়েলকাম কিট ও জুম লিংক পাবেন।',
    a_en: 'Welcome kit and Zoom link via email.',
  },
  {
    q_bn: 'গ্রুপ সাপোর্ট আছে?',
    q_en: 'Is there group support?',
    a_bn: 'হ্যাঁ, প্রাইভেট কমিউনিটি গ্রুপ, যেখানে প্রশ্ন করতে পারবেন।',
    a_en: 'Yes, a private community group where you can ask questions.',
  },
  {
    q_bn: 'কোর্স ম্যাটেরিয়াল কতদিন থাকবে?',
    q_en: 'How long will course materials be available?',
    a_bn: 'লাইফটাইম অ্যাক্সেস।',
    a_en: 'Lifetime access.',
  },
  {
    q_bn: 'ফ্রিল্যান্সার হিসেবে কাজ পাওয়া যাবে?',
    q_en: 'Will I get freelance work?',
    a_bn: 'হ্যাঁ, বোনাসে ফ্রিল্যান্স কিট দেয়া হচ্ছে যা দিয়ে ক্লায়েন্ট পাওয়া সহজ।',
    a_en: 'Yes — the freelance kit bonus makes getting clients easier.',
  },
  {
    q_bn: 'অফলাইনে ক্লাস হয়?',
    q_en: 'Are there offline classes?',
    a_bn: 'না, সম্পূর্ণ অনলাইন লাইভ জুমে।',
    a_en: 'No — fully online live on Zoom.',
  },
  {
    q_bn: 'আমি যদি কোনো দিন ক্লাস না করতে পারি?',
    q_en: 'What if I can\'t attend a class?',
    a_bn: 'রেকর্ডিং দিয়ে আপনি ক্যাচ আপ করতে পারবেন।',
    a_en: 'Catch up with the recording.',
  },
  {
    q_bn: 'এনরোলমেন্ট শেষ হওয়ার সময় কখন?',
    q_en: 'When does enrollment close?',
    a_bn: '১০ আগস্ট, ২০২৬ রাত ১১:৫৯ পর্যন্ত — সিট সংখ্যা সীমিত।',
    a_en: 'Until August 10, 2026 11:59 PM — limited seats.',
  },
  {
    q_bn: 'এই অফার কি আবার পাব?',
    q_en: 'Will this offer come back?',
    a_bn: 'না, এই দাম আর পাবেন না। পরবর্তী ব্যাচে দাম ৩,০০০৳ হবে।',
    a_en: 'No — this price won\'t come back. Next batch will be 3,000TK.',
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Countdown timer hook (deadline = Aug 11, 2026 midnight Asia/Dhaka)        */
/* -------------------------------------------------------------------------- */

function useCountdown(deadline: Date) {
  // Avoid hydration mismatch: `Date.now()` differs between server render and
  // client hydration, which causes the countdown text (hours:minutes:seconds)
  // to mismatch and throw a React hydration error. We render stable zeros on
  // the server and the first client render, then start the real ticking
  // countdown inside `useEffect` (client-only, after hydration completes).
  const [now, setNow] = React.useState<number | null>(null)
  React.useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  if (now === null) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const diff = Math.max(0, deadline.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

/* -------------------------------------------------------------------------- */
/*  Live seat counter (simulated, decreases over time)                        */
/* -------------------------------------------------------------------------- */

function useSeatCounter(initial = 50) {
  const [seats, setSeats] = React.useState(initial)
  React.useEffect(() => {
    const id = setInterval(() => {
      setSeats((prev) => {
        if (prev <= 5) return prev
        if (Math.random() < 0.15) return prev - 1
        return prev
      })
    }, 25_000)
    return () => clearInterval(id)
  }, [])
  return seats
}

/* -------------------------------------------------------------------------- */
/*  Live toast notifications                                                  */
/* -------------------------------------------------------------------------- */

function LiveToast({ isBn }: { isBn: boolean }) {
  const { t } = useLang()
  const [visible, setVisible] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const names = ['রহিম', 'সালমা', 'করিম', 'ফাতেমা', 'জাহিদ', 'Rahim', 'Salma', 'Karim', 'Fatema', 'Jahid']

  React.useEffect(() => {
    const show = () => {
      setVisible(true)
      setTimeout(() => setVisible(false), 5000)
      setIndex((i) => i + 1)
    }
    const first = setTimeout(show, 4000)
    const id = setInterval(show, 18_000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])

  const actionKey = `aiTraining.v2.toastAction${(index % 5) + 1}` as const
  const agoKey = `aiTraining.v2.toastAgo${(index % 5) + 1}` as const
  const name = isBn ? names[index % 5] : names[(index % 5) + 5]

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-4 z-40 max-w-xs rounded-xl border border-emerald-200/60 bg-background/95 p-3 shadow-lg backdrop-blur transition-transform duration-500 sm:bottom-6 sm:left-6 ${
        visible ? 'translate-x-0' : '-translate-x-[120%]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
          <Users className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="text-xs">
          <div className="font-bold">
            {name}{' '}
            <span className="font-normal text-muted-foreground">
              {t(actionKey)}
            </span>
          </div>
          <div className="text-muted-foreground">{t(agoKey)}</div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Exit intent modal                                                         */
/* -------------------------------------------------------------------------- */

function ExitIntentModal({ isBn }: { isBn: boolean }) {
  const { t } = useLang()
  const [open, setOpen] = React.useState(false)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    if (shown) return
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !shown) {
        setOpen(true)
        setShown(true)
      }
    }
    document.addEventListener('mouseout', handler)
    return () => document.removeEventListener('mouseout', handler)
  }, [shown])

  if (!open) return null

  const close = () => setOpen(false)
  const scrollToEnroll = () => {
    close()
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-background p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-5xl">🎁</div>
        <h3 className="mt-3 font-heading text-2xl font-bold">
          {t('aiTraining.v2.exitTitle')}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('aiTraining.v2.exitBody')}
        </p>
        <button
          type="button"
          onClick={scrollToEnroll}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.02]"
        >
          <Zap className="h-4 w-4" />
          {t('aiTraining.v2.exitCta')}
        </button>
        <button
          type="button"
          onClick={close}
          className="mt-3 text-xs text-muted-foreground hover:text-foreground"
        >
          {t('aiTraining.v2.exitNoThanks')}
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky bottom CTA (mobile only)                                           */
/* -------------------------------------------------------------------------- */

function StickyBottomCTA({ isBn, seats }: { isBn: boolean; seats: number }) {
  const { t } = useLang()
  const [visible, setVisible] = React.useState(false)
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToEnroll = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 shadow-lg backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobile sticky CTA"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <div className="text-base font-extrabold">
            ৳{bn('1,000')}{' '}
            <span className="text-xs font-normal text-muted-foreground line-through">৳{bn('3,000')}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-600">
            <Flame className="h-3 w-3" />
            {t('aiTraining.v2.stickyCtaSeats').replace('{seats}', String(seats))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollToEnroll}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t('aiTraining.v2.stickyEnroll')}
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function TrainingClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('ai_training_page_v2')

  // Convert ASCII digits to Bengali digits when lang === 'bn'
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  // Deadline = Aug 11, 2026 midnight Asia/Dhaka (UTC+6)
  const deadline = React.useMemo(() => new Date('2026-08-11T00:00:00+06:00'), [])
  const { days, hours, minutes, seconds } = useCountdown(deadline)

  // Fast-action bonus deadline = today end of day (local)
  const fastDeadline = React.useMemo(() => {
    const d = new Date()
    d.setHours(23, 59, 59, 999)
    return d
  }, [])
  const fastCountdown = useCountdown(fastDeadline)

  const seats = useSeatCounter(50)

  // Earnings calculator state
  const [siteCount, setSiteCount] = React.useState(3)
  const [clientIncome, setClientIncome] = React.useState(5000)

  const earnings = siteCount * 5000
  const roi = clientIncome > 0 ? Math.round(((clientIncome - 1000) / 1000) * 100) : 0

  // FAQ search state
  const [faqQuery, setFaqQuery] = React.useState('')

  const scrollToEnroll = (e?: React.MouseEvent) => {
    e?.preventDefault()
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollToCurriculum = (e?: React.MouseEvent) => {
    e?.preventDefault()
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredFaqs = FAQS.filter((f) => {
    if (!faqQuery.trim()) return true
    const q = faqQuery.toLowerCase()
    const text = isBn ? `${f.q_bn} ${f.a_bn}` : `${f.q_en} ${f.a_en}`
    return text.toLowerCase().includes(q)
  })

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* ===== 1. HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/20" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-14 md:py-20">
            <LandingEyebrow>
              <Sparkles className="h-3 w-3" /> {t('aiTraining.v2.badge')}
            </LandingEyebrow>
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {t('aiTraining.v2.heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                {t('aiTraining.v2.heroTitleHighlight')}
              </span>
            </h1>
            <p className="mt-3 text-base font-bold text-amber-600 dark:text-amber-400 sm:text-lg">
              {t('aiTraining.v2.heroSub')}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {t('aiTraining.v2.heroSubSub')}
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#order"
                onClick={scrollToEnroll}
                className="animate-pulse-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.02]"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t('aiTraining.v2.ctaPrimary')}
              </a>
              <a
                href="#curriculum"
                onClick={scrollToCurriculum}
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-7 py-3 text-sm font-bold transition-colors hover:bg-muted"
              >
                <PlayCircle className="h-4 w-4" />
                {t('aiTraining.v2.ctaSecondary')}
              </a>
            </div>

            {/* Urgency bar */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t('aiTraining.v2.urgency').replace('{seats}', String(seats))}
            </div>

            {/* Social proof bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-6 sm:grid-cols-4">
              {[
                { icon: Users, label: t('aiTraining.v2.socialProof1') },
                { icon: Star, label: t('aiTraining.v2.socialProof2') },
                { icon: Code, label: t('aiTraining.v2.socialProof3') },
                { icon: Globe, label: t('aiTraining.v2.socialProof4') },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="h-5 w-5 text-amber-500" />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                {isBn ? 'Google for Startups' : 'Google for Startups'}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                {isBn ? '১০০% টাকা ফেরত' : '100% Money Back'}
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                SSL {isBn ? 'নিরাপদ' : 'Secure'}
              </span>
            </div>

            {/* Payment methods */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px]">
              <span className="text-muted-foreground">{isBn ? 'পেমেন্ট:' : 'Payment:'}</span>
              {['bKash', 'Nagad', 'Visa', 'Mastercard'].map((m) => (
                <span key={m} className="rounded-md border border-border bg-background px-2 py-1 font-bold">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 2. DEMO VIDEO ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <PlayCircle className="h-3 w-3" /> {isBn ? 'ডেমো' : 'Demo'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.demoTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.demoSub')}
            </p>
          </div>
          <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-border/60 bg-slate-900 shadow-xl">
            <a
              href="https://web.facebook.com/share/v/1FsTdn4U3u/"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
              aria-label={isBn ? 'Facebook-এ ডেমো ভিডিও দেখুন' : 'Watch demo video on Facebook'}
            >
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                <PlayCircle className="h-10 w-10 text-white" />
              </div>
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/80">
                {isBn ? 'Facebook-এ দেখুন' : 'Watch on Facebook'}
              </p>
            </a>
          </div>
        </section>

        {/* ===== 3. PAIN SECTION ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-3xl border-l-4 border-rose-500 bg-rose-50/60 p-6 dark:bg-rose-950/20 sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-rose-700 dark:text-rose-300 sm:text-3xl">
                {t('aiTraining.v2.painTitle')}
              </h2>
              <ul className="mt-5 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="flex items-start gap-3 text-sm sm:text-[15px]">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    <span>{t(`aiTraining.v2.pain${n}` as const)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-rose-100 p-4 text-sm font-semibold text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
                {t('aiTraining.v2.painConsequence')}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 4. VISION SECTION ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border-l-4 border-emerald-500 bg-emerald-50/60 p-6 dark:bg-emerald-950/20 sm:p-8">
            <LandingEyebrow>
              <Target className="h-3 w-3" /> {isBn ? 'কল্পনা' : 'Imagine'}
            </LandingEyebrow>
            <h2 className="mt-3 font-heading text-2xl font-bold text-emerald-700 dark:text-emerald-300 sm:text-3xl">
              {t('aiTraining.v2.visionTitle')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
              {t('aiTraining.v2.visionBody')}
            </p>
            <p className="mt-3 text-[15px] font-bold leading-relaxed">
              {t('aiTraining.v2.visionBody2')}
            </p>
          </div>
        </section>

        {/* ===== 5. WHY AI NOW ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t('aiTraining.v2.whyTitle')}
              </h2>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: TrendingUp, text: t('aiTraining.v2.why1') },
                  { icon: Users, text: t('aiTraining.v2.why2') },
                  { icon: Clock, text: t('aiTraining.v2.why3') },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px]">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== 6. BEFORE / AFTER ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Zap className="h-3 w-3" /> {t('aiTraining.v2.baTitle')}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.baTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.baSub')}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-rose-300/60 bg-rose-50/50 p-6 dark:bg-rose-950/20">
              <span className="inline-block -translate-y-9 rounded-full border-2 border-rose-300 bg-background px-3 py-0.5 text-xs font-bold text-rose-600">
                {t('aiTraining.v2.beforeLabel')}
              </span>
              <h3 className="font-heading text-xl font-bold">{t('aiTraining.v2.beforeTitle')}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  isBn ? 'টেক জারগনে অভিভূত' : 'Overwhelmed by tech jargon',
                  isBn ? 'AI আপনার চাকরি নিয়ে চিন্তা' : 'Worry about AI taking your job',
                  isBn ? 'ঘণ্টার পর ঘণ্টা রিপিটেটিভ কাজ' : 'Hours of repetitive work',
                  isBn ? '১ সপ্তাহে কোনো অ্যাপ নয়' : 'No app in 1 week',
                  isBn ? 'প্রতিযোগীদের থেকে পিছিয়ে' : 'Lagging behind competitors',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0 text-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-emerald-300/60 bg-emerald-50/50 p-6 dark:bg-emerald-950/20">
              <span className="inline-block -translate-y-9 rounded-full border-2 border-emerald-300 bg-background px-3 py-0.5 text-xs font-bold text-emerald-600">
                {t('aiTraining.v2.afterLabel')}
              </span>
              <h3 className="font-heading text-xl font-bold">{t('aiTraining.v2.afterTitle')}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  isBn ? 'আত্মবিশ্বাসের সাথে AI বিল্ডিং' : 'Building with AI confidently',
                  isBn ? 'AI দিয়ে নতুন সুযোগ তৈরি' : 'Creating new opportunities with AI',
                  isBn ? 'মিনিটে অটোমেশন' : 'Automation in minutes',
                  isBn ? '১ সপ্তাহেই প্রথম অ্যাপ তৈরি' : 'First app built in 1 week',
                  isBn ? 'প্রতিযোগীদের থেকে এগিয়ে' : 'Ahead of competitors',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== 7. STUDENT PROJECTS GALLERY ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Code className="h-3 w-3" /> {isBn ? 'প্রজেক্ট' : 'Projects'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('aiTraining.v2.galleryTitle')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiTraining.v2.gallerySub')}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PROJECTS_GALLERY.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="text-4xl">{p.icon}</div>
                  <h3 className="mt-2 text-sm font-bold sm:text-base">
                    {isBn ? p.bn_title : p.en_title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isBn ? p.bn_desc : p.en_desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 8. OFFER STACK ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-2xl sm:p-8">
            <div className="absolute -right-1/4 -top-1/2 h-[200%] w-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative">
              <span className="inline-block rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-slate-900">
                <Flame className="mr-1 inline h-3 w-3" />
                {t('aiTraining.v2.offerSavings')}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
                {t('aiTraining.v2.offerTitle')}
              </h2>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold sm:text-6xl">৳{bn('1,000')}</span>
                <span className="text-lg text-muted-foreground line-through">৳{bn('3,000')}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {t('aiTraining.v2.offerValue')}
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  { icon: CheckCircle2, text: t('aiTraining.v2.offerItem1'), color: 'text-emerald-400' },
                  { icon: Gift, text: t('aiTraining.v2.offerItem2'), color: 'text-amber-400' },
                  { icon: Gift, text: t('aiTraining.v2.offerItem3'), color: 'text-amber-400' },
                  { icon: Gift, text: t('aiTraining.v2.offerItem4'), color: 'text-amber-400' },
                ].map(({ icon: Icon, text, color }, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px]">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-slate-400">
                <BadgeCheck className="mr-1 inline h-3.5 w-3.5" />
                {t('aiTraining.v2.offerInstallment')}
              </p>

              <a
                href="#order"
                onClick={scrollToEnroll}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <Zap className="h-4 w-4" />
                {t('aiTraining.v2.offerCta')}
              </a>
            </div>
          </div>
        </section>

        {/* ===== 9. FAST ACTION BONUS ===== */}
        <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-100 p-5 text-center dark:from-amber-950/30 dark:to-yellow-950/20 sm:p-6">
            <h3 className="font-heading text-lg font-bold text-amber-900 dark:text-amber-200 sm:text-xl">
              {t('aiTraining.v2.fastTitle')}
            </h3>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
              {t('aiTraining.v2.fastBody')}
            </p>
            <div className="mt-3 font-mono text-3xl font-extrabold tracking-widest text-rose-600">
              {bn(String(fastCountdown.hours).padStart(2, '0'))}:
              {bn(String(fastCountdown.minutes).padStart(2, '0'))}:
              {bn(String(fastCountdown.seconds).padStart(2, '0'))}
            </div>
            <p className="mt-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              {t('aiTraining.v2.fastEndsToday')}
            </p>
          </div>
        </section>

        {/* ===== 10. CURRICULUM ===== */}
        <section id="curriculum" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <BookOpen className="h-3 w-3" /> {isBn ? 'সিলেবাস' : 'Curriculum'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.curriculumTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.curriculumSub')}
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { day: t('aiTraining.v2.day1'), desc: t('aiTraining.v2.day1Desc'), outcome: t('aiTraining.v2.day1Outcome') },
              { day: t('aiTraining.v2.day2'), desc: t('aiTraining.v2.day2Desc'), outcome: t('aiTraining.v2.day2Outcome') },
              { day: t('aiTraining.v2.day3'), desc: t('aiTraining.v2.day3Desc'), outcome: t('aiTraining.v2.day3Outcome') },
              { day: t('aiTraining.v2.day4'), desc: t('aiTraining.v2.day4Desc'), outcome: t('aiTraining.v2.day4Outcome') },
              { day: t('aiTraining.v2.day5'), desc: t('aiTraining.v2.day5Desc'), outcome: t('aiTraining.v2.day5Outcome') },
              { day: t('aiTraining.v2.day6'), desc: t('aiTraining.v2.day6Desc'), outcome: t('aiTraining.v2.day6Outcome') },
              { day: t('aiTraining.v2.day7'), desc: t('aiTraining.v2.day7Desc'), outcome: t('aiTraining.v2.day7Outcome') },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-heading text-sm font-bold text-white shadow-md">
                  {c.day.replace('Day ', '').replace('দিন ', '')}
                </div>
                <div>
                  <div className="text-sm font-bold">{c.desc}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{c.outcome}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 11. INSTRUCTOR ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="relative mx-auto max-w-xs">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500/30 to-orange-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
                  <Image
                    src="/founder.png"
                    alt={t('aiTraining.v2.instructorName')}
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
                <LandingEyebrow>{t('aiTraining.v2.instructorTitle')}</LandingEyebrow>
                <h2 className="mt-3 font-heading text-3xl font-bold">
                  {t('aiTraining.v2.instructorName')}
                </h2>
                <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {t('aiTraining.v2.instructorRole')}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {t('aiTraining.v2.instructorBio')}
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-amber-600" />
                    <span className="font-semibold">{t('aiTraining.v2.instructorStat1')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{t('aiTraining.v2.instructorStat2')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="font-semibold">{t('aiTraining.v2.instructorStat3')}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    isBn ? 'Google Certified' : 'Google Certified',
                    isBn ? '১২০+ প্রজেক্ট' : '120+ Projects',
                    isBn ? 'Top Rated Freelancer' : 'Top Rated Freelancer',
                    isBn ? 'AI স্পেশালিস্ট' : 'AI Specialist',
                  ].map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 12. EARNINGS + ROI CALCULATOR ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <TrendingUp className="h-3 w-3" /> {isBn ? 'ক্যালকুলেটর' : 'Calculator'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.calcTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.calcSub')}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Earnings Calculator */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <h3 className="font-heading text-lg font-bold">{t('aiTraining.v2.calc1Title')}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('aiTraining.v2.calc1Prompt')}
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <Slider
                  value={[siteCount]}
                  onValueChange={(v) => setSiteCount(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="max-w-[120px]"
                />
                <Input
                  type="number"
                  value={siteCount}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1
                    setSiteCount(Math.max(1, Math.min(10, v)))
                  }}
                  min={1}
                  max={10}
                  className="w-20 text-center"
                />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                ৳{bn(earnings.toLocaleString('en-US'))}+
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t('aiTraining.v2.calc1Result')}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground">
                {t('aiTraining.v2.calc1Note')}
              </p>
            </div>
            {/* ROI Calculator */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <h3 className="font-heading text-lg font-bold">{t('aiTraining.v2.calc2Title')}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('aiTraining.v2.calc2CourseFee')}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-sm">{t('aiTraining.v2.calc2Client')}</span>
                <Input
                  type="number"
                  value={clientIncome}
                  onChange={(e) => setClientIncome(parseInt(e.target.value) || 0)}
                  step={500}
                  min={0}
                  className="w-28 text-center"
                />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {bn(String(roi))}%
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t('aiTraining.v2.calc2Result')}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 13. UNIVERSITY COMPARISON ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <GraduationCap className="h-3 w-3" /> {isBn ? 'তুলনা' : 'Comparison'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('aiTraining.v2.uniTitle')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiTraining.v2.uniSub')}
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/50">
                    <th className="p-3 text-left font-bold">{isBn ? 'বিষয়' : 'Aspect'}</th>
                    <th className="p-3 text-left font-bold">{t('aiTraining.v2.uniCol1')}</th>
                    <th className="p-3 text-left font-bold text-amber-600">{t('aiTraining.v2.uniCol2')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t('aiTraining.v2.uniRow1Label'), uni: t('aiTraining.v2.uniRow1Uni'), boot: t('aiTraining.v2.uniRow1Boot') },
                    { label: t('aiTraining.v2.uniRow2Label'), uni: t('aiTraining.v2.uniRow2Uni'), boot: t('aiTraining.v2.uniRow2Boot') },
                    { label: t('aiTraining.v2.uniRow3Label'), uni: t('aiTraining.v2.uniRow3Uni'), boot: t('aiTraining.v2.uniRow3Boot') },
                    { label: t('aiTraining.v2.uniRow4Label'), uni: t('aiTraining.v2.uniRow4Uni'), boot: t('aiTraining.v2.uniRow4Boot') },
                    { label: t('aiTraining.v2.uniRow5Label'), uni: t('aiTraining.v2.uniRow5Uni'), boot: t('aiTraining.v2.uniRow5Boot') },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/40 last:border-0">
                      <td className="p-3 font-semibold">{row.label}</td>
                      <td className="p-3 text-muted-foreground">{row.uni}</td>
                      <td className="bg-amber-50/50 p-3 font-semibold text-amber-700 dark:bg-amber-950/20 dark:text-amber-300">
                        {row.boot}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== 14. TESTIMONIALS ===== */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Heart className="h-3 w-3" /> {isBn ? 'রিভিউ' : 'Reviews'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.testiTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.testiSub')}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((tm, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
              >
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm italic text-foreground/80">
                  "{isBn ? tm.bn_text : tm.en_text}"
                </p>
                <div className="mt-3 font-bold text-sm">
                  — {isBn ? tm.author_bn : tm.author_en}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isBn ? tm.role_bn : tm.role_en}
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ✅ {isBn ? tm.result_bn : tm.result_en}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 15. CAREER OPPORTUNITIES ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Briefcase className="h-3 w-3" /> {isBn ? 'ক্যারিয়ার' : 'Careers'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('aiTraining.v2.careerTitle')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiTraining.v2.careerSub')}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Rocket, title: t('aiTraining.v2.career1'), desc: t('aiTraining.v2.career1Desc') },
                { icon: Building2, title: t('aiTraining.v2.career2'), desc: t('aiTraining.v2.career2Desc') },
                { icon: Lightbulb, title: t('aiTraining.v2.career3'), desc: t('aiTraining.v2.career3Desc') },
                { icon: Cog, title: t('aiTraining.v2.career4'), desc: t('aiTraining.v2.career4Desc') },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm"
                >
                  <Icon className="mx-auto h-8 w-8 text-amber-500" />
                  <h3 className="mt-2 text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 16. QUALIFICATION ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Target className="h-3 w-3" /> {isBn ? 'যোগ্যতা' : 'Qualification'}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.qualTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.qualSub')}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-emerald-300/60 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-300">
                {t('aiTraining.v2.qualForTitle')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{t(`aiTraining.v2.qualFor${n}` as const)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-rose-300/60 bg-rose-50/40 p-5 dark:bg-rose-950/20">
              <h3 className="font-bold text-rose-700 dark:text-rose-300">
                {t('aiTraining.v2.qualNotTitle')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <span>{t(`aiTraining.v2.qualNot${n}` as const)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== 17. FAQ (with search) ===== */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <MessageSquare className="h-3 w-3" /> {isBn ? 'প্রশ্ন' : 'FAQ'}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('aiTraining.v2.faqTitle')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiTraining.v2.faqSub')}
              </p>
            </div>
            <Input
              type="text"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder={t('aiTraining.v2.faqSearch')}
              className="mx-auto mt-6 block w-full max-w-md rounded-full"
            />
            <Accordion type="single" collapsible className="mt-6">
              {filteredFaqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
                  <AccordionTrigger className="py-4 text-left text-sm font-bold hover:no-underline">
                    {isBn ? f.q_bn : f.q_en}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {isBn ? f.a_bn : f.a_en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {isBn ? 'কোনো প্রশ্ন পাওয়া যায়নি।' : 'No questions found.'}
              </p>
            )}
          </div>
        </section>

        {/* ===== 18. GUARANTEE ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-6 text-center dark:bg-emerald-950/20 sm:p-8">
            <div className="absolute -bottom-8 -right-8 text-[10rem] opacity-5">🛡️</div>
            <div className="relative">
              <div className="text-4xl">🛡️</div>
              <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                {t('aiTraining.v2.guaranteeTitle')}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/80">
                {t('aiTraining.v2.guaranteeBody')}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  t('aiTraining.v2.guaranteeBadge1'),
                  t('aiTraining.v2.guaranteeBadge2'),
                  t('aiTraining.v2.guaranteeBadge3'),
                ].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-emerald-200 bg-background/70 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 19. SCARCITY / COUNTDOWN ===== */}
        <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-100 p-6 text-center dark:from-amber-950/30 dark:to-yellow-950/20 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-amber-900 dark:text-amber-200 sm:text-2xl">
              {t('aiTraining.v2.scarcityTitle')}
            </h2>
            <div className="mt-3 text-5xl font-extrabold text-rose-600 sm:text-6xl">
              {bn(String(seats))}
            </div>
            <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              {t('aiTraining.v2.scarcitySeats')}
            </div>
            <div className="mt-1 text-[10px] text-amber-700 dark:text-amber-400">
              {t('aiTraining.v2.scarcityUpdated')}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 shadow-sm">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold sm:text-3xl">
                  {bn(String(days).padStart(2, '0'))}
                </div>
                <div className="text-[9px] text-muted-foreground">{isBn ? 'দিন' : 'DAYS'}</div>
              </div>
              <span className="text-2xl text-muted-foreground">:</span>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold sm:text-3xl">
                  {bn(String(hours).padStart(2, '0'))}
                </div>
                <div className="text-[9px] text-muted-foreground">{isBn ? 'ঘন্টা' : 'HRS'}</div>
              </div>
              <span className="text-2xl text-muted-foreground">:</span>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold sm:text-3xl">
                  {bn(String(minutes).padStart(2, '0'))}
                </div>
                <div className="text-[9px] text-muted-foreground">{isBn ? 'মিনিট' : 'MIN'}</div>
              </div>
              <span className="text-2xl text-muted-foreground">:</span>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold sm:text-3xl">
                  {bn(String(seconds).padStart(2, '0'))}
                </div>
                <div className="text-[9px] text-muted-foreground">{isBn ? 'সেকেন্ড' : 'SEC'}</div>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-amber-800 dark:text-amber-300">
              {t('aiTraining.v2.scarcityPriceUp')}
            </p>
            <a
              href="#order"
              onClick={scrollToEnroll}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.02]"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t('aiTraining.v2.scarcityCta')}
            </a>
          </div>
        </section>

        {/* ===== 20. WHATSAPP FLOW ===== */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <MessageCircle className="h-3 w-3" /> WhatsApp
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('aiTraining.v2.waFlowTitle')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('aiTraining.v2.waFlowSub')}
            </p>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-emerald-300/60 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
            <ol className="space-y-3">
              {[
                { n: 1, text: t('aiTraining.v2.waFlow1') },
                { n: 2, text: t('aiTraining.v2.waFlow2') },
                { n: 3, text: t('aiTraining.v2.waFlow3') },
                { n: 4, text: t('aiTraining.v2.waFlow4') },
              ].map(({ n, text }) => (
                <li key={n} className="flex items-start gap-3 text-sm">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {bn(n)}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 text-center">
              <WhatsAppCTA
                isBn={isBn}
                message={
                  isBn
                    ? 'আসসালামু আলাইকুম, আমি AI Bootcamp এ এনরোল করতে চাই।'
                    : 'Hi, I want to enroll in the AI Bootcamp.'
                }
              />
            </div>
          </div>
        </section>

        {/* ===== 21. ENROLLMENT / PAYMENT ===== */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{t('aiTraining.v2.enrollTitle')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {t('aiTraining.registrationEyebrow')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiTraining.v2.enrollSub')}
              </p>
              <div className="mt-4 inline-flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">৳{bn('1,000')}</span>
                <span className="text-sm text-muted-foreground">
                  /{t('aiTraining.fullCourse')}
                </span>
              </div>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="ai_training_page_v2"
                serviceName={
                  isBn ? 'AI Bootcamp (১,০০০৳, ১ সপ্তাহ)' : 'AI Bootcamp (1,000TK, 1 week)'
                }
                submitLabel={t('aiTraining.registerNow')}
                paymentAmount={1000}
                paymentNote={
                  isBn ? 'পেমেন্টের পর জুম লিংক পাবেন' : 'Zoom link sent after payment'
                }
              />
            </div>
            <div className="mt-6 flex justify-center">
              <WhatsAppCTA
                isBn={isBn}
                message={
                  isBn
                    ? 'আসসালামু আলাইকুম, আমি AI Bootcamp এ এনরোল করতে চাই।'
                    : 'Hi, I want to enroll in the AI Bootcamp.'
                }
              />
            </div>
          </div>
        </section>

        {/* ===== 22. FINAL CTA ===== */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              {isBn ? 'আজই শুরু করুন আপনার AI যাত্রা!' : 'Start your AI journey today!'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              {isBn
                ? 'মাত্র ১,০০০ টাকায়, ১ সপ্তাহে, হাতে কলমে শিখুন AI দিয়ে সফটওয়্যার তৈরি।'
                : 'For just 1,000TK, in 1 week, learn hands-on to build software with AI.'}
            </p>
            <a
              href="#order"
              onClick={scrollToEnroll}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-amber-600 shadow-lg transition-transform hover:scale-105"
            >
              {t('aiTraining.registerNow')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ===== 23. SOCIAL LINKS ===== */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>{isBn ? 'ফলো করুন' : 'Follow Us'}</LandingEyebrow>
            <h2 className="mt-3 font-heading text-xl font-bold">
              {isBn ? 'সংযুক্ত থাকুন' : 'Stay Connected'}
            </h2>
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      <StickyBottomCTA isBn={isBn} seats={seats} />
      <LiveToast isBn={isBn} />
      <ExitIntentModal isBn={isBn} />
    </div>
  )
}
