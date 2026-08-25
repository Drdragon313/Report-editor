import React from 'react';
import { Box, Paper } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

interface CanvasWrapperProps {
  children: React.ReactNode;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ children }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isEditMode = useAppSelector((state) => state.report.isEditMode);

  const getCanvasWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return '420px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '960px';
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        bgcolor: isEditMode ? '#0F172A08' : '#F8FAFC',
        py: { xs: 1.5, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        transition: 'background-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={isEditMode ? 3 : 0}
        sx={{
          width: '100%',
          maxWidth: getCanvasWidth(),
          mx: 'auto',
          mb: { xs: 4, sm: 6 },
          bgcolor: '#FFFFFF',
          borderRadius: { xs: 2.5, sm: 3 },
          border: '1px solid #E2E8F0',
          p: { xs: 1.5, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          minHeight: 'fit-content',
          boxShadow: isEditMode
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)'
            : '0 1px 3px rgba(0, 0, 0, 0.05)',
          transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default CanvasWrapper;