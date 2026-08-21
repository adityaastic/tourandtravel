"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFAB() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                className="bg-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm text-[#1B2A4A]"
              >
                Chat with Us
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="https://wa.me/919911209636?text=Hi!%20I%20found%20your%20website.%20I%20need%20travel%20help."
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 bg-[#10B981] hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-colors"
          >
            {/* Pulse rings */}
            <span className="absolute w-full h-full rounded-full bg-[#10B981] animate-ping opacity-75"></span>
            <span className="absolute w-full h-full rounded-full border-2 border-[#10B981] scale-150 animate-pulse opacity-50"></span>
            
            <FaWhatsapp size={28} className="relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
