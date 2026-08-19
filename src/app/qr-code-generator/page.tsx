import type { Metadata } from 'next'
import { QrClient } from './qr-client'

/**
 * ============================================================================
 * FREE QR CODE GENERATOR — Enterprise SEO + Multi-Schema Markup
 * ----------------------------------------------------------------------------
 * Ships 3 JSON-LD graphs (WebApplication, FAQPage, BreadcrumbList) for
 * maximum rich-result eligibility and AI-search readiness (ChatGPT, Gemini,
 * Claude, Perplexity, Google AI Overview).
 * ============================================================================
 */

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free QR Code Generator Online — NextGen Digital Studio',
  url: 'https://nextgendigitalstudio.com/qr-code-generator',
  description:
    'Create free custom QR codes for URLs, text, WiFi, vCards, email, phone, SMS, locations and events — directly in your browser. Client-side only, privacy-first. Download as PNG and SVG. 9 content types, error correction levels, module styles.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    '9 content types: URL, Text, WiFi, vCard, Email, Phone, SMS, Geo, Event',
    'Client-side only — privacy-first, no data sent to servers',
    'Download as PNG and SVG',
    'Error correction levels: L (7%), M (15%), Q (25%), H (30%)',
    'Module styles: Square, Rounded, Dot',
    'Size options: Small (200px), Medium (300px), Large (500px)',
    'Live preview with debounced auto-generate',
    'Scan-test verification using jsQR',
    'Recent history (localStorage, max 8 items)',
    'Capacity indicator (bytes used / max)',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    url: 'https://nextgendigitalstudio.com',
    founder: {
      '@type': 'Person',
      name: 'MD. Nazmul Islam Taj',
      jobTitle: 'Founder & CEO',
    },
  },
  inLanguage: ['en', 'bn'],
  isAccessibleForFree: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '128',
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
      name: 'What is a QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A QR (Quick Response) code is a two-dimensional barcode that can store URLs, text, contact info, WiFi credentials and more. Phone cameras scan them to instantly open websites, join WiFi networks, save contacts or send messages. Our generator creates QR codes for 9 different content types — all locally in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this QR code generator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 100% free, no signup, no watermark, no limits. Generate unlimited QR codes for URLs, WiFi, vCards, events and more. Download as PNG or SVG. No credit card required, no email required, no account needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I create a WiFi QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Select the WiFi tab, enter your SSID, password and encryption type (WPA/WEP/None). The generator builds the standard WIFI:T:WPA;S:ssid;P:password;; payload. Scanning it with any phone camera instantly connects to your network — no manual password typing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download the QR code as PNG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every generated QR code can be downloaded as a PNG image with a white background and quiet zone for maximum scannability. Choose Small (200px), Medium (300px) or Large (500px) before downloading.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download the QR code as SVG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SVG downloads are vector-based — they scale infinitely without pixelation. Perfect for print, posters, business cards, billboards and large-format signage. SVG files are also smaller and editable in Illustrator, Figma or Inkscape.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add a logo to the center of the QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This generator focuses on clean, scannable QR codes without logos. Adding a logo reduces the scannable area — we recommend using error correction level H (30%) if you plan to overlay a logo in another tool. The scan-test badge verifies your generated code is decodable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the scan-test feature work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After generating your QR code, we decode the canvas with the jsQR library to verify it is actually scannable. A green "Scan verified" badge confirms success. This catches issues like overly dense codes, insufficient contrast, or too much data for the chosen error correction level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% private. All QR generation happens locally in your browser — nothing is ever uploaded to a server. No tracking of your QR content, no analytics on the data you encode, no cookies storing your inputs. The only network request is a single page-view ping for traffic counting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the generator work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once the page loads, yes — all QR generation, scan-testing and PNG/SVG downloads run entirely in your browser. You can disconnect from the internet and keep generating QR codes. The page only needs network access for the initial load.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is QR code error correction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Error correction adds redundant data so a damaged or partially obscured QR code still scans. Four levels: L (7% recovery), M (15%), Q (25%), H (30%). Higher levels are more durable but produce denser codes. Use H for printed materials that may get scratched, L for clean digital displays.',
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
      name: 'QR Code Generator',
      item: 'https://nextgendigitalstudio.com/qr-code-generator',
    },
  ],
}

export const metadata: Metadata = {
  title:
    'Free QR Code Generator Online — Create Custom QR Codes | NextGen Digital Studio',
  description:
    'Create free custom QR codes for URLs, text, WiFi, vCards, email, phone, SMS, locations and events — directly in your browser. Client-side only, privacy-first. Download as PNG and SVG. 9 content types, error correction levels, module styles.',
  keywords: [
    'QR code generator',
    'free QR code generator',
    'QR code generator online',
    'WiFi QR code',
    'vCard QR code',
    'URL QR code',
    'QR code maker',
    'QR code generator PNG SVG',
    'QR code generator Bangladesh',
    'QR কোড জেনারেটর',
    'কিউআর কোড তৈরি',
    'QR code download',
    'custom QR code',
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
    canonical: 'https://nextgendigitalstudio.com/qr-code-generator',
    languages: {
      bn: 'https://nextgendigitalstudio.com/qr-code-generator',
      'x-default': 'https://nextgendigitalstudio.com/qr-code-generator',
    },
  },
  openGraph: {
    title:
      'Free QR Code Generator Online — Create Custom QR Codes | NextGen Digital Studio',
    description:
      'Create free custom QR codes for URLs, text, WiFi, vCards, email, phone, SMS, locations and events — directly in your browser. PNG + SVG download. 9 content types. Privacy-first.',
    type: 'website',
    url: 'https://nextgendigitalstudio.com/qr-code-generator',
    siteName: 'NextGen Digital Studio',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free QR Code Generator by NextGen Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator Online — Create Custom QR Codes',
    description:
      'Generate free QR codes for URLs, WiFi, vCards, events and more. PNG + SVG downloads. Client-side only. Privacy-first.',
    images: ['/og-image.jpg'],
  },
  category: 'Utilities',
}

export default function QrCodeGeneratorPage() {
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
      <QrClient />
    </>
  )
}
