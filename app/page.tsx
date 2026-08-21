import React from 'react';
import type { Metadata } from 'next';

import HeroSection from '@/components/home/HeroSection';
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
  title: 'Just Tourism - Explore India. Create Memories. | Delhi Premier Travel Agency',
  description: 'Curated holidays, premium stays, reliable cabs and personalized travel experiences from Delhi. Book tour packages to Kashmir, Manali, Shimla, Goa, Rajasthan, Kerala & car rentals. +91-9911209636',
  openGraph: {
    title: 'Just Tourism — Explore India. Create Memories.',
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

      {/* 2. Verified Quick Trust Bar */}
      <StatsBar />

      {/* 3. Popular Destinations Bento Showcase */}
      <DestinationsGrid />

      {/* 4. Handpicked Tour Packages with Category Strips */}
      <FeaturedPackages />

      {/* 5. Interactive Custom Trip Planner */}
      <CustomTripPlanner />

      {/* 6. How It Works 5-Step Visual Timeline */}
      <HowItWorks />

      {/* 7. Travel Comfortably Fleet Preview */}
      <CarFleetPreview />

      {/* 8. The Just Tourism Advantage */}
      <WhyChooseUs />

      {/* 9. Verified Customer Reviews & Google Trust Badge */}
      <TestimonialsSlider />

      {/* 10. Travel Blog Guides */}
      <BlogPreview />

      {/* 11. Visual Travel Gallery & Social Showcase */}
      <InstagramTeaser />

      {/* 12. Final High-Impact CTA */}
      <CallToAction />
    </main>
  );
}
