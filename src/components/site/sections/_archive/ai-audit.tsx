'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Sparkles,
  Gauge,
  TrendingUp,
  AlertTriangle,
  Target,
} from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Question = {
  id: string
  question: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  {
    id: "response",
    question: "How fast does your business respond to new leads?",
    options: [
      { label: "Within 5 minutes", score: 25 },
      { label: "Within 1 hour", score: 15 },
      { label: "Same day", score: 8 },
      { label: "Next day or later", score: 0 },
    ],
  },
  {
    id: "automation",
    question: "How much of your sales process is automated?",
    options: [
      { label: "Almost everything is automated", score: 25 },
      { label: "Some follow-ups are automated", score: 15 },
      { label: "Very little — mostly manual", score: 5 },
      { label: "Nothing is automated", score: 0 },
    ],
  },
  {
    id: "channels",
    question: "Which channels do you actively use for customer communication?",
    options: [
      { label: "Website + WhatsApp + Email + Phone", score: 25 },
      { label: "3 of the above", score: 15 },
      { label: "2 of the above", score: 8 },
      { label: "Only phone / in-person", score: 0 },
    ],
  },
  {
    id: "crm",
    question: "How do you track leads and customers?",
    options: [
      { label: "Proper CRM (HubSpot, GHL, etc.)", score: 25 },
      { label: "Spreadsheets / basic tools", score: 12 },
      { label: "Notebook / memory", score: 4 },
      { label: "We don't, honestly", score: 0 },
    ],
  },
]

const industries = [
  "Real Estate", "E-commerce", "Hospital/Clinic", "School/Education",
  "Corporate", "Agency", "Small Business", "Other",
]

