'use client';

import { useCart } from '@/context/CartContext';
import { useBorrowed } from '@/context/BorrowedContext';
import { allBooks } from '@/data/books';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { borrowBooks } = useBorrowed();

  const booksInCart = allBooks.filter((book) => cartItems.includes(book.id));
  const totalPrice = booksInCart.reduce((sum, book) => sum + book.price, 0).toFixed(2);


  const handleBorrowNow = () => {

    borrowBooks(cartItems);

    clearCart();

    alert('Books borrowed successfully! Check your profile.');
  };

  return (

    <section className="min-h-screen text-white py-16 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-amber-400">Your Cart</h1>

        {booksInCart.length === 0 ? (

          <div className="text-center text-gray-400 text-lg mt-20">
            🛒 Your cart is currently empty. Start by adding some books!
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">

            <div className="md:col-span-2 space-y-6">
              {booksInCart.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between gap-4 bg-[#1e2333] rounded-xl p-4 shadow-md"
                >
                  <div className="flex items-center gap-4 min-w-0">
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
                      <p className="text-amber-400 font-medium mt-1">${book.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition flex-shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>


            <div className="bg-[#1e2333] rounded-xl p-6 flex flex-col justify-between shadow-lg h-fit">
              <h2 className="text-2xl font-semibold mb-6 text-amber-400">Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Number of books:</span>
                  <span>{booksInCart.length}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-400">${totalPrice}</span>
                </div>
              </div>


              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBorrowNow}
                  className="bg-amber-400 text-black font-semibold py-2 rounded-md hover:bg-amber-500 transition"
                >
                  Borrow Now
                </button>
                <button
                  onClick={clearCart}
                  className="bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}