import React from 'react';

export default function PackagesLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[300px] bg-gray-200 w-full mb-8"></div>
      
      {/* Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="h-16 bg-gray-200 rounded-xl w-full"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
                  <div className="h-10 bg-gray-200 w-1/3 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
