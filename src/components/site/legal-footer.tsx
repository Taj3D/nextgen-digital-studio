import Link from "next/link"
import { siteConfig } from "@/lib/site-data"

/**
 * Minimal footer for legal/info sub-pages (privacy, terms, docs).
 * Sticky to bottom on short pages, pushed down naturally on long pages.
 */
export function LegalFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-heading text-sm font-bold">NextGen Digital Studio</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {siteConfig.address}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            <Link href="/docs" className="hover:text-foreground">Documentation</Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">{siteConfig.email}</a>
          </div>
        </div>
        <div className="mt-6 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NextGen Digital Studio. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  )
}
