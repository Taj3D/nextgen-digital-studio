const { PDFDocument, StandardFonts } = require('pdf-lib')
const fs = require('fs')

async function main() {
  const start = Date.now()
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([595, 842])
  const form = doc.getForm()
  
  for (let i = 0; i < 50; i++) {
    const field = form.createTextField(`field_${i}`)
    field.addToPage(page, { x: 50, y: 800 - i * 15, width: 200, height: 12 })
    field.setText(`Value ${i}`)
  }
  for (let i = 0; i < 10; i++) {
    const cb = form.createCheckBox(`check_${i}`)
    cb.addToPage(page, { x: 300, y: 800 - i * 15, width: 12, height: 12 })
    if (i % 2 === 0) cb.check()
  }
  for (let i = 0; i < 5; i++) {
    const dd = form.createDropdown(`dropdown_${i}`)
    dd.addToPage(page, { x: 400, y: 800 - i * 15, width: 100, height: 12 })
    dd.setOptions(['Option A', 'Option B', 'Option C'])
    dd.select('Option A')
  }
  
  const bytes = await doc.save()
  fs.writeFileSync('test-pdfs/pdf-large-form.pdf', bytes)
  const elapsed = Date.now() - start
  console.log(`Created: ${bytes.length} bytes in ${elapsed}ms, 65 fields`)
  
  const loadStart = Date.now()
  const doc2 = await PDFDocument.load(bytes)
  const form2 = doc2.getForm()
  const fields2 = form2.getFields()
  const loadElapsed = Date.now() - loadStart
  console.log(`Discovery: ${fields2.length} fields in ${loadElapsed}ms`)
}
main().catch(e => console.error(e))
