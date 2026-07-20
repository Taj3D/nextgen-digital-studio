import type { Metadata } from 'next'
import { CncClient } from './cnc-client'

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CNC Design Bundle — 150GB of 2500+ Ready-to-Cut Files',
  description:
    '150GB of ready-to-cut CNC design files for just 150TK — relief, 3D carving, furniture, door panels, idols and more. 2D + 3D files. Categories: doors, sofa, bed, wardrobe, dressing tables, chairs and more.',
  brand: {
    '@type': 'Brand',
    name: 'NextGen Digital Studio',
  },
  image: 'https://nextgendigitalstudio.com/3d-gallery/2.jpg',
  offers: {
    '@type': 'Offer',
    price: '150',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    url: 'https://nextgendigitalstudio.com/cnc-design',
    seller: {
      '@type': 'Organization',
      name: 'NextGen Digital Studio',
    },
  },
}

export const metadata: Metadata = {
  title: 'CNC Design Bundle (150TK / 150GB) — NextGen Digital Studio',
  description:
    '১৫০টাকায় ১৫০ জিবি CNC ডিজাইন বান্ডল — রেডিমেড relief, 3D carving, ফার্নিচার, door panel, প্রতিমা ও আরও অনেক কিছু। Get 150GB of ready-to-cut CNC design files for just 150TK — relief, 3D carving, furniture, door panels, idols and more.',
  keywords: [
    'CNC design Bangladesh',
    'CNC relief file',
    'CNC design bundle',
    '150TK CNC design',
    'CNC 3D carving',
    'CNC router file Bangladesh',
  ],
  openGraph: {
    title: 'CNC Design Bundle — 150TK for 150GB',
    description: '150GB of ready-to-cut CNC design files for just 150TK.',
    images: [{ url: '/3d-gallery/2.jpg', width: 1200, height: 630, alt: 'CNC Design Bundle' }],
  },
  alternates: { canonical: '/cnc-design' },
}

export default function CncDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <CncClient />
    </>
  )
}
