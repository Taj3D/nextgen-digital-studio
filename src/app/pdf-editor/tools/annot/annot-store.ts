/**
 * ============================================================================
 * Phase 2C Wave 1 — Annotation State Store (Zustand)
 * ----------------------------------------------------------------------------
 * Manages annotation state with undo/redo via immutable command stack.
 * Supports 50+ consecutive undo/redo operations.
 * ============================================================================
 */

import { create } from 'zustand'
import type {
  Annotation,
  AnnotationMap,
  AnnotCommand,
  ToolType,
  AnnotationProperties,
} from './annot-types'
import { DEFAULT_PROPERTIES, generateAnnotId } from './annot-types'

interface AnnotState {
  // Active tool
  activeTool: ToolType
  properties: AnnotationProperties

  // Annotations per page
  annotations: AnnotationMap

  // Selection
  selectedAnnotId: string | null

  // Undo/redo stacks (immutable command records)
  undoStack: AnnotCommand[]
  redoStack: AnnotCommand[]

  // Actions
  setTool: (tool: ToolType) => void
  setProperties: (props: Partial<AnnotationProperties>) => void
  setColor: (color: AnnotationProperties['color']) => void
  setOpacity: (opacity: number) => void
  setStrokeWidth: (width: number) => void

  addAnnotation: (annot: Annotation) => void
  deleteAnnotation: (annotId: string, pageNum: number) => void
  moveAnnotation: (annotId: string, pageNum: number, newRect: Annotation['rect']) => void
  updateAnnotation: (annotId: string, pageNum: number, updates: Partial<Annotation>) => void
  // Wave 2: new actions
  loadExistingAnnotations: (annotsByPage: Record<number, Annotation[]>) => void
  editAnnotation: (annotId: string, pageNum: number, updates: Partial<Annotation>) => void
  resizeAnnotation: (annotId: string, pageNum: number, newRect: Annotation['rect'], extraUpdates?: Partial<Annotation>) => void
  duplicateAnnotation: (annotId: string, pageNum: number) => Annotation | null

  selectAnnotation: (annotId: string | null) => void

  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  clearPage: (pageNum: number) => void
  clearAll: () => void

  getAnnotationCount: (pageNum?: number) => number
  getAllAnnotations: () => Annotation[]
}

const MAX_UNDO_STACK = 100  // 50+ required, 100 for safety

