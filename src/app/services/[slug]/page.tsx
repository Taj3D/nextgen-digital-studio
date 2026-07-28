import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, siteConfig } from '@/lib/site-data'
import { LandingClient } from './landing-client'
import { LeadGenerationClient } from './lead-generation-client'
import { FAQS, PRICING } from './lead-generation-data'
import { WhatsAppAutomationClient } from './whatsapp-automation-client'
import { FAQS as WA_FAQS, PRICING as WA_PRICING, TRUST as WA_TRUST } from './whatsapp-automation-data'
import { CrmAutomationClient } from './crm-automation-client'
import {
  FAQS as CRM_FAQS,
  PRICING as CRM_PRICING,
  TESTIMONIALS as CRM_TESTIMONIALS,
  HOW_IT_WORKS as CRM_HOW,
  TIMELINE as CRM_TIMELINE,
} from './crm-automation-data'

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

  // CRM Automation gets enhanced, keyword-rich SEO metadata.
  if (slug === 'crm-automation') {
    return {
      title: {
        absolute:
          'CRM Automation Bangladesh — AI-Powered Revenue Operating System | NextGen Digital Studio',
      },
      description:
        'AI-powered CRM automation: lead capture, scoring, assignment, follow-up, pipeline, AI chatbot, voice agent, dashboards. HubSpot, GoHighLevel, Salesforce. 3–10 day setup, 60-day ROI guarantee. Book a free strategy call.',
      keywords: [
        'CRM automation Bangladesh',
        'CRM automation Dhaka',
        'HubSpot setup Bangladesh',
        'GoHighLevel Bangladesh',
        'Salesforce setup Bangladesh',
        'AI CRM automation',
        'CRM automation agency Bangladesh',
        'lead scoring Bangladesh',
        'sales automation Bangladesh',
        'pipeline automation Bangladesh',
        'CRM integration Bangladesh',
        'Zapier automation Bangladesh',
        'Make automation Bangladesh',
        'n8n automation Bangladesh',
        'CRM automation Jessore',
        'revenue operations Bangladesh',
        'AI sales agent Bangladesh',
        'CRM consultant Bangladesh',
      ],
      openGraph: {
        title: 'CRM Automation — AI-Powered Revenue Operating System | NextGen Digital Studio',
        description:
          'AI-powered CRM automation: lead scoring, assignment, follow-up, pipeline, AI chatbot. HubSpot, GoHighLevel, Salesforce. 3–10 day setup. 60-day ROI guarantee. Bangladesh + worldwide.',
        url: `${siteConfig.url}/services/crm-automation`,
        siteName: siteConfig.name,
        type: 'website',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CRM Automation Service — NextGen Digital Studio' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'CRM Automation Bangladesh — AI-Powered Revenue Operating System',
        description: 'AI-powered CRM automation. 60-day ROI guarantee. Book a free strategy call.',
      },
      alternates: { canonical: `${siteConfig.url}/services/crm-automation` },
    }
  }

  // WhatsApp Automation gets enhanced, keyword-rich SEO metadata.
  if (slug === 'whatsapp-automation') {
    return {
      title: {
        absolute:
          'WhatsApp Automation Bangladesh — Official Business API + AI Chatbot | NextGen Digital Studio',
      },
      description:
        'Official WhatsApp Business API automation: AI chatbot, broadcast campaigns, cart recovery, order tracking, payment links, CRM integration. 98% open rate, 5–10x ROI, 60-day guarantee. Book a free strategy call.',
      keywords: [
        'WhatsApp automation Bangladesh',
        'WhatsApp Business API Bangladesh',
        'WhatsApp chatbot Bangladesh',
        'AI WhatsApp automation',
        'WhatsApp marketing Bangladesh',
        'broadcast campaign Bangladesh',
        'WhatsApp Business API Dhaka',
        'WhatsApp chatbot Dhaka',
        'WhatsApp CRM integration',
        'WhatsApp automation agency Bangladesh',
        'abandoned cart recovery Bangladesh',
        'WhatsApp order tracking',
        'WhatsApp payment links',
        'bKash WhatsApp',
        'WhatsApp team inbox Bangladesh',
      ],
      openGraph: {
        title: 'WhatsApp Automation — Official Business API + AI Chatbot | NextGen Digital Studio',
        description:
          'Official WhatsApp Business API: AI chatbot, broadcast, cart recovery, order tracking, CRM integration. 98% open rate. 60-day ROI guarantee. Bangladesh + worldwide.',
        url: `${siteConfig.url}/services/whatsapp-automation`,
        siteName: siteConfig.name,
        type: 'website',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WhatsApp Automation Service — NextGen Digital Studio' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'WhatsApp Automation Bangladesh — Official API + AI Chatbot',
        description: 'Official WhatsApp Business API. 98% open rate. 60-day ROI guarantee. Book a free strategy call.',
      },
      alternates: { canonical: `${siteConfig.url}/services/whatsapp-automation` },
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

/** Build JSON-LD schemas for the whatsapp-automation page.
 *  Includes: Organization, Service (with offers + aggregateRating), Product
 *  reviews, BreadcrumbList, FAQPage, and HowTo (setup process). */
function buildWhatsAppSchemas() {
  const url = `${siteConfig.url}/services/whatsapp-automation`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: `+${siteConfig.whatsapp}`,
    email: siteConfig.email,
    description:
      'NextGen Digital Studio — AI-powered WhatsApp Business Automation, lead generation and CRM automation agency in Bangladesh.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
      addressLocality: 'Jessore',
      addressRegion: 'Khulna',
    },
    areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Khulna', 'Jessore'],
    sameAs: [
      'https://www.facebook.com/nextgendigitalstudio',
      'https://www.linkedin.com/company/nextgendigitalstudio',
      'https://www.youtube.com/@nextgendigitalstudio',
      'https://wa.me/' + siteConfig.whatsapp,
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'WhatsApp Automation Service',
    serviceType: 'WhatsApp Business Automation',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: `+${siteConfig.whatsapp}`,
      email: siteConfig.email,
    },
    brand: { '@type': 'Brand', name: 'NextGen WhatsApp Automation' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small and medium businesses in Bangladesh',
    },
    areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Khulna', 'Jessore'],
    description:
      'Official WhatsApp Business API automation: AI chatbot, broadcast campaigns, cart recovery, order tracking, payment links, CRM integration. 98% open rate, 5-10x ROI, 60-day guarantee.',
    offers: WA_PRICING.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name.en,
      price: parseInt(tier.price.en.replace(/[^\d]/g, ''), 10) || 0,
      priceCurrency: 'BDT',
      description: tier.tagline.en,
      availability: 'https://schema.org/InStock',
      url,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
    // Helps AI assistants identify key content blocks
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-summary'],
    },
  }

  // Individual customer reviews (rich snippets)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WhatsApp Automation Service',
    description:
      'AI-powered WhatsApp Business API automation with chatbot, broadcast, cart recovery, CRM integration.',
    brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
    },
    review: WA_TRUST.testimonials.slice(0, 5).map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.author.en },
      reviewBody: t.quote.en,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
      { '@type': 'ListItem', position: 3, name: 'WhatsApp Automation', item: url },
    ],
  }

  const faqQuestions = WA_FAQS.groups.flatMap((g) =>
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

  // HowTo schema for the setup process — improves AI search visibility
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to set up WhatsApp Business Automation',
    description:
      'A 5-step process to go from manual WhatsApp to a fully automated AI-powered system in 3–10 days.',
    totalTime: 'P5D',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Strategy Call', text: 'Free 30-minute call to audit your setup and map use cases.' },
      { '@type': 'HowToStep', position: 2, name: 'Verification', text: 'Meta Business Manager + WhatsApp Business API verification (1–3 days).' },
      { '@type': 'HowToStep', position: 3, name: 'Build', text: 'Flows, templates, AI training, CRM integration (2–4 days).' },
      { '@type': 'HowToStep', position: 4, name: 'Test', text: 'End-to-end testing, team training, go-live checklist (1 day).' },
      { '@type': 'HowToStep', position: 5, name: 'Optimise', text: 'Weekly review, A/B tests, AI retraining, continuous improvement.' },
    ],
  }

  return [organizationSchema, serviceSchema, reviewSchema, breadcrumbSchema, faqSchema, howToSchema]
}

