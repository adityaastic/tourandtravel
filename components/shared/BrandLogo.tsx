'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Plane, ShieldCheck } from 'lucide-react';

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
          setLogoUrl(data.logoUrl);
        }
        if (data?.brandName) setBrandName(data.brandName);
        if (data?.name) setSubName(data.name);
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  const isLight = variant === 'footer' || variant === 'admin';

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* 1. Custom Image Logo (if available & valid) */}
      {logoUrl && !imageError ? (
        <div className="relative flex items-center">
          <img
            src={logoUrl}
            alt={`${brandName} - ${subName}`}
            className={`object-contain transition-transform duration-200 group-hover:scale-105 ${
              variant === 'admin'
                ? 'max-h-10 max-w-[160px]'
                : variant === 'footer'
                ? 'max-h-12 max-w-[180px]'
                : 'max-h-11 md:max-h-12 max-w-[180px] md:max-w-[220px]'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
            }}
          />
        </div>
      ) : null}

      {/* 2. Stylized Premium Travel Brand Badge (Fallback & Main Display) */}
      {(!logoUrl || imageError) && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:md-11 rounded-2xl bg-gradient-to-tr from-[#F5A623] via-[#E8921A] to-[#FCD34D] p-0.5 shadow-lg shadow-orange-500/25 flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
            <div className="w-full h-full bg-[#0F1A2E] rounded-[14px] flex items-center justify-center text-[#F5A623]">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-poppins font-extrabold text-xl md:text-2xl text-white tracking-tight leading-none group-hover:text-[#F5A623] transition-colors">
              {brandName}
            </span>
            {showSubtitle && (
              <span className="text-[11px] text-gray-300 font-medium tracking-wider uppercase mt-1 flex items-center gap-1">
                <span>{subName}</span>
                <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
                <span className="text-[#F5A623]">Delhi</span>
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
