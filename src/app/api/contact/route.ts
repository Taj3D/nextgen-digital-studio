import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets, type SheetsResult } from "@/lib/google-sheets";
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from "@/lib/email-lead";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit: 10 submissions / min / IP. Generous enough for legitimate
  // users (form retries, double-clicks) but blocks spam bots. See
  // src/lib/rate-limit.ts and AUDIT-4-api [API-019].
  const ip = getClientIP(req);
  const rl = rateLimit(`contact:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.resetIn / 1000)) },
      },
    );
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON" },
        { status: 400 },
      );
    }

    const b = body as Record<string, unknown>;
    const name = String(b.name ?? "").trim();
    const email = String(b.email ?? "").trim().toLowerCase();
    const phone = normalizePhone(String(b.phone ?? "").trim());
    const company = b.company ? String(b.company).trim() : null;
    const service = b.service ? String(b.service).trim() : null;
    const message = b.message ? String(b.message).trim() : null;
    const source = normalizeSource(b.source, "contact_form");
    // UTM params — forwarded from the client for paid-ads attribution.
    // The lead form captures these on mount and sends them in the payload.
    const utmSource = b.utmSource ? String(b.utmSource).trim().slice(0, 100) : null;
    const utmMedium = b.utmMedium ? String(b.utmMedium).trim().slice(0, 100) : null;
    const utmCampaign = b.utmCampaign ? String(b.utmCampaign).trim().slice(0, 100) : null;

    // Honeypot: if the hidden "website" field is filled, silently accept
    // and discard (bots fill hidden fields; humans don't).
    if (b.website && String(b.website).trim()) {
      return NextResponse.json({ ok: true, id: "honeypot" });
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }
    // Phone format validation — accept +, digits, spaces, dashes, parens (6-20 chars)
    if (phone && !/^\+?[0-9\s\-()]{6,20}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone format" },
        { status: 400 },
      );
    }

    // Try to save to database (may fail if DB not configured — Google Sheets is the source of truth)
    let leadId = "sheets-only";
    try {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          phone,
          company: company ?? undefined,
          service: service ?? undefined,
          message: message ?? undefined,
          source,
          status: "new",
        },
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.error("[contact] DB save failed (lead will still go to Google Sheets)", dbErr);
    }

    // Google Sheets sync (saves to Sheet + sends email to customer + owner via Apps Script)
    // This is the primary lead capture — works even without DB.
    // We AWAIT the webhook so we can surface failures to the admin dashboard,
    // but we still return success to the user (lead is already saved to DB).
    const sheetsResult = await sendToGoogleSheets({
      name,
      email,
      phone,
      company: company ?? "",
      service: service ?? "",
      message: message ?? "",
      source,
      leadId,
      submittedAt: new Date().toISOString(),
      meta: {
        ...(utmSource ? { utmSource } : {}),
        ...(utmMedium ? { utmMedium } : {}),
        ...(utmCampaign ? { utmCampaign } : {}),
      },
    }).catch((err): SheetsResult => {
      console.error("[contact] google sheets error", err);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    });

    // Send customer confirmation + owner notification emails.
    // Delivery path: SMTP (primary) → Apps Script webhook (fallback).
    // We AWAIT so we can surface email status in the response — this helps
    // the admin dashboard show whether emails actually went out. Even if
    // both fail, the lead is already saved (DB + Sheets) so we still return
    // ok:true to the user.
    //
    // Email status aggregation:
    //   - If SMTP is configured and succeeded → use SMTP result.
    //   - If SMTP is NOT configured (skipped) → fall back to Apps Script
    //     webhook's per-recipient status (customerEmail.sent / ownerEmail.sent).
    //   - If SMTP failed but Apps Script webhook reported success → use Apps Script status.
    let emailStatus: { customerOk: boolean; ownerOk: boolean; customerMsg?: string; ownerMsg?: string; source: 'smtp' | 'apps_script' | 'none' } = {
      customerOk: false,
      ownerOk: false,
      source: 'none',
    }
    try {
      const [customerRes, ownerRes] = await Promise.all([
        sendCustomerConfirmationEmail({ name, email, phone, service: service ?? undefined, source }),
        sendOwnerNotificationEmail({
          name,
          email,
          phone,
          company: company ?? undefined,
          service: service ?? undefined,
          message: message ?? undefined,
          source,
        }),
      ])
      emailStatus = {
        customerOk: customerRes.success,
        ownerOk: ownerRes.success,
        customerMsg: customerRes.message,
        ownerMsg: ownerRes.message,
        source: 'smtp',
      }
      // If SMTP was skipped (not configured), pull email status from the
      // Apps Script webhook response — that's the path that actually
      // delivered the emails in this case.
      const smtpSkipped =
        customerRes.message.includes('SMTP not configured') &&
        ownerRes.message.includes('SMTP not configured')
      if (smtpSkipped && sheetsResult.ok && sheetsResult.response) {
        const r = sheetsResult.response
        const appsCustomerOk = r.customerEmail?.sent === true
        const appsOwnerOk = r.ownerEmail?.sent === true
        emailStatus = {
          customerOk: appsCustomerOk,
          ownerOk: appsOwnerOk,
          customerMsg: appsCustomerOk
            ? `Apps Script delivered customer email (sheet row ${r.sheetRow ?? 'n/a'})`
            : `Apps Script customer email failed: ${r.customerEmail?.error ?? 'unknown error'}`,
          ownerMsg: appsOwnerOk
            ? `Apps Script delivered owner email (sheet row ${r.sheetRow ?? 'n/a'})`
            : `Apps Script owner email failed: ${r.ownerEmail?.error ?? 'unknown error'}`,
          source: 'apps_script',
        }
      }
      if (!emailStatus.customerOk || !emailStatus.ownerOk) {
        console.error('[contact] email delivery partial failure', emailStatus)
      } else {
        console.log('[contact] emails delivered via', emailStatus.source, emailStatus)
      }
    } catch (err) {
      console.error('[contact] email-lead error', err)
    }

    // Fire-and-forget: server-side tracking (GA4, Meta, TikTok, Snapchat Conversions API)
    trackEvent({
      type: "lead",
      source,
      email,
      phone,
      name,
      page: "/api/contact",
      meta: {
        service: service ?? null,
        leadId,
        sheetsOk: sheetsResult.ok,
        ...(sheetsResult.error ? { sheetsError: sheetsResult.error } : {}),
        ...(utmSource ? { utmSource } : {}),
        ...(utmMedium ? { utmMedium } : {}),
        ...(utmCampaign ? { utmCampaign } : {}),
      },
    }).catch((err) => console.error("[contact] tracking error", err));

    // Return success to user (lead is saved to DB). Include a `warning` field
    // if the Google Sheets webhook failed — the admin dashboard can show this.
    // Also include `emailStatus` so the admin dashboard can surface email
    // delivery issues (SMTP down, wrong credentials, etc.).
    // Include `sheets` status with the full Apps Script response so the admin
    // dashboard can show the Sheet row number + any per-recipient email status
    // returned by the Apps Script webhook.
    return NextResponse.json({
      ok: true,
      id: leadId,
      email: emailStatus,
      sheets: {
        ok: sheetsResult.ok,
        ...(sheetsResult.error ? { error: sheetsResult.error } : {}),
        ...(sheetsResult.response?.sheetRow ? { sheetRow: sheetsResult.response.sheetRow } : {}),
        ...(sheetsResult.response?.customerEmail ? { customerEmail: sheetsResult.response.customerEmail } : {}),
        ...(sheetsResult.response?.ownerEmail ? { ownerEmail: sheetsResult.response.ownerEmail } : {}),
      },
      ...(sheetsResult.ok ? {} : { warning: "Lead saved locally but Google Sheets sync failed." }),
    });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
