import React from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { SDUIComponentNode, ActionCardProps } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SDUIActionCardProps {
  node: SDUIComponentNode;
}

export const SDUIActionCard: React.FC<SDUIActionCardProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

  const props = ((node.props || {}) as unknown) as ActionCardProps;
  const badge = props.badge || 'RECOMMENDED ACTION';
  const title = props.title || node.title || 'Next Best Action';
  const description = props.description || node.subtitle || '';
  const features = props.features || [];
  const ctaText = props.ctaText || 'Get Started';
  const secondaryCtaText = props.secondaryCtaText;
  const highlightColor = props.highlightColor || '#E53935';

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 3,
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        p: { xs: 2, sm: 2.5, md: 3 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: highlightColor,
        },
      }}
    >
      <Box>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              bgcolor: `${highlightColor}15`,
              color: highlightColor,
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.04em',
              mb: 1.25,
              border: `1px solid ${highlightColor}30`,
              height: 22,
            }}
          />
        )}

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#0F172A',
            mb: 1,
            fontSize: { xs: '1.0625rem', sm: '1.25rem' },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              lineHeight: 1.55,
              mb: 2,
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            {description}
          </Typography>
        )}

        {features.length > 0 && (
          <Stack spacing={0.8} sx={{ mb: 2.5 }}>
            {features.map((feat, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981', mt: 0.2, flexShrink: 0 }} />
                <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, color: '#334155', lineHeight: 1.4 }}>
                  {feat}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: isMobile ? 'column' : { xs: 'column', sm: 'row' },
          gap: 1,
          pt: 1,
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: highlightColor,
            color: '#FFFFFF',
            fontWeight: 700,
            width: isMobile ? '100%' : { xs: '100%', sm: 'auto' },
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: highlightColor,
              filter: 'brightness(0.9)',
            },
          }}
        >
          {ctaText}
        </Button>
        {secondaryCtaText && (
          <Button
            variant="outlined"
            sx={{
              color: '#475569',
              borderColor: '#CBD5E1',
              width: isMobile ? '100%' : { xs: '100%', sm: 'auto' },
              whiteSpace: 'nowrap',
            }}
          >
            {secondaryCtaText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SDUIActionCard;
