import type { Metadata } from "next"
import { ApiDocs } from "@/components/site/api-docs"
import { LegalFooter } from "@/components/site/legal-footer"

export const metadata: Metadata = {
  title: "API Documentation",
  description: "NextGen Digital Studio API documentation — endpoints, methods, and examples for integrating with our AI automation platform.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://nextgendigitalstudio.com/docs" },
  openGraph: {
    title: "API Documentation — NextGen Digital Studio",
    description: "NextGen Digital Studio API documentation — endpoints, methods, and examples for integrating with our AI automation platform.",
    url: "https://nextgendigitalstudio.com/docs",
    siteName: "NextGen Digital Studio",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Documentation — NextGen Digital Studio",
    description: "Endpoints, methods, and examples for integrating with our AI automation platform.",
  },
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ApiDocs />
      <LegalFooter />
    </div>
  )
}
