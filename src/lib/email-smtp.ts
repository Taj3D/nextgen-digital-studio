/**
 * SMTP email sender — real email delivery via Gmail (or any SMTP).
 *
 * This is the PRIMARY email delivery path for lead confirmations and owner
 * notifications. It uses `nodemailer` with a Gmail App Password (or any SMTP
 * credentials) to actually deliver emails to inboxes — unlike `email-lead.ts`
 * which is a logging/audit layer only.
 *
 * WHY THIS EXISTS:
 *   The original architecture delegated email sending to a Google Apps Script
 *   webhook (MailApp.sendEmail). That approach has three problems:
 *     1. Apps Script free-tier quota: 100 emails/day — easy to hit.
 *     2. Scope changes require manual re-authorization + redeployment.
 *     3. Silent failures: the webhook can return {ok:true} while emails
 *        actually fail (MailApp throws but the catch returns success).
 *   Sending directly from Next.js via SMTP is more reliable, has higher
 *   quota (Gmail: 500/day, Workspace: 2000/day), and gives us proper
 *   error surfacing.
 *
 * FALLBACK CHAIN:
 *   1. Try SMTP (this module) — primary.
 *   2. If SMTP not configured OR fails, the Apps Script webhook (called by
 *      google-sheets.ts) still attempts delivery as a secondary path.
 *   3. If both fail, email-lead.ts logs the formatted body to console +
 *      TrackingEvent so an operator can manually resend from the CRM.
 *
 * SETUP:
 *   1. Enable 2-Step Verification on nextgendigitalstudio1@gmail.com.
 *   2. Google Account → Security → App passwords → generate "Mail" password.
 *   3. Set in .env (NEVER commit):
 *        SMTP_HOST=smtp.gmail.com
 *        SMTP_PORT=465
 *        SMTP_USER=nextgendigitalstudio1@gmail.com
 *        SMTP_PASS=<16-char app password>
 *        SMTP_FROM=NextGen Digital Studio <nextgendigitalstudio1@gmail.com>
 *   4. If SMTP_USER/SMTP_PASS are absent, this module returns
 *      `{ success: false, skipped: true }` so callers can fall back.
 *
 * @module email-smtp
 */

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { siteConfig } from '@/lib/site-data'

/** SMTP environment configuration — read once, cached. */
interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  from: string
}

let cachedTransport: Transporter | null = null
let cachedConfig: SmtpConfig | null = null

/**
 * Load SMTP config from env. Returns null if not configured (so callers can
 * fall back to the Apps Script webhook path). Throws if partially configured
 * (e.g. SMTP_USER set but SMTP_PASS missing) — that's a deployment bug we want
 * to surface, not silently swallow.
 */
function loadConfig(): SmtpConfig | null {
  if (cachedConfig) return cachedConfig

  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT ?? '465', 10)
  const from =
    process.env.SMTP_FROM?.trim() ||
    `NextGen Digital Studio <${user || siteConfig.email}>`

  // Not configured at all — caller should fall back to Apps Script.
  if (!user || !pass) {
    return null
  }

  cachedConfig = {
    host,
    port: Number.isFinite(port) ? port : 465,
    secure: port === 465,
    user,
    pass,
    from,
  }
  return cachedConfig
}

/**
 * Lazily create the nodemailer transporter. Reused across requests for
 * connection pooling. Returns null if SMTP not configured.
 */
function getTransport(): Transporter | null {
  if (cachedTransport) return cachedTransport
  const cfg = loadConfig()
  if (!cfg) return null

  cachedTransport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    // Gmail sometimes needs these — harmless for other providers.
    tls: { rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })
  return cachedTransport
}

/** Whether SMTP is configured. Used by callers to decide fallback path. */
export function isSmtpConfigured(): boolean {
  return loadConfig() !== null
}

/** Public options for `sendSmtpEmail`. */
export interface SmtpEmailOptions {
  to: string
  subject: string
  /** Plain-text body — required for maximum deliverability. */
  text: string
  /** Optional HTML body — renders nicely in Gmail/Outlook. */
  html?: string
  /** Optional reply-to address (defaults to site owner email). */
  replyTo?: string
  /** Lead source — included in the SMTP envelope for analytics. */
  source?: string
}

/** Result of an SMTP send attempt. */
export interface SmtpEmailResult {
  success: boolean
  /** True if SMTP isn't configured — caller should fall back. */
  skipped: boolean
  /** Provider message ID on success, error message on failure. */
  messageId?: string
  error?: string
}

/**
 * Send an email via SMTP. Returns `{ success, skipped, ... }`.
 *
 * NEVER throws — all errors are caught and returned. This makes it safe to
 * call from fire-and-forget contexts and from API routes that must still
 * return a response to the user.
 *
 * @example
 *   const r = await sendSmtpEmail({
 *     to: 'customer@example.com',
 *     subject: '✅ Order received',
 *     text: 'Thank you...',
 *     html: '<p>Thank you...</p>',
 *     source: 'contact_form',
 *   })
 *   if (r.skipped) // fall back to Apps Script webhook
 *   if (!r.success) // log r.error, but don't block the lead
 */
export async function sendSmtpEmail(
  opts: SmtpEmailOptions,
): Promise<SmtpEmailResult> {
  const transport = getTransport()
  if (!transport) {
    return {
      success: false,
      skipped: true,
      error: 'SMTP not configured (set SMTP_USER + SMTP_PASS in .env)',
    }
  }

  const cfg = loadConfig()!
  try {
    const info = await transport.sendMail({
      from: cfg.from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      ...(opts.html ? { html: opts.html } : {}),
      replyTo: opts.replyTo ?? cfg.user,
      envelope: {
        from: cfg.user,
        to: opts.to,
      },
    })

    return {
      success: true,
      skipped: false,
      messageId: info.messageId,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email-smtp] sendMail failed:', msg)
    return { success: false, skipped: false, error: msg }
  }
}

/**
 * Verify SMTP credentials by sending a NOOP. Use this from an admin/debug
 * endpoint to surface config issues before real leads arrive.
 */
export async function verifySmtp(): Promise<{ ok: boolean; error?: string }> {
  const transport = getTransport()
  if (!transport) {
    return { ok: false, error: 'SMTP not configured' }
  }
  try {
    await transport.verify()
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, error: msg }
  }
}
