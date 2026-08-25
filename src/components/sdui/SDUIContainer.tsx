import React from 'react';
import { Box } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';
import { SDUIRenderer } from './SDUIRenderer';
import { useAppSelector } from '../../store/hooks';

interface SDUIContainerProps {
  node: SDUIComponentNode;
}

export const SDUIContainer: React.FC<SDUIContainerProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const layout = node.layout || 'stack';
  const columns = node.columns || { mobile: 1, tablet: 1, desktop: 2 };
  const gap = node.styles?.gap ?? 2;

  const isMobileViewport = viewportMode === 'mobile';
  const isTabletViewport = viewportMode === 'tablet';

  if (layout === 'grid') {
    const gridCols = isMobileViewport
      ? `repeat(${columns.mobile || 1}, minmax(0, 1fr))`
      : isTabletViewport
      ? `repeat(${columns.tablet || columns.mobile || 1}, minmax(0, 1fr))`
      : {
          xs: `repeat(${columns.mobile || 1}, minmax(0, 1fr))`,
          sm: `repeat(${columns.tablet || columns.mobile || 1}, minmax(0, 1fr))`,
          md: `repeat(${columns.desktop || 2}, minmax(0, 1fr))`,
        };

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: { xs: 1.5, sm: gap },
          width: '100%',
          minWidth: 0,
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
          flexDirection: isMobileViewport ? 'column' : { xs: 'column', sm: 'row' },
          alignItems: node.styles?.alignItems || 'stretch',
          justifyContent: node.styles?.justifyContent || 'flex-start',
          flexWrap: 'wrap',
          gap: { xs: 1.5, sm: gap },
          width: '100%',
          minWidth: 0,
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
        gap: { xs: 1.5, sm: gap },
        width: '100%',
        minWidth: 0,
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
