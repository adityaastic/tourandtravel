'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-bg-light px-4 text-center">
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 text-primary-navy"
      >
        <Plane size={120} strokeWidth={1} />
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary-navy mb-4">Oops! This destination doesn't exist 😅</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">The page you're looking for has flown away or was moved to a new route.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="px-8 py-3 bg-accent-orange text-white font-medium rounded-full hover:bg-accent-gold transition-colors shadow-lg hover:shadow-xl">
          Go Back Home
        </Link>
        <Link href="/packages" className="px-8 py-3 border-2 border-primary-navy text-primary-navy font-medium rounded-full hover:bg-primary-navy hover:text-white transition-colors">
          Explore Packages
        </Link>
      </div>
    </div>
  );
}
