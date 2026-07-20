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
    }).catch((err) => {
      console.error("[contact] google sheets error", err);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    });

    // Send customer confirmation + owner notification emails (logged + persisted
    // as TrackingEvent rows for audit). Fire-and-forget — never blocks the response.
    // The actual delivery is handled by the Google Apps Script webhook.
    Promise.all([
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
    ]).catch((err) => console.error("[contact] email-lead error", err));

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
    return NextResponse.json({
      ok: true,
      id: leadId,
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
