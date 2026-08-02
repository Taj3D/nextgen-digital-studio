/**
 * NGS Analytics Tracker
 * Tracks: cta_click, scroll_depth, form_start, form_complete,
 * whatsapp_click, enroll_click, time_on_page, lead_capture, video_play, quiz_complete
 * Pushes to window.dataLayer (GA4/GTM) + console.log if NGS_DEBUG
 */

export type TrackEvent =
  | 'cta_click'
  | 'scroll_depth'
  | 'form_start'
  | 'form_complete'
  | 'whatsapp_click'
  | 'enroll_click'
  | 'time_on_page'
  | 'lead_capture'
  | 'video_play'
  | 'quiz_complete'
  | 'demo_modal_open'

export function ngsTrack(event: TrackEvent, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  // Push to dataLayer for GTM/GA4
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
  // Debug log
  if ((window as { NGS_DEBUG?: boolean }).NGS_DEBUG && window.console?.log) {
    console.log('[ngsTrack]', event, data || {})
  }
  // Optional: send to /api/track endpoint (uncomment if exists)
  // fetch('/api/track', { method: 'POST', body: JSON.stringify({ event, data }) }).catch(() => {})
}

/** Initialize global event listeners — call once on page mount */
export function initNgsTracking() {
  if (typeof window === 'undefined') return
  const w = window as { __ngsTrackingInit?: boolean }
  if (w.__ngsTrackingInit) return
  w.__ngsTrackingInit = true

  // 1. CTA click tracking — any [data-track] element
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement | null)?.closest('[data-track]')
    if (!target) return
    const trackId = target.getAttribute('data-track') || 'unknown'
    ngsTrack('cta_click', { id: trackId, tag: target.tagName.toLowerCase() })
    if (trackId.includes('whatsapp') || trackId.includes('chat-whatsapp')) {
      ngsTrack('whatsapp_click', { id: trackId })
    }
    if (trackId.includes('enroll')) {
      ngsTrack('enroll_click', { id: trackId })
    }
  })

  // 2. Scroll depth — 25%, 50%, 75%, 90% (once each)
  const fired = new Set<number>()
  const thresholds = [25, 50, 75, 90]
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)
      thresholds.forEach((th) => {
        if (pct >= th && !fired.has(th)) {
          fired.add(th)
          ngsTrack('scroll_depth', { percent: th })
        }
      })
    },
    { passive: true },
  )

  // 3. Form start/complete
  document.addEventListener('focusin', (e) => {
    const form = (e.target as HTMLElement | null)?.closest('form')
    if (!form) return
    const tracked = form as HTMLFormElement & { __ngsTracked?: boolean }
    if (tracked.__ngsTracked) return
    tracked.__ngsTracked = true
    ngsTrack('form_start', { formId: form.id || 'unknown' })
  })
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement
    ngsTrack('form_complete', { formId: form.id || 'unknown' })
  })

  // 4. Time on page — 30s, 60s, 120s, 300s
  ;[30, 60, 120, 300].forEach((s) => {
    setTimeout(() => ngsTrack('time_on_page', { seconds: s }), s * 1000)
  })
}

// Global type augmentation
declare global {
  interface Window {
    dataLayer: unknown[]
    NGS_DEBUG?: boolean
    __ngsTrackingInit?: boolean
  }
}
