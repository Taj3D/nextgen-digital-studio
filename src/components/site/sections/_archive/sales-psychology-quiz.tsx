'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import {
  Brain, Target, Zap, TrendingUp, ArrowRight, Check, X,
  Store, Megaphone, Users, Repeat, Sparkles, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sales Psychology Quiz — based on the 4-step sales formula
// (Awareness → Interest → Desire → Action) + auto-pilot selling insights.
// Sources: Coach Animesh Kumar, Maynul Hasan (auto-pilot selling),
// Iftekhar Ahmed Siddiki (4-step sales formula).

type Stage = "awareness" | "interest" | "desire" | "action" | "result"

type Answer = {
  id: string
  text: string
  textBn: string
  insight: string
  insightBn: string
  recommendation: string
  recommendationBn: string
}

type Question = {
  id: string
  stage: Stage
  icon: typeof Store
  question: string
  questionBn: string
  answers: Answer[]
}

const questions: Question[] = [
  {
    id: "business-type",
    stage: "awareness",
    icon: Store,
    question: "What best describes your business?",
    questionBn: "আপনার ব্যবসার ধরন কোনটি?",
    answers: [
      {
        id: "ecommerce",
        text: "E-commerce / Online Store",
        textBn: "ই-কমার্স / অনলাইন স্টোর",
        insight: "E-commerce businesses lose 68% of sales to abandoned carts and slow follow-up. The #1 fix is WhatsApp cart-recovery automation.",
        insightBn: "ই-কমার্স ব্যবসা ৬৮% বিক্রি হারায় পরিত্যক্ত কার্ট ও ধীর ফলো-আপে। #1 সমাধান হোয়াটসঅ্যাপ কার্ট-রিকভারি অটোমেশন।",
        recommendation: "WhatsApp Business API + cart recovery automation",
        recommendationBn: "WhatsApp Business API + কার্ট রিকভারি অটোমেশন",
      },
      {
        id: "service",
        text: "Service Business / Agency",
        textBn: "সার্ভিস বিজনেস / এজেন্সি",
        insight: "Service businesses lose clients because they can't respond to enquiries fast enough. AI chat agent that responds in 5 seconds captures 21x more leads.",
        insightBn: "সার্ভিস বিজনেস ক্লায়েন্ট হারায় কারণ তারা দ্রুত সাড়া দিতে পারে না। ৫ সেকেন্ডে সাড়া দেওয়া এআই চ্যাট এজেন্ট ২১x বেশি লিড ধরে।",
        recommendation: "AI Chat Agent + CRM automation",
        recommendationBn: "এআই চ্যাট এজেন্ট + CRM অটোমেশন",
      },
      {
        id: "local",
        text: "Local Business / Shop",
        textBn: "লোকাল বিজনেস / দোকান",
        insight: "Local businesses miss 40+ calls daily when closed or busy. An AI voice agent answers every call 24/7 and books appointments automatically.",
        insightBn: "লোকাল ব্যবসা বন্ধ বা ব্যস্ত থাকলে প্রতিদিন ৪০+ কল মিস করে। একটি এআই ভয়েস এজেন্ট ২৪/৭ প্রতিটি কল ধরে এবং অ্যাপয়েন্টমেন্ট বুক করে।",
        recommendation: "AI Voice Agent + appointment automation",
        recommendationBn: "এআই ভয়েস এজেন্ট + অ্যাপয়েন্টমেন্ট অটোমেশন",
      },
      {
        id: "education",
        text: "Education / Course Creator",
        textBn: "শিক্ষা / কোর্স ক্রিয়েটর",
        insight: "Education businesses get 300+ admission enquiries during peak season. AI handles every enquiry in 5 seconds and nurtures parents to enrolment.",
        insightBn: "শিক্ষা প্রতিষ্ঠান পিক সিজনে ৩০০+ ভর্তি অনুসন্ধান পায়। এআই প্রতিটি অনুসন্ধানে ৫ সেকেন্ডে সাড়া দেয় এবং অভিভাবকদের ভর্তি পর্যন্ত নার্সার করে।",
        recommendation: "AI Chat Agent + nurture sequence",
        recommendationBn: "এআই চ্যাট এজেন্ট + নার্সার সিকোয়েন্স",
      },
    ],
  },
  {
    id: "biggest-challenge",
    stage: "interest",
    icon: Target,
    question: "What's your biggest sales challenge right now?",
    questionBn: "এখন আপনার সবচেয়ে বড় সেলস চ্যালেঞ্জ কী?",
    answers: [
      {
        id: "slow-response",
        text: "Slow response to leads",
        textBn: "লিডে ধীর সাড়া",
        insight: "78% of customers buy from whoever responds first. If you take hours to reply, you're losing to competitors who reply in seconds with AI.",
        insightBn: "৭৮% ক্রেতা যিনি প্রথমে সাড়া দেন তার কাছ থেকে কেনে। আপনি যদি ঘন্টায় উত্তর দেন, আপনি এআই দিয়ে সেকেন্ডে সাড়া দেওয়া প্রতিযোগীদের কাছে হারছেন।",
        recommendation: "24/7 AI Chat Agent (5-second response)",
        recommendationBn: "২৪/৭ এআই চ্যাট এজেন্ট (৫-সেকেন্ড রেসপন্স)",
      },
      {
        id: "manual-followup",
        text: "Manual follow-up is exhausting",
        textBn: "ম্যানুয়াল ফলো-আপ ক্লান্তিকর",
        insight: "44% of leads are never followed up because your team forgets. CRM automation never forgets — it nurtures every lead until they book a call.",
        insightBn: "৪৪% লিডের ফলো-আপ হয় না কারণ আপনার টিম ভুলে যায়। CRM অটোমেশন কখনো ভোলে না — প্রতিটি লিডকে কল বুক না হওয়া পর্যন্ত নার্সার করে।",
        recommendation: "CRM automation + nurture sequences",
        recommendationBn: "CRM অটোমেশন + নার্সার সিকোয়েন্স",
      },
      {
        id: "low-conversion",
        text: "Low conversion rate",
        textBn: "কম কনভার্সন রেট",
        insight: "If leads aren't converting, your funnel has gaps. AI qualifies leads, scores them, and only hands hot prospects to your team — boosting conversion 2-3x.",
        insightBn: "লিড কনভার্ট না হলে আপনার ফানেলে ফাঁক আছে। এআই লিড যাচাই করে, স্কোর করে, এবং শুধু হট প্রসপেক্ট আপনার টিমে দেয় — কনভার্সন ২-৩x বাড়ায়।",
        recommendation: "AI lead scoring + sales funnel",
        recommendationBn: "এআই লিড স্কোরিং + সেলস ফানেল",
      },
      {
        id: "no-automation",
        text: "No automation, everything manual",
        textBn: "কোনো অটোমেশন নেই, সব ম্যানুয়াল",
        insight: "Manual work means you're the bottleneck. Businesses that automate grow 3x faster because the system works 24/7 without hiring.",
        insightBn: "ম্যানুয়াল কাজ মানে আপনিই বাধা। যেসব ব্যবসা অটোমেট করে তারা ৩x দ্রুত বাড়ে কারণ সিস্টেমটি ২৪/৭ নিয়োগ ছাড়াই কাজ করে।",
        recommendation: "Full AI + automation stack",
        recommendationBn: "সম্পূর্ণ এআই + অটোমেশন স্ট্যাক",
      },
    ],
  },
  {
    id: "monthly-revenue",
    stage: "desire",
    icon: TrendingUp,
    question: "What's your approximate monthly revenue?",
    questionBn: "আপনার আনুমানিক মাসিক রাজস্ব কত?",
    answers: [
      {
        id: "under-1lakh",
        text: "Under ৳1 lakh/month",
        textBn: "৳১ লক্ষের কম/মাস",
        insight: "At this stage, the #1 priority is lead generation + instant response. An AI chat agent alone can 3x your leads within 60 days.",
        insightBn: "এই ধাপে, #১ অগ্রাধিকার লিড জেনারেশন + তাৎক্ষণিক সাড়া। শুধু একটি এআই চ্যাট এজেন্ট ৬০ দিনে আপনার লিড ৩x করতে পারে।",
        recommendation: "Starter plan (AI Chat Agent + lead gen)",
        recommendationBn: "স্টার্টার প্ল্যান (এআই চ্যাট এজেন্ট + লিড জেন)",
      },
      {
        id: "1-5lakh",
        text: "৳1-5 lakh/month",
        textBn: "৳১-৫ লক্ষ/মাস",
        insight: "You have traction but manual work is limiting growth. CRM automation + WhatsApp follow-up can add ৳2-5 lakh/month without more headcount.",
        insightBn: "আপনার ট্র্যাকশন আছে কিন্তু ম্যানুয়াল কাজ বৃদ্ধি সীমিত করছে। CRM অটোমেশন + হোয়াটসঅ্যাপ ফলো-আপ নিয়োগ ছাড়াই মাসে ৳২-৫ লক্ষ যোগ করতে পারে।",
        recommendation: "Growth plan (CRM + WhatsApp + funnel)",
        recommendationBn: "গ্রোথ প্ল্যান (CRM + হোয়াটসঅ্যাপ + ফানেল)",
      },
      {
        id: "5-20lakh",
        text: "৳5-20 lakh/month",
        textBn: "৳৫-২০ লক্ষ/মাস",
        insight: "At this scale, you need AI voice agents + performance marketing automation to 2x without doubling costs. ROI is typically 7-10x.",
        insightBn: "এই স্কেলে, আপনার এআই ভয়েস এজেন্ট + পারফরম্যান্স মার্কেটিং অটোমেশন দরকার খরচ দ্বিগুণ না করে ২x করতে। ROI সাধারণত ৭-১০x।",
        recommendation: "Enterprise plan (voice + ads + analytics)",
        recommendationBn: "এন্টারপ্রাইজ প্ল্যান (ভয়েস + বিজ্ঞাপন + অ্যানালিটিক্স)",
      },
      {
        id: "over-20lakh",
        text: "Over ৳20 lakh/month",
        textBn: "৳২০ লক্ষের বেশি/মাস",
        insight: "At enterprise scale, the bottleneck is operations. Full automation stack (chat + voice + CRM + WhatsApp + analytics) typically adds 30% to bottom line.",
        insightBn: "এন্টারপ্রাইজ স্কেলে, বাধা হলো অপারেশনস। সম্পূর্ণ অটোমেশন স্ট্যাক (চ্যাট + ভয়েস + CRM + হোয়াটসঅ্যাপ + অ্যানালিটিক্স) সাধারণত নিট লাভে ৩০% যোগ করে।",
        recommendation: "Custom enterprise automation",
        recommendationBn: "কাস্টম এন্টারপ্রাইজ অটোমেশন",
      },
    ],
  },
  {
    id: "timeline",
    stage: "action",
    icon: Zap,
    question: "When do you want to start automating?",
    questionBn: "আপনি কবে অটোমেশন শুরু করতে চান?",
    answers: [
      {
        id: "asap",
        text: "Immediately — I'm losing revenue every day",
        textBn: "এখনই — আমি প্রতিদিন রাজস্ব হারাচ্ছি",
        insight: "Every day you wait, competitors using AI are stealing your customers. Book a free strategy call today — we'll have your AI system live in 2 weeks.",
        insightBn: "প্রতিদিন আপনি অপেক্ষা করছেন, এআই ব্যবহার করা প্রতিযোগীরা আপনার কাস্টমার নিয়ে যাচ্ছে। আজই ফ্রি স্ট্র্যাটেজি কল বুক করুন — আমরা ২ সপ্তাহে আপনার এআই সিস্টেম লাইভ করব।",
        recommendation: "Book your free strategy call now",
        recommendationBn: "এখনই আপনার ফ্রি স্ট্র্যাটেজি কল বুক করুন",
      },
      {
        id: "this-month",
        text: "Within this month",
        textBn: "এই মাসের মধ্যে",
        insight: "Good — planning ahead is smart. Book a call this week so we can design your roadmap and start building before month-end.",
        insightBn: "ভালো — আগে থেকে পরিকল্পনা বুদ্ধিমানের কাজ। এই সপ্তাহে একটি কল বুক করুন যাতে আমরা আপনার রোডম্যাপ ডিজাইন করি এবং মাস শেষের আগে বিল্ড শুরু করি।",
        recommendation: "Book a strategy call this week",
        recommendationBn: "এই সপ্তাহে একটি স্ট্র্যাটেজি কল বুক করুন",
      },
      {
        id: "researching",
        text: "Just researching for now",
        textBn: "এখন শুধু গবেষণা করছি",
        insight: "Research is wise. But every day you research, your competitors using AI are winning deals. Start with a free AI audit — no obligation, just clarity.",
        insightBn: "গবেষণা জ্ঞানীর কাজ। কিন্তু আপনি যতদিন গবেষণা করছেন, এআই ব্যবহার করা প্রতিযোগীরা ততদিন ডিল জিতছে। একটি ফ্রি এআই অডিট দিয়ে শুরু করুন — কোনো বাধ্যবাধকতা নেই, শুধু স্পষ্টতা।",
        recommendation: "Get your free AI audit first",
        recommendationBn: "প্রথমে আপনার ফ্রি এআই অডিট নিন",
      },
    ],
  },
]

