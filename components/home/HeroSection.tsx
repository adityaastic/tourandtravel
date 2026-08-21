'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Calendar, Users, Search, Star, Phone, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import SkyParticles from '@/components/animations/SkyParticles';

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      router.push(`/packages?search=${encodeURIComponent(destination.trim())}`);
    } else {
      router.push('/packages');
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] md:min-h-screen overflow-hidden bg-[#0F1A2E] flex flex-col justify-between pt-24 md:pt-28">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full object-cover opacity-60">
          <VideoPlaceholder label="Hero Promo Reel" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-[#0F1A2E]/80 to-[#0F1A2E]/40 z-10" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SkyParticles />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start space-y-6">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white font-inter text-xs md:text-sm shadow-sm"
            >
              <span className="text-[#F5A623]">✈️</span>
              <span className="font-medium">Delhi’s Most Trusted Travel Partner Since 2014</span>
            </motion.div>

            <motion.h1 
              className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-white">
                Explore The World
              </motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FCD34D] to-[#E8921A]">
                With Karuna Travels
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-inter text-base md:text-lg text-gray-200/90 max-w-2xl leading-relaxed"
            >
              <strong className="text-white font-semibold">Just Tourism</strong> — Explore · Travel · Enjoy. Handcrafted Himachal, Kashmir, Goa, Rajasthan tour packages & sanitized AC car rentals from Delhi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link 
                href="/packages" 
                className="inline-flex items-center space-x-2 bg-[#F5A623] hover:bg-[#E8921A] text-white px-7 py-3.5 rounded-xl font-poppins font-bold text-sm shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link 
                href="/car-booking" 
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white px-6 py-3.5 rounded-xl font-poppins font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              >
                <span>Book a Car</span>
              </Link>

              <a
                href="https://wa.me/919911209636?text=Hi%20Karuna%20Travels!%20I%20want%20to%20plan%20a%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-xl font-poppins font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 text-xs sm:text-sm font-inter pt-4 border-t border-white/15"
            >
              <div className="flex items-center space-x-1.5">
                <div className="flex text-[#FCD34D]">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-white">4.9 / 5</span>
                <span className="text-gray-300">Rating</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div>
                <span className="font-bold text-white">500+</span>
                <span className="text-gray-300 ml-1">Happy Travelers</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div>
                <span className="font-bold text-white">10+</span>
                <span className="text-gray-300 ml-1">Years of Trust</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Photo Stack */}
          <div className="hidden lg:flex w-[38%] relative justify-center items-center h-[420px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 -left-6 top-12"
            >
              <div className="transform -rotate-6 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl shadow-black/60 border border-white/20">
                <PhotoPlaceholder label="Manali" className="w-44 h-56 rounded-xl object-cover" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute z-30 top-0"
            >
              <div className="transform rotate-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl shadow-black/60 border border-white/20">
                <PhotoPlaceholder label="Goa Beaches" className="w-52 h-64 rounded-xl object-cover" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute z-20 right-0 top-20"
            >
              <div className="transform rotate-8 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl shadow-black/60 border border-white/20">
                <PhotoPlaceholder label="Kashmir Paradise" className="w-44 h-56 rounded-xl object-cover" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Hero Interactive Search Bar */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 w-full">
        <motion.form 
          onSubmit={handleSearch}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl p-3 sm:p-4 shadow-2xl shadow-black/40"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-center">
            
            {/* Field 1: Destination */}
            <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-inner">
              <MapPin className="text-[#F5A623] w-5 h-5 mr-3 flex-shrink-0" />
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to go? (Manali, Goa...)" 
                className="w-full text-xs sm:text-sm text-[#0F1A2E] placeholder-gray-400 font-inter font-medium focus:outline-none bg-transparent" 
              />
            </div>
            
            {/* Field 2: Date */}
            <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-inner">
              <Calendar className="text-[#F5A623] w-5 h-5 mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Travel Month / Date" 
                className="w-full text-xs sm:text-sm text-[#0F1A2E] placeholder-gray-400 font-inter font-medium focus:outline-none bg-transparent" 
              />
            </div>

            {/* Field 3: Travelers */}
            <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-inner">
              <Users className="text-[#F5A623] w-5 h-5 mr-3 flex-shrink-0" />
              <select className="w-full text-xs sm:text-sm text-[#0F1A2E] font-inter font-medium focus:outline-none bg-transparent cursor-pointer">
                <option value="1">1-2 Travelers (Couple/Solo)</option>
                <option value="4">3-5 Travelers (Family)</option>
                <option value="8">6-10 Travelers (Group)</option>
                <option value="15">10+ Travelers (Bus/Tempo)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#F5A623] to-[#E8921A] hover:from-[#E8921A] hover:to-[#D47E10] text-white py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 font-poppins font-bold text-sm active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Packages</span>
            </button>
          </div>
        </motion.form>
      </div>

    </section>
  );
}
