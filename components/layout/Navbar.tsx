"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, MapPin, Car, BookOpen, Phone, Menu, X, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import BrandLogo from "@/components/shared/BrandLogo";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Building2 },
  { name: "Packages", href: "/packages", icon: MapPin, hasDropdown: true },
  { name: "Car Booking", href: "/car-booking", icon: Car },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Phone },
];

const packageCategories = [
  {
    title: "Mountains",
    items: ["Shimla", "Manali", "Kashmir", "Ladakh", "Mussoorie", "Nainital"],
  },
  {
    title: "Beaches & Wildlife",
    items: ["Goa", "Kerala", "Jim Corbett", "Ranthambore"],
  },
  {
    title: "Heritage & Spiritual",
    items: ["Rajasthan", "Golden Triangle", "Haridwar", "Vaishno Devi", "Agra", "Mathura"],
  },
  {
    title: "International",
    items: ["Dubai", "Thailand", "Singapore+Malaysia"],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 sm:h-18 flex items-center overflow-visible ${
        scrolled ? "bg-[#0F1A2E]/95 backdrop-blur-md shadow-xl" : "bg-gradient-to-b from-[#0F1A2E]/90 via-[#0F1A2E]/40 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between overflow-visible">
        {/* Brand Logo */}
        <BrandLogo variant="navbar" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setPackagesOpen(true)}
                  onMouseLeave={() => setPackagesOpen(false)}
                >
                  <button className="flex items-center gap-2 text-white hover:text-[#F5A623] transition-colors font-medium">
                    <Icon size={18} />
                    {link.name}
                    <ChevronDown size={16} />
                  </button>

                  <AnimatePresence>
                    {packagesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[800px] bg-white rounded-xl shadow-2xl overflow-hidden glass-morphism"
                      >
                        <div className="grid grid-cols-4 p-6 gap-6">
                          {packageCategories.map((category) => (
                            <div key={category.title}>
                              <h4 className="font-poppins font-bold text-[#1B2A4A] mb-3 border-b pb-2">
                                {category.title}
                              </h4>
                              <ul className="space-y-2">
                                {category.items.map((item) => (
                                  <li key={item}>
                                    <Link
                                      href={`/packages/${item.toLowerCase().replace(/ /g, "-")}`}
                                      className="text-gray-600 hover:text-[#F5A623] transition-colors text-sm flex items-center gap-2"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-[#F5A623] opacity-0 transition-opacity hover:opacity-100"></div>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  isActive ? "text-[#F5A623]" : "text-white hover:text-[#F5A623]"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919911209636"
            className="text-white font-medium hover:text-[#F5A623] transition-colors flex items-center gap-2"
          >
            <Phone size={18} />
            +91-9911209636
          </a>
          <a
            href="https://wa.me/919911209636?text=Hi!%20I%20found%20your%20website.%20I%20need%20travel%20help."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10B981] hover:bg-emerald-600 text-white p-2 rounded-full transition-colors shadow-lg pulse-glow"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 flex flex-col lg:hidden"
            >
              <div className="p-5 flex items-center justify-between border-b">
                <div className="flex flex-col text-[#1B2A4A]">
                  <span className="font-poppins font-bold text-xl">Just Tourism</span>
                  <span className="text-xs text-gray-500">Karuna Travels</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-5 space-y-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    if (link.hasDropdown) {
                      return (
                        <div key={link.name} className="flex flex-col gap-3 border-b pb-4">
                          <div className="flex items-center justify-between text-[#1B2A4A] font-medium">
                            <div className="flex items-center gap-3">
                              <Icon size={20} className="text-[#F5A623]" />
                              {link.name}
                            </div>
                          </div>
                          <div className="pl-8 space-y-4">
                            {packageCategories.map((category) => (
                              <div key={category.title}>
                                <h5 className="font-poppins font-semibold text-sm text-gray-800 mb-2">
                                  {category.title}
                                </h5>
                                <div className="flex flex-col gap-2">
                                  {category.items.map((item) => (
                                    <Link
                                      key={item}
                                      href={`/packages/${item.toLowerCase().replace(/ /g, "-")}`}
                                      className="text-gray-600 text-sm py-1"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 font-medium border-b pb-4 ${
                          isActive ? "text-[#F5A623]" : "text-[#1B2A4A]"
                        }`}
                      >
                        <Icon size={20} className={isActive ? "text-[#F5A623]" : "text-gray-400"} />
                        {link.name}
                    </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-5 border-t bg-gray-50">
                <a
                  href="https://wa.me/919911209636"
                  className="flex items-center justify-center gap-2 w-full bg-[#10B981] text-white py-3 rounded-lg font-medium shadow-md"
                >
                  <FaWhatsapp size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
