import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  name: string;
  brandName: string;
  tagline: string;
  owner: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, default: 'global_settings', unique: true },
    name: { type: String, default: 'Karuna Travels' },
    brandName: { type: String, default: 'Just Tourism' },
    tagline: { type: String, default: 'Explore · Travel · Enjoy' },
    owner: { type: String, default: 'Karuna Suryawanshi' },
    phones: { type: [String], default: ['+91-9911209636', '+91-8860978897'] },
    whatsapp: { type: String, default: '919911209636' },
    email: { type: String, default: 'karunadikoshiya000@gmail.com' },
    address: { type: String, default: 'Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002' },
    googleMapsUrl: { type: String, default: 'https://maps.google.com/?q=Daryaganj+Delhi' },
    marqueeAnnouncement: { type: String, default: '🌟 New Package: Shimla 4D/3N @ ₹8,999 | 🔥 Manali Special | 🏔️ Ladakh Season Open | 🌴 Goa Beach Special | ✈️ Dubai Tour @ ₹45,000 | 📞 Call: +91-9911209636' },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/karunatravels' },
      instagram: { type: String, default: 'https://instagram.com/karunatravels' },
      twitter: { type: String, default: 'https://twitter.com/karunatravels' },
      youtube: { type: String, default: 'https://youtube.com/@karunatravels' },
    },
    officeHours: {
      weekdays: { type: String, default: 'Monday - Saturday: 9:00 AM - 8:00 PM' },
      sunday: { type: String, default: 'Sunday: 10:00 AM - 6:00 PM' },
      holidays: { type: String, default: 'Holidays: 24/7 WhatsApp Assistance' },
    },
    seo: {
      defaultTitle: { type: String, default: 'Karuna Travels | Best Travel Agency in Delhi | Just Tourism' },
      description: { type: String, default: "Karuna Travels — Delhi's trusted travel agency. Book tour packages to Shimla, Manali, Kashmir, Goa, Rajasthan & car rentals. +91-9911209636" },
      keywords: { type: String, default: 'travel agency Delhi, tour packages Delhi, Karuna Travels, Just Tourism Delhi, car rental Delhi' },
      googleAnalyticsId: { type: String, default: 'G-XXXXXXXXXX' },
    },
  },
  {
    timestamps: true,
  }
);

export const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;
