'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Star,
  Edit,
  Trash2,
  MessageSquareQuote,
  MapPin,
  Calendar,
  Loader2,
} from 'lucide-react';
import TestimonialForm from '@/components/admin/TestimonialForm';
import toast from 'react-hot-toast';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      setTestimonials(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load testimonials');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete review from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success(`Deleted testimonial from ${name}`);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
            Customer Testimonials ({testimonials.length})
          </h2>
          <p className="text-xs text-gray-500">
            Manage real traveler reviews and ratings displayed on homepage carousel
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
          <p className="text-xs">Loading customer reviews...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <MessageSquareQuote className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-800 font-poppins">No reviews yet</h3>
          <p className="text-xs text-gray-500">Add client feedback to build trust.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Rating stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FCD34D] text-[#FCD34D]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {item.date || 'Recent'}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-gray-600 italic leading-relaxed mb-4">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Customer Details */}
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="font-bold text-sm text-gray-900 font-poppins">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                    <span>{item.location || 'New Delhi'}</span>
                    <span>•</span>
                    <span className="text-[#F5A623] font-semibold">{item.trip}</span>
                  </div>
                </div>
              </div>

              {/* Actions Bottom */}
              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                  title="Edit Review"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {showModal && (
        <TestimonialForm
          initialData={editingItem}
          onSuccess={() => {
            setShowModal(false);
            fetchTestimonials();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
