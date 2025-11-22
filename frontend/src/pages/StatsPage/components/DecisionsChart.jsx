import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  approved: '#22c55e',
  rejected: '#ef4444',
  requestChanges: '#eab308',
};

const LABELS = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'На доработку',
};

export const DecisionsChart = ({ data }) => {
  const chartData = data ? Object.entries(data).map(([key, value]) => ({
    name: LABELS[key] || key,
    value,
    color: COLORS[key] || '#94a3b8',
  })) : [];

  if (chartData.every(d => d.value === 0)) return <div className="text-center py-10 text-gray-400 bg-white rounded-xl border">Нет решений</div>;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px]">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Решения</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};