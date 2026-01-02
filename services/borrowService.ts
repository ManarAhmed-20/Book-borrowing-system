import api from '@/lib/axios';

export const borrowService = {
  async getMyBorrowedBooks() {
    try {
      const response = await api.get('/User/profile');
      const history = response.data.borrowHistory || [];
      
      return history.filter((item: any) => item.isReturned === false).map((item: any) => ({
        id: item.id,            
        bookId: item.bookId,    
        title: item.bookTitle,
        borrowDate: item.borrowDate,
        returnDate: item.returnDate,
        isReturned: item.isReturned
      }));
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      return [];
    }
  },

  async borrowBook(bookId: number) {
    try {
      const idToSend = Number(bookId);
      console.log("Sending Borrow Request for Book ID:", idToSend);

      const response = await api.post('/Borrow', { 
        bookId: idToSend 
      });
      
      console.log("Borrow Success:", response.data);
      return response.data;

    } catch (error: any) {
      console.error("Borrow Failed!");

      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Server Status:", error.response.status);
        
        if (error.response.data && (error.response.data.message || typeof error.response.data === 'string')) {
            throw error.response.data;
        }
      }
      throw error;
    }
  },

  async returnBook(borrowId: number) {
    const response = await api.put(`/Borrow/return/${borrowId}`);
    return response.data;
  }
};