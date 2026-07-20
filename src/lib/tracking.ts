/**
 * Tracking + Conversions API integration (Google, Facebook/Meta, TikTok, Snapchat).
 *
 * Server-side only. Saves events to the TrackingEvent table (Prisma) and
 * fans out to ad platform Conversions APIs best-effort.
 *
 * Env vars (all optional — if missing, that platform is skipped silently):
 *   GOOGLE_SHEETS_WEBHOOK_URL — Apps Script webhook
 *   GA4_MEASUREMENT_ID, GA4_API_SECRET — Google Analytics 4 Measurement Protocol
 *   FB_PIXEL_ID, FB_ACCESS_TOKEN — Meta Conversions API
 *   TIKTOK_PIXEL_ID, TIKTOK_ACCESS_TOKEN — TikTok Events API
 *   SNAPCHAT_PIXEL_ID, SNAPCHAT_ACCESS_TOKEN — Snapchat Conversions API
 */
import { createHash } from 'node:crypto'
import { db } from '@/lib/db'
import { cacheGet, cacheSet } from '@/lib/cache'

export type TrackingEventType =
  | 'page_view'
  | 'lead'
  | 'purchase'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'complete_registration'
  | 'contact'
  | 'booking'
  | 'whatsapp_click'
  | 'social_click'

export type TrackingEventInput = {
  type: TrackingEventType
  page?: string
  source?: string
  email?: string
  phone?: string
  name?: string
  value?: number
  currency?: string
  meta?: Record<string, unknown>
  userAgent?: string
  ipAddress?: string
  fbp?: string
  fbc?: string
}

export type TrackingEventRecord = {
  id: string
  type: string
  page: string
  source: string
  email?: string | null
  phone?: string | null
  name?: string | null
  value?: number | null
  currency?: string | null
  meta?: string | null
  userAgent?: string | null
  ipAddress?: string | null
  createdAt: Date
}

const EVENT_NAME_MAP: Record<TrackingEventType, Record<string, string>> = {
  page_view: { ga4: 'page_view', fb: 'PageView', tt: 'page_view', snap: 'PAGE_VIEW' },
  lead: { ga4: 'generate_lead', fb: 'Lead', tt: 'lead', snap: 'SIGN_UP' },
  purchase: { ga4: 'purchase', fb: 'Purchase', tt: 'purchase', snap: 'PURCHASE' },
  add_to_cart: { ga4: 'add_to_cart', fb: 'AddToCart', tt: 'add_to_cart', snap: 'ADD_CART' },
  begin_checkout: { ga4: 'begin_checkout', fb: 'InitiateCheckout', tt: 'initiate_checkout', snap: 'START_CHECKOUT' },
  complete_registration: { ga4: 'sign_up', fb: 'CompleteRegistration', tt: 'complete_registration', snap: 'SIGN_UP' },
  contact: { ga4: 'generate_lead', fb: 'Contact', tt: 'lead', snap: 'SIGN_UP' },
  booking: { ga4: 'schedule', fb: 'Schedule', tt: 'schedule', snap: 'START_CHECKOUT' },
  whatsapp_click: { ga4: 'click_whatsapp', fb: 'Contact', tt: 'click_button', snap: 'SIGN_UP' },
  social_click: { ga4: 'click_social', fb: 'click_social', tt: 'click_button', snap: 'SIGN_UP' },
}

function nowMs() {
  return Date.now()
}

/**
 * SHA-256 hash of PII (email, phone, name) for ad-platform Conversions APIs.
 *
 * Meta, TikTok, and Snapchat REQUIRE user_data fields to be SHA-256 hashed
 * (lowercased + trimmed before hashing). The previous FNV-1a 32-bit hash
 * was rejected by every platform — events were silently dropped. See
 * AUDIT-4-api [API-026].
 *
 * Returns `undefined` for empty input so the platform SDK treats the field
 * as omitted (sending an empty string would be flagged as invalid user_data).
 *
 * Async to keep the call-site future-proof (crypto.subtle.digest, which is
 * the browser-compatible variant, is genuinely async).
 */
async function hashPII(value: string | undefined | null): Promise<string | undefined> {
  if (!value) return undefined
  const normalised = value.trim().toLowerCase()
  if (!normalised) return undefined
  return createHash('sha256').update(normalised).digest('hex')
}

/**
 * Save a tracking event to the database and fan out to ad platforms.
 * Best-effort: any platform failure is swallowed (event is still saved).
 *
 * NOTE: In dev mode the @prisma/client module may be cached by Turbopack
 * from before the TrackingEvent model was added. If `db.trackingEvent` is
 * undefined, we skip DB persistence but still fan out to ad platforms so
 * tracking never blocks the user.
 */
