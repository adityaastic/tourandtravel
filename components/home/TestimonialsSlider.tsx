'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaStar } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { testimonials } from '@/lib/data/testimonials';

export default function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
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
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">💬 What Our Travelers Say</h2>
            <div className="w-24 h-1 bg-[#F5A623] mx-auto rounded-full"></div>
          </div>
        </ScrollFadeUp>

        <div className="relative overflow-hidden py-4" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id || idx} className="pl-4 min-w-full md:min-w-[50%] lg:min-w-[33.333%]">
                <div className="bg-[#EEF2FF]/50 backdrop-blur-md border border-gray-100 rounded-2xl p-8 h-full shadow-sm">
                  <div className="flex items-center space-x-1 mb-6 text-[#FCD34D]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="font-inter italic text-gray-600 mb-8 leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center space-x-4 mt-auto">
                    <PhotoPlaceholder label="Traveler" className="w-14 h-14 rounded-full object-cover shadow-md" />
                    <div>
                      <h4 className="font-poppins font-bold text-[#1B2A4A]">{testimonial.name}</h4>
                      <p className="font-inter text-sm text-gray-500">{testimonial.trip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? 'bg-[#F5A623] w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
