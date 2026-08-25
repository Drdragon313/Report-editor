import React from 'react';
import { Typography, Chip, Box } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';

interface SDUITypographyProps {
  node: SDUIComponentNode;
}

export const SDUITypography: React.FC<SDUITypographyProps> = ({ node }) => {
  const text = node.text || (node.props?.text as string) || '';
  const variant = (node.variant || node.props?.variant || 'body1') as any;
  const color = node.color || node.styles?.backgroundColor ? undefined : node.props?.color;
  const align = (node.props?.align || 'left') as any;

  if (variant === 'badge') {
    return (
      <Box sx={{ my: 0.5 }}>
        <Chip
          label={text}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            bgcolor: node.color ? `${node.color}18` : '#E2E8F0',
            color: node.color || '#0F172A',
            border: `1px solid ${node.color || '#CBD5E1'}`,
          }}
        />
      </Box>
    );
  }

  return (
    <Typography
      variant={variant}
      align={align}
      sx={{
        color: color || undefined,
        fontWeight: node.props?.fontWeight || undefined,
        margin: node.styles?.margin,
        padding: node.styles?.padding,
      }}
    >
      {text}
    </Typography>
  );
};

export default SDUITypography;