export async function trackEvent(input: TrackingEventInput): Promise<{ id: string }> {
  // Persist to DB (resilient — skip if client doesn't yet know about TrackingEvent)
  let recordId: string | undefined
  try {
    if (db.trackingEvent) {
      const record = await db.trackingEvent.create({
        data: {
          type: input.type,
          page: input.page ?? '',
          source: input.source ?? 'landing_page',
          email: input.email ?? null,
          phone: input.phone ?? null,
          name: input.name ?? null,
          value: input.value ?? null,
          currency: input.currency ?? 'BDT',
          meta: input.meta ? JSON.stringify(input.meta) : null,
          userAgent: input.userAgent ?? null,
          ipAddress: input.ipAddress ?? null,
        },
      })
      recordId = record.id
    }
  } catch (err) {
    console.error('[track] DB persist failed (best-effort, continuing)', err)
  }

  // Fan out best-effort. PII is SHA-256 hashed (lowercased + trimmed) so the
  // Conversions APIs can match events to known users — see hashPII() above.
  const user = {
    email: await hashPII(input.email),
    phone: await hashPII(input.phone),
    name: await hashPII(input.name),
    fbp: input.fbp,
    fbc: input.fbc,
    clientUserAgent: input.userAgent,
    clientIpAddress: input.ipAddress,
  }

  const names = EVENT_NAME_MAP[input.type] ?? {}

  await Promise.allSettled([
    sendToGA4(input, names.ga4 ?? input.type),
    sendToFacebook(input, names.fb ?? input.type, user),
    sendToTikTok(input, names.tt ?? input.type, user),
    sendToSnapchat(input, names.snap ?? input.type, user),
  ])

  return { id: recordId ?? 'pending' }
}

async function sendToGA4(input: TrackingEventInput, name: string): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!measurementId || !apiSecret) return
  try {
    const clientId = input.meta?.client_id || 'anonymous'
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name,
            params: {
              page_location: input.page,
              source: input.source,
              value: input.value,
              currency: input.currency ?? 'BDT',
            },
          },
        ],
      }),
    })
  } catch {
    /* swallow */
  }
}

async function sendToFacebook(
  input: TrackingEventInput,
  name: string,
  user: Record<string, unknown>,
): Promise<void> {
  const pixelId = process.env.FB_PIXEL_ID
  const token = process.env.FB_ACCESS_TOKEN
  if (!pixelId || !token) return
  try {
    await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: name,
            event_time: Math.floor(nowMs() / 1000),
            action_source: 'website',
            event_source_url: input.page,
            user_data: user,
            custom_data: {
              currency: input.currency ?? 'BDT',
              value: input.value,
              source: input.source,
            },
          },
        ],
      }),
    })
  } catch {
    /* swallow */
  }
}

async function sendToTikTok(
  input: TrackingEventInput,
  name: string,
  user: Record<string, unknown>,
): Promise<void> {
  const pixelId = process.env.TIKTOK_PIXEL_ID
  const token = process.env.TIKTOK_ACCESS_TOKEN
  if (!pixelId || !token) return
  try {
    await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token,
      },
      body: JSON.stringify({
        pixel_code: pixelId,
        event: name,
        event_time: Math.floor(nowMs() / 1000),
        context: {
          page: { url: input.page },
          user,
        },
        properties: {
          currency: input.currency ?? 'BDT',
          value: input.value,
        },
      }),
    })
  } catch {
    /* swallow */
  }
}

async function sendToSnapchat(
  input: TrackingEventInput,
  name: string,
  user: Record<string, unknown>,
): Promise<void> {
  const pixelId = process.env.SNAPCHAT_PIXEL_ID
  const token = process.env.SNAPCHAT_ACCESS_TOKEN
  if (!pixelId || !token) return
  try {
    await fetch(`https://tr.snapchat.com/v3/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          event_name: name,
          event_time: Math.floor(nowMs() / 1000),
          action_source: 'WEB',
          event_source_url: input.page,
          user_data: user,
          custom_data: {
            currency: input.currency ?? 'BDT',
            value: input.value,
          },
        },
      ]),
    })
  } catch {
    /* swallow */
  }
}

/**
 * Aggregate stats — cached for 60s.
 *
 * Resilient: returns empty stats if `db.trackingEvent` is unavailable
 * (e.g. dev server hasn't reloaded Prisma client yet).
 */
export async function getTrackingStats(): Promise<{
  total: number
  byType: Record<string, number>
  bySource: Record<string, number>
  last24h: number
}> {
  const cacheKey = 'tracking:stats'
  const cached = cacheGet<ReturnType<typeof getTrackingStats>>(cacheKey)
  if (cached) return cached

  const empty = { total: 0, byType: {}, bySource: {}, last24h: 0 }
  if (!db.trackingEvent) {
    cacheSet(cacheKey, empty, 30)
    return empty
  }

  try {
    const all = await db.trackingEvent.findMany({
      select: { type: true, source: true, createdAt: true },
    })

    const byType: Record<string, number> = {}
    const bySource: Record<string, number> = {}
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000
    let last24h = 0
    for (const e of all) {
      byType[e.type] = (byType[e.type] ?? 0) + 1
      bySource[e.source ?? 'unknown'] = (bySource[e.source ?? 'unknown'] ?? 0) + 1
      if (e.createdAt.getTime() > dayAgo) last24h++
    }

    const stats = { total: all.length, byType, bySource, last24h }
    cacheSet(cacheKey, stats, 60)
    return stats
  } catch (err) {
    console.error('[track] stats query failed', err)
    cacheSet(cacheKey, empty, 30)
    return empty
  }
}
