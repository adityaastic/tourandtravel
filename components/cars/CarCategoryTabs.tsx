'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (cat: string) => void;
}

const categoryIcons: Record<string, string> = {
  'All Cars': '🚗',
  'Hatchbacks': '⚡',
  'Sedans & MUVs': '🚙',
  'SUVs': '🏔️',
  'Premium SUVs': '👑',
};

export default function CarCategoryTabs({ categories, activeCategory, onChange }: TabsProps) {
  return (
    <div className="flex items-center overflow-x-auto pb-2 gap-2 custom-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const icon = categoryIcons[cat] || '🚗';

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              "whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full font-poppins font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs",
              isActive
                ? "bg-[#071A3D] text-white shadow-md shadow-slate-900/20"
                : "bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80"
            )}
          >
            <span>{icon}</span>
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
