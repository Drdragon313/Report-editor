import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { publishReport } from '../../store/reportThunks';

interface PublishModalProps {
  open: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const draftReport = useAppSelector((state) => state.report.draftReport);
  const isPublishing = useAppSelector((state) => state.report.isPublishing);

  const handlePublish = async () => {
    await dispatch(publishReport(draftReport));
    onClose();
  };

  return (
    <Dialog open={open} onClose={isPublishing ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <CloudUploadIcon color="primary" />
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Publish Report Changes
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
          You are about to publish the active draft of <strong>{draftReport.title}</strong> (ID: {draftReport.report_id}) to the backend server.
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip label="Target Method: PUT" size="small" color="primary" variant="outlined" />
          <Chip label={`Endpoint: /api/reports/${draftReport.report_id}`} size="small" variant="outlined" />
          <Chip label={`Version: ${draftReport.version}`} size="small" variant="outlined" />
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5 }}>
          PAYLOAD PREVIEW (JSON)
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: '#0F172A',
            color: '#38BDF8',
            borderRadius: 2,
            maxHeight: 280,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          <pre style={{ margin: 0 }}>{JSON.stringify(draftReport, null, 2)}</pre>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isPublishing} sx={{ color: '#64748B' }}>
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          variant="contained"
          color="secondary"
          startIcon={isPublishing ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />}
        >
          {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishModal;
