'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowDown,
  Gift,
  Mic,
  MessageCircle,
  Target,
  Users,
  Sparkles,
  Headphones,
  Repeat,
  Compass,
  Brain,
  BookOpen,
  Briefcase,
  Laptop,
  CheckCircle2,
  Loader2,
  Check,
  HelpCircle,
  ChevronDown,
  Heart,
} from 'lucide-react'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Reveal } from '@/components/site/reveal'

/**
 * Free English Speaking Initiative — Dedicated Page
 *
 * Page structure per ERMOS §16:
 *  01 Hero
 *  02 Why English Speaking Matters
 *  03 What This Initiative Is
 *  04 Who It Is For
 *  05 Learning Focus
 *  06 Learning Philosophy
 *  07 Student Journey
 *  08 Why NGS
 *  09 How Interest Registration Works
 *  10 FAQ
 *  11 Register Interest
 *  12 NGS Ecosystem / Next Learning Path
 *
 * Governance (ERMOS §02):
 *  - DO NOT invent schedule/duration/teacher count/students/certificate/exam/score
 *    improvement/employment guarantee/IELTS-TOEFL result/placement/testimonials/student success
 *    stats/class frequency/venue/online platform/batch size
 *  - CTA: "Register Interest" not "Join Now"
 *  - Use "ফোকাস থাকবে" not "আপনি নিশ্চিতভাবে শিখে যাবেন"
 *  - Do NOT promise employment/freelancing success/income
 */

// === Confidence level options per §14 ===
const CONFIDENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner', labelBn: 'নতুন শিক্ষার্থী' },
  { value: 'understand_hesitant', label: 'Can understand but hesitate to speak', labelBn: 'বুঝতে পারি কিন্তু বলতে দ্বিধা করি' },
  { value: 'basic_speaker', label: 'Can speak basic English', labelBn: 'সাধারণ English বলতে পারি' },
  { value: 'comfortable_improve', label: 'Comfortable but want improvement', labelBn: 'বলতে পারি কিন্তু আরও improve করতে চাই' },
] as const

// === Goal options per §14 ===
const GOAL_OPTIONS = [
  { value: 'speaking_confidence', label: 'Speaking Confidence', labelBn: 'Speaking Confidence' },
  { value: 'conversation_practice', label: 'Conversation Practice', labelBn: 'Conversation Practice' },
  { value: 'academic_communication', label: 'Academic Communication', labelBn: 'Academic Communication' },
  { value: 'job_career', label: 'Job / Career Communication', labelBn: 'Job / Career Communication' },
  { value: 'freelancing_digital', label: 'Freelancing / Digital Work', labelBn: 'Freelancing / Digital Work' },
  { value: 'general_improvement', label: 'General Improvement', labelBn: 'General Improvement' },
] as const

// === Learner status options ===
const LEARNER_STATUS_OPTIONS = [
  { value: 'student_school', label: 'School Student', labelBn: 'স্কুল শিক্ষার্থী' },
  { value: 'student_college', label: 'College Student', labelBn: 'কলেজ শিক্ষার্থী' },
  { value: 'student_university', label: 'University Student', labelBn: 'বিশ্ববিদ্যালয় শিক্ষার্থী' },
  { value: 'job_seeker', label: 'Job Seeker', labelBn: 'চাকরি প্রত্যাশী' },
  { value: 'freelancer', label: 'Freelancer', labelBn: 'Freelancer' },
  { value: 'other', label: 'Other Learner', labelBn: 'অন্যান্য শিক্ষার্থী' },
] as const

// === Preferred learning format options (optional, per §14) ===
const FORMAT_OPTIONS = [
  { value: 'online', label: 'Online', labelBn: 'Online' },
  { value: 'offline', label: 'Offline', labelBn: 'Offline' },
  { value: 'either', label: 'Either', labelBn: 'যেকোনো একটি' },
] as const

// === Learning focus areas (8) per §05 ===
const LEARNING_FOCUS = [
  { n: '01', t: 'Speaking Practice', icon: Mic },
  { n: '02', t: 'Practical English', icon: BookOpen },
  { n: '03', t: 'Conversation Practice', icon: MessageCircle },
  { n: '04', t: 'Confidence Building', icon: Target },
  { n: '05', t: 'Regular Practice', icon: Repeat },
  { n: '06', t: 'Real-Life Communication', icon: Users },
  { n: '07', t: 'Listening & Response Practice', icon: Headphones },
  { n: '08', t: 'Learning Discipline', icon: Compass },
] as const

