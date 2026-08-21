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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <PhotoPlaceholder label={car.name} slot={car.photoSlot} />
        <div className="absolute top-3 right-3 bg-[#0F1A2E]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
          <span>Verified Driver</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-poppins font-bold text-lg text-gray-900 group-hover:text-[#F5A623] transition-colors">
              {car.name}
            </h3>
            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md uppercase">
              {car.category || 'Premium'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/70 px-2.5 py-1 rounded-lg">
              <BsPeopleFill className="text-[#F5A623]" />
              <span>{car.seating} Seater</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/70 px-2.5 py-1 rounded-lg">
              <BsFuelPump className="text-[#F5A623]" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/70 px-2.5 py-1 rounded-lg">
              <Snowflake className="w-3.5 h-3.5 text-blue-500" />
              <span>{car.ac ? 'AC Sanitized' : 'Non-AC'}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {car.features?.slice(0, 3).map((feature: string, i: number) => (
              <span key={i} className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <BsCheckCircleFill className="text-emerald-500 text-[10px]" /> {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Outstation Rate</p>
              <p className="text-[#F5A623] font-extrabold text-xl font-poppins">
                ₹{car.pricePerKm}
                <span className="text-xs font-normal text-gray-500"> / km</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Full Day Cab</p>
              <p className="text-gray-900 font-bold text-base font-poppins">
                ₹{car.pricePerDay}
                <span className="text-xs font-normal text-gray-500"> / day</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white font-poppins font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-95"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-400" />
            <span>Book on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
