'use client'

import * as React from 'react'
import { Bot, Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLang } from '@/components/site/language-provider'

type Role = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: Role
  content: string
}

const SESSION_KEY = 'nextgen-chat-session'

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return crypto.randomUUID()
  }
}

export function AiChatWidget() {
  const { t } = useLang()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [sessionId, setSessionId] = React.useState<string>('')
  const initialized = React.useRef(false)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const bottomRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // Initialize sessionId + welcome message once (client only).
  React.useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const id = getOrCreateSessionId()
    setSessionId(id)
    // Show welcome only on first mount of the component instance.
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t('chat.welcome'),
      },
    ])
  }, [])

  // Auto-scroll to bottom whenever messages or loading change.
  React.useEffect(() => {
    if (!open) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, open])

  // Focus input when panel opens.
  React.useEffect(() => {
    if (open) {
      const tm = setTimeout(() => inputRef.current?.focus(), 220)
      return () => clearTimeout(tm)
    }
  }, [open])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || loading) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
    }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messages: next
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.reply) throw new Error('failed')
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: String(data.reply),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: t('chat.error'),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const showQuickChips = messages.filter((m) => m.id !== 'welcome').length < 2

  return (
    <div className="fixed bottom-24 right-6 z-50 safe-bottom flex flex-col items-end">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="mb-3 flex h-[520px] w-[350px] max-h-[70vh] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            role="dialog"
            aria-modal="false"
            aria-label={t('chat.title')}
          >
            {/* Header */}
            <div className="gradient-brand relative shrink-0 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-sm font-bold">{t('chat.title')}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/85">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-200" />
                    {t('chat.subtitle')}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t('float.chatClose')}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-background/40 p-4"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <BotAvatar />
                  <div className="rounded-2xl rounded-bl-sm bg-primary/15 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Dot />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        {t('chat.thinking')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            {showQuickChips && !loading && (
              <div className="flex flex-wrap gap-1.5 border-t border-border/50 bg-background/40 px-3 pt-2.5">
                {(['chat.quickQ1', 'chat.quickQ2', 'chat.quickQ3'] as const).map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() => send(t(key))}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      {t(key)}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* Disclaimer */}
            <div className="px-4 pt-2 text-[10px] leading-tight text-muted-foreground">
              {t('chat.disclaimer')}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-border/50 bg-background/60 p-3"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                disabled={loading}
                aria-label={t('chat.placeholder')}
                className="h-10 flex-1 bg-background/80"
                maxLength={1000}
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                aria-label={t('chat.send')}
                className="h-10 w-10 shrink-0 rounded-full border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t('float.chatClose') : t('float.chatOpen')}
        className={cn(
          'grid h-14 w-14 place-items-center rounded-full text-white shadow-xl transition-colors',
          open
            ? 'bg-foreground/90 hover:bg-foreground'
            : 'animate-pulse-glow bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400',
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>
    </div>
  )
}

function BotAvatar() {
  return (
    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-brand">
      <Bot className="h-4 w-4 text-white" />
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border/60 bg-muted text-[10px] font-bold text-muted-foreground">
      ME
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-end gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      {isUser ? <UserAvatar /> : <BotAvatar />}
      <div
        className={cn(
          'max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-muted text-foreground'
            : 'rounded-bl-sm bg-primary/15 text-foreground',
        )}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

export default AiChatWidget
