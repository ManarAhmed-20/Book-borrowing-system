import api from '@/lib/axios';
import { BorrowedItem } from '@/context/BorrowedContext';

export const borrowService = {
  getMyBorrowedBooks: async (): Promise<BorrowedItem[]> => {
    const res = await api.get('/User/profile');
    return (res.data as any).borrowHistory as BorrowedItem[];
  },

  borrowBook: async (bookId: number) => {
    const id = parseInt(bookId.toString(), 10);
    
    if (!id || isNaN(id) || id <= 0) {
      throw new Error(`Invalid Book ID: ${bookId}`);
    }

    const res = await api.post('/Borrow', { bookId: id });
    return res.data;
  },

  returnBook: async (id: number) => {
    const res = await api.put(`/Borrow/return/${id}`);
    return res.data;
  },
};