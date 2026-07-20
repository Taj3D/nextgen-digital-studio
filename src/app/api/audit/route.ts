import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";

export const runtime = "nodejs";

export async function POST(req: Request) {
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
    const industry = b.industry ? String(b.industry).trim() : null;
    const url = b.url ? String(b.url).trim() : null;
    const responses = Array.isArray(b.responses) ? b.responses : [];
    const score = Number(b.score) || 0;
    const source = normalizeSource(b.source, "ai_audit_tool");

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, email, phone)" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const service = industry ? `AI Audit (${industry})` : "AI Audit";
    const message = `Audit score: ${score}/100. Responses: ${responses.join(" | ")}${url ? ` | URL: ${url}` : ""}`.slice(0, 500);

    // Try to save to database (may fail if DB not configured — Google Sheets is the source of truth)
    let leadId = "sheets-only";
    try {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          phone,
          company: company ?? undefined,
          service,
          message,
          source,
          status: "new",
        },
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.error("[audit] DB save failed (lead will still go to Google Sheets)", dbErr);
    }

    // Google Sheets sync (saves to Sheet + sends email to prospect + owner via Apps Script)
    sendToGoogleSheets({
      name,
      email,
      phone,
      company: company ?? "",
      service,
      message,
      source,
      leadId,
      submittedAt: new Date().toISOString(),
    }).catch((err) => console.error("[audit] google sheets error", err));

    // Fire-and-forget: server-side tracking (GA4, Meta, TikTok, Snapchat Conversions API)
    trackEvent({
      type: "lead",
      source,
      email,
      phone,
      name,
      page: "/api/audit",
      meta: { leadId, score, industry: industry ?? null, url: url ?? null },
    }).catch((err) => console.error("[audit] tracking error", err));

    return NextResponse.json({ ok: true, id: leadId, score });
  } catch (err) {
    console.error("[audit] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
