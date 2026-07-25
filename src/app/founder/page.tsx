import type { Metadata } from 'next'
import { FounderClient } from './founder-client'
import { founderFaqs, founderFaqCategories, founderThoughtLeadership, founderPublications } from '@/lib/founder-data'

/* -------------------------------------------------------------------------- */
/*  EEAT-optimized JSON-LD                                                    */
/* -------------------------------------------------------------------------- */

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md. Najmul Islam Taj',
  alternateName: 'Taj Bhai',
  jobTitle: 'AI Business Transformation Strategist',
  description:
    'Bangladesh\'s AI Business Transformation Strategist. Founder & CEO of NextGen Digital Studio. Helping 120+ businesses adopt AI and automation with average 7.2x ROI.',
  worksFor: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    url: 'https://nextgendigitalstudio.com',
  },
  url: 'https://nextgendigitalstudio.com/founder',
  image: 'https://nextgendigitalstudio.com/founder.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    addressCountry: 'BD',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+8801711731354',
    email: 'nextgendigitalstudio1@gmail.com',
    url: 'https://wa.me/8801711731354',
  },
  knowsAbout: [
    'AI Business Transformation',
    'AI Automation',
    'Business Systems Design',
    'CRM Automation',
    'Sales Funnels',
    'Prompt Engineering',
    'Business Strategy',
    'Marketing Automation',
    'AI Agents',
    'WhatsApp Automation',
    'Corporate AI Training',
    'AI Consulting',
  ],
  sameAs: [
    'https://www.facebook.com/nextgendigitalstudio',
    'https://www.linkedin.com/in/nextgen-digital-studio',
    'https://github.com/Taj3D',
    'https://instagram.com/nextgendigitalstudio1',
    'https://www.youtube.com/@NextGenDigitalStudio1',
    'https://x.com/NextGenDigit',
  ],
  award: [
    'Best AI Consultant 2024',
    'Digital Excellence Award',
    'Top Trainer 2023',
    'Community Leader',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'AI Business Strategist',
    occupationLocation: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    skills: 'AI Automation, Business Systems, CRM, Sales Funnels, Prompt Engineering, Business Strategy',
  },
}

const profilePageLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Md. Najmul Islam Taj',
    alternateName: 'Taj Bhai',
    jobTitle: 'AI Business Transformation Strategist',
    url: 'https://nextgendigitalstudio.com/founder',
  },
  dateCreated: '2023-01-01',
  dateModified: new Date().toISOString().split('T')[0],
}

const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: founderFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q.en,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a.en,
    },
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nextgendigitalstudio.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Founder',
      item: 'https://nextgendigitalstudio.com/founder',
    },
  ],
}

/* Article schema for Thought Leadership pieces */
const articleLd = founderThoughtLeadership.map((t) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: t.title.en,
  description: t.thesis.en,
  articleSection: t.category.en,
  author: {
    '@type': 'Person',
    name: 'Md. Najmul Islam Taj',
    url: 'https://nextgendigitalstudio.com/founder',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    url: 'https://nextgendigitalstudio.com',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://nextgendigitalstudio.com/founder',
  },
}))

/* Publication / CreativeWork schema */
const publicationLd = founderPublications.map((p) => ({
  '@context': 'https://schema.org',
  '@type': p.type.en === 'Whitepaper' ? 'Whitepaper' : p.type.en === 'Research' ? 'ScholarlyArticle' : 'Article',
  headline: p.title.en,
  datePublished: `${p.year}`,
  author: {
    '@type': 'Person',
    name: 'Md. Najmul Islam Taj',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
  },
}))

export const metadata: Metadata = {
  title:
    'Taj Bhai — AI Business Strategist Bangladesh | Md. Najmul Islam Taj (Founder & CEO, NextGen Digital Studio)',
  description:
    'Bangladesh\'s AI Business Transformation Strategist. 120+ businesses transformed, 2.4M+ AI conversations, 7.2x avg ROI. Book a free strategy session with Taj Bhai — AI Expert, Speaker, Trainer & Founder of NextGen Digital Studio.',
  keywords: [
    'AI Expert Bangladesh',
    'AI Consultant Bangladesh',
    'Business Automation Consultant',
    'AI Speaker Bangladesh',
    'AI Trainer Bangladesh',
    'AI Business Strategist',
    'Taj Bhai',
    'তাজ ভাই',
    'Md. Najmul Islam Taj',
    'Nazmul Islam Taj',
    'NextGen Digital Studio founder',
    'Jessore digital engineer',
    'AI automation Bangladesh',
    'AI Business Architect',
    'Revenue Growth Partner',
    'AI transformation consultant',
    'corporate AI training Bangladesh',
    'AI consulting Dhaka',
    'automation expert Bangladesh',
  ],
  authors: [{ name: 'Md. Najmul Islam Taj' }],
  creator: 'Md. Najmul Islam Taj',
  publisher: 'NextGen Digital Studio',
  openGraph: {
    title: 'Taj Bhai — AI Business Strategist Bangladesh | Founder of NextGen Digital Studio',
    description:
      'Bangladesh\'s AI Business Transformation Strategist. 120+ businesses transformed, 2.4M+ AI conversations. Book a free strategy session.',
    images: [{ url: '/founder.png', width: 1024, height: 1024, alt: 'Md. Najmul Islam Taj (Taj Bhai) — AI Business Strategist' }],
    type: 'profile',
    locale: 'en_US',
    siteName: 'NextGen Digital Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taj Bhai — AI Business Strategist Bangladesh',
    description:
      'Bangladesh\'s AI Business Transformation Strategist. 120+ businesses transformed, 7.2x avg ROI.',
    images: ['/founder.png'],
  },
  alternates: { canonical: '/founder' },
  category: 'AI Business Strategy',
}

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Thought leadership articles */}
      {articleLd.map((a, i) => (
        <script
          key={`art-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(a) }}
        />
      ))}
      {/* Publications / whitepapers / research */}
      {publicationLd.map((p, i) => (
        <script
          key={`pub-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
      <FounderClient />
    </>
  )
}
