import type { Metadata } from 'next'
import { ConsultingClient } from './consulting-client'

export const metadata: Metadata = {
  title: 'Consulting — Problem Diagnosis, Bottleneck & Strategy | NextGen Digital Studio',
  description:
    'আপনার Problem বুঝুন। Bottleneck খুঁজে বের করুন। Priority ঠিক করুন। তারপর Action নিন। NGS Consulting — Business, Freelancer, Career ও Entrepreneurship-এর জন্য structured diagnosis-first consulting.',
  keywords: [
    'Consulting Bangladesh',
    'Business Consulting Bangladesh',
    'Freelancer Consulting',
    'Career Consulting Bangladesh',
    'Entrepreneurship Consulting',
    'Problem Diagnosis',
    'Bottleneck Identification',
    'Strategy Consulting',
    'Consulting Assessment',
    'Growth Strategy Bangladesh',
    'Business Strategy Jessore',
    'NextGen Digital Studio Consulting',
  ],
  openGraph: {
    title: 'NGS Consulting — Diagnosis First. Strategy Before Execution.',
    description:
      'Career, Freelancing, Business অথবা নতুন Idea—আপনি যেখানেই থাকুন, আপনার আসল Problem, Bottleneck এবং Next Best Action পরিষ্কার করার জন্য structured diagnosis-first consulting।',
    url: 'https://nextgendigitalstudio.com/consulting',
    type: 'website',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'NGS Consulting — Diagnosis First | NextGen Digital Studio',
      },
    ],
  },
  alternates: { canonical: 'https://nextgendigitalstudio.com/consulting' },
  robots: { index: true, follow: true },
}

export default function ConsultingPage() {
  return <ConsultingClient />
}
