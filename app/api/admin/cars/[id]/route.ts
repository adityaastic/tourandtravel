import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Car } from '@/models/Car';
import { getCars, saveCars } from '@/lib/admin-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const found = await Car.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
      }).lean();
      if (found) {
        return NextResponse.json(found);
      }
    }
  } catch (err) {
    console.warn('MongoDB query error:', err);
  }

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

    const updatePayload = {
      ...body,
      seating: Number(body.seating) || body.seating,
      pricePerKm: Number(body.pricePerKm) || body.pricePerKm,
      pricePerDay: Number(body.pricePerDay) || body.pricePerDay,
      minimumKm: Number(body.minimumKm) || body.minimumKm,
      ac: body.ac !== undefined ? Boolean(body.ac) : undefined,
      features: Array.isArray(body.features) ? body.features : (body.features ? body.features.split(',').map((s: string) => s.trim()) : undefined),
      popularFor: Array.isArray(body.popularFor) ? body.popularFor : (body.popularFor ? body.popularFor.split(',').map((s: string) => s.trim()) : undefined),
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Car.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }] },
          { $set: updatePayload },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, car: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB update failed, saving locally:', dbErr);
    }

    const cars = getCars();
    const index = cars.findIndex((c: any) => c.id === id || c.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    cars[index] = { ...cars[index], ...updatePayload };
    saveCars(cars);

    return NextResponse.json({ success: true, car: cars[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Car.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB delete failed:', dbErr);
    }

    const cars = getCars();
    const filtered = cars.filter((c: any) => c.id !== id && c.slug !== id);
    saveCars(filtered);

    return NextResponse.json({ success: true, message: 'Car deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete car' }, { status: 500 });
  }
}
