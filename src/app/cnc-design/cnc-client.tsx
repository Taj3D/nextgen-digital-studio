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
import { Clock, Tag, Download, HardDrive, Boxes, DoorOpen, Sofa, BedDouble, Archive, Armchair, Table2, LayoutGrid } from 'lucide-react'

/* 8 design categories with counts */
const CATEGORIES = [
  { Icon: DoorOpen, t_en: 'Doors', t_bn: 'দরজা', count: '500+' },
  { Icon: Sofa, t_en: 'Sofa', t_bn: 'সোফা', count: '300+' },
  { Icon: BedDouble, t_en: 'Beds', t_bn: 'বেড', count: '200+' },
  { Icon: Archive, t_en: 'Wardrobes', t_bn: 'আলমারি', count: '400+' },
  { Icon: Table2, t_en: 'Dressing Tables', t_bn: 'ড্রেসিং টেবিল', count: '150+' },
  { Icon: Armchair, t_en: 'Chairs', t_bn: 'চেয়ার', count: '250+' },
  { Icon: Table2, t_en: 'Tables', t_bn: 'টেবিল', count: '180+' },
  { Icon: LayoutGrid, t_en: 'Others', t_bn: 'অন্যান্য', count: '500+' },
]

const INCLUDED = [
  { Icon: Boxes, t_en: '2D + 3D designs', t_bn: '২D + ৩D ডিজাইন' },
  { Icon: HardDrive, t_en: 'STL / DXF files', t_bn: 'STL / DXF ফাইল' },
  { Icon: Clock, t_en: 'Lifetime access', t_bn: 'লাইফটাইম অ্যাক্সেস' },
  { Icon: Download, t_en: 'Instant download', t_bn: 'তাৎক্ষণিক ডাউনলোড' },
]

