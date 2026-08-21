'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  Settings,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Clock,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    name: 'Karuna Travels',
    brandName: 'Just Tourism',
    tagline: 'Explore · Travel · Enjoy',
    owner: 'Karuna Suryawanshi',
    phones: '+91-9911209636, +91-8860978897',
    whatsapp: '919911209636',
    email: 'karunadikoshiya000@gmail.com',
    address: 'Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002',
    googleMapsUrl: 'https://maps.google.com/?q=Daryaganj+Delhi',
    marqueeAnnouncement: '🌟 New Package: Shimla 4D/3N @ ₹8,999 | 🔥 Manali Special | 🏔️ Ladakh Season Open | 🌴 Goa Beach Special | ✈️ Dubai Tour @ ₹45,000 | 📞 Call: +91-9911209636',
    socialLinks: {
      facebook: 'https://facebook.com/karunatravels',
      instagram: 'https://instagram.com/karunatravels',
      twitter: 'https://twitter.com/karunatravels',
      youtube: 'https://youtube.com/@karunatravels',
    },
    officeHours: {
      weekdays: 'Monday - Saturday: 9:00 AM - 8:00 PM',
      sunday: 'Sunday: 10:00 AM - 6:00 PM',
      holidays: 'Holidays: 24/7 WhatsApp Support',
    },
    seo: {
      defaultTitle: 'Karuna Travels | Best Travel Agency in Delhi | Just Tourism',
      description: "Karuna Travels — Delhi's trusted travel agency. Book tour packages to Shimla, Manali, Kashmir, Goa, Rajasthan & car rentals. +91-9911209636",
      keywords: 'travel agency Delhi, tour packages Delhi, Karuna Travels, Just Tourism Delhi, car rental Delhi',
      googleAnalyticsId: 'G-XXXXXXXXXX',
    },
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          ...data,
          phones: Array.isArray(data.phones) ? data.phones.join(', ') : data.phones,
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load settings');
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...settings,
        phones: settings.phones.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update settings');

      toast.success('Site settings saved successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
        <p className="text-xs">Loading site configuration...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
            Site Settings & Business Profile
          </h2>
          <p className="text-xs text-gray-500">
            Configure contact numbers, branding, announcement marquee, social handles and SEO defaults
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save All Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Branding & Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-base font-bold text-gray-900 font-poppins border-b pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span>Brand Identity</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Founder / Owner Name
              </label>
              <input
                type="text"
                value={settings.owner}
                onChange={(e) => setSettings({ ...settings, owner: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Live Announcement Marquee Bar Text
            </label>
            <textarea
              rows={2}
              value={settings.marqueeAnnouncement}
              onChange={(e) => setSettings({ ...settings, marqueeAnnouncement: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>

        {/* Card 2: Contact & NAP */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-base font-bold text-gray-900 font-poppins border-b pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>Contact & NAP Consistency</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone Numbers (Comma-separated)
            </label>
            <input
              type="text"
              value={settings.phones}
              onChange={(e) => setSettings({ ...settings, phones: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Physical Office Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>

        {/* Card 3: Social Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-base font-bold text-gray-900 font-poppins border-b pb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-500" />
            <span>Social Media Handles</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Facebook Page URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.youtube || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 4: SEO & Analytics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-base font-bold text-gray-900 font-poppins border-b pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-500" />
            <span>SEO & Analytics Tracking</span>
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              value={settings.seo?.googleAnalyticsId || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, googleAnalyticsId: e.target.value },
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Default Homepage SEO Title
            </label>
            <input
              type="text"
              value={settings.seo?.defaultTitle || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultTitle: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={settings.seo?.description || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
