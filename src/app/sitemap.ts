import type { MetadataRoute } from 'next'

const BASE_URL = 'https://nextgendigitalstudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // All static pages
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'daily' as const },
    { url: '/founder', priority: 0.9, changefreq: 'monthly' as const },
    { url: '/3d-portrait', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/cnc-design', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/pdf-books', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/ai-training', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/cnc-training', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/services/ai-sales-automation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/ai-chat-agent', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/ai-voice-agent', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/crm-automation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/whatsapp-automation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/lead-generation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/performance-marketing', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/sales-funnel-development', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/business-automation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/website-development', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/landing-page-design', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/services/ai-consultation', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/privacy', priority: 0.4, changefreq: 'yearly' as const },
    { url: '/terms', priority: 0.4, changefreq: 'yearly' as const },
    { url: '/docs', priority: 0.3, changefreq: 'monthly' as const },
  ]

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }))
}
