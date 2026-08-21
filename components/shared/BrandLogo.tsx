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
  const [brandName, setBrandName] = useState('JUST TOURISM');
  const [subName, setSubName] = useState('A brand by Karuna Travels');
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
      {/* 1. Custom Image Logo (Floating without inflating navbar height) */}
      {logoUrl && !imageError ? (
        <div className="relative flex items-center overflow-visible">
          <img
            src={logoUrl}
            alt={`${brandName} - Karuna Travels`}
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

      {/* 2. Stylized Premium Travel Brand Badge (Fallback) */}
      {(!logoUrl || imageError) && (
        <div className="flex items-center gap-2.5">
          <div
            className={`rounded-2xl bg-gradient-to-tr from-[#F97316] via-[#FB923C] to-[#EA580C] p-0.5 shadow-xl shadow-orange-500/25 flex-shrink-0 group-hover:rotate-6 transition-transform duration-300 ${
              variant === 'admin'
                ? 'w-8 h-8'
                : 'w-10 h-10 sm:w-12 sm:h-12'
            }`}
          >
            <div className="w-full h-full bg-[#071A3D] rounded-[14px] flex items-center justify-center text-[#F97316]">
              <Compass className={variant === 'admin' ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span
              className={`font-poppins font-black text-white tracking-tight leading-none group-hover:text-[#F97316] transition-colors ${
                variant === 'admin'
                  ? 'text-sm font-bold'
                  : 'text-lg sm:text-2xl'
              }`}
            >
              JUST TOURISM
            </span>
            {showSubtitle && (
              <span className="text-[9px] sm:text-[10px] text-gray-300 font-medium tracking-wide uppercase mt-0.5 flex items-center gap-1">
                <span>By Karuna Travels</span>
                <span className="w-1 h-1 rounded-full bg-[#F97316]" />
                <span className="text-[#FB923C] font-semibold">Delhi</span>
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
