import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { badgeLabels } from '@/components/ui/Badge';

export const FilterBar = ({ filters, onFilterChange, onReset }) => {
  // TODO: вынести в конфиг или получать с бэка, но пока так
  const categories = [
    { value: '0', label: 'Электроника' },
    { value: '1', label: 'Недвижимость' },
    { value: '2', label: 'Транспорт' },
    { value: '3', label: 'Работа' },
    { value: '4', label: 'Услуги' },
    { value: '5', label: 'Животные' },
    { value: '6', label: 'Мода' },
    { value: '7', label: 'Детское' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* поиск по названию */}
        <div className="md:col-span-4 relative">
           <Input 
             placeholder="Поиск по названию..." 
             value={filters.search || ''}
             onChange={(e) => onFilterChange('search', e.target.value)}
             className="pl-9"
           />
           <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>

        {/* категория */}
        <div className="md:col-span-2">
          <Select
            placeholder="Все категории"
            options={categories}
            value={filters.categoryId || ''} 
            onChange={(e) => onFilterChange('categoryId', e.target.value)}
          />
        </div>

        {/* цены по инпуту */}
        <div className="md:col-span-2">
           <Input 
             type="number" 
             placeholder="Цена от" 
             value={filters.minPrice || ''}
             onChange={(e) => onFilterChange('minPrice', e.target.value)}
           />
        </div>

        <div className="md:col-span-2">
           <Input 
             type="number" 
             placeholder="Цена до" 
             value={filters.maxPrice || ''}
             onChange={(e) => onFilterChange('maxPrice', e.target.value)}
           />
        </div>
        
        {/* кнопка сброса */}
        <div className="md:col-span-2">
          <Button variant="secondary" onClick={onReset} className="w-full flex items-center justify-center gap-1">
             <X size={16} /> Сбросить
          </Button>
        </div>
      </div>

      {/* статусы - можно выбирать несколько */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
         <span className="text-sm text-gray-500 py-1 flex items-center">Статус:</span>
         {['pending', 'approved', 'rejected', 'draft'].map(status => {
            // парс строки со статусами, тк в юрл они через запятую
            const currentStatuses = filters.status ? filters.status.split(',') : [];
            const isActive = currentStatuses.includes(status);
            
            return (
              <button
                key={status}
                onClick={() => {
                  let newStatuses;
                  if (isActive) {
                    newStatuses = currentStatuses.filter(s => s !== status);
                  } else {
                    newStatuses = [...currentStatuses, status];
                  }
                  onFilterChange('status', newStatuses.join(','));
                }}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                  isActive 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {badgeLabels[status] || status}
              </button>
            )
         })}
      </div>
    </div>
  );
};