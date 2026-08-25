import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { SDUIComponentNode, RechartsPieProps } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';

interface SDUIRechartsPieProps {
  node: SDUIComponentNode;
}

const DEFAULT_COLORS = ['#E53935', '#10B981', '#3B82F6', '#FB8C00', '#8B5CF6'];

export const SDUIRechartsPie: React.FC<SDUIRechartsPieProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

  const config = ((node.config || node.props?.config) || {}) as Partial<RechartsPieProps['config']>;
  const height = isMobile ? Math.min(210, config.height || 210) : (config.height || 240);
  const innerRadius = isMobile ? Math.min(42, config.innerRadius ?? 42) : (config.innerRadius ?? 55);
  const outerRadius = isMobile ? Math.min(68, config.outerRadius ?? 68) : (config.outerRadius ?? 85);
  const dataKey = config.dataKey || 'value';
  const nameKey = config.nameKey || 'category';
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend !== false;
  const centerText = config.centerText || (node.props?.centerText as string);
  const centerSubtext = config.centerSubtext || (node.props?.centerSubtext as string);
  const data = (node.data || node.props?.data || []) as RechartsPieProps['data'];

  if (!data || data.length === 0) {
    return (
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.8125rem' }}>
        No distribution data
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height, position: 'relative', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '11px',
                padding: '6px 10px',
              }}
              itemStyle={{ color: '#FFFFFF' }}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                fontSize: isMobile ? '10px' : '11px',
                paddingTop: '2px',
              }}
            />
          )}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
          >
            {data.map((entry: { fill?: string; [key: string]: unknown }, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text in Donut */}
      {centerText && innerRadius > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: showLegend ? 'translate(-50%, -66%)' : 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            {centerText}
          </Typography>
          {centerSubtext && (
            <Typography sx={{ fontSize: isMobile ? '0.625rem' : '0.6875rem', color: '#64748B', fontWeight: 600 }}>
              {centerSubtext}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SDUIRechartsPie;
