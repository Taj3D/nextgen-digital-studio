'use client'

/**
 * ExitIntentPopup — a once-per-session lead-magnet modal that appears when the
 * user shows exit intent:
 *   - Desktop: `mouseleave` on the document when `e.clientY < 10` (mouse exits
 *     the top of the viewport, i.e. toward the browser chrome / tab bar).
 *   - Mobile: a fast scroll-up gesture (delta > FAST_SCROLL_DELTA px within
 *     FAST_SCROLL_WINDOW_MS ms) after the user has scrolled past
 *     SCROLL_PAST_PX px — a strong "I'm heading back up" signal on touch.
 *
 * Guards:
 *   - Only arms after MIN_DELAY_MS (8s) so the user has time to browse.
 *   - Records `exitIntentShown=1` in `sessionStorage` so it never re-appears
 *     in the same session (no annoyance).
 *   - Closes on Escape, on backdrop click, and on the X button.
 *   - Locks body scroll while open and focuses the email input (basic focus
 *     management).
 *
 * On submit (email entered): closes the popup and smooth-scrolls to the
 * #lead-form section so the user can finish booking their audit.
 *
 * Color palette: emerald / teal / amber / gold ONLY. Bilingual via useLang.
 */

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Mail,
} from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { hasUserEngaged, markUserEngaged } from '@/lib/popup-state'

