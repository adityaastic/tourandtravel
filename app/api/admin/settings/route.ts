import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Setting } from '@/models/Setting';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getSettings, saveSettings } from '@/lib/admin-store';

function sanitizeMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.includes('.r2.cloudflarestorage.com/')) {
    const parts = url.split('.r2.cloudflarestorage.com/');
    if (parts[1]) {
      const keyWithBucket = parts[1]; // e.g. "justourism/images/logo.png"
      const cleanKey = keyWithBucket.replace(/^justourism\//, '');
      return `/api/media/${cleanKey}`;
    }
  }
  return url;
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const settings = await Setting.findOne({ key: 'global_settings' }).lean();
      if (settings) {
        const cleaned = {
          ...settings,
          logoUrl: sanitizeMediaUrl(settings.logoUrl || '/logo.png'),
          faviconUrl: sanitizeMediaUrl(settings.faviconUrl || '/favicon.ico'),
          ogImageUrl: sanitizeMediaUrl(settings.ogImageUrl || '/og-image.jpg'),
        };
        return NextResponse.json(cleaned);
      }
    }
  } catch (err) {
    console.warn('MongoDB settings query failed:', err);
  }

  const settings = getSettings();
  const cleaned = {
    ...settings,
    logoUrl: sanitizeMediaUrl(settings.logoUrl || '/logo.png'),
    faviconUrl: sanitizeMediaUrl(settings.faviconUrl || '/favicon.ico'),
    ogImageUrl: sanitizeMediaUrl(settings.ogImageUrl || '/og-image.jpg'),
  };
  return NextResponse.json(cleaned);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const current = getSettings();

    const updatedPayload = {
      ...current,
      ...body,
      logoUrl: sanitizeMediaUrl(body.logoUrl || current.logoUrl),
      faviconUrl: sanitizeMediaUrl(body.faviconUrl || current.faviconUrl),
      ogImageUrl: sanitizeMediaUrl(body.ogImageUrl || current.ogImageUrl),
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
          return NextResponse.json({
            success: true,
            settings: {
              ...updated,
              logoUrl: sanitizeMediaUrl(updated.logoUrl),
              faviconUrl: sanitizeMediaUrl(updated.faviconUrl),
              ogImageUrl: sanitizeMediaUrl(updated.ogImageUrl),
            },
          });
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
