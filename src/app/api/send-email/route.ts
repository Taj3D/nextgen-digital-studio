import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/send-email — lead notification email LOGGING endpoint.
 *
 * INTENTIONAL NO-OP (logging only):
 *   This endpoint does NOT send real email. Real customer + owner email
 *   notifications are handled by the Google Apps Script webhook that sits
 *   behind `sendToGoogleSheets()` (see `src/lib/google-sheets.ts`). When a
 *   lead is captured, the Apps Script webhook receives the payload, appends
 *   a row to the Google Sheet, AND sends both a confirmation email to the
 *   customer and a notification email to the business owner.
 *
 *   This route exists as a debug/log surface: callers can POST a structured
 *   payload (to/subject/body) and it will be console.log'd into the server
 *   log for inspection. It is intentionally lightweight — no SMTP, no
 *   SendGrid, no Resend — because the email delivery path is already
 *   handled by Apps Script.
 *
 *   If you later want a separate email provider (e.g. for transactional
 *   emails that should NOT go to the Sheet), integrate Resend here:
 *     `import { Resend } from 'resend';
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({ from, to, subject, text });`
 *
 * Body:
 *   { "to": string, "subject": string, "body": string }
 *
 * Response:
 *   200 { ok: true }  — payload logged successfully
 *   400 { ok: false, error: "Missing to/body" }
 *   500 { ok: false, error: "Internal server error" }
 */
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
    const to = String(b.to ?? "");
    const subject = String(b.subject ?? "New Lead");
    const text = String(b.body ?? "");

    if (!to || !text) {
      return NextResponse.json(
        { ok: false, error: "Missing to/body" },
        { status: 400 },
      );
    }

    // Log the email payload (real email delivery is handled by Google Apps
    // Script webhook — see sendToGoogleSheets in src/lib/google-sheets.ts).
    console.log(`[email] To: ${to} | Subject: ${subject} | Body: ${text.slice(0, 200)}${text.length > 200 ? '…' : ''}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-email] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
