'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, MessageCircle, X } from "lucide-react"
import { siteConfig } from "@/lib/site-data"

export function FloatingButtons() {
  const [showTop, setShowTop] = React.useState(false)
  const [waOpen, setWaOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-muted"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp popup card */}
      <AnimatePresence>
        {waOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-green-600 bg-emerald-300" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">NextGen Team</p>
                  <p className="text-[11px] text-green-50/90">Typically replies instantly</p>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setWaOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm">
                👋 Hi there! Have a question about AI automation for your business?
                We&apos;d love to help. Send us a message!
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hi NextGen Digital Studio! I'd like to know more about your AI automation services.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Start WhatsApp Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        onClick={() => setWaOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-600/30"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-500" />
        {waOpen ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircle className="relative h-7 w-7" />
        )}
      </motion.button>
    </div>
  )
}
