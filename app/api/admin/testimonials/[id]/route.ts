import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonials } from '@/lib/admin-store';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonials = getTestimonials();
    const index = testimonials.findIndex((t: any) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    testimonials[index] = {
      ...testimonials[index],
      ...body,
      rating: Number(body.rating) || testimonials[index].rating,
    };

    saveTestimonials(testimonials);
    return NextResponse.json({ success: true, testimonial: testimonials[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const testimonials = getTestimonials();
    const filtered = testimonials.filter((t: any) => t.id !== id);

    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    saveTestimonials(filtered);
    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete testimonial' }, { status: 500 });
  }
}
