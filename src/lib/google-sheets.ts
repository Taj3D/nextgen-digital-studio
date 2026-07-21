/**
 * Google Sheets sync — pushes lead rows to a Google Sheet via a Google Apps
 * Script Web App webhook (no OAuth needed).
 *
 * Setup:
 *   1. Create a Google Sheet with header row: Date, Name, Email, Phone, Company, Service, Source, Message
 *   2. Extensions → Apps Script, paste:
 *        function doPost(e) {
 *          const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *          const data = JSON.parse(e.postData.contents);
 *          sheet.appendRow([new Date(), data.name, data.email, data.phone, data.company, data.service, data.source, data.message]);
 *          return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
 *        }
 *   3. Deploy → New deployment → Web app → Anyone access → copy URL.
 *   4. Set GOOGLE_SHEETS_WEBHOOK_URL in .env.
 *
 * Best-effort: failures are logged but never throw.
 */
export type LeadRow = {
  name: string
  email: string
  phone: string
  company?: string | null
  service?: string | null
  source: string
  message?: string | null
  meta?: Record<string, unknown> | null
  leadId?: string
  submittedAt?: string
}

/**
 * Result of a Google Sheets webhook call.
 *
 * The Apps Script webhook now returns a richer response that includes
 * per-recipient email delivery status. We surface that so the API route
 * can include it in the response — this lets the admin dashboard show
 * whether emails actually went out from the Apps Script side (the SMTP
 * side is tracked separately via email-lead.ts).
 */
export interface SheetsResult {
  ok: boolean
  error?: string
  /** Parsed JSON response from Apps Script (when ok). */
  response?: {
    ok?: boolean
    sheetRow?: number
    customerEmail?: { sent?: boolean; error?: string | null }
    ownerEmail?: { sent?: boolean; error?: string | null }
    [k: string]: unknown
  }
}

export async function sendToGoogleSheets(row: LeadRow): Promise<SheetsResult> {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhook) {
    return { ok: false, error: 'GOOGLE_SHEETS_WEBHOOK_URL not configured' }
  }

  try {
    // Apps Script Web Apps return 302 redirect on POST.
    // Use redirect: 'follow' to follow the redirect to the actual response.
    // Use text/plain content type to avoid CORS preflight (Apps Script doesn't handle OPTIONS).
    // AbortController timeout: Apps Script free tier can hang up to 6 min; we cap at 15s
    // so a stuck webhook doesn't block the lead flow (it's fire-and-forget anyway).
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
      signal: controller.signal,
      body: JSON.stringify({
        date: new Date().toISOString(),
        name: row.name,
        email: row.email,
        phone: row.phone,
        company: row.company ?? '',
        service: row.service ?? '',
        source: row.source,
        message: row.message ?? '',
        status: 'new',
        leadId: row.leadId ?? '',
        submittedAt: row.submittedAt ?? '',
        ...(row.meta ?? {}),
      }),
    });
    clearTimeout(timeout);

    // Apps Script returns 200 after redirect follows. BUT: if the Apps Script
    // deployment is broken (no doPost handler, or "Anyone" access not set),
    // the redirect target (script.googleusercontent.com) returns a 200 HTML
    // "page not found" page. We need to detect this false-positive by checking
    // the response content type + body.
    const text = await res.text().catch(() => '')

    // Check 1: HTTP status must be 200-299
    if (!res.ok) {
      console.error('[google-sheets] HTTP error', res.status, text.slice(0, 200))
      return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` }
    }

    // Check 2: Response must be JSON (Apps Script returns JSON via ContentService).
    // If it's HTML, the webhook is broken (redirected to a Google error page).
    const contentType = res.headers.get('content-type') ?? ''
    if (contentType.includes('text/html') || text.trimStart().startsWith('<!DOCTYPE') || text.trimStart().startsWith('<html')) {
      console.error('[google-sheets] Webhook returned HTML (not JSON) — Apps Script deployment is broken. Response:', text.slice(0, 200))
      return {
        ok: false,
        error: 'Webhook returned HTML instead of JSON. The Apps Script deployment needs a doPost(e) handler with "Anyone" access. See src/lib/google-sheets.ts header comment for setup instructions.',
      }
    }

    // Check 3: If JSON, verify it contains {ok: true} (Apps Script convention).
    // Some deployments return {status: 'success'} — accept both.
    // We also surface the full parsed response so callers can read the
    // per-recipient email status returned by the Apps Script webhook.
    try {
      const json = JSON.parse(text)
      if (json.ok === true || json.status === 'success' || json.result === 'success') {
        // Log email delivery status from Apps Script for debugging.
        if (json.customerEmail || json.ownerEmail) {
          console.log(
            `[google-sheets] Apps Script email status:`,
            `customer=${JSON.stringify(json.customerEmail)}`,
            `owner=${JSON.stringify(json.ownerEmail)}`,
          )
        }
        return { ok: true, response: json }
      }
      console.error('[google-sheets] Unexpected JSON response:', text.slice(0, 200))
      return { ok: false, error: `Unexpected JSON response: ${text.slice(0, 200)}` }
    } catch {
      // Not valid JSON — treat as failure
      console.error('[google-sheets] Non-JSON response:', text.slice(0, 200))
      return { ok: false, error: `Non-JSON response: ${text.slice(0, 200)}` }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[google-sheets] error', msg)
    return { ok: false, error: msg }
  }
}
