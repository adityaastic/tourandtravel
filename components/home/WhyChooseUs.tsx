'use client';

import React from 'react';
import { Target, ShieldCheck, Clock, Users, Car, Map, FileCheck, Hotel } from 'lucide-react';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

const features = [
  { id: 1, icon: Target, title: "Best Price Guarantee", desc: "Honest rates with zero hidden charges." },
  { id: 2, icon: ShieldCheck, title: "Safe & Sanitized", desc: "Verified drivers & sanitized fleet." },
  { id: 3, icon: Clock, title: "24/7 Travel Desk", desc: "Instant assistance throughout your trip." },
  { id: 4, icon: Users, title: "Local Guides", desc: "Authentic stories & hidden gems." },
  { id: 5, icon: Car, title: "Premium AC Cabs", desc: "Sedans, SUVs & luxury Innovas." },
  { id: 6, icon: Map, title: "Custom Itineraries", desc: "Personalized to your schedule & pace." },
  { id: 7, icon: FileCheck, title: "Instant Booking", desc: "Quick confirmation on WhatsApp." },
  { id: 8, icon: Hotel, title: "Handpicked Stays", desc: "Clean, verified top-rated partner hotels." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1.5 block">
              The Just Tourism Advantage
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900 mb-2">
              Why Travellers Choose Us
            </h2>
            <p className="font-inter text-neutral-500 text-xs sm:text-base max-w-lg mx-auto">
              Trusted by 500+ happy holidaymakers for transparent, reliable, and comfortable travel.
            </p>
          </div>
        </ScrollFadeUp>

        {/* 2-Column Mobile Grid / 4-Column Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <ScrollFadeUp key={feature.id} delay={idx * 0.04}>
              <div className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-200/70 h-full flex flex-col justify-between">
                <div>
                  <div className="bg-[#F8FAFC] w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#F97316]/10 transition-colors">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97316]" />
                  </div>
                  <h3 className="font-poppins font-bold text-xs sm:text-base text-neutral-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
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
