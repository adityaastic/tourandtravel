import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    type: { type: String, enum: ['package', 'car', 'custom', 'contact'], default: 'custom' },
    itemName: { type: String, default: '' },
    travelDate: { type: String, default: '' },
    returnDate: { type: String, default: '' },
    passengers: { type: Number, default: 2 },
    pickupLocation: { type: String, default: '' },
    dropLocation: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
      index: true,
    },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
