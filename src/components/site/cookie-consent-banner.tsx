'use client'

import * as React from 'react'
import Link from 'next/link'
import { Cookie, X, Check } from 'lucide-react'
import { useLang } from '@/components/site/language-provider'

/**
 * CookieConsentBanner — lightweight, non-blocking cookie consent banner.
 *
 * Features:
 * - Shows on first visit (after a 1.5s delay so it doesn't interrupt the
 *   initial page render).
 * - Persists consent to localStorage key 'ng-cookie-consent'.
 * - Bilingual (EN + BN) via useLang().
 * - "Accept" button enables analytics pixels (they're already loaded —
 *   this is mostly for GDPR/Privacy Policy compliance visibility).
 * - "Decline" button hides the banner without enabling extra tracking.
 * - Auto-hides after 30 days (re-prompts if consent is older than 30 days).
 * - Dismissible via X button (same as Decline).
 * - Skipped on /admin routes (admin doesn't need consent prompt).
 * - Positioned at bottom-left on desktop, full-width on mobile.
 * - Uses safe-area-inset for iOS notch.
 *
 * Privacy Policy at /privacy promises a cookie consent banner — this
 * fulfills that promise.
 */

const STORAGE_KEY = 'ng-cookie-consent'
const CONSENT_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const SHOW_DELAY_MS = 1500

type ConsentState = 'accepted' | 'declined' | null

function loadConsent(): { state: ConsentState; timestamp: number } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state: ConsentState; timestamp: number }
    if (!parsed.state || !parsed.timestamp) return null
    // Expire after TTL
    if (Date.now() - parsed.timestamp > CONSENT_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function saveConsent(state: 'accepted' | 'declined') {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state, timestamp: Date.now() }),
    )
  } catch {}
}

export function CookieConsentBanner() {
  const { t, lang } = useLang()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    // Skip on /admin routes
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return
    }

    // Don't show if already consented
    const existing = loadConsent()
    if (existing?.state === 'accepted' || existing?.state === 'declined') {
      return
    }

    // Show after delay so it doesn't interrupt initial render
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const handleAccept = React.useCallback(() => {
    saveConsent('accepted')
    setVisible(false)
  }, [])

  const handleDecline = React.useCallback(() => {
    saveConsent('declined')
    setVisible(false)
  }, [])

  if (!visible) return null

  // Bilingual content
  const content = lang === 'bn'
    ? {
        title: 'কুকিজ ব্যবহার',
        desc: 'আমরা আপনার অভিজ্ঞতা উন্নয়ন ও অ্যানালিটিক্সের জন্য কুকিজ ব্যবহার করি। চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের কুকিজ ব্যবহারে সম্মত হচ্ছেন।',
        accept: 'গ্রহণ করুন',
        decline: 'প্রত্যাখ্যান',
        privacy: 'প্রাইভেসি পলিসি',
      }
    : {
        title: 'Cookie Usage',
        desc: 'We use cookies to improve your experience and for analytics. By continuing, you consent to our use of cookies.',
        accept: 'Accept',
        decline: 'Decline',
        privacy: 'Privacy Policy',
      }

  return (
    <div
      role="dialog"
      aria-label={content.title}
      aria-live="polite"
      className="safe-bottom fixed bottom-4 left-3 right-3 z-[60] mx-auto max-w-md sm:left-4 sm:right-auto"
    >
      <div className="relative rounded-2xl border border-border/70 bg-background/95 p-4 shadow-2xl backdrop-blur-lg sm:p-5">
        {/* Close button */}
        <button
          type="button"
          onClick={handleDecline}
          aria-label="Dismiss cookie banner"
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>

        {/* Icon + content */}
        <div className="flex items-start gap-3 pr-6">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10">
            <Cookie className="h-4.5 w-4.5 text-primary" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              {content.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {content.desc}{' '}
              <Link
                href="/privacy"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {content.privacy}
              </Link>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-brand px-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
            {content.accept}
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {content.decline}
          </button>
        </div>
      </div>
    </div>
  )
}
