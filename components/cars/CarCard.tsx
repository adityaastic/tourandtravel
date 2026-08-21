'use client';

import { motion } from 'framer-motion';
import { BsFuelPump, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
import { Snowflake } from 'lucide-react';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { SITE_CONFIG } from '@/lib/constants';

export default function CarCard({ car }: { car: any }) {
  const handleBook = () => {
    const message = `Hi, I'm interested in booking the ${car.name}. Could you provide more details?`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-[4/3]">
        <PhotoPlaceholder label={car.name} slot={car.photoSlot} />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-poppins font-semibold text-lg text-primary-navy mb-3">{car.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <BsPeopleFill className="text-accent-orange" />
            <span>{car.seating} Seater</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <BsFuelPump className="text-accent-orange" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <Snowflake className="w-3.5 h-3.5 text-accent-orange" />
            <span>{car.ac ? 'AC' : 'Non-AC'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features?.slice(0, 3).map((feature: string, i: number) => (
            <span key={i} className="text-xs bg-bg-section text-primary-navy px-2 py-1 rounded-full flex items-center gap-1">
              <BsCheckCircleFill className="text-success-green text-[10px]" /> {feature}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-accent-orange font-bold text-lg">₹{car.pricePerKm}<span className="text-sm font-normal text-gray-600">/km</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Daily rate</p>
              <p className="text-accent-orange font-bold">₹{car.pricePerDay}<span className="text-xs font-normal text-gray-600">/day</span></p>
            </div>
          </div>
          <button
            onClick={handleBook}
            className="w-full bg-primary-navy hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Book This Car</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
