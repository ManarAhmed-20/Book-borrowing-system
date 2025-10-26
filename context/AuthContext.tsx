'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsMounted(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    if (isMounted) {
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (isMounted) {
      localStorage.removeItem('isAuthenticated');
    }
  };

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }
  }, [isAuthenticated, isMounted]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};