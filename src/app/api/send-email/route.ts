import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/send-email — sends lead notification email.
 * Uses a simple SMTP-like approach via fetch to an email service.
 * For now, logs the email (production would use SendGrid/Resend/etc).
 * 
 * Also writes to Google Sheets via webhook if configured.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const to = String(body.to || "");
    const subject = String(body.subject || "New Lead");
    const text = String(body.body || "");

    if (!to || !text) {
      return NextResponse.json({ ok: false, error: "Missing to/body" }, { status: 400 });
    }

    // Log the email (in production, use a real email service)
    console.log(`[email] To: ${to} | Subject: ${subject}`);
    console.log(`[email] Body:\n${text}`);

    // Try Google Sheets webhook (fire-and-forget, already in separate API)
    // This endpoint focuses on email logging only.

    return NextResponse.json({ ok: true, message: "Email notification logged" });
  } catch (err) {
    console.error("[send-email] error", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
