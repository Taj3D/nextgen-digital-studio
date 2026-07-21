/**
 * Centralized lead email helper.
 *
 * DELIVERY PATH (in priority order):
 *   1. SMTP via `email-smtp.ts` (nodemailer + Gmail App Password) — PRIMARY.
 *      Higher quota (Gmail 500/day), proper error surfacing, no Apps Script
 *      re-authorization hassle.
 *   2. Google Apps Script webhook (google-sheets.ts → doPost → MailApp) —
 *      SECONDARY fallback. Triggered automatically as part of the Sheets
 *      sync, so if SMTP is down, emails still go out via the webhook.
 *   3. Console log + TrackingEvent persistence — TERTIARY audit trail. If
 *      both SMTP and Apps Script fail, the formatted body is still saved
 *      so an operator can manually resend from the CRM.
 *
 * Why the audit trail still exists:
 *   1. Server-side visibility — when a lead arrives, we log the formatted
 *      email body to the server console (with ✅ / ❌ icons) so devs can
 *      verify the payload in `bun run dev` output without opening Gmail.
 *   2. Audit trail — every email attempt is persisted as a TrackingEvent
 *      row (type='email') so the admin dashboard can show "email sent at
 *      <timestamp>" alongside the lead.
 *   3. Resilience — if both SMTP and the Apps Script webhook are down, an
 *      operator can manually resend from the CRM using the saved body.
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
import { sendSmtpEmail, isSmtpConfigured } from '@/lib/email-smtp'

/** Generic email payload accepted by `sendEmail`. */
export interface EmailPayload {
  /** Recipient email address. */
  to: string
  /** Email subject line. */
  subject: string
  /** Plain-text email body — required for maximum deliverability. */
  body: string
  /** Optional HTML body — renders nicely in Gmail/Outlook. */
  html?: string
  /** Optional lead ID for cross-referencing in the CRM. */
  leadId?: string
  /** Lead source (e.g. `contact_form`, `strategy_call`). */
  source?: string
  /** Optional metadata to persist alongside (e.g. SMTP send status). */
  meta?: Record<string, unknown>
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
          html: payload.html ?? null,
          leadId: payload.leadId ?? null,
          loggedAt: new Date().toISOString(),
          ...(payload.meta ?? {}),
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
 * Escape HTML special characters to prevent injection in email templates.
 *
 * Used by `getCustomerConfirmationTemplate` and `getOwnerNotificationTemplate`
 * to safely embed user-supplied data (name, email, message) into the HTML
 * email body. Without this, a malicious user could submit `<script>...</script>`
 * as their name and inject it into the owner notification email.
 */
function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Convert plain-text email body to a simple HTML representation.
 *
 * Used as a fallback when no explicit HTML template is provided. Preserves
 * line breaks and escapes HTML special characters to prevent injection.
 */
function textToHtml(text: string): string {
  const escaped = escapeHtml(text)
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans Bengali', sans-serif; font-size: 15px; line-height: 1.65; color: #1f2937; max-width: 560px; margin: 0 auto; padding: 24px;">${escaped
    .split(/\n\n+/)
    .map((p) => `<p style="margin: 0 0 14px 0;">${p.replace(/\n/g, '<br />')}</p>`)
    .join('')}</div>`
}

/**
 * Build the bilingual customer confirmation email template.
 *
 * Sent to the lead's email address immediately after they submit a contact
 * form or book a strategy call. Mirrors the template the Apps Script webhook
 * sends, so customers receive a consistent experience whether the webhook
 * fires or SMTP delivers it directly.
 *
 * @param name    Customer's display name (used in greeting).
 * @param service Optional service they enquired about (shown in body).
 * @returns `{ subject, body, html }` template (plain-text + HTML).
 */
export function getCustomerConfirmationTemplate(
  name: string,
  service?: string,
): { subject: string; body: string; html: string } {
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

  const serviceHtml = service
    ? `<p style="margin: 0 0 14px 0; padding: 12px 16px; background: #f3f4f6; border-radius: 8px;">📌 <strong>সার্ভিস:</strong> ${escapeHtml(service)}<br />📌 <strong>Service:</strong> ${escapeHtml(service)}</p>`
    : ''

  const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans Bengali', sans-serif; font-size: 15px; line-height: 1.65; color: #1f2937; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 22px;">✅ Request Received</h1>
    <p style="color: #d1fae5; margin: 8px 0 0 0; font-size: 14px;">NextGen Digital Studio</p>
  </div>
  <p style="margin: 0 0 14px 0;">প্রিয় <strong>${escapeHtml(name)}</strong>,</p>
  <p style="margin: 0 0 14px 0;">আপনার অর্ডার গ্রহণ করা হয়েছে! ধন্যবাদ আমাদের যোগাযোগ করার জন্য। আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।</p>
  ${serviceHtml}
  <p style="margin: 0 0 14px 0;">আমরা শীঘ্রই ফিরে আসবো। 🚀</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
  <p style="margin: 0 0 14px 0;">Dear <strong>${escapeHtml(name)}</strong>,</p>
  <p style="margin: 0 0 14px 0;">We have received your request! Thank you for reaching out. Our team will contact you within 24 hours.</p>
  ${serviceHtml}
  <p style="margin: 0 0 14px 0;">We'll be in touch soon. 🚀</p>
  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
    <p style="margin: 0 0 4px 0;"><strong>— NextGen Digital Studio Team</strong></p>
    <p style="margin: 0 0 4px 0;">📞 +880 1711-731354</p>
    <p style="margin: 0;">✉️ nextgendigitalstudio1@gmail.com</p>
  </div>
</div>`

