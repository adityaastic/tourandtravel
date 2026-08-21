'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScrollFadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollFadeUp({ children, className = '', delay = 0 }: ScrollFadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
