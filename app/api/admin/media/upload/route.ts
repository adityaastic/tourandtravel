import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const slotName = formData.get('slotName') as string | null;
    const mediaType = (formData.get('mediaType') as string) || 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || (mediaType === 'video' ? '.mp4' : '.png');
    let targetFileName = file.name;

    if (slotName && slotName.trim()) {
      const cleanSlot = slotName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
      targetFileName = `${cleanSlot}${ext}`;
    }

    // 1. Upload to Cloudflare R2 (Primary Storage for Vercel/Production)
    let r2Result = null;
    let r2Error: any = null;

    try {
      const r2Key = mediaType === 'video' ? `videos/${targetFileName}` : `images/${targetFileName}`;
      r2Result = await uploadToR2(
        buffer,
        r2Key,
        file.type || (mediaType === 'video' ? 'video/mp4' : 'image/png')
      );
      console.log(`✅ Uploaded to Cloudflare R2: ${r2Key}`);
    } catch (err: any) {
      r2Error = err;
      console.warn('⚠️ Cloudflare R2 upload warning:', err?.message || err);
    }

    // 2. Safe local disk write fallback (Only for local development, never throws on Vercel)
    let localSaved = false;
    try {
      const targetDir =
        mediaType === 'video'
          ? path.join(process.cwd(), 'public', 'videos')
          : path.join(process.cwd(), 'public', 'images');

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const filePath = path.join(targetDir, targetFileName);
      fs.writeFileSync(filePath, buffer);
      localSaved = true;
    } catch (fsErr) {
      // Ignored safely on Vercel Serverless read-only filesystem
    }

    // 3. Determine public URL
    let publicUrl = '';
    if (r2Result) {
      publicUrl = r2Result.url;
    } else if (localSaved) {
      publicUrl = mediaType === 'video' ? `/videos/${targetFileName}` : `/images/${targetFileName}`;
    } else {
      // Fallback base64 data URL if neither R2 nor local disk was writable
      const mimeType = file.type || (mediaType === 'video' ? 'video/mp4' : 'image/png');
      publicUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
    }

    return NextResponse.json({
      success: true,
      filename: targetFileName,
      url: publicUrl,
      r2Key: r2Result?.key || null,
      size: (buffer.length / 1024).toFixed(1) + ' KB',
      storage: r2Result ? 'Cloudflare R2 (justourism)' : (localSaved ? 'Local Disk' : 'Base64 Data'),
    });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
