'use client'

import Link from "next/link"
import { ArrowLeft, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { blogPosts, siteConfig, type BlogPost } from "@/lib/site-data"
import { useLang } from "@/components/site/language-provider"

/**
 * Parses inline `**bold**` markers in a string into React nodes.
 * Splits the text on the `**...**` pattern, wrapping matched segments in <strong>.
 */
function renderInlineMarkdown(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={`${keyPrefix}-t-${i}`}>{part}</span>
  })
}

/**
 * Renders a long-form article body stored as markdown-like plain text.
 *
 * Format conventions (see BlogPost.content in site-data.ts):
 *   - Paragraphs are separated by "\n\n"
 *   - A paragraph starting with "## " becomes an <h3> section heading
 *   - A paragraph starting with "### " becomes an <h4> sub-heading
 *   - Any other paragraph is rendered as a <p>; internal single "\n" are
 *     preserved via whitespace-pre-line so list-style "- item" blocks read naturally.
 *   - Inline "**text**" is rendered as bold.
 */
function renderArticleContent(content: string) {
  const blocks = content.split('\n\n')
  return blocks.map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    const key = `blk-${i}`

    if (trimmed.startsWith('### ')) {
      return (
        <h4
          key={key}
          className="mt-8 mb-2 font-heading text-lg font-bold tracking-tight text-foreground"
        >
          {renderInlineMarkdown(trimmed.slice(4), key)}
        </h4>
      )
    }

    if (trimmed.startsWith('## ')) {
      return (
        <h3
          key={key}
          className="mt-10 mb-3 font-heading text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
        >
          {renderInlineMarkdown(trimmed.slice(3), key)}
        </h3>
      )
    }

    return (
      <p
        key={key}
        className="mb-4 whitespace-pre-line text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8"
      >
        {renderInlineMarkdown(trimmed, key)}
      </p>
    )
  })
}

export function BlogDetailClient({ slug }: { slug: string }) {
  const { t, tr, lang } = useLang()

  const post = blogPosts.find((p) => p.slug === slug) as BlogPost | undefined
  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-heading text-3xl font-bold">{t('blog.notFound')}</h1>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> {t('blog.backToBlog')}
        </Link>
      </div>
    )
  }

  const isBn = lang === 'bn'
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const author = isBn ? 'তাজ ভাই' : 'Taj Bhai'
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t('blog.backToBlog')}
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground">{t('blog.brandBadge')}</span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
              {tr(post.category)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {tr(post.readTime)}
            </span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {tr(post.title)}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{tr(post.excerpt)}</p>
          <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
              {isBn ? 'তাজ' : 'Taj'}
            </span>
            <div>
              <p className="text-sm font-bold">{author}</p>
              <p className="text-xs text-muted-foreground">{t('blog.authorLabel')}</p>
            </div>
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <p className="text-center font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {tr(post.title)}
            </p>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {tr(post.category)}
          </span>
        </div>

        {/* Article content — long-form body rendered with prose typography */}
        <div className="prose prose-lg max-w-none mt-2">
          {renderArticleContent(post.content)}
        </div>

        {/* Bengali-mode note: full article body is in English for now */}
        {isBn && (
          <p className="mt-6 rounded-xl border border-blue-600/20 bg-blue-600/[0.04] px-4 py-3 text-xs text-muted-foreground">
            📖 সম্পূর্ণ আর্টিকেলটি ইংরেজিতে প্রকাশিত। উপরের সারাংশটি বাংলায় দেখুন।
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600/[0.06] to-cyan-500/[0.06] p-6 text-center sm:p-8">
          <Sparkles className="mx-auto h-8 w-8 text-blue-600" />
          <h3 className="mt-3 font-heading text-xl font-bold sm:text-2xl">
            {t('blog.detailCtaTitle')}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('blog.detailCtaDesc')}
          </p>
          <Link
            href="/#lead-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
          >
            {t('blog.detailCtaButton')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 font-heading text-xl font-bold">{t('blog.relatedTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-blue-600/40 hover:shadow-lg"
                >
                  <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                    {tr(rp.category)}
                  </span>
                  <h4 className="mt-2 font-heading text-sm font-bold leading-snug group-hover:text-blue-600">
                    {tr(rp.title)}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{tr(rp.excerpt)}</p>
                  <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {tr(rp.readTime)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {year} {lang === 'bn' ? 'নেক্সটজেন ডিজিটাল স্টুডিও' : siteConfig.name} · {siteConfig.address}
        </p>
      </article>
    </div>
  )
}
