/**
 * Lead source allowlist + normalization.
 *
 * The `source` field on leads is used to attribute conversions in the CRM
 * dashboard + ad-platform Conversions API. Without an allowlist, random
 * strings from curl tests / bots pollute analytics (we already had 13+
 * garbage sources like "god_mode_final", "premium_font_check", etc).
 *
 * Validation policy: NEVER reject a request because of an unknown source
 * (could break legitimate traffic). Instead, normalize to "contact_form".
 */

export const LEAD_SOURCES = new Set<string>([
  'homepage_lead_form',
  'ai_training_page',
  'cnc_training_page',
  'cnc_design_page',
  '3d_portrait_page',
  'pdf_books_page',
  'founder_page',
  'strategy_call',
  'ai_audit_tool',
  'free_tools_download',
  'ai_chat_widget',
  'careers_application',
  'contact_form',
  'newsletter',
  'audit_test',
])

/**
 * Returns true if the given source string is in the allowlist OR matches
 * the `service_*` prefix pattern (used by service detail pages).
 */
export function isValidSource(source: string): boolean {
  if (!source) return false
  if (LEAD_SOURCES.has(source)) return true
  if (source.startsWith('service_')) return true
  return false
}

/**
 * Normalize a raw source string from the request body.
 *
 * - Trims + lowercases (sources are case-insensitive in our CRM).
 * - Returns the original value if it's in the allowlist (or starts with `service_`).
 * - Otherwise, returns `fallback` (defaults to "contact_form").
 *
 * Never throws. Never returns empty.
 */
export function normalizeSource(
  raw: unknown,
  fallback: string = 'contact_form',
): string {
  if (typeof raw !== 'string') return fallback
  const trimmed = raw.trim()
  if (!trimmed) return fallback
  // Don't lowercase service_* prefixes — they may carry a slug suffix
  // (e.g. "service_ai-training") that we want to preserve. But check the
  // lowercase form against the allowlist for everything else.
  if (trimmed.startsWith('service_')) return trimmed.slice(0, 80)
  const lower = trimmed.toLowerCase()
  if (LEAD_SOURCES.has(lower)) return lower
  return fallback
}
