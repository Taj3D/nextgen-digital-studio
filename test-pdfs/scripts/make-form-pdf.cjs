const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require('fs')

async function main() {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([595, 842])
  
  page.drawText('FORM TEST PDF', { x: 50, y: 750, size: 20, font, color: rgb(0,0,0) })
  
  const form = doc.getForm()
  
  // Text field
  const textField = form.createTextField('name')
  page.drawText('Name:', { x: 50, y: 650, size: 12, font, color: rgb(0,0,0) })
  textField.addToPage(page, { x: 150, y: 640, width: 200, height: 20 })
  textField.setText('John Doe')
  
  // Checkbox
  const checkbox = form.createCheckBox('subscribe')
  page.drawText('Subscribe:', { x: 50, y: 600, size: 12, font, color: rgb(0,0,0) })
  checkbox.addToPage(page, { x: 150, y: 590, width: 15, height: 15 })
  checkbox.check()
  
  // Dropdown
  const dropdown = form.createDropdown('country')
  page.drawText('Country:', { x: 50, y: 550, size: 12, font, color: rgb(0,0,0) })
  dropdown.addToPage(page, { x: 150, y: 540, width: 150, height: 20 })
  dropdown.setOptions(['Bangladesh', 'USA', 'UK'])
  dropdown.select('Bangladesh')
  
  fs.writeFileSync('test-pdfs/pdf-form-test.pdf', await doc.save())
  console.log('Created pdf-form-test.pdf with 3 form fields (TextField, CheckBox, Dropdown)')
}
main().catch(e => { console.error(e); process.exit(1) })
