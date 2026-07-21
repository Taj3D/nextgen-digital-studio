import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { Home, MessageCircle, Search } from "lucide-react";
import { BackButton } from "@/components/site/back-button";

/**
 * Branded 404 page.
 *
 * Replaces Next.js's default unstyled 404 with a page that includes the
 * navbar + footer so users can navigate back to the site. Bilingual
 * (Bengali + English) and matches the site's gradient-brand aesthetic.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Big 404 with gradient */}
          <div className="relative mb-8 inline-block">
            <h1
              className="bg-gradient-brand bg-clip-text text-[120px] font-black leading-none text-transparent sm:text-[180px]"
              aria-hidden
            >
              404
            </h1>
            <span className="absolute -right-4 -top-2 text-4xl sm:text-6xl" aria-hidden>
              🔍
            </span>
          </div>

          {/* Bilingual heading */}
          <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </h2>
          <p className="mb-2 text-lg font-semibold text-muted-foreground" lang="bn">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </p>

          {/* Bilingual description */}
          <p className="mx-auto mb-8 max-w-md text-base text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground" lang="bn">
            আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে। চলুন আপনাকে
            সঠিক জায়গায় পৌঁছে দিই।
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <Home className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
            <Link
              href="/#lead-form"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get Free Strategy Session
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 border-t border-border pt-8">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Search className="h-3.5 w-3.5" aria-hidden />
              Popular Pages
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href="/blog"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Blog
              </Link>
              <Link
                href="/case-studies"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Case Studies
              </Link>
              <Link
                href="/founder"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Founder
              </Link>
              <Link
                href="/3d-portrait"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                3D Portrait
              </Link>
              <Link
                href="/cnc-design"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                CNC Design
              </Link>
              <Link
                href="/ai-training"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                AI Training
              </Link>
              <Link
                href="/pdf-books"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                PDF Books
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Privacy
              </Link>
            </div>
          </div>

          {/* Back button (client component — needs window.history) */}
          <BackButton />
        </div>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
