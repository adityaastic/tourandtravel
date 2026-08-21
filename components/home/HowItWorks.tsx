'use client';

import React from 'react';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { MapPin, Compass, Sliders, CheckCircle2, HeartHandshake } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: MapPin,
    title: 'Choose Destination',
    desc: 'Pick your dream spot from 20+ destinations across mountains, beaches, and heritage.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Select Package',
    desc: 'Browse handcrafted itineraries designed for couples, families, and solo explorers.',
  },
  {
    step: '03',
    icon: Sliders,
    title: 'Customize Your Trip',
    desc: 'Tailor hotels, sightseeing, dates, and sanitized AC car choices to your taste.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Confirm Booking',
    desc: 'Fast, secure confirmation with instant WhatsApp support and transparent pricing.',
  },
  {
    step: '05',
    icon: HeartHandshake,
    title: 'Enjoy Your Journey',
    desc: 'Travel worry-free with 24/7 dedicated support and expert local drivers.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1.5 block">
              Effortless Booking
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-4xl text-neutral-900 mb-2">
              Your Journey, Made Simple
            </h2>
            <p className="font-inter text-neutral-500 text-xs sm:text-base max-w-lg mx-auto">
              From planning your itinerary to coming back with unforgettable memories in 5 easy steps.
            </p>
          </div>
        </ScrollFadeUp>

        {/* 5-Step Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollFadeUp key={item.step} delay={idx * 0.08}>
                <div className="bg-[#F8FAFC] border border-neutral-200/70 rounded-3xl p-5 sm:p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-poppins font-black text-2xl sm:text-3xl text-neutral-300 group-hover:text-[#F97316] transition-colors">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-poppins font-bold text-sm sm:text-base text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-inter text-xs text-neutral-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
