import type { Metadata } from "next"
import { TermsClient } from "./terms-client"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for NextGen Digital Studio — the terms and conditions for using our services.",
  alternates: { canonical: "https://nextgendigitalstudio.com/terms" },
  openGraph: {
    title: "Terms of Service — NextGen Digital Studio",
    description: "Terms of Service for NextGen Digital Studio — the terms and conditions for using our services.",
    url: "https://nextgendigitalstudio.com/terms",
    siteName: "NextGen Digital Studio",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — NextGen Digital Studio",
    description: "The terms and conditions for using NextGen Digital Studio AI automation services.",
  },
}

export default function TermsPage() {
  return <TermsClient />
}
