'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { LoginDto, RegisterDto } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginDto) => {
    try {
      const response: any = await authService.login(data);
      let tokenToSave = '';

      if (response?.data?.token) {
        tokenToSave = response.data.token;
      } else if (response?.token) {
        tokenToSave = response.token;
      } else if (typeof response === 'string') {
        tokenToSave = response;
      }

      if (tokenToSave) {
        localStorage.setItem('token', tokenToSave);
        setIsAuthenticated(true);
        router.push('/profile');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    await authService.register(data);
  };

  const logout = () => {
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  router.push('/login');
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};