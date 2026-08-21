import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const videosDir = path.join(process.cwd(), 'public', 'videos');

    const images = fs.existsSync(imagesDir)
      ? fs.readdirSync(imagesDir).filter((f) => !f.startsWith('.')).map((filename) => {
          const stats = fs.statSync(path.join(imagesDir, filename));
          return {
            name: filename,
            type: 'image',
            path: `/images/${filename}`,
            size: (stats.size / 1024).toFixed(1) + ' KB',
            modified: stats.mtime.toISOString(),
          };
        })
      : [];

    const videos = fs.existsSync(videosDir)
      ? fs.readdirSync(videosDir).filter((f) => !f.startsWith('.')).map((filename) => {
          const stats = fs.statSync(path.join(videosDir, filename));
          return {
            name: filename,
            type: 'video',
            path: `/videos/${filename}`,
            size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
            modified: stats.mtime.toISOString(),
          };
        })
      : [];

    return NextResponse.json({
      images,
      videos,
      total: images.length + videos.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to list media' }, { status: 500 });
  }
}
