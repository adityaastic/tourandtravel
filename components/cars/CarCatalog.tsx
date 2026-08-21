'use client';

import React, { useState, useMemo } from 'react';
import { cars as initialCars } from '@/lib/data/cars';
import CarCard from './CarCard';
import CarCategoryTabs from './CarCategoryTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, CheckCircle, Search, Filter } from 'lucide-react';

export default function CarCatalog() {
  const [activeCategory, setActiveCategory] = useState('All Cars');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [selectedTripType, setSelectedTripType] = useState('All');
  const [selectedSeating, setSelectedSeating] = useState('All');

  const categories = ['All Cars', 'Hatchbacks', 'Sedans & MUVs', 'SUVs', 'Premium SUVs'];

  const timeSlots = [
    '06:00 AM',
    '08:00 AM',
    '09:00 AM',
    '11:00 AM',
    '02:00 PM',
    '05:00 PM',
    '08:00 PM',
    '10:00 PM',
  ];

  // Live filter based on Category, Date unavailability, and Seating
  const filteredCars = useMemo(() => {
    return initialCars.filter((c) => {
      const car = c as any;
      // 1. Category Filter
      if (activeCategory !== 'All Cars' && car.category !== activeCategory) {
        return false;
      }

      // 2. Seating Filter
      if (selectedSeating === '4-5' && car.seating > 5) return false;
      if (selectedSeating === '6-7' && (car.seating < 6 || car.seating > 7)) return false;
      if (selectedSeating === '8+' && car.seating < 8) return false;

      // 3. Date unavailability check (if defined in car)
      if (car.unavailableDates && Array.isArray(car.unavailableDates)) {
        if (car.unavailableDates.includes(selectedDate)) return false;
      }

      // 4. Status check
      if (car.status === 'Booked' || car.status === 'Maintenance') return false;

      return true;
    });
  }, [activeCategory, selectedDate, selectedSeating]);

  return (
    <div className="space-y-8">
      {/* 1. Date & Time Availability Filter Bar (Airbnb / Uber Style) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-neutral-200/80">
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-100 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-poppins font-bold text-sm sm:text-base text-neutral-900">
              Check Live Fleet Availability
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            ✓ {filteredCars.length} Cabs Available on {selectedDate} ({selectedTime})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Date Selector */}
          <div className="bg-neutral-50 rounded-2xl p-2.5 sm:p-3 border border-neutral-200/60 focus-within:border-[#F5A623] focus-within:bg-white transition-all">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Time Selector */}
          <div className="bg-neutral-50 rounded-2xl p-2.5 sm:p-3 border border-neutral-200/60 focus-within:border-[#F5A623] focus-within:bg-white transition-all">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Pickup Time</span>
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none cursor-pointer"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Seating Filter */}
          <div className="bg-neutral-50 rounded-2xl p-2.5 sm:p-3 border border-neutral-200/60 focus-within:border-[#F5A623] focus-within:bg-white transition-all">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Seating Capacity</span>
            </label>
            <select
              value={selectedSeating}
              onChange={(e) => setSelectedSeating(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Capacities</option>
              <option value="4-5">4-5 Seater (Hatch/Sedan)</option>
              <option value="6-7">6-7 Seater (Innova/Ertiga/Scorpio)</option>
              <option value="8+">8+ Seater (Tempo/Van)</option>
            </select>
          </div>

          {/* Trip Type */}
          <div className="bg-neutral-50 rounded-2xl p-2.5 sm:p-3 border border-neutral-200/60 focus-within:border-[#F5A623] focus-within:bg-white transition-all">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Trip Type</span>
            </label>
            <select
              value={selectedTripType}
              onChange={(e) => setSelectedTripType(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none cursor-pointer"
            >
              <option value="All">Outstation / Local Cab</option>
              <option value="Outstation">Outstation Round Trip</option>
              <option value="OneWay">Outstation One Way Drop</option>
              <option value="Airport">Delhi Airport Transfer</option>
              <option value="Local">Local Full Day (8hr/80km)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Category Tabs */}
      <CarCategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

      {/* 3. Filtered 2-Column Mobile, 3-Column Desktop Cars Grid */}
      {filteredCars.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 space-y-3">
          <p className="text-2xl">🚗</p>
          <h4 className="font-poppins font-bold text-lg text-neutral-900">
            No cars matching selected date and time
          </h4>
          <p className="text-xs text-neutral-500">
            Try adjusting your travel date or seating capacity filter.
          </p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <AnimatePresence>
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
