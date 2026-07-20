'use client'

/**
 * ScrollProgress — a 3px reading-progress bar pinned to the very top of the
 * viewport. Uses requestAnimationFrame to throttle scroll updates so we never
 * paint more than once per frame, even on scroll-heavy pages.
 *
 * Design notes:
 *  - z-[100] keeps it above the navbar (which is z-40) and floating UI (z-50).
 *  - Uses the brand gradient (gradient-brand) so it matches the rest of the UI.
 *  - Renders nothing until mounted (avoids SSR/hydration width mismatch).
 */

import * as React from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0)
  const frameRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const compute = () => {
      frameRef.current = null
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const max = doc.scrollHeight - doc.clientHeight
      // Guard against division by zero on very short pages
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0
      setProgress(pct)
    }

    const onScroll = () => {
      // Coalesce multiple scroll events into a single rAF callback
      if (frameRef.current == null) {
        frameRef.current = window.requestAnimationFrame(compute)
      }
    }

    // Initial measure (covers in-page anchor loads / refreshes mid-scroll)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] w-full"
    >
      <div
        className="gradient-brand h-full origin-left transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
