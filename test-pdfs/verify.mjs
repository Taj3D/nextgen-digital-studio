import { PDFDocument } from 'pdf-lib'
import { readFileSync } from 'fs'

for (const f of ['pdf-1.pdf','pdf-3.pdf','pdf-5.pdf','pdf-rotated.pdf','pdf-metadata.pdf']) {
  try {
    const bytes = readFileSync('test-pdfs/' + f)
    const doc = await PDFDocument.load(bytes)
    const pages = doc.getPages()
    console.log(`${f}: ${pages.length} pages, ${pages[0].getWidth()}x${pages[0].getHeight()}pt, rotation=${pages[0].getRotation().angle}°`)
    if (doc.getTitle()) console.log(`  title="${doc.getTitle()}" author="${doc.getAuthor()}" subject="${doc.getSubject()}"`)
  } catch(e) {
    console.log(`${f}: ERROR - ${e.message}`)
  }
}

// Verify corrupt fails
try {
  const bytes = readFileSync('test-pdfs/pdf-corrupt.pdf')
  await PDFDocument.load(bytes)
  console.log('pdf-corrupt.pdf: UNEXPECTEDLY LOADED (should fail)')
} catch(e) {
  console.log(`pdf-corrupt.pdf: Correctly rejected - ${e.message.substring(0,60)}`)
}
