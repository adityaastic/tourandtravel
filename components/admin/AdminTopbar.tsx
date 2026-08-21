'use client';

import React from 'react';
import Link from 'next/link';
import {
  Menu,
  Plus,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface AdminTopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  title?: string;
}

export default function AdminTopbar({
  collapsed,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen,
  title = 'Overview',
}: AdminTopbarProps) {
  const handleToggle = () => {
    // If mobile, toggle mobile drawer
    if (window.innerWidth < 1024) {
      if (setMobileOpen) setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <header className="h-16 sm:h-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Left title & toggle button */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={handleToggle}
          className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors focus:outline-none cursor-pointer flex-shrink-0"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium hidden sm:flex">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F5A623] capitalize">{title}</span>
          </div>
          <h1 className="text-base sm:text-xl font-extrabold text-gray-900 font-poppins capitalize truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Quick Add Menu */}
        <Link
          href="/admin/packages/new"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Package</span>
        </Link>

        {/* WhatsApp Hotline */}
        <a
          href="https://wa.me/919911209636"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          title="Business WhatsApp Hotline"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* Live Site */}
        <Link
          href="/"
          target="_blank"
          className="p-2 sm:p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          title="Visit Public Website"
        >
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-gray-200">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#1B2A4A] to-[#2D4A7A] text-white flex items-center justify-center font-bold text-xs font-poppins shadow-sm">
            KS
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-tight">
              Karuna
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
