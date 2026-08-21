import React from 'react';

export default function PackageDetailLoading() {
  return (
    <div className="w-full animate-pulse pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-8 space-y-8">
            <div className="aspect-video bg-gray-200 rounded-2xl"></div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="h-10 bg-gray-200 w-1/2 rounded"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
            </div>
            
            <div className="aspect-video bg-gray-200 rounded-2xl mt-8"></div>
          </div>
          
          {/* Right Column (Sidebar) Skeleton */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24 h-[500px]">
              <div className="h-8 bg-gray-200 w-3/4 rounded mb-6"></div>
              <div className="h-12 bg-gray-200 w-1/2 rounded mb-8"></div>
              
              <div className="space-y-4 mb-8">
                <div className="h-12 bg-gray-200 w-full rounded"></div>
                <div className="h-12 bg-gray-200 w-full rounded"></div>
                <div className="h-12 bg-gray-200 w-full rounded"></div>
              </div>
              
              <div className="space-y-4">
                <div className="h-14 bg-gray-200 w-full rounded-full"></div>
                <div className="h-14 bg-gray-200 w-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
