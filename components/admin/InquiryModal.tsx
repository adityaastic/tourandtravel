'use client';

import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  Calendar,
  Users,
  MapPin,
  MessageCircle,
  Clock,
  Save,
  Loader2,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface InquiryModalProps {
  inquiry: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function InquiryModal({ inquiry, onClose, onUpdate }: InquiryModalProps) {
  const [status, setStatus] = useState(inquiry.status || 'new');
  const [notes, setNotes] = useState(inquiry.notes || '');
  const [loading, setLoading] = useState(false);

  const cleanPhone = (inquiry.phone || '').replace(/[^0-9]/g, '');

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      if (!res.ok) throw new Error('Update failed');
      toast.success('Inquiry status updated');
      onUpdate();
      onClose();
    } catch {
      toast.error('Failed to update inquiry');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Inquiry deleted');
      onUpdate();
      onClose();
    } catch {
      toast.error('Delete failed');
    }
  };

  const statuses = [
    { value: 'new', label: 'New / Action Needed', color: 'bg-amber-100 text-amber-800' },
    { value: 'contacted', label: 'Contacted / Pitch Sent', color: 'bg-blue-100 text-blue-800' },
    { value: 'confirmed', label: 'Confirmed / Advance Paid', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'completed', label: 'Tour Completed', color: 'bg-purple-100 text-purple-800' },
    { value: 'cancelled', label: 'Cancelled / Dropped', color: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-100 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Inquiry #{inquiry.id}
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-poppins">
              {inquiry.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl text-xs">
          <div>
            <span className="text-gray-400 font-medium block">Phone Number</span>
            <div className="flex items-center gap-2 mt-0.5 font-bold text-gray-800">
              <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
              <a href={`tel:${inquiry.phone}`} className="hover:underline">
                {inquiry.phone}
              </a>
            </div>
          </div>

          {inquiry.email && (
            <div>
              <span className="text-gray-400 font-medium block">Email Address</span>
              <div className="flex items-center gap-2 mt-0.5 font-bold text-gray-800 truncate">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <a href={`mailto:${inquiry.email}`} className="truncate hover:underline">
                  {inquiry.email}
                </a>
              </div>
            </div>
          )}

          <div>
            <span className="text-gray-400 font-medium block">Inquiry Type</span>
            <div className="font-bold text-[#1B2A4A] capitalize mt-0.5">
              {inquiry.itemName || inquiry.type}
            </div>
          </div>

          <div>
            <span className="text-gray-400 font-medium block">Travel Date</span>
            <div className="flex items-center gap-1.5 font-bold text-gray-800 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>{inquiry.travelDate || 'Flexible'}</span>
            </div>
          </div>

          {inquiry.passengers && (
            <div>
              <span className="text-gray-400 font-medium block">Number of Travelers</span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mt-0.5">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>{inquiry.passengers} Pax</span>
              </div>
            </div>
          )}

          {(inquiry.pickupLocation || inquiry.dropLocation) && (
            <div className="sm:col-span-2">
              <span className="text-gray-400 font-medium block">Route</span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>
                  {inquiry.pickupLocation} → {inquiry.dropLocation}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Customer Message */}
        {inquiry.message && (
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Customer Message / Requirements
            </label>
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-xs text-gray-800 leading-relaxed italic">
              &ldquo;{inquiry.message}&rdquo;
            </div>
          </div>
        )}

        {/* Status Dropdown & Notes */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Lead / Booking Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Internal Admin Notes (Quotations, cab assigned, advance notes)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sent PDF itinerary on WhatsApp. Client agreed on ₹28,000 for 4 pax."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>

        {/* Actions Bottom */}
        <div className="pt-4 border-t flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Delete Record"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {cleanPhone && (
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                  inquiry.name
                )},%20Namaste%20from%20Karuna%20Travels!%20Regarding%20your%20query%20for%20${encodeURIComponent(
                  inquiry.itemName || 'trip'
                )}:`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Client</span>
              </a>
            )}

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
