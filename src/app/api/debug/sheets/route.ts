import { NextResponse } from "next/server";
import { sendToGoogleSheets } from "@/lib/google-sheets";

export const runtime = "nodejs";

/**
 * GET /api/debug/sheets
 * ---------------------
 * Diagnostic endpoint that sends a single throwaway test row through the
 * Google Sheets webhook and returns the FULL Apps Script response —
 * spreadsheet name, tab name, row number, and a deep-link URL.
 *
 * Use this when leads "aren't showing up" — 99% of the time the leads ARE
 * being saved, but to a tab the user isn't looking at (the Apps Script
 * creates a "Leads" tab if the sheet only has "Sheet1"). The response
 * here includes `rowUrl` which opens the spreadsheet scrolled to the
 * exact row that was just written, removing all ambiguity.
 *
 * No auth — the only "secret" it exposes is the spreadsheet URL, which
 * is the user's own. Safe to call from a browser.
 */
export async function GET() {
  const startedAt = new Date().toISOString();
  const result = await sendToGoogleSheets({
    name: "Diagnostic Ping",
    email: "diagnostic@nextgendigitalstudio.com",
    phone: "+8801711000000",
    company: "",
    service: "diagnostic",
    source: "debug_ping",
    message: `Automated diagnostic ping at ${startedAt}. Safe to delete this row from the sheet.`,
    leadId: `diag-${Date.now()}`,
    submittedAt: startedAt,
  });

  return NextResponse.json({
    ok: result.ok,
    startedAt,
    webhookConfigured: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    ...(result.error ? { error: result.error } : {}),
    ...(result.response
      ? {
          sheets: {
            ok: result.response.ok ?? false,
            sheetRow: result.response.sheetRow,
            spreadsheetName: result.response.spreadsheetName,
            sheetName: result.response.sheetName,
            spreadsheetUrl: result.response.spreadsheetUrl,
            rowUrl: result.response.rowUrl,
            customerEmail: result.response.customerEmail,
            ownerEmail: result.response.ownerEmail,
          },
        }
      : {}),
    help: result.response?.rowUrl
      ? `Open this URL in your browser — it jumps straight to the row that was just saved: ${result.response.rowUrl}`
      : "Webhook did not return a rowUrl. The Apps Script may need to be redeployed with the latest Code.gs (which adds spreadsheetUrl + rowUrl to the response).",
  });
}
