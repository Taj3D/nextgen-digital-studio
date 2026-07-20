'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'

/** Reveal — fade + slide up on scroll into view */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** SectionShell — consistent section padding + optional id for scroll targeting.
 *  Accepts an `aria-label` so screen readers can identify the section's purpose
 *  (landmark role is implicit on <section> when aria-label is provided). */
export function SectionShell({
  id,
  children,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-28 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
