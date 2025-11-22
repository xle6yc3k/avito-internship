import { api } from './index';

export const adsApi = {
  // список (+фильтры)
  getAll: async (params) => {
    const { data } = await api.get('/ads', { params });
    return data;
  },

  // по id
  getById: async (id) => {
    const { data } = await api.get(`/ads/${id}`);
    return data;
  },

  // одобрить
  approve: async (id) => {
    const { data } = await api.post(`/ads/${id}/approve`);
    return data;
  },

  // отклонить (reason !required)
  reject: async (id, reason, comment) => {
    const { data } = await api.post(`/ads/${id}/reject`, { reason, comment });
    return data;
  },

  // доработка ( опционально)
  requestChanges: async (id, reason, comment) => {
    const { data } = await api.post(`/ads/${id}/request-changes`, { reason, comment });
    return data;
  },
};