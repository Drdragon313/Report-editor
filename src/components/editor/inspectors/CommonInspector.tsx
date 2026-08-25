import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Slider,
} from '@mui/material';
import { SDUIComponentNode } from '../../../types/sdui';

interface CommonInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

export const CommonInspector: React.FC<CommonInspectorProps> = ({ node, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        General Settings
      </Typography>

      <TextField
        label="Component ID"
        value={node.id}
        fullWidth
        disabled
        size="small"
        helperText="Unique identifier in SDUI schema"
      />

      <FormControlLabel
        control={
          <Switch
            checked={!node.is_hidden}
            onChange={(e) => onChange({ is_hidden: !e.target.checked })}
            color="primary"
          />
        }
        label={<Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Visible in Report</Typography>}
      />

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.5 }}>
          Padding ({Number(node.styles?.padding ?? 16)}px)
        </Typography>
        <Slider
          value={Number(node.styles?.padding ?? 16)}
          min={0}
          max={48}
          step={4}
          onChange={(_, val) => onChange({ styles: { ...node.styles, padding: val as number } })}
          size="small"
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.5 }}>
          Margin ({Number(node.styles?.margin ?? 0)}px)
        </Typography>
        <Slider
          value={Number(node.styles?.margin ?? 0)}
          min={0}
          max={32}
          step={4}
          onChange={(_, val) => onChange({ styles: { ...node.styles, margin: val as number } })}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default CommonInspector;
