import connectToDatabase from './mongodb';
import { Package } from '@/models/Package';
import { Car } from '@/models/Car';
import { Blog } from '@/models/Blog';
import { Testimonial } from '@/models/Testimonial';
import { Inquiry } from '@/models/Inquiry';
import { Setting } from '@/models/Setting';
import { packages as initialPackages } from '@/lib/data/packages';
import { cars as initialCars } from '@/lib/data/cars';
import { blogs as initialBlogs } from '@/lib/data/blogs';
import { testimonials as initialTestimonials } from '@/lib/data/testimonials';
import { SITE_CONFIG } from '@/lib/constants';

let isSeeded = false;

export async function autoSeedDatabase() {
  if (isSeeded) return;

  try {
    const conn = await connectToDatabase();
    if (!conn) return;

    // 1. Seed Packages
    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      console.log('🌱 Seeding Packages into MongoDB Atlas...');
      await Package.insertMany(
        initialPackages.map((p) => ({
          ...p,
          slug: p.slug,
          category: p.category,
          rating: p.rating || 4.8,
          reviewCount: p.reviewCount || 12,
          featured: p.featured ?? true,
        }))
      );
      console.log(`✅ Seeded ${initialPackages.length} packages.`);
    }

    // 2. Seed Cars
    const carCount = await Car.countDocuments();
    if (carCount === 0) {
      console.log('🌱 Seeding Cars into MongoDB Atlas...');
      await Car.insertMany(
        initialCars.map((c) => ({
          ...c,
          slug: c.slug,
        }))
      );
      console.log(`✅ Seeded ${initialCars.length} cars.`);
    }

    // 3. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('🌱 Seeding Blogs into MongoDB Atlas...');
      await Blog.insertMany(
        initialBlogs.map((b) => ({
          ...b,
          slug: b.slug,
        }))
      );
      console.log(`✅ Seeded ${initialBlogs.length} blogs.`);
    }

    // 4. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      console.log('🌱 Seeding Testimonials into MongoDB Atlas...');
      await Testimonial.insertMany(
        initialTestimonials.map((t) => ({
          ...t,
        }))
      );
      console.log(`✅ Seeded ${initialTestimonials.length} testimonials.`);
    }

    // 5. Seed Settings
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      console.log('🌱 Seeding Default Settings into MongoDB Atlas...');
      await Setting.create({
        key: 'global_settings',
        name: SITE_CONFIG.name || 'Karuna Travels',
        brandName: SITE_CONFIG.brandName || 'Just Tourism',
        tagline: SITE_CONFIG.tagline || 'Explore · Travel · Enjoy',
        owner: SITE_CONFIG.owner || 'Karuna Suryawanshi',
        phones: SITE_CONFIG.phones || ['+91-9911209636', '+91-8860978897'],
        whatsapp: '919911209636',
        email: SITE_CONFIG.email || 'karunadikoshiya000@gmail.com',
        address: SITE_CONFIG.address || 'Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002',
        googleMapsUrl: 'https://maps.google.com/?q=Daryaganj+Delhi',
        marqueeAnnouncement: '🌟 New Package: Shimla 4D/3N @ ₹8,999 | 🔥 Manali Special | 🏔️ Ladakh Season Open | 🌴 Goa Beach Special | ✈️ Dubai Tour @ ₹45,000 | 📞 Call: +91-9911209636',
      });
      console.log('✅ Seeded default settings.');
    }

    isSeeded = true;
  } catch (error) {
    console.error('❌ Error during auto-seeding:', error);
  }
}
