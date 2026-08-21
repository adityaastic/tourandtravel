'use client';

import React from 'react';
import Link from 'next/link';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
  { 
    id: 'kashmir-7d6n', 
    name: 'Kashmir', 
    subtitle: 'Paradise on Earth · Houseboats & Snow Peaks', 
    price: '₹22,999',
    span: 'col-span-2 md:col-span-2 row-span-1 md:row-span-2' 
  },
  { 
    id: 'manali-6d5n', 
    name: 'Manali', 
    subtitle: 'Solang Valley & Rohtang Pass', 
    price: '₹14,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'shimla-4d3n', 
    name: 'Shimla', 
    subtitle: 'Queen of Hills & Kufri', 
    price: '₹8,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'goa-5d4n', 
    name: 'Goa', 
    subtitle: 'Beaches, Cruises & Nightlife', 
    price: '₹14,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'rajasthan-8d7n', 
    name: 'Rajasthan', 
    subtitle: 'Royal Forts & Desert Safaris', 
    price: '₹18,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'jim-corbett-3d2n', 
    name: 'Jim Corbett', 
    subtitle: 'Wildlife Safari & Jungle Stay', 
    price: '₹9,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'ladakh-8d7n', 
    name: 'Ladakh', 
    subtitle: 'Pangong Lake & Khardung La', 
    price: '₹28,999',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 'kerala-7d6n', 
    name: 'Kerala', 
    subtitle: 'Backwaters, Tea Hills & Ayurveda', 
    price: '₹24,999',
    span: 'col-span-2 md:col-span-2 row-span-1' 
  },
];

export default function DestinationsGrid() {
  return (
    <section className="bg-[#F8FAFC] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <ScrollFadeUp>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1 block">
                Top Destinations
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900">
                Explore Popular Destinations
              </h2>
              <p className="font-inter text-neutral-500 text-xs sm:text-base mt-1">
                Discover India's most beautiful places with Just Tourism.
              </p>
            </div>

            <Link
              href="/packages"
              className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#F97316] underline underline-offset-4 transition-colors"
            >
              View all destinations →
            </Link>
          </div>
        </ScrollFadeUp>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:h-[620px]">
          {destinations.map((dest, idx) => (
            <div 
              key={dest.id} 
              className={`${dest.span} relative rounded-2xl sm:rounded-3xl overflow-hidden group h-40 sm:h-52 md:h-auto shadow-xs hover:shadow-xl transition-all`}
            >
              <ScrollFadeUp delay={idx * 0.04} className="h-full w-full">
                <Link href={`/packages/${dest.id}`} className="block h-full w-full relative">
                  <PhotoPlaceholder 
                    label={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-[#071A3D]/30 to-transparent" />
                  
                  {/* Price Tag Pill */}
                  <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    From {dest.price}
                  </div>

                  <div className="absolute inset-0 p-3.5 sm:p-5 flex flex-col justify-end items-start">
                    <span className="text-[10px] sm:text-xs text-[#FB923C] font-semibold tracking-wider uppercase hidden sm:block">
                      {dest.subtitle}
                    </span>
                    <h3 className="font-poppins font-black text-base sm:text-xl md:text-2xl text-white mb-0.5 sm:mb-1 group-hover:text-[#F97316] transition-colors leading-tight">
                      {dest.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-white/90 text-[10px] sm:text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
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
