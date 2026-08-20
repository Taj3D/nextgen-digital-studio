/**
 * ============================================================================
 * Phase 2C Wave 1 — Annotation QA Fixture Generator
 * ----------------------------------------------------------------------------
 * Generates 10 test fixtures (A-J) for annotation QA.
 * Uses pdf-lib for text + form generation, sharp for rasterization.
 * ============================================================================
 */

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')


const OUT_DIR = __dirname

// =============================================================================
// Helpers
// =============================================================================

async function writePdf(filename, bytes) {
  fs.writeFileSync(path.join(OUT_DIR, filename), bytes)
  console.log(`  ✓ ${filename} (${(bytes.length / 1024).toFixed(1)} KB)`)
}

// =============================================================================
// Fixture A: Selectable text PDF (single page, multi-line)
// =============================================================================
async function makeFixtureA() {
  console.log('Fixture A: Selectable text PDF')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  page.drawText('The quick brown fox jumps over the lazy dog.', { x: 50, y: 700, size: 14, font })
  page.drawText('Pack my box with five dozen liquor jugs.', { x: 50, y: 670, size: 14, font })
  page.drawText('How vexingly quick daft zebras jump!', { x: 50, y: 640, size: 14, font })
  page.drawText('Sphinx of black quartz, judge my vow.', { x: 50, y: 610, size: 14, font })
  await writePdf('pdf-annot-text.pdf', await doc.save())
}

// =============================================================================
// Fixture B: Multiline text PDF (for multi-line highlight)
// =============================================================================
async function makeFixtureB() {
  console.log('Fixture B: Multiline text PDF')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  const lines = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    'Duis aute irure dolor in reprehenderit in voluptate velit.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
  ]
  let y = 700
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 14, font })
    y -= 20
  }
  await writePdf('pdf-annot-multiline.pdf', await doc.save())
}

// =============================================================================
// Fixture C: Image-only PDF (scanned, no text layer)
// =============================================================================
async function makeFixtureC() {
  console.log('Fixture C: Image-only PDF')
  // Reuse existing pdf-image-only.pdf if it exists
  const src = path.join(OUT_DIR, 'pdf-image-only.pdf')
  if (fs.existsSync(src)) {
    console.log('  (already exists — pdf-image-only.pdf)')
    return
  }
  // Generate one
  const png = await sharp({ text: { text: 'Scanned image content', dpi: 300 } }).flatten().png().toBuffer()
  const doc = await PDFDocument.create()
  const img = await doc.embedPng(png)
  const page = doc.addPage([img.width, img.height])
  page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  await writePdf('pdf-annot-image-only.pdf', await doc.save())
}

// =============================================================================
// Fixture D: Rotated PDF (90°)
// =============================================================================
async function makeFixtureD() {
  console.log('Fixture D: Rotated PDF')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  page.drawText('This page is rotated 90 degrees.', { x: 50, y: 700, size: 14, font })
  // Set rotation
  page.setRotation({ angle: 90, type: 'degrees' })
  await writePdf('pdf-annot-rotated.pdf', await doc.save())
}

// =============================================================================
// Fixture E: PDF with existing annotations
// =============================================================================
async function makeFixtureE() {
  console.log('Fixture E: PDF with existing annotations')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  page.drawText('This PDF has existing annotations.', { x: 50, y: 700, size: 14, font })

  // Add existing highlight annotation
  const context = doc.context
  const highlightDict = context.obj({
    Type: 'Annot',
    Subtype: 'Highlight',
    Rect: [50, 690, 350, 710],
    C: [1, 1, 0],
    F: 4,
    Contents: 'Existing highlight',
    QuadPoints: [50, 710, 350, 710, 50, 690, 350, 690],
  })
  page.node.addAnnot(highlightDict)

  // Add existing sticky note
  const noteDict = context.obj({
    Type: 'Annot',
    Subtype: 'Text',
    Rect: [400, 600, 420, 620],
    C: [1, 1, 0],
    F: 4,
    Contents: 'Existing sticky note',
    T: 'Previous Author',
  })
  page.node.addAnnot(noteDict)

  await writePdf('pdf-annot-existing.pdf', await doc.save())
}

