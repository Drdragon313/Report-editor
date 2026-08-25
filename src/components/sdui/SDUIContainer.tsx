import React from 'react';
import { Box } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';
import { SDUIRenderer } from './SDUIRenderer';

interface SDUIContainerProps {
  node: SDUIComponentNode;
}

export const SDUIContainer: React.FC<SDUIContainerProps> = ({ node }) => {
  const layout = node.layout || 'stack';
  const columns = node.columns || { mobile: 1, tablet: 1, desktop: 2 };
  const gap = node.styles?.gap ?? 2.5;

  if (layout === 'grid') {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: `repeat(${columns.mobile || 1}, 1fr)`,
            sm: `repeat(${columns.tablet || columns.mobile || 1}, 1fr)`,
            md: `repeat(${columns.desktop || 2}, 1fr)`,
          },
          gap,
          width: '100%',
          margin: node.styles?.margin,
          padding: node.styles?.padding,
        }}
      >
        {node.children?.map((child) => (
          <SDUIRenderer key={child.id} node={child} />
        ))}
      </Box>
    );
  }

  if (layout === 'row' || layout === 'flex') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: node.styles?.alignItems || 'center',
          justifyContent: node.styles?.justifyContent || 'flex-start',
          gap,
          width: '100%',
          margin: node.styles?.margin,
          padding: node.styles?.padding,
        }}
      >
        {node.children?.map((child) => (
          <SDUIRenderer key={child.id} node={child} />
        ))}
      </Box>
    );
  }

  // Default stack layout
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        width: '100%',
        margin: node.styles?.margin,
        padding: node.styles?.padding,
      }}
    >
      {node.children?.map((child) => (
        <SDUIRenderer key={child.id} node={child} />
      ))}
    </Box>
  );
};

export default SDUIContainer;
