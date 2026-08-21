import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import GalleryPlaceholder from '@/components/media/GalleryPlaceholder';
import PackageBookingSidebar from '@/components/packages/PackageBookingSidebar';
import JsonLd from '@/components/shared/JsonLd';
import { packages } from '@/lib/data/packages';
import { Check, X, MapPin } from 'lucide-react';

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = packages.find(p => p.slug === params.slug);
  if (!pkg) return { title: 'Package Not Found' };
  
  return {
    title: `${pkg.title} - Tour Package | Karuna Travels`,
    description: pkg.description || `Book the ${pkg.title} package with Karuna Travels. ${pkg.duration}, starting at ₹${pkg.startingPrice}.`,
    openGraph: {
      images: ['/placeholder-og.jpg']
    }
  };
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = packages.find(p => p.slug === params.slug);
  
  if (!pkg) {
    notFound();
  }

  const durationMatch = pkg.duration?.match(/(\d+)\s*Day/i);
  const daysCount = durationMatch ? parseInt(durationMatch[1], 10) : 3;

  // Generate a mock itinerary if not provided in data
  const itinerary = (pkg as any).itinerary || Array.from({ length: daysCount }).map((_, i) => ({
    day: i + 1,
    title: i === 0 ? `Arrival and Leisure` : i === daysCount - 1 ? `Departure` : `Sightseeing Tour`,
    activities: [
      "Morning breakfast at the hotel",
      pkg.highlights?.[i % (pkg.highlights?.length || 1)] || "Proceed for guided sightseeing",
      "Return to hotel for overnight stay"
    ]
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karunatravels.in" },
      { "@type": "ListItem", "position": 2, "name": "Packages", "item": "https://karunatravels.in/packages" },
      { "@type": "ListItem", "position": 3, "name": pkg.title, "item": `https://karunatravels.in/packages/${pkg.slug}` }
    ]
  };

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.description,
    "touristType": pkg.category,
    "offers": {
      "@type": "Offer",
      "price": pkg.startingPrice,
      "priceCurrency": "INR"
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] pb-24 pt-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={touristTripSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hero Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <PhotoPlaceholder aspectRatio="16/9" label={pkg.title} slot={pkg.photoSlots?.[0] || 'destination'} />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-sm">
                  <PhotoPlaceholder aspectRatio="1/1" label={`Detail ${i}`} slot={`dest-thumb-${i}`} />
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {pkg.category?.map(cat => (
                  <span key={cat} className="bg-[#EEF2FF] text-[#1B2A4A] px-4 py-1.5 rounded-full text-sm font-semibold">
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-poppins font-bold text-[#1B2A4A] mb-6">
                {pkg.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {pkg.description || `Experience the magic of ${pkg.title} with this carefully curated ${pkg.duration} journey.`}
              </p>
            </div>

            {/* Video */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <VideoPlaceholder aspectRatio="16/9" label={`${pkg.title} Tour Highlights`} />
            </div>

            {/* Why Visit Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                  <MapPin className="text-[#F5A623]" /> Why Visit
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <div className="text-3xl mb-3 text-[#F5A623]">✨</div>
                      <p className="font-medium text-[#1B2A4A]">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            <div>
              <h2 className="text-2xl font-poppins font-bold text-[#1B2A4A] mb-6">Day-wise Itinerary</h2>
              <div className="space-y-4">
                {itinerary.map((day: any, idx: number) => (
                  <details key={idx} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" open={idx === 0}>
                    <summary className="cursor-pointer p-6 font-poppins font-semibold text-lg text-[#1B2A4A] list-none flex justify-between items-center hover:bg-gray-50 transition-colors">
                      <span><span className="text-[#F5A623] mr-2">Day {day.day}:</span> {day.title}</span>
                      <span className="transform group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-gray-600">
                      <ul className="space-y-3">
                        {day.activities.map((activity: string, aIdx: number) => (
                          <li key={aIdx} className="flex items-start gap-3">
                            <span className="text-[#F5A623] mt-1">•</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-poppins font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                  <Check className="text-[#10B981]" /> What's Included
                </h3>
                <ul className="space-y-4">
                  {(pkg.includes || ['Accommodation', 'Daily Breakfast', 'Transfers', 'Sightseeing']).map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-poppins font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                  <X className="text-red-500" /> What's Excluded
                </h3>
                <ul className="space-y-4">
                  {(pkg.excludes || ['Flights/Train tickets', 'Personal expenses', 'Monuments entry fees', 'Travel Insurance']).map((exc, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-2xl font-poppins font-bold text-[#1B2A4A] mb-6">Gallery</h2>
              <GalleryPlaceholder count={6} labels={Array(6).fill(`${pkg.title} View`)} />
            </div>

          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            {/* Desktop Sticky Sidebar */}
            <div className="hidden lg:block sticky top-24">
              <PackageBookingSidebar pkg={pkg} />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="text-xl font-bold text-[#F5A623]">₹{pkg.startingPrice.toLocaleString('en-IN')}</p>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#1B2A4A] text-white px-8 py-3 rounded-xl font-semibold shadow-md"
        >
          Book Now
        </button>
      </div>
    </main>
  );
}
