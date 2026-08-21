import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Inquiry } from '@/models/Inquiry';
import { getInquiries, saveInquiries } from '@/lib/admin-store';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Inquiry.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }] },
          { $set: body },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, inquiry: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB inquiry update failed:', dbErr);
    }

    const inquiries = getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    inquiries[index] = { ...inquiries[index], ...body };
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Inquiry.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB inquiry delete failed:', dbErr);
    }

    const inquiries = getInquiries();
    const filtered = inquiries.filter((i) => i.id !== id);
    saveInquiries(filtered);

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete inquiry' }, { status: 500 });
  }
}
