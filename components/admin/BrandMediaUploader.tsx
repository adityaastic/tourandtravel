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
  RefreshCw,
  Eye,
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
  const [logoImgError, setLogoImgError] = useState(false);
  const [faviconImgError, setFaviconImgError] = useState(false);
  const [ogImgError, setOgImgError] = useState(false);

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
        setLogoImgError(false);
        onAssetUpdated('logoUrl', assetUrl);
        toast.success('Brand Logo uploaded & live updated!');
      } else if (targetType === 'favicon') {
        setFaviconImgError(false);
        onAssetUpdated('faviconUrl', assetUrl);
        toast.success('Website Favicon updated!');
      } else if (targetType === 'ogImage') {
        setOgImgError(false);
        onAssetUpdated('ogImageUrl', assetUrl);
        toast.success('Social Share Banner updated!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploadingTarget(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-bold text-gray-900 font-poppins flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F5A623]" />
          <span>Brand Visual Assets (Logo, Favicon & Social Share Banner)</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Upload and manage your official company logo, browser tab favicon, and WhatsApp sharing banner with live preview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Asset 1: Brand Logo */}
        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/70 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                1. Official Brand Logo
              </span>
              <span className="text-[10px] text-gray-400 font-mono">PNG / SVG / WEBP</span>
            </div>

            {/* Preview Box */}
            <div className="h-28 bg-[#0F1A2E] rounded-xl flex items-center justify-center p-4 overflow-hidden shadow-inner border border-white/10 relative">
              {currentLogo && !logoImgError ? (
                <img
                  src={currentLogo}
                  alt="Brand Logo"
                  className="max-h-20 max-w-full object-contain"
                  onError={() => setLogoImgError(true)}
                />
              ) : (
                <div className="flex items-center gap-2.5 text-center text-white">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F5A623] to-[#E8921A] flex items-center justify-center font-bold text-white shadow">
                    JT
                  </div>
                  <div className="text-left">
                    <div className="font-poppins font-bold text-sm leading-tight text-white">
                      Just Tourism
                    </div>
                    <div className="text-[10px] text-[#F5A623]">Karuna Travels</div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Auto-scales on Navbar header, Footer, invoices, and dark/light modes.
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
                  : 'bg-[#F5A623] hover:bg-[#E8921A] text-white shadow-md shadow-orange-500/20'
              }`}
            >
              {uploadingTarget === 'logo' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Logo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload & Replace Logo</span>
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
                2. Browser Tab Favicon
              </span>
              <span className="text-[10px] text-gray-400 font-mono">ICO / PNG / SVG</span>
            </div>

            {/* Preview Box - Mock Browser Tab */}
            <div className="h-28 bg-white rounded-xl flex items-center justify-center p-4 shadow-inner border border-gray-200">
              <div className="flex items-center gap-2.5 px-3.5 py-2 bg-gray-100 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 shadow-sm max-w-full">
                <div className="w-6 h-6 rounded-lg bg-[#F5A623] flex items-center justify-center text-white flex-shrink-0 overflow-hidden shadow-xs">
                  {currentFavicon && !faviconImgError ? (
                    <img
                      src={currentFavicon}
                      alt="Favicon"
                      className="w-full h-full object-cover"
                      onError={() => setFaviconImgError(true)}
                    />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <span className="truncate text-xs font-semibold">Just Tourism | Karuna Travels</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Appears on browser tabs, mobile bookmarks, and Google search icons.
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
                  : 'bg-[#1B2A4A] hover:bg-[#0F1A2E] text-white shadow-sm'
              }`}
            >
              {uploadingTarget === 'favicon' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Favicon...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Update Favicon Icon</span>
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
                3. Social Share Banner
              </span>
              <span className="text-[10px] text-gray-400 font-mono">1200 x 630 px</span>
            </div>

            {/* Preview Box */}
            <div className="h-28 bg-[#0F1A2E] rounded-xl flex items-center justify-center p-2 overflow-hidden border border-gray-200 relative">
              {currentOgImage && !ogImgError ? (
                <img
                  src={currentOgImage}
                  alt="OG Image"
                  className="w-full h-full object-cover rounded-lg"
                  onError={() => setOgImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/80 gap-1 text-center">
                  <Share2 className="w-5 h-5 text-[#F5A623]" />
                  <span className="text-[11px] font-semibold">Social Preview Banner</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Preview banner card shown when sharing website links on WhatsApp & Facebook.
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
                  : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 shadow-sm'
              }`}
            >
              {uploadingTarget === 'ogImage' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Banner...</span>
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
