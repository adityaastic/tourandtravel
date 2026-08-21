'use client';

import React from 'react';
import Link from 'next/link';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

const destinations = [
  { id: 'kashmir', name: 'Kashmir', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 'goa', name: 'Goa', span: 'col-span-1 row-span-1' },
  { id: 'shimla', name: 'Shimla', span: 'col-span-1 row-span-1' },
  { id: 'rajasthan', name: 'Rajasthan', span: 'col-span-1 row-span-1' },
  { id: 'jim-corbett', name: 'Jim Corbett', span: 'col-span-1 row-span-1' },
  { id: 'kerala', name: 'Kerala', span: 'col-span-1 md:col-span-2 row-span-1' },
];

export default function DestinationsGrid() {
  return (
    <section className="bg-[#F8FAFF] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">📍 Destinations We ❤️</h2>
            <p className="font-inter text-gray-600 text-lg">Explore the most loved places across India</p>
          </div>
        </ScrollFadeUp>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:h-[600px]">
          {destinations.map((dest, idx) => (
            <div key={dest.id} className={`${dest.span} relative rounded-2xl overflow-hidden group h-64 md:h-auto`}>
              <ScrollFadeUp delay={idx * 0.1} className="h-full">
                <PhotoPlaceholder label={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/80 via-[#0F1A2E]/20 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                  <h3 className="font-poppins font-bold text-2xl text-white mb-2">{dest.name}</h3>
                  <Link 
                    href={`/packages/${dest.id}`}
                    className="inline-flex items-center space-x-2 text-white/0 group-hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium font-inter"
                  >
                    <span>Explore</span>
                    <span>→</span>
                  </Link>
                </div>
              </ScrollFadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
