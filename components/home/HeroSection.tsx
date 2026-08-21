'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Users, Search, Star } from 'lucide-react';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import SkyParticles from '@/components/animations/SkyParticles';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0F1A2E]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full object-cover opacity-70">
          <VideoPlaceholder label="Hero Promo Reel" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A2E]/90 to-transparent z-10" />
      </div>

      <div className="absolute inset-0 z-10">
        <SkyParticles />
      </div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start space-y-6">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white font-inter text-sm"
            >
              <span>✈️</span>
              <span>India’s Most Trusted Travel Partner</span>
            </motion.div>

            <motion.h1 
              className="font-poppins font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-white">
                Explore the World
              </motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block text-[#F5A623]">
                with Karuna Travels
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-inter text-lg text-white/90 max-w-2xl"
            >
              Just Tourism — Explore · Travel · Enjoy | Delhi’s Premier Travel Agency
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/packages" className="inline-flex items-center space-x-2 bg-[#F5A623] hover:bg-[#E8921A] text-white px-6 py-3 rounded-lg font-poppins font-semibold transition-colors duration-300">
                <span>Explore Packages</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/car-booking" className="inline-flex items-center space-x-2 border-2 border-white hover:bg-white hover:text-[#0F1A2E] text-white px-6 py-3 rounded-lg font-poppins font-semibold transition-colors duration-300">
                <span>Book a Car</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center space-x-6 text-white text-sm font-inter mt-8 border-t border-white/20 pt-6"
            >
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-[#FCD34D] fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <span>500+ Happy Travelers</span>
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <span>10+ Years</span>
            </motion.div>
          </div>

          {/* Right Content - Photo Cards */}
          <div className="hidden lg:flex w-[40%] relative justify-center items-center h-[500px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 -left-12 top-20"
            >
              <div className="transform -rotate-8 bg-white p-2 rounded-xl shadow-2xl shadow-black/40">
                <PhotoPlaceholder label="Manali" className="w-48 h-64 rounded-lg object-cover" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-30 top-10"
            >
              <div className="transform rotate-0 bg-white p-2 rounded-xl shadow-2xl shadow-black/40">
                <PhotoPlaceholder label="Goa" className="w-56 h-72 rounded-lg object-cover" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute z-20 right-0 top-32"
            >
              <div className="transform rotate-8 bg-white p-2 rounded-xl shadow-2xl shadow-black/40">
                <PhotoPlaceholder label="Kashmir" className="w-48 h-64 rounded-lg object-cover" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Hero Search Bar */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center z-30 translate-y-1/2 px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-5xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full bg-white rounded-lg flex items-center px-4 py-3">
              <MapPin className="text-[#F5A623] w-5 h-5 mr-3" />
              <input type="text" placeholder="Where to go?" className="w-full text-[#0F1A2E] placeholder-gray-500 font-inter focus:outline-none" />
            </div>
            
            <div className="flex-1 w-full bg-white rounded-lg flex items-center px-4 py-3">
              <Calendar className="text-[#F5A623] w-5 h-5 mr-3" />
              <input type="text" placeholder="Travel Date" className="w-full text-[#0F1A2E] placeholder-gray-500 font-inter focus:outline-none" />
            </div>

            <div className="flex-1 w-full bg-white rounded-lg flex items-center px-4 py-3">
              <Calendar className="text-[#FCD34D] w-5 h-5 mr-3" />
              <input type="text" placeholder="Return Date" className="w-full text-[#0F1A2E] placeholder-gray-500 font-inter focus:outline-none" />
            </div>

            <div className="flex-1 w-full bg-white rounded-lg flex items-center px-4 py-3">
              <Users className="text-[#F5A623] w-5 h-5 mr-3" />
              <select className="w-full text-[#0F1A2E] font-inter focus:outline-none bg-transparent">
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4+">4+ Travelers</option>
              </select>
            </div>

            <button className="w-full md:w-auto bg-[#F5A623] hover:bg-[#E8921A] text-white p-4 rounded-lg transition-colors flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
