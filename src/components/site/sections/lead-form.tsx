'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Sparkles,
  Star,
  Users,
  ShieldCheck,
  Check,
  Quote,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Clock,
} from 'lucide-react'
import { Reveal, SectionShell } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { waLink } from '@/lib/whatsapp'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type LeadValues = {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  message?: string
  website?: string // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+?880|0)?1[3-9]\d{8}$/

// Service ecosystem — canonical English values are submitted to /api/contact
// so lead qualification stays language-agnostic. Display is localized via t(key).
// ERMOS v5.5.5: grouped selector reflecting approved Consulting/Training/Digital structure.
type ServiceOption = { value: string; key: string }
type ServiceGroupDef = {
  id: 'consulting' | 'training' | 'digital'
  labelKey: string
  descKey: string
  options: ServiceOption[]
}

const NOT_SURE: ServiceOption = { value: 'Not sure yet', key: 'svc.notSure' }

const SERVICE_GROUPS: ServiceGroupDef[] = [
  {
    id: 'consulting',
    labelKey: 'svcGroup.consulting.label',
    descKey: 'svcGroup.consulting.desc',
    options: [
      { value: 'Business Consulting', key: 'svc.businessConsulting' },
      { value: 'Business Strategy & Growth', key: 'svc.businessStrategy' },
      { value: 'Customer Acquisition & Lead Generation', key: 'svc.customerAcquisition' },
      { value: 'Sales & Conversion', key: 'svc.salesConversion' },
      { value: 'Marketing Strategy', key: 'svc.marketingStrategy' },
      { value: 'Offer Development', key: 'svc.offerDevelopment' },
      { value: 'Positioning', key: 'svc.positioning' },
      { value: 'Personal Branding', key: 'svc.personalBranding' },
      { value: 'Freelancer Growth & Client Acquisition', key: 'svc.freelancerGrowth' },
      { value: 'AI & Digital Strategy', key: 'svc.aiDigitalStrategy' },
      { value: 'Productivity & Execution', key: 'svc.productivityExecution' },
      { value: 'System & Process Thinking', key: 'svc.systemProcess' },
    ],
  },
  {
    id: 'training',
    labelKey: 'svcGroup.training.label',
    descKey: 'svcGroup.training.desc',
    options: [
      { value: 'AI & Digital Skills Training', key: 'svc.aiDigitalSkillsTraining' },
      { value: 'CNC Design Training', key: 'svc.cncDesignTraining' },
      { value: 'Web Development Training', key: 'svc.webDevTraining' },
      { value: 'Digital Marketing Training', key: 'svc.digitalMarketingTraining' },
      { value: 'Free English Speaking Initiative', key: 'svc.freeEnglishInitiative' },
    ],
  },
  {
    id: 'digital',
    labelKey: 'svcGroup.digital.label',
    descKey: 'svcGroup.digital.desc',
    options: [
      { value: 'Website & Web Development', key: 'svc.websiteWebDev' },
      { value: 'Landing Page Development', key: 'svc.landingPage' },
      { value: 'Custom Software / Web Application', key: 'svc.customSoftware' },
      { value: 'AI Chatbot & AI Automation', key: 'svc.aiChatbotAutomation' },
      { value: 'WhatsApp Automation', key: 'svc.whatsappAutomation' },
      { value: 'AI Voice Agent', key: 'svc.aiVoiceAgent' },
      { value: 'CRM Automation', key: 'svc.crmAutomation' },
      { value: 'Lead Generation', key: 'svc.leadGeneration' },
      { value: 'Performance Marketing', key: 'svc.performanceMarketing' },
      { value: 'Sales Funnel Development', key: 'svc.salesFunnel' },
      { value: '3D Portrait & Creative Design', key: 'svc.threeDPortrait' },
      { value: 'CNC Design & Digital Products', key: 'svc.cncDigitalProducts' },
    ],
  },
]

// Resolve the group description for a selected service value (for the dynamic helper line)
function descKeyForValue(value: string | undefined): string | null {
  if (!value) return null
  if (value === NOT_SURE.value) return null
  for (const g of SERVICE_GROUPS) {
    if (g.options.some((o) => o.value === value)) return g.descKey
  }
  return null
}

const TRUST_BADGES = [
  { icon: Star, key: 'form.trust1' },
  { icon: Users, key: 'form.trust2' },
  { icon: ShieldCheck, key: 'form.trust3' },
] as const

const BENEFITS = ['form.benefit1', 'form.benefit2', 'form.benefit3'] as const

export function LeadForm() {
  const { t, lang } = useLang()
  const [state, setState] = React.useState<FormState>('idle')

  // UTM capture on mount
  const utmRef = React.useRef({ utmSource: '', utmMedium: '', utmCampaign: '' })
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    utmRef.current = {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    }
  }, [])

  // Zod schema (rebuilt on lang change for localized messages)
  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('form.errName')),
        email: z.string().regex(EMAIL_RE, t('form.errEmail')),
        phone: z.string().regex(PHONE_RE, t('form.errPhone')),
        company: z.string().optional(),
        service: z.string().min(1, t('form.errService')),
        message: z.string().optional(),
        website: z.string().optional(), // honeypot
      }),
    [t],
  )

  const form = useForm<LeadValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      website: '',
    },
  })

  const onSubmit = async (values: LeadValues) => {
    // Honeypot — bot bait: silently show success without hitting the API
    if (values.website && values.website.trim() !== '') {
      setState('success')
      toast.success(t('toast.successTitle'), { description: t('toast.successDesc') })
      return
    }

    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          service: values.service,
          message: values.message,
          source: 'homepage_lead_form',
          ...utmRef.current,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setState('success')
      toast.success(t('toast.successTitle'), { description: t('toast.successDesc') })
    } catch (err) {
      setState('error')
      toast.error(t('toast.errorTitle'), { description: t('toast.errorDesc') })
    }
  }

  const resetAll = () => {
    form.reset()
    setState('idle')
  }

  const inputCls = 'h-12'
  const required = (
    <span className="ml-1 text-xs font-normal text-muted-foreground">
      {t('form.required')}
    </span>
  )
  const optional = (
    <span className="ml-1 text-xs font-normal text-muted-foreground">
      {t('form.optional')}
    </span>
  )

  return (
    <SectionShell id="lead-form" className="relative">
      {/* Soft brand glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 gradient-brand-soft opacity-20"
        aria-hidden
      />

      <div className="relative grid gap-10 lg:gap-12 lg:grid-cols-[40fr_60fr]">
        {/* LEFT — sales copy */}
        <Reveal>
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>{t('form.eyebrow')}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {t('form.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('form.subtitle')}
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3">
              {TRUST_BADGES.map((b, i) => {
                const Icon = b.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{t(b.key)}</span>
                  </div>
                )
              })}
            </div>

            {/* What you get */}
            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {t('form.whatYouGet')}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {BENEFITS.map((key, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/90"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini testimonial */}
            <div className="relative rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <Quote
                className="absolute -top-2 -left-2 h-6 w-6 text-emerald-500/60"
                aria-hidden
              />
              <p className="pl-4 text-sm italic text-foreground/90 leading-relaxed">
                {t('form.honestNote')}
              </p>
              <p className="mt-2 pl-4 text-xs font-semibold text-emerald-500">
                {t('form.honestAuthor')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — form card */}
        <Reveal delay={0.1}>
          <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm p-0 shadow-glow">
            {/* Top accent strip */}
            <div className="h-1.5 w-full gradient-brand rounded-t-2xl" />

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* IDLE / SUBMITTING — the form */}
                {(state === 'idle' || state === 'submitting') && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onInput={(e) => {
                          // Sync native input values to react-hook-form on input
                          const formEl = e.currentTarget
                          const fd = new FormData(formEl)
                          ;['name', 'email', 'phone', 'company', 'message'].forEach((key) => {
                            const val = fd.get(key)
                            if (val !== undefined && val !== null) {
                              form.setValue(key as keyof LeadValues, String(val), { shouldValidate: false })
                            }
                          })
                        }}
                        className="flex flex-col gap-5"
                        noValidate
                      >
                        {/* Honeypot — visually hidden, never visible to humans */}
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden
                          className="absolute -left-[9999px] top-auto h-0 w-0 opacity-0"
                          {...form.register('website')}
                        />

                        {/* Name */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t('form.nameLabel')}
                                {required}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputCls}
                                  placeholder={t('form.namePlaceholder')}
                                  autoComplete="name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email + Phone (2-col on sm) */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {t('form.emailLabel')}
                                  {required}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    className={inputCls}
                                    placeholder={t('form.emailPlaceholder')}
                                    autoComplete="email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {t('form.phoneLabel')}
                                  {required}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    className={inputCls}
                                    placeholder={t('form.phonePlaceholder')}
                                    autoComplete="tel"
                                    inputMode="numeric"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Company (optional) */}
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t('form.companyLabel')}
                                {optional}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputCls}
                                  placeholder={t('form.companyPlaceholder')}
                                  autoComplete="organization"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Service select — grouped ecosystem (ERMOS v5.5.5) */}
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => {
                            const helpKey = descKeyForValue(field.value)
                            return (
                              <FormItem>
                                <FormLabel>
                                  {t('form.serviceLabel')}
                                  {required}
                                </FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 w-full">
                                      <SelectValue
                                        placeholder={t('form.servicePlaceholder')}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent
                                    className="max-h-[min(70vh,24rem)]"
                                    style={{
                                      width: 'var(--radix-select-trigger-width)',
                                      maxWidth: 'calc(100vw - 1.5rem)',
                                    }}
                                  >
                                    {/* Not sure yet — top-level fallback */}
                                    <SelectItem value={NOT_SURE.value}>
                                      {t(NOT_SURE.key)}
                                    </SelectItem>
                                    <SelectSeparator />
                                    {SERVICE_GROUPS.map((group, gi) => (
                                      <React.Fragment key={group.id}>
                                        {gi > 0 && <SelectSeparator />}
                                        <SelectGroup>
                                          <SelectLabel className="font-semibold uppercase tracking-wide text-foreground/80">
                                            {t(group.labelKey)}
                                          </SelectLabel>
                                          <p className="px-2 pb-1.5 text-[11px] leading-snug text-muted-foreground">
                                            {t(group.descKey)}
                                          </p>
                                          {group.options.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                              {t(opt.key)}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </React.Fragment>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {/* Helper line — static + dynamic group description */}
                                <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                                  <span className="leading-snug">
                                    {helpKey ? t(helpKey) : t('form.serviceHelp')}
                                  </span>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />

                        {/* Message (optional) */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t('form.messageLabel')}
                                {optional}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  className="min-h-24"
                                  placeholder={t('form.messagePlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={state === 'submitting'}
                          className="gradient-brand animate-pulse-glow h-14 w-full text-base text-white hover:opacity-95"
                        >
                          {state === 'submitting' ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              {t('form.submitting')}
                            </>
                          ) : (
                            <>
                              {t('form.submit')}
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </Button>

                        {/* Small print */}
                        <div className="flex flex-col gap-2 pt-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{t('form.privacy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{t('form.whatsappReply')}</span>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {state === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    >
                      <CheckCircle2 className="h-20 w-20 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                    </motion.div>
                    <h3 className="mt-5 text-2xl font-bold text-foreground">
                      {t('form.successTitle')}
                    </h3>
                    <p className="mt-2 text-muted-foreground max-w-md leading-relaxed">
                      {t('form.successDesc')}
                    </p>
                    <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Button
                        onClick={resetAll}
                        variant="outline"
                        className="h-12 px-6 border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                      >
                        {t('form.successAnother')}
                      </Button>
                      <Button
                        asChild
                        className="gradient-brand h-12 px-6 text-white hover:opacity-95"
                      >
                        <a
                          href={waLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-5 w-5" />
                          {t('form.successWhatsapp')}
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ERROR */}
                {state === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      <AlertCircle className="h-20 w-20 text-red-500" />
                    </motion.div>
                    <h3 className="mt-5 text-2xl font-bold text-foreground">
                      {t('form.errorTitle')}
                    </h3>
                    <p className="mt-2 text-muted-foreground max-w-md leading-relaxed">
                      {t('form.errorDesc')}
                    </p>
                    <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Button
                        onClick={() => setState('idle')}
                        className="gradient-brand h-12 px-6 text-white hover:opacity-95"
                      >
                        {t('form.errorRetry')}
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-12 px-6 border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                      >
                        <a
                          href={waLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-5 w-5 text-emerald-500" />
                          {t('form.successWhatsapp')}
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default LeadForm
