'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, ArrowRight, Loader2, Sparkles, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      toast.success('Welcome back, Admin!');
      router.push('/admin');
      router.refresh();
    } catch {
      toast.error('Network error during login');
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setUsername('admin');
    setPassword('admin123');
    toast.success('Demo credentials loaded!');
  };

  return (
    <div className="min-h-screen w-full bg-[#0F1A2E] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1B2A4A]/80 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1B2A4A] to-[#F5A623] mx-auto flex items-center justify-center shadow-xl shadow-orange-500/20 mb-4">
            <ShieldCheck className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A2E] font-poppins">
            Karuna Travels
          </h1>
          <p className="text-xs text-orange-600 font-semibold tracking-wider uppercase mt-0.5">
            Just Tourism · Admin Portal
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Secure sign in to manage tours, fleet, blogs & bookings.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin / karuna"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E8921A] hover:from-[#E8921A] hover:to-[#D97E09] text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Control Center</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credential Quick Fill Helper */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-[#F5A623]" />
            <span>Default: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">admin</code> / <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">admin123</code></span>
          </div>
          <button
            type="button"
            onClick={fillDemoCreds}
            className="text-[#F5A623] hover:text-[#E8921A] font-semibold underline cursor-pointer"
          >
            Auto-fill
          </button>
        </div>
      </div>
    </div>
  );
}
