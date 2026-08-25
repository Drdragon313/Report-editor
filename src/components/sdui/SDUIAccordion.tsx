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
          <HelpOutlineIcon sx={{ color: '#64748B', fontSize: { xs: 18, sm: 20 } }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#0F172A',
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {items.map((item, idx) => (
        <Accordion
          key={item.id || idx}
          defaultExpanded={idx === 0}
          sx={{
            borderRadius: '10px !important',
            border: '1px solid #E2E8F0',
            mb: 1,
            overflow: 'hidden',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
            sx={{ px: { xs: 1.5, sm: 2 }, py: 0.5, minHeight: 48 }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', sm: '0.875rem' }, color: '#0F172A', lineHeight: 1.3 }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, pt: 0, pb: 2 }}>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SDUIAccordion;
