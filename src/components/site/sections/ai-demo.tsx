'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { Bot, PhoneCall, MessagesSquare, Play, Check, ArrowRight, Volume2 } from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Tab = "chat" | "voice" | "whatsapp"

const tabs: { id: Tab; label: string; icon: typeof Bot }[] = [
  { id: "chat", label: "AI Chat Agent", icon: Bot },
  { id: "voice", label: "AI Voice Agent", icon: PhoneCall },
  { id: "whatsapp", label: "WhatsApp Bot", icon: MessagesSquare },
]

export function AiDemo() {
  const [active, setActive] = React.useState<Tab>("chat")
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  return (
    <section id="ai-demo" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + tabs */}
          <div>
            <Reveal>
              <Eyebrow>{t('aiDemo.eyebrow')}</Eyebrow>
              <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {t('aiDemo.title1')}{" "}
                <span className="text-gradient">{t('aiDemo.title2')}</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                {t('aiDemo.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                      active === t.id
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                        : "border border-border/60 bg-card text-muted-foreground hover:border-blue-600/40 hover:text-foreground",
                    )}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-7 grid gap-3">
                {features[active].map((f, i) => (
                  <Reveal key={f} delay={i * 0.05}>
                    <div className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{tr(f)}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Button
                onClick={() => openWith("AI Demo → Strategy Call")}
                className="mt-8 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-semibold shadow-lg shadow-blue-600/25"
              >
                {t('aiDemo.tryOnBusiness')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          {/* Right: animated demo */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/15 to-cyan-500/15 blur-2xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="glass-strong rounded-3xl p-5 shadow-2xl"
                >
                  {active === "chat" && <ChatDemo />}
                  {active === "voice" && <VoiceDemo />}
                  {active === "whatsapp" && <WhatsAppDemo />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const features: Record<Tab, string[]> = {
  chat: [
    "Trained on your business — answers questions like your best salesperson",
    "Bilingual: switches between Bangla and English mid-conversation",
    "Captures leads, books calls and routes to your team automatically",
  ],
  voice: [
    "Human-sounding AI handles inbound & outbound calls in Bangla + English",
    "Books appointments, reschedules and sends confirmations",
    "Logs every call to your CRM with full transcript & summary",
  ],
  whatsapp: [
    "Official WhatsApp Business API — broadcasts, menus & chatbots",
    "Recovers abandoned carts and sends order updates automatically",
    "Click-to-chat ads that convert directly into conversations",
  ],
}

function ChatDemo() {
  const { tr } = useLang()
  const messages = [
    { role: "user", content: "Hi, I'm interested in your Gulshan apartment. Is the 3-bed available?" },
    { role: "bot", content: "আসসালামু আলাইকুম! Yes, the 3-bed on level 6 is available. It has 2,150 sqft with a premium view. Would you like to book a site visit this Saturday at 11am?" },
    { role: "user", content: "Saturday 11am works. What's the price?" },
    { role: "bot", content: "Great, site visit booked for Saturday 11am ✓. The price is ৳1.85 crore (negotiable). I'll send full details and the location pin to your WhatsApp. What's your number?" },
  ]
  return (
    <div>
      <DemoHeader icon={Bot} title="AI Chat Agent" status="Online · Bangla & English" />
      <div className="space-y-3 py-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4 }}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <p className={cn(
              "max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm",
              m.role === "user" ? "rounded-br-md bg-gradient-to-br from-blue-600 to-cyan-500 text-white" : "rounded-bl-md bg-muted text-foreground",
            )}>
              {m.content}
            </p>
          </motion.div>
        ))}
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
            <span className="ml-1 h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
            <span className="ml-1 h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
      <DemoFooter text={tr("Site visit booked · Lead qualified · CRM updated")} />
    </div>
  )
}

function VoiceDemo() {
  const { tr } = useLang()
  const transcript = [
    { speaker: "AI", time: "0:01", text: "Hello, Medicare Hospital, how can I help you today?" },
    { speaker: "Caller", time: "0:04", text: "I want to book an appointment with Dr. Rahman." },
    { speaker: "AI", time: "0:07", text: "Sure. Dr. Rahman is available tomorrow at 10am or 2:30pm. Which works for you?" },
    { speaker: "Caller", time: "0:12", text: "10am is fine." },
    { speaker: "AI", time: "0:14", text: "Booked for tomorrow 10am. I'll send an SMS reminder. Can I have your name?" },
  ]
  return (
    <div>
      <DemoHeader icon={PhoneCall} title="AI Voice Agent" status="On call · 0:18s" pulse />
      <div className="flex items-center justify-center gap-2 py-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
          <Volume2 className="h-7 w-7 animate-pulse" />
        </div>
      </div>
      {/* Waveform */}
      <div className="flex items-center justify-center gap-1 py-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-blue-600/60"
            animate={{ height: [4, 16, 4] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.04 }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {transcript.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: t.speaker === "AI" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5 }}
            className={cn("flex gap-2 text-xs", t.speaker === "AI" ? "justify-start" : "justify-end")}
          >
            <span className={cn(
              "rounded-lg px-2.5 py-1.5 max-w-[85%]",
              t.speaker === "AI" ? "bg-blue-600/10 text-foreground" : "bg-muted text-muted-foreground",
            )}>
              <span className="font-bold text-blue-600">{t.speaker}</span>
              <span className="ml-1.5 text-[10px] text-muted-foreground">{t.time}</span>
              <br />
              {t.text}
            </span>
          </motion.div>
        ))}
      </div>
      <DemoFooter text={tr("Appointment booked · SMS sent · CRM logged")} />
    </div>
  )
}

