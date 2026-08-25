import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LayersIcon from '@mui/icons-material/Layers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectComponent,
  toggleComponentVisibility,
  moveComponent,
  removeComponent,
} from '../../store/reportSlice';
import { flattenTree } from '../../utils/sduiTreeUtils';

interface ComponentOutlineTreeProps {
  onOpenPalette: () => void;
}

export const ComponentOutlineTree: React.FC<ComponentOutlineTreeProps> = ({ onOpenPalette }) => {
  const dispatch = useAppDispatch();
  const draftContent = useAppSelector((state) => state.report.draftReport.content);
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);
  const [searchTerm, setSearchTerm] = useState('');

  const flatNodes = flattenTree(draftContent);

  const filteredNodes = flatNodes.filter(({ node }) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const idMatch = node.id.toLowerCase().includes(term);
    const typeMatch = node.type.toLowerCase().includes(term);
    const textMatch = (node.text || node.title || (node.props?.title as string) || '')
      .toLowerCase()
      .includes(term);
    return idMatch || typeMatch || textMatch;
  });

  return (
    <Box
      sx={{
        width: 320,
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LayersIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>
            Structure & Layers
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
          {flatNodes.length} nodes
        </Typography>
      </Box>

      {/* Search Filter */}
      <Box sx={{ p: 1.5, borderBottom: '1px solid #F1F5F9' }}>
        <TextField
          placeholder="Filter components..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.8125rem', bgcolor: '#F8FAFC' } }}
        />
      </Box>

      {/* Tree Item List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        {filteredNodes.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', color: '#94A3B8' }}>
            <Typography variant="body2">No components matched</Typography>
          </Box>
        ) : (
          filteredNodes.map(({ node, depth }) => {
            const isSelected = selectedComponentId === node.id;
            const isHidden = Boolean(node.is_hidden);
            const label = node.title || node.text || (node.props?.title as string) || node.id;

            return (
              <Box
                key={node.id}
                onClick={() => dispatch(selectComponent(node.id))}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.5,
                  py: 0.75,
                  pl: `${depth * 14 + 10}px`,
                  mb: 0.5,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  bgcolor: isSelected ? '#EFF6FF' : isHidden ? '#F8FAFC' : 'transparent',
                  border: isSelected ? '1px solid #93C5FD' : '1px solid transparent',
                  opacity: isHidden ? 0.6 : 1,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: isSelected ? '#EFF6FF' : '#F1F5F9',
                  },
                }}
              >
                <Box sx={{ minWidth: 0, flex: 1, mr: 1 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#1D4ED8' : '#0F172A',
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.6875rem' }}>
                    {node.type} • {node.id.substring(0, 10)}
                  </Typography>
                </Box>

                {/* Quick Actions */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Tooltip title={isHidden ? 'Unhide' : 'Hide'}>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(toggleComponentVisibility(node.id))}
                      sx={{ p: 0.4, color: isHidden ? '#94A3B8' : '#64748B' }}
                    >
                      {isHidden ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Move Up">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(moveComponent({ id: node.id, direction: 'up' }))}
                      sx={{ p: 0.4, color: '#64748B' }}
                    >
                      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Move Down">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(moveComponent({ id: node.id, direction: 'down' }))}
                      sx={{ p: 0.4, color: '#64748B' }}
                    >
                      <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(removeComponent(node.id))}
                      sx={{ p: 0.4, color: '#EF4444' }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      {/* Add Component Bottom CTA */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onOpenPalette}
          sx={{ bgcolor: '#0F172A', color: '#FFFFFF' }}
        >
          Add Component
        </Button>
      </Box>
    </Box>
  );
};

export default ComponentOutlineTree;
