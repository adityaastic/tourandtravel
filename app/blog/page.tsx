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
    <main>
      <PageHero title="📖 Travel Blog" subtitle="Tips, guides, and inspiration for your next adventure" />
      <section className="py-16 bg-bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <ScrollFadeUp key={blog.id} delay={i * 0.1}>
                <Link href={`/blog/${blog.slug}`} className="block h-full group">
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col transition-all hover:shadow-lg group-hover:-translate-y-1">
                    <div className="relative aspect-video">
                      <PhotoPlaceholder label={blog.title} slot={blog.photoSlot} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-navy px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-poppins font-semibold text-lg text-primary-navy mb-2 group-hover:text-accent-orange transition-colors">{blog.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                        <span className="font-medium">{blog.author}</span>
                        <span>{new Date(blog.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {blog.readTime}</span>
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
