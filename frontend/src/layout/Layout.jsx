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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden w-full">
          <header className="bg-white border-b sticky top-0 z-40 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
               {/* лого */}
               <NavLink to="/list" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-80 transition shrink-0">
                <img 
                    src="/avito.svg" 
                    alt="Logo" 
                    className="w-8 h-8 object-contain" 
                />
                <span className="hidden sm:block">Модерация</span>
               </NavLink>
    
               {/* навбар */}
               <nav className="flex gap-1 mx-2 overflow-x-auto">
                  <NavLink to="/list" className={getLinkClass}>
                    <LayoutGrid size={18} className="shrink-0" />
                    <span className="hidden md:block">Объявления</span>
                  </NavLink>
                  <NavLink to="/stats" className={getLinkClass}>
                    <BarChart2 size={18} className="shrink-0" />
                    <span className="hidden md:block">Статистика</span>
                  </NavLink>
               </nav>
    
               {/* профиль */}
               <div className="flex items-center gap-3 shrink-0">
                  {isLoading ? (
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  ) : isError ? (
                    <div className="w-8 h-8 bg-red-100 rounded-full"></div>
                  ) : (
                    <>
                      <div className="text-sm text-right hidden sm:block">
                         <div className="font-medium truncate max-w-[150px]">{user?.name || 'Модератор'}</div>
                         <div className="text-xs text-gray-500 truncate max-w-[150px]">{user?.email}</div>
                      </div>
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border border-blue-200 font-bold text-sm">
                         {user?.name ? user.name[0].toUpperCase() : <User size={16} />}
                      </div>
                    </>
                  )}
               </div>
            </div>
          </header>
    
          <main className="max-w-7xl mx-auto px-4 py-6 w-full">
            <Outlet />
          </main>
        </div>
    );
};