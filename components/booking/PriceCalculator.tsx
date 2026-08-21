"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface PriceCalculatorProps {
  basePrice: number;
  packageName: string;
  adults: number;
  children: number;
}

export default function PriceCalculator({ basePrice, packageName, adults, children }: PriceCalculatorProps) {
  const adultTotal = adults * basePrice;
  const childPrice = Math.round(basePrice * 0.7);
  const childTotal = children * childPrice;
  const total = adultTotal + childTotal;

  const handleBook = () => {
    const text = `Hi! I'd like to book the "${packageName}" package for ${adults} Adults and ${children} Children. Estimated total: ₹${total.toLocaleString()}. Please share availability.`;
    const url = `https://wa.me/919911209636?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h3 className="font-poppins font-bold text-xl text-[#1B2A4A] mb-4 border-b pb-3">Price Summary</h3>
      
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between items-center text-gray-600">
          <span>{adults} Adult{adults > 1 ? "s" : ""} × ₹{basePrice.toLocaleString()}</span>
          <span className="font-medium text-[#1B2A4A]">₹{adultTotal.toLocaleString()}</span>
        </div>
        
        {children > 0 && (
          <div className="flex justify-between items-center text-gray-600">
            <span>{children} Child{children > 1 ? "ren" : ""} × ₹{childPrice.toLocaleString()}</span>
            <span className="font-medium text-[#1B2A4A]">₹{childTotal.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-end border-t pt-4 mb-6">
        <span className="text-gray-500 font-medium">Total Amount</span>
        <motion.div
          key={total}
          initial={{ scale: 1.1, color: "#10B981" }}
          animate={{ scale: 1, color: "#1B2A4A" }}
          className="font-poppins font-bold text-3xl text-[#1B2A4A]"
        >
          ₹{total.toLocaleString()}
        </motion.div>
      </div>

      <button
        onClick={handleBook}
        className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 pulse-glow"
      >
        <FaWhatsapp size={22} />
        Book on WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400 mt-3">
        No payment required now. We'll confirm availability.
      </p>
    </div>
  );
}
