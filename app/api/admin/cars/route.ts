import { NextResponse } from 'next/server';
import { getCars, saveCars } from '@/lib/admin-store';

export async function GET() {
  const cars = getCars();
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cars = getCars();

    const newCar = {
      ...body,
      id: body.id || `car-${Date.now()}`,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      seating: Number(body.seating) || 5,
      pricePerKm: Number(body.pricePerKm) || 15,
      pricePerDay: Number(body.pricePerDay) || 2500,
      minimumKm: Number(body.minimumKm) || 250,
      ac: Boolean(body.ac ?? true),
      features: Array.isArray(body.features) ? body.features : (body.features ? body.features.split(',').map((s: string) => s.trim()) : []),
      popularFor: Array.isArray(body.popularFor) ? body.popularFor : (body.popularFor ? body.popularFor.split(',').map((s: string) => s.trim()) : []),
      photoSlot: body.photoSlot || `car-${body.slug || 'default'}`,
    };

    cars.unshift(newCar);
    saveCars(cars);

    return NextResponse.json({ success: true, car: newCar }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create car' }, { status: 500 });
  }
}