// === Audience cards (4) per §08 + §16 improved problem-recognition descriptions ===
const AUDIENCE_CARDS = [
  {
    icon: BookOpen,
    title: 'Student',
    desc: 'English শেখার পাশাপাশি speaking practice-এর সুযোগ চান।',
  },
  {
    icon: Sparkles,
    title: 'Beginner',
    desc: 'Speaking শুরু করতে চান কিন্তু কোথা থেকে শুরু করবেন তা পরিষ্কার নয়।',
  },
  {
    icon: Briefcase,
    title: 'Job / Career Preparation',
    desc: 'Professional communication improve করতে চান।',
  },
  {
    icon: Laptop,
    title: 'Digital Learner',
    desc: 'Future digital learning journey-এর জন্য communication skill strengthen করতে চান।',
  },
] as const

// === Student Journey steps per §07 (with EXPLORE added — future learning opportunities) ===
const JOURNEY_STEPS = ['LEARN', 'PRACTICE', 'SPEAK', 'BUILD CONFIDENCE', 'COMMUNICATE', 'EXPLORE'] as const

// === FAQ items per §17 (only answerable without inventing facts) ===
const FAQ_ITEMS = [
  {
    q: 'Is this English Speaking initiative free?',
    a: 'Yes. It is intended as a free student-support initiative. Current schedule and detailed registration information will be confirmed separately.',
  },
  {
    q: 'Who can register interest?',
    a: 'Students and learners interested in improving practical English speaking and communication skills may register their interest.',
  },
  {
    q: 'When will the sessions start?',
    a: 'Schedule and session details are currently being finalized. Interested learners can register their interest to receive future updates.',
  },
  {
    q: 'Is this an IELTS / TOEFL preparation course?',
    a: 'This initiative is focused on practical English speaking and communication rather than a confirmed IELTS/TOEFL preparation program.',
  },
  {
    q: 'Will participants receive a certificate?',
    a: 'A certificate has not been confirmed. Updates about any formal recognition will be shared as details are finalized.',
  },
  {
    q: 'Is there a fee?',
    a: 'The initiative is intended to be free.',
  },
] as const

// === Ecosystem bridge steps per §12 ===
const ECOSYSTEM_STEPS = [
  'English Communication',
  'Digital Skills',
  'AI & Technology',
  'Career / Freelancing / Business',
  'Continuous Learning',
] as const

// === Common Student Problems per §05 (Problem → Value mapping) ===
const COMMON_STUDENT_PROBLEMS = [
  {
    problem: 'English বুঝি — কিন্তু বলতে গেলে আটকে যাই।',
    value: 'Speaking Practice',
  },
  {
    problem: 'Grammar জানি — কিন্তু conversation করতে পারি না।',
    value: 'Conversation Practice',
  },
  {
    problem: 'কথা বলার confidence কম।',
    value: 'Confidence Building',
  },
  {
    problem: 'Practice করার environment পাই না।',
    value: 'Regular Practice',
  },
] as const

// === Skill-interest segmentation options per §12 (optional field for student segmentation) ===
const SKILL_INTEREST_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'ai', label: 'AI' },
  { value: 'digital_skills', label: 'Digital Skills' },
  { value: 'freelancing', label: 'Freelancing' },
  { value: 'web_development', label: 'Web Development' },
  { value: 'cnc_design', label: 'CNC Design' },
  { value: 'digital_marketing', label: 'Digital Marketing' },
  { value: 'business_entrepreneurship', label: 'Business / Entrepreneurship' },
  { value: 'not_sure', label: 'এখনও নিশ্চিত নই' },
] as const

const selectClass =
  'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

