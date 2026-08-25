import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAppDispatch } from '../../store/hooks';
import { resetDraft } from '../../store/reportSlice';

interface ResetConfirmModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(resetDraft());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#EF4444' }}>
        <RestartAltIcon />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Reset Draft?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#475569' }}>
          This will discard all unsaved edits made during this session and revert your draft back to the original report payload.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#64748B' }}>
          Keep Editing
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Reset Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetConfirmModal;
