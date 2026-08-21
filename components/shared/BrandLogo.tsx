'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';

interface BrandLogoProps {
  variant?: 'navbar' | 'footer' | 'admin' | 'header';
  className?: string;
  showSubtitle?: boolean;
}

export default function BrandLogo({
  variant = 'navbar',
  className = '',
  showSubtitle = true,
}: BrandLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('Just Tourism');
  const [subName, setSubName] = useState('Karuna Travels');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.logoUrl) {
          let url = data.logoUrl;
          if (url.includes('.r2.cloudflarestorage.com/')) {
            const parts = url.split('.r2.cloudflarestorage.com/');
            if (parts[1]) {
              const cleanKey = parts[1].replace(/^justourism\//, '');
              url = `/api/media/${cleanKey}`;
            }
          }
          setLogoUrl(url);
        }
        if (data?.brandName) setBrandName(data.brandName);
        if (data?.name) setSubName(data.name);
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  const href = variant === 'admin' ? '/admin' : '/';

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 group select-none relative z-30 overflow-visible ${className}`}
    >
      {/* 1. Custom Image Logo (BIG, FLOATING & OVERFLOWING WITHOUT INFLATING NAVBAR) */}
      {logoUrl && !imageError ? (
        <div className="relative flex items-center overflow-visible">
          <img
            src={logoUrl}
            alt={`${brandName} - ${subName}`}
            className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-2xl ${
              variant === 'admin'
                ? 'h-9 max-w-[140px]'
                : variant === 'footer'
                ? 'h-14 sm:h-16 max-w-[240px]'
                : 'h-16 sm:h-20 md:h-22 lg:h-24 max-w-[200px] sm:max-w-[260px] md:max-w-[300px] -my-2 sm:-my-3 md:-my-4 transform origin-left'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
            }}
          />
        </div>
      ) : null}

      {/* 2. Stylized Premium Travel Brand Badge (Large Fallback) */}
      {(!logoUrl || imageError) && (
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl bg-gradient-to-tr from-[#F5A623] via-[#E8921A] to-[#FCD34D] p-0.5 shadow-xl shadow-orange-500/25 flex-shrink-0 group-hover:rotate-6 transition-transform duration-300 ${
              variant === 'admin'
                ? 'w-9 h-9'
                : 'w-12 h-12 sm:w-14 sm:h-14 -my-1 sm:-my-2'
            }`}
          >
            <div className="w-full h-full bg-[#0F1A2E] rounded-[14px] flex items-center justify-center text-[#F5A623]">
              <Compass className={variant === 'admin' ? 'w-4 h-4' : 'w-6 h-6 sm:w-7 sm:h-7'} />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span
              className={`font-poppins font-black text-white tracking-tight leading-none group-hover:text-[#F5A623] transition-colors ${
                variant === 'admin'
                  ? 'text-sm font-bold'
                  : 'text-xl sm:text-2xl md:text-3xl'
              }`}
            >
              {brandName}
            </span>
            {showSubtitle && (
              <span className="text-[10px] sm:text-xs text-gray-200 font-semibold tracking-wider uppercase mt-1 flex items-center gap-1">
                <span>{subName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                <span className="text-[#F5A623] font-bold">Delhi</span>
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
