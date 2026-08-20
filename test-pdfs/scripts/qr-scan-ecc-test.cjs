const QRCode = require('qrcode')
const jsQR = require('jsqr')
const sharp = require('sharp')

async function testEcc(level) {
  const payload = 'https://example.com'
  const dataUrl = await QRCode.toDataURL(payload, {
    type: 'image/png',
    errorCorrectionLevel: level,
    margin: 2,
    width: 300,
  })
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true })
  const code = jsQR(data, info.width, info.height)
  const match = code && code.data === payload
  console.log(`ECC ${level}: ${match ? '✅ PASS' : '❌ FAIL'} ${code ? '(' + code.data + ')' : '(not decoded)'}`)
  return match
}

async function testSize(size, width) {
  const payload = 'https://example.com'
  const dataUrl = await QRCode.toDataURL(payload, {
    type: 'image/png',
    errorCorrectionLevel: 'M',
    margin: 2,
    width: width,
  })
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true })
  const code = jsQR(data, info.width, info.height)
  const match = code && code.data === payload
  console.log(`Size ${size} (${width}px): ${match ? '✅ PASS' : '❌ FAIL'}`)
  return match
}

async function main() {
  console.log('=== ECC LEVEL TESTS ===')
  await testEcc('L')
  await testEcc('M')
  await testEcc('Q')
  await testEcc('H')
  
  console.log('\n=== SIZE TESTS ===')
  await testSize('small', 100)
  await testSize('medium', 300)
  await testSize('large', 500)
  
  console.log('\n✅ ALL QR SCAN TESTS COMPLETE')
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1) })
