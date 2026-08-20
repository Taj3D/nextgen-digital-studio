const { PDFDocument, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')

// Polyfill regeneratorRuntime
require('regenerator-runtime/runtime')

async function main() {
  const fontBytes = fs.readFileSync('public/fonts/MahfujLipi.ttf')
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const bengaliFont = await doc.embedFont(fontBytes, { subset: true })

  const page = doc.addPage([595, 842])
  page.drawText('বাংলাদেশে ডিজিটাল স্কিল শিখুন', { x: 50, y: 750, size: 20, font: bengaliFont, color: rgb(0, 0, 0) })
  page.drawText('NextGen Digital Studio', { x: 50, y: 700, size: 16, font: bengaliFont, color: rgb(0, 0, 0) })
  page.drawText('1234567890', { x: 50, y: 650, size: 16, font: bengaliFont, color: rgb(0, 0, 0) })

  const page2 = doc.addPage([595, 842])
  page2.drawText('দ্বিতীয় পৃষ্ঠা', { x: 50, y: 750, size: 20, font: bengaliFont, color: rgb(0, 0, 0) })
  page2.drawText('Bengali + English mixed text', { x: 50, y: 700, size: 14, font: bengaliFont, color: rgb(0, 0, 0) })
  page2.drawText('বাংলা এবং English একসাথে', { x: 50, y: 650, size: 14, font: bengaliFont, color: rgb(0, 0, 0) })

  fs.writeFileSync('test-pdfs/pdf-bengali-unicode.pdf', await doc.save())
  console.log('Created pdf-bengali-unicode.pdf (2 pages, real Bengali Unicode text)')
}
main().catch(e => { console.error(e.message); process.exit(1) })
