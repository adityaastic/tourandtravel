'use client';

import React from 'react';
import { Plane, MapPin, Car, Star } from 'lucide-react';
import CounterAnimation from '@/components/animations/CounterAnimation';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

export default function StatsBar() {
  const stats = [
    { id: 1, icon: Plane, label: "Happy Travelers", value: 500, suffix: "+" },
    { id: 2, icon: MapPin, label: "Destinations", value: 50, suffix: "+" },
    { id: 3, icon: Car, label: "Premium Cars", value: 15, suffix: "+" },
    { id: 4, icon: Star, label: "Years in Delhi", value: 10, suffix: "+" },
  ];

  return (
    <section className="bg-[#F8FAFF] py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          {/* 2-Column Mobile Grid / 4-Column Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="bg-white/80 backdrop-blur-md border border-[#1B2A4A]/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-[#EEF2FF] group-hover:bg-[#F5A623]/15 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2.5 sm:mb-3.5 transition-colors">
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#F5A623]" />
                </div>
                <div className="font-poppins font-black text-xl sm:text-3xl md:text-4xl text-[#1B2A4A] flex items-center mb-0.5 sm:mb-1">
                  <CounterAnimation end={stat.value} duration={2} />
                  <span className="text-[#F5A623]">{stat.suffix}</span>
                </div>
                <p className="font-inter text-[11px] sm:text-sm text-gray-500 font-semibold leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
