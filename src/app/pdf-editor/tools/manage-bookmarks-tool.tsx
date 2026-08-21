'use client'

/**
 * ============================================================================
 * Manage Bookmarks Tool — Phase 2C Wave 3A
 * ----------------------------------------------------------------------------
 * PDF outline (bookmark) management: list, add, edit, delete, reorder.
 * Uses pdf-lib low-level catalog/outline dict API.
 *
 * Verified capabilities (Architecture Gate):
 *   - doc.catalog.get(PDFName.of('Outlines'))
 *   - doc.catalog.set(PDFName.of('Outlines'), ref)
 *   - context.register() + context.obj()
 *   - Title, Parent, Dest, First, Last, Next, Prev, Count
 *
 * Save with useObjectStreams: false (avoids pdf-lib v1.17.1 outline bug).
 * ============================================================================
 */

import * as React from 'react'
import { PDFDocument, PDFName, PDFString, PDFDict, PDFRef, PDFArray } from 'pdf-lib'
import { FilePicker, ToolDialog, downloadValidatedPdf } from '../pdf-client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, BookmarkPlus, Trash2, ChevronUp, ChevronDown, Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import type { PdfTool } from '../pdf-tools'

// =============================================================================
// Internal bookmark model (separate from PDF objects)
// =============================================================================

interface BookmarkNode {
  id: string
  title: string
  pageIndex: number  // 0-indexed
  children: BookmarkNode[]
  expanded?: boolean
}

