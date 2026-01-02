import api from '@/lib/axios';
// import { ApiBook } from '@/types';

export const bookService = {
  async getRecommended() {
    const response = await api.get('/Book/recommended');
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/Book');
      return response.data;
  },

  getById: async (id: string | number) => {
    const response = await api.get(`/Book/${id}`);
      return response.data;
  },
};