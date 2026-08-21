import { MetadataRoute } from 'next'
import { packages } from '@/lib/data/packages'
import { blogs } from '@/lib/data/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://karunatravels.com'

  const staticRoutes = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/packages`, priority: 0.9 },
    { url: `${baseUrl}/car-booking`, priority: 0.9 },
    { url: `${baseUrl}/blog`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
  ]

  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes.map(route => ({
      ...route,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
    })),
    ...packageRoutes,
    ...blogRoutes,
  ]
}
