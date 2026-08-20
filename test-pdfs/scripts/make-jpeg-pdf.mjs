import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'fs'
import zlib from 'zlib'

// Create a real JPEG image (minimal valid JPEG: 100x100 solid color)
// JPEG structure: SOI + APP0 + DQT + SOF0 + DHT + SOS + image data + EOI
function makeMinimalJpeg(width, height) {
  // Use a simpler approach: create a PNG, then we'll note that pdf-lib's embedJpg
  // requires actual JPEG bytes. Let's create a valid JPEG using canvas.
  // Actually, in Node we can create a minimal JPEG:
  
  const buf = []
  // SOI
  buf.push(0xFF, 0xD8)
  // APP0 (JFIF)
  buf.push(0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00)
  // DQT
  const qt = new Array(65).fill(1)
  qt[0] = 0x00
  buf.push(0xFF, 0xDB, 0x00, 0x43, ...qt)
  // SOF0
  const sof = [0x08, (height >> 8) & 0xFF, height & 0xFF, (width >> 8) & 0xFF, width & 0xFF, 0x01, 0x01, 0x11, 0x00]
  buf.push(0xFF, 0xC0, 0x00, 0x09, ...sof)
  // DHT (DC table)
  buf.push(0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B)
  // DHT (AC table)
  buf.push(0xFF, 0xC4, 0x00, 0xB5, 0x10, 0x00, 0x02, 0x01, 0x03, 0x03, 0x02, 0x04, 0x03, 0x05, 0x05, 0x04, 0x04, 0x00, 0x00, 0x01, 0x7D, 0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xA1, 0x08, 0x23, 0x42, 0xB1, 0xC1, 0x15, 0x52, 0xD1, 0xF0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0A, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6A, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xD9, 0xDA, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA)
  // SOS
  buf.push(0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00, 0x7B, 0x40)
  // Minimal image data (all zeros = gray)
  const imgData = new Array(width * height).fill(0x00)
  buf.push(...imgData)
  // EOI
  buf.push(0xFF, 0xD9)
  
  return Buffer.from(buf)
}

// Create a proper JPEG using canvas (browser approach won't work in Node)
// Instead, let's create a real JPEG using a different method
// Actually, pdf-lib can embed JPG bytes directly. Let's create a valid JPEG
// using the sharp library which is already installed

import sharp from 'sharp'

// Create a 100x100 red JPEG
const jpeg100 = await sharp({
  create: {
    width: 100,
    height: 100,
    channels: 3,
    background: { r: 255, g: 0, b: 0 }
  }
}).jpeg().toBuffer()

// Create an 800x600 JPEG
const jpeg800 = await sharp({
  create: {
    width: 800,
    height: 600,
    channels: 3,
    background: { r: 0, g: 100, b: 200 }
  }
}).jpeg().toBuffer()

// TEST-A: JPEG PDF (100x100)
{
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const img = await doc.embedJpg(jpeg100)
  
  const p1 = doc.addPage([595, 842])
  p1.drawText('JPEG TEST PAGE 1', { x: 50, y: 750, size: 20, font, color: rgb(0,0,0) })
  p1.drawImage(img, { x: 100, y: 400, width: 100, height: 100 })
  
  writeFileSync('test-pdfs/pdf-jpeg-100x100.pdf', await doc.save())
  console.log('Created pdf-jpeg-100x100.pdf (1 page, 100x100 JPEG)')
}

// TEST-B: Large image PDF (800x600 JPEG)
{
  const doc = await PDFDocument.create()
  const img = await doc.embedJpg(jpeg800)
  
  const page = doc.addPage([595, 842])
  page.drawImage(img, { x: 50, y: 100, width: 400, height: 300 })
  
  writeFileSync('test-pdfs/pdf-large-800x600.pdf', await doc.save())
  console.log('Created pdf-large-800x600.pdf (1 page, 800x600 JPEG)')
}

// TEST-D: Mixed JPEG + PNG (partial success test — both should extract)
{
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const jpgImg = await doc.embedJpg(jpeg100)
  
  // Create a PNG
  function makePng(width, height, r, g, b) {
    const rawData = Buffer.alloc((1 + width * 3) * height)
    for (let y = 0; y < height; y++) {
      rawData[y * (1 + width * 3)] = 0
      for (let x = 0; x < width; x++) {
        const offset = y * (1 + width * 3) + 1 + x * 3
        rawData[offset] = (r + x) % 256
        rawData[offset + 1] = (g + y) % 256
        rawData[offset + 2] = b
      }
    }
    const compressed = zlib.deflateSync(rawData)
    const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
    const ihdrData = Buffer.alloc(13)
    ihdrData.writeUInt32BE(width, 0)
    ihdrData.writeUInt32BE(height, 4)
    ihdrData[8] = 8; ihdrData[9] = 2; ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0
    // Simplified CRC — use proper CRC
    function crc32(buf) {
      let crc = 0xFFFFFFFF
      const table = []
      for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); table[n] = c }
      for (const byte of buf) { crc = table[(crc ^ byte) & 0xFF] ^ (crc >>> 8) }
      const result = Buffer.alloc(4); result.writeUInt32BE((crc ^ 0xFFFFFFFF) >>> 0, 0); return result
    }
    const ihdrType = Buffer.from('IHDR')
    const ihdrLen = Buffer.alloc(4); ihdrLen.writeUInt32BE(13, 0)
    const ihdr = Buffer.concat([ihdrLen, ihdrType, ihdrData, crc32(Buffer.concat([ihdrType, ihdrData]))])
    const idatType = Buffer.from('IDAT')
    const idatLen = Buffer.alloc(4); idatLen.writeUInt32BE(compressed.length, 0)
    const idat = Buffer.concat([idatLen, idatType, compressed, crc32(Buffer.concat([idatType, compressed]))])
    const iendType = Buffer.from('IEND')
    const iendLen = Buffer.alloc(4)
    const iend = Buffer.concat([iendLen, iendType, crc32(iendType)])
    return Buffer.concat([sig, ihdr, idat, iend])
  }
  
  const pngImg = await doc.embedPng(makePng(80, 80, 0, 255, 0))
  
  const page = doc.addPage([595, 842])
  page.drawText('MIXED JPEG + PNG', { x: 50, y: 750, size: 16, font, color: rgb(0,0,0) })
  page.drawImage(jpgImg, { x: 50, y: 500, width: 100, height: 100 })
  page.drawImage(pngImg, { x: 250, y: 500, width: 80, height: 80 })
  
  writeFileSync('test-pdfs/pdf-mixed-jpeg-png.pdf', await doc.save())
  console.log('Created pdf-mixed-jpeg-png.pdf (1 page, 1 JPEG + 1 PNG)')
}

console.log('\nAll JPEG/large/mixed fixtures created.')
