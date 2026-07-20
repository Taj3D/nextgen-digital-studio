import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escape quotes and wrap in quotes if it contains commas, quotes, or newlines
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (source && source !== "all") where.source = source;
    if (status && status !== "all") where.status = status;

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5000,
    });

    const headers = [
      "Name", "Email", "Phone", "Company", "Service", "Source", "Status",
      "Notes", "Message", "Created At", "Updated At",
    ];

    const rows = leads.map((l) => [
      l.name, l.email, l.phone, l.company ?? "", l.service ?? "",
      l.source, l.status, l.notes ?? "", l.message ?? "",
      new Date(l.createdAt).toISOString(), new Date(l.updatedAt).toISOString(),
    ]);

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((r) => r.map(escapeCsv).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="nextgen-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error("[leads/export] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
