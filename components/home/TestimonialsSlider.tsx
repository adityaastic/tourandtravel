'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { testimonials } from '@/lib/data/testimonials';

export default function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F5A623] mb-1.5 block">
              Traveler Reviews
            </span>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#1B2A4A] mb-2">
              💬 What Our Travelers Say
            </h2>
            <div className="w-16 h-1 bg-[#F5A623] mx-auto rounded-full mt-2" />
          </div>
        </ScrollFadeUp>

        {/* Mobile Peek Carousel: Shows active card + next card peeking in */}
        <div className="relative overflow-hidden py-2" ref={emblaRef}>
          <div className="flex -ml-3 sm:-ml-4">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={testimonial.id || idx} 
                className="pl-3 sm:pl-4 min-w-[80%] sm:min-w-[50%] lg:min-w-[33.333%] flex-shrink-0"
              >
                <div className="bg-[#F8FAFF] border border-gray-200/70 rounded-2xl sm:rounded-3xl p-4 sm:p-7 h-full shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group">
                  <FaQuoteLeft className="text-[#F5A623]/20 w-6 h-6 sm:w-8 sm:h-8 absolute top-4 right-4" />
                  
                  <div>
                    {/* Stars */}
                    <div className="flex items-center space-x-1 mb-3 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ))}
                      <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
                    </div>

                    {/* Review text */}
                    <p className="font-inter text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">
                      "{testimonial.review}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-gray-100 mt-auto">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1B2A4A] to-[#2D4A7A] text-white flex items-center justify-center font-bold text-xs sm:text-sm font-poppins flex-shrink-0 shadow-sm">
                      {testimonial.name?.charAt(0) || 'T'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#1B2A4A] truncate">
                        {testimonial.name}
                      </h4>
                      <p className="font-inter text-[10px] sm:text-xs text-gray-400 truncate">
                        {testimonial.trip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === selectedIndex ? 'bg-[#F5A623] w-6 sm:w-8' : 'bg-gray-200 hover:bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
