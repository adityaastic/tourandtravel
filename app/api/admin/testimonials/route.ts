import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getTestimonials, saveTestimonials } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
      if (testimonials && testimonials.length > 0) {
        return NextResponse.json(testimonials);
      }
    }
  } catch (err) {
    console.warn('MongoDB testimonials query failed:', err);
  }

  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = {
      ...body,
      rating: Number(body.rating) || 5,
      date: body.date || 'Recently',
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Testimonial.create(data);
        return NextResponse.json({ success: true, testimonial: created }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn('MongoDB testimonial insert failed:', dbErr);
    }

    const testimonials = getTestimonials();
    const newTestimonial = { ...data, id: `test-${Date.now()}` };
    testimonials.unshift(newTestimonial);
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create testimonial' }, { status: 500 });
  }
}
