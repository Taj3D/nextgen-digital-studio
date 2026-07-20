import type { Metadata } from "next";
import { BlogIndexClient } from "./blog-index-client";

export const metadata: Metadata = {
  title: "Blog — AI Sales Automation Insights for Bangladeshi Businesses",
  description:
    "Practical guides on AI sales automation, WhatsApp automation, CRM, lead generation and AI voice agents — written for Bangladeshi SMEs by NextGen Digital Studio.",
  alternates: { canonical: "https://nextgendigitalstudio.com/blog" },
  openGraph: {
    title: "NextGen Digital Studio Blog",
    description:
      "Practical AI sales automation insights for Bangladeshi businesses.",
    url: "https://nextgendigitalstudio.com/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}
