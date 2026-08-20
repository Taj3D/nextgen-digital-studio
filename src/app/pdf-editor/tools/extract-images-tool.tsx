'use client'

/**
 * ============================================================================
 * Extract Images Tool — Phase 1B.1 (Hotfix)
 * ----------------------------------------------------------------------------
 * Uses PDF.js operator list to find embedded raster images (JPEG/PNG).
 * Downloads as ZIP using existing jszip@3.10.1.
 * Honestly labeled "Extract embedded raster images" — not vector graphics.
 *
 * HOTFIX: Replaced unbounded page.objs.get() callback with a
 * timeout-wrapped, has()-checked approach that never hangs.
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

/** Timeout for waiting on a single image object (ms). */
const IMAGE_TIMEOUT = 5000

export function ExtractImagesTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [busy, setBusy] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [extractedImages, setExtractedImages] = React.useState<{ name: string; blob: Blob }[]>([])
  const [skippedCount, setSkippedCount] = React.useState(0)

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  /**
   * Attempt to resolve an image object from page.objs with a timeout.
   * Returns the image data or null if unavailable/unsupported.
   */
  const tryGetImage = (page: any, imgName: string): Promise<any | null> => {
    return new Promise((resolve) => {
      // Check if already resolved
      if (page.objs.has(imgName)) {
        try {
          const img = page.objs.get(imgName)
          resolve(img || null)
        } catch {
          resolve(null)
        }
        return
      }

      // Also check commonObjs
      if (page.commonObjs?.has?.(imgName)) {
        try {
          const img = page.commonObjs.get(imgName)
          resolve(img || null)
        } catch {
          resolve(null)
        }
        return
      }

      // Object not yet resolved — wait with timeout
      let resolved = false
      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true
          resolve(null)
        }
      }, IMAGE_TIMEOUT)

      try {
        page.objs.get(imgName, (img: any) => {
          if (!resolved) {
            resolved = true
            clearTimeout(timeoutId)
            resolve(img || null)
          }
        })
      } catch {
        if (!resolved) {
          resolved = true
          clearTimeout(timeoutId)
          resolve(null)
        }
      }
    })
  }

  /**
   * Convert a PDF.js image object to a Blob.
   * Returns null if the image type is unsupported.
   */
  const imageToBlob = (img: any): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!img) {
        resolve(null)
        return
      }

      // PDF.js v6 may resolve images as ImageBitmap (bitmap key) instead of raw pixel data
      // Check for bitmap first — it's the preferred v6 approach
      if (img.bitmap && img.bitmap instanceof ImageBitmap) {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.bitmap.width
          canvas.height = img.bitmap.height
          const ctx = canvas.getContext('2d')
          if (!ctx) { resolve(null); return }
          ctx.drawImage(img.bitmap, 0, 0)
          canvas.toBlob((blob) => {
            resolve(blob)
          }, 'image/png')
        } catch {
          resolve(null)
        }
        return
      }

      // Fallback: check for raw pixel data (older PDF.js approach)
      if (!img.data || !img.width || !img.height || img.width < 2 || img.height < 2) {
        resolve(null)
        return
      }

      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) { resolve(null); return }

        const imageData = ctx.createImageData(img.width, img.height)
        const data = img.data as Uint8Array
        const kind = img.kind

        if (kind === 3) {
          // RGBA_32BPP — direct copy
          imageData.data.set(data)
        } else if (kind === 2) {
          // RGB_24BPP — expand to RGBA
          for (let j = 0, k = 0; j < data.length; j += 3, k += 4) {
            imageData.data[k] = data[j]
            imageData.data[k + 1] = data[j + 1]
            imageData.data[k + 2] = data[j + 2]
            imageData.data[k + 3] = 255
          }
        } else if (kind === 1) {
          // GRAYSCALE_1BPP — expand to RGBA
          for (let j = 0; j < data.length; j++) {
            const byte = data[j]
            for (let bit = 7; bit >= 0; bit--) {
              const idx = (j * 8 + (7 - bit)) * 4
              if (idx >= imageData.data.length) break
              const val = (byte & (1 << bit)) ? 255 : 0
              imageData.data[idx] = val
              imageData.data[idx + 1] = val
              imageData.data[idx + 2] = val
              imageData.data[idx + 3] = 255
            }
          }
        } else {
          // Unknown kind — try treating as RGBA
          if (data.length === img.width * img.height * 4) {
            imageData.data.set(data)
          } else if (data.length === img.width * img.height * 3) {
            for (let j = 0, k = 0; j < data.length; j += 3, k += 4) {
              imageData.data[k] = data[j]
              imageData.data[k + 1] = data[j + 1]
              imageData.data[k + 2] = data[j + 2]
              imageData.data[k + 3] = 255
            }
          } else {
            resolve(null)
            return
          }
        }

        ctx.putImageData(imageData, 0, 0)
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      } catch {
        resolve(null)
      }
    })
  }

  const run = async () => {
    if (files.length === 0) {
      toast.error(isBn ? 'একটি পিডিএফ দিন।' : 'Add a PDF.')
      return
    }
    setBusy(true)
    setProgress(5)
    setExtractedImages([])
    setSkippedCount(0)

    let loadingTask: any = null

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) })
      const doc = await loadingTask.promise

      const images: { name: string; blob: Blob }[] = []
      let imgIndex = 0
      let skipped = 0
      let totalFound = 0

      const OPS = pdfjsLib.OPS
      const imageOps = new Set([
        OPS.paintImageXObject,
        OPS.paintXObject,
        OPS.paintInlineImageXObject,
        OPS.paintImageXObjectRepeat,
      ])

      for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
        const page = await doc.getPage(pageNum)

        // Render the page to a canvas first — this triggers PDF.js to resolve
        // image objects into page.objs. Without rendering, image XObjects
        // referenced in the operator list may never be fully resolved with data.
        // Scale 1.0 is needed — lower scales return placeholder objects without data.
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
          const viewport = page.getViewport({ scale: 1.0 })
          tempCanvas.width = viewport.width
          tempCanvas.height = viewport.height
          try {
            const renderTask = page.render({ canvas: tempCanvas, canvasContext: tempCtx, viewport })
            await renderTask.promise
          } catch {
            // Ignore render errors — we just need image objects resolved
          }
        }

        const operatorList = await page.getOperatorList()

        // Find all image paint operations on this page
        const imageNames: string[] = []
        for (let i = 0; i < operatorList.fnArray.length; i++) {
          const fn = operatorList.fnArray[i]
          if (imageOps.has(fn)) {
            const args = operatorList.argsArray[i]
            const imgName = args[0]
            if (typeof imgName === 'string' && imgName) {
              imageNames.push(imgName)
            }
          }
        }

        totalFound += imageNames.length

        // Process each image with timeout
        for (const imgName of imageNames) {
          const img = await tryGetImage(page, imgName)
          if (img) {
            const blob = await imageToBlob(img)
            if (blob) {
              imgIndex++
              const name = `page-${pageNum}-image-${imgIndex}.png`
              images.push({ name, blob })
              setExtractedImages([...images])
            } else {
              skipped++
              setSkippedCount(skipped)
            }
          } else {
            skipped++
            setSkippedCount(skipped)
          }
        }

        setProgress(5 + Math.round((pageNum / doc.numPages) * 90))
        page.cleanup()
      }

      try { doc.cleanup(); doc.loadingTask.destroy(); } catch { /* ignore */ }

      if (images.length === 0) {
        setExtractedImages([])
        if (totalFound > 0) {
          toast.info(
            isBn
              ? `${bn(totalFound)}টি ছবি পাওয়া গেছে কিন্তু এক্সট্র্যাক্ট করা যায়নি।`
              : `Found ${totalFound} image(s) but none could be extracted.`,
          )
        } else {
          toast.info(
            isBn
              ? 'এই পিডিএফে কোনো এম্বেডেড রাস্টার ছবি পাওয়া যায়নি।'
              : 'No embedded raster images found in this PDF.',
          )
        }
      } else if (skipped > 0) {
        toast.success(
          isBn
            ? `${bn(images.length)}টি ছবি এক্সট্র্যাক্ট হয়েছে, ${bn(skipped)}টি স্কিপ করা হয়েছে।`
            : `Extracted ${images.length} image(s), ${skipped} skipped.`,
        )
      } else {
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
      if (loadingTask) {
        try { loadingTask.destroy(); } catch { /* ignore */ }
      }
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
                {skippedCount > 0 && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400">
                    {isBn ? `${bn(skippedCount)}টি স্কিপ` : `${skippedCount} skipped`}
                  </span>
                )}
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

        {extractedImages.length === 0 && !busy && files.length > 0 && (
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
