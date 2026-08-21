'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: any;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mountains': return 'bg-blue-500 text-white';
      case 'beaches': return 'bg-cyan-500 text-white';
      case 'wildlife': return 'bg-emerald-500 text-white';
      case 'heritage': return 'bg-amber-500 text-white';
      case 'international': return 'bg-purple-500 text-white';
      case 'spiritual': return 'bg-indigo-500 text-white';
      default: return 'bg-[#1B2A4A] text-white';
    }
  };

  const primaryCategory = pkg.category && pkg.category.length > 0 ? pkg.category[0] : 'Tour';

  return (
    <Link href={`/packages/${pkg.slug}`} className="block w-full group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-gray-100 h-[280px] sm:h-[360px] md:h-[400px] flex flex-col justify-between"
      >
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <PhotoPlaceholder 
            aspectRatio="4/3" 
            label={pkg.title} 
            slot={pkg.photoSlots?.[0] || 'destination'} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Top Badges */}
        <div className="relative p-2.5 sm:p-4 flex justify-between items-start z-10 gap-1.5">
          <span className={cn("px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-xs", getCategoryColor(primaryCategory))}>
            {primaryCategory}
          </span>
          <span className="bg-[#0F1A2E]/85 backdrop-blur-md text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md">
            {pkg.duration || `${pkg.days}D/${pkg.nights}N`}
          </span>
        </div>

        {/* Bottom Overlay Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0F1A2E] via-[#0F1A2E]/70 to-transparent z-10" />

        {/* Content */}
        <div className="relative p-3 sm:p-5 z-20 flex flex-col justify-end">
          <h3 className="text-white text-sm sm:text-lg md:text-xl font-poppins font-bold leading-tight mb-1 sm:mb-2 group-hover:text-[#F5A623] transition-colors line-clamp-1">
            {pkg.title}
          </h3>
          
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="flex items-center text-amber-400">
              <FaStar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="ml-1 text-[11px] sm:text-xs text-white font-semibold">{pkg.rating || '4.9'}</span>
            </div>
            <span className="text-gray-300 text-[10px] sm:text-xs hidden sm:inline">({pkg.reviewCount || 120})</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-300 text-[9px] sm:text-[11px] leading-none mb-0.5 uppercase tracking-wider">From</p>
              <p className="text-[#F5A623] font-poppins font-extrabold text-sm sm:text-lg">
                ₹{pkg.startingPrice ? pkg.startingPrice.toLocaleString('en-IN') : '8,999'}
                <span className="text-[10px] sm:text-xs text-gray-300 font-normal">/p</span>
              </p>
            </div>
            
            <span className="text-[10px] sm:text-xs text-white font-semibold bg-[#F5A623] hover:bg-[#E8921A] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg shadow-md transition-all">
              Explore →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
