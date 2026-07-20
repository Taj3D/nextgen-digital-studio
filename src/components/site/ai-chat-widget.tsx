'use client'

/**
 * AiChatWidget — floating bottom-right AI chat widget.
 *
 * Wires the homepage AI assistant UI to two existing API routes:
 *   - POST /api/chat-agent  → streams a reply from the LLM (Gemini or z-ai
 *                              fallback). Body: { messages, message, sessionId }.
 *   - POST /api/chat-save   → persists the conversation + auto-captures
 *                              leads (email/phone/name) from chat text.
 *                              Body: { sessionId, messages, source }.
 *
 * Layout:
 *   - Bubble button: bottom-right at `bottom-24 right-6` — sits ABOVE the
 *     existing WhatsApp button cluster (bottom-6 right-6, from
 *     floating-buttons.tsx) so the two never overlap.
 *   - Open panel: 350px wide × up to 500px tall. On mobile (<640px) it
 *     expands to nearly full-width (inset-x-3) for usability.
 *
 * Session:
 *   - sessionId is generated once and stored in localStorage ('ng-chat-session')
 *     so a returning user keeps their conversation thread server-side.
 *
 * Persistence:
 *   - After every assistant reply we fire-and-forget POST /api/chat-save so
 *     the conversation is persisted. The server auto-extracts contact info
 *     (email/phone/name) from the user's messages.
 *
 * Accessibility:
 *   - Bubble button has aria-label (t('chat.ariaOpen')).
 *   - Panel uses role="dialog" with aria-labelledby pointing at the header.
 *   - Escape closes the panel (window keydown listener).
 *   - Input has an associated <Label> (sr-only).
 *   - The typing indicator uses aria-live="polite".
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, ArrowRight, Sparkles } from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { useBookingModal } from '@/components/site/booking-modal-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { waLink } from '@/lib/whatsapp'

type ChatMessage = { role: 'user' | 'assistant'; content: string; id: string }

const SESSION_KEY = 'ng-chat-session'

function makeId(): string {
  // Cryptographically-random when available; falls back to Math.random
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function loadOrCreateSession(): string {
  if (typeof window === 'undefined') return makeId()
  try {
    const existing = window.localStorage.getItem(SESSION_KEY)
    if (existing && existing.length >= 8) return existing
    const fresh = makeId()
    window.localStorage.setItem(SESSION_KEY, fresh)
    return fresh
  } catch {
    return makeId()
  }
}

const QUICK_SUGGESTIONS = [
  { key: 'chat.quickQ1', text: 'What services do you offer?' },
  { key: 'chat.quickQ2', text: 'How much does it cost?' },
  { key: 'chat.quickQ3', text: 'Can you automate WhatsApp?' },
] as const

export function AiChatWidget() {
  const { t, lang } = useLang()
  const { openBookingModal } = useBookingModal()

  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const sessionIdRef = React.useRef<string>('')
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // Skip on admin pages — the chat widget would be intrusive there.
  const isDisabled = React.useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.location.pathname.startsWith('/admin')
  }, [])

  // Initial mount: load sessionId + seed the welcome message
  React.useEffect(() => {
    if (isDisabled) return
    sessionIdRef.current = loadOrCreateSession()
    setMessages([
      {
        id: makeId(),
        role: 'assistant',
        content: t('chat.welcome'),
      },
    ])
     
  }, [])

  // When the language changes, update the welcome message IF it's still the
  // only message (i.e. user hasn't started chatting yet). This keeps the
  // welcome message in sync with the selected language without destroying
  // an active conversation.
  React.useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0]?.role === 'assistant' && prev[0]?.content) {
        return [{ ...prev[0], content: t('chat.welcome') }]
      }
      return prev
    })
     
  }, [lang])

  // Auto-scroll to bottom whenever messages change or typing starts
  React.useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isTyping, open])

  // Focus the input when the panel opens
  React.useEffect(() => {
    if (open) {
      // Small delay so the open animation finishes before focus
      const id = window.setTimeout(() => inputRef.current?.focus(), 200)
      return () => window.clearTimeout(id)
    }
  }, [open])

  // Escape to close
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return
      if (trimmed.length > 1000) return // matches server-side limit

      setHasError(false)
      const userMsg: ChatMessage = { id: makeId(), role: 'user', content: trimmed }
      // Build the messages payload BEFORE state updates so we don't race with React batching
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsTyping(true)

      try {
        const res = await fetch('/api/chat-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.slice(0, -1), // prior conversation (server takes last 8)
            message: trimmed, // current user message
            sessionId: sessionIdRef.current,
          }),
        })

        if (!res.ok) {
          throw new Error(`chat-agent failed with status ${res.status}`)
        }

        const data = (await res.json()) as { ok: boolean; reply?: string; error?: string }
        if (!data.ok || !data.reply) {
          throw new Error(data.error || 'No reply in response')
        }

        const botMsg: ChatMessage = { id: makeId(), role: 'assistant', content: data.reply }
        setMessages((prev) => [...prev, botMsg])

        // Persist the conversation server-side (best-effort). The chat-save
        // route auto-extracts email/phone/name from user messages and creates
        // a Lead row in the CRM if any contact info is present.
        void fetch('/api/chat-save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            messages: [...history, { role: 'assistant', content: data.reply }],
            source: 'ai_chat_widget',
          }),
        }).catch((err) => {
          // Silently swallow — chat-save is best-effort; the user's chat
          // experience must not be impacted by save failures.
          console.error('[ai-chat-widget] chat-save failed', err)
        })
      } catch (err) {
        console.error('[ai-chat-widget] chat-agent error', err)
        setHasError(true)
        // Show a friendly error message inline as an assistant message
        const errMsg: ChatMessage = {
          id: makeId(),
          role: 'assistant',
          content: t('chat.error'),
        }
        setMessages((prev) => [...prev, errMsg])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, isTyping, t],
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void sendMessage(input)
  }

  const clearChat = () => {
    setMessages([
      {
        id: makeId(),
        role: 'assistant',
        content: t('chat.welcome'),
      },
    ])
    setHasError(false)
  }

  if (isDisabled) return null

  return (
    <>
      {/* === Floating bubble button === */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-bubble"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            // Position: bottom-24 right-6 — sits ABOVE the WhatsApp button (bottom-6 right-6)
            className="animate-pulse-glow fixed bottom-24 right-6 z-50 grid h-14 w-14 place-items-center rounded-full gradient-brand text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 safe-bottom"
            aria-label={t('chat.ariaOpen')}
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
            {/* Online indicator */}
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* === Chat panel === */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            role="dialog"
            aria-labelledby="ng-chat-title"
            aria-modal="false"
            // Mobile: nearly full-width (inset-x-3) at bottom-24 (above WhatsApp)
            // Desktop: fixed 350px panel at bottom-24 right-6
            className="fixed inset-x-3 bottom-24 z-50 flex max-h-[500px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl safe-bottom sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[350px]"
          >
            {/* === Header === */}
            <div className="gradient-brand flex items-center justify-between gap-2 px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
                  <Bot className="h-4.5 w-4.5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h2 id="ng-chat-title" className="truncate text-sm font-bold">
                    {t('chat.title')}
                  </h2>
                  <p className="truncate text-[11px] opacity-90">{t('chat.online')}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label={t('chat.ariaClear')}
                  className="grid h-7 w-7 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t('chat.ariaClose')}
                  className="grid h-7 w-7 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            {/* === Messages === */}
            <div
              ref={scrollRef}
              className="custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-muted/20 p-3"
              style={{ maxHeight: '20rem' /* max-h-80 */ }}
              aria-live="polite"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-brand text-white">
                    <Bot className="h-3.5 w-3.5" aria-hidden />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-card px-3 py-2.5 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="sr-only">{t('chat.thinking')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* === Quick suggestion chips (hidden after first user message) === */}
            {messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-1.5 border-t border-border/60 bg-background px-3 py-2.5">
                {QUICK_SUGGESTIONS.map((q) => (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => void sendMessage(q.text)}
                    className="rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-600"
                  >
                    {t(q.key)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    openBookingModal({ source: 'ai_chat_widget' })
                  }}
                  className="rounded-full border border-emerald-500/40 bg-emerald-500/5 px-2.5 py-1 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/10"
                >
                  {t('chat.bookCall')}
                </button>
              </div>
            )}

            {/* === Input === */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border/60 bg-background p-2.5"
            >
              <label htmlFor="ng-chat-input" className="sr-only">
                {t('chat.placeholder')}
              </label>
              <Input
                id="ng-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                maxLength={1000}
                autoComplete="off"
                disabled={isTyping}
                className="h-10 flex-1 border-border/60 bg-card"
                aria-label={t('chat.placeholder')}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isTyping || !input.trim()}
                aria-label={t('chat.ariaSend')}
                className="gradient-brand h-10 w-10 shrink-0 rounded-xl text-white hover:opacity-95 disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden />
              </Button>
            </form>

            {/* === Footer === */}
            <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
              <span className="truncate">{t('chat.disclaimer')}</span>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-0.5 font-medium text-emerald-600 hover:underline"
              >
                WhatsApp
                <ArrowRight className="h-2.5 w-2.5" aria-hidden />
              </a>
            </div>

            {/* === Error retry banner (only shown after an error) === */}
            {hasError && (
              <div className="border-t border-red-500/30 bg-red-500/5 px-3 py-1.5 text-[10px] text-red-500">
                <button
                  type="button"
                  onClick={() => void sendMessage(messages[messages.length - 2]?.content ?? '')}
                  className="font-medium underline hover:no-underline"
                >
                  {t('chat.error')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// === Sub-component: single chat bubble ===

function MessageBubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex items-end gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {!isUser && (
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-brand text-white">
          <Bot className="h-3.5 w-3.5" aria-hidden />
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm shadow-sm',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-card text-card-foreground',
        )}
      >
        {content}
      </div>
    </div>
  )
}

export default AiChatWidget
