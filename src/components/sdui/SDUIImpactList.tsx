import React, { useState } from 'react';
import { Box, Typography, Chip, Collapse, IconButton } from '@mui/material';
import { SDUIComponentNode, ImpactFactorItem } from '../../types/sdui';
import { getImpactLevelColor } from '../../utils/colorUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface SDUIImpactListProps {
  node: SDUIComponentNode;
}

export const SDUIImpactList: React.FC<SDUIImpactListProps> = ({ node }) => {
  const title = (node.props?.title as string) || node.title || 'Score Impact Factors';
  const subtitle = (node.props?.subtitle as string) || node.subtitle;
  const items = (node.props?.items as ImpactFactorItem[]) || [];

  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#0F172A',
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {items.map((item) => {
          const isExpanded = expandedId === item.id;
          const levelColor = getImpactLevelColor(item.impactLevel);

          return (
            <Box
              key={item.id}
              sx={{
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                bgcolor: isExpanded ? '#F8FAFC' : '#FFFFFF',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Row Header */}
              <Box
                onClick={() => toggleExpand(item.id)}
                sx={{
                  p: { xs: 1.25, sm: 1.75 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F1F5F9' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      bgcolor: item.statusColor || levelColor,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#0F172A',
                        lineHeight: 1.25,
                        fontSize: { xs: '0.8125rem', sm: '0.9375rem' },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', fontSize: { xs: '0.6875rem', sm: '0.75rem' } }}>
                      {item.statusText}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                  <Chip
                    label={`${item.impactLevel}`}
                    size="small"
                    sx={{
                      bgcolor: `${levelColor}15`,
                      color: levelColor,
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      height: 22,
                      border: `1px solid ${levelColor}40`,
                    }}
                  />
                  <IconButton size="small" sx={{ color: '#64748B', p: 0.3 }}>
                    {isExpanded ? <ExpandLessIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                </Box>
              </Box>

              {/* Expandable Details */}
              <Collapse in={isExpanded}>
                <Box sx={{ p: { xs: 1.25, sm: 1.75 }, pt: 0, borderTop: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
                  <Box sx={{ mt: 1.25, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    {item.impactLevel === 'High' ? (
                      <WarningAmberIcon sx={{ fontSize: 18, color: '#E53935', mt: 0.2, flexShrink: 0 }} />
                    ) : item.impactLevel === 'Medium' ? (
                      <InfoOutlinedIcon sx={{ fontSize: 18, color: '#FB8C00', mt: 0.2, flexShrink: 0 }} />
                    ) : (
                      <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#00897B', mt: 0.2, flexShrink: 0 }} />
                    )}
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.55, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
                      {item.description}
                    </Typography>
                  </Box>
                  {item.metric && (
                    <Box sx={{ mt: 1.25, p: 1, bgcolor: '#F8FAFC', borderRadius: 1.5, border: '1px solid #E2E8F0' }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '0.6875rem' }}>
                        CURRENT STATUS: <span style={{ color: '#0F172A', fontWeight: 700 }}>{item.metric}</span>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SDUIImpactList;
