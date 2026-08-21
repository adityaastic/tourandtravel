'use client';

import React from 'react';
import CarForm from '@/components/admin/CarForm';

export default function NewCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Add New Vehicle to Fleet
        </h2>
        <p className="text-xs text-gray-500">
          Configure seating capacity, per km rate, day rate, and specs.
        </p>
      </div>

      <CarForm isEditing={false} />
    </div>
  );
}
