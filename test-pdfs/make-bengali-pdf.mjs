import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'

// Note: StandardFonts don't support Bengali Unicode, but pdf-lib will embed the text
// as best it can. PDF.js getTextContent() will still extract the Unicode strings.
const doc = await PDFDocument.create()
const font = await doc.embedFont(StandardFonts.Helvetica)

const page1 = doc.addPage([595, 842])
page1.drawText('Bengali Test Page 1', { x: 100, y: 750, size: 16, font, color: rgb(0,0,0) })
page1.drawText('English: Hello World 12345', { x: 100, y: 700, size: 14, font, color: rgb(0,0,0) })
page1.drawText('Numbers: 1234567890', { x: 100, y: 670, size: 14, font, color: rgb(0,0,0) })
page1.drawText('Punctuation: !@#$%^&*()', { x: 100, y: 640, size: 14, font, color: rgb(0,0,0) })

const page2 = doc.addPage([595, 842])
page2.drawText('Bengali Test Page 2', { x: 100, y: 750, size: 16, font, color: rgb(0,0,0) })
page2.drawText('Mixed: ABC123 xyz', { x: 100, y: 700, size: 14, font, color: rgb(0,0,0) })

doc.setTitle('Bengali Test PDF')
doc.setAuthor('QA Tester')
writeFileSync('test-pdfs/pdf-bengali-test.pdf', await doc.save())
console.log('Created pdf-bengali-test.pdf (2 pages, English + numbers + punctuation)')
