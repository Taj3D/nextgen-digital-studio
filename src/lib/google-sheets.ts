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

export async function sendToGoogleSheets(row: LeadRow): Promise<{ ok: boolean; error?: string }> {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhook) {
    return { ok: false, error: 'GOOGLE_SHEETS_WEBHOOK_URL not configured' }
  }

  try {
    // Apps Script Web Apps return 302 redirect on POST.
    // Use redirect: 'follow' to follow the redirect to the actual response.
    // Use text/plain content type to avoid CORS preflight (Apps Script doesn't handle OPTIONS).
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
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
    })
    // Apps Script returns 200 after redirect follows
    if (res.ok) {
      return { ok: true }
    }
    const text = await res.text().catch(() => '')
    console.error('[google-sheets] HTTP error', res.status, text.slice(0, 200))
    return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[google-sheets] error', msg)
    return { ok: false, error: msg }
  }
}
