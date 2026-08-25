import React from 'react';
import { Button, Box, ButtonProps } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';

interface SDUIButtonProps {
  node: SDUIComponentNode;
}

export const SDUIButton: React.FC<SDUIButtonProps> = ({ node }) => {
  const text = node.text || (node.props?.text as string) || 'Click Here';
  const variant = (node.props?.variant as ButtonProps['variant']) || 'contained';
  const color = (node.props?.color as ButtonProps['color']) || 'primary';
  const size = (node.props?.size as ButtonProps['size']) || 'medium';
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
