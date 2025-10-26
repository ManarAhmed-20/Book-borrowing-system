import { Book } from '@/data/books';
import Image from 'next/image';
import { FiCalendar, FiAlertCircle } from 'react-icons/fi';

interface BorrowedBookCardProps {
  book: Book;
  borrowDate: Date;
}

const getDaysDifference = (date1: Date, date2: Date) => {
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const BorrowedBookCard = ({ book, borrowDate }: BorrowedBookCardProps) => {
  const borrowPeriodDays = 7;

  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + borrowPeriodDays);

  const today = new Date();

  const todayStart = new Date(today.setHours(0, 0, 0, 0));
  const dueDateStart = new Date(dueDate.setHours(0, 0, 0, 0));

  const daysLeft = getDaysDifference(todayStart, dueDateStart);

  const renderStatus = () => {
    if (daysLeft > 0) {
      return (
        <span className="flex items-center gap-2 text-gray-400">
          <FiCalendar />
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left to due
        </span>
      );
    }
    if (daysLeft === 0) {
      return (
        <span className="flex items-center gap-2 text-yellow-400 font-medium">
          <FiAlertCircle />
          Due today
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 text-red-500 font-medium">
        <FiAlertCircle />
        Overdue Return
      </span>
    );
  };

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/30  rounded-lg p-4 flex flex-col gap-4 shadow-lg">
      <div className="relative w-full h-56 rounded-md overflow-hidden">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-bold text-white truncate">{book.title}</h3>
        <p className="text-sm text-gray-400 truncate">{book.author}</p>
        <p className="text-xs text-gray-500 mt-1">{book.category}</p>
      </div>
      <div className="text-sm mt-auto border-t border-gray-700 pt-3">
        {renderStatus()}
      </div>
    </div>
  );
};

export default BorrowedBookCard;