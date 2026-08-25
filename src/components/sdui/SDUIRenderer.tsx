import React, { useState, useEffect, useRef } from 'react';
import { Box, Chip, Divider, Typography, IconButton, Tooltip } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectComponent,
  toggleComponentVisibility,
  moveComponent,
  duplicateComponent,
  removeComponent,
} from '../../store/reportSlice';

import SDUITypography from './SDUITypography';
import SDUIContainer from './SDUIContainer';
import SDUICard from './SDUICard';
import SDUIMetricGauge from './SDUIMetricGauge';
import SDUIMetricCards from './SDUIMetricCards';
import SDUIProgressBar from './SDUIProgressBar';
import SDUIRechartsComposed from './SDUIRechartsComposed';
import SDUIRechartsPie from './SDUIRechartsPie';
import SDUIRechartsBar from './SDUIRechartsBar';
import SDUIImpactList from './SDUIImpactList';
import SDUIAlertBanner from './SDUIAlertBanner';
import SDUIActionCard from './SDUIActionCard';
import SDUIAccordion from './SDUIAccordion';
import SDUIButton from './SDUIButton';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface SDUIRendererProps {
  node: SDUIComponentNode;
}

export const SDUIRenderer: React.FC<SDUIRendererProps> = ({ node }) => {
  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector((state) => state.report.isEditMode);
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isSelected = isEditMode && selectedComponentId === node.id;
  const isHidden = Boolean(node.is_hidden);

  // Auto-scroll into view smoothly whenever this component becomes selected (e.g. newly added or clicked)
  useEffect(() => {
    if (isSelected && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [isSelected]);

  if (isHidden && !isEditMode) {
    return null;
  }

  const renderComponentContent = () => {
    switch (node.type) {
      case 'typography':
        return <SDUITypography node={node} />;
      case 'container':
        return <SDUIContainer node={node} />;
      case 'card':
        return <SDUICard node={node} />;
      case 'metric_gauge':
        return <SDUIMetricGauge node={node} />;
      case 'metric_card':
        return <SDUIMetricCards node={node} />;
      case 'progress_bar':
        return <SDUIProgressBar node={node} />;
      case 'recharts_composed':
        return <SDUIRechartsComposed node={node} />;
      case 'recharts_pie':
        return <SDUIRechartsPie node={node} />;
      case 'recharts_bar':
        return <SDUIRechartsBar node={node} />;
      case 'impact_list':
        return <SDUIImpactList node={node} />;
      case 'alert_banner':
        return <SDUIAlertBanner node={node} />;
      case 'action_card':
        return <SDUIActionCard node={node} />;
      case 'accordion_faq':
        return <SDUIAccordion node={node} />;
      case 'button':
        return <SDUIButton node={node} />;
      case 'divider':
        return <Divider sx={{ my: 2 }} />;
      default:
        return (
          <Box sx={{ p: 2, border: '1px dashed #CBD5E1', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Unknown component type: {node.type}
            </Typography>
          </Box>
        );
    }
  };

  if (!isEditMode) {
    return <Box sx={{ width: '100%' }}>{renderComponentContent()}</Box>;
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectComponent(node.id));
  };

  return (
    <Box
      ref={wrapperRef}
      onClick={handleSelect}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        borderRadius: 2.5,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        // Selected / Hover Visual Feedback
        outline: isSelected
          ? '2px solid #2563EB'
          : isHovered
          ? '1.5px dashed #94A3B8'
          : '1.5px solid transparent',
        outlineOffset: isSelected ? 3 : 1,
        backgroundColor: isSelected
          ? 'rgba(37, 99, 235, 0.04)'
          : isHovered
          ? 'rgba(241, 245, 249, 0.6)'
          : 'transparent',
        boxShadow: isSelected
          ? '0 0 0 4px rgba(37, 99, 235, 0.14), 0 8px 24px -4px rgba(37, 99, 235, 0.16)'
          : 'none',
        // In edit mode, hidden components stay in layout to preserve container flow without distortion
        opacity: isHidden ? 0.45 : 1,
        filter: isHidden ? 'grayscale(0.7)' : 'none',
      }}
    >
      {/* Floating Action Toolbar */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: -34,
            right: 0,
            zIndex: 40,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '6px',
            px: 0.75,
            py: 0.25,
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.35)',
            border: '1px solid #334155',
            maxWidth: '100%',
            overflowX: 'auto',
            animation: 'fadeIn 0.15s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(4px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, mr: 0.5, color: '#93C5FD', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
            {node.type}
          </Typography>

          {isHidden && (
            <Chip
              label="Hidden"
              size="small"
              sx={{
                bgcolor: '#F59E0B20',
                color: '#FBBF24',
                fontSize: '0.625rem',
                fontWeight: 700,
                height: 18,
                mr: 0.5,
              }}
            />
          )}

          <Tooltip title={isHidden ? 'Unhide Component' : 'Hide Component'}>
            <IconButton
              size="small"
              onClick={() => dispatch(toggleComponentVisibility(node.id))}
              sx={{ color: isHidden ? '#FBBF24' : '#FFFFFF', p: 0.4 }}
            >
              {isHidden ? <VisibilityOffIcon sx={{ fontSize: 15 }} /> : <VisibilityIcon sx={{ fontSize: 15 }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Move Up">
            <IconButton
              size="small"
              onClick={() => dispatch(moveComponent({ id: node.id, direction: 'up' }))}
              sx={{ color: '#FFFFFF', p: 0.4 }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Move Down">
            <IconButton
              size="small"
              onClick={() => dispatch(moveComponent({ id: node.id, direction: 'down' }))}
              sx={{ color: '#FFFFFF', p: 0.4 }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Duplicate">
            <IconButton
              size="small"
              onClick={() => dispatch(duplicateComponent(node.id))}
              sx={{ color: '#FFFFFF', p: 0.4 }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => dispatch(removeComponent(node.id))}
              sx={{ color: '#EF4444', p: 0.4 }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Hidden Banner Pill for Quick Context in Edit Mode */}
      {isHidden && !isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Chip
            icon={<VisibilityOffIcon sx={{ fontSize: '13px !important', color: '#64748B' }} />}
            label="Hidden"
            size="small"
            sx={{
              bgcolor: '#F1F5F9',
              color: '#64748B',
              fontSize: '0.6875rem',
              fontWeight: 600,
              height: 22,
              border: '1px solid #CBD5E1',
            }}
          />
        </Box>
      )}

      {/* Render the SDUI Component Content */}
      {renderComponentContent()}
    </Box>
  );
};

export default SDUIRenderer;