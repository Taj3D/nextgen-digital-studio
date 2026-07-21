/**
 * NextGen Digital Studio — Google Apps Script Web App
 * =====================================================
 *
 * PURPOSE
 *   Receives lead form submissions from nextgendigitalstudio.com (via
 *   /api/contact and /api/book-call) and:
 *     1. Appends a row to the linked Google Sheet.
 *     2. Sends a confirmation email to the CUSTOMER.
 *     3. Sends a notification email to the OWNER.
 *
 * USAGE
 *   1. Open your Google Sheet → Extensions → Apps Script.
 *   2. Delete any existing code in Code.gs.
 *   3. Paste this ENTIRE file.
 *   4. Click "Run" → "doPost" once — Google will ask for permissions
 *      (Spreadsheet, Email). Accept ALL of them, otherwise MailApp.sendEmail
 *      silently fails.
 *   5. Click "Deploy" → "New deployment" → type "Web app":
 *        - Description:        NextGen lead webhook v2
 *        - Execute as:         Me (nextgendigitalstudio1@gmail.com)
 *        - Who has access:     Anyone
 *      Click "Deploy", copy the Web app URL, paste it into the project's
 *      .env as GOOGLE_SHEETS_WEBHOOK_URL.
 *   6. If you previously deployed an older version, you MUST redeploy as a
 *      NEW version (Deploy → Manage deployments → Edit → Version: New version)
 *      — changes to the script don't take effect until you create a new
 *      deployment version.
 *
 * DEBUGGING
 *   - If emails don't arrive but rows do: re-run step 4 (authorize MailApp).
 *   - If nothing happens: check Executions tab in Apps Script for errors.
 *   - If response is HTML: deployment is broken — redo step 5.
 *   - Gmail daily quota: 100/day on free accounts, 500/day on Workspace.
 *     If you hit the quota, set SMTP_PASS in the project's .env to send
 *     directly from Next.js instead (500/day Gmail, 2000/day Workspace).
 *   - If you can't find leads in the sheet: the response now includes
 *     spreadsheetName, sheetName, spreadsheetUrl, and rowUrl — use these
 *     to jump straight to the saved row. Leads go to the tab named in
 *     SHEET_TAB_NAME (default 'Leads'), NOT 'Sheet1'.
 *
 * LAST UPDATED: 2026-07-21
 */

/** Owner email — must match siteConfig.email in src/lib/site-data.ts */
var OWNER_EMAIL = 'nextgendigitalstudio1@gmail.com';

/** Sheet tab name. Leave empty to use the active sheet. */
var SHEET_TAB_NAME = 'Leads';

/**
 * POST handler — called by /api/contact and /api/book-call.
 *
 * Body (JSON):
 *   { date, name, email, phone, company, service, source, message,
 *     status, leadId, submittedAt, ...utmParams }
 *
 * Returns:
 *   { ok: true, sheetRow: <number>, customerEmail: <bool>, ownerEmail: <bool> }
 *   or { ok: false, error: <string> }
 */
