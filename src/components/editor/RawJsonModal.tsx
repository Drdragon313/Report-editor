import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFullDraftJson } from '../../store/reportSlice';
import { ReportPayload } from '../../types/sdui';

interface RawJsonModalProps {
  open: boolean;
  onClose: () => void;
}

export const RawJsonModal: React.FC<RawJsonModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const draftReport = useAppSelector((state) => state.report.draftReport);
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevDraftReport, setPrevDraftReport] = useState(draftReport);
  const [jsonText, setJsonText] = useState(() => JSON.stringify(draftReport, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (open !== prevOpen || (open && draftReport !== prevDraftReport)) {
    setPrevOpen(open);
    setPrevDraftReport(draftReport);
    if (open) {
      setJsonText(JSON.stringify(draftReport, null, 2));
      setError(null);
      setCopied(false);
    }
  }

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText) as ReportPayload;
      if (!parsed.report_id || !Array.isArray(parsed.content)) {
        throw new Error('Invalid SDUI Schema: report_id and content array are required.');
      }
      dispatch(setFullDraftJson(parsed));
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draftReport.report_id}_schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: { xs: 1.5, sm: 2 }, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '1.0625rem', sm: '1.25rem' } }}>
            Raw SDUI Schema
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
            onClick={handleCopy}
            sx={{ color: '#475569', borderColor: '#CBD5E1', fontSize: { xs: '0.6875rem', sm: '0.75rem' }, px: 1 }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
            onClick={handleDownload}
            sx={{ color: '#475569', borderColor: '#CBD5E1', fontSize: { xs: '0.6875rem', sm: '0.75rem' }, px: 1, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Download
          </Button>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1, fontSize: '0.75rem' }}>
            {error}
          </Alert>
        )}
        <Box
          component="textarea"
          value={jsonText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setJsonText(e.target.value);
            setError(null);
          }}
          spellCheck={false}
          sx={{
            width: '100%',
            height: isMobile ? 'calc(100vh - 180px)' : '480px',
            bgcolor: '#0F172A',
            color: '#38BDF8',
            p: 1.5,
            borderRadius: 2,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: { xs: '0.6875rem', sm: '0.8125rem' },
            lineHeight: 1.5,
            border: '1px solid #334155',
            resize: 'none',
            outline: 'none',
            '&:focus': {
              borderColor: '#38BDF8',
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: { xs: 1.5, sm: 2 }, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
          Cancel
        </Button>
        <Button onClick={handleApply} variant="contained" color="primary" sx={{ fontSize: '0.8125rem' }}>
          Apply JSON Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RawJsonModal;
