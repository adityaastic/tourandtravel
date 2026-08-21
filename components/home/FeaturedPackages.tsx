'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { packages } from '@/lib/data/packages';

const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'International'];

export default function FeaturedPackages() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages = activeFilter === 'All' 
    ? packages.slice(0, 6) 
    : packages.filter(pkg => pkg.category?.includes(activeFilter)).slice(0, 6);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">🌟 Our Handpicked Destinations</h2>
            <p className="font-inter text-gray-600 text-lg">From snow-capped mountains to sun-kissed beaches</p>
          </div>
        </ScrollFadeUp>

        <ScrollFadeUp>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-poppins font-medium transition-colors duration-300 ${
                  activeFilter === category 
                    ? 'bg-[#F5A623] text-white shadow-md' 
                    : 'bg-[#EEF2FF] text-[#1B2A4A] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollFadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <ScrollFadeUp key={pkg.id || index} delay={index * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden shadow-lg bg-white block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <PhotoPlaceholder label={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-[#1B2A4A]">
                    {pkg.category?.[0] || 'Tour'}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#1B2A4A]/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-white">
                    {pkg.duration}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-white font-poppins text-2xl font-bold mb-2">{pkg.title}</h3>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-300 text-sm mb-1">Starting from</p>
                        <p className="text-[#FCD34D] font-bold text-xl">₹{pkg.startingPrice}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/40 px-2 py-1 rounded">
                        <FaStar className="text-[#F5A623] w-4 h-4" />
                        <span className="text-white text-sm font-bold">{pkg.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal Link */}
                <div className="absolute inset-x-0 bottom-0 bg-[#F5A623] text-center py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link href={`/packages/${pkg.slug || pkg.id}`} className="font-poppins font-bold text-white flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/packages" className="inline-flex items-center justify-center bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white px-8 py-4 rounded-lg font-poppins font-semibold text-lg transition-colors duration-300">
            View All Packages →
          </Link>
        </div>
      </div>
    </section>
  );
}
