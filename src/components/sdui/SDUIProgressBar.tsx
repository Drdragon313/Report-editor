import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';

interface SDUIProgressBarProps {
  node: SDUIComponentNode;
}

export const SDUIProgressBar: React.FC<SDUIProgressBarProps> = ({ node }) => {
  const label = (node.props?.label as string) || node.title || 'Utilization';
  const value = Number(node.props?.value ?? node.value ?? 50);
  const max = Number(node.props?.max ?? node.max ?? 100);
  const displayValue = (node.props?.displayValue as string) || `${value}%`;
  const color = (node.props?.color as string) || node.color || '#E53935';
  const statusText = (node.props?.statusText as string) || node.status_text;
  const subtext = (node.props?.subtext as string) || node.subtitle;

  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.75 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#0F172A',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {label}
        </Typography>
        {statusText && (
          <Chip
            label={statusText}
            size="small"
            sx={{
              bgcolor: `${color}18`,
              color,
              fontWeight: 700,
              fontSize: '0.6875rem',
              height: 22,
              border: `1px solid ${color}40`,
            }}
          />
        )}
      </Box>

      {/* Progress Track */}
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: 10,
            bgcolor: '#F1F5F9',
            borderRadius: 5,
            overflow: 'hidden',
            p: 0.2,
            border: '1px solid #E2E8F0',
          }}
        >
          <Box
            sx={{
              width: `${percent}%`,
              height: '100%',
              bgcolor: color,
              borderRadius: 4,
              transition: 'width 0.5s ease',
            }}
          />
        </Box>
      </Box>

      {/* Footer Info */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 0.5,
        }}
      >
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>
          {displayValue}
        </Typography>
        {subtext && (
          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.3 }}>
            {subtext}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SDUIProgressBar;
