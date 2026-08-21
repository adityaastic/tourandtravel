import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { getTestimonials, saveTestimonials } from '@/lib/admin-store';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatePayload = {
      ...body,
      rating: Number(body.rating) || body.rating,
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Testimonial.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }] },
          { $set: updatePayload },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, testimonial: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB testimonial update failed:', dbErr);
    }

    const testimonials = getTestimonials();
    const index = testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    testimonials[index] = { ...testimonials[index], ...updatePayload };
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true, testimonial: testimonials[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Testimonial.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB testimonial delete failed:', dbErr);
    }

    const testimonials = getTestimonials();
    const filtered = testimonials.filter((t: any) => t.id !== id);
    saveTestimonials(filtered);

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete testimonial' }, { status: 500 });
  }
}
