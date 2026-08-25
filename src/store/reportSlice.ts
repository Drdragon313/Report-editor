import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportPayload, SDUIComponentNode } from '../types/sdui';
import { ReportState, ViewportMode } from '../types/editor';
import { defaultCreditReport } from '../data/defaultCreditReport';
import {
  updateNodeById,
  removeNodeById,
  insertNode,
  moveNodeDirection,
  duplicateNode,
} from '../utils/sduiTreeUtils';
import { publishReport } from './reportThunks';

const MAX_HISTORY_LENGTH = 30;

const initialState: ReportState = {
  originalReport: defaultCreditReport,
  draftReport: defaultCreditReport,
  isEditMode: false,
  isDirty: false,
  selectedComponentId: null,
  viewportMode: 'desktop',
  isPublishing: false,
  publishSuccess: false,
  publishError: null,
  history: {
    past: [],
    future: [],
  },
};

const pushToHistory = (state: ReportState) => {
  const currentSnapshot = JSON.parse(JSON.stringify(state.draftReport));
  state.history.past.push(currentSnapshot);
  if (state.history.past.length > MAX_HISTORY_LENGTH) {
    state.history.past.shift();
  }
  state.history.future = [];
  state.isDirty = true;
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportData: (state, action: PayloadAction<ReportPayload>) => {
      pushToHistory(state);
      state.draftReport = action.payload;
    },
    setFullDraftJson: (state, action: PayloadAction<ReportPayload>) => {
      pushToHistory(state);
      state.draftReport = action.payload;
    },
    toggleEditMode: (state, action: PayloadAction<boolean | undefined>) => {
      state.isEditMode = action.payload !== undefined ? action.payload : !state.isEditMode;
      if (!state.isEditMode) {
        state.selectedComponentId = null;
      }
    },
    selectComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },
    setViewportMode: (state, action: PayloadAction<ViewportMode>) => {
      state.viewportMode = action.payload;
    },
    updateReportMeta: (
      state,
      action: PayloadAction<{ title?: string; subtitle?: string; version?: string }>
    ) => {
      pushToHistory(state);
      if (action.payload.title !== undefined) state.draftReport.title = action.payload.title;
      if (action.payload.subtitle !== undefined) state.draftReport.subtitle = action.payload.subtitle;
      if (action.payload.version !== undefined) state.draftReport.version = action.payload.version;
    },
    updateComponentData: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<SDUIComponentNode> }>
    ) => {
      pushToHistory(state);
      state.draftReport.content = updateNodeById(
        state.draftReport.content,
        action.payload.id,
        action.payload.updates
      );
    },
    addComponent: (
      state,
      action: PayloadAction<{
        parentId?: string | null;
        index?: number | null;
        component: SDUIComponentNode;
      }>
    ) => {
      pushToHistory(state);
      state.draftReport.content = insertNode(
        state.draftReport.content,
        action.payload.parentId || null,
        action.payload.index ?? null,
        action.payload.component
      );
      state.selectedComponentId = action.payload.component.id;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      pushToHistory(state);
      state.draftReport.content = removeNodeById(state.draftReport.content, action.payload);
      if (state.selectedComponentId === action.payload) {
        state.selectedComponentId = null;
      }
    },
    toggleComponentVisibility: (state, action: PayloadAction<string>) => {
      pushToHistory(state);
      const targetId = action.payload;
      const findAndToggle = (nodes: SDUIComponentNode[]): SDUIComponentNode[] => {
        return nodes.map((node) => {
          if (node.id === targetId) {
            return { ...node, is_hidden: !node.is_hidden };
          }
          if (node.children && node.children.length > 0) {
            return { ...node, children: findAndToggle(node.children) };
          }
          return node;
        });
      };
      state.draftReport.content = findAndToggle(state.draftReport.content);
    },
    moveComponent: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) => {
      pushToHistory(state);
      state.draftReport.content = moveNodeDirection(
        state.draftReport.content,
        action.payload.id,
        action.payload.direction
      );
    },
    duplicateComponent: (state, action: PayloadAction<string>) => {
      pushToHistory(state);
      state.draftReport.content = duplicateNode(state.draftReport.content, action.payload);
    },
    reorderComponents: (
      state,
      action: PayloadAction<{ parentId: string | null; sourceIndex: number; targetIndex: number }>
    ) => {
      pushToHistory(state);
      const { parentId, sourceIndex, targetIndex } = action.payload;
      if (!parentId) {
        const copy = [...state.draftReport.content];
        const [moved] = copy.splice(sourceIndex, 1);
        copy.splice(targetIndex, 0, moved);
        state.draftReport.content = copy;
      } else {
        const reorderInTree = (nodes: SDUIComponentNode[]): SDUIComponentNode[] => {
          return nodes.map((node) => {
            if (node.id === parentId && node.children) {
              const childCopy = [...node.children];
              const [moved] = childCopy.splice(sourceIndex, 1);
              childCopy.splice(targetIndex, 0, moved);
              return { ...node, children: childCopy };
            }
            if (node.children) {
              return { ...node, children: reorderInTree(node.children) };
            }
            return node;
          });
        };
        state.draftReport.content = reorderInTree(state.draftReport.content);
      }
    },
    resetDraft: (state) => {
      state.draftReport = JSON.parse(JSON.stringify(state.originalReport));
      state.isDirty = false;
      state.selectedComponentId = null;
      state.history = { past: [], future: [] };
    },
    undo: (state) => {
      if (state.history.past.length === 0) return;
      const previous = state.history.past.pop()!;
      state.history.future.push(JSON.parse(JSON.stringify(state.draftReport)));
      state.draftReport = previous;
      state.isDirty = true;
    },
    redo: (state) => {
      if (state.history.future.length === 0) return;
      const next = state.history.future.pop()!;
      state.history.past.push(JSON.parse(JSON.stringify(state.draftReport)));
      state.draftReport = next;
      state.isDirty = true;
    },
    dismissPublishNotification: (state) => {
      state.publishSuccess = false;
      state.publishError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishReport.pending, (state) => {
        state.isPublishing = true;
        state.publishSuccess = false;
        state.publishError = null;
      })
      .addCase(publishReport.fulfilled, (state, action) => {
        state.isPublishing = false;
        state.publishSuccess = true;
        state.originalReport = action.payload.report;
        state.draftReport = action.payload.report;
        state.isDirty = false;
        state.history = { past: [], future: [] };
      })
      .addCase(publishReport.rejected, (state, action) => {
        state.isPublishing = false;
        state.publishError = (action.payload as string) || 'Publishing failed.';
      });
  },
});

export const {
  setReportData,
  setFullDraftJson,
  toggleEditMode,
  selectComponent,
  setViewportMode,
  updateReportMeta,
  updateComponentData,
  addComponent,
  removeComponent,
  toggleComponentVisibility,
  moveComponent,
  duplicateComponent,
  reorderComponents,
  resetDraft,
  undo,
  redo,
  dismissPublishNotification,
} = reportSlice.actions;

export default reportSlice.reducer;
