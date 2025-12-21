'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiStar, FiHeart } from 'react-icons/fi';
import { useParams, useRouter } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { useBorrowed } from '@/context/BorrowedContext';
import { useAuth } from '@/context/AuthContext';
import { bookService } from '@/services/bookService';
import { borrowService } from '@/services/borrowService';
import { ApiBook } from '@/types';

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const rawId = params?.id;
  const bookIdString = Array.isArray(rawId) ? rawId[0] : rawId;
  const bookId = bookIdString ? parseInt(bookIdString, 10) : 0;

  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { borrowedItems, refreshBorrowedBooks } = useBorrowed();

  const [book, setBook] = useState<ApiBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      try {
        setLoading(true);
        const data = await bookService.getById(bookId);
        setBook(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const currentBorrowedItem = borrowedItems.find(item => item.bookId === bookId && !item.isReturned);

  const handleBorrow = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!book || book.availableCopies <= 0 || !bookId) return;

    setProcessing(true);
    try {
      await borrowService.borrowBook(bookId);
      await refreshBorrowedBooks();
      setBook(prev => prev ? { ...prev, availableCopies: prev.availableCopies - 1 } : null);
      alert("Book borrowed successfully!");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || "Failed to borrow book.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleReturn = async () => {
    if (!currentBorrowedItem) return;
    setProcessing(true);
    try {
      const returnId = currentBorrowedItem.id !== 0 ? currentBorrowedItem.id : bookId;
      await borrowService.returnBook(returnId);
      await refreshBorrowedBooks();
      setBook(prev => prev ? { ...prev, availableCopies: prev.availableCopies + 1 } : null);
      alert("Book returned successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to return book.");
    } finally {
      setProcessing(false);
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!book) return;
    
    const idStr = bookId.toString();
    
    if (isInWishlist(idStr)) {
      removeFromWishlist(idStr);
    } else {
      addToWishlist(book);
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center text-white">Loading details...</div>;
  if (error || !book) return <div className="h-screen flex justify-center items-center text-red-400">{error || 'Book not found'}</div>;

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://smartlibrary.runasp.net/';

  const filename = (book as any).imageUrl ? (book as any).imageUrl.split('/').pop() : '';

  const imageUrl = filename ? `${baseUrl}images/${filename}` : '/images/placeholder.jpg';

  const isAvailable = book.availableCopies > 0;
  const isBorrowed = !!currentBorrowedItem;
  const inWishlist = isInWishlist(bookId.toString());

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">{book.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400">
          <span>By {book.author}</span>
          <span className="hidden md:inline">|</span>
          <span>Category ID: {book.categoryId}</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1 text-amber-400">
            <FiStar className="fill-current" /> {book.rating || 0}/5
          </span>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold">
          <span className={isAvailable ? "text-green-400" : "text-red-400"}>
            {isAvailable ? `Available copies: ${book.availableCopies}` : "Out of Stock"}
          </span>
        </div>
        <div className="text-4xl font-bold text-amber-400 mt-4">
          ${(book.price || 0).toFixed(2)}
        </div>
        <p className="text-gray-300 leading-relaxed max-w-lg mt-2">
          {book.description}
        </p>
        
        {isBorrowed && currentBorrowedItem?.returnDate && (
          <div className="mt-6 p-4 bg-amber-900/30 border border-amber-600 rounded-lg text-amber-300">
            <p className="font-semibold">You have borrowed this book</p>
            <p className="text-sm mt-1">
              Return by: {new Date(currentBorrowedItem.returnDate).toLocaleDateString('en-GB')}
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 mt-8">
          {isBorrowed ? (
            <button
              onClick={handleReturn}
              disabled={processing}
              className="flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Processing...' : 'Return Book'}
            </button>
          ) : (
            <button
              onClick={handleBorrow}
              disabled={!isAvailable || processing}
              className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-colors
                ${isAvailable
                  ? 'bg-amber-500 text-black hover:bg-amber-600'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                } disabled:opacity-70`}
            >
              {processing ? 'Processing...' : 'Borrow Now'}
            </button>
          )}
          
          <button
            onClick={handleWishlistClick}
            className={`p-3 rounded-lg border-2 transition-colors
              ${inWishlist
                ? 'bg-red-500 border-red-500 text-white'
                : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500'
              }`}
            aria-label="Toggle wishlist"
          >
            <FiHeart className={inWishlist ? 'fill-current' : ''} size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        <div className="w-[270px] h-[415px] bg-black rounded-2xl shadow-lg flex flex-col items-end gap-5">
          <div className="bg-red-200 w-[238px] h-[328px] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Cover of ${book.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="w-[240px] h-[45px] bg-white rounded-bl-full rounded-tl-full"></div>
        </div>
      </div>
    </div>
  );
}