'use client'

/**
 * ============================================================================
 * PDF to Excel Tool — Phase 2C Wave 4A
 * ----------------------------------------------------------------------------
 * Extracts table-like data from PDF text and exports as .xlsx using JSZip.
 *
 * HONEST LIMITATION: "Table extraction. Results may require review for
 * complex tables, merged cells and scanned documents."
 *
 * Classified as: LIMITED
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker, ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Table, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import type { PdfTool } from '../pdf-tools'

export function PdfToExcelTool({ tool, isBn, open, onOpenChange }: {
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

  const escapeXml = (s: string): string => {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
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

      // Extract text items with positions for table detection
      type TextItem = { str: string; x: number; y: number; w: number; page: number }
      const allItems: TextItem[] = []

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 70))
        setProgressText(isBn ? `পেজ ${bn(i)}/${bn(numPages)} বিশ্লেষণ…` : `Analyzing page ${i}/${numPages}…`)
        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()
        for (const item of textContent.items) {
          if ('str' in item && item.str.trim()) {
            allItems.push({
              str: item.str.trim(),
              x: item.transform[4],
              y: item.transform[5],
              w: item.width || 0,
              page: i,
            })
          }
        }
        await page.cleanup()
      }

      // Group items into rows by Y position (per page)
      const pageGroups: Record<number, TextItem[]> = {}
      for (const item of allItems) {
        if (!pageGroups[item.page]) pageGroups[item.page] = []
        pageGroups[item.page].push(item)
      }

      // Detect columns by clustering X positions
      const rows: string[][] = []
      for (const [pageStr, items] of Object.entries(pageGroups)) {
        const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x)

        // Group by Y (rows)
        const yGroups: TextItem[][] = []
        let currentGroup: TextItem[] = []
        let currentY = -Infinity
        for (const item of sorted) {
          if (Math.abs(item.y - currentY) > 5 && currentGroup.length > 0) {
            yGroups.push(currentGroup)
            currentGroup = []
          }
          currentGroup.push(item)
          currentY = item.y
        }
        if (currentGroup.length > 0) yGroups.push(currentGroup)

        // Detect column positions from all items
        const xPositions = items.map(i => Math.round(i.x / 10) * 10).sort((a, b) => a - b)
        const uniqueX = [...new Set(xPositions)]

        // For each row, assign items to columns
        for (const group of yGroups) {
          const row: string[] = []
          const sortedGroup = [...group].sort((a, b) => a.x - b.x)

          // Simple approach: each item is a cell, separated by significant X gaps
          let prevX = -Infinity
          let cellText = ''
          for (const item of sortedGroup) {
            if (prevX > -Infinity && item.x - prevX > 20) {
              row.push(cellText.trim())
              cellText = ''
            }
            cellText += (cellText ? ' ' : '') + item.str
            prevX = item.x + item.w
          }
          if (cellText.trim()) row.push(cellText.trim())

          // Only add rows with 2+ columns (likely table data)
          if (row.length >= 2) {
            rows.push(row)
          }
        }
      }

      setProgress(80)
      setProgressText(isBn ? 'XLSX তৈরি হচ্ছে…' : 'Generating XLSX…')

      if (rows.length === 0) {
        toast.info(isBn
          ? 'কোনো টেবিল সনাক্ত করা যায়নি। স্ক্যান করা পিডিএফ হতে পারে।'
          : 'No tables detected. This may be a scanned PDF.')
        await doc.cleanup()
        await doc.loadingTask.destroy()
        return
      }

      // Generate XLSX using JSZip (manual OOXML construction)
      const zip = new JSZip()

      // Build sheet XML
      let sheetXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
      sheetXml += '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
      sheetXml += '<sheetData>'

      for (let r = 0; r < rows.length; r++) {
        const rowNum = r + 1
        sheetXml += `<row r="${rowNum}">`
        for (let c = 0; c < rows[r].length; c++) {
          const colLetter = String.fromCharCode(65 + c)
          const cellRef = `${colLetter}${rowNum}`
          const value = escapeXml(rows[r][c])
          // Try to detect numbers
          const numVal = parseFloat(rows[r][c])
          if (!isNaN(numVal) && /^-?\d+\.?\d*$/.test(rows[r][c])) {
            sheetXml += `<c r="${cellRef}" t="n"><v>${numVal}</v></c>`
          } else {
            sheetXml += `<c r="${cellRef}" t="inlineStr"><is><t>${value}</t></is></c>`
          }
        }
        sheetXml += '</row>'
      }

      sheetXml += '</sheetData></worksheet>'

      zip.file('xl/worksheets/sheet1.xml', sheetXml)
      zip.file('xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>')
      zip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>')
      zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')
      zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>')

      setProgress(95)

      const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const filename = files[0].name.replace(/\.pdf$/i, '') + '.xlsx'
      saveAs(blob, filename)

      setProgress(100)
      toast.success(isBn
        ? `${bn(rows.length)}টি সারি সহ XLSX তৈরি হয়েছে।`
        : `XLSX generated with ${rows.length} row(s).`)

      await doc.cleanup()
      await doc.loadingTask.destroy()
    } catch (err) {
      console.error('[PDF to Excel] Failed:', err)
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
                ? 'টেবিল এক্সট্র্যাকশন। জটিল টেবিল ও মার্জড সেলের জন্য পর্যালোচনা প্রয়োজন।'
                : 'Table extraction. Results may require review for complex tables, merged cells and scanned documents.'}
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
              <Table className="mr-2 h-4 w-4" />
              {isBn ? 'Excel এ রূপান্তর করুন' : 'Convert to Excel'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${progress}%` }} />
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
