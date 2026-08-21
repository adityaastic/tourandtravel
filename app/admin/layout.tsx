import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Control Center | Karuna Travels (Just Tourism)',
  description: 'Manage packages, car fleet, blogs, testimonials, inquiries and settings for Karuna Travels.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
