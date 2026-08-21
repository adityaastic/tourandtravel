'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CounterAnimationProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CounterAnimation({ 
  end, 
  suffix = '', 
  duration = 2, 
  className = '' 
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(end)
    }
  }, [isInView, end, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref} className={className}>0{suffix}</span>
}
