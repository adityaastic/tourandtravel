'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [pendingInquiries, setPendingInquiries] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          // Fetch pending inquiries count
          fetch('/api/admin/stats')
            .then((r) => r.json())
            .then((s) => {
              if (s?.counts?.pendingInquiries !== undefined) {
                setPendingInquiries(s.counts.pendingInquiries);
              }
            })
            .catch(() => {});
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1A2E] flex flex-col items-center justify-center text-white font-poppins gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#F5A623]" />
        <p className="text-sm text-gray-400">Loading Karuna Travels Admin...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  // Derive page title from pathname
  const segments = pathname.split('/').filter(Boolean);
  const currentSection = segments[1] || 'Dashboard';
  const displayTitle = currentSection.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex relative overflow-x-hidden">
      {/* Sidebar (Desktop + Mobile Drawer) */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        inquiryCount={pendingInquiries}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        } ml-0`}
      >
        <AdminTopbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          title={displayTitle}
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
