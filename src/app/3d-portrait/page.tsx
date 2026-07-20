import type { Metadata } from 'next'
import { PortraitClient } from './portrait-client'

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Custom 3D Portrait & Face Sculpting Service',
  description:
    'Custom 3D face sculpting, portrait & character modelling service from photo for print, game, animation or social media. MDF base starts at 7500 BDT, mahogany wood premium available.',
  brand: {
    '@type': 'Brand',
    name: 'NextGen Digital Studio',
  },
  image: 'https://nextgendigitalstudio.com/3d-gallery/1.jpg',
  offers: [
    {
      '@type': 'Offer',
      name: '3D Portrait — MDF (Small, ~7,500 BDT)',
      price: '7500',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/3d-portrait',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
    {
      '@type': 'Offer',
      name: '3D Portrait — Mahogany Wood (Premium, from ~8,500 BDT)',
      price: '8500',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/3d-portrait',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
  ],
}

export const metadata: Metadata = {
  title: '3D Portrait & Face Sculpting Service',
  description:
    'Custom 3D face sculpting, portrait & character modelling from photo. For print, game, animation or social media. MDF from 7500 BDT.',
  keywords: [
    '3D portrait Bangladesh',
    '3D face sculpting',
    '3D character modelling',
    '3D model from photo',
    '3D পোর্ট্রেট',
    '3D face Jessore',
  ],
  openGraph: {
    title: '3D Portrait & Face Sculpting Service',
    description:
      'Get a realistic 3D model of your face from a photo. For print, game, animation or social media.',
    images: [{ url: '/3d-gallery/1.jpg', width: 1200, height: 630, alt: '3D Portrait Sample' }],
  },
  alternates: { canonical: '/3d-portrait' },
}

export default function ThreeDPortraitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <PortraitClient />
    </>
  )
}
