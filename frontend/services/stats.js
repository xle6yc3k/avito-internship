import { api } from './index';

export const statsApi = {
  // сводка
  getSummary: async (period = 'week') => {
    const { data } = await api.get('/stats/summary', { params: { period } });
    return data;
  },

  // график активности
  getActivity: async (period = 'week') => {
    const { data } = await api.get('/stats/chart/activity', { params: { period } });
    return data;
  },

  // график решений
  getDecisions: async (period = 'week') => {
    const { data } = await api.get('/stats/chart/decisions', { params: { period } });
    return data;
  }
};