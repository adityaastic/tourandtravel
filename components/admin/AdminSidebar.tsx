'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Car,
  BookOpen,
  MessageSquareQuote,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  inquiryCount?: number;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  inquiryCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    } catch {
      toast.error('Logout failed');
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Tour Packages', href: '/admin/packages', icon: MapPin },
    { label: 'Car Fleet', href: '/admin/cars', icon: Car },
    { label: 'Travel Blogs', href: '/admin/blogs', icon: BookOpen },
    { label: 'Inquiries & CRM', href: '/admin/inquiries', icon: Inbox, badge: inquiryCount },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0F1A2E] text-white transition-all duration-300 flex flex-col border-r border-white/10 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E8921A] flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-white font-poppins">
                Just Tourism
              </span>
              <span className="text-xs text-[#F5A623] font-medium tracking-wide">
                Karuna Travels Admin
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                isActive
                  ? 'bg-[#F5A623] text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              {!collapsed && (
                <span className="flex-1 truncate font-poppins text-[13px]">
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge ? (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* Footer / Quick Live Site & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
          {!collapsed && <span>View Live Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout Panel</span>}
        </button>
      </div>
    </aside>
  );
}
