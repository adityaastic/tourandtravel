import { NextResponse } from 'next/server';
import { getPackages, savePackages } from '@/lib/admin-store';

export async function GET() {
  const packages = getPackages();
  return NextResponse.json(packages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const packages = getPackages();

    const newPackage = {
      ...body,
      id: body.id || `pkg-${Date.now()}`,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: body.rating || 4.8,
      reviewCount: body.reviewCount || 1,
      featured: body.featured ?? true,
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      includes: Array.isArray(body.includes) ? body.includes : (body.includes ? body.includes.split('\n').filter(Boolean) : []),
      excludes: Array.isArray(body.excludes) ? body.excludes : (body.excludes ? body.excludes.split('\n').filter(Boolean) : []),
      category: Array.isArray(body.category) ? body.category : (body.category ? [body.category] : ['Mountains']),
      photoSlots: Array.isArray(body.photoSlots) && body.photoSlots.length ? body.photoSlots : ['destination-default'],
    };

    packages.unshift(newPackage);
    savePackages(packages);

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create package' }, { status: 500 });
  }
}
