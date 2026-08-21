import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Inquiry } from '@/models/Inquiry';
import { getInquiries, saveInquiries, InquiryItem } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
      if (inquiries && inquiries.length > 0) {
        return NextResponse.json(inquiries);
      }
    }
  } catch (err) {
    console.warn('MongoDB inquiries query failed:', err);
  }

  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = {
      ...body,
      status: body.status || 'new',
    };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Inquiry.create(data);
        return NextResponse.json({ success: true, inquiry: created }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn('MongoDB inquiry insert failed:', dbErr);
    }

    const inquiries = getInquiries();
    const newInquiry: InquiryItem = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create inquiry' }, { status: 500 });
  }
}
