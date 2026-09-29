import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { trackEvent } from "@/lib/tracking";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const company = body.company ? String(body.company).trim() : null;
    const service = body.service ? String(body.service).trim() : null;
    const message = body.message ? String(body.message).trim() : null;
    const source = body.source ? String(body.source).trim() : "contact_form";

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
    sendToGoogleSheets({
      name,
      email,
      phone,
      company: company ?? "",
      service: service ?? "",
      message: message ?? "",
      source,
      leadId,
      submittedAt: new Date().toISOString(),
    }).catch((err) => console.error("[contact] google sheets error", err));

    // Fire-and-forget: server-side tracking (GA4, Meta, TikTok, Snapchat Conversions API)
    trackEvent({
      type: "lead",
      source,
      email,
      phone,
      name,
      page: "/api/contact",
      meta: { service: service ?? null, leadId },
    }).catch((err) => console.error("[contact] tracking error", err));

    return NextResponse.json({ ok: true, id: leadId });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
