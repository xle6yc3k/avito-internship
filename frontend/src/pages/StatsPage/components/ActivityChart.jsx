import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export const ActivityChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="text-center py-10 text-gray-400 bg-white rounded-xl border">Нет данных</div>;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px]">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Активность</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(val) => new Date(val).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Tooltip cursor={{ fill: '#f9fafb' }} />
          <Legend />
          <Bar name="Одобрено" dataKey="approved" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar name="Отклонено" dataKey="rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar name="На доработку" dataKey="requestChanges" fill="#eab308" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};