import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getBlogs, saveBlogs } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
      if (blogs && blogs.length > 0) {
        return NextResponse.json(blogs);
      }
    }
  } catch (err) {
    console.warn('MongoDB blogs query failed, using local store fallback:', err);
  }

  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cleanSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const blogData = {
      ...body,
      slug: cleanSlug,
      author: body.author || 'Karuna Travels Team',
      publishedDate: body.publishedDate || new Date().toISOString().split('T')[0],
      readTime: body.readTime || '6 min read',
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((s: string) => s.trim()) : ['Travel', 'Guide']),
      photoSlot: body.photoSlot || `blog-${cleanSlug}`,
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Blog.create(blogData);
        return NextResponse.json({ success: true, blog: created }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn('MongoDB blog insert failed, saving locally:', dbErr);
    }

    const blogs = getBlogs();
    const newBlog = { ...blogData, id: `blog-${Date.now()}` };
    blogs.unshift(newBlog);
    saveBlogs(blogs);

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
