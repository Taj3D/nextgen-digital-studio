'use client'

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Users, Mail, Phone, Calendar, Download, Bot,
  TrendingUp, Filter, RefreshCw, ArrowLeft,
  CheckCircle2, AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminGate } from "@/components/site/admin-gate"
import { cn } from "@/lib/utils"

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  company?: string | null
  service?: string | null
  message?: string | null
  notes?: string | null
  assignedTo?: string | null
  source: string
  status: string
  createdAt: string
}

type Stats = {
  total: number
  conversations: number
  subscribers: number
  bySource: { source: string; count: number }[]
  byStatus: { status: string; count: number }[]
}

const sourceLabels: Record<string, { label: string; icon: typeof Mail; color: string }> = {
  contact_form: { label: 'Contact Form', icon: Mail, color: 'bg-blue-500' },
  homepage_lead_form: { label: 'Homepage Lead Form', icon: Mail, color: 'bg-blue-600' },
  strategy_call: { label: 'Strategy Call', icon: Calendar, color: 'bg-violet-500' },
  ai_audit_tool: { label: 'AI Audit', icon: TrendingUp, color: 'bg-amber-500' },
  free_tools_download: { label: 'Free Tools', icon: Download, color: 'bg-emerald-500' },
  ai_chat_widget: { label: 'AI Chat', icon: Bot, color: 'bg-cyan-500' },
  ai_training_page: { label: 'AI Training', icon: Users, color: 'bg-indigo-500' },
  cnc_training_page: { label: 'CNC Training', icon: Users, color: 'bg-amber-600' },
  cnc_design_page: { label: 'CNC Design Bundle', icon: Filter, color: 'bg-orange-500' },
  '3d_portrait_page': { label: '3D Portrait', icon: Bot, color: 'bg-violet-600' },
  pdf_books_page: { label: 'PDF Books', icon: Download, color: 'bg-rose-500' },
  founder_page: { label: 'Founder Page', icon: Phone, color: 'bg-cyan-600' },
  careers_application: { label: 'Careers', icon: Users, color: 'bg-teal-500' },
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-600',
  contacted: 'bg-amber-500/15 text-amber-600',
  qualified: 'bg-violet-500/15 text-violet-600',
  won: 'bg-emerald-500/15 text-emerald-600',
  lost: 'bg-rose-500/15 text-rose-500',
}

