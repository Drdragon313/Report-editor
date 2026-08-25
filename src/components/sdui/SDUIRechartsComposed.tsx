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
import { SDUIComponentNode } from '../../types/sdui';

interface SDUIRechartsComposedProps {
  node: SDUIComponentNode;
}

export const SDUIRechartsComposed: React.FC<SDUIRechartsComposedProps> = ({ node }) => {
  const config = node.config || node.props?.config || {};
  const height = config.height || 240;
  const xAxisKey = config.xAxisKey || 'month';
  const showGrid = config.showGrid !== false;
  const showTooltip = config.showTooltip !== false;
  const showLegend = config.showLegend !== false;
  const data = node.data || node.props?.data || [];
  const series = node.series || node.props?.series || [
    { type: 'line', dataKey: 'score', name: 'Score', stroke: '#E53935', strokeWidth: 3 },
  ];

  if (!data || data.length === 0) {
    return <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>No trend data available</Box>;
  }

  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
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
              itemStyle={{ color: '#FFFFFF' }}
            />
          )}
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
          {series.map((s: any, idx: number) => {
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
                strokeWidth={s.strokeWidth || 3}
                dot={s.dot !== false ? { r: 4, strokeWidth: 2, fill: '#FFFFFF' } : false}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SDUIRechartsComposed;
