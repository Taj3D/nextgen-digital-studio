'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Mic,
  Send,
  RotateCcw,
  ArrowRight,
  CalendarCheck,
  Clock,
  MessageSquare,
  Phone,
} from 'lucide-react'
import { Reveal, SectionShell } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Msg = { role: 'agent' | 'user'; text: string }

export function AiDemo() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // BN digit helper — converts ASCII digits to Bengali numerals.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  // Initial agent bubbles (re-evaluated on lang change for reset behaviour).
  const initialMessages: Msg[] = [
    { role: 'agent', text: t('demo.chatBubble1') },
    { role: 'agent', text: t('demo.chatBubble2') },
  ]

  const [messages, setMessages] = React.useState<Msg[]>(initialMessages)
  const [input, setInput] = React.useState('')
  const timeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Reset chat when language changes so bubbles stay bilingual.
  React.useEffect(() => {
    setMessages([
      { role: 'agent', text: t('demo.chatBubble1') },
      { role: 'agent', text: t('demo.chatBubble2') },
    ])
  }, [lang, t])

  // Auto-scroll chat to bottom whenever messages change.
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Clean up any pending timeouts on unmount.
  React.useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  // Canned bilingual agent reply.
  const cannedReply = isBn
    ? 'ধন্যবাদ! এটি একটি ডেমো উত্তর। আমাদের আসল এআই এজেন্ট আপনার ব্যবসার ডেটা দিয়ে আরও নির্ভুল উত্তর দেবে — এবং চাইলে কলও বুক করে নিতে পারে।'
    : 'Thanks! This is a demo reply. Our real AI agent would answer using your business data — and book a call if you want.'

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    const id = setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'agent', text: cannedReply }])
    }, 300)
    timeoutsRef.current.push(id)
  }

  const handleReset = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setMessages(initialMessages)
    setInput('')
  }

  // Auto-booking timeline (bilingual, hardcoded as it is illustrative copy).
  const bookingSteps = [
    {
      time: '02:14 AM',
      text: isBn ? 'লিড WhatsApp-এ মেসেজ দেয়' : 'Lead messages on WhatsApp',
    },
    {
      time: '02:14 AM',
      text: isBn ? 'এআই লিড যাচাই ও স্কোর করে' : 'AI qualifies & scores lead',
    },
    {
      time: '02:15 AM',
      text: isBn
        ? 'এআই ক্যালেন্ডার চেক করে স্লট প্রস্তাব করে'
        : 'AI checks calendar & proposes slot',
    },
    {
      time: '02:15 AM',
      text: isBn ? 'মিটিং কনফার্ম ও CRM-এ যোগ হয়' : 'Meeting confirmed & added to CRM',
    },
  ]

  return (
    <SectionShell id="ai-demo" className="relative" aria-label={t('aria.aiDemo')}>
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Bot className="h-4 w-4 shrink-0" />
          <span>{t('demo.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('demo.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('demo.subtitle')}
        </p>
      </Reveal>

      {/* Tabs card */}
      <Reveal delay={0.1}>
        <Card className="mt-12 max-w-4xl mx-auto bg-card/60 backdrop-blur-sm">
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="chat" className="py-2 gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  {t('demo.tab1')}
                </TabsTrigger>
                <TabsTrigger value="voice" className="py-2 gap-1.5">
                  <Phone className="h-4 w-4" />
                  {t('demo.tab2')}
                </TabsTrigger>
                <TabsTrigger value="book" className="py-2 gap-1.5">
                  <CalendarCheck className="h-4 w-4" />
                  {t('demo.tab3')}
                </TabsTrigger>
              </TabsList>

              {/* Tab 1 — AI Chat */}
              <TabsContent value="chat" className="mt-6">
                <div
                  ref={scrollRef}
                  className="flex flex-col gap-3 max-h-80 overflow-y-auto p-1"
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'gradient-brand text-white rounded-2xl rounded-tr-sm'
                            : 'bg-muted text-foreground rounded-2xl rounded-tl-sm'
                        }`}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend()
                    }}
                    placeholder={t('demo.chatPlaceholder')}
                    className="flex-1 focus-visible:ring-emerald-500/40"
                    aria-label={t('demo.chatPlaceholder')}
                  />
                  <Button
                    onClick={handleSend}
                    className="gradient-brand text-white"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                    {t('demo.chatSend')}
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                    {t('demo.chatReset')}
                  </Button>
                </div>
              </TabsContent>

              {/* Tab 2 — AI Voice */}
              <TabsContent value="voice" className="mt-6">
                <div className="flex flex-col items-center text-center gap-6 py-6">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="grid h-24 w-24 place-items-center rounded-full gradient-brand text-white shadow-glow"
                  >
                    <Mic className="h-10 w-10" />
                  </motion.div>

                  {/* Animated sound bars */}
                  <div className="flex items-end gap-1.5 h-10" aria-hidden>
                    {[0, 1, 2].map((b) => (
                      <motion.span
                        key={b}
                        className="w-1.5 rounded-full bg-emerald-500"
                        animate={{ height: ['40%', '100%', '40%'] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: b * 0.15,
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t('demo.voiceTitle')}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md">
                      {t('demo.voiceDesc')}
                    </p>
                    <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
                      {t('demo.voiceCta')}
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3 — Auto Booking */}
              <TabsContent value="book" className="mt-6">
                <div className="py-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {t('demo.bookTitle')}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t('demo.bookDesc')}</p>
                  <ol className="mt-6 relative border-l border-emerald-500/30 pl-6 flex flex-col gap-5">
                    {bookingSteps.map((s, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[1.6rem] top-1 grid h-3 w-3 place-items-center rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <Clock className="h-3.5 w-3.5" />
                          {bn(s.time)}
                        </div>
                        <div className="mt-1 text-sm text-foreground">{s.text}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.15}>
        <div className="mt-10 text-center">
          <Button
            onClick={() => scrollToId('lead-form')}
            className="gradient-brand text-white h-12 px-8"
            size="lg"
          >
            {t('demo.cta')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default AiDemo
