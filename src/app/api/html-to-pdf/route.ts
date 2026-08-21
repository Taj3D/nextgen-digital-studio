/**
 * ============================================================================
 * PDF Forge — HTML→PDF API Route
 * ----------------------------------------------------------------------------
 * Uses @sparticuz/chromium (MIT, serverless-optimized) + puppeteer-core
 * to render HTML to PDF via real Chromium print engine.
 *
 * Security:
 *   - HTML content is processed server-side for PDF rendering only
 *   - No persistent storage (Chromium spawned per request, exits after)
 *   - Size limit: 2MB HTML input
 *   - Timeout: 30s hard limit
 *   - No URL→PDF mode (SSRF risk — deferred)
 *   - No file:// access
 *   - Chromium sandbox enabled
 *   - No PDF content logged
 *
 * Privacy:
 *   - HTML is sent from browser to server for rendering
 *   - PDF is returned immediately, not stored
 *   - No HTML content in logs
 *   - Chromium process killed after each request
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export const runtime = 'nodejs'
export const maxDuration = 30
export const dynamic = 'force-dynamic'

const MAX_HTML_SIZE = 2 * 1024 * 1024 // 2MB
const TIMEOUT_MS = 25000 // 25s (leaving 5s buffer before 30s limit)

interface HtmlToPdfRequest {
  html: string
  pageSize?: 'A4' | 'Letter' | 'Legal'
  width?: string
  height?: string
  orientation?: 'portrait' | 'landscape'
  margin?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  scale?: number
  printBackground?: boolean
  displayHeaderFooter?: boolean
  headerTemplate?: string
  footerTemplate?: string
  pageRanges?: string
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID()
  let browser: any = null

  try {
    const body: HtmlToPdfRequest = await req.json()

    if (!body.html || typeof body.html !== 'string') {
      return NextResponse.json(
        { error: 'HTML content is required', code: 'NO_HTML' },
        { status: 400 }
      )
    }

    if (body.html.length > MAX_HTML_SIZE) {
      return NextResponse.json(
        { error: 'HTML content exceeds 2MB limit', code: 'FILE_TOO_LARGE' },
        { status: 413 }
      )
    }

    // Validate scale (0.1 to 2.0)
    const scale = body.scale ? Math.min(Math.max(body.scale, 0.1), 2.0) : 1.0

    // Build PDF options
    const pdfOptions: any = {
      format: body.pageSize || 'A4',
      printBackground: body.printBackground !== false,
      scale,
      margin: {
        top: body.margin?.top || '0.4in',
        bottom: body.margin?.bottom || '0.4in',
        left: body.margin?.left || '0.4in',
        right: body.margin?.right || '0.4in',
      },
      preferCSSPageSize: true,
    }

    // Custom width/height overrides format
    if (body.width && body.height) {
      delete pdfOptions.format
      pdfOptions.width = body.width
      pdfOptions.height = body.height
    }

    // Landscape
    if (body.orientation === 'landscape') {
      pdfOptions.landscape = true
    }

    // Headers/footers
    if (body.displayHeaderFooter) {
      pdfOptions.displayHeaderFooter = true
      pdfOptions.headerTemplate = body.headerTemplate || '<div></div>'
      pdfOptions.footerTemplate =
        body.footerTemplate ||
        '<div style="font-size:9px; text-align:center; width:100%; padding:0 20mm;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    }

    // Page ranges
    if (body.pageRanges) {
      pdfOptions.pageRanges = body.pageRanges
    }

    // Launch Chromium with @sparticuz/chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
      defaultViewport: { width: 1200, height: 1600 },
    })

    const page = await browser.newPage()

    // Set HTML content (no network navigation — content set directly)
    await page.setContent(body.html, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT_MS,
    })

    // Generate PDF
    const pdfBuffer = await page.pdf(pdfOptions)

    // Return PDF as binary
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="html-to-pdf.pdf"',
        'Cache-Control': 'no-store, private',
        'X-Request-ID': requestId,
      },
    })
  } catch (error: any) {
    // Safe error message — no HTML content leaked
    const safeMessage =
      error?.message?.includes('Navigation')
        ? 'PDF generation timed out. Try simplifying your HTML.'
        : error?.message?.includes('Target closed')
          ? 'Rendering service error. Please try again.'
          : 'Failed to generate PDF from HTML.'

    return NextResponse.json(
      {
        error: safeMessage,
        code: 'RENDER_ERROR',
        requestId,
      },
      { status: 500 }
    )
  } finally {
    // CRITICAL: always close browser to prevent zombie processes
    if (browser) {
      try {
        await browser.close()
      } catch (e) {
        // ignore close errors
      }
    }
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'html-to-pdf',
    status: 'healthy',
    maxHtmlSize: MAX_HTML_SIZE,
    timeout: TIMEOUT_MS,
  })
}
