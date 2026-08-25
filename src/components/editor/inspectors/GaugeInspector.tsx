import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { SDUIComponentNode } from '../../../types/sdui';

interface GaugeInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

export const GaugeInspector: React.FC<GaugeInspectorProps> = ({ node, onChange }) => {
  const currentValue = Number(node.value ?? node.props?.value ?? 327);
  const currentMin = Number(node.min ?? node.props?.min ?? 0);
  const currentMax = Number(node.max ?? node.props?.max ?? 1000);
  const currentTitle = node.title || (node.props?.title as string) || '';
  const currentSubtitle = node.subtitle || (node.props?.subtitle as string) || '';
  const currentStatus = node.status_text || (node.props?.status_text as string) || '';
  const bulletPoints = ((node.props?.bullet_points as string[]) || []).slice();

  const handleUpdateBullet = (index: number, val: string) => {
    const next = [...bulletPoints];
    next[index] = val;
    onChange({ props: { ...node.props, bullet_points: next } });
  };

  const handleAddBullet = () => {
    onChange({ props: { ...node.props, bullet_points: [...bulletPoints, 'New recommendation item'] } });
  };

  const handleDeleteBullet = (index: number) => {
    const next = bulletPoints.filter((_, i) => i !== index);
    onChange({ props: { ...node.props, bullet_points: next } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        Credit Score Gauge
      </Typography>

      <TextField
        label="Gauge Title"
        fullWidth
        value={currentTitle}
        onChange={(e) => onChange({ title: e.target.value, props: { ...node.props, title: e.target.value } })}
      />

      <TextField
        label="Gauge Subtitle"
        fullWidth
        value={currentSubtitle}
        onChange={(e) => onChange({ subtitle: e.target.value, props: { ...node.props, subtitle: e.target.value } })}
      />

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.5 }}>
          Score Value ({currentValue} pts)
        </Typography>
        <Slider
          value={currentValue}
          min={currentMin}
          max={currentMax}
          step={1}
          onChange={(_, val) => onChange({ value: val as number, props: { ...node.props, value: val } })}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <TextField
          label="Min Score"
          type="number"
          value={currentMin}
          onChange={(e) => onChange({ min: Number(e.target.value), props: { ...node.props, min: Number(e.target.value) } })}
        />
        <TextField
          label="Max Score"
          type="number"
          value={currentMax}
          onChange={(e) => onChange({ max: Number(e.target.value), props: { ...node.props, max: Number(e.target.value) } })}
        />
      </Box>

      <TextField
        label="Status Badge Text"
        fullWidth
        placeholder="Needs Work, Fair, Good, etc."
        value={currentStatus}
        onChange={(e) => onChange({ status_text: e.target.value, props: { ...node.props, status_text: e.target.value } })}
      />

      {/* Bullet Points */}
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Bullet Points & Advice
          </Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={handleAddBullet}>
            Add
          </Button>
        </Box>

        {bulletPoints.map((bp, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={bp}
              onChange={(e) => handleUpdateBullet(idx, e.target.value)}
            />
            <IconButton size="small" onClick={() => handleDeleteBullet(idx)} sx={{ color: '#EF4444' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GaugeInspector;