export function FreeEnglishCourseClient() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">

        {/* ============================================================
            SECTION 01 — HERO
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-background to-background dark:from-emerald-950/25">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20 lg:py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              <Gift className="h-3.5 w-3.5" />
              Student Support Initiative
            </div>
            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              English Speaking শেখা হোক <span className="text-emerald-500">বিনামূল্যে।</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              শুধু English জানা নয়—নিজের কথা স্পষ্টভাবে বলা, বুঝে কথা বলা এবং নিয়মিত practice
              করার confidence তৈরি করাই এই initiative-এর লক্ষ্য।
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#register-interest"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-[1.02] sm:w-auto"
                aria-label="Register Interest"
              >
                Register Interest
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-background px-7 text-sm font-semibold transition-colors hover:bg-muted sm:w-auto"
              >
                Back to Homepage
              </Link>
            </div>
            <p className="mt-5 text-xs italic text-muted-foreground">
              Schedule, duration ও registration details এখনও নির্ধারিত হচ্ছে।
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 02 — Why English Speaking Matters (per §06)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                English শুধু একটি Subject নয় — এটি একটি <span className="text-emerald-500">Communication Skill।</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                পড়াশোনা, freelancing, চাকরি, business অথবা digital world—অনেক ক্ষেত্রেই নিজের চিন্তা পরিষ্কারভাবে
                প্রকাশ করার ability গুরুত্বপূর্ণ।
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                তাই English শেখাকে শুধু grammar বা vocabulary-এর মধ্যে সীমাবদ্ধ না রেখে practical communication ও
                regular practice-এর দিকেও গুরুত্ব দেওয়া হবে।
              </p>
              <p className="mt-4 text-xs italic text-muted-foreground">
                Note: English alone does not guarantee career success — it is one of many foundational skills.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 03 — What This Initiative Is (per §03, §04 body)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                What This Initiative Is
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                একটি Student-Support Initiative
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  অনেক শিক্ষার্থী English grammar বা vocabulary সম্পর্কে কিছুটা জানলেও বাস্তবে কথা বলার সময়
                  confidence, practice এবং communication-এর অভাবে আটকে যায়।
                </p>
                <p>
                  NextGen Digital Studio-এর এই Free English Speaking Initiative শিক্ষার্থীদের practical speaking
                  practice, communication confidence এবং নিয়মিত অনুশীলনের সুযোগ তৈরি করার একটি student-support
                  initiative।
                </p>
              </div>
              {/* No fixed course structure claimed — disclaimer per §04 */}
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-50/30 px-4 py-3 dark:bg-amber-950/10">
                <p className="text-xs italic text-muted-foreground">
                  এই initiative-এর বিস্তারিত course structure এখনও নির্ধারিত হচ্ছে। নিচের learning focus areas
                  হলো intended focus — confirmed curriculum নয়।
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 04 — Who It Is For (per §08 — 4 audience cards)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Users className="h-3.5 w-3.5" />
                Who It Is For
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                কার জন্য এই Initiative?
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {AUDIENCE_CARDS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group rounded-2xl border border-border/60 bg-background p-5 transition-all hover:border-emerald-500/40 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
            {/* No employment/freelancing success/income promise per §08 */}
            <p className="mt-6 text-center text-xs italic text-muted-foreground">
              Note: NGS does not promise employment, freelancing success, or income through this initiative.
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 05 — Common Student Problems (NEW per §15 §05 — Problem → Value Map)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <HelpCircle className="h-3.5 w-3.5" />
                Common Student Problems
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                কোথায় আটকে আছেন?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Customer recognition — নিজেকে চেনা চেনা পরিস্থিতিতে খুঁজে পান। নিচের যেকোনো একটি পরিস্থিতি আপনার হলে, আপনি সঠিক জায়গায় আছেন।
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COMMON_STUDENT_PROBLEMS.map(({ problem, value }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="rounded-xl border border-border/60 bg-background p-4 text-center transition-colors hover:border-emerald-500/40"
                >
                  <p className="text-xs italic text-muted-foreground">&ldquo;{problem}&rdquo;</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <ArrowRight className="h-3 w-3 text-emerald-500/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] italic text-muted-foreground">
              No shaming. No fear-based copy. Just recognition.
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 06 — Learning Focus (per §05 — 8-item grid)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <BookOpen className="h-3.5 w-3.5" />
                Learning Focus Areas
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                What Students Can Expect
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                নিচের focus areas গুলোতে গুরুত্ব থাকবে — confirmed curriculum নয়, intended focus।
              </p>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LEARNING_FOCUS.map(({ n, t, icon: Icon }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-extrabold text-emerald-600/30 dark:text-emerald-400/30">
                      {n}
                    </span>
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground">{t}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 06 — Learning Philosophy (per §09)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Brain className="h-3.5 w-3.5" />
                Our Learning Philosophy
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Knowledge → Practice → Feedback → Improvement
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                শুধু lesson দেখানো নয়। শেখা বিষয় practice করা, ভুল বোঝা, feedback নেওয়া এবং ধীরে ধীরে improve
                করার mindset তৈরি করাই লক্ষ্য।
              </p>
              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-5 py-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  LEARN · GROW · BUILD · TOGETHER
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 07 — Student Journey (per §07)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Compass className="h-3.5 w-3.5" />
                Student Journey
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Learning Journey
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs">
              {JOURNEY_STEPS.map((step, i, arr) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-50/60 px-4 py-2.5 font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    {step}
                  </div>
                  {i < arr.length - 1 && <ArrowDown className="h-3.5 w-3.5 text-emerald-500/60 rotate-90 sm:rotate-0" />}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-8 text-center text-sm font-semibold italic text-emerald-700 dark:text-emerald-300">
              "Knowledge তখনই মূল্যবান, যখন সেটি বাস্তবে প্রয়োগ করা যায়।"
            </p>
            <p className="mt-2 text-center text-xs italic text-muted-foreground">
              This aligns with: Learn → Apply → Improve. The final <strong>EXPLORE</strong> step represents
              future learning opportunities — it does NOT mean automatic conversion into a paid course.
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 09 — Why NGS (per §08 — stronger copy)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Heart className="h-3.5 w-3.5" />
                Why NGS Is Making This Initiative
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                কেন NextGen Digital Studio এই উদ্যোগটি করছে?
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  NextGen Digital Studio-এর কাজ শুধু technology বা business solution-এর মধ্যে সীমাবদ্ধ নয়।
                  Learning, practical skill development এবং মানুষকে নিজের next step সম্পর্কে clearer decision
                  নিতে সাহায্য করাও আমাদের broader direction-এর অংশ।
                </p>
                <p>
                  English communication একটি foundational skill। তাই শিক্ষার্থীদের জন্য practical English
                  speaking practice-এর একটি accessible opportunity তৈরি করার এই উদ্যোগ।
                </p>
              </div>
              {/* No unsupported social-impact claims per §08 */}
              <p className="mt-6 text-xs italic text-muted-foreground">
                Note: No national-scale impact claim. No number of beneficiaries. No "first", "largest",
                "leading" claims.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 10 — Free ≠ Low Value (NEW per §09 — polished educational block)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Gift className="h-3.5 w-3.5" />
                Free ≠ Low Value
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Free মানে কম গুরুত্বপূর্ণ নয়।
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                এই initiative-এর লক্ষ্য শুধু একটি free class দেওয়া নয়। লক্ষ্য হলো একটি useful communication
                skill-এর সঙ্গে শিক্ষার্থীদের পরিচিত করা, practice-এর সুযোগ তৈরি করা এবং শেখাকে বাস্তব প্রয়োগের
                সঙ্গে যুক্ত করা।
              </p>
              {/* LEARN → APPLY → IMPROVE anchor */}
              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-5 py-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  LEARN → APPLY → IMPROVE
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 09 — How Interest Registration Works (per §15 confirmation flow)
            ============================================================ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                How Interest Registration Works
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Registration Flow
              </h2>
              <div className="mt-8 space-y-3">
                {[
                  { n: '01', t: 'Register Interest', d: 'নিচের form পূরণ করে আপনার interest register করুন।' },
                  { n: '02', t: 'We Receive Your Interest', d: 'আপনার interest আমরা পেয়ে যাব।' },
                  { n: '03', t: 'Future Updates', d: 'Schedule, duration এবং registration details confirm হলে আপনাকে জানানো হবে।' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                      {n}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{t}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs italic text-muted-foreground">
                No specific notification date is promised.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 10 — FAQ (per §17 — only answerable without inventing facts)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 space-y-3">
                {FAQ_ITEMS.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 11 — Register Interest (per §13, §14, §15)
            ============================================================ */}
        <RegisterInterestSection />

        {/* ============================================================
            SECTION 12 — NGS Ecosystem / Next Learning Path (per §12)
            ============================================================ */}
        <section className="border-t border-border/60 bg-gradient-to-b from-background to-emerald-50/40 py-16 sm:py-20 dark:to-emerald-950/15">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                NGS Ecosystem
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                একটি Skill থেকে একটি Learning Journey
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                একজন শিক্ষার্থীর learning journey একটি skill-এ থেমে থাকার প্রয়োজন নেই। নিজের লক্ষ্য ও আগ্রহ
                অনুযায়ী পরবর্তী skill নির্বাচন করা যায়।
              </p>
              <p className="mt-2 text-xs italic text-muted-foreground">
                No income promise. No employment promise. No "learn English and become successful" claim.
              </p>
              {/* Ecosystem pathway per §12 */}
              <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
                {ECOSYSTEM_STEPS.map((step, i, arr) => (
                  <React.Fragment key={step}>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-50/60 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex items-center justify-center">
                        <ArrowDown className="h-3.5 w-3.5 text-emerald-500/60 rotate-90 sm:rotate-0" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-6 text-center text-xs italic text-muted-foreground">
                This is an ecosystem explanation, NOT a promise.
              </p>
              {/* CTA bridge to NGS Training/Digital Solutions */}
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/ai-training"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-background px-6 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/40 dark:text-emerald-300 dark:hover:bg-emerald-950/20 sm:w-auto"
                >
                  Explore NGS Training
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/consulting"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted sm:w-auto"
                >
                  Explore Consulting
                </Link>
              </div>
              <p className="mt-10 text-center text-[0.68rem] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">
                LEARN · GROW · BUILD · TOGETHER
              </p>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter variant="consulting" />
      <FloatingButtons />
    </div>
  )
}

/* ============================================================
   Registration Form Component (per §13, §14, §15)
   ============================================================ */
function RegisterInterestSection() {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [confidence, setConfidence] = React.useState('')
  const [goal, setGoal] = React.useState('')
  const [learnerStatus, setLearnerStatus] = React.useState('')
  const [format, setFormat] = React.useState('')
  // §12 — new optional skill-interest segmentation field
  const [skillInterest, setSkillInterest] = React.useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company: null,
      service: 'Free English Speaking Initiative',
      message: JSON.stringify({
        learnerStatus,
        confidenceLevel: confidence,
        learningGoal: goal,
        preferredFormat: format || 'not_specified',
        // §12 — skill-interest segmentation field (optional, for future relevant communication only)
        skillInterest: skillInterest || 'not_specified',
        notes: String(fd.get('notes') ?? '').trim() || null,
      }),
      source: 'free_english_interest',
    }

    if (!payload.name || !payload.phone) {
      toast.error('Please fill all required fields (Name and Mobile/WhatsApp)')
      setSubmitting(false)
      return
    }
    if (!learnerStatus) {
      toast.error('Please select your learner status')
      setSubmitting(false)
      return
    }
    if (!confidence) {
      toast.error('Please select your current English confidence level')
      setSubmitting(false)
      return
    }
    if (!goal) {
      toast.error('Please select your primary learning goal')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setDone(true)
      toast.success('Interest registered!')
      form.reset()
      setConfidence('')
      setGoal('')
      setLearnerStatus('')
      setFormat('')
      setSkillInterest('')
    } catch {
      toast.error('Something went wrong. Please try again or WhatsApp us.')
    } finally {
      setSubmitting(false)
    }
  }

  // === Success state per §15 + §14 soft next-value message ===
  if (done) {
    return (
      <section id="register-interest" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/40 p-8 text-center dark:bg-emerald-950/15">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
              আপনার interest আমরা পেয়েছি।
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Schedule, duration এবং registration details confirm হলে আপনাকে জানানো হবে।
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground">
              কোনো specific notification date প্রতিশ্রুতি দেওয়া হচ্ছে না।
            </p>
            {/* §14 — soft next-value message, NOT aggressive paid training push */}
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/40 px-5 py-4 text-left dark:bg-emerald-950/10">
              <p className="text-sm leading-relaxed text-muted-foreground">
                এর মধ্যে English communication ও practical digital skill সম্পর্কিত NGS-এর educational content
                অনুসরণ করতে পারেন।
              </p>
              <p className="mt-2 text-[10px] italic text-muted-foreground">
                Soft educational value suggestion. No immediate paid training push.
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="mt-6">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="register-interest" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Gift className="h-3.5 w-3.5" />
            Register Interest
          </p>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Register Your Interest
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            এই initiative-এর session / registration details confirm হলে আপনাকে জানাতে আপনার interest register করুন।
          </p>
        </Reveal>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Name + Mobile — required */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              01 · Contact Information
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">নাম / Name *</Label>
                <Input id="name" name="name" required placeholder="আপনার নাম" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Mobile / WhatsApp *</Label>
                <Input id="phone" name="phone" required placeholder="01XXXXXXXXX" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
          </fieldset>

          {/* Learner status — required */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              02 · Learner Status
            </legend>
            <div className="space-y-1.5">
              <Label>Student / Learner status *</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {LEARNER_STATUS_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                      learnerStatus === opt.value
                        ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                        : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="learnerStatus"
                      value={opt.value}
                      checked={learnerStatus === opt.value}
                      onChange={(e) => setLearnerStatus(e.target.value)}
                      className="h-4 w-4 accent-emerald-600"
                      required
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Confidence level — required */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              03 · Current English Confidence Level
            </legend>
            <div className="space-y-1.5">
              <Label>Current English confidence level *</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {CONFIDENCE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                      confidence === opt.value
                        ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                        : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="confidence"
                      value={opt.value}
                      checked={confidence === opt.value}
                      onChange={(e) => setConfidence(e.target.value)}
                      className="h-4 w-4 accent-emerald-600"
                      required
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Primary learning goal — required */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              04 · Primary Learning Goal
            </legend>
            <div className="space-y-1.5">
              <Label>Primary learning goal *</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {GOAL_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                      goal === opt.value
                        ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                        : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={opt.value}
                      checked={goal === opt.value}
                      onChange={(e) => setGoal(e.target.value)}
                      className="h-4 w-4 accent-emerald-600"
                      required
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Preferred format — optional per §14 */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              05 · Preferred Format (optional)
            </legend>
            <div className="space-y-1.5">
              <Label>Preferred format <span className="text-muted-foreground">(optional — যদি actual delivery format confirm না হয়, তাহলেও আপনি preference জানাতে পারেন)</span></Label>
              <div className="grid gap-2 sm:grid-cols-3">
                {FORMAT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                      format === opt.value
                        ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                        : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={opt.value}
                      checked={format === opt.value}
                      onChange={(e) => setFormat(e.target.value)}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs italic text-muted-foreground">
                Note: Label is "Preferred format" (not "Choose your class format") — actual delivery format is not yet confirmed.
              </p>
            </div>
          </fieldset>

          {/* §12 — Skill-interest segmentation field (optional, for future relevant communication) */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              06 · Skill Interest (optional)
            </legend>
            <div className="space-y-1.5">
              <Label>আপনি বর্তমানে কী শিখছেন / কোন skill শিখতে চান?</Label>
              <p className="text-[11px] text-muted-foreground">
                Future relevant educational communication-এর জন্য segmentation data। কোনো automated marketing নয়।
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {SKILL_INTEREST_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-xs transition-all ${
                      skillInterest === opt.value
                        ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                        : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="skillInterest"
                      value={opt.value}
                      checked={skillInterest === opt.value}
                      onChange={(e) => setSkillInterest(e.target.value)}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Optional notes */}
          <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              07 · Additional Notes (optional)
            </legend>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Anything else you want to share?</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="আপনার কোনো নির্দিষ্ট প্রশ্ন বা context থাকলে জানাতে পারেন (optional)"
              />
            </div>
          </fieldset>

          {/* §13 — Consent / Trust statement + Privacy Policy link */}
          <div className="rounded-xl border border-border/60 bg-muted/30 px-5 py-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              আপনার তথ্য registration ও যোগাযোগের প্রয়োজন অনুযায়ী ব্যবহার করা হবে। বিস্তারিত জানতে{' '}
              <Link
                href="/privacy"
                className="font-semibold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
              >
                Privacy Policy
              </Link>{' '}
              দেখুন।
            </p>
            <p className="mt-1.5 text-[10px] italic text-muted-foreground">
              Conservative wording. No "আমরা কখনোই আপনার data share করি না" claim unless legally verified.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full rounded-xl bg-emerald-600 text-[15px] font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01] hover:bg-emerald-700 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Register Interest
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            আপনার information সম্পূর্ণ confidential থাকবে। কোনো spam নয়।
          </p>
        </form>
      </div>
    </section>
  )
}

/* ============================================================
   FAQ Item Component
   ============================================================ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background transition-colors hover:border-emerald-500/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 px-4 py-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  )
}
