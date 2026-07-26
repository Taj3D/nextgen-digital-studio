import type { Metadata } from 'next'
import { CncBundleClient } from './cnc-bundle-client'
import { FAQS, TESTIMONIALS, BUNDLE, FOLDERS, BONUSES, VALUE_STACK } from './cnc-bundle-data'

const BASE_URL = 'https://nextgendigital.studio'

/* -------------------------------------------------------------------------- */
/*  JSON-LD Structured Data — rich results in Google                          */
/* -------------------------------------------------------------------------- */

// 1. Product Schema — Google "Product" rich result (price, rating, reviews)
const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: BUNDLE.name,
  alternateName: BUNDLE.nameBn,
  description:
    '150 GB digital bundle of 2,500+ ready-to-cut CNC design files in STL, DXF, Aspire, ArtCAM, and Vectric formats. 12+ categories: doors, chairs, beds, wardrobes, reliefs, temples, and more. Includes commercial license, lifetime updates, and VIP support.',
  brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
  category: 'CNC Design Files',
  url: `${BASE_URL}/cnc-bundle`,
  image: `${BASE_URL}/og-image.jpg`,
  sku: 'NG-CNC-BUNDLE-150',
  mpn: 'NG-CNC-BUNDLE-150',
  offers: {
    '@type': 'Offer',
    price: String(BUNDLE.price),
    priceCurrency: BUNDLE.currency,
    availability: 'https://schema.org/InStock',
    url: `${BASE_URL}/cnc-bundle`,
    priceValidUntil: '2026-12-31',
    eligibleRegion: { '@type': 'Country', name: 'Bangladesh' },
    seller: {
      '@type': 'Organization',
      name: 'NextGen Digital Studio',
      url: BASE_URL,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(BUNDLE.rating),
    reviewCount: String(BUNDLE.ratingCount),
    bestRating: '5',
    worstRating: '1',
  },
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.authorEn },
    reviewBody: t.quoteEn,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rating),
      bestRating: '5',
      worstRating: '1',
    },
  })),
}

// 2. FAQ Schema — rich FAQ snippets (40+ Q&As)
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.qEn,
    acceptedAnswer: { '@type': 'Answer', text: f.aEn },
  })),
}

// 3. Breadcrumb Schema
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'CNC Design Bundle',
      item: `${BASE_URL}/cnc-bundle`,
    },
  ],
}

// 4. Organization + LocalBusiness Schema — E-E-A-T authority
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NextGen Digital Studio',
  alternateName: 'NextGen CNC Training Academy',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  description:
    "Bangladesh's most practical CNC 3D Design training academy and design-file provider. 2,500+ ready-to-cut files, live training, industry-grade curriculum.",
  foundingDate: '2023',
  foundingLocation: { '@type': 'Place', name: 'Jessore, Khulna, Bangladesh' },
  founder: {
    '@type': 'Person',
    name: BUNDLE.founderName,
    jobTitle: 'Founder & CNC Design Specialist',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    addressCountry: 'BD',
  },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  sameAs: [
    'https://www.facebook.com/nextgendigitalstudio',
    'https://www.youtube.com/@NextGenDigitalStudio1',
    'https://instagram.com/nextgendigitalstudio1',
  ],
}

// 5. Instructor / Person Schema — E-E-A-T expertise
const founderLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: BUNDLE.founderName,
  alternateName: 'Taj Bhai',
  jobTitle: 'CNC Design Specialist & Founder',
  worksFor: { '@type': 'Organization', name: 'NextGen Digital Studio' },
  url: `${BASE_URL}/founder`,
  knowsAbout: [
    'CNC 3D Design',
    'Aspire Software',
    'Vectric CNC',
    'ArtCAM',
    'Furniture Design',
    'Relief Sculpting',
    'Toolpath Programming',
    'G-code',
  ],
  nationality: 'Bangladeshi',
  description: `${BUNDLE.experienceYears}+ years CNC design experience, ${BUNDLE.studentsTrained}+ students trained, ${BUNDLE.factoriesServed}+ factory collaborations, ${BUNDLE.designFilesCreated}+ design files created.`,
}

// 6. Video Schema — founder VSL
const FOUNDER_VIDEO_ID = 'o3S_SM6b2Tg'
const videoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Why this CNC bundle exists — Founder Video',
  description:
    'Taj Bhai explains why the NextGen CNC Design Bundle was created, who it is for, and why now is the best time to get it.',
  thumbnailUrl: `https://i.ytimg.com/vi/${FOUNDER_VIDEO_ID}/hqdefault.jpg`,
  uploadDate: '2026-07-26',
  duration: 'PT3M',
  contentUrl: `https://www.youtube.com/watch?v=${FOUNDER_VIDEO_ID}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${FOUNDER_VIDEO_ID}`,
}

// 7. ItemList Schema — bundle contents (helps Google understand the product)
const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'NextGen CNC Design Bundle — Contents',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: String(FOLDERS.length),
  itemListElement: FOLDERS.map((f, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: f.nameEn,
    description: `${f.filesEn} in ${f.size} — formats: ${f.types.join(', ')}`,
  })),
}

export const metadata: Metadata = {
  title: 'NextGen CNC Design Bundle — 2,500+ CNC Files (150 GB) | 150 ৳ | NextGen',
  description:
    '১৫০ GB · ২,৫০০+ রেডি-টু-কাট CNC ডিজাইন ফাইল — STL, DXF, Aspire, ArtCAM, Vectric. দরজা, চেয়ার, বিছানা, রিলিফ, মন্দির সহ ১২+ ক্যাটাগরি। কমার্শিয়াল লাইসেন্স + লাইফটাইম আপডেট + VIP সাপোর্ট। মাত্র ১৫০ ৳ (মূল ১,৫০০ ৳)।',
  keywords: [
    'CNC design bundle Bangladesh',
    'CNC ডিজাইন ফাইল',
    'CNC STL files',
    'CNC DXF files',
    'Aspire files Bangladesh',
    'ArtCAM files',
    'Vectric files',
    'CNC relief design',
    'furniture design files',
    'door design CNC',
    'chair leg design',
    'CNC design download',
    'CNC files BD',
    'wood carving design',
  ],
  alternates: { canonical: '/cnc-bundle' },
  openGraph: {
    title: 'NextGen CNC Design Bundle — 2,500+ Files (150 GB) — 150 ৳',
    description:
      '১৫০ GB · ২,৫০০+ রেডি-টু-কাট CNC ফাইল। STL, DXF, Aspire, ArtCAM, Vectric। ১২+ ক্যাটাগরি + কমার্শিয়াল লাইসেন্স + লাইফটাইম আপডেট। মাত্র ১৫০ ৳।',
    url: '/cnc-bundle',
    siteName: 'NextGen Digital Studio',
    type: 'website',
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGen CNC Design Bundle — 150 ৳ | NextGen',
    description: '২,৫০০+ CNC ফাইল, ১৫০ GB, সব ফরম্যাট। মাত্র ১৫০ ৳ (মূল ১,৫০০ ৳)।',
  },
  robots: { index: true, follow: true },
}

export default function CncBundlePage() {
  return (
    <>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <CncBundleClient />
    </>
  )
}
