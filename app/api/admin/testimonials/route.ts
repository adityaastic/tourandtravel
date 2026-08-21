import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonials } from '@/lib/admin-store';

export async function GET() {
  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonials = getTestimonials();

    const newTestimonial = {
      ...body,
      id: body.id || `test-${Date.now()}`,
      rating: Number(body.rating) || 5,
      date: body.date || 'Recently',
    };

    testimonials.unshift(newTestimonial);
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create testimonial' }, { status: 500 });
  }
}