function WhatsAppDemo() {
  const { tr } = useLang()
  const messages = [
    { role: "bot", content: "🛒 You left items in your cart! Complete your order now and get 10% off with code COMEBACK10. Tap to continue: bit.ly/cart-xyz", time: "10:32 AM" },
    { role: "user", content: "Will the green shirt in M be restocked?", time: "10:35 AM" },
    { role: "bot", content: "Yes! Size M in green is back in stock 🎉 Shall I reserve one for you? You can complete checkout here: bit.ly/cart-xyz", time: "10:35 AM" },
    { role: "user", content: "Yes please reserve it", time: "10:36 AM" },
    { role: "bot", content: "Done! Reserved for 2 hours ✓ Your discounted total is ৳1,290. Pay here: bit.ly/pay-xyz", time: "10:36 AM" },
  ]
  return (
    <div className="rounded-2xl bg-[#e5ddd5] dark:bg-[#0b141a]">
      <DemoHeader icon={MessagesSquare} title="ShopSmart BD" status="WhatsApp Business · typically replies instantly" whatsapp />
      <div className="space-y-2 rounded-b-2xl bg-white p-4 dark:bg-[#0b141a]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4 }}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div className={cn(
              "max-w-[82%] rounded-lg px-3 py-2 text-[13px] leading-relaxed shadow-sm",
              m.role === "user" ? "rounded-tr-none bg-[#dcf8c6] text-foreground dark:bg-[#005c4b] dark:text-white" : "rounded-tl-none bg-white text-foreground dark:bg-[#202c33] dark:text-white",
            )}>
              {m.content}
              <span className="ml-2 text-[9px] text-muted-foreground">{m.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <DemoFooter text={tr("Cart recovered · Order paid · Customer delighted")} />
    </div>
  )
}

function DemoHeader({ icon: Icon, title, status, pulse, whatsapp }: { icon: typeof Bot; title: string; status: string; pulse?: boolean; whatsapp?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between border-b border-border/40 pb-3", whatsapp && "rounded-t-2xl bg-[#075e54] px-4 py-3 text-white dark:bg-[#202c33]")}>
      <div className="flex items-center gap-3">
        <div className={cn("relative flex h-10 w-10 items-center justify-center rounded-full", whatsapp ? "bg-white/20" : "bg-gradient-to-br from-blue-600 to-cyan-500")}>
          <Icon className={cn("h-5 w-5", whatsapp ? "text-white" : "text-white")} />
          {pulse && <span className="absolute inset-0 animate-ping rounded-full bg-blue-600/40" />}
        </div>
        <div>
          <p className={cn("text-sm font-bold leading-tight", whatsapp ? "text-white" : "text-foreground")}>{title}</p>
          <p className={cn("text-[11px]", whatsapp ? "text-white/80" : "text-emerald-500")}>● {status}</p>
        </div>
      </div>
      <Play className={cn("h-4 w-4", whatsapp ? "text-white/60" : "text-muted-foreground/40")} />
    </div>
  )
}

function DemoFooter({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-xl bg-emerald-500/10 px-3.5 py-2.5">
      <p className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" /> {text}
      </p>
    </div>
  )
}
