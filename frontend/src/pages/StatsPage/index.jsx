import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/services/stats';
import { Loader2, CheckCircle, XCircle, Clock, BarChart2, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';

import { StatCard } from './components/StatCard';
import { ActivityChart } from './components/ActivityChart';
import { CategoriesChart } from './components/CategoriesChart';
import { DecisionsChart } from './components/DecisionsChart';

const PERIODS = [
  { label: 'Сегодня', value: 'today' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Выбрать даты', value: 'custom' },
];

const StatsPage = () => {
  const [period, setPeriod] = useState('week');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const queryParams = {
    period,
    // даты только если выбран кастомный режим и даты заполнены
    ...(period === 'custom' && dateFrom && { startDate: dateFrom }),
    ...(period === 'custom' && dateTo && { endDate: dateTo }),
  };

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['stats', 'categories', period, dateFrom, dateTo],
    queryFn: () => statsApi.getCategories(queryParams),
  });

  const queryKey = ['stats', period, dateFrom, dateTo];

  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: [...queryKey, 'summary'],
    queryFn: () => statsApi.getSummary(queryParams),
  });

  const { data: activity, isLoading: isActivityLoading } = useQuery({
    queryKey: [...queryKey, 'activity'],
    queryFn: () => statsApi.getActivity(queryParams),
  });

  const { data: decisions, isLoading: isDecisionsLoading } = useQuery({
    queryKey: [...queryKey, 'decisions'],
    queryFn: () => statsApi.getDecisions(queryParams),
  });

  const isLoading = isSummaryLoading || isActivityLoading || isDecisionsLoading || isCategoriesLoading;

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Статистика</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
          {/* выбор дат */}
          {period === 'custom' && (
            <div className="flex items-center gap-2 animate-fade-in">
              <Input 
                type="date" 
                value={dateFrom} 
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-40"
              />
              <span className="text-gray-400">—</span>
              <Input 
                type="date" 
                value={dateTo} 
                onChange={(e) => setDateTo(e.target.value)} 
                className="w-40"
              />
            </div>
          )}

          {/* перекл пресетов */}
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap
                  ${period === p.value 
                    ? 'bg-gray-900 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
         <div className="flex justify-center py-40">
           <Loader2 className="animate-spin text-blue-600" size={40} />
         </div>
      ) : (
        <>
          {/* kpi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Всего проверено" 
              value={summary?.totalReviewed || 0} 
              icon={BarChart2} 
              color="blue"
            />
            <StatCard 
              title="Одобрено" 
              value={`${Math.round(summary?.approvedPercentage || 0)}%`} 
              icon={CheckCircle} 
              color="green"
            />
            <StatCard 
              title="Отклонено" 
              value={`${Math.round(summary?.rejectedPercentage || 0)}%`} 
              icon={XCircle} 
              color="red"
            />
            <StatCard 
              title="Ср. время проверки" 
              value={`${Math.floor((summary?.averageReviewTime || 0) / 1000)} сек`} 
              icon={Clock} 
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityChart data={activity} />
            <DecisionsChart data={decisions} />
            <div className="lg:col-span-2">
                <CategoriesChart data={categories} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;