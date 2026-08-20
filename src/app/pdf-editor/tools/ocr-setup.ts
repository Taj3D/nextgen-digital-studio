/**
 * ============================================================================
 * OCR Setup — tesseract.js worker/core/lang path configuration
 * ----------------------------------------------------------------------------
 * Self-hosted OCR assets in /public/ocr/. NO external CDN.
 * CSP-compatible: worker-src 'self' blob:, connect-src 'self'.
 *
 * Assets (all same-origin):
 *   /ocr/worker.min.js                    — tesseract.js worker (111 KB)
 *   /ocr/tesseract-core-simd-lstm.wasm.js — SIMD+LSTM core (3.95 MB, modern browsers)
 *   /ocr/tesseract-core-lstm.wasm.js      — LSTM core fallback (3.95 MB)
 *   /ocr/eng.traineddata                  — English (tessdata_fast 4.1.0, 4.1 MB)
 *   /ocr/ben.traineddata                  — Bengali (tessdata_best 4.1.0, 11 MB)
 *
 * gzip: false — Vercel auto-compresses at HTTP transport layer.
 * ============================================================================
 */

export type OcrLang = 'eng' | 'ben' | 'ben+eng'

export const OCR_LANG_LABELS: Record<OcrLang, { en: string; bn: string }> = {
  eng: { en: 'English', bn: 'ইংরেজি' },
  ben: { en: 'Bangla', bn: 'বাংলা' },
  'ben+eng': { en: 'Bangla + English', bn: 'বাংলা + ইংরেজি' },
}

/**
 * Base path for self-hosted OCR assets.
 * Uses relative path so it works on both localhost and Vercel.
 */
const OCR_BASE = '/ocr'

/**
 * Create a tesseract.js worker with self-hosted assets.
 * Must be called from the browser only (uses window/document).
 */
export async function createOcrWorker(
  lang: OcrLang,
  onProgress?: (status: string, progress: number) => void,
) {
  // Dynamic import — tesseract.js is lazy-loaded ONLY when OCR tool opens.
  // This keeps it out of the initial /pdf-editor bundle.
  const { createWorker } = await import('tesseract.js')

  const worker = await createWorker(lang, 1, {
    // Self-hosted worker script (same-origin, CSP-compatible)
    workerPath: `${OCR_BASE}/worker.min.js`,
    // Self-hosted core (SIMD-LSTM for modern browsers, auto-fallback to non-SIMD)
    corePath: OCR_BASE,
    // Self-hosted trained data
    langPath: OCR_BASE,
    // Uncompressed traineddata — Vercel auto-compresses at HTTP layer
    gzip: false,
    // Don't cache in IndexedDB (we rely on HTTP cache instead, simpler + honest)
    cacheMethod: 'none',
    // Progress callback
    logger: (m: { status: string; progress: number; jobId?: string }) => {
      if (onProgress && typeof m.progress === 'number') {
        onProgress(m.status, m.progress)
      }
    },
  })

  return worker
}

/**
 * Memory-safe canvas size guard.
 * Returns the effective scale to use, or null if page is too large.
 */
export function getSafeRenderScale(
  baseScale: number,
  viewportWidth: number,
  viewportHeight: number,
  isMobile: boolean,
): { scale: number; capped: boolean } | null {
  const maxDim = isMobile ? 2000 : 4000
  const scaledW = viewportWidth * baseScale
  const scaledH = viewportHeight * baseScale
  if (scaledW <= maxDim && scaledH <= maxDim) {
    return { scale: baseScale, capped: false }
  }
  // Try to fit within max dimension
  const ratio = maxDim / Math.max(scaledW, scaledH)
  const newScale = baseScale * ratio
  if (newScale < 0.5) {
    // Too small to OCR reliably
    return null
  }
  return { scale: newScale, capped: true }
}

/**
 * Detect mobile device for memory guard.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export type OcrPageResult = {
  pageNum: number
  text: string
  confidence: number
}

export type OcrWorkerHandle = {
  recognize: (image: HTMLCanvasElement | string) => Promise<{ data: { text: string; confidence: number } }>
  terminate: () => Promise<void>
}
