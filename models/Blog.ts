import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  id?: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  tags: string[];
  photoSlot: string;
  excerpt?: string;
  content: string;
  author: string;
  publishedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Destinations' },
    readTime: { type: String, default: '6 min read' },
    tags: { type: [String], default: [] },
    photoSlot: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    author: { type: String, default: 'Karuna Travels Team' },
    publishedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  {
    timestamps: true,
  }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
