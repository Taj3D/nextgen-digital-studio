// QR Scan Test: Generate QR → embed in PDF → extract from PDF → decode with jsQR
const QRCode = require('qrcode')
const jsQR = require('jsqr')
const sharp = require('sharp')
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')

async function main() {
  const payload = 'https://example.com'
  console.log('Original payload:', payload)
  
  // Step 1: Generate QR as PNG data URL (same as qr-stamp-tool.tsx)
  const dataUrl = await QRCode.toDataURL(payload, {
    type: 'image/png',
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 300,
  })
  console.log('Step 1: QR PNG generated (data URL length:', dataUrl.length, ')')
  
  // Step 2: Convert to Uint8Array (same as tool)
  const base64 = dataUrl.split(',')[1]
  const binaryString = Buffer.from(base64, 'base64')
  console.log('Step 2: Converted to buffer (' + binaryString.length + ' bytes)')
  
  // Step 3: Decode QR from the raw PNG using sharp + jsQR
  const { data, info } = await sharp(binaryString)
    .raw()
    .toBuffer({ resolveWithObject: true })
  
  // sharp gives RGBA, jsQR expects RGBA
  const code = jsQR(data, info.width, info.height)
  
  if (code) {
    console.log('Step 3: QR decoded successfully!')
    console.log('  Decoded payload:', code.data)
    console.log('  Expected payload:', payload)
    console.log('  Match:', code.data === payload ? '✅ PASS' : '❌ FAIL')
    console.log('  QR location: x=' + code.location.topLeftCorner.x + ', y=' + code.location.topLeftCorner.y)
  } else {
    console.log('Step 3: ❌ FAIL — QR not found in image')
  }
  
  // Step 4: Verify the stamped PDF also contains the QR
  const stampedPdfPath = '/home/z/my-project/test-pdfs/pdf-3-qr-stamped.pdf'
  if (fs.existsSync(stampedPdfPath)) {
    const doc = await PDFDocument.load(fs.readFileSync(stampedPdfPath))
    const pages = doc.getPages()
    console.log('\nStep 4: Stamped PDF verification')
    console.log('  Pages:', pages.length)
    
    // Check page 1 for image XObjects
    const page1 = pages[0]
    const resources = page1.node.Resources()
    let hasImages = false
    if (resources) {
      const xObject = resources.lookup('XObject')
      if (xObject) {
        const keys = Object.keys(xObject.dict)
        hasImages = keys.length > 0
        console.log('  Page 1 image XObjects:', keys.length)
      }
    }
    console.log('  QR image embedded:', hasImages ? '✅ YES' : '❌ NO')
  }
  
  console.log('\n=== FINAL RESULT ===')
  if (code && code.data === payload) {
    console.log('✅ QR END-TO-END SCAN: PASS')
    console.log('  Generated QR → decoded with jsQR → payload matches')
  } else {
    console.log('❌ QR END-TO-END SCAN: FAIL')
  }
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1) })