const STORAGE_KEY = 'exitIntentShown'
const MIN_DELAY_MS = 8000
const SCROLL_PAST_PX = 800
const FAST_SCROLL_DELTA = 40 // px upward
const FAST_SCROLL_WINDOW_MS = 200 // ms within which the upward delta must occur

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function ExitIntentPopup() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [touched, setTouched] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)

  // Refs used inside event listeners so the listeners never need to resubscribe
  // when state changes (keeps the listener wiring stable + lint-clean).
  const armedRef = React.useRef(false)
  const openRef = React.useRef(false)
  const lastScrollRef = React.useRef({ y: 0, t: 0 })

  React.useEffect(() => {
    openRef.current = open
  }, [open])

  // Mark mounted (avoid any SSR/client mismatch on the AnimatePresence tree)
  React.useEffect(() => setMounted(true), [])

  // Arm the trigger after the minimum browse delay, unless already shown
  // this session OR the user has already submitted an email anywhere on the
  // site (engaged customers should never see the exit popup again).
  React.useEffect(() => {
    if (!mounted) return
    if (typeof window === 'undefined') return

    if (hasUserEngaged()) return

    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // sessionStorage unavailable (private mode / disabled) — proceed without persistence
    }
    if (alreadyShown) return

    const armTimer = window.setTimeout(() => {
      armedRef.current = true
    }, MIN_DELAY_MS)
    return () => window.clearTimeout(armTimer)
  }, [mounted])

  // Fire the popup (guarded so it can only fire once per session, and never
  // if the user has already engaged by submitting an email anywhere).
  const trigger = React.useCallback(() => {
    if (openRef.current) return
    if (hasUserEngaged()) return
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore persistence failures
    }
    setOpen(true)
  }, [])

  // Desktop exit intent: mouse leaves the top of the viewport.
  React.useEffect(() => {
    if (!mounted || typeof document === 'undefined') return

    const onMouseLeave = (e: MouseEvent) => {
      if (!armedRef.current || openRef.current) return
      // Mouse leaving through the top of the viewport (toward the tab bar).
      if (e.clientY < 10) trigger()
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [mounted, trigger])

  // Mobile exit intent: fast scroll-up after scrolling past SCROLL_PAST_PX.
  React.useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const onScroll = () => {
      if (!armedRef.current || openRef.current) return
      const y = window.scrollY
      const now = Date.now()
      const last = lastScrollRef.current
      const deltaY = y - last.y
      const deltaT = now - last.t
      // Fast upward motion while deep in the page = exit-intent signal on mobile.
      if (
        y > SCROLL_PAST_PX &&
        deltaT > 0 &&
        deltaT < FAST_SCROLL_WINDOW_MS &&
        deltaY < -FAST_SCROLL_DELTA
      ) {
        trigger()
      }
      lastScrollRef.current = { y, t: now }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted, trigger])

  // Focus the email input when the modal opens (basic focus management).
  React.useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => window.clearTimeout(id)
  }, [open])

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Lock body scroll while the modal is open.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!email.trim()) return
    // Mark the user as engaged — this stops SocialProof toasts AND prevents
    // the exit popup from re-appearing (cross-component signal).
    markUserEngaged()
    setOpen(false)
    setEmail('')
    setTouched(false)
    // Smoothly scroll to the lead-form section so the user can finish booking.
    window.setTimeout(() => scrollToId('lead-form'), 280)
  }

  const bullets = [
    isBn ? 'কাস্টম AI অপরচুনিটি ম্যাপ' : 'Custom AI opportunity map',
    isBn ? 'রাজস্ব প্রজেকশন রিপোর্ট' : 'Revenue projection report',
    isBn ? '৩০-মিনিট ওয়াকথ্রু কল' : '30-min walkthrough call',
  ]

  if (!mounted) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
          onClick={(e) => {
            // Close when the backdrop (not the card itself) is clicked.
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
              setOpen(false)
            }
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={cardRef}
            className="relative z-10 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gradient border wrapper (gradient-brand-soft) */}
            <div className="gradient-brand-soft rounded-2xl p-[1.5px] shadow-glow">
              <Card className="relative gap-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/95 p-0 backdrop-blur">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
                  className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Top accent bar */}
                <div className="gradient-brand h-1.5 w-full" aria-hidden="true" />

                <div className="px-6 py-7 sm:px-8 sm:py-9">
                  {/* Sparkles icon in a gradient-brand circle */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full gradient-brand text-white shadow-glow">
                    <Sparkles className="h-7 w-7" />
                  </div>

                  {/* Eyebrow */}
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                    {isBn ? 'অপেক্ষা — যাওয়ার আগে' : 'Wait — Before You Go'}
                  </p>

                  {/* Title */}
                  <h2
                    id="exit-intent-title"
                    className="text-2xl font-bold leading-tight sm:text-3xl"
                  >
                    {isBn ? (
                      <>
                        ফ্রি AI সেলস অডিট নিন{' '}
                        <span className="gradient-text">(৳১৫,০০০ মূল্য)</span>
                      </>
                    ) : (
                      <>
                        Get Your Free AI Sales Audit{' '}
                        <span className="gradient-text">(৳15,000 Value)</span>
                      </>
                    )}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                    {isBn
                      ? 'আমরা আপনার ব্যবসা বিশ্লেষণ করে দেখাবো AI কোথায় মাসে ৳১লাখ+ রাজস্ব যোগ করতে পারে। কোনো খরচ নেই, বাধ্যবাধকতা নেই।'
                      : "We'll analyze your business and show you exactly where AI can add ৳1L+/month in revenue. No cost, no obligation."}
                  </p>

                  {/* Bullet points with checkmarks */}
                  <ul className="mt-5 space-y-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm sm:text-base">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-brand text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground/90">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Email form */}
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative flex-1">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          ref={inputRef}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={
                            isBn ? 'আপনার ইমেইল ঠিকানা' : 'Your email address'
                          }
                          aria-label={isBn ? 'ইমেইল ঠিকানা' : 'Email address'}
                          aria-invalid={touched && !email.trim() ? true : undefined}
                          className="h-11 pl-9"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="gradient-brand animate-pulse-glow h-11 shrink-0 text-white hover:opacity-95"
                      >
                        {isBn ? 'ফ্রি অডিট নিন' : 'Get My Free Audit'}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {touched && !email.trim() && (
                      <p className="text-xs text-destructive">
                        {isBn
                          ? 'অনুগ্রহ করে একটি ইমেইল ঠিকানা লিখুন।'
                          : 'Please enter your email address.'}
                      </p>
                    )}

                    {/* Privacy note */}
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      {isBn
                        ? 'কোনো স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব।'
                        : 'No spam. Unsubscribe anytime.'}
                    </p>
                  </form>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExitIntentPopup
