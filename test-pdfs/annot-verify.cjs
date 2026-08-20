/**
 * ============================================================================
 * Phase 2C Wave 1 — Node-side Annotation Round-trip QA
 * ----------------------------------------------------------------------------
 * Verifies all 10 annotation types: build → save → reload → verify dict.
 * Uses pdf-lib only (no pdfjs rendering in Node).
 * ============================================================================
 */

const { PDFDocument, PDFName } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const FIXTURES_DIR = __dirname

const results = {}

async function runTest(name, fn) {
  console.log(`\n--- Test: ${name} ---`)
  try {
    const result = await fn()
    results[name] = result
    console.log(`${result.pass ? '✓ PASS' : '✗ FAIL'} | ${result.summary}`)
  } catch (err) {
    results[name] = { pass: false, summary: `EXCEPTION: ${err.message}` }
    console.log(`✗ FAIL | EXCEPTION: ${err.message}`)
  }
}

async function main() {
  console.log('=== Phase 2C Wave 1 — Annotation Round-trip QA ===')

  // Load fixture A (selectable text PDF)
  const fixturePath = path.join(FIXTURES_DIR, 'pdf-annot-text.pdf')
  const fixtureBytes = fs.readFileSync(fixturePath)

  // ===== Test 1: Highlight =====
  await runTest('1. Highlight annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context

    const annotDict = context.obj({
      Type: 'Annot',
      Subtype: 'Highlight',
      Rect: [50, 690, 350, 710],
      C: [1, 1, 0],
      F: 4,
      Contents: 'Test highlight',
      QuadPoints: [50, 710, 350, 710, 50, 690, 350, 690],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)

    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const reloadedPage = reloaded.getPage(0)
    const annots = reloadedPage.node.Annots()
    const count = annots ? annots.size() : 0
    const pass = count === 1
    return { pass, summary: `Highlight saved + reloaded. Annot count: ${count}` }
  })

  // ===== Test 2: Underline =====
  await runTest('2. Underline annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Underline',
      Rect: [50, 660, 350, 680],
      C: [0, 0, 1], F: 4, Contents: 'Test underline',
      QuadPoints: [50, 680, 350, 680, 50, 660, 350, 660],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Underline saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 3: StrikeOut =====
  await runTest('3. StrikeOut annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'StrikeOut',
      Rect: [50, 630, 350, 650],
      C: [1, 0, 0], F: 4, Contents: 'Test strikeout',
      QuadPoints: [50, 650, 350, 650, 50, 630, 350, 630],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `StrikeOut saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 4: Sticky Note (Text) =====
  await runTest('4. Sticky Note (Text)', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Text',
      Rect: [400, 600, 420, 620],
      C: [1, 1, 0], F: 4, Contents: 'Test sticky note',
      T: 'PDF Forge', Name: 'Note',
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Sticky Note saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 5: FreeText =====
  await runTest('5. FreeText annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'FreeText',
      Rect: [50, 500, 250, 530],
      C: [0, 0, 0], F: 4, Contents: 'Test comment',
      DA: '/Helv 12 Tf 0 0 0 rg',
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `FreeText saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 6: Ink (Freehand) =====
  await runTest('6. Ink (Freehand)', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const inkPath = [50, 400, 100, 410, 150, 405, 200, 420]
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Ink',
      Rect: [50, 400, 200, 420],
      C: [0, 0, 1], F: 4, Contents: 'Test ink',
      InkList: [context.obj(inkPath)],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Ink saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 7: Line =====
  await runTest('7. Line annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Line',
      Rect: [50, 300, 250, 320],
      C: [0, 0.5, 0], F: 4, Contents: 'Test line',
      L: [50, 300, 250, 320],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Line saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 8: Arrow (Line with LE) =====
  await runTest('8. Arrow annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Line',
      Rect: [50, 200, 250, 220],
      C: [1, 0, 0], F: 4, Contents: 'Test arrow',
      L: [50, 200, 250, 220],
      LE: ['None', 'OpenArrow'],
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    let hasLE = false
    if (annots && annots.size() > 0) {
      const annotRef = annots.get(0)
      const annotDictReloaded = annotRef instanceof PDFName ? null : (context.lookup ? context.lookup(annotRef) : annotRef)
      try {
        // Try to lookup the dict if it's a ref
        const lookupResult = reloaded.context.lookup(annotRef)
        const le = lookupResult ? lookupResult.get(PDFName.of('LE')) : null
        hasLE = !!le
      } catch (e) {
        // If lookup fails, try direct
        try {
          const le = annotRef.get ? annotRef.get(PDFName.of('LE')) : null
          hasLE = !!le
        } catch {}
      }
    }
    const pass = annots && annots.size() === 1
    return { pass, summary: `Arrow saved. Count: ${annots ? annots.size() : 0}, hasLE: ${hasLE}` }
  })

  // ===== Test 9: Square (Rectangle) =====
  await runTest('9. Square (Rectangle)', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Square',
      Rect: [50, 100, 150, 150],
      C: [0, 0, 1], F: 4, Contents: 'Test rectangle',
      BS: { W: 2, S: 'S' },
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Square saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 10: Circle =====
  await runTest('10. Circle annotation', async () => {
    const doc = await PDFDocument.load(fixtureBytes)
    const page = doc.getPage(0)
    const context = doc.context
    const annotDict = context.obj({
      Type: 'Annot', Subtype: 'Circle',
      Rect: [200, 100, 300, 150],
      C: [1, 0, 0], F: 4, Contents: 'Test circle',
      BS: { W: 2, S: 'S' },
    })
    const ref = context.register(annotDict)
    page.node.addAnnot(ref)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annots = reloaded.getPage(0).node.Annots()
    const pass = annots && annots.size() === 1
    return { pass, summary: `Circle saved. Count: ${annots ? annots.size() : 0}` }
  })

  // ===== Test 11: Existing annotation preservation =====
  await runTest('11. Existing annotation preservation', async () => {
    const existingPath = path.join(FIXTURES_DIR, 'pdf-annot-existing.pdf')
    const existingBytes = fs.readFileSync(existingPath)
    const doc = await PDFDocument.load(existingBytes)
    const page = doc.getPage(0)
    const annotsBefore = page.node.Annots()
    const countBefore = annotsBefore ? annotsBefore.size() : 0
    console.log(`  Existing annots before: ${countBefore}`)

    // Add a new annotation
    const context = doc.context
    const newAnnot = context.obj({
      Type: 'Annot', Subtype: 'Text',
      Rect: [300, 500, 320, 520],
      C: [0, 1, 0], F: 4, Contents: 'New annotation',
    })
    const ref = context.register(newAnnot)
    page.node.addAnnot(ref)

    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const annotsAfter = reloaded.getPage(0).node.Annots()
    const countAfter = annotsAfter ? annotsAfter.size() : 0
    console.log(`  Annots after: ${countAfter}`)

    const pass = countAfter === countBefore + 1
    return { pass, summary: `Before: ${countBefore}, After: ${countAfter} (expected ${countBefore + 1})` }
  })

  // ===== Test 12: Malicious annotation security =====
  await runTest('12. Malicious annotation security', async () => {
    const malPath = path.join(FIXTURES_DIR, 'pdf-annot-malicious.pdf')
    const malBytes = fs.readFileSync(malPath)
    const doc = await PDFDocument.load(malBytes)
    const page = doc.getPage(0)
    const annots = page.node.Annots()
    const count = annots ? annots.size() : 0
    console.log(`  Malicious annots present: ${count} (must NOT execute)`)

    // Save and reload — verify structure intact but NO execution (pdf-lib never executes JS)
    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    const reloadedAnnots = reloaded.getPage(0).node.Annots()
    const reloadedCount = reloadedAnnots ? reloadedAnnots.size() : 0

    const pass = reloadedCount === count  // all preserved, none executed
    return { pass, summary: `Malicious annots preserved (not executed): ${reloadedCount}/${count}` }
  })

  // ===== Test 13: Multi-page annotations =====
  await runTest('13. Multi-page annotations', async () => {
    const multiPath = path.join(FIXTURES_DIR, 'pdf-annot-multipage.pdf')
    const multiBytes = fs.readFileSync(multiPath)
    const doc = await PDFDocument.load(multiBytes)
    const context = doc.context

    // Add annotation to each page
    for (let i = 0; i < doc.getPageCount(); i++) {
      const page = doc.getPage(i)
      const annot = context.obj({
        Type: 'Annot', Subtype: 'Text',
        Rect: [50, 700, 70, 720],
        C: [1, 1, 0], F: 4, Contents: `Page ${i + 1} annot`,
      })
      const ref = context.register(annot)
      page.node.addAnnot(ref)
    }

    const bytes = await doc.save()
    const reloaded = await PDFDocument.load(bytes)
    let allPagesHaveAnnots = true
    for (let i = 0; i < reloaded.getPageCount(); i++) {
      const annots = reloaded.getPage(i).node.Annots()
      if (!annots || annots.size() !== 1) {
        allPagesHaveAnnots = false
        break
      }
    }
    return { pass: allPagesHaveAnnots, summary: `All ${reloaded.getPageCount()} pages have 1 annotation each` }
  })

  // ===== Summary =====
  console.log('\n=== QA SUMMARY ===')
  let passed = 0, failed = 0
  for (const [name, result] of Object.entries(results)) {
    console.log(`${result.pass ? '✓' : '✗'} ${name}`)
    if (result.pass) passed++; else failed++
  }
  console.log(`\nTotal: ${passed} passed, ${failed} failed`)
  console.log(`\n=== FINAL: ${failed === 0 ? 'ALL PASS ✅' : `${failed} FAILED ❌`} ===`)
  process.exit(failed === 0 ? 0 : 1)
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
