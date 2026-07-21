/**
 * Centralized lead email helper.
 *
 * This module is a FALLBACK / LOGGING layer — it does NOT send real emails.
 * The actual email delivery is handled by the Google Apps Script webhook
 * (GOOGLE_SHEETS_WEBHOOK_URL), which calls `MailApp.sendEmail()` when a lead
 * row is appended to the Google Sheet. See `src/lib/google-sheets.ts`.
 *
 * Why this exists:
 *   1. Server-side visibility — when a lead arrives, we log the formatted
 *      email body to the server console (with ✅ / ❌ icons) so devs can
 *      verify the webhook payload in `bun run dev` output without opening
 *      Gmail.
 *   2. Audit trail — every email attempt is persisted as a TrackingEvent
 *      row (type='email') so the admin dashboard can show "email sent at
 *      <timestamp>" alongside the lead.
 *   3. Resilience — if the Apps Script webhook is down or hasn't been
 *      redeployed after a template change, this module's templates still
 *      produce the exact same body the webhook would have sent, so an
 *      operator can manually resend from the CRM if needed.
 *
 * Design rules:
 *   - NEVER throw. All functions return an `EmailResult`.
 *   - Persistence is best-effort: if the DB is unavailable (e.g. Prisma
 *     client hasn't been regenerated after schema change), we still log
 *     to console and return success.
 *   - Templates are bilingual (Bengali + English) to match the site's
 *     language toggle and the Apps Script's existing format.
 */

import { db } from '@/lib/db'
import { siteConfig } from '@/lib/site-data'

/** Generic email payload accepted by `sendEmail`. */
export interface EmailPayload {
  /** Recipient email address. */
  to: string
  /** Email subject line. */
  subject: string
  /** Plain-text email body. */
  body: string
  /** Optional lead ID for cross-referencing in the CRM. */
  leadId?: string
  /** Lead source (e.g. `contact_form`, `strategy_call`). */
  source?: string
}

/** Structured return value for all email functions. */
export interface EmailResult {
  /** `true` if the email was logged + persisted without errors. */
  success: boolean
  /** Human-readable status message (safe to log or return to caller). */
  message: string
  /** TrackingEvent row ID (or undefined if persistence was skipped). */
  messageId?: string
}

/**
 * Persist an email attempt to the TrackingEvent table.
 *
 * Stores the full subject + body as JSON in the `meta` column so the admin
 * dashboard can render a "view email" preview. Best-effort: failures are
 * swallowed and logged — they never propagate to the caller.
 */
async function persistEmailEvent(payload: EmailPayload): Promise<string | undefined> {
  try {
    // Defensive: in dev, Turbopack may cache @prisma/client from before
    // TrackingEvent existed. Same pattern as src/lib/tracking.ts.
    if (!db.trackingEvent) return undefined
    const record = await db.trackingEvent.create({
      data: {
        type: 'email',
        page: '',
        source: payload.source ?? 'email',
        email: payload.to,
        name: null,
        value: null,
        currency: 'BDT',
        meta: JSON.stringify({
          subject: payload.subject,
          body: payload.body,
          leadId: payload.leadId ?? null,
          loggedAt: new Date().toISOString(),
        }),
        userAgent: null,
        ipAddress: null,
      },
    })
    return record.id
  } catch (err) {
    console.error('[email-lead] DB persist failed (best-effort, continuing)', err)
    return undefined
  }
}

/**
 * Build the bilingual customer confirmation email template.
 *
 * Sent to the lead's email address immediately after they submit a contact
 * form or book a strategy call. Mirrors the template the Apps Script webhook
 * sends, so customers receive a consistent experience whether the webhook
 * fires or a developer manually resends.
 *
 * @param name    Customer's display name (used in greeting).
 * @param service Optional service they enquired about (shown in body).
 * @returns `{ subject, body }` plain-text template.
 */
export function getCustomerConfirmationTemplate(
  name: string,
  service?: string,
): { subject: string; body: string } {
  const serviceLine = service
    ? `📌 সার্ভিস: ${service}\n📌 Service: ${service}\n`
    : ''

  const body = `প্রিয় ${name},

আপনার অর্ডার গ্রহণ করা হয়েছে! ধন্যবাদ আমাদের যোগাযোগ করার জন্য। আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।

${serviceLine}আমরা শীঘ্রই ফিরে আসবো। 🚀

— NextGen Digital Studio টিম
📞 +880 1711-731354
✉️ nextgendigitalstudio1@gmail.com

---

Dear ${name},

We have received your request! Thank you for reaching out. Our team will contact you within 24 hours.

${serviceLine}We'll be in touch soon. 🚀

— NextGen Digital Studio Team
📞 +880 1711-731354
✉️ nextgendigitalstudio1@gmail.com`

  return {
    subject: '✅ আপনার অর্ডার গ্রহণ করা হয়েছে — NextGen Digital Studio',
    body,
  }
}

/**
 * Build the bilingual owner notification email template.
 *
 * Sent to the site owner (siteConfig.email) when a new lead arrives so they
 * can follow up immediately. Includes all lead fields + the source for
 * attribution.
 *
 * @param params Lead details (name, email, phone, company, service, message, source).
 * @returns `{ subject, body }` plain-text template.
 */
