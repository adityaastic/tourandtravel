import { NextResponse } from 'next/server';
import { getPackages, getCars, getBlogs, getTestimonials, getInquiries } from '@/lib/admin-store';

export async function GET() {
  try {
    const packages = getPackages();
    const cars = getCars();
    const blogs = getBlogs();
    const testimonials = getTestimonials();
    const inquiries = getInquiries();

    const pendingInquiries = inquiries.filter((i) => i.status === 'new').length;
    const confirmedInquiries = inquiries.filter((i) => i.status === 'confirmed').length;

    // Monthly trends mock/calc
    const monthlyStats = [
      { month: 'Apr', inquiries: 18, bookings: 12, revenue: 145000 },
      { month: 'May', inquiries: 29, bookings: 22, revenue: 280000 },
      { month: 'Jun', inquiries: 45, bookings: 34, revenue: 420000 },
      { month: 'Jul', inquiries: 32, bookings: 24, revenue: 310000 },
      { month: 'Aug', inquiries: 54, bookings: 41, revenue: 560000 },
      { month: 'Sep', inquiries: 38, bookings: 30, revenue: 390000 },
    ];

    // Popular categories count
    const categoryCounts: Record<string, number> = {};
    packages.forEach((p: any) => {
      (p.category || []).forEach((cat: string) => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    });

    return NextResponse.json({
      counts: {
        packages: packages.length,
        cars: cars.length,
        blogs: blogs.length,
        testimonials: testimonials.length,
        inquiries: inquiries.length,
        pendingInquiries,
        confirmedInquiries,
      },
      monthlyStats,
      categoryCounts,
      recentInquiries: inquiries.slice(0, 5),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch stats' }, { status: 500 });
  }
}
