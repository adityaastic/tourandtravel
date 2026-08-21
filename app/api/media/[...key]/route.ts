import { NextResponse } from 'next/server';
import { r2Client, BUCKET_NAME } from '@/lib/r2';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const { key } = await params;
    const objectKey = Array.isArray(key) ? key.join('/') : key;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
    });

    const response = await r2Client.send(command);

    if (!response.Body) {
      return new NextResponse('Media not found', { status: 404 });
    }

    const byteArray = await response.Body.transformToByteArray();

    return new NextResponse(Buffer.from(byteArray), {
      headers: {
        'Content-Type': response.ContentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': byteArray.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error fetching R2 object:', error);
    return new NextResponse('Media not found', { status: 404 });
  }
}
