import React from 'react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  emoji?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  emoji,
  centered = true,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#1B2A4A] mb-4 flex items-center justify-center gap-3">
        {emoji && <span>{emoji}</span>}
        {title}
      </h2>
      <div className={`h-1.5 w-24 bg-[#F5A623] rounded-full mb-6 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-inter">
          {subtitle}
        </p>
      )}
    </div>
  )
}
