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
