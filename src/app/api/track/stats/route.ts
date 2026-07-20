import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTrackingStats } from "@/lib/tracking";
import { cacheGetOrSet } from "@/lib/cache";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Derive which ad-platform Conversions APIs are actually wired up from env
 * presence. Replaces the previous hardcoded `{ facebook: false, tiktok: false,
 * snapchat: false, google: false }` literal (AUDIT-4-api [API-025]).
 *
 * A platform is "live" only when BOTH its pixel-id and access-token env vars
 * are present — either alone is useless.
 */
function getPlatformFlags() {
  return {
    ga4: !!(process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET),
    meta: !!(process.env.FB_PIXEL_ID && process.env.FB_ACCESS_TOKEN),
    snapchat: !!(process.env.SNAP_PIXEL_ID && process.env.SNAPCHAT_ACCESS_TOKEN),
    tiktok: !!(process.env.TIKTOK_PIXEL_ID && process.env.TIKTOK_ACCESS_TOKEN),
  };
}

export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const result = await cacheGetOrSet("track:stats", 30, async () => {
      const stats = await getTrackingStats();
      // Platform flags are env-derived and never change at runtime between
      // deploys, so it's fine to compute them inside the cached factory —
      // a stale cache (max 30s) won't drift from reality.
      return { stats, platforms: getPlatformFlags() };
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[track/stats] error", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
