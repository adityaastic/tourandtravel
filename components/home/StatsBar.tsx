'use client';

import React from 'react';
import { Users, MapPin, Car, Clock } from 'lucide-react';
import CounterAnimation from '@/components/animations/CounterAnimation';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

export default function StatsBar() {
  const stats = [
    { id: 1, icon: Users, label: "Happy Travellers", value: 500, suffix: "+" },
    { id: 2, icon: MapPin, label: "Destinations", value: 20, suffix: "+" },
    { id: 3, icon: Car, label: "Premium Cars", value: 15, suffix: "+" },
    { id: 4, icon: Clock, label: "Travel Support", value: 24, suffix: "/7" },
  ];

  return (
    <section className="bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          {/* 2-Column Mobile Grid / 4-Column Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="bg-[#F8FAFC] border border-neutral-200/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-white group-hover:bg-[#F97316]/10 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 transition-colors shadow-xs">
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#F97316]" />
                </div>
                <div className="font-poppins font-black text-xl sm:text-3xl md:text-4xl text-[#071A3D] flex items-center mb-0.5 sm:mb-1">
                  <CounterAnimation end={stat.value} duration={2} />
                  <span className="text-[#F97316]">{stat.suffix}</span>
                </div>
                <p className="font-inter text-[11px] sm:text-sm text-neutral-600 font-semibold leading-tight">
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
