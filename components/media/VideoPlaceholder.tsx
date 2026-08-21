'use client'

import React from 'react'
import { Video } from 'lucide-react'

interface VideoPlaceholderProps {
  label?: string
  aspectRatio?: '16/9' | '4/3' | '9/16'
  size?: 'sm' | 'md' | 'lg' | 'full'
  note?: string
  src?: string
}

export default function VideoPlaceholder({
  label = 'Feature Video',
  aspectRatio = '16/9',
  size = 'full',
  note,
  src
}: VideoPlaceholderProps) {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '9/16': 'aspect-[9/16]'
  }
  
  const sizeClasses = {
    'sm': 'max-w-md',
    'md': 'max-w-2xl',
    'lg': 'max-w-4xl',
    'full': 'w-full'
  }

  if (src) {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl ${aspectClasses[aspectRatio]} ${sizeClasses[size]}`}>
        <video src={src} controls className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#F5A623]/50 bg-gradient-to-br from-[#0F1A2E] to-[#1B2A4A] ${aspectClasses[aspectRatio]} ${sizeClasses[size]}`}>
      <style>{`
        @keyframes shimmer-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(245, 166, 35, 0.4)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 16px rgba(245, 166, 35, 0.8)); }
        }
        .animate-shimmer-sweep {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer-sweep 2s infinite linear;
        }
        .animate-icon-pulse {
          animation: icon-pulse 2s infinite ease-in-out;
        }
      `}</style>
      
      <div className="absolute inset-0 animate-shimmer-sweep" />
      
      <div className="absolute top-4 left-4 bg-[#F5A623] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1.5">
        <span className="text-sm">🎬</span> VIDEO
      </div>
      
      {note && (
        <div className="absolute top-4 right-4 bg-white/10 text-white/80 text-xs px-2 py-1 rounded-md z-10 font-mono backdrop-blur-sm">
          {note}
        </div>
      )}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
        <Video className="w-16 h-16 text-[#F5A623] mb-4 animate-icon-pulse" />
        <h3 className="font-poppins font-bold text-2xl text-white mb-2">Coming Soon</h3>
        <p className="text-white/60 mb-6">{label}</p>
        
        <div className="mt-auto px-4 py-2 bg-black/40 rounded-lg text-white/40 font-mono text-xs max-w-full truncate">
          📁 Add video: /public/videos/[filename].mp4
        </div>
      </div>
    </div>
  )
}
