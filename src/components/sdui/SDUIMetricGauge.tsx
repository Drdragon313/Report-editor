import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { SDUIComponentNode } from '../../types/sdui';
import { getScoreTier } from '../../utils/colorUtils';
import { scoreTiers } from '../../theme/palette';
import { useAppSelector } from '../../store/hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SDUIMetricGaugeProps {
  node: SDUIComponentNode;
}

export const SDUIMetricGauge: React.FC<SDUIMetricGaugeProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const value = node.value ?? (node.props?.value as number) ?? 327;
  const min = node.min ?? (node.props?.min as number) ?? 0;
  const max = node.max ?? (node.props?.max as number) ?? 1000;
  const title = node.title || (node.props?.title as string) || 'Credit Score';
  const subtitle = node.subtitle || (node.props?.subtitle as string);
  const bulletPoints = (node.props?.bullet_points as string[]) || [];

  const tierInfo = getScoreTier(value);
  const statusText = node.status_text || (node.props?.status_text as string) || tierInfo.label;
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const clampedPercent = Math.min(90, Math.max(10, percent));

  const tiers = [
    { label: scoreTiers.needsWork.label, range: '0 - 560', color: scoreTiers.needsWork.main, flex: 560 },
    { label: scoreTiers.fair.label, range: '561 - 720', color: scoreTiers.fair.main, flex: 160 },
    { label: scoreTiers.good.label, range: '721 - 880', color: scoreTiers.good.main, flex: 160 },
    { label: scoreTiers.excellent.label, range: '881 - 1000', color: scoreTiers.excellent.main, flex: 120 },
  ];

  const isMobile = viewportMode === 'mobile';

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
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
        <Chip
          label={statusText}
          size="small"
          sx={{
            bgcolor: `${tierInfo.color}15`,
            color: tierInfo.color,
            fontWeight: 700,
            fontSize: '0.75rem',
            border: `1px solid ${tierInfo.color}40`,
            px: 0.5,
          }}
        />
      </Box>

      {/* Main Score & Tiers */}
      <Box
        sx={{
          bgcolor: '#F8FAFC',
          p: { xs: 1.5, sm: 2.5, md: 3 },
          borderRadius: 3,
          border: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
          <Typography
            sx={{
              fontSize: isMobile ? '2.75rem' : { xs: '2.5rem', sm: '3.25rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: tierInfo.color,
            }}
          >
            {value}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 600, color: '#94A3B8' }}>
            / {max}
          </Typography>
        </Box>

        {/* Multi-tier Bar with Needle Indicator */}
        <Box sx={{ position: 'relative', pt: 1, pb: 3.5 }}>
          <Box
            sx={{
              height: 12,
              borderRadius: 6,
              display: 'flex',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {tiers.map((t, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: t.flex,
                  bgcolor: t.color,
                  borderRight: idx < tiers.length - 1 ? '2px solid #FFFFFF' : 'none',
                }}
              />
            ))}
          </Box>

          {/* Marker Needle */}
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              left: `${clampedPercent}%`,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `7px solid ${tierInfo.color}`,
              }}
            />
            <Box
              sx={{
                bgcolor: tierInfo.color,
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 800,
                px: 0.6,
                py: 0.15,
                borderRadius: 1,
                mt: 0.3,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }}
            >
              {value} pts
            </Box>
          </Box>

          {/* Tier Labels below bar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              gap: 0.5,
            }}
          >
            {tiers.map((t, idx) => (
              <Box key={idx} sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.5625rem', sm: '0.6875rem' },
                    fontWeight: 700,
                    color: t.color,
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                  }}
                >
                  {t.label}
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.5rem', sm: '0.625rem' }, color: '#94A3B8', mt: 0.2 }}>
                  {t.range}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Action Bullet Points */}
        {bulletPoints.length > 0 && (
          <Stack spacing={1} sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed #CBD5E1' }}>
            {bulletPoints.map((point, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 16, color: tierInfo.color, mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#334155', fontSize: { xs: '0.75rem', sm: '0.8125rem' }, lineHeight: 1.5 }}>
                  {point}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SDUIMetricGauge;
