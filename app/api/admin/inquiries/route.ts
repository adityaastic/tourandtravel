import { NextResponse } from 'next/server';
import { getInquiries, saveInquiries, InquiryItem } from '@/lib/admin-store';

export async function GET() {
  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiries = getInquiries();

    const newInquiry: InquiryItem = {
      ...body,
      id: body.id || `inq-${Date.now()}`,
      status: body.status || 'new',
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create inquiry' }, { status: 500 });
  }
}
