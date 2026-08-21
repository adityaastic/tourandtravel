import { NextResponse } from 'next/server';
import { getCars, saveCars } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cars = getCars();
  const found = cars.find((c: any) => c.id === id || c.slug === id);
  if (!found) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cars = getCars();
    const index = cars.findIndex((c: any) => c.id === id || c.slug === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    cars[index] = {
      ...cars[index],
      ...body,
      seating: Number(body.seating) || cars[index].seating,
      pricePerKm: Number(body.pricePerKm) || cars[index].pricePerKm,
      pricePerDay: Number(body.pricePerDay) || cars[index].pricePerDay,
      minimumKm: Number(body.minimumKm) || cars[index].minimumKm,
      ac: body.ac !== undefined ? Boolean(body.ac) : cars[index].ac,
      features: Array.isArray(body.features) ? body.features : (body.features ? body.features.split(',').map((s: string) => s.trim()) : cars[index].features),
      popularFor: Array.isArray(body.popularFor) ? body.popularFor : (body.popularFor ? body.popularFor.split(',').map((s: string) => s.trim()) : cars[index].popularFor),
    };

    saveCars(cars);
    return NextResponse.json({ success: true, car: cars[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cars = getCars();
    const filtered = cars.filter((c: any) => c.id !== id && c.slug !== id);

    if (filtered.length === cars.length) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    saveCars(filtered);
    return NextResponse.json({ success: true, message: 'Car deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete car' }, { status: 500 });
  }
}
