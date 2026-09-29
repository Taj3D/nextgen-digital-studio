import type { Metadata } from 'next'
import { FreeEnglishCourseClient } from './free-english-course-client'

// SEO metadata per ERMOS §21.
// Page title suggestion: "Free English Speaking Initiative for Students | NextGen Digital Studio"
// Meta description per spec.
// Note: "Course" keyword is used in SEO metadata only as a search-friendly term — the visible page
// body uses "Initiative" to avoid implying confirmed course structure (per ERMOS §02 governance).
export const metadata: Metadata = {
  title: 'Free English Speaking Initiative for Students | NextGen Digital Studio',
  description:
    'A free English speaking initiative for students focused on practical communication, speaking practice and confidence building. Register your interest with NextGen Digital Studio.',
  keywords: [
    'Free English Speaking Course for Students',
    'English Speaking Course Jessore',
    'Free English Speaking Initiative Bangladesh',
    'English Speaking Practice for Students',
    'Practical English Speaking',
    'English Communication Skills',
    'NextGen Digital Studio',
    'Student Support Initiative',
  ],
  openGraph: {
    title: 'Free English Speaking Initiative for Students | NextGen Digital Studio',
    description:
      'A free English speaking initiative for students — practical communication, speaking practice and confidence building. Register your interest.',
    url: 'https://nextgendigitalstudio.com/free-english-course',
    type: 'website',
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: 'Free English Speaking Initiative — NextGen Digital Studio' }],
  },
  alternates: { canonical: 'https://nextgendigitalstudio.com/free-english-course' },
  robots: { index: true, follow: true },
}

export default function FreeEnglishCoursePage() {
  return <FreeEnglishCourseClient />
}
