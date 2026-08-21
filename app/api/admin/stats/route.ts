import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Package } from '@/models/Package';
import { Car } from '@/models/Car';
import { Blog } from '@/models/Blog';
import { Testimonial } from '@/models/Testimonial';
import { Inquiry } from '@/models/Inquiry';
import { autoSeedDatabase } from '@/lib/db-seed';
import { getPackages, getCars, getBlogs, getTestimonials, getInquiries } from '@/lib/admin-store';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await autoSeedDatabase();
      const [packageCount, carCount, blogCount, testimonialCount, inquiries] = await Promise.all([
        Package.countDocuments(),
        Car.countDocuments(),
        Blog.countDocuments(),
        Testimonial.countDocuments(),
        Inquiry.find().sort({ createdAt: -1 }).limit(10).lean(),
      ]);

      const totalInquiries = await Inquiry.countDocuments();
      const pendingInquiries = await Inquiry.countDocuments({ status: 'new' });
      const confirmedInquiries = await Inquiry.countDocuments({ status: 'confirmed' });

      const monthlyStats = [
        { month: 'Apr', inquiries: 18, bookings: 12, revenue: 145000 },
        { month: 'May', inquiries: 29, bookings: 22, revenue: 280000 },
        { month: 'Jun', inquiries: 45, bookings: 34, revenue: 420000 },
        { month: 'Jul', inquiries: 32, bookings: 24, revenue: 310000 },
        { month: 'Aug', inquiries: 54, bookings: 41, revenue: 560000 },
        { month: 'Sep', inquiries: 38, bookings: 30, revenue: 390000 },
      ];

      return NextResponse.json({
        counts: {
          packages: packageCount || 20,
          cars: carCount || 15,
          blogs: blogCount || 9,
          testimonials: testimonialCount || 8,
          inquiries: totalInquiries || inquiries.length,
          pendingInquiries,
          confirmedInquiries,
        },
        monthlyStats,
        recentInquiries: inquiries,
        isMongoConnected: true,
      });
    }
  } catch (err) {
    console.warn('MongoDB stats query failed, using local store:', err);
  }

  // Fallback to local store
  const packages = getPackages();
  const cars = getCars();
  const blogs = getBlogs();
  const testimonials = getTestimonials();
  const inquiries = getInquiries();

  const pendingInquiries = inquiries.filter((i) => i.status === 'new').length;
  const confirmedInquiries = inquiries.filter((i) => i.status === 'confirmed').length;

  const monthlyStats = [
    { month: 'Apr', inquiries: 18, bookings: 12, revenue: 145000 },
    { month: 'May', inquiries: 29, bookings: 22, revenue: 280000 },
    { month: 'Jun', inquiries: 45, bookings: 34, revenue: 420000 },
    { month: 'Jul', inquiries: 32, bookings: 24, revenue: 310000 },
    { month: 'Aug', inquiries: 54, bookings: 41, revenue: 560000 },
    { month: 'Sep', inquiries: 38, bookings: 30, revenue: 390000 },
  ];

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
    recentInquiries: inquiries.slice(0, 5),
    isMongoConnected: false,
  });
}
