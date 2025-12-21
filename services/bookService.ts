import api from '@/lib/axios';
import { ApiBook } from '@/types';

export const bookService = {
  getAll: async () => {
    const response = await api.get<ApiBook[]>('/Book');
    return response.data;
  },

  getById: async (id: string | number) => {
    const response = await api.get<ApiBook>(`/Book/${id}`);
    return response.data;
  },
};