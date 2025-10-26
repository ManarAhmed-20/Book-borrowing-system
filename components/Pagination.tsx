'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
            ${currentPage === page 
              ? 'bg-amber-400 text-black font-bold' 
              : 'bg-[#1e2333] hover:bg-amber-500 hover:text-black'
            }`}
        >
          {page}
        </button>
      ));
    }
    return (
      <>
        <button
          onClick={() => onPageChange(1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
            ${currentPage === 1 
              ? 'bg-amber-400 text-black font-bold' 
              : 'bg-[#1e2333] hover:bg-amber-500 hover:text-black'
            }`}
        >
          1
        </button>
        {currentPage > 2 && (
          <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <button
            className="w-10 h-10 flex items-center justify-center bg-amber-400 text-black rounded-md font-bold"
          >
            {currentPage}
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
        )}
        <button
          onClick={() => onPageChange(totalPages)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
            ${currentPage === totalPages 
              ? 'bg-amber-400 text-black font-bold' 
              : 'bg-[#1e2333] hover:bg-amber-500 hover:text-black'
            }`}
        >
          {totalPages}
        </button>
      </>
    );
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-16">
      
      {/* --- 1. الترقيم الكامل (للتابلت والديسكتوب) --- */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center bg-[#1e2333] rounded-md hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50"
        >
          &lt;
        </button>
        
        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-[#1e2333] rounded-md hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {/* --- 2. الترقيم المبسط (للموبايل فقط) --- */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center bg-[#1e2333] rounded-md hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50"
        >
          &lt;
        </button>
        
        <span className="font-semibold text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-[#1e2333] rounded-md hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;