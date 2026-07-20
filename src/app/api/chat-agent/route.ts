import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { geminiChat, isGeminiConfigured, type ChatMessage } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the official AI assistant for NextGen Digital Studio, a premium AI Sales Automation Agency based in Jessore, Bangladesh (founded by Engineer Md. Nazmul Islam Taj, also known as তাজ ভাই).

About NextGen Digital Studio:
- We help businesses in Bangladesh automate marketing, sales, customer communication and operations using Artificial Intelligence and Business Automation.
- Our services: AI Sales Automation, AI Chat Agent, AI Voice Agent, CRM Automation, WhatsApp Automation, Lead Generation, Performance Marketing, Sales Funnel Development, Business Automation, Website Development, Landing Page Design, and AI Consultation.
- We serve: Small & Medium Businesses, Corporate Companies, Real Estate, Hospitals, Schools, E-commerce, Agencies.
- Pricing starts at ৳25,000/month (Starter), ৳60,000/month (Growth), and custom Enterprise plans.
- Contact: nextgendigitalstudio1@gmail.com, +880 1711 731354, Jessore Bangladesh.
- WhatsApp: https://wa.me/8801711731354

Your role:
- Greet visitors warmly. You can speak in both English and Bangla (Banglish is fine). Match the visitor's language.
- Answer questions about our services, pricing, industries, and process concisely.
- Be helpful, professional, premium, and trustworthy — but not pushy.
- Keep replies short (2-4 sentences) since this is a chat widget. Use 1 short paragraph or a few bullet points max.
- If a visitor seems interested, encourage them to book a FREE strategy call using the "Book Strategy Call" button, or share their WhatsApp number / email so our team can reach out.
- If asked something outside our scope, politely redirect to booking a strategy call.
- Never invent prices or guarantees not listed above. If unsure, say you'll have the team confirm.

Always end with a soft, helpful next step when relevant.`;

// Which provider to use: "gemini" | "zai" | "auto"
// "auto" = try Gemini first, fall back to z-ai on failure
const AI_PROVIDER = (process.env.AI_PROVIDER || "auto") as "gemini" | "zai" | "auto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const userMessage = String(body.message ?? "").trim();

    if (!userMessage) {
      return NextResponse.json(
        { ok: false, error: "Message is required" },
        { status: 400 },
      );
    }
    if (userMessage.length > 1000) {
      return NextResponse.json(
        { ok: false, error: "Message too long" },
        { status: 400 },
      );
    }

    // Build conversation history
    const history = messages
      .filter(
        (m: { role?: string; content?: string }) =>
          m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
      )
      .slice(-8)
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const fullMessages: ChatMessage[] = [
      ...history,
      { role: "user", content: userMessage },
    ];

    let reply = "";
    let provider = "";

    // Try Gemini first (if configured and provider allows it)
    const useGemini =
      (AI_PROVIDER === "gemini" || AI_PROVIDER === "auto") && isGeminiConfigured();

    if (useGemini) {
      try {
        reply = await geminiChat(fullMessages, SYSTEM_PROMPT);
        provider = "gemini";
      } catch (geminiErr) {
        console.error("[chat-agent] Gemini failed:", geminiErr instanceof Error ? geminiErr.message : geminiErr);
        // If provider is strictly "gemini", don't fall back
        if (AI_PROVIDER === "gemini") {
          throw geminiErr;
        }
        // Otherwise fall through to z-ai
      }
    }

    // Fallback to z-ai-web-dev-sdk
    if (!reply) {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          ...fullMessages.map((m) => ({ role: m.role, content: m.content })),
        ],
        thinking: { type: "disabled" },
      });
      reply =
        completion.choices[0]?.message?.content?.trim() ||
        "I'm sorry, I couldn't process that. Could you rephrase, or book a free strategy call and our team will help directly?";
      provider = "zai";
    }

    return NextResponse.json({ ok: true, reply, provider });
  } catch (err) {
    console.error("[chat-agent] error", err);
    return NextResponse.json(
      {
        ok: false,
        error: "AI assistant is temporarily unavailable. Please try again or book a strategy call.",
      },
      { status: 500 },
    );
  }
}

/**
 * GET — health check showing which AI provider is active.
 */
export async function GET() {
  const provider =
    AI_PROVIDER === "gemini"
      ? "gemini-only"
      : AI_PROVIDER === "zai"
        ? "zai-only"
        : isGeminiConfigured()
          ? "auto (gemini → zai fallback)"
          : "zai (gemini not configured)";

  return NextResponse.json({
    ok: true,
    provider,
    geminiConfigured: isGeminiConfigured(),
    model: process.env.GEMINI_MODEL || "gemini-flash-latest",
  });
}
