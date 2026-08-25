import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { dismissPublishNotification } from '../../store/reportSlice';

export const NotificationSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const publishSuccess = useAppSelector((state) => state.report.publishSuccess);
  const publishError = useAppSelector((state) => state.report.publishError);

  const handleClose = () => {
    dispatch(dismissPublishNotification());
  };

  return (
    <>
      <Snackbar
        open={publishSuccess}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
          Report successfully published to server! Draft synced.
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(publishError)}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
          {publishError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSnackbar;
