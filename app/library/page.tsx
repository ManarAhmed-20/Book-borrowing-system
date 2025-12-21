'use client';

import { useState, useEffect, useMemo, Suspense } from 'react'; 
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import LibraryHeader from '@/components/LibraryHeader';
import Pagination from '@/components/Pagination';
import FilterModal from '@/components/FilterModal';
import { FiFilter, FiSliders } from 'react-icons/fi';
import { bookService } from '@/services/bookService';
import { ApiBook } from '@/types';

const BOOKS_PER_PAGE = 6; 

interface FilterState {
  priceRange?: number;
  showAvailableOnly?: boolean;
}

function LibraryContent() {
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('categoryId'); 

  const [books, setBooks] = useState<ApiBook[]>([]); 
  const [loading, setLoading] = useState(true);      
  const [error, setError] = useState('');            

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getAll();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const formattedBooks = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';
    return books.map(book => ({
      ...book,
      id: book.id.toString(),
      imageUrl: (book as any).imageUrl 
        ? `${baseUrl}${(book as any).imageUrl}`
        : '/images/placeholder.jpg',
      price: book.price || 0,
      category: book.categoryId.toString(),
    }));
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = formattedBooks;

    if (searchQuery) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryIdParam) {
      result = result.filter(book => book.category === categoryIdParam);
    }

    if (appliedFilters.showAvailableOnly) {
      result = result.filter(book => book.availableCopies > 0);
    }
    if (appliedFilters.priceRange !== undefined) { 
      result = result.filter(book => book.price <= appliedFilters.priceRange!);
    }

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'rating_desc': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'available_first': result.sort((a, b) => b.availableCopies - a.availableCopies); break;
      default: break;
    }

    return result;
  }, [formattedBooks, searchQuery, appliedFilters, sortBy, categoryIdParam]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE, 
    currentPage * BOOKS_PER_PAGE
  );

  const handleApplyFilters = (filters: FilterState) => { setAppliedFilters(filters); setCurrentPage(1); };
  const handleClearFilters = () => { setAppliedFilters({}); setCurrentPage(1); };
  const handleSearchChange = (query: string) => { setSearchQuery(query); setCurrentPage(1); };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1); };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-white">Loading Library...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-400">{error}</div>;

  return (
    <section>
      <LibraryHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-xl md:text-2xl font-bold">All Books</h2>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
             <select 
               value={sortBy} 
               onChange={handleSortChange} 
               className="bg-black/20 backdrop-blur-md border border-white/30 rounded-lg py-2 pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-white shadow-lg cursor-pointer"
             >
                 <option value="default" className="bg-[#1e2333]">Sort by</option>
                 <option value="price_asc" className="bg-[#1e2333]">Price: Low-High</option>
                 <option value="rating_desc" className="bg-[#1e2333]">Rating</option>
                 <option value="available_first" className="bg-[#1e2333]">Availability</option>
             </select>
             <FiSliders className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/30 rounded-lg py-2 px-3 hover:bg-white/10 transition-all shadow-lg text-white"
          >
            <FiFilter />
            <span className="hidden md:inline">Filter</span> 
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12 min-h-[300px]">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => (
            <BookCard key={book.id} id={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} price={book.price} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No books found matching your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
      )}

      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} appliedFilters={appliedFilters} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
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