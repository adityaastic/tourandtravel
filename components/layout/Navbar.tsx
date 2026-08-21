"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, Car, Building2, BookOpen, Phone, Menu, X, ChevronDown, Sparkles, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import BrandLogo from "@/components/shared/BrandLogo";

const navLinks = [
  { name: "Destinations", href: "/packages", icon: MapPin },
  { name: "Packages", href: "/packages", icon: Compass, hasDropdown: true },
  { name: "Cabs", href: "/car-booking", icon: Car },
  { name: "About", href: "/about", icon: Building2 },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

const packageCategories = [
  {
    title: "🏔️ Mountains",
    items: [
      { name: "Shimla", slug: "shimla-4d3n" },
      { name: "Manali", slug: "manali-6d5n" },
      { name: "Kashmir", slug: "kashmir-7d6n" },
      { name: "Ladakh", slug: "ladakh-8d7n" },
    ],
  },
  {
    title: "🌴 Beaches & Wildlife",
    items: [
      { name: "Goa", slug: "goa-5d4n" },
      { name: "Kerala", slug: "kerala-7d6n" },
      { name: "Jim Corbett", slug: "jim-corbett-3d2n" },
      { name: "Ranthambore", slug: "ranthambore-3d2n" },
    ],
  },
  {
    title: "🏰 Heritage & Spiritual",
    items: [
      { name: "Rajasthan", slug: "rajasthan-8d7n" },
      { name: "Golden Triangle", slug: "golden-triangle-5d4n" },
      { name: "Haridwar & Rishikesh", slug: "haridwar-rishikesh-3d2n" },
      { name: "Vaishno Devi", slug: "vaishno-devi-4d3n" },
    ],
  },
  {
    title: "✈️ International",
    items: [
      { name: "Dubai Luxury", slug: "dubai-5d4n" },
      { name: "Thailand", slug: "thailand-6d5n" },
      { name: "Singapore & Malaysia", slug: "singapore-malaysia-7d6n" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setPackagesOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 sm:h-20 flex items-center overflow-visible ${
        scrolled 
          ? "bg-[#071A3D]/95 backdrop-blur-md shadow-xl border-b border-white/10" 
          : "bg-gradient-to-b from-[#071A3D]/90 via-[#071A3D]/40 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between overflow-visible">
        {/* Brand Logo */}
        <BrandLogo variant="navbar" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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
                  <button className="flex items-center gap-1.5 text-white/90 hover:text-[#F97316] transition-colors font-medium text-sm py-2 cursor-pointer">
                    <Icon size={16} />
                    <span>{link.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  <AnimatePresence>
                    {packagesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-[#071A3D] border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 z-50"
                      >
                        <div className="grid grid-cols-4 gap-6">
                          {packageCategories.map((category) => (
                            <div key={category.title} className="space-y-3">
                              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-[#F97316] border-b border-white/10 pb-2">
                                {category.title}
                              </h4>
                              <ul className="space-y-2">
                                {category.items.map((item) => (
                                  <li key={item.slug}>
                                    <Link
                                      href={`/packages/${item.slug}`}
                                      className="text-xs text-gray-300 hover:text-white hover:translate-x-1 transition-all block font-medium"
                                    >
                                      {item.name}
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
                className={`flex items-center gap-1.5 transition-colors font-medium text-sm py-2 ${
                  isActive ? "text-[#F97316] font-bold" : "text-white/90 hover:text-[#F97316]"
                }`}
              >
                <Icon size={16} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Phone Link */}
          <a
            href="tel:+919911209636"
            className="flex items-center gap-2 text-white/90 hover:text-[#F97316] text-xs font-semibold px-3 py-2 rounded-full border border-white/15 transition-all hover:bg-white/5"
          >
            <Phone size={13} className="text-[#F97316]" />
            <span>+91-9911209636</span>
          </a>

          {/* Plan Your Trip CTA */}
          <Link
            href="/#planner"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-full font-poppins font-bold text-xs shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Plan Your Trip</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="https://wa.me/919911209636"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#10B981] text-white shadow-md"
            aria-label="WhatsApp Us"
          >
            <FaWhatsapp size={16} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#071A3D] text-white z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-white/10"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-poppins font-bold text-base text-white">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-gray-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#F97316] text-white font-bold"
                          : "text-gray-200 hover:bg-white/10"
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-white" : "text-[#F97316]"} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <Link
                href="/#planner"
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-xl font-poppins font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
              >
                <Sparkles size={15} />
                <span>Plan Your Trip</span>
              </Link>

              <a
                href="tel:+919911209636"
                className="w-full bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-xl font-poppins font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-[#F97316]" />
                <span>Call: +91-9911209636</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
