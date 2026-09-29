/**
 * In-memory cache with TTL.
 *
 * Simple, dependency-free, process-local cache suitable for short-lived
 * values like ad-platform dedup keys, tracking aggregates, etc.
 *
 * NOTE: Not shared across server instances. For multi-instance deployments
 * use Redis or similar.
 */
type Entry<V> = { value: V; expiresAt: number }

const store = new Map<string, Entry<unknown>>()
const DEFAULT_TTL_SECONDS = 60

export function cacheSet<V>(key: string, value: V, ttlSeconds: number = DEFAULT_TTL_SECONDS): void {
  const expiresAt = Date.now() + ttlSeconds * 1000
  store.set(key, { value, expiresAt })
}

export function cacheGet<V>(key: string): V | undefined {
  const entry = store.get(key)
  if (!entry) return undefined
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return undefined
  }
  return entry.value as V
}

export function cacheDelete(key: string): void {
  store.delete(key)
}

export function cacheClear(): void {
  store.clear()
}

/**
 * Cache-aside helper: returns cached value if present (and fresh),
 * otherwise calls the factory, caches the result, and returns it.
 */
export async function cacheGetOrSet<V>(
  key: string,
  ttlSeconds: number,
  factory: () => Promise<V>,
): Promise<V> {
  const cached = cacheGet<V>(key)
  if (cached !== undefined) return cached
  const fresh = await factory()
  cacheSet(key, fresh, ttlSeconds)
  return fresh
}

export function cacheSize(): number {
  return store.size
}
