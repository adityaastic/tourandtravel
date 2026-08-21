import { NextResponse } from 'next/server';
import { getPackages, savePackages } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
    const packages = getPackages();
    const index = packages.findIndex((p: any) => p.id === id || p.slug === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    packages[index] = {
      ...packages[index],
      ...body,
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : packages[index].highlights),
      includes: Array.isArray(body.includes) ? body.includes : (body.includes ? body.includes.split('\n').filter(Boolean) : packages[index].includes),
      excludes: Array.isArray(body.excludes) ? body.excludes : (body.excludes ? body.excludes.split('\n').filter(Boolean) : packages[index].excludes),
      category: Array.isArray(body.category) ? body.category : (body.category ? [body.category] : packages[index].category),
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
    const packages = getPackages();
    const filtered = packages.filter((p: any) => p.id !== id && p.slug !== id);

    if (filtered.length === packages.length) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    savePackages(filtered);
    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete package' }, { status: 500 });
  }
}
