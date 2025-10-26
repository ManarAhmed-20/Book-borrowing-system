'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface BorrowedItem {
  bookId: string;
  borrowDate: Date;
}

interface BorrowedContextType {
  borrowedItems: BorrowedItem[];
  borrowBooks: (bookIds: string[]) => void;
}

const BorrowedContext = createContext<BorrowedContextType | undefined>(undefined);

export const BorrowedProvider = ({ children }: { children: ReactNode }) => {
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('borrowedItems');
    if (storedItems) {
      const parsedData = JSON.parse(storedItems).map((item: any) => ({
        ...item,
        borrowDate: new Date(item.borrowDate),
      }));
      setBorrowedItems(parsedData);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('borrowedItems', JSON.stringify(borrowedItems));
    }
  }, [borrowedItems, isMounted]);

  const borrowBooks = (bookIds: string[]) => {
    const newItems: BorrowedItem[] = bookIds.map(id => ({
      bookId: id,
      borrowDate: new Date(),
    }));
    setBorrowedItems(prevItems => [...prevItems, ...newItems]);
  };

  return (
    <BorrowedContext.Provider value={{ borrowedItems, borrowBooks }}>
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