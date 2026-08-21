import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Package } from '@/models/Package';
import { getPackages, savePackages } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const found = await Package.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
      }).lean();
      if (found) {
        return NextResponse.json(found);
      }
    }
  } catch (err) {
    console.warn('MongoDB query error:', err);
  }

  const packages = getPackages();
  const found = packages.find((p: any) => p.id === id || p.slug === id);
  if (!found) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatePayload = {
      ...body,
      startingPrice: Number(body.startingPrice) || body.startingPrice,
      rating: Number(body.rating) || body.rating,
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : undefined),
      includes: Array.isArray(body.includes) ? body.includes : (body.includes ? body.includes.split('\n').filter(Boolean) : undefined),
      excludes: Array.isArray(body.excludes) ? body.excludes : (body.excludes ? body.excludes.split('\n').filter(Boolean) : undefined),
      category: Array.isArray(body.category) ? body.category : (body.category ? [body.category] : undefined),
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Package.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }] },
          { $set: updatePayload },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, package: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB update failed, saving locally:', dbErr);
    }

    // Local fallback
    const packages = getPackages();
    const index = packages.findIndex((p: any) => p.id === id || p.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    packages[index] = {
      ...packages[index],
      ...updatePayload,
    };
    savePackages(packages);

    return NextResponse.json({ success: true, package: packages[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Package.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB delete failed:', dbErr);
    }

    const packages = getPackages();
    const filtered = packages.filter((p: any) => p.id !== id && p.slug !== id);
    savePackages(filtered);

    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete package' }, { status: 500 });
  }
}
