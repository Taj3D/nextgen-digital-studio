import type { Metadata } from "next"
import { PrivacyClient } from "./privacy-client"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NextGen Digital Studio — how we collect, use, and protect your data.",
  alternates: { canonical: "https://nextgendigitalstudio.com/privacy" },
  openGraph: {
    title: "Privacy Policy — NextGen Digital Studio",
    description: "Privacy Policy for NextGen Digital Studio — how we collect, use, and protect your data.",
    url: "https://nextgendigitalstudio.com/privacy",
    siteName: "NextGen Digital Studio",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — NextGen Digital Studio",
    description: "How NextGen Digital Studio collects, uses, and protects your personal data.",
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
