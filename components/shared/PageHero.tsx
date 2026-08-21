'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PhotoPlaceholder from '../media/PhotoPlaceholder';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundSlot?: string;
}

export default function PageHero({ title, subtitle, backgroundSlot }: PageHeroProps) {
  return (
    <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] bg-gradient-to-br from-[#071A3D] via-[#0D2A57] to-[#071A3D] overflow-hidden flex flex-col justify-center items-center text-center px-4 pt-16">
      {backgroundSlot && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <PhotoPlaceholder 
            aspectRatio="16/9" 
            label={title}
            slot={backgroundSlot} 
            className="w-full h-full rounded-none border-none" 
          />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/50 to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-poppins font-black text-3xl sm:text-5xl md:text-6xl text-white mb-3"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-xs sm:text-base md:text-lg text-gray-200 font-inter max-w-2xl mx-auto mb-6"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-xs text-gray-300 font-medium"
        >
          <Link href="/" className="hover:text-[#F97316] transition-colors">Home</Link>
          <span className="text-gray-500">/</span>
          <span className="text-white font-semibold">{title}</span>
        </motion.div>
      </div>
    </div>
  );
}
