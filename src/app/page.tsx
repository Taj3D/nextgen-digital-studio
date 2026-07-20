import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { HeroSection } from "@/components/site/sections/hero";
import { PainPointsSection } from "@/components/site/sections/pain-points";
import { CostOfInactionSection } from "@/components/site/sections/cost-of-inaction";
import { Solution } from "@/components/site/sections/solution";
import { HowItWorks } from "@/components/site/sections/how-it-works";
import { Services } from "@/components/site/sections/services";
import { WhyChooseUs } from "@/components/site/sections/why-choose-us";
import { Testimonials } from "@/components/site/sections/testimonials";
import { Pricing } from "@/components/site/sections/pricing";
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
        <PainPointsSection />
        <CostOfInactionSection />
        <Solution />
        <HowItWorks />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <LeadForm />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