export function CncClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('cnc_design_page')

  /** Convert ASCII digits to Bengali digits when lang === 'bn'. */
  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
      : String(s)

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/30" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:py-20">
            <div>
              <LandingEyebrow>
                <Tag className="h-3 w-3" /> {t('cncDesign.specialOfferEyebrow')}
              </LandingEyebrow>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {isBn ? (
                  <>
                    আপনার কারখানার জন্য সব ডিজাইন <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">এক জায়গায়</span>
                  </>
                ) : (
                  <>
                    All designs for your factory <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">in one place</span>
                  </>
                )}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {isBn
                  ? '২৫০০+ CNC ডিজাইন, ১৫০ জিবি, ২D ও ৩D ফাইল — মাত্র ১৫০ টাকায়। দরজা, সোফা, বেড, আলমারি সহ সব ক্যাটাগরি। আজই অর্ডার করুন!'
                  : '2500+ CNC designs, 150GB, 2D + 3D files — for just 150TK. Doors, sofa, bed, wardrobe and all categories. Order today!'}
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold">৳{bn('150')}</span>
                <span className="text-lg text-muted-foreground line-through">৳{bn('1,500')}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-600">
                  {isBn ? '-৯০%' : '-90%'}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                  {bn('150')} GB
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                  {isBn ? '২৫০০+ ডিজাইন' : '2500+ designs'}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {isBn ? '২D + ৩D' : '2D + 3D'}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/25 transition-transform hover:scale-[1.02]">
                  {t('cta.orderNow')}
                </a>
                <WhatsAppCTA isBn={isBn} />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-500/30 to-orange-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
                <Image
                  src="/3d-gallery/3.jpg"
                  alt="CNC Design Sample"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                      {t('cncDesign.bundle')}
                    </p>
                    <p className="font-heading text-xl font-bold">150GB · 2500+ files</p>
                  </div>
                  <div className="rounded-full bg-amber-500 px-3 py-1 text-sm font-bold">৳{bn('150')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Pain */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('cncDesign.yourProblemEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'প্রতিটি অর্ডারে নতুন করে ডিজাইন করছেন?' : 'Designing from scratch on every order?'}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { v: isBn ? '৩-৫ ঘণ্টা' : '3-5 hours', l: isBn ? 'প্রতিটি ডিজাইনে নষ্ট' : 'wasted per design' },
                { v: isBn ? '২০K/মাস' : '20K/month', l: isBn ? 'ডিজাইনারের বেতন' : 'designer salary' },
                { v: isBn ? 'অর্ডার হাতছাড়া' : 'Lost orders', l: isBn ? 'সময়ে ডেলিভারি দিতে না পেরে' : "can't deliver on time" },
              ].map((p, i) => (
                <div key={i} className="rounded-2xl border border-rose-200/60 bg-card p-5 text-center shadow-sm dark:border-rose-900/40">
                  <div className="text-2xl font-extrabold text-rose-600">{p.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{p.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Desire + Categories */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>{t('cncDesign.solutionEyebrow')}</LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'কল্পনা করুন ২৫০০+ ডিজাইন আপনার হাতে' : 'Imagine 2500+ designs at your fingertips'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {isBn ? '৮টি ক্যাটেগরি, সব প্রিন্ট-রেডি, সরাসরি আপনার CNC মেশিনে চালানোর জন্য।' : '8 categories, all print-ready, ready to run on your CNC machine.'}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {CATEGORIES.map(({ Icon, t_en, t_bn, count }, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-transform hover:scale-[1.02]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-500 text-white shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-heading font-bold">{isBn ? t_bn : t_en}</h3>
                <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400">{bn(count)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. What's included */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('cncDesign.whatsIncludedEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('cncDesign.completePackage')}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {INCLUDED.map(({ Icon, t_en, t_bn }, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold">{isBn ? t_bn : t_en}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Price */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center shadow-xl dark:from-amber-950/30 dark:to-orange-950/20">
            <LandingEyebrow>{t('cncDesign.priceEyebrow')}</LandingEyebrow>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-6xl font-extrabold text-amber-600 dark:text-amber-400">৳{bn('150')}</span>
              <span className="text-lg text-muted-foreground line-through">৳{bn('1,500')}</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-600">
                -90%
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {isBn ? '১৫০ জিবি = ২৫০০+ ডিজাইন (২D + ৩D)' : '150GB = 2500+ designs (2D + 3D)'}
            </p>
          </div>
        </section>

        {/* 6. How to Order */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('landing.howToOrder')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('landing.just3Steps')}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { n: 1, t: isBn ? 'ফর্ম পূরণ করুন' : 'Fill the form', d: isBn ? 'নাম, ফোন, ইমেইল দিন।' : 'Enter name, phone, email.' },
                { n: 2, t: isBn ? 'টিম কল করবে' : 'Team calls you', d: isBn ? 'পেমেন্ট নিশ্চিত করবে।' : 'Confirms payment.' },
                { n: 3, t: isBn ? 'ডাউনলোড লিংক' : 'Download link', d: isBn ? 'Google Drive লিংক পাবেন।' : 'Get Google Drive link.' },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-500 font-heading text-xl font-bold text-white shadow-md">
                    {s.n}
                  </div>
                  <h3 className="mt-3 font-heading font-bold">{s.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Order Form */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{t('landing.placeOrder')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? '১৫০টাকায় অর্ডার করুন' : 'Order Now for 150TK'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'ফর্ম পূরণ করুন, তারপর পেমেন্ট করুন ১৫০ টাকা। ডাউনলোড লিংক WhatsApp-এ পাবেন।'
                  : 'Fill the form, then pay 150TK. Download link sent on WhatsApp.'}
              </p>
              <div className="mt-4 inline-flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">৳{bn('150')}</span>
                <span className="text-sm text-muted-foreground">/{t('cncDesign.fullBundle')}</span>
              </div>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="cnc_design_page"
                serviceName={isBn ? 'CNC ডিজাইন বান্ডল (150TK / 150GB)' : 'CNC Design Bundle (150TK / 150GB)'}
                submitLabel={t('cta.orderNow')}
                paymentAmount={150}
                paymentNote={isBn ? 'পেমেন্টের পর Google Drive লিংক পাবেন' : 'Google Drive link sent after payment'}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <WhatsAppCTA
                isBn={isBn}
                message={isBn ? 'আসসালামু আলাইকুম, আমি CNC ডিজাইন বান্ডল (150TK / 150GB) অর্ডার করতে চাই।' : 'Hi, I want to order the CNC Design Bundle (150TK / 150GB).'}
              />
            </div>
          </div>
        </section>

        {/* 8. Social Links */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>{t('landing.followUs')}</LandingEyebrow>
            <h2 className="mt-3 font-heading text-xl font-bold">
              {t('landing.stayConnected')}
            </h2>
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* 9. CTA */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              {isBn ? '২৫০০+ ডিজাইন মাত্র ১৫০ টাকায়!' : '2500+ designs for just 150TK!'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              {isBn
                ? 'আজই অর্ডার করুন, আগামীকালই ডাউনলোড লিংক পাবেন।'
                : 'Order today, get download link tomorrow.'}
            </p>
            <a
              href="#order"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-amber-600 shadow-lg transition-transform hover:scale-105"
            >
              {t('cta.orderNow')}
            </a>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}
