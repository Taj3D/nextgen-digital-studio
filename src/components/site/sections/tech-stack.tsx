'use client'

import { Reveal, Eyebrow } from "../reveal"
import { motion } from "framer-motion"
import { useLang } from "../language-provider"

const tools = [
  { name: "OpenAI GPT-4", category: "AI Models", emoji: "🤖" },
  { name: "WhatsApp Business API", category: "Messaging", emoji: "💬" },
  { name: "GoHighLevel", category: "CRM", emoji: "📈" },
  { name: "HubSpot", category: "CRM", emoji: "🎯" },
  { name: "n8n", category: "Automation", emoji: "🔗" },
  { name: "Zapier", category: "Automation", emoji: "⚡" },
  { name: "Next.js", category: "Web", emoji: "▲" },
  { name: "Meta Ads", category: "Marketing", emoji: "📊" },
  { name: "Google Ads", category: "Marketing", emoji: "🔍" },
  { name: "Twilio", category: "Voice/SMS", emoji: "📞" },
  { name: "Supabase", category: "Database", emoji: "🗄️" },
  { name: "Vercel", category: "Hosting", emoji: "✦" },
]

export function TechStack() {
  const row = [...tools, ...tools]
  const { t, tr } = useLang()
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('techStack.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {t('techStack.title1')}{" "}
            <span className="text-gradient">{t('techStack.title2')}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('techStack.subtitle')}
          </p>
        </Reveal>
      </div>

      <div className="mask-fade-x relative mt-10 overflow-hidden">
        <motion.div
          className="flex w-max gap-3 pr-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {row.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-3.5 transition-colors hover:border-blue-600/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-lg">
                {t.emoji}
              </span>
              <div>
                <p className="font-heading text-sm font-bold leading-tight">{tr(t.name)}</p>
                <p className="text-[11px] text-muted-foreground">{tr(t.category)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
