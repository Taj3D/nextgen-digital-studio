'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Cpu, ArrowRight } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const CATEGORIES: { titleKey: string; dot: string; techs: string[] }[] = [
  {
    titleKey: 'stack.cat1',
    dot: 'bg-teal-500',
    techs: ['OpenAI', 'Claude', 'Gemini', 'Meta Llama', 'Mistral', 'OpenRouter'],
  },
  {
    titleKey: 'stack.cat2',
    dot: 'bg-emerald-500',
    techs: ['n8n', 'Make', 'Zapier', 'WhatsApp API', 'Pipedream'],
  },
  {
    titleKey: 'stack.cat3',
    dot: 'bg-amber-500',
    techs: ['Google Cloud', 'AWS', 'Cloudflare', 'Supabase', 'Vercel'],
  },
  {
    titleKey: 'stack.cat4',
    dot: 'bg-rose-500',
    techs: ['Pinecone', 'LangChain', 'LlamaIndex', 'MCP', 'Hugging Face'],
  },
]

export function TechStack() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // Hardcoded bilingual footnote (brand-tagline style line, not a key).
  const note = isBn
    ? 'আমরা প্রতিটি কাজের জন্য সঠিক মডেল ও টুল বেছে নিই — উল্টো নয়।'
    : 'We pick the right model & tool for each job — not the other way around.'

  return (
    <SectionShell id="tech-stack" className="relative" aria-label={t('aria.techStack')}>
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Cpu className="h-4 w-4 shrink-0" />
          <span>{t('stack.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('stack.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('stack.subtitle')}
        </p>
      </Reveal>

      {/* 4 category blocks */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid md:grid-cols-2 gap-8"
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div key={i} variants={staggerItem}>
            <div className="h-full rounded-2xl border border-border bg-card/40 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {t(cat.titleKey)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {cat.techs.map((tech, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
                  >
                    <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footnote */}
      <Reveal delay={0.1}>
        <p className="text-center text-xs text-muted-foreground mt-8">{note}</p>
      </Reveal>

      {/* CTA — exit point to lead form */}
      <Reveal delay={0.15}>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => scrollToId('lead-form')}
            className="gradient-brand text-white"
            size="lg"
          >
            {isBn ? 'আপনার AI সিস্টেম শুরু করুন' : 'Build Your AI Stack'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default TechStack
