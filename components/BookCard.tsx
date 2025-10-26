'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
}

const BookCard = ({ id, title, author, imageUrl, price }: BookCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Link href={`/book/${id}`} className="group w-fit">
      <div
        className="w-[110px] h-[166px] bg-black shadow-lg rounded-2xl flex flex-col items-end gap-2
                   transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-2 relative"
      >
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-colors
            ${inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-black/50 text-white hover:bg-red-500'
            }`}
          aria-label="Add to wishlist"
        >
          <FiHeart size={14} className={inWishlist ? 'fill-current' : ''} />
        </button>

        <div className="bg-red-200 w-[95px] h-[131px] relative overflow-hidden">
           <Image src={imageUrl} alt={`Cover of ${title}`} fill className="object-cover" />
        </div>
        <div className='w-[96px] h-[18px] bg-white rounded-bl-full rounded-tl-full'></div>
      </div>

      <div className="mt-2 w-[108px]">
        <h3 className="font-bold text-white truncate text-sm">{title}</h3>
        <p className="text-xs text-gray-400">{author}</p>
        <p className="text-sm font-bold text-amber-400 mt-1">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default BookCard;