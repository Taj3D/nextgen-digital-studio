'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLang } from '@/components/site/language-provider'
import { waLink } from '@/lib/whatsapp'
import { siteConfig } from '@/lib/site-data'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COMPANY_LINKS = [
  { key: 'footer.about', href: '/founder' },
  { key: 'footer.careers', href: `mailto:${siteConfig.email}?subject=Career%20Inquiry%20%E2%80%94%20NextGen%20Digital%20Studio` },
  { key: 'footer.blog', href: '/blog' },
  { key: 'footer.caseStudies', href: '/case-studies' },
]

const SERVICE_KEYS = [
  'services.s1Title',
  'services.s2Title',
  'services.s3Title',
  'services.s4Title',
]

function SocialButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
    >
      {children}
    </a>
  )
}

function NewsletterForm() {
  const { t } = useLang()
  const [email, setEmail] = React.useState('')
  const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setState('invalid')
      toast.error(t('footer.newsletterInvalid'))
      return
    }
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!res.ok) throw new Error('failed')
      setState('success')
      toast.success(t('footer.newsletterSuccess'))
      setEmail('')
    } catch {
      setState('error')
      toast.error(t('footer.newsletterError'))
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t('footer.newsletterPlaceholder')}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state !== 'idle' && state !== 'loading') setState('idle')
          }}
          disabled={state === 'loading' || state === 'success'}
          aria-label={t('footer.newsletterPlaceholder')}
          className={cn(
            'h-11 flex-1 bg-background/60',
            state === 'invalid' && 'border-destructive/70',
          )}
        />
        <Button
          type="submit"
          disabled={state === 'loading' || state === 'success'}
          className="h-11 gap-1.5 rounded-md border-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 text-sm font-semibold text-white hover:from-emerald-400 hover:to-teal-400"
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">{t('footer.newsletterLoading')}</span>
            </>
          ) : state === 'success' ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('footer.newsletterBtn')}</span>
            </>
          ) : (
            <>
              {t('footer.newsletterBtn')}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {state === 'success' && (
        <p className="flex items-center gap-1.5 rounded-md bg-primary/15 px-3 py-2 text-xs font-medium text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t('footer.newsletterSuccess')}
        </p>
      )}
      {state === 'invalid' && (
        <p className="text-xs text-destructive">{t('footer.newsletterInvalid')}</p>
      )}
      {state === 'error' && (
        <p className="text-xs text-destructive">{t('footer.newsletterError')}</p>
      )}
    </form>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t border-border/50 bg-card/50 backdrop-blur-sm">
      {/* Decorative top gradient line */}
      <div className="h-px w-full gradient-brand" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="NextGen Digital Studio"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-cover shadow-glow"
              />
              <span className="text-base font-bold tracking-tight">
                {t('brand.name')}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <SocialButton
                href={siteConfig.facebook}
                label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </SocialButton>
              <SocialButton
                href={siteConfig.linkedin}
                label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </SocialButton>
              <SocialButton
                href={siteConfig.instagram}
                label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </SocialButton>
              <SocialButton
                href={siteConfig.youtube}
                label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </SocialButton>
              <SocialButton
                href={siteConfig.twitter}
                label="X"
              >
                <Twitter className="h-5 w-5" />
              </SocialButton>
              <SocialButton href={waLink()} label={t('float.whatsapp')}>
                <MessageCircle className="h-5 w-5" />
              </SocialButton>
            </div>
            <div className="space-y-1.5 pt-3 text-sm">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Col 2 — Company */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <button
                    onClick={() =>
                      document
                        .getElementById('services')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.newsletterTitle')}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('footer.newsletterDesc')}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              © {year} {t('brand.name')}. {t('footer.rights')}
            </span>
            <span className="mx-1 hidden text-border md:inline">|</span>
            <a href="/privacy" className="transition-colors hover:text-primary">
              {t('footer.privacy')}
            </a>
            <span className="mx-1 hidden text-border md:inline">|</span>
            <a href="/terms" className="transition-colors hover:text-primary">
              {t('footer.terms')}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{t('footer.address')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
