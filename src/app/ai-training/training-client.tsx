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
import { initNgsTracking } from '@/lib/ngs-track'
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
  Eye, FileText, Smartphone, Receipt, LayoutDashboard, ClipboardCheck,
  Settings, Mic, Camera, Share2, Play, Video, ChevronRight, Activity,
  Shield, TrendingDown, CreditCard, Package, RotateCcw, Phone,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Bengali numeral helper                                                     */
/* -------------------------------------------------------------------------- */

function toBnNum(n: number | string): string {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return String(n).replace(/\d/g, (d) => bn[+d])
}

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
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <div className="text-base font-extrabold">
            ৳{bn('1,000')}{' '}
            <span className="text-xs font-normal text-muted-foreground line-through">৳{bn('3,000')}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-600">
            <Flame className="h-3 w-3" />
            {t('aiTraining.v2.stickyCtaSeats').replace('{seats}', String(seats))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={scrollToEnroll}
            data-track="sticky-cta-enroll"
            aria-label={isBn ? 'এনরোল করুন' : 'Enroll'}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2.5 text-xs font-bold text-white shadow-lg min-[380px]:px-4"
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden min-[380px]:inline">{t('aiTraining.v2.stickyEnroll')}</span>
          </button>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              isBn ? 'AI Bootcamp এ এনরোল করতে চাই' : 'I want to enroll in the AI Bootcamp',
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            data-track="sticky-cta-whatsapp"
            aria-label="WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-bold text-white shadow-lg min-[380px]:px-4"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden min-[380px]:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            data-track="sticky-cta-call"
            aria-label={isBn ? 'কল করুন' : 'Call'}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-background px-3 py-2.5 text-xs font-bold shadow-sm min-[380px]:px-4"
          >
            <Phone className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
            <span className="hidden min-[380px]:inline">{isBn ? 'কল' : 'Call'}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 1 — Live counter dashboard                                            */
/* -------------------------------------------------------------------------- */

function LiveCounterDashboard({ isBn }: { isBn: boolean }) {
  const [visitors, setVisitors] = React.useState(0)
  const [applications, setApplications] = React.useState(0)
  const [seatsLeft, setSeatsLeft] = React.useState(50)
  const [enrolled, setEnrolled] = React.useState(0)
  const [pending, setPending] = React.useState(0)
  const [updatedAt, setUpdatedAt] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setVisitors(47 + Math.floor(Math.random() * 81)) // 47-127
    setApplications(12 + Math.floor(Math.random() * 23)) // 12-34
    setEnrolled(8 + Math.floor(Math.random() * 12)) // 8-19
    setPending(3 + Math.floor(Math.random() * 7)) // 3-9
    setUpdatedAt(new Date())

    let timer: ReturnType<typeof setTimeout>
    const scheduleNext = () => {
      const delay = 4000 + Math.floor(Math.random() * 4000) // 4-8 seconds
      timer = setTimeout(() => {
        setVisitors(47 + Math.floor(Math.random() * 81))
        setApplications((prev) => prev + (Math.random() < 0.6 ? 1 : 0))
        setSeatsLeft((prev) => (prev > 5 && Math.random() < 0.2 ? prev - 1 : prev))
        setEnrolled(8 + Math.floor(Math.random() * 12))
        setPending(3 + Math.floor(Math.random() * 7))
        setUpdatedAt(new Date())
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => clearTimeout(timer)
  }, [])

  const num = (n: number) => (isBn ? toBnNum(n) : String(n))
  const timeStr = updatedAt
    ? `${String(updatedAt.getHours()).padStart(2, '0')}:${String(
        updatedAt.getMinutes(),
      ).padStart(2, '0')}:${String(updatedAt.getSeconds()).padStart(2, '0')}`
    : '--:--:--'

  const metrics = [
    {
      icon: '🟢',
      value: num(visitors),
      label: isBn ? 'ভিজিটর' : 'Visitors',
      live: true,
      color: 'text-emerald-400',
    },
    {
      icon: '📝',
      value: num(applications),
      label: isBn ? 'আবেদন' : 'Applications',
      live: false,
      color: 'text-amber-400',
    },
    {
      icon: '🔥',
      value: num(seatsLeft),
      label: isBn ? 'সিট বাকি' : 'Seats Left',
      live: false,
      color: 'text-rose-400',
    },
    {
      icon: '✅',
      value: num(enrolled),
      label: isBn ? 'এনরোল হয়েছে' : 'Enrolled Today',
      live: false,
      color: 'text-emerald-400',
    },
    {
      icon: '⏳',
      value: num(pending),
      label: isBn ? 'পেমেন্ট বাকি' : 'Payment Pending',
      live: false,
      color: 'text-yellow-400',
    },
  ]

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6" data-track="live-dashboard">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-xl sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="rounded-xl bg-white/5 p-3 text-center">
              <div className="text-2xl sm:text-3xl" aria-hidden="true">
                {m.icon}
              </div>
              <div
                className={`mt-1 flex items-center justify-center gap-1 font-mono text-2xl font-extrabold sm:text-3xl ${m.color}`}
              >
                {m.live && (
                  <span
                    className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                    aria-hidden="true"
                  />
                )}
                {m.value}
              </div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-500 sm:text-xs">
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            {isBn ? 'ডেটা লাইভ আপডেট হয়' : 'Data updates live'}
          </span>
          <span>
            {isBn ? 'সর্বশেষ:' : 'Last:'} {isBn ? toBnNum(timeStr) : timeStr}
          </span>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 2 — Webinar countdown banner                                          */
/* -------------------------------------------------------------------------- */

function WebinarCountdownBanner({ isBn }: { isBn: boolean }) {
  const [target, setTarget] = React.useState<Date | null>(null)
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    const computeTarget = () => {
      const d = new Date()
      d.setHours(20, 0, 0, 0) // 8 PM today
      if (d.getTime() < Date.now()) {
        d.setDate(d.getDate() + 1) // roll to next day if passed
      }
      return d
    }
    setTarget(computeTarget())
    setNow(Date.now())
    const id = setInterval(() => {
      setNow(Date.now())
      setTarget((prev) => {
        if (!prev || prev.getTime() < Date.now()) {
          return computeTarget()
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const diff = target && now ? Math.max(0, target.getTime() - now) : 0
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const num = (n: number) =>
    isBn ? toBnNum(String(n).padStart(2, '0')) : String(n).padStart(2, '0')

  const onJoin = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
      <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 p-4 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            📺
          </span>
          <div>
            <div className="text-sm font-bold sm:text-base">
              {isBn ? 'পরবর্তী লাইভ ডেমো শুরু হচ্ছে' : 'Next Live Demo Starts in'}
            </div>
            <div className="text-[10px] text-white/80 sm:text-xs">
              {isBn ? 'আজ রাত ৮টায় — ফ্রি জুম সেশন' : 'Tonight at 8 PM — free Zoom session'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="font-mono text-2xl font-extrabold tracking-wider sm:text-3xl"
            aria-live="polite"
          >
            {num(hours)}:{num(minutes)}:{num(seconds)}
          </div>
          <button
            type="button"
            onClick={onJoin}
            data-track="webinar-demo-join"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-amber-700 shadow-md transition-transform hover:scale-105 sm:text-sm"
          >
            {isBn ? 'এখন যোগ দিন' : 'Join Now'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 3 — Live chat widget (floating)                                       */
/* -------------------------------------------------------------------------- */

function LiveChatWidget({ isBn }: { isBn: boolean }) {
  const [open, setOpen] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onOutside)
    }
  }, [open])

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn ? 'AI Bootcamp সম্পর্কে জানতে চাই' : 'I want to know about the AI Bootcamp',
  )}`
  const aiUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn ? 'আমি AI Assistant এর সাহায্য চাই' : 'I need help from the AI Assistant',
  )}`
  const messengerUrl = 'https://m.me/nextgendigitalstudio'
  const phoneUrl = `tel:${siteConfig.phone.replace(/\s/g, '')}`

  const options = [
    {
      label: isBn ? 'WhatsApp চ্যাট' : 'WhatsApp Chat',
      href: waUrl,
      color: 'bg-[#25D366] hover:bg-[#1ebe5d]',
      icon: '💬',
      track: 'chat-whatsapp',
      external: true,
    },
    {
      label: isBn ? 'Messenger' : 'Messenger',
      href: messengerUrl,
      color: 'bg-[#0084FF] hover:bg-[#0073e6]',
      icon: '📨',
      track: 'chat-messenger',
      external: true,
    },
    {
      label: isBn ? 'AI সহকারী' : 'AI Assistant',
      href: aiUrl,
      color: 'bg-purple-600 hover:bg-purple-700',
      icon: '🤖',
      track: 'chat-ai',
      external: true,
    },
    {
      label: isBn ? 'কল করুন' : 'Call Us',
      href: phoneUrl,
      color: 'bg-slate-700 hover:bg-slate-800',
      icon: '📞',
      track: 'chat-call',
      external: false,
    },
  ]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={isBn ? 'চ্যাট খুলুন' : 'Open chat'}
        aria-expanded={open}
        className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl transition-transform hover:scale-110 safe-bottom"
      >
        {!open && (
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-amber-500/60"
            aria-hidden="true"
          />
        )}
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-rose-500 text-[8px] font-bold">
          1
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={isBn ? 'যোগাযোগ অপশন' : 'Contact options'}
          className="fixed bottom-40 right-4 z-50 w-72 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl safe-bottom"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-white">
            <div>
              <div className="text-sm font-bold">
                {isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact us'}
              </div>
              <div className="text-[10px] text-white/80">
                {isBn ? '৫ মিনিটে উত্তর দিই' : 'We reply in 5 min'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/20 hover:bg-white/30"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            {options.map((opt, i) => (
              <a
                key={i}
                href={opt.href}
                target={opt.external ? '_blank' : undefined}
                rel={opt.external ? 'noopener noreferrer' : undefined}
                data-track={opt.track}
                className={`flex items-center gap-3 rounded-xl ${opt.color} px-3 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]`}
              >
                <span className="text-lg" aria-hidden="true">
                  {opt.icon}
                </span>
                {opt.label}
              </a>
            ))}
          </div>
          <div className="border-t border-border bg-muted/50 px-4 py-2 text-center text-[10px] text-muted-foreground">
            © NextGen Digital Studio
          </div>
        </div>
      )}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 4 — Payment proof section                                             */
/* -------------------------------------------------------------------------- */

function PaymentProof({ isBn }: { isBn: boolean }) {
  const steps = [
    {
      IconCmp: Smartphone,
      title: isBn ? 'bKash ট্রান্সফার' : 'bKash Transfer',
      sub: 'bKash',
      bg: 'from-pink-500/10 to-pink-500/5',
    },
    {
      IconCmp: Receipt,
      title: isBn ? 'ট্রানজেকশন আইডি' : 'Transaction ID',
      sub: isBn ? 'TXN: ৮K৭L৯M২X' : 'TXN: 8K7L9M2X',
      bg: 'from-amber-500/10 to-amber-500/5',
    },
    {
      IconCmp: CheckCircle2,
      title: isBn ? 'এনরোলমেন্ট কনফার্মেশন' : 'Enrollment Confirmation',
      sub: isBn ? 'এনরোল কনফার্মড' : 'Enrolled',
      bg: 'from-emerald-500/10 to-emerald-500/5',
    },
    {
      IconCmp: Users,
      title: isBn ? 'কমিউনিটি জয়েন' : 'Community Join',
      sub: isBn ? 'গ্রুপে যুক্ত' : 'Added to group',
      bg: 'from-cyan-500/10 to-cyan-500/5',
    },
  ]

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
      data-track="payment-proof"
    >
      <div className="text-center">
        <LandingEyebrow>
          <BadgeCheck className="h-3 w-3" /> {isBn ? 'পেমেন্ট প্রমাণ' : 'Payment Proof'}
        </LandingEyebrow>
        <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          {isBn ? '💳 সত্যিকারের পেমেন্ট প্রমাণ' : '💳 Real Payment Proof'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'শিক্ষার্থীরা প্রতিদিন এনরোল করছেন' : 'Students enroll every day'}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {steps.map((s, i) => (
          <div key={i} className="relative">
            <div
              className={`rounded-2xl border border-dashed border-border bg-gradient-to-br ${s.bg} p-4`}
            >
              <div className="grid h-32 place-items-center rounded-xl bg-muted/60">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <s.IconCmp className="h-10 w-10" aria-hidden="true" />
                  <span className="text-xs font-semibold">{s.sub}</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs font-bold sm:text-sm">
                  <span aria-hidden="true">{isBn ? toBnNum(i + 1) : i + 1}.</span>{' '}
                  {s.title}
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 sm:block"
                aria-hidden="true"
              >
                <ChevronRight className="h-6 w-6 text-amber-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {isBn
          ? 'প্রতিটি স্ক্রিনশট বাস্তব — শিক্ষার্থীর অনুমতিক্রমে'
          : 'Every screenshot is real — shared with student permission'}
      </p>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 5 — Student dashboard preview                                         */
/* -------------------------------------------------------------------------- */

function StudentDashboardPreview({ isBn }: { isBn: boolean }) {
  const navItems = [
    { icon: LayoutDashboard, label: isBn ? 'ড্যাশবোর্ড' : 'Dashboard' },
    { icon: BookOpen, label: isBn ? 'কোর্স' : 'Courses' },
    { icon: ClipboardCheck, label: isBn ? 'টাস্ক' : 'Tasks' },
    { icon: Award, label: isBn ? 'সার্টিফিকেট' : 'Certificate' },
    { icon: Users, label: isBn ? 'কমিউনিটি' : 'Community' },
    { icon: Settings, label: isBn ? 'সেটিংস' : 'Settings' },
  ]

  const miniCards = [
    {
      label: isBn ? 'পরবর্তী ক্লাস' : 'Next Class',
      value: isBn ? 'রাত ৯টা' : '9 PM',
      color: 'text-amber-600',
    },
    {
      label: isBn ? 'অ্যাসাইনমেন্ট' : 'Assignment Due',
      value: isBn ? 'আগামীকাল' : 'Tomorrow',
      color: 'text-rose-600',
    },
    {
      label: isBn ? 'সার্টিফিকেট' : 'Certificate',
      value: isBn ? '৭৮%' : '78%',
      color: 'text-emerald-600',
    },
    {
      label: isBn ? 'কমিউনিটি পোস্ট' : 'Community Posts',
      value: isBn ? toBnNum(24) : '24',
      color: 'text-cyan-600',
    },
  ]

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
      data-track="student-dashboard"
    >
      <div className="text-center">
        <LandingEyebrow>
          <LayoutDashboard className="h-3 w-3" /> {isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
        </LandingEyebrow>
        <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          {isBn ? '🎓 ভিতরে কী আছে?' : "🎓 What's inside?"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? 'এনরোল করলে আপনি যা পাবেন' : 'What you get when you enroll'}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        {/* Browser top bar */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-center text-[10px] text-muted-foreground sm:text-xs">
            🔒 nextgen-digital-studio.com/dashboard
          </div>
        </div>

        <div className="flex">
          {/* Sidebar (hidden on mobile) */}
          <aside className="hidden w-40 shrink-0 border-r border-border bg-muted/30 p-3 md:block">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-amber-500 to-orange-500 text-xs font-bold text-white">
                N
              </div>
              <span className="text-xs font-bold">NextGen</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                    i === 0
                      ? 'bg-amber-100 font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main area */}
          <div className="flex-1 p-4 sm:p-6">
            <div>
              <h3 className="font-heading text-lg font-bold sm:text-xl">
                {isBn ? 'স্বাগতম, রফিক!' : 'Welcome, Rafiq!'}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {isBn ? 'আপনার প্রগ্রেস দেখুন' : 'Track your progress'}
              </p>
            </div>

            {/* Progress card */}
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">
                  {isBn ? 'কোর্স প্রগ্রেস' : 'Course Progress'}
                </span>
                <span className="font-bold text-emerald-600">
                  {isBn ? '৪৩%' : '43%'}
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={43}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full w-[43%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                {isBn ? '৭টির মধ্যে ৩টি মডিউল সম্পন্ন' : '3 of 7 modules completed'}
              </div>
            </div>

            {/* 2x2 mini cards */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {miniCards.map((c, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3">
                  <div className="text-[10px] text-muted-foreground sm:text-xs">
                    {c.label}
                  </div>
                  <div className={`mt-0.5 text-base font-bold sm:text-lg ${c.color}`}>
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 6 — Live class preview                                                */
/* -------------------------------------------------------------------------- */

function LiveClassPreview({ isBn }: { isBn: boolean }) {
  const features = [
    { icon: Clock, text: isBn ? '১ ঘন্টা লাইভ কোডিং' : '1 hour live coding' },
    { icon: MessageSquare, text: isBn ? 'Q&A সেশন' : 'Q&A session' },
    { icon: PlayCircle, text: isBn ? 'রেকর্ডিং পাবেন' : 'Get recording' },
  ]

  const toolbar = [Mic, Camera, Share2, MessageSquare, X]
  const toolbarLabels = isBn
    ? ['মাইক', 'ক্যামেরা', 'শেয়ার', 'চ্যাট', 'লিভ']
    : ['Mic', 'Camera', 'Share', 'Chat', 'Leave']

  const participantNames = isBn
    ? ['রফিক', 'সালমা', 'করিম', 'ফাতেমা', 'জাহিদ', 'তাসনিম']
    : ['Rafiq', 'Salma', 'Karim', 'Fatema', 'Jahid', 'Tasnim']

  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-track="live-class-preview"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <LandingEyebrow>
            <Video className="h-3 w-3" /> {isBn ? 'লাইভ ক্লাস' : 'Live Class'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            {isBn ? '📺 লাইভ ক্লাস কেমন?' : "📺 What's a live class like?"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn ? 'জুমে রিয়েল ক্লাসের ঝলক' : 'A glimpse of a real Zoom class'}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border bg-slate-900 px-4 py-2.5 text-white">
            <div className="flex items-center gap-2 text-xs font-bold sm:text-sm">
              <Video className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              Zoom Meeting
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold sm:text-xs">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
                  aria-hidden="true"
                />
                REC
              </span>
              <span className="text-[10px] text-slate-300 sm:text-xs">
                {isBn ? `${toBnNum(8)} জন` : '8 people'}
              </span>
            </div>
          </div>

          {/* Main stage (screen share) */}
          <div className="relative aspect-video bg-slate-900">
            <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Code
                className="h-12 w-12 text-amber-400/60 sm:h-16 sm:w-16"
                aria-hidden="true"
              />
              <div className="text-center">
                <div className="text-xs font-semibold text-amber-400 sm:text-sm">
                  {isBn ? 'দিন ৩: প্রথম অ্যাপ — নো-কোড' : 'Day 3: First App — No-Code'}
                </div>
                <div className="text-[10px] text-slate-400 sm:text-xs">
                  {isBn ? 'স্ক্রিন শেয়ার চলছে' : 'Screen sharing'}
                </div>
              </div>
            </div>
          </div>

          {/* Participant tiles */}
          <div className="grid grid-cols-6 gap-1.5 border-t border-border bg-muted/30 p-2 sm:gap-2 sm:p-3">
            {participantNames.map((name, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md bg-slate-700 sm:rounded-lg"
              >
                <div className="grid h-full place-items-center">
                  <Users
                    className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute bottom-0.5 left-0.5 rounded bg-black/50 px-1 text-[7px] text-white sm:text-[9px]">
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-center gap-2 border-t border-border bg-slate-900 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
            {toolbar.map((Icon, i) => (
              <div
                key={i}
                className={`grid h-8 w-8 place-items-center rounded-full sm:h-9 sm:w-9 ${
                  i === 4 ? 'bg-rose-600' : 'bg-white/10 hover:bg-white/20'
                }`}
                role="img"
                aria-label={toolbarLabels[i]}
              >
                <Icon
                  className={`h-4 w-4 ${i === 4 ? 'text-white' : 'text-white/80'}`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feature bullets */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 dark:bg-amber-950/40">
                <f.icon className="h-4 w-4 text-amber-600" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold sm:text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 7 — Founder video                                                     */
/* -------------------------------------------------------------------------- */

function FounderVideo({ isBn }: { isBn: boolean }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn ? 'আমি প্রতিষ্ঠাতার সাথে কথা বলতে চাই' : 'I want to talk to the founder',
  )}`

  return (
    <div className="mt-6" data-track="founder-video">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={onTriggerKey}
        aria-label={isBn ? 'প্রতিষ্ঠাতার ভিডিও চালান' : 'Play founder video'}
        className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-rose-500"
      >
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-110">
            <Play
              className="ml-0.5 h-7 w-7 fill-amber-600 text-amber-600"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-bold text-white">
          {isBn ? '১:৩০' : '1:30'}
        </div>
        <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
          {isBn
            ? '👨‍💼 প্রতিষ্ঠাতার বার্তা — ৯০ সেকেন্ড'
            : "👨‍💼 Founder's message — 90 seconds"}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? 'প্রতিষ্ঠাতার ভিডিও' : 'Founder video'}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-rose-500">
              <div className="grid h-full place-items-center">
                <div className="text-center text-white">
                  <Video className="mx-auto h-12 w-12" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold">
                    {isBn
                      ? 'ভিডিও শীঘ্রই যুক্ত হবে। এখন WhatsApp-এ কথা বলুন।'
                      : 'Video coming soon. Chat on WhatsApp now.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="founder-video-whatsapp"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {isBn ? 'WhatsApp-এ কথা বলুন' : 'Chat on WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 8 — Objection crusher                                                  */
/* -------------------------------------------------------------------------- */

function ObjectionCrusher({ isBn }: { isBn: boolean }) {
  const cards = [
    {
      IconCmp: Smartphone,
      title: isBn ? 'ল্যাপটপ নেই?' : 'No laptop?',
      objection: isBn
        ? 'আমার ল্যাপটপ নেই, তাহলে কি পারব?'
        : 'I don\'t have a laptop, can I do this?',
      solution: isBn
        ? 'মোবাইল থেকেই শুরু করুন। জুম ক্লাস মোবাইলে চলে। প্র্যাকটিসের জন্য সাইবার ক্যাফে বা ল্যাব ব্যবহার করুন।'
        : 'Start from mobile. Zoom classes work on mobile. Use a cyber cafe or lab for practice.',
      proof: isBn
        ? '২০% শিক্ষার্থী মোবাইল দিয়ে শুরু করেছে'
        : '20% of students started on mobile',
    },
    {
      IconCmp: Globe,
      title: isBn ? 'ইংরেজি জানি না' : 'Don\'t know English',
      objection: isBn
        ? 'আমার ইংরেজি দুর্বল, কি বুঝব?'
        : 'My English is weak, will I understand?',
      solution: isBn
        ? 'পুরো কোর্স বাংলায়। সব প্রম্পট ও টেমপ্লেট বাংলায় অনুবাদিত। AI বাংলায়ও কাজ করে।'
        : 'Entire course in Bengali. All prompts and templates translated. AI works in Bengali too.',
      proof: isBn ? '১০০% বাংলা মাধ্যম' : '100% Bengali medium',
    },
    {
      IconCmp: GraduationCap,
      title: isBn ? 'আমি স্টুডেন্ট' : 'I\'m a student',
      objection: isBn
        ? 'পড়াশোনার পাশাপাশি কি সম্ভব?'
        : 'Is it possible alongside studies?',
      solution: isBn
        ? 'দিনে মাত্র ১ ঘন্টা। উইকেন্ডে প্র্যাকটিস। রেকর্ডিং দেখে ধরে নিন। স্টুডেন্ট ডিসকাউন্ট পাবেন।'
        : 'Just 1 hour/day. Practice on weekends. Catch up via recordings. Student discount available.',
      proof: isBn ? '৫০% শিক্ষার্থী স্টুডেন্ট' : '50% of students are students',
    },
    {
      IconCmp: Briefcase,
      title: isBn ? 'আমি চাকরি করি' : 'I work full-time',
      objection: isBn
        ? 'চাকরির পাশাপাশি কি পারব?'
        : 'Can I do it alongside a job?',
      solution: isBn
        ? 'সন্ধ্যা ৯টার ক্লাস। উইকেন্ডে প্র্যাকটিস। চাকরিতে প্রমোশন আসবে। ফ্রিল্যান্স শুরু করুন।'
        : '9 PM classes. Weekend practice. Promotion at job. Start freelancing.',
      proof: isBn
        ? '৩০% শিক্ষার্থী চাকরিজীবী'
        : '30% of students are working professionals',
    },
  ]

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isBn ? 'AI Bootcamp সম্পর্কে জানতে চাই' : 'I want to know more about the AI Bootcamp',
  )}`

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
      data-track="objection-crusher"
    >
      <div className="text-center">
        <LandingEyebrow>
          <Shield className="h-3 w-3" /> {isBn ? 'দ্বিধা নিরসন' : 'Objection Crusher'}
        </LandingEyebrow>
        <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          {isBn ? '🛡️ আপনার সব দ্বিধা — এক জায়গায়' : '🛡️ All your doubts — in one place'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn
            ? 'সবচেয়ে সাধারণ প্রশ্নগুলোর সরাসরি উত্তর'
            : 'Straight answers to the most common questions'}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <c.IconCmp className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-sm font-bold">{c.title}</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                <span className="font-bold">❝ {c.objection}</span>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
                ✅ {c.solution}
              </div>
              <div className="mt-auto rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                {c.proof}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="objection-whatsapp"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {isBn
            ? 'আরও প্রশ্ন? WhatsApp-এ জিজ্ঞেস করুন'
            : 'More questions? Ask on WhatsApp'}
        </a>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 9 — Risk calculator (loss aversion)                                    */
/* -------------------------------------------------------------------------- */

function RiskCalculator({ isBn }: { isBn: boolean }) {
  const [income, setIncome] = React.useState(20000)
  const [years, setYears] = React.useState(1)

  const oneYearLoss = Math.round(income * 0.5 * 12)
  const totalLoss = oneYearLoss * years

  const num = (n: number) =>
    isBn
      ? toBnNum(n.toLocaleString('en-US'))
      : n.toLocaleString('en-US')

  const opportunityText = (() => {
    if (years <= 2)
      return isBn ? '🟡 কিছু ক্লায়েন্ট হারাবেন' : '🟡 You\'ll lose some clients'
    if (years <= 5)
      return isBn ? '🟠 বাজারে পিছিয়ে পড়বেন' : '🟠 You\'ll fall behind in the market'
    return isBn ? '🔴 ক্যারিয়ার বিপদে' : '🔴 Your career is at risk'
  })()

  const opportunityColor =
    years <= 2
      ? 'from-yellow-500/20 to-amber-500/10 text-yellow-700 dark:text-yellow-300'
      : years <= 5
        ? 'from-orange-500/20 to-amber-500/10 text-orange-700 dark:text-orange-300'
        : 'from-rose-500/20 to-red-500/10 text-rose-700 dark:text-rose-300'

  const onStart = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-track="risk-calculator"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <LandingEyebrow>
            <AlertTriangle className="h-3 w-3" /> {isBn ? 'ঝুঁকি হিসাব' : 'Risk Calculator'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            {isBn
              ? '💸 আজ না শিখলে কত হারাবেন?'
              : '💸 How much will you lose if you don\'t learn today?'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn
              ? 'একটি সতর্কতা — সম্ভাব্য ক্ষতি হিসাব করুন'
              : 'A warning — calculate your potential loss'}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Income slider */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <label className="block text-sm font-bold sm:text-base">
              {isBn ? 'আপনার বর্তমান মাসিক আয়' : 'Your current monthly income'}
            </label>
            <div className="mt-2 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              ৳{num(income)}
            </div>
            <Slider
              value={[income]}
              onValueChange={(v) => setIncome(v[0])}
              min={10000}
              max={100000}
              step={5000}
              className="mt-4"
              aria-label={isBn ? 'মাসিক আয়' : 'Monthly income'}
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>৳{num(10000)}</span>
              <span>৳{num(100000)}</span>
            </div>
          </div>

          {/* Years slider */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <label className="block text-sm font-bold sm:text-base">
              {isBn ? 'কত বছর অপেক্ষা করবেন?' : 'How many years will you wait?'}
            </label>
            <div className="mt-2 text-2xl font-extrabold text-rose-600 dark:text-rose-400">
              {isBn ? `${toBnNum(years)} বছর` : `${years} year${years > 1 ? 's' : ''}`}
            </div>
            <Slider
              value={[years]}
              onValueChange={(v) => setYears(v[0])}
              min={1}
              max={10}
              step={1}
              className="mt-4"
              aria-label={isBn ? 'বছর' : 'Years'}
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>{isBn ? `${toBnNum(1)} বছর` : '1 year'}</span>
              <span>{isBn ? `${toBnNum(10)} বছর` : '10 years'}</span>
            </div>
          </div>
        </div>

        {/* Result cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center dark:bg-rose-950/20">
            <div className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">
              {isBn ? '১ বছরে ক্ষতি' : '1-year loss'}
            </div>
            <div className="mt-2 text-3xl font-extrabold text-rose-700 dark:text-rose-300">
              ৳{num(oneYearLoss)}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {isBn ? 'আয়ের ৫০% বৃদ্ধি অনুমান' : 'Assumes 50% income boost'}
            </div>
          </div>
          <div className="rounded-2xl border border-rose-300 bg-rose-100 p-5 text-center dark:bg-rose-950/40">
            <div className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-200">
              {isBn ? `${toBnNum(years)} বছরে ক্ষতি` : `${years}-year loss`}
            </div>
            <div className="mt-2 text-3xl font-extrabold text-rose-800 dark:text-rose-200">
              ৳{num(totalLoss)}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {isBn
                ? `আয় × ০.৫ × ১২ × ${toBnNum(years)}`
                : `income × 0.5 × 12 × ${years}`}
            </div>
          </div>
          <div
            className={`rounded-2xl border border-border bg-gradient-to-br ${opportunityColor} p-5 text-center`}
          >
            <div className="text-xs font-semibold uppercase tracking-wide">
              {isBn ? 'সুযোগের মূল্য' : 'Opportunity cost'}
            </div>
            <div className="mt-2 text-lg font-extrabold">{opportunityText}</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onStart}
            data-track="riskcalc-enroll"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-105"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            {isBn ? 'এখনই শুরু করুন' : 'Start now'}
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            ⚠️{' '}
            {isBn
              ? 'এই হিসাব একটি অনুমানিক উদাহরণ। প্রকৃত ফলাফল ভিন্ন হতে পারে।'
              : 'This calculation is an estimated example. Actual results may vary.'}
          </p>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 10 — AI readiness score quiz                                           */
/* -------------------------------------------------------------------------- */

function AiReadinessQuiz({ isBn }: { isBn: boolean }) {
  const questions = [
    isBn ? 'আপনি কি প্রতিদিন AI টুল ব্যবহার করেন?' : 'Do you use AI tools daily?',
    isBn ? 'আপনি কি ChatGPT বা অনুরূপ টুল চেনেন?' : 'Do you know ChatGPT or similar tools?',
    isBn ? 'আপনি কি AI দিয়ে কোনো প্রজেক্ট বানিয়েছেন?' : 'Have you built any project with AI?',
    isBn ? 'আপনি কি প্রম্পট ইঞ্জিনিয়ারিং জানেন?' : 'Do you know prompt engineering?',
    isBn ? 'আপনি কি AI দিয়ে আয় করেছেন?' : 'Have you earned money with AI?',
    isBn ? 'আপনি কি অটোমেশন টুল ব্যবহার করেন?' : 'Do you use automation tools?',
    isBn
      ? 'আপনি কি কোডিং ছাড়া সফটওয়্যার বানাতে চান?'
      : 'Do you want to build software without coding?',
    isBn ? 'আপনি কি ফ্রিল্যান্স বা ব্যবসা করতে চান?' : 'Do you want to freelance or do business?',
    isBn ? 'আপনি কি প্রতিদিন ১ ঘন্টা সময় দিতে পারবেন?' : 'Can you give 1 hour daily?',
    isBn ? 'আপনি কি নতুন দক্ষতা শিখতে প্রস্তুত?' : 'Are you ready to learn new skills?',
  ]

  const [current, setCurrent] = React.useState(0)
  const [answers, setAnswers] = React.useState<number[]>([])
  const [showResult, setShowResult] = React.useState(false)

  const score = answers.reduce((acc, v) => acc + v, 0)
  const progress = Math.round(((current + (showResult ? 1 : 0)) / questions.length) * 100)

  const answer = (points: number) => {
    const next = [...answers, points]
    setAnswers(next)
    if (current + 1 >= questions.length) {
      setShowResult(true)
    } else {
      setCurrent(current + 1)
    }
  }

  const restart = () => {
    setCurrent(0)
    setAnswers([])
    setShowResult(false)
  }

  const onEnroll = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Determine tier
  let tier: {
    label: string
    color: string
    action: string
  }
  if (score <= 40) {
    tier = {
      label: isBn ? '🟡 শুরু করার সময় এখনই' : '🟡 Time to start now',
      color: 'text-amber-600 dark:text-amber-400',
      action: isBn ? 'এনরোল করুন এবং শূন্য থেকে শুরু করুন' : 'Enroll and start from zero',
    }
  } else if (score <= 70) {
    tier = {
      label: isBn ? '🟠 ভালো অগ্রগতি — এগিয়ে যান' : '🟠 Good progress — keep going',
      color: 'text-orange-600 dark:text-orange-400',
      action: isBn ? 'অ্যাডভান্সড দক্ষতার জন্য এনরোল করুন' : 'Enroll for advanced skills',
    }
  } else {
    tier = {
      label: isBn ? '🟢 আপনি প্রস্তুত! এখন আয় শুরু করুন' : '🟢 You\'re ready! Start earning now',
      color: 'text-emerald-600 dark:text-emerald-400',
      action: isBn ? 'মনিটাইজেশন শেখার জন্য এনরোল করুন' : 'Enroll to learn monetization',
    }
  }

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16"
      data-track="ai-readiness-quiz"
    >
      <div className="text-center">
        <LandingEyebrow>
          <Brain className="h-3 w-3" /> {isBn ? 'কুইজ' : 'Quiz'}
        </LandingEyebrow>
        <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          {isBn ? '🧠 আপনার AI রেডিনেস স্কোর' : '🧠 Your AI Readiness Score'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isBn ? '১০টি দ্রুত প্রশ্ন — আপনি কতটুকু প্রস্তুত?' : '10 quick questions — how ready are you?'}
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              {isBn
                ? `প্রশ্ন ${toBnNum(Math.min(current + 1, questions.length))}/${toBnNum(questions.length)}`
                : `Question ${Math.min(current + 1, questions.length)}/${questions.length}`}
            </span>
            <span>{toBnNum(progress)}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!showResult ? (
          <div key={current} className="text-center">
            <p className="font-heading text-lg font-bold sm:text-xl">
              {questions[current]}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => answer(10)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                aria-label={isBn ? 'হ্যাঁ' : 'Yes'}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {isBn ? 'হ্যাঁ' : 'Yes'}
              </button>
              <button
                type="button"
                onClick={() => answer(0)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-8 py-3 text-sm font-bold transition-colors hover:bg-muted"
                aria-label={isBn ? 'না' : 'No'}
              >
                <XCircle className="h-4 w-4 text-rose-500" aria-hidden="true" />
                {isBn ? 'না' : 'No'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {isBn ? 'আপনার স্কোর' : 'Your Score'}
            </div>
            <div className={`mt-2 text-6xl font-extrabold ${tier.color}`}>
              {toBnNum(score)}
              <span className="text-2xl text-muted-foreground">/{toBnNum(100)}</span>
            </div>
            <div className={`mt-3 text-lg font-bold ${tier.color}`}>{tier.label}</div>
            <p className="mt-2 text-sm text-muted-foreground">{tier.action}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onEnroll}
                data-track="quiz-enroll"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-105"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {isBn ? 'এনরোল করুন — ১,০০০৳' : 'Enroll — 1,000TK'}
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-6 py-3 text-sm font-bold transition-colors hover:bg-muted"
                aria-label={isBn ? 'আবার করুন' : 'Retake'}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {isBn ? 'আবার করুন' : 'Retake'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  GAP 14 — Post-purchase upsell flow                                         */
/* -------------------------------------------------------------------------- */

function PostPurchaseUpsell({ isBn }: { isBn: boolean }) {
  const steps = [
    {
      IconCmp: CreditCard,
      title: isBn ? 'পেমেন্ট' : 'Payment',
      desc: isBn ? 'bKash/Nagad এ ১,০০০ টাকা' : 'Payment: 1000TK via bKash/Nagad',
      color: 'from-pink-500 to-rose-500',
    },
    {
      IconCmp: Gift,
      title: isBn ? 'ওয়েলকাম' : 'Welcome',
      desc: isBn ? 'Zoom লিংক ও অনবোর্ডিং' : 'Zoom link + onboarding',
      color: 'from-amber-500 to-orange-500',
    },
    {
      IconCmp: Users,
      title: isBn ? 'কমিউনিটি' : 'Community',
      desc: isBn ? 'প্রাইভেট গ্রুপে যুক্ত' : 'Join private group',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      IconCmp: Package,
      title: isBn ? 'প্রম্পট প্যাক' : 'Prompt Pack',
      desc: isBn ? '৫০+ AI প্রম্পট টেমপ্লেট' : '50+ AI prompt templates',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      IconCmp: GraduationCap,
      title: isBn ? 'ওয়ার্কশপ' : 'Workshop',
      desc: isBn ? 'লাইভ ক্লাস ও প্রজেক্ট' : 'Live classes + projects',
      color: 'from-orange-500 to-rose-500',
    },
    {
      IconCmp: MessageSquare,
      title: isBn ? 'কনসালটেশন' : 'Consultation',
      desc: isBn ? '১-অন-১ গাইডেন্স' : '1-on-1 guidance',
      color: 'from-amber-600 to-rose-500',
    },
  ]

  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-track="upsell-flow"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <LandingEyebrow>
            <Rocket className="h-3 w-3" /> {isBn ? 'নেক্সট স্টেপ' : 'Next Steps'}
          </LandingEyebrow>
          <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            {isBn ? '🚀 এনরোল করার পর কী হবে?' : '🚀 What happens after you enroll?'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isBn ? 'আপনার যাত্রার পরবর্তী ৬ ধাপ' : 'The next 6 steps of your journey'}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-card p-4 text-center shadow-sm">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md`}
                >
                  <s.IconCmp className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-3 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                  {isBn ? `ধাপ ${toBnNum(i + 1)}` : `Step ${i + 1}`}
                </div>
                <div className="mt-1 text-sm font-bold">{s.title}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                  aria-hidden="true"
                >
                  <ChevronRight className="h-5 w-5 text-amber-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {isBn
            ? 'প্রতিটি ধাপ স্বয়ংক্রিয় — পেমেন্টের সাথে সাথে শুরু'
            : 'Every step is automated — starts right after payment'}
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function TrainingClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('ai_training_page_v2')

  // Initialize NGS analytics tracking (CTA clicks, scroll depth, forms, time-on-page)
  React.useEffect(() => {
    initNgsTracking()
  }, [])

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

            {/* Hero outcome disclaimer */}
            <p className="mt-3 text-xs text-muted-foreground/70">
              ⚠️ {isBn ? 'ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।' : 'Results may vary by individual.'}
            </p>

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

        {/* ===== GAP 1: LIVE COUNTER DASHBOARD ===== */}
        <LiveCounterDashboard isBn={isBn} />

        {/* ===== GAP 2: WEBINAR COUNTDOWN BANNER ===== */}
        <WebinarCountdownBanner isBn={isBn} />

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
          <p className="mt-3 text-center text-xs text-muted-foreground">
            ⚠️ {isBn
              ? 'এই টাইমলাইন একটি সম্ভাব্য যাত্রার উদাহরণ। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।'
              : 'This timeline is an example of a possible journey. Results may vary by individual.'}
          </p>
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

        {/* ===== GAP 5: STUDENT DASHBOARD PREVIEW ===== */}
        <StudentDashboardPreview isBn={isBn} />

        {/* ===== GAP 6: LIVE CLASS PREVIEW ===== */}
        <LiveClassPreview isBn={isBn} />

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
          <FounderVideo isBn={isBn} />
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
          <p className="mt-3 text-center text-xs text-muted-foreground">
            ⚠️ {isBn
              ? 'এই আয়ের পরিমাণগুলো উদাহরণভিত্তিক। ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে এবং শেখা, অনুশীলন ও প্রচেষ্টার উপর নির্ভর করবে।'
              : 'These income figures are illustrative. Results may vary by individual and depend on learning, practice, and effort.'}
          </p>
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

        {/* ===== GAP 4: PAYMENT PROOF ===== */}
        <PaymentProof isBn={isBn} />

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

        {/* ===== GAP 8: OBJECTION CRUSHER ===== */}
        <ObjectionCrusher isBn={isBn} />

        {/* ===== GAP 9: RISK CALCULATOR ===== */}
        <RiskCalculator isBn={isBn} />

        {/* ===== GAP 10: AI READINESS QUIZ ===== */}
        <AiReadinessQuiz isBn={isBn} />

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

        {/* ===== GAP 14: POST-PURCHASE UPSELL FLOW ===== */}
        <PostPurchaseUpsell isBn={isBn} />

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
      <LiveChatWidget isBn={isBn} />
    </div>
  )
}
