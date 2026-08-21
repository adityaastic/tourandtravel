'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, IndianRupee, Search, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import SkyParticles from '@/components/animations/SkyParticles';

const popularChips = [
  { label: '🏔️ Kashmir', slug: 'kashmir-7d6n' },
  { label: '❄️ Manali', slug: 'manali-6d5n' },
  { label: '🌴 Goa', slug: 'goa-5d4n' },
  { label: '🏰 Rajasthan', slug: 'rajasthan-8d7n' },
  { label: '🚗 Outstation Cabs', href: '/car-booking' },
];

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('Any Budget');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      router.push(`/packages?search=${encodeURIComponent(destination.trim())}`);
    } else {
      router.push('/packages');
    }
  };

  return (
    <section className="relative w-full min-h-[95vh] sm:min-h-screen overflow-hidden bg-[#071A3D] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
      {/* Background Cinematic Visual Imagery */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1920&auto=format&fit=crop"
          alt="Explore India with Just Tourism"
          className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-10000 hover:scale-110"
        />
        {/* Navy Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071A3D]/80 via-[#071A3D]/50 to-[#071A3D]" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#F97316]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SkyParticles />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex-1 flex flex-col justify-center items-center my-auto">
        
        {/* Brand Trust Badge */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5 text-white text-xs sm:text-sm font-medium shadow-lg shadow-black/20 mb-5"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-ping" />
          <span className="text-gray-200">Just Tourism</span>
          <span className="text-white/40">|</span>
          <span className="text-[#FB923C] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Handcrafted India & Global Journeys
          </span>
        </motion.div>

        {/* Primary Hero Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.08] mb-4 sm:mb-6"
        >
          Explore India.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#EA580C]">
            Create Memories.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-sm sm:text-lg md:text-xl text-gray-200/95 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 px-2"
        >
          Curated holidays, premium stays, reliable cabs and personalized travel experiences from Delhi.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 w-full mb-8"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/#planner"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-poppins font-semibold text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Plan My Trip</span>
          </Link>

          <a
            href="https://wa.me/919911209636?text=Hi%20Just%20Tourism!%20I%20want%20to%20plan%20a%20holiday."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>

        {/* Floating Travel Search & Planner Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl p-3 sm:p-4 shadow-2xl shadow-black/40 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 items-center">
            
            {/* 1. Destination */}
            <div className="bg-white rounded-2xl flex items-center px-3.5 py-2.5 shadow-inner">
              <MapPin className="text-[#F97316] w-4 h-4 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination (e.g. Kashmir)"
                className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-gray-400 font-medium focus:outline-none bg-transparent"
              />
            </div>

            {/* 2. Travel Date */}
            <div className="bg-white rounded-2xl flex items-center px-3.5 py-2.5 shadow-inner">
              <Calendar className="text-[#F97316] w-4 h-4 mr-2.5 flex-shrink-0" />
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full text-xs sm:text-sm text-[#0F172A] font-medium focus:outline-none bg-transparent cursor-pointer"
              />
            </div>

            {/* 3. Travellers */}
            <div className="bg-white rounded-2xl flex items-center px-3.5 py-2.5 shadow-inner">
              <Users className="text-[#F97316] w-4 h-4 mr-2.5 flex-shrink-0" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full text-xs sm:text-sm text-[#0F172A] font-medium focus:outline-none bg-transparent cursor-pointer"
              >
                <option value="1">1 Person (Solo)</option>
                <option value="2">2 Persons (Couple)</option>
                <option value="4">3-5 Persons (Family)</option>
                <option value="8">6-10 Persons (Group)</option>
                <option value="15">10+ Persons (Bus)</option>
              </select>
            </div>

            {/* 4. Budget */}
            <div className="bg-white rounded-2xl flex items-center px-3.5 py-2.5 shadow-inner">
              <IndianRupee className="text-[#F97316] w-4 h-4 mr-2 flex-shrink-0" />
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs sm:text-sm text-[#0F172A] font-medium focus:outline-none bg-transparent cursor-pointer"
              >
                <option value="Any Budget">Any Budget</option>
                <option value="Under ₹10k">Under ₹10,000</option>
                <option value="₹10k-₹25k">₹10,000 - ₹25,000</option>
                <option value="₹25k-₹50k">₹25,000 - ₹50,000</option>
                <option value="Luxury">₹50,000+ (Luxury)</option>
              </select>
            </div>

            {/* 5. Search CTA */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white py-3 px-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 font-poppins font-bold text-xs sm:text-sm active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Find My Trip</span>
            </button>
          </div>
        </motion.form>

        {/* Trending Destination Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto px-2"
        >
          <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mr-1 hidden sm:inline">
            Popular:
          </span>
          {popularChips.map((item) => (
            <Link
              key={item.label}
              href={item.slug ? `/packages/${item.slug}` : item.href || '/packages'}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#F97316] hover:text-white border border-white/15 text-gray-200 text-xs font-medium backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
