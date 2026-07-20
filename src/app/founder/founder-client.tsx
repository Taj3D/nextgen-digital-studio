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
import { siteConfig } from '@/lib/site-data'
import { Award, Briefcase, GraduationCap, Lightbulb, MapPin, Phone, Mail, Star, ArrowRight } from 'lucide-react'

export function FounderClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('founder_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-background to-background dark:from-blue-950/30" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:py-20">
            <div className="order-2 md:order-1">
              <LandingEyebrow>
                {isBn ? 'প্রতিষ্ঠাতা ও সিইও' : 'Founder & CEO'}
              </LandingEyebrow>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {isBn ? (
                  <>
                    মোঃ নাজমুল <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">ইসলাম তাজ</span>
                  </>
                ) : (
                  <>
                    Md. Nazmul Islam <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Taj</span>
                  </>
                )}
              </h1>
              <p className="mt-3 text-lg font-semibold text-muted-foreground">
                {isBn ? 'তাজ ভাই · যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার' : 'Taj Bhai · Jessore first digital engineer'}
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {isBn
                  ? 'তিনি বাংলাদেশের অন্যতম প্রথম ডিজিটাল ইঞ্জিনিয়ার যিনি AI ও অটোমেশন প্রযুক্তি ব্যবহার করে ব্যবসায়িক সমাধান তৈরি করছেন। তার লক্ষ্য — বাংলাদেশের প্রতিটি ব্যবসাকে AI চালিত সেলস মেশিনে পরিণত করা।'
                  : 'He is one of Bangladesh first digital engineers building business solutions with AI and automation. His mission — turn every Bangladeshi business into an AI-powered sales machine.'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#order"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="gradient-brand animate-pulse-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
                >
                  {isBn ? 'স্ট্র্যাটেজি কল বুক করুন' : 'Book Strategy Call'}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <WhatsAppCTA isBn={isBn} />
                <LandingSocials />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-cyan-500/20 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
                  <Image
                    src="/founder.png"
                    alt={isBn ? 'তাজ ভাই — প্রতিষ্ঠাতা' : 'Taj Bhai — Founder'}
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl border border-border/60 bg-card px-4 py-2 shadow-lg">
                  <div
                    className="flex items-center gap-1"
                    aria-label={isBn ? '৫ এর মধ্যে ৫ তারা' : '5 out of 5 stars'}
                    role="img"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground">
                    {isBn ? '১২০+ ক্লায়েন্ট রেটিং' : '120+ client reviews'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {[
              { v: isBn ? '১২০+' : '120+', l: isBn ? 'ক্লায়েন্ট' : 'Clients' },
              { v: isBn ? '৭+' : '7+', l: isBn ? 'বছরের অভিজ্ঞতা' : 'Years experience' },
              { v: isBn ? '২.৪M+' : '2.4M+', l: isBn ? 'অটোমেটেড কথোপকথন' : 'AI conversations' },
              { v: isBn ? '৪.৯/৫' : '4.9/5', l: isBn ? 'গড় রেটিং' : 'Avg rating' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <LandingEyebrow>{isBn ? 'আমার গল্প' : 'My Story'}</LandingEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            {isBn ? 'ইঞ্জিনিয়ারিং থেকে এআই অটোমেশন — একটি যাত্রা' : 'From Engineering to AI Automation — A Journey'}
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              {isBn
                ? 'আমি যশোরের এক সাধারণ পরিবার থেকে উঠে আসা একজন ইঞ্জিনিয়ার। ছোটবেলা থেকেই প্রযুক্তির প্রতি আকর্ষণ ছিল। যখন আমি দেখলাম বাংলাদেশের ছোট ও মাঝারি ব্যবসাগুলো ম্যানুয়াল কাজে সময় ও অর্থ নষ্ট করছে, আমি সিদ্ধান্ত নিলাম AI দিয়ে এই সমস্যার সমাধান করব।'
                : 'I am an engineer from a humble family in Jessore. Since childhood I was drawn to technology. When I saw Bangladeshi SMEs wasting time and money on manual work, I decided to solve it with AI.'}
            </p>
            <p>
              {isBn
                ? 'NextGen Digital Studio প্রতিষ্ঠা করার পর আমরা ১২০+ ব্যবসাকে অটোমেট করেছি, ২.৪ মিলিয়ন+ AI কথোপকথন তৈরি করেছি, এবং গড় ROI ৭.২x অর্জন করেছি। কিন্তু এটি শুরুমাত্র — আমার লক্ষ্য বাংলাদেশের প্রতিটি ব্যবসাকে AI-চালিত করা।'
                : 'After founding NextGen Digital Studio we automated 120+ businesses, generated 2.4M+ AI conversations, and achieved an average ROI of 7.2x. But this is just the beginning — my goal is to make every Bangladeshi business AI-powered.'}
            </p>
            <p>
              {isBn
                ? 'আমি বিশ্বাস করি — ইঞ্জিনিয়ারিং প্রিসিশনে ডিজিটাল সলিউশন তৈরি করলে বাংলাদেশের ব্যবসা বিশ্বের যেকোনো দেশের সাথে প্রতিযোগিতা করতে পারবে।'
                : 'I believe — with engineering-precision digital solutions, Bangladeshi businesses can compete with any country in the world.'}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'আমার মূল্যবোধ' : 'My Values'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'যে নীতিতে আমি কাজ করি' : 'Principles I work by'}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { Icon: Award, t: isBn ? 'মান' : 'Quality', d: isBn ? 'প্রতিটি প্রজেক্টে সর্বোচ্চ মান নিশ্চিত করি।' : 'Highest quality on every project.' },
                { Icon: Lightbulb, t: isBn ? 'উদ্ভাবন' : 'Innovation', d: isBn ? 'সর্বশেষ AI প্রযুক্তি ব্যবহার করি।' : 'Use the latest AI technologies.' },
                { Icon: Briefcase, t: isBn ? 'পেশাদারিত্ব' : 'Professionalism', d: isBn ? 'সময় ও বাজেটে ডেলিভারি দিই।' : 'On-time, on-budget delivery.' },
                { Icon: GraduationCap, t: isBn ? 'শিক্ষা' : 'Education', d: isBn ? 'ক্লায়েন্টকে প্রযুক্তি শেখাই।' : 'Educate clients on technology.' },
              ].map(({ Icon, t, d }, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'সরাসরি কথা বলুন' : 'Talk to me directly'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? 'তাজ ভাইয়ের সাথে যোগাযোগ করুন' : 'Connect with Taj Bhai'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'আপনার ব্যবসার জন্য AI রোডম্যাপ পেতে নিচের ফর্ম পূরণ করুন।'
                  : 'Fill out the form below to get an AI roadmap for your business.'}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                <Mail className="h-3.5 w-3.5" /> {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                <Phone className="h-3.5 w-3.5" /> {siteConfig.phone}
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5" /> {isBn ? 'যশোর, বাংলাদেশ' : 'Jessore, Bangladesh'}
              </span>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="founder_page"
                serviceName={isBn ? 'ফাউন্ডার সাথে কথা বলা' : 'Talk to Founder'}
                submitLabel={isBn ? 'অনুরোধ পাঠান' : 'Send Request'}
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
