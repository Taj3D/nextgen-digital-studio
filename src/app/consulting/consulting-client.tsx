'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { usePageViewTracking } from '@/components/site/landing-common'
import {
  ArrowRight, Check, X, Stethoscope, TrendingDown, Clock, AlertTriangle,
  Search, Target, Zap, Compass, ClipboardCheck, BarChart3, Wrench,
  ChevronDown, Brain, Cpu, Users, ShieldCheck, Sparkles, MapPin,
  Phone, MessageCircle, Calculator, Layers, Rocket, FileText,
} from 'lucide-react'

export function ConsultingClient() {
  usePageViewTracking('consulting_page')

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">

        {/* ===== 01: TRUST BAR ===== */}
        <section className="border-b border-border/60 bg-emerald-600 py-2.5 text-center text-white">
          <p className="text-xs font-medium sm:text-sm">
            🎯 AI Business Strategy + Revenue Systems + Automation Transformation Advisor
          </p>
        </section>

        {/* ===== 02: HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-background to-background dark:from-emerald-950/20">
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-24 lg:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Stethoscope className="h-3.5 w-3.5" /> AI Business Consulting — Strategy First
            </div>

            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              আপনার Business-এ AI কোথায় বসবে—<br />
              <span className="text-emerald-600 dark:text-emerald-400">আমরা সেটা বের করে দিই।</span>
            </h1>

            <p className="mt-3 text-lg font-bold text-muted-foreground">
              আরও AI Tools নয়। প্রথমে দরকার সঠিক Business Strategy।
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              আপনার sales, marketing, customer journey, operations এবং team workflow audit করে
              আমরা identify করি—কোথায় AI ও automation বাস্তব business impact তৈরি করতে পারে,
              কোথায় investment করা উচিত, আর কোথায় AI ব্যবহার না করাই ভালো।
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/consulting/apply" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-[1.02]">
                আমার AI Business Growth Audit শুরু করুন <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#process" className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted">
                ৩০ মিনিটের Strategy Session বুক করুন
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No pressure. No random tool recommendations. Just business-first AI strategy.</p>

            {/* Business Process Visual */}
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              {['BUSINESS', 'CUSTOMER JOURNEY', 'REVENUE FUNNEL', 'BOTTLENECKS', 'AI OPPORTUNITIES', 'GROWTH'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-50/50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{step}</div>
                  {i < 5 && <ArrowRight className="h-3.5 w-3.5 text-emerald-500/50" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 04: PROBLEM RECOGNITION ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
              আপনার Business-এ সমস্যা AI-এর অভাবে নয়।
            </h2>
            <p className="mt-2 text-center text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              সমস্যা হতে পারে—কোথায় AI ব্যবহার করবেন সেটা না জানায়।
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { p: 'Lead আসছে, কিন্তু Follow-up হচ্ছে না', cost: 'Lost opportunities + wasted ad spend', q: 'কতটা follow-up AI automate করতে পারে?' },
                { p: 'Owner/team repetitive কাজেই সময় ব্যয় করছে', cost: 'High operational cost + low productivity', q: 'কোন repetitive কাজগুলো automate করা যায়?' },
                { p: 'Sales process ব্যক্তি-নির্ভর', cost: 'Inconsistent sales + scaling problem', q: 'Sales process-এ AI কোথায় বসতে পারে?' },
                { p: 'Customer response slow বা inconsistent', cost: 'Poor customer experience + lost sales', q: 'Response time কত কমানো সম্ভব?' },
                { p: 'Business data scattered across tools', cost: 'No visibility + poor decisions', q: 'Data consolidate করে কী insight পাওয়া যায়?' },
                { p: 'Management জানে AI important, কিন্তু কোথা থেকে শুরু করবে জানে না', cost: 'Paralysis + missed opportunities', q: 'কোন AI initiative আগে নেওয়া উচিত?' },
              ].map((card, i) => (
                <div key={i} className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-lg">
                  <p className="text-sm font-bold">{card.p}</p>
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50/50 px-3 py-2 dark:bg-rose-950/10">
                    <TrendingDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span className="text-xs text-muted-foreground"><span className="font-semibold">Hidden Cost:</span> {card.cost}</span>
                  </div>
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-emerald-50/30 px-3 py-2 dark:bg-emerald-950/10">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span className="text-xs text-muted-foreground"><span className="font-semibold">Strategic Q:</span> {card.q}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 05: COST OF INACTION ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Cost of Inaction</h2>
            <div className="mt-8 space-y-4">
              {[
                { formula: 'Missed Leads × Average Customer Value', result: 'Potential Revenue Leakage' },
                { formula: 'Hours of Repetitive Work × Hourly Team Cost', result: 'Operational Cost' },
                { formula: 'Slow Response × Lead Volume × Conversion Impact', result: 'Potential Opportunity Loss' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-rose-500/20 bg-background p-5 text-center">
                  <p className="text-sm font-mono text-muted-foreground">{item.formula}</p>
                  <p className="mt-2 text-lg font-bold text-rose-600">= {item.result}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs italic text-muted-foreground">These are planning estimates, not guaranteed outcomes. Actual impact depends on your business data and implementation.</p>
          </div>
        </section>

        {/* ===== 06: WHY AI STRATEGY FIRST ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">"AI adoption is not a technology decision first.<br />It is a business strategy decision."</h2>
            <p className="mt-4 text-base text-muted-foreground">
              প্রশ্নটা AI লাগবে কি না—প্রশ্নটা হলো আপনার Business-এর কোন জায়গায় AI সবচেয়ে বেশি Business Value তৈরি করতে পারে?
            </p>
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-6 dark:bg-emerald-950/20">
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                MORE AI ≠ MORE GROWTH<br />
                RIGHT AI + RIGHT PROCESS + RIGHT PRIORITY = BUSINESS IMPACT
              </p>
            </div>
          </div>
        </section>

        {/* ===== 07: AI OPPORTUNITY AREAS ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">AI আপনার Business-এর জন্য কী করতে পারে?</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Zap, title: 'MARKETING', items: 'Lead capture, Content workflow, Campaign support, Segmentation' },
                { icon: Target, title: 'SALES', items: 'Lead qualification, Follow-up, Appointment booking, Sales assistance' },
                { icon: Users, title: 'CUSTOMER EXPERIENCE', items: 'Instant responses, FAQ, Support triage, Multilingual communication' },
                { icon: Cpu, title: 'OPERATIONS', items: 'Repetitive workflow automation, Reporting, Task routing, Documentation' },
                { icon: BarChart3, title: 'MANAGEMENT', items: 'Dashboards, Insights, Forecasting support, Decision intelligence' },
                { icon: Brain, title: 'TEAM', items: 'AI copilots, Knowledge access, Productivity' },
              ].map(({ icon: Icon, title, items }) => (
                <div key={title} className="rounded-xl border border-border/60 bg-background p-5">
                  <Icon className="h-6 w-6 text-emerald-600" />
                  <h3 className="mt-2 text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 08: CONSULTING FRAMEWORK ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">NextGen AI Business Transformation Framework™</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: '01', t: 'ASSESS', d: 'Business + Process + Revenue + Customer Journey Audit' },
                { n: '02', t: 'IDENTIFY', d: 'Bottlenecks + Leakage + AI Opportunities' },
                { n: '03', t: 'PRIORITIZE', d: 'Impact vs Effort vs Risk' },
                { n: '04', t: 'DESIGN', d: 'AI + Automation + Process Architecture' },
                { n: '05', t: 'ROADMAP', d: '30 / 60 / 90 Day Action Plan' },
                { n: '06', t: 'DECIDE', d: 'Build Internally / NextGen / Hybrid / Don\'t Automate Yet' },
              ].map((stage) => (
                <div key={stage.n} className="rounded-xl border border-border/60 bg-card p-5">
                  <span className="text-xs font-bold text-emerald-600">STAGE {stage.n}</span>
                  <h3 className="mt-1 font-heading font-bold">{stage.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{stage.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-50/30 p-4 text-center dark:bg-emerald-950/10">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                "এখানে AI দরকার নেই।" — আমরা এটাও বলতে পারি। কারণ trust আমাদের কাছে sell-এর চেয়ে বড়।
              </p>
            </div>
          </div>
        </section>

        {/* ===== 09: AI BUSINESS GROWTH AUDIT ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">AI Business Growth Audit™</h2>
            <p className="mt-3 text-center text-sm text-muted-foreground">১৮টি area-তে আপনার business audit করা হয়</p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {['Business Model', 'Customer Journey', 'Lead Generation', 'Lead Capture', 'Lead Qualification', 'Sales Process', 'Follow-up', 'Customer Support', 'Operations', 'Team Productivity', 'Data Flow', 'Technology Stack', 'Automation Opportunities', 'AI Opportunities', 'Revenue Leakage', 'Cost Leakage', 'Time Leakage', 'Customer Experience Gaps'].map((area, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span className="text-xs">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm font-semibold text-muted-foreground">Prioritization: Business Impact + Implementation Effort + Urgency + Risk + Data Readiness</p>
            </div>
          </div>
        </section>

        {/* ===== 10: WHAT YOU GET ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">What You Walk Away With</h2>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {['Business Bottleneck Report', 'AI Opportunity Map', 'Revenue Leakage Map', 'Automation Priority Matrix', 'AI Readiness Score', 'Technology Stack Recommendations', 'ROI Opportunity Estimate', '90-Day Roadmap', 'Executive Strategy Session', 'Recommended Implementation Plan'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-50/30 p-3 dark:bg-emerald-950/10">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm italic text-muted-foreground">
              "এখন আমি জানি—কী করব, কেন করব, কোনটা আগে করব, কতটা investment দরকার, এবং কোথায় AI ব্যবহার করা উচিত নয়।"
            </p>
          </div>
        </section>

        {/* ===== 11: OPPORTUNITY MATRIX ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">AI Opportunity Matrix</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">"We don't automate everything. We prioritize what matters."</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-5 text-center dark:bg-emerald-950/20">
                <p className="text-xs font-bold uppercase text-emerald-600">HIGH IMPACT / LOW EFFORT</p>
                <p className="mt-2 text-lg font-bold">→ DO FIRST</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-50/50 p-5 text-center dark:bg-amber-950/20">
                <p className="text-xs font-bold uppercase text-amber-600">HIGH IMPACT / HIGH EFFORT</p>
                <p className="mt-2 text-lg font-bold">→ PLAN</p>
              </div>
              <div className="rounded-xl border border-blue-500/30 bg-blue-50/50 p-5 text-center dark:bg-blue-950/20">
                <p className="text-xs font-bold uppercase text-blue-600">LOW IMPACT / LOW EFFORT</p>
                <p className="mt-2 text-lg font-bold">→ OPTIONAL</p>
              </div>
              <div className="rounded-xl border border-rose-500/30 bg-rose-50/50 p-5 text-center dark:bg-rose-950/20">
                <p className="text-xs font-bold uppercase text-rose-600">LOW IMPACT / HIGH EFFORT</p>
                <p className="mt-2 text-lg font-bold">→ AVOID</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 12: CONSULTING VS IMPLEMENTATION VS TRAINING ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting আর Implementation এক জিনিস নয়।</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { t: 'CONSULTING', q: 'What should we do?', items: 'Audit, Strategy, Prioritization, Roadmap, Decision support', color: 'emerald' },
                { t: 'IMPLEMENTATION', q: 'How do we build it?', items: 'AI Agents, CRM, Automation, Integrations, Deployment', color: 'blue' },
                { t: 'TRAINING', q: 'How does our team use it?', items: 'AI literacy, Workflows, Tools, Adoption, Team enablement', color: 'amber' },
              ].map((col) => (
                <div key={col.t} className={`rounded-2xl border p-6 ${col.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10' : col.color === 'blue' ? 'border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10' : 'border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10'}`}>
                  <h3 className={`font-bold ${col.color === 'emerald' ? 'text-emerald-600' : col.color === 'blue' ? 'text-blue-600' : 'text-amber-600'}`}>{col.t}</h3>
                  <p className="mt-1 text-xs italic text-muted-foreground">"{col.q}"</p>
                  <p className="mt-3 text-sm text-muted-foreground">{col.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 14: FOUNDER ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="mx-auto max-w-xs">
                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
                  <Image src="/founder.png" alt="Md. Nazmul Islam Taj — AI Business Strategist" width={400} height={400} className="aspect-square w-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">আপনার Problem-এর Guide</h2>
                <p className="mt-1 text-sm font-semibold text-emerald-600">Md. Nazmul Islam Taj — Founder & CEO, NextGen Digital Studio</p>
                <p className="mt-1 text-xs text-muted-foreground">AI Business Strategist · AI Revenue Systems Architect · Business Transformation Advisor</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Engineer → Business Builder → Digital Systems → AI Transformation। ১২০+ বাংলাদেশি business-কে AI ও automation-এ রূপান্তর করেছি। আমার লক্ষ্য—আপনার business-এর বর্তমান Situation বুঝে কোন Problem আগে solve করা উচিত, সেটি পরিষ্কার করতে।
                </p>
                <p className="mt-4 text-sm font-bold text-emerald-600">Guide, not Guru.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 15+16: WHO FOR / NOT FOR ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-heading text-xl font-bold text-emerald-600">This Consulting is for you if...</h2>
                <div className="mt-4 space-y-2">
                  {['You already have a functioning business', 'You have customers or leads', 'You want structured AI adoption', 'You have repetitive processes', 'You want a roadmap before investing', 'You are a founder/decision maker'].map((item) => (
                    <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-emerald-600" /><span className="text-sm">{item}</span></div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-rose-600">This is NOT for you if...</h2>
                <div className="mt-4 space-y-2">
                  {['You only want a cheap chatbot', 'You are looking for random AI tools', 'You expect instant guaranteed revenue', 'You don\'t want to change existing processes', 'You want technology before understanding the problem'].map((item) => (
                    <div key={item} className="flex items-center gap-2"><X className="h-4 w-4 shrink-0 text-rose-500" /><span className="text-sm">{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 17: PROCESS ===== */}
        <section id="process" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Consulting Process</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: '01', t: 'DISCOVER', d: 'Understand business, goals, challenges and current workflow.' },
                { n: '02', t: 'AUDIT', d: 'Map customer journey, sales, operations and technology.' },
                { n: '03', t: 'IDENTIFY', d: 'Find bottlenecks, leakage and AI opportunities.' },
                { n: '04', t: 'PRIORITIZE', d: 'Rank opportunities based on impact, effort, urgency and risk.' },
                { n: '05', t: 'ROADMAP', d: 'Build a practical 30/60/90-day strategy.' },
                { n: '06', t: 'DECIDE', d: 'Build internally / Work with NextGen / Hybrid / Wait.' },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">{step.n}</span>
                  <div><div className="text-sm font-bold">{step.t}</div><div className="text-xs text-muted-foreground">{step.d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 18: OFFER LADDER ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Offer Architecture</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-5">
              {[
                { lv: '1', t: 'FREE AI READINESS ASSESSMENT', p: 'Low-friction entry' },
                { lv: '2', t: 'AI BUSINESS GROWTH AUDIT™', p: 'Paid diagnostic engagement' },
                { lv: '3', t: 'AI STRATEGY CONSULTING', p: 'Deep strategic advisory' },
                { lv: '4', t: 'AI IMPLEMENTATION', p: 'Build and deploy' },
                { lv: '5', t: 'OPTIMIZATION / RETAINER', p: 'Continuous improvement' },
              ].map((offer) => (
                <div key={offer.lv} className="rounded-xl border border-border/60 bg-card p-4 text-center">
                  <span className="text-xs font-bold text-emerald-600">LEVEL {offer.lv}</span>
                  <h3 className="mt-1 text-xs font-bold">{offer.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{offer.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 19: ROI CALCULATOR (simplified) ===== */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">ROI Opportunity Estimate</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">Estimated Opportunity — NOT Guaranteed Revenue</p>
            <div className="mt-8 rounded-2xl border border-border/60 bg-background p-6">
              <p className="text-sm text-muted-foreground">
                আপনার Monthly Leads, Average Customer Value, এবং Current Conversion Rate জানালে আমরা estimate করতে পারি—
                AI দিয়ে follow-up automate করলে কতটা Revenue Opportunity তৈরি হতে পারে।
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold">Calculation available during consulting session</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs italic text-muted-foreground">
              Estimates are planning tools only. Actual results depend on business conditions, implementation quality, customer behavior and other factors.
            </p>
          </div>
        </section>

        {/* ===== 20: FAQ ===== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-8 space-y-3">
              {[
                { q: 'AI Consulting আসলে কী?', a: 'আপনার business audit করে কোথায় AI ব্যবহার করলে business impact হবে সেটা বের করা। শুধু tool recommend করা নয়।' },
                { q: 'AI Business Growth Audit কী?', a: '১৮টি area-তে আপনার business audit করে bottleneck, revenue leakage এবং AI opportunity চিহ্নিত করা।' },
                { q: 'আমার business ছোট হলে কি consulting দরকার?', a: 'যদি আপনার customer, lead বা repetitive কাজ থাকে—হ্যাঁ। ছোট business-এও AI value তৈরি করতে পারে।' },
                { q: 'আপনারা কি implementation-ও করেন?', a: 'হ্যাঁ। কিন্তু Consulting আগে। আগে বুঝি কী দরকার, তারপর decide করি কীভাবে করব।' },
                { q: 'Consulting আর AI automation-এর পার্থক্য কী?', a: 'Consulting = "কী করব?"। Implementation = "কীভাবে করব?"। Consulting-এ strategy তৈরি হয়, implementation-এ তা বাস্তবায়িত হয়।' },
                { q: 'কতদিনে roadmap পাওয়া যাবে?', a: 'Audit-এর ধরন অনুযায়ী। সাধারণত ৭-১৪ দিনে ৯০-দিনের roadmap তৈরি করা যায়।' },
                { q: 'Consulting-এর পর কী হবে?', a: 'আপনি পাবেন: Bottleneck Report, AI Opportunity Map, ROI Estimate, এবং ৯০-দিনের Roadmap। তারপর decide করবেন কী করবেন।' },
                { q: 'আমি নিজে implementation করতে পারব?', a: 'হ্যাঁ। Roadmap পেয়ে আপনি নিজেও করতে পারেন, আমাদের সাথেও কাজ করতে পারেন, বা hybrid করতে পারেন।' },
                { q: 'ROI কীভাবে estimate করেন?', a: 'আপনার business data (lead volume, conversion rate, customer value) থেকে। তবে এটা estimate, guaranteed revenue নয়।' },
                { q: 'AI ব্যবহার না করেও কি আপনারা recommend করবেন?', a: 'হ্যাঁ। যেখানে AI-এর business case নেই, সেখানে আমরা স্পষ্ট বলব—"এখানে AI দরকার নেই।"' },
                { q: 'Data privacy কীভাবে handle করা হয়?', a: 'Client data confidential। Minimum necessary access। Third-party tools-এর নিজস্ব policy থাকতে পারে।' },
                { q: 'Consultation-এর আগে কী প্রস্তুতি দরকার?', a: 'শুধু আপনার business-এর basic information (customer, sales process, current tools) জানান। বাকিটা আমরা audit করব।' },
              ].map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </section>

        {/* ===== 21: FINAL CTA ===== */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              আপনার Business-এর জন্য AI কোথায় সবচেয়ে বেশি Value তৈরি করতে পারে—<br />
              চলুন সেটা আগে বের করি।
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/90">
              আপনাকে আজই কোনো AI system কিনতে হবে না। প্রথমে বুঝুন—কোথায় opportunity, কোথায় bottleneck,
              কী automate করা উচিত, কী automate করা উচিত নয়, এবং আগামী ৯০ দিনে কোন কাজগুলো আগে করা দরকার।
            </p>
            <Link href="/consulting/apply" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition-transform hover:scale-[1.02]">
              আমার AI Business Growth Audit শুরু করুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-4 text-left" aria-expanded={open}>
        <span className="text-sm font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-border/60 px-4 py-3"><p className="text-sm text-muted-foreground">{a}</p></div>}
    </div>
  )
}
