import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { SDUIComponentNode } from '../../../types/sdui';

interface TypographyInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

const VARIANTS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
  { label: 'Heading 4', value: 'h4' },
  { label: 'Subtitle 1', value: 'subtitle1' },
  { label: 'Subtitle 2', value: 'subtitle2' },
  { label: 'Body 1', value: 'body1' },
  { label: 'Body 2', value: 'body2' },
  { label: 'Badge / Pill', value: 'badge' },
];

export const TypographyInspector: React.FC<TypographyInspectorProps> = ({ node, onChange }) => {
  const currentText = node.text || (node.props?.text as string) || '';
  const currentVariant = node.variant || node.props?.variant || 'body1';
  const currentAlign = node.props?.align || 'left';
  const currentColor = node.color || node.props?.color || '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        Typography Content
      </Typography>

      <TextField
        label="Text Content"
        multiline
        rows={3}
        fullWidth
        value={currentText}
        onChange={(e) => onChange({ text: e.target.value, props: { ...node.props, text: e.target.value } })}
      />

      <TextField
        select
        label="Variant / Style"
        fullWidth
        value={currentVariant}
        onChange={(e) => onChange({ variant: e.target.value, props: { ...node.props, variant: e.target.value } })}
      >
        {VARIANTS.map((v) => (
          <MenuItem key={v.value} value={v.value}>
            {v.label}
          </MenuItem>
        ))}
      </TextField>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.5 }}>
          Text Alignment
        </Typography>
        <ToggleButtonGroup
          value={currentAlign}
          exclusive
          size="small"
          onChange={(_, val) => val && onChange({ props: { ...node.props, align: val } })}
        >
          <ToggleButton value="left">
            <FormatAlignLeftIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        label="Text Color (HEX)"
        fullWidth
        placeholder="#0F172A"
        value={currentColor}
        onChange={(e) => onChange({ color: e.target.value, props: { ...node.props, color: e.target.value } })}
      />
    </Box>
  );
};

export default TypographyInspector;
