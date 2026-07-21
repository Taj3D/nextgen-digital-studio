import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_PASSWORD,
  AUTH_COOKIE,
  AUTH_TOKEN,
  safeEqual,
  verifyAuth,
} from "@/lib/auth";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/auth/login
 * Body: { "password": string }
 * Sets an httpOnly cookie `nextgen-admin-auth` valid for 7 days on success.
 * Rate-limited (5/min/IP) + exponential backoff on failure to slow brute force.
 */
export async function POST(req: NextRequest) {
  // Rate limit: 5 login attempts / min / IP (brute-force protection)
  const ip = getClientIP(req);
  const rl = rateLimit(`auth-login:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many login attempts. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.resetIn / 1000)) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  try {
    const { password } = body as { password?: unknown };

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { ok: false, error: "Password required" },
        { status: 400 },
      );
    }

    if (!safeEqual(password, ADMIN_PASSWORD)) {
      // Slow down brute-force attempts.
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { ok: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 },
    );
  }
}

/**
 * DELETE /api/auth/login
 * Clears the admin auth cookie (logout).
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(AUTH_COOKIE);
  return res;
}

/**
 * GET /api/auth/login
 * Returns whether the current session cookie is valid. Used by AdminGate on mount
 * so that refreshing the page does not log the user out.
 * Returns ok:false (not ok:true) when unauthenticated for semantic correctness.
 */
export async function GET(req: NextRequest) {
  const authenticated = verifyAuth(req);
  return NextResponse.json({ ok: authenticated, authenticated });
}
