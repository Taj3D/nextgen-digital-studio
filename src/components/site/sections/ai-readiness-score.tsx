'use client'

import * as React from 'react'
import { RefreshCw, ArrowRight, Sparkles, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Question = {
  qEn: string
  qBn: string
  optsEn: [string, string, string, string]
  optsBn: [string, string, string, string]
}

// 10 questions — each option scores 0-3 (0=worst, 3=best)
const QUESTIONS: Question[] = [
  {
    qEn: 'How does your business currently handle incoming leads?',
    qBn: 'আপনার ব্যবসা বর্তমানে আসা লিড কীভাবে সামলায়?',
    optsEn: ['Manually — I check and reply when I can', 'Within a few hours usually', 'Within 30 minutes', 'Instantly with automation'],
    optsBn: ['ম্যানুয়ালি — সময় পেলে চেক ও উত্তর দিই', 'সাধারণত কয়েক ঘণ্টায়', '৩০ মিনিটের মধ্যে', 'অটোমেশন দিয়ে তাৎক্ষণিক'],
  },
  {
    qEn: 'How fast do you respond to WhatsApp messages from customers?',
    qBn: 'কাস্টমারের WhatsApp মেসেজে কত দ্রুত উত্তর দেন?',
    optsEn: ['Sometimes days later', 'Within 24 hours', 'Within 2 hours', 'Within 5 minutes (automated)'],
    optsBn: ['মাঝে মাঝে দিন পর', '২৪ ঘণ্টায়', '২ ঘণ্টায়', '৫ মিনিটে (অটোমেটেড)'],
  },
  {
    qEn: 'Do you use any CRM to track leads and customers?',
    qBn: 'লিড ও কাস্টমার ট্র্যাক করতে কোনো CRM ব্যবহার করেন?',
    optsEn: ['No, everything is in my head/phone', 'Excel or paper', 'Basic CRM (Google Sheets, etc.)', 'Full CRM (HubSpot, GoHighLevel, etc.)'],
    optsBn: ['না, সব মাথায়/ফোনে', 'Excel বা কাগজ', 'বেসিক CRM (Google Sheets ইত্যাদি)', 'ফুল CRM (HubSpot, GoHighLevel ইত্যাদি)'],
  },
  {
    qEn: 'How do you follow up with leads who don\'t respond immediately?',
    qBn: 'যারা তাৎক্ষণিকভাবে উত্তর দেয় না তাদের সাথে কীভাবে ফলো-আপ করেন?',
    optsEn: ['I don\'t follow up', 'Maybe once, manually', '2-3 times manually', 'Automated multi-touch sequence'],
    optsBn: ['ফলো-আপ করি না', 'হয়তো একবার, ম্যানুয়ালি', '২-৩ বার ম্যানুয়ালি', 'অটোমেটেড মাল্টি-টাচ সিকোয়েন্স'],
  },
  {
    qEn: 'Can customers book appointments with you online 24/7?',
    qBn: 'কাস্টমার কি অনলাইনে ২৪/৭ আপনার সাথে অ্যাপয়েন্টমেন্ট বুক করতে পারে?',
    optsEn: ['No, only by calling during business hours', 'Sometimes via a link', 'Yes, with a calendar tool', 'Yes, fully automated with reminders'],
    optsBn: ['না, শুধু ব্যবসায়িক সময়ে কল করে', 'মাঝে মাঝে লিংক দিয়ে', 'হ্যাঁ, ক্যালেন্ডার টুল দিয়ে', 'হ্যাঁ, রিমাইন্ডার সহ সম্পূর্ণ অটোমেটেড'],
  },
  {
    qEn: 'Do you use AI chatbots on your website or social media?',
    qBn: 'ওয়েবসাইট বা সোশ্যাল মিডিয়ায় AI চ্যাটবট ব্যবহার করেন?',
    optsEn: ['No, never tried', 'Tried a basic one, didn\'t work well', 'Use a simple FAQ bot', 'Use a trained AI agent that qualifies leads'],
    optsBn: ['না, কখনো চেষ্টা করিনি', 'বেসিক একটা চেষ্টা করেছি, ভালো কাজ করেনি', 'সহজ FAQ বট ব্যবহার করি', 'ট্রেইনড AI এজেন্ট ব্যবহার করি যে লিড যাচাই করে'],
  },
  {
    qEn: 'How do you measure your marketing ROI?',
    qBn: 'মার্কেটিং ROI কীভাবে পরিমাপ করেন?',
    optsEn: ['I don\'t — I just spend and hope', 'Rough estimate based on sales', 'Track some metrics manually', 'Live dashboard with real-time data'],
    optsBn: ['করি না — শুধু খরচ করি ও আশা করি', 'সেলস ভিত্তিক মোটামুটি অনুমান', 'কিছু মেট্রিক ম্যানুয়ালি ট্র্যাক করি', 'রিয়েল-টাইম ডেটাসহ লাইভ ড্যাশবোর্ড'],
  },
  {
    qEn: 'How many leads do you lose to slow response or no follow-up?',
    qBn: 'ধীর রেসপন্স বা ফলো-আপ না হওয়ায় কত লিড হারান?',
    optsEn: ['More than 50%', '30-50%', '10-30%', 'Less than 10% (automated)'],
    optsBn: ['৫০% এর বেশি', '৩০-৫০%', '১০-৩০%', '১০% এর কম (অটোমেটেড)'],
  },
  {
    qEn: 'Do you use any automation tools in your business?',
    qBn: 'আপনার ব্যবসায় কোনো অটোমেশন টুল ব্যবহার করেন?',
    optsEn: ['None — everything is manual', 'Basic email autoresponders', 'Some Zapier/n8n workflows', 'Full automation stack (CRM + AI + flows)'],
    optsBn: ['কিছু না — সব ম্যানুয়াল', 'বেসিক ইমেইল অটোরেসপন্ডার', 'কিছু Zapier/n8n ওয়ার্কফ্লো', 'ফুল অটোমেশন স্ট্যাক (CRM + AI + ফ্লো)'],
  },
  {
    qEn: 'What\'s your biggest growth challenge right now?',
    qBn: 'এখন আপনার সবচেয়ে বড় গ্রোথ চ্যালেঞ্জ কী?',
    optsEn: ['Not enough leads', 'Leads don\'t convert', 'Too much manual work', 'Scaling — I need systems'],
    optsBn: ['লিড কম', 'লিড কনভার্ট হয় না', 'অনেক ম্যানুয়াল কাজ', 'স্কেলিং — সিস্টেম দরকার'],
  },
]

type RoadmapStep = {
  titleEn: string
  titleBn: string
  descEn: string
  descBn: string
}

const ROADMAP: RoadmapStep[] = [
  {
    titleEn: 'Deploy AI Sales Agent',
    titleBn: 'AI সেলস এজেন্ট ডিপ্লয় করুন',
    descEn: 'Get an AI agent live on WhatsApp + website in 7 days. Start qualifying leads 24/7.',
    descBn: '৭ দিনে WhatsApp + ওয়েবসাইটে AI এজেন্ট লাইভ করুন। ২৪/৭ লিড যাচাই শুরু করুন।',
  },
  {
    titleEn: 'Automate Follow-ups',
    titleBn: 'ফলো-আপ অটোমেট করুন',
    descEn: 'Multi-touch sequences so no lead is forgotten. Recover 30-50% of lost leads.',
    descBn: 'মাল্টি-টাচ সিকোয়েন্স যাতে কোনো লিড ভুল না হয়। ৩০-৫০% হারানো লিড উদ্ধার করুন।',
  },
  {
    titleEn: 'Connect CRM + Dashboard',
    titleBn: 'CRM + ড্যাশবোর্ড কানেক্ট করুন',
    descEn: 'Every lead tracked, every call booked automatically. Live ROI dashboard.',
    descBn: 'প্রতিটি লিড ট্র্যাকড, প্রতিটি কল স্বয়ংক্রিয়ভাবে বুকড। লাইভ ROI ড্যাশবোর্ড।',
  },
]

export function AiReadinessScore() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const [answers, setAnswers] = React.useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  )

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  const answeredCount = answers.filter((a) => a !== null).length
  const hasAnyAnswer = answeredCount > 0
  const allAnswered = answeredCount === QUESTIONS.length

  // Score: sum of answers (each 0-3, max 30) scaled to 100.
  const rawSum = answers.reduce<number>((acc, a) => acc + (a ?? 0), 0)
  const score = Math.round((rawSum / (QUESTIONS.length * 3)) * 100)

  // Verdict index based on score thresholds.
  const verdictIndex = (() => {
    if (score <= 20) return 0
    if (score <= 40) return 1
    if (score <= 60) return 2
    if (score <= 80) return 3
    return 4
  })()

  const verdictsEn = [
    'You\'re losing significant revenue to manual processes. AI automation could transform your business immediately.',
    'Your business has gaps that AI can fill. Starting with an AI sales agent would recover lost leads fast.',
    'You\'re on the right track. Adding AI automation would 2-3x your lead conversion and save 20+ hours/week.',
    'You\'re already doing well. AI would optimize and scale your efforts — 3-5x growth is realistic.',
    'Excellent! You\'re AI-ready. Full automation would make your business a market leader in 90 days.',
  ]
  const verdictsBn = [
    'ম্যানুয়াল প্রসেসে আপনি উল্লেখযোগ্য রাজস্ব হারাচ্ছেন। AI অটোমেশন তাৎক্ষণিকভাবে আপনার ব্যবসা বদলে দিতে পারে।',
    'আপনার ব্যবসায় গ্যাপ আছে যা AI পূরণ করতে পারে। AI সেলস এজেন্ট দিয়ে শুরু করলে হারানো লিড দ্রুত উদ্ধার হবে।',
    'আপনি সঠিক পথে আছেন। AI অটোমেশন যোগ করলে লিড কনভার্সন ২-৩x হবে ও সপ্তাহে ২০+ ঘণ্টা বাঁচবে।',
    'আপনি ইতিমধ্যে ভালো করছেন। AI আপনার প্রচেষ্টা অপটিমাইজ ও স্কেল করবে — ৩-৫x গ্রোথ বাস্তবসম্মত।',
    'চমৎকার! আপনি AI-রেডি। সম্পূর্ণ অটোমেশন ৯০ দিনে আপনার ব্যবসাকে মার্কেট লিডার বানাবে।',
  ]

  const setAnswer = (qIndex: number, optIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  const reset = () => setAnswers(Array(QUESTIONS.length).fill(null))

  return (
    <SectionShell id="ai-readiness-score" className="relative" aria-label={t('aria.aiReadinessScore')}>
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('ars.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('ars.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('ars.subtitle')}
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT — Questions */}
        <Reveal>
          <Card className="p-6 sm:p-8 gap-5">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-muted-foreground">
                {isBn ? `${bn(answeredCount)}/${bn(QUESTIONS.length)} উত্তর দেওয়া` : `${bn(answeredCount)}/${bn(QUESTIONS.length)} answered`}
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {bn(Math.round((answeredCount / QUESTIONS.length) * 100))}%
              </span>
            </div>
            <Progress
              value={(answeredCount / QUESTIONS.length) * 100}
              className="h-2 mb-4 [&>div]:bg-emerald-500"
            />

            <ol className="flex flex-col gap-5">
              {QUESTIONS.map((q, qIdx) => (
                <li key={qIdx} className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      {bn(qIdx + 1)}
                    </span>
                    <span className="text-sm font-medium text-foreground leading-relaxed">
                      {isBn ? q.qBn : q.qEn}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-8">
                    {(isBn ? q.optsBn : q.optsEn).map((opt, optIdx) => {
                      const selected = answers[qIdx] === optIdx
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setAnswer(qIdx, optIdx)}
                          aria-pressed={selected}
                          className={`rounded-lg border px-3 py-2 text-xs text-left transition-colors ${
                            selected
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              : 'border-border bg-card/60 hover:border-emerald-500/40 text-foreground'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        {/* RIGHT — Score card + roadmap */}
        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-6 rounded-2xl gradient-brand-soft border border-emerald-500/20 p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {t('ars.scoreLabel')}
              </span>
            </div>

            {/* Big score */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold gradient-text leading-none">
                {bn(score)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {t('ars.scoreSuffix')}
              </span>
            </div>

            {/* Progress bar */}
            <Progress
              value={score}
              className="h-3 [&>div]:bg-emerald-500"
              aria-label={t('ars.scoreLabel')}
            />

            {/* Verdict or prompt */}
            {hasAnyAnswer ? (
              <div className="rounded-lg bg-background/70 border border-emerald-500/30 p-3 text-sm font-semibold text-foreground">
                {isBn ? verdictsBn[verdictIndex] : verdictsEn[verdictIndex]}
              </div>
            ) : (
              <div className="rounded-lg bg-background/40 border border-border p-3 text-sm text-muted-foreground">
                {isBn
                  ? 'আপনার স্কোর ও AI রোডম্যাপ দেখতে প্রশ্নগুলোর উত্তর দিন।'
                  : 'Answer the questions to see your score and AI roadmap.'}
              </div>
            )}

            {/* AI Roadmap — shows when all answered */}
            {allAnswered && (
              <div className="rounded-lg border border-emerald-500/20 bg-background/50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-3">
                  {isBn ? 'আপনার AI রোডম্যাপ' : 'Your AI Roadmap'}
                </div>
                <div className="flex flex-col gap-3">
                  {ROADMAP.map((step, i) => (
                    <div key={i} className="flex gap-2.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                        {bn(i + 1)}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {isBn ? step.titleBn : step.titleEn}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {isBn ? step.descBn : step.descEn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            {hasAnyAnswer ? (
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <Button
                  onClick={() => scrollToId('lead-form')}
                  className="gradient-brand text-white flex-1"
                  size="lg"
                >
                  {t('ars.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={reset}
                  variant="ghost"
                  className="border border-border text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                  size="lg"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('ars.retake')}
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default AiReadinessScore
