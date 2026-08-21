import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F1A2E] text-white pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-[#1B2A4A] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-12 border border-white/10 shadow-xl">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="font-poppins font-bold text-2xl text-white mb-2">Karuna Travels</h3>
            <p className="text-gray-300">Your Trusted Travel Partner Since 2014</p>
          </div>
          <div className="flex gap-4">
            <a href="https://wa.me/919911209636" className="bg-[#10B981] hover:bg-emerald-600 p-3 rounded-full transition-colors text-white">
              <FaWhatsapp size={24} />
            </a>
            <a href="#" className="bg-gradient-to-tr from-yellow-400 to-fuchsia-600 hover:opacity-90 p-3 rounded-full transition-opacity text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors text-white">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h4 className="font-poppins font-bold text-3xl text-white">Just Tourism</h4>
            <p className="text-[#F5A623] font-medium tracking-wider text-sm uppercase">Explore · Travel · Enjoy</p>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              We specialize in providing the best travel experiences across India and international destinations. Let us make your journey unforgettable.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-xl text-white mb-6 border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Tour Packages", "Car Booking", "Blog", "Contact", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-[#F5A623] transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="font-poppins font-bold text-xl text-white mb-6 border-b border-white/10 pb-2 inline-block">Destinations</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {["Shimla", "Manali", "Kashmir", "Jim Corbett", "Goa", "Rajasthan", "Kerala", "Dubai"].map((dest) => (
                <li key={dest}>
                  <Link href={`/packages/${dest.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-[#F5A623] transition-colors text-sm">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-poppins font-bold text-xl text-white mb-6 border-b border-white/10 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#F5A623] shrink-0 mt-1" size={18} />
                <span className="text-gray-400 text-sm">
                  Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#F5A623] shrink-0" size={18} />
                <div className="flex flex-col text-sm text-gray-400">
                  <a href="tel:+919911209636" className="hover:text-white transition-colors">+91-9911209636</a>
                  <a href="tel:+918860978897" className="hover:text-white transition-colors">+91-8860978897</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#F5A623] shrink-0" size={18} />
                <a href="mailto:karunadikoshiya000@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                  karunadikoshiya000@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-[#F5A623] shrink-0" size={18} />
                <span className="text-gray-400 text-sm">Mon - Sun: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#0A1121] py-6 mt-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Karuna Travels | Just Tourism. All Rights Reserved.</p>
          <p className="flex items-center gap-1">Designed with <span className="text-red-500 text-sm">❤️</span> for Indian Travelers</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="/admin/login" className="text-[#F5A623] hover:underline transition-colors font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
