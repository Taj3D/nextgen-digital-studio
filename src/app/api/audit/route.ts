import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const company = body.company ? String(body.company).trim() : null;
    const industry = body.industry ? String(body.industry).trim() : null;
    const responses = Array.isArray(body.responses) ? body.responses : [];
    const score = Number(body.score) || 0;

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
        service: industry ? `AI Audit (${industry})` : "AI Audit",
        message: `Audit score: ${score}/100. Responses: ${responses.join(" | ")}`.slice(0, 500),
        source: "ai_audit_tool",
        status: "new",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id, score });
  } catch (err) {
    console.error("[audit] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
