import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// POST — Subscribe (or resubscribe) a newsletter email.
// Repeated subscribe is safe (upsert). Does NOT silently resubscribe
// an explicitly unsubscribed user — resubscription requires the user
// to actively POST their email again (which sets active=true).
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
    console.error("[newsletter] subscribe error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE — Unsubscribe a newsletter email.
// Repeated unsubscribe is safe (idempotent — sets active=false even if
// already false). Unknown emails are handled gracefully (returns ok with
// unsubscribed=true but does not create a new record).
export async function DELETE(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
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

    // Try to update existing subscriber to inactive.
    // If subscriber doesn't exist, return ok gracefully (no record to
    // unsubscribe, but the request itself is valid).
    try {
      const existing = await db.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (!existing) {
        // Unknown email — handle gracefully.
        return NextResponse.json({
          ok: true,
          unsubscribed: true,
          message: "No active subscription found for this email.",
        });
      }

      // Idempotent: set active=false even if already false.
      await db.newsletterSubscriber.update({
        where: { email },
        data: { active: false },
      });

      return NextResponse.json({
        ok: true,
        unsubscribed: true,
      });
    } catch (dbErr) {
      console.error("[newsletter] unsubscribe DB error", dbErr);
      return NextResponse.json(
        { ok: false, error: "Database error during unsubscribe" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[newsletter] unsubscribe error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET — Count active subscribers (internal/admin use).
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

