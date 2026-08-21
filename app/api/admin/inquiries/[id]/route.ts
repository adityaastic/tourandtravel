import { NextResponse } from 'next/server';
import { getInquiries, saveInquiries } from '@/lib/admin-store';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const inquiries = getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    inquiries[index] = {
      ...inquiries[index],
      ...body,
    };

    saveInquiries(inquiries);
    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const inquiries = getInquiries();
    const filtered = inquiries.filter((i) => i.id !== id);

    if (filtered.length === inquiries.length) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    saveInquiries(filtered);
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete inquiry' }, { status: 500 });
  }
}
