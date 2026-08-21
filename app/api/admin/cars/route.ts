import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Car } from '@/models/Car';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getCars, saveCars } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const cars = await Car.find().sort({ pricePerKm: 1 }).lean();
      if (cars && cars.length > 0) {
        return NextResponse.json(cars);
      }
    }
  } catch (err) {
    console.warn('MongoDB cars query failed, using local store fallback:', err);
  }

  const cars = getCars();
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cleanSlug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const carData = {
      ...body,
      slug: cleanSlug,
      seating: Number(body.seating) || 5,
      pricePerKm: Number(body.pricePerKm) || 15,
      pricePerDay: Number(body.pricePerDay) || 2500,
      minimumKm: Number(body.minimumKm) || 250,
      ac: Boolean(body.ac ?? true),
      features: Array.isArray(body.features) ? body.features : (body.features ? body.features.split(',').map((s: string) => s.trim()) : []),
      popularFor: Array.isArray(body.popularFor) ? body.popularFor : (body.popularFor ? body.popularFor.split(',').map((s: string) => s.trim()) : []),
      photoSlot: body.photoSlot || `car-${cleanSlug}`,
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Car.create(carData);
        return NextResponse.json({ success: true, car: created }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn('MongoDB insert failed, saving to local store:', dbErr);
    }

    const cars = getCars();
    const newCar = { ...carData, id: `car-${Date.now()}` };
    cars.unshift(newCar);
    saveCars(cars);

    return NextResponse.json({ success: true, car: newCar }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create car' }, { status: 500 });
  }
}
