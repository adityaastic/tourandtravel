'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { Users, Fuel, Snowflake, ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { cars } from '@/lib/data/cars';

export default function CarFleetPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">🚗 Our Premium Car Fleet</h2>
              <p className="font-inter text-gray-600 text-lg">AC vehicles, professional drivers, on-time guarantee</p>
            </div>
            <div className="hidden md:flex space-x-4 mt-4 md:mt-0">
              <button onClick={scrollPrev} className="p-3 rounded-full bg-[#EEF2FF] text-[#1B2A4A] hover:bg-[#F5A623] hover:text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={scrollNext} className="p-3 rounded-full bg-[#EEF2FF] text-[#1B2A4A] hover:bg-[#F5A623] hover:text-white transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </ScrollFadeUp>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {cars.map((car, idx) => (
                <div key={car.id || idx} className="pl-4 min-w-full md:min-w-[50%] lg:min-w-[25%] flex-shrink-0">
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                    <div className="aspect-[4/3] w-full relative">
                      <PhotoPlaceholder label={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-poppins font-bold text-xl text-[#1B2A4A] mb-4">{car.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center space-x-2 text-gray-600 font-inter text-sm">
                          <Users className="w-4 h-4 text-[#F5A623]" />
                          <span>{car.seating} Seats</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 font-inter text-sm">
                          <Fuel className="w-4 h-4 text-[#F5A623]" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 font-inter text-sm">
                          <Snowflake className="w-4 h-4 text-[#F5A623]" />
                          <span>{car.ac ? 'AC' : 'Non-AC'}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-500 text-sm">Starting from</span>
                          <span className="font-bold text-xl text-[#F5A623]">₹{car.pricePerKm}/km</span>
                        </div>
                        <a 
                          href={`https://wa.me/919911209636?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(car.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full block text-center bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-lg font-poppins font-semibold transition-colors"
                        >
                          Book This Car
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/car-booking" className="inline-block text-[#1B2A4A] font-poppins font-semibold hover:text-[#F5A623] transition-colors">
            View All Cars →
          </Link>
        </div>
      </div>
    </section>
  );
}