export function AiAudit() {
  const [step, setStep] = React.useState(0) // 0=intro, 1-4=questions, 5=results, 6=form
  const [answers, setAnswers] = React.useState<Record<string, number>>({})
  const [score, setScore] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [industry, setIndustry] = React.useState("")
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  const totalSteps = questions.length

  function answer(qId: string, value: number) {
    const next = { ...answers, [qId]: value }
    setAnswers(next)
    // Calculate score from the updated answers (including this answer)
    const total = Object.values(next).reduce((a, b) => a + b, 0)
    setTimeout(() => {
      if (step === totalSteps) {
        // Last question answered — go to results
        setScore(total)
        setStep(totalSteps + 1)
      } else {
        setStep((s) => s + 1)
      }
    }, 250)
  }

  async function submitReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      industry,
      score,
      responses: Object.entries(answers).map(([k, v]) => `${k}=${v}`),
    }
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("failed")
      setDone(true)
      toast.success("Audit report sent!", { description: "Check your inbox for the full breakdown." })
    } catch {
      toast.error("Could not submit", { description: "Please try again or book a call." })
    } finally {
      setSubmitting(false)
    }
  }

  const scoreLabel =
    score >= 80 ? "Excellent" : score >= 50 ? "Good, but leaving money on the table" : score >= 25 ? "Needs serious attention" : "Critical — you're losing leads daily"
  const scoreColor = score >= 80 ? "emerald" : score >= 50 ? "amber" : "rose"

  const opportunities = [
    { show: answers.response !== undefined && answers.response < 15, icon: TrendingUp, text: "Automate instant lead response — recover up to 78% of lost leads." },
    { show: answers.automation !== undefined && answers.automation < 15, icon: Sparkles, text: "Deploy AI follow-up sequences to nurture leads 24/7." },
    { show: answers.channels !== undefined && answers.channels < 15, icon: Target, text: "Add WhatsApp automation — Bangladesh's #1 messaging channel." },
    { show: answers.crm !== undefined && answers.crm < 15, icon: AlertTriangle, text: "Centralize leads in a CRM with auto-tagging & pipeline tracking." },
  ].filter((o) => o.show)

  return (
    <section id="ai-audit" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('audit.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('audit.title1')}{" "}
            <span className="text-gradient">{t('audit.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('audit.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
            {/* Progress bar */}
            {step > 0 && step <= totalSteps && (
              <div className="h-1.5 w-full bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {/* Intro */}
                {step === 0 && (
                  <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-blue-600/25">
                      <Gauge className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold sm:text-3xl">{t('audit.getScore')}</h3>
                    <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                      {t('audit.takesSeconds')}
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> {t('audit.4questions')}</span>
                      <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> {t('audit.instantScore')}</span>
                      <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> {t('audit.freeReport')}</span>
                    </div>
                    <Button
                      onClick={() => setStep(1)}
                      size="lg"
                      className="mt-8 h-13 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 font-semibold shadow-lg shadow-blue-600/25"
                    >
                      {t('audit.startFreeAudit')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Questions */}
                {step >= 1 && step <= totalSteps && (
                  <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Question {step} of {totalSteps}
                      </span>
                      {step > 1 && (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          <ArrowLeft className="h-3 w-3" /> Back
                        </button>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-bold sm:text-2xl">{tr(questions[step - 1].question)}</h3>
                    <div className="mt-6 grid gap-3">
                      {questions[step - 1].options.map((opt, i) => (
                        <button
                          key={opt.label}
                          onClick={() => answer(questions[step - 1].id, opt.score)}
                          className="group flex items-center justify-between rounded-xl border border-border/60 bg-background px-5 py-4 text-left transition-all hover:border-blue-600/40 hover:bg-blue-600/[0.03] hover:shadow-md"
                        >
                          <span className="flex items-center gap-3 text-sm font-medium text-foreground sm:text-base">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-xs font-bold text-muted-foreground transition-colors group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                              {String.fromCharCode(65 + i)}
                            </span>
                            {tr(opt.label)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {step === totalSteps + 1 && (
                  <motion.div key="results" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('audit.yourScore')}</p>
                    <div className="my-4 flex items-center justify-center">
                      <div className="relative flex h-40 w-40 items-center justify-center">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.92 0 0)" strokeWidth="10" />
                          <motion.circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round"
                            initial={{ strokeDashoffset: 327 }}
                            animate={{ strokeDashoffset: 327 - (327 * score) / 100 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#2563EB" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="font-heading text-4xl font-extrabold text-gradient">{score}</span>
                          <span className="text-xs text-muted-foreground">/ 100</span>
                        </div>
                      </div>
                    </div>
                    <p className={cn("font-heading text-lg font-bold", scoreColor === "emerald" && "text-emerald-600", scoreColor === "amber" && "text-amber-600", scoreColor === "rose" && "text-rose-500")}>
                      {scoreLabel}
                    </p>

                    {opportunities.length > 0 && (
                      <div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-5 text-left">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('audit.opportunities')}</p>
                        <div className="grid gap-2.5">
                          {opportunities.map((o, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/15 text-blue-600">
                                <o.icon className="h-3 w-3" />
                              </span>
                              <span className="text-foreground/90">{o.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Button
                        onClick={() => setStep(totalSteps + 2)}
                        className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-semibold shadow-lg shadow-blue-600/25"
                      >
                        {t('audit.getFullReport')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => openWith("AI Audit → Strategy Call")}
                        className="h-12 rounded-xl"
                      >
                        {t('audit.bookCallInstead')}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Lead capture form */}
                {step === totalSteps + 2 && !done && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 className="font-heading text-xl font-bold sm:text-2xl">{t('audit.getReport')}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t('audit.emailReport')}
                    </p>
                    <form onSubmit={submitReport} className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="a-name">{t('audit.fullName')} *</Label>
                        <Input id="a-name" name="name" required placeholder="Your name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="a-phone">{t('audit.phone')} *</Label>
                        <Input id="a-phone" name="phone" required placeholder="+880 1XXX-XXXXXX" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="a-email">{t('audit.email')} *</Label>
                        <Input id="a-email" name="email" type="email" required placeholder="you@company.com" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="a-company">{t('audit.company')}</Label>
                        <Input id="a-company" name="company" placeholder="Company name" />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label>{t('audit.yourIndustry')}</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {industries.map((ind) => (
                            <button
                              key={ind}
                              type="button"
                              onClick={() => setIndustry(ind)}
                              className={cn(
                                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                                industry === ind
                                  ? "border-blue-600 bg-blue-600/10 text-blue-600"
                                  : "border-border/60 text-muted-foreground hover:border-blue-600/40",
                              )}
                            >
                              {tr(ind)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
                        >
                          {submitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating report...</>
                          ) : (
                            <>{t('audit.emailMeReport')} <ArrowRight className="ml-2 h-4 w-4" /></>
                          )}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Done */}
                {done && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold">{t('audit.reportOnItsWay')}</h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                      {t('audit.checkInbox')} {t('audit.fastTrack')} Book a free strategy call and we&apos;ll walk you through it personally.
                    </p>
                    <Button
                      onClick={() => openWith("Post-audit strategy call")}
                      className="mt-5 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-semibold shadow-lg shadow-blue-600/25"
                    >
                      {t('audit.bookStrategyCall')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
