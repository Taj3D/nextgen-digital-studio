/**
 * In-memory per-identifier rate limiter (fixed-window).
 *
 * Why this exists (AUDIT-4-api [API-019] + MASTER-PLAN Step 16):
 *   Every public POST endpoint previously had ZERO throttling. A spammer
 *   could submit thousands of fake leads / exhaust the AI chat budget /
 *   pollute the newsletter table / DOS the tracking endpoint with no
 *   resistance. This module provides a simple dependency-free limiter that
 *   is good enough for single-instance deploys (Vercel hobby / fly.io
 *   single-machine / self-hosted). For multi-instance prod, swap the
 *   in-memory `Map` for Redis (`@upstash/ratelimit`) — the public API of
 *   `rateLimit()` is async-friendly and trivial to migrate.
 *
 * Limits (intentionally generous — real humans never hit them):
 *   /api/contact     → 10 / min / IP   (form submit + retry)
 *   /api/book-call   → 10 / min / IP   (same shape as /contact)
 *   /api/chat-agent  → 20 / min / IP   (chat is bursty)
 *   /api/newsletter  → 5  / min / IP   (one-shot subscribe)
 *
 * Public endpoints only — admin routes are protected by `requireAuth()`.
 */

type RateLimitEntry = {
  count: number
  resetTime: number
}

const requests = new Map<string, RateLimitEntry>()

export type RateLimitResult = {
  ok: boolean
  /** Remaining requests in the current window. 0 when blocked. */
  remaining: number
  /** Milliseconds until the window resets (and the caller may retry). */
  resetIn: number
}

/**
 * Fixed-window rate limiter.
 *
 * @param identifier  Stable key — usually `${routeName}:${ip}` so limits are
 *                    per-route AND per-IP (a spammer hitting /contact doesn't
 *                    burn their /newsletter quota).
 * @param limit       Max requests allowed in the window.
 * @param windowMs    Window length in milliseconds.
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const entry = requests.get(identifier)

  // No entry OR window has elapsed → start a fresh window with count=1.
  if (!entry || now > entry.resetTime) {
    requests.set(identifier, { count: 1, resetTime: now + windowMs })
    return { ok: true, remaining: limit - 1, resetIn: windowMs }
  }

  // Over the limit → block (do NOT increment — the slot is reserved for
  // legitimate requests only).
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetIn: entry.resetTime - now }
  }

  // Under the limit → allow and bump the counter.
  entry.count++
  return { ok: true, remaining: limit - entry.count, resetIn: entry.resetTime - now }
}

/**
 * Extract the client IP from request headers. Falls back to "unknown"
 * (which becomes a single shared bucket — acceptable for dev).
 *
 * Order of precedence:
 *   1. `x-forwarded-for` (first IP in the comma-list) — set by Vercel,
 *      Cloudflare, nginx, etc.
 *   2. `x-real-ip` — set by some proxies (notably nginx when configured).
 *   3. "unknown" — last-resort shared bucket.
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIP = req.headers.get('x-real-ip')
  if (realIP) return realIP.trim()
  return 'unknown'
}

/**
 * Periodic eviction of expired entries to keep the Map bounded in long-running
 * processes. Called lazily on every `rateLimit()` check via the `now > resetTime`
 * branch above, but exposed here in case a caller wants to force-clean.
 */
export function purgeExpiredRateLimitEntries(): number {
  const now = Date.now()
  let purged = 0
  for (const [key, entry] of requests) {
    if (now > entry.resetTime) {
      requests.delete(key)
      purged++
    }
  }
  return purged
}
