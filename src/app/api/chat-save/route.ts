import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { sendOwnerNotificationEmail } from "@/lib/email-lead";
import { trackEvent } from "@/lib/tracking";
import { normalizeSource } from "@/lib/lead-sources";
import { normalizePhone } from "@/lib/phone";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Regex to detect emails and phone numbers in chat messages.
// Phone regex accepts ASCII digits and Bengali digits (০-৯) — Bengali users
// often type phone numbers in Bengali digits inside the chat widget. The
// matched phone is normalised to ASCII via `normalizePhone()` below before
// being stored / sent to ad-platform Conversions APIs. See src/lib/phone.ts.
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(\+?880|0)?1[3-9][0-9০-৯]{8}/g;

/**
 * Heuristic check: returns true if the value looks like a real contact
 * (not a placeholder like "Not provided" or empty junk).
 */
function isRealContact(value: string | null | undefined): boolean {
  if (!value) return false
  const v = value.trim().toLowerCase()
  if (!v) return false
  if (v === "not provided" || v === "n/a" || v === "unknown") return false
  return true
}

export async function POST(req: Request) {
  // Rate limit: 10 chat saves / min / IP
  const ip = getClientIP(req);
  const rl = rateLimit(`chat-save:${ip}`, 10, 60_000);
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

    const b = body as Record<string, unknown>;
    const sessionId = String(b.sessionId ?? "").trim();
    const messages = Array.isArray(b.messages) ? b.messages : [];
    const explicitSource = normalizeSource(b.source, "ai_chat_widget");

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "sessionId is required" },
        { status: 400 },
      );
    }

    // Scan all user messages for contact info
    let leadEmail: string | null = null;
    let leadPhone: string | null = null;
    let leadName: string | null = null;

    for (const m of messages) {
      if (typeof m !== "object" || m === null) continue;
      const msg = m as { role?: unknown; content?: unknown };
      if (msg.role !== "user" || typeof msg.content !== "string") continue;
      const text = msg.content;

      if (!leadEmail) {
        const emailMatch = text.match(EMAIL_RE);
        if (emailMatch) leadEmail = emailMatch[0].toLowerCase();
      }
      if (!leadPhone) {
        const phoneMatch = text.match(PHONE_RE);
        if (phoneMatch) {
          let p = normalizePhone(phoneMatch[0]);
          if (p.startsWith("880")) p = "+" + p;
          else if (p.startsWith("01")) p = "+880" + p.slice(1);
          leadPhone = p;
        }
      }
      // Heuristic: detect name from phrases like "my name is X" or "I'm X"
      if (!leadName) {
        const nameMatch =
          text.match(/(?:my name is|i am|i'm|আমার নাম)\s+([a-zA-Z\u0980-\u09FF]{2,30})/i);
        if (nameMatch) leadName = nameMatch[1];
      }
    }

    const messageCount = messages.length;
    const messagesJson = JSON.stringify(messages.slice(-30)); // keep last 30

    // Upsert conversation by sessionId — wrapped in try/catch because
    // chatConversation model may not exist on a stale Prisma client.
    let conversation: { id: string } | null = null;
    try {
      const existing = await db.chatConversation.findFirst({
        where: { sessionId },
        orderBy: { createdAt: "desc" },
      });

      if (existing) {
        conversation = await db.chatConversation.update({
          where: { id: existing.id },
          data: {
            messages: messagesJson,
            messageCount,
            leadEmail: leadEmail ?? existing.leadEmail,
            leadPhone: leadPhone ?? existing.leadPhone,
            leadName: leadName ?? existing.leadName,
          },
        });
      } else {
        conversation = await db.chatConversation.create({
          data: {
            sessionId,
            messages: messagesJson,
            messageCount,
            leadEmail,
            leadPhone,
            leadName,
          },
        });
      }
    } catch {
      // Conversation persistence is best-effort; lead capture below still runs.
      conversation = null;
    }

    // Only create a Lead row in the DB if we have at least one REAL contact
    // channel (email or phone) AND a name (or "Chat Lead" fallback when we
    // have real contact info). This avoids polluting the CRM with junk rows
    // that have email="Not provided" / phone="Not provided" placeholders.
    const hasRealEmail = isRealContact(leadEmail);
    const hasRealPhone = isRealContact(leadPhone);
    let leadId: string | null = null;

    if (hasRealEmail || hasRealPhone) {
      const nameForLead = isRealContact(leadName) ? (leadName as string) : "Chat Lead";
      // Dedup by email OR phone — Bangladeshi users often share phone only.
      const dedupWhere: Record<string, unknown> = { OR: [] };
      if (hasRealEmail) (dedupWhere.OR as Array<Record<string, unknown>>).push({ email: leadEmail });
      if (hasRealPhone) (dedupWhere.OR as Array<Record<string, unknown>>).push({ phone: leadPhone });

      let existingLead: { id: string } | null = null;
      try {
        existingLead = await db.lead.findFirst({ where: dedupWhere });
      } catch {
        existingLead = null;
      }

      if (!existingLead) {
        try {
          const lead = await db.lead.create({
            data: {
              name: nameForLead,
              email: (hasRealEmail ? leadEmail : null) as string | null,
              phone: (hasRealPhone ? leadPhone : null) as string | null,
              service: "AI Chat enquiry",
              message: `Captured from chat. Session: ${sessionId.substring(0, 8)}`,
              source: explicitSource,
              status: "new",
            },
          });
          leadId = lead.id;
        } catch (dbErr) {
          console.error("[chat-save] DB save failed (lead will still go to Google Sheets)", dbErr);
          leadId = "sheets-only";
        }
      } else {
        leadId = existingLead.id;
      }

      // Google Sheets sync (saves to Sheet + sends email to prospect + owner via Apps Script)
      const sheetsResult = await sendToGoogleSheets({
        name: nameForLead,
        email: (hasRealEmail ? leadEmail : "") as string,
        phone: (hasRealPhone ? leadPhone : "") as string,
        service: "AI Chat enquiry",
        message: `Captured from chat. Session: ${sessionId.substring(0, 8)}`,
        source: explicitSource,
        leadId: leadId ?? "sheets-only",
        submittedAt: new Date().toISOString(),
      }).catch((err) => {
        console.error("[chat-save] google sheets error", err);
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      });

      // Owner notification email (best-effort — never blocks).
      if (hasRealEmail || hasRealPhone) {
        sendOwnerNotificationEmail({
          name: nameForLead,
          email: (hasRealEmail ? leadEmail : "no-email") as string,
          phone: (hasRealPhone ? leadPhone : "no-phone") as string,
          service: "AI Chat enquiry",
          message: `Captured from chat. Session: ${sessionId.substring(0, 8)}`,
          source: explicitSource,
        }).catch((err) => console.error("[chat-save] owner email error", err));
      }

      // Fire-and-forget: server-side tracking
      trackEvent({
        type: "lead",
        source: explicitSource,
        email: hasRealEmail ? (leadEmail as string) : undefined,
        phone: hasRealPhone ? (leadPhone as string) : undefined,
        name: nameForLead,
        page: "/api/chat-save",
        meta: {
          leadId,
          sessionId: sessionId.substring(0, 16),
          sheetsOk: sheetsResult.ok,
          ...(sheetsResult.error ? { sheetsError: sheetsResult.error } : {}),
        },
      }).catch((err) => console.error("[chat-save] tracking error", err));
    } else {
      // No real contact info captured — still log the chat as an event for
      // analytics (no DB Lead row, no Sheets sync — avoids polluting CRM).
      trackEvent({
        type: "lead",
        source: explicitSource,
        page: "/api/chat-save",
        meta: {
          chatLead: true,
          sessionId: sessionId.substring(0, 16),
          messageCount,
          detectedName: leadName,
        },
      }).catch((err) => console.error("[chat-save] chat_lead tracking error", err));
    }

    return NextResponse.json({
      ok: true,
      conversationId: conversation?.id ?? null,
      leadId,
      detected: { email: leadEmail, phone: leadPhone, name: leadName },
    });
  } catch (err) {
    console.error("[chat-save] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
