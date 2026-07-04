'use client'

import * as React from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: "div" | "section" | "li" | "span"
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
      </span>
      {children}
    </span>
  )
}
