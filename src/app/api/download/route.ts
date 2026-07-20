import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = body.phone ? String(body.phone).trim() : "";
    const resource = String(body.resource ?? "").trim();

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

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone: phone || "Not provided",
        service: `Free Resource: ${resource}`,
        message: `Downloaded: ${resource}`,
        source: "free_tools_download",
        status: "new",
      },
    });

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

    return NextResponse.json({ ok: true, id: lead.id, downloadUrl });
  } catch (err) {
    console.error("[download] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
