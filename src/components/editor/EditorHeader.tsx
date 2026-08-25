import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CodeIcon from '@mui/icons-material/Code';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  toggleEditMode,
  setViewportMode,
  undo,
  redo,
} from '../../store/reportSlice';
import { ViewportMode } from '../../types/editor';

interface EditorHeaderProps {
  onOpenPublish: () => void;
  onOpenReset: () => void;
  onOpenJson: () => void;
  onOpenPalette: () => void;
  onToggleOutline?: () => void;
  onToggleInspector?: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  onOpenPublish,
  onOpenReset,
  onOpenJson,
  onOpenPalette,
  onToggleOutline,
  onToggleInspector,
}) => {
  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector((state) => state.report.isEditMode);
  const isDirty = useAppSelector((state) => state.report.isDirty);
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);
  const canUndo = useAppSelector((state) => state.report.history.past.length > 0);
  const canRedo = useAppSelector((state) => state.report.history.future.length > 0);

  const handleViewportChange = (_: React.MouseEvent<HTMLElement>, nextViewport: ViewportMode | null) => {
    if (nextViewport) {
      dispatch(setViewportMode(nextViewport));
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#0F172A',
        color: '#FFFFFF',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #334155',
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: { xs: '54px !important', sm: '60px !important' },
          px: { xs: 1, sm: 2.5 },
          gap: 1,
        }}
      >
        {/* Left: Brand & Mode Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: 1.5,
                bgcolor: '#E53935',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#FFFFFF',
                fontSize: { xs: '0.8125rem', sm: '0.9375rem' },
              }}
            >
              CR
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                SDUI Report Engine
              </Typography>
              <Typography sx={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
                Live Builder & Renderer
              </Typography>
            </Box>
          </Box>

          <Button
            variant={isEditMode ? 'contained' : 'outlined'}
            size="small"
            onClick={() => dispatch(toggleEditMode())}
            startIcon={isEditMode ? <VisibilityIcon sx={{ fontSize: 16 }} /> : <EditIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: isEditMode ? '#2563EB' : 'transparent',
              color: '#FFFFFF',
              borderColor: '#475569',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              px: { xs: 1, sm: 1.5 },
              minWidth: { xs: 'auto', sm: 100 },
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: isEditMode ? '#1D4ED8' : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {isEditMode ? 'View' : 'Edit'}
          </Button>

          <Chip
            label={isDirty ? 'Unsaved' : 'Saved'}
            size="small"
            sx={{
              bgcolor: isDirty ? '#FB8C0025' : '#10B98125',
              color: isDirty ? '#FBBF24' : '#34D399',
              border: `1px solid ${isDirty ? '#F59E0B' : '#059669'}`,
              fontWeight: 700,
              fontSize: '0.625rem',
              height: 20,
              display: { xs: 'none', xs2: 'inline-flex', sm: 'inline-flex' },
            }}
          />
        </Box>

        {/* Center: Viewport & Undo/Redo (Desktop Only) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          {isEditMode && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: '#1E293B',
                p: 0.4,
                borderRadius: 1.5,
              }}
            >
              <Tooltip title="Undo">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(undo())}
                    disabled={!canUndo}
                    sx={{ color: canUndo ? '#FFFFFF' : '#475569' }}
                  >
                    <UndoIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Redo">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(redo())}
                    disabled={!canRedo}
                    sx={{ color: canRedo ? '#FFFFFF' : '#475569' }}
                  >
                    <RedoIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          )}

          <ToggleButtonGroup
            value={viewportMode}
            exclusive
            onChange={handleViewportChange}
            size="small"
            sx={{
              bgcolor: '#1E293B',
              '& .MuiToggleButton-root': {
                color: '#94A3B8',
                borderColor: '#334155',
                p: '4px 8px',
                '&.Mui-selected': {
                  color: '#FFFFFF',
                  bgcolor: '#334155',
                },
              },
            }}
          >
            <ToggleButton value="desktop">
              <Tooltip title="Desktop View">
                <DesktopWindowsIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="tablet">
              <Tooltip title="Tablet View (768px)">
                <TabletMacIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="mobile">
              <Tooltip title="Mobile View (420px)">
                <SmartphoneIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
          {/* Mobile Drawers Toggle Buttons in Edit Mode */}
          {isEditMode && onToggleOutline && (
            <Tooltip title="Layers / Structure Outline">
              <IconButton
                size="small"
                onClick={onToggleOutline}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: '#93C5FD',
                  bgcolor: '#1E293B',
                  p: 0.7,
                }}
              >
                <LayersIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {isEditMode && onToggleInspector && (
            <Tooltip title="Property Inspector">
              <IconButton
                size="small"
                onClick={onToggleInspector}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: selectedComponentId ? '#60A5FA' : '#94A3B8',
                  bgcolor: selectedComponentId ? '#1E3A8A' : '#1E293B',
                  p: 0.7,
                }}
              >
                <TuneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {isEditMode && (
            <Button
              variant="outlined"
              size="small"
              onClick={onOpenPalette}
              startIcon={<AddCircleOutlineIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: '#93C5FD',
                borderColor: '#3B82F6',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                px: { xs: 1, sm: 1.5 },
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Add Widget
            </Button>
          )}

          <Tooltip title="Raw SDUI JSON Schema">
            <IconButton
              size="small"
              onClick={onOpenJson}
              sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF' }, display: { xs: 'flex', sm: 'none' } }}
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Button
            variant="text"
            size="small"
            onClick={onOpenJson}
            startIcon={<CodeIcon />}
            sx={{
              color: '#94A3B8',
              fontSize: '0.8125rem',
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': { color: '#FFFFFF' },
            }}
          >
            JSON
          </Button>

          {isDirty && (
            <Tooltip title="Reset Draft">
              <IconButton
                size="small"
                onClick={onOpenReset}
                sx={{ color: '#EF4444' }}
              >
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={onOpenPublish}
            disabled={!isDirty}
            startIcon={<CloudUploadIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: isDirty ? '#E53935' : '#334155',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              px: { xs: 1, sm: 1.5 },
              minWidth: { xs: 'auto', sm: 90 },
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: isDirty ? '#C62828' : '#334155',
              },
            }}
          >
            Publish
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default EditorHeader;
