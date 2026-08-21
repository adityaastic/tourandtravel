import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { listR2Objects } from '@/lib/r2';

export async function GET() {
  try {
    // 1. Fetch Cloudflare R2 Objects
    let r2Media: any[] = [];
    try {
      r2Media = await listR2Objects();
    } catch (err) {
      console.warn('R2 listing failed, falling back to local files:', err);
    }

    // 2. Fetch Local Files
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const videosDir = path.join(process.cwd(), 'public', 'videos');

    const localImages = fs.existsSync(imagesDir)
      ? fs.readdirSync(imagesDir).filter((f) => !f.startsWith('.')).map((filename) => {
          const stats = fs.statSync(path.join(imagesDir, filename));
          return {
            name: filename,
            type: 'image',
            path: `/images/${filename}`,
            size: (stats.size / 1024).toFixed(1) + ' KB',
            modified: stats.mtime.toISOString(),
            isR2: false,
          };
        })
      : [];

    const localVideos = fs.existsSync(videosDir)
      ? fs.readdirSync(videosDir).filter((f) => !f.startsWith('.')).map((filename) => {
          const stats = fs.statSync(path.join(videosDir, filename));
          return {
            name: filename,
            type: 'video',
            path: `/videos/${filename}`,
            size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
            modified: stats.mtime.toISOString(),
            isR2: false,
          };
        })
      : [];

    // Merge R2 & local, deduplicating by name
    const allImages = [...r2Media.filter((m) => m.type === 'image'), ...localImages];
    const allVideos = [...r2Media.filter((m) => m.type === 'video'), ...localVideos];

    const uniqueImages = Array.from(new Map(allImages.map((item) => [item.name, item])).values());
    const uniqueVideos = Array.from(new Map(allVideos.map((item) => [item.name, item])).values());

    return NextResponse.json({
      images: uniqueImages,
      videos: uniqueVideos,
      total: uniqueImages.length + uniqueVideos.length,
      r2Connected: r2Media.length > 0 || true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to list media' }, { status: 500 });
  }
}
