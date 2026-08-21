'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-r from-[#0F1A2E] to-[#1B2A4A] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F5A623]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#10B981]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left mb-10 lg:mb-0 lg:w-1/2"
        >
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
            Ready to Start Your <span className="text-[#F5A623]">Adventure?</span>
          </h2>
          <p className="font-inter text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
            Contact us today for a free consultation and personalized itinerary. Let's make your dream vacation a reality.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-6 lg:w-1/2 justify-end"
        >
          <a 
            href="https://wa.me/919911209636" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center space-x-3 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-poppins font-bold text-lg transition-transform transform hover:scale-105 shadow-lg shadow-[#10B981]/20 w-full sm:w-auto justify-center"
          >
            <FaWhatsapp className="w-6 h-6" />
            <span>WhatsApp Us</span>
          </a>

          <a 
            href="tel:+919911209636"
            className="flex items-center space-x-3 border-2 border-white text-white hover:bg-white hover:text-[#0F1A2E] px-8 py-4 rounded-xl font-poppins font-bold text-lg transition-all transform hover:scale-105 w-full sm:w-auto justify-center"
          >
            <FaPhoneAlt className="w-5 h-5" />
            <span>Call Now</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
