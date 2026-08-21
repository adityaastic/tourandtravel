'use client'

import React, { useEffect, useState } from 'react'

export default function SkyParticles() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const planes = Array.from({ length: 12 })
  const stars = Array.from({ length: 30 })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <style>{`
        @keyframes fly-right {
          0% { transform: translateX(-10vw) scale(0.5); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateX(110vw) scale(0.5); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
      
      {stars.map((_, i) => {
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 5
        const duration = 2 + Math.random() * 3
        
        return (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`
            }}
          />
        )
      })}
      
      {planes.map((_, i) => {
        const top = 10 + Math.random() * 80
        const delay = Math.random() * 15
        const duration = 8 + Math.random() * 10
        
        return (
          <div
            key={`plane-${i}`}
            className="absolute left-0 text-white/20"
            style={{
              top: `${top}%`,
              animation: `fly-right ${duration}s linear ${delay}s infinite`
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
