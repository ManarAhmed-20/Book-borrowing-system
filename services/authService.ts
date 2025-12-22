import api from '@/lib/axios';
import { LoginDto, RegisterDto, AuthResponse } from '@/types';

export const authService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/Account/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterDto): Promise<any> {
    const response = await api.post('/Account/register', data);
    return response.data;
  },

  async getProfile(): Promise<any> {
    const response = await api.get('/User/profile');
    return response.data;
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
};