import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { COMPONENT_TEMPLATES } from '../../data/componentTemplates';
import { ComponentTemplate } from '../../types/editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComponent } from '../../store/reportSlice';

interface ComponentPaletteModalProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = ['All', 'Layout', 'Metrics & Data', 'Charts', 'Content', 'Actions'];

export const ComponentPaletteModal: React.FC<ComponentPaletteModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const selectedComponentId = useAppSelector((state) => state.report.selectedComponentId);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = COMPONENT_TEMPLATES.filter((tpl) =>
    activeCategory === 'All' ? true : tpl.category === activeCategory
  );

  const handleSelectTemplate = (template: ComponentTemplate) => {
    const newNode = template.defaultNode();
    dispatch(
      addComponent({
        parentId: selectedComponentId,
        component: newNode,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddCircleOutlineIcon color="primary" />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Add Component to Report
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3, borderBottom: '1px solid #E2E8F0' }}>
        <Tabs
          value={activeCategory}
          onChange={(_, val) => setActiveCategory(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {CATEGORIES.map((cat) => (
            <Tab key={cat} label={cat} value={cat} sx={{ fontWeight: 600, fontSize: '0.8125rem' }} />
          ))}
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {selectedComponentId && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #BFDBFE' }}>
            <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 600 }}>
              Destination: Inserting as child of selected container <strong>{selectedComponentId}</strong> (or root if not a container).
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {filteredTemplates.map((template) => (
            <Card
              key={template.type + template.label}
              sx={{
                border: '1px solid #E2E8F0',
                borderRadius: 2.5,
                transition: 'all 0.15s ease',
                '&:hover': {
                  borderColor: '#3B82F6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                },
              }}
            >
              <CardActionArea onClick={() => handleSelectTemplate(template)} sx={{ height: '100%', p: 2 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {template.label}
                    </Typography>
                    <Chip label={template.category} size="small" sx={{ fontSize: '0.625rem', height: 20 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.75rem', lineHeight: 1.4 }}>
                    {template.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentPaletteModal;
