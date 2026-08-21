'use client';

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Copy,
  Check,
  Trash2,
  FolderOpen,
  Loader2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import toast from 'react-hot-toast';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<{ images: any[]; videos: any[]; total: number }>({
    images: [],
    videos: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMedia(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load media files');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    toast.success(`Copied path: ${path}`);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Media Library & Placeholder Replacer
        </h2>
        <p className="text-xs text-gray-500">
          Upload real photographs and promo videos to automatically replace Coming Soon badges across the website.
        </p>
      </div>

      {/* Uploader Box */}
      <MediaUploader onUploadSuccess={fetchMedia} />

      {/* Media Directory View */}
      <div className="space-y-6">
        {/* Photos Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-gray-900 font-poppins">
                Photos in <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">/public/images/</code> ({media.images.length})
              </h3>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#F5A623]" />
            </div>
          ) : media.images.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No custom image files yet. Upload a photo above to populate!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.images.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-50 rounded-2xl p-3 border border-gray-200/70 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="aspect-video bg-gray-200 rounded-xl mb-2 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <ImageIcon className="w-6 h-6 text-gray-400 absolute" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-gray-800 truncate block">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{item.size}</span>
                  </div>

                  <div className="mt-3 pt-2 border-t flex items-center justify-between">
                    <button
                      onClick={() => copyToClipboard(item.path)}
                      className="text-[11px] text-[#F5A623] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      title="Copy path"
                    >
                      {copiedPath === item.path ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-gray-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" />
              <h3 className="text-base font-bold text-gray-900 font-poppins">
                Videos in <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">/public/videos/</code> ({media.videos.length})
              </h3>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#F5A623]" />
            </div>
          ) : media.videos.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No video files uploaded yet. Add promo videos for Home Hero or Tour previews.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {media.videos.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-video bg-[#0F1A2E] rounded-xl mb-3 flex items-center justify-center text-white">
                    <Video className="w-8 h-8 text-[#F5A623]" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-gray-900 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-gray-400 block">{item.size}</span>
                  </div>

                  <div className="mt-3 pt-2 border-t flex items-center justify-between">
                    <button
                      onClick={() => copyToClipboard(item.path)}
                      className="text-xs text-[#F5A623] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPath === item.path ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Path</span>
                    </button>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-gray-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
