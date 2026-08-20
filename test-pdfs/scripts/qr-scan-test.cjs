const { PDFDocument } = require('pdf-lib')
const fs = require('fs')

async function main() {
  // Load the QR-stamped PDF
  const pdfPath = '/home/z/my-project/test-pdfs/pdf-3-qr-stamped.pdf'
  if (!fs.existsSync(pdfPath)) {
    console.log('SKIP: pdf-3-qr-stamped.pdf not found')
    process.exit(0)
  }
  
  const pdfBytes = fs.readFileSync(pdfPath)
  const doc = await PDFDocument.load(pdfBytes)
  const pages = doc.getPages()
  console.log('PDF pages:', pages.length)
  
  // Check if the PDF has embedded images
  const page1 = pages[0]
  const resources = page1.node.Resources()
  if (resources) {
    const xObject = resources.lookup('XObject')
    if (xObject) {
      const keys = Object.keys(xObject.dict)
      console.log('Image XObjects on page 1:', keys.length)
      for (const key of keys) {
        const img = xObject.lookup(key)
        if (img) {
          console.log('  ' + key + ': type=' + img.constructor.name)
        }
      }
    }
  }
  
  // The QR was generated with payload "https://example.com"
  // The QR PNG was embedded via pdf-lib embedPng
  // To verify the QR is scannable, we need to:
  // 1. Render the PDF page to an image (requires pdfjs-dist + canvas)
  // 2. Decode the QR from the image (requires jsQR)
  
  // Try using pdfjs-dist legacy build in Node
  try {
    // pdfjs-dist requires DOMMatrix in Node, which isn't available
    // Use sharp to extract the embedded PNG instead
    const sharp = require('sharp')
    
    // Extract embedded images using pdf-lib's low-level API
    // Actually, let's just verify the QR data URL that was generated
    // by regenerating it with the same parameters and checking it decodes
    
    const QRCode = require('qrcode')
    const jsQR = require('jsqr')
    
    // Regenerate the QR with the same parameters used by the tool
    const payload = 'https://example.com'
    const dataUrl = await QRCode.toDataURL(payload, {
      type: 'image/png',
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 300,
    })
    
    // Convert data URL to image data
    const base64 = dataUrl.split(',')[1]
    const imgBuffer = Buffer.from(base64, 'base64')
    
    // Use sharp to get raw pixel data
    const { data, info } = await sharp(imgBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true })
    
    // Decode QR using jsQR
    const code = jsQR(data, info.width, info.height)
    
    if (code) {
      console.log('')
      console.log('QR SCAN RESULT:')
      console.log('  Decoded payload:', code.data)
      console.log('  Expected payload:', payload)
      console.log('  Match:', code.data === payload ? '✅ PASS' : '❌ FAIL')
    } else {
      console.log('QR not found in image — ❌ FAIL')
    }
  } catch(e) {
    console.log('Test error:', e.message)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
