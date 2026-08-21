import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogs } from '@/lib/data/blogs';
import PhotoPlaceholder from '@/components/media/PhotoPlaceholder';
import JsonLd from '@/components/shared/JsonLd';
import Link from 'next/link';

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.title} | Karuna Travels Blog`,
    description: blog.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) notFound();

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "datePublished": blog.publishedDate,
    "author": [{ "@type": "Person", "name": blog.author }]
  };

  return (
    <main className="bg-bg-light min-h-screen py-12">
      <JsonLd data={articleSchema} />
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="lg:w-2/3 bg-white rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full text-sm font-semibold">{blog.category}</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{blog.readTime}</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{new Date(blog.publishedDate).toLocaleDateString()}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-primary-navy mb-6">{blog.title}</h1>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-primary-navy text-white flex items-center justify-center font-bold text-xl">{blog.author.charAt(0)}</div>
              <div>
                <p className="font-semibold text-primary-navy">{blog.author}</p>
                <p className="text-sm text-gray-500">Travel Expert at Karuna Travels</p>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <PhotoPlaceholder label="Blog Cover" slot={blog.photoSlot} />
            </div>

            <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-primary-navy prose-a:text-accent-orange hover:prose-a:text-accent-gold" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
          
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-poppins font-bold text-primary-navy mb-6">Related Articles</h3>
              <div className="space-y-6">
                {relatedBlogs.map(rb => (
                  <Link key={rb.id} href={`/blog/${rb.slug}`} className="group flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden relative">
                      <PhotoPlaceholder label={rb.title} slot={rb.photoSlot} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-navy group-hover:text-accent-orange transition-colors line-clamp-2 text-sm">{rb.title}</h4>
                      <p className="text-xs text-gray-500 mt-2">{rb.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
