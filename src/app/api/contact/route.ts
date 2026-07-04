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

    // Fire-and-forget: Google Sheets sync (saves to Sheet + sends email to customer + owner via Apps Script)
    sendToGoogleSheets({
      name,
      email,
      phone,
      company: company ?? "",
      service: service ?? "",
      message: message ?? "",
      source,
      leadId: lead.id,
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
      meta: { service: service ?? null, leadId: lead.id },
    }).catch((err) => console.error("[contact] tracking error", err));

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
