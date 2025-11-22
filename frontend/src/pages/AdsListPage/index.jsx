import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adsApi } from '@/services/ads';
import { Loader2, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { FilterBar } from './components/FilterBar';
import { AdCard } from './components/AdCard';

const AdsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // берем все фильтры из юрл
  const filters = Object.fromEntries(searchParams.entries());
  const page = parseInt(filters.page) || 1;

  // загружаем объявления с учетом фильтров
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['ads', filters],
    queryFn: () => adsApi.getAll({ 
      limit: 10,
      ...filters 
    }),
    keepPreviousData: true 
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // при изменении фильтра сброс на первую страницу
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const setPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
    // скрол наверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex justify-between items-end">
        <h1 className="text-2xl font-bold text-gray-900">Объявления</h1>
        <span className="text-sm text-gray-500">
          Всего: {data?.pagination?.totalItems || 0}
        </span>
      </div>

      <FilterBar 
        filters={filters} 
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {isLoading ? (
         <div className="flex justify-center py-20">
           <Loader2 className="animate-spin text-blue-600" size={40} />
         </div>
      ) : isError ? (
         <div className="text-center py-20 text-red-500">
           Ошибка загрузки данных. 
           <Button variant="outline" onClick={() => refetch()} className="ml-2">Повторить</Button>
         </div>
      ) : data?.ads?.length === 0 ? (
         // пустой список
         <div className="text-center py-20 text-gray-400 flex flex-col items-center">
           <Inbox size={48} className="mb-4 opacity-50"/>
           <p>Объявления не найдены</p>
           <Button variant="link" onClick={resetFilters} className="mt-2">Сбросить фильтры</Button>
         </div>
      ) : (
         <>
           {/* сетка карточек */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
             {data.ads.map(ad => (
               <AdCard key={ad.id} ad={ad} />
             ))}
           </div>

           {/* пагинация */}
           {data.pagination.totalPages > 1 && (
             <div className="flex justify-center gap-2">
               <Button 
                 variant="secondary" 
                 disabled={page === 1}
                 onClick={() => setPage(page - 1)}
               >
                 Назад
               </Button>
               <span className="flex items-center px-4 text-sm font-medium text-gray-600 bg-white rounded border">
                 Страница {page} из {data.pagination.totalPages}
               </span>
               <Button 
                 variant="secondary" 
                 disabled={page === data.pagination.totalPages}
                 onClick={() => setPage(page + 1)}
               >
                 Вперед
               </Button>
             </div>
           )}
         </>
      )}
    </div>
  );
};

export default AdsListPage;