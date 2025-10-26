'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { allBooks, Book } from '@/data/books';
import BookCard from '@/components/BookCard';
import LibraryHeader from '@/components/LibraryHeader';
import Pagination from '@/components/Pagination';
import FilterModal from '@/components/FilterModal';
import { FiFilter, FiSliders } from 'react-icons/fi';

const BOOKS_PER_PAGE = 6;

interface FilterState {
  priceRange?: number;
  showAvailableOnly?: boolean;
}

function LibraryContent() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = useMemo(() => {
    let books: Book[] = allBooks;
    if (categoryFromURL) books = books.filter(book => book.category === categoryFromURL);
    if (searchQuery) books = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()));
    if (appliedFilters.showAvailableOnly) books = books.filter(book => book.availableCopies > 0);
    if (appliedFilters.priceRange !== undefined) books = books.filter(book => book.price <= appliedFilters.priceRange!);
    switch (sortBy) {
      case 'price_asc': books.sort((a, b) => a.price - b.price); break;
      case 'rating_desc': books.sort((a, b) => b.rating - a.rating); break;
      case 'available_first': books.sort((a, b) => b.availableCopies - a.availableCopies); break;
      default: break;
    }
    return books;
  }, [categoryFromURL, searchQuery, appliedFilters, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const displayedBooks = filteredBooks.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE);

  const handleApplyFilters = (filters: FilterState) => { setAppliedFilters(filters); setCurrentPage(1); };
  const handleClearFilters = () => { setAppliedFilters({}); setCurrentPage(1); };
  const handleSearchChange = (query: string) => { setSearchQuery(query); setCurrentPage(1); };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1); };

  return (
    <section>
      <LibraryHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {categoryFromURL ? `${categoryFromURL} Books` : 'All Books'}
        </h2>

        <div className="flex items-center gap-2 md:gap-4">

          <div className="relative">
            <FiSliders className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-[#1e2333] border border-gray-700 rounded-lg py-2 pl-10 pr-4 md:pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="default">Sort by</option>
              <option value="price_asc">Price: Low-High</option>
              <option value="rating_desc">Rating</option>
              <option value="available_first">Availability</option>
            </select>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-[#1e2333] border border-gray-700 rounded-lg py-2 px-3 hover:bg-gray-700 transition-colors"
          >
            <FiFilter />
            <span className="hidden md:inline">Filter</span>
          </button>
        </div>
      </div>



      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-0 gap-y-12 min-h-[300px]">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              imageUrl={book.imageUrl}
              price={book.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No books found matching your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        appliedFilters={appliedFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </section>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  );
}