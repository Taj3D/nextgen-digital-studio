'use client'

import { ArrowLeft } from 'lucide-react'

/**
 * BackButton — small client component that calls `window.history.back()`.
 *
 * Extracted from not-found.tsx (a server component) because server components
 * cannot attach event handlers like onClick. This wrapper keeps the 404 page
 * server-rendered for SEO while allowing the back button to work.
 */
export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.history.back()
        }
      }}
      className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
      Go Back
    </button>
  )
}
