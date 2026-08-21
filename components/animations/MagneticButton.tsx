'use client'

import React, { ReactNode, useRef, MouseEvent, useState } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: any
}

export default function MagneticButton({ children, className = '', as: Component = 'button' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Component
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </Component>
  )
}
