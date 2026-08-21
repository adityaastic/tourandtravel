"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsClock } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function TimePicker({ value, onChange, label }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Simple parser
  const parseTime = (val: string) => {
    if (!val) return { hour: "10", minute: "00", period: "AM" };
    const [time, period] = val.split(" ");
    const [hour, minute] = time.split(":");
    return { hour, minute, period: period || "AM" };
  };

  const current = parseTime(value);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  const presets = [
    { label: "Morning", val: "09:00 AM" },
    { label: "Noon", val: "12:00 PM" },
    { label: "Evening", val: "06:00 PM" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const updateTime = (key: "hour" | "minute" | "period", val: string) => {
    const next = { ...current, [key]: val };
    onChange(`${next.hour}:${next.minute} ${next.period}`);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={popupRef}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full h-[52px] pl-11 pr-4 rounded-xl border-[1.5px] outline-none transition-all bg-white text-left flex items-center ${
          isOpen ? "border-[#F5A623] ring-2 ring-orange-200" : "border-gray-200"
        }`}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <BsClock className="text-[#F5A623]" size={18} />
        </div>
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "Select pickup time"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-full sm:w-[320px] z-50 glass-morphism-dark rounded-xl shadow-2xl p-4 border border-[#F5A623]/30"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium text-sm">Quick Select</span>
              <div className="flex gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      onChange(preset.val);
                      setIsOpen(false);
                    }}
                    className="text-xs bg-white/10 hover:bg-[#F5A623] text-white px-2 py-1 rounded-md transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-48 flex justify-between items-center bg-[#0F1A2E]/50 rounded-lg overflow-hidden border border-white/10">
              {/* Center Highlight */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-10 bg-[#F5A623]/20 border-y border-[#F5A623]/50 pointer-events-none" />

              {/* Hour Column */}
              <div className="flex-1 h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide py-[72px] text-center">
                {hours.map((h) => (
                  <div
                    key={`h-${h}`}
                    onClick={() => updateTime("hour", h)}
                    className={`h-10 flex items-center justify-center snap-center cursor-pointer transition-all ${
                      current.hour === h ? "text-white text-xl font-bold" : "text-white/40 text-sm"
                    }`}
                  >
                    {h}
                  </div>
                ))}
              </div>

              <div className="text-white/50 text-xl font-bold">:</div>

              {/* Minute Column */}
              <div className="flex-1 h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide py-[72px] text-center">
                {minutes.map((m) => (
                  <div
                    key={`m-${m}`}
                    onClick={() => updateTime("minute", m)}
                    className={`h-10 flex items-center justify-center snap-center cursor-pointer transition-all ${
                      current.minute === m ? "text-white text-xl font-bold" : "text-white/40 text-sm"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>

              {/* Period Column */}
              <div className="flex-1 h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide py-[72px] text-center">
                {periods.map((p) => (
                  <div
                    key={`p-${p}`}
                    onClick={() => updateTime("period", p)}
                    className={`h-10 flex items-center justify-center snap-center cursor-pointer transition-all ${
                      current.period === p ? "text-[#F5A623] text-xl font-bold" : "text-white/40 text-sm"
                    }`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-[#F5A623] hover:bg-[#E8921A] text-white py-2 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