export default function AdminDashboard() {
  const [leads, setLeads] = React.useState<Lead[]>([])
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [sourceFilter, setSourceFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')

  async function fetchLeads() {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (sourceFilter !== 'all') params.set('source', sourceFilter)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/leads?${params}`)
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed')
      setLeads(data.leads)
      setStats(data.stats)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchLeads()
  }, [sourceFilter, statusFilter])

  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [notesDraft, setNotesDraft] = React.useState('')
  const [savingNotes, setSavingNotes] = React.useState(false)
  const [activities, setActivities] = React.useState<Array<{
    id: string; type: string; detail: string;
    oldValue: string | null; newValue: string | null; createdAt: string;
  }>>([])
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [bulkAction, setBulkAction] = React.useState('')

  React.useEffect(() => {
    setNotesDraft(selectedLead?.notes ?? '')
    if (selectedLead) fetchActivities(selectedLead.id)
    else setActivities([])
  }, [selectedLead])

  async function updateStatus(id: string, status: string) {
    // Optimistic update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
    } catch {
      // revert on failure
      fetchLeads()
    }
  }

  async function saveNotes() {
    if (!selectedLead) return
    setSavingNotes(true)
    try {
      await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesDraft }),
      })
      setSelectedLead((l) => (l ? { ...l, notes: notesDraft } : l))
    } catch {
      // ignore
    } finally {
      setSavingNotes(false)
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" })
      setSelectedLead(null)
      fetchLeads()
    } catch {
      // ignore
    }
  }

  async function fetchActivities(leadId: string) {
    try {
      const res = await fetch(`/api/leads/${leadId}`)
      const data = await res.json()
      if (data.ok) setActivities(data.activities)
    } catch {
      setActivities([])
    }
  }

  async function runBulkAction() {
    if (selectedIds.size === 0 || !bulkAction) return
    const ids = [...selectedIds]
    if (bulkAction === 'delete') {
      if (!confirm(`Delete ${ids.length} leads permanently?`)) return
    }
    try {
      const body: Record<string, unknown> = { ids, action: bulkAction === 'delete' ? 'delete' : bulkAction === 'assign' ? 'assign' : 'status' }
      if (bulkAction.startsWith('status:')) body.value = bulkAction.split(':')[1]
      if (bulkAction.startsWith('assign:')) body.value = bulkAction.split(':')[1]
      if (bulkAction === 'delete') body.action = 'delete'
      await fetch('/api/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSelectedIds(new Set())
      setBulkAction('')
      fetchLeads()
    } catch {
      // ignore
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)))
    }
  }

  const teamMembers = ['Unassigned', 'Founder', 'AI Engineer', 'Growth Specialist', 'Automation Architect', 'Sales Executive']

  async function assignLead(id: string, assignee: string) {
    const value = assignee === 'Unassigned' ? '' : assignee
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, assignedTo: value } : l)))
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedTo: value }),
      })
    } catch {
      fetchLeads()
    }
  }

  function exportCsv() {
    const params = new URLSearchParams()
    if (sourceFilter !== 'all') params.set('source', sourceFilter)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    window.open(`/api/leads/export?${params}`, '_blank')
  }

  return (
    <AdminGate>
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="NextGen Digital Studio" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
            </a>
            <span className="h-4 w-px bg-border" />
            <a href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </a>
            <span className="h-4 w-px bg-border" />
            <h1 className="font-heading text-base font-bold">Lead Dashboard</h1>
            <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-600">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Users} label="Total Leads" value={stats.total} color="from-blue-600 to-cyan-500" />
            <StatCard icon={Bot} label="AI Chats" value={stats.conversations} color="from-violet-500 to-purple-500" />
            <StatCard icon={Mail} label="Newsletter Subs" value={stats.subscribers} color="from-emerald-500 to-teal-500" />
            <StatCard icon={TrendingUp} label="Conversion Rate" value={`${stats.total > 0 ? Math.round((stats.byStatus.find(s => s.status === 'won')?.count ?? 0) / stats.total * 100) : 0}%`} color="from-amber-500 to-orange-500" />
          </div>
        )}

        {/* Source breakdown */}
        {stats && (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-heading text-sm font-bold">Leads by Source</h3>
              <div className="space-y-2">
                {stats.bySource.map((s) => {
                  const meta = sourceLabels[s.source] ?? { label: s.source, icon: AlertCircle, color: 'bg-gray-500' }
                  const pct = stats.total > 0 ? (s.count / stats.total) * 100 : 0
                  return (
                    <div key={s.source} className="flex items-center gap-3">
                      <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-white", meta.color)}>
                        <meta.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="w-24 text-xs font-medium">{meta.label}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5 }}
                          className={cn("h-full rounded-full", meta.color)}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-bold">{s.count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-heading text-sm font-bold">Leads by Status</h3>
              <div className="grid grid-cols-2 gap-2">
                {stats.byStatus.map((s) => (
                  <div key={s.status} className="rounded-xl border border-border/60 bg-background p-3">
                    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize", statusColors[s.status] ?? 'bg-muted text-muted-foreground')}>
                      {s.status}
                    </span>
                    <p className="mt-1.5 font-heading text-2xl font-extrabold">{s.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-600/50"
          >
            <option value="all">All sources</option>
            <option value="contact_form">Contact Form</option>
            <option value="strategy_call">Strategy Call</option>
            <option value="ai_audit_tool">AI Audit</option>
            <option value="free_tools_download">Free Tools</option>
            <option value="ai_chat_widget">AI Chat</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-600/50"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <span className="ml-auto text-xs text-muted-foreground">
            {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Bulk action toolbar */}
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-blue-600/30 bg-blue-600/[0.04] px-4 py-2.5"
          >
            <span className="text-xs font-bold text-blue-600">{selectedIds.size} selected</span>
            <span className="h-4 w-px bg-border" />
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="rounded-lg border border-border/60 bg-card px-2.5 py-1 text-xs font-medium outline-none focus:border-blue-600/50"
            >
              <option value="">Choose action...</option>
              <optgroup label="Set status">
                <option value="status:new">→ New</option>
                <option value="status:contacted">→ Contacted</option>
                <option value="status:qualified">→ Qualified</option>
                <option value="status:won">→ Won</option>
                <option value="status:lost">→ Lost</option>
              </optgroup>
              <optgroup label="Assign to">
                {teamMembers.map((m) => (
                  <option key={m} value={`assign:${m}`}>→ {m}</option>
                ))}
              </optgroup>
              <option value="delete">🗑 Delete</option>
            </select>
            <button
              onClick={runBulkAction}
              disabled={!bulkAction}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-md disabled:opacity-50"
            >
              Apply
            </button>
            <button
              onClick={() => { setSelectedIds(new Set()); setBulkAction('') }}
              className="rounded-lg border border-border/60 px-2.5 py-1 text-xs font-medium hover:bg-muted"
            >
              Clear
            </button>
          </motion.div>
        )}

        {/* Leads table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-10 w-10 text-rose-500" />
              <p className="mt-3 text-sm text-muted-foreground">{error}</p>
              <Button onClick={fetchLeads} className="mt-4">Try again</Button>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">No leads found for these filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-left">
                    <th className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === leads.length && leads.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 cursor-pointer rounded border-border accent-blue-600"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</th>
                    <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Service</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">Assigned</th>
                    <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {leads.map((lead) => {
                    const meta = sourceLabels[lead.source] ?? { label: lead.source, icon: AlertCircle, color: 'bg-gray-500' }
                    return (
                      <tr key={lead.id} className="cursor-pointer transition-colors hover:bg-muted/30" onClick={() => setSelectedLead(lead)}>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedIds.has(lead.id)}
                            onChange={() => toggleSelect(lead.id)}
                            className="h-4 w-4 cursor-pointer rounded border-border accent-blue-600"
                            aria-label={`Select ${lead.name}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-[10px] font-bold text-white">
                              {lead.name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <p className="font-semibold leading-tight">{lead.name}</p>
                              {lead.company && <p className="text-[11px] text-muted-foreground">{lead.company}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                              <Mail className="h-3 w-3" /> <span className="max-w-[140px] truncate">{lead.email}</span>
                            </a>
                            <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                              <Phone className="h-3 w-3" /> {lead.phone}
                            </a>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="text-xs text-muted-foreground">{lead.service || '—'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold">
                            <meta.icon className="h-3 w-3" /> {meta.label}
                          </span>
                        </td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            className={cn("cursor-pointer rounded-full border-0 px-2.5 py-1 text-[10px] font-bold capitalize outline-none ring-1 ring-inset ring-transparent focus:ring-blue-600/40", statusColors[lead.status] ?? 'bg-muted text-muted-foreground')}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="hidden px-4 py-3 xl:table-cell" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.assignedTo || 'Unassigned'}
                            onChange={(e) => assignLead(lead.id, e.target.value)}
                            className={cn(
                              "cursor-pointer rounded-full border-0 px-2.5 py-1 text-[10px] font-semibold outline-none ring-1 ring-inset ring-transparent focus:ring-blue-600/40",
                              lead.assignedTo ? 'bg-violet-500/15 text-violet-600' : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {teamMembers.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </td>
                        <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                          {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          NextGen Digital Studio · Lead Dashboard · Data from SQLite database
        </p>
      </main>

      {/* Lead detail drawer */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setSelectedLead(null)}
        >
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-md overflow-y-auto bg-card shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border/60 bg-card/95 px-5 py-4 backdrop-blur">
              <h3 className="font-heading text-base font-bold">Lead Details</h3>
              <button
                aria-label="Close"
                onClick={() => setSelectedLead(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <div className="space-y-5 p-5">
              {/* Identity */}
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">
                  {selectedLead.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-heading text-lg font-bold leading-tight">{selectedLead.name}</p>
                  {selectedLead.company && <p className="text-sm text-muted-foreground">{selectedLead.company}</p>}
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(selectedLead.createdAt).toLocaleString('en-GB')}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="grid gap-2">
                <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm hover:border-blue-600/40">
                  <Mail className="h-4 w-4 text-blue-600" /> {selectedLead.email}
                </a>
                <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm hover:border-blue-600/40">
                  <Phone className="h-4 w-4 text-blue-600" /> {selectedLead.phone}
                </a>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    updateStatus(selectedLead.id, e.target.value)
                    setSelectedLead({ ...selectedLead, status: e.target.value })
                  }}
                  className={cn("w-full cursor-pointer rounded-lg border-0 px-3 py-2 text-sm font-bold capitalize outline-none ring-1 ring-inset ring-border focus:ring-blue-600/40", statusColors[selectedLead.status] ?? 'bg-muted')}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              {/* Assignment */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned To</label>
                <select
                  value={selectedLead.assignedTo || 'Unassigned'}
                  onChange={(e) => {
                    assignLead(selectedLead.id, e.target.value)
                    setSelectedLead({ ...selectedLead, assignedTo: e.target.value === 'Unassigned' ? '' : e.target.value })
                  }}
                  className="w-full cursor-pointer rounded-lg border-0 bg-background px-3 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-border focus:ring-blue-600/40"
                >
                  {teamMembers.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Source & service */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/60 bg-background px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Source</p>
                  <p className="text-sm font-medium">{(sourceLabels[selectedLead.source] ?? { label: selectedLead.source }).label}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Service</p>
                  <p className="text-sm font-medium">{selectedLead.service || '—'}</p>
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original Message</label>
                  <p className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Internal Notes</label>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this lead..."
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/15"
                />
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.01] disabled:opacity-50"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>

              {/* Activity Timeline */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity Timeline</label>
                {activities.length === 0 ? (
                  <p className="rounded-lg border border-border/60 bg-muted/30 px-3 py-3 text-center text-xs text-muted-foreground">
                    No activity recorded yet.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {activities.map((a) => (
                      <div key={a.id} className="flex gap-2.5">
                        <div className="flex flex-col items-center">
                          <span className={cn(
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px]",
                            a.type === 'status_change' ? 'bg-blue-500/15 text-blue-600' :
                            a.type === 'assignment' ? 'bg-violet-500/15 text-violet-600' :
                            a.type === 'note_added' ? 'bg-amber-500/15 text-amber-600' :
                            a.type === 'deleted' ? 'bg-rose-500/15 text-rose-500' :
                            'bg-emerald-500/15 text-emerald-600'
                          )}>
                            {a.type === 'status_change' ? '↻' : a.type === 'assignment' ? '👤' : a.type === 'note_added' ? '✎' : '•'}
                          </span>
                          {activities[activities.length - 1] !== a && <span className="w-px flex-1 bg-border" />}
                        </div>
                        <div className="flex-1 pb-1">
                          <p className="text-xs font-medium leading-tight">{a.detail}</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {new Date(a.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="w-full rounded-lg border border-rose-500/30 bg-rose-500/5 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-500/10"
              >
                Delete lead
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </AdminGate>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Users; label: string; value: number | string; color: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md", color)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 font-heading text-3xl font-extrabold">{value}</p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
