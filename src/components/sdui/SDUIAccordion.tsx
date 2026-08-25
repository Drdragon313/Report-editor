import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { SDUIComponentNode, AccordionFAQItem } from '../../types/sdui';

interface SDUIAccordionProps {
  node: SDUIComponentNode;
}

export const SDUIAccordion: React.FC<SDUIAccordionProps> = ({ node }) => {
  const title = (node.props?.title as string) || node.title || 'Frequently Asked Questions';
  const items = (node.props?.items as AccordionFAQItem[]) || [];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <HelpOutlineIcon sx={{ color: '#64748B', fontSize: 20 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F172A' }}>
            {title}
          </Typography>
        </Box>
      )}

      {items.map((item, idx) => (
        <Accordion key={item.id || idx} defaultExpanded={idx === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SDUIAccordion;
