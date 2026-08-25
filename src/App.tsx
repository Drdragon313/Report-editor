import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Drawer,
  useTheme,
  useMediaQuery,
  Fab,
  Badge,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { updateReportMeta, selectComponent } from './store/reportSlice';
import { SDUIRenderer } from './components/sdui/SDUIRenderer';
import EditorHeader from './components/editor/EditorHeader';
import CanvasWrapper from './components/editor/CanvasWrapper';
import ComponentOutlineTree from './components/editor/ComponentOutlineTree';
import PropertyInspector from './components/editor/PropertyInspector';
import ComponentPaletteModal from './components/editor/ComponentPaletteModal';
import RawJsonModal from './components/editor/RawJsonModal';
import PublishModal from './components/common/PublishModal';
import ResetConfirmModal from './components/common/ResetConfirmModal';
import NotificationSnackbar from './components/common/NotificationSnackbar';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const draftReport = useAppSelector((state) => state.report.draftReport);
  const isEditMode = useAppSelector((state) => state.report.isEditMode);
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);

  const [openPublish, setOpenPublish] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openJson, setOpenJson] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);
  const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  const handleCanvasBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isEditMode) {
      dispatch(selectComponent(null));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Top Application Bar */}
      <EditorHeader
        onOpenPublish={() => setOpenPublish(true)}
        onOpenReset={() => setOpenReset(true)}
        onOpenJson={() => setOpenJson(true)}
        onOpenPalette={() => setOpenPalette(true)}
        onToggleOutline={() => setMobileOutlineOpen(true)}
        onToggleInspector={() => setMobileInspectorOpen(true)}
      />

      {/* Main Workspace Layout */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Structure Outline Sidebar (Desktop Only) */}
        {isEditMode && !isMobileScreen && (
          <ComponentOutlineTree onOpenPalette={() => setOpenPalette(true)} />
        )}

        {/* Center Live Canvas & Preview */}
        <Box
          onClick={handleCanvasBackgroundClick}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <CanvasWrapper>
            {/* Report Top Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.5, pb: 0.5 }}>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <ShieldOutlinedIcon sx={{ color: '#E53935', fontSize: { xs: 18, sm: 22 } }} />
                  <Typography
                    sx={{
                      fontSize: { xs: '0.6875rem', sm: '0.8125rem' },
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#E53935',
                    }}
                  >
                    CONFIDENTIAL CREDIT HEALTH DOSSIER
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '1.375rem', sm: '1.75rem', md: '2.125rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {draftReport.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    mt: 0.5,
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  }}
                >
                  {draftReport.subtitle || `Report ID: ${draftReport.report_id} • Version ${draftReport.version}`}
                </Typography>
              </Box>

              {isEditMode && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon sx={{ fontSize: 15 }} />}
                  onClick={() => {
                    const newTitle = prompt('Edit Report Title:', draftReport.title);
                    if (newTitle !== null) {
                      dispatch(updateReportMeta({ title: newTitle }));
                    }
                  }}
                  sx={{
                    color: '#475569',
                    borderColor: '#CBD5E1',
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                    py: 0.4,
                  }}
                >
                  Edit Header
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* Dynamic SDUI Content Nodes */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
              {draftReport.content.map((node) => (
                <SDUIRenderer key={node.id} node={node} />
              ))}
            </Box>

            {/* Report Footer */}
            <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5, fontSize: { xs: '0.6875rem', sm: '0.75rem' } }}>
                VantageScore 3.0 is a registered trademark of VantageScore Solutions, LLC. Credit data provided for informational purposes.
              </Typography>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontSize: { xs: '0.625rem', sm: '0.6875rem' } }}>
                Server-Driven UI Dynamic Report Builder • Powered by React, TypeScript, Redux Toolkit & MUI
              </Typography>
            </Box>
          </CanvasWrapper>

          {/* Floating Mobile Action Buttons in Edit Mode */}
          {isEditMode && isMobileScreen && (
            <Box
              sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                zIndex: 1100,
              }}
            >
              <Fab
                size="small"
                sx={{
                  bgcolor: '#0F172A',
                  color: '#93C5FD',
                  boxShadow: '0 4px 14px rgba(15,23,42,0.35)',
                  '&:hover': { bgcolor: '#1E293B' },
                }}
                onClick={() => setMobileOutlineOpen(true)}
              >
                <LayersIcon fontSize="small" />
              </Fab>

              <Fab
                size="medium"
                color="primary"
                sx={{
                  boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                }}
                onClick={() => setOpenPalette(true)}
              >
                <AddIcon />
              </Fab>

              <Badge
                color="error"
                variant="dot"
                invisible={!selectedComponentId}
              >
                <Fab
                  size="small"
                  sx={{
                    bgcolor: selectedComponentId ? '#2563EB' : '#0F172A',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 14px rgba(15,23,42,0.35)',
                    '&:hover': { bgcolor: selectedComponentId ? '#1D4ED8' : '#1E293B' },
                  }}
                  onClick={() => setMobileInspectorOpen(true)}
                >
                  <TuneIcon fontSize="small" />
                </Fab>
              </Badge>
            </Box>
          )}
        </Box>

        {/* Right Property Inspector Sidebar (Desktop Only) */}
        {isEditMode && !isMobileScreen && <PropertyInspector />}
      </Box>

      {/* Mobile Drawers for Outline & Inspector */}
      {isMobileScreen && (
        <>
          <Drawer
            anchor="left"
            open={mobileOutlineOpen}
            onClose={() => setMobileOutlineOpen(false)}
            PaperProps={{ sx: { maxWidth: '85vw', width: 320 } }}
          >
            <ComponentOutlineTree
              onOpenPalette={() => {
                setMobileOutlineOpen(false);
                setOpenPalette(true);
              }}
              onClose={() => setMobileOutlineOpen(false)}
            />
          </Drawer>

          <Drawer
            anchor="right"
            open={mobileInspectorOpen}
            onClose={() => setMobileInspectorOpen(false)}
            PaperProps={{ sx: { maxWidth: '90vw', width: 340 } }}
          >
            <PropertyInspector onClose={() => setMobileInspectorOpen(false)} />
          </Drawer>
        </>
      )}

      {/* Dialogs and Modals */}
      <PublishModal open={openPublish} onClose={() => setOpenPublish(false)} />
      <ResetConfirmModal open={openReset} onClose={() => setOpenReset(false)} />
      <RawJsonModal open={openJson} onClose={() => setOpenJson(false)} />
      <ComponentPaletteModal open={openPalette} onClose={() => setOpenPalette(false)} />

      {/* Global Notifications */}
      <NotificationSnackbar />
    </Box>
  );
};

export default App;
