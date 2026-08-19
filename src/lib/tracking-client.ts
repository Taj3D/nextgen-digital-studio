/**
 * Client-side click tracking — fires `whatsapp_click` and `social_click`
 * events to /api/track so the CRM + ad-platform Conversions APIs capture
 * outbound WhatsApp + social-media clicks.
 *
 * Server-side Conversions API (CAPI) is in src/lib/tracking.ts; this helper
 * is the client-side companion for click events that have no server-side
 * equivalent (a wa.me link is a pure client-side navigation).
 *
 * Best-effort: never throws, never blocks navigation. Fire-and-forget.
 */

type ClickEventType =
  | 'whatsapp_click'
  | 'social_click'
  | 'qr_action'
  | 'qr_download'
  | 'qr_founder_link'
  | 'qr_home_link'
  | 'qr_service_link'
  | 'tool_click'

/**
 * Fire a click tracking event. Safe to call from onClick handlers —
 * the fetch is best-effort and will not block the navigation.
 *
 * @param type     'whatsapp_click' | 'social_click' | 'qr_action' | 'qr_download' | 'tool_click'
 * @param source   free-form label identifying the surface (e.g.
 *                 'floating_button', 'footer', 'hero_cta')
 * @param meta     optional extra context (e.g. { platform: 'facebook' })
 */
export function trackClick(
  type: ClickEventType,
  source: string,
  meta?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        page: window.location.pathname,
        source,
        meta,
      }),
      // `keepalive: true` lets the request survive the page unload that
      // happens when the user clicks an <a target="_blank"> link.
      keepalive: true,
    }).catch(() => {
      /* swallow — tracking must never break the UX */
    })
  } catch {
    /* swallow */
  }
}
