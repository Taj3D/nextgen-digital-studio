import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma Client singleton.
// Local dev: SQLite (db/custom.db) — fast, no external service needed.
// Vercel production: PostgreSQL (set DATABASE_URL env var + change schema provider to "postgresql").
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
