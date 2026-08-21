import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { getBlogs, saveBlogs } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const found = await Blog.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
      }).lean();
      if (found) {
        return NextResponse.json(found);
      }
    }
  } catch (err) {
    console.warn('MongoDB blog query error:', err);
  }

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

    const updatePayload = {
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((s: string) => s.trim()) : undefined),
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Blog.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }] },
          { $set: updatePayload },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, blog: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB blog update failed:', dbErr);
    }

    const blogs = getBlogs();
    const index = blogs.findIndex((b: any) => b.id === id || b.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...updatePayload };
    saveBlogs(blogs);

    return NextResponse.json({ success: true, blog: blogs[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Blog.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB blog delete failed:', dbErr);
    }

    const blogs = getBlogs();
    const filtered = blogs.filter((b: any) => b.id !== id && b.slug !== id);
    saveBlogs(filtered);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}
