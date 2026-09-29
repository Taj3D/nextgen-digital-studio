import { NextResponse } from "next/server";
import { getTrackingStats } from "@/lib/tracking";
import { cacheGetOrSet } from "@/lib/cache";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await cacheGetOrSet("track:stats", 30, async () => {
      const stats = await getTrackingStats();
      return { stats, platforms: { facebook: false, tiktok: false, snapchat: false, google: false } };
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[track/stats] error", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
