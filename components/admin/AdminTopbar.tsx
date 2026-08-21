'use client';

import React from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  Search,
  Plus,
  ExternalLink,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface AdminTopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  title?: string;
}

export default function AdminTopbar({
  collapsed,
  setCollapsed,
  title = 'Overview',
}: AdminTopbarProps) {
  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30 px-6 flex items-center justify-between transition-all">
      {/* Left title & collapse button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-poppins capitalize">
            {title}
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Karuna Travels Control Center · Just Tourism
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Quick Add Menu */}
        <Link
          href="/admin/packages/new"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </Link>

        <Link
          href="/admin/cars/new"
          className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Car</span>
        </Link>

        {/* WhatsApp Direct Chat Launcher */}
        <a
          href="https://wa.me/919911209636"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          title="Open Business WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Live Site */}
        <Link
          href="/"
          target="_blank"
          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hidden sm:flex"
          title="Visit Live Site"
        >
          <ExternalLink className="w-5 h-5" />
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B2A4A] to-[#2D4A7A] text-white flex items-center justify-center font-bold text-sm font-poppins shadow">
            KS
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-gray-900 leading-tight">
              Karuna Suryawanshi
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">
              ● Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
