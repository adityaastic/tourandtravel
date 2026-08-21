import { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import { blogs } from '@/lib/data/blogs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Travel Blog | Karuna Travels',
  description: 'Travel tips, destination guides, and inspiration for your next adventure with Karuna Travels.',
};

export default function BlogPage() {
  return (
    <main className="bg-[#F8FAFF] min-h-screen pb-20">
      <PageHero title="📖 Travel Blog" subtitle="Tips, guides, and inspiration for your next adventure" />
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {blogs.map((blog, i) => (
              <ScrollFadeUp key={blog.id} delay={i * 0.05}>
                <Link href={`/blog/${blog.slug}`} className="block h-full group">
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden h-full flex flex-col justify-between transition-all hover:shadow-xl group-hover:-translate-y-1 border border-gray-100">
                    <div>
                      <div className="relative aspect-video bg-gray-100">
                        <PhotoPlaceholder label={blog.title} slot={blog.photoSlot} />
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#F5A623] text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {blog.category}
                        </div>
                      </div>
                      <div className="p-3 sm:p-5">
                        <h3 className="font-poppins font-bold text-xs sm:text-base text-[#1B2A4A] mb-1 sm:mb-2 group-hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-[11px] sm:text-xs mb-3 line-clamp-2 hidden sm:block">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 sm:p-5 pt-0 sm:pt-0">
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] sm:text-xs text-gray-400 font-medium">
                        <span className="truncate">{blog.author}</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
