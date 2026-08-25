import React from 'react';
import { Typography, Chip, Box, TypographyProps } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';

interface SDUITypographyProps {
  node: SDUIComponentNode;
}

export const SDUITypography: React.FC<SDUITypographyProps> = ({ node }) => {
  const text = node.text || (node.props?.text as string) || '';
  const variant = (node.variant || node.props?.variant || 'body1') as TypographyProps['variant'] | 'badge';
  const color = node.color || node.styles?.backgroundColor ? undefined : (node.props?.color as string | undefined);
  const align = (node.props?.align || 'left') as TypographyProps['align'];

  if (variant === 'badge') {
    return (
      <Box sx={{ my: 0.5 }}>
        <Chip
          label={text}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: '0.6875rem',
            height: 22,
            bgcolor: node.color ? `${node.color}18` : '#E2E8F0',
            color: node.color || '#0F172A',
            border: `1px solid ${node.color || '#CBD5E1'}`,
          }}
        />
      </Box>
    );
  }

  const getResponsiveFontSize = () => {
    switch (variant) {
      case 'h1':
        return { xs: '1.375rem', sm: '1.75rem', md: '2rem' };
      case 'h2':
        return { xs: '1.25rem', sm: '1.5rem' };
      case 'h3':
        return { xs: '1.125rem', sm: '1.25rem' };
      case 'h4':
        return { xs: '1rem', sm: '1.125rem' };
      default:
        return undefined;
    }
  };

  return (
    <Typography
      variant={variant}
      align={align}
      sx={{
        color: color || undefined,
        fontWeight: node.props?.fontWeight || undefined,
        fontSize: getResponsiveFontSize(),
        wordBreak: 'break-word',
        margin: node.styles?.margin,
        padding: node.styles?.padding,
      }}
    >
      {text}
    </Typography>
  );
};

export default SDUITypography;