export function SalesPsychologyQuiz() {
  const { lang } = useLang()
  const { openWith } = useBooking()
  const [stage, setStage] = React.useState<number>(0)
  const [answers, setAnswers] = React.useState<string[]>([])
  const [showResult, setShowResult] = React.useState(false)

  const currentQuestion = questions[stage]
  const isResult = stage >= questions.length

  function answer(qId: string) {
    const newAnswers = [...answers]
    newAnswers[stage] = qId
    setAnswers(newAnswers)
    setTimeout(() => {
      if (stage < questions.length - 1) {
        setStage(stage + 1)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  function restart() {
    setStage(0)
    setAnswers([])
    setShowResult(false)
  }

  const insights = answers.map((aId, i) => {
    const q = questions[i]
    return q.answers.find((a) => a.id === aId)
  }).filter(Boolean)

  const isBn = lang === 'bn'

  return (
    <section id="sales-psychology" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto bg-violet-500/10 text-violet-600">
            {isBn ? 'সেলস সাইকোলজি কুইজ' : 'Sales Psychology Quiz'}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {isBn ? (
              <>আপনার ব্যবসার জন্য সঠিক <span className="text-gradient">সেলস সমাধান</span> খুঁজুন</>
            ) : (
              <>Find the right <span className="text-gradient">sales solution</span> for your business</>
            )}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {isBn
              ? '৪টি দ্রুত প্রশ্নের উত্তর দিন এবং পান আপনার ব্যবসার জন্য পার্সোনালাইজড AI অটোমেশন রোডম্যাপ — কোনো বাধ্যবাধকতা নেই।'
              : "Answer 4 quick questions and get a personalized AI automation roadmap for your business — no obligation."}
          </p>
        </Reveal>

        <div className="mt-12">
          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-border/60 bg-card p-6 shadow-xl sm:p-8"
              >
                {/* Progress */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          i === stage ? "w-8 bg-violet-500" : i < stage ? "w-2 bg-violet-500" : "w-2 bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {stage + 1} / {questions.length}
                  </span>
                </div>

                {/* Question */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                    <currentQuestion.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold sm:text-2xl">
                    {isBn ? currentQuestion.questionBn : currentQuestion.question}
                  </h3>
                </div>

                {/* Answers */}
                <div className="grid gap-3">
                  {currentQuestion.answers.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => answer(a.id)}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl border p-4 text-left transition-all hover:border-violet-500/40 hover:bg-violet-500/5",
                        answers[stage] === a.id ? "border-violet-500 bg-violet-500/5" : "border-border/60 bg-background"
                      )}
                    >
                      <span className="text-sm font-medium sm:text-base">
                        {isBn ? a.textBn : a.text}
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-violet-600" />
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {stage > 0 && (
                  <button
                    onClick={() => setStage(stage - 1)}
                    className="mt-4 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    ← {isBn ? 'আগের প্রশ্ন' : 'Previous question'}
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-blue-600/5 p-6 shadow-xl sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-lg">
                  <Brain className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold">
                    {isBn ? 'আপনার পার্সোনালাইজড রোডম্যাপ' : 'Your personalized roadmap'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isBn ? '৪-ধাপ সেলস সাইকোলজি বিশ্লেষণ সম্পূর্ণ' : '4-step sales psychology analysis complete'}
                  </p>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className="rounded-2xl border border-border/60 bg-card p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-600">
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {isBn ? questions[i].questionBn.slice(0, 30) : questions[i].question.slice(0, 30)}...
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {isBn ? insight!.insightBn : insight!.insight}
                    </p>
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2">
                      <Sparkles className="h-4 w-4 shrink-0 text-violet-600" />
                      <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">
                        {isBn ? insight!.recommendationBn : insight!.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 p-6 text-center text-white">
                <p className="font-heading text-lg font-bold sm:text-xl">
                  {isBn
                    ? 'আপনার রোডম্যাপ প্রস্তুত — এখন কী করবেন?'
                    : 'Your roadmap is ready — what next?'}
                </p>
                <p className="mt-1 text-sm text-violet-50/90">
                  {isBn
                    ? 'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কলে আমরা এই রোডম্যাপ বাস্তবায়নের পরিকল্পনা তৈরি করব।'
                    : 'Book a free 30-min strategy call to implement this roadmap.'}
                </p>
                <button
                  onClick={() => openWith("Sales Psychology Quiz → Strategy Call")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-600 shadow-lg transition-transform hover:scale-[1.03]"
                >
                  {isBn ? 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' : 'Book your free strategy call'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={restart}
                className="mt-4 w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                ↻ {isBn ? 'আবার কুইজ নিন' : 'Retake quiz'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
