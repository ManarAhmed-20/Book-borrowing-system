import api from '@/lib/axios';

export const wishlistService = {
  async getWishlist() {
    const response = await api.get('/Favorite'); 
    return response.data;
  },

  async addToWishlist(bookId: string) {
    const response = await api.post(`/Favorite/${bookId}`);
    return response.data;
  },

  async removeFromWishlist(bookId: string) {
    const response = await api.delete(`/Favorite/${bookId}`);
    return response.data;
  }
};