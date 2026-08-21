'use client';

import React from 'react';
import PackageForm from '@/components/admin/PackageForm';

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Add New Tour Package
        </h2>
        <p className="text-xs text-gray-500">
          Create a new destination itinerary with full highlights, pricing, and photo slots.
        </p>
      </div>

      <PackageForm isEditing={false} />
    </div>
  );
}
