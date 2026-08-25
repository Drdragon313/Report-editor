import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { SDUIComponentNode } from '../../../types/sdui';

interface ActionCardInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

export const ActionCardInspector: React.FC<ActionCardInspectorProps> = ({ node, onChange }) => {
  const currentBadge = (node.props?.badge as string) || '';
  const currentTitle = (node.props?.title as string) || node.title || '';
  const currentDescription = (node.props?.description as string) || node.subtitle || '';
  const currentCta = (node.props?.ctaText as string) || '';
  const currentSecondaryCta = (node.props?.secondaryCtaText as string) || '';
  const currentHighlight = (node.props?.highlightColor as string) || '#E53935';
  const features = ((node.props?.features as string[]) || []).slice();

  const handleUpdateFeature = (index: number, val: string) => {
    const next = [...features];
    next[index] = val;
    onChange({ props: { ...node.props, features: next } });
  };

  const handleAddFeature = () => {
    onChange({ props: { ...node.props, features: [...features, 'New feature highlight'] } });
  };

  const handleDeleteFeature = (index: number) => {
    const next = features.filter((_, i) => i !== index);
    onChange({ props: { ...node.props, features: next } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        Action Recommendation Card
      </Typography>

      <TextField
        label="Badge Label"
        fullWidth
        placeholder="PRE-APPROVED OFFER"
        value={currentBadge}
        onChange={(e) => onChange({ props: { ...node.props, badge: e.target.value } })}
      />

      <TextField
        label="Title"
        fullWidth
        value={currentTitle}
        onChange={(e) => onChange({ props: { ...node.props, title: e.target.value } })}
      />

      <TextField
        label="Description"
        multiline
        rows={2}
        fullWidth
        value={currentDescription}
        onChange={(e) => onChange({ props: { ...node.props, description: e.target.value } })}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <TextField
          label="Primary CTA Text"
          value={currentCta}
          onChange={(e) => onChange({ props: { ...node.props, ctaText: e.target.value } })}
        />
        <TextField
          label="Secondary CTA Text"
          value={currentSecondaryCta}
          onChange={(e) => onChange({ props: { ...node.props, secondaryCtaText: e.target.value } })}
        />
      </Box>

      <TextField
        label="Accent Color (HEX)"
        value={currentHighlight}
        onChange={(e) => onChange({ props: { ...node.props, highlightColor: e.target.value } })}
      />

      {/* Features List */}
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Feature Bullets
          </Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={handleAddFeature}>
            Add
          </Button>
        </Box>

        {features.map((feat, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={feat}
              onChange={(e) => handleUpdateFeature(idx, e.target.value)}
            />
            <IconButton size="small" onClick={() => handleDeleteFeature(idx)} sx={{ color: '#EF4444' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActionCardInspector;
