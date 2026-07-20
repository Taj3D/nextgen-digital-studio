import { NextResponse } from "next/server";

/**
 * GET /api
 * API root — returns metadata about available endpoints.
 * Replaces the previous dummy "Hello, world!" response.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "NextGen Digital Studio API",
    version: "1.0.0",
    description: "AI Sales Automation Agency — lead capture, tracking, and CRM APIs",
    endpoints: {
      public: [
        "POST /api/contact — Lead contact form (rate limited: 10/min)",
        "POST /api/book-call — Book strategy call (rate limited: 10/min)",
        "POST /api/careers — Job applications (rate limited: 5/min)",
        "POST /api/audit — AI audit tool (rate limited: 5/min)",
        "POST /api/download — Free resource download (rate limited: 5/min)",
        "POST /api/newsletter — Newsletter signup (rate limited: 5/min)",
        "POST /api/chat-agent — AI chat agent (rate limited: 20/min)",
        "POST /api/chat-save — Save chat conversation (rate limited: 10/min)",
        "POST /api/track — Tracking events (rate limited: 60/min)",
      ],
      admin: [
        "POST /api/auth/login — Admin login (rate limited: 5/min)",
        "GET /api/leads — List leads (auth required)",
        "GET /api/leads/export — Export CSV (auth required)",
        "GET /api/track/stats — Tracking stats (auth required)",
      ],
    },
  });
}
