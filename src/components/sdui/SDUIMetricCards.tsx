import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { SDUIComponentNode, MetricCardStatItem } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

interface SDUIMetricCardsProps {
  node: SDUIComponentNode;
}

export const SDUIMetricCards: React.FC<SDUIMetricCardsProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const title = node.props?.title as string;
  const stats = (node.props?.stats as MetricCardStatItem[]) || [];

  const isMobileViewport = viewportMode === 'mobile';
  const isTabletViewport = viewportMode === 'tablet';

  const gridCols = isMobileViewport
    ? 'repeat(2, minmax(0, 1fr))'
    : isTabletViewport
    ? 'repeat(2, minmax(0, 1fr))'
    : {
        xs: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(2, minmax(0, 1fr))',
        md: `repeat(${Math.min(stats.length || 4, 4)}, minmax(0, 1fr))`,
      };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {title && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#0F172A',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: { xs: 1.25, sm: 2 },
          width: '100%',
        }}
      >
        {stats.map((stat) => {
          const isPos = stat.changeType === 'positive';
          const isNeg = stat.changeType === 'negative';
          const changeColor = isPos ? '#10B981' : isNeg ? '#EF4444' : '#64748B';

          return (
            <Card
              key={stat.id}
              sx={{
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                minWidth: 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: '12px !important', sm: '16px !important' },
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748B',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                      display: 'block',
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: isMobileViewport
                        ? '1.25rem'
                        : { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.15,
                      my: 0.5,
                      wordBreak: 'break-word',
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  {stat.change && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                      {isPos && <TrendingUpIcon sx={{ fontSize: 14, color: changeColor }} />}
                      {isNeg && <TrendingDownIcon sx={{ fontSize: 14, color: changeColor }} />}
                      {!isPos && !isNeg && <RemoveIcon sx={{ fontSize: 14, color: changeColor }} />}
                      <Typography
                        sx={{
                          fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                          fontWeight: 700,
                          color: changeColor,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {stat.change}
                      </Typography>
                    </Box>
                  )}
                  {stat.subtext && (
                    <Typography
                      sx={{
                        fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                        color: '#94A3B8',
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.subtext}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default SDUIMetricCards;
