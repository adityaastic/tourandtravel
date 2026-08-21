'use client';

import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🌍' },
  { id: 'mountains', label: 'Mountains', icon: '⛰️' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'wildlife', label: 'Wildlife', icon: '🦁' },
  { id: 'heritage', label: 'Heritage', icon: '🏰' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️' },
  { id: 'international', label: 'International', icon: '✈️' },
  { id: 'weekend getaway', label: 'Weekend Getaway', icon: '🎒' }
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'duration-asc', label: 'Duration: Short to Long' },
  { id: 'duration-desc', label: 'Duration: Long to Short' }
];

interface PackageFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
}

export default function PackageFilter({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange
}: PackageFilterProps) {
  return (
    <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md shadow-md rounded-xl px-4 py-4 md:px-6 md:py-3 w-full border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* Categories (Scrollable horizontally on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
        <Filter className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 hidden md:block" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0",
              activeCategory.toLowerCase() === cat.id.toLowerCase()
                ? "bg-[#F5A623] text-white shadow-md"
                : "bg-gray-100 text-[#1B2A4A] hover:bg-gray-200"
            )}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
        <ArrowUpDown className="w-4 h-4 text-gray-400" />
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-transparent border-none text-sm font-medium text-[#1B2A4A] focus:ring-0 cursor-pointer outline-none w-full md:w-auto appearance-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
