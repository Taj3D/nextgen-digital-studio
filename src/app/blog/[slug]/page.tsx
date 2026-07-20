import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogPosts } from "@/lib/site-data"
import { BlogDetailClient } from "./blog-detail-client"

// Blog detail pages are dynamic (content not in data model yet)
export const dynamic = "force-dynamic"

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Article Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://nextgendigitalstudio.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://nextgendigitalstudio.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  // JSON-LD structured data for SEO — helps Google understand this is an
  // Article and enables rich results in search.
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'NextGen Digital Studio',
      url: 'https://nextgendigitalstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NextGen Digital Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nextgendigitalstudio.com/logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nextgendigitalstudio.com/blog/${slug}`,
    },
    image: 'https://nextgendigitalstudio.com/og-image.jpg',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <BlogDetailClient slug={slug} />
    </>
  )
}
