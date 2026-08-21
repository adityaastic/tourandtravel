'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { Loader2 } from 'lucide-react';

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;

  const [blogData, setBlogData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
        <p className="text-xs">Loading blog content...</p>
      </div>
    );
  }

  if (!blogData || blogData.error) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
        <h3 className="font-bold text-gray-800 font-poppins">Article Not Found</h3>
        <p className="text-xs text-gray-500">The requested article could not be located.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Edit: {blogData.title}
        </h2>
        <p className="text-xs text-gray-500">
          Update article content, metadata, read time, and tags.
        </p>
      </div>

      <BlogEditor initialData={blogData} isEditing={true} />
    </div>
  );
}
