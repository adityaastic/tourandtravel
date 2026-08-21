'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PackageCard from '@/components/packages/PackageCard';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { packages } from '@/lib/data/packages';
import { Mountain, Palmtree, Trees, Castle, Plane, Compass, Sparkles } from 'lucide-react';

const categories = [
  { label: 'All Trips', icon: Compass, filter: 'All' },
  { label: 'Mountains', icon: Mountain, filter: 'Mountains' },
  { label: 'Beaches', icon: Palmtree, filter: 'Beaches' },
  { label: 'Wildlife', icon: Trees, filter: 'Wildlife' },
  { label: 'Heritage', icon: Castle, filter: 'Heritage' },
  { label: 'International', icon: Plane, filter: 'International' },
];

export default function FeaturedPackages() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages = activeFilter === 'All' 
    ? packages.slice(0, 8) 
    : packages.filter(pkg => pkg.category?.includes(activeFilter)).slice(0, 8);

  return (
    <section className="bg-[#FFFFFF] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollFadeUp>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1 block">
                Curated Travel Collections
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900">
                Explore Top Getaways
              </h2>
            </div>
            <Link 
              href="/packages" 
              className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#F97316] underline underline-offset-4 transition-colors"
            >
              Show all 20 packages
            </Link>
          </div>
        </ScrollFadeUp>

        {/* Airbnb-style Iconic Category Filter Strip */}
        <ScrollFadeUp>
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-4 mb-8 custom-scrollbar scroll-smooth no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeFilter === cat.filter;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveFilter(cat.filter)}
                  className={`flex flex-col items-center gap-1.5 pb-2 border-b-2 transition-all flex-shrink-0 cursor-pointer group ${
                    isActive
                      ? 'border-neutral-900 text-neutral-900 font-bold'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700 hover:border-neutral-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-700'
                  }`} />
                  <span className="text-xs sm:text-sm whitespace-nowrap">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollFadeUp>

        {/* 2-Column Mobile, 4-Column Desktop Airbnb Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPackages.map((pkg, index) => (
            <ScrollFadeUp key={pkg.id || index} delay={index * 0.04}>
              <PackageCard pkg={pkg} />
            </ScrollFadeUp>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/packages" 
            className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 rounded-xl font-poppins font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>Show All 20 Destinations</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
