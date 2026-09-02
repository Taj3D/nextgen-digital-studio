import type { Metadata } from 'next'
import { ConsultingClient } from './consulting-client'

export const metadata: Metadata = {
  title: 'NGS Consulting | Business, Freelancer, Career & Entrepreneurship Consulting',
  description: 'Identify your core problem, find your bottleneck, set the right priority and create a clear action direction with NextGen Digital Studio Consulting.',
  keywords: [
    'Business Consulting Bangladesh',
    'Freelancer Consulting',
    'Career Consulting',
    'Entrepreneurship Consulting',
    'Business Problem Diagnosis',
    'Strategy Consulting',
    'Digital Business Consulting',
    'AI Consultant Bangladesh',
  ],
  openGraph: {
    title: 'NGS Consulting — Problem → Diagnosis → Priority → Action',
    description: 'আপনার Problem বুঝুন। Bottleneck খুঁজে বের করুন। Priority ঠিক করুন। তারপর Action নিন।',
    url: 'https://nextgendigitalstudio.com/consulting',
    type: 'website',
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: 'NGS Consulting' }],
  },
  alternates: { canonical: 'https://nextgendigitalstudio.com/consulting' },
}

export default function ConsultingPage() {
  return <ConsultingClient />
}
