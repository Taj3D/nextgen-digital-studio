import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { HeroSection } from "@/components/site/sections/hero";
import { TrustBanner } from "@/components/site/sections/trust-banner";
import { EnterpriseNumbers } from "@/components/site/sections/enterprise-numbers";
import { MediaMentions } from "@/components/site/sections/media-mentions";
import { PainPointsSection } from "@/components/site/sections/pain-points";
import { CostOfInactionSection } from "@/components/site/sections/cost-of-inaction";
import { TransformationSection } from "@/components/site/sections/transformation";
import { Comparison } from "@/components/site/sections/comparison";
import { FrameworkSection } from "@/components/site/sections/framework";
import { AiRevenueOs } from "@/components/site/sections/ai-revenue-os";
import { AiEcosystem } from "@/components/site/sections/ai-ecosystem";
import { HowItWorks } from "@/components/site/sections/how-it-works";
import { Services } from "@/components/site/sections/services";
import { IndustriesSection } from "@/components/site/sections/industries-home";
import { TechStack } from "@/components/site/sections/tech-stack";
import { CaseStudiesPreview } from "@/components/site/sections/case-studies-home";
import { AiDemo } from "@/components/site/sections/ai-demo";
import { VideoLayer } from "@/components/site/sections/video-layer";
import { WhyChooseUs } from "@/components/site/sections/why-choose-us";
import { TrustLayer } from "@/components/site/sections/trust-layer";
import { FounderSection } from "@/components/site/sections/founder-home";
import { Pricing } from "@/components/site/sections/pricing";
import { AiReadinessScore } from "@/components/site/sections/ai-readiness-score";
import { RoiCalculatorSection } from "@/components/site/sections/roi-calculator";
import { GuaranteeSection } from "@/components/site/sections/guarantee";
import { Testimonials } from "@/components/site/sections/testimonials";
import { Community } from "@/components/site/sections/community";
import { ResourcesHub } from "@/components/site/sections/resources-hub";
import { EmailFunnel } from "@/components/site/sections/email-funnel";
import { FaqSection } from "@/components/site/sections/faq-home";
import { LeadMagnetSection } from "@/components/site/sections/lead-magnets";
import { LeadForm } from "@/components/site/sections/lead-form";
import { EnterpriseCta } from "@/components/site/sections/enterprise-cta";
import { UltimateTrust } from "@/components/site/sections/ultimate-trust";
import { FinalCta } from "@/components/site/sections/final-cta";

// Fully static page — rendered once, served as plain HTML + CSS.
export const dynamicParams = false;
export const revalidate = false;

// Knowledge Graph JSON-LD — helps Google build a rich Knowledge Graph
// for the founder, company, location, industry, services & awards.
const knowledgeGraphLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nextgendigital.studio/#organization",
      name: "NextGen Digital Studio",
      alternateName: "NextGen AI Revenue OS",
      url: "https://nextgendigital.studio/",
      logo: "https://nextgendigital.studio/logo.jpg",
      description:
        "Bangladesh's AI Sales Automation agency. We design, build and manage AI agents, automations and growth systems — turning businesses into AI-powered sales machines.",
      foundingDate: "2023",
      foundingLocation: {
        "@type": "Place",
        name: "Jessore, Khulna, Bangladesh",
      },
      founder: { "@id": "https://nextgendigital.studio/#founder" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jessore",
        addressRegion: "Khulna",
        addressCountry: "BD",
      },
      areaServed: { "@type": "Country", name: "Bangladesh" },
      knowsAbout: [
        "Artificial Intelligence",
        "Sales Automation",
        "AI Chatbots",
        "WhatsApp Automation",
        "CRM Automation",
        "Lead Generation",
        "AI Voice Agents",
        "Business Automation",
      ],
      sameAs: [
        "https://facebook.com/nextgendigitalstudio",
        "https://www.linkedin.com/company/nextgen-digital-studio",
        "https://www.youtube.com/@nextgendigitalstudio",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://nextgendigital.studio/#founder",
      name: "Founder",
      jobTitle: "Founder & AI Automation Architect",
      worksFor: { "@id": "https://nextgendigital.studio/#organization" },
      url: "https://nextgendigital.studio/founder",
      image: "https://nextgendigital.studio/founder.png",
      knowsAbout: [
        "Artificial Intelligence",
        "Automation Architecture",
        "Sales Systems",
        "Growth Engineering",
      ],
      nationality: "Bangladeshi",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://nextgendigital.studio/#localbusiness",
      name: "NextGen Digital Studio",
      image: "https://nextgendigital.studio/og-image.jpg",
      url: "https://nextgendigital.studio/",
      telephone: "+8801XXXXXXXXX",
      priceRange: "৳৳",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jessore",
        addressRegion: "Khulna",
        addressCountry: "BD",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.1707,
        longitude: 89.2133,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      parentOrganization: { "@id": "https://nextgendigital.studio/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://nextgendigital.studio/#services",
      serviceType: "AI Sales Automation & Business Automation",
      provider: { "@id": "https://nextgendigital.studio/#organization" },
      areaServed: { "@type": "Country", name: "Bangladesh" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI & Automation Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Sales Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbots" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Voice Agents" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sales Funnels" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://nextgendigital.studio/#website",
      url: "https://nextgendigital.studio/",
      name: "NextGen Digital Studio — AI Revenue OS",
      publisher: { "@id": "https://nextgendigital.studio/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://nextgendigital.studio/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Knowledge Graph structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeGraphLd) }}
      />
      <Navbar />
      <main className="flex-1">
        {/* === Authority & Attention === */}
        <HeroSection />
        <TrustBanner />
        <EnterpriseNumbers />
        <MediaMentions />

        {/* === Problem & Stakes === */}
        <PainPointsSection />
        <CostOfInactionSection />
        <TransformationSection />
        <Comparison />

        {/* === The Operating System === */}
        <FrameworkSection />
        <AiRevenueOs />
        <AiEcosystem />

        {/* === How We Deliver === */}
        <HowItWorks />
        <Services />
        <IndustriesSection />
        <TechStack />

        {/* === Proof === */}
        <CaseStudiesPreview />
        <AiDemo />
        <VideoLayer />

        {/* === Trust & Credibility === */}
        <WhyChooseUs />
        <TrustLayer />
        <FounderSection />

        {/* === Offer & Self-Service === */}
        <Pricing />
        <AiReadinessScore />
        <RoiCalculatorSection />
        <GuaranteeSection />

        {/* === Social Proof & Community === */}
        <Testimonials />
        <Community />
        <ResourcesHub />
        <EmailFunnel />

        {/* === Objection Handling & Conversion === */}
        <FaqSection />
        <LeadMagnetSection />
        <LeadForm />

        {/* === Final Trust Layer & CTA === */}
        <EnterpriseCta />
        <UltimateTrust />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
