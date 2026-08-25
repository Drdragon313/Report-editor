import { ReportPayload, SDUIComponentNode, SDUIComponentType } from './sdui';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ComponentTemplate {
  type: SDUIComponentType;
  label: string;
  category: 'Layout' | 'Metrics & Data' | 'Charts' | 'Content' | 'Actions';
  description: string;
  icon: string;
  defaultNode: () => SDUIComponentNode;
}

export interface ReportState {
  originalReport: ReportPayload;
  draftReport: ReportPayload;
  isEditMode: boolean;
  isDirty: boolean;
  selectedComponentId: string | null;
  viewportMode: ViewportMode;
  isPublishing: boolean;
  publishSuccess: boolean;
  publishError: string | null;
  history: {
    past: ReportPayload[];
    future: ReportPayload[];
  };
}
