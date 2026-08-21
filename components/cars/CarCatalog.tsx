'use client';
import { useState } from 'react';
import { cars } from '@/lib/data/cars';
import CarCard from './CarCard';
import CarCategoryTabs from './CarCategoryTabs';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarCatalog() {
  const [activeCategory, setActiveCategory] = useState('All Cars');
  const categories = ['All Cars', 'Hatchbacks', 'Sedans & MUVs', 'SUVs', 'Premium SUVs'];

  const filteredCars = activeCategory === 'All Cars' 
    ? cars 
    : cars.filter(car => car.category === activeCategory);

  return (
    <div>
      <CarCategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCars.map(car => (
            <motion.div key={car.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
