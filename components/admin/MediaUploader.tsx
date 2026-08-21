'use client';

import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import toast from 'react-hot-toast';

interface MediaUploaderProps {
  onUploadSuccess: () => void;
}

export default function MediaUploader({ onUploadSuccess }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [slotName, setSlotName] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [uploading, setUploading] = useState(false);

  const predefinedSlots = [
    'hero-promo-video',
    'shimla-mall-road',
    'manali-rohtang',
    'kashmir-dal-lake',
    'corbett-tiger',
    'goa-beach',
    'car-toyota-innova',
    'car-mahindra-thar',
    'car-mahindra-xuv700',
    'owner-karuna',
    'office-reception',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (selected.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please choose an image or video file first');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaType', mediaType);
      if (slotName.trim()) {
        formData.append('slotName', slotName.trim());
      }

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      toast.success(`Uploaded ${data.filename} successfully!`);
      setFile(null);
      setSlotName('');
      onUploadSuccess();
    } catch (err: any) {
      toast.error(err.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-bold text-gray-900 font-poppins">
          Upload Real Photos & Videos (Replaces Coming Soon Placeholders)
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Upload files directly to <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">/public/images/</code> or <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">/public/videos/</code> mapped to specific slot names.
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-5">
        {/* Drag Drop Area */}
        <div className="border-2 border-dashed border-gray-200 hover:border-[#F5A623] rounded-2xl p-8 text-center bg-gray-50/50 transition-colors">
          <input
            type="file"
            id="file-upload"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer block space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F5A623] mx-auto flex items-center justify-center shadow-sm">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F5A623] hover:underline">
                Click to browse files
              </span>
              <span className="text-xs text-gray-500"> or drag and drop</span>
              <p className="text-[11px] text-gray-400 mt-1">
                JPG, PNG, WEBP for photos • MP4, WEBM for promo videos
              </p>
            </div>
          </label>

          {file && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          )}
        </div>

        {/* Slot Selection & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Assign to Slot Name (Optional)
            </label>
            <input
              type="text"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              placeholder="e.g. shimla-mall-road or car-toyota-innova"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:ring-2 focus:ring-[#F5A623] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Media Target Folder
            </label>
            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="mediaType"
                  value="image"
                  checked={mediaType === 'image'}
                  onChange={() => setMediaType('image')}
                  className="text-[#F5A623] focus:ring-[#F5A623]"
                />
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Photos (/images)</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="mediaType"
                  value="video"
                  checked={mediaType === 'video'}
                  onChange={() => setMediaType('video')}
                  className="text-[#F5A623] focus:ring-[#F5A623]"
                />
                <Video className="w-4 h-4 text-purple-500" />
                <span>Videos (/videos)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preset suggestions */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Quick Slot Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {predefinedSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSlotName(slot)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-3 px-6 rounded-xl bg-[#F5A623] hover:bg-[#E8921A] text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading Media...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              <span>Save & Replace Placeholder</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
