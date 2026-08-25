import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReportPayload } from '../types/sdui';

export interface PublishReportResponse {
  success: boolean;
  message: string;
  report: ReportPayload;
  publishedAt: string;
}

export const publishReport = createAsyncThunk<
  PublishReportResponse,
  ReportPayload,
  { rejectValue: string }
>('report/publishReport', async (draftReport: ReportPayload, { rejectWithValue }) => {
  try {
    // Simulated API call: PUT /api/reports/:id
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Save to local backup store if desired
    const payloadCopy = JSON.parse(JSON.stringify(draftReport)) as ReportPayload;
    payloadCopy.last_updated = new Date().toISOString().split('T')[0];

    return {
      success: true,
      message: `Report ${draftReport.report_id} successfully published to server.`,
      report: payloadCopy,
      publishedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Failed to publish report.');
  }
});
