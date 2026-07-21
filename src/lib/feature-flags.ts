/**
 * Feature flag system for NextGen Digital Studio.
 *
 * 25 flags across 6 categories (AI, Lead gen, Analytics, UI/UX, Payments,
 * Content). All flags have sensible defaults so the site works with ZERO
 * env configuration — flags only need to be set when you want to override
 * the default.
 *
 * Env var conventions:
 *   - Server-side: `FLAG_<KEY>`     e.g. `FLAG_AI_CHAT_ENABLED=false`
 *   - Client-side: `NEXT_PUBLIC_FLAG_<KEY>`  e.g. `NEXT_PUBLIC_FLAG_AI_CHAT_ENABLED=false`
 *
 * All flags are exposed to the client via NEXT_PUBLIC_ because none of
 * them are secrets — they only gate UI / behavior. Secrets (API keys,
 * tokens) live in their own dedicated env vars and are never exposed.
 *
 * Usage:
 *   - Server Components / API routes / Server Actions:
 *       import { getFlag, isFlagEnabled } from '@/lib/feature-flags'
 *       if (isFlagEnabled('AI_CHAT_ENABLED')) { ... }
 *   - Client Components:
 *       import { useFeatureFlag } from '@/lib/feature-flags'
 *       const enabled = useFeatureFlag('AI_CHAT_ENABLED')
 *
 * Defaults are designed so that production-with-zero-config == full feature
 * set (everything enabled, sensible limits). Disable a feature by setting
 * its env var to `false` (or `0`).
 */

import { useMemo } from 'react'

/** Supported flag value types. */
export type FlagType = 'boolean' | 'string' | 'number'

/** A flag's resolved value (boolean | string | number). */
export type FlagValue = boolean | string | number

/** Static definition of a flag (declared in FEATURE_FLAGS below). */
export interface FlagDefinition {
  type: FlagType
  default: FlagValue
  description: string
}

/**
 * All 25 feature flags. Grouped by category for readability; the `as const`
 * assertion makes the literal types flow through to `FlagKey` so autocomplete
 * works on `getFlag('...')`.
 */
export const FEATURE_FLAGS = {
  // === AI features (5) ===
  AI_CHAT_ENABLED: { type: 'boolean', default: true, description: 'Enable AI chat widget' },
  AI_CHAT_PROVIDER: { type: 'string', default: 'auto', description: 'auto | gemini | z-ai' },
  AI_CHAT_MAX_MESSAGES: { type: 'number', default: 50, description: 'Max messages per session' },
  AI_AUDIT_TOOL_ENABLED: { type: 'boolean', default: true, description: 'Enable AI audit tool' },
  AI_VOICE_AGENT_DEMO: { type: 'boolean', default: false, description: 'Show voice agent demo' },

  // === Lead generation (5) ===
  LEAD_FORM_ENABLED: { type: 'boolean', default: true, description: 'Show lead form' },
  LEAD_DOUBLE_OPTIN: { type: 'boolean', default: false, description: 'Require email confirmation' },
  LEAD_PHONE_REQUIRED: { type: 'boolean', default: true, description: 'Phone field required' },
  LEAD_WEBHOOK_ENABLED: { type: 'boolean', default: true, description: 'Push to Google Sheets' },
  LEAD_WEBHOOK_TIMEOUT_MS: { type: 'number', default: 15000, description: 'Webhook timeout' },

  // === Analytics (4) ===
  ANALYTICS_GA4_ENABLED: { type: 'boolean', default: true, description: 'GA4 client pixel' },
  ANALYTICS_FB_ENABLED: { type: 'boolean', default: true, description: 'Facebook pixel' },
  ANALYTICS_SNAP_ENABLED: { type: 'boolean', default: true, description: 'Snapchat pixel' },
  ANALYTICS_TIKTOK_ENABLED: { type: 'boolean', default: true, description: 'TikTok pixel' },
  ANALYTICS_CAPI_ENABLED: { type: 'boolean', default: false, description: 'Server-side Conversions API' },

  // === UI/UX (5) ===
  UI_DARK_MODE_DEFAULT: { type: 'boolean', default: true, description: 'Default to dark mode' },
  UI_SOCIAL_PROOF_ENABLED: { type: 'boolean', default: true, description: 'Show social proof toasts' },
  UI_STICKY_BOOK_BAR: { type: 'boolean', default: true, description: 'Show sticky book CTA' },
  UI_SCROLL_PROGRESS: { type: 'boolean', default: true, description: 'Show scroll progress bar' },
  UI_FLOATING_WHATSAPP: { type: 'boolean', default: true, description: 'Show WhatsApp float button' },

  // === Payments (3) ===
  PAYMENT_BKASH_ENABLED: { type: 'boolean', default: true, description: 'Accept bKash' },
  PAYMENT_NAGAD_ENABLED: { type: 'boolean', default: true, description: 'Accept Nagad' },
  PAYMENT_STRIPE_ENABLED: { type: 'boolean', default: false, description: 'Accept Stripe (future)' },

  // === Content (3) ===
  CONTENT_BLOG_ENABLED: { type: 'boolean', default: true, description: 'Show blog' },
  CONTENT_CASE_STUDIES_ENABLED: { type: 'boolean', default: true, description: 'Show case studies' },
  CONTENT_NEWSLETTER_ENABLED: { type: 'boolean', default: true, description: 'Show newsletter signup' },
} as const

