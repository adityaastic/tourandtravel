import { NextResponse } from 'next/server';
import { getBlogs, saveBlogs } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogs = getBlogs();
  const found = blogs.find((b: any) => b.id === id || b.slug === id);
  if (!found) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const blogs = getBlogs();
    const index = blogs.findIndex((b: any) => b.id === id || b.slug === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    blogs[index] = {
      ...blogs[index],
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((s: string) => s.trim()) : blogs[index].tags),
    };

    saveBlogs(blogs);
    return NextResponse.json({ success: true, blog: blogs[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blogs = getBlogs();
    const filtered = blogs.filter((b: any) => b.id !== id && b.slug !== id);

    if (filtered.length === blogs.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    saveBlogs(filtered);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}
