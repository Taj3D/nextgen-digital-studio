'use client'

/**
 * HomePageTracker — fires a server-side `page_view` tracking event for the
 * homepage so the CRM + ad-platform Conversions APIs (GA4 Measurement
 * Protocol, Meta CAPI, TikTok Events API, Snapchat CAPI) record the visit
 * in the same way they do for the standalone landing pages.
 *
 * Why a dedicated component?
 *   - The homepage is a Server Component (force-static), so it can't call
 *     `useEffect` directly. This tiny Client Component mounts once on the
 *     homepage and fires the event.
 *   - Other landing pages already fire `page_view` via the `usePageViewTracking`
 *     hook in `landing-common.tsx`. The homepage was the only route missing
 *     server-side page_view tracking — this closes that gap.
 *
 * Fires exactly once per mount. No deps → no re-fires on re-render.
 * Best-effort: the fetch is fire-and-forget and never throws.
 */

import { useEffect } from 'react'

export function HomePageTracker() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        page: '/',
        source: 'homepage',
      }),
      keepalive: true,
    }).catch(() => {
      /* swallow — tracking must never break the UX */
    })
  }, [])

  return null
}

export default HomePageTracker
