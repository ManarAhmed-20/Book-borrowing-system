import Link from 'next/link';
import { FiHome, FiBookOpen, FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-10 h-screen w-20 bg-black/20 backdrop-blur-lg flex flex-col items-center py-8 gap-8 border-r border-white/10 hidden lg:flex">
      <div className="text-white text-2xl font-bold">
        B
      </div>

      <nav className="flex flex-col gap-8">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors" aria-label="Home">
          <FiHome size={24} />
        </Link>
        <Link href="/library" className="text-gray-400 hover:text-white transition-colors" aria-label="Library">
          <FiBookOpen size={24} />
        </Link>
        <Link href="/wishlist" className="text-gray-400 hover:text-white transition-colors" aria-label="Wishlist">
          <FiHeart size={24} />
        </Link>
        <Link href="/cart" className="text-gray-400 hover:text-white transition-colors" aria-label="Cart">
          <FiShoppingCart size={24} />
        </Link>
      </nav>

      <Link href="/profile" className="text-gray-400 hover:text-white transition-colors mt-auto" aria-label="Profile">
        <FiUser size={24} />
      </Link>
    </aside>
  );
};

export default Sidebar;