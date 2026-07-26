import { NextResponse } from "next/server";
import { dbAvailable, getSafeDb } from "@/lib/db-safe";
import { sendEmail } from "@/lib/email-lead";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit: 5 subscriptions / min / IP. One-shot action for legit users;
  // blocks spam bots that try to flood the table with random emails. See
  // src/lib/rate-limit.ts and AUDIT-4-api [API-019].
  const ip = getClientIP(req);
  const rl = rateLimit(`newsletter:${ip}`, 5, 60_000);
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

    const email = String((body as Record<string, unknown>).email ?? "").trim().toLowerCase();

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

    // Persist to DB if available; otherwise degrade gracefully (welcome email still sends).
    let subId = "pending"
    if (dbAvailable) {
      try {
        const db = getSafeDb()
        if (db) {
          const sub = await db.newsletterSubscriber.upsert({
            where: { email },
            update: { active: true },
            create: { email, active: true, source: "footer" },
          })
          subId = sub.id
        }
      } catch (err) {
        // DB error (e.g. table missing) — log but don't fail the request.
        // The welcome email + Google Sheets can still capture the subscriber.
        console.error("[newsletter] db error (degraded mode)", err)
      }
    }

    // Send a bilingual welcome email (logged + persisted as TrackingEvent).
    // Fire-and-forget — never blocks the response.
    sendEmail({
      to: email,
      subject: "✅ সাবস্ক্রিপশন সফল — NextGen Digital Studio | Welcome to NextGen Digital Studio",
      body: `প্রিয় গ্রাহক,

আপনি সফলভাবে NextGen Digital Studio-এর নিউজলেটারে সাবস্ক্রাইব করেছেন! আমরা নিয়মিত AI সেলস অটোমেশন, ডিজিটাল মার্কেটিং টিপস এবং বিশেষ অফার পাঠাবো।

ধন্যবাদ! 🚀

— NextGen Digital Studio টিম
📞 +880 1711-731354

---

Dear Subscriber,

You have successfully subscribed to the NextGen Digital Studio newsletter! We'll regularly send you AI sales automation tips, digital marketing insights, and special offers.

Thank you! 🚀

— NextGen Digital Studio Team
📞 +880 1711-731354`,
      source: "newsletter_welcome",
    }).catch((err) => console.error("[newsletter] welcome email error", err));

    return NextResponse.json({ ok: true, id: subId });
  } catch (err) {
    console.error("[newsletter] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json({ ok: true, count: 0 });
  }
  try {
    const db = getSafeDb()
    if (!db) return NextResponse.json({ ok: true, count: 0 });
    const count = await db.newsletterSubscriber.count({
      where: { active: true },
    });
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: true, count: 0 });
  }
}
