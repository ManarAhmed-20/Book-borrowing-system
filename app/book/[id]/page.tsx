'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiStar, FiHeart, FiBell, FiShoppingCart } from 'react-icons/fi';
import { allBooks, Book } from '@/data/books';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function BookDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const book = allBooks.find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold text-white">Book not found</h1>
      </div>
    );
  }

  const isAvailable = book.availableCopies > 0;
  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);


  const handleCartClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (inCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book.id);


      if (inWishlist) {
        removeFromWishlist(book.id);
      }
    }
  };


  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-0">


      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-extrabold text-white">{book.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400">
          <span>By {book.author}</span>
          <span className="hidden md:inline">|</span>
          <span>Category: {book.category}</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1 text-amber-400">
            <FiStar className="fill-current" /> {book.rating}/5
          </span>
        </div>

        <div className="flex items-center gap-4 text-white font-semibold">
          <span>Available books: {book.availableCopies}</span>
        </div>

        <div className="text-4xl font-bold text-amber-400 mt-4">
          ${book.price.toFixed(2)}
        </div>

        <p className="text-gray-300 leading-relaxed max-w-lg mt-2">
          {book.description}
        </p>

        <div className="flex items-center gap-4 mt-8">
          {isAvailable ? (
            <button
              onClick={handleCartClick}
              className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-colors
                ${inCart
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-amber-500 text-black hover:bg-amber-600'
                }`}
            >
              <FiShoppingCart size={20} />
              <span>{inCart ? 'Remove from cart' : 'Add to cart'}</span>
            </button>
          ) : (
            <button className="flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed" disabled>
              <FiBell />
              Notify me when available
            </button>
          )}

          <button
            onClick={handleWishlistClick}
            className={`p-3 rounded-lg border-2 transition-colors
              ${inWishlist
                ? 'bg-red-500 border-red-500 text-white'
                : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500'
              }`}
            aria-label="Add to wishlist"
          >
            <FiHeart className={inWishlist ? 'fill-current' : ''} size={24} />
          </button>
        </div>
      </div>


      <div className="flex justify-center items-center">
        <div
          className="w-[270px] h-[415px] bg-black rounded-2xl shadow-lg flex flex-col items-end gap-5"
        >
          <div className="bg-red-200 w-[238px] h-[328px] relative overflow-hidden">
            <Image
              src={book.imageUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
            />
          </div>

          <div className='w-[240px] h-[45px] bg-white rounded-bl-full rounded-tl-full'></div>
        </div>
      </div>

    </div>
  );
}