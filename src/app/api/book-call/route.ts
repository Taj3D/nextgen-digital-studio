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
    const service = body.service ? String(body.service).trim() : null;
    const preferredDate = body.date ? String(body.date).trim() : null;
    const message = body.message ? String(body.message).trim() : null;

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

    // Also create a Lead record so it appears in the admin CRM dashboard.
    // Log errors (don't swallow silently) so we can diagnose any failure.
    try {
      await db.lead.create({
        data: {
          name,
          email,
          phone,
          company: company ?? undefined,
          service: service ?? undefined,
          message: message ?? undefined,
          source: "strategy_call",
          status: "new",
        },
      });
    } catch (leadErr) {
      console.error("[book-call] Lead create failed (booking still saved):", leadErr instanceof Error ? leadErr.message : leadErr);
    }

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (err) {
    console.error("[book-call] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