/** Build JSON-LD schemas for the crm-automation page.
 *  Includes: Organization, Service (with offers + aggregateRating), Product
 *  reviews, BreadcrumbList, FAQPage, and HowTo (implementation process). */
function buildCrmSchemas() {
  const url = `${siteConfig.url}/services/crm-automation`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: `+${siteConfig.whatsapp}`,
    email: siteConfig.email,
    description:
      'NextGen Digital Studio — AI-powered CRM automation, lead generation and sales automation agency in Bangladesh.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
      addressLocality: 'Jessore',
      addressRegion: 'Khulna',
    },
    areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Khulna', 'Jessore'],
    sameAs: [
      'https://www.facebook.com/nextgendigitalstudio',
      'https://www.linkedin.com/company/nextgendigitalstudio',
      'https://www.youtube.com/@nextgendigitalstudio',
      'https://wa.me/' + siteConfig.whatsapp,
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CRM Automation Service',
    serviceType: 'CRM Automation',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: `+${siteConfig.whatsapp}`,
      email: siteConfig.email,
    },
    brand: { '@type': 'Brand', name: 'NextGen AI CRM' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small and medium businesses in Bangladesh',
    },
    areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Khulna', 'Jessore'],
    description:
      'AI-powered CRM automation: lead capture, scoring, assignment, follow-up, pipeline, AI chatbot, voice agent, dashboards. HubSpot, GoHighLevel, Salesforce, Zoho. 3–10 day setup, 60-day ROI guarantee.',
    offers: CRM_PRICING.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name.en,
      price: parseInt(tier.price.en.replace(/[^\d]/g, ''), 10) || 0,
      priceCurrency: 'BDT',
      description: tier.tagline.en,
      availability: 'https://schema.org/InStock',
      url,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-summary'],
    },
  }

  // Individual customer reviews (rich snippets)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CRM Automation Service',
    description:
      'AI-powered CRM automation with lead scoring, follow-up sequences, pipeline management, AI chatbot, voice agent, and dashboards.',
    brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
    },
    review: CRM_TESTIMONIALS.items.slice(0, 5).map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.author.en },
      reviewBody: t.quote.en,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
      { '@type': 'ListItem', position: 3, name: 'CRM Automation', item: url },
    ],
  }

  const faqQuestions = CRM_FAQS.groups.flatMap((g) =>
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

  // HowTo schema for the implementation process — improves AI search visibility
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to implement AI-powered CRM automation',
    description:
      'A 4-step process to go from manual CRM to a fully automated AI-powered revenue engine in 3–10 days.',
    totalTime: 'P5D',
    step: [
      { '@type': 'HowToStep', position: 1, name: CRM_HOW.steps[0].title.en, text: CRM_HOW.steps[0].desc.en },
      { '@type': 'HowToStep', position: 2, name: CRM_HOW.steps[1].title.en, text: CRM_HOW.steps[1].desc.en },
      { '@type': 'HowToStep', position: 3, name: CRM_HOW.steps[2].title.en, text: CRM_HOW.steps[2].desc.en },
      { '@type': 'HowToStep', position: 4, name: CRM_HOW.steps[3].title.en, text: CRM_HOW.steps[3].desc.en },
    ],
  }

  // HowTo schema for the implementation timeline (Day 1 → Month 2)
  const timelineHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'CRM automation implementation timeline',
    description:
      'A 60-day implementation roadmap from kickoff to optimisation, with milestones at Day 1, Day 3, Week 1, Week 2, Month 1 and Month 2.',
    totalTime: 'P60D',
    step: CRM_TIMELINE.phases.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `${p.phase.en} — ${p.title.en}`,
      text: p.desc.en,
    })),
  }

  // VideoObject schema for the demo video — improves video search visibility
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'How CRM automation transforms your business in 3 minutes',
    description:
      'A quick walkthrough of a real CRM automation system — from lead capture to closed deal, fully automated. See the dashboard, workflows, AI chatbot, and revenue reports.',
    thumbnailUrl: `${siteConfig.url}/og-image.jpg`,
    uploadDate: '2025-01-15',
    duration: 'PT3M24S',
    contentUrl: `${siteConfig.url}/services/crm-automation#video-demo`,
    embedUrl: `${siteConfig.url}/services/crm-automation#video-demo`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
  }

  // Course schema for the CRM maturity assessment (educational content)
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CRM Automation Maturity Assessment',
    description:
      'A 6-question self-assessment to evaluate your current CRM maturity across lead capture, scoring, follow-up, reporting, integrations, and AI. Get a personalized score and recommendation.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    inLanguage: ['en', 'bn'],
    educationalLevel: 'Beginner to Advanced',
    isAccessibleForFree: true,
  }

  return [organizationSchema, serviceSchema, reviewSchema, breadcrumbSchema, faqSchema, howToSchema, timelineHowTo, videoSchema, courseSchema]
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  // CRM Automation has a dedicated enterprise landing page (35 sections,
  // interactive ROI calculator, CRM maturity assessment, bilingual EN/BN,
  // exit popup, sticky CTA, urgency band).
  if (slug === 'crm-automation') {
    const schemas = buildCrmSchemas()
    return (
      <>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <CrmAutomationClient />
      </>
    )
  }

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

  // WhatsApp Automation has a dedicated enterprise landing page (28 sections,
  // interactive ROI calculator, bilingual EN/BN, exit popup, sticky CTA).
  if (slug === 'whatsapp-automation') {
    const schemas = buildWhatsAppSchemas()
    return (
      <>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <WhatsAppAutomationClient />
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
