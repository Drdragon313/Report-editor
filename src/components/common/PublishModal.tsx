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
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const draftReport = useAppSelector((state) => state.report.draftReport);
  const isPublishing = useAppSelector((state) => state.report.isPublishing);

  const handlePublish = async () => {
    await dispatch(publishReport(draftReport));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={isPublishing ? undefined : onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: { xs: 1.5, sm: 2 }, pb: 1 }}>
        <CloudUploadIcon color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />
        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
          Publish Report Changes
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 1.5, sm: 2.5 } }}>
        <Typography variant="body2" sx={{ color: '#475569', mb: 2, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
          You are about to publish the active draft of <strong>{draftReport.title}</strong> (ID: {draftReport.report_id}) to the backend server.
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip label="Target: PUT" size="small" color="primary" variant="outlined" sx={{ fontSize: '0.6875rem' }} />
          <Chip label={`Endpoint: /api/reports/${draftReport.report_id}`} size="small" variant="outlined" sx={{ fontSize: '0.6875rem' }} />
          <Chip label={`v${draftReport.version}`} size="small" variant="outlined" sx={{ fontSize: '0.6875rem' }} />
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5 }}>
          PAYLOAD PREVIEW (JSON)
        </Typography>
        <Box
          sx={{
            p: 1.5,
            bgcolor: '#0F172A',
            color: '#38BDF8',
            borderRadius: 2,
            maxHeight: isMobile ? 320 : 280,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: { xs: '0.6875rem', sm: '0.75rem' },
            lineHeight: 1.4,
          }}
        >
          <pre style={{ margin: 0 }}>{JSON.stringify(draftReport, null, 2)}</pre>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Button onClick={onClose} disabled={isPublishing} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          variant="contained"
          color="secondary"
          startIcon={isPublishing ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />}
          sx={{ fontSize: '0.8125rem' }}
        >
          {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishModal;
