'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
import { markUserEngaged } from '@/lib/popup-state'
import { trackClick } from '@/lib/tracking-client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Company links — built dynamically in SiteFooter (careers mailto needs bilingual subject).
type CompanyLink = { key: string; href: string }

// First 6 services shown in footer — each links to its dedicated /services/* page.
// Labels use footer.service1-6 keys (bilingual) matching actual page titles.
const SERVICE_LINKS = [
  { key: 'footer.service1', href: '/services/ai-sales-automation' },
  { key: 'footer.service2', href: '/services/ai-chat-agent' },
  { key: 'footer.service3', href: '/services/ai-voice-agent' },
  { key: 'footer.service4', href: '/services/crm-automation' },
  { key: 'footer.service5', href: '/services/whatsapp-automation' },
  { key: 'footer.service6', href: '/services/lead-generation' },
]

// Products & Training — standalone product/training pages (previously only
// reachable via the navbar "More" dropdown, which is client-rendered and thus
// invisible to crawlers. These static <Link> elements fix that SEO gap.)
// Order matches LandingFooter in landing-common.tsx for cross-page consistency.
const PRODUCT_LINKS = [
  { key: 'footer.aiTraining', href: '/ai-training' },
  { key: 'footer.cncTraining', href: '/cnc-training' },
  { key: 'footer.cncBundle', href: '/cnc-bundle' },
  { key: 'footer.cncDesign', href: '/cnc-design' },
  { key: 'footer.3dPortrait', href: '/3d-portrait' },
  { key: 'footer.pdfBooks', href: '/pdf-books' },
]

/**
 * Navigate to an anchor on the homepage. On the homepage we smooth-scroll;
 * on other routes we navigate to the homepage, which scrolls automatically.
 */
function goToHomepageAnchor(anchor: string) {
  const isHome = typeof window !== 'undefined' && window.location.pathname === '/'
  if (isHome) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.href = `/#${anchor}`
  }
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  // WhatsApp deep-links fire `whatsapp_click`; everything else (FB, LI, IG,
  // YT, X) fires `social_click` — the two event types are tracked separately
  // in /api/track so the dashboard can attribute ad-spend to each surface.
  const isWhatsApp = href.includes('wa.me') || href.includes('api.whatsapp.com')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() =>
        trackClick(
          isWhatsApp ? 'whatsapp_click' : 'social_click',
          `footer_${isWhatsApp ? 'whatsapp' : label.toLowerCase()}`,
          { platform: isWhatsApp ? 'WhatsApp' : label },
        )
      }
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
      // Mark the user as engaged — stops all popup toasts site-wide.
      markUserEngaged()
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
              <span className="hidden sm:inline">{t('footer.subscribed')}</span>
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
  const { t, lang } = useLang()
  const bn = (s: string | number) => String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])
  const year = new Date().getFullYear()
  const yearDisplay = lang === 'bn' ? bn(year) : String(year)

  // Build company links with bilingual careers mailto subject
  const companyLinks: CompanyLink[] = [
    { key: 'footer.about', href: '/founder' },
    {
      key: 'footer.careers',
      href: `mailto:${siteConfig.email}?subject=${encodeURIComponent(t('footer.careersSubject'))}`,
    },
    { key: 'footer.blog', href: '/blog' },
    { key: 'footer.caseStudies', href: '/case-studies' },
  ]

  return (
    <footer className="mt-auto w-full border-t border-border/50 bg-card/50 backdrop-blur-sm">
      {/* Decorative top gradient line */}
      <div className="h-px w-full gradient-brand" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt={t('brand.name')}
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
              {companyLinks.map((item) => (
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
              {SERVICE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => goToHomepageAnchor('services')}
                  className="text-left text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {t('footer.viewAllServices')} →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 — Products & Training */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.productsTitle')}
            </h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Newsletter */}
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
              © {yearDisplay} {t('brand.name')}. {t('footer.rights')}
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
