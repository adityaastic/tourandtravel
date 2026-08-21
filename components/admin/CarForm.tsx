'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Car,
  Users,
  Fuel,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CarFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function CarForm({ initialData, isEditing = false }: CarFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Premium SUV',
    seating: initialData?.seating || 7,
    fuelType: initialData?.fuelType || 'Diesel',
    transmission: initialData?.transmission || 'Manual',
    ac: initialData?.ac ?? true,
    pricePerKm: initialData?.pricePerKm || 20,
    pricePerDay: initialData?.pricePerDay || 4500,
    minimumKm: initialData?.minimumKm || 250,
    features: Array.isArray(initialData?.features) ? initialData.features.join(', ') : (initialData?.features || 'Music System, USB Charging, Airbags, ABS'),
    popularFor: Array.isArray(initialData?.popularFor) ? initialData.popularFor.join(', ') : (initialData?.popularFor || 'Outstation, Hill Stations, Family Tours'),
    description: initialData?.description || '',
    photoSlot: initialData?.photoSlot || 'car-default',
    isAvailable: initialData?.isAvailable ?? true,
    status: initialData?.status || 'Available',
    unavailableDates: Array.isArray(initialData?.unavailableDates) ? initialData.unavailableDates.join(', ') : (initialData?.unavailableDates || ''),
  });

  const categories = ['Hatchback', 'Sedan', 'MUV', 'Premium MUV', 'Compact SUV', 'Body-on-Frame SUV', 'Premium SUV', 'Off-Road SUV', 'MPV/Van'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.pricePerKm) {
      toast.error('Car name and Price Per Km are required');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        seating: Number(formData.seating),
        pricePerKm: Number(formData.pricePerKm),
        pricePerDay: Number(formData.pricePerDay),
        minimumKm: Number(formData.minimumKm),
        features: formData.features.split(',').map((s: string) => s.trim()).filter(Boolean),
        popularFor: formData.popularFor.split(',').map((s: string) => s.trim()).filter(Boolean),
        unavailableDates: formData.unavailableDates ? formData.unavailableDates.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      };

      const url = isEditing
        ? `/api/admin/cars/${initialData.id || initialData.slug}`
        : '/api/admin/cars';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save car');

      toast.success(isEditing ? 'Car updated successfully!' : 'New vehicle added to fleet!');
      router.push('/admin/cars');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/cars"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEditing ? 'Update Vehicle' : 'Add Vehicle to Fleet'}</span>
        </button>
      </div>

      {/* Availability Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 className="font-bold text-emerald-950 text-base font-poppins flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Fleet Availability Control</span>
            </h4>
            <p className="text-xs text-emerald-800/80">
              Set whether this vehicle is currently available for customers to book online.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={formData.status}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({
                  ...formData,
                  status: val as any,
                  isAvailable: val === 'Available',
                });
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 font-bold text-xs text-emerald-900 shadow-sm focus:outline-none"
            >
              <option value="Available">🟢 Available for Booking</option>
              <option value="Booked">🔴 Out on Trip / Booked</option>
              <option value="Maintenance">🟡 Under Maintenance</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Unavailable Specific Dates (Optional, Comma-separated YYYY-MM-DD)</span>
          </label>
          <input
            type="text"
            value={formData.unavailableDates}
            onChange={(e) => setFormData({ ...formData, unavailableDates: e.target.value })}
            placeholder="e.g. 2026-08-25, 2026-08-26, 2026-09-01"
            className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 font-poppins border-b pb-3">
          Vehicle Information & Specs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Vehicle Model Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Toyota Innova (Crysta) or Mahindra Thar"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Body Type / Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-orange-50/50 p-5 rounded-2xl border border-orange-200/50">
          <div>
            <label className="block text-xs font-bold text-orange-900 uppercase tracking-wider mb-1.5">
              Rate per Km (₹) *
            </label>
            <input
              type="number"
              required
              value={formData.pricePerKm}
              onChange={(e) => setFormData({ ...formData, pricePerKm: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-orange-900 uppercase tracking-wider mb-1.5">
              Day Rental Rate (₹) *
            </label>
            <input
              type="number"
              required
              value={formData.pricePerDay}
              onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-orange-900 uppercase tracking-wider mb-1.5">
              Min Km / Day
            </label>
            <input
              type="number"
              value={formData.minimumKm}
              onChange={(e) => setFormData({ ...formData, minimumKm: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Seating Capacity (Pax)
            </label>
            <input
              type="number"
              min="2"
              max="20"
              value={formData.seating}
              onChange={(e) => setFormData({ ...formData, seating: Number(e.target.value) })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Fuel Type
            </label>
            <input
              type="text"
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              placeholder="e.g. Diesel or Petrol/CNG"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Transmission
            </label>
            <select
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>

        {/* AC check & Photo slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Photo Slot Name
            </label>
            <input
              type="text"
              value={formData.photoSlot}
              onChange={(e) => setFormData({ ...formData, photoSlot: e.target.value })}
              placeholder="e.g. car-toyota-innova"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ac}
                onChange={(e) => setFormData({ ...formData, ac: e.target.checked })}
                className="w-4 h-4 rounded text-[#F5A623] focus:ring-[#F5A623]"
              />
              <span className="text-xs font-bold text-gray-800">
                Air Conditioned (AC Vehicle)
              </span>
            </label>
          </div>
        </div>

        {/* Features & Popular tags */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Key Features (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Connected Car Tech, 360 Camera, Airbags, Captain Seats"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Popular For Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.popularFor}
              onChange={(e) => setFormData({ ...formData, popularFor: e.target.value })}
              placeholder="Airport Transfers, Outstation Trips, Hill Stations"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
