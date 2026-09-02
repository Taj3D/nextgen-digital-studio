'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { usePageViewTracking } from '@/components/site/landing-common'
import { siteConfig } from '@/lib/site-data'
import {
  ArrowRight, ArrowDown, Check, X, Stethoscope, Users, Target,
  ShieldX, Lightbulb, Brain, TrendingDown, Clock, AlertTriangle,
  Search, Wrench, Zap, BarChart3, Compass, ClipboardCheck,
  ChevronDown, Phone, Mail, MessageCircle,
} from 'lucide-react'

export function ConsultingClient() {
  usePageViewTracking('consulting_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">

        {/* ===== SECTION 02: HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-background to-background dark:from-emerald-950/20">
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 lg:py-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Stethoscope className="h-3.5 w-3.5" />
              NGS Consulting — Diagnosis First
            </div>

            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              আপনি অনেক কিছু করছেন—<br />
              <span className="text-emerald-600 dark:text-emerald-400">কিন্তু ঠিক কোন জায়গায় আটকে আছেন?</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              আপনার Career, Freelancing, Business বা নতুন Idea—যেখানেই আপনি থাকুন না কেন,
              আগে বুঝুন আপনার আসল Problem কোথায়, কোন Bottleneck আপনাকে আটকে রাখছে
              এবং এখন কোন কাজটিকে Priority দেওয়া উচিত।
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/consulting/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-[1.02]"
              >
                আপনার Problem Diagnose করুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Consulting কীভাবে কাজ করে
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              No guaranteed income. No motivational hype. Diagnosis first.
            </p>

            {/* Diagnostic Pathway Visual */}
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              {['CURRENT SITUATION', 'PROBLEM', 'BOTTLENECK', 'PRIORITY', 'ACTION'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-50/50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    {step}
                  </div>
                  {i < 4 && <ArrowRight className="h-4 w-4 text-emerald-500/50" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 03: TRUST STRIP ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-12">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
            {[
              { icon: Stethoscope, title: 'Diagnosis First', desc: 'আগে Problem বুঝি।' },
              { icon: Users, title: 'Customer-Centric', desc: 'আপনার Situation থেকেই শুরু।' },
              { icon: Target, title: 'Action-Oriented', desc: 'শুধু Advice নয়—Next Action পরিষ্কার করি।' },
              { icon: ShieldX, title: 'No False Promises', desc: 'Guaranteed Income বা unrealistic result নয়।' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border/60 bg-background p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 04: PROBLEM RECOGNITION ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                সমস্যা সবসময় 'কী করতে হবে' নয়।
              </h2>
              <p className="mt-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                অনেক সময় সমস্যা হলো—আগে কোনটা করতে হবে।
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { problem: 'আমি অনেক কিছু শিখছি, কিন্তু Income হচ্ছে না।', bottleneck: 'Skill → Offer → Customer → Sales' },
                { problem: 'আমি Business শুরু করতে চাই, কিন্তু কোথা থেকে শুরু করব বুঝি না।', bottleneck: 'Idea → Customer → Problem → Validation' },
                { problem: 'আমি Freelancer, কিন্তু Client নিয়মিত পাই না।', bottleneck: 'Positioning → Offer → Lead → Communication → Sales' },
                { problem: 'আমি চাকরি করি, কিন্তু Side Business শুরু করার সময় পাই না।', bottleneck: 'Time → Priority → Model → Execution' },
                { problem: 'আমি জানি কী করতে হবে, কিন্তু কাজ শুরু করতে পারি না।', bottleneck: 'Clarity → System → Execution → Review' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-lg"
                >
                  <p className="text-sm font-semibold">{card.problem}</p>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <span className="text-xs font-mono text-muted-foreground">{card.bottleneck}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 05: INFO VS DIAGNOSIS ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              হয়তো আপনার আরও Information দরকার নেই।
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              হয়তো দরকার—আপনার বর্তমান Situation থেকে কোন Problem-টা আগে Solve করতে হবে সেটা পরিষ্কার করা।
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {[
                { label: 'INFORMATION', sub: 'What do you know?', icon: Lightbulb },
                { label: 'DIAGNOSIS', sub: 'Where are you stuck?', icon: Stethoscope },
                { label: 'ACTION', sub: 'What should you do next?', icon: Zap },
              ].map((item, i) => (
                <React.Fragment key={item.label}>
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/20 bg-background px-6 py-5 shadow-sm">
                    <item.icon className="h-6 w-6 text-emerald-600" />
                    <div className="text-sm font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                  {i < 2 && <ArrowRight className="hidden h-5 w-5 text-emerald-500/50 sm:block" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTIONS 6-25 (placeholder — will be filled next) ===== */}
        <ConsultingSections6to25 />

      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  )
}

/* ===== Sections 6-25 as a separate component for maintainability ===== */
function ConsultingSections6to25() {
  return (
    <>
      {/* ===== SECTION 06: WHAT IS NGS CONSULTING ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">NGS Consulting আসলে কী?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground">
            NGS Consulting হলো একটি structured problem-solving process যেখানে আপনার বর্তমান Situation,
            Desired Outcome, Problem Gap এবং Bottleneck বিশ্লেষণ করে Priority ও Action Direction পরিষ্কার করা হয়।
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Consulting ≠ Motivation', 'Consulting ≠ Random Advice', 'Consulting ≠ Information Dump'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-50/50 p-4 dark:bg-rose-950/20">
                <X className="h-4 w-4 shrink-0 text-rose-500" />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-6 text-center dark:bg-emerald-950/20">
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              Consulting = Diagnosis + Strategy + Priority + Action Direction
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 07: CORE FRAMEWORK ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">আমরা আপনার Problem কীভাবে দেখি?</h2>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { n: '01', label: 'CURRENT SITUATION', desc: 'আপনি এখন কোথায় আছেন' },
              { n: '02', label: 'DESIRED OUTCOME', desc: 'আপনি কোথায় যেতে চান' },
              { n: '03', label: 'PROBLEM GAP', desc: 'কী আটকে রাখছে' },
              { n: '04', label: 'BOTTLENECK', desc: 'মূল বাধা কোনটা' },
              { n: '05', label: 'PRIORITY', desc: 'আগে কী করতে হবে' },
              { n: '06', label: 'ACTION PLAN', desc: 'কীভাবে এগোবেন' },
              { n: '07', label: 'IMPLEMENTATION', desc: 'বাস্তবায়ন' },
              { n: '08', label: 'REVIEW', desc: 'পর্যালোচনা ও সমন্বয়' },
            ].map((step) => (
              <div key={step.n} className="flex items-center gap-4 rounded-xl border border-border/60 bg-background p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">{step.n}</span>
                <div>
                  <div className="text-sm font-bold">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 08: NGS 7D FRAMEWORK ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">NGS 7D Consulting Framework</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { d: 'DISCOVER', desc: 'আপনার বর্তমান Situation বুঝি।' },
              { d: 'DEFINE', desc: 'Problem-টি পরিষ্কার করি।' },
              { d: 'DIAGNOSE', desc: 'Root Bottleneck খুঁজে বের করি।' },
              { d: 'DETECT', desc: 'Risk, Gap এবং Constraint শনাক্ত করি।' },
              { d: 'DECIDE', desc: 'কোন Priority আগে নিতে হবে ঠিক করি।' },
              { d: 'DESIGN', desc: 'Action Direction তৈরি করি।' },
              { d: 'DEPLOY', desc: 'Implementation ও Review-এর দিকে এগিয়ে যাই।' },
            ].map((item, i) => (
              <div key={item.d} className="rounded-xl border border-border/60 bg-card p-5">
                <span className="text-xs font-bold text-emerald-600">0{i + 1}</span>
                <h3 className="mt-1 font-heading font-bold">{item.d}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 09: CONSULTING CATEGORIES ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">আপনি কোন Situation-এর মধ্যে আছেন?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'BUSINESS GROWTH', for: 'Business Owners', problems: 'Customer Acquisition, Sales, Offer, Marketing, Lead Generation, Positioning', cta: 'Business Problem Diagnose করুন' },
              { title: 'FREELANCER GROWTH', for: 'Freelancers', problems: 'Client Acquisition, Positioning, Offer, Pricing, Sales Communication, Portfolio', cta: 'Freelancing Bottleneck বুঝুন' },
              { title: 'CAREER & SIDE-INCOME', for: 'Job Holders', problems: 'Skill Development, Career Direction, Side Income, Time, Career Transition', cta: 'Career Situation Assess করুন' },
              { title: 'IDEA & ENTREPRENEURSHIP', for: 'Entrepreneurs / Beginners', problems: 'Business Idea, Customer Problem, Validation, Offer, MVP, Market Direction', cta: 'Idea Diagnose করুন' },
            ].map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-border/60 bg-background p-6">
                <h3 className="font-heading font-bold text-emerald-600 dark:text-emerald-400">{cat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">For {cat.for}</p>
                <p className="mt-3 text-sm text-muted-foreground">{cat.problems}</p>
                <Link href="/consulting/apply" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:underline">
                  {cat.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: WHO IS THIS FOR ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">এই Consulting কার জন্য?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'অনেক চেষ্টা করেও আটকে আছেন',
              'একসাথে অনেক কিছু করতে গিয়ে confused',
              'Problem জানেন কিন্তু Priority জানেন না',
              'Strategy আছে কিন্তু execution আটকে আছে',
              'Business/Career decision নিতে চান',
              'নিজের Situation নিয়ে structured diagnosis চান',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-50/30 p-4 dark:bg-emerald-950/10">
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 11: WHO IS THIS NOT FOR ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">এই Consulting সবার জন্য নয়।</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'Overnight Success seekers',
              'Guaranteed Income seekers',
              'Motivational speech seekers',
              'Advice collectors',
              'People unwilling to share real situation',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-50/30 p-4 dark:bg-rose-950/10">
                <X className="h-4 w-4 shrink-0 text-rose-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-muted-foreground">
            "আমরা আপনাকে যা শুনতে ভালো লাগে তা বলার জন্য নয়—আপনার Situation অনুযায়ী যা আগে বোঝা দরকার, সেটি পরিষ্কার করার জন্য কাজ করি।"
          </p>
        </div>
      </section>

      {/* ===== SECTION 12: WHAT YOU GET ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            একটি Consulting Session-এর পর আপনি কী পরিষ্কারভাবে বুঝতে পারবেন?
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: 'Problem Clarity', desc: 'আসল Problem কোনটা' },
              { icon: AlertTriangle, title: 'Bottleneck Clarity', desc: 'কোথায় আটকে আছেন' },
              { icon: Target, title: 'Priority Clarity', desc: 'আগে কী করতে হবে' },
              { icon: Compass, title: 'Decision Clarity', desc: 'কোন দিকে যাবেন' },
              { icon: Zap, title: 'Action Direction', desc: 'পরবর্তী কাজ কী' },
              { icon: Wrench, title: 'Implementation Direction', desc: 'কীভাবে করবেন' },
              { icon: ClipboardCheck, title: 'Review Structure', desc: 'কীভাবে যাচাই করবেন' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border/60 bg-card p-5 text-center">
                <Icon className="mx-auto h-6 w-6 text-emerald-600" />
                <h3 className="mt-2 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 13: CONSULTING LEVELS ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting Levels</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { level: '01', title: 'CONSULTING ASSESSMENT', focus: 'Diagnosis', includes: 'Situation, Problem, Bottleneck, Priority' },
              { level: '02', title: 'STRATEGIC CONSULTING', focus: 'Strategy', includes: 'Strategic Direction, Priority, Roadmap, Decision Framework' },
              { level: '03', title: 'IMPLEMENTATION CONSULTING', focus: 'Execution', includes: 'Implementation Guidance, Execution Support, Review, Adjustment' },
            ].map((lvl) => (
              <div key={lvl.level} className="rounded-2xl border border-border/60 bg-background p-6">
                <span className="text-xs font-bold text-emerald-600">LEVEL {lvl.level}</span>
                <h3 className="mt-1 font-heading font-bold">{lvl.title}</h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">Focus: {lvl.focus}</p>
                <p className="mt-2 text-sm text-muted-foreground">{lvl.includes}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-600">Assessment Required</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 14: HOW IT WORKS ===== */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">NGS Consulting কীভাবে কাজ করে?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: '01', label: 'APPLY', desc: 'আপনার Situation ও Problem জানান।' },
              { n: '02', label: 'ASSESSMENT', desc: 'আপনার information review করা হবে।' },
              { n: '03', label: 'DIAGNOSIS', desc: 'Core Problem + Bottleneck identify করা হবে।' },
              { n: '04', label: 'CONSULTING', desc: 'Priority + Strategy + Action Direction নিয়ে কাজ হবে।' },
              { n: '05', label: 'IMPLEMENTATION', desc: 'আপনি plan execute করবেন।' },
              { n: '06', label: 'REVIEW', desc: 'Progress অনুযায়ী next decision নেওয়া হবে।' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">{step.n}</span>
                <div>
                  <div className="text-sm font-bold">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 15: SESSION EXPERIENCE ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting Session-এ কী নিয়ে কথা হবে?</h2>
          <div className="mt-8 space-y-3">
            {[
              'আপনি এখন কোথায়?',
              'আপনি কোথায় যেতে চান?',
              'আপনার সবচেয়ে বড় Problem কী?',
              'আপনি আগে কী চেষ্টা করেছেন?',
              'কী আপনাকে আটকে রাখছে?',
              'সব সমস্যার মধ্যে কোনটি আগে solve করা উচিত?',
              'এখন আপনার Next Best Action কী?',
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600">{i + 1}</span>
                <span className="text-sm">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 16: 5 DIAGNOSIS QUESTIONS ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">নিজেকেই এই ৫টি প্রশ্ন করুন</h2>
          <div className="mt-8 space-y-4">
            {[
              'আমি এখন কোথায় আছি?',
              'আমি আসলে কোথায় যেতে চাই?',
              'আমার সবচেয়ে বড় Problem কী?',
              'কেন আমি এখনও সেই Problem solve করতে পারিনি?',
              'আগামী ৭ দিনে কোন একটি কাজ করলে আমি সবচেয়ে বেশি এগোতে পারব?',
            ].map((q, i) => (
              <div key={i} className="rounded-xl border border-emerald-500/20 bg-emerald-50/30 p-5 dark:bg-emerald-950/10">
                <span className="text-xs font-bold text-emerald-600">0{i + 1}</span>
                <p className="mt-1 text-base font-semibold">{q}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">নিজের Problem আরও গভীরভাবে Diagnose করতে চান?</p>
            <Link href="/consulting/apply" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700">
              Request a Consulting Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 17: SOCIAL PROOF (Before/After — no fake testimonials) ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting আপনাকে কী পরিষ্কার করতে সাহায্য করতে পারে</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-50/30 p-6 dark:bg-rose-950/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600">BEFORE</h3>
              <p className="mt-2 text-sm text-muted-foreground">"আমি অনেক কিছু করছি, কিন্তু বুঝতে পারছি না কোনটা আগে করব।"</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/30 p-6 dark:bg-emerald-950/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600">AFTER</h3>
              <p className="mt-2 text-sm text-muted-foreground">"আমার primary bottleneck হলো X, তাই এখন আমার priority Y।"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 18: FOUNDER / GUIDE ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="mx-auto max-w-xs">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
                <Image src="/founder.png" alt="Md. Nazmul Islam Taj — Founder" width={400} height={400} className="aspect-square w-full object-cover" />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold">আপনার Problem-এর Guide</h2>
              <p className="mt-1 text-sm font-semibold text-emerald-600">MD Nazmul Islam Taj — Founder, NextGen Digital Studio</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                "NextGen Digital Studio-এর লক্ষ্য শুধু আরও information দেওয়া নয়। আমরা চেষ্টা করি একজন ব্যক্তি বা business-এর বর্তমান Situation বুঝে কোন Problem আগে solve করা উচিত, সেটি পরিষ্কার করতে।"
              </p>
              <p className="mt-4 text-sm font-bold text-emerald-600">Guide, not Guru.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 19: WHY NGS ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">কেন NGS Consulting?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['Diagnosis First', 'Customer-Centric', 'Structured', 'Action-Oriented', 'Multi-Domain Perspective', 'Honest'].map((reason) => (
              <div key={reason} className="flex items-center gap-2 rounded-xl border border-border/60 bg-background p-4">
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm font-semibold">{reason}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-50/30 p-6 text-center dark:bg-rose-950/10">
              <h3 className="text-sm font-bold uppercase text-rose-600">Random Advice</h3>
              <p className="mt-2 text-xs text-muted-foreground">"এটা করো, ওটা করো..."</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/30 p-6 text-center dark:bg-emerald-950/10">
              <h3 className="text-sm font-bold uppercase text-emerald-600">Structured Diagnosis</h3>
              <p className="mt-2 text-xs text-muted-foreground">"আগে Problem বুঝি, তারপর Priority ঠিক করি"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 20: CONSULTING VS TRAINING ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting vs Training</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="font-bold text-blue-600">TRAINING</h3>
              <p className="mt-1 text-sm text-muted-foreground">"আমি কী শিখব?"</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>Knowledge</li><li>Curriculum</li><li>Skill-focused</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/30 p-6 dark:bg-emerald-950/10">
              <h3 className="font-bold text-emerald-600">CONSULTING</h3>
              <p className="mt-1 text-sm text-muted-foreground">"আমার বর্তমান Problem কী এবং আগে কী করা উচিত?"</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>Diagnosis</li><li>Situation-specific</li><li>Decision clarity + Action direction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 21: CONSULTING VS DONE-FOR-YOU ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting vs Done-For-You Service</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/30 bg-background p-6">
              <h3 className="font-bold text-emerald-600">CONSULTING</h3>
              <p className="mt-2 text-sm text-muted-foreground">NGS helps understand, decide, plan, and guide implementation.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-6">
              <h3 className="font-bold">DONE-FOR-YOU SERVICE</h3>
              <p className="mt-2 text-sm text-muted-foreground">NGS executes a specific service for the customer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 22: PRIMARY CTA ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            আপনার Problem হয়তো আরও বড় নয়।<br />
            <span className="text-emerald-600">হয়তো শুধু এখনও ঠিকভাবে Diagnose করা হয়নি।</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            আপনার বর্তমান Situation জানান। আমরা প্রথমে বুঝব আপনার জন্য Consulting appropriate কি না।
          </p>
          <Link href="/consulting/apply" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-[1.02]">
            Request a Consulting Assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">Application ≠ Automatic Acceptance</p>
        </div>
      </section>

      {/* ===== SECTION 23: FAQ ===== */}
      <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {[
              { q: 'Consulting আর Training-এর মধ্যে পার্থক্য কী?', a: 'Training-এ আপনি নির্দিষ্ট skill শেখেন। Consulting-এ আপনার বর্তমান Situation বিশ্লেষণ করে Problem, Bottleneck এবং Priority পরিষ্কার করা হয়।' },
              { q: 'Consulting কি সবাই নিতে পারবে?', a: 'না। যারা শুধু motivation বা guaranteed income খুঁজছেন, তাদের জন্য Consulting উপযুক্ত নয়। Assessment-এর পর আমরা নির্ধারণ করি।' },
              { q: 'আপনারা কি আমার হয়ে কাজ করবেন?', a: 'Consulting-এ আমরা guide করি, আপনার হয়ে কাজ করি না। Done-for-You Service আলাদা।' },
              { q: 'Income guarantee করেন?', a: 'না। আমরা কোনো guaranteed income বা result promise করি না। আমরা clarity এবং direction দিই।' },
              { q: 'Business না থাকলেও Consulting নিতে পারি?', a: 'হ্যাঁ। Career, freelancing, বা নতুন idea নিয়েও Consulting নিতে পারেন।' },
              { q: 'Student কি Consulting নিতে পারে?', a: 'হ্যাঁ, যদি তার নির্দিষ্ট Problem বা decision নিতে হয়।' },
              { q: 'Online Consulting আছে?', a: 'হ্যাঁ, Consulting সম্পূর্ণ online।' },
              { q: 'Consulting-এর দাম কত?', a: 'Consulting requirement ও scope অনুযায়ী assessment-এর পর appropriate option জানানো হবে।' },
            ].map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 24: FINAL CTA ===== */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
            আরও Information নয়।<br />
            আগে বুঝুন—আপনার Next Best Action কী।
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/90">
            আপনার Situation আমাদের জানান। আমরা আগে Problem এবং Bottleneck বুঝব। তারপর আপনার জন্য appropriate next step নির্ধারণ করব।
          </p>
          <Link href="/consulting/apply" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition-transform hover:scale-[1.02]">
            Request Your Consulting Assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-4">
            <Link href="/" className="text-sm font-semibold text-white/80 underline-offset-4 hover:underline">
              Explore NGS Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

/* ===== FAQ Item (accessible accordion) ===== */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-border/60 px-4 py-3">
          <p className="text-sm text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  )
}
