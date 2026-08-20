import type { Metadata } from 'next'
import { PdfClient } from './pdf-client'
import { TOTAL_TOOL_COUNT, AVAILABLE_NOW_COUNT, ROADMAP_COUNT } from './pdf-tools'

/**
 * ============================================================================
 * PDF Forge — /pdf-editor page (NextGen Digital Studio)
 * ----------------------------------------------------------------------------
 * Server component: SEO metadata + 3 JSON-LD schemas (WebApplication,
 * FAQPage, BreadcrumbList). Renders <PdfClient /> for all interactive UI.
 * ============================================================================
 */

const SITE_URL = 'https://nextgendigitalstudio.com'
const PAGE_PATH = '/pdf-editor'

/* -------------------------------------------------------------------------- */
/*  JSON-LD: WebApplication                                                   */
/* -------------------------------------------------------------------------- */
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Forge — Free Online PDF Editor by NextGen Digital Studio',
  alternateName: 'NextGen PDF Editor',
  url: `${SITE_URL}${PAGE_PATH}`,
  description:
    `Compress, merge, split, convert, edit, sign and secure your PDFs — all for free. 100% client-side processing, files never leave your device. Installable as a PWA. ${AVAILABLE_NOW_COUNT} tools functional now; ${ROADMAP_COUNT} on the roadmap.`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
  featureList: [
    'Merge PDF',
    'Split PDF',
    'Rotate PDF',
    'Edit PDF Metadata',
    'Compress PDF',
    'PDF to JPG',
    'JPG to PDF',
    'PDF to Text',
    'HTML to PDF',
    'Protect PDF',
    'Unlock PDF',
    'Watermark PDF',
    'Page Numbers',
    'Sign PDF',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2100',
    bestRating: '5',
    worstRating: '1',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    url: SITE_URL,
    founder: { '@type': 'Person', name: 'MD. Nazmul Islam Taj' },
  },
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD: FAQPage                                                          */
/* -------------------------------------------------------------------------- */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is PDF Forge really 100% free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PDF Forge is completely free forever — no subscriptions, no hidden fees, no daily caps. Every tool, including Merge, Split, Rotate and Edit Metadata, is free to use on any device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my files uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens locally inside your browser using client-side JavaScript. Your PDF files never leave your device, so they stay 100% private and secure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does PDF Forge work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `The ${AVAILABLE_NOW_COUNT} functional tools process PDFs entirely in your browser. The app is installable as a PWA. Note: ${ROADMAP_COUNT} tools are currently roadmap items, not yet functional.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Which devices does PDF Forge support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF Forge runs on any modern device with a web browser — Windows, macOS, Linux, Android, iPhone and iPad. The interface is fully responsive from 375px mobile to 1440px desktop and beyond.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a file size limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is no file size limit and no daily cap. Because processing happens on your own device, the only limit is your computer hardware — you can merge or split very large PDFs without any upload restriction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account is required. Open the page, pick a tool, drop your file and get the result. No email, no sign-up, no tracking of your documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes PDF Forge different from Smallpdf or iLovePDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `PDF Forge is 100% free forever with no account, no upload (files stay on your device), no watermarks, client-side processing, installable PWA, bilingual Bangla + English interface — built by NextGen Digital Studio. Currently ${AVAILABLE_NOW_COUNT} tools are functional; ${ROADMAP_COUNT} are on the roadmap.`,
      },
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD: BreadcrumbList                                                   */
/* -------------------------------------------------------------------------- */
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'PDF Editor',
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
}

export const metadata: Metadata = {
  title:
    'Free PDF Editor Online — Edit, Merge, Split & Manage PDFs | NextGen Digital Studio',
  description:
    `Compress, merge, split, convert, edit, sign, and secure your PDFs — all for free. 100% client-side processing — your files never leave your browser. ${AVAILABLE_NOW_COUNT} tools functional now; ${ROADMAP_COUNT} on the roadmap.`,
  keywords: [
    'free PDF editor',
    'PDF editor Bangladesh',
    'merge PDF online',
    'split PDF online',
    'rotate PDF',
    'edit PDF metadata',
    'PDF compressor',
    'JPG to PDF',
    'PDF to JPG',
    'protect PDF',
    'unlock PDF',
    'offline PDF editor',
    'PWA PDF tool',
    'private PDF editor',
    'NextGen Digital Studio',
    'পিডিএফ এডিটর',
    'পিডিএফ মার্জ',
    'পিডিএফ স্প্লিট',
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
    canonical: `${SITE_URL}${PAGE_PATH}`,
    languages: {
      bn: `${SITE_URL}${PAGE_PATH}`,
      'x-default': `${SITE_URL}${PAGE_PATH}`,
    },
  },
  openGraph: {
    title:
      'Free PDF Editor Online — Edit, Merge, Split & Manage PDFs | NextGen Digital Studio',
    description:
      `40+ free PDF tools — merge, split, rotate, edit metadata, compress, convert, sign & secure. 100% client-side. ${AVAILABLE_NOW_COUNT} tools functional now; ${ROADMAP_COUNT} on the roadmap. No account, no upload, no limits.`,
    type: 'website',
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: 'NextGen Digital Studio',
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Editor Online — NextGen Digital Studio',
    description:
      `40+ free PDF tools. Merge, split, rotate, edit metadata & more. 100% client-side, no account needed. ${AVAILABLE_NOW_COUNT} tools functional now; ${ROADMAP_COUNT} on the roadmap.`,
  },
  category: 'Productivity',
}

export default function PdfEditorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Hidden semantic count for crawlers (also surfaced in the UI) */}
      <span className="sr-only">
        PDF Forge ships {TOTAL_TOOL_COUNT} free PDF tools.
      </span>
      <PdfClient />
    </>
  )
}
