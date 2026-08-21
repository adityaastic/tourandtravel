'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import { blogs } from '@/lib/data/blogs';

export default function BlogPreview() {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeUp>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-poppins font-bold text-4xl text-[#1B2A4A] mb-4">📖 Travel Tips & Inspiration</h2>
              <p className="font-inter text-gray-600 text-lg">Guides, tips, and stories from our experts</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center space-x-2 text-[#F5A623] font-poppins font-semibold hover:text-[#E8921A] transition-colors mt-4 md:mt-0">
              <span>View All Posts</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollFadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.map((blog, idx) => (
            <ScrollFadeUp key={blog.id} delay={idx * 0.1}>
              <Link href={`/blog/${blog.slug || blog.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video w-full overflow-hidden">
                  <PhotoPlaceholder label={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-[#F5A623] text-white px-3 py-1 rounded-full text-xs font-bold font-poppins uppercase tracking-wide">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-poppins font-bold text-xl text-[#1B2A4A] mb-3 group-hover:text-[#F5A623] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-sm line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto flex items-center text-[#1B2A4A] font-poppins font-semibold text-sm">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </ScrollFadeUp>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-[#F5A623] font-poppins font-semibold">
            <span>View All Posts</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
