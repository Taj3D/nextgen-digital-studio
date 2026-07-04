'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, Sparkles, X, ArrowRight, RotateCcw } from "lucide-react"
import { useBooking } from "./booking-modal"
import { useLang } from "./language-provider"
import { siteConfig } from "@/lib/site-data"
import { cn } from "@/lib/utils"

type Msg = { role: "user" | "assistant"; content: string }

const GREETING: Msg = {
  role: "assistant",
  content:
    "Assalamu Alaikum! 👋 I'm the NextGen AI Assistant. I can answer questions about our AI automation services, pricing, and how we can grow your business. How can I help you today?",
}

const STORAGE_KEY = 'nextgen-chat-history'

export function AiChatWidget() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Msg[]>([GREETING])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [unread, setUnread] = React.useState(0)
  const [hydrated, setHydrated] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  const suggestions = [
    t('chat.suggestion1'), t('chat.suggestion2'), t('chat.suggestion3'), t('chat.suggestion4'),
  ]

  // Load chat history from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  // Persist messages to localStorage whenever they change
  React.useEffect(() => {
    if (!hydrated) return
    try {
      // Keep only last 20 messages to avoid bloat
      const toSave = messages.slice(-20)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // storage full or unavailable
    }
  }, [messages, hydrated])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  React.useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // Auto-pulse attention after some time
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setUnread(1)
    }, 12000)
    return () => clearTimeout(t)
  }, [open])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return
    const next: Msg[] = [...messages, { role: "user", content }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          messages: next.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || "failed")
      const finalMessages: Msg[] = [...next, { role: "assistant", content: data.reply }]
      setMessages(finalMessages)
      // Persist conversation to backend (with lead detection) — fire and forget
      saveConversation(finalMessages)
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please book a free strategy call and our team will help you directly. 🙂",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Session ID (stable per browser, stored in sessionStorage)
  const sessionIdRef = React.useRef<string>('')
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    let sid = sessionStorage.getItem('nextgen-chat-sid')
    if (!sid) {
      sid = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem('nextgen-chat-sid', sid)
    }
    sessionIdRef.current = sid
  }, [])

  // Debounced save: persists conversation + detects leads
  const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const saveConversation = React.useCallback((msgs: Msg[]) => {
    if (!sessionIdRef.current || msgs.length <= 1) return
    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      try {
        await fetch('/api/chat-save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            messages: msgs.map((m) => ({ role: m.role, content: m.content })),
          }),
        })
      } catch {
        // silent fail — saving is best-effort
      }
    }, 1500)
  }, [])

  return (
    <>
      {/* Launcher button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('chat.ariaOpen')}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 sm:bottom-6 sm:left-6"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-blue-600" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative"
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Bot className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
        {unread > 0 && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-rose-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-4 z-50 flex h-[34rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl sm:left-6"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3.5 text-white">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-emerald-400" />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-bold leading-tight">
                    {t('chat.title')}
                    <Sparkles className="h-3.5 w-3.5" />
                  </p>
                  <p className="text-[11px] text-blue-50/90">{t('chat.online')}</p>
                </div>
              </div>
              <div className="relative flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    aria-label={t('chat.ariaClear')}
                    title={t('chat.clearChat')}
                    onClick={() => {
                      setMessages([GREETING])
                      try { localStorage.removeItem(STORAGE_KEY) } catch {}
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  aria-label={t('chat.ariaClose')}
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto scroll-area bg-muted/20 p-4"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {loading && <TypingBubble />}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 border-t border-border/60 bg-card px-3 py-2.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-blue-600/40 hover:bg-blue-600/5 hover:text-blue-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* CTA to book a call */}
            {messages.length >= 3 && (
              <div className="border-t border-border/60 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 px-3 py-2">
                <button
                  onClick={() => {
                    setOpen(false)
                    openWith("AI Chat → Strategy Call")
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-[1.01]"
                >
                  {t('chat.bookCall')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 border-t border-border/60 bg-card p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                maxLength={1000}
                className="flex-1 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/15"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label={t('chat.ariaSend')}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md transition-all",
                  (loading || !input.trim()) && "opacity-50",
                )}
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
            <p className="bg-card px-4 pb-2 text-center text-[10px] text-muted-foreground">
              {t('chat.poweredBy')} · <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="underline">{t('chat.callUs')}</a> {t('chat.urgentEnquiry')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user"
  const { tr } = useLang()
  // Assistant canned messages (greeting / error) are stored in English and
  // translated at render via tr(). Dynamic AI replies pass through unchanged.
  const display = isUser ? msg.content : tr(msg.content)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
            : "rounded-bl-md bg-card text-foreground border border-border/60",
        )}
      >
        {display}
      </div>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/60 bg-card px-4 py-3 shadow-sm">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
      </div>
    </div>
  )
}
