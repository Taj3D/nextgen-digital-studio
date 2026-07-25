import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { HeroSection } from "@/components/site/sections/hero";
import { TrustBanner } from "@/components/site/sections/trust-banner";
import { PainPointsSection } from "@/components/site/sections/pain-points";
import { CostOfInactionSection } from "@/components/site/sections/cost-of-inaction";
import { TransformationSection } from "@/components/site/sections/transformation";
import { FrameworkSection } from "@/components/site/sections/framework";
import { HowItWorks } from "@/components/site/sections/how-it-works";
import { Services } from "@/components/site/sections/services";
import { IndustriesSection } from "@/components/site/sections/industries-home";
import { CaseStudiesPreview } from "@/components/site/sections/case-studies-home";
import { WhyChooseUs } from "@/components/site/sections/why-choose-us";
import { FounderSection } from "@/components/site/sections/founder-home";
import { Pricing } from "@/components/site/sections/pricing";
import { RoiCalculatorSection } from "@/components/site/sections/roi-calculator";
import { GuaranteeSection } from "@/components/site/sections/guarantee";
import { Testimonials } from "@/components/site/sections/testimonials";
import { FaqSection } from "@/components/site/sections/faq-home";
import { LeadMagnetSection } from "@/components/site/sections/lead-magnets";
import { LeadForm } from "@/components/site/sections/lead-form";
import { FinalCta } from "@/components/site/sections/final-cta";

// Fully static page — rendered once, served as plain HTML + CSS.
export const dynamicParams = false;
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustBanner />
        <PainPointsSection />
        <CostOfInactionSection />
        <TransformationSection />
        <FrameworkSection />
        <HowItWorks />
        <Services />
        <IndustriesSection />
        <CaseStudiesPreview />
        <WhyChooseUs />
        <FounderSection />
        <Pricing />
        <RoiCalculatorSection />
        <GuaranteeSection />
        <Testimonials />
        <FaqSection />
        <LeadMagnetSection />
        <LeadForm />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
