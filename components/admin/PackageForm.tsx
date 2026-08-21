'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PackageFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function PackageForm({ initialData, isEditing = false }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    duration: initialData?.duration || '4 Days / 3 Nights',
    distance: initialData?.distance || 'Delhi → Shimla (350 km)',
    startingPrice: initialData?.startingPrice || 8999,
    category: Array.isArray(initialData?.category) ? initialData.category : ['Mountains'],
    bestTime: initialData?.bestTime || 'Oct-Feb (Snow), Mar-Jun (Pleasant)',
    highlights: Array.isArray(initialData?.highlights) ? initialData.highlights.join('\n') : (initialData?.highlights || ''),
    includes: Array.isArray(initialData?.includes) ? initialData.includes.join('\n') : (initialData?.includes || 'AC Car for full tour\nHotel Stay\nDaily Breakfast\nSightseeing as per itinerary\nToll, Parking & Driver allowance'),
    excludes: Array.isArray(initialData?.excludes) ? initialData.excludes.join('\n') : (initialData?.excludes || 'Personal expenses\nLunch & Dinner\nMonument entry fees\nAdventure sports'),
    description: initialData?.description || '',
    photoSlots: Array.isArray(initialData?.photoSlots) ? initialData.photoSlots.join(', ') : (initialData?.photoSlots || 'destination-hero, destination-sightseeing'),
    featured: initialData?.featured ?? true,
    rating: initialData?.rating || 4.8,
  });

  const categories = [
    'Mountains',
    'Beaches',
    'Wildlife',
    'Heritage',
    'Spiritual',
    'International',
    'Weekend Getaway',
    'Adventure',
    'Honeymoon',
    'Luxury',
  ];

  const handleCategoryToggle = (cat: string) => {
    setFormData((prev) => {
      const current = prev.category || [];
      if (current.includes(cat)) {
        return { ...prev, category: current.filter((c: string) => c !== cat) };
      } else {
        return { ...prev, category: [...current, cat] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startingPrice) {
      toast.error('Title and Starting Price are required');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        startingPrice: Number(formData.startingPrice),
        rating: Number(formData.rating),
        highlights: formData.highlights.split('\n').map((s: string) => s.trim()).filter(Boolean),
        includes: formData.includes.split('\n').map((s: string) => s.trim()).filter(Boolean),
        excludes: formData.excludes.split('\n').map((s: string) => s.trim()).filter(Boolean),
        photoSlots: formData.photoSlots.split(',').map((s: string) => s.trim()).filter(Boolean),
      };

      const url = isEditing
        ? `/api/admin/packages/${initialData.id || initialData.slug}`
        : '/api/admin/packages';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save package');
      }

      toast.success(isEditing ? 'Package updated successfully!' : 'New package published!');
      router.push('/admin/packages');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16">
      {/* Header with Back button & Save button */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Packages</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEditing ? 'Update Tour Package' : 'Publish Tour Package'}</span>
        </button>
      </div>

      {/* Main Form Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Info */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 font-poppins border-b pb-3">
              Package Title & Overview
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Tour Package Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Shimla — Queen of Hills"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Duration (Days / Nights) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 4 Days / 3 Nights"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Starting Price (₹ per person) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                  placeholder="8999"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Route / Distance Details
              </label>
              <input
                type="text"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                placeholder="e.g. Delhi → Shimla (350 km) or Delhi → Srinagar Flight"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Short Description & Marketing Pitch
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief captivating description for package cards and SEO snippets."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>

          {/* Card 2: Highlights & Inclusions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 font-poppins border-b pb-3">
              Itinerary Highlights, Includes & Excludes
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Key Sightseeing Highlights (One per line)
              </label>
              <textarea
                rows={5}
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                placeholder="Mall Road stroll & shopping&#10;Jakhu Temple visit&#10;Kufri snow point&#10;Christ Church colonial heritage"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono text-xs focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  ✅ Includes (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  className="w-full px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-gray-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                  ❌ Excludes (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.excludes}
                  onChange={(e) => setFormData({ ...formData, excludes: e.target.value })}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl text-xs text-gray-900 font-mono focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Categories, Best Time & Photo Slots */}
        <div className="space-y-6">
          {/* Card: Categories */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider border-b pb-2">
              Categories & Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = (formData.category || []).includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5A623] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card: Best Time & Ratings */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider border-b pb-2">
              Settings & Best Season
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Best Time to Visit
              </label>
              <input
                type="text"
                value={formData.bestTime}
                onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                placeholder="e.g. Oct-Mar (Pleasant)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Star Rating (1.0 to 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#F5A623] focus:ring-[#F5A623]"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Feature on Homepage
                </span>
              </label>
            </div>
          </div>

          {/* Card: Media Slots */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <ImageIcon className="w-4 h-4 text-[#F5A623]" />
              <h3 className="text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider">
                Photo Slot Names
              </h3>
            </div>
            <p className="text-[11px] text-gray-500">
              Comma-separated slots mapped to <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">/public/images/[slot].jpg</code>
            </p>
            <input
              type="text"
              value={formData.photoSlots}
              onChange={(e) => setFormData({ ...formData, photoSlots: e.target.value })}
              placeholder="shimla-mall-road, shimla-kufri"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-mono focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
