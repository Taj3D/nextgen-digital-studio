const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require('fs')

async function main() {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([595, 842])
  page.drawText('Radio Group Test', { x: 50, y: 750, size: 20, font, color: rgb(0,0,0) })
  
  const form = doc.getForm()
  
  // Radio group with 3 options
  const radio = form.createRadioGroup('gender')
  page.drawText('Gender:', { x: 50, y: 650, size: 14, font, color: rgb(0,0,0) })
  radio.addOptionToPage('Male', page, { x: 150, y: 645, width: 15, height: 15 })
  page.drawText('Male', { x: 170, y: 647, size: 12, font, color: rgb(0,0,0) })
  radio.addOptionToPage('Female', page, { x: 250, y: 645, width: 15, height: 15 })
  page.drawText('Female', { x: 270, y: 647, size: 12, font, color: rgb(0,0,0) })
  radio.addOptionToPage('Other', page, { x: 350, y: 645, width: 15, height: 15 })
  page.drawText('Other', { x: 370, y: 647, size: 12, font, color: rgb(0,0,0) })
  
  // Text field for name
  const nameField = form.createTextField('fullname')
  page.drawText('Full Name:', { x: 50, y: 600, size: 14, font, color: rgb(0,0,0) })
  nameField.addToPage(page, { x: 150, y: 590, width: 200, height: 20 })
  
  fs.writeFileSync('test-pdfs/pdf-radio-form.pdf', await doc.save())
  console.log('Created pdf-radio-form.pdf with RadioGroup (3 options) + TextField')
}
main().catch(e => { console.error(e); process.exit(1) })
