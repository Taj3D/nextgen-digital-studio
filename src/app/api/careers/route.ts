import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit: 5 applications / min / IP (one-shot form, generous for retries)
  const ip = getClientIP(req);
  const rl = rateLimit(`careers:${ip}`, 5, 60_000);
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

    const name = String((body as Record<string, unknown>).name ?? "").trim();
    const email = String((body as Record<string, unknown>).email ?? "").trim().toLowerCase();
    const phone = normalizePhone((body as Record<string, unknown>).phone ? String((body as Record<string, unknown>).phone).trim() : "");
    const role = String((body as Record<string, unknown>).role ?? "").trim();
    const position = (body as Record<string, unknown>).position ? String((body as Record<string, unknown>).position).trim() : role;
    const portfolio = (body as Record<string, unknown>).portfolio ? String((body as Record<string, unknown>).portfolio).trim() : "";
    const message = (body as Record<string, unknown>).message ? String((body as Record<string, unknown>).message).trim() : "";
    const source = normalizeSource((body as Record<string, unknown>).source, "careers_application");

    if (!name || !email || (!role && !position)) {
      return NextResponse.json(
        { ok: false, error: "Name, email and role/position are required" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const service = `Job Application: ${position || role}`;
    const fullMessage = `${portfolio ? `Portfolio: ${portfolio} | ` : ""}${message}`.slice(0, 500);

    // Try to save to database (may fail if DB not configured — Google Sheets is the source of truth)
    let leadId = "sheets-only";
    try {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          service,
          message: fullMessage,
          source,
          status: "new",
        },
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.error("[careers] DB save failed (lead will still go to Google Sheets)", dbErr);
    }

    // Google Sheets sync (saves to Sheet + sends email to candidate + owner via Apps Script)
    sendToGoogleSheets({
      name,
      email,
      phone: phone || "",
      service,
      message: fullMessage,
      source,
      leadId,
      submittedAt: new Date().toISOString(),
    }).catch((err) => console.error("[careers] google sheets error", err));

    // Fire-and-forget: server-side tracking (GA4, Meta, TikTok, Snapchat Conversions API)
    trackEvent({
      type: "lead",
      source,
      email,
      phone: phone || undefined,
      name,
      page: "/api/careers",
      meta: { leadId, role: position || role, portfolio: portfolio || null },
    }).catch((err) => console.error("[careers] tracking error", err));

    return NextResponse.json({ ok: true, id: leadId });
  } catch (err) {
    console.error("[careers] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
