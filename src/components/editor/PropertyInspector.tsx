import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectComponent,
  updateComponentData,
  removeComponent,
  duplicateComponent,
  toggleComponentVisibility,
} from '../../store/reportSlice';
import { findNodeById } from '../../utils/sduiTreeUtils';
import { SDUIComponentNode } from '../../types/sdui';

import CommonInspector from './inspectors/CommonInspector';
import TypographyInspector from './inspectors/TypographyInspector';
import GaugeInspector from './inspectors/GaugeInspector';
import ChartInspector from './inspectors/ChartInspector';
import ImpactListInspector from './inspectors/ImpactListInspector';
import ActionCardInspector from './inspectors/ActionCardInspector';

export const PropertyInspector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);
  const draftContent = useAppSelector((state) => state.report.draftReport.content);
  const [activeTab, setActiveTab] = useState(0);

  const selectedNode = selectedComponentId ? findNodeById(draftContent, selectedComponentId) : null;

  if (!selectedNode) {
    return (
      <Box
        sx={{
          width: 340,
          height: '100%',
          bgcolor: '#FFFFFF',
          borderLeft: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        <TuneIcon sx={{ fontSize: 40, color: '#CBD5E1', mb: 1.5 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#475569', mb: 0.5 }}>
          Property Inspector
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.8125rem' }}>
          Select any element on the preview canvas or layers tree to edit its content and styling.
        </Typography>
      </Box>
    );
  }

  const handleUpdate = (updates: Partial<SDUIComponentNode>) => {
    dispatch(updateComponentData({ id: selectedNode.id, updates }));
  };

  const isHidden = Boolean(selectedNode.is_hidden);

  const renderSpecificInspector = () => {
    switch (selectedNode.type) {
      case 'typography':
        return <TypographyInspector node={selectedNode} onChange={handleUpdate} />;
      case 'metric_gauge':
        return <GaugeInspector node={selectedNode} onChange={handleUpdate} />;
      case 'recharts_composed':
      case 'recharts_pie':
      case 'recharts_bar':
        return <ChartInspector node={selectedNode} onChange={handleUpdate} />;
      case 'impact_list':
        return <ImpactListInspector node={selectedNode} onChange={handleUpdate} />;
      case 'action_card':
        return <ActionCardInspector node={selectedNode} onChange={handleUpdate} />;
      default:
        return (
          <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Container elements arrange children using grid or stack layout tokens.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        width: 340,
        height: '100%',
        bgcolor: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Inspector Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={selectedNode.type} size="small" color="primary" sx={{ fontWeight: 700, fontSize: '0.6875rem' }} />
            <Typography variant="h5" noWrap sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
              {selectedNode.id}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={() => dispatch(selectComponent(null))}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ px: 2, borderBottom: '1px solid #F1F5F9' }}>
        <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)}>
          <Tab label="Content & Data" sx={{ fontWeight: 600, fontSize: '0.8125rem' }} />
          <Tab label="Layout & Style" sx={{ fontWeight: 600, fontSize: '0.8125rem' }} />
        </Tabs>
      </Box>

      {/* Body Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {activeTab === 0 ? renderSpecificInspector() : <CommonInspector node={selectedNode} onChange={handleUpdate} />}
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #E2E8F0', bgcolor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          size="small"
          startIcon={isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onClick={() => dispatch(toggleComponentVisibility(selectedNode.id))}
          sx={{ color: '#475569' }}
        >
          {isHidden ? 'Show' : 'Hide'}
        </Button>
        <Button
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={() => dispatch(duplicateComponent(selectedNode.id))}
          sx={{ color: '#475569' }}
        >
          Duplicate
        </Button>
        <Button
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => dispatch(removeComponent(selectedNode.id))}
          color="error"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyInspector;
