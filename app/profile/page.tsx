'use client';

import { useBorrowed } from '@/context/BorrowedContext';
import { allBooks } from '@/data/books';
import UserProfileCard from '@/components/UserProfileCard';
import BorrowedBookCard from '@/components/BorrowedBookCard';

export default function ProfilePage() {
  const { borrowedItems } = useBorrowed();


  const borrowedBookDetails = borrowedItems.map(item => {
    const book = allBooks.find(b => b.id === item.bookId);
    return {
      ...book!,
      borrowDate: item.borrowDate,
    };
  }).filter(Boolean);

  return (





    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">


      <div className="md:col-span-1 lg:col-span-1 md:sticky md:top-24 h-fit">
        <UserProfileCard />
      </div>


      <div className="md:col-span-2 lg:col-span-3">
        <h2 className="text-3xl font-bold mb-6 text-white">Borrowed books</h2>

        {borrowedBookDetails.length > 0 ? (




          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBookDetails.map(item => (
              <BorrowedBookCard
                key={`${item.id}-${item.borrowDate.getTime()}`}
                book={item}
                borrowDate={item.borrowDate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg mt-20 p-8 bg-[#1e2333] rounded-lg">
            You haven't borrowed any books yet.
          </div>
        )}
      </div>

    </section>
  );
}