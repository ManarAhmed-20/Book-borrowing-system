'use client';

import { useEffect, useState } from 'react';
import { useBorrowed } from '@/context/BorrowedContext';
import { useAuth } from '@/context/AuthContext';
import { bookService } from '@/services/bookService';
import { authService } from '@/services/authService';
import { categoryService, Category } from '@/services/categoryService';
import UserProfileCard from '@/components/UserProfileCard';
import BorrowedBookCard from '@/components/BorrowedBookCard';
import { ApiBook } from '@/types';

interface BorrowedBookDetail extends ApiBook {
  borrowId: number;
  borrowDate: Date;
  bookTitle: string;
}

export default function ProfilePage() {
  const { borrowedItems, refreshBorrowedBooks, returnBook } = useBorrowed();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [booksDetails, setBooksDetails] = useState<BorrowedBookDetail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [returnLoading, setReturnLoading] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;

    const fetchProfileData = async () => {
      try {
        try {
          const cats = await categoryService.getAll();
          setCategories(cats);
        } catch (err) {
          console.error("Failed categories", err);
        }

        const profile = await authService.getProfile();
        setUserProfile(profile);
        
        if (borrowedItems.length === 0) {
          setBooksDetails([]);
          setLoading(false);
          return;
        }

        const results = await Promise.all(
          borrowedItems.map(async (item) => {
            const book = await bookService.getById(String(item.bookId));
            return {
              ...book,
              borrowId: item.id || item.bookId, 
              borrowDate: new Date(item.borrowDate),
              bookTitle: item.bookTitle,
            };
          })
        );

        setBooksDetails(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [borrowedItems, isAuthenticated, authLoading]);

  const getCategoryName = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : 'General';
  };

  const handleReturnClick = async (borrowId: number) => {
    try {
      setReturnLoading(borrowId);
      await returnBook(borrowId);
    } catch (error) {
      console.error("Failed to return book", error);
      alert("Failed to return book. Please try refreshing the page.");
    } finally {
      setReturnLoading(null);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8 md:py-16 px-4 md:px-0">
      <div className="md:col-span-1 h-fit md:sticky md:top-24">
        <UserProfileCard profile={userProfile} />
      </div>

      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Borrowed Books <span className="text-amber-500">({borrowedItems.length})</span>
          </h2>
          
          <button
            onClick={refreshBorrowedBooks}
            className="text-xs md:text-sm bg-[#1e2333] border border-gray-700 hover:bg-gray-700 text-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : booksDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {booksDetails.map((book, index) => (
              <BorrowedBookCard 
                key={book.borrowId || book.id || index} 
                book={book}
                borrowDate={book.borrowDate}
                onReturn={() => handleReturnClick(book.borrowId)}
                disabled={returnLoading === book.borrowId}
                categoryName={getCategoryName(book.categoryId)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-black/60 rounded-xl border border-dashed border-gray-700">
            <p className="text-gray-400 text-lg">You haven&apos;t borrowed any books yet.</p>
            <p className="text-gray-500 mt-2">Visit the library to start reading!</p>
          </div>
        )}
      </div>
    </section>
  );
}