/**
 * ============================================================================
 * PDF.js Setup — Shared worker configuration for Phase 1B tools
 * ----------------------------------------------------------------------------
 * This file is imported ONLY by the 3 Phase 1B tool components:
 *   - pdf-viewer-tool.tsx
 *   - pdf-to-text-tool.tsx
 *   - extract-images-tool.tsx
 *
 * It is NEVER imported by pdf-client.tsx directly, ensuring PDF.js is
 * lazy-loaded only when one of these tools is opened.
 *
 * Worker strategy: import.meta.url pattern
 *   - Works with Next.js 16 Turbopack
 *   - Vercel serves worker as static asset
 *   - No CDN dependency (privacy-first)
 *   - CSP worker-src 'self' blob: allows it
 * ============================================================================
 */

import * as pdfjsLib from 'pdfjs-dist'

// Set worker source — uses the bundled worker file from pdfjs-dist
// The `new URL(..., import.meta.url)` pattern is handled by Turbopack/Webpack
// and produces a separate chunk that Vercel serves as a static asset.
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
}

export { pdfjsLib }
export type PdfDocument = pdfjsLib.PDFDocumentProxy
export type PdfPage = pdfjsLib.PDFPageProxy
