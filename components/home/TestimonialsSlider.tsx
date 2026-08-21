'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { testimonials } from '@/lib/data/testimonials';
import { Sparkles, ShieldCheck } from 'lucide-react';

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
    <section className="bg-white py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1.5 block">
              Verified Stories
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900 mb-2">
              Loved by Travellers Across India
            </h2>

            {/* Google Rating Trust Highlight */}
            <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-neutral-200/80 rounded-full px-4 py-1.5 mt-2 shadow-xs">
              <div className="flex text-[#F97316]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-900">4.9 / 5.0</span>
              <span className="text-[11px] text-neutral-500">· 500+ Verified Trips</span>
            </div>
          </div>
        </ScrollFadeUp>

        {/* Mobile Peek Carousel */}
        <div className="relative overflow-hidden py-2" ref={emblaRef}>
          <div className="flex -ml-3 sm:-ml-4">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={testimonial.id || idx} 
                className="pl-3 sm:pl-4 min-w-[80%] sm:min-w-[50%] lg:min-w-[33.333%] flex-shrink-0"
              >
                <div className="bg-[#F8FAFC] border border-neutral-200/70 rounded-3xl p-5 sm:p-7 h-full shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group">
                  <FaQuoteLeft className="text-[#F97316]/15 w-6 h-6 sm:w-8 sm:h-8 absolute top-4 right-4" />
                  
                  <div>
                    {/* Stars */}
                    <div className="flex items-center space-x-1 mb-3 text-[#F97316]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-3.5 h-3.5" />
                      ))}
                      <span className="text-xs font-bold text-neutral-800 ml-1">5.0</span>
                    </div>

                    {/* Review text */}
                    <p className="font-inter text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">
                      "{testimonial.review}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-neutral-200/60 mt-auto">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#071A3D] to-[#0D2A57] text-white flex items-center justify-center font-bold text-xs sm:text-sm font-poppins flex-shrink-0 shadow-xs">
                      {testimonial.name?.charAt(0) || 'T'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-neutral-900 truncate">
                        {testimonial.name}
                      </h4>
                      <p className="font-inter text-[10px] sm:text-xs text-neutral-500 truncate">
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
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === selectedIndex ? 'bg-[#F97316] w-6' : 'bg-neutral-200 hover:bg-neutral-300 w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
