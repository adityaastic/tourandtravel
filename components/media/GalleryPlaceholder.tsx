'use client'

import React from 'react'
import PhotoPlaceholder from './PhotoPlaceholder'

interface GalleryPlaceholderProps {
  count?: number
  columns?: 1 | 2 | 3 | 4
  labels?: string[]
}

export default function GalleryPlaceholder({
  count = 6,
  columns = 3,
  labels = []
}: GalleryPlaceholderProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }

  const items = Array.from({ length: count })

  return (
    <div className={`grid gap-4 w-full ${colClasses[columns]}`}>
      {items.map((_, i) => (
        <PhotoPlaceholder
          key={i}
          label={labels[i] || `Photo ${i + 1} of ${count}`}
          slot={`gallery-${i + 1}`}
          aspectRatio="1/1"
        />
      ))}
    </div>
  )
}
