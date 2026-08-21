'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CarForm from '@/components/admin/CarForm';
import { Loader2 } from 'lucide-react';

export default function EditCarPage() {
  const params = useParams();
  const id = params?.id as string;

  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCarData(data);
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
        <p className="text-xs">Loading vehicle specs...</p>
      </div>
    );
  }

  if (!carData || carData.error) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
        <h3 className="font-bold text-gray-800 font-poppins">Car Not Found</h3>
        <p className="text-xs text-gray-500">The requested car model could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-poppins">
          Edit: {carData.name}
        </h2>
        <p className="text-xs text-gray-500">
          Update rates, passenger seating, transmission, or features.
        </p>
      </div>

      <CarForm initialData={carData} isEditing={true} />
    </div>
  );
}
