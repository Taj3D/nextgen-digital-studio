'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Bot, MessagesSquare, Workflow, Target, Check, ArrowRight } from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    icon: Bot,
    title: "AI Agents that never sleep",
    desc: "Chat & voice agents trained on your business handle enquiries, qualify leads and book calls 24/7 — in Bangla & English.",
  },
  {
    icon: Workflow,
    title: "Automation that runs itself",
    desc: "We connect your tools and automate follow-ups, CRM updates, reminders and operations end-to-end with n8n & Zapier.",
  },
  {
    icon: MessagesSquare,
    title: "Omnichannel customer reach",
    desc: "Website, WhatsApp, SMS, email and voice — all unified into one intelligent system that responds in seconds.",
  },
  {
    icon: Target,
    title: "Lead generation on autopilot",
    desc: "Paid ads, SEO and AI outreach combined into a predictable system that fills your pipeline with qualified leads.",
  },
]

const capabilities = [
  "Instant lead response (under 5 seconds)",
  "Bilingual Bangla & English AI agents",
  "Automated WhatsApp & SMS follow-up",
  "CRM pipeline automation & tagging",
  "AI voice agents for calls",
  "Full sales funnels that convert",
  "Performance marketing with clear ROI",
  "Business automation that saves 40+ hrs/week",
]

export function Solution() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="solution" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('solution.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('solution.title1')}{" "}
            <span className="text-gradient">{t('solution.title2')}</span> {t('solution.title3')}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('solution.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 card-hover hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-600/5">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-600/10 to-cyan-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-110">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{tr(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr(p.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.04] to-cyan-500/[0.04] p-8 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  {tr('Everything you need to automate growth — in one place')}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {tr('No juggling multiple vendors or tools. We deliver a complete, integrated system tailored to your business goals.')}
                </p>
                <Button
                  onClick={() => openWith()}
                  className="mt-6 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-semibold shadow-lg shadow-blue-600/25"
                >
                  Get my custom roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-2.5 rounded-xl bg-background/60 px-3.5 py-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-foreground">{tr(c)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
