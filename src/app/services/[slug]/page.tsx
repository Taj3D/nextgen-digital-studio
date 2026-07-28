import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, siteConfig } from '@/lib/site-data'
import { LandingClient } from './landing-client'
import { LeadGenerationClient } from './lead-generation-client'
import { FAQS, PRICING } from './lead-generation-data'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) {
    return {
      title: 'Service Not Found',
      robots: { index: false, follow: false },
    }
  }

  // Lead Generation gets enhanced, keyword-rich SEO metadata.
  // Use `absolute` to bypass the root layout's "%s | NextGen Digital Studio"
  // template (the title already includes the brand suffix).
  if (slug === 'lead-generation') {
    return {
      title: {
        absolute:
          'AI Lead Generation Service Bangladesh — 50-200 Qualified Leads/Month | NextGen Digital Studio',
      },
      description:
        'AI-powered multi-channel lead generation: Google Ads, Meta, LinkedIn, WhatsApp, SEO, cold outreach & AI automation. 50-200 qualified leads/month, 5-10x ROI, 60-day guarantee. Book a free strategy call.',
      keywords: [
        'lead generation Bangladesh',
        'lead generation Dhaka',
        'B2B lead generation Bangladesh',
        'AI lead generation',
        'qualified leads Bangladesh',
        'lead generation agency Bangladesh',
        'appointment setting Bangladesh',
        'sales automation Bangladesh',
        'CRM automation Bangladesh',
        'WhatsApp marketing Bangladesh',
        'Google Ads Bangladesh',
        'Meta Ads Bangladesh',
        'LinkedIn outreach Bangladesh',
        'lead generation Jessore',
        'AI sales agency Bangladesh',
      ],
      openGraph: {
        title: 'AI Lead Generation Service — 50-200 Qualified Leads/Month | NextGen Digital Studio',
        description:
          'Multi-channel AI lead generation system. Google + Meta + LinkedIn + WhatsApp + SEO + AI outreach. 60-day ROI guarantee. Bangladesh + worldwide.',
        url: `${siteConfig.url}/services/lead-generation`,
        siteName: siteConfig.name,
        type: 'website',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AI Lead Generation Service — NextGen Digital Studio' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI Lead Generation Bangladesh — 50-200 Qualified Leads/Month',
        description: 'Multi-channel AI lead engine. 60-day ROI guarantee. Book a free strategy call.',
      },
      alternates: { canonical: `${siteConfig.url}/services/lead-generation` },
    }
  }

  return {
    title: `${service.title} — ${siteConfig.name}`,
    description: service.description,
    keywords: [service.title, ...service.features, 'Bangladesh', 'Dhaka', 'Jessore'],
    openGraph: {
      title: `${service.title} — ${siteConfig.name}`,
      description: service.short,
      type: 'website',
    },
    alternates: { canonical: `/services/${service.slug}` },
  }
}

/** Build JSON-LD schemas for the lead-generation page (Service, FAQ, Breadcrumb). */
function buildLeadGenSchemas() {
  const url = `${siteConfig.url}/services/lead-generation`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Lead Generation Service',
    serviceType: 'Lead Generation',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: `+${siteConfig.whatsapp}`,
      email: siteConfig.email,
    },
    areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Khulna', 'Jessore'],
    description:
      'AI-powered multi-channel lead generation system combining Google Ads, Meta, LinkedIn, WhatsApp, SEO, cold outreach and AI automation. 50-200 qualified leads per month with 60-day ROI guarantee.',
    offers: PRICING.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name.en,
      price: parseInt(tier.price.en.replace(/[^\d]/g, ''), 10),
      priceCurrency: 'BDT',
      description: tier.tagline.en,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
      { '@type': 'ListItem', position: 3, name: 'Lead Generation', item: url },
    ],
  }

  // Flatten all FAQ Q&As across groups for the FAQPage schema.
  const faqQuestions = FAQS.groups.flatMap((g) =>
    g.items.map((item) => ({
      '@type': 'Question',
      name: item.q.en,
      acceptedAnswer: { '@type': 'Answer', text: item.a.en },
    })),
  )
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqQuestions,
  }

  return [serviceSchema, breadcrumbSchema, faqSchema]
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  // Lead Generation has a dedicated enterprise landing page (21 sections,
  // interactive ROI calculator, bilingual EN/BN, exit popup, sticky CTA).
  // All other services use the generic LandingClient template.
  if (slug === 'lead-generation') {
    const schemas = buildLeadGenSchemas()
    return (
      <>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <LeadGenerationClient />
      </>
    )
  }

  // Pass only serializable fields to the client component
  return (
    <LandingClient
      slug={service.slug}
      title={service.title}
      short={service.short}
      description={service.description}
      features={service.features}
      gradient={service.gradient}
    />
  )
}
