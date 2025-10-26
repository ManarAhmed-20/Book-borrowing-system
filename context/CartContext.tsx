'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cartItems: string[];
  addToCart: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  isInCart: (bookId: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (bookId: string) => {
    setCartItems(prevItems => [...prevItems, bookId]);
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(id => id !== bookId));
  };

  const isInCart = (bookId: string) => {
    return cartItems.includes(bookId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};