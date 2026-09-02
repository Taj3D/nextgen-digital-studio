import type { Metadata } from 'next'
import { ConsultingClient } from './consulting-client'

export const metadata: Metadata = {
  title: 'AI Business Consulting Bangladesh | AI Strategy Consultant — NextGen Digital Studio',
  description: 'আপনার Business-এ AI কোথায় বসবে—আমরা সেটা বের করে দিই। AI Business Growth Audit, Strategy Roadmap, এবং 90-Day Transformation Plan। Bangladesh-এর AI Business Strategy Consultant।',
  keywords: [
    'AI Consulting Bangladesh',
    'AI Business Consulting Bangladesh',
    'AI Strategy Consultant Bangladesh',
    'AI Business Transformation',
    'AI Automation Consulting',
    'AI Revenue Strategy',
    'AI Consultant for Business',
    'AI Consulting for SMEs Bangladesh',
    'Business Automation Consultant',
    'AI Growth Audit',
  ],
  openGraph: {
    title: 'AI Business Consulting — NextGen Digital Studio',
    description: 'আপনার Business-এ AI কোথায় বসবে—আমরা সেটা বের করে দিই। AI Strategy, Growth Audit, 90-Day Roadmap।',
    url: 'https://nextgendigitalstudio.com/consulting',
    type: 'website',
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: 'AI Business Consulting — NextGen Digital Studio' }],
  },
  alternates: { canonical: 'https://nextgendigitalstudio.com/consulting' },
}

export default function ConsultingPage() {
  return <ConsultingClient />
}
