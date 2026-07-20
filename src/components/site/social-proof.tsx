'use client'

/**
 * SocialProof — periodic bottom-left toast notifications that show recent
 * "social proof" activity (other Bangladeshis booking calls, subscribing,
 * ordering AI training, etc.). Increases perceived demand & conversions.
 *
 * Behaviour:
 *   - Shows one toast at a time, bottom-left, ABOVE the chat widget area
 *     (the WhatsApp button is bottom-right; the chat widget is bottom-right
 *     above it; so bottom-left is free real estate).
 *   - A new toast appears every 20-30 seconds (randomized) up to a maximum
 *     of 3 per session (localStorage-tracked so returning users aren't
 *     spammed).
 *   - Each toast auto-dismisses after 6 seconds.
 *   - User can dismiss manually via the X button (also counts toward the
 *     session cap).
 *   - Hidden on mobile (< 640px) — sm:hidden — because the screen is too
 *     crowded with the chat widget + WhatsApp button + sticky book bar.
 *
 * Persistence:
 *   - localStorage key 'ng-socialproof-shown' tracks how many toasts have
 *     been shown in the current session (reset when the user closes the tab
 *     and returns — actually localStorage persists across sessions, so we
 *     also store a session-start timestamp and reset if older than 30 min).
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, UserCheck, Star, ShoppingCart } from 'lucide-react'

import { useLang } from '@/components/site/language-provider'

type ProofAction = 'booked' | 'subscribed' | 'ordered' | 'reviewed'

type ProofMessage = {
  name: string
  nameBn: string
  city: string
  cityBn: string
  action: ProofAction
  /** minutes ago (cosmetic only — fixed per message) */
  minutesAgo: number
}

// 10 realistic Bangladeshi names + cities + actions.
// minutesAgo is the displayed "X minutes ago" label (rotates through real values).
const PROOF_MESSAGES: ProofMessage[] = [
  { name: 'Rahim', nameBn: 'রহিম', city: 'Dhaka', cityBn: 'ঢাকা', action: 'booked', minutesAgo: 5 },
  { name: 'Ayesha', nameBn: 'আয়েশা', city: 'Chittagong', cityBn: 'চট্টগ্রাম', action: 'subscribed', minutesAgo: 2 },
  { name: 'Karim', nameBn: 'করিম', city: 'Sylhet', cityBn: 'সিলেট', action: 'ordered', minutesAgo: 0 },
  { name: 'Fatema', nameBn: 'ফাতেমা', city: 'Khulna', cityBn: 'খুলনা', action: 'booked', minutesAgo: 8 },
  { name: 'Sabbir', nameBn: 'সাব্বির', city: 'Rajshahi', cityBn: 'রাজশাহী', action: 'reviewed', minutesAgo: 1 },
  { name: 'Nadia', nameBn: 'নাদিয়া', city: 'Barisal', cityBn: 'বরিশাল', action: 'subscribed', minutesAgo: 14 },
  { name: 'Imran', nameBn: 'ইমরান', city: 'Comilla', cityBn: 'কুমিল্লা', action: 'booked', minutesAgo: 3 },
  { name: 'Shamima', nameBn: 'শামীমা', city: 'Mymensingh', cityBn: 'ময়মনসিংহ', action: 'ordered', minutesAgo: 7 },
  { name: 'Rashed', nameBn: 'রাশেদ', city: 'Rangpur', cityBn: 'রংপুর', action: 'booked', minutesAgo: 11 },
  { name: 'Tania', nameBn: 'তানিয়া', city: 'Jessore', cityBn: 'যশোর', action: 'subscribed', minutesAgo: 4 },
]

const STORAGE_KEY = 'ng-socialproof-state'
const MAX_PER_SESSION = 3
const AUTO_DISMISS_MS = 6000
const MIN_INTERVAL_MS = 20000 // 20s
const MAX_INTERVAL_MS = 30000 // 30s
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 min — reset count after this

type StoredState = { count: number; sessionStart: number; lastShownIdx: number }

function loadState(): StoredState {
  if (typeof window === 'undefined') return { count: 0, sessionStart: Date.now(), lastShownIdx: -1 }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredState
      if (
        typeof parsed.count === 'number' &&
        typeof parsed.sessionStart === 'number' &&
        typeof parsed.lastShownIdx === 'number'
      ) {
        // Reset count if the session is older than the TTL
        if (Date.now() - parsed.sessionStart > SESSION_TTL_MS) {
          return { count: 0, sessionStart: Date.now(), lastShownIdx: -1 }
        }
        return parsed
      }
    }
  } catch {}
  return { count: 0, sessionStart: Date.now(), lastShownIdx: -1 }
}

