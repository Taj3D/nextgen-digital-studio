import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = body.phone ? String(body.phone).trim() : "";
    const role = String(body.role ?? "").trim();
    const portfolio = body.portfolio ? String(body.portfolio).trim() : "";
    const message = body.message ? String(body.message).trim() : "";

    if (!name || !email || !role) {
      return NextResponse.json(
        { ok: false, error: "Name, email and role are required" },
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
        service: `Job Application: ${role}`,
        message: `${portfolio ? `Portfolio: ${portfolio} | ` : ""}${message}`.slice(0, 500),
        source: "careers_application",
        status: "new",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[careers] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
