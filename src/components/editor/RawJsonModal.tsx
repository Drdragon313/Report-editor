import React, { useState, useEffect } from 'react';
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
  const draftReport = useAppSelector((state) => state.report.draftReport);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setJsonText(JSON.stringify(draftReport, null, 2));
      setError(null);
      setCopied(false);
    }
  }, [open, draftReport]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText) as ReportPayload;
      if (!parsed.report_id || !Array.isArray(parsed.content)) {
        throw new Error('Invalid SDUI Schema: report_id and content array are required.');
      }
      dispatch(setFullDraftJson(parsed));
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON syntax');
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
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon color="primary" />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Raw SDUI JSON Schema Editor
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{ color: '#475569', borderColor: '#CBD5E1' }}
          >
            {copied ? 'Copied' : 'Copy JSON'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ color: '#475569', borderColor: '#CBD5E1' }}
          >
            Download
          </Button>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}
        <Box
          component="textarea"
          value={jsonText}
          onChange={(e: any) => {
            setJsonText(e.target.value);
            setError(null);
          }}
          spellCheck={false}
          sx={{
            width: '100%',
            height: '500px',
            bgcolor: '#0F172A',
            color: '#38BDF8',
            p: 2,
            borderRadius: 2,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.8125rem',
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

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#64748B' }}>
          Cancel
        </Button>
        <Button onClick={handleApply} variant="contained" color="primary">
          Apply JSON Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RawJsonModal;
