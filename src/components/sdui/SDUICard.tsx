import React from 'react';
import { Card, CardContent } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';
import { SDUIRenderer } from './SDUIRenderer';
import { useAppSelector } from '../../store/hooks';

interface SDUICardProps {
  node: SDUIComponentNode;
}

export const SDUICard: React.FC<SDUICardProps> = ({ node }) => {
  const isEditMode = useAppSelector((state) => state.report.isEditMode);
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

  const elevation =
    typeof node.elevation === 'number'
      ? node.elevation
      : node.elevation === 'lg'
      ? 3
      : node.elevation === 'md'
      ? 2
      : node.elevation === 'sm'
      ? 1
      : 0;

  const rawPadding = node.styles?.padding;
  const numPadding =
    typeof rawPadding === 'number'
      ? rawPadding
      : typeof rawPadding === 'string'
      ? parseFloat(rawPadding) || undefined
      : undefined;

  const paddingXs = isMobile
    ? (numPadding !== undefined ? Math.min(14, numPadding) : 14)
    : (numPadding !== undefined ? Math.min(16, numPadding) : 14);
  const paddingSm = numPadding !== undefined ? numPadding : 20;

  return (
    <Card
      elevation={elevation}
      sx={{
        width: '100%',
        minWidth: 0,
        backgroundColor: node.styles?.backgroundColor || '#FFFFFF',
        borderRadius: node.styles?.borderRadius || 3,
        border: node.styles?.borderColor ? `1px solid ${node.styles.borderColor}` : '1px solid #E2E8F0',
        margin: node.styles?.margin,
        overflow: isEditMode ? 'visible' : 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <CardContent
        sx={{
          padding: `${paddingXs}px !important`,
          '@media (min-width: 600px)': {
            padding: `${paddingSm}px !important`,
          },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {node.children?.map((child) => (
          <SDUIRenderer key={child.id} node={child} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SDUICard;