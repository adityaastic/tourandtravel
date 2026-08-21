import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/admin-store';

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const current = getSettings();
    const updated = {
      ...current,
      ...body,
      phones: Array.isArray(body.phones) ? body.phones : (body.phones ? body.phones.split(',').map((s: string) => s.trim()) : current.phones),
      socialLinks: {
        ...current.socialLinks,
        ...(body.socialLinks || {}),
      },
      officeHours: {
        ...current.officeHours,
        ...(body.officeHours || {}),
      },
      seo: {
        ...current.seo,
        ...(body.seo || {}),
      },
    };

    saveSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
