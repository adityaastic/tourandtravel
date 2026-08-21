'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  Globe,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BrandMediaUploaderProps {
  currentLogo?: string;
  currentFavicon?: string;
  currentOgImage?: string;
  onAssetUpdated: (key: string, url: string) => void;
}

export default function BrandMediaUploader({
  currentLogo = '/logo.png',
  currentFavicon = '/favicon.ico',
  currentOgImage = '/og-image.jpg',
  onAssetUpdated,
}: BrandMediaUploaderProps) {
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetType: 'logo' | 'favicon' | 'ogImage'
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    setUploadingTarget(targetType);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaType', 'image');

      if (targetType === 'logo') {
        formData.append('slotName', 'logo');
      } else if (targetType === 'favicon') {
        formData.append('slotName', 'favicon');
      } else if (targetType === 'ogImage') {
        formData.append('slotName', 'og-image');
      }

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      const assetUrl = data.url || `/${data.filename}`;

      if (targetType === 'logo') {
        onAssetUpdated('logoUrl', assetUrl);
        toast.success('Brand Logo updated & saved!');
      } else if (targetType === 'favicon') {
        onAssetUpdated('faviconUrl', assetUrl);
        toast.success('Website Favicon updated & saved!');
      } else if (targetType === 'ogImage') {
        onAssetUpdated('ogImageUrl', assetUrl);
        toast.success('Social Share (OG Image) updated & saved!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploadingTarget(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
      <div className="border-b pb-3">
        <h3 className="text-base font-bold text-gray-900 font-poppins flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F5A623]" />
          <span>Brand Visual Assets (Logo, Favicon & Social Image)</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Upload and update your official company logo, browser tab favicon, and social media banner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Asset 1: Logo */}
        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/70 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                1. Official Brand Logo
              </span>
              <span className="text-[10px] text-gray-400 font-mono">PNG / SVG / WEBP</span>
            </div>

            {/* Preview Box */}
            <div className="h-24 bg-[#1B2A4A] rounded-xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-white/10 relative group">
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt="Current Logo"
                  className="max-h-16 max-w-full object-contain"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="text-center text-white font-poppins font-bold text-sm tracking-wide">
                Just Tourism
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Displayed on Navbar header, Footer, and Invoices.
            </p>
          </div>

          <div>
            <input
              type="file"
              id="upload-logo-input"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => handleUpload(e, 'logo')}
              className="hidden"
            />
            <label
              htmlFor="upload-logo-input"
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                uploadingTarget === 'logo'
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white shadow-sm'
              }`}
            >
              {uploadingTarget === 'logo' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Logo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Update Brand Logo</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Asset 2: Favicon */}
        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/70 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                2. Browser Favicon
              </span>
              <span className="text-[10px] text-gray-400 font-mono">ICO / PNG (32x32)</span>
            </div>

            {/* Preview Box - Mock Browser Tab */}
            <div className="h-24 bg-white rounded-xl flex items-center justify-center p-3 shadow-inner border border-gray-200">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 max-w-xs truncate shadow-sm">
                <div className="w-5 h-5 rounded-md bg-[#F5A623] flex items-center justify-center text-white flex-shrink-0 overflow-hidden">
                  {currentFavicon ? (
                    <img
                      src={currentFavicon}
                      alt="Favicon"
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Globe className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="truncate">Karuna Travels | Just Tourism</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Appears on the browser tab, bookmarks & mobile shortcut icons.
            </p>
          </div>

          <div>
            <input
              type="file"
              id="upload-favicon-input"
              accept="image/x-icon,image/png,image/svg+xml"
              onChange={(e) => handleUpload(e, 'favicon')}
              className="hidden"
            />
            <label
              htmlFor="upload-favicon-input"
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                uploadingTarget === 'favicon'
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-[#F5A623] hover:bg-[#E8921A] text-white shadow-sm'
              }`}
            >
              {uploadingTarget === 'favicon' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Favicon...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Update Favicon</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Asset 3: Social OG Image */}
        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/70 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                3. Social Share (OG)
              </span>
              <span className="text-[10px] text-gray-400 font-mono">1200 x 630</span>
            </div>

            {/* Preview Box */}
            <div className="h-24 bg-[#0F1A2E] rounded-xl flex items-center justify-center p-2 overflow-hidden border border-gray-200 relative">
              {currentOgImage ? (
                <img
                  src={currentOgImage}
                  alt="OG Image"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[11px] font-semibold">
                <Share2 className="w-4 h-4 mr-1 text-[#F5A623]" /> WhatsApp & Social Preview
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Preview banner when link is shared on WhatsApp, Facebook & Twitter.
            </p>
          </div>

          <div>
            <input
              type="file"
              id="upload-og-input"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleUpload(e, 'ogImage')}
              className="hidden"
            />
            <label
              htmlFor="upload-og-input"
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                uploadingTarget === 'ogImage'
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm'
              }`}
            >
              {uploadingTarget === 'ogImage' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Image...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Update Social Banner</span>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
