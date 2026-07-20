'use client'

import * as React from 'react'
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
import { Check, Clock, Calendar, Gift, Layers, PenTool, Boxes, Wrench, Cpu, Award, ArrowRight } from 'lucide-react'

const CURRICULUM = [
  { day: 1, t_en: 'CNC Basics & Software', t_bn: 'CNC বেসিক ও সফটওয়্যার', d_en: 'Aspire, Vectric, ArtCAM intro.', d_bn: 'Aspire, Vectric, ArtCAM পরিচিতি।', Icon: Cpu },
  { day: 2, t_en: 'Relief Design from Scratch', t_bn: 'শূন্য থেকে Relief ডিজাইন', d_en: 'Build your first 3D relief.', d_bn: 'প্রথম 3D relief তৈরি করুন।', Icon: Layers },
  { day: 3, t_en: 'Photo to 3D Sculpt', t_bn: 'ফটো থেকে 3D স্কাল্পট', d_en: 'Convert a photo into a 3D relief.', d_bn: 'ফটোকে 3D relief-এ রূপান্তর করুন।', Icon: PenTool },
  { day: 4, t_en: 'Furniture & Door Panels', t_bn: 'ফার্নিচার ও দরজা প্যানেল', d_en: 'Industry-grade panel designs.', d_bn: 'ইন্ডাস্ট্রি-গ্রেড প্যানেল ডিজাইন।', Icon: Boxes },
  { day: 5, t_en: 'Toolpath & Machine Setup', t_bn: 'টুলপাথ ও মেশিন সেটআপ', d_en: 'G-code, tooling, feeds & speeds.', d_bn: 'G-code, টুলিং, ফিড ও স্পিড।', Icon: Wrench },
  { day: 6, t_en: 'Live Project: Chair Leg', t_bn: 'লাইভ প্রজেক্ট: চেয়ার লেগ', d_en: 'Hand-sculpt a real chair leg.', d_bn: 'একটি সত্যিকারের চেয়ার লেগ স্কাল্পট করুন।', Icon: Gift },
  { day: 7, t_en: 'Demo Day + Certificates', t_bn: 'ডেমো ডে + সার্টিফিকেট', d_en: 'Showcase + receive certificate.', d_bn: 'প্রেজেন্টেশন + সার্টিফিকেট গ্রহণ।', Icon: Award },
]

export function CncTrainingClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('cnc_training_page')

  /** Convert ASCII digits to Bengali digits when lang === 'bn'. */
  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
      : String(s)

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/30" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
            <LandingEyebrow>
              <Gift className="h-3 w-3" /> {t('cncTraining.freeBonusEyebrow')}
            </LandingEyebrow>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {isBn ? (
                <>
                  ১ সপ্তাহে <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">CNC 3D ডিজাইন</span> শিখুন
                </>
              ) : (
                <>
                  Learn <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">CNC 3D Design</span> in 1 Week
                </>
              )}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {isBn
                ? 'প্রতিদিন রাত ৯টায় লাইভ জুম ক্লাস, ৭ দিনে ৭টি প্রজেক্ট, সার্টিফিকেট + সম্পূর্ণ ফ্রি chair leg design ফাইল। মাত্র ২৫০ টাকা।'
                : 'Daily live Zoom at 9 PM, 7 projects in 7 days, certificate + a complete chair leg design file for free. Just 250TK.'}
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
                <Clock className="h-5 w-5 text-amber-600" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{t('cncTraining.timeLabel')}</div>
                  <div className="text-sm font-bold">{t('cncTraining.timeValue')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{t('cncTraining.durationLabel')}</div>
                  <div className="text-sm font-bold">{t('cncTraining.durationValue')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-500 bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{t('cncTraining.feeLabel')}</div>
                  <div className="text-sm font-bold text-amber-700 dark:text-amber-300">৳{bn('250')}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#order"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="gradient-brand animate-pulse-glow inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/25 transition-transform hover:scale-[1.02]"
              >
                {t('cncTraining.registerNow')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <WhatsAppCTA isBn={isBn} />
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* Free bonus banner */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-4">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 text-center text-sm font-semibold text-white">
            <Gift className="h-4 w-4" />
            {isBn
              ? `রেজিস্টার করলেই একটি সম্পূর্ণ chair leg design ফাইল ফ্রি পাবেন (মূল্য ৳${bn('300')})!`
              : 'Register now and get a complete chair leg design file for free (worth 300TK)!'}
          </div>
        </section>

        {/* Curriculum */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>{t('cncTraining.curriculumEyebrow')}</LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '৭ দিনে ৭টি প্রজেক্ট' : '7 Projects in 7 Days'}
            </h2>
          </div>
          <div className="mt-8 space-y-4">
            {CURRICULUM.map(({ day, t_en, t_bn, d_en, d_bn, Icon }) => (
              <div
                key={day}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-500 font-heading font-bold text-white shadow-md">
                    D{day}
                  </div>
                  <div className="sm:hidden">
                    <Icon className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold">{isBn ? t_bn : t_en}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{isBn ? d_bn : d_en}</p>
                </div>
                <div className="hidden sm:block">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('cncTraining.whatYouGetEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('cncTraining.completePackage')}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                isBn ? '৭ দিনের লাইভ জুম ক্লাস' : '7-day live Zoom classes',
                isBn ? 'প্রতিটি ক্লাসের রেকর্ডিং' : 'Recording of every class',
                isBn ? '৭টি হাতে-কলমে প্রজেক্ট' : '7 hands-on projects',
                isBn ? 'কোর্স সার্টিফিকেট' : 'Course certificate',
                isBn ? 'ফ্রি chair leg design ফাইল' : 'Free chair leg design file',
                isBn ? 'প্রাইভেট সাপোর্ট গ্রুপ' : 'Private support group',
                isBn ? 'লাইফটাইম রিসোর্স অ্যাক্সেস' : 'Lifetime resource access',
                isBn ? 'প্রতিদিন রাত ৯টায় (BD)' : 'Daily at 9 PM (BD)',
                isBn ? '২৫০ টাকায় সম্পূর্ণ কোর্স' : 'Full course for just 250TK',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background p-4 shadow-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{t('cncTraining.registrationEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? 'CNC ট্রেইনিংয়ে নাম লেখান' : 'Register for CNC Training'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'নিচের ফর্ম পূরণ করুন, আমরা ২ ঘন্টায় যোগাযোগ করে পেমেন্ট + জুম লিংক + ফ্রি chair leg ফাইল পাঠাব।'
                  : 'Fill the form. We will reach out within 2 hours with payment + Zoom link + free chair leg file.'}
              </p>
              <div className="mt-4 inline-flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">৳{bn('250')}</span>
                <span className="text-sm text-muted-foreground">/{t('cncTraining.fullCourse')}</span>
              </div>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="cnc_training_page"
                serviceName={isBn ? 'CNC 3D Design Training (250TK, 1 সপ্তাহ)' : 'CNC 3D Design Training (250TK, 1 week)'}
                submitLabel={t('cncTraining.registerNow')}
                paymentAmount={250}
                paymentNote={isBn ? 'পেমেন্টের পর জুম লিংক + ফ্রি chair leg ফাইল পাবেন' : 'Zoom link + free chair leg file sent after payment'}
              />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}
