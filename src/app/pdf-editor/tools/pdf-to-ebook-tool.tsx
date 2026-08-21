'use client'

/**
 * ============================================================================
 * PDF to eBook Tool — Phase 2C Wave 4A
 * ----------------------------------------------------------------------------
 * Converts PDF to EPUB using pdfjs text extraction + JSZip for EPUB packaging.
 *
 * HONEST LIMITATION: "Text-based EPUB. Complex layouts, images and scanned
 * pages may not be fully preserved."
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, BookOpen, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import type { PdfTool } from '../pdf-tools'

export function PdfToEbookTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [progressText, setProgressText] = React.useState('')

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const escapeHtml = (s: string): string => {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  const convert = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(0)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        // @ts-ignore
        enableScripting: false,
      } as any)
      const doc = await loadingTask.promise
      const numPages = doc.numPages
      const bookTitle = files[0].name.replace(/\.pdf$/i, '')

      // Extract text per page → XHTML chapters
      const chapters: string[] = []

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 70))
        setProgressText(isBn ? `পেজ ${bn(i)}/${bn(numPages)} এক্সট্র্যাক্ট হচ্ছে…` : `Extracting page ${i}/${numPages}…`)

        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()

        let pageText = ''
        let lastY: number | null = null
        for (const item of textContent.items) {
          if ('str' in item) {
            const y = 'transform' in item ? item.transform[5] : null
            if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
              pageText += '</p><p>'
            }
            pageText += escapeHtml(item.str)
            if (y !== null) lastY = y
          }
        }

        const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Page ${i}</title></head>
<body><h1>Page ${i}</h1><p>${pageText || '&nbsp;'}</p></body>
</html>`
        chapters.push(xhtml)
        await page.cleanup()
      }

      setProgress(80)
      setProgressText(isBn ? 'EPUB প্যাকেজ হচ্ছে…' : 'Packaging EPUB…')

      // Build EPUB using JSZip
      const zip = new JSZip()

      // mimetype (must be first, uncompressed)
      zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

      // META-INF/container.xml
      zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles>
<rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
</rootfiles>
</container>`)

      // OEBPS/content.opf
      const manifestItems = chapters.map((_, i) =>
        `<item id="page${i + 1}" href="page${i + 1}.xhtml" media-type="application/xhtml+xml"/>`
      ).join('\n')
      const spineItems = chapters.map((_, i) =>
        `<itemref idref="page${i + 1}"/>`
      ).join('\n')

      zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">pdf-forge-${Date.now()}</dc:identifier>
<dc:title>${escapeHtml(bookTitle)}</dc:title>
<dc:language>en</dc:language>
<dc:creator>PDF Forge</dc:creator>
<meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}</meta>
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
${manifestItems}
</manifest>
<spine>${spineItems}</spine>
</package>`)

      // OEBPS/nav.xhtml
      const navItems = chapters.map((_, i) =>
        `<li><a href="page${i + 1}.xhtml">Page ${i + 1}</a></li>`
      ).join('\n')
      zip.file('OEBPS/nav.xhtml', `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title></head>
<body>
<nav epub:type="toc">
<h1>Table of Contents</h1>
<ol>${navItems}</ol>
</nav>
</body>
</html>`)

      // Chapter files
      chapters.forEach((xhtml, i) => {
        zip.file(`OEBPS/page${i + 1}.xhtml`, xhtml)
      })

      setProgress(95)

      const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' })
      const filename = bookTitle + '.epub'
      saveAs(blob, filename)

      setProgress(100)
      toast.success(isBn
        ? `${bn(numPages)}টি পেজ সহ EPUB তৈরি হয়েছে।`
        : `EPUB generated with ${numPages} page(s).`)

      await doc.cleanup()
      await doc.loadingTask.destroy()
    } catch (err) {
      console.error('[PDF to eBook] Failed:', err)
      toast.error(isBn ? 'রূপান্তর ব্যর্থ।' : 'Conversion failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {isBn
                ? 'টেক্সট-ভিত্তিক EPUB। জটিল লেআউট ও ছবি সম্পূর্ণ সংরক্ষিত নাও হতে পারে।'
                : 'Text-based EPUB. Complex layouts, images and scanned pages may not be fully preserved.'}
            </p>
          </div>
        </div>

        <Button onClick={convert} disabled={files.length === 0 || busy} className="w-full" variant="secondary">
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progressText || (isBn ? 'রূপান্তর হচ্ছে…' : 'Converting…')}
            </>
          ) : (
            <>
              <BookOpen className="mr-2 h-4 w-4" />
              {isBn ? 'eBook এ রূপান্তর করুন' : 'Convert to eBook'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{bn(progress)}%</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </Button>
        </DialogFooter>
      </div>
    </ToolDialog>
  )
}
