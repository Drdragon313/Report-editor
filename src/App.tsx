import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
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

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const draftReport = useAppSelector((state) => state.report.draftReport);
  const isEditMode = useAppSelector((state) => state.report.isEditMode);

  const [openPublish, setOpenPublish] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openJson, setOpenJson] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);

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
      />

      {/* Main Workspace Layout */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Structure Outline Sidebar (Active in Edit Mode) */}
        {isEditMode && <ComponentOutlineTree onOpenPalette={() => setOpenPalette(true)} />}

        {/* Center Live Canvas & Preview */}
        <Box
          onClick={handleCanvasBackgroundClick}
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
        >
          <CanvasWrapper>
            {/* Report Top Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, pb: 1 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <ShieldOutlinedIcon sx={{ color: '#E53935', fontSize: 24 }} />
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E53935' }}>
                    CONFIDENTIAL CREDIT HEALTH DOSSIER
                  </Typography>
                </Box>

                <Typography variant="h1" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
                  {draftReport.title}
                </Typography>

                <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
                  {draftReport.subtitle || `Report ID: ${draftReport.report_id} • Version ${draftReport.version}`}
                </Typography>
              </Box>

              {isEditMode && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    const newTitle = prompt('Edit Report Title:', draftReport.title);
                    if (newTitle !== null) {
                      dispatch(updateReportMeta({ title: newTitle }));
                    }
                  }}
                  sx={{ color: '#475569', borderColor: '#CBD5E1' }}
                >
                  Edit Header
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* Dynamic SDUI Content Nodes */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {draftReport.content.map((node) => (
                <SDUIRenderer key={node.id} node={node} />
              ))}
            </Box>

            {/* Report Footer */}
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5 }}>
                VantageScore 3.0 is a registered trademark of VantageScore Solutions, LLC. Credit data provided for informational purposes.
              </Typography>
              <Typography variant="caption" sx={{ color: '#CBD5E1' }}>
                Server-Driven UI Dynamic Report Builder • Powered by React, TypeScript, Redux Toolkit & MUI
              </Typography>
            </Box>
          </CanvasWrapper>
        </Box>

        {/* Right Property Inspector Drawer (Active in Edit Mode) */}
        {isEditMode && <PropertyInspector />}
      </Box>

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
