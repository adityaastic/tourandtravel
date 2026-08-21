'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  MessageCircle,
  Eye,
  Calendar,
  Phone,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Download,
} from 'lucide-react';
import InquiryModal from '@/components/admin/InquiryModal';
import toast from 'react-hot-toast';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load inquiries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      (inq.phone || '').includes(search) ||
      (inq.itemName || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    confirmed: inquiries.filter((i) => i.status === 'confirmed').length,
    completed: inquiries.filter((i) => i.status === 'completed').length,
    cancelled: inquiries.filter((i) => i.status === 'cancelled').length,
  };

  const statusColors: Record<string, string> = {
    new: 'bg-amber-100 text-amber-800 border-amber-200',
    contacted: 'bg-blue-100 text-blue-800 border-blue-200',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-purple-100 text-purple-800 border-purple-200',
    cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const exportCSV = () => {
    const headers = ['ID,Name,Phone,Email,Type,Destination/Car,TravelDate,Pax,Status,Created'];
    const rows = filtered.map((i) =>
      `"${i.id}","${i.name}","${i.phone}","${i.email || ''}","${i.type}","${i.itemName || ''}","${i.travelDate || ''}","${i.passengers || ''}","${i.status}","${i.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `karuna_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Inquiries exported to CSV');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
            Customer Inquiries & Booking Leads ({inquiries.length})
          </h2>
          <p className="text-xs text-gray-500">
            Track inquiries, update booking statuses, log quotations, and launch WhatsApp direct chats
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs shadow-sm flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#F5A623]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {[
          { key: 'all', label: 'All Inquiries', count: counts.all },
          { key: 'new', label: 'New Action Needed', count: counts.new, alert: counts.new > 0 },
          { key: 'contacted', label: 'Contacted', count: counts.contacted },
          { key: 'confirmed', label: 'Confirmed / Advance', count: counts.confirmed },
          { key: 'completed', label: 'Tour Completed', count: counts.completed },
          { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              statusFilter === tab.key
                ? 'bg-[#1B2A4A] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                statusFilter === tab.key
                  ? 'bg-[#F5A623] text-white'
                  : tab.alert
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center">
        <Search className="w-4 h-4 text-gray-400 mr-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, mobile number, tour package, message keywords..."
          className="w-full text-xs text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
            <p className="text-xs">Loading inquiries CRM...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Inbox className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 font-poppins">No inquiries found</h3>
            <p className="text-xs text-gray-500">No leads match the selected status or keyword filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Customer & Contact</th>
                  <th className="pb-3">Type / Destination</th>
                  <th className="pb-3">Travel Date</th>
                  <th className="pb-3">Pax</th>
                  <th className="pb-3">Lead Status</th>
                  <th className="pb-3">Received</th>
                  <th className="pb-3 text-right pr-2">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((inq) => {
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');

                  return (
                    <tr
                      key={inq.id}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="py-4 pl-2 font-medium text-gray-900">
                        <div className="font-bold text-sm text-[#0F1A2E]">{inq.name}</div>
                        <div className="text-gray-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#F5A623]" />
                          <span>{inq.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">
                        <span className="font-bold text-[#1B2A4A] block">
                          {inq.itemName || inq.type}
                        </span>
                        {inq.message && (
                          <span className="text-gray-400 line-clamp-1 text-[11px] max-w-xs">
                            {inq.message}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-gray-600 font-medium">
                        {inq.travelDate || 'Flexible'}
                      </td>
                      <td className="py-4 text-gray-500">
                        {inq.passengers ? `${inq.passengers} Pax` : '—'}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize ${
                            statusColors[inq.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400 text-[11px]">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="py-4 text-right pr-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                              inq.name
                            )},%20Namaste%20from%20Karuna%20Travels!%20Regarding%20your%20query%20for%20${encodeURIComponent(
                              inq.itemName || 'trip'
                            )}:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="WhatsApp Client"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                            title="View / Update Record"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdate={fetchInquiries}
        />
      )}
    </div>
  );
}
