'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft, Copy, Check, Terminal, Webhook, Database, Bot,
  Mail, Calendar, FileDown, Users, MessageSquare, ExternalLink,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Endpoint = {
  method: "GET" | "POST" | "PATCH" | "DELETE"
  path: string
  title: string
  desc: string
  body?: string
  response: string
  icon: typeof Bot
}

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/api/contact",
    title: "Submit Contact Form",
    desc: "Capture a lead from the website contact form.",
    icon: Mail,
    body: `{
  "name": "Tanvir Ahmed",
  "email": "tanvir@example.com",
  "phone": "+8801712345678",
  "company": "Dhaka Realty",
  "service": "AI Chat Agent",
  "message": "Interested in automation"
}`,
    response: `{
  "ok": true,
  "id": "cmqy..."
}`,
  },
  {
    method: "POST",
    path: "/api/book-call",
    title: "Book Strategy Call",
    desc: "Book a free strategy call. Also creates a lead with source='strategy_call'.",
    icon: Calendar,
    body: `{
  "name": "Nusrat Jahan",
  "email": "nusrat@hospital.com",
  "phone": "+8801812345678",
  "service": "AI Voice Agent",
  "date": "2025-02-15",
  "message": "Want to automate appointments"
}`,
    response: `{
  "ok": true,
  "id": "cmqy..."
}`,
  },
  {
    method: "POST",
    path: "/api/newsletter",
    title: "Newsletter Subscribe",
    desc: "Subscribe an email to the newsletter. Upserts by email.",
    icon: Mail,
    body: `{ "email": "subscriber@example.com" }`,
    response: `{
  "ok": true,
  "id": "cmqy..."
}`,
  },
  {
    method: "POST",
    path: "/api/chat-agent",
    title: "AI Chat Agent",
    desc: "Send a message to the NextGen AI assistant (GPT-class). Returns a context-aware reply. Bilingual Bangla/English.",
    icon: Bot,
    body: `{
  "message": "What services do you offer?",
  "messages": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}`,
    response: `{
  "ok": true,
  "reply": "We offer AI Sales Automation..."
}`,
  },
  {
    method: "POST",
    path: "/api/chat-save",
    title: "Save Chat Conversation",
    desc: "Persist a chat conversation by sessionId. Auto-detects email/phone/name from user messages to create leads.",
    icon: MessageSquare,
    body: `{
  "sessionId": "chat_123_abc",
  "messages": [
    { "role": "user", "content": "My email is rahman@test.com" }
  ]
}`,
    response: `{
  "ok": true,
  "conversationId": "cmqy...",
  "leadId": "cmqy...",
  "detected": { "email": "rahman@test.com" }
}`,
  },
  {
    method: "POST",
    path: "/api/audit",
    title: "AI Audit Tool",
    desc: "Submit the free AI audit quiz results. Saves a lead with source='ai_audit_tool'.",
    icon: Database,
    body: `{
  "name": "Rakib Hasan",
  "email": "rakib@example.com",
  "phone": "+8801912345678",
  "industry": "Real Estate",
  "score": 55,
  "responses": ["response=8", "automation=15"]
}`,
    response: `{ "ok": true, "id": "cmqy...", "score": 55 }`,
  },
  {
    method: "POST",
    path: "/api/download",
    title: "Free Resource Download",
    desc: "Capture a lead when downloading a free resource. Source='free_tools_download'.",
    icon: FileDown,
    body: `{
  "name": "Farhana Karim",
  "email": "farhana@example.com",
  "resource": "CRM Automation Checklist"
}`,
    response: `{ "ok": true, "id": "cmqy..." }`,
  },
  {
    method: "POST",
    path: "/api/careers",
    title: "Job Application",
    desc: "Submit a job application. Saves a lead with source='careers_application'.",
    icon: Users,
    body: `{
  "name": "Sajid Rahman",
  "email": "sajid@example.com",
  "role": "AI Engineer",
  "portfolio": "https://github.com/sajid",
  "message": "5 years AI experience"
}`,
    response: `{ "ok": true, "id": "cmqy..." }`,
  },
  {
    method: "GET",
    path: "/api/leads",
    title: "List Leads",
    desc: "Fetch leads with optional source/status filters. Returns leads + aggregate stats.",
    icon: Database,
    response: `{
  "ok": true,
  "stats": { "total": 8, "conversations": 0, ... },
  "leads": [ { "id": "cmqy...", "name": "...", ... } ]
}`,
  },
  {
    method: "PATCH",
    path: "/api/leads/[id]",
    title: "Update Lead",
    desc: "Update a lead's status, notes, and/or assignedTo.",
    icon: Database,
    body: `{
  "status": "qualified",
  "notes": "Called, interested",
  "assignedTo": "Sales Executive"
}`,
    response: `{ "ok": true, "lead": { "id": "cmqy...", ... } }`,
  },
  {
    method: "DELETE",
    path: "/api/leads/[id]",
    title: "Delete Lead",
    desc: "Permanently delete a lead.",
    icon: Database,
    response: `{ "ok": true }`,
  },
  {
    method: "GET",
    path: "/api/leads/[id]",
    title: "Get Lead",
    desc: "Fetch a single lead by ID, including status, notes, and assignment.",
    icon: Database,
    response: `{
  "ok": true,
  "lead": {
    "id": "cmqy...",
    "name": "Tanvir Ahmed",
    "email": "tanvir@example.com",
    "phone": "+8801712345678",
    "status": "new",
    "source": "contact_form",
    "createdAt": "2025-01-15T08:30:00.000Z"
  }
}`,
  },
  {
    method: "POST",
    path: "/api/leads/bulk",
    title: "Bulk Lead Action",
    desc: "Apply an action (status change, assign, delete) to up to 500 leads at once.",
    icon: Users,
    body: `{
  "ids": ["cmqy1...", "cmqy2..."],
  "action": "status",
  "value": "qualified"
}`,
    response: `{ "ok": true, "affected": 2 }`,
  },
  {
    method: "POST",
    path: "/api/track",
    title: "Track Event",
    desc: "Fire a tracking event (page_view, lead, purchase, whatsapp_click, etc.) for GA4 / Meta / TikTok / Snapchat Conversions API.",
    icon: TrendingUp,
    body: `{
  "type": "lead",
  "page": "/",
  "source": "homepage_lead_form",
  "email": "user@example.com",
  "phone": "+8801712345678"
}`,
    response: `{ "ok": true, "id": "cmqy..." }`,
  },
  {
    method: "GET",
    path: "/api/track/stats",
    title: "Tracking Stats",
    desc: "Aggregated tracking event counts (cached 30s) plus per-platform Conversions API connection flags.",
    icon: TrendingUp,
    response: `{
  "ok": true,
  "stats": { "page_view": 1240, "lead": 38, "whatsapp_click": 92 },
  "platforms": { "facebook": false, "tiktok": false, "snapchat": false, "google": false }
}`,
  },
  {
    method: "POST",
    path: "/api/send-email",
    title: "Send Email Notification",
    desc: "Internal endpoint that logs a lead notification email (placeholder for SendGrid/Resend integration).",
    icon: Mail,
    body: `{
  "to": "owner@example.com",
  "subject": "New Lead: Tanvir Ahmed",
  "body": "Lead details..."
}`,
    response: `{ "ok": true, "message": "Email notification logged" }`,
  },
  {
    method: "GET",
    path: "/api/leads/export",
    title: "Export Leads (CSV)",
    desc: "Download all leads (filtered) as a CSV file. Supports source & status query params.",
    icon: FileDown,
    response: `Content-Type: text/csv
Content-Disposition: attachment; filename="nextgen-leads-2025-01-15.csv"

Name,Email,Phone,Company,Service,Source,Status,...
Tanvir,tanvir@example.com,...`,
  },
]

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-600",
  POST: "bg-blue-500/15 text-blue-600",
  PATCH: "bg-amber-500/15 text-amber-600",
  DELETE: "bg-rose-500/15 text-rose-500",
}

