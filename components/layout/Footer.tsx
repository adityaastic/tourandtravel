"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#071A3D] text-white pt-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Trust Banner */}
        <div className="bg-[#0D2A57] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-12 border border-white/10 shadow-xl gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-poppins font-bold text-2xl text-white mb-1">
              Just Tourism — Travel More. Worry Less.
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Delhi's premier travel agency & cab booking partner since 2014
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/919911209636" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#10B981] hover:bg-[#059669] p-3 rounded-full transition-all text-white shadow-md hover:scale-105"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
            <a 
              href="https://instagram.com/justtourism" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 p-3 rounded-full transition-all text-white shadow-md hover:scale-105"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a 
              href="tel:+919911209636" 
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all text-white shadow-md hover:scale-105"
              aria-label="Call"
            >
              <Phone size={20} className="text-[#F97316]" />
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h4 className="font-poppins font-bold text-2xl text-white">Just Tourism</h4>
            <p className="text-[#F97316] font-semibold tracking-wider text-xs uppercase">
              Explore · Travel · Enjoy
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Tailor-made domestic tour packages, sanitised outstation AC cabs, and memorable holidays across India & international destinations.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-4 border-b border-white/10 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Home", href: "/" },
                { name: "Tour Packages", href: "/packages" },
                { name: "Cab Services", href: "/car-booking" },
                { name: "About Us", href: "/about" },
                { name: "Travel Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#F97316] transition-colors flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-4 border-b border-white/10 pb-2 inline-block">
              Popular Destinations
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs sm:text-sm">
              {[
                { name: "Kashmir", slug: "kashmir-7d6n" },
                { name: "Manali", slug: "manali-6d5n" },
                { name: "Shimla", slug: "shimla-4d3n" },
                { name: "Goa", slug: "goa-5d4n" },
                { name: "Rajasthan", slug: "rajasthan-8d7n" },
                { name: "Kerala", slug: "kerala-7d6n" },
                { name: "Jim Corbett", slug: "jim-corbett-3d2n" },
                { name: "Dubai", slug: "dubai-5d4n" },
              ].map((dest) => (
                <li key={dest.name}>
                  <Link href={`/packages/${dest.slug}`} className="text-gray-300 hover:text-[#F97316] transition-colors">
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-4 border-b border-white/10 pb-2 inline-block">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#F97316] shrink-0 mt-0.5" size={16} />
                <span className="text-gray-300">
                  Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#F97316] shrink-0" size={16} />
                <div className="flex flex-col text-gray-300">
                  <a href="tel:+919911209636" className="hover:text-white transition-colors">+91-9911209636</a>
                  <a href="tel:+918860978897" className="hover:text-white transition-colors">+91-8860978897</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#F97316] shrink-0" size={16} />
                <a href="mailto:karunadikoshiya000@gmail.com" className="text-gray-300 hover:text-white transition-colors break-all">
                  karunadikoshiya000@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-[#F97316] shrink-0" size={16} />
                <span className="text-gray-300">Mon - Sun: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#051329] py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Just Tourism (Karuna Travels). All Rights Reserved.</p>
          <p className="flex items-center gap-1">Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Travelers</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Cancellation Policy</Link>
            <Link href="/admin/login" className="text-[#F97316] hover:underline transition-colors font-medium">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
