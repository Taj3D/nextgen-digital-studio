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
    const preferredDate = body.date ? String(body.date).trim() : null;
    const message = body.message ? String(body.message).trim() : null;
    const source = body.source ? String(body.source).trim() : "strategy_call";

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
    }).catch((err) => console.error("[book-call] google sheets error", err));

    // Fire-and-forget: server-side tracking
    trackEvent({
      type: "lead",
      source,
      email,
      phone,
      name,
      page: "/api/book-call",
      meta: { service: service ?? null, leadId, preferredDate: preferredDate ?? null },
    }).catch((err) => console.error("[book-call] tracking error", err));

    return NextResponse.json({ ok: true, id: bookingId });
  } catch (err) {
    console.error("[book-call] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
