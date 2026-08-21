'use client';

import React from 'react';
import { BsFuelPump, BsPeopleFill } from 'react-icons/bs';
import { Snowflake, ShieldCheck, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function CarCard({ car }: { car: any }) {
  const handleBook = () => {
    const message = `Hi Karuna Travels, I want to book the ${car.name} (${car.seating} Seater) for my trip. Please share availability and best price.`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <div className="group block w-full text-left">
      <div className="flex flex-col">
        {/* 1. Airbnb Car Photo Container */}
        <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 mb-2.5 sm:mb-3 shadow-xs group-hover:shadow-md transition-all duration-300">
          <PhotoPlaceholder label={car.name} slot={car.photoSlot} className="w-full h-full object-cover" />
          
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {car.category || 'AC Fleet'}
          </div>

          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-neutral-900/80 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#F5A623]" />
            <span>Verified</span>
          </div>
        </div>

        {/* 2. Airbnb Meta Section */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-poppins font-bold text-xs sm:text-base text-neutral-900 group-hover:text-[#F5A623] transition-colors line-clamp-1">
              {car.name}
            </h3>
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-600">
              ● Available
            </span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-2 mb-2 text-[11px] sm:text-xs text-neutral-500 font-medium">
            <span>{car.seating} Seats</span>
            <span>·</span>
            <span>{car.fuelType}</span>
            <span>·</span>
            <span>{car.ac ? 'AC' : 'Non-AC'}</span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-100 mb-2.5">
            <div>
              <span className="font-poppins font-black text-sm sm:text-base text-neutral-900">
                ₹{car.pricePerKm}
              </span>
              <span className="font-inter text-[11px] sm:text-xs text-neutral-500">
                {' '}/ km
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-neutral-500">
              ₹{car.pricePerDay} / day
            </span>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBook}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-poppins font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book on WhatsApp</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
