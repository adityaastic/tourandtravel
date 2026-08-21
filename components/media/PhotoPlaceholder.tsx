'use client';

import React, { useState } from 'react';
import { Compass } from 'lucide-react';

// Curated high-resolution destination & fleet photography
const destinationImages: Record<string, string> = {
  // Mountains & Hill Stations
  'shimla-manali': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
  'shimla': 'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200&auto=format&fit=crop',
  'manali': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
  'kashmir': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
  'ladakh': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
  'mussoorie': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
  'nainital': 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
  'haridwar': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
  'rishikesh': 'https://images.unsplash.com/photo-1609137144822-1d54e4c27a92?q=80&w=1200&auto=format&fit=crop',
  'vaishno': 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?q=80&w=1200&auto=format&fit=crop',
  'mathura': 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200&auto=format&fit=crop',
  'vrindavan': 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200&auto=format&fit=crop',

  // Beaches & Wildlife
  'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
  'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
  'corbett': 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
  'ranthambore': 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',

  // Heritage & Cities
  'rajasthan': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop',
  'golden-triangle': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
  'agra': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
  'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',

  // International
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  'thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop',
  'malaysia': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop',

  // Fleet & Cabs (Accurate car models)
  'baleno': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop',
  'glanza': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
  'i20': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
  'i10': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop',
  'eco': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
  'swift': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop',
  'dzire': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop',
  'ertiga': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
  'creta': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
  'innova': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
  'punch': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
  'safari': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
  'scorpio': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
  'thar': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
  'xuv700': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
};

function getCuratedImage(label: string = '', slot: string = '', src?: string): string {
  // If src is an external URL, use it directly
  if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
    return src;
  }

  const cleanLabel = (label || '').toLowerCase();
  const cleanSlot = (slot || '').toLowerCase();
  const combined = `${cleanLabel} ${cleanSlot}`;

  for (const [key, url] of Object.entries(destinationImages)) {
    if (combined.includes(key)) {
      return url;
    }
  }

  // Fallback high-res scenic India mountain travel photography
  return 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200&auto=format&fit=crop';
}

interface PhotoPlaceholderProps {
  label?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/4' | '16/10' | '16/11';
  slot?: string;
  className?: string;
  src?: string;
}

export default function PhotoPlaceholder({
  label = 'Destination',
  aspectRatio = '4/3',
  slot = 'destination',
  className = '',
  src,
}: PhotoPlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getCuratedImage(label, slot, src);

  const aspectClasses = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/4': 'aspect-[3/4]',
    '16/10': 'aspect-[16/10]',
    '16/11': 'aspect-[16/11]',
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-900 ${aspectClasses[aspectRatio] || 'aspect-[4/3]'} ${className}`}>
      {!imageError ? (
        <img
          src={imageUrl}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#071A3D] to-[#0D2A57] text-white p-4 text-center">
          <Compass className="w-8 h-8 text-[#F97316] mb-2 animate-spin-slow" />
          <p className="font-poppins font-bold text-sm text-white">{label}</p>
          <span className="text-[11px] text-gray-300">Just Tourism</span>
        </div>
      )}
    </div>
  );
}
