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

  const padding = node.styles?.padding !== undefined ? node.styles.padding : 20;

  return (
    <Card
      elevation={elevation}
      sx={{
        width: '100%',
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
      <CardContent sx={{ padding: `${padding}px !important`, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {node.children?.map((child) => (
          <SDUIRenderer key={child.id} node={child} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SDUICard;