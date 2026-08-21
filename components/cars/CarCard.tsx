'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BsFuelPump, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all group justify-between"
    >
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <PhotoPlaceholder label={car.name} slot={car.photoSlot} />
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#0F1A2E]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md z-10 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5A623]" />
            <span>Verified</span>
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <h3 className="font-poppins font-bold text-sm sm:text-base md:text-lg text-gray-900 group-hover:text-[#F5A623] transition-colors line-clamp-1">
              {car.name}
            </h3>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase hidden sm:inline">
              {car.category || 'AC Cab'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 text-[10px] sm:text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 px-2 py-0.5 sm:py-1 rounded-md">
              <BsPeopleFill className="text-[#F5A623]" />
              <span>{car.seating}S</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 px-2 py-0.5 sm:py-1 rounded-md">
              <BsFuelPump className="text-[#F5A623]" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 px-2 py-0.5 sm:py-1 rounded-md">
              <Snowflake className="w-3 h-3 text-blue-500" />
              <span>{car.ac ? 'AC' : 'Non-AC'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-5 pt-0 sm:pt-0">
        <div className="pt-2 sm:pt-3 border-t border-gray-100 space-y-2">
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase">Rate</p>
              <p className="text-[#F5A623] font-extrabold text-sm sm:text-base font-poppins">
                ₹{car.pricePerKm}
                <span className="text-[9px] sm:text-xs font-normal text-gray-500">/km</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase">Day Cab</p>
              <p className="text-gray-900 font-bold text-xs sm:text-sm font-poppins">
                ₹{car.pricePerDay}
                <span className="text-[9px] sm:text-xs font-normal text-gray-500">/d</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white font-poppins font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 px-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book Cab</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
