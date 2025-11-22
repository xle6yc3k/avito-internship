import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { User, LayoutGrid, BarChart2, Loader2 } from 'lucide-react'; 
import { moderatorsApi } from '@services/moderators';

export const Layout = () => {
  // загружаем данные текущего пользователя
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: moderatorsApi.getMe,
    staleTime: 1000 * 60 * 60, // кеш на час, не нужно часто обновлять
  });

  // стили для активной/неактивной ссылки
  const getLinkClass = ({ isActive }) => 
    `px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-50'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           {/* лого */}
           <NavLink to="/list" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">A</div>
              Moderation
           </NavLink>

           {/* навигация */}
           <nav className="flex gap-2">
              <NavLink to="/list" className={getLinkClass}>
                <LayoutGrid size={18} />
                Объявления
              </NavLink>
              <NavLink to="/stats" className={getLinkClass}>
                <BarChart2 size={18} />
                Статистика
              </NavLink>
           </nav>

           {/* профиль пользователя */}
           <div className="flex items-center gap-3">
              {isLoading ? (
                // скелетон при загрузке
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="space-y-1 text-right">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                </div>
              ) : isError ? (
                <div className="text-xs text-red-500">Ошибка загрузки</div>
              ) : (
                <>
                  <div className="text-sm text-right hidden sm:block">
                     <div className="font-medium">{user?.name || 'Модератор'}</div>
                     <div className="text-xs text-gray-500">{user?.email || 'user@avito.ru'}</div>
                  </div>
                  {/* аватар с первой буквой имени */}
                  <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border border-blue-200 font-bold">
                     {user?.name ? user.name[0].toUpperCase() : <User size={18} />}
                  </div>
                </>
              )}
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};