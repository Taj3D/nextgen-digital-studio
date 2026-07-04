'use client'

import * as React from "react"

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Supports decimal values and a suffix/prefix.
 */
export function useCountUp(end: number, duration = 1800, start = false) {
  const [value, setValue] = React.useState(0)
  const rafRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      // easeOutExpo for a premium feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(end * eased)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration, start])

  return value
}
