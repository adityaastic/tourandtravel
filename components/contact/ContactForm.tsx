'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'General Query', travelDate: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(errors[e.target.name]) setErrors({...errors, [e.target.name]: false});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setErrors({ name: !formData.name, phone: !formData.phone, message: !formData.message });
      return;
    }
    const msg = `*New Contact Enquiry* 💬\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nSubject: ${formData.subject}\nDate: ${formData.travelDate || 'N/A'}\nMessage: ${formData.message}`;
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} className={cn("w-full px-4 h-12 rounded-xl border outline-none focus:ring-2 focus:ring-accent-orange", errors.name ? "border-red-500" : "border-gray-200")} />
        <input type="tel" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} className={cn("w-full px-4 h-12 rounded-xl border outline-none focus:ring-2 focus:ring-accent-orange", errors.phone ? "border-red-500" : "border-gray-200")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 h-12 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent-orange" />
        <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 h-12 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent-orange bg-white">
          <option value="Tour Package Enquiry">Tour Package Enquiry</option>
          <option value="Car Booking">Car Booking</option>
          <option value="Custom Itinerary">Custom Itinerary</option>
          <option value="Group Booking">Group Booking</option>
          <option value="General Query">General Query</option>
        </select>
      </div>
      <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full px-4 h-12 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent-orange" />
      <textarea name="message" placeholder="Your Message*" rows={4} value={formData.message} onChange={handleChange} className={cn("w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-accent-orange resize-none", errors.message ? "border-red-500" : "border-gray-200")}></textarea>
      <button type="submit" className="w-full bg-accent-orange hover:bg-accent-gold text-white font-semibold py-4 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-2">🚀 Send Message</button>
    </form>
  );
}
