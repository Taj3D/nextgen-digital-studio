'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarClock, X } from "lucide-react"
import { useBooking } from "./booking-modal"

export function StickyBookBar() {
  const [visible, setVisible] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)
  const { openWith } = useBooking()

  React.useEffect(() => {
    if (dismissed) return
    const onScroll = () => {
      // Show after scrolling past 60% of viewport, hide near footer
      const scrollY = window.scrollY
      const docHeight = document.body.scrollHeight
      const winHeight = window.innerHeight
      const pastThreshold = scrollY > winHeight * 1.2
      const nearBottom = scrollY + winHeight > docHeight - 600
      setVisible(pastThreshold && !nearBottom)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-2.5 pl-4 shadow-2xl backdrop-blur-xl">
            <div className="hidden flex-1 items-center gap-3 sm:flex">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Ready to automate your growth?</p>
                <p className="text-xs text-muted-foreground">Free 30-min strategy call · No commitment</p>
              </div>
            </div>
            <div className="flex-1 sm:hidden">
              <p className="text-sm font-bold leading-tight">Book a free strategy call</p>
              <p className="text-xs text-muted-foreground">30 min · No commitment</p>
            </div>
            <button
              onClick={() => openWith("Sticky book bar")}
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.03] sm:px-6"
            >
              Book Now
            </button>
            <button
              aria-label="Dismiss"
              onClick={() => setDismissed(true)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
