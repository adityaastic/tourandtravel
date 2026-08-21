import fs from 'fs';
import path from 'path';
import { packages as initialPackages } from '@/lib/data/packages';
import { cars as initialCars } from '@/lib/data/cars';
import { blogs as initialBlogs } from '@/lib/data/blogs';
import { testimonials as initialTestimonials } from '@/lib/data/testimonials';
import { SITE_CONFIG } from '@/lib/constants';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: 'package' | 'car' | 'custom' | 'contact';
  itemName?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: number;
  pickupLocation?: string;
  dropLocation?: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  brandName: string;
  tagline: string;
  owner: string;
  logoUrl?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  marqueeAnnouncement: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  officeHours: {
    weekdays: string;
    sunday: string;
    holidays: string;
  };
  seo: {
    defaultTitle: string;
    description: string;
    keywords: string;
    googleAnalyticsId: string;
  };
}

const initialInquiries: InquiryItem[] = [
  {
    id: 'inq-101',
    name: 'Rahul Sharma',
    phone: '+91-9876543210',
    email: 'rahul.s@gmail.com',
    type: 'package',
    itemName: 'Manali — Adventure Capital of India',
    travelDate: '2026-09-15',
    returnDate: '2026-09-20',
    passengers: 4,
    message: 'Need 2 deluxe rooms with river view and private cab for Rohtang pass.',
    status: 'confirmed',
    notes: 'Advance received. Assigned Innova Crysta.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'inq-102',
    name: 'Pooja Aggarwal',
    phone: '+91-9811223344',
    email: 'pooja.agg@outlook.com',
    type: 'car',
    itemName: 'Toyota Innova (Crysta)',
    travelDate: '2026-08-28',
    pickupLocation: 'Daryaganj, Delhi',
    dropLocation: 'Agra Taj Mahal & Return',
    passengers: 6,
    message: 'Same day Agra return trip. Need experienced driver.',
    status: 'new',
    notes: 'Quoted standard outstation per km rate.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'inq-103',
    name: 'Amitabh Verma',
    phone: '+91-9988776655',
    email: 'amitabh.v@gmail.com',
    type: 'package',
    itemName: 'Kashmir — Paradise on Earth',
    travelDate: '2026-10-05',
    returnDate: '2026-10-11',
    passengers: 2,
    message: 'Honeymoon couple special setup with houseboat at Dal lake.',
    status: 'contacted',
    notes: 'Sent customized itinerary on WhatsApp.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'inq-104',
    name: 'Vikas Mehra',
    phone: '+91-9711002233',
    type: 'custom',
    travelDate: '2026-09-02',
    pickupLocation: 'Delhi Airport T3',
    dropLocation: 'Jim Corbett Resort',
    passengers: 5,
    message: 'Require Mahindra Scorpio N for jungle trip 3 days.',
    status: 'new',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

const initialSettings: SiteSettings = {
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
  socialLinks: {
    facebook: 'https://facebook.com/karunatravels',
    instagram: 'https://instagram.com/karunatravels',
    twitter: 'https://twitter.com/karunatravels',
    youtube: 'https://youtube.com/@karunatravels',
  },
  officeHours: {
    weekdays: 'Monday - Saturday: 9:00 AM - 8:00 PM',
    sunday: 'Sunday: 10:00 AM - 6:00 PM',
    holidays: 'Holidays: 24/7 WhatsApp Assistance',
  },
  seo: {
    defaultTitle: 'Karuna Travels | Best Travel Agency in Delhi | Just Tourism',
    description: "Karuna Travels — Delhi's trusted travel agency. Book tour packages to Shimla, Manali, Kashmir, Goa, Rajasthan & car rentals. +91-9911209636",
    keywords: 'travel agency Delhi, tour packages Delhi, Karuna Travels, Just Tourism Delhi, car rental Delhi, Daryaganj travel agent',
    googleAnalyticsId: 'G-XXXXXXXXXX',
  },
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(name: string): string {
  ensureDir();
  return path.join(DATA_DIR, `${name}.json`);
}

export function readData<T>(name: string, fallback: T): T {
  try {
    const fp = getFilePath(name);
    if (!fs.existsSync(fp)) {
      writeData(name, fallback);
      return fallback;
    }
    const content = fs.readFileSync(fp, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${name}.json:`, error);
    return fallback;
  }
}

export function writeData<T>(name: string, data: T): void {
  try {
    const fp = getFilePath(name);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${name}.json:`, error);
  }
}

// Accessors
export function getPackages() {
  return readData('packages', initialPackages);
}
export function savePackages(data: any) {
  writeData('packages', data);
}

export function getCars() {
  return readData('cars', initialCars);
}
export function saveCars(data: any) {
  writeData('cars', data);
}

export function getBlogs() {
  return readData('blogs', initialBlogs);
}
export function saveBlogs(data: any) {
  writeData('blogs', data);
}

export function getTestimonials() {
  return readData('testimonials', initialTestimonials);
}
export function saveTestimonials(data: any) {
  writeData('testimonials', data);
}

export function getInquiries(): InquiryItem[] {
  return readData<InquiryItem[]>('inquiries', initialInquiries);
}
export function saveInquiries(data: InquiryItem[]) {
  writeData('inquiries', data);
}

export function getSettings(): SiteSettings {
  return readData<SiteSettings>('settings', initialSettings);
}
export function saveSettings(data: SiteSettings) {
  writeData('settings', data);
}
