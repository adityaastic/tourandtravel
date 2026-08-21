'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Search, Star, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import SkyParticles from '@/components/animations/SkyParticles';

const quickDestinations = [
  { label: '🏔️ Manali', slug: 'manali-6d5n' },
  { label: '❄️ Kashmir', slug: 'kashmir-7d6n' },
  { label: '🌴 Goa', slug: 'goa-5d4n' },
  { label: '🚗 Delhi Cabs', href: '/car-booking' },
  { label: '🏰 Rajasthan', slug: 'rajasthan-8d7n' },
  { label: '🌿 Kerala', slug: 'kerala-7d6n' },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/packages');
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-[#0A1120] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
      {/* Background Ambience & Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full object-cover opacity-35 sm:opacity-50">
          <VideoPlaceholder label="Hero Promo Reel" />
        </div>
        {/* Modern Radial Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/80 via-[#0A1120]/60 to-[#0A1120] z-10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F5A623]/20 rounded-full blur-3xl z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl z-10" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SkyParticles />
      </div>

      {/* Main Hero Body */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex-1 flex flex-col justify-center items-center my-auto">
        
        {/* 1. Gen-Z Pill Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5 text-white text-xs sm:text-sm font-medium shadow-lg shadow-black/20 mb-5 transition-all"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#F5A623] animate-ping" />
          <span className="text-gray-200">Just Tourism · Delhi</span>
          <span className="text-white/40">|</span>
          <span className="text-[#FCD34D] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Explore · Travel · Enjoy
          </span>
        </motion.div>

        {/* 2. Punchy, Minimal Gen-Z Headline (No Dense Text) */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.08] mb-4 sm:mb-6"
        >
          Travel More.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FCD34D] to-[#E8921A]">
            Worry Less.
          </span>
        </motion.h1>

        {/* 3. Clean 1-Line Sober Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-sm sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 px-2"
        >
          Curated mountain escapes, beach holidays & clean sanitized cabs from Delhi. Zero hassle, best price guaranteed.
        </motion.p>

        {/* 4. Minimalist Floating Search Pill (Airbnb Style) */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-xl mx-auto mb-6"
        >
          <div className="bg-white/15 backdrop-blur-2xl border border-white/30 hover:border-[#F5A623]/70 rounded-full p-2 sm:p-2.5 shadow-2xl shadow-black/50 flex items-center gap-2 transition-all group focus-within:ring-2 focus-within:ring-[#F5A623]/80">
            <div className="pl-3.5 text-[#F5A623] flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where next? e.g. Manali, Goa, Kashmir..."
              className="w-full bg-transparent text-white placeholder-gray-300/80 text-sm sm:text-base font-medium focus:outline-none px-2"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F5A623] to-[#E8921A] hover:from-[#E8921A] hover:to-[#D47E10] text-white p-3 sm:px-6 sm:py-3 rounded-full font-poppins font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/30 flex-shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.form>

        {/* 5. Gen-Z Quick Tap Destination Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 max-w-2xl mx-auto mb-8 px-2"
        >
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Trending:
          </span>
          {quickDestinations.map((item) => (
            <Link
              key={item.label}
              href={item.slug ? `/packages/${item.slug}` : item.href || '/packages'}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#F5A623] hover:text-white border border-white/15 text-gray-200 text-xs font-medium backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>

        {/* 6. Clean CTAs & WhatsApp */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3.5 w-full"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8921A] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore All 20 Trips</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/car-booking"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-poppins font-semibold text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Book Clean Cab</span>
          </Link>

          <a
            href="https://wa.me/919911209636?text=Hi%20Karuna%20Travels!%20I%20want%20to%20plan%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat 24/7</span>
          </a>
        </motion.div>
      </div>

      {/* 7. Sober Minimalist Trust Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-20 max-w-4xl mx-auto px-4 w-full pt-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/80 text-xs sm:text-sm font-inter">
          <div className="flex items-center gap-1.5">
            <div className="flex text-[#FCD34D]">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-white">4.9/5</span>
            <span className="text-gray-400">Rating</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />

          <div>
            <span className="font-bold text-white">500+</span>
            <span className="text-gray-400 ml-1">Happy Travelers</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />

          <div>
            <span className="font-bold text-white">10+ Years</span>
            <span className="text-gray-400 ml-1">Delhi Office</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />

          <div>
            <span className="text-emerald-400 font-semibold">✓ 100% Verified Cabs</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
