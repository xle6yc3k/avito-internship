import { api } from './index';

export const statsApi = {
  // сводка
  getSummary: async (params) => {
    const { data } = await api.get('/stats/summary', { params });
    return data;
  },

  getActivity: async (params) => {
    const { data } = await api.get('/stats/chart/activity', { params });
    return data;
  },

  // график активности
  getDecisions: async (params) => {
    const { data } = await api.get('/stats/chart/decisions', { params });
    return data;
  },
  
  // график решений
  getCategories: async (params) => {
    const { data } = await api.get('/stats/chart/categories', { params });
    return data;
  }
};