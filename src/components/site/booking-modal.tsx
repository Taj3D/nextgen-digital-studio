'use client'

/**
 * BookingModal — accessible strategy-call booking dialog.
 *
 * Wired to /api/book-call (POST). Form is validated client-side with zod +
 * react-hook-form (same pattern as src/components/site/sections/lead-form.tsx).
 *
 * Props:
 *   - open, onOpenChange         → controlled open state (driven by
 *                                  BookingModalContext so any component can
 *                                  trigger the modal).
 *   - prefillService (optional)  → service slug to pre-select in the dropdown.
 *   - source (optional)          → lead-source tag passed to the API (defaults
 *                                  to "booking_modal").
 *
 * Accessibility:
 *   - Built on Radix Dialog → handles Escape-to-close, focus trap, scroll
 *     lock, and aria-labelledby/aria-describedby out of the box.
 *   - All inputs have associated <Label> elements (via FormField/FormLabel).
 *   - The success state's checkmark icon is decorative (aria-hidden); the
 *     confirmation message is rendered as a real heading.
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  CalendarClock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { normalizePhone } from '@/lib/phone'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type BookingValues = {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  preferredDate?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Strict BD phone validation per task spec (also accepts Bengali digits).
// Bengali digits are normalised to ASCII via normalizePhone() before submit.
const PHONE_RE = /^(\+?880|0)?1[3-9][0-9০-৯]{8}$/

// All 12 services from src/lib/site-data.ts (slugs) with bilingual labels
// via the t() system. Keys: bookingModal.service.<slug>
const SERVICE_SLUGS = [
  'ai-sales-automation',
  'ai-chat-agent',
  'ai-voice-agent',
  'crm-automation',
  'whatsapp-automation',
  'lead-generation',
  'performance-marketing',
  'sales-funnel-development',
  'business-automation',
  'website-development',
  'landing-page-design',
  'ai-consultation',
] as const

type BookingModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefillService?: string
  source?: string
}

export function BookingModal({
  open,
  onOpenChange,
  prefillService,
  source = 'booking_modal',
}: BookingModalProps) {
  const { t } = useLang()
  const [state, setState] = React.useState<FormState>('idle')

  // Zod schema (rebuilt when lang changes so validation messages localize)
  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('bookingModal.errName')),
        email: z.string().regex(EMAIL_RE, t('bookingModal.errEmail')),
        phone: z.string().regex(PHONE_RE, t('bookingModal.errPhone')),
        company: z.string().optional(),
        service: z.string().optional(),
        preferredDate: z.string().optional(),
        message: z.string().optional(),
      }),
    [t],
  )

  const form = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: prefillService ?? '',
      preferredDate: '',
      message: '',
    },
  })

  // Sync prefillService when the modal opens with a new prefill (e.g. user
  // clicks "Book WhatsApp Automation call" on a service landing page).
  React.useEffect(() => {
    if (open && prefillService) {
      form.setValue('service', prefillService, { shouldValidate: false })
    }
  }, [open, prefillService, form])

  // Reset to form state whenever the dialog closes so a re-open feels fresh.
  React.useEffect(() => {
    if (!open) {
      // Small delay so the closing animation isn't interrupted by the form swap
      const id = window.setTimeout(() => {
        setState('idle')
        form.reset()
      }, 250)
      return () => window.clearTimeout(id)
    }
  }, [open, form])

  const onSubmit = async (values: BookingValues) => {
    setState('submitting')
    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: normalizePhone(values.phone),
          company: values.company || undefined,
          service: values.service || undefined,
          date: values.preferredDate || undefined, // API maps b.date → preferredDate
          message: values.message || undefined,
          source,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setState('success')
      toast.success(t('bookingModal.toastSuccessTitle'), {
        description: t('bookingModal.toastSuccessDesc'),
      })
    } catch (err) {
      setState('error')
      toast.error(t('bookingModal.toastErrorTitle'), {
        description: t('bookingModal.toastErrorDesc'),
      })
    }
  }

  const resetForm = () => {
    form.reset()
    setState('idle')
  }

  const inputCls = 'h-11'
  const required = (
    <span className="ml-0.5 text-red-500" aria-hidden>
      *
    </span>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[92vh] overflow-y-auto border-border/60 bg-background p-0 sm:max-w-[480px]"
        aria-describedby="booking-modal-desc"
      >
        {/* Brand accent strip */}
        <div className="gradient-brand h-1.5 w-full rounded-t-lg" aria-hidden />

        <DialogHeader className="px-6 pt-5 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <CalendarClock className="h-5 w-5 text-emerald-500" aria-hidden />
            {t('bookingModal.title')}
          </DialogTitle>
          <DialogDescription id="booking-modal-desc">
            {t('bookingModal.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {/* === FORM === */}
            {(state === 'idle' || state === 'submitting') && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bk-name" className="text-sm font-medium">
                      {t('bookingModal.nameLabel')}
                      {required}
                    </Label>
                    <Input
                      id="bk-name"
                      className={inputCls}
                      placeholder={t('bookingModal.namePlaceholder')}
                      autoComplete="name"
                      aria-invalid={!!form.formState.errors.name}
                      {...form.register('name')}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-red-500" role="alert">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone (2-col on sm) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bk-email" className="text-sm font-medium">
                        {t('bookingModal.emailLabel')}
                        {required}
                      </Label>
                      <Input
                        id="bk-email"
                        type="email"
                        className={inputCls}
                        placeholder={t('bookingModal.emailPlaceholder')}
                        autoComplete="email"
                        aria-invalid={!!form.formState.errors.email}
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-red-500" role="alert">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bk-phone" className="text-sm font-medium">
                        {t('bookingModal.phoneLabel')}
                        {required}
                      </Label>
                      <Input
                        id="bk-phone"
                        type="tel"
                        className={inputCls}
                        placeholder={t('bookingModal.phonePlaceholder')}
                        autoComplete="tel"
                        inputMode="numeric"
                        aria-invalid={!!form.formState.errors.phone}
                        {...form.register('phone')}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-xs text-red-500" role="alert">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company (optional) */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bk-company" className="text-sm font-medium">
                      {t('bookingModal.companyLabel')}{' '}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({t('bookingModal.optional')})
                      </span>
                    </Label>
                    <Input
                      id="bk-company"
                      className={inputCls}
                      placeholder={t('bookingModal.companyPlaceholder')}
                      autoComplete="organization"
                      {...form.register('company')}
                    />
                  </div>

                  {/* Service select + Preferred date (2-col on sm) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bk-service" className="text-sm font-medium">
                        {t('bookingModal.serviceLabel')}{' '}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({t('bookingModal.optional')})
                        </span>
                      </Label>
                      <Select
                        value={form.watch('service')}
                        onValueChange={(v) => form.setValue('service', v, { shouldValidate: false })}
                      >
                        <SelectTrigger id="bk-service" className={`h-11 w-full ${inputCls}`}>
                          <SelectValue placeholder={t('bookingModal.servicePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {SERVICE_SLUGS.map((slug) => (
                            <SelectItem key={slug} value={slug}>
                              {t(`bookingModal.service.${slug}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bk-date" className="text-sm font-medium">
                        {t('bookingModal.dateLabel')}{' '}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({t('bookingModal.optional')})
                        </span>
                      </Label>
                      <Input
                        id="bk-date"
                        type="date"
                        className={inputCls}
                        aria-label={t('bookingModal.dateLabel')}
                        {...form.register('preferredDate')}
                      />
                    </div>
                  </div>

                  {/* Message (optional) */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bk-msg" className="text-sm font-medium">
                      {t('bookingModal.messageLabel')}{' '}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({t('bookingModal.optional')})
                      </span>
                    </Label>
                    <Textarea
                      id="bk-msg"
                      className="min-h-20"
                      placeholder={t('bookingModal.messagePlaceholder')}
                      {...form.register('message')}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="gradient-brand animate-pulse-glow mt-1 h-12 w-full text-base text-white hover:opacity-95"
                  >
                    {state === 'submitting' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                        {t('bookingModal.submitting')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" aria-hidden />
                        {t('bookingModal.submit')}
                        <ArrowRight className="h-5 w-5" aria-hidden />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    {t('bookingModal.privacy')}
                  </p>
                </form>
              </motion.div>
            )}

            {/* === SUCCESS === */}
            {state === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-4"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                >
                  <CheckCircle2
                    className="h-20 w-20 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    aria-hidden
                  />
                </motion.div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">
                  {t('bookingModal.successTitle')}
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                  {t('bookingModal.successDesc')}
                </p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="mt-6 h-11 px-6 border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                >
                  {t('bookingModal.sendAnother')}
                </Button>
              </motion.div>
            )}

            {/* === ERROR === */}
            {state === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-4"
                role="alert"
                aria-live="assertive"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <AlertCircle className="h-20 w-20 text-red-500" aria-hidden />
                </motion.div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">
                  {t('bookingModal.errorTitle')}
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                  {t('bookingModal.errorDesc')}
                </p>
                <Button
                  onClick={() => setState('idle')}
                  className="gradient-brand mt-6 h-11 px-6 text-white hover:opacity-95"
                >
                  {t('bookingModal.errorRetry')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal
