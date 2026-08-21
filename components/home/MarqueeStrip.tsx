'use client';

import React from 'react';

export default function MarqueeStrip() {
  const content = "🌟 New Package: Shimla 4D/3N @ ₹8,999 | 🔥 Manali Special | 🏔️ Ladakh Season Open | 🌴 Goa Beach Special | ✈️ Dubai Tour @ ₹45,000 | 📞 Call: +91-9911209636 | ";

  return (
    <div className="w-full bg-[#F5A623] overflow-hidden py-3 text-white font-poppins font-semibold text-sm sm:text-base z-40 relative mt-20 sm:mt-12 lg:mt-0">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
