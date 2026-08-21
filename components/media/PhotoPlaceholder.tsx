'use client'

import React from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'

interface PhotoPlaceholderProps {
  label?: string
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/4'
  slot?: string
  className?: string
  src?: string
}

export default function PhotoPlaceholder({
  label = 'Image',
  aspectRatio = '4/3',
  slot = 'placeholder',
  className = '',
  src
}: PhotoPlaceholderProps) {
  const aspectClasses = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/4': 'aspect-[3/4]'
  }

  if (src) {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl ${aspectClasses[aspectRatio]} ${className}`}>
        <Image src={src} alt={label} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#F5A623]/40 bg-gradient-to-br from-[#EEF2FF] to-[#F8FAFF] ${aspectClasses[aspectRatio]} ${className}`}>
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 4px 6px rgba(245, 166, 35, 0.2)); }
          50% { transform: translateY(-6px); filter: drop-shadow(0 8px 12px rgba(245, 166, 35, 0.4)); }
        }
        @keyframes subtle-shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
        .animate-subtle-shimmer {
          animation: subtle-shimmer 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-subtle-shimmer" style={{ backgroundSize: '200% 100%' }} />
      
      <div className="absolute top-3 left-3 bg-[#FCD34D] text-[#0F1A2E] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
        <span>📷</span> PHOTO
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
        <Camera className="w-12 h-12 text-[#E8921A] mb-3 animate-float-icon" />
        <h3 className="font-poppins font-semibold text-[#1B2A4A] mb-1">Photo Coming Soon</h3>
        <p className="text-sm text-[#1B2A4A]/60 mb-4">{label} • {slot}</p>
        
        <div className="mt-auto px-3 py-1.5 bg-black/5 rounded text-xs text-[#1B2A4A]/50 font-mono w-full truncate">
          /public/images/{slot}.jpg
        </div>
      </div>
    </div>
  )
}
