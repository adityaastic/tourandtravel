'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Car,
  Users,
  Fuel,
  Sparkles,
  ExternalLink,
  Loader2,
  Snowflake,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/admin/cars');
      const data = await res.json();
      setCars(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load cars');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from fleet?`)) return;

    try {
      const res = await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success(`Removed ${name}`);
      setCars(cars.filter((c) => c.id !== id && c.slug !== id));
    } catch {
      toast.error('Failed to delete car');
    }
  };

  const filtered = cars.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      categoryFilter === 'All' ||
      c.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'MUV', 'Premium'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
            Fleet Vehicles ({cars.length})
          </h2>
          <p className="text-xs text-gray-500">
            Manage your AC cabs, per km rates, day packages, and passenger capacities
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Car</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car model, category..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#1B2A4A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
          <p className="text-xs">Loading fleet vehicles...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <Car className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-800 font-poppins">No cars found</h3>
          <p className="text-xs text-gray-500">Try changing your search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((car) => (
            <div
              key={car.id || car.slug}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                    {car.category}
                  </span>
                  {car.ac && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      <Snowflake className="w-3 h-3" /> AC
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 font-poppins text-lg group-hover:text-[#F5A623] transition-colors leading-tight mb-2">
                  {car.name}
                </h3>

                <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl mb-4 text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block font-medium">Seating</span>
                    <span className="text-xs font-bold text-gray-800">{car.seating} Seater</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block font-medium">Fuel</span>
                    <span className="text-xs font-bold text-gray-800">{car.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block font-medium">Transmission</span>
                    <span className="text-xs font-bold text-gray-800">{car.transmission || 'Manual'}</span>
                  </div>
                </div>

                {car.popularFor && car.popularFor.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {car.popularFor.slice(0, 2).map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-[#F5A623] font-poppins">
                    ₹{car.pricePerKm}/km
                  </div>
                  <div className="text-[11px] text-gray-400">
                    ₹{car.pricePerDay}/day (min {car.minimumKm || 250}km)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/car-booking"
                    target="_blank"
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    title="View live page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/cars/${car.id || car.slug}/edit`}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Edit car"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(car.id || car.slug, car.name)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Delete car"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
