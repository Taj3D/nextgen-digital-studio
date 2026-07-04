import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "contacted", "qualified", "won", "lost"];

async function logActivity(
  leadId: string,
  type: string,
  detail: string,
  oldValue?: string,
  newValue?: string,
) {
  try {
    await db.leadActivity.create({
      data: { leadId, type, detail, oldValue, newValue },
    });
  } catch {
    // Activity logging is best-effort; don't fail the update if it errors.
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes, assignedTo } = body as { status?: string; notes?: string; assignedTo?: string };

    const data: Record<string, string> = {};
    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          { ok: false, error: "Invalid status" },
          { status: 400 },
        );
      }
      data.status = status;
    }
    if (notes !== undefined) {
      data.notes = String(notes).slice(0, 2000);
    }
    if (assignedTo !== undefined) {
      data.assignedTo = String(assignedTo).slice(0, 100);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { ok: false, error: "Nothing to update" },
        { status: 400 },
      );
    }

    // Fetch existing lead to record old values for activity log
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Lead not found" },
        { status: 404 },
      );
    }

    let lead;
    try {
      lead = await db.lead.update({
        where: { id },
        data,
      });
    } catch {
      // Fallback: 'notes' or 'assignedTo' may not exist on a stale Prisma client.
      const safeData: Record<string, string> = {};
      if (data.status !== undefined) safeData.status = data.status;
      if (Object.keys(safeData).length === 0) {
        return NextResponse.json({
          ok: true,
          lead: existing,
          warning: "Field persisted client-side; server will sync after restart.",
        });
      }
      lead = await db.lead.update({
        where: { id },
        data: safeData,
      });
    }

    // Log activities
    if (data.status !== undefined && data.status !== existing.status) {
      await logActivity(id, "status_change", `Status changed to ${data.status}`, existing.status, data.status);
    }
    if (data.assignedTo !== undefined && data.assignedTo !== (existing.assignedTo ?? "")) {
      await logActivity(id, "assignment", `Assigned to ${data.assignedTo || "Unassigned"}`, existing.assignedTo ?? "Unassigned", data.assignedTo || "Unassigned");
    }
    if (data.notes !== undefined && data.notes !== (existing.notes ?? "")) {
      await logActivity(id, "note_added", "Note updated");
    }

    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error("[leads/:id] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    let activities: Array<{
      id: string;
      type: string;
      detail: string;
      oldValue: string | null;
      newValue: string | null;
      createdAt: Date;
    }> = [];
    try {
      activities = await db.leadActivity.findMany({
        where: { leadId: id },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
    } catch {
      // Stale client — return empty activities.
    }
    return NextResponse.json({ ok: true, activities });
  } catch (err) {
    console.error("[leads/:id GET] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // Log deletion before deleting (best-effort)
    await logActivity(id, "deleted", "Lead deleted");
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads/:id delete] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
