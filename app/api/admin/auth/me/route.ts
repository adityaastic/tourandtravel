import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';

export async function GET() {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: { username: 'Admin', role: 'Super Admin' } });
}
