'use client'

/**
 * ============================================================================
 * Phase 2C Wave 1 — Annotation Toolbar + Properties Panel
 * ----------------------------------------------------------------------------
 * 11 tool buttons + color/opacity/stroke + undo/redo/delete/save.
 * All touch targets >=44×44px.
 * ============================================================================
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  MousePointer2, Highlighter, Underline, Strikethrough, StickyNote, Type,
  PenLine, Minus, ArrowRight, Square, Circle, Undo2, Redo2, Trash2, Save,
  Palette,
} from 'lucide-react'
import { TOOLS, COLOR_PRESETS, type ToolType, type AnnotationColor } from './annot-types'
import { useAnnotStore } from './annot-store'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MousePointer2, Highlighter, Underline, Strikethrough, StickyNote, Type,
  PenLine, Minus, ArrowRight, Square, Circle,
}

interface AnnotToolbarProps {
  isBn: boolean
  onUndo: () => void
  onRedo: () => void
  onDelete: () => void
  onSave: () => void
  canUndo: boolean
  canRedo: boolean
  canDelete: boolean
  isSaving: boolean
  totalCount: number
}

export function AnnotToolbar({
  isBn, onUndo, onRedo, onDelete, onSave, canUndo, canRedo, canDelete, isSaving, totalCount,
}: AnnotToolbarProps) {
  const activeTool = useAnnotStore(s => s.activeTool)
  const setTool = useAnnotStore(s => s.setTool)
  const properties = useAnnotStore(s => s.properties)
  const setColor = useAnnotStore(s => s.setColor)
  const setOpacity = useAnnotStore(s => s.setOpacity)
  const setStrokeWidth = useAnnotStore(s => s.setStrokeWidth)

  const t = isBn
    ? { select: 'নির্বাচন', color: 'রঙ', opacity: 'অপাসিটি', stroke: 'স্ট্রোক', undo: 'আনডু', redo: 'রিডু', delete: 'ডিলিট', save: 'সেভ', annotations: 'অ্যানোটেশন' }
    : { select: 'Select', color: 'Color', opacity: 'Opacity', stroke: 'Stroke', undo: 'Undo', redo: 'Redo', delete: 'Delete', save: 'Save', annotations: 'Annotations' }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-2 border-b border-border/60 pb-3">
        {/* Tool buttons row */}
        <div className="flex flex-wrap gap-1">
          {TOOLS.map((tool) => {
            const Icon = ICON_MAP[tool.icon] || MousePointer2
            const isActive = activeTool === tool.type
            return (
              <Tooltip key={tool.type}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTool(tool.type as ToolType)}
                    className="h-11 w-11"
                    aria-label={`${tool.labelEn} (${tool.shortcut})`}
                    aria-pressed={isActive}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{isBn ? tool.labelBn : tool.labelEn} ({tool.shortcut})</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Properties row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Color picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-11 gap-2" aria-label={t.color}>
                <Palette className="h-4 w-4" />
                <span
                  className="h-4 w-4 rounded border"
                  style={{ backgroundColor: `rgb(${properties.color.r * 255}, ${properties.color.g * 255}, ${properties.color.b * 255})` }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-2">
                <Label className="text-xs">{t.color}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setColor(color as AnnotationColor)}
                      className="h-8 w-8 rounded border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`,
                        borderColor: properties.color.r === color.r && properties.color.g === color.g && properties.color.b === color.b ? '#3b82f6' : 'transparent',
                      }}
                      aria-label={`Color ${i + 1}`}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={`#${Math.round(properties.color.r * 255).toString(16).padStart(2, '0')}${Math.round(properties.color.g * 255).toString(16).padStart(2, '0')}${Math.round(properties.color.b * 255).toString(16).padStart(2, '0')}`}
                  onChange={(e) => {
                    const hex = e.target.value
                    setColor({
                      r: parseInt(hex.slice(1, 3), 16) / 255,
                      g: parseInt(hex.slice(3, 5), 16) / 255,
                      b: parseInt(hex.slice(5, 7), 16) / 255,
                    })
                  }}
                  className="w-full h-8 rounded cursor-pointer"
                  aria-label={isBn ? 'কাস্টম রঙ' : 'Custom color'}
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* Opacity slider */}
          <div className="flex items-center gap-2">
            <Label className="text-xs whitespace-nowrap">{t.opacity}</Label>
            <Slider
              value={[Math.round(properties.opacity * 100)]}
              onValueChange={(v) => setOpacity(v[0] / 100)}
              min={10}
              max={100}
              step={5}
              className="w-20"
              aria-label={t.opacity}
            />
            <span className="text-xs w-8">{Math.round(properties.opacity * 100)}%</span>
          </div>

          {/* Stroke width slider */}
          <div className="flex items-center gap-2">
            <Label className="text-xs whitespace-nowrap">{t.stroke}</Label>
            <Slider
              value={[properties.strokeWidth]}
              onValueChange={(v) => setStrokeWidth(v[0])}
              min={1}
              max={12}
              step={1}
              className="w-20"
              aria-label={t.stroke}
            />
            <span className="text-xs w-6">{properties.strokeWidth}</span>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Undo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="h-11 w-11"
                  aria-label={t.undo}
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{t.undo} (Ctrl+Z)</p></TooltipContent>
            </Tooltip>

            {/* Redo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="h-11 w-11"
                  aria-label={t.redo}
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{t.redo} (Ctrl+Y)</p></TooltipContent>
            </Tooltip>

            {/* Delete */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onDelete}
                  disabled={!canDelete}
                  className="h-11 w-11"
                  aria-label={t.delete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{t.delete} (Del)</p></TooltipContent>
            </Tooltip>

            {/* Save */}
            <Button
              onClick={onSave}
              disabled={isSaving || totalCount === 0}
              className="h-11 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-1" />
              {t.save}
            </Button>
          </div>
        </div>

        {/* Annotation count badge */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t.annotations}: <strong className="text-foreground">{totalCount}</strong></span>
        </div>
      </div>
    </TooltipProvider>
  )
}