function saveState(state: StoredState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function actionConfig(action: ProofAction): { icon: typeof CheckCircle2; key: string; color: string } {
  switch (action) {
    case 'booked':
      return { icon: CheckCircle2, key: 'socialProof.actionBooked', color: 'text-emerald-500' }
    case 'subscribed':
      return { icon: UserCheck, key: 'socialProof.actionSubscribed', color: 'text-blue-500' }
    case 'ordered':
      return { icon: ShoppingCart, key: 'socialProof.actionOrdered', color: 'text-amber-500' }
    case 'reviewed':
      return { icon: Star, key: 'socialProof.actionReviewed', color: 'text-yellow-500' }
  }
}

export function SocialProof() {
  const { t, lang } = useLang()
  const [current, setCurrent] = React.useState<ProofMessage | null>(null)
  const stateRef = React.useRef<StoredState>({ count: 0, sessionStart: Date.now(), lastShownIdx: -1 })
  const hideTimerRef = React.useRef<number | null>(null)
  const showTimerRef = React.useRef<number | null>(null)

  // Pick the next proof message (cycle through the list, never the same twice in a row)
  const pickNext = React.useCallback((): ProofMessage | null => {
    const state = stateRef.current
    if (state.count >= MAX_PER_SESSION) return null
    let idx = state.lastShownIdx
    // Pick a random different message
    if (PROOF_MESSAGES.length > 1) {
      do {
        idx = Math.floor(Math.random() * PROOF_MESSAGES.length)
      } while (idx === state.lastShownIdx)
    } else {
      idx = 0
    }
    return PROOF_MESSAGES[idx] ?? null
  }, [])

  // Refs to break the showNext ↔ scheduleNext useCallback dependency cycle.
  // Both functions reference each other via setTimeout closures; without the
  // indirection ESLint's react-hooks/exhaustive-deps rule flags the cycle.
  const showNextRef = React.useRef<() => void>(() => {})
  const scheduleNextRef = React.useRef<() => void>(() => {})

  const scheduleNext = React.useCallback(() => {
    if (showTimerRef.current != null) {
      window.clearTimeout(showTimerRef.current)
    }
    // Random interval between 20s and 30s
    const delay = MIN_INTERVAL_MS + Math.floor(Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS + 1))
    showTimerRef.current = window.setTimeout(() => {
      showNextRef.current()
    }, delay)
  }, [])

  const showNext = React.useCallback(() => {
    const next = pickNext()
    if (!next) {
      setCurrent(null)
      return
    }

    // Update state BEFORE showing so the count is accurate even if user
    // dismisses immediately.
    const state = stateRef.current
    state.count = state.count + 1
    state.lastShownIdx = PROOF_MESSAGES.indexOf(next)
    saveState(state)

    setCurrent(next)

    // Auto-dismiss after 6s, then schedule the next toast.
    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = window.setTimeout(() => {
      setCurrent(null)
      scheduleNextRef.current()
    }, AUTO_DISMISS_MS)
  }, [pickNext])

  // Keep the refs in sync so the latest closures are always invoked.
  React.useEffect(() => {
    showNextRef.current = showNext
    scheduleNextRef.current = scheduleNext
  }, [showNext, scheduleNext])

  // Initial mount: load state, schedule the first toast (after 8s — feels
  // less aggressive than showing immediately).
  React.useEffect(() => {
    stateRef.current = loadState()
    if (stateRef.current.count >= MAX_PER_SESSION) return

    const initialDelay = 8000
    showTimerRef.current = window.setTimeout(() => {
      showNext()
    }, initialDelay)

    return () => {
      if (hideTimerRef.current != null) window.clearTimeout(hideTimerRef.current)
      if (showTimerRef.current != null) window.clearTimeout(showTimerRef.current)
    }
  }, [])

  const dismissManually = () => {
    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
    setCurrent(null)
    scheduleNext()
  }

  if (!current) return null

  const cfg = actionConfig(current.action)
  const Icon = cfg.icon
  const name = lang === 'bn' ? current.nameBn : current.name
  const city = lang === 'bn' ? current.cityBn : current.city
  const timeStr =
    current.minutesAgo === 0
      ? t('socialProof.justNow')
      : lang === 'bn'
        ? `${toBnDigits(current.minutesAgo)} ${t('socialProof.minutesAgo')}`
        : `${current.minutesAgo} ${t('socialProof.minutesAgo')}`

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-40 safe-bottom hidden sm:block"
      aria-live="polite"
      aria-label={t('socialProof.ariaLabel')}
    >
      <AnimatePresence>
        {current && (
          <motion.div
            key={`${current.name}-${current.action}-${current.count ?? Date.now()}`}
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="pointer-events-auto w-72 rounded-xl border border-border/70 bg-background/95 p-3 shadow-lg backdrop-blur-md"
            role="status"
          >
            <div className="flex items-start gap-2.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500/10">
                <Icon className={`h-4.5 w-4.5 ${cfg.color}`} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-foreground">
                  <span className="font-semibold">{name}</span>{' '}
                  <span className="text-muted-foreground">{t('socialProof.from')}</span>{' '}
                  <span className="font-medium">{city}</span>{' '}
                  <span className="text-muted-foreground">{t(cfg.key)}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{timeStr}</p>
              </div>
              <button
                type="button"
                onClick={dismissManually}
                aria-label={t('socialProof.dismiss')}
                className="-mr-1 -mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Convert ASCII digits in a number to Bengali digits for display. */
function toBnDigits(n: number): string {
  const bnDigits = '০১২৩৪৫৬৭৮৯'
  return String(n).replace(/\d/g, (d) => bnDigits[Number(d)] ?? d)
}

export default SocialProof
