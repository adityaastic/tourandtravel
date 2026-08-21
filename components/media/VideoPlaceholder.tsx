'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  label?: string;
  aspectRatio?: '16/9' | '4/3' | '9/16';
  size?: 'sm' | 'md' | 'lg' | 'full';
  note?: string;
  src?: string;
}

export default function VideoPlaceholder({
  label = 'Cinematic Reel',
  aspectRatio = '16/9',
  size = 'full',
  src,
}: VideoPlaceholderProps) {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '9/16': 'aspect-[9/16]',
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    full: 'w-full',
  };

  if (src) {
    return (
      <div className={`relative w-full overflow-hidden rounded-3xl ${aspectClasses[aspectRatio]} ${sizeClasses[size]}`}>
        <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#071A3D] ${aspectClasses[aspectRatio]} ${sizeClasses[size]}`}>
      <img
        src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1920&auto=format&fit=crop"
        alt={label}
        className="w-full h-full object-cover opacity-60 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/40 to-transparent" />
    </div>
  );
}
