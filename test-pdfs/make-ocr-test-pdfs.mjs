/**
 * ============================================================================
 * Phase 2B OCR — Fixture Generator (v2)
 * ----------------------------------------------------------------------------
 * Uses sharp + pango for text rendering (proper Bengali conjunct shaping).
 * @napi-rs/canvas doesn't support Indic CTL, so sharp is required.
 *
 * Generates 5 new test PDFs (A/B/C/F/H) + raw PNGs for Node QA.
 * Fixtures D/E/G already exist.
 * ============================================================================
 */

import sharp from 'sharp'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = __dirname

// =============================================================================
// Helpers
// =============================================================================

/**
 * Render text lines to a PNG buffer using sharp + pango.
 * @param {string[]} lines - text lines
 * @param {object} opts - { font, fontSize, dpi }
 */
async function renderTextToPng(lines, opts) {
  const { font = 'DejaVu Sans', fontSize = 24, dpi = 300 } = opts
  // Use pango markup to specify font per line
  const lineHeight = Math.round(fontSize * 1.5)
  const markup = lines.map(line =>
    `<span font="${font} ${fontSize}">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`
  ).join('\n')

  const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><text>${markup}</text></svg>`

  // Use sharp's text renderer with pango markup
  const png = await sharp({
    text: {
      text: markup,
      dpi,
      rgba: true,
      align: 'left',
    },
  })
    .flatten({ background: '#ffffff' })
    .png()
    .toBuffer()

  return png
}

/**
 * Render mixed-language lines (different fonts per line) to a single PNG.
 * Each line: { text, font, fontSize }
 */
async function renderMixedToPng(lineSpecs, dpi = 300) {
  const markups = lineSpecs.map(spec => {
    const escaped = spec.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<span font="${spec.font} ${spec.fontSize}">${escaped}</span>`
  })
  const markup = markups.join('\n')

  const png = await sharp({
    text: {
      text: markup,
      dpi,
      rgba: true,
      align: 'left',
    },
  })
    .flatten({ background: '#ffffff' })
    .png()
    .toBuffer()

  return png
}

async function pngToPdf(pngBuffer) {
  const pdfDoc = await PDFDocument.create()
  const img = await pdfDoc.embedPng(pngBuffer)
  const page = pdfDoc.addPage([img.width, img.height])
  page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  return await pdfDoc.save()
}

async function pngsToPdf(pngBuffers) {
  const pdfDoc = await PDFDocument.create()
  for (const pngBuffer of pngBuffers) {
    const img = await pdfDoc.embedPng(pngBuffer)
    const page = pdfDoc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  }
  return await pdfDoc.save()
}

function writePdf(filename, pdfBytes) {
  fs.writeFileSync(path.join(OUT_DIR, filename), pdfBytes)
  console.log(`  ✓ ${filename} (${(pdfBytes.length / 1024).toFixed(1)} KB)`)
}

function writePng(filename, pngBuffer) {
  fs.writeFileSync(path.join(OUT_DIR, filename), pngBuffer)
  console.log(`  ✓ ${filename} (${(pngBuffer.length / 1024).toFixed(1)} KB)`)
}

// =============================================================================
// Fixtures
// =============================================================================

async function makeFixtureA() {
  console.log('Fixture A: English scanned PDF (300 DPI)')
  const png = await renderTextToPng([
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
    'How vexingly quick daft zebras jump!',
    'Sphinx of black quartz, judge my vow.',
  ], { font: 'DejaVu Sans', fontSize: 32, dpi: 300 })
  const pdf = await pngToPdf(png)
  writePdf('pdf-ocr-english-scan.pdf', pdf)
  writePng('pdf-ocr-english-scan.png', png)
}

async function makeFixtureB() {
  console.log('Fixture B: Bengali scanned PDF (300 DPI)')
  const png = await renderTextToPng([
    'বাংলাদেশে ডিজিটাল স্কিল শিখুন',
    'আধুনিক প্রযুক্তি শিক্ষা ও উন্নয়ন',
    'নেক্সটজেন ডিজিটাল স্টুডিও',
  ], { font: 'Noto Sans Bengali', fontSize: 36, dpi: 300 })
  const pdf = await pngToPdf(png)
  writePdf('pdf-ocr-bengali-scan.pdf', pdf)
  writePng('pdf-ocr-bengali-scan.png', png)
}

async function makeFixtureC() {
  console.log('Fixture C: Mixed Bangla + English (300 DPI)')
  const png = await renderMixedToPng([
    { text: 'Learn digital skills in Bangladesh', font: 'DejaVu Sans', fontSize: 32 },
    { text: 'বাংলাদেশে ডিজিটাল স্কিল শিখুন', font: 'Noto Sans Bengali', fontSize: 36 },
    { text: 'Digital স্কিল in বাংলাদেশ', font: 'Noto Sans Bengali', fontSize: 34 },
    { text: 'NextGen Digital Studio 2025', font: 'DejaVu Sans', fontSize: 32 },
  ], 300)
  const pdf = await pngToPdf(png)
  writePdf('pdf-ocr-mixed-scan.pdf', pdf)
  writePng('pdf-ocr-mixed-scan.png', png)
}

async function makeFixtureF() {
  console.log('Fixture F: Low-resolution English scan (150 DPI)')
  const png = await renderTextToPng([
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
  ], { font: 'DejaVu Sans', fontSize: 32, dpi: 150 })
  const pdf = await pngToPdf(png)
  writePdf('pdf-ocr-lowres-scan.pdf', pdf)
  writePng('pdf-ocr-lowres-scan.png', png)
}

async function makeFixtureH() {
  console.log('Fixture H: 3-page mixed document')
  const pngs = []

  // Page 1: English
  pngs.push(await renderTextToPng([
    'Page 1: English Text',
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
  ], { font: 'DejaVu Sans', fontSize: 32, dpi: 300 }))

  // Page 2: Bengali
  pngs.push(await renderTextToPng([
    'পৃষ্ঠা ২: বাংলা টেক্সট',
    'বাংলাদেশে ডিজিটাল স্কিল শিখুন',
    'আধুনিক প্রযুক্তি শিক্ষা',
  ], { font: 'Noto Sans Bengali', fontSize: 36, dpi: 300 }))

  // Page 3: Mixed
  pngs.push(await renderMixedToPng([
    { text: 'Page 3: Mixed Bangla and English', font: 'DejaVu Sans', fontSize: 32 },
    { text: 'Learn ডিজিটাল স্কিল in বাংলাদেশ', font: 'Noto Sans Bengali', fontSize: 34 },
    { text: 'NextGen Digital Studio', font: 'DejaVu Sans', fontSize: 32 },
  ], 300))

  const pdf = await pngsToPdf(pngs)
  writePdf('pdf-ocr-multipage-scan.pdf', pdf)
  pngs.forEach((png, i) => writePng(`pdf-ocr-multipage-p${i + 1}.png`, png))
}

async function main() {
  console.log('=== Phase 2B OCR Fixture Generator (v2 — sharp+pango) ===\n')
  await makeFixtureA()
  await makeFixtureB()
  await makeFixtureC()
  await makeFixtureF()
  await makeFixtureH()
  console.log('\n=== All fixtures generated ===')
  console.log('Fixtures D (pdf-image-only.pdf), E (pdf-rotated.pdf), G (pdf-corrupt.pdf) already exist.')
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
