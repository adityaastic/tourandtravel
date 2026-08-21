'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import CarCard from '@/components/cars/CarCard';
import { cars } from '@/lib/data/cars';

export default function CarFleetPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="bg-white py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1 block">
                Sanitized AC Fleet
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900">
                Travel Comfortably
              </h2>
              <p className="font-inter text-neutral-500 text-xs sm:text-base mt-1">
                Sedans, SUVs, Premium Innovas and Tempo Travellers with professional drivers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex gap-2">
                <button 
                  onClick={scrollPrev} 
                  className="p-2.5 rounded-full bg-neutral-100 text-neutral-800 hover:bg-[#F97316] hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Car"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={scrollNext} 
                  className="p-2.5 rounded-full bg-neutral-100 text-neutral-800 hover:bg-[#F97316] hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Car"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link
                href="/car-booking"
                className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#F97316] underline underline-offset-4 transition-colors"
              >
                View all 15 cabs →
              </Link>
            </div>
          </div>
        </ScrollFadeUp>

        {/* Swipeable Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-3 sm:-ml-4">
              {cars.slice(0, 8).map((car, idx) => (
                <div 
                  key={car.id || idx} 
                  className="pl-3 sm:pl-4 min-w-[55%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[23%] flex-shrink-0"
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
