import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPackage extends Document {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  duration: string;
  distance?: string;
  startingPrice: number;
  category: string[];
  rating: number;
  reviewCount: number;
  highlights: string[];
  includes: string[];
  excludes: string[];
  bestTime?: string;
  photoSlots: string[];
  description?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    duration: { type: String, required: true },
    distance: { type: String, default: '' },
    startingPrice: { type: Number, required: true },
    category: { type: [String], default: ['Mountains'] },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 10 },
    highlights: { type: [String], default: [] },
    includes: { type: [String], default: [] },
    excludes: { type: [String], default: [] },
    bestTime: { type: String, default: '' },
    photoSlots: { type: [String], default: [] },
    description: { type: String, default: '' },
    featured: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Package: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);

export default Package;
