import type { Metadata } from "next";
import { CaseStudiesIndexClient } from "./case-studies-index-client";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from NextGen Digital Studio Clients",
  description:
    "See how Bangladeshi businesses tripled leads, cut no-shows and recovered revenue with AI sales automation by NextGen Digital Studio.",
  alternates: { canonical: "https://nextgendigitalstudio.com/case-studies" },
  openGraph: {
    title: "NextGen Digital Studio Case Studies",
    description:
      "Real results: tripled leads, 38% fewer no-shows, 12,000+ carts recovered.",
    url: "https://nextgendigitalstudio.com/case-studies",
    type: "website",
  },
};

export default function CaseStudiesIndexPage() {
  return <CaseStudiesIndexClient />;
}
