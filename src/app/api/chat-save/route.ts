import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Regex to detect emails and phone numbers in chat messages
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(\+?880|0)?1[3-9]\d{8}/g;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = String(body.sessionId ?? "").trim();
    const messages = Array.isArray(body.messages) ? body.messages : [];

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
      if (m.role !== "user" || typeof m.content !== "string") continue;
      const text = m.content;

      if (!leadEmail) {
        const emailMatch = text.match(EMAIL_RE);
        if (emailMatch) leadEmail = emailMatch[0].toLowerCase();
      }
      if (!leadPhone) {
        const phoneMatch = text.match(PHONE_RE);
        if (phoneMatch) {
          let p = phoneMatch[0];
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

    // If we detected contact info, create/update a lead
    let leadId: string | null = null;
    if (leadEmail || leadPhone) {
      const existingLead = leadEmail
        ? await db.lead.findFirst({ where: { email: leadEmail } })
        : null;
      if (!existingLead) {
        const lead = await db.lead.create({
          data: {
            name: leadName || "Chat Lead",
            email: leadEmail || "Not provided",
            phone: leadPhone || "Not provided",
            service: "AI Chat enquiry",
            message: `Captured from chat. Session: ${sessionId.substring(0, 8)}`,
            source: "ai_chat_widget",
            status: "new",
          },
        });
        leadId = lead.id;
      } else {
        leadId = existingLead.id;
      }
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
