'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Check, ArrowRight, Monitor, Smartphone, Globe, Shield, Zap, Star } from "lucide-react"
import { siteConfig } from "@/lib/site-data"
import { useLang } from "../language-provider"

const toolkitFeatures = [
  { icon: Zap, title: '১১৫+ প্রফেশনাল টুল', desc: 'সিস্টেম অপ্টিমাইজ, ক্লিন, রিপেয়ার ও সিকিউর করুন এক প্যাকেজে' },
  { icon: Monitor, title: 'সকল ডিভাইস', desc: 'PC, Mac, Linux, Android ও iOS — সব প্ল্যাটফর্মে কাজ করে' },
  { icon: Shield, title: '১০০% নিরাপদ', desc: 'কোন ভাইরাস বা ম্যালওয়্যার নেই — সম্পূর্ণ নিরাপদ সফটওয়্যার' },
  { icon: Star, title: '৫০০০+ ইউজার', desc: 'বাংলাদেশের ৫০০০+ ইউজার বিশ্বস্ত' },
]

const toolkitPlans = [
  { name: 'বেসিক', price: '299', original: '599', features: ['১১৫+ টুল অ্যাক্সেস', 'Windows সাপোর্ট', '৩ মাস আপডেট'], popular: false },
  { name: 'প্রফেশনাল', price: '499', original: '999', features: ['১১৫+ টুল অ্যাক্সেস', 'সকল প্ল্যাটফর্ম', '১ বছর আপডেট', 'ভিডিও টিউটোরিয়াল'], popular: true },
  { name: 'এন্টারপ্রাইজ', price: '999', original: '1999', features: ['সব ফিচার', 'লাইফটাইম আপডেট', 'আনলিমিটেড ডিভাইস', '২৪/৭ সাপোর্ট'], popular: false },
]

export function SystemToolkit() {
  const { t } = useLang()
  return (
    <section id="system-toolkit" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('toolkit.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('toolkit.title1')}{" "}
            <span className="text-gradient">{t('toolkit.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('toolkit.subtitle')}
          </p>
        </Reveal>

        {/* Features */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {toolkitFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 text-center card-hover hover:border-blue-600/30">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg transition-transform group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {toolkitPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 ${
                plan.popular
                  ? "border-blue-600/40 bg-gradient-to-b from-blue-600/[0.06] to-cyan-500/[0.03] shadow-xl shadow-blue-600/10 lg:-mt-4"
                  : "border-border/60 bg-card hover:border-border"
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      <Star className="h-3 w-3" /> {t('common.popular')}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className="font-heading text-4xl font-extrabold tracking-tight">৳{plan.price}</span>
                  <span className="mb-1.5 text-sm text-muted-foreground line-through">৳{plan.original}</span>
                  <span className="mb-1.5 text-xs font-bold text-emerald-600">৫০% ছাড়</span>
                </div>
                <ul className="mt-6 grid gap-2.5 border-t border-border/60 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://system-toolkit.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-7 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  {t('cta.orderNow')}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust badges */}
        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-card p-5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Shield className="h-4 w-4 text-emerald-500" /> ১০০% নিরাপদ পেমেন্ট
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Zap className="h-4 w-4 text-amber-500" /> ১ ঘন্টায় ডেলিভারি
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Check className="h-4 w-4 text-blue-600" /> ৭ দিনের রিফান্ড
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Globe className="h-4 w-4 text-cyan-500" /> লাইফটাইম আপডেট
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
