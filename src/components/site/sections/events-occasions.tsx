'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { useBooking } from "../booking-modal"
import {
  Moon, Heart, Sparkles, Gift, Users2, Building, Music, Trophy,
  TrendingUp, ArrowRight, Check, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Global events & occasions where AI automation doubles profits.
// Includes religious festivals (Eid, Durga Puja, Christmas, Ramadan) +
// weddings, corporate, concerts, sports.
type EventCard = {
  icon: typeof Moon
  emoji: string
  title: string
  titleBn: string
  occasion: string
  occasionBn: string
  withoutAI: string
  withoutAIBn: string
  withAI: string
  withAIBn: string
  profitLift: string
  gradient: string
}

const events: EventCard[] = [
  {
    icon: Moon,
    emoji: "🌙",
    title: "Eid Sales Automation",
    titleBn: "ঈদ সেল অটোমেশন",
    occasion: "Eid-ul-Fitr & Eid-ul-Adha",
    occasionBn: "ঈদ-উল-ফিতর ও ঈদ-উল-আজহা",
    withoutAI: "68% carts abandoned. Customers ask about sizes, delivery, offers on WhatsApp — no one replies for hours. They buy from competitors running flash sales.",
    withoutAIBn: "৬৮% কার্ট পরিত্যক্ত। ক্রেতারা সাইজ, ডেলিভারি, অফার নিয়ে হোয়াটসঅ্যাপে জিজ্ঞেস করে — কেউ ঘণ্টায় উত্তর দেয় না। তারা ফ্ল্যাশ সেল চালানো প্রতিযোগীদের কাছ থেকে কেনে।",
    withAI: "AI replies in 5 seconds, recommends products, sends cart-recovery WhatsApp with one-tap checkout. Flash-sale broadcasts go to 50,000+ customers instantly. Result: 3x revenue.",
    withAIBn: "এআই ৫ সেকেন্ডে উত্তর দেয়, প্রোডাক্ট সাজেস্ট করে, কার্ট-রিকভারি হোয়াটসঅ্যাপ পাঠায় এক-ট্যাপ চেকআউট সহ। ফ্ল্যাশ-সেল ব্রডকাস্ট ৫০,০০০+ ক্রেতাকে তাৎক্ষণিক যায়। ফলাফল: ৩x রাজস্ব।",
    profitLift: "3x revenue",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Heart,
    emoji: "💍",
    title: "Wedding Season",
    titleBn: "বিয়ের সিজন",
    occasion: "Nov–Feb peak season",
    occasionBn: "নভেম্বর–ফেব্রুয়ারি পিক সিজন",
    withoutAI: "200+ enquiries flood in for venues, catering, photography. You reply in 2 days. Families book the planner who answered first — not the best one.",
    withoutAIBn: "ভেন্যু, ক্যাটারিং, ফটোগ্রাফি নিয়ে ২০০+ অনুসন্ধান আসে। আপনি ২ দিনে উত্তর দেন। পরিবারগুলো সেরা প্ল্যানারকে নয়, যিনি প্রথমে উত্তর দিয়েছেন তাকে বুক করেন।",
    withAI: "AI answers every enquiry in 5 seconds — shows packages, checks date availability, books consultations. WhatsApp nurture sequence sends testimonials + portfolio. Result: 2x bookings.",
    withAIBn: "এআই প্রতিটি অনুসন্ধানে ৫ সেকেন্ডে উত্তর দেয় — প্যাকেজ দেখায়, তারিখ চেক করে, কনসালটেশন বুক করে। হোয়াটসঅ্যাপ নার্সার টেস্টিমোনিয়াল + পোর্টফোলিও পাঠায়। ফলাফল: ২x বুকিং।",
    profitLift: "2x bookings",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Sparkles,
    emoji: "🪔",
    title: "Durga Puja & Religious Festivals",
    titleBn: "দুর্গা পূজা ও ধর্মীয় উৎসব",
    occasion: "Puja, Christmas, Buddha Purnima",
    occasionBn: "পূজা, বড়দিন, বুদ্ধ পূর্ণিমা",
    withoutAI: "Donation drives and event registrations overwhelm volunteers. People can't get answers about pandal locations, timings, programs. Donations + goodwill both lost.",
    withoutAIBn: "ডোনেশন ড্রাইভ ও ইভেন্ট রেজিস্ট্রেশনে স্বেচ্ছাসেবকরা অভিভূত। মানুষ পণ্ডল লোকেশন, সময়, প্রোগ্রাম জানতে পারে না। ডোনেশন + সম্মান দুটোই হারায়।",
    withAI: "AI chat handles 1000s of queries about venues, timings, parking. Auto-registrations + QR check-in. Donation broadcasts with UPI/bKash links. Result: 2.5x donations + smoother events.",
    withAIBn: "এআই চ্যাট ভেন্যু, সময়, পার্কিং নিয়ে ১০০০+ প্রশ্ন সামলায়। অটো-রেজিস্ট্রেশন + QR চেক-ইন। ডোনেশন ব্রডকাস্ট bKash লিংক সহ। ফলাফল: ২.৫x ডোনেশন + স্বচ্ছ ইভেন্ট।",
    profitLift: "2.5x donations",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Gift,
    emoji: "🎁",
    title: "Christmas & Year-End Sales",
    titleBn: "বড়দিন ও বছরের শেষ সেল",
    occasion: "Dec global gifting season",
    occasionBn: "ডিসেম্বর বিশ্বব্যাপী উপহার সিজন",
    withoutAI: "Global customers across time zones. You sleep, they shop elsewhere. Gift recommendations, shipping questions, returns — all unanswered overnight.",
    withoutAIBn: "বিভিন্ন টাইম জোনের বিশ্বব্যাপী ক্রেতা। আপনি ঘুমান, তারা অন্য জায়গায় কেনে। উপহার সাজেশন, শিপিং প্রশ্ন, রিটার্ন — সারা রাত উত্তরহীন।",
    withAI: "24/7 AI agent in 20+ languages. Personalised gift recommendations from a 3-question quiz. Abandoned-cart recovery across time zones. Result: 2.2x global revenue.",
    withAIBn: "২৪/৭ এআই এজেন্ট ২০+ ভাষায়। ৩-প্রশ্ন কুইজ থেকে পার্সোনালাইজড উপহার সাজেশন। টাইম জোন জুড়ে কার্ট-রিকভারি। ফলাফল: ২.২x বিশ্বব্যাপী রাজস্ব।",
    profitLift: "2.2x revenue",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: Users2,
    emoji: "🕌",
    title: "Ramadan Iftar & Community",
    titleBn: "রমজান ইফতার ও কমিউনিটি",
    occasion: "Ramadan + Eid prep",
    occasionBn: "রমজান + ঈদ প্রস্তুতি",
    withoutAI: "Iftar gatherings, mosque events, community programs — coordination chaos. Volunteers field 500+ calls daily about iftar timings, venues, volunteering.",
    withoutAIBn: "ইফতার মাহফিল, মসজিদ ইভেন্ট, কমিউনিটি প্রোগ্রাম — কোঅর্ডিনেশন বিশৃঙ্খলা। স্বেচ্ছাসেবকরা প্রতিদিন ৫০০+ কল সামলায় ইফতার সময়, ভেন্যু নিয়ে।",
    withAI: "AI handles all queries in Bangla/English/Arabic. Auto-RSVP, volunteer scheduling, donation collection. Iftar-reminder broadcasts. Result: 3x community engagement.",
    withAIBn: "এআই বাংলা/ইংরেজি/আরবিতে সব প্রশ্ন সামলায়। অটো-RSVP, স্বেচ্ছাসেবক শিডিউল, ডোনেশন সংগ্রহ। ইফতার-রিমাইন্ডার ব্রডকাস্ট। ফলাফল: ৩x কমিউনিটি এনগেজমেন্ট।",
    profitLift: "3x engagement",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Building,
    emoji: "🏢",
    title: "Corporate Conferences",
    titleBn: "কর্পোরেট কনফারেন্স",
    occasion: "Annual events, summits, AGMs",
    occasionBn: "বার্ষিক ইভেন্ট, সামিট, AGM",
    withoutAI: "Registration, agenda questions, speaker info — 1000s of emails. Your team drowns in admin. Empty seats because prospects couldn't get answers fast enough.",
    withoutAIBn: "রেজিস্ট্রেশন, এজেন্ডা প্রশ্ন, স্পিকার তথ্য — ১০০০+ ইমেইল। আপনার টিম অ্যাডমিনে ডুবে যায়। প্রসপেক্টরা দ্রুত উত্তর না পেয়ে আসে না — খালি আসন।",
    withAI: "AI registration assistant, instant agenda answers, speaker FAQs. Auto-reminders + post-event nurture. Lead capture + scoring for sponsors. Result: 2x attendance + qualified sponsors.",
    withAIBn: "এআই রেজিস্ট্রেশন অ্যাসিস্ট্যান্ট, তাৎক্ষণিক এজেন্ডা উত্তর, স্পিকার FAQ। অটো-রিমাইন্ডার + ইভেন্ট-পরবর্তী নার্সার। স্পন্সরদের জন্য লিড ক্যাপচার + স্কোরিং। ফলাফল: ২x উপস্থিতি + যোগ্য স্পন্সর।",
    profitLift: "2x attendance",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "Concerts & Cultural Events",
    titleBn: "কনসার্ট ও সাংস্কৃতিক ইভেন্ট",
    occasion: "Music, theatre, festivals",
    occasionBn: "সংগীত, থিয়েটার, উৎসব",
    withoutAI: "Ticket sales spike then crash. Customers ask about seating, parking, entry — no instant answers. Refund/transfer chaos on event day.",
    withoutAIBn: "টিকিট সেল স্পাইক করে তারপর ক্র্যাশ। ক্রেতারা সিটিং, পার্কিং, এন্ট্রি নিয়ে জিজ্ঞেস করে — তাৎক্ষণিক উত্তর নেই। ইভেন্ট দিনে রিফান্ড/ট্রান্সফার বিশৃঙ্খলা।",
    withAI: "AI sells tickets 24/7, answers venue/seating questions, handles upgrades. WhatsApp reminders reduce no-shows. Post-concert merch upsell. Result: 2.5x ticket revenue.",
    withAIBn: "এআই ২৪/৭ টিকিট বিক্রি করে, ভেন্যু/সিটিং প্রশ্নের উত্তর দেয়, আপগ্রেড সামলায়। হোয়াটসঅ্যাপ রিমাইন্ডার নো-শো কমায়। কনসার্ট-পরবর্তী মার্চ আপসেল। ফলাফল: ২.৫x টিকিট রাজস্ব।",
    profitLift: "2.5x revenue",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Sports Tournaments",
    titleBn: "স্পোর্টস টুর্নামেন্ট",
    occasion: "Cricket, football, esports",
    occasionBn: "ক্রিকেট, ফুটবল, ইস্পোর্টস",
    withoutAI: "Registration, fixtures, scores — fans flood social media with questions. Merch sales missed. Sponsor ROI invisible.",
    withoutAIBn: "রেজিস্ট্রেশন, ফিক্সচার, স্কোর — ভক্তরা সোশ্যাল মিডিয়ায় প্রশ্নে ভরিয়ে দেয়। মার্চ সেল মিস। স্পন্সর ROI অদৃশ্য।",
    withAI: "AI handles registrations, fixture queries, live score updates via WhatsApp. Merchandise upsell to engaged fans. Sponsor dashboards with real-time ROI. Result: 2x revenue + retention.",
    withAIBn: "এআই রেজিস্ট্রেশন, ফিক্সচার কোয়েরি, হোয়াটসঅ্যাপে লাইভ স্কোর আপডেট সামলায়। এনগেজড ভক্তদের কাছে মার্চেন্ডাইজ আপসেল। রিয়েল-টাইম ROI সহ স্পন্সর ড্যাশবোর্ড। ফলাফল: ২x রাজস্ব + রিটেনশন।",
    profitLift: "2x revenue",
    gradient: "from-orange-500 to-amber-500",
  },
]

export function EventsOccasions() {
  const { lang } = useLang()
  const { openWith } = useBooking()
  const [active, setActive] = React.useState(0)

  return (
    <section id="events-occasions" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">
            {lang === 'bn' ? 'বিশ্বব্যাপী ইভেন্ট ও অনুষ্ঠান' : 'Events & Occasions'}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {lang === 'bn' ? (
              <>যেকোনো ইভেন্টে আপনার মুনাফা <span className="text-gradient">দ্বিগুণ করুন</span></>
            ) : (
              <>Double your profits on <span className="text-gradient">every occasion</span></>
            )}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {lang === 'bn'
              ? 'ঈদ, বিয়ে, পূজা, বড়দিন, রমজান, কর্পোরেট ইভেন্ট — প্রতিটি মৌসুমে এআই অটোমেশন আপনার রাজস্ব দ্বিগুণ করে। দেখুন কিভাবে।'
              : "Eid, weddings, Puja, Christmas, Ramadan, corporate events — AI automation doubles your revenue on every season. See how."}
          </p>
        </Reveal>

        {/* Event selector tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {events.map((e, i) => (
            <button
              key={e.title}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm",
                active === i
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "border-border/60 bg-card text-muted-foreground hover:border-blue-600/40 hover:text-foreground"
              )}
            >
              <span className="text-base">{e.emoji}</span>
              <span className="hidden sm:inline">{lang === 'bn' ? e.titleBn : e.title}</span>
              <span className="sm:hidden">{e.emoji}</span>
            </button>
          ))}
        </div>

        {/* Active event detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <EventDetail event={events[active]} lang={lang} onBook={() => openWith(`Event: ${events[active].title}`)} />
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <Reveal delay={0.2} className="mx-auto mt-14 max-w-2xl text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-blue-600/25">
            <p className="font-heading text-xl font-bold sm:text-2xl">
              {lang === 'bn'
                ? 'আপনার পরবর্তী বড় ইভেন্ট কোনটি?'
                : "What's your next big event?"}
            </p>
            <p className="mt-2 text-sm text-blue-50/90">
              {lang === 'bn'
                ? 'ফ্রি স্ট্র্যাটেজি কলে জানুন কিভাবে এআই আপনার ইভেন্টে দ্বিগুণ মুনাফা আনবে।'
                : "Book a free strategy call to learn how AI doubles your event profits."}
            </p>
            <button
              onClick={() => openWith("Events → strategy call")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-600 shadow-lg transition-transform hover:scale-[1.03]"
            >
              {lang === 'bn' ? 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' : 'Book a free strategy call'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function EventDetail({ event, lang, onBook }: { event: EventCard; lang: 'en' | 'bn'; onBook: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
      {/* Header */}
      <div className={cn("relative bg-gradient-to-br p-8 text-white", event.gradient)}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{event.emoji}</span>
            <div>
              <h3 className="font-heading text-2xl font-extrabold sm:text-3xl">
                {lang === 'bn' ? event.titleBn : event.title}
              </h3>
              <p className="mt-1 text-sm text-white/80">{lang === 'bn' ? event.occasionBn : event.occasion}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/20 px-5 py-3 text-center backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-white/80">
              {lang === 'bn' ? 'মুনাফা বৃদ্ধি' : 'Profit lift'}
            </p>
            <p className="font-heading text-2xl font-extrabold">{event.profitLift}</p>
          </div>
        </div>
      </div>

      {/* Before / After comparison */}
      <div className="grid gap-0 md:grid-cols-2">
        {/* Without AI */}
        <div className="border-b border-border/60 p-7 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <X className="h-5 w-5" />
            </span>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
              {lang === 'bn' ? 'এআই ছাড়া' : 'Without AI'}
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {lang === 'bn' ? event.withoutAIBn : event.withoutAI}
          </p>
        </div>

        {/* With AI */}
        <div className="p-7">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Check className="h-5 w-5" />
            </span>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              {lang === 'bn' ? 'এআই সহ' : 'With AI automation'}
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {lang === 'bn' ? event.withAIBn : event.withAI}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border/60 bg-muted/30 p-6 text-center">
        <button
          onClick={onBook}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
        >
          <TrendingUp className="h-4 w-4" />
          {lang === 'bn' ? 'এই ইভেন্টের জন্য এআই স্ট্র্যাটেজি পান' : 'Get an AI strategy for this event'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
