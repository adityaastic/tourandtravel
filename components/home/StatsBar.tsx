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
    { id: 4, icon: Star, label: "Years Experience", value: 10, suffix: "+" },
  ];

  return (
    <section className="bg-[#F8FAFF] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="bg-white/60 backdrop-blur-md border border-[#1B2A4A]/10 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-[#EEF2FF] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-[#F5A623]" />
                </div>
                <div className="font-poppins font-bold text-3xl text-[#1B2A4A] flex items-center mb-1">
                  <CounterAnimation end={stat.value} duration={2} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="font-inter text-gray-500 font-medium">
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
