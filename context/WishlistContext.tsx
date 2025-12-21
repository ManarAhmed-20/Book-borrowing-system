'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { wishlistService } from '@/services/wishlistService';

export interface FavoriteBook {
  bookId: number;
  title: string;
  author: string;
}

interface WishlistContextType {
  favoriteBooks: FavoriteBook[];
  isInWishlist: (bookId: string) => boolean;
  addToWishlist: (book: any) => void;
  removeFromWishlist: (bookId: string) => void;
  refreshWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>([]);

  const refreshWishlist = async () => {
    if (isLoading || !isAuthenticated) return;

    try {
      const data = await wishlistService.getWishlist();
      setFavoriteBooks(data);
    } catch (error: any) {
      console.error("Failed to fetch wishlist", error);
      setFavoriteBooks([]); 
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        refreshWishlist();
      } else {
        setFavoriteBooks([]);
      }
    }
  }, [isAuthenticated, isLoading]);

  const isInWishlist = (bookId: string) => {
    return favoriteBooks.some(book => book.bookId.toString() === bookId);
  };

  const addToWishlist = async (book: any) => {
    if (!isAuthenticated) return;
    try {
      await wishlistService.addToWishlist(book.id);
      await refreshWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    if (!isAuthenticated) return;
    try {
      await wishlistService.removeFromWishlist(bookId);
      await refreshWishlist();
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      favoriteBooks, 
      isInWishlist, 
      addToWishlist, 
      removeFromWishlist, 
      refreshWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};