import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source"); // contact_form, strategy_call, ai_audit_tool, free_tools_download, ai_chat_widget
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit") || 100), 500);

    const where: Record<string, unknown> = {};
    if (source && source !== "all") where.source = source;
    if (status && status !== "all") where.status = status;

    // DB may not be configured (e.g., Vercel without Postgres). Return empty state.
    let leads: unknown[] = [];
    let total = 0;
    let bySource: { source: string; count: number }[] = [];
    let byStatus: { status: string; count: number }[] = [];
    let subscribers = 0;
    let conversations = 0;

    try {
      const [l, t, bs, bst, sub] = await Promise.all([
        db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: limit }),
        db.lead.count({ where }),
        db.lead.groupBy({ by: ["source"], _count: true }),
        db.lead.groupBy({ by: ["status"], _count: true }),
        db.newsletterSubscriber.count({ where: { active: true } }),
      ]);
      leads = l as unknown[];
      total = t;
      bySource = bs.map((s) => ({ source: s.source, count: s._count }));
      byStatus = bst.map((s) => ({ status: s.status, count: s._count }));
      subscribers = sub;
      try {
        conversations = await db.chatConversation.count();
      } catch {
        conversations = 0;
      }
    } catch (dbErr) {
      console.error("[leads] DB read failed (returning empty state)", dbErr);
    }

    return NextResponse.json({
      ok: true,
      stats: {
        total,
        conversations,
        subscribers,
        bySource,
        byStatus,
      },
      leads,
    });
  } catch (err) {
    console.error("[leads] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
