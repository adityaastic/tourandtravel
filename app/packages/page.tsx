'use client';

import React, { useState, useMemo } from 'react';
import PageHero from '@/components/shared/PageHero';
import PackageFilter from '@/components/packages/PackageFilter';
import PackageCard from '@/components/packages/PackageCard';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import JsonLd from '@/components/shared/JsonLd';
import { packages } from '@/lib/data/packages';

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packages];

    // Filter
    if (activeCategory !== 'all') {
      result = result.filter(pkg => 
        pkg.category?.some((c: string) => c.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    const getDays = (pkg: any) => {
      const match = pkg.duration?.match(/(\d+)\s*Day/i);
      return match ? parseInt(match[1], 10) : 0;
    };

    // Sort
    result.sort((a, b) => {
      switch (activeSort) {
        case 'price-asc': return a.startingPrice - b.startingPrice;
        case 'price-desc': return b.startingPrice - a.startingPrice;
        case 'duration-asc': return getDays(a) - getDays(b);
        case 'duration-desc': return getDays(b) - getDays(a);
        case 'popular':
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return result;
  }, [activeCategory, activeSort]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karunatravels.in" },
      { "@type": "ListItem", "position": 2, "name": "Packages", "item": "https://karunatravels.in/packages" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a tour package with Karuna Travels?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can book easily by calling us, sending a WhatsApp message, or requesting a callback through our website. Our travel experts will assist you instantly." }
      },
      {
        "@type": "Question",
        "name": "Are the tour packages customizable?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, all our packages are 100% customizable based on your preferences, budget, and travel dates." }
      },
      {
        "@type": "Question",
        "name": "Do your packages include flights?",
        "acceptedAnswer": { "@type": "Answer", "text": "Flight inclusion depends on the specific package. We can always add flight tickets to any package upon request at the best available rates." }
      },
      {
        "@type": "Question",
        "name": "What is your cancellation policy?",
        "acceptedAnswer": { "@type": "Answer", "text": "We offer flexible cancellation policies. Most packages have free cancellation up to 48 hours before the trip, but specific terms may vary by destination and hotels." }
      },
      {
        "@type": "Question",
        "name": "Do you provide English-speaking guides?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide professional, experienced, and English-speaking local guides for sightseeing tours across all our destinations." }
      }
    ]
  };

  return (
    <main className="min-h-screen pb-20 bg-[#F8FAFF]">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <PageHero 
        title="Our Tour Packages" 
        subtitle="Handcrafted journeys for every explorer. From serene mountains to vibrant beaches." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-30px] relative z-20 mb-12">
        <PackageFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredAndSortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPackages.map((pkg, index) => (
              <ScrollFadeUp key={pkg.id} delay={index * 0.1}>
                <PackageCard pkg={pkg} />
              </ScrollFadeUp>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-2">No packages found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any packages matching your selected filters.</p>
            <button 
              onClick={() => { setActiveCategory('all'); setActiveSort('popular'); }}
              className="bg-[#F5A623] hover:bg-[#E8921A] text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
