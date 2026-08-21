'use client';

import React from 'react';
import { Target, ShieldCheck, Clock, Users, Car, Map, FileCheck, Hotel } from 'lucide-react';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';

const features = [
  { id: 1, icon: Target, title: "Best Price Guarantee", desc: "Unbeatable prices without compromising on quality." },
  { id: 2, icon: ShieldCheck, title: "Safe & Secure Travel", desc: "Your safety is our top priority on every trip." },
  { id: 3, icon: Clock, title: "24/7 Customer Support", desc: "We're here to help you anytime, anywhere." },
  { id: 4, icon: Users, title: "Expert Local Guides", desc: "Knowledgeable guides for an authentic experience." },
  { id: 5, icon: Car, title: "Premium AC Cars", desc: "Comfortable and well-maintained vehicles." },
  { id: 6, icon: Map, title: "Custom Itinerary", desc: "Tailor-made trips to suit your preferences." },
  { id: 7, icon: FileCheck, title: "Visa Assistance", desc: "Hassle-free documentation and visa processing." },
  { id: 8, icon: Hotel, title: "Hotel Booking", desc: "Partnerships with the best hotels worldwide." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#EEF2FF] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">Why Thousands Choose Karuna Travels</h2>
            <div className="w-24 h-1 bg-[#F5A623] mx-auto rounded-full"></div>
          </div>
        </ScrollFadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <ScrollFadeUp key={feature.id} delay={idx * 0.1}>
              <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-transparent hover:border-[#F5A623] h-full">
                <div className="bg-[#F8FAFF] w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F5A623]/10 transition-colors">
                  <feature.icon className="w-8 h-8 text-[#F5A623]" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-[#1B2A4A] mb-3">{feature.title}</h3>
                <p className="font-inter text-gray-500 line-clamp-2">{feature.desc}</p>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
