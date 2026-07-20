'use client'

import * as React from 'react'
import Link from 'next/link'
import { useLang } from './language-provider'
import { siteConfig } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, MessageCircle, Facebook, Linkedin, Instagram, Youtube, Github, Twitter, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { PaymentInstructions } from './payment-instructions'

/* -------------------------------------------------------------------------- */
/*  Social icons                                                              */
/* -------------------------------------------------------------------------- */

export function LandingSocials({ className = '' }: { className?: string }) {
  const links = [
    { href: siteConfig.facebook, label: 'Facebook', Icon: Facebook },
    { href: siteConfig.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: siteConfig.instagram, label: 'Instagram', Icon: Instagram },
    { href: siteConfig.youtube, label: 'YouTube', Icon: Youtube },
    { href: siteConfig.twitter, label: 'X', Icon: Twitter },
    { href: siteConfig.github, label: 'GitHub', Icon: Github },
  ]
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  WhatsApp CTA                                                              */
/* -------------------------------------------------------------------------- */

export function WhatsAppCTA({
  isBn,
  message,
  className = '',
}: {
  isBn: boolean
  message?: string
  className?: string
}) {
  const text = encodeURIComponent(
    message ??
      (isBn
        ? 'আসসালামু আলাইকুম, আমি NextGen Digital Studio-এর সেবা সম্পর্কে জানতে চাই।'
        : "Hi NextGen Digital Studio, I'd like to know more about your services."),
  )
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.02] ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {isBn ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*  Lead form                                                                 */
/* -------------------------------------------------------------------------- */

export function LandingLeadForm({
  isBn,
  source,
  serviceName,
  submitLabel,
  successMessage,
  paymentAmount,
  paymentNote,
  className = '',
}: {
  isBn: boolean
  source: string
  serviceName?: string
  submitLabel?: string
  successMessage?: string
  /** If set, shows payment instructions after successful submission */
  paymentAmount?: number
  paymentNote?: string
  className?: string
}) {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim() || null,
      service: serviceName ?? (String(fd.get('service') ?? '').trim() || null),
      message: String(fd.get('message') ?? '').trim() || null,
      source,
    }
    if (!payload.name || !payload.email || !payload.phone) {
      toast.error(isBn ? 'অনুগ্রহ করে সব প্রয়োজনীয় ঘর পূরণ করুন' : 'Please fill all required fields')
      setSubmitting(false)
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      // Fire-and-forget tracking
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead',
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          source,
          email: payload.email,
          phone: payload.phone,
          name: payload.name,
        }),
      }).catch(() => {})
      setDone(true)
      toast.success(isBn ? 'সফলভাবে জমা হয়েছে!' : 'Submission successful!')
      form.reset()
    } catch {
      toast.error(isBn ? 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন' : 'Something went wrong, please try again')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-10 text-center ${className}`}
      >
        <CheckCircle2 className="mb-3 h-12 w-12 text-emerald-500" />
        <h3 className="font-heading text-xl font-bold">
          {isBn ? 'ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।' : 'Thank you! We received your request.'}
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {successMessage ??
            (isBn
              ? 'আমাদের টিম ২ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।'
              : 'Our team will contact you within 2 hours.')}
        </p>
        {paymentAmount !== undefined && (
          <div className="w-full max-w-md text-left">
            <PaymentInstructions
              isBn={isBn}
              amount={paymentAmount}
              note={paymentNote}
            />
          </div>
        )}
        <Button variant="outline" className="mt-4" onClick={() => setDone(false)}>
          {isBn ? 'আরেকটি অনুরোধ পাঠান' : 'Send another request'}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ld-name">{isBn ? 'নাম *' : 'Full name *'}</Label>
          <Input id="ld-name" name="name" required placeholder={isBn ? 'আপনার নাম' : 'Your name'} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ld-phone">{isBn ? 'ফোন / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}</Label>
          <Input id="ld-phone" name="phone" required placeholder="+880 1XXX-XXXXXX" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ld-email">{isBn ? 'ইমেইল *' : 'Email *'}</Label>
          <Input id="ld-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ld-company">{isBn ? 'কোম্পানি' : 'Company'}</Label>
          <Input id="ld-company" name="company" placeholder={isBn ? 'কোম্পানির নাম' : 'Company name'} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ld-message">{isBn ? 'বার্তা' : 'Message'}</Label>
        <Textarea
          id="ld-message"
          name="message"
          rows={3}
          placeholder={isBn ? 'আপনার প্রয়োজন সম্পর্কে লিখুন...' : 'Tell us what you need...'}
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[15px] font-semibold shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.01]"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isBn ? 'পাঠানো হচ্ছে...' : 'Submitting...'}
          </>
        ) : (
          <>
            {submitLabel ?? (isBn ? 'অর্ডার করুন' : 'Place Order')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page view tracker                                                         */
/* -------------------------------------------------------------------------- */

export function usePageViewTracking(source: string, meta?: Record<string, unknown>) {
  React.useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        source,
        meta,
      }),
    }).catch(() => {})
  }, [source, meta])
}

/* -------------------------------------------------------------------------- */
/*  Landing footer (simple)                                                   */
/* -------------------------------------------------------------------------- */

export function LandingFooter({ isBn }: { isBn: boolean }) {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <p className="font-heading text-lg font-bold">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{siteConfig.address}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>{' '}
              ·{' '}
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-foreground">
                {siteConfig.phone}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">{isBn ? 'সোশ্যাল' : 'Socials'}</p>
            <LandingSocials className="mt-3" />
          </div>
          <div>
            <p className="text-sm font-semibold">{isBn ? 'যোগাযোগ' : 'Contact'}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {isBn ? 'হোম' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  {isBn ? 'টার্মস' : 'Terms'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. {isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section header helper                                                     */
/* -------------------------------------------------------------------------- */

export function LandingEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
      {children}
    </span>
  )
}
