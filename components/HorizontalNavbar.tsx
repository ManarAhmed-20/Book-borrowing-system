'use client';

import Link from 'next/link';
import { FiHome, FiBookOpen, FiHeart, FiShoppingCart, FiUser, FiLogIn } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const HorizontalNavbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-16 bg-black/20 backdrop-blur-lg border-b border-white/10 hidden md:flex lg:hidden items-center justify-between px-8">

      <Link href="/" className="text-white text-2xl font-bold">
        BookWise
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors" aria-label="Home">
          <FiHome size={22} />
        </Link>
        <Link href="/library" className="text-gray-400 hover:text-white transition-colors" aria-label="Library">
          <FiBookOpen size={22} />
        </Link>
        <Link href="/wishlist" className="text-gray-400 hover:text-white transition-colors" aria-label="Wishlist">
          <FiHeart size={22} />
        </Link>
        <Link href="/cart" className="text-gray-400 hover:text-white transition-colors" aria-label="Cart">
          <FiShoppingCart size={22} />
        </Link>
        {isAuthenticated ? (
          <Link href="/profile" className="text-gray-400 hover:text-white transition-colors" aria-label="Profile">
            <FiUser size={22} />
          </Link>
        ) : (
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors" aria-label="Login">
            <FiLogIn size={22} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default HorizontalNavbar;