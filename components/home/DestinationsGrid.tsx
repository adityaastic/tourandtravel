'use client';

import React from 'react';
import Link from 'next/link';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

const destinations = [
  { id: 'kashmir-7d6n', name: 'Kashmir', subtitle: 'Paradise on Earth', span: 'col-span-2 md:col-span-2 row-span-1 md:row-span-2' },
  { id: 'goa-5d4n', name: 'Goa', subtitle: 'Beaches & Nightlife', span: 'col-span-1 row-span-1' },
  { id: 'shimla-4d3n', name: 'Shimla', subtitle: 'Queen of Hills', span: 'col-span-1 row-span-1' },
  { id: 'rajasthan-8d7n', name: 'Rajasthan', subtitle: 'Royal Forts', span: 'col-span-1 row-span-1' },
  { id: 'jim-corbett-3d2n', name: 'Jim Corbett', subtitle: 'Jungle Safari', span: 'col-span-1 row-span-1' },
  { id: 'kerala-7d6n', name: 'Kerala', subtitle: 'God’s Own Country', span: 'col-span-2 md:col-span-2 row-span-1' },
];

export default function DestinationsGrid() {
  return (
    <section className="bg-[#F8FAFF] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F5A623] mb-1.5 block">
              Top Picks
            </span>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#1B2A4A] mb-2">
              📍 Destinations We ❤️
            </h2>
            <p className="font-inter text-gray-500 text-xs sm:text-base max-w-lg mx-auto">
              Explore the most loved places across India with curated itineraries
            </p>
          </div>
        </ScrollFadeUp>

        {/* 2-Column Mobile Grid / 4-Column Desktop Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:h-[540px]">
          {destinations.map((dest, idx) => (
            <div 
              key={dest.id} 
              className={`${dest.span} relative rounded-2xl sm:rounded-3xl overflow-hidden group h-36 sm:h-48 md:h-auto shadow-xs hover:shadow-xl transition-all`}
            >
              <ScrollFadeUp delay={idx * 0.05} className="h-full w-full">
                <Link href={`/packages/${dest.id}`} className="block h-full w-full relative">
                  <PhotoPlaceholder 
                    label={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/90 via-[#0F1A2E]/35 to-transparent" />
                  
                  <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-end items-start">
                    <span className="text-[10px] sm:text-xs text-[#F5A623] font-semibold tracking-wider uppercase hidden sm:block">
                      {dest.subtitle}
                    </span>
                    <h3 className="font-poppins font-extrabold text-sm sm:text-xl md:text-2xl text-white mb-0.5 sm:mb-1 group-hover:text-[#F5A623] transition-colors leading-tight">
                      {dest.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-white/90 text-[10px] sm:text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              </ScrollFadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
