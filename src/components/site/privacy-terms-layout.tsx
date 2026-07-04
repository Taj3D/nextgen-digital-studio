import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/site-data"

type Section = {
  title: string
  body: string
}

export function PrivacyTermsLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> হোমে ফিরুন
          </Link>
          <span className="h-4 w-px bg-border" />
          <h1 className="font-heading text-base font-bold">{title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.05] to-cyan-500/[0.05] p-6 sm:p-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full bg-blue-600/10 px-3 py-1 font-semibold text-blue-600">
              সর্বশেষ আপডেট: {lastUpdated}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-600">
              কার্যকর: এখন থেকে
            </span>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-7">
              <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                {section.title}
              </h3>
              <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 rounded-2xl border border-blue-600/30 bg-blue-600/[0.04] p-6 text-center">
          <h3 className="font-heading text-lg font-bold">প্রশ্ন আছে?</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            আমাদের সাথে যোগাযোগ করুন — আমরা সাহায্য করতে প্রস্তুত।
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]">
              ইমেইল করুন
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="rounded-xl border border-border/60 bg-background px-5 py-2.5 font-semibold hover:bg-muted">
              কল করুন
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name} · {title} · যশোর, বাংলাদেশ
        </p>
      </main>
    </div>
  )
}
