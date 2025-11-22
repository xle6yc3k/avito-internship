import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/layout/Layout';
import AdsListPage from '@pages/AdsListPage';
import AdDetailsPage from '@pages/AdDetailsPage';
import StatsPage from '@pages/StatsPage';

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