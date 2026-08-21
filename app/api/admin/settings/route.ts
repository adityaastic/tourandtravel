import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Setting } from '@/models/Setting';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getSettings, saveSettings } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const settings = await Setting.findOne({ key: 'global_settings' }).lean();
      if (settings) {
        return NextResponse.json(settings);
      }
    }
  } catch (err) {
    console.warn('MongoDB settings query failed:', err);
  }

  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const current = getSettings();

    const updatedPayload = {
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

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updated = await Setting.findOneAndUpdate(
          { key: 'global_settings' },
          { $set: updatedPayload },
          { new: true, upsert: true }
        ).lean();

        if (updated) {
          return NextResponse.json({ success: true, settings: updated });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB settings update failed:', dbErr);
    }

    saveSettings(updatedPayload);
    return NextResponse.json({ success: true, settings: updatedPayload });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
