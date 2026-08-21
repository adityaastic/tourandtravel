'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: any; // Ideally we'd use a specific type from data/packages, but any allows flexibility here for now
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mountains': return 'bg-blue-500 text-white';
      case 'beaches': return 'bg-cyan-500 text-white';
      case 'wildlife': return 'bg-green-500 text-white';
      case 'heritage': return 'bg-amber-500 text-white';
      case 'international': return 'bg-purple-500 text-white';
      case 'spiritual': return 'bg-indigo-500 text-white';
      default: return 'bg-[#1B2A4A] text-white'; // Primary Navy
    }
  };

  const primaryCategory = pkg.category && pkg.category.length > 0 ? pkg.category[0] : 'Tour';

  return (
    <Link href={`/packages/${pkg.slug}`} className="block w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 h-[400px]"
      >
        <div className="absolute inset-0 z-0">
          <PhotoPlaceholder 
            aspectRatio="4/3" 
            label={pkg.title} 
            slot={pkg.photoSlots?.[0] || 'destination'} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md", getCategoryColor(primaryCategory))}>
            {primaryCategory}
          </span>
          <span className="bg-[#0F1A2E]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {pkg.duration || `${pkg.days}D/${pkg.nights}N`}
          </span>
        </div>

        {/* Bottom Overlay Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0F1A2E] to-transparent z-10" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
          <h3 className="text-white text-xl font-poppins font-semibold mb-2 group-hover:-translate-y-1 transition-transform">
            {pkg.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-400">
              <FaStar className="w-4 h-4" />
              <span className="ml-1 text-sm text-white font-medium">{pkg.rating || '4.8'}</span>
            </div>
            <span className="text-gray-300 text-xs">({pkg.reviewCount || 120} reviews)</span>
          </div>

          <div className="flex items-end justify-between overflow-hidden">
            <div>
              <p className="text-gray-300 text-xs mb-1">Starting from</p>
              <p className="text-[#F5A623] font-poppins font-bold text-lg">
                ₹{pkg.startingPrice.toLocaleString('en-IN')}<span className="text-xs text-gray-300 font-normal">/person</span>
              </p>
            </div>
            <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="inline-flex items-center text-sm text-white font-medium bg-[#E8921A] px-4 py-2 rounded-full">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
