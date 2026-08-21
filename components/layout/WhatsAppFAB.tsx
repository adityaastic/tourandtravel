"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

export default function WhatsAppFAB() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
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
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5"
        >
          {/* Quick Call Button */}
          <a
            href="tel:+919911209636"
            className="flex items-center justify-center w-11 h-11 bg-[#071A3D] hover:bg-[#0D2A57] text-white rounded-full shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95 group"
            title="Call +91-9911209636"
            aria-label="Call Just Tourism"
          >
            <Phone size={18} className="text-[#F97316]" />
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919911209636?text=Hi!%20I%20found%20your%20website%20and%20want%20to%20plan%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#10B981] hover:bg-[#059669] text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Just Tourism"
          >
            <span className="absolute w-full h-full rounded-full bg-[#10B981] animate-ping opacity-50" />
            <FaWhatsapp size={28} className="relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
