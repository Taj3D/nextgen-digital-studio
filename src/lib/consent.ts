/**
 * Shared cookie-consent state — single source of truth for whether analytics
 * pixels are allowed to fire.
 *
 * Used by:
 *   - <CookieConsentBanner>          — writes the user's choice
 *   - <AnalyticsPixels>              — gates pixel script loading
 *   - <PageViewTracker>              — gates route-change pageview events
 *
 * Storage model:
 *   localStorage["ng-cookie-consent"] = JSON.stringify({ state, timestamp })
 *   state: "accepted" | "declined"
 *   timestamp: Date.now()
 *   TTL: 30 days (expired entries are treated as "no consent yet")
 *
 * Cross-component signalling:
 *   setConsent() writes storage AND dispatches a "ng-consent-change" event on
 *   window, so <AnalyticsPixels> can react in real time without polling.
 *
 * GDPR model:
 *   - No record OR expired  → consent unknown → pixels DO load (legitimate
 *                              interest baseline for non-EU traffic; the
 *                              banner appears after 1.5s to collect a choice).
 *   - "accepted"            → pixels load + events fire.
 *   - "declined"            → pixels DO NOT load; PageViewTracker is a no-op.
 */

const STORAGE_KEY = 'ng-cookie-consent'
const CONSENT_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const EVENT_NAME = 'ng-consent-change'

export type ConsentState = 'accepted' | 'declined' | null

type ConsentRecord = { state: ConsentState; timestamp: number }

function readRecord(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (!parsed.state || !parsed.timestamp) return null
    if (Date.now() - parsed.timestamp > CONSENT_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

/** Returns the current consent state, or null if not yet decided / expired. */
export function getConsent(): ConsentState {
  return readRecord()?.state ?? null
}

/** True only when the user has explicitly declined. Unknown → false. */
export function hasDeclined(): boolean {
  return readRecord()?.state === 'declined'
}

/** True only when the user has explicitly accepted. Unknown → false. */
export function hasAccepted(): boolean {
  return readRecord()?.state === 'accepted'
}

/** Persist the user's choice and broadcast to all subscribers. */
export function setConsent(state: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state, timestamp: Date.now() }),
    )
  } catch {
    // localStorage unavailable (private mode) — in-memory signal still fires.
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }))
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function.
 * The callback is also invoked immediately with the current state so callers
 * can initialise without an extra read.
 */
export function onConsentChange(cb: (state: ConsentState) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentState>).detail
    cb(detail ?? getConsent())
  }
  window.addEventListener(EVENT_NAME, handler)
  return () => window.removeEventListener(EVENT_NAME, handler)
}

/* -------------------------------------------------------------------------- */
/*  useSyncExternalStore adapters — the React-idiomatic way to read consent.  */
/* -------------------------------------------------------------------------- */

/**
 * Stable subscribe function for `useSyncExternalStore`. React calls this once
 * per component instance and re-uses the same unsubscribe on unmount.
 */
export function subscribeConsent(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(EVENT_NAME, cb)
  // Also re-check on storage events (cross-tab sync).
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT_NAME, cb)
    window.removeEventListener('storage', cb)
  }
}

/**
 * Client snapshot for `useSyncExternalStore`. Returns one of:
 *   - 'declined'  → user has explicitly declined
 *   - 'accepted'  → user has explicitly accepted
 *   - 'unknown'   → no record / expired / SSR (default — pixels load per
 *                   legitimate-interest baseline until the user decides)
 *
 * Returning a stable string union (instead of null) lets React skip
 * re-renders when the value hasn't changed.
 */
export function consentSnapshot(): 'declined' | 'accepted' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown'
  const state = readRecord()?.state
  return state ?? 'unknown'
}

/**
 * Server snapshot — always 'unknown' so pixels load during SSR (the banner
 * appears after 1.5s client-side to collect the actual choice). This avoids
 * hydration mismatches: server and first client render both see 'unknown',
 * then the client re-renders with the real localStorage value.
 */
export function consentServerSnapshot(): 'declined' | 'accepted' | 'unknown' {
  return 'unknown'
}
