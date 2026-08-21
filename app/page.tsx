import React from 'react';
import type { Metadata } from 'next';

import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import StatsBar from '@/components/home/StatsBar';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import CustomTripPlanner from '@/components/home/CustomTripPlanner';
import HowItWorks from '@/components/home/HowItWorks';
import CarFleetPreview from '@/components/home/CarFleetPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import CallToAction from '@/components/home/CallToAction';
import BlogPreview from '@/components/home/BlogPreview';
import InstagramTeaser from '@/components/home/InstagramTeaser';

export const metadata: Metadata = {
  title: 'Just Tourism | Travel Packages, Cabs & Holiday Tours',
  description: 'Discover handcrafted holiday tour packages across India, reliable outstation AC cabs, and custom trip planning with Just Tourism by Karuna Travels. +91-9911209636',
  alternates: {
    canonical: 'https://www.justourism.com',
  },
  openGraph: {
    title: 'Just Tourism | Travel Packages, Cabs & Holiday Tours',
    description: 'Curated holidays, premium stays, reliable cabs and personalized travel experiences across India and international destinations.',
    url: 'https://www.justourism.com',
    siteName: 'Just Tourism',
    type: 'website',
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Just Tourism",
    "alternateName": "Karuna Travels",
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
    "url": "https://www.justourism.com",
    "founder": {
      "@type": "Person",
      "name": "Karuna Suryawanshi"
    },
    "sameAs": [
      "https://instagram.com/justtourism"
    ]
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 1. Cinematic Hero with Floating Trip Planner */}
      <HeroSection />

      {/* 2. Seamless Promotional Ticker with Hover Pause */}
      <MarqueeStrip />

      {/* 3. Verified Quick Trust Bar (500+ Happy Travelers, 20+ Destinations, 15+ Premium Cars, 24/7 Support) */}
      <StatsBar />

      {/* 4. Popular Destinations Bento Showcase */}
      <DestinationsGrid />

      {/* 5. Handpicked Tour Packages with Category Strips */}
      <FeaturedPackages />

      {/* 6. Interactive Custom Trip Planner */}
      <CustomTripPlanner />

      {/* 7. How It Works 5-Step Visual Timeline */}
      <HowItWorks />

      {/* 8. Travel Comfortably Fleet Preview */}
      <CarFleetPreview />

      {/* 9. The Just Tourism Advantage */}
      <WhyChooseUs />

      {/* 10. Verified Customer Reviews & Google Trust Badge */}
      <TestimonialsSlider />

      {/* 11. Travel Blog Guides */}
      <BlogPreview />

      {/* 12. Visual Travel Gallery & Social Showcase */}
      <InstagramTeaser />

      {/* 13. Final High-Impact CTA */}
      <CallToAction />
    </main>
  );
}
