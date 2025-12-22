'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
}

const BookCard = ({ id, title, author, imageUrl, price }: BookCardProps) => {
  const getResolvedImage = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;

    const filename = url.split('/').pop();
    if (!filename) return '/images/placeholder.jpg';
    return `/images/${filename}`;
  };

  const resolvedImage = getResolvedImage(imageUrl);

  return (
    <Link href={`/book/${id}`} className="group w-fit">
      <div
        className="w-[110px] h-[166px] bg-black shadow-lg rounded-2xl flex flex-col items-end gap-2
                  transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-2 relative"
      >
        <div className="bg-red-200 w-[95px] h-[131px] relative overflow-hidden">
          <Image
            src={resolvedImage}
            alt={`Cover of ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 150px"
          />
        </div>
        <div className='w-[96px] h-[18px] bg-white rounded-br-full rounded-bl-full rounded-tl-full'></div>
      </div>

      <div className="mt-2 w-[108px]">
        <h3 className="font-bold text-white truncate text-sm" title={title}>{title}</h3>
        <p className="text-xs text-gray-400 truncate">{author}</p>
        <p className="text-sm font-bold text-amber-400 mt-1">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default BookCard;