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
import { SDUIComponentNode } from '../../types/sdui';

interface SDUIRechartsBarProps {
  node: SDUIComponentNode;
}

export const SDUIRechartsBar: React.FC<SDUIRechartsBarProps> = ({ node }) => {
  const config = node.config || node.props?.config || {};
  const height = config.height || 220;
  const xAxisKey = config.xAxisKey || 'category';
  const showGrid = config.showGrid !== false;
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend === true;
  const data = node.data || node.props?.data || [];
  const series = node.series || node.props?.series || [
    { dataKey: 'balance', name: 'Balance', fill: '#1E293B' },
  ];

  if (!data || data.length === 0) {
    return <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>No bar chart data</Box>;
  }

  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Balance']}
            />
          )}
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '4px' }} />}
          {series.map((s: any, idx: number) => (
            <Bar
              key={idx}
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              fill={s.fill || '#1E293B'}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SDUIRechartsBar;