// =============================================================================
// Fixture F: PDF with form fields
// =============================================================================
async function makeFixtureF() {
  console.log('Fixture F: PDF with form fields')
  const src = path.join(OUT_DIR, 'pdf-form-test.pdf')
  if (fs.existsSync(src)) {
    console.log('  (already exists — pdf-form-test.pdf)')
    return
  }
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  page.drawText('Name:', { x: 50, y: 700, size: 12, font })
  const form = doc.getForm()
  const nameField = form.createTextField('name')
  nameField.addToPage(page, { x: 120, y: 695, width: 200, height: 20 })
  await writePdf('pdf-annot-forms.pdf', await doc.save())
}

// =============================================================================
// Fixture G: Multi-page PDF (3 pages)
// =============================================================================
async function makeFixtureG() {
  console.log('Fixture G: Multi-page PDF')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  for (let i = 1; i <= 3; i++) {
    const page = doc.addPage([612, 792])
    page.drawText(`Page ${i}`, { x: 50, y: 700, size: 24, font })
    page.drawText(`This is page ${i} of the multi-page test document.`, { x: 50, y: 670, size: 14, font })
  }
  await writePdf('pdf-annot-multipage.pdf', await doc.save())
}

// =============================================================================
// Fixture H: Landscape PDF
// =============================================================================
async function makeFixtureH() {
  console.log('Fixture H: Landscape PDF')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([792, 612])  // landscape
  page.drawText('Landscape orientation page.', { x: 50, y: 550, size: 14, font })
  await writePdf('pdf-annot-landscape.pdf', await doc.save())
}

// =============================================================================
// Fixture I: Large PDF (50 pages)
// =============================================================================
async function makeFixtureI() {
  console.log('Fixture I: Large PDF (50 pages)')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  for (let i = 1; i <= 50; i++) {
    const page = doc.addPage([612, 792])
    page.drawText(`Page ${i} of 50`, { x: 50, y: 700, size: 14, font })
    page.drawText(`Large document performance test — page ${i}.`, { x: 50, y: 670, size: 12, font })
  }
  await writePdf('pdf-annot-large.pdf', await doc.save())
}

// =============================================================================
// Fixture J: Malicious annotation fixture (JS, Launch, javascript: URI)
// =============================================================================
async function makeFixtureJ() {
  console.log('Fixture J: Malicious annotation fixture')
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])
  page.drawText('This PDF contains malicious annotations for security testing.', { x: 50, y: 700, size: 12, font })
  page.drawText('JavaScript, Launch, and javascript: URI actions must NOT execute.', { x: 50, y: 680, size: 12, font })

  const context = doc.context

  // Malicious JS annotation
  const jsAnnot = context.obj({
    Type: 'Annot',
    Subtype: 'Text',
    Rect: [100, 600, 120, 620],
    Contents: 'Malicious JS annotation',
    A: { Type: 'Action', S: 'JavaScript', JS: 'app.alert("XSS executed!");' },
  })
  page.node.addAnnot(jsAnnot)

  // Malicious Launch annotation
  const launchAnnot = context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [200, 600, 220, 620],
    Contents: 'Malicious Launch annotation',
    A: { Type: 'Action', S: 'Launch', F: '/usr/bin/calc', Win: { F: 'calc.exe' } },
  })
  page.node.addAnnot(launchAnnot)

  // Malicious URI annotation
  const uriAnnot = context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [300, 600, 320, 620],
    Contents: 'Malicious URI annotation',
    A: { Type: 'Action', S: 'URI', URI: 'javascript:alert("XSS")' },
  })
  page.node.addAnnot(uriAnnot)

  await writePdf('pdf-annot-malicious.pdf', await doc.save())
}

// =============================================================================
// Main
// =============================================================================
async function main() {
  console.log('=== Phase 2C Wave 1 — Annotation Fixture Generator ===\n')
  await makeFixtureA()
  await makeFixtureB()
  await makeFixtureC()
  await makeFixtureD()
  await makeFixtureE()
  await makeFixtureF()
  await makeFixtureG()
  await makeFixtureH()
  await makeFixtureI()
  await makeFixtureJ()
  console.log('\n=== All 10 fixtures generated ===')
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
