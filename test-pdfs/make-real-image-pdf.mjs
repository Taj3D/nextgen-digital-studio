import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'

// Create a simple PNG image (1x1 red pixel)
const pngBytes = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, // 8-bit RGB
  0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
  0x08, 0xD7, 0x63, 0xF8, 0xCF, 0xC0, 0x00, 0x00, // compressed data
  0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC, 0x33, // CRC
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND
  0xAE, 0x42, 0x60, 0x82
])

const doc = await PDFDocument.create()
const font = await doc.embedFont(StandardFonts.HelveticaBold)

// Embed PNG
const pngImg = await doc.embedPng(pngBytes)

// Page 1: Text + PNG image
const page1 = doc.addPage([595, 842])
page1.drawText('PAGE 1 - WITH PNG IMAGE', { x: 100, y: 700, size: 20, font, color: rgb(0,0,0) })
page1.drawImage(pngImg, { x: 100, y: 400, width: 200, height: 200 })

// Page 2: Text + another PNG
const page2 = doc.addPage([595, 842])
page2.drawText('PAGE 2 - SECOND IMAGE', { x: 100, y: 700, size: 20, font, color: rgb(0,0,0) })
page2.drawImage(pngImg, { x: 150, y: 300, width: 150, height: 150 })

writeFileSync('test-pdfs/pdf-with-png-images.pdf', await doc.save())
console.log('Created pdf-with-png-images.pdf (2 pages, 2 PNG images)')
