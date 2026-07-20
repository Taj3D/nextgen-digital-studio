'use client'

/**
 * BookingModalContext — a tiny client-side context that lets ANY component
 * (navbar, sticky-book-bar, hero CTA, AI chat widget quick reply, etc.) open
 * the strategy-call booking modal without prop-drilling or wiring up its own
 * state machine.
 *
 * Usage:
 *   - Wrap the app (inside <LanguageProvider>) with <BookingModalProvider>.
 *   - Anywhere you want a "Book Strategy Call" button:
 *       const { openBookingModal } = useBookingModal()
 *       <button onClick={() => openBookingModal({ source: 'navbar' })}>...</button>
 *   - The modal lives exactly once (rendered by the provider) so we never
 *     double-mount it.
 *
 * Optional prefill: openBookingModal({ service }) lets the caller suggest a
 * service (e.g. hero CTA on the WhatsApp-automation page can pre-select
 * "WhatsApp Automation" in the dropdown).
 */

import * as React from 'react'
import { BookingModal } from '@/components/site/booking-modal'

export type BookingPrefill = {
  service?: string
  source?: string
}

type BookingModalContextValue = {
  /** Open the booking modal, optionally pre-filling a service & tagging source. */
  openBookingModal: (prefill?: BookingPrefill) => void
  /** Close the booking modal programmatically. */
  closeBookingModal: () => void
  /** Whether the modal is currently open (useful for tests / debugging). */
  isOpen: boolean
}

const BookingModalContext = React.createContext<BookingModalContextValue | null>(null)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [prefill, setPrefill] = React.useState<BookingPrefill>({})

  const openBookingModal = React.useCallback((next: BookingPrefill = {}) => {
    setPrefill(next)
    setOpen(true)
  }, [])

  const closeBookingModal = React.useCallback(() => {
    setOpen(false)
  }, [])

  const value = React.useMemo(
    () => ({ openBookingModal, closeBookingModal, isOpen: open }),
    [openBookingModal, closeBookingModal, open],
  )

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal
        open={open}
        onOpenChange={setOpen}
        prefillService={prefill.service}
        source={prefill.source}
      />
    </BookingModalContext.Provider>
  )
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = React.useContext(BookingModalContext)
  if (!ctx) {
    throw new Error('useBookingModal must be used within <BookingModalProvider>')
  }
  return ctx
}

export default BookingModalProvider
