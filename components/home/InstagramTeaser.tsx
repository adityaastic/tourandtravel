'use client';

import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

export default function InstagramTeaser() {
  return (
    <section className="bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollFadeUp>
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white">
              <FaInstagram className="w-6 h-6" />
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#1B2A4A]">
              📸 Follow Our Journey
            </h2>
          </div>
          <p className="font-inter text-gray-600 mb-12">@karunatravels | Tag us to get featured</p>
        </ScrollFadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mb-12">
          {[...Array(6)].map((_, idx) => (
            <ScrollFadeUp key={idx} delay={idx * 0.1}>
              <a 
                href="https://instagram.com/karunatravels" 
                target="_blank" 
                rel="noreferrer"
                className="block relative aspect-square group overflow-hidden rounded-xl"
              >
                <PhotoPlaceholder label={`Insta ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <FaInstagram className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 w-8 h-8" />
                </div>
              </a>
            </ScrollFadeUp>
          ))}
        </div>

        <ScrollFadeUp>
          <a 
            href="https://instagram.com/karunatravels"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 bg-[#F5A623] hover:bg-[#E8921A] text-white px-8 py-3 rounded-full font-poppins font-semibold transition-colors duration-300"
          >
            <FaInstagram className="w-5 h-5" />
            <span>Follow on Instagram</span>
          </a>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
