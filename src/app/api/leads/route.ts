import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source"); // contact_form, strategy_call, ai_audit_tool, free_tools_download, ai_chat_widget
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit") || 100), 500);

    const where: Record<string, unknown> = {};
    if (source && source !== "all") where.source = source;
    if (status && status !== "all") where.status = status;

    const [leads, total, bySource, byStatus, subscribers] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      db.lead.count({ where }),
      db.lead.groupBy({
        by: ["source"],
        _count: true,
      }),
      db.lead.groupBy({
        by: ["status"],
        _count: true,
      }),
      db.newsletterSubscriber.count({ where: { active: true } }),
    ]);

    // Chat conversations count — wrapped in try/catch because the model may
    // not be available if the Prisma client hasn't been regenerated yet.
    let conversations = 0;
    try {
      conversations = await db.chatConversation.count();
    } catch {
      conversations = 0;
    }

    return NextResponse.json({
      ok: true,
      stats: {
        total,
        conversations,
        subscribers,
        bySource: bySource.map((s) => ({ source: s.source, count: s._count })),
        byStatus: byStatus.map((s) => ({ status: s.status, count: s._count })),
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
