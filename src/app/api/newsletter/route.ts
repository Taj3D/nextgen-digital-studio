import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const sub = await db.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true, source: "footer" },
    });

    return NextResponse.json({ ok: true, id: sub.id });
  } catch (err) {
    console.error("[newsletter] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const count = await db.newsletterSubscriber.count({
      where: { active: true },
    });
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: true, count: 0 });
  }
}
