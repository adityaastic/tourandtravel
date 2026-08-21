import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  id?: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  review: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, default: 'New Delhi' },
    trip: { type: String, required: true },
    rating: { type: Number, default: 5 },
    review: { type: String, required: true },
    date: { type: String, default: 'Recent' },
  },
  {
    timestamps: true,
  }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
