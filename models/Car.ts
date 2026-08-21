import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICar extends Document {
  id?: string;
  slug: string;
  name: string;
  category: string;
  seating: number;
  fuelType: string;
  transmission: string;
  ac: boolean;
  pricePerKm: number;
  minimumKm: number;
  pricePerDay: number;
  features: string[];
  popularFor: string[];
  description?: string;
  photoSlot: string;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, default: 'Sedan' },
    seating: { type: Number, required: true, default: 5 },
    fuelType: { type: String, default: 'Petrol' },
    transmission: { type: String, default: 'Manual' },
    ac: { type: Boolean, default: true },
    pricePerKm: { type: Number, required: true },
    minimumKm: { type: Number, default: 250 },
    pricePerDay: { type: Number, required: true },
    features: { type: [String], default: [] },
    popularFor: { type: [String], default: [] },
    description: { type: String, default: '' },
    photoSlot: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Car: Model<ICar> =
  mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
