import React from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { SDUIComponentNode, AlertBannerProps } from '../../types/sdui';

interface SDUIOAlertBannerProps {
  node: SDUIComponentNode;
}

export const SDUIAlertBanner: React.FC<SDUIOAlertBannerProps> = ({ node }) => {
  const props = ((node.props || {}) as unknown) as AlertBannerProps;
  const title = node.title || props.title || 'Notification';
  const message = props.message;
  const severity = props.severity || 'warning';
  const items = props.items || [];

  return (
    <Alert
      severity={severity}
      sx={{
        width: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: `${severity}.light`,
        '& .MuiAlert-icon': {
          fontSize: 24,
          mt: 0.5,
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
        {title}
      </AlertTitle>
      {message && (
        <Typography variant="body2" sx={{ color: 'text.primary', mb: items.length > 0 ? 1.5 : 0 }}>
          {message}
        </Typography>
      )}

      {items.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${Math.min(items.length, 4)}, 1fr)` },
            gap: 1.5,
            mt: 1,
            p: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          {items.map((item, idx) => (
            <Box key={idx}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                {item.label}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary' }}>
                {item.value}
              </Typography>
              {item.subvalue && (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.subvalue}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Alert>
  );
};

export default SDUIAlertBanner;
