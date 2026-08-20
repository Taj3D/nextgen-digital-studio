const { PDFDocument, StandardFonts } = require('pdf-lib')
const fs = require('fs')
require('regenerator-runtime/runtime')
const fontkit = require('@pdf-lib/fontkit')

async function main() {
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const fontBytes = fs.readFileSync('public/fonts/MahfujLipi.ttf')
  const font = await doc.embedFont(fontBytes)
  
  const page = doc.addPage([595, 842])
  page.drawText('Bengali Form Test', { x: 50, y: 750, size: 20, font, color: { type: 'RGB', red: 0, green: 0, blue: 0 } })
  
  const form = doc.getForm()
  const tf = form.createTextField('bengali_name')
  page.drawText('নাম:', { x: 50, y: 650, size: 14, font, color: { type: 'RGB', red: 0, green: 0, blue: 0 } })
  tf.addToPage(page, { x: 150, y: 640, width: 200, height: 20, font })
  
  fs.writeFileSync('test-pdfs/pdf-bengali-form.pdf', await doc.save())
  console.log('Created pdf-bengali-form.pdf with 1 Bengali text field')
}
main().catch(e => { console.error(e); process.exit(1) })
