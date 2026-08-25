import React from 'react';
import { Button, Box } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';

interface SDUIButtonProps {
  node: SDUIComponentNode;
}

export const SDUIButton: React.FC<SDUIButtonProps> = ({ node }) => {
  const text = node.text || (node.props?.text as string) || 'Click Here';
  const variant = (node.props?.variant || 'contained') as any;
  const color = (node.props?.color || 'primary') as any;
  const size = (node.props?.size || 'medium') as any;
  const fullWidth = Boolean(node.props?.fullWidth);

  return (
    <Box sx={{ margin: node.styles?.margin, padding: node.styles?.padding }}>
      <Button variant={variant} color={color} size={size} fullWidth={fullWidth}>
        {text}
      </Button>
    </Box>
  );
};

export default SDUIButton;
