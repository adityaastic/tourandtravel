'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Loader2,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      setPackages(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load packages');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success(`Deleted ${title}`);
      setPackages(packages.filter((p) => p.id !== id && p.slug !== id));
    } catch {
      toast.error('Failed to delete package');
    }
  };

  const filtered = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(search.toLowerCase()) ||
      pkg.slug.toLowerCase().includes(search.toLowerCase()) ||
      (pkg.distance || '').toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      categoryFilter === 'All' ||
      (pkg.category || []).some(
        (c: string) => c.toLowerCase() === categoryFilter.toLowerCase()
      );

    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Mountains', 'Beaches', 'Wildlife', 'Heritage', 'Spiritual', 'International', 'Weekend Getaway'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
            Tour Packages ({packages.length})
          </h2>
          <p className="text-xs text-gray-500">
            Manage your domestic & international tour itineraries, pricing, and highlights
          </p>
        </div>

        <Link
          href="/admin/packages/new"
          className="px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by destination name, duration, distance..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
          />
        </div>

        {/* Category Filter Chips */}
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

      {/* Packages Grid / Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
          <p className="text-xs">Loading tour packages...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-800 font-poppins">No packages found</h3>
          <p className="text-xs text-gray-500">Try changing your search keywords or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pkg) => (
            <div
              key={pkg.id || pkg.slug}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                    {(pkg.category && pkg.category[0]) || 'Tour'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                    <Star className="w-3.5 h-3.5 fill-[#FCD34D] text-[#FCD34D]" />
                    <span>{pkg.rating || 4.8}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 font-poppins text-base group-hover:text-[#F5A623] transition-colors leading-tight mb-2">
                  {pkg.title}
                </h3>

                {/* Duration & Route */}
                <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  {pkg.distance && (
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{pkg.distance}</span>
                    </div>
                  )}
                </div>

                {/* Highlights preview */}
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Highlights:
                    </span>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {pkg.highlights.slice(0, 2).map((h: string, i: number) => (
                        <li key={i} className="truncate flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price & Actions Bottom */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">
                    Starting from
                  </span>
                  <span className="text-lg font-extrabold text-[#F5A623] font-poppins">
                    ₹{(pkg.startingPrice || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    title="View live page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/packages/${pkg.id || pkg.slug}/edit`}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Edit package"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(pkg.id || pkg.slug, pkg.title)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Delete package"
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
