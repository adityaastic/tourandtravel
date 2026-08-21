'use client';

import React, { useState } from 'react';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import UrgencyBadge from '@/components/shared/UrgencyBadge';
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
    const message = `Hi Karuna Travels,\nI want to book the *${pkg.title}* package.\n\nDetails:\n- Date: ${travelDate || 'Not decided'}\n- Travelers: ${travelers}\n- Total Price Estimate: ₹${totalPrice.toLocaleString('en-IN')}\n\nPlease help me proceed.`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${SITE_CONFIG.phones[0]}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-100 sticky top-24">
      <div className="mb-6">
        <h3 className="text-xl font-poppins font-semibold text-[#1B2A4A] mb-1">{pkg.title}</h3>
        <p className="text-sm text-gray-500">{pkg.duration || `${pkg.days}D/${pkg.nights}N`}</p>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Starting from</p>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-poppins font-bold text-[#F5A623]">
            ₹{price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-gray-500 mb-1">/person</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="date" 
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
            <Users className="absolute left-3 w-5 h-5 text-gray-400" />
            <div className="w-full pl-10 pr-2 py-2 flex items-center justify-between">
              <span className="text-sm font-medium">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <button 
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-[#F5A623]"
                >-</button>
                <span className="w-4 text-center text-sm font-semibold">{travelers}</span>
                <button 
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-[#F5A623]"
                >+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EEF2FF] rounded-xl p-4 mb-6 flex justify-between items-center">
        <span className="font-semibold text-[#1B2A4A]">Total Price</span>
        <span className="font-poppins font-bold text-xl text-[#1B2A4A]">₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>

      <div className="space-y-3 mb-6">
        <button 
          onClick={handleBookWhatsApp}
          className="w-full bg-[#F5A623] hover:bg-[#E8921A] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2"
        >
          📱 Book on WhatsApp
        </button>
        <button 
          onClick={handleCall}
          className="w-full bg-white border-2 border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white font-semibold py-3 rounded-xl transition-all flex justify-center items-center gap-2"
        >
          📞 Call to Book
        </button>
      </div>

      <div className="mb-6">
        <UrgencyBadge text="🔥 8 people viewed this package today" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Free cancellation up to 48 hours</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Instant confirmation</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Best price guarantee</span>
        </div>
      </div>
    </div>
  );
}
