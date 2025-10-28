'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 z-20 w-full md:hidden">
      <div className="flex items-center justify-between h-16 bg-black/20 backdrop-blur-lg border-b border-white/10 px-6">
        <Link href="/" className="text-white text-xl font-bold">
          BookWise
        </Link>
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-16 w-full bg-black/90 backdrop-blur-lg flex flex-col p-6 shadow-lg">
          <Link onClick={toggleMenu} href="/" className="text-lg text-white py-3">Home</Link>
          <Link onClick={toggleMenu} href="/library" className="text-lg text-white py-3">Library</Link>
          <Link onClick={toggleMenu} href="/wishlist" className="text-lg text-white py-3">Wishlist</Link>
          <Link onClick={toggleMenu} href="/cart" className="text-lg text-white py-3">Cart</Link>
          {isAuthenticated ? (
            <Link onClick={toggleMenu} href="/profile" className="text-lg text-white py-3">Profile</Link>
          ) : (
            <Link onClick={toggleMenu} href="/login" className="text-lg text-amber-400 font-semibold py-3">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;