'use client';

import { useState, useEffect } from 'react'; 
import { FiX } from 'react-icons/fi';

interface FilterState {
  priceRange?: number;
  showAvailableOnly?: boolean;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedFilters: FilterState; 
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void; 
}

const FilterModal = ({ 
  isOpen, 
  onClose, 
  appliedFilters, 
  onApplyFilters, 
  onClearFilters 
}: FilterModalProps) => {

  const [priceRange, setPriceRange] = useState(50);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPriceRange(appliedFilters.priceRange ?? 50); 
      setShowAvailableOnly(appliedFilters.showAvailableOnly ?? false);
    }
  }, [isOpen, appliedFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters({ priceRange, showAvailableOnly });
    onClose();
  };

  const handleClear = () => {
    onClearFilters(); 
    onClose(); 
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-[#1e2333] rounded-lg shadow-xl p-6 w-full max-w-md relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-white">Filter Books</h3>

        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-white">Show Available Books Only</span>
          </label>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price Range (Up to: ${priceRange})
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleClear}
            className="w-1/2 bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Filters
          </button>
          <button
            onClick={handleApply}
            className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;