export function ApiDocs() {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="NextGen Digital Studio" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
            </Link>
            <span className="h-4 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <span className="h-4 w-px bg-border" />
            <h1 className="font-heading text-base font-bold">API Documentation</h1>
            <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-600">
              v1
            </span>
          </div>
          <a
            href="/admin"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Admin →
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.05] to-cyan-500/[0.05] p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">REST API</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
            NextGen Digital Studio API
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            All endpoints return JSON with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{"{ ok: boolean }"}</code>.
            Base URL: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">https://nextgendigitalstudio.com</code>.
            All POST endpoints require a JSON body with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">Content-Type: application/json</code>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">17 Endpoints</span>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">7 Lead Sources</span>
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">AI-Powered</span>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mt-8 space-y-4">
          {endpoints.map((ep, i) => (
            <EndpointCard key={i} ep={ep} />
          ))}
        </div>

        {/* Webhooks note */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-blue-600" />
            <h3 className="font-heading text-base font-bold">Webhooks (Coming Soon)</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Webhook support for real-time lead notifications is on our roadmap.
            Subscribe to new lead events and get instant POST callbacks to your URL.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          NextGen Digital Studio · API Documentation · Built for developers
        </p>
      </main>
    </div>
  )
}

function EndpointCard({ ep }: { ep: Endpoint }) {
  const [copied, setCopied] = React.useState<string | null>(null)

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
        <span className={cn("rounded-md px-2.5 py-1 text-[10px] font-bold", methodColors[ep.method])}>
          {ep.method}
        </span>
        <code className="flex-1 font-mono text-sm font-semibold text-foreground">{ep.path}</code>
        <ep.icon className="h-4 w-4 text-muted-foreground" />
      </div>
      {/* Body */}
      <div className="p-5">
        <h4 className="font-heading text-sm font-bold">{ep.title}</h4>
        <p className="mt-1 text-xs text-muted-foreground">{ep.desc}</p>

        {ep.body && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Request Body</span>
              <button
                onClick={() => copy(ep.body!, `body-${ep.path}`)}
                className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
              >
                {copied === `body-${ep.path}` ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {copied === `body-${ep.path}` ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100 scroll-area">
              <code>{ep.body}</code>
            </pre>
          </div>
        )}

        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Response</span>
            <button
              onClick={() => copy(ep.response, `res-${ep.path}`)}
              className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
            >
              {copied === `res-${ep.path}` ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copied === `res-${ep.path}` ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted/50 p-3 text-xs text-foreground scroll-area">
            <code>{ep.response}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
