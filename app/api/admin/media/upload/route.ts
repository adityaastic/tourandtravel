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

    const ext = path.extname(file.name) || (mediaType === 'video' ? '.mp4' : '.jpg');
    let targetFileName = file.name;

    if (slotName && slotName.trim()) {
      const cleanSlot = slotName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
      targetFileName = `${cleanSlot}${ext}`;
    }

    // 1. Upload to Cloudflare R2 (Object Storage)
    let r2Result = null;
    try {
      const r2Key = mediaType === 'video' ? `videos/${targetFileName}` : `images/${targetFileName}`;
      r2Result = await uploadToR2(buffer, r2Key, file.type || (mediaType === 'video' ? 'video/mp4' : 'image/jpeg'));
      console.log(`✅ Uploaded to Cloudflare R2: ${r2Key}`);
    } catch (r2Err) {
      console.warn('⚠️ Cloudflare R2 upload warning (falling back to disk):', r2Err);
    }

    // 2. Also write to local public folder for dev/static fallback
    const targetDir =
      mediaType === 'video'
        ? path.join(process.cwd(), 'public', 'videos')
        : path.join(process.cwd(), 'public', 'images');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, targetFileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = r2Result ? r2Result.url : (mediaType === 'video' ? `/videos/${targetFileName}` : `/images/${targetFileName}`);

    return NextResponse.json({
      success: true,
      filename: targetFileName,
      url: publicUrl,
      r2Key: r2Result?.key || null,
      size: (buffer.length / 1024).toFixed(1) + ' KB',
      storage: r2Result ? 'Cloudflare R2 Bucket (justourism)' : 'Local Storage',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
