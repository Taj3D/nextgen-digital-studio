'use client'

import * as React from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import {
  Globe, MessageSquare, Bot, Workflow, Mail, Target,
  PhoneCall, CalendarCheck, TrendingUp, GripVertical, Plus,
  X, Sparkles, ArrowRight, Check, RotateCcw, Play,
} from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type StepType = {
  id: string
  name: string
  desc: string
  icon: typeof Globe
  color: string
}

const STEP_LIBRARY: StepType[] = [
  { id: 'landing', name: 'Landing Page', desc: 'Visitor lands on your optimized page', icon: Globe, color: 'from-blue-600 to-cyan-500' },
  { id: 'chat', name: 'AI Chat Agent', desc: 'AI engages & qualifies the lead', icon: MessageSquare, color: 'from-cyan-500 to-blue-500' },
  { id: 'whatsapp', name: 'WhatsApp Follow-up', desc: 'Instant WhatsApp message sent', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
  { id: 'crm', name: 'CRM Auto-Tag', desc: 'Lead tagged & added to pipeline', icon: Workflow, color: 'from-emerald-500 to-teal-500' },
  { id: 'email', name: 'Email Sequence', desc: '3-day nurture email flow', icon: Mail, color: 'from-violet-500 to-purple-500' },
  { id: 'call', name: 'AI Voice Call', desc: 'AI books a strategy call', icon: PhoneCall, color: 'from-amber-500 to-orange-500' },
  { id: 'meeting', name: 'Booked Meeting', desc: 'Calendar invite sent automatically', icon: CalendarCheck, color: 'from-rose-500 to-pink-500' },
  { id: 'analytics', name: 'Revenue Tracking', desc: 'Conversion tracked in dashboard', icon: TrendingUp, color: 'from-blue-600 to-indigo-500' },
]

const DEFAULT_FLOW = ['landing', 'chat', 'whatsapp', 'crm', 'call', 'meeting']

export function WorkflowBuilder() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [flow, setFlow] = React.useState<string[]>(DEFAULT_FLOW)
  const [showLibrary, setShowLibrary] = React.useState(false)
  const [running, setRunning] = React.useState(false)
  const [activeStep, setActiveStep] = React.useState<number | null>(null)

  const steps = flow.map((id) => STEP_LIBRARY.find((s) => s.id === id)!).filter(Boolean)
  const availableToAdd = STEP_LIBRARY.filter((s) => !flow.includes(s.id))

  function addStep(id: string) {
    setFlow((f) => [...f, id])
    setShowLibrary(false)
  }

  function removeStep(index: number) {
    setFlow((f) => f.filter((_, i) => i !== index))
  }

  function reset() {
    setFlow(DEFAULT_FLOW)
    setActiveStep(null)
  }

  async function runFlow() {
    setRunning(true)
    setActiveStep(null)
    for (let i = 0; i < flow.length; i++) {
      await new Promise((r) => setTimeout(r, 700))
      setActiveStep(i)
    }
    await new Promise((r) => setTimeout(r, 1200))
    setRunning(false)
    setActiveStep(null)
  }

  return (
    <section id="workflow-builder" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('workflow.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('workflow.title1')}{" "}
            <span className="text-gradient">{t('workflow.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('workflow.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          {/* Flow canvas */}
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('workflow.yourFunnel')} · {flow.length} {t('workflow.steps')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={reset}
                    className="flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" /> {t('workflow.reset')}
                  </button>
                  <button
                    onClick={runFlow}
                    disabled={running || flow.length === 0}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                      running
                        ? "bg-amber-500/15 text-amber-600"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/25 hover:scale-105",
                    )}
                  >
                    {running ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-600/40 border-t-amber-600" />
                        {t('workflow.running')}
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 fill-current" /> {t('workflow.runFlow')}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {flow.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 py-16 text-center">
                  <Workflow className="h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t('workflow.emptyFunnel')}
                  </p>
                  <button
                    onClick={() => setShowLibrary(true)}
                    className="mt-3 flex items-center gap-1 rounded-lg bg-blue-600/10 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-600/15"
                  >
                    <Plus className="h-3 w-3" /> {t('workflow.addSteps')}
                  </button>
                </div>
              ) : (
                <Reorder.Group axis="y" values={flow} onReorder={setFlow} className="space-y-2">
                  {steps.map((step, index) => (
                    <Reorder.Item
                      key={step.id}
                      value={step.id}
                      className="list-none"
                    >
                      <motion.div
                        layout
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl border p-3 transition-all",
                          activeStep === index && running
                            ? "border-blue-600/50 bg-blue-600/[0.06] shadow-lg shadow-blue-600/15"
                            : "border-border/60 bg-background hover:border-blue-600/30",
                        )}
                      >
                        {/* Drag handle */}
                        <span className="cursor-grab text-muted-foreground/40 active:cursor-grabbing group-hover:text-muted-foreground">
                          <GripVertical className="h-4 w-4" />
                        </span>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                          <span className="absolute left-7 top-full h-2 w-px bg-border" />
                        )}

                        {/* Icon */}
                        <div className={cn(
                          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md transition-transform",
                          step.color,
                          activeStep === index && running && "scale-110",
                        )}>
                          <step.icon className="h-5 w-5" />
                          {activeStep === index && running && (
                            <span className="absolute inset-0 animate-ping rounded-lg bg-blue-600/40" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground">#{index + 1}</span>
                            <p className="truncate text-sm font-bold">{tr(step.name)}</p>
                            {activeStep === index && running && (
                              <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-600"
                              >
                                <Check className="h-2.5 w-2.5" strokeWidth={3} /> Active
                              </motion.span>
                            )}
                            {activeStep !== null && index < activeStep && running && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-600/70">
                                <Check className="h-2.5 w-2.5" strokeWidth={3} /> Done
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground">{tr(step.desc)}</p>
                        </div>

                        {/* Remove */}
                        <button
                          aria-label={`Remove ${step.name}`}
                          onClick={() => removeStep(index)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/40 opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-500 group-hover:opacity-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}

              {/* Add step button */}
              {availableToAdd.length > 0 && (
                <button
                  onClick={() => setShowLibrary((v) => !v)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border/60 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-blue-600/40 hover:bg-blue-600/[0.03] hover:text-blue-600"
                >
                  <Plus className="h-3.5 w-3.5" /> {t('workflow.addStep')} ({availableToAdd.length} {t('workflow.available')})
                </button>
              )}

              {/* Inline library */}
              <AnimatePresence>
                {showLibrary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-muted/30 p-3 sm:grid-cols-4">
                      {availableToAdd.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => addStep(s.id)}
                          className="flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-background p-2.5 text-center transition-all hover:border-blue-600/40 hover:shadow-md"
                        >
                          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white", s.color)}>
                            <s.icon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] font-semibold leading-tight">{tr(s.name)}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Side panel: stats + CTA */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              {/* Live stats */}
              <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-50/90">
                      {t('workflow.funnelProjection')}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/12 px-3 py-3 backdrop-blur">
                      <p className="font-heading text-2xl font-extrabold">{flow.length}</p>
                      <p className="text-[10px] text-blue-50/80">{t('workflow.automationSteps')}</p>
                    </div>
                    <div className="rounded-xl bg-white/12 px-3 py-3 backdrop-blur">
                      <p className="font-heading text-2xl font-extrabold">24/7</p>
                      <p className="text-[10px] text-blue-50/80">{t('workflow.alwaysRunning')}</p>
                    </div>
                    <div className="rounded-xl bg-white/12 px-3 py-3 backdrop-blur">
                      <p className="font-heading text-2xl font-extrabold">&lt;5s</p>
                      <p className="text-[10px] text-blue-50/80">{t('workflow.leadResponse')}</p>
                    </div>
                    <div className="rounded-xl bg-white/12 px-3 py-3 backdrop-blur">
                      <p className="font-heading text-2xl font-extrabold">{flow.length > 4 ? '3x' : '2x'}</p>
                      <p className="text-[10px] text-blue-50/80">{t('workflow.estConversion')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens */}
              <div className="flex-1 rounded-3xl border border-border/60 bg-card p-6">
                <h3 className="font-heading text-sm font-bold">{t('workflow.howThisWorks')}</h3>
                <div className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                  <p className="flex gap-2"><span className="font-bold text-blue-600">1.</span> {t('workflow.step1')}</p>
                  <p className="flex gap-2"><span className="font-bold text-blue-600">2.</span> {t('workflow.step2')}</p>
                  <p className="flex gap-2"><span className="font-bold text-blue-600">3.</span> {t('workflow.step3')}</p>
                  <p className="flex gap-2"><span className="font-bold text-blue-600">4.</span> {t('workflow.step4')}</p>
                </div>
                <Button
                  onClick={() => openWith(`Custom Workflow: ${steps.map((s) => s.name).join(' → ')}`)}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
                >
                  {t('workflow.buildForMe')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
