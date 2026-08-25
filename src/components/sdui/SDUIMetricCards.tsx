import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { SDUIComponentNode, MetricCardStatItem } from '../../types/sdui';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

interface SDUIMetricCardsProps {
  node: SDUIComponentNode;
}

export const SDUIMetricCards: React.FC<SDUIMetricCardsProps> = ({ node }) => {
  const title = node.props?.title as string;
  const stats = (node.props?.stats as MetricCardStatItem[]) || [];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {title && (
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F172A' }}>
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: `repeat(${Math.min(stats.length || 4, 4)}, 1fr)`,
          },
          gap: 2,
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
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                },
              }}
            >
              <CardContent sx={{ p: '16px !important' }}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {stat.label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.2,
                    my: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {stat.change && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {isPos && <TrendingUpIcon sx={{ fontSize: 16, color: changeColor }} />}
                      {isNeg && <TrendingDownIcon sx={{ fontSize: 16, color: changeColor }} />}
                      {!isPos && !isNeg && <RemoveIcon sx={{ fontSize: 16, color: changeColor }} />}
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: changeColor }}>
                        {stat.change}
                      </Typography>
                    </Box>
                  )}
                  {stat.subtext && (
                    <Typography sx={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
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
