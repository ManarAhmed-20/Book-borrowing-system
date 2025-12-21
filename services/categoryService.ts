import api from '@/lib/axios';

export interface Category {
  id: number;
  name: string;
}

export const categoryService = {
  getAll: async () => {
    const response = await api.get('/Category'); 
    return response.data;
  }
};