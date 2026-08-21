'use client';

import React from 'react';
import { Snowflake, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function CarCard({ car }: { car: any }) {
  const isAvailable = car.isAvailable !== false && car.status !== 'Booked' && car.status !== 'Maintenance';

  const handleBook = () => {
    const message = `Hi Just Tourism! I want to book the *${car.name}* (${car.seating} Seater ${car.category || 'AC Cab'}).
Rate: ₹${car.pricePerKm}/km (₹${car.pricePerDay}/day).

Please check availability for my trip!`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <div className="group bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden hover:-translate-y-0.5">
      
      <div>
        {/* 1. Sleek Compact Vehicle Image Container (Reduced Height) */}
        <div className="relative h-28 sm:h-36 md:h-40 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 mb-2.5 shadow-inner">
          <PhotoPlaceholder 
            label={car.name} 
            slot={car.photoSlot} 
            aspectRatio="16/9"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

          {/* Top Left: Category Badge */}
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-[#071A3D] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {car.category || 'AC Cab'}
          </div>

          {/* Top Right: AC Pill */}
          <div className="absolute top-2 right-2 bg-[#071A3D]/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
            <Snowflake className="w-2.5 h-2.5 text-[#FB923C]" />
            <span>AC</span>
          </div>

          {/* Bottom Overlay: Seating & Transmission */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium">
            <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <Users className="w-3 h-3 text-[#F97316]" />
              <span>{car.seating} Seater</span>
            </span>
            <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px]">
              {car.transmission || 'Manual'}
            </span>
          </div>
        </div>

        {/* 2. Title & Feature Tags */}
        <div className="px-0.5 sm:px-1">
          <h3 className="font-poppins font-black text-xs sm:text-sm text-neutral-900 group-hover:text-[#F97316] transition-colors line-clamp-1 leading-tight mb-1">
            {car.name}
          </h3>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center gap-1 mb-2">
            <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">
              ⛽ {car.fuelType}
            </span>
            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Rates & Booking Action */}
      <div className="px-0.5 sm:px-1 pt-1.5 border-t border-neutral-100 mt-auto">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-poppins font-black text-sm sm:text-base text-[#F97316]">
                ₹{car.pricePerKm}
              </span>
              <span className="font-inter text-[10px] text-neutral-500 font-semibold">
                / km
              </span>
            </div>
            <span className="text-[9px] text-neutral-400 block font-medium">
              ₹{car.pricePerDay}/day (min {car.minimumKm || 250}km)
            </span>
          </div>

          <span className="text-[9px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
            Outstation
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBook}
          className="w-full bg-[#071A3D] hover:bg-[#F97316] text-white font-poppins font-bold text-[10px] sm:text-xs py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs group-hover:shadow-md"
        >
          <FaWhatsapp className="w-3 h-3 text-[#10B981] group-hover:text-white transition-colors" />
          <span>Book Cab</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
