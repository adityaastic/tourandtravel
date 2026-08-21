'use client';

import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { SITE_CONFIG } from '@/lib/constants';
import { cars } from '@/lib/data/cars';

export default function CarBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carPreference: '',
    pickupLocation: '',
    dropLocation: '',
    travelDate: '',
    pickupTime: '',
    returnDate: '',
    passengers: '1',
    tripType: 'Local',
    requirements: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['name', 'phone', 'pickupLocation', 'dropLocation', 'travelDate', 'pickupTime'];
    const newErrors: Record<string, boolean> = {};
    let hasError = false;
    required.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const message = `*New Car Booking Enquiry* 🚗
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Car: ${formData.carPreference || 'Any'}
Trip Type: ${formData.tripType}
Pickup: ${formData.pickupLocation}
Drop: ${formData.dropLocation}
Date: ${formData.travelDate} at ${formData.pickupTime}
Return: ${formData.returnDate || 'N/A'}
Passengers: ${formData.passengers}
Reqs: ${formData.requirements || 'None'}`;

    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
      <h3 className="text-2xl font-poppins font-semibold text-primary-navy mb-6 text-center">📋 Book Your Car in 60 Seconds</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name*" className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.name ? "border-red-500" : "border-gray-300")} />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="WhatsApp Number*" className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.phone ? "border-red-500" : "border-gray-300")} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-10 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-orange outline-none transition-all" />
          </div>
          <div className="relative">
            <select name="carPreference" value={formData.carPreference} onChange={handleChange} className="w-full pl-3 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-orange outline-none transition-all bg-white">
              <option value="">Select Car Preference</option>
              {cars.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup Location*" className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.pickupLocation ? "border-red-500" : "border-gray-300")} />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="text" name="dropLocation" value={formData.dropLocation} onChange={handleChange} placeholder="Drop Location*" className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.dropLocation ? "border-red-500" : "border-gray-300")} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.travelDate ? "border-red-500" : "border-gray-300")} />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className={cn("w-full pl-10 h-12 rounded-lg border focus:ring-2 focus:ring-accent-orange outline-none transition-all", errors.pickupTime ? "border-red-500" : "border-gray-300")} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} placeholder="Return Date (Optional)" className="w-full pl-10 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-orange outline-none transition-all" />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-3.5 h-5 w-5 text-accent-orange" />
            <input type="number" min="1" max="15" name="passengers" value={formData.passengers} onChange={handleChange} placeholder="Passengers" className="w-full pl-10 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-orange outline-none transition-all" />
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-600 mb-2 font-medium">Trip Type</p>
          <div className="flex flex-wrap gap-4">
            {['Local', 'Outstation', 'Airport', 'Hill Station'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tripType" value={type} checked={formData.tripType === type} onChange={handleChange} className="text-accent-orange focus:ring-accent-orange h-4 w-4" />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Any Special Requirements?" rows={3} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none"></textarea>
        </div>

        <button type="submit" className="w-full h-14 bg-accent-orange hover:bg-accent-gold text-white font-poppins font-semibold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4">
          🚀 Book Now on WhatsApp
        </button>
      </form>
    </div>
  );
}
