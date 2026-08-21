import React from 'react';
import { Metadata } from 'next';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import GalleryPlaceholder from '@/components/media/GalleryPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import CounterAnimation from '@/components/animations/CounterAnimation';
import SectionHeading from '@/components/shared/SectionHeading';
import WaveDivider from '@/components/shared/WaveDivider';
import JsonLd from '@/components/shared/JsonLd';
import PageHero from '@/components/shared/PageHero';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Karuna Travels | Just Tourism Delhi — Our Story',
  description: 'Learn about Karuna Suryawanshi and Karuna Travels, Delhi’s trusted travel agency in Daryaganj offering quality and affordable tourism for over 10 years.',
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karunatravels.in" },
      { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://karunatravels.in/about" }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] pb-20">
      <JsonLd data={breadcrumbSchema} />

      <PageHero 
        title="Our Story" 
        subtitle="Discover the journey behind Delhi’s most trusted travel agency" 
      />

      {/* Mission Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollFadeUp delay={0.1}>
            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-100 h-full">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-poppins font-semibold text-[#1B2A4A] mb-3">Our Mission</h3>
              <p className="text-gray-600">To make exceptional travel experiences accessible to everyone through transparent pricing and personalized service.</p>
            </div>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.2}>
            <div className="bg-[#1B2A4A] shadow-xl rounded-2xl p-8 border border-gray-800 h-full text-white">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-poppins font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-300">To become India's #1 trusted travel platform, known for reliability, innovation, and unforgettable journeys.</p>
            </div>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.3}>
            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-100 h-full">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-poppins font-semibold text-[#1B2A4A] mb-3">Our Values</h3>
              <p className="text-gray-600">Trust, uncompromising quality, affordability, and a deep commitment to sustainable tourism practices.</p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollFadeUp>
            <div className="relative">
              <div className="absolute inset-0 bg-[#F5A623] rounded-3xl transform -rotate-3 scale-105 opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <PhotoPlaceholder 
                  aspectRatio="3/4" 
                  label="Karuna Suryawanshi — Founder" 
                  slot="owner-karuna" 
                />
              </div>
            </div>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1B2A4A]">Meet Our Founder</h2>
              <h3 className="text-xl text-[#F5A623] font-semibold">Karuna Suryawanshi</h3>
              
              <div className="prose prose-lg text-gray-600">
                <p>
                  Founded over a decade ago in the bustling heart of Daryaganj, Delhi, <strong>Karuna Travels</strong> (operating proudly under the brand name <em>Just Tourism</em>) was born from a simple yet profound passion: exploring the world and sharing that joy with others.
                </p>
                <p>
                  Karuna Suryawanshi noticed a gap in the market — travelers were often forced to choose between exorbitant luxury or unreliable budget options. With 10+ years of deep industry expertise, he set out to bridge this gap, committing to affordable, high-quality tourism that doesn't compromise on the experience.
                </p>
                <blockquote className="border-l-4 border-[#F5A623] pl-6 py-2 my-8 italic font-medium text-xl text-[#1B2A4A] bg-[#F5A623]/5 rounded-r-xl">
                  "We don’t just plan trips, we create memories that last a lifetime."
                  <footer className="text-sm text-gray-500 mt-2 not-italic">— Karuna Suryawanshi</footer>
                </blockquote>
                <p>
                  Today, Karuna Travels stands as a testament to his vision, having successfully planned thousands of trips across India and beyond, always keeping the traveler's comfort and budget as the top priority.
                </p>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1B2A4A] py-20 relative overflow-hidden mb-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-700/50">
            <ScrollFadeUp delay={0.1}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2"><CounterAnimation end={500} suffix="+" /></div>
              <div className="text-white/80 font-medium">Happy Travelers</div>
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.2}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2"><CounterAnimation end={50} suffix="+" /></div>
              <div className="text-white/80 font-medium">Destinations</div>
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.3}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2"><CounterAnimation end={15} suffix="+" /></div>
              <div className="text-white/80 font-medium">Luxury Cars</div>
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.4}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2"><CounterAnimation end={10} suffix="+" /></div>
              <div className="text-white/80 font-medium">Years Experience</div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <SectionHeading 
          title="Our Dedicated Team" 
          subtitle="The passionate experts working behind the scenes to make your journey perfect" 
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            { name: 'Karuna Suryawanshi', role: 'Founder & CEO', slot: 'owner-karuna' },
            { name: 'Rahul Sharma', role: 'Operations Manager', slot: 'team-1' },
            { name: 'Priya Verma', role: 'Travel Consultant', slot: 'team-2' },
            { name: 'Amit Kumar', role: 'Driver Coordinator', slot: 'team-3' }
          ].map((member, index) => (
            <ScrollFadeUp key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="aspect-square overflow-hidden relative">
                  <PhotoPlaceholder aspectRatio="1/1" label={member.name} slot={member.slot} />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-poppins font-semibold text-lg text-[#1B2A4A] group-hover:text-[#F5A623] transition-colors">{member.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="bg-[#EEF2FF] py-12 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center">
            {['IATA Certified', 'Government Approved', 'ISO 9001:2015', 'TAAI Member'].map((cert, index) => (
              <ScrollFadeUp key={index} delay={index * 0.1}>
                <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 font-semibold text-[#1B2A4A] flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span> {cert}
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Office Photos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Inside Karuna Travels" 
          subtitle="Visit us at our Daryaganj, Delhi office" 
          centered
        />
        <div className="mt-12">
          <ScrollFadeUp>
            <GalleryPlaceholder 
              count={4} 
              labels={['Reception Area', 'Travel Consulting Desk', 'Meeting Room', 'Office Exterior (Daryaganj)']} 
            />
          </ScrollFadeUp>
        </div>
      </section>
    </main>
  );
}
