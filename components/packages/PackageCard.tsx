'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';

interface PackageCardProps {
  pkg: any;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const primaryCategory = pkg.category && pkg.category.length > 0 ? pkg.category[0] : 'Tour';

  return (
    <div className="group block w-full text-left">
      <div className="flex flex-col">
        {/* 1. Airbnb Photo Container with Wishlist Heart */}
        <div className="relative aspect-[16/11] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 mb-2 sm:mb-2.5 shadow-xs group-hover:shadow-md transition-all duration-300">
          <Link href={`/packages/${pkg.slug}`} className="block w-full h-full">
            <PhotoPlaceholder 
              aspectRatio="4/3" 
              label={pkg.title} 
              slot={pkg.photoSlots?.[0] || 'destination'} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Airbnb Top-Left Pill Badge */}
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {primaryCategory}
          </div>

          {/* Airbnb Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 p-2 rounded-full text-white/90 hover:text-rose-500 hover:scale-115 transition-all active:scale-90 z-20 cursor-pointer drop-shadow-md"
            aria-label="Save to Wishlist"
          >
            {isLiked ? (
              <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            ) : (
              <FaRegHeart className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
            )}
          </button>

          {/* Bottom Duration Badge */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 rounded-md">
            {pkg.duration || `${pkg.days}D / ${pkg.nights}N`}
          </div>
        </div>

        {/* 2. Airbnb Clean Meta Section */}
        <Link href={`/packages/${pkg.slug}`} className="block">
          <div className="flex justify-between items-start gap-1 mb-0.5">
            <h3 className="font-poppins font-bold text-xs sm:text-base text-neutral-900 leading-snug group-hover:text-[#F5A623] transition-colors line-clamp-1">
              {pkg.title}
            </h3>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-neutral-800 flex-shrink-0">
              <FaStar className="w-3 h-3 text-[#F5A623]" />
              <span>{pkg.rating || '4.92'}</span>
            </div>
          </div>

          <p className="font-inter text-[11px] sm:text-xs text-neutral-500 line-clamp-1 mb-1">
            {pkg.subtitle || `${pkg.distance || 'From Delhi'} · ${primaryCategory}`}
          </p>

          <p className="font-inter text-[10px] sm:text-[11px] text-neutral-400 mb-1.5 hidden sm:block">
            {pkg.bestTime ? `Best: ${pkg.bestTime}` : 'All-inclusive Hotel & Cab'}
          </p>

          {/* 3. Airbnb Price Display */}
          <div className="flex items-baseline gap-1 pt-0.5">
            <span className="font-poppins font-black text-sm sm:text-base text-neutral-900">
              ₹{pkg.startingPrice ? pkg.startingPrice.toLocaleString('en-IN') : '8,999'}
            </span>
            <span className="font-inter text-[11px] sm:text-xs text-neutral-500 font-normal">
              / person
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
