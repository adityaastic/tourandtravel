"use client";

import React, { useState, useRef, useEffect } from "react";
import { Users, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerCounterProps {
  value: PassengerCounts;
  onChange: (val: PassengerCounts) => void;
}

export default function PassengerCounter({ value, onChange }: PassengerCounterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const total = value.adults + value.children + value.infants;
  const maxTotal = 15;

  const handleUpdate = (type: keyof PassengerCounts, delta: number) => {
    const current = value[type];
    const newCount = current + delta;
    
    if (delta > 0 && total >= maxTotal) return; // limit
    if (type === "adults" && newCount < 1) return; // min 1 adult
    if (newCount < 0) return; // min 0

    onChange({ ...value, [type]: newCount });
  };

  const getDisplayText = () => {
    const parts = [`${value.adults} Adult${value.adults > 1 ? "s" : ""}`];
    if (value.children > 0) parts.push(`${value.children} Child${value.children > 1 ? "ren" : ""}`);
    if (value.infants > 0) parts.push(`${value.infants} Infant${value.infants > 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  return (
    <div className="relative w-full" ref={popupRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full h-[52px] pl-11 pr-4 rounded-xl border-[1.5px] outline-none transition-all bg-white text-left flex items-center ${
          isOpen ? "border-[#F5A623] ring-2 ring-orange-200" : "border-gray-200"
        }`}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Users className="text-[#F5A623]" size={18} />
        </div>
        <span className="text-gray-800 truncate pr-4">{getDisplayText()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-[300px] z-50 glass-morphism rounded-xl shadow-2xl p-4"
          >
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-poppins font-medium text-[#1B2A4A]">Adults</div>
                  <div className="text-xs text-gray-500">Age 12+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdate("adults", -1)}
                    disabled={value.adults <= 1}
                    className="w-8 h-8 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center disabled:opacity-30 disabled:border-gray-300 disabled:text-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-4 text-center font-poppins font-bold text-[#1B2A4A]">{value.adults}</span>
                  <button
                    onClick={() => handleUpdate("adults", 1)}
                    disabled={total >= maxTotal}
                    className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-poppins font-medium text-[#1B2A4A]">Children</div>
                  <div className="text-xs text-gray-500">Age 2-11</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdate("children", -1)}
                    disabled={value.children <= 0}
                    className="w-8 h-8 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center disabled:opacity-30 disabled:border-gray-300 disabled:text-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-4 text-center font-poppins font-bold text-[#1B2A4A]">{value.children}</span>
                  <button
                    onClick={() => handleUpdate("children", 1)}
                    disabled={total >= maxTotal || value.children >= 8}
                    className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-poppins font-medium text-[#1B2A4A]">Infants</div>
                  <div className="text-xs text-gray-500">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdate("infants", -1)}
                    disabled={value.infants <= 0}
                    className="w-8 h-8 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center disabled:opacity-30 disabled:border-gray-300 disabled:text-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-4 text-center font-poppins font-bold text-[#1B2A4A]">{value.infants}</span>
                  <button
                    onClick={() => handleUpdate("infants", 1)}
                    disabled={total >= maxTotal || value.infants >= 4}
                    className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