export function getOwnerNotificationTemplate(params: {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  message?: string
  source: string
}): { subject: string; body: string } {
  const companyLine = params.company
    ? `কোম্পানি / Company: ${params.company}\n`
    : ''
  const serviceLine = params.service
    ? `সার্ভিস / Service: ${params.service}\n`
    : ''
  const messageLine = params.message
    ? `মেসেজ / Message:\n${params.message}\n`
    : ''

  const body = `🔔 নতুন লিড এসেছে! দ্রুত ফলোআপ করুন।

নাম / Name: ${params.name}
ইমেইল / Email: ${params.email}
ফোন / Phone: ${params.phone}
${companyLine}${serviceLine}উৎস / Source: ${params.source}
সময় / Time: ${new Date().toISOString()}

${messageLine}
—
বিঃদ্রঃ: এই লিডটি Google Sheets-এ সংরক্ষিত হয়েছে এবং CRM ড্যাশবোর্ডে দেখা যাবে।

---

🔔 New lead received! Follow up promptly.

Name: ${params.name}
Email: ${params.email}
Phone: ${params.phone}
${companyLine}${serviceLine}Source: ${params.source}
Time: ${new Date().toISOString()}

${messageLine}
—
Note: This lead has been saved to Google Sheets and is visible in the CRM dashboard.`

  return {
    subject: `🔔 নতুন লিড: ${params.source} — ${params.name}`,
    body,
  }
}

/**
 * Generic email sender — logs to console + persists to TrackingEvent.
 *
 * This is the low-level primitive used by `sendCustomerConfirmationEmail`
 * and `sendOwnerNotificationEmail`. Exposed publicly so future email flows
 * (newsletter welcome, audit report delivery, etc.) can reuse the same
 * logging + persistence pipeline without duplicating boilerplate.
 *
 * NEVER throws — all errors are caught and returned as `{ success: false }`.
 *
 * @param payload Email to "send" (actually log + persist).
 * @returns `EmailResult` with success flag and TrackingEvent row ID.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  try {
    // 1) Console log with clear formatting so devs can verify the email
    //    body in `bun run dev` output without opening Gmail.
    console.log('────────────────────────────────────────────────────────')
    console.log(`✅ [email-lead] TO: ${payload.to}`)
    console.log(`✅ [email-lead] SUBJECT: ${payload.subject}`)
    if (payload.source) console.log(`✅ [email-lead] SOURCE: ${payload.source}`)
    if (payload.leadId) console.log(`✅ [email-lead] LEAD ID: ${payload.leadId}`)
    console.log('✅ [email-lead] BODY:')
    console.log(payload.body)
    console.log('────────────────────────────────────────────────────────')

    // 2) Persist to TrackingEvent table for audit trail.
    const messageId = await persistEmailEvent(payload)

    return {
      success: true,
      message: messageId
        ? `Email logged + persisted (event ${messageId})`
        : 'Email logged (DB persistence skipped)',
      messageId,
    }
  } catch (err) {
    // Defensive — persistEmailEvent already swallows errors, but if the
    // console.log itself throws (very unlikely), we still return a result.
    const msg = err instanceof Error ? err.message : String(err)
    console.error('❌ [email-lead] sendEmail failed:', msg)
    return { success: false, message: `Email send failed: ${msg}` }
  }
}

/**
 * Send the customer confirmation email (bilingual Bengali + English).
 *
 * Call this from `/api/contact`, `/api/book-call`, or any other lead-capture
 * route after the lead has been saved to the DB + Google Sheets. The email
 * is logged to console + persisted as a TrackingEvent (type='email') for
 * audit purposes. The actual delivery to the customer's inbox is handled by
 * the Google Apps Script webhook (see `src/lib/google-sheets.ts`).
 *
 * NEVER throws.
 *
 * @param params `{ name, email, phone, service?, source? }`
 * @returns `EmailResult`
 */
export async function sendCustomerConfirmationEmail(params: {
  name: string
  email: string
  phone: string
  service?: string
  source?: string
}): Promise<EmailResult> {
  try {
    const { subject, body } = getCustomerConfirmationTemplate(params.name, params.service)
    return sendEmail({
      to: params.email,
      subject,
      body,
      source: params.source ?? 'customer_confirmation',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('❌ [email-lead] sendCustomerConfirmationEmail failed:', msg)
    return { success: false, message: `Customer confirmation failed: ${msg}` }
  }
}

/**
 * Send the owner notification email (bilingual Bengali + English).
 *
 * Recipient is always `siteConfig.email` (the agency's Gmail address).
 * Call this from any lead-capture route so the owner gets immediate
 * visibility of new leads — the Google Apps Script webhook handles the
 * actual delivery, this function provides server-side logging + a
 * TrackingEvent audit row.
 *
 * NEVER throws.
 *
 * @param params `{ name, email, phone, company?, service?, message?, source }`
 * @returns `EmailResult`
 */
export async function sendOwnerNotificationEmail(params: {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  message?: string
  source: string
}): Promise<EmailResult> {
  try {
    const { subject, body } = getOwnerNotificationTemplate(params)
    return sendEmail({
      to: siteConfig.email,
      subject,
      body,
      source: params.source,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('❌ [email-lead] sendOwnerNotificationEmail failed:', msg)
    return { success: false, message: `Owner notification failed: ${msg}` }
  }
}
