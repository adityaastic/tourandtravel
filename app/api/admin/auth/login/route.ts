import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCredentials, createAdminSession, AUTH_COOKIE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    if (!verifyAdminCredentials(username.trim(), password.trim())) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = createAdminSession();
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Login failed' }, { status: 500 });
  }
}
