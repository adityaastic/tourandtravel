"use client";

import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar3 } from "react-icons/bs";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  minDate?: Date;
  className?: string;
  wrapperClassName?: string;
}

export default function DatePicker({
  selected,
  onChange,
  placeholder = "Select travel date",
  label,
  minDate = new Date(),
  className = "",
  wrapperClassName = "",
}: DatePickerProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${wrapperClassName}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <BsCalendar3 className="text-[#F5A623]" size={18} />
        </div>
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate}
          placeholderText={placeholder}
          dateFormat="MMMM d, yyyy"
          className={`w-full h-[52px] pl-11 pr-4 rounded-xl border-[1.5px] border-gray-200 focus:border-[#F5A623] focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 bg-white ${className}`}
        />
      </div>
    </div>
  );
}