function generateId(): string {
  return `bm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

// =============================================================================
// PDF outline read/write
// =============================================================================

/** Read existing outline tree from PDF into internal BookmarkNode model. */
async function readBookmarks(doc: PDFDocument): Promise<BookmarkNode[]> {
  const context = doc.context
  const outlinesRef = doc.catalog.get(PDFName.of('Outlines'))
  if (!outlinesRef) return []

  const outlinesDict = outlinesRef instanceof PDFRef ? context.lookup(outlinesRef) as PDFDict : outlinesRef as PDFDict
  if (!outlinesDict) return []

  const firstRef = outlinesDict.get(PDFName.of('First'))
  if (!firstRef) return []

  const nodes: BookmarkNode[] = []
  let currentRef = firstRef
  while (currentRef) {
    const itemDict = currentRef instanceof PDFRef ? context.lookup(currentRef) as PDFDict : currentRef as PDFDict
    if (!itemDict) break

    const titleEntry = itemDict.get(PDFName.of('Title'))
    let title = 'Untitled'
    if (titleEntry) {
      const s = titleEntry.toString()
      if (s.startsWith('(') && s.endsWith(')')) {
        title = s.slice(1, -1)
      } else if (s.startsWith('/')) {
        // PDFName encoding — decode #XX
        title = s.slice(1).replace(/#([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      } else {
        title = s
      }
    }

    // Get page index from Dest
    let pageIndex = 0
    const destEntry = itemDict.get(PDFName.of('Dest'))
    if (destEntry) {
      try {
        let destArray: PDFArray | null = null
        if (destEntry instanceof PDFArray) {
          destArray = destEntry
        } else if (destEntry instanceof PDFRef) {
          destArray = context.lookup(destEntry) as any
        }
        if (destArray && destArray.size() > 0) {
          const pageRef = destArray.get(0)
          if (pageRef instanceof PDFRef) {
            // Get page refs from catalog Pages/Kids array
            const pagesRef = doc.catalog.get(PDFName.of('Pages'))
            const pagesDict = pagesRef ? context.lookup(pagesRef) as any : null
            const kids = pagesDict ? pagesDict.get(PDFName.of('Kids')) as PDFArray : null
            if (kids) {
              for (let i = 0; i < kids.size(); i++) {
                const kidRef = kids.get(i)
                if (kidRef instanceof PDFRef && kidRef.objectNumber === pageRef.objectNumber) {
                  pageIndex = i
                  break
                }
              }
            }
          }
        }
      } catch {}
    }

    const children = readChildren(doc, itemDict)

    nodes.push({ id: generateId(), title, pageIndex, children })

    // Move to Next sibling
    const nextRef = itemDict.get(PDFName.of('Next'))
    currentRef = (nextRef as any) || null
  }

  return nodes
}

/** Recursively read children of a bookmark item. */
function readChildren(doc: PDFDocument, parentDict: PDFDict): BookmarkNode[] {
  const context = doc.context
  const firstRef = parentDict.get(PDFName.of('First'))
  if (!firstRef) return []

  const nodes: BookmarkNode[] = []
  let currentRef = firstRef
  while (currentRef) {
    const itemDict = currentRef instanceof PDFRef ? context.lookup(currentRef) as PDFDict : currentRef as PDFDict
    if (!itemDict) break

    const titleEntry = itemDict.get(PDFName.of('Title'))
    let title = 'Untitled'
    if (titleEntry) {
      const s = titleEntry.toString()
      if (s.startsWith('(') && s.endsWith(')')) title = s.slice(1, -1)
      else if (s.startsWith('/')) title = s.slice(1).replace(/#([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      else title = s
    }

    let pageIndex = 0
    const destEntry = itemDict.get(PDFName.of('Dest'))
    if (destEntry) {
      try {
        let destArray: PDFArray | null = null
        if (destEntry instanceof PDFArray) destArray = destEntry
        else if (destEntry instanceof PDFRef) destArray = context.lookup(destEntry) as any
        if (destArray && destArray.size() > 0) {
          const pageRef = destArray.get(0)
          if (pageRef instanceof PDFRef) {
            // Get page refs from catalog Pages/Kids array
            const pagesRef2 = doc.catalog.get(PDFName.of('Pages'))
            const pagesDict2 = pagesRef2 ? context.lookup(pagesRef2) as any : null
            const kids2 = pagesDict2 ? pagesDict2.get(PDFName.of('Kids')) as PDFArray : null
            if (kids2) {
              for (let j = 0; j < kids2.size(); j++) {
                const kidRef2 = kids2.get(j)
                if (kidRef2 instanceof PDFRef && kidRef2.objectNumber === pageRef.objectNumber) {
                  pageIndex = j
                  break
                }
              }
            }
          }
        }
      } catch {}
    }

    nodes.push({ id: generateId(), title, pageIndex, children: readChildren(doc, itemDict) })
    currentRef = (itemDict.get(PDFName.of('Next')) as any) || null
  }
  return nodes
}

/** Build PDF outline tree from internal BookmarkNode model and set on catalog. */
function writeBookmarks(doc: PDFDocument, bookmarks: BookmarkNode[]): void {
  const context = doc.context

  if (bookmarks.length === 0) {
    // Remove outlines entirely
    doc.catalog.delete(PDFName.of('Outlines'))
    return
  }

  // Build outline items recursively
  const { firstRef, lastRef, count } = buildOutlineChain(doc, bookmarks, null)

  // Create or update Outlines root dict
  const outlinesDict = context.obj({
    Type: 'Outlines',
    First: firstRef,
    Last: lastRef,
    Count: count,
  })
  const outlinesRef = context.register(outlinesDict)

  // Set Parent on all top-level items
  for (const bm of bookmarks) {
    // Already set during buildOutlineChain
  }

  doc.catalog.set(PDFName.of('Outlines'), outlinesRef)
}

/** Recursively build outline chain, returning first/last/count refs. */
function buildOutlineChain(
  doc: PDFDocument,
  bookmarks: BookmarkNode[],
  parentRef: PDFRef | null,
): { firstRef: PDFRef; lastRef: PDFRef; count: number } {
  const context = doc.context
  const refs: PDFRef[] = []

  // Create all items first
  for (const bm of bookmarks) {
    const page = doc.getPage(bm.pageIndex)
    const destArray = context.obj([page.node, PDFName.of('Fit')])

    const itemDict = context.obj({
      Title: PDFString.of(bm.title),
      Dest: destArray,
      Parent: parentRef || undefined,
    })
    const itemRef = context.register(itemDict)
    refs.push(itemRef)

    // Build children
    if (bm.children.length > 0) {
      const childResult = buildOutlineChain(doc, bm.children, itemRef)
      itemDict.set(PDFName.of('First'), childResult.firstRef)
      itemDict.set(PDFName.of('Last'), childResult.lastRef)
      itemDict.set(PDFName.of('Count'), childResult.count as any)
    }
  }

  // Link siblings (Next/Prev)
  for (let i = 0; i < refs.length; i++) {
    const itemDict = context.lookup(refs[i]) as PDFDict
    if (i > 0) {
      itemDict.set(PDFName.of('Prev'), refs[i - 1])
    }
    if (i < refs.length - 1) {
      itemDict.set(PDFName.of('Next'), refs[i + 1])
    }
  }

  return {
    firstRef: refs[0],
    lastRef: refs[refs.length - 1],
    count: bookmarks.length,
  }
}

// =============================================================================
// UI helper: flatten bookmark tree for display
// =============================================================================

function flattenBookmarks(nodes: BookmarkNode[], depth = 0): Array<{ node: BookmarkNode; depth: number }> {
  const result: Array<{ node: BookmarkNode; depth: number }> = []
  for (const node of nodes) {
    result.push({ node, depth })
    if (node.children.length > 0) {
      result.push(...flattenBookmarks(node.children, depth + 1))
    }
  }
  return result
}

// =============================================================================
// Component
// =============================================================================

export function ManageBookmarksTool({ tool, isBn, open, onOpenChange }: {
  tool: PdfTool
  isBn: boolean
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [bookmarks, setBookmarks] = React.useState<BookmarkNode[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editTitle, setEditTitle] = React.useState('')
  const [editPage, setEditPage] = React.useState(0)
  const [newTitle, setNewTitle] = React.useState('')
  const [newPage, setNewPage] = React.useState(0)
  const [newParent, setNewParent] = React.useState<string>('none')

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(s)

  const loadPdf = async () => {
    if (files.length === 0) return
    setLoading(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setPageCount(doc.getPageCount())
      const bms = await readBookmarks(doc)
      setBookmarks(bms)
      if (bms.length > 0) {
        toast.info(isBn ? `${bn(bms.length)}টি বুকমার্ক পাওয়া গেছে।` : `Found ${bms.length} bookmark(s).`)
      }
    } catch (err) {
      console.error('[Bookmarks] Load failed:', err)
      toast.error(isBn ? 'পিডিএফ লোড ব্যর্থ।' : 'Failed to load PDF.')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (files.length > 0) loadPdf()
    else { setBookmarks([]); setPageCount(0) }
  }, [files])

  const addBookmark = () => {
    if (!newTitle.trim()) {
      toast.error(isBn ? 'শিরোনাম দিন।' : 'Enter a title.')
      return
    }
    const node: BookmarkNode = {
      id: generateId(),
      title: newTitle.trim(),
      pageIndex: Math.min(newPage, Math.max(0, pageCount - 1)),
      children: [],
    }

    if (newParent === 'none') {
      setBookmarks([...bookmarks, node])
    } else {
      // Add as child of selected parent
      const addChild = (nodes: BookmarkNode[]): BookmarkNode[] =>
        nodes.map(n => {
          if (n.id === newParent) {
            return { ...n, children: [...n.children, node] }
          }
          return { ...n, children: addChild(n.children) }
        })
      setBookmarks(addChild(bookmarks))
    }

    setNewTitle('')
    setNewPage(0)
    setNewParent('none')
    toast.success(isBn ? 'বুকমার্ক যোগ হয়েছে।' : 'Bookmark added.')
  }

  const deleteBookmark = (id: string) => {
    const remove = (nodes: BookmarkNode[]): BookmarkNode[] =>
      nodes.filter(n => n.id !== id).map(n => ({ ...n, children: remove(n.children) }))
    setBookmarks(remove(bookmarks))
    if (editingId === id) setEditingId(null)
    toast.success(isBn ? 'বুকমার্ক মুছে ফেলা হয়েছে।' : 'Bookmark deleted.')
  }

  const startEdit = (node: BookmarkNode) => {
    setEditingId(node.id)
    setEditTitle(node.title)
    setEditPage(node.pageIndex)
  }

  const saveEdit = () => {
    if (!editingId || !editTitle.trim()) return
    const update = (nodes: BookmarkNode[]): BookmarkNode[] =>
      nodes.map(n => {
        if (n.id === editingId) {
          return { ...n, title: editTitle.trim(), pageIndex: Math.min(editPage, Math.max(0, pageCount - 1)) }
        }
        return { ...n, children: update(n.children) }
      })
    setBookmarks(update(bookmarks))
    setEditingId(null)
    toast.success(isBn ? 'বুকমার্ক আপডেট হয়েছে।' : 'Bookmark updated.')
  }

  const moveBookmark = (id: string, direction: 'up' | 'down') => {
    const move = (nodes: BookmarkNode[]): BookmarkNode[] => {
      const result = [...nodes]
      for (let i = 0; i < result.length; i++) {
        if (result[i].id === id) {
          if (direction === 'up' && i > 0) {
            [result[i - 1], result[i]] = [result[i], result[i - 1]]
          } else if (direction === 'down' && i < result.length - 1) {
            [result[i], result[i + 1]] = [result[i + 1], result[i]]
          }
          return result
        }
        result[i] = { ...result[i], children: move(result[i].children) }
      }
      return result
    }
    setBookmarks(move(bookmarks))
  }

  const save = async () => {
    if (files.length === 0) return
    setBusy(true)
    try {
      const bytes = await files[0].arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const originalPageCount = doc.getPageCount()

      // Rebuild outline from internal model
      writeBookmarks(doc, bookmarks)

      // Save with useObjectStreams: false (avoids pdf-lib outline bug)
      const savedBytes = await doc.save({ useObjectStreams: false })

      // Validate
      const reloaded = await PDFDocument.load(savedBytes)
      if (reloaded.getPageCount() !== originalPageCount) {
        throw new Error('Page count mismatch after bookmark save')
      }

      // Download
      const filename = files[0].name.replace(/\.pdf$/i, '') + '-bookmarks.pdf'
      await downloadValidatedPdf(savedBytes, filename, originalPageCount)

      toast.success(isBn
        ? `${bn(bookmarks.length)}টি বুকমার্ক সেভ হয়েছে।`
        : `${bookmarks.length} bookmark(s) saved.`)
    } catch (err) {
      console.error('[Bookmarks] Save failed:', err)
      toast.error(isBn ? 'সেভ ব্যর্থ।' : 'Save failed.')
    } finally {
      setBusy(false)
    }
  }

  const flatList = flattenBookmarks(bookmarks)

  return (
    <ToolDialog tool={tool} isBn={isBn} open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        <FilePicker isBn={isBn} files={files} onFiles={setFiles} />

        {loading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
          </div>
        )}

        {!loading && pageCount > 0 && (
          <>
            {/* Bookmark list */}
            <div className="rounded-lg border border-border/60 bg-muted/20">
              <div className="border-b border-border/40 p-2 flex items-center justify-between">
                <span className="text-xs font-semibold">
                  {isBn ? 'বুকমার্ক' : 'Bookmarks'} ({bn(bookmarks.length)})
                </span>
                <span className="text-xs text-muted-foreground">
                  {bn(pageCount)} {isBn ? 'পেজ' : 'pages'}
                </span>
              </div>
              <ScrollArea className="max-h-48">
                <div className="p-1" role="list" aria-label={isBn ? 'বুকমার্ক তালিকা' : 'Bookmark list'}>
                  {flatList.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-4">
                      {isBn ? 'কোনো বুকমার্ক নেই' : 'No bookmarks'}
                    </p>
                  )}
                  {flatList.map(({ node, depth }) => (
                    <div
                      key={node.id}
                      role="listitem"
                      className="flex items-center gap-1 rounded p-1 hover:bg-muted/50"
                      style={{ paddingLeft: `${depth * 16 + 4}px` }}
                    >
                      <Bookmark className="h-3 w-3 shrink-0 text-muted-foreground" />
                      {editingId === node.id ? (
                        <div className="flex-1 flex items-center gap-1">
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="h-7 text-xs flex-1"
                            aria-label={isBn ? 'বুকমার্ক শিরোনাম' : 'Bookmark title'}
                          />
                          <Input
                            type="number"
                            value={editPage}
                            onChange={(e) => setEditPage(Number(e.target.value))}
                            min={0}
                            max={pageCount - 1}
                            className="h-7 text-xs w-14"
                            aria-label={isBn ? 'পেজ নম্বর' : 'Page number'}
                          />
                          <Button size="sm" className="h-7 px-2 text-xs" onClick={saveEdit}>
                            {isBn ? 'সেভ' : 'Save'}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 text-xs truncate">{node.title}</span>
                          <span className="text-xs text-muted-foreground">p{bn(node.pageIndex + 1)}</span>
                          <div className="flex items-center gap-0.5">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => moveBookmark(node.id, 'up')} aria-label="Move up">
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => moveBookmark(node.id, 'down')} aria-label="Move down">
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-blue-600" onClick={() => startEdit(node)} aria-label="Edit">
                              ✎
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600" onClick={() => deleteBookmark(node.id)} aria-label="Delete">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Add new bookmark */}
            <div className="rounded-lg border border-border/60 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <BookmarkPlus className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-semibold">{isBn ? 'নতুন বুকমার্ক' : 'New Bookmark'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">{isBn ? 'শিরোনাম' : 'Title'}</Label>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={isBn ? 'শিরোনাম লিখুন' : 'Enter title'}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">{isBn ? 'পেজ' : 'Page'}</Label>
                  <Input
                    type="number"
                    value={newPage}
                    onChange={(e) => setNewPage(Number(e.target.value))}
                    min={0}
                    max={pageCount - 1}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
              {bookmarks.length > 0 && (
                <div>
                  <Label className="text-xs">{isBn ? 'প্যারেন্ট' : 'Parent'}</Label>
                  <Select value={newParent} onValueChange={setNewParent}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{isBn ? 'কোনো প্যারেন্ট নেই (টপ লেভেল)' : 'None (top level)'}</SelectItem>
                      {flatList.map(({ node }) => (
                        <SelectItem key={node.id} value={node.id}>
                          {'  '.repeat(flattenBookmarks(bookmarks).find(f => f.node.id === node.id)?.depth || 0)}{node.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button size="sm" className="w-full h-8 text-xs" onClick={addBookmark} variant="outline">
                <BookmarkPlus className="h-3 w-3 mr-1" />
                {isBn ? 'বুকমার্ক যোগ করুন' : 'Add Bookmark'}
              </Button>
            </div>

            {/* Save button */}
            <Button
              onClick={save}
              disabled={busy}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isBn ? 'সেভ হচ্ছে…' : 'Saving…'}
                </>
              ) : (
                isBn ? 'বুকমার্ক সেভ করুন' : 'Save Bookmarks'
              )}
            </Button>
          </>
        )}

        {!loading && files.length > 0 && pageCount === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {isBn ? 'পিডিএফ লোড করা যায়নি।' : 'PDF could not be loaded.'}
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
