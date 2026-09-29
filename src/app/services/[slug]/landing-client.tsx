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
import { services } from '@/lib/site-data'
import { Check, ArrowRight, Sparkles, Zap, ShieldCheck, Clock } from 'lucide-react'

type LandingClientProps = {
  slug: string
  title: string
  short: string
  description: string
  features: string[]
  gradient: string
}

export function LandingClient({ slug, title, short, description, features, gradient }: LandingClientProps) {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  // Look up the icon on the client (Lucide icons are functions and can't be
  // serialised across the Server→Client boundary).
  const service = services.find((s) => s.slug === slug)
  const Icon = service?.icon ?? Sparkles
  usePageViewTracking('service_detail_page', { slug })

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
            <div>
              <LandingEyebrow>
                <Sparkles className="h-3 w-3" /> {isBn ? 'NextGen সেবা' : 'NextGen Service'}
              </LandingEyebrow>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {description}
              </p>

              <ul className="mt-6 grid gap-2 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <WhatsAppCTA isBn={isBn} />
                <LandingSocials />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-border/60 bg-card p-8 shadow-2xl">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold">
                  {isBn ? 'এই সেবায় যা পাবেন' : 'What this service includes'}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{short}</p>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted/60 p-3">
                    <Zap className="mx-auto h-5 w-5 text-blue-600" />
                    <div className="mt-1 text-xs font-semibold">
                      {isBn ? 'দ্রুত সেটআপ' : 'Fast setup'}
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-3">
                    <ShieldCheck className="mx-auto h-5 w-5 text-cyan-600" />
                    <div className="mt-1 text-xs font-semibold">
                      {isBn ? '১০০% গ্যারান্টি' : '100% guarantee'}
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-3">
                    <Clock className="mx-auto h-5 w-5 text-violet-600" />
                    <div className="mt-1 text-xs font-semibold">
                      {isBn ? '২৪/৭ সাপোর্ট' : '24/7 support'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'সুবিধা' : 'Benefits'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? `${title} কেন বেছে নেবেন` : `Why choose ${title}`}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {features.map((f, i) => (
                <div key={f} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading font-bold">{f}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isBn
                      ? `${f}-এ আমরা প্রফেশনাল মানের সমাধান দিই যা আপনার ব্যবসার ফলাফল বাড়ায়।`
                      : `We deliver professional-grade ${f.toLowerCase()} solutions that drive measurable business results.`}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-blue-600">
                    #{i + 1}{' '}
                    <span className="text-muted-foreground">
                      {isBn ? 'প্রায়োরিটি' : 'priority'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center text-white shadow-xl sm:p-12">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'প্রস্তুত শুরু করতে?' : 'Ready to get started?'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-blue-50">
              {isBn
                ? `${title} সেবা নিয়ে আপনার ব্যবসার জন্য একটি কাস্টম AI রোডম্যাপ পান। ৩০ মিনিট ফ্রি কথা বলুন।`
                : `Get a custom AI roadmap for your business with ${title}. 30-minute free call.`}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/8801711731354?text=${encodeURIComponent(
                  isBn
                    ? `আসসালামু আলাইকুম, আমি ${title} সেবা সম্পর্কে জানতে চাই।`
                    : `Hi, I'd like to know more about ${title}.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:scale-[1.02]"
              >
                {isBn ? 'এখনই চ্যাট করুন' : 'Chat Now'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Lead form */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'অনুরোধ করুন' : 'Request a Call'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? `${title} এর জন্য যোগাযোগ করুন` : `Get ${title}`}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'নিচের ফর্ম পূরণ করুন, আমরা ২ ঘন্টার মধ্যে যোগাযোগ করব।'
                  : 'Fill the form below. We will reach out within 2 hours.'}
              </p>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source={`service_${slug}`}
                serviceName={title}
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
