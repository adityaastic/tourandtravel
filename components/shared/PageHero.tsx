'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PhotoPlaceholder from '../media/PhotoPlaceholder'
import Link from 'next/link'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundSlot?: string
}

export default function PageHero({ title, subtitle, backgroundSlot }: PageHeroProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-[#0F1A2E] to-[#1B2A4A] overflow-hidden flex flex-col justify-center items-center text-center px-4">
      {backgroundSlot && (
        <div className="absolute inset-0 opacity-40">
          <PhotoPlaceholder 
            aspectRatio="16/9" 
            slot={backgroundSlot} 
            className="w-full h-full rounded-none border-none opacity-50" 
          />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-transparent to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-inter max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm text-white/60"
        >
          <Link href="/" className="hover:text-[#F5A623] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{title}</span>
        </motion.div>
      </div>
    </div>
  )
}
