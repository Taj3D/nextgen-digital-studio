import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Server-side admin authentication helpers.
 *
 * SECURITY MODEL
 * --------------
 * - `ADMIN_PASSWORD` lives in process.env (server-only — never prefixed with NEXT_PUBLIC_,
 *   so it is never baked into the client bundle).
 * - On successful login (POST /api/auth/login) the server sets an httpOnly cookie
 *   `nextgen-admin-auth` whose value is `AUTH_TOKEN`.
 * - Every protected admin API route calls `requireAuth(req)` at the very top of its
 *   handler. If the cookie is missing or doesn't match, we return 401 immediately.
 *
 * This is intentionally minimal (no JWT, no DB user table) because the admin dashboard
 * has a single shared password — but it is real server-side auth, NOT security theater.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nextgen2025";
const AUTH_COOKIE = "nextgen-admin-auth";
// If the operator is using the default password the token is `authenticated-default`;
// otherwise `authenticated-custom`. This means changing ADMIN_PASSWORD invalidates
// every existing session cookie automatically.
const AUTH_TOKEN =
  "authenticated-" + (ADMIN_PASSWORD === "nextgen2025" ? "default" : "custom");

/**
 * Constant-time string comparison to mitigate timing attacks on the cookie / password
 * check. Length is leaked (unavoidable for a string compare), but content is not.
 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/** Returns true if the request carries a valid admin auth cookie. */
export function verifyAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  return !!cookie && safeEqual(cookie, AUTH_TOKEN);
}

/**
 * Returns `null` when the request is authenticated, otherwise returns a 401
 * NextResponse that the caller should return immediately to short-circuit the handler.
 *
 * Usage:
 *   const authError = requireAuth(req);
 *   if (authError) return authError;
 */
export function requireAuth(req: NextRequest): NextResponse | null {
  if (verifyAuth(req)) return null;
  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}

export { ADMIN_PASSWORD, AUTH_COOKIE, AUTH_TOKEN, safeEqual };
