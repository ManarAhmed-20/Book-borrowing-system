'use client';

import { FiSearch } from 'react-icons/fi';

interface LibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const LibraryHeader = ({ searchQuery, onSearchChange }: LibraryHeaderProps) => {
  return (
    <header className="text-center mb-12 xl:mt-10">
      <p className="text-sm font-semibold tracking-widest text-gray-400">
        DISCOVER YOUR NEXT GREAT READ:
      </p>
      <h1 className="text-4xl md:text-5xl font-bold my-4 text-white">
        Explore and Search for <span className="text-amber-400">Any Book</span> In Our Library
      </h1>

      <div className="relative max-w-lg mx-auto mt-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-black/20 backdrop-blur-md border border-white/30 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-lg focus:shadow-amber-500/20"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </header>
  );
};

export default LibraryHeader;