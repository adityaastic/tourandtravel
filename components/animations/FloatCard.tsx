'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FloatCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FloatCard({ children, className = '', delay = 0 }: FloatCardProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay
      }}
    >
      {children}
    </motion.div>
  )
}
