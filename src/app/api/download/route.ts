import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit: 5 downloads / min / IP
  const ip = getClientIP(req);
  const rl = rateLimit(`download:${ip}`, 5, 60_000);
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
    const phone = normalizePhone(b.phone ? String(b.phone).trim() : "");
    const resource = String(b.resource ?? "").trim();
    const source = normalizeSource(b.source, "free_tools_download");

    if (!name || !email || !resource) {
      return NextResponse.json(
        { ok: false, error: "Name, email and resource are required" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const service = `Free Resource: ${resource}`;
    const message = `Downloaded: ${resource}`;

    // Try to save to database (may fail if DB not configured — Google Sheets is the source of truth)
    let leadId = "sheets-only";
    try {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          service,
          message,
          source,
          status: "new",
        },
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.error("[download] DB save failed (lead will still go to Google Sheets)", dbErr);
    }

    // Google Sheets sync (saves to Sheet + sends email to prospect + owner via Apps Script)
    sendToGoogleSheets({
      name,
      email,
      phone: phone || "",
      service,
      message,
      source,
      leadId,
      submittedAt: new Date().toISOString(),
    }).catch((err) => console.error("[download] google sheets error", err));

    // Fire-and-forget: server-side tracking (GA4, Meta, TikTok, Snapchat Conversions API)
    trackEvent({
      type: "lead",
      source,
      email,
      phone: phone || undefined,
      name,
      page: "/api/download",
      meta: { leadId, resource },
    }).catch((err) => console.error("[download] tracking error", err));

    // Map resource title to downloadable file. The free-tools section uses
    // resource.title as the "resource" field, so we match against known titles.
    const resourceMap: Record<string, string> = {
      "CRM Automation Checklist": "/resources/crm-checklist.html",
      "30 WhatsApp Message Templates": "/resources/whatsapp-templates.html",
      "AI Readiness Ebook 2025": "/resources/ai-readiness-ebook.html",
      "6 High-Converting Funnel Swipe File": "/resources/funnel-swipe.html",
      "Lead Gen ROI Calculator": "/resources/lead-gen-calculator.html",
      "AI Voice Agent Script Library": "/resources/voice-scripts.html",
    };
    const downloadUrl = resourceMap[resource] ?? null;

    return NextResponse.json({ ok: true, id: leadId, downloadUrl });
  } catch (err) {
    console.error("[download] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
