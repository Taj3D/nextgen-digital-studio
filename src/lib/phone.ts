/**
 * Phone input helpers — Bengali digit support.
 *
 * Problem (AUDIT-5-i18n I18N-022 + MASTER-PLAN Step 16):
 *   The entire UI is bilingual EN/BN, and Bengali users naturally type Bengali
 *   digits (০-৯, U+09E6-U+09EF) into phone fields. The old client-side
 *   `PHONE_RE = /^(\+?880|0)?1[3-9]\d{8}$/` only matched ASCII `[0-9]` (JS
 *   `\d` does NOT match Bengali digits without the `u` flag), so a perfectly
 *   valid Bangladeshi phone typed in Bengali digits would fail validation.
 *
 * Fix:
 *   - Loosen `PHONE_RE` in `lead-form.tsx` to accept Bengali digits + the
 *     usual punctuation (`+`, `-`, spaces, parens).
 *   - On submit (client-side AND server-side), call `normalizePhone()` to
 *     convert Bengali digits → ASCII so the DB and downstream consumers
 *     (Google Sheets, ad-platform Conversions APIs, dedup queries) always
 *     see a consistent ASCII representation.
 */

const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

/**
 * Convert Bengali digits (০-৯) in a string to ASCII digits (0-9).
 * Non-digit characters (including ASCII digits, `+`, spaces, parens, hyphens)
 * are passed through unchanged. Empty/null/undefined input returns "".
 *
 *   normalizePhone('০১৭১১৭৩১৩৫৪') → '01711731354'
 *   normalizePhone('+৮৮০ ১৭১১-১৭৩১৩৫৪') → '+880 1711-1731354'
 *   normalizePhone('01711731354') → '01711731354'  (idempotent)
 */
export function normalizePhone(phone: string | null | undefined): string {
  if (!phone) return ''
  return phone.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
}
