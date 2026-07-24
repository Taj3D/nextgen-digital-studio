'use client'

import { Reveal, Eyebrow } from "../reveal"
import { CheckCircle2, AlertCircle, Activity, Server, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useLang } from "../language-provider"

type Service = {
  name: string
  status: 'operational' | 'degraded' | 'maintenance'
  uptime: string
  icon: typeof Server
}

const services: Service[] = [
  { name: 'Website & Landing Pages', status: 'operational', uptime: '99.98%', icon: Server },
  { name: 'AI Chat Agent', status: 'operational', uptime: '99.95%', icon: Zap },
  { name: 'WhatsApp Automation', status: 'operational', uptime: '99.97%', icon: Server },
  { name: 'CRM & Lead Pipeline', status: 'operational', uptime: '99.99%', icon: Activity },
  { name: 'API & Webhooks', status: 'operational', uptime: '99.96%', icon: Server },
  { name: 'Email & Notifications', status: 'operational', uptime: '99.94%', icon: Server },
]

const incidents = [
  {
    date: 'Jan 8, 2025',
    title: 'AI Chat Agent latency spike',
    status: 'resolved',
    desc: 'Brief 3-minute latency increase due to upstream LLM provider maintenance. Resolved automatically.',
  },
  {
    date: 'Dec 22, 2024',
    title: 'Scheduled database maintenance',
    status: 'resolved',
    desc: '15-minute planned maintenance for database optimization. No data loss. Completed ahead of schedule.',
  },
]

const uptimeHistory = Array.from({ length: 30 }, () => 'operational')

export function StatusPage() {
  const allOperational = services.every((s) => s.status === 'operational')
  const { t, tr } = useLang()

  return (
    <section id="status" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('status.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('status.title1')}{" "}
            <span className="text-gradient">{t('status.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('status.subtitle')}
          </p>
        </Reveal>

        {/* Overall status banner */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] px-6 py-5">
            <div className="relative">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {t('status.allOperational')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('status.updatedJustNow')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Uptime bar */}
        <Reveal delay={0.15} className="mt-6">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('status.uptime30day')}</span>
              <span className="text-xs font-bold text-emerald-600">99.96%</span>
            </div>
            <div className="flex gap-0.5">
              {uptimeHistory.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleY: 0.5 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.015 }}
                  className="h-8 flex-1 rounded-sm bg-emerald-500"
                  title={`Day ${i + 1}: Operational`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </Reveal>

        {/* Services list */}
        <Reveal delay={0.2} className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            {services.map((s, i) => (
              <div
                key={s.name}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== services.length - 1 ? 'border-b border-border/40' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{tr(s.name)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{s.uptime} uptime</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600">{t('status.operational')}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Recent incidents */}
        <Reveal delay={0.25} className="mt-8">
          <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold">
            <Clock className="h-5 w-5 text-blue-600" />
            {t('status.recentIncidents')}
          </h3>
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold">{tr(inc.title)}</h4>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                        {inc.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{tr(inc.desc)}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{inc.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {t('status.haveIssue')}{" "}
            <a href="#contact" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
              Contact our team →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
