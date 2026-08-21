'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PackageCard from '@/components/packages/PackageCard';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { packages } from '@/lib/data/packages';

const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'International'];

export default function FeaturedPackages() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages = activeFilter === 'All' 
    ? packages.slice(0, 6) 
    : packages.filter(pkg => pkg.category?.includes(activeFilter)).slice(0, 6);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F5A623] mb-2 block">
              Handpicked Destinations
            </span>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#1B2A4A] mb-2">
              Popular Tour Packages
            </h2>
            <p className="font-inter text-gray-500 text-xs sm:text-base max-w-xl mx-auto">
              From snow-capped mountains to sun-kissed beaches, explore India and beyond.
            </p>
          </div>
        </ScrollFadeUp>

        {/* Filter Chips */}
        <ScrollFadeUp>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-poppins text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === category 
                    ? 'bg-[#F5A623] text-white shadow-md shadow-orange-500/25 scale-105' 
                    : 'bg-[#EEF2FF] text-[#1B2A4A] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollFadeUp>

        {/* 2-Column on Mobile, 3-Column on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredPackages.map((pkg, index) => (
            <ScrollFadeUp key={pkg.id || index} delay={index * 0.05}>
              <PackageCard pkg={pkg} />
            </ScrollFadeUp>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <Link 
            href="/packages" 
            className="inline-flex items-center justify-center bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>View All 20 Packages →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
