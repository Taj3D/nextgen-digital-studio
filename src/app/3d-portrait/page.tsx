import type { Metadata } from 'next'
import { PortraitClient } from './portrait-client'

export const metadata: Metadata = {
  title: '3D Portrait & Face Sculpting Service — NextGen Digital Studio',
  description:
    'কাস্টম 3D ফেস স্কাল্পটিং, পোর্ট্রেট ও চরিত্র মডেলিং সেবা। আপনার ফটো থেকে রিয়ালিস্টিক 3D মডেল তৈরি করি প্রিন্ট, গেম, অ্যানিমেশন বা সোশ্যাল মিডিয়ার জন্য। Custom 3D face sculpting, portrait & character modelling service from photo for print, game, animation or social media.',
  keywords: [
    '3D portrait Bangladesh',
    '3D face sculpting',
    '3D character modelling',
    '3D model from photo',
    '3D পোর্ট্রেট',
    '3D face Jessore',
  ],
  openGraph: {
    title: '3D Portrait & Face Sculpting Service — NextGen Digital Studio',
    description:
      'Get a realistic 3D model of your face from a photo. For print, game, animation or social media.',
    images: [{ url: '/3d-gallery/1.jpg', width: 1200, height: 630, alt: '3D Portrait Sample' }],
  },
  alternates: { canonical: '/3d-portrait' },
}

export default function ThreeDPortraitPage() {
  return <PortraitClient />
}
