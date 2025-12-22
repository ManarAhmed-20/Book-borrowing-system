'use client';

import { ApiBook } from '@/types';
import Image from 'next/image';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';

interface BorrowedBookCardProps {
  book: ApiBook;
  borrowDate: Date;
  onReturn: () => void;
  disabled?: boolean;
  categoryName?: string;
}

const getDaysDifference = (date1: Date, date2: Date) => {
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const BorrowedBookCard = ({ book, borrowDate, onReturn, disabled, categoryName }: BorrowedBookCardProps) => {
  const borrowPeriodDays = 7;
  const dateObj = new Date(borrowDate);
  const dueDate = new Date(dateObj);
  dueDate.setDate(dueDate.getDate() + borrowPeriodDays);

  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));
  const dueDateStart = new Date(dueDate.setHours(0, 0, 0, 0));
  const daysLeft = getDaysDifference(todayStart, dueDateStart);

  const getResolvedImage = (url?: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;
    const filename = url.split('/').pop();
    return filename ? `/images/${filename}` : '/images/placeholder.jpg';
  };

  const resolvedImage = getResolvedImage(book.image || book.imageUrl);

  const renderStatus = () => {
    if (daysLeft > 0) {
      return (
        <span className="flex items-center gap-1.5 text-green-400 font-medium text-sm">
          <FiCalendar /> {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </span>
      );
    }
    if (daysLeft === 0) {
      return (
        <span className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm">
          <FiAlertCircle /> Due Today
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-red-500 font-bold text-sm">
        <FiAlertCircle /> Overdue ({Math.abs(daysLeft)})
      </span>
    );
  };

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-lg p-3 flex flex-col gap-3 shadow-lg h-full">
      
      <div className="relative w-full h-48 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={resolvedImage}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className="absolute top-2 right-2 bg-black/60 border border-white/10 px-2 py-0.5 rounded-full text-[10px] text-white backdrop-blur-sm shadow-sm">
          {dateObj.toLocaleDateString('en-GB')}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="font-bold text-white truncate text-base" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs text-gray-300 truncate">
          {book.author}
        </p>
        <p className="text-xs text-blue-300/80 bg-blue-900/20 px-2 py-0.5 rounded-full w-fit mt-1">
          {categoryName || 'General'}
        </p>
      </div>

      <div className="mt-auto border-t border-white/10 pt-3 flex items-center justify-between gap-2">
        <div className="text-sm">
          {renderStatus()}
        </div>
        
        <button 
          onClick={onReturn}
          disabled={disabled}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-1.5 text-xs rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
        >
          {disabled ? '...' : 'Return'}
        </button>
      </div>
    </div>
  );
};

export default BorrowedBookCard;