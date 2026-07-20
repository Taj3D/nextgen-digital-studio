import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "contacted", "qualified", "won", "lost"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ids, action, value } = body as {
      ids: string[];
      action: "status" | "assign" | "delete";
      value?: string;
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { ok: false, error: "ids array is required" },
        { status: 400 },
      );
    }
    if (ids.length > 500) {
      return NextResponse.json(
        { ok: false, error: "Max 500 leads per bulk action" },
        { status: 400 },
      );
    }

    if (action === "delete") {
      const result = await db.lead.deleteMany({ where: { id: { in: ids } } });
      return NextResponse.json({ ok: true, affected: result.count });
    }

    if (action === "status") {
      if (!value || !VALID_STATUSES.includes(value)) {
        return NextResponse.json(
          { ok: false, error: "Invalid status value" },
          { status: 400 },
        );
      }
      const result = await db.lead.updateMany({
        where: { id: { in: ids } },
        data: { status: value },
      });
      // Log activities (best-effort)
      for (const id of ids) {
        try {
          await db.leadActivity.create({
            data: { leadId: id, type: "status_change", detail: `Bulk: status → ${value}`, newValue: value },
          });
        } catch {}
      }
      return NextResponse.json({ ok: true, affected: result.count });
    }

    if (action === "assign") {
      const assignee = value === "Unassigned" ? "" : (value ?? "");
      const data: Record<string, string> = {};
      if (assignee) {
        data.assignedTo = assignee;
      } else {
        // Clear assignment — use updateMany with empty string
        const result = await db.lead.updateMany({
          where: { id: { in: ids } },
          data: { assignedTo: "" },
        });
        return NextResponse.json({ ok: true, affected: result.count });
      }
      const result = await db.lead.updateMany({
        where: { id: { in: ids } },
        data,
      });
      return NextResponse.json({ ok: true, affected: result.count });
    }

    return NextResponse.json(
      { ok: false, error: "Invalid action" },
      { status: 400 },
    );
  } catch (err) {
    console.error("[leads/bulk] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
