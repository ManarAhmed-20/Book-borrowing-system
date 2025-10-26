'use client';

import { useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { allBooks } from '@/data/books';
import Image from 'next/image';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const booksInWishlist = allBooks.filter((book) => wishlistItems.includes(book.id));

  const handleCheckboxChange = (bookId: string) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
  };

  const handleBorrowSelected = () => {
    selectedBooks.forEach((bookId) => {
      if (!isInCart(bookId)) {
        addToCart(bookId);
      }
      removeFromWishlist(bookId);
    });
    setSelectedBooks([]);
  };

  return (
    <section className="min-h-screen text-white py-8 px-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-amber-400">My Wishlist 💛</h1>

        {booksInWishlist.length === 0 ? (
          <div className="text-center text-gray-400 text-lg mt-20">
            💫 Your wishlist is empty! Start adding your favorite books.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              {booksInWishlist.map((book) => (
                <div
                  key={book.id}

                  className="flex items-center justify-between gap-4 bg-[#1e2333] rounded-xl p-4 shadow-md"
                >

                  <div className="flex items-center gap-4 min-w-0">
                    {book.availableCopies > 0 ? (
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleCheckboxChange(book.id)}
                        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500 cursor-pointer flex-shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 flex-shrink-0"></div>
                    )}

                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={50}
                      height={65}
                      className="rounded-md object-cover flex-shrink-0"
                    />

                    <div className="min-w-0">

                      <h3 className="font-semibold text-lg truncate">{book.title}</h3>
                      <p className="text-gray-400 text-sm truncate">{book.author}</p>

                      {book.availableCopies > 0 ? (
                        <p className="text-amber-400 font-medium mt-1">${book.price.toFixed(2)}</p>
                      ) : (
                        <p className="text-red-400 text-sm font-medium mt-1">Currently unavailable</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromWishlist(book.id)}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition flex-shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>


            <div className="bg-[#1e2333] rounded-xl p-6 shadow-lg h-fit md:sticky md:top-24">
              <h2 className="text-2xl font-semibold mb-6 text-amber-400">Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Total books:</span>
                  <span>{booksInWishlist.length}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Selected:</span>
                  <span>{selectedBooks.length}</span>
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBorrowSelected}
                  disabled={selectedBooks.length === 0}
                  className="bg-amber-400 text-black font-semibold py-2 rounded-md hover:bg-amber-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Borrow Selected ({selectedBooks.length})
                </button>
                <button
                  onClick={clearWishlist}
                   className="bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>
            </div>
        )}
      </div>
    </section>
  );
}