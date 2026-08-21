'use client';

import React, { useState } from 'react';
import { Calendar, Users, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { SITE_CONFIG } from '@/lib/constants';

interface PackageBookingSidebarProps {
  pkg: any;
}

export default function PackageBookingSidebar({ pkg }: PackageBookingSidebarProps) {
  const [travelDate, setTravelDate] = useState<string>('');
  const [travelers, setTravelers] = useState<number>(2);

  const price = pkg.startingPrice || 0;
  const totalPrice = price * travelers;
  
  const handleBookWhatsApp = () => {
    const message = `Hi Just Tourism! I want to book the *${pkg.title}* package (${pkg.duration || 'Holiday'}).
Details:
- Date: ${travelDate || 'Flexible'}
- Travelers: ${travelers}
- Est. Price: ₹${totalPrice.toLocaleString('en-IN')}

Please share itinerary details and confirm booking!`;

    window.open(buildWhatsAppLink(message), '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${SITE_CONFIG.phones[0]}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-xl sticky top-24 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F97316] bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
          <Sparkles className="w-3 h-3" /> Handpicked Journey
        </span>
        <h3 className="text-xl font-poppins font-black text-neutral-900 leading-tight">{pkg.title}</h3>
        <p className="text-xs text-neutral-500 font-medium">{pkg.duration}</p>
      </div>

      <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-neutral-100 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Starting Price</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-poppins font-black text-[#F97316]">
              ₹{price ? price.toLocaleString('en-IN') : 'Get Best Price'}
            </span>
            {price > 0 && <span className="text-xs text-neutral-500">/person</span>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
            Travel Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F97316]" />
            <input 
              type="date" 
              value={travelDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#F97316] outline-none text-xs font-semibold text-neutral-900 bg-neutral-50 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
            Number of Travelers
          </label>
          <div className="relative flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F97316]" />
              <span className="text-xs font-bold text-neutral-900">{travelers} {travelers === 1 ? 'Person' : 'Persons'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-xs font-bold text-neutral-700 hover:text-[#F97316] cursor-pointer"
              >-</button>
              <span className="w-5 text-center text-xs font-bold">{travelers}</span>
              <button 
                type="button"
                onClick={() => setTravelers(travelers + 1)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-xs font-bold text-neutral-700 hover:text-[#F97316] cursor-pointer"
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {price > 0 && (
        <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-sm font-bold">
          <span className="text-neutral-600">Total Est. Price:</span>
          <span className="text-[#071A3D] text-lg font-poppins">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      )}

      <div className="space-y-2.5">
        <button
          onClick={handleBookWhatsApp}
          className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3.5 rounded-2xl font-poppins font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95 cursor-pointer"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span>Get Best Price on WhatsApp</span>
        </button>

        <button
          onClick={handleCall}
          className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 rounded-2xl font-poppins font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Call: +91-9911209636</span>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 font-medium">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Instant WhatsApp confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Transparent pricing · No hidden fees</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Sanitized cabs & verified stays</span>
        </div>
      </div>
    </div>
  );
}
