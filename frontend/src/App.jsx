import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './layout/Layout';
import AdsListPage from './pages/AdsListPage';

// ВРЕМЕННЫЕ ЗАГЛУШКИ
const AdDetailsPage = () => (
  <div className="text-center py-20">
    <h2 className="text-2xl font-bold text-gray-700">📦 Детальная страница</h2>
  </div>
);

const StatsPage = () => (
  <div className="text-center py-20">
    <h2 className="text-2xl font-bold text-gray-700">📊 Статистика</h2>
  </div>
);

// Настройка React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/list" replace />} />
            
            <Route path="list" element={<AdsListPage />} />
            <Route path="item/:id" element={<AdDetailsPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;