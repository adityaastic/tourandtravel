'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Phone, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-r from-[#071A3D] via-[#0D2A57] to-[#071A3D] py-16 sm:py-20 px-3 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F97316]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        <motion.div 
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left lg:w-3/5"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#FB923C] mb-2 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Next Adventure
          </span>
          <h2 className="font-poppins font-black text-3xl sm:text-5xl text-white mb-3 leading-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="font-inter text-sm sm:text-lg text-gray-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Tell us where you want to go. We'll help you plan the rest with customized itineraries and 24/7 dedicated support.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto justify-end"
        >
          <Link 
            href="/#planner"
            className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a 
            href="https://wa.me/919911209636?text=Hi%20Just%20Tourism!%20I%20want%20to%20plan%20a%20holiday." 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3.5 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a 
            href="tel:+919911209636"
            className="flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 px-5 py-3.5 rounded-full font-poppins font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#F97316]" />
            <span>+91-9911209636</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
