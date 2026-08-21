'use client';

import React from 'react';
import { Target, ShieldCheck, Clock, Users, Car, Map, FileCheck, Hotel } from 'lucide-react';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

const features = [
  { id: 1, icon: Target, title: "Best Price", desc: "Unbeatable rates with zero hidden costs." },
  { id: 2, icon: ShieldCheck, title: "Safe Travel", desc: "Sanitized cabs & verified drivers." },
  { id: 3, icon: Clock, title: "24/7 Support", desc: "Instant help whenever you need." },
  { id: 4, icon: Users, title: "Local Guides", desc: "Authentic destination experiences." },
  { id: 5, icon: Car, title: "Premium Cabs", desc: "Clean AC hatchbacks, sedans & SUVs." },
  { id: 6, icon: Map, title: "Custom Trips", desc: "Tailor-made itineraries for you." },
  { id: 7, icon: FileCheck, title: "Fast Booking", desc: "Instant WhatsApp confirmation." },
  { id: 8, icon: Hotel, title: "Handpicked Stays", desc: "Clean, verified top-rated hotels." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#EEF2FF] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F5A623] mb-1.5 block">
              Why Karuna Travels
            </span>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#1B2A4A] mb-2">
              Why Travelers Choose Us
            </h2>
            <div className="w-16 h-1 bg-[#F5A623] mx-auto rounded-full mt-2" />
          </div>
        </ScrollFadeUp>

        {/* 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <ScrollFadeUp key={feature.id} delay={idx * 0.05}>
              <div className="group bg-white rounded-2xl p-3.5 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-transparent hover:border-[#F5A623] h-full flex flex-col justify-between">
                <div>
                  <div className="bg-[#F8FAFF] w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#F5A623]/15 transition-colors">
                    <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#F5A623]" />
                  </div>
                  <h3 className="font-poppins font-bold text-sm sm:text-base text-[#1B2A4A] mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
