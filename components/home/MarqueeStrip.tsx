'use client';

import React from 'react';

const tickerItems = [
  '🌟 New Package: Shimla 4D/3N @ ₹8,999',
  '🔥 Manali Special',
  '🏔️ Ladakh Season Open',
  '🌴 Goa Beach Special',
  '✈️ Dubai Tour @ ₹45,000',
  '📞 Call Us: +91-9911209636',
];

export default function MarqueeStrip() {
  return (
    <div 
      className="w-full bg-[#F97316] overflow-hidden py-2.5 sm:py-3 text-white font-poppins font-semibold text-xs sm:text-sm z-30 relative shadow-sm group select-none"
      role="region"
      aria-label="Promotional announcements"
    >
      <div className="flex w-max motion-safe:animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 flex-shrink-0">
          {tickerItems.map((item, idx) => (
            <span key={`t1-${idx}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-white/60">•</span>
            </span>
          ))}
        </div>

        {/* Set 2 (for smooth infinite seamless loop) */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 flex-shrink-0" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span key={`t2-${idx}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-white/60">•</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[marquee_25s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
