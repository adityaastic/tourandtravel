import { NextResponse } from 'next/server';
import { getBlogs, saveBlogs } from '@/lib/admin-store';

export async function GET() {
  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blogs = getBlogs();

    const newBlog = {
      ...body,
      id: body.id || `blog-${Date.now()}`,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      author: body.author || 'Karuna Travels Team',
      publishedDate: body.publishedDate || new Date().toISOString().split('T')[0],
      readTime: body.readTime || '6 min read',
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((s: string) => s.trim()) : ['Travel', 'Guide']),
      photoSlot: body.photoSlot || `blog-${body.slug || 'guide'}`,
    };

    blogs.unshift(newBlog);
    saveBlogs(blogs);

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
