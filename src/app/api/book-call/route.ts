import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from "@/lib/email-lead";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit: 10 submissions / min / IP (same as /api/contact)
  const ip = getClientIP(req);
  const rl = rateLimit(`book-call:${ip}`, 10, 60_000);
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
    const preferredDate = b.date ? String(b.date).trim() : null;
    const message = b.message ? String(b.message).trim() : null;
    const source = normalizeSource(b.source, "strategy_call");

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

    let bookingId = "sheets-only";
    try {
      const booking = await db.booking.create({
        data: {
          name,
          email,
          phone,
          company: company ?? undefined,
          service: service ?? undefined,
          preferredDate: preferredDate ?? undefined,
          message: message ?? undefined,
          status: "pending",
        },
      });
      bookingId = booking.id;
    } catch (dbErr) {
      console.error("[book-call] DB save failed (lead will still go to Google Sheets)", dbErr);
    }

    // Also create a Lead record so it appears in the admin CRM dashboard.
    let leadId = bookingId;
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
    } catch (leadErr) {
      console.error("[book-call] Lead create failed (booking still saved):", leadErr instanceof Error ? leadErr.message : leadErr);
    }

    // Google Sheets sync (saves to Sheet + sends email to customer + owner via Apps Script)
    // Mirrors /api/contact so strategy-call leads reach the same pipeline.
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
      ...(preferredDate ? { meta: { preferredDate } } : {}),
    }).catch((err) => {
      console.error("[book-call] google sheets error", err);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    });

    // Send customer confirmation + owner notification emails.
    // Delivery path: SMTP (primary) → Apps Script webhook (fallback).
    // We AWAIT so we can surface email status in the response.
    // If SMTP is not configured, we pull email status from the Apps Script
    // webhook response (customerEmail.sent / ownerEmail.sent).
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
        console.error('[book-call] email delivery partial failure', emailStatus)
      } else {
        console.log('[book-call] emails delivered via', emailStatus.source, emailStatus)
      }
    } catch (err) {
      console.error('[book-call] email-lead error', err)
    }

    // Fire-and-forget: server-side tracking
    trackEvent({
      type: "lead",
      source,
      email,
      phone,
      name,
      page: "/api/book-call",
      meta: {
        service: service ?? null,
        leadId,
        preferredDate: preferredDate ?? null,
        sheetsOk: sheetsResult.ok,
        ...(sheetsResult.error ? { sheetsError: sheetsResult.error } : {}),
      },
    }).catch((err) => console.error("[book-call] tracking error", err));

    // Return both bookingId (for the booking record) and leadId (for consistency
    // with /api/contact — admin CRM uses leadId to link activities).
    // Also include `email` status so the admin dashboard can surface email
    // delivery issues (SMTP down, wrong credentials, etc.).
    return NextResponse.json({
      ok: true,
      id: leadId,
      bookingId,
      email: emailStatus,
      ...(sheetsResult.ok ? {} : { warning: "Booking saved locally but Google Sheets sync failed." }),
    });
  } catch (err) {
    console.error("[book-call] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
