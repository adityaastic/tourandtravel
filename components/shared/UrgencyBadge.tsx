'use client'

import React from 'react'

interface UrgencyBadgeProps {
  text: string
  variant?: 'fire' | 'lightning' | 'check'
  className?: string
}

export default function UrgencyBadge({
  text,
  variant = 'fire',
  className = ''
}: UrgencyBadgeProps) {
  const variants = {
    fire: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: '🔥',
      pulse: 'rgba(239, 68, 68, 0.4)'
    },
    lightning: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      icon: '⚡',
      pulse: 'rgba(245, 158, 11, 0.4)'
    },
    check: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      icon: '✓',
      pulse: 'rgba(16, 185, 129, 0.4)'
    }
  }

  const v = variants[variant]

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${v.bg} ${v.text} ${className}`}>
      <style>{`
        @keyframes badge-pulse {
          0% { box-shadow: 0 0 0 0 ${v.pulse}; }
          70% { box-shadow: 0 0 0 6px rgba(0,0,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }
        .animate-badge-pulse {
          animation: badge-pulse 2s infinite;
        }
      `}</style>
      <span className="animate-badge-pulse rounded-full">{v.icon}</span>
      <span>{text}</span>
    </div>
  )
}