function doPost(e) {
  try {
    // ─── 1. Parse + validate input ──────────────────────────────────
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'No POST body' });
    }
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return json({ ok: false, error: 'Invalid JSON: ' + parseErr.message });
    }

    if (!data || !data.name || !data.email) {
      return json({ ok: false, error: 'Missing required fields (name, email)' });
    }

    // ─── 2. Append row to Google Sheet ───────────────────────────────
    var sheet;
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      sheet = SHEET_TAB_NAME ? ss.getSheetByName(SHEET_TAB_NAME) : ssgetActiveSheet();
      if (!sheet) sheet = ss.insertSheet(SHEET_TAB_NAME || 'Leads');
    } catch (sheetErr) {
      return json({ ok: false, error: 'Sheet access failed: ' + sheetErr.message });
    }

    // Ensure header row exists (creates it on first run).
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date', 'Name', 'Email', 'Phone', 'Company', 'Service',
        'Source', 'Message', 'Status', 'Lead ID', 'Submitted At',
        'UTM Source', 'UTM Medium', 'UTM Campaign'
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#f3f4f6');
    }

    var rowNumber = sheet.getLastRow() + 1;
    sheet.appendRow([
      data.date || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.service || '',
      data.source || '',
      data.message || '',
      data.status || 'new',
      data.leadId || '',
      data.submittedAt || '',
      data.utmSource || '',
      data.utmMedium || '',
      data.utmCampaign || ''
    ]);

    // ─── 2b. Build a deep-link URL to the saved row ──────────────────
    // Format: https://docs.google.com/spreadsheets/d/{id}/edit#gid={gid}&range=A{row}
    // This lets the API response tell the user EXACTLY where to find the row,
    // so they don't have to hunt through tabs.
    var spreadsheetId = ss.getId();
    var spreadsheetName = ss.getName();
    var sheetName = sheet.getName();
    var sheetGid = sheet.getSheetId();
    var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit';
    var rowUrl = spreadsheetUrl + '#gid=' + sheetGid + '&range=A' + rowNumber + ':N' + rowNumber;

    // ─── 3. Send customer confirmation email ────────────────────────
    var customerEmailResult = { sent: false, error: null };
    try {
      var customerSubject = '✅ আপনার অর্ডার গ্রহণ করা হয়েছে — NextGen Digital Studio';
      var serviceLine = data.service
        ? '📌 সার্ভিস: ' + data.service + '\n📌 Service: ' + data.service + '\n'
        : '';
      var customerBody =
        'প্রিয় ' + data.name + ',\n\n' +
        'আপনার অর্ডার গ্রহণ করা হয়েছে! ধন্যবাদ আমাদের যোগাযোগ করার জন্য। ' +
        'আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।\n\n' +
        serviceLine +
        'আমরা শীঘ্রই ফিরে আসবো। 🚀\n\n' +
        '— NextGen Digital Studio টিম\n' +
        '📞 +880 1711-731354\n' +
        '✉️ nextgendigitalstudio1@gmail.com\n\n' +
        '---\n\n' +
        'Dear ' + data.name + ',\n\n' +
        'We have received your request! Thank you for reaching out. ' +
        'Our team will contact you within 24 hours.\n\n' +
        serviceLine +
        "We'll be in touch soon. 🚀\n\n" +
        '— NextGen Digital Studio Team\n' +
        '📞 +880 1711-731354\n' +
        '✉️ nextgendigitalstudio1@gmail.com';

      var customerHtml =
        '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans Bengali,sans-serif;font-size:15px;line-height:1.65;color:#1f2937;max-width:560px;margin:0 auto;padding:24px;">' +
        '<div style="background:linear-gradient(135deg,#059669 0%,#10b981 100%);padding:24px;border-radius:12px;margin-bottom:24px;text-align:center;">' +
        '<h1 style="color:#fff;margin:0;font-size:22px;">✅ Request Received</h1>' +
        '<p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">NextGen Digital Studio</p></div>' +
        '<p style="margin:0 0 14px 0;">প্রিয় <strong>' + escapeHtml(data.name) + '</strong>,</p>' +
        '<p style="margin:0 0 14px 0;">আপনার অর্ডার গ্রহণ করা হয়েছে! ধন্যবাদ আমাদের যোগাযোগ করার জন্য। আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।</p>' +
        (data.service
          ? '<p style="margin:0 0 14px 0;padding:12px 16px;background:#f3f4f6;border-radius:8px;">📌 <strong>সার্ভিস:</strong> ' + escapeHtml(data.service) + '<br />📌 <strong>Service:</strong> ' + escapeHtml(data.service) + '</p>'
          : '') +
        '<p style="margin:0 0 14px 0;">আমরা শীঘ্রই ফিরে আসবো। 🚀</p>' +
        '<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />' +
        '<p style="margin:0 0 14px 0;">Dear <strong>' + escapeHtml(data.name) + '</strong>,</p>' +
        '<p style="margin:0 0 14px 0;">We have received your request! Thank you for reaching out. Our team will contact you within 24 hours.</p>' +
        '<p style="margin:0 0 14px 0;">We\'ll be in touch soon. 🚀</p>' +
        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">' +
        '<p style="margin:0 0 4px 0;"><strong>— NextGen Digital Studio Team</strong></p>' +
        '<p style="margin:0 0 4px 0;">📞 +880 1711-731354</p>' +
        '<p style="margin:0;">✉️ nextgendigitalstudio1@gmail.com</p></div>' +
        '</div>';

      MailApp.sendEmail({
        to: data.email,
        subject: customerSubject,
        body: customerBody,
        htmlBody: customerHtml,
        name: 'NextGen Digital Studio',
        replyTo: OWNER_EMAIL
      });
      customerEmailResult.sent = true;
    } catch (custErr) {
      customerEmailResult.error = custErr.message;
      // Log to sheet's Errors column? Skip — keep going to owner email.
    }

    // ─── 4. Send owner notification email ───────────────────────────
    var ownerEmailResult = { sent: false, error: null };
    try {
      var ownerSubject = '🔔 নতুন লিড: ' + (data.source || 'lead') + ' — ' + data.name;
      var ownerBody =
        '🔔 নতুন লিড এসেছে! দ্রুত ফলোআপ করুন।\n\n' +
        'নাম / Name: ' + data.name + '\n' +
        'ইমেইল / Email: ' + data.email + '\n' +
        'ফোন / Phone: ' + (data.phone || '') + '\n' +
        (data.company ? 'কোম্পানি / Company: ' + data.company + '\n' : '') +
        (data.service ? 'সার্ভিস / Service: ' + data.service + '\n' : '') +
        'উৎস / Source: ' + (data.source || '') + '\n' +
        'সময় / Time: ' + new Date().toISOString() + '\n\n' +
        (data.message ? 'মেসেজ / Message:\n' + data.message + '\n\n' : '') +
        '—\n' +
        'বিঃদ্রঃ: এই লিডটি Google Sheets-এ সংরক্ষিত হয়েছে এবং CRM ড্যাশবোর্ডে দেখা যাবে।\n\n' +
        '---\n\n' +
        '🔔 New lead received! Follow up promptly.\n\n' +
        'Name: ' + data.name + '\n' +
        'Email: ' + data.email + '\n' +
        'Phone: ' + (data.phone || '') + '\n' +
        (data.company ? 'Company: ' + data.company + '\n' : '') +
        (data.service ? 'Service: ' + data.service + '\n' : '') +
        'Source: ' + (data.source || '') + '\n' +
        'Time: ' + new Date().toISOString() + '\n\n' +
        (data.message ? 'Message:\n' + data.message + '\n\n' : '') +
        '—\n' +
        'Note: This lead has been saved to Google Sheets and is visible in the CRM dashboard.';

      var ownerHtml =
        '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans Bengali,sans-serif;font-size:15px;line-height:1.65;color:#1f2937;max-width:560px;margin:0 auto;padding:24px;">' +
        '<div style="background:linear-gradient(135deg,#dc2626 0%,#f59e0b 100%);padding:20px 24px;border-radius:12px;margin-bottom:20px;">' +
        '<h1 style="color:#fff;margin:0;font-size:20px;">🔔 নতুন লিড / New Lead</h1>' +
        '<p style="color:#fef3c7;margin:6px 0 0 0;font-size:14px;">Source: ' + escapeHtml(data.source || '') + '</p></div>' +
        '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
        '<tr><td style="padding:8px 0;color:#6b7280;width:120px;vertical-align:top;">নাম / Name</td><td style="padding:8px 0;font-weight:600;">' + escapeHtml(data.name) + '</td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">ইমেইল / Email</td><td style="padding:8px 0;"><a href="mailto:' + escapeHtml(data.email) + '" style="color:#059669;text-decoration:none;">' + escapeHtml(data.email) + '</a></td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">ফোন / Phone</td><td style="padding:8px 0;"><a href="tel:' + escapeHtml((data.phone || '').replace(/\s/g, '')) + '" style="color:#059669;text-decoration:none;">' + escapeHtml(data.phone || '') + '</a></td></tr>' +
        (data.company ? '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">কোম্পানি / Company</td><td style="padding:8px 0;">' + escapeHtml(data.company) + '</td></tr>' : '') +
        (data.service ? '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">সার্ভিস / Service</td><td style="padding:8px 0;">' + escapeHtml(data.service) + '</td></tr>' : '') +
        '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">উৎস / Source</td><td style="padding:8px 0;">' + escapeHtml(data.source || '') + '</td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">সময় / Time</td><td style="padding:8px 0;">' + escapeHtml(new Date().toISOString()) + '</td></tr>' +
        '</table>' +
        (data.message
          ? '<div style="margin-top:16px;padding:14px 16px;background:#f9fafb;border-left:3px solid #059669;border-radius:4px;"><div style="font-size:12px;color:#6b7280;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">মেসেজ / Message</div><div style="white-space:pre-wrap;">' + escapeHtml(data.message) + '</div></div>'
          : '') +
        '<div style="margin-top:20px;padding:12px 16px;background:#fef3c7;border-radius:6px;font-size:13px;color:#92400e;">' +
        '⚠️ এই লিডটি Google Sheets-এ সংরক্ষিত হয়েছে এবং CRM ড্যাশবোর্ডে দেখা যাবে।<br />' +
        'This lead has been saved to Google Sheets and is visible in the CRM dashboard.</div>' +
        '</div>';

      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: ownerSubject,
        body: ownerBody,
        htmlBody: ownerHtml,
        name: 'NextGen Lead Bot',
        replyTo: data.email  // Reply-to the customer so owner can hit "Reply"
      });
      ownerEmailResult.sent = true;
    } catch (ownerErr) {
      ownerEmailResult.error = ownerErr.message;
    }

    // ─── 5. Return aggregated result ────────────────────────────────
    // Include spreadsheet + sheet metadata so the caller (and the admin
    // dashboard) can deep-link the user straight to the saved row.
    return json({
      ok: true,
      sheetRow: rowNumber,
      spreadsheetId: spreadsheetId,
      spreadsheetName: spreadsheetName,
      spreadsheetUrl: spreadsheetUrl,
      sheetName: sheetName,
      sheetGid: sheetGid,
      rowUrl: rowUrl,
      customerEmail: customerEmailResult,
      ownerEmail: ownerEmailResult
    });
  } catch (err) {
    return json({ ok: false, error: err.message || String(err) });
  }
}

/**
 * GET handler — useful for browser testing the webhook URL.
 * Visit the Web app URL in a browser to see "Webhook is live".
 */
function doGet() {
  return json({
    ok: true,
    service: 'NextGen Digital Studio lead webhook',
    timestamp: new Date().toISOString(),
    usage: 'POST lead JSON to this URL'
  });
}

/** Helper: emit a JSON response with proper content type. */
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Helper: escape HTML special chars to prevent injection in email HTML. */
function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
