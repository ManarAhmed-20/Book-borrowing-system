'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiEye, FiBook } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function WishlistPage() {
  const { favoriteBooks, removeFromWishlist, refreshWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && favoriteBooks) {
      setLoading(false);
    }
  }, [isAuthenticated, favoriteBooks]);

  const getResolvedImage = (url: string) => {
    if (!url) return '/images/placeholder.jpg';

    if (url.startsWith('http')) return url;

    const baseUrl = 'http://smartlibrary.runasp.net';

    if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
    }

    return `${baseUrl}/images/${url}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Login Required</h1>
          <Link href="/login" className="inline-block bg-amber-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-8 px-3 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-amber-400 border-b border-gray-800 pb-4">
          My Wishlist
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : favoriteBooks.length === 0 ? (
          <div className="text-center py-20 bg-black/60 rounded-xl border border-dashed border-gray-700">
            <FiBook size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-xl text-gray-300">Your wishlist is empty!</p>
            <p className="text-gray-500 mt-2 mb-6">Start adding your favorite books to read them later.</p>
            <Link href="/library" className="bg-amber-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-amber-600 transition">
              Browse Library
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 space-y-4">
              {favoriteBooks.map((book: any, index: number) => (
                <div
                  key={book.bookId || index}
                  className="bg-black/20 backdrop-blur-md border border-white/30 rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative w-20 h-28 sm:w-24 sm:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={getResolvedImage(book.imageUrl)}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="100px"
                      priority={index < 2}
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-grow min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-base sm:text-xl font-bold text-white truncate pr-2">{book.title}</h3>
                        <p className="text-amber-400 font-bold whitespace-nowrap text-sm sm:text-base">
                          ${(book.price || 0).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-2">{book.author}</p>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                        <span className={`px-2 py-0.5 sm:py-1 rounded-full ${book.availableCopies > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {book.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 sm:py-1 rounded-full truncate max-w-[100px]">
                           {book.categoryName || 'General'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <Link
                        href={`/book/${book.bookId}`}
                        className="flex items-center gap-1.5 sm:gap-2 bg-amber-500 hover:bg-amber-600 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition flex-1 justify-center"
                      >
                        <FiEye className="w-3 h-3 sm:w-4 sm:h-4" /> View & Borrow
                      </Link>

                      <button
                        onClick={() => removeFromWishlist(book.bookId.toString())}
                        className="flex items-center gap-2 bg-white/10 hover:bg-red-600/80 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition border border-white/5"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-black/60 backdrop-blur-lg rounded-xl p-5 sm:p-6 shadow-lg sticky top-24 hover:shadow-2xl transition-all border border-white/10 hover:border-gray-500">
                <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 sm:mb-6">Summary</h2>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center text-gray-300 pb-3 sm:pb-4 border-b border-gray-700 text-sm sm:text-base">
                    <span>Total Books</span>
                    <span className="font-bold text-white">{favoriteBooks.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 text-sm sm:text-base">
                    <span>Available to Borrow</span>
                    <span className="text-gray-300 font-bold">
                      {favoriteBooks.filter((b: any) => b.availableCopies > 0).length}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-900/10 border border-blue-500/20 p-3 sm:p-4 rounded-lg mb-6">
                  <p className="text-xs sm:text-sm text-blue-200">
                    <strong>Tip:</strong> Click "View & Borrow" to proceed with borrowing.
                  </p>
                </div>

                <button
                  onClick={refreshWishlist}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition"
                >
                  Refresh List
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}