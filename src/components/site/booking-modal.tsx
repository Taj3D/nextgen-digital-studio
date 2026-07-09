'use client'

import * as React from 'react'

/**
 * BookingProvider — no-op provider (booking modal removed).
 * Kept for backwards compatibility with components that import useBooking.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useBooking() {
  return {
    openWith: (_service?: string) => {
      // Scroll to lead form instead
      if (typeof document !== 'undefined') {
        const form = document.getElementById('order') || document.getElementById('lead-form') || document.getElementById('contact')
        if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
  }
}
