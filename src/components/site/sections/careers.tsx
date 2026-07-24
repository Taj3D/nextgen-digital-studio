'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  MapPin, Briefcase, Clock, X, Send, Loader2, CheckCircle2,
  Heart, Zap, Users, TrendingUp,
} from "lucide-react"
import { jobOpenings, type JobOpening } from "@/lib/site-data"
import { useLang } from "../language-provider"
import { toast } from "sonner"

const perks = [
  { icon: Zap, title: 'Cutting-edge AI', desc: 'Work with GPT-4, voice agents & automation daily' },
  { icon: TrendingUp, title: 'Fast growth', desc: 'We are scaling fast — grow your career with us' },
  { icon: Heart, title: 'Real impact', desc: 'Your work directly grows 120+ Bangladeshi businesses' },
  { icon: Users, title: 'Great team', desc: 'Small, sharp, no-ego team that ships fast' },
]

export function Careers() {
  const [active, setActive] = React.useState<JobOpening | null>(null)
  const { t, tr } = useLang()

  return (
    <section id="careers" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('careers.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('careers.title1')}{" "}
            <span className="text-gradient">{t('careers.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('careers.subtitle')}
          </p>
        </Reveal>

        {/* Perks */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 text-center card-hover hover:border-blue-600/30">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg transition-transform group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold">{tr(p.title)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{tr(p.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Job openings */}
        <Reveal delay={0.1} className="mt-14">
          <h3 className="mb-6 text-center font-heading text-xl font-bold sm:text-2xl">{t('careers.openPositions')}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobOpenings.map((job, i) => (
              <Reveal key={job.id} delay={(i % 3) * 0.06}>
                <button
                  onClick={() => setActive(job)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-border/60 bg-card p-5 text-left card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl transition-all group-hover:bg-blue-600 group-hover:scale-110">
                      {job.emoji}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                      {job.type}
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-bold leading-tight group-hover:text-blue-600">{tr(job.title)}</h4>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{tr(job.desc)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            {t('careers.dontSeeRole')}{" "}
            <button
              onClick={() => setActive({ id: 'general', title: 'General Application', department: 'General', type: 'Any', location: 'Any', desc: 'Tell us how you can contribute.', emoji: '✨' })}
              className="font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              {t('careers.sendGeneral')} →
            </button>
          </p>
        </Reveal>
      </div>

      {/* Application modal */}
      <AnimatePresence>
        {active && <ApplicationModal job={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ApplicationModal({ job, onClose }: { job: JobOpening; onClose: () => void }) {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const { tr } = useLang()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          role: job.title,
          portfolio: fd.get("portfolio"),
          message: fd.get("message"),
        }),
      })
      if (!res.ok) throw new Error("failed")
      setDone(true)
      toast.success("Application sent!", { description: "We will be in touch within 5 business days." })
    } catch {
      toast.error("Could not submit", { description: "Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto scroll-area rounded-3xl border border-border/60 bg-card shadow-2xl"
      >
        <div className="relative h-24 bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-card bg-white text-3xl shadow-lg">
            {job.emoji}
          </div>
        </div>
        <div className="p-6 pt-8">
          {done ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" strokeWidth={3} />
              </div>
              <h3 className="font-heading text-xl font-bold">Application sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for applying for <span className="font-semibold text-foreground">{job.title}</span>. We will review and get back within 5 business days.
              </p>
              <Button onClick={onClose} className="mt-5 w-full rounded-xl">Done</Button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">{job.department}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {job.type}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {job.location}</span>
              </div>
              <h3 className="mt-2 font-heading text-xl font-bold">{tr(job.title)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tr(job.desc)}</p>

              <form onSubmit={onSubmit} className="mt-5 grid gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name">Full name *</Label>
                  <Input id="c-name" name="name" required placeholder="Your name" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="c-email">Email *</Label>
                    <Input id="c-email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-phone">Phone</Label>
                    <Input id="c-phone" name="phone" placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-portfolio">Portfolio / LinkedIn / GitHub</Label>
                  <Input id="c-portfolio" name="portfolio" placeholder="https://..." />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-message">Why are you a great fit? *</Label>
                  <Textarea id="c-message" name="message" required rows={3} placeholder="Tell us about your experience and why you want to join NextGen..." />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Submit application</>
                  )}
                </Button>
                <p className="text-center text-[10px] text-muted-foreground">
                  We review every application personally. No AI screening.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
