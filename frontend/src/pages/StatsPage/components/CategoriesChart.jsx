import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CATEGORY_LABELS } from '@/shared/constants';

export const CategoriesChart = ({ data }) => {
  const chartData = data ? Object.entries(data).map(([id, value]) => ({
    name: CATEGORY_LABELS[id] || `${id}`,
    value,
  })) : [];

  chartData.sort((a, b) => b.value - a.value);

  if (!chartData.length || chartData.every(d => d.value === 0)) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px] flex items-center justify-center text-gray-400">
        Нет данных по категориям
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6 shrink-0">Объявления по категориям</h3>
      
      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            layout="vertical" 
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100} 
              tick={{ fill: '#4b5563', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};