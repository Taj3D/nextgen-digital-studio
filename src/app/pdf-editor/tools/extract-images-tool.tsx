'use client'

/**
 * ============================================================================
 * Extract Images Tool — Phase 1B
 * ----------------------------------------------------------------------------
 * Uses PDF.js operator list to find embedded raster images (JPEG/PNG).
 * Downloads as ZIP using existing jszip@3.10.1.
 * Honestly labeled "Extract embedded raster images" — not vector graphics.
 * ============================================================================
 */

import * as React from 'react'
import { pdfjsLib } from './pdfjs-setup'
import { FilePicker } from '../pdf-client'
import { ToolDialog } from '../pdf-client'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Download, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import type { PdfTool } from '../pdf-tools'

export function ExtractImagesTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [imageCount, setImageCount] = React.useState(0)
  const [extractedImages, setExtractedImages] = React.useState<{ name: string; blob: Blob }[]>([])

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    setExtractedImages([])
    setImageCount(0)

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) })
      const doc = await loadingTask.promise

      const images: { name: string; blob: Blob }[] = []
      let imgIndex = 0

      for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
        const page = await doc.getPage(pageNum)
        const operatorList = await page.getOperatorList()

        // Find image paint operations
        const OPS = pdfjsLib.OPS
        const imgPromises: Promise<void>[] = []

        for (let i = 0; i < operatorList.fnArray.length; i++) {
          const fn = operatorList.fnArray[i]
          const args = operatorList.argsArray[i]

          // Check for image paint operations
          if (
            fn === OPS.paintImageXObject ||
            fn === OPS.paintXObject ||
            fn === OPS.paintInlineImageXObject ||
            fn === OPS.paintImageXObjectRepeat
          ) {
            const imgName = args[0]
            if (typeof imgName === 'string') {
              // Get the image object from page.objs
              const imgPromise = new Promise<void>((resolve) => {
                page.objs.get(imgName, (img: any) => {
                  if (img && img.data && img.width && img.height) {
                    try {
                      // Determine image type
                      const isJpeg = img.kind === pdfjsLib.ImageKind.RGB_24BPP || img.kind === 2
                      const isRgba = img.kind === pdfjsLib.ImageKind.RGBA_32BPP || img.kind === 3

                      // Convert to canvas then to blob
                      const canvas = document.createElement('canvas')
                      canvas.width = img.width
                      canvas.height = img.height
                      const ctx = canvas.getContext('2d')
                      if (!ctx) { resolve(); return }

                      if (isRgba) {
                        const imageData = ctx.createImageData(img.width, img.height)
                        // PDF.js RGBA data may need channel order fix
                        for (let j = 0; j < img.data.length; j += 4) {
                          imageData.data[j] = img.data[j]
                          imageData.data[j + 1] = img.data[j + 1]
                          imageData.data[j + 2] = img.data[j + 2]
                          imageData.data[j + 3] = img.data[j + 3]
                        }
                        ctx.putImageData(imageData, 0, 0)
                      } else {
                        // RGB → convert to RGBA for canvas
                        const imageData = ctx.createImageData(img.width, img.height)
                        for (let j = 0, k = 0; j < img.data.length; j += 3, k += 4) {
                          imageData.data[k] = img.data[j]
                          imageData.data[k + 1] = img.data[j + 1]
                          imageData.data[k + 2] = img.data[j + 2]
                          imageData.data[k + 3] = 255
                        }
                        ctx.putImageData(imageData, 0, 0)
                      }

                      canvas.toBlob((blob) => {
                        if (blob) {
                          imgIndex++
                          const ext = 'png' // Canvas always produces PNG
                          const name = `page-${pageNum}-image-${imgIndex}.${ext}`
                          images.push({ name, blob })
                          setImageCount(images.length)
                        }
                        resolve()
                      }, 'image/png')
                    } catch {
                      resolve()
                    }
                  } else {
                    resolve()
                  }
                })
              })
              imgPromises.push(imgPromise)
            }
          }
        }

        await Promise.all(imgPromises)
        setProgress(5 + Math.round((pageNum / doc.numPages) * 90))
        page.cleanup()
      }

      try { doc.cleanup(); doc.loadingTask.destroy(); } catch { /* ignore */ }

      if (images.length === 0) {
        setExtractedImages([])
        toast.info(
          isBn
            ? 'এই পিডিএফে কোনো এম্বেডেড রাস্টার ছবি পাওয়া যায়নি।'
            : 'No embedded raster images found in this PDF.',
        )
      } else {
        setExtractedImages(images)
        toast.success(
          isBn
            ? `${bn(images.length)}টি ছবি এক্সট্র্যাক্ট হয়েছে।`
            : `Extracted ${images.length} images.`,
        )
      }
    } catch (err) {
      console.error('[Extract Images] Extraction failed:', err)
      toast.error(
        isBn
          ? 'ছবি এক্সট্র্যাকশন ব্যর্থ — ফাইল নষ্ট বা এনক্রিপ্টেড হতে পারে।'
          : 'Image extraction failed — file may be corrupt or encrypted.',
      )
    } finally {
      setBusy(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  const downloadZip = async () => {
    if (extractedImages.length === 0) return
    const zip = new JSZip()
    for (const img of extractedImages) {
      zip.file(img.name, img.blob)
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, files[0].name.replace(/\.pdf$/i, '') + '-images.zip')
    toast.success(isBn ? 'ZIP ফাইল ডাউনলোড হয়েছে।' : 'ZIP file downloaded.')
  }

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        <Button
          onClick={run}
          disabled={files.length === 0 || busy}
          className="w-full"
          variant="secondary"
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isBn ? 'এক্সট্র্যাক্ট হচ্ছে…' : 'Extracting…'}
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              {isBn ? 'ছবি এক্সট্র্যাক্ট করুন' : 'Extract Images'}
            </>
          )}
        </Button>

        {busy && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {isBn ? `প্রসেসিং ${bn(progress)}%` : `Processing ${progress}%`}
            </p>
          </div>
        )}

        {extractedImages.length > 0 && !busy && (
          <>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isBn ? `এক্সট্র্যাক্টেড ছবি (${bn(extractedImages.length)}টি)` : `Extracted Images (${extractedImages.length})`}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {extractedImages.slice(0, 8).map((img, i) => (
                  <div key={i} className="rounded border border-border/60 bg-background p-1 text-center">
                    <img
                      src={URL.createObjectURL(img.blob)}
                      alt={img.name}
                      className="mx-auto h-16 w-16 object-contain"
                    />
                    <p className="mt-1 truncate text-[10px] text-muted-foreground">{img.name}</p>
                  </div>
                ))}
                {extractedImages.length > 8 && (
                  <div className="flex items-center justify-center rounded border border-border/60 p-2 text-xs text-muted-foreground">
                    +{extractedImages.length - 8}
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={downloadZip}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              <Download className="mr-2 h-4 w-4" />
              {isBn ? 'ZIP ডাউনলোড করুন' : 'Download ZIP'}
            </Button>
          </>
        )}

        {extractedImages.length === 0 && !busy && files.length > 0 && imageCount === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {isBn
              ? 'ছবি এক্সট্র্যাক্ট করতে বোতামে ক্লিক করুন।'
              : 'Click the button to extract images.'}
          </p>
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
