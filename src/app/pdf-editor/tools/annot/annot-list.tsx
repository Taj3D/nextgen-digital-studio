'use client'

/**
 * ============================================================================
 * Phase 2C Wave 2 — Annotation List Panel
 * ----------------------------------------------------------------------------
 * Lists all annotations grouped by page. Supports:
 * - Select annotation
 * - Jump to page
 * - Delete
 * - Duplicate
 * - Existing vs Created indicator
 * - Dirty/unsaved indicator
 * ============================================================================
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy, Trash2, FileText, Highlighter, Type, PenLine, Square, Circle, Minus, ArrowRight, StickyNote } from 'lucide-react'
import type { Annotation } from './annot-types'
import { isDuplicatable, isProtected } from './annot-types'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Highlight: Highlighter,
  Underline: Highlighter,
  StrikeOut: Highlighter,
  Text: StickyNote,
  FreeText: Type,
  Ink: PenLine,
  Line: Minus,
  Square: Square,
  Circle: Circle,
  Arrow: ArrowRight,
  Link: FileText,
  Widget: FileText,
}

interface AnnotListProps {
  annotations: Annotation[]
  selectedId: string | null
  onSelect: (id: string, pageNum: number) => void
  onDuplicate?: (id: string, pageNum: number) => void
  onDelete?: (id: string, pageNum: number) => void
  isBn: boolean
}

export function AnnotList({ annotations, selectedId, onSelect, onDuplicate, onDelete, isBn }: AnnotListProps) {
  const t = isBn
    ? { title: 'অ্যানোটেশন তালিকা', empty: 'কোনো অ্যানোটেশন নেই', page: 'পেজ', existing: 'বিদ্যমান', created: 'নতুন', dirty: 'অসংরক্ষিত', protected_: 'সুরক্ষিত', delete: 'ডিলিট', duplicate: 'ডুপ্লিকেট' }
    : { title: 'Annotation List', empty: 'No annotations', page: 'Page', existing: 'Existing', created: 'Created', dirty: 'Unsaved', protected_: 'Protected', delete: 'Delete', duplicate: 'Duplicate' }

  // Group by page
  const grouped = React.useMemo(() => {
    const map: Record<number, Annotation[]> = {}
    for (const annot of annotations) {
      if (!map[annot.pageNum]) map[annot.pageNum] = []
      map[annot.pageNum].push(annot)
    }
    return Object.entries(map).sort(([a], [b]) => Number(a) - Number(b))
  }, [annotations])

  if (annotations.length === 0) {
    return (
      <div className="rounded-lg border border-border/60 bg-muted/20 p-4 text-center text-xs text-muted-foreground">
        {t.empty}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/60 bg-muted/20">
      <div className="border-b border-border/40 p-2">
        <span className="text-xs font-semibold">{t.title}</span>
        <Badge variant="secondary" className="ml-2 text-xs">{annotations.length}</Badge>
      </div>
      <ScrollArea className="max-h-64">
        <div className="p-2 space-y-3" role="list" aria-label={t.title}>
          {grouped.map(([pageStr, annots]) => {
            const pageNum = Number(pageStr)
            return (
              <div key={pageNum} className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground px-1">
                  {t.page} {pageNum}
                </div>
                {annots.map(annot => {
                  const Icon = ICON_MAP[annot.subtype] || FileText
                  const isSelected = annot.id === selectedId
                  const protected_ = isProtected(annot.subtype)
                  return (
                    <div
                      key={annot.id}
                      role="listitem"
                      tabIndex={0}
                      onClick={() => onSelect(annot.id, annot.pageNum)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onSelect(annot.id, annot.pageNum)
                        }
                      }}
                      className={`flex items-center gap-2 rounded p-1.5 cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 ring-1 ring-primary' : 'hover:bg-muted'}`}
                      aria-label={`${annot.subtype} ${t.page} ${annot.pageNum}${annot.contents ? ': ' + annot.contents.slice(0, 30) : ''}`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate">
                          {annot.contents ? annot.contents.slice(0, 30) : annot.subtype}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {annot.origin === 'existing' && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-3.5">{t.existing}</Badge>
                          )}
                          {annot.origin === 'created' && (
                            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-3.5">{t.created}</Badge>
                          )}
                          {annot.dirty && (
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-3.5">{t.dirty}</Badge>
                          )}
                          {protected_ && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-3.5 text-amber-600">{t.protected_}</Badge>
                          )}
                        </div>
                      </div>
                      {!protected_ && (
                        <div className="flex items-center gap-0.5">
                          {isDuplicatable(annot.subtype) && onDuplicate && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDuplicate(annot.id, annot.pageNum)
                              }}
                              aria-label={t.duplicate}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(annot.id, annot.pageNum)
                              }}
                              aria-label={t.delete}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
