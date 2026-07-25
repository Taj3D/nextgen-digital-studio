import type { Metadata } from 'next'
import { PortraitClient } from './portrait-client'

/**
 * ============================================================================
 * ENTERPRISE SEO + MULTI-SCHEMA MARKUP
 * ----------------------------------------------------------------------------
 * Ships 5 JSON-LD graphs (Organization, Product with offers, FAQ, Breadcrumb,
 * AggregateRating) for maximum rich-result eligibility and AI-search readiness
 * (ChatGPT, Gemini, Claude, Perplexity, Google AI Overview).
 * ============================================================================
 */

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://nextgendigitalstudio.com/#organization',
  name: 'NextGen Digital Studio',
  url: 'https://nextgendigitalstudio.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://nextgendigitalstudio.com/logo.png',
    width: 512,
    height: 512,
  },
  description:
    "Bangladesh's Premium Emotion-Driven Memory Preservation Studio. We transform precious photographs into handcrafted CNC 3D wooden portraits that last generations.",
  founder: { '@type': 'Person', name: 'Taj Bhai' },
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    addressCountry: 'BD',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Bengali', 'English'],
    url: 'https://nextgendigitalstudio.com/3d-portrait',
  },
  sameAs: [
    'https://web.facebook.com/nextgendigitalstudio',
    'https://wa.me/8801711000000',
  ],
}

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CNC 3D Wooden Portrait — Memory Preservation',
  description:
    'Turn your precious photos into premium CNC-carved wooden portraits that last generations. Available in STL digital, MDF board, and Mahogany wood. 1-5 faces. No advance payment. Preview before production.',
  brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
  category: 'Memory Preservation / Personalised Gift',
  image: [
    'https://nextgendigitalstudio.com/3d-gallery/1.jpg',
    'https://nextgendigitalstudio.com/3d-gallery/2.jpg',
    'https://nextgendigitalstudio.com/3d-gallery/3.jpg',
  ],
  material: ['MDF Board', 'Mahogany Wood', 'Digital STL'],
  offers: [
    {
      '@type': 'Offer',
      name: '3D Portrait — STL Digital File (Single Face, Campaign)',
      price: '500',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      url: 'https://nextgendigitalstudio.com/3d-portrait',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
    {
      '@type': 'Offer',
      name: '3D Portrait — MDF Board (from 7,500 BDT)',
      price: '7500',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/3d-portrait',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
    {
      '@type': 'Offer',
      name: '3D Portrait — Mahogany Wood Premium (from 8,500 BDT)',
      price: '8500',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/3d-portrait',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '1000',
    bestRating: '5',
    worstRating: '1',
  },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need to pay any advance payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is absolutely no advance payment. You pay only after seeing the finished work and approving it. We send you a preview before production begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many faces can be carved in one portrait?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We can carve 1 to 5 faces in a single wooden portrait — perfect for individuals, couples, families, parents, and group memories.',
      },
    },
    {
      '@type': 'Question',
      name: 'What materials are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three options: STL Digital File (delivered in 8 hours), MDF Board (7 days), and premium Mahogany Wood (10 days). Mahogany is the most durable and luxurious.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does delivery take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'STL digital files are delivered in 8 hours. MDF portraits take 7 days. Mahogany wood portraits take 10 days. Courier delivery is included across Bangladesh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I see a preview before production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We send you a digital preview of the 3D model before we begin physical carving. You can request changes at this stage at no extra cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three simple steps: 1) Send your photo on WhatsApp or fill the order form, 2) Choose material and number of faces, 3) Our team calls you and delivers the finished portrait. Payment happens only after you see the finished work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver outside Jessore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we deliver across all of Bangladesh via courier. Safe packaging is guaranteed. Delivery charge is included for MDF and Mahogany orders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the portrait durable? Will it last long?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike printed photos that fade in 10-15 years, our CNC-carved wooden portraits last for generations. Mahogany wood especially can last 50+ years with basic care.',
      },
    },
  ],
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
      name: '3D Wooden Portrait',
      item: 'https://nextgendigitalstudio.com/3d-portrait',
    },
  ],
}

export const metadata: Metadata = {
  title:
    'CNC 3D Wooden Portrait Bangladesh | Preserve Family Memories Forever — NextGen Digital Studio',
  description:
    'Turn precious photos into premium CNC-carved wooden portraits that last generations. No advance payment. Preview before production. 1000+ families trust NextGen Digital Studio, Jessore. STL ৳500, MDF from ৳7,500, Mahogany from ৳8,500.',
  keywords: [
    '3D wooden portrait Bangladesh',
    'CNC face carving',
    'family memory preservation',
    'wooden photo frame Bangladesh',
    'custom wood portrait',
    'memorial portrait Bangladesh',
    'anniversary gift Bangladesh',
    "mother's day gift wood",
    "father's day portrait",
    'pet memorial wood',
    'wedding portrait Bangladesh',
    'CNC 3D face Jessore',
    'NextGen Digital Studio',
    '3D পোর্ট্রেট',
    'কাঠে খোদাই পোর্ট্রেট',
    'পারিবারিক স্মৃতি সংরক্ষণ',
  ],
  authors: [{ name: 'NextGen Digital Studio' }],
  creator: 'NextGen Digital Studio',
  publisher: 'NextGen Digital Studio',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://nextgendigitalstudio.com/3d-portrait',
    languages: {
      bn: 'https://nextgendigitalstudio.com/3d-portrait',
      'x-default': 'https://nextgendigitalstudio.com/3d-portrait',
    },
  },
  openGraph: {
    title:
      'CNC 3D Wooden Portrait Bangladesh | Preserve Family Memories Forever',
    description:
      'Turn precious photos into premium CNC-carved wooden portraits. No advance payment. Preview before production. 1000+ families trust us.',
    type: 'website',
    url: 'https://nextgendigitalstudio.com/3d-portrait',
    siteName: 'NextGen Digital Studio',
    locale: 'bn_BD',
    images: [
      {
        url: '/3d-gallery/1.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium CNC 3D wooden family portrait by NextGen Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNC 3D Wooden Portrait Bangladesh | Preserve Memories Forever',
    description:
      'Premium wooden portraits carved from your photos. Lasts generations. No advance payment.',
    images: ['/3d-gallery/1.jpg'],
  },
  category: 'Personalised Gifts',
}

export default function ThreeDPortraitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PortraitClient />
    </>
  )
}
