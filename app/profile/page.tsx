'use client';

import { useEffect, useState } from 'react';
import { useBorrowed } from '@/context/BorrowedContext';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { bookService } from '@/services/bookService';
import UserProfileCard from '@/components/UserProfileCard';
import BorrowedBookCard from '@/components/BorrowedBookCard';

export default function ProfilePage() {
  const { borrowedItems, refreshBorrowedBooks, returnBook } = useBorrowed();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [booksWithImages, setBooksWithImages] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [returnLoading, setReturnLoading] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const profile = await authService.getProfile();
          setUserProfile(profile);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    const enrichBooksWithImages = async () => {
      if (borrowedItems.length > 0) {
        const enriched = await Promise.all(borrowedItems.map(async (item) => {
          try {
            const bookDetails = await bookService.getById(item.bookId.toString());
            return {
              ...bookDetails,
              borrowId: item.id,
              borrowDate: item.borrowDate,
              title: bookDetails.title 
            };
          } catch (e) {
            return { 
              ...item, 
              borrowId: item.id, 
              imageUrl: '',
              title: (item as any).bookTitle || 'Unknown Book' 
            }; 
          }
        }));
        setBooksWithImages(enriched);
      } else {
        setBooksWithImages([]);
      }
    };

    enrichBooksWithImages();
  }, [borrowedItems]);

  const handleReturnClick = async (borrowId: number) => {
    if (!borrowId) return;
    try {
      setReturnLoading(borrowId);
      await returnBook(borrowId);
      await refreshBorrowedBooks();
    } catch (error) {
      alert("Failed to return book.");
    } finally {
      setReturnLoading(null);
    }
  };

  if (authLoading) return <div className="p-10 text-white text-center">Loading...</div>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8 md:py-16 px-4 md:px-0">
      
      <div className="md:col-span-1 h-fit md:sticky md:top-24">
        <UserProfileCard profile={userProfile} />
      </div>

      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Borrowed Books <span className="text-amber-500">({booksWithImages.length})</span>
          </h2>
          <button onClick={refreshBorrowedBooks} className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded">
            Refresh
          </button>
        </div>

        {booksWithImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {booksWithImages.map((book: any) => (
              <BorrowedBookCard 
                key={book.borrowId} 
                book={book}
                borrowDate={book.borrowDate}
                onReturn={() => handleReturnClick(book.borrowId)}
                disabled={returnLoading === book.borrowId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-black/60 rounded-xl border border-dashed border-gray-700">
            <p className="text-gray-400 text-lg">You don&apos;t have any active borrowed books.</p>
          </div>
        )}
      </div>
    </section>
  );
}