import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Package } from '@/models/Package';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getPackages, savePackages } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const packages = await Package.find().sort({ createdAt: -1 }).lean();
      if (packages && packages.length > 0) {
        return NextResponse.json(packages);
      }
    }
  } catch (err) {
    console.warn('MongoDB query failed, using local store fallback:', err);
  }

  // Fallback to local store
  const packages = getPackages();
  return NextResponse.json(packages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cleanSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const packageData = {
      ...body,
      slug: cleanSlug,
      rating: Number(body.rating) || 4.8,
      startingPrice: Number(body.startingPrice) || 8999,
      reviewCount: body.reviewCount || 10,
      featured: body.featured ?? true,
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      includes: Array.isArray(body.includes) ? body.includes : (body.includes ? body.includes.split('\n').filter(Boolean) : []),
      excludes: Array.isArray(body.excludes) ? body.excludes : (body.excludes ? body.excludes.split('\n').filter(Boolean) : []),
      category: Array.isArray(body.category) ? body.category : (body.category ? [body.category] : ['Mountains']),
      photoSlots: Array.isArray(body.photoSlots) && body.photoSlots.length ? body.photoSlots : ['destination-default'],
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Package.create(packageData);
        return NextResponse.json({ success: true, package: created }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn('MongoDB insert failed, saving to local store:', dbErr);
    }

    // Local fallback
    const packages = getPackages();
    const newPackage = { ...packageData, id: `pkg-${Date.now()}` };
    packages.unshift(newPackage);
    savePackages(packages);

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create package' }, { status: 500 });
  }
}
