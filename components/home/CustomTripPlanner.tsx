'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Clock, IndianRupee, Sparkles, Send, ShieldCheck, CheckCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import toast from 'react-hot-toast';

export default function CustomTripPlanner() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('5-7 Days');
  const [travelers, setTravelers] = useState('2 Persons');
  const [travelDate, setTravelDate] = useState('');
  const [budget, setBudget] = useState('₹15,000 - ₹30,000 / person');
  const [customNote, setCustomNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.error('Please enter your destination preference');
      return;
    }

    const message = `Hi Just Tourism! I want to plan a custom holiday:
📍 Destination: ${destination}
⏱️ Duration: ${days}
👥 Travelers: ${travelers}
📅 Preferred Date: ${travelDate || 'Flexible'}
💰 Approximate Budget: ${budget}
${customNote ? `📝 Special Note: ${customNote}` : ''}

Please share a tailored itinerary and best package price!`;

    window.open(buildWhatsAppLink(message), '_blank');
    toast.success('Opening WhatsApp to send your trip details!');
  };

  return (
    <section id="planner" className="bg-[#071A3D] py-16 sm:py-20 px-3 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollFadeUp>
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Tailor-Made Holidays
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-5xl text-white mb-3">
              Plan Your Perfect Trip
            </h2>
            <p className="font-inter text-gray-300 text-xs sm:text-base max-w-xl mx-auto">
              Tell us your dream holiday preferences. Our travel experts will craft a personalized itinerary with sanitized cabs and verified stays in minutes.
            </p>
          </div>
        </ScrollFadeUp>

        {/* Interactive Custom Trip Form */}
        <ScrollFadeUp delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Destination */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Where do you want to go? *</span>
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kashmir, Manali, Kerala, Dubai..."
                  className="w-full px-4 py-3 bg-white text-neutral-900 placeholder-gray-400 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none"
                />
              </div>

              {/* 2. Duration */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>How many days?</span>
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-neutral-900 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none cursor-pointer"
                >
                  <option value="Weekend (2-3 Days)">Weekend (2-3 Days)</option>
                  <option value="4-5 Days">4 - 5 Days</option>
                  <option value="5-7 Days">5 - 7 Days (Popular)</option>
                  <option value="8-10 Days">8 - 10 Days</option>
                  <option value="10+ Days Long Tour">10+ Days Long Tour</option>
                </select>
              </div>

              {/* 3. Travellers */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>How many travellers?</span>
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-neutral-900 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none cursor-pointer"
                >
                  <option value="Solo (1 Person)">Solo (1 Person)</option>
                  <option value="2 Persons (Couple)">2 Persons (Couple)</option>
                  <option value="3-5 Persons (Family)">3-5 Persons (Family)</option>
                  <option value="6-10 Persons (Friends Group)">6-10 Persons (Friends Group)</option>
                  <option value="Corporate / Large Group">Corporate / Large Group</option>
                </select>
              </div>

              {/* 4. Travel Date */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Preferred Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-neutral-900 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none cursor-pointer"
                />
              </div>

              {/* 5. Approximate Budget */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Approximate Budget (per person)</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-neutral-900 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none cursor-pointer"
                >
                  <option value="Under ₹10,000 / person">Under ₹10,000 / person (Budget)</option>
                  <option value="₹10,000 - ₹20,000 / person">₹10,000 - ₹20,000 / person (Standard)</option>
                  <option value="₹20,000 - ₹35,000 / person">₹20,000 - ₹35,000 / person (Comfort)</option>
                  <option value="₹35,000 - ₹60,000 / person">₹35,000 - ₹60,000 / person (Premium)</option>
                  <option value="₹60,000+ / person (Luxury)">₹60,000+ / person (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                Special Requests or Preferences (Optional)
              </label>
              <textarea
                rows={2}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Honeymoon special room, 4x4 cab in snow, vegetarian meals, pickup from Delhi Airport..."
                className="w-full px-4 py-3 bg-white text-neutral-900 placeholder-gray-400 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F97316] outline-none resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" /> 100% Free Consultation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" /> Instant Response
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 text-white" />
                <span>Create My Trip</span>
              </button>
            </div>
          </form>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
