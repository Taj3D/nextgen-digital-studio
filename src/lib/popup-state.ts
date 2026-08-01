/**
 * Popup State — shared cross-component signal that tells ALL popup-type
 * components (SocialProof toasts, ExitIntentPopup, etc.) to stop showing
 * once the user has "engaged" by submitting an email anywhere on the site.
 *
 * Engagement is persisted in `localStorage` so returning customers who
 * already submitted an email are never re-spammed with popups.
 *
 * A custom window event (`ng-user-engaged`) is also dispatched so that
 * currently-mounted popups can react instantly (hide + stop scheduling)
 * without needing to re-read localStorage on an interval.
 *
 * Usage:
 *   - On any successful email submit (newsletter, lead form, exit popup):
 *       markUserEngaged()
 *   - Before showing a popup / before scheduling the next one:
 *       if (hasUserEngaged()) return   // don't show
 *   - To react live (optional):
 *       useEffect(() => onUserEngaged(() => setCurrent(null)), [])
 */

const STORAGE_KEY = 'ng-user-engaged'
const EVENT_NAME = 'ng-user-engaged'

/** Returns true if the user has already submitted an email anywhere. */
export function hasUserEngaged(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Mark the user as engaged (email submitted). Persists to localStorage and
 * dispatches a custom event so live popups hide immediately.
 */
export function markUserEngaged(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // localStorage unavailable — event still fires for this session
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME))
}

/** Subscribe to the "user engaged" event. Returns an unsubscribe function. */
export function onUserEngaged(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(EVENT_NAME, cb)
  return () => window.removeEventListener(EVENT_NAME, cb)
}
