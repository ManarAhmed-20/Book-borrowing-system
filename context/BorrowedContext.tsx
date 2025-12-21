'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { borrowService } from '@/services/borrowService';
import { useAuth } from './AuthContext';

export interface BorrowedItem {
  id: number;
  userId?: string | null;
  bookId: number;
  userName?: string | null;
  bookTitle: string;
  borrowDate: string;
  returnDate?: string;
  isReturned: boolean;
}

interface BorrowedContextType {
  borrowedItems: BorrowedItem[];
  refreshBorrowedBooks: () => Promise<void>;
  returnBook: (borrowId: number) => Promise<void>;
}

const BorrowedContext = createContext<BorrowedContextType | undefined>(undefined);

export const BorrowedProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);

  const refreshBorrowedBooks = async () => {
    if (isLoading || !isAuthenticated) {
      setBorrowedItems([]);
      return;
    }

    try {
      const data = await borrowService.getMyBorrowedBooks();
      setBorrowedItems(data.filter((item: BorrowedItem) => !item.isReturned));
    } catch (error: any) {
      console.error("Failed to fetch borrowed books", error);
      if (error.response?.status === 401) {
        logout();
      }
      setBorrowedItems([]);
    }
  };

  const returnBook = async (borrowId: number) => {
    try {
      await borrowService.returnBook(borrowId);
      await refreshBorrowedBooks();
    } catch (error: any) {
      console.error("Error returning book", error);
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        refreshBorrowedBooks();
      } else {
        setBorrowedItems([]);
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <BorrowedContext.Provider value={{ borrowedItems, refreshBorrowedBooks, returnBook }}>
      {children}
    </BorrowedContext.Provider>
  );
};

export const useBorrowed = () => {
  const context = useContext(BorrowedContext);
  if (context === undefined) {
    throw new Error('useBorrowed must be used within a BorrowedProvider');
  }
  return context;
};