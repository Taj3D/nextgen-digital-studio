import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'

const doc = await PDFDocument.create()
const font = await doc.embedFont(StandardFonts.HelveticaBold)

const page = doc.addPage([595, 842])
page.drawText('PDF WITH IMAGE', { x: 100, y: 700, size: 24, font, color: rgb(0,0,0) })

// Draw rectangles as visual elements
page.drawRectangle({ x: 100, y: 400, width: 200, height: 150, color: rgb(1, 0, 0) })
page.drawText('Red Rectangle', { x: 130, y: 460, size: 14, font, color: rgb(1,1,1) })

writeFileSync('test-pdfs/pdf-with-image.pdf', await doc.save())
console.log('Created pdf-with-image.pdf')
