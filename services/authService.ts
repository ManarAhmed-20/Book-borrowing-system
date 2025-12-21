import api from '@/lib/axios';
import { LoginDto, AuthResponse } from '@/types';

export const authService = {
  login: async (data: LoginDto) => {
    const response = await api.post<AuthResponse>('/Account/login', {
      email: data.email?.trim() ?? '',
      password: data.password?.trim() ?? '',
    });
    return response.data;
  },

  register: async (data: any) => {
    const response = await api.post('/Account/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/User/profile');
    return response.data;
  },
};