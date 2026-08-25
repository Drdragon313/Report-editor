import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { SDUIComponentNode, ImpactFactorItem } from '../../../types/sdui';

interface ImpactListInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

const createFactorId = () => `factor_${Date.now()}`;

export const ImpactListInspector: React.FC<ImpactListInspectorProps> = ({ node, onChange }) => {
  const currentTitle = (node.props?.title as string) || node.title || '';
  const currentSubtitle = (node.props?.subtitle as string) || node.subtitle || '';
  const items = ((node.props?.items as ImpactFactorItem[]) || []).slice();

  const handleUpdateItem = (index: number, updates: Partial<ImpactFactorItem>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...updates } : item));
    onChange({ props: { ...node.props, items: next } });
  };

  const handleAddItem = () => {
    const newItem: ImpactFactorItem = {
      id: createFactorId(),
      title: 'New Score Factor',
      impactLevel: 'Medium',
      statusText: 'Good Standing',
      description: 'Description of how this factor influences your rating.',
    };
    onChange({ props: { ...node.props, items: [...items, newItem] } });
  };

  const handleDeleteItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange({ props: { ...node.props, items: next } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        Impact Factors List
      </Typography>

      <TextField
        label="List Title"
        fullWidth
        value={currentTitle}
        onChange={(e) => onChange({ props: { ...node.props, title: e.target.value } })}
      />

      <TextField
        label="List Subtitle"
        fullWidth
        value={currentSubtitle}
        onChange={(e) => onChange({ props: { ...node.props, subtitle: e.target.value } })}
      />

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
          Factor Items ({items.length})
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddItem}>
          Add Factor
        </Button>
      </Box>

      {items.map((item, idx) => (
        <Box
          key={item.id || idx}
          sx={{
            p: 1.5,
            bgcolor: '#F8FAFC',
            borderRadius: 2,
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              label="Factor Title"
              size="small"
              fullWidth
              value={item.title}
              onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
              sx={{ mr: 1 }}
            />
            <IconButton size="small" onClick={() => handleDeleteItem(idx)} sx={{ color: '#EF4444' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            <TextField
              select
              label="Impact Level"
              size="small"
              value={item.impactLevel}
              onChange={(e) => handleUpdateItem(idx, { impactLevel: e.target.value as ImpactFactorItem['impactLevel'] })}
            >
              <MenuItem value="High">High Impact</MenuItem>
              <MenuItem value="Medium">Medium Impact</MenuItem>
              <MenuItem value="Low">Low Impact</MenuItem>
            </TextField>

            <TextField
              label="Status Tag"
              size="small"
              value={item.statusText}
              onChange={(e) => handleUpdateItem(idx, { statusText: e.target.value })}
            />
          </Box>

          <TextField
            label="Description"
            multiline
            rows={2}
            size="small"
            value={item.description}
            onChange={(e) => handleUpdateItem(idx, { description: e.target.value })}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ImpactListInspector;