/** Union type of all flag keys (autocomplete-friendly). */
export type FlagKey = keyof typeof FEATURE_FLAGS

/**
 * Parse a raw env var string into the flag's declared type.
 *
 * - boolean: 'true' | '1' | 'yes' → true; 'false' | '0' | 'no' → false;
 *   anything else (or undefined) → `defaultValue`.
 * - number: parsed via `Number()`; NaN or non-finite → `defaultValue`.
 * - string: returned as-is (trimmed); empty/undefined → `defaultValue`.
 *
 * Pure function — no side effects, never throws.
 */
function parseFlagValue(
  raw: string | undefined,
  type: FlagType,
  defaultValue: FlagValue,
): FlagValue {
  if (raw === undefined || raw === '') return defaultValue

  switch (type) {
    case 'boolean': {
      const lower = raw.trim().toLowerCase()
      if (lower === 'true' || lower === '1' || lower === 'yes') return true
      if (lower === 'false' || lower === '0' || lower === 'no') return false
      return defaultValue
    }
    case 'number': {
      const num = Number(raw)
      if (!Number.isFinite(num)) return defaultValue
      return num
    }
    case 'string':
      return raw.trim() || defaultValue
    default:
      return defaultValue
  }
}

/**
 * Server-side flag reader. Reads from `process.env.FLAG_<KEY>` and falls
 * back to the declared default if the env var is missing or unparseable.
 *
 * Safe to call from any context (Server Components, API routes, Server
 * Actions, client components). On the client, non-`NEXT_PUBLIC_` env vars
 * are inlined as `undefined` by the bundler, so this always returns the
 * default — which is the desired behavior (server-only flags shouldn't
 * leak to the client). For client-visible flags, use `useFeatureFlag()`.
 *
 * @example
 *   const provider = getFlag('AI_CHAT_PROVIDER') as string
 *   if (getFlag('AI_CHAT_ENABLED')) { ... }
 */
export function getFlag(key: FlagKey): FlagValue {
  const def = FEATURE_FLAGS[key]
  if (!def) return false
  const envVarName = `FLAG_${key}`
  const raw = process.env[envVarName]
  return parseFlagValue(raw, def.type, def.default)
}

/**
 * Client-side flag hook. Reads from `process.env.NEXT_PUBLIC_FLAG_<KEY>`
 * (inlined at build time by Next.js). Falls back to the declared default.
 *
 * The value is memoized per key — env vars don't change at runtime, so
 * the hook returns a stable reference across re-renders.
 *
 * ONLY callable from Client Components (functions/hooks starting with
 * `use` are React hooks). Importing from a Server Component is fine, but
 * calling it will throw React's "hooks can only be called inside a
 * Client Component" error.
 *
 * @example
 *   'use client'
 *   import { useFeatureFlag } from '@/lib/feature-flags'
 *   const enabled = useFeatureFlag('AI_CHAT_ENABLED')
 */
export function useFeatureFlag(key: FlagKey): FlagValue {
  return useMemo(() => {
    const def = FEATURE_FLAGS[key]
    if (!def) return false
    const envVarName = `NEXT_PUBLIC_FLAG_${key}`
    // process.env.NEXT_PUBLIC_* values are inlined by Next.js at build time.
    // On the server, this same code path runs but the env var name without
    // NEXT_PUBLIC_ prefix wouldn't be inlined — so server-side callers
    // should use getFlag() instead. We still handle it gracefully here.
    const raw = process.env[envVarName]
    return parseFlagValue(raw, def.type, def.default)
  }, [key])
}

/**
 * Convenience helper for boolean flags. Returns `true` if the flag is
 * truthy (boolean `true` for boolean flags, non-empty string for string
 * flags, non-zero for number flags). For non-boolean flags, prefer
 * `getFlag(key)` to get the typed value directly.
 *
 * @example
 *   if (isFlagEnabled('LEAD_FORM_ENABLED')) { renderForm() }
 */
export function isFlagEnabled(key: FlagKey): boolean {
  const value = getFlag(key)
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value !== 0
  if (typeof value === 'string') return value.trim() !== '' && value.toLowerCase() !== 'false'
  return false
}

/**
 * Returns ALL flag values as a plain object. Used by the admin dashboard
 * to render the full flag state in one call.
 *
 * @example
 *   const all = getAllFlags()
 *   // { AI_CHAT_ENABLED: true, AI_CHAT_PROVIDER: 'auto', ... }
 */
export function getAllFlags(): Record<FlagKey, FlagValue> {
  const result = {} as Record<FlagKey, FlagValue>
  for (const key of Object.keys(FEATURE_FLAGS) as FlagKey[]) {
    result[key] = getFlag(key)
  }
  return result
}

/**
 * Returns the static metadata for a flag (type, default, description).
 * Used by the admin UI to render flag rows with helpful descriptions.
 *
 * @example
 *   const meta = getFlagMetadata('AI_CHAT_ENABLED')
 *   // { type: 'boolean', default: true, description: 'Enable AI chat widget' }
 */
export function getFlagMetadata(key: FlagKey): {
  type: FlagType
  default: FlagValue
  description: string
} {
  const def = FEATURE_FLAGS[key]
  if (!def) {
    return { type: 'boolean', default: false, description: 'Unknown flag' }
  }
  return {
    type: def.type,
    default: def.default,
    description: def.description,
  }
}
