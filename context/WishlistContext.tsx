'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('wishlistItems');
    if (storedItems) {
      setWishlistItems(JSON.parse(storedItems));
    }
    setIsMounted(true);
  }, []);

  
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isMounted]);

  const addToWishlist = (bookId: string) => {
    setWishlistItems(prevItems => [...prevItems, bookId]);
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlistItems(prevItems => prevItems.filter(id => id !== bookId));
  };

  const isInWishlist = (bookId: string) => {
    return wishlistItems.includes(bookId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider 
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};