export const useAnnotStore = create<AnnotState>((set, get) => ({
  activeTool: 'select',
  properties: { ...DEFAULT_PROPERTIES },

  annotations: {},

  selectedAnnotId: null,

  undoStack: [],
  redoStack: [],

  setTool: (tool) => set({ activeTool: tool, selectedAnnotId: null }),

  setProperties: (props) => set((state) => ({
    properties: { ...state.properties, ...props },
  })),

  setColor: (color) => set((state) => ({
    properties: { ...state.properties, color },
  })),

  setOpacity: (opacity) => set((state) => ({
    properties: { ...state.properties, opacity },
  })),

  setStrokeWidth: (strokeWidth) => set((state) => ({
    properties: { ...state.properties, strokeWidth },
  })),

  addAnnotation: (annot) => {
    set((state) => {
      const pageAnnots = state.annotations[annot.pageNum] || []
      const newAnnotations = {
        ...state.annotations,
        [annot.pageNum]: [...pageAnnots, annot],
      }
      const command: AnnotCommand = {
        type: 'add',
        annotationId: annot.id,
        pageNum: annot.pageNum,
        after: annot,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],  // clear redo on new action
        selectedAnnotId: annot.id,
      }
    })
  },

  deleteAnnotation: (annotId, pageNum) => {
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const existing = pageAnnots.find(a => a.id === annotId)
      if (!existing) return state
      const newPageAnnots = pageAnnots.filter(a => a.id !== annotId)
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'delete',
        annotationId: annotId,
        pageNum,
        before: existing,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
        selectedAnnotId: null,
      }
    })
  },

  moveAnnotation: (annotId, pageNum, newRect) => {
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const existing = pageAnnots.find(a => a.id === annotId)
      if (!existing) return state
      const updated = { ...existing, rect: newRect }
      const newPageAnnots = pageAnnots.map(a => a.id === annotId ? updated : a)
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'move',
        annotationId: annotId,
        pageNum,
        before: existing,
        after: updated,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
      }
    })
  },

  updateAnnotation: (annotId, pageNum, updates) => {
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const existing = pageAnnots.find(a => a.id === annotId)
      if (!existing) return state
      const updated = { ...existing, ...updates } as Annotation
      // Mark dirty if this is an existing annotation
      if (updated.origin === 'existing') {
        updated.dirty = true
      }
      const newPageAnnots = pageAnnots.map(a => a.id === annotId ? updated : a)
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'update',
        annotationId: annotId,
        pageNum,
        before: existing,
        after: updated,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
      }
    })
  },

  // Wave 2: Load existing annotations into store (no undo command)
  loadExistingAnnotations: (annotsByPage) => set((state) => ({
    annotations: { ...state.annotations, ...annotsByPage },
  })),

  // Wave 2: Edit annotation properties (alias for updateAnnotation with dirty marking)
  editAnnotation: (annotId, pageNum, updates) => {
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const existing = pageAnnots.find(a => a.id === annotId)
      if (!existing) return state
      const updated = { ...existing, ...updates } as Annotation
      if (updated.origin === 'existing') {
        updated.dirty = true
      }
      const newPageAnnots = pageAnnots.map(a => a.id === annotId ? updated : a)
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'update',
        annotationId: annotId,
        pageNum,
        before: existing,
        after: updated,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
      }
    })
  },

  // Wave 2: Resize annotation (similar to move but with 'resize' command type)
  resizeAnnotation: (annotId, pageNum, newRect, extraUpdates) => {
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const existing = pageAnnots.find(a => a.id === annotId)
      if (!existing) return state
      const updated = { ...existing, ...extraUpdates, rect: newRect } as Annotation
      if (updated.origin === 'existing') {
        updated.dirty = true
      }
      const newPageAnnots = pageAnnots.map(a => a.id === annotId ? updated : a)
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'resize',
        annotationId: annotId,
        pageNum,
        before: existing,
        after: updated,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
      }
    })
  },

  // Wave 2: Duplicate annotation (creates new annotation with offset)
  duplicateAnnotation: (annotId, pageNum) => {
    let newAnnot: Annotation | null = null
    set((state) => {
      const pageAnnots = state.annotations[pageNum] || []
      const original = pageAnnots.find(a => a.id === annotId)
      if (!original) return state

      // Create deep copy with new ID + offset rect
      newAnnot = JSON.parse(JSON.stringify(original)) as Annotation
      newAnnot.id = `annot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      newAnnot.origin = 'created'
      newAnnot.isExisting = false
      newAnnot.dirty = false
      newAnnot.originalSnapshot = undefined
      newAnnot.pdfRefId = undefined
      newAnnot.createdAt = Date.now()
      // Offset by 20px in PDF coords (positive = right + up)
      newAnnot.rect = {
        x: original.rect.x + 20,
        y: original.rect.y + 20,
        width: original.rect.width,
        height: original.rect.height,
      }
      // For Line, also offset start/end
      if (newAnnot.subtype === 'Line') {
        const ln = newAnnot as any
        ln.start = { x: ln.start.x + 20, y: ln.start.y + 20 }
        ln.end = { x: ln.end.x + 20, y: ln.end.y + 20 }
      }
      // For Ink, translate all paths
      if (newAnnot.subtype === 'Ink') {
        const ink = newAnnot as any
        ink.paths = ink.paths.map((path: { x: number; y: number }[]) =>
          path.map(p => ({ x: p.x + 20, y: p.y + 20 }))
        )
      }
      // For Highlight family, translate QuadPoints
      if (newAnnot.subtype === 'Highlight' || newAnnot.subtype === 'Underline' || newAnnot.subtype === 'StrikeOut') {
        const h = newAnnot as any
        if (h.quads) {
          h.quads = h.quads.map((q: any) => ({
            x1: q.x1 + 20, y1: q.y1 + 20,
            x2: q.x2 + 20, y2: q.y2 + 20,
            x3: q.x3 + 20, y3: q.y3 + 20,
            x4: q.x4 + 20, y4: q.y4 + 20,
          }))
        }
      }

      const newPageAnnots = [...pageAnnots, newAnnot]
      const newAnnotations = { ...state.annotations, [pageNum]: newPageAnnots }
      const command: AnnotCommand = {
        type: 'duplicate',
        annotationId: newAnnot.id,
        pageNum,
        after: newAnnot,
      }
      const undoStack = [...state.undoStack, command].slice(-MAX_UNDO_STACK)
      return {
        annotations: newAnnotations,
        undoStack,
        redoStack: [],
        selectedAnnotId: newAnnot.id,
      }
    })
    return newAnnot
  },

  selectAnnotation: (annotId) => set({ selectedAnnotId: annotId }),

  undo: () => {
    set((state) => {
      if (state.undoStack.length === 0) return state
      const command = state.undoStack[state.undoStack.length - 1]
      const newUndoStack = state.undoStack.slice(0, -1)
      const newRedoStack = [...state.redoStack, command]

      let newAnnotations = state.annotations
      if (command.type === 'add' && command.after) {
        // Undo add = remove
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.filter(a => a.id !== command.annotationId),
        }
      } else if (command.type === 'delete' && command.before) {
        // Undo delete = re-add
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: [...pageAnnots, command.before],
        }
      } else if (command.type === 'move' && command.before) {
        // Undo move = restore old rect
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.before! : a),
        }
      } else if (command.type === 'update' && command.before) {
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.before! : a),
        }
      } else if (command.type === 'resize' && command.before) {
        // Undo resize = restore old rect + geometry
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.before! : a),
        }
      } else if (command.type === 'duplicate' && command.after) {
        // Undo duplicate = remove the duplicated annotation
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.filter(a => a.id !== command.annotationId),
        }
      }

      return {
        annotations: newAnnotations,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
        selectedAnnotId: null,
      }
    })
  },

  redo: () => {
    set((state) => {
      if (state.redoStack.length === 0) return state
      const command = state.redoStack[state.redoStack.length - 1]
      const newRedoStack = state.redoStack.slice(0, -1)
      const newUndoStack = [...state.undoStack, command]

      let newAnnotations = state.annotations
      if (command.type === 'add' && command.after) {
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: [...pageAnnots, command.after],
        }
      } else if (command.type === 'delete' && command.before) {
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.filter(a => a.id !== command.annotationId),
        }
      } else if (command.type === 'move' && command.after) {
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.after! : a),
        }
      } else if (command.type === 'update' && command.after) {
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.after! : a),
        }
      } else if (command.type === 'resize' && command.after) {
        // Redo resize = apply new rect + geometry
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: pageAnnots.map(a => a.id === command.annotationId ? command.after! : a),
        }
      } else if (command.type === 'duplicate' && command.after) {
        // Redo duplicate = re-add the duplicated annotation
        const pageAnnots = newAnnotations[command.pageNum] || []
        newAnnotations = {
          ...newAnnotations,
          [command.pageNum]: [...pageAnnots, command.after],
        }
      }

      return {
        annotations: newAnnotations,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
      }
    })
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,

  clearPage: (pageNum) => set((state) => {
    const newAnnotations = { ...state.annotations }
    delete newAnnotations[pageNum]
    return { annotations: newAnnotations, selectedAnnotId: null }
  }),

  clearAll: () => set({
    annotations: {},
    selectedAnnotId: null,
    undoStack: [],
    redoStack: [],
  }),

  getAnnotationCount: (pageNum) => {
    const state = get()
    if (pageNum !== undefined) {
      return state.annotations[pageNum]?.length || 0
    }
    return Object.values(state.annotations).reduce((sum, arr) => sum + arr.length, 0)
  },

  getAllAnnotations: () => {
    const state = get()
    return Object.values(state.annotations).flat()
  },
}))
