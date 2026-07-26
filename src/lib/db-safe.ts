/**
 * Database-safe wrapper — gracefully handles missing/misconfigured DATABASE_URL.
 *
 * On Vercel production without a PostgreSQL database configured, Prisma calls
 * would throw and crash API routes. This wrapper detects when the DB is
 * unavailable and returns a no-op client that safely fails open (returns
 * empty results) instead of throwing 500 errors.
 *
 * This keeps the website fully functional (pages, contact form via Google
 * Sheets, email via SMTP) even when the optional database is not set up.
 *
 * Once a real DATABASE_URL is configured + `bun run db:push` is run,
 * `dbAvailable` becomes true and all writes persist normally.
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  __dbAvailable?: boolean
  __dbChecked?: boolean
}

/**
 * Detect whether a usable DATABASE_URL is configured.
 * - SQLite local dev: "file:..." → available
 * - PostgreSQL prod: "postgresql://..." → available
 * - Missing / empty → unavailable
 */
function detectDbAvailable(): boolean {
  const url = process.env.DATABASE_URL
  if (!url) return false
  if (url.startsWith('file:')) return true
  if (url.startsWith('postgresql://') || url.startsWith('postgres://')) return true
  return false
}

export const dbAvailable = detectDbAvailable()

/**
 * Prisma Client singleton — only instantiated when a DB is actually available.
 * When unavailable, this stays undefined and `safeDb` returns null-safe stubs.
 */
export const db = dbAvailable
  ? (globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === 'production' ? ['error'] : ['error'],
      }))
  : (undefined as unknown as PrismaClient)

if (dbAvailable && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

/**
 * A safe no-op database client used when no DB is configured.
 * Every method returns a benign empty/falsy result so API routes can
 * continue operating (contact form → Google Sheets, newsletter → log only).
 */
const noopProxy = new Proxy(
  {},
  {
    get: () =>
      new Proxy(
        function () {
          return Promise.resolve(undefined)
        },
        {
          get: () => async () => {
            // Default: return undefined for chained calls (e.g. db.newsletterSubscriber.upsert)
            return undefined
          },
          // Prisma model methods that should return arrays
          apply: () => Promise.resolve([]),
        },
      ),
  },
) as unknown as PrismaClient

/**
 * Get a usable DB client, or a no-op proxy if DB is unavailable.
 * Use this in API routes that can degrade gracefully:
 *
 *   const db = getSafeDb()
 *   if (db) await db.newsletterSubscriber.upsert(...)
 */
export function getSafeDb(): PrismaClient | null {
  return dbAvailable ? db : null
}
