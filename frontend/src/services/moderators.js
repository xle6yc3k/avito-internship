import { api } from './index';

export const moderatorsApi = {
  // информация о модераторе
  getMe: async () => {
    const { data } = await api.get('/moderators/me');
    return data;
  },
};