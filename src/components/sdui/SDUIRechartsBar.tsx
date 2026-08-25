import React from 'react';
import { Box } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SDUIComponentNode, RechartsBarProps } from '../../types/sdui';
import { useAppSelector } from '../../store/hooks';

interface SDUIRechartsBarProps {
  node: SDUIComponentNode;
}

export const SDUIRechartsBar: React.FC<SDUIRechartsBarProps> = ({ node }) => {
  const viewportMode = useAppSelector((state) => state.report.viewportMode);
  const isMobile = viewportMode === 'mobile';

  const config = ((node.config || node.props?.config) || {}) as Partial<RechartsBarProps['config']>;
  const height = isMobile ? Math.min(200, config.height || 200) : (config.height || 220);
  const xAxisKey = config.xAxisKey || 'category';
  const showGrid = config.showGrid !== false;
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend === true;
  const data = (node.data || node.props?.data || []) as Array<Record<string, unknown>>;
  const series = (node.series || node.props?.series || [
    { dataKey: 'balance', name: 'Balance', fill: '#1E293B' },
  ]) as RechartsBarProps['series'];

  if (!data || data.length === 0) {
    return (
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.8125rem' }}>
        No bar chart data
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height, minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: isMobile ? 8 : 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748B', fontSize: isMobile ? 10 : 11 }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={false}
            interval={0}
          />
          <YAxis
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
              formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Balance']}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                fontSize: isMobile ? '10px' : '11px',
                paddingTop: '4px',
              }}
            />
          )}
          {series.map((s: { dataKey: string; name?: string; fill?: string }, idx: number) => (
            <Bar
              key={idx}
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              fill={s.fill || '#1E293B'}
              radius={[4, 4, 0, 0]}
              maxBarSize={isMobile ? 32 : 48}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SDUIRechartsBar;
