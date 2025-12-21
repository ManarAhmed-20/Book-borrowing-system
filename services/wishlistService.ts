import api from '@/lib/axios'; 

export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get('/User/profile');
    return response.data.favoriteBooks || [];
  },

  addToWishlist: async (bookId: string | number) => {
    const response = await api.post(`/Favorite/${bookId}`);
    return response.data;
  },

  removeFromWishlist: async (bookId: string | number) => {
    const response = await api.delete(`/Favorite/${bookId}`);
    return response.data;
  }
};