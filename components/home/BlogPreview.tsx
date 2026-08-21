'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { blogs } from '@/lib/data/blogs';

export default function BlogPreview() {
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F5A623] mb-1.5 block">
                Travel Guides & Advice
              </span>
              <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#1B2A4A] mb-1">
                📖 Travel Tips & Inspiration
              </h2>
              <p className="font-inter text-gray-500 text-xs sm:text-base">
                Expert travel advice, itineraries, and destination guides
              </p>
            </div>
            <Link 
              href="/blog" 
              className="hidden sm:inline-flex items-center gap-1.5 text-[#F5A623] font-poppins font-bold text-sm hover:text-[#E8921A] transition-colors mt-3 sm:mt-0"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollFadeUp>

        {/* 2-Column Mobile Grid / 3-Column Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {displayBlogs.map((blog, idx) => (
            <ScrollFadeUp key={blog.id} delay={idx * 0.05}>
              <Link 
                href={`/blog/${blog.slug || blog.id}`} 
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all h-full justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <PhotoPlaceholder 
                      label={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#F5A623] text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-poppins uppercase tracking-wider shadow-sm">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    <h3 className="font-poppins font-bold text-xs sm:text-base text-[#1B2A4A] group-hover:text-[#F5A623] transition-colors line-clamp-2 mb-1.5 sm:mb-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="font-inter text-[11px] sm:text-xs text-gray-500 line-clamp-2 hidden sm:block leading-relaxed mb-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-5 pt-0 sm:pt-0">
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[#F5A623] font-poppins font-semibold text-[10px] sm:text-xs">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollFadeUp>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white px-6 py-2.5 rounded-full font-poppins font-bold text-xs shadow-md"
          >
            <span>View All Travel Blogs →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
