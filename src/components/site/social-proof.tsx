'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, MapPin, Star } from "lucide-react"

type Notification = {
  name: string
  action: string
  location: string
  time: string
  highlight?: string
}

const notifications: Notification[] = [
  { name: "Tanvir A.", action: "booked a free strategy call", location: "Dhaka", time: "2 min ago", highlight: "Real Estate" },
  { name: "Nusrat J.", action: "requested an AI automation audit", location: "Chattogram", time: "5 min ago", highlight: "Hospital" },
  { name: "Rakib H.", action: "subscribed to the newsletter", location: "Dhaka", time: "8 min ago" },
  { name: "Farhana K.", action: "started a WhatsApp automation project", location: "Sylhet", time: "12 min ago", highlight: "School" },
  { name: "Sajid R.", action: "booked a strategy call", location: "Dhaka", time: "15 min ago", highlight: "Corporate" },
  { name: "Maliha C.", action: "downloaded the ROI report", location: "Khulna", time: "18 min ago" },
  { name: "Arif M.", action: "signed up for AI chat agent", location: "Rajshahi", time: "22 min ago", highlight: "E-commerce" },
  { name: "Sumaiya T.", action: "booked a free strategy call", location: "Dhaka", time: "26 min ago", highlight: "Agency" },
  { name: "Naimul I.", action: "requested a CRM automation demo", location: "Barishal", time: "31 min ago" },
  { name: "Tasnim R.", action: "joined the newsletter", location: "Mymensingh", time: "35 min ago" },
]

export function SocialProofNotifications() {
  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)
  const [shownCount, setShownCount] = React.useState(0)

  React.useEffect(() => {
    if (dismissed) return
    // First notification after 6s, then every 9s
    const firstDelay = setTimeout(() => setVisible(true), 6000)
    return () => clearTimeout(firstDelay)
  }, [dismissed])

  React.useEffect(() => {
    if (!visible || dismissed) return
    // Auto-hide after 6s, then cycle to next after 4s gap
    const hideTimer = setTimeout(() => setVisible(false), 6000)
    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % notifications.length)
      setShownCount((c) => c + 1)
      setVisible(true)
    }, 10000)
    return () => {
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [visible, dismissed, index])

  // Stop after showing 5 notifications (avoid being annoying)
  React.useEffect(() => {
    if (shownCount >= 5) setDismissed(true)
  }, [shownCount])

  if (dismissed) return null
  const n = notifications[index]

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-40 sm:bottom-28 sm:right-6">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-72 overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-3.5 shadow-2xl backdrop-blur-xl"
          >
            <button
              aria-label="Dismiss notification"
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-start gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                {n.name.charAt(0)}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
              </div>
              <div className="min-w-0 flex-1 pr-4">
                <p className="text-[13px] leading-snug text-foreground">
                  <span className="font-bold">{n.name}</span>{" "}
                  <span className="text-muted-foreground">{n.action}</span>
                  {n.highlight && (
                    <span className="ml-1 inline-flex rounded bg-blue-600/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                      {n.highlight}
                    </span>
                  )}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    {n.location}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{n.time}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-[10px] font-medium text-muted-foreground">Verified</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500" style={{ animation: "shrink-bar 6s linear forwards" }} />
            <style>{`@keyframes shrink-bar { from { width: 100%; } to { width: 0%; } }`}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
