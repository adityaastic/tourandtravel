'use client';

import { cn } from '@/lib/utils';

interface TabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (cat: string) => void;
}

export default function CarCategoryTabs({ categories, activeCategory, onChange }: TabsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-colors text-sm",
            activeCategory === cat
              ? "bg-accent-orange text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
