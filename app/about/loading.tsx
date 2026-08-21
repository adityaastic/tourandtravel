import React from 'react';

export default function AboutLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[400px] bg-gray-200 w-full mb-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
          ))}
        </div>

        {/* Founder Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="aspect-[3/4] bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4 pt-8">
            <div className="h-10 bg-gray-200 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
            <div className="h-32 bg-gray-200 w-full rounded mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
