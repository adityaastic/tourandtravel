'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  BookOpen,
  Eye,
  Edit3,
  Sparkles,
  Loader2,
  Tag,
  Clock,
  User,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface BlogEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Destinations',
    readTime: initialData?.readTime || '7 min read',
    tags: Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : (initialData?.tags || 'delhi, travel, holiday'),
    author: initialData?.author || 'Karuna Travels Team',
    publishedDate: initialData?.publishedDate || new Date().toISOString().split('T')[0],
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '## Overview\n\nWrite detailed travel insights, itinerary suggestions, local food recommendations, and packing tips here...\n\n### Best Places to Visit\n- Point 1\n- Point 2\n- Point 3\n\n### How to Book\nCall Karuna Travels at +91-9911209636 for customized cab and hotel packages.',
    photoSlot: initialData?.photoSlot || 'blog-guide-default',
  });

  const categories = ['Destinations', 'Wildlife', 'Budget Travel', 'Beaches', 'Tips', 'Company', 'Road Trips', 'Heritage'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Title and Blog Content are required');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((s: string) => s.trim()).filter(Boolean),
      };

      const url = isEditing
        ? `/api/admin/blogs/${initialData.id || initialData.slug}`
        : '/api/admin/blogs';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save article');

      toast.success(isEditing ? 'Blog updated successfully!' : 'New blog article published!');
      router.push('/admin/blogs');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'write'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              Live Preview
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isEditing ? 'Save Changes' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Title & Markdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Top 10 Places to Visit in Manali in 2024 — Complete Guide"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-bold text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Excerpt / Meta Description (1-2 sentences)
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Discover the top things to do, snow spots, cafes and best routes in Manali."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            {/* Write vs Preview Toggle */}
            {activeTab === 'write' ? (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Content (Markdown / Text) *
                </label>
                <textarea
                  rows={16}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-900 leading-relaxed focus:ring-2 focus:ring-[#F5A623] outline-none"
                />
              </div>
            ) : (
              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 min-h-[400px]">
                <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-3">
                  {formData.title || 'Untitled Article'}
                </h1>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 pb-4 border-b">
                  <span>By {formData.author}</span>
                  <span>•</span>
                  <span>{formData.publishedDate}</span>
                  <span>•</span>
                  <span>{formData.readTime}</span>
                </div>
                <div className="prose prose-slate max-w-none text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {formData.content}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 col: Settings & Meta */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider border-b pb-2">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 8 min read"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="manali, himachal, snow"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Cover Photo Slot Name
              </label>
              <input
                type="text"
                value={formData.photoSlot}
                onChange={(e) => setFormData({ ...formData, photoSlot: e.target.value })}
                placeholder="blog-manali-guide"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
