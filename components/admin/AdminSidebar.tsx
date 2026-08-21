'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Car,
  BookOpen,
  Inbox,
  MessageSquareQuote,
  ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Compass,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import BrandLogo from '@/components/shared/BrandLogo';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  inquiryCount?: number;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen,
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
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-[#0F1A2E] text-white transition-all duration-300 flex flex-col border-r border-white/10 ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          <BrandLogo variant="admin" showSubtitle={!collapsed || mobileOpen} />

          {/* Close button on mobile */}
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav List */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed && !mobileOpen ? item.label : undefined}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-xs transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5A623] to-[#E8921A] text-white font-semibold shadow-lg shadow-orange-500/25'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
                {(!collapsed || mobileOpen) && (
                  <span className="flex-1 truncate font-poppins text-xs">
                    {item.label}
                  </span>
                )}
                {(!collapsed || mobileOpen) && item.badge ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        {/* Footer Quick Links & Toggle */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            title="Visit Public Website"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white text-xs transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 text-[#F5A623]" />
            {(!collapsed || mobileOpen) && <span className="truncate">View Live Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(!collapsed || mobileOpen) && <span className="truncate">Logout Panel</span>}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer mt-2"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
