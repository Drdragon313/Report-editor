import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Slider,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { SDUIComponentNode } from '../../../types/sdui';

interface ChartInspectorProps {
  node: SDUIComponentNode;
  onChange: (updates: Partial<SDUIComponentNode>) => void;
}

export const ChartInspector: React.FC<ChartInspectorProps> = ({ node, onChange }) => {
  const config = node.config || node.props?.config || {};
  const height = config.height || 240;
  const showGrid = config.showGrid !== false;
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend !== false;
  const data = (node.data || node.props?.data || []).slice();

  const handleUpdateDataRow = (index: number, key: string, val: any) => {
    const next = data.map((item: any, i: number) => {
      if (i === index) {
        return { ...item, [key]: isNaN(Number(val)) ? val : Number(val) };
      }
      return item;
    });
    onChange({ data: next, props: { ...node.props, data: next } });
  };

  const handleAddRow = () => {
    const sample = data[0] ? { ...data[0] } : { category: 'New item', value: 10 };
    if (sample.month) sample.month = 'New';
    if (sample.category) sample.category = 'New';
    onChange({ data: [...data, sample], props: { ...node.props, data: [...data, sample] } });
  };

  const handleDeleteRow = (index: number) => {
    const next = data.filter((_: any, i: number) => i !== index);
    onChange({ data: next, props: { ...node.props, data: next } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
        Chart Configuration
      </Typography>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.5 }}>
          Chart Height ({height}px)
        </Typography>
        <Slider
          value={height}
          min={160}
          max={400}
          step={20}
          onChange={(_, val) =>
            onChange({
              config: { ...config, height: val },
              props: { ...node.props, config: { ...config, height: val } },
            })
          }
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showGrid}
              size="small"
              onChange={(e) =>
                onChange({
                  config: { ...config, showGrid: e.target.checked },
                  props: { ...node.props, config: { ...config, showGrid: e.target.checked } },
                })
              }
            />
          }
          label={<Typography sx={{ fontSize: '0.8125rem' }}>Show Grid Lines</Typography>}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showTooltip}
              size="small"
              onChange={(e) =>
                onChange({
                  config: { ...config, showTooltip: e.target.checked },
                  props: { ...node.props, config: { ...config, showTooltip: e.target.checked } },
                })
              }
            />
          }
          label={<Typography sx={{ fontSize: '0.8125rem' }}>Show Interactive Tooltip</Typography>}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showLegend}
              size="small"
              onChange={(e) =>
                onChange({
                  config: { ...config, showLegend: e.target.checked },
                  props: { ...node.props, config: { ...config, showLegend: e.target.checked } },
                })
              }
            />
          }
          label={<Typography sx={{ fontSize: '0.8125rem' }}>Show Legend</Typography>}
        />
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Data Items Editor */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Data Points ({data.length} items)
          </Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={handleAddRow}>
            Add Row
          </Button>
        </Box>

        {data.map((row: any, idx: number) => {
          const keys = Object.keys(row).filter((k) => k !== 'fill');
          return (
            <Box
              key={idx}
              sx={{
                p: 1.25,
                mb: 1,
                bgcolor: '#F8FAFC',
                borderRadius: 1.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(keys.length, 2)}, 1fr)`, gap: 1, flex: 1 }}>
                {keys.map((k) => (
                  <TextField
                    key={k}
                    label={k}
                    size="small"
                    value={row[k] ?? ''}
                    onChange={(e) => handleUpdateDataRow(idx, k, e.target.value)}
                  />
                ))}
              </Box>
              <IconButton size="small" onClick={() => handleDeleteRow(idx)} sx={{ color: '#EF4444' }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ChartInspector;
