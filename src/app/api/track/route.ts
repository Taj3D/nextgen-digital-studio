import { NextResponse } from 'next/server'
import { trackEvent, getTrackingStats, type TrackingEventType } from '@/lib/tracking'

export const runtime = 'nodejs'

const ALLOWED_TYPES: TrackingEventType[] = [
  'page_view',
  'lead',
  'purchase',
  'add_to_cart',
  'begin_checkout',
  'complete_registration',
  'contact',
  'booking',
  'whatsapp_click',
  'social_click',
]

function getClientIp(req: Request): string | undefined {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim()
  return req.headers.get('x-real-ip') ?? undefined
}

export async function POST(req: Request) {
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
    }
    const b = (body ?? {}) as Record<string, unknown>
    const type = String(b.type ?? '') as TrackingEventType
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 })
    }
    const { id } = await trackEvent({
      type,
      page: b.page ? String(b.page) : undefined,
      source: b.source ? String(b.source) : undefined,
      email: b.email ? String(b.email) : undefined,
      phone: b.phone ? String(b.phone) : undefined,
      name: b.name ? String(b.name) : undefined,
      value: typeof b.value === 'number' ? b.value : undefined,
      currency: b.currency ? String(b.currency) : undefined,
      meta: typeof b.meta === 'object' && b.meta ? (b.meta as Record<string, unknown>) : undefined,
      userAgent: req.headers.get('user-agent') ?? undefined,
      ipAddress: getClientIp(req),
      fbp: b.fbp ? String(b.fbp) : undefined,
      fbc: b.fbc ? String(b.fbc) : undefined,
    })
    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('[track] error', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stats = await getTrackingStats()
    return NextResponse.json({ ok: true, ...stats })
  } catch (err) {
    console.error('[track] stats error', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
