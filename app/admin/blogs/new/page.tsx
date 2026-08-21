'use client';

import React from 'react';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Write New Travel Article
        </h2>
        <p className="text-xs text-gray-500">
          Create rich content, travel guides, and tips with markdown styling.
        </p>
      </div>

      <BlogEditor isEditing={false} />
    </div>
  );
}
