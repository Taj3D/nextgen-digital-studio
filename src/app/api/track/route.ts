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
    const body = await req.json().catch(() => ({}))
    const type = String(body.type ?? '') as TrackingEventType
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 })
    }
    const { id } = await trackEvent({
      type,
      page: body.page ? String(body.page) : undefined,
      source: body.source ? String(body.source) : undefined,
      email: body.email ? String(body.email) : undefined,
      phone: body.phone ? String(body.phone) : undefined,
      name: body.name ? String(body.name) : undefined,
      value: typeof body.value === 'number' ? body.value : undefined,
      currency: body.currency ? String(body.currency) : undefined,
      meta: typeof body.meta === 'object' && body.meta ? body.meta : undefined,
      userAgent: req.headers.get('user-agent') ?? undefined,
      ipAddress: getClientIp(req),
      fbp: body.fbp ? String(body.fbp) : undefined,
      fbc: body.fbc ? String(body.fbc) : undefined,
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
