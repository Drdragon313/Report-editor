import React from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { SDUIComponentNode, AlertBannerProps } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';

interface SDUIAlertBannerProps {
  node: SDUIComponentNode;
}

export const SDUIAlertBanner: React.FC<SDUIAlertBannerProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

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
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: `${severity}.light`,
        p: { xs: 1.5, sm: 2 },
        '& .MuiAlert-icon': {
          fontSize: { xs: 20, sm: 24 },
          mt: 0.25,
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: 700, fontSize: { xs: '0.9375rem', sm: '1rem' }, mb: 0.5 }}>
        {title}
      </AlertTitle>
      {message && (
        <Typography variant="body2" sx={{ color: 'text.primary', mb: items.length > 0 ? 1.25 : 0, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
          {message}
        </Typography>
      )}

      {items.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(2, minmax(0, 1fr))'
              : { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(2, minmax(0, 1fr))', md: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))` },
            gap: 1.25,
            mt: 1,
            p: 1.25,
            bgcolor: 'rgba(255, 255, 255, 0.75)',
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          {items.map((item, idx) => (
            <Box key={idx} sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'block',
                  fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                }}
              >
                {item.label}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.8125rem', sm: '0.875rem' }, color: 'text.primary', wordBreak: 'break-word' }}>
                {item.value}
              </Typography>
              {item.subvalue && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.625rem', sm: '0.6875rem' } }}>
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
