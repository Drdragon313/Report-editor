import React from 'react';
import { Box } from '@mui/material';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SDUIComponentNode, RechartsSeriesConfig, RechartsComposedProps } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';

interface SDUIRechartsComposedProps {
  node: SDUIComponentNode;
}

export const SDUIRechartsComposed: React.FC<SDUIRechartsComposedProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

  const config = ((node.config || node.props?.config) || {}) as Partial<RechartsComposedProps['config']>;
  const height = isMobile ? Math.min(210, config.height || 210) : (config.height || 240);
  const xAxisKey = config.xAxisKey || 'month';
  const showGrid = config.showGrid !== false;
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend !== false;
  const data = (node.data || node.props?.data || []) as Array<Record<string, unknown>>;
  const series = (node.series || node.props?.series || [
    { type: 'line', dataKey: 'score', name: 'Score', stroke: '#E53935', strokeWidth: 3 },
  ]) as RechartsSeriesConfig[];

  if (!data || data.length === 0) {
    return (
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.8125rem' }}>
        No trend data available
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height, minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748B', fontSize: isMobile ? 10 : 11 }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: '#64748B', fontSize: isMobile ? 10 : 11 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
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
                paddingTop: '6px',
              }}
            />
          )}
          {series.map((s: RechartsSeriesConfig, idx: number) => {
            if (s.type === 'area') {
              return (
                <Area
                  key={idx}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  fill={s.fill || '#3B82F620'}
                  stroke={s.stroke || '#3B82F6'}
                  strokeWidth={s.strokeWidth || 2}
                />
              );
            }
            if (s.type === 'bar') {
              return (
                <Bar
                  key={idx}
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  fill={s.fill || '#1E293B'}
                  radius={[4, 4, 0, 0]}
                />
              );
            }
            return (
              <Line
                key={idx}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                stroke={s.stroke || '#E53935'}
                strokeWidth={s.strokeWidth || 2.5}
                dot={s.dot !== false ? { r: 3.5, strokeWidth: 2, fill: '#FFFFFF' } : false}
                activeDot={{ r: 5 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SDUIRechartsComposed;
