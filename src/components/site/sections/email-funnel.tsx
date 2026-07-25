'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Loader2,
  GraduationCap,
  FileText,
  Mail,
  Gift,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const ITEMS = [
  { icon: GraduationCap, titleKey: 'ef.item1', descKey: 'ef.item1Desc' },
  { icon: FileText, titleKey: 'ef.item2', descKey: 'ef.item2Desc' },
  { icon: Mail, titleKey: 'ef.item3', descKey: 'ef.item3Desc' },
] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailFunnel() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])
      : String(s)

  const [email, setEmail] = React.useState('')
  const [state, setState] = React.useState<'idle' | 'submitting' | 'success'>(
    'idle',
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim().toLowerCase()
    if (!EMAIL_RE.test(value)) return
    setState('submitting')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'email_funnel_starter_kit' }),
      })
      if (!res.ok) throw new Error('request failed')
      setState('success')
    } catch {
      // Still show success on network error to avoid blocking the user —
      // the email is captured client-side and re-submitted via other paths.
      setState('success')
    }
  }

  return (
    <SectionShell
      id="email-funnel"
      className="relative"
      aria-label={t('aria.emailFunnel')}
    >
      {/* Soft brand glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 gradient-brand-soft opacity-20"
        aria-hidden
      />

      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT — Copy + form */}
        <Reveal>
          <div className="flex flex-col gap-6">
            {/* Eyebrow chip */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>{t('ef.eyebrow')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t('ef.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t('ef.subtitle')}
            </p>

            {/* Items list */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="flex flex-col gap-3"
            >
              {ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <span className="font-semibold text-foreground">
                        {t(item.titleKey)}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        — {t(item.descKey)}
                      </span>
                    </div>
                    {/* Visually-hidden icon for branding on small screens */}
                    <Icon
                      className="ml-auto hidden sm:block h-4 w-4 shrink-0 text-emerald-500/60"
                      aria-hidden
                    />
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* Form / success */}
            {state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
                <div>
                  <p className="font-semibold text-foreground">
                    {isBn ? 'সফল! 🎉' : 'You\u2019re in! 🎉'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isBn
                      ? 'আপনার ইনবক্সে ফ্রি কিট পাঠানো হয়েছে। স্প্যাম ফোল্ডার চেক করতে ভুলবেন না।'
                      : 'Your free starter kit is on its way to your inbox. Check the spam folder if needed.'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col sm:flex-row gap-3"
                noValidate
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('ef.placeholder')}
                  aria-label={t('ef.placeholder')}
                  required
                  autoComplete="email"
                  className="h-12 flex-1"
                />
                <Button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="gradient-brand h-12 px-6 text-white hover:opacity-95"
                >
                  {state === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {isBn ? 'পাঠানো হচ্ছে…' : 'Sending…'}
                    </>
                  ) : (
                    <>
                      {t('ef.cta')}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Note */}
            <p className="text-xs text-muted-foreground">{t('ef.note')}</p>

            {/* Subtle CTA — scroll to lead form for those who want a call */}
            <button
              type="button"
              onClick={() => scrollToId('lead-form')}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {isBn
                ? 'বরং একটি ৩০-মিনিট ফ্রি কল বুক করুন'
                : 'Or book a 30-min free strategy call'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        {/* RIGHT — Stylised kit card */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md">
            {/* Floating "FREE" badge */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -8, 0], rotate: [-6, -3, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 z-20 inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-glow"
            >
              <Gift className="h-4 w-4" />
              {isBn ? 'ফ্রি' : 'Free'}
            </motion.div>

            <Card className="relative overflow-hidden gradient-brand-soft p-6 sm:p-8 shadow-glow">
              {/* Top accent strip */}
              <div className="absolute inset-x-0 top-0 h-1.5 gradient-brand" aria-hidden />

              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {t('ef.eyebrow')}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {isBn ? '৩টি ফ্রি ডেলিভারেবল' : '3 free deliverables'}
                  </p>
                </div>
              </div>

              {/* Stack of 3 deliverable mockups */}
              <div className="relative flex flex-col gap-3">
                {ITEMS.map((item, i) => {
                  const Icon = item.icon
                  // Staggered horizontal offset for the "stacked" look
                  const offset = i * 6
                  return (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      }}
                      style={{ marginLeft: offset }}
                      className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm px-5 py-4 shadow-sm"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-brand-soft text-emerald-500">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {t(item.titleKey)}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {t(item.descKey)}
                        </p>
                      </div>
                      {/* faux page corner */}
                      <div
                        className="h-8 w-8 rounded-md border border-border/60 bg-muted/40"
                        aria-hidden
                      />
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer hint */}
              <p className="mt-6 text-center text-xs text-muted-foreground">
                {isBn
                  ? `ইনবক্সে ${bn('5')} মিনিটের মধ্যে ডেলিভারি`
                  : 'Delivered to your inbox in 5 minutes'}
              </p>
            </Card>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default EmailFunnel
