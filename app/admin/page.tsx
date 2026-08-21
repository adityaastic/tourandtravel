'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Car,
  BookOpen,
  Inbox,
  TrendingUp,
  ArrowUpRight,
  Plus,
  MessageCircle,
  Clock,
  Phone,
  Eye,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load stats', err);
        setLoading(false);
      });
  }, []);

  const counts = stats?.counts || {
    packages: 20,
    cars: 15,
    blogs: 9,
    testimonials: 8,
    inquiries: 4,
    pendingInquiries: 2,
    confirmedInquiries: 1,
  };

  const chartData = stats?.monthlyStats || [
    { month: 'Apr', inquiries: 18, bookings: 12, revenue: 145000 },
    { month: 'May', inquiries: 29, bookings: 22, revenue: 280000 },
    { month: 'Jun', inquiries: 45, bookings: 34, revenue: 420000 },
    { month: 'Jul', inquiries: 32, bookings: 24, revenue: 310000 },
    { month: 'Aug', inquiries: 54, bookings: 41, revenue: 560000 },
    { month: 'Sep', inquiries: 38, bookings: 30, revenue: 390000 },
  ];

  const categoryData = [
    { name: 'Mountains', count: 7 },
    { name: 'Heritage', count: 4 },
    { name: 'Beaches', count: 3 },
    { name: 'Wildlife', count: 2 },
    { name: 'Spiritual', count: 3 },
    { name: 'Intl', count: 3 },
  ];

  const recentInquiries = stats?.recentInquiries || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F1A2E] via-[#1B2A4A] to-[#2D4A7A] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#F5A623]/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-[#FCD34D] border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Namaste, Karuna Suryawanshi!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins tracking-tight">
              Karuna Travels Command Dashboard
            </h2>
            <p className="text-sm text-gray-300 max-w-xl">
              Monitor daily travel inquiries, manage your 20+ tour packages, 15 AC cabs, published blogs, and customer bookings in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/packages/new"
              className="px-5 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Package</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Inbox className="w-4 h-4 text-[#F5A623]" />
              <span>View Inquiries ({counts.pendingInquiries} New)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Packages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Tour Packages
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-gray-900 font-poppins">
              {counts.packages}
            </span>
            <Link
              href="/admin/packages"
              className="text-xs font-semibold text-[#F5A623] hover:underline flex items-center gap-1"
            >
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Shimla, Manali, Kashmir, Dubai & 16 more
          </p>
        </div>

        {/* Card 2: Cars Fleet */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Fleet Vehicles
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-gray-900 font-poppins">
              {counts.cars}
            </span>
            <Link
              href="/admin/cars"
              className="text-xs font-semibold text-[#F5A623] hover:underline flex items-center gap-1"
            >
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Innova, Thar, Scorpio N, Dzire & more
          </p>
        </div>

        {/* Card 3: Inquiries */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Booking Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-gray-900 font-poppins">
              {counts.inquiries}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              {counts.pendingInquiries} Action Needed
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            WhatsApp & web bookings tracker
          </p>
        </div>

        {/* Card 4: Blogs & Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Published Blogs
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-gray-900 font-poppins">
              {counts.blogs}
            </span>
            <Link
              href="/admin/blogs"
              className="text-xs font-semibold text-[#F5A623] hover:underline flex items-center gap-1"
            >
              View <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            SEO destination travel guides
          </p>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Booking Inquiries & Volume Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-poppins">
                Inquiries & Booking Trends
              </h3>
              <p className="text-xs text-gray-500">
                Monthly customer inquiries and confirmed bookings
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
              Past 6 Months
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1B2A4A',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inquiries"
                  name="Inquiries"
                  stroke="#F5A623"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInq)"
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  name="Confirmed"
                  stroke="#1B2A4A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBook)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Package Categories Distribution */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-poppins mb-1">
              Destinations by Zone
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Active tour packages distribution
            </p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#6B7280" fontSize={11} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1B2A4A',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#F5A623" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries CRM Table */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-poppins">
              Latest Booking & Inquiry Requests
            </h3>
            <p className="text-xs text-gray-500">
              Customer inquiries received from website & WhatsApp buttons
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open All CRM Inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Customer</th>
                <th className="pb-3">Type / Destination</th>
                <th className="pb-3">Travel Date</th>
                <th className="pb-3">Pax</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentInquiries.map((inq: any) => {
                const statusColors: Record<string, string> = {
                  new: 'bg-amber-100 text-amber-800 border-amber-200',
                  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
                  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  completed: 'bg-purple-100 text-purple-800 border-purple-200',
                  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
                };

                const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');

                return (
                  <tr key={inq.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 pl-2 font-medium text-gray-900">
                      <div>{inq.name}</div>
                      <div className="text-xs text-gray-400">{inq.phone}</div>
                    </td>
                    <td className="py-4 text-gray-700">
                      <span className="capitalize font-medium text-[#1B2A4A]">
                        {inq.itemName || inq.type}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500 text-xs">
                      {inq.travelDate || 'Flexible'}
                    </td>
                    <td className="py-4 text-gray-500 text-xs">
                      {inq.passengers ? `${inq.passengers} Pax` : '—'}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${
                          statusColors[inq.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                            inq.name
                          )},%20thank%20you%20for%20contacting%20Karuna%20Travels!%20Regarding%20your%20query%20for%20${encodeURIComponent(
                            inq.itemName || 'trip'
                          )}:`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <Link
                          href="/admin/inquiries"
                          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          title="View Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
