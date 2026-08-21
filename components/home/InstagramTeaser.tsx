'use client';

import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { Sparkles, Camera } from 'lucide-react';

const galleryItems = [
  { label: 'Kashmir Paradise', slot: 'kashmir' },
  { label: 'Goa Coastline', slot: 'goa' },
  { label: 'Manali Mountains', slot: 'manali' },
  { label: 'Rajasthan Heritage', slot: 'rajasthan' },
  { label: 'Kerala Backwaters', slot: 'kerala' },
  { label: 'Ladakh High Passes', slot: 'ladakh' },
];

export default function InstagramTeaser() {
  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollFadeUp>
          <div className="inline-flex items-center gap-2 mb-2 text-[#F97316]">
            <Camera className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Visual Travel Journal</span>
          </div>

          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900 mb-2">
            Follow Our Journeys
          </h2>
          <p className="font-inter text-neutral-500 text-xs sm:text-base mb-8">
            <span className="font-semibold text-neutral-800">@justtourism</span> · Real traveler moments captured across India
          </p>
        </ScrollFadeUp>

        {/* 6-Photo Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mb-8">
          {galleryItems.map((item, idx) => (
            <ScrollFadeUp key={item.label} delay={idx * 0.04}>
              <a 
                href="https://instagram.com/justtourism" 
                target="_blank" 
                rel="noreferrer"
                className="block relative aspect-square group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-lg transition-all"
              >
                <PhotoPlaceholder label={item.label} slot={item.slot} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center p-2 text-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1">
                    <FaInstagram className="text-white w-6 h-6" />
                    <span className="text-[10px] text-white font-semibold font-poppins">{item.label}</span>
                  </div>
                </div>
              </a>
            </ScrollFadeUp>
          ))}
        </div>

        <ScrollFadeUp>
          <a 
            href="https://instagram.com/justtourism"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3 rounded-full font-poppins font-bold text-xs shadow-md shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FaInstagram className="w-4 h-4" />
            <span>Follow @justtourism</span>
          </a>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
