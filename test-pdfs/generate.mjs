import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'

async function makePdf(pages, opts = {}) {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  for (let i = 0; i < pages.length; i++) {
    const page = doc.addPage([595, 842]) // A4
    page.drawText(pages[i], { x: 100, y: 400, size: 24, font, color: rgb(0,0,0) })
    if (opts.rotate) page.setRotation(degrees(opts.rotate))
  }
  if (opts.title) doc.setTitle(opts.title)
  if (opts.author) doc.setAuthor(opts.author)
  if (opts.subject) doc.setSubject(opts.subject)
  if (opts.keywords) doc.setKeywords(opts.keywords)
  return await doc.save()
}

// PDF-1: 1 page
writeFileSync('test-pdfs/pdf-1.pdf', await makePdf(['PDF FORGE TEST — PAGE 1']))

// PDF-3: 3 pages
writeFileSync('test-pdfs/pdf-3.pdf', await makePdf([
  'PDF FORGE TEST — PAGE 1',
  'PDF FORGE TEST — PAGE 2',
  'PDF FORGE TEST — PAGE 3',
]))

// PDF-5: 5 pages
writeFileSync('test-pdfs/pdf-5.pdf', await makePdf([
  'PDF FORGE TEST — PAGE 1',
  'PDF FORGE TEST — PAGE 2',
  'PDF FORGE TEST — PAGE 3',
  'PDF FORGE TEST — PAGE 4',
  'PDF FORGE TEST — PAGE 5',
]))

// Rotated PDF (90 degrees)
writeFileSync('test-pdfs/pdf-rotated.pdf', await makePdf(
  ['PDF FORGE TEST — ROTATED PAGE 1', 'PDF FORGE TEST — ROTATED PAGE 2'],
  { rotate: 90 }
))

// Metadata PDF
writeFileSync('test-pdfs/pdf-metadata.pdf', await makePdf(
  ['PDF FORGE TEST — METADATA PAGE 1'],
  { title: 'Forge Test Title', author: 'Test Author', subject: 'Test Subject', keywords: ['test','forge'] }
))

// Corrupt PDF (invalid content)
writeFileSync('test-pdfs/pdf-corrupt.pdf', Buffer.from('NOT A REAL PDF FILE CONTENT'))

console.log('Test PDFs created:')
import { readdirSync, statSync } from 'fs'
for (const f of readdirSync('test-pdfs')) {
  if (f.endsWith('.pdf')) {
    const s = statSync('test-pdfs/' + f)
    console.log(`  ${f}: ${s.size} bytes`)
  }
}
