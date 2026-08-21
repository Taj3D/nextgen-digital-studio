'use client'

/**
 * ============================================================================
 * Phase 2C Wave 2 — Annotation Properties Panel
 * ----------------------------------------------------------------------------
 * Context-aware properties panel. Shows editable controls only when safe.
 * For read-only annotation types, shows "Properties not editable" message.
 * ============================================================================
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Palette, Copy, Trash2, AlertCircle } from 'lucide-react'
import { COLOR_PRESETS, getEditableProperties, isDuplicatable, isProtected, type Annotation, type AnnotationColor } from './annot-types'
import { useAnnotStore } from './annot-store'

interface AnnotPropertiesPanelProps {
  annotation: Annotation | null
  isBn: boolean
  onDuplicate?: (annotId: string, pageNum: number) => void
  onDelete?: (annotId: string, pageNum: number) => void
}

export function AnnotPropertiesPanel({ annotation, isBn, onDuplicate, onDelete }: AnnotPropertiesPanelProps) {
  const editAnnotation = useAnnotStore(s => s.editAnnotation)
  const properties = useAnnotStore(s => s.properties)
  const setColor = useAnnotStore(s => s.setColor)
  const setOpacity = useAnnotStore(s => s.setOpacity)
  const setStrokeWidth = useAnnotStore(s => s.setStrokeWidth)

  if (!annotation) {
    return (
      <div className="rounded-lg border border-border/60 bg-muted/20 p-4 text-center text-xs text-muted-foreground">
        {isBn ? 'একটি অ্যানোটেশন নির্বাচন করুন' : 'Select an annotation to edit properties'}
      </div>
    )
  }

  // Protected annotations (Link, Widget) — read-only
  if (isProtected(annotation.subtype)) {
    return (
      <div className="space-y-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
            {isBn ? 'এই অ্যানোটেশন সম্পাদনযোগ্য নয়' : 'Properties not editable for this annotation type'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {isBn ? `${annotation.subtype} অ্যানোটেশন সংরক্ষিত থাকবে` : `${annotation.subtype} annotations are preserved`}
        </p>
      </div>
    )
  }

  const editableProps = getEditableProperties(annotation.subtype)
  const t = isBn
    ? { type: 'ধরন', page: 'পেজ', origin: 'উৎস', existing: 'বিদ্যমান', created: 'নতুন', color: 'রঙ', opacity: 'অপাসিটি', stroke: 'স্ট্রোক', contents: 'টেক্সট', author: 'লেখক', fontSize: 'ফন্ট সাইজ', duplicate: 'ডুপ্লিকেট', delete: 'ডিলিট', dirty: 'অসংরক্ষিত' }
    : { type: 'Type', page: 'Page', origin: 'Origin', existing: 'Existing', created: 'Created', color: 'Color', opacity: 'Opacity', stroke: 'Stroke', contents: 'Text', author: 'Author', fontSize: 'Font Size', duplicate: 'Duplicate', delete: 'Delete', dirty: 'Unsaved' }

  return (
    <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {annotation.subtype}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {t.page} {annotation.pageNum}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {annotation.origin === 'existing' && (
            <Badge variant="secondary" className="text-xs">{t.existing}</Badge>
          )}
          {annotation.origin === 'created' && (
            <Badge variant="default" className="text-xs">{t.created}</Badge>
          )}
          {annotation.dirty && (
            <Badge variant="destructive" className="text-xs">{t.dirty}</Badge>
          )}
        </div>
      </div>

      {/* Color */}
      {editableProps.color && (
        <div className="space-y-1">
          <Label className="text-xs">{t.color}</Label>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Palette className="h-3 w-3" />
                  <span
                    className="h-4 w-4 rounded border"
                    style={{ backgroundColor: `rgb(${annotation.color.r * 255}, ${annotation.color.g * 255}, ${annotation.color.b * 255})` }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_PRESETS.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setColor(color as AnnotationColor)
                          editAnnotation(annotation.id, annotation.pageNum, { color: color as AnnotationColor })
                        }}
                        className="h-7 w-7 rounded border-2 transition-transform hover:scale-110"
                        style={{
                          backgroundColor: `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`,
                          borderColor: annotation.color.r === color.r && annotation.color.g === color.g && annotation.color.b === color.b ? '#3b82f6' : 'transparent',
                        }}
                        aria-label={`Color ${i + 1}`}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={`#${Math.round(annotation.color.r * 255).toString(16).padStart(2, '0')}${Math.round(annotation.color.g * 255).toString(16).padStart(2, '0')}${Math.round(annotation.color.b * 255).toString(16).padStart(2, '0')}`}
                    onChange={(e) => {
                      const hex = e.target.value
                      const color = {
                        r: parseInt(hex.slice(1, 3), 16) / 255,
                        g: parseInt(hex.slice(3, 5), 16) / 255,
                        b: parseInt(hex.slice(5, 7), 16) / 255,
                      }
                      setColor(color)
                      editAnnotation(annotation.id, annotation.pageNum, { color })
                    }}
                    className="w-full h-7 rounded cursor-pointer"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* Opacity */}
      {editableProps.opacity && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs">{t.opacity}</Label>
            <span className="text-xs">{Math.round(annotation.opacity * 100)}%</span>
          </div>
          <Slider
            value={[Math.round(annotation.opacity * 100)]}
            onValueChange={(v) => {
              setOpacity(v[0] / 100)
              editAnnotation(annotation.id, annotation.pageNum, { opacity: v[0] / 100 })
            }}
            min={10}
            max={100}
            step={5}
            className="w-full"
            aria-label={t.opacity}
          />
        </div>
      )}

      {/* Stroke width */}
      {editableProps.strokeWidth && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs">{t.stroke}</Label>
            <span className="text-xs">{annotation.strokeWidth}px</span>
          </div>
          <Slider
            value={[annotation.strokeWidth]}
            onValueChange={(v) => {
              setStrokeWidth(v[0])
              editAnnotation(annotation.id, annotation.pageNum, { strokeWidth: v[0] })
            }}
            min={1}
            max={12}
            step={1}
            className="w-full"
            aria-label={t.stroke}
          />
        </div>
      )}

      {/* Font size (FreeText only) */}
      {editableProps.fontSize && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs">{t.fontSize}</Label>
            <span className="text-xs">{(annotation as any).fontSize || 12}px</span>
          </div>
          <Slider
            value={[(annotation as any).fontSize || 12]}
            onValueChange={(v) => {
              editAnnotation(annotation.id, annotation.pageNum, { fontSize: v[0] } as any)
            }}
            min={8}
            max={48}
            step={1}
            className="w-full"
            aria-label={t.fontSize}
          />
        </div>
      )}

      {/* Contents (text) */}
      {editableProps.contents && (
        <div className="space-y-1">
          <Label className="text-xs">{t.contents}</Label>
          <Textarea
            value={annotation.contents}
            onChange={(e) => {
              editAnnotation(annotation.id, annotation.pageNum, { contents: e.target.value })
            }}
            placeholder={isBn ? 'টেক্সট লিখুন...' : 'Enter text...'}
            className="min-h-[60px] text-xs"
          />
        </div>
      )}

      {/* Author */}
      {editableProps.author && (
        <div className="space-y-1">
          <Label className="text-xs">{t.author}</Label>
          <Input
            value={annotation.author}
            onChange={(e) => {
              editAnnotation(annotation.id, annotation.pageNum, { author: e.target.value })
            }}
            className="h-8 text-xs"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-border/40">
        {isDuplicatable(annotation.subtype) && onDuplicate && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 flex-1 text-xs"
            onClick={() => onDuplicate(annotation.id, annotation.pageNum)}
          >
            <Copy className="h-3 w-3 mr-1" />
            {t.duplicate}
          </Button>
        )}
        {!isProtected(annotation.subtype) && onDelete && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 flex-1 text-xs text-red-600 hover:text-red-700"
            onClick={() => onDelete(annotation.id, annotation.pageNum)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {t.delete}
          </Button>
        )}
      </div>
    </div>
  )
}
