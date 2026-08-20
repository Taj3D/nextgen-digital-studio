import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'
import zlib from 'zlib'

function makePng(width, height, r, g, b) {
  // Build raw image data with filter byte per row
  const rows = []
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 3)
    row[0] = 0 // no filter
    for (let x = 0; x < width; x++) {
      const offset = 1 + x * 3
      row[offset] = (r + x) % 256
      row[offset + 1] = (g + y) % 256
      row[offset + 2] = b
    }
    rows.push(row)
  }
  const rawData = Buffer.concat(rows)
  
  // Compress with zlib
  const compressed = zlib.deflateSync(rawData)
  
  // Build PNG
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
  
  // IHDR
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8  // bit depth
  ihdrData[9] = 2  // color type RGB
  ihdrData[10] = 0 // compression
  ihdrData[11] = 0 // filter
  ihdrData[12] = 0 // interlace
  const ihdrType = Buffer.from('IHDR')
  const ihdrLen = Buffer.alloc(4)
  ihdrLen.writeUInt32BE(13, 0)
  const ihdrCrc = Buffer.from(crc32(Buffer.concat([ihdrType, ihdrData])))
  const ihdr = Buffer.concat([ihdrLen, ihdrType, ihdrData, ihdrCrc])
  
  // IDAT
  const idatType = Buffer.from('IDAT')
  const idatLen = Buffer.alloc(4)
  idatLen.writeUInt32BE(compressed.length, 0)
  const idatCrc = Buffer.from(crc32(Buffer.concat([idatType, compressed])))
  const idat = Buffer.concat([idatLen, idatType, compressed, idatCrc])
  
  // IEND
  const iendType = Buffer.from('IEND')
  const iendLen = Buffer.alloc(4)
  const iendCrc = Buffer.from(crc32(iendType))
  const iend = Buffer.concat([iendLen, iendType, iendCrc])
  
  return Buffer.concat([sig, ihdr, idat, iend])
}

function crc32(buf) {
  let crc = 0xFFFFFFFF
  const table = []
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[n] = c
  }
  for (const byte of buf) {
    crc = table[(crc ^ byte) & 0xFF] ^ (crc >>> 8)
  }
  const result = new Uint8Array(4)
  const dv = new DataView(result.buffer)
  dv.setUint32(0, (crc ^ 0xFFFFFFFF) >>> 0)
  return result
}

// Create fixtures
const png100 = makePng(100, 100, 200, 0, 0)

// TEST-A: 2-page PDF with 1 PNG per page (100x100)
{
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const img = await doc.embedPng(png100)
  const p1 = doc.addPage([595, 842])
  p1.drawText('PAGE 1', { x: 50, y: 750, size: 20, font, color: rgb(0,0,0) })
  p1.drawImage(img, { x: 100, y: 400, width: 100, height: 100 })
  const p2 = doc.addPage([595, 842])
  p2.drawText('PAGE 2', { x: 50, y: 750, size: 20, font, color: rgb(0,0,0) })
  p2.drawImage(img, { x: 200, y: 300, width: 100, height: 100 })
  writeFileSync('test-pdfs/pdf-png-100x100.pdf', await doc.save())
  console.log('Created pdf-png-100x100.pdf (2 pages, 100x100 PNG each)')
}

// TEST-B: 1-page PDF with 3 PNG images
{
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const img1 = await doc.embedPng(makePng(80, 80, 255, 0, 0))
  const img2 = await doc.embedPng(makePng(60, 60, 0, 255, 0))
  const img3 = await doc.embedPng(makePng(100, 50, 0, 0, 255))
  const page = doc.addPage([595, 842])
  page.drawText('3 IMAGES ON ONE PAGE', { x: 50, y: 750, size: 16, font, color: rgb(0,0,0) })
  page.drawImage(img1, { x: 50, y: 500, width: 80, height: 80 })
  page.drawImage(img2, { x: 200, y: 500, width: 60, height: 60 })
  page.drawImage(img3, { x: 350, y: 500, width: 100, height: 50 })
  writeFileSync('test-pdfs/pdf-3-images-one-page.pdf', await doc.save())
  console.log('Created pdf-3-images-one-page.pdf (1 page, 3 PNG images)')
}

// TEST-F: Mixed text + images
{
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const img = await doc.embedPng(png100)
  const p1 = doc.addPage([595, 842])
  p1.drawText('MIXED TEXT AND IMAGE', { x: 50, y: 750, size: 18, font, color: rgb(0,0,0) })
  p1.drawText('This page has both text and an image.', { x: 50, y: 700, size: 12, font, color: rgb(0,0,0) })
  p1.drawImage(img, { x: 150, y: 400, width: 100, height: 100 })
  const p2 = doc.addPage([595, 842])
  p2.drawText('PAGE 2 - TEXT ONLY', { x: 50, y: 750, size: 18, font, color: rgb(0,0,0) })
  writeFileSync('test-pdfs/pdf-mixed-text-image.pdf', await doc.save())
  console.log('Created pdf-mixed-text-image.pdf (2 pages, mixed)')
}

// TEST-E: Image-only PDF
{
  const doc = await PDFDocument.create()
  const img = await doc.embedPng(makePng(200, 150, 0, 200, 0))
  const page = doc.addPage([595, 842])
  page.drawImage(img, { x: 100, y: 300, width: 200, height: 150 })
  writeFileSync('test-pdfs/pdf-image-only-large.pdf', await doc.save())
  console.log('Created pdf-image-only-large.pdf (1 page, 200x150 image)')
}

console.log('\nAll fixtures created.')