  return {
    subject: '✅ আপনার অর্ডার গ্রহণ করা হয়েছে — NextGen Digital Studio',
    body,
    html,
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
 * @returns `{ subject, body, html }` template (plain-text + HTML).
 */
export function getOwnerNotificationTemplate(params: {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  message?: string
  source: string
}): { subject: string; body: string; html: string } {
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

  const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans Bengali', sans-serif; font-size: 15px; line-height: 1.65; color: #1f2937; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); padding: 20px 24px; border-radius: 12px; margin-bottom: 20px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🔔 নতুন লিড / New Lead</h1>
    <p style="color: #fef3c7; margin: 6px 0 0 0; font-size: 14px;">Source: ${escapeHtml(params.source)}</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="padding: 8px 0; color: #6b7280; width: 120px; vertical-align: top;">নাম / Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(params.name)}</td></tr>
    <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">ইমেইল / Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(params.email)}" style="color: #059669; text-decoration: none;">${escapeHtml(params.email)}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">ফোন / Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(params.phone.replace(/\s/g, ''))}" style="color: #059669; text-decoration: none;">${escapeHtml(params.phone)}</a></td></tr>
    ${params.company ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">কোম্পানি / Company</td><td style="padding: 8px 0;">${escapeHtml(params.company)}</td></tr>` : ''}
    ${params.service ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">সার্ভিস / Service</td><td style="padding: 8px 0;">${escapeHtml(params.service)}</td></tr>` : ''}
    <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">উৎস / Source</td><td style="padding: 8px 0;">${escapeHtml(params.source)}</td></tr>
    <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">সময় / Time</td><td style="padding: 8px 0;">${escapeHtml(new Date().toISOString())}</td></tr>
  </table>
  ${params.message ? `<div style="margin-top: 16px; padding: 14px 16px; background: #f9fafb; border-left: 3px solid #059669; border-radius: 4px;"><div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">মেসেজ / Message</div><div style="white-space: pre-wrap;">${escapeHtml(params.message)}</div></div>` : ''}
  <div style="margin-top: 20px; padding: 12px 16px; background: #fef3c7; border-radius: 6px; font-size: 13px; color: #92400e;">
    ⚠️ এই লিডটি Google Sheets-এ সংরক্ষিত হয়েছে এবং CRM ড্যাশবোর্ডে দেখা যাবে।<br />This lead has been saved to Google Sheets and is visible in the CRM dashboard.
  </div>
</div>`

  return {
    subject: `🔔 নতুন লিড: ${params.source} — ${params.name}`,
    body,
    html,
  }
}

/**
 * Generic email sender — sends via SMTP (primary) + logs to console +
 * persists to TrackingEvent (audit trail).
 *
 * This is the low-level primitive used by `sendCustomerConfirmationEmail`
 * and `sendOwnerNotificationEmail`. Exposed publicly so future email flows
 * (newsletter welcome, audit report delivery, etc.) can reuse the same
 * delivery + logging + persistence pipeline without duplicating boilerplate.
 *
 * Delivery priority:
 *   1. SMTP (nodemailer + Gmail App Password) — if configured.
 *   2. Logging only — if SMTP not configured. Apps Script webhook (called
 *      separately by google-sheets.ts) handles the actual send in that case.
 *
 * NEVER throws — all errors are caught and returned as `{ success: false }`.
 *
 * @param payload Email to send.
 * @returns `EmailResult` with success flag, message, and TrackingEvent row ID.
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

    // 2) Send via SMTP (primary delivery path).
    let smtpOk = false
    let smtpMessage = 'SMTP not configured — falling back to Apps Script webhook'
    if (isSmtpConfigured()) {
      const html = payload.html ?? textToHtml(payload.body)
      const r = await sendSmtpEmail({
        to: payload.to,
        subject: payload.subject,
        text: payload.body,
        html,
        source: payload.source,
      })
      if (r.skipped) {
        smtpMessage = 'SMTP skipped (not configured)'
      } else if (r.success) {
        smtpOk = true
        smtpMessage = `SMTP delivered (id ${r.messageId ?? 'n/a'})`
      } else {
        smtpMessage = `SMTP failed: ${r.error ?? 'unknown error'}`
        console.error(`❌ [email-lead] SMTP error for ${payload.to}:`, r.error)
      }
    }

    // 3) Persist to TrackingEvent table for audit trail.
    //    Store SMTP status in meta so the admin dashboard can show whether
    //    the email actually went out or just got logged.
    const messageId = await persistEmailEvent({
      ...payload,
      meta: { smtpOk, smtpMessage },
    })

    return {
      success: smtpOk,
      message: smtpOk
        ? `${smtpMessage}${messageId ? ` | event ${messageId}` : ''}`
        : `${smtpMessage}${messageId ? ` | logged as event ${messageId}` : ''}`,
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
 * is sent via SMTP (primary), then logged + persisted as a TrackingEvent
 * (type='email') for audit. If SMTP isn't configured, delivery falls back
 * to the Google Apps Script webhook (see `src/lib/google-sheets.ts`).
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
    const { subject, body, html } = getCustomerConfirmationTemplate(params.name, params.service)
    return sendEmail({
      to: params.email,
      subject,
      body,
      html,
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
 * visibility of new leads. Sent via SMTP (primary) with Apps Script webhook
 * as fallback. Always logged + persisted as a TrackingEvent audit row.
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
    const { subject, body, html } = getOwnerNotificationTemplate(params)
    return sendEmail({
      to: siteConfig.email,
      subject,
      body,
      html,
      source: params.source,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('❌ [email-lead] sendOwnerNotificationEmail failed:', msg)
    return { success: false, message: `Owner notification failed: ${msg}` }
  }
}
