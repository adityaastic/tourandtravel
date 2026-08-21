import React from 'react';
import type { Metadata } from 'next';

import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import StatsBar from '@/components/home/StatsBar';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CarFleetPreview from '@/components/home/CarFleetPreview';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import CallToAction from '@/components/home/CallToAction';
import BlogPreview from '@/components/home/BlogPreview';
import InstagramTeaser from '@/components/home/InstagramTeaser';

// Reusable divider
const WaveDivider = () => (
  <div className="w-full overflow-hidden leading-[0] transform rotate-180">
    <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F8FAFF]"></path>
    </svg>
  </div>
);

export const metadata: Metadata = {
  title: 'Karuna Travels - Just Tourism | Explore · Travel · Enjoy',
  description: 'India\'s Most Trusted Travel Partner. Explore the world with Karuna Travels. We offer premium travel packages, car rentals, and custom itineraries.',
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Karuna Travels",
    "alternateName": "Just Tourism",
    "image": "https://karunatravels.com/logo.png",
    "description": "Delhi's Premier Travel Agency offering customized tour packages, premium car bookings, and safe travel experiences.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Krishna Dry Clean, Dayanand Road, Daryaganj",
      "addressLocality": "Delhi",
      "postalCode": "110002",
      "addressCountry": "IN"
    },
    "telephone": "+91-9911209636",
    "email": "karunadikoshiya000@gmail.com",
    "url": "https://karunatravels.com",
    "founder": {
      "@type": "Person",
      "name": "Karuna Suryawanshi"
    },
    "sameAs": [
      "https://instagram.com/karunatravels"
    ]
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HeroSection />
      <MarqueeStrip />
      <StatsBar />
      <WaveDivider />
      <FeaturedPackages />
      <WaveDivider />
      <WhyChooseUs />
      <WaveDivider />
      <CarFleetPreview />
      <WaveDivider />
      <DestinationsGrid />
      <WaveDivider />
      <TestimonialsSlider />
      <CallToAction />
      <BlogPreview />
      <InstagramTeaser />
    </main>
  );
